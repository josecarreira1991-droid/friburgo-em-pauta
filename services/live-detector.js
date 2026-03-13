#!/usr/bin/env node
/**
 * Live Detector Service
 * Verifica a cada 2 minutos se TV do Povo esta ao vivo.
 * Quando detecta live, envia push notification para todos os inscritos.
 */

const fs = require("fs");
const path = require("path");

const CHANNEL_ID = "UCpTkVug_tbEUPdBNKsGfxuw";
const STATE_FILE = "/opt/friburgo-em-pauta/data/live-state.json";
const LOG_FILE = "/opt/friburgo-em-pauta/logs/live-detector.log";
const PORTAL_URL = process.env.PORTAL_URL || "http://187.77.210.204:3080";

function log(msg) {
  var ts = new Date().toISOString();
  console.log("[" + ts + "] " + msg);
  try { fs.appendFileSync(LOG_FILE, "[" + ts + "] " + msg + "
"); } catch(e) {}
}

function getState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, "utf8")); }
  catch { return { isLive: false, lastNotified: 0, lastVideoId: "" }; }
}

function saveState(state) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function checkLive() {
  log("Checking if channel is live...");

  try {
    // Check YouTube RSS for live indicator
    var rssUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=" + CHANNEL_ID;
    var res = await fetch(rssUrl);
    var xml = await res.text();

    // Also check channel page for live badge
    var channelRes = await fetch("https://www.youtube.com/channel/" + CHANNEL_ID + "/live", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible)" },
      redirect: "follow"
    });
    var channelHtml = await channelRes.text();

    var isLive = channelHtml.includes(""isLive":true") ||
                 channelHtml.includes(""isLiveNow":true") ||
                 channelHtml.includes("LIVE_STREAM_OFFLINE") === false && channelHtml.includes(""liveBroadcastDetails"");

    // Get current video if live
    var liveVideoMatch = channelHtml.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    var liveVideoId = liveVideoMatch ? liveVideoMatch[1] : "";
    var titleMatch = channelHtml.match(/"title":\{"runs":\[\{"text":"([^"]+)"/);
    var liveTitle = titleMatch ? titleMatch[1] : "Marcos Medeiros AO VIVO";

    var state = getState();

    if (isLive && !state.isLive) {
      // Just went live! Send notifications
      log("LIVE DETECTED! Video: " + liveVideoId + " Title: " + liveTitle);

      // Prevent duplicate notifications (min 30min apart)
      var now = Date.now();
      if (now - state.lastNotified < 30 * 60 * 1000) {
        log("Skipping notification (last sent < 30min ago)");
      } else {
        await sendPushNotifications(liveTitle, liveVideoId);
        state.lastNotified = now;
      }

      state.isLive = true;
      state.lastVideoId = liveVideoId;
      saveState(state);

    } else if (!isLive && state.isLive) {
      // Went offline
      log("Live ended.");
      state.isLive = false;
      saveState(state);

    } else {
      log("Status: " + (isLive ? "LIVE" : "offline"));
    }

  } catch (e) {
    log("Check error: " + e.message);
  }
}

async function sendPushNotifications(title, videoId) {
  log("Sending push notifications...");
  try {
    var res = await fetch(PORTAL_URL + "/api/push-send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Marcos Medeiros AO VIVO!",
        body: title || "TV do Povo esta ao vivo agora. Assista!",
        url: "/tv",
        image: "/images/marcos-perfil.jpg"
      })
    });
    var data = await res.json();
    log("Push sent: " + data.sent + " success, " + data.failed + " failed, " + data.total + " total");
  } catch (e) {
    log("Push send error: " + e.message);
  }
}

checkLive().catch(function(e) { log("Fatal: " + e.message); });
