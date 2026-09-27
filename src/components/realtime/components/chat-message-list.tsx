"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChatItem, ChatMessage } from "../types";
import { SystemMessageRow } from "./system-message";
import { Heart, MessageSquare, ArrowDown, Settings } from "lucide-react";

interface ChatMessageListProps {
  items: ChatItem[];
  currentUserId: string;
  onLike: (id: string) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onOpenIdentityModal?: () => void;
}

function formatTime(isoString: string) {
  try {
    const d = new Date(isoString);
    const now = new Date();
    const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}m`;
    const hours = d.getHours().toString().padStart(2, "0");
    const mins = d.getMinutes().toString().padStart(2, "0");
    return `${hours}:${mins}`;
  } catch {
    return "";
  }
}

export function ChatMessageList({
  items,
  currentUserId,
  onLike,
  scrollRef, onOpenIdentityModal }: ChatMessageListProps) {
  const isNearBottomRef = useRef(true);
  const [hasNewMessagesBelow, setHasNewMessagesBelow] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const prevItemsLengthRef = useRef(items.length);
  const initialScrollDoneRef = useRef(false);

  // Check scroll position to determine if user is reading older messages
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    const isNear = distanceToBottom < 75;
    isNearBottomRef.current = isNear;

    if (isNear && hasNewMessagesBelow) {
      setHasNewMessagesBelow(false);
      setNewMessagesCount(0);
    }
  }, [hasNewMessagesBelow, scrollRef]);

  // Smooth scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    setHasNewMessagesBelow(false);
    setNewMessagesCount(0);
    isNearBottomRef.current = true;
  }, [scrollRef]);

  // Auto-scroll on initial load
  useEffect(() => {
    if (items.length > 0 && !initialScrollDoneRef.current) {
      initialScrollDoneRef.current = true;
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [items, scrollRef]);

  // Handle new incoming messages
  useEffect(() => {
    const isNew = items.length > prevItemsLengthRef.current;
    const addedCount = Math.max(1, items.length - prevItemsLengthRef.current);
    prevItemsLengthRef.current = items.length;

    if (!isNew || !initialScrollDoneRef.current) return;

    const lastItem = items[items.length - 1];
    const isMe = lastItem && (lastItem as ChatMessage).userId === currentUserId;

    // If I sent the message, or if I'm already at the bottom: scroll down smoothly!
    if (isMe || isNearBottomRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 50);
      setHasNewMessagesBelow(false);
      setNewMessagesCount(0);
    } else {
      // User has scrolled UP reading older messages: show floating "New messages a†“" pill!
      setHasNewMessagesBelow(true);
      setNewMessagesCount((prev) => prev + addedCount);
    }
  }, [items, currentUserId, scrollRef]);

  if (items.length === 0) {
    return (
      <div
        ref={scrollRef}
        className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#16181f]/40"
      >
        <MessageSquare className="w-8 h-8 mb-2 opacity-30 stroke-[1.5]" />
        <p className="text-xs font-medium text-[#16181f]/60">The guestbook is empty</p>
        <p className="text-[11px] text-[#16181f]/40 mt-1 max-w-[200px]">
          Be the first visitor to leave a note or feedback!
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      {/* Scrollable messages container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scroll-smooth custom-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item) => {
          if (item.type === "system") {
            return <SystemMessageRow key={item.id} item={item} />;
          }

          const msg = item as ChatMessage;
          const isMe = msg.userId === currentUserId;

          return (
            <div
              key={msg.id}
              className="flex items-start gap-2.5 group rounded-lg p-1.5 -mx-1.5 hover:bg-black/[0.02] transition-colors"
            >
              {/* Avatar Circle with distinct user color */}
              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm select-none bg-white ${isMe && onOpenIdentityModal ? "cursor-pointer group-hover:scale-105 transition-transform" : ""}`}
                style={{ border: `1.5px solid ${msg.color}` }}
                onClick={() => {
                  if (isMe && onOpenIdentityModal) onOpenIdentityModal();
                }}
              >
                <img
                  src={`https://api.dicebear.com/10.x/${msg.avatarStyle || "lorelei"}/svg?seed=${msg.avatarSeed || msg.userId}`}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full overflow-hidden"
                />
                {isMe && (
                  <span
                    className="absolute -bottom-1 -right-1 w-[15px] h-[15px] rounded-full bg-white shadow-sm border border-black/15 flex items-center justify-center text-[#16181f]/75 transition-transform"
                    style={{ color: msg.color }}
                  >
                    <Settings className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                )}
              </div>

              {/* Message Details */}
              <div className="flex-1 min-w-0">
                {/* Header: Name with color + Flag + Badge + Time */}
                <div className="flex items-center gap-1.5 flex-wrap leading-none mb-1">
                  <span
                    className="font-bold text-xs"
                    style={{ color: msg.color }}
                  >
                    {msg.username}
                  </span>

                  <span className="text-xs select-none" title={msg.flag}>
                    {msg.flag}
                  </span>

                  {msg.isHost && (
                    <span className="bg-[#16181f] text-white text-[8.5px] px-1 py-0.5 rounded font-bold uppercase tracking-wider select-none">
                      HOST
                    </span>
                  )}

                  {isMe && !msg.isHost && (
                    <span className="bg-cyan-500/15 text-cyan-700 text-[8.5px] px-1 py-0.5 rounded font-semibold select-none">
                      YOU
                    </span>
                  )}

                  <span className="text-[10px] text-[#16181f]/40 ml-auto select-none">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>

                {/* Message Content */}
                <p className="text-[13px] font-medium text-[#16181f]/90 leading-relaxed break-words whitespace-pre-wrap font-sans">
                  {msg.content}
                </p>
              </div>

              {/* Like button on the right */}
              <button
                type="button"
                onClick={() => onLike(msg.id)}
                className={`opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[10px] transition-all p-1 rounded hover:bg-black/5 select-none shrink-0 self-start cursor-pointer ${
                  msg.isLikedByMe ? "opacity-100 text-rose-500 font-semibold" : "text-[#16181f]/40 hover:text-rose-500"
                }`}
                title="Like"
              >
                <Heart
                  className={`w-3 h-3 ${msg.isLikedByMe ? "fill-rose-500 text-rose-500" : ""}`}
                />
                {(msg.likes ?? 0) > 0 && <span>{msg.likes}</span>}
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating "New message(s) a†“" Button when user is scrolled up */}
      {hasNewMessagesBelow && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#16181f] text-white text-[11px] font-semibold shadow-[0_8px_25px_rgba(22,24,31,0.28)] hover:bg-black hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
          <span>New {newMessagesCount > 1 ? `${newMessagesCount} messages` : "message"} below</span>
        </button>
      )}
    </div>
  );
}





