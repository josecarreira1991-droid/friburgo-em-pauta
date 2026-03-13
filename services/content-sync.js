#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const DATA_DIR = "/opt/friburgo-em-pauta/public/data";
const LOG_FILE = "/opt/friburgo-em-pauta/logs/content-sync.log";
const CHANNEL_ID = "UCpTkVug_tbEUPdBNKsGfxuw";

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function log(msg) {
  var ts = new Date().toISOString();
  console.log("[" + ts + "] " + msg);
  try { fs.appendFileSync(LOG_FILE, "[" + ts + "] " + msg + "\n"); } catch(e) {}
}

async function syncYouTube() {
  log("Syncing YouTube videos...");
  try {
    var url = "https://www.youtube.com/channel/" + CHANNEL_ID + "/videos";
    var output = execSync("yt-dlp --flat-playlist --print-json --playlist-items 1-300 \"" + url + "\" 2>/dev/null",
      { maxBuffer: 50*1024*1024, timeout: 180000 }).toString();
    var lines = output.trim().split("\n").filter(Boolean);
    var videos = [];
    for (var line of lines) {
      try {
        var d = JSON.parse(line);
        var id = d.id || "";
        var dur = d.duration || 0;
        if (dur < 5) continue;
        videos.push({ id: id, title: (d.title||"").trim()||"TV do Povo", duration: dur,
          duration_string: d.duration_string||"", views: d.view_count||0,
          thumbnail: "https://i.ytimg.com/vi/"+id+"/hqdefault.jpg",
          url: "https://www.youtube.com/watch?v="+id,
          embed: "https://www.youtube.com/embed/"+id });
      } catch(e){}
    }
    if (videos.length > 0) {
      fs.writeFileSync(path.join(DATA_DIR, "youtube-videos.json"), JSON.stringify(videos, null, 2));
      log("YouTube: " + videos.length + " videos synced");
    }
  } catch(e) { log("YouTube error: " + e.message); }
}

async function syncYouTubeRSS() {
  log("Syncing YouTube RSS...");
  try {
    var res = await fetch("https://www.youtube.com/feeds/videos.xml?channel_id=" + CHANNEL_ID);
    var xml = await res.text();
    var entries = [];
    var regex = /<entry>([\s\S]*?)<\/entry>/g;
    var match;
    while ((match = regex.exec(xml)) !== null) {
      var entry = match[1];
      var vidM = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      var titM = entry.match(/<title>([\s\S]*?)<\/title>/);
      var pubM = entry.match(/<published>(.*?)<\/published>/);
      if (vidM) {
        var vid = vidM[1].trim();
        entries.push({ id: vid, title: titM?titM[1].trim():"", published: pubM?pubM[1].trim():"",
          thumbnail: "https://i.ytimg.com/vi/"+vid+"/hqdefault.jpg",
          url: "https://www.youtube.com/watch?v="+vid, embed: "https://www.youtube.com/embed/"+vid });
      }
    }
    if (entries.length > 0) {
      fs.writeFileSync(path.join(DATA_DIR, "youtube-rss.json"), JSON.stringify(entries, null, 2));
      log("YouTube RSS: " + entries.length + " entries");
    }
  } catch(e) { log("RSS error: " + e.message); }
}

async function syncNews() {
  log("Syncing news...");
  try {
    var sources = [
      {name:"Nova Friburgo",url:"https://news.google.com/rss/search?q=Nova+Friburgo&hl=pt-BR&gl=BR&ceid=BR:pt-419"},
      {name:"Marcos Medeiros",url:"https://news.google.com/rss/search?q=Marcos+Medeiros+Friburgo&hl=pt-BR&gl=BR&ceid=BR:pt-419"},
      {name:"Regiao Serrana",url:"https://news.google.com/rss/search?q=regiao+serrana+RJ&hl=pt-BR&gl=BR&ceid=BR:pt-419"}
    ];
    var allNews = [];
    for (var src of sources) {
      try {
        var res = await fetch(src.url);
        var xml = await res.text();
        var regex = /<item>([\s\S]*?)<\/item>/g;
        var m;
        while ((m = regex.exec(xml)) !== null) {
          var item = m[1];
          var tM = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
          var lM = item.match(/<link>([\s\S]*?)<\/link>/);
          var dM = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
          if (tM && lM) allNews.push({title:tM[1].trim(),link:lM[1].trim(),pubDate:dM?dM[1].trim():"",source:src.name});
        }
      } catch(e) { log("News " + src.name + " error: " + e.message); }
    }
    if (allNews.length > 0) {
      var seen = {};
      var unique = allNews.filter(function(n){if(seen[n.title])return false;seen[n.title]=true;return true;});
      fs.writeFileSync(path.join(DATA_DIR, "news-feed.json"), JSON.stringify(unique.slice(0,60), null, 2));
      log("News: " + unique.length + " articles");
    }
  } catch(e) { log("News error: " + e.message); }
}

async function generateFeed() {
  log("Generating social feed...");
  var feed = [];
  var ytP = path.join(DATA_DIR, "youtube-videos.json");
  if (fs.existsSync(ytP)) {
    JSON.parse(fs.readFileSync(ytP,"utf8")).slice(0,30).forEach(function(v,i){
      feed.push({id:"yt-"+v.id,type:"youtube",title:v.title,thumbnail:v.thumbnail,
        url:v.url,embed:v.embed,views:v.views,duration:v.duration_string,
        timestamp:new Date(Date.now()-i*4*3600000).toISOString()});
    });
  }
  var nP = path.join(DATA_DIR, "news-feed.json");
  if (fs.existsSync(nP)) {
    JSON.parse(fs.readFileSync(nP,"utf8")).slice(0,20).forEach(function(n,i){
      feed.push({id:"news-"+i,type:"news",title:n.title,url:n.link,source:n.source,
        timestamp:n.pubDate||new Date(Date.now()-i*2*3600000).toISOString()});
    });
  }
  feed.sort(function(a,b){return new Date(b.timestamp)-new Date(a.timestamp);});
  fs.writeFileSync(path.join(DATA_DIR, "social-feed.json"), JSON.stringify(feed.slice(0,50), null, 2));
  log("Social feed: " + feed.length + " items");
}

async function main() {
  log("=== Content Sync Started ===");
  await syncYouTubeRSS();
  await syncNews();
  var lsf = path.join(DATA_DIR, ".last-full-sync");
  var doFull = true;
  if (fs.existsSync(lsf)) { var lt = parseInt(fs.readFileSync(lsf,"utf8")); doFull = (Date.now()-lt)>6*3600*1000; }
  if (doFull) { await syncYouTube(); fs.writeFileSync(lsf, Date.now().toString()); }
  else { log("Skipping full YouTube sync (last < 6h)"); }
  await generateFeed();
  log("=== Content Sync Complete ===");
}

main().catch(function(e){log("Fatal: "+e.message);});
