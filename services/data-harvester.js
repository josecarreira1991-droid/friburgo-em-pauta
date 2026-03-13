#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const DATA_DIR = "/opt/friburgo-em-pauta/data";
const LOG_FILE = "/opt/friburgo-em-pauta/logs/data-harvester.log";
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");
const OPTOUT_FILE = path.join(DATA_DIR, "optout.json");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
function log(msg) {
  var ts = new Date().toISOString();
  console.log("[" + ts + "] " + msg);
  try { fs.appendFileSync(LOG_FILE, "[" + ts + "] " + msg + "\n"); } catch(e) {}
}
function getContacts() {
  try { return JSON.parse(fs.readFileSync(CONTACTS_FILE, "utf8")); } catch { return []; }
}
function saveContacts(c) { fs.writeFileSync(CONTACTS_FILE, JSON.stringify(c, null, 2)); }
function getOptouts() {
  try { return JSON.parse(fs.readFileSync(OPTOUT_FILE, "utf8")); } catch { return []; }
}
function addContact(contacts, contact) {
  var optouts = getOptouts();
  if (contact.email && optouts.includes(contact.email)) return contacts;
  if (contact.phone && optouts.includes(contact.phone)) return contacts;
  var exists = contacts.find(function(c) {
    return (contact.email && c.email === contact.email) || (contact.phone && c.phone === contact.phone) || (contact.pushEndpoint && c.pushEndpoint === contact.pushEndpoint) || (contact.youtubeChannel && c.youtubeChannel === contact.youtubeChannel);
  });
  if (!exists) {
    contact.collectedAt = new Date().toISOString();
    contact.city = "Nova Friburgo";
    contact.state = "RJ";
    contacts.push(contact);
  }
  return contacts;
}
async function harvestYouTubeComments() {
  log("Harvesting YouTube comments...");
  var contacts = getContacts();
  var init = contacts.length;
  try {
    var ytPath = "/opt/friburgo-em-pauta/public/data/youtube-videos.json";
    if (!fs.existsSync(ytPath)) return;
    var videos = JSON.parse(fs.readFileSync(ytPath, "utf8")).slice(0, 10);
    var apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) { log("YOUTUBE_API_KEY not set"); return; }
    for (var video of videos) {
      try {
        var url = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=" + video.id + "&maxResults=100&key=" + apiKey;
        var res = await fetch(url);
        var data = await res.json();
        if (data.items) {
          for (var item of data.items) {
            var s = item.snippet.topLevelComment.snippet;
            if (s.authorDisplayName) {
              contacts = addContact(contacts, { name: s.authorDisplayName, source: "youtube_comment", sourceDetail: video.id, youtubeChannel: s.authorChannelUrl || "", type: "social" });
            }
          }
        }
      } catch(e) {}
    }
  } catch(e) { log("YouTube harvest error: " + e.message); }
  saveContacts(contacts);
  log("YouTube: " + (contacts.length - init) + " new (total: " + contacts.length + ")");
}
async function harvestPortalSignups() {
  log("Processing portal signups...");
  var contacts = getContacts();
  var init = contacts.length;
  var logFile = "/opt/friburgo-em-pauta/contact-messages.log";
  try {
    if (fs.existsSync(logFile)) {
      var lines = fs.readFileSync(logFile, "utf8").split("\n").filter(Boolean);
      for (var line of lines) {
        var nM = line.match(/Nome: ([^|]+)/);
        var eM = line.match(/Email: ([^|]+)/);
        var pM = line.match(/WhatsApp: ([^|]+)/);
        if (nM) contacts = addContact(contacts, { name: nM[1].trim(), email: eM ? eM[1].trim() : null, phone: pM ? pM[1].trim() : null, source: "portal_contact", type: "direct" });
      }
    }
  } catch(e) {}
  var pushFile = path.join(DATA_DIR, "push-subscribers.json");
  try {
    if (fs.existsSync(pushFile)) {
      var subs = JSON.parse(fs.readFileSync(pushFile, "utf8"));
      for (var sub of subs) contacts = addContact(contacts, { name: "Push Subscriber", pushEndpoint: sub.endpoint, source: "push_subscribe", type: "push" });
    }
  } catch(e) {}
  saveContacts(contacts);
  log("Portal: " + (contacts.length - init) + " new (total: " + contacts.length + ")");
}
async function harvestBusinessData() {
  log("Harvesting business data...");
  var contacts = getContacts();
  var init = contacts.length;
  var gmapsKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!gmapsKey) { log("GOOGLE_MAPS_API_KEY not set - skipping"); return; }
  var cats = ["restaurante","mercado","farmacia","escola","igreja","loja","oficina","salao","academia","padaria","associacao","sindicato","clube"];
  for (var cat of cats) {
    try {
      var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + encodeURIComponent(cat + " Nova Friburgo RJ") + "&key=" + gmapsKey + "&language=pt-BR";
      var res = await fetch(url);
      var data = await res.json();
      if (data.results) {
        for (var place of data.results) {
          if (place.place_id) {
            try {
              var dUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + place.place_id + "&fields=name,formatted_phone_number,website&key=" + gmapsKey;
              var dRes = await fetch(dUrl);
              var dData = await dRes.json();
              var r = dData.result || {};
              contacts = addContact(contacts, { name: r.name || place.name, phone: r.formatted_phone_number || null, website: r.website || null, address: place.formatted_address || "", source: "google_maps", category: cat, type: "business" });
            } catch(e) {}
          }
        }
      }
      await new Promise(function(r) { setTimeout(r, 1000); });
    } catch(e) {}
  }
  saveContacts(contacts);
  log("Business: " + (contacts.length - init) + " new (total: " + contacts.length + ")");
}
function printStats() {
  var contacts = getContacts();
  var bySource = {}; var byType = {};
  contacts.forEach(function(c) { bySource[c.source] = (bySource[c.source]||0)+1; byType[c.type] = (byType[c.type]||0)+1; });
  log("=== STATS ===");
  log("Total: " + contacts.length);
  log("By source: " + JSON.stringify(bySource));
  log("By type: " + JSON.stringify(byType));
  log("With email: " + contacts.filter(function(c){return c.email;}).length);
  log("With phone: " + contacts.filter(function(c){return c.phone;}).length);
  log("With push: " + contacts.filter(function(c){return c.pushEndpoint;}).length);
  log("Target: 203,417 (Nova Friburgo pop)");
}
async function main() {
  log("=== Data Harvester Started ===");
  await harvestPortalSignups();
  await harvestYouTubeComments();
  await harvestBusinessData();
  printStats();
  log("=== Data Harvester Complete ===");
}
main().catch(function(e) { log("Fatal: " + e.message); });
