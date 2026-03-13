"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) arr[i] = raw.charCodeAt(i);
  return arr;
}

export function PushBanner() {
  const [show, setShow] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const wasDismissed = localStorage.getItem("push-dismissed");
    if (wasDismissed) { setDismissed(true); return; }

    navigator.serviceWorker.register("/sw.js").then(async (reg) => {
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        setSubscribed(true);
      } else {
        // Show banner after 5 seconds
        setTimeout(() => setShow(true), 5000);
      }
    });

    fetch("/api/push-subscribe").then(r => r.json()).then(d => setSubscriberCount(d.total || 0));
  }, []);

  async function subscribe() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_KEY),
      });

      await fetch("/api/push-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub.toJSON(), action: "subscribe" }),
      });

      setSubscribed(true);
      setShow(false);
    } catch (err) {
      console.error("Push subscribe error:", err);
    }
  }

  async function unsubscribe() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await sub.unsubscribe();
        await fetch("/api/push-subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscription: sub.toJSON(), action: "unsubscribe" }),
        });
      }
      setSubscribed(false);
    } catch (err) {
      console.error("Unsubscribe error:", err);
    }
  }

  function dismiss() {
    setShow(false);
    setDismissed(true);
    localStorage.setItem("push-dismissed", "true");
  }

  if (dismissed && !subscribed) return null;

  return (
    <>
      <AnimatePresence>
        {show && !subscribed && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-40"
          >
            <div className="bg-[var(--primary)] text-white rounded-2xl p-5 shadow-2xl border border-white/10">
              <button onClick={dismiss} className="absolute top-3 right-3 text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-ui font-bold text-sm">Receba alertas de LIVE!</h3>
                  <p className="text-white/60 text-xs font-ui mt-1">
                    Saiba quando Marcos Medeiros entrar ao vivo na TV do Povo. Voce pode desativar a qualquer momento.
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-white/30 text-[10px] font-ui">
                    <MapPin className="w-3 h-3" /> Nova Friburgo, RJ
                    {subscriberCount > 0 && <span> • {subscriberCount} cidadaos ja recebem</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={subscribe}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-ui font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <Bell className="w-4 h-4" /> Ativar Notificacoes
                </button>
                <button onClick={dismiss}
                  className="px-4 py-2.5 bg-white/10 text-white/50 rounded-xl font-ui text-sm hover:bg-white/20 transition-all">
                  Agora nao
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {subscribed && (
        <div className="fixed bottom-20 right-4 z-30">
          <button onClick={unsubscribe} title="Desativar notificacoes"
            className="w-10 h-10 rounded-full bg-green-600/20 text-green-400 flex items-center justify-center hover:bg-red-600/20 hover:text-red-400 transition-all">
            <BellOff className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
