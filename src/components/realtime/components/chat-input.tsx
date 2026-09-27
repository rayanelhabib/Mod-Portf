"use client";

import React, { useState } from "react";
import { User } from "../types";
import { Send, Settings } from "lucide-react";

interface ChatInputProps {
  currentUser: User;
  onSendMessage: (text: string) => boolean | Promise<boolean>;
  onOpenIdentityModal: () => void;
  cooldown: number;
}

export function ChatInput({
  currentUser,
  onSendMessage,
  onOpenIdentityModal,
  cooldown,
}: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || cooldown > 0) return;
    const ok = await onSendMessage(text);
    if (ok) setText("");
  };

  const avatarUrl = `https://api.dicebear.com/10.x/${currentUser.avatarStyle || "lorelei"}/svg?seed=${currentUser.avatarSeed || currentUser.id}`;

  return (
    <div className="p-3 border-t border-black/[0.08] bg-white/80 backdrop-blur-md">
      {cooldown > 0 && (
        <div className="flex justify-end mb-1.5 px-1">
          <span className="text-[10px] font-mono text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
            wait {cooldown}s
          </span>
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          maxLength={200}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Sign the guestbook..."
          className="flex-1 px-3 py-2 text-xs bg-black/[0.03] border border-black/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:bg-white text-[#16181f] placeholder-[#16181f]/40 transition-all font-medium"
        />

        <button
          type="submit"
          disabled={!text.trim() || cooldown > 0}
          className="p-2 rounded-xl bg-[#16181f] text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
          title="Send Note"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}


