#!/usr/bin/env node
/**
 * Geo Blast Service — Nova Friburgo
 * Quando Marcos entra ao vivo, dispara:
 * 1. Meta Ads geo-targetado para Nova Friburgo (Facebook + Instagram)
 * 2. Push notifications para inscritos
 * 3. WhatsApp broadcast via My CEO
 * 4. Email blast para newsletter
 * 
 * Roda a cada 2 minutos via PM2 cron.
 */

const fs = require("fs");
const path = require("path");

const CHANNEL_ID = "UCpTkVug_tbEUPdBNKsGfxuw";
const STATE_FILE = "/opt/friburgo-em-pauta/data/live-state.json";
const LOG_FILE = "/opt/friburgo-em-pauta/logs/live-detector.log";
const PORTAL_URL = process.env.PORTAL_URL || "http://187.77.210.204:3080";

// Nova Friburgo geo targeting
const NOVA_FRIBURGO = {
  latitude: -22.2819,
  longitude: -42.5331,
  radius_km: 20, // 20km radius covers the whole municipality
  city_key: "nova_friburgo",
  population: 203417,
};

function log(msg) {
  var ts = new Date().toISOString();
  console.log("[" + ts + "] " + msg);
  try { fs.appendFileSync(LOG_FILE, "[" + ts + "] " + msg + "
"); } catch(e) {}
}

function getState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, "utf8")); }
  catch { return { isLive: false, lastNotified: 0, lastVideoId: "", lastAdCreated: 0 }; }
}

function saveState(state) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function checkLive() {
  log("Checking live status...");
  try {
    var channelRes = await fetch("https://www.youtube.com/channel/" + CHANNEL_ID + "/live", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      redirect: "follow"
    });
    var html = await channelRes.text();

    var isLive = html.includes('"isLive":true') || html.includes('"isLiveNow":true');
    var videoMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    var videoId = videoMatch ? videoMatch[1] : "";
    var titleMatch = html.match(/"title":\{"runs":\[\{"text":"([^"]+)"/);
    var liveTitle = titleMatch ? titleMatch[1] : "TV do Povo AO VIVO";

    var state = getState();

    if (isLive && !state.isLive) {
      log("*** LIVE DETECTED! *** Video: " + videoId + " Title: " + liveTitle);
      
      var now = Date.now();
      if (now - state.lastNotified < 30 * 60 * 1000) {
        log("Cooldown active, skipping notifications");
      } else {
        // BLAST ALL CHANNELS
        await Promise.all([
          sendPushNotifications(liveTitle),
          createMetaAd(liveTitle, videoId),
          sendWhatsAppBroadcast(liveTitle, videoId),
          sendEmailBlast(liveTitle, videoId),
        ]);
        state.lastNotified = now;
      }

      state.isLive = true;
      state.lastVideoId = videoId;
      saveState(state);

    } else if (!isLive && state.isLive) {
      log("Live ended.");
      state.isLive = false;
      saveState(state);
      // Optionally pause/stop Meta ad
      await pauseMetaAd();

    } else {
      log("Status: " + (isLive ? "LIVE" : "offline"));
    }
  } catch (e) {
    log("Check error: " + e.message);
  }
}

// 1. PUSH NOTIFICATIONS
async function sendPushNotifications(title) {
  log("Sending push notifications...");
  try {
    var res = await fetch(PORTAL_URL + "/api/push-send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Marcos Medeiros AO VIVO!",
        body: title,
        url: "/tv"
      })
    });
    var data = await res.json();
    log("Push: " + (data.sent || 0) + " sent");
  } catch (e) { log("Push error: " + e.message); }
}

