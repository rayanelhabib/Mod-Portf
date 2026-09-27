"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChatItem, ChatMessage, User } from "../types";
import { useSoundFx } from "./use-sound-fx";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

const USER_COLORS = [
  "#0284c7", // Sky blue
  "#8b5cf6", // Violet
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#ef4444", // Red
  "#06b6d4", // Cyan
  "#14b8a6", // Teal
];

const DEFAULT_PINNED_MESSAGE: ChatMessage = {
  id: "rayan-welcome",
  type: "message",
  userId: "rayan-host",
  username: "Rayan",
  color: "#0284c7",
  avatarStyle: "lorelei",
  avatarSeed: "rayan-host",
  flag: "🇫🇷",
  content: "Welcome to my portfolio! Feel free to leave a note or feedback in the guestbook. 👋",
  createdAt: "2026-09-27T10:00:00.000Z",
  isHost: true,
  likes: 0,
};

// Helper to reliably extract avatarStyle and avatarSeed from any database row format
function parseRowToMessage(row: any): ChatMessage {
  let avatarStyle = row.avatar_style || row.avatarStyle;
  let avatarSeed = row.avatar_seed || row.avatarSeed;

  if (!avatarStyle && row.country) {
    try {
      const parsed = typeof row.country === "string" ? JSON.parse(row.country) : row.country;
      avatarStyle = parsed.avatarStyle || parsed.style;
      avatarSeed = parsed.avatarSeed || parsed.seed;
    } catch {
      if (typeof row.country === "string" && row.country.includes(":")) {
        const parts = row.country.split(":");
        avatarStyle = parts[0];
        avatarSeed = parts[1];
      }
    }
  }

  return {
    id: String(row.id),
    type: "message",
    userId: row.user_id || row.userId || "anon",
    username: row.username || "Guest",
    color: row.color || "#0284c7",
    flag: row.flag || "🌍",
    avatarStyle: avatarStyle || "lorelei",
    avatarSeed: avatarSeed || row.user_id || row.userId || "1",
    content: row.content || "",
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    isHost: Boolean(row.is_host || row.isHost),
    likes: row.likes || 0,
  };
}

