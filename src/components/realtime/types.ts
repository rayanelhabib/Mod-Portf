export interface User {
  id: string;
  name: string;
  color: string;
  avatarStyle: string;
  avatarSeed?: string;
  flag: string;
  country: string;
}

export interface ChatMessage {
  id: string;
  type: "message";
  userId: string;
  username: string;
  avatarStyle?: string;
  avatarSeed?: string;
  color: string;
  flag: string;
  content: string;
  createdAt: string;
  isHost?: boolean;
  likes?: number;
  isLikedByMe?: boolean;
}

export interface SystemJoin {
  id: string;
  type: "system";
  username: string;
  avatarStyle?: string;
  avatarSeed?: string;
  flag: string;
  createdAt: string;
}

export type ChatItem = ChatMessage | SystemJoin;
