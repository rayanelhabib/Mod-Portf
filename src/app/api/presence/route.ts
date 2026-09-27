import { NextResponse } from "next/server";

interface ActiveSession {
  sessionId: string;
  username: string;
  flag: string;
  lastSeen: number;
}

// In-memory active presence tracker
const sessions = new Map<string, ActiveSession>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, username, flag } = body;
    const now = Date.now();

    if (sessionId) {
      sessions.set(sessionId, {
        sessionId,
        username: (username || "Guest").slice(0, 30),
        flag: flag || "🌐",
        lastSeen: now,
      });
    }

    // Prune stale sessions (> 25 seconds of inactivity)
    for (const [id, sess] of sessions.entries()) {
      if (now - sess.lastSeen > 25000) {
        sessions.delete(id);
      }
    }

    // Count real active sessions (at least 1 for the current active requester)
    const onlineCount = Math.max(1, sessions.size);

    return NextResponse.json({
      onlineCount,
      activeVisitors: Array.from(sessions.values()).map((s) => ({
        username: s.username,
        flag: s.flag,
      })),
    });
  } catch {
    return NextResponse.json({ onlineCount: 1 });
  }
}