// 2. META ADS — Geo-targeted to Nova Friburgo
async function createMetaAd(title, videoId) {
  var token = process.env.META_ACCESS_TOKEN;
  var adAccountId = process.env.META_AD_ACCOUNT_ID;
  var pageId = process.env.META_PAGE_ID;
  
  if (!token || !adAccountId) {
    log("Meta Ads: tokens not configured (META_ACCESS_TOKEN, META_AD_ACCOUNT_ID)");
    log("To reach all 203K citizens of Nova Friburgo:");
    log("1. Create Meta Business account");
    log("2. Set up ad account with payment");
    log("3. Generate long-lived access token");
    log("4. Add META_ACCESS_TOKEN, META_AD_ACCOUNT_ID, META_PAGE_ID to .env.local");
    return;
  }

  log("Creating Meta Ad for Nova Friburgo...");
  try {
    // Create campaign
    var campRes = await fetch("https://graph.facebook.com/v19.0/act_" + adAccountId + "/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: token,
        name: "LIVE NOW - " + title,
        objective: "OUTCOME_AWARENESS",
        status: "ACTIVE",
        special_ad_categories: ["HOUSING"],
      })
    });
    var camp = await campRes.json();
    if (!camp.id) { log("Campaign error: " + JSON.stringify(camp)); return; }
    log("Campaign created: " + camp.id);

    // Create ad set with Nova Friburgo geo targeting
    var setRes = await fetch("https://graph.facebook.com/v19.0/act_" + adAccountId + "/adsets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: token,
        name: "Nova Friburgo Geo Target",
        campaign_id: camp.id,
        billing_event: "IMPRESSIONS",
        optimization_goal: "REACH",
        bid_amount: 500, // R.00 CPM
        daily_budget: 5000, // R.00/day
        status: "ACTIVE",
        targeting: {
          geo_locations: {
            custom_locations: [{
              latitude: NOVA_FRIBURGO.latitude,
              longitude: NOVA_FRIBURGO.longitude,
              radius: NOVA_FRIBURGO.radius_km,
              distance_unit: "kilometer"
            }]
          },
          age_min: 18,
          age_max: 65,
        },
        start_time: new Date().toISOString(),
        end_time: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      })
    });
    var adset = await setRes.json();
    log("Ad set created: " + (adset.id || JSON.stringify(adset)));

    // Save campaign ID for pausing later
    var state = getState();
    state.activeCampaignId = camp.id;
    saveState(state);

    log("Meta Ad LIVE for Nova Friburgo (radius 20km, pop ~203K)");
  } catch (e) { log("Meta Ad error: " + e.message); }
}

async function pauseMetaAd() {
  var token = process.env.META_ACCESS_TOKEN;
  var state = getState();
  if (!token || !state.activeCampaignId) return;
  
  try {
    await fetch("https://graph.facebook.com/v19.0/" + state.activeCampaignId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: token, status: "PAUSED" })
    });
    log("Meta Ad paused: " + state.activeCampaignId);
    state.activeCampaignId = null;
    saveState(state);
  } catch (e) { log("Pause ad error: " + e.message); }
}

// 3. WHATSAPP BROADCAST
async function sendWhatsAppBroadcast(title, videoId) {
  var myceoKey = process.env.MYCEO_API_KEY;
  if (!myceoKey) { log("WhatsApp: MYCEO_API_KEY not configured"); return; }
  
  log("Sending WhatsApp broadcast...");
  try {
    var message = "Marcos Medeiros esta AO VIVO agora na TV do Povo!

"
      + title + "

"
      + "Assista: " + PORTAL_URL + "/tv
"
      + "YouTube: https://www.youtube.com/watch?v=" + videoId + "

"
      + "Para nao receber mais, responda SAIR";

    var res = await fetch("https://api.myceo.store/v1/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + myceoKey },
      body: JSON.stringify({ message: message, tag: "live_notification" })
    });
    var data = await res.json();
    log("WhatsApp broadcast: " + JSON.stringify(data));
  } catch (e) { log("WhatsApp error: " + e.message); }
}

// 4. EMAIL BLAST
async function sendEmailBlast(title, videoId) {
  log("Email blast...");
  try {
    var res = await fetch(PORTAL_URL + "/api/newsletter-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "broadcast",
        subject: "AO VIVO AGORA: " + title,
        body: "Marcos Medeiros esta ao vivo! Assista em " + PORTAL_URL + "/tv"
      })
    });
    log("Email blast sent");
  } catch (e) { log("Email error: " + e.message); }
}

checkLive().catch(function(e) { log("Fatal: " + e.message); });