export function useRealtimeFeed() {
  const { playPostSound, playLikeSound, isMuted, toggleMute } = useSoundFx();

  const [items, setItems] = useState<ChatItem[]>([DEFAULT_PINNED_MESSAGE]);
  const [onlineCount, setOnlineCount] = useState<number>(1);
  const [cooldown, setCooldown] = useState<number>(0);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  // Current visitor user profile (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("live-guestbook-user");
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            id: parsed.id || `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: parsed.name || "Guest",
            color: parsed.color || USER_COLORS[0],
            avatarStyle: parsed.avatarStyle || "lorelei",
            avatarSeed: parsed.avatarSeed || "1",
            flag: parsed.flag || "🌍",
            country: parsed.country || "Global",
          };
        }
      } catch {}
    }
    const randNum = Math.floor(100 + Math.random() * 900);
    const randColor = USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
    return {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: `Guest-${randNum}`,
      color: randColor,
      avatarStyle: "lorelei",
      avatarSeed: Math.floor(1 + Math.random() * 20).toString(),
      flag: "🌍",
      country: "Global",
    };
  });

  const currentUserRef = useRef<User>(currentUser);
  currentUserRef.current = currentUser;

  // Scroll to bottom helper
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 60);
  }, []);

  // Update current user profile + live sync immediately across the chat
  const updateCurrentUser = useCallback((updates: Partial<User>) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updates };
      currentUserRef.current = next;

      try {
        localStorage.setItem("live-guestbook-user", JSON.stringify(next));
      } catch {}

      // 1. Immediately reflect the updated identity on the user's messages in the active chat view!
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.type === "message" && (item as ChatMessage).userId === next.id) {
            return {
              ...item,
              username: next.name,
              color: next.color,
              avatarStyle: next.avatarStyle,
              avatarSeed: next.avatarSeed,
            };
          }
          return item;
        })
      );

      // 2. Track updated presence and broadcast identity update over socket
      if (channelRef.current) {
        try {
          channelRef.current.track({
            user_id: next.id,
            name: next.name,
            color: next.color,
            avatarStyle: next.avatarStyle,
            avatarSeed: next.avatarSeed,
            flag: next.flag,
          });

          channelRef.current.send({
            type: "broadcast",
            event: "profile_updated",
            payload: {
              userId: next.id,
              username: next.name,
              color: next.color,
              avatarStyle: next.avatarStyle,
              avatarSeed: next.avatarSeed,
            },
          });
        } catch {}
      }

      return next;
    });
  }, []);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // Real unread notification calculation
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const lastRead = localStorage.getItem("live-guestbook-last-seen");
      if (!lastRead) {
        const msgCount = items.filter((i) => i.type === "message").length;
        setUnreadCount(Math.min(msgCount, 1));
      } else {
        const lastReadTime = new Date(lastRead).getTime();
        const unread = items.filter(
          (i) => i.type === "message" && new Date(i.createdAt).getTime() > lastReadTime
        ).length;
        setUnreadCount(unread);
      }
    } catch {
      setUnreadCount(0);
    }
  }, [items]);

  const markAllAsRead = useCallback(() => {
    try {
      localStorage.setItem("live-guestbook-last-seen", new Date().toISOString());
    } catch {}
    setUnreadCount(0);
  }, []);

  // Helper to fetch from local API
  const fetchLocalApiMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          const mapped: ChatMessage[] = data.messages.map((m: any) => parseRowToMessage(m));
          setItems(mapped);
        }
      }
    } catch {}
  }, []);

  // Initial Load from Supabase
  const fetchSupabaseMessages = useCallback(async () => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) {
      fetchLocalApiMessages();
      return;
    }

    try {
      const { data, error } = await client
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: ChatMessage[] = data.map((row: any) => parseRowToMessage(row));
        setItems(mapped);
      } else {
        fetchLocalApiMessages();
      }
    } catch {
      fetchLocalApiMessages();
    }
  }, [fetchLocalApiMessages]);

  // Setup Supabase Realtime Socket (Broadcast + Postgres Changes + Presence)
  useEffect(() => {
    fetchSupabaseMessages();

    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    // Clean up any stale channel before subscribing
    const existing = client.getChannels().find((c) => c.topic === "realtime:live_guestbook_room");
    if (existing) {
      client.removeChannel(existing);
    }

    // Create Supabase Realtime Channel
    const channel = client.channel("live_guestbook_room", {
      config: { 
        broadcast: { self: false },
        presence: { key: currentUserRef.current.id } 
      },
    });

    channelRef.current = channel;

    // 1. Presence Sync
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        setOnlineCount(Math.max(1, count));
      })
      // 2. Realtime WebSocket Broadcast: Instant delivery across all connected clients (<50ms!)
      .on("broadcast", { event: "new_message" }, ({ payload }) => {
        if (!payload) return;
        const incoming = parseRowToMessage(payload);
        setItems((prev) => {
          if (prev.some((m) => m.id === incoming.id)) return prev;
          return [...prev, incoming];
        });
        playPostSound();
      })
      // 3. Realtime Broadcast Profile Update: Instantly update username and avatar on past messages
      .on("broadcast", { event: "profile_updated" }, ({ payload }) => {
        if (!payload || !payload.userId) return;
        setItems((prev) =>
          prev.map((item) => {
            if (item.type === "message" && (item as ChatMessage).userId === payload.userId) {
              return {
                ...item,
                username: payload.username || (item as ChatMessage).username,
                color: payload.color || (item as ChatMessage).color,
                avatarStyle: payload.avatarStyle || (item as ChatMessage).avatarStyle,
                avatarSeed: payload.avatarSeed || (item as ChatMessage).avatarSeed,
              };
            }
            return item;
          })
        );
      })
      // 4. Postgres DB Change: Catch new rows inserted into database
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          const newMsg = parseRowToMessage(payload.new);
          setItems((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            // If we have an optimistic message with temporary id, reconcile it
            const optIndex = prev.findIndex(
              (m) =>
                m.type === "message" &&
                (m as ChatMessage).userId === newMsg.userId &&
                (m as ChatMessage).content === newMsg.content &&
                m.id.startsWith("msg-")
            );
            if (optIndex !== -1) {
              const updated = [...prev];
              updated[optIndex] = newMsg;
              return updated;
            }
            return [...prev, newMsg];
          });
        }
      )
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            user_id: currentUserRef.current.id,
            name: currentUserRef.current.name,
            color: currentUserRef.current.color,
            avatarStyle: currentUserRef.current.avatarStyle,
            avatarSeed: currentUserRef.current.avatarSeed,
            flag: currentUserRef.current.flag,
          });
        }
      });

    return () => {
      client.removeChannel(channel);
      channelRef.current = null;
    };
  }, [fetchSupabaseMessages, playPostSound]);

  // Background Auto-Sync every 3.5 seconds: guarantees no refresh is EVER required!
  useEffect(() => {
    const autoSync = async () => {
      const client = supabase;
      if (isSupabaseConfigured && client) {
        try {
          const { data, error } = await client
            .from("guestbook")
            .select("*")
            .order("created_at", { ascending: true });

          if (!error && data && data.length > 0) {
            const mapped: ChatMessage[] = data.map((row: any) => parseRowToMessage(row));
            setItems((prev) => {
              const existingIds = new Set(prev.map((m) => m.id));
              const hasNew = mapped.some((m) => !existingIds.has(m.id));
              if (!hasNew) return prev;

              // Merge incoming database rows while preserving any optimistic pending messages
              const merged: ChatItem[] = [...mapped];
              prev.forEach((p) => {
                if (
                  p.id.startsWith("msg-") &&
                  p.type === "message" &&
                  !merged.some((m) => m.type === "message" && (m as ChatMessage).content === (p as ChatMessage).content)
                ) {
                  merged.push(p);
                }
              });
              return merged;
            });
            return;
          }
        } catch {}
      }

      // Fallback local API
      try {
        const res = await fetch("/api/guestbook");
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            const mapped: ChatMessage[] = data.messages.map((m: any) => parseRowToMessage(m));
            setItems((prev) => {
              const existingIds = new Set(prev.map((m) => m.id));
              const hasNew = mapped.some((m) => !existingIds.has(m.id));
              if (!hasNew) return prev;
              return mapped;
            });
          }
        }
      } catch {}
    };

    // Heartbeat presence ping
    const sendHeartbeat = async () => {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: currentUserRef.current.id,
            username: currentUserRef.current.name,
            flag: currentUserRef.current.flag,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (!isSupabaseConfigured) {
            setOnlineCount(data.onlineCount || 1);
          }
        }
      } catch {}
    };

    const syncInterval = setInterval(autoSync, 3500);
    const presenceInterval = setInterval(sendHeartbeat, 10000);

    return () => {
      clearInterval(syncInterval);
      clearInterval(presenceInterval);
    };
  }, []);

  // Send a real message: Instant optimistic UI + Realtime Broadcast + Supabase Persistence
  const sendMessage = useCallback(
    async (text: string): Promise<boolean> => {
      const trimmed = text.trim();
      if (!trimmed || cooldown > 0) return false;

      const user = currentUserRef.current;
      const tempId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

      // 1. Build message with active user identity (name, color, avatarStyle, avatarSeed)
      const optimisticMsg: ChatMessage = {
        id: tempId,
        type: "message",
        userId: user.id,
        username: user.name,
        color: user.color,
        avatarStyle: user.avatarStyle || "lorelei",
        avatarSeed: user.avatarSeed || "1",
        flag: user.flag || "🌍",
        content: trimmed,
        createdAt: new Date().toISOString(),
        isHost: false,
        likes: 0,
      };

      // 2. OPTIMISTIC UI: Add to chat immediately! Zero wait, zero refresh!
      setItems((prev) => {
        if (prev.some((m) => m.id === optimisticMsg.id)) return prev;
        return [...prev, optimisticMsg];
      });
      playPostSound();
      setCooldown(4);
      scrollToBottom();

      // 3. REALTIME BROADCAST: Send directly over WebSocket channel so all other open tabs/devices get it in <50ms!
      if (channelRef.current) {
        try {
          channelRef.current.send({
            type: "broadcast",
            event: "new_message",
            payload: optimisticMsg,
          });
        } catch {}
      }

      // 4. PERSISTENCE: Save to Supabase table
      let saved = false;
      const client = supabase;
      if (isSupabaseConfigured && client) {
        try {
          const { data, error } = await client
            .from("guestbook")
            .insert([
              {
                user_id: user.id,
                username: user.name,
                color: user.color,
                flag: user.flag,
                country: JSON.stringify({
                  style: user.avatarStyle || "lorelei",
                  seed: user.avatarSeed || "1",
                  avatarStyle: user.avatarStyle || "lorelei",
                  avatarSeed: user.avatarSeed || "1",
                }),
                content: trimmed,
                is_host: false,
                likes: 0,
              },
            ])
            .select();

          if (!error && data && data.length > 0) {
            saved = true;
            const realId = String(data[0].id);
            setItems((prev) =>
              prev.map((m) => (m.id === tempId ? { ...m, id: realId } : m))
            );
          }
        } catch {
          saved = false;
        }
      }

      // 5. Local API fallback if Supabase was unavailable
      if (!saved) {
        try {
          const res = await fetch("/api/guestbook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              username: user.name,
              color: user.color,
              flag: user.flag,
              avatarStyle: user.avatarStyle,
              avatarSeed: user.avatarSeed,
              content: trimmed,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.message) {
              setItems((prev) =>
                prev.map((m) => (m.id === tempId ? data.message : m))
              );
            }
          }
        } catch {}
      }

      return true;
    },
    [cooldown, playPostSound, scrollToBottom]
  );

  // Toggle Like on a message
  const toggleLike = useCallback(
    (messageId: string) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.type === "system" || item.id !== messageId) return item;
          const msg = item as ChatMessage;
          const isLiked = !msg.isLikedByMe;
          return {
            ...msg,
            isLikedByMe: isLiked,
            likes: isLiked ? (msg.likes ?? 0) + 1 : Math.max(0, (msg.likes ?? 0) - 1),
          };
        })
      );
      playLikeSound();
    },
    [playLikeSound]
  );

  return {
    items,
    currentUser,
    onlineCount,
    cooldown,
    unreadCount,
    markAllAsRead,
    updateCurrentUser,
    sendMessage,
    toggleLike,
    scrollRef,
    isMuted,
    toggleMute,
  };
}
