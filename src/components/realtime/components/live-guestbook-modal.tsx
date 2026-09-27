"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRealtimeFeed } from "../hooks/use-realtime-feed";
import { ChatMessageList } from "./chat-message-list";
import { ChatInput } from "./chat-input";
import { AuthorModal } from "./author-modal";
import { triggerTweetConfetti } from "./confetti";
import { X, Volume2, VolumeX, Settings } from "lucide-react";

interface LiveGuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiveGuestbookModal({ isOpen, onClose }: LiveGuestbookModalProps) {
  const {
    items,
    currentUser,
    onlineCount,
    cooldown,
    updateCurrentUser,
    sendMessage,
    toggleLike,
    scrollRef,
    isMuted,
    toggleMute,
  } = useRealtimeFeed();

  const [isEditingIdentity, setIsEditingIdentity] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isEditingIdentity) {
          setIsEditingIdentity(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isEditingIdentity, onClose]);

  // Close on click outside (ignoring clicks on the trigger button itself)
  useEffect(() => {
    if (!isOpen || isEditingIdentity) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("button[title*='Guestbook']")
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, isEditingIdentity]);

  if (!isOpen) return null;

  const handleSend = async (text: string) => {
    const ok = await sendMessage(text);
    if (ok) {
      triggerTweetConfetti();
    }
    return ok;
  };

  return (
    <>
      <div
        ref={modalRef}
        className="fixed bottom-20 right-4 sm:right-8 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[500px] max-h-[82vh] bg-white/95 backdrop-blur-2xl border border-black/10 rounded-2xl shadow-[0_25px_70px_-15px_rgba(22,24,31,0.22)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
      >
        {/* Sleek Minimal Header */}
        <div className="px-4 py-3 border-b border-black/[0.08] flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            <span className="font-bold text-xs tracking-tight text-[#16181f] flex items-center gap-1.5">
              <img src="/chat.png" alt="Chat" className="w-4 h-4 opacity-75" />
              General
            </span>

            <span className="text-[10px] text-[#16181f]/50 font-medium">
              &bull; {onlineCount} online
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Profile Avatar Button */}
            <button
              type="button"
              onClick={() => setIsEditingIdentity(true)}
              className="flex items-center justify-center relative cursor-pointer group"
              title="Edit Profile"
            >
              <div
                className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 bg-white"
                style={{ border: `1.5px solid ${currentUser.color}` }}
              >
                <img
                  src={`https://api.dicebear.com/10.x/${currentUser.avatarStyle || "lorelei"}/svg?seed=${currentUser.avatarSeed || currentUser.id}`}
                  alt={currentUser.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-[15px] h-[15px] rounded-full bg-white shadow-sm border border-black/15 flex items-center justify-center text-[#16181f]/75 group-hover:text-[#16181f] group-hover:rotate-45 transition-transform"
                style={{ color: currentUser.color }}
              >
                <Settings className="w-2.5 h-2.5 stroke-[2.5]" />
              </span>
            </button>
            
            <div className="w-[1px] h-4 bg-black/10 mx-0.5" />

            {/* Audio Mute Button */}
            <button
              type="button"
              onClick={toggleMute}
              title={isMuted ? "Unmute sounds" : "Mute sounds"}
              className="p-1.5 rounded-full text-[#16181f]/45 hover:text-[#16181f] hover:bg-black/5 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#16181f]/40 hover:text-[#16181f] hover:bg-black/5 transition-colors cursor-pointer ml-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message List */}
        <ChatMessageList
          items={items}
          currentUserId={currentUser.id}
          onLike={toggleLike}
          scrollRef={scrollRef}
          onOpenIdentityModal={() => setIsEditingIdentity(true)}
        />

        {/* Bottom Input Area */}
        <ChatInput
          currentUser={currentUser}
          onSendMessage={handleSend}
          onOpenIdentityModal={() => setIsEditingIdentity(true)}
          cooldown={cooldown}
        />
      </div>

      {/* Edit Identity Modal */}
      <AuthorModal
        currentUser={currentUser}
        isOpen={isEditingIdentity}
        onClose={() => setIsEditingIdentity(false)}
        onSave={updateCurrentUser}
      />
    </>
  );
}




