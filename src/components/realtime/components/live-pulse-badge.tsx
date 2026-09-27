"use client";

import React, { useState } from "react";
import { LiveGuestbookModal } from "./live-guestbook-modal";
import { useRealtimeFeed } from "../hooks/use-realtime-feed";

export function LivePulseBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount, markAllAsRead } = useRealtimeFeed();

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      markAllAsRead();
    }
  };

  return (
    <>
      {/* Floating Bottom-Right Trigger Button with Message.png */}
      <button
        type="button"
        onClick={handleToggle}
        title="Live Guestbook"
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_8px_25px_rgba(22,24,31,0.12)] hover:shadow-[0_14px_35px_rgba(22,24,31,0.22)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all select-none group cursor-pointer flex items-center justify-center ${
          isOpen ? "ring-2 ring-[#16181f]/20 bg-white" : ""
        }`}
      >
        {/* Real Notification Badge */}
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-[0_2px_8px_rgba(244,63,94,0.5)] animate-in zoom-in duration-200">
            {unreadCount > 9 ? "9+" : unreadCount}
            <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-60 pointer-events-none" />
          </span>
        )}

        {/* Message.png Paper Airplane Icon */}
        <img
          src="/Message.png"
          alt="Guestbook"
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain select-none pointer-events-none group-hover:scale-110 transition-transform duration-200"
          draggable={false}
        />
      </button>

      {/* The Clean Live Guestbook Modal */}
      <LiveGuestbookModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
