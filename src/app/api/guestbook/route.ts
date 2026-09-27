import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "guestbook.json");

const DEFAULT_MESSAGES = [
  {
    id: "rayan-welcome",
    type: "message",
    userId: "rayan-host",
    username: "Rayan",
    color: "#0284c7",
    flag: "🇫🇷",
    avatarStyle: "lorelei",
    avatarSeed: "rayan-host",
    content: "Welcome to my portfolio! Feel free to leave a note or feedback in the guestbook. 👋",
    createdAt: "2026-09-27T10:00:00.000Z",
    isHost: true,
    likes: 0,
  },
];

function readMessages() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {}
  return DEFAULT_MESSAGES;
}

function saveMessages(msgs: unknown[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(msgs, null, 2), "utf-8");
  } catch {}
}

export async function GET() {
  const msgs = readMessages();
  return NextResponse.json({ messages: msgs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, color, flag, content, userId, avatarStyle, avatarSeed } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: "message",
      userId: userId || `user-${Date.now()}`,
      username: (username || "Guest").trim().slice(0, 30),
      color: color || "#0284c7",
      flag: flag || "🌍",
      avatarStyle: avatarStyle || "lorelei",
      avatarSeed: avatarSeed || "1",
      content: content.trim().slice(0, 300),
      createdAt: new Date().toISOString(),
      isHost: false,
      likes: 0,
    };

    const current = readMessages();
    const updated = [...current, newMessage];
    saveMessages(updated);

    return NextResponse.json({ message: newMessage, success: true });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
