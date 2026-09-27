"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { User } from "../types";
import { 
  X, 
  Check, 
  Paintbrush, 
  UserCircle, 
  Search, 
  Shuffle, 
  Sparkles,
  Users,
  Gamepad2,
  Bot,
  Smile,
  Palette
} from "lucide-react";

interface AuthorModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<User>) => void;
}

interface AvatarItem {
  id: string;
  style: string;
  seed: string;
  category: "characters" | "pixel" | "robots" | "emoji" | "art";
  isPopular?: boolean;
  tags: string[];
}

// Curated avatar catalog with high-quality variations across top styles
const AVATAR_CATALOG: AvatarItem[] = [
  // 1. Lorelei (Popular Anime & Manga Faces) - 24 variations
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `lorelei-${i + 1}`,
    style: "lorelei",
    seed: (i + 1).toString(),
    category: "characters" as const,
    isPopular: i < 10,
    tags: ["anime", "cartoon", "girl", "portrait", "face", "mange", "lorelei", "popular"],
  })),

  // 2. Adventurer (Fantasy RPG Heroes) - 20 variations
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `adventurer-${i + 1}`,
    style: "adventurer",
    seed: (i + 1).toString(),
    category: "characters" as const,
    isPopular: i < 10,
    tags: ["rpg", "fantasy", "hero", "warrior", "character", "adventurer", "popular"],
  })),

  // 3. Avataaars (Modern Cartoon People) - 20 variations
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `avataaars-${i + 1}`,
    style: "avataaars",
    seed: (i + 1).toString(),
    category: "characters" as const,
    isPopular: i < 10,
    tags: ["cartoon", "person", "modern", "custom", "fun", "avataaars", "popular"],
  })),

  // 4. Personas (Stylish Illustrated Portraits) - 15 variations
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `personas-${i + 1}`,
    style: "personas",
    seed: (i + 1).toString(),
    category: "characters" as const,
    isPopular: i < 8,
    tags: ["stylish", "illustration", "cool", "human", "character", "personas"],
  })),

  // 5. Micah (Flat Modern Characters) - 10 variations
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `micah-${i + 1}`,
    style: "micah",
    seed: (i + 1).toString(),
    category: "characters" as const,
    isPopular: i < 4,
    tags: ["flat", "modern", "portrait", "designer", "micah"],
  })),

  // 6. Open Peeps (Hand-drawn sketches) - 10 variations
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `open-peeps-${i + 1}`,
    style: "open-peeps",
    seed: (i + 1).toString(),
    category: "characters" as const,
    isPopular: i < 4,
    tags: ["sketch", "handdrawn", "diverse", "bust", "black and white", "open peeps"],
  })),

  // 7. Pixel Art (Retro 8-bit Avatars) - 25 variations
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `pixel-art-${i + 1}`,
    style: "pixel-art",
    seed: (i + 1).toString(),
    category: "pixel" as const,
    isPopular: i < 8,
    tags: ["retro", "8bit", "game", "gaming", "arcade", "vintage", "pixel art"],
  })),

  // 8. Bottts (Cyborgs & Robots) - 25 variations
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `bottts-${i + 1}`,
    style: "bottts",
    seed: (i + 1).toString(),
    category: "robots" as const,
    isPopular: i < 8,
    tags: ["robot", "cyborg", "droid", "sci-fi", "mech", "ai", "tech", "bottts"],
  })),

  // 9. Fun Emoji & Big Smile - 20 variations
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `fun-emoji-${i + 1}`,
    style: "fun-emoji",
    seed: (i + 1).toString(),
    category: "emoji" as const,
    isPopular: i < 5,
    tags: ["smiley", "yellow", "funny", "happy", "cute", "emoji"],
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `big-smile-${i + 1}`,
    style: "big-smile",
    seed: (i + 1).toString(),
    category: "emoji" as const,
    isPopular: i < 5,
    tags: ["smile", "happy", "friendly", "teeth", "big smile"],
  })),

  // 10. Notionists & Croodles (Clean Doodles) - 20 variations
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `notionists-${i + 1}`,
    style: "notionists",
    seed: (i + 1).toString(),
    category: "art" as const,
    isPopular: i < 5,
    tags: ["notion", "minimalist", "line", "sketch", "art", "notionists"],
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `croodles-${i + 1}`,
    style: "croodles",
    seed: (i + 1).toString(),
    category: "art" as const,
    isPopular: i < 4,
    tags: ["doodle", "scribble", "playful", "handdrawn", "croodles"],
  })),
];

// Clean category definitions using professional vector icons instead of generic text emojis
const CATEGORIES = [
  { id: "all", label: "All & Popular", icon: Sparkles, iconColor: "text-amber-500" },
  { id: "characters", label: "Characters", icon: Users, iconColor: "text-indigo-500" },
  { id: "pixel", label: "Pixel Art", icon: Gamepad2, iconColor: "text-violet-500" },
  { id: "robots", label: "Robots", icon: Bot, iconColor: "text-cyan-500" },
  { id: "emoji", label: "Emoji", icon: Smile, iconColor: "text-emerald-500" },
  { id: "art", label: "Doodles", icon: Palette, iconColor: "text-rose-500" },
] as const;

const USER_COLORS = [
  "#0284c7", "#8b5cf6", "#10b981", "#f59e0b",
  "#ec4899", "#ef4444", "#06b6d4", "#6366f1",
  "#14b8a6", "#16181f"
];

// Sub-filters for Characters category
const CHARACTER_SUBSTYLES = [
  { id: "all", label: "All Characters" },
  { id: "lorelei", label: "Anime (Lorelei)" },
  { id: "adventurer", label: "Heroes (Adventurer)" },
  { id: "avataaars", label: "Cartoons (Avataaars)" },
  { id: "personas", label: "Portraits (Personas)" },
  { id: "micah", label: "Flat (Micah)" },
  { id: "open-peeps", label: "Sketches (Peeps)" },
];

export function AuthorModal({
  currentUser,
  isOpen,
  onClose,
  onSave,
}: AuthorModalProps) {
  const [name, setName] = useState(currentUser.name);
  const [color, setColor] = useState(currentUser.color);
  const [avatarStyle, setAvatarStyle] = useState(currentUser.avatarStyle || "lorelei");
  const [avatarSeed, setAvatarSeed] = useState(currentUser.avatarSeed || currentUser.id || "1");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubStyle, setSelectedSubStyle] = useState<string>("all");
  const [isShuffling, setIsShuffling] = useState(false);

  // Drag-to-scroll state for the avatar grid
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isMouseDown = useRef(false);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  // Drag-to-scroll state for category horizontal bar
  const catScrollRef = useRef<HTMLDivElement | null>(null);
  const isCatDown = useRef(false);
  const isCatDragging = useRef(false);
  const startCatX = useRef(0);
  const scrollCatLeft = useRef(0);

  // Reset or initialize state
  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setColor(currentUser.color);
      setAvatarStyle(currentUser.avatarStyle || "lorelei");
      setAvatarSeed(currentUser.avatarSeed || currentUser.id || "1");
      setSearchQuery("");
      setSelectedCategory("all");
      setSelectedSubStyle("all");
    }
  }, [isOpen, currentUser]);

  // Filtered avatars
  const visibleAvatars = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return AVATAR_CATALOG.filter((item) => {
      // 1. Text search takes priority if typed
      if (query) {
        const matchesTag = item.tags.some((t) => t.toLowerCase().includes(query));
        const matchesStyle = item.style.toLowerCase().includes(query);
        const matchesSeed = item.seed.toLowerCase().includes(query);
        return matchesTag || matchesStyle || matchesSeed;
      }

      // 2. Category filtering
      if (selectedCategory === "all") {
        // In "All", display a curated mix of the most popular avatars across all styles!
        return item.isPopular;
      }

      if (item.category !== selectedCategory) {
        return false;
      }

      // 3. Sub-style filtering (e.g. within Characters)
      if (selectedCategory === "characters" && selectedSubStyle !== "all") {
        return item.style === selectedSubStyle;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedSubStyle]);

  if (!isOpen) return null;

  // Shuffle button action
  const handleShuffle = () => {
    setIsShuffling(true);
    if (visibleAvatars.length > 0) {
      const randomIndex = Math.floor(Math.random() * visibleAvatars.length);
      const chosen = visibleAvatars[randomIndex];
      setAvatarStyle(chosen.style);
      setAvatarSeed(chosen.seed);
    } else {
      const randomSeed = Math.floor(Math.random() * 50) + 1;
      setAvatarSeed(randomSeed.toString());
    }
    setTimeout(() => setIsShuffling(false), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || currentUser.name,
      color,
      avatarStyle,
      avatarSeed,
    });
    onClose();
  };

  // Drag-to-scroll handlers for Grid (desktop mouse drag + seamless mobile touch)
  const handleGridMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !gridRef.current) return;
    isMouseDown.current = true;
    isDragging.current = false;
    startY.current = e.pageY - gridRef.current.offsetTop;
    scrollTop.current = gridRef.current.scrollTop;
  };

  const handleGridMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !gridRef.current) return;
    const y = e.pageY - gridRef.current.offsetTop;
    const walkY = y - startY.current;
    if (Math.abs(walkY) > 5) {
      isDragging.current = true;
    }
    if (isDragging.current) {
      gridRef.current.scrollTop = scrollTop.current - walkY;
    }
  };

  const handleGridMouseUp = () => {
    isMouseDown.current = false;
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  // Drag-to-scroll handlers for Categories
  const handleCatMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !catScrollRef.current) return;
    isCatDown.current = true;
    isCatDragging.current = false;
    startCatX.current = e.pageX - catScrollRef.current.offsetLeft;
    scrollCatLeft.current = catScrollRef.current.scrollLeft;
  };

  const handleCatMouseMove = (e: React.MouseEvent) => {
    if (!isCatDown.current || !catScrollRef.current) return;
    const x = e.pageX - catScrollRef.current.offsetLeft;
    const walkX = x - startCatX.current;
    if (Math.abs(walkX) > 5) {
      isCatDragging.current = true;
    }
    if (isCatDragging.current) {
      catScrollRef.current.scrollLeft = scrollCatLeft.current - walkX;
    }
  };

  const handleCatMouseUp = () => {
    isCatDown.current = false;
    setTimeout(() => {
      isCatDragging.current = false;
    }, 50);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[540px] sm:max-w-[560px] max-h-[90vh] bg-white rounded-3xl p-5 sm:p-6 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] border border-black/10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/8 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-[#16181f] uppercase tracking-wider">
              Customize Identity
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/5 text-[#16181f]/60 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {visibleAvatars.length} Avatars
            </span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-full text-[#16181f]/40 hover:text-[#16181f] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 pt-4 space-y-3.5">
          {/* Section 1: Profile Info Card (Avatar Preview + Name + Accent Color) */}
          <div className="bg-black/[0.02] p-3 sm:p-3.5 rounded-2xl border border-black/5 flex gap-4 items-center shrink-0">
            {/* Big Active Avatar Preview */}
            <div className="relative group shrink-0">
              <div 
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-lg flex items-center justify-center shrink-0 transition-all duration-300 ring-4 ring-offset-2 ring-offset-white"
                style={{ 
                  backgroundColor: color, 
                  boxShadow: `0 10px 25px -4px ${color}66` 
                }}
              >
                <img
                  src={`https://api.dicebear.com/10.x/${avatarStyle}/svg?seed=${avatarSeed}`}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover scale-110"
                />
              </div>

              {/* Shuffle button overlay */}
              <button
                type="button"
                onClick={handleShuffle}
                title="Shuffle Avatar"
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md border border-black/10 flex items-center justify-center text-[#16181f]/70 hover:text-[#16181f] hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* Display Name & Color Row */}
            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold text-[#16181f]/70 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCircle className="w-3.5 h-3.5 text-[#16181f]/60" />
                    Display Name
                  </label>
                  <span className="text-[10px] text-[#16181f]/40 font-mono">
                    {name.length}/20
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={20}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-black/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-xs transition-all text-[#16181f] font-semibold"
                  placeholder="e.g. Alex"
                />
              </div>

              {/* Inline Accent Color Row */}
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-[10px] font-bold text-[#16181f]/60 uppercase tracking-wider flex items-center gap-1">
                  <Paintbrush className="w-3 h-3 text-[#16181f]/50" />
                  Color
                </span>
                <div className="flex gap-1.5 sm:gap-2 items-center flex-wrap">
                  {USER_COLORS.map((c) => {
                    const isColorActive = color.toLowerCase() === c.toLowerCase();
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all cursor-pointer border ${
                          isColorActive
                            ? "scale-120 border-white shadow-md ring-2 ring-[#16181f]/40"
                            : "border-transparent hover:scale-110 opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Avatar Gallery (Search + Category Filter + Touch/Drag-to-Scroll Grid) */}
          <div className="flex-1 flex flex-col min-h-0 space-y-2">
            {/* Search Bar */}
            <div className="relative shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#16181f]/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search avatars (e.g. anime, robot, pixel, hero, cute, smile)..."
                className="w-full pl-8.5 pr-8 py-1.5 text-xs bg-black/[0.03] border border-black/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:bg-white text-[#16181f] placeholder-[#16181f]/40 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#16181f]/40 hover:text-[#16181f] p-0.5 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Horizontal Category Tabs with Real Vector Icons (Drag & Touch Scrollable) */}
            <div
              ref={catScrollRef}
              onMouseDown={handleCatMouseDown}
              onMouseMove={handleCatMouseMove}
              onMouseUp={handleCatMouseUp}
              onMouseLeave={handleCatMouseUp}
              className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar shrink-0 select-none cursor-grab active:cursor-grabbing"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
            >
              {CATEGORIES.map((cat) => {
                const isCatActive = selectedCategory === cat.id && !searchQuery;
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={(e) => {
                      if (isCatDragging.current) {
                        e.preventDefault();
                        return;
                      }
                      setSelectedCategory(cat.id);
                      setSelectedSubStyle("all");
                      setSearchQuery("");
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10.5px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                      isCatActive
                        ? "bg-[#16181f] text-white shadow-xs scale-102"
                        : "bg-black/[0.04] text-[#16181f]/70 hover:bg-black/[0.08] hover:text-[#16181f]"
                    }`}
                  >
                    <IconComponent 
                      className={`w-4 h-4 transition-colors ${
                        isCatActive ? "text-white" : cat.iconColor
                      }`} 
                    />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-style Chips (Only when "Characters" category is active) */}
            {selectedCategory === "characters" && !searchQuery && (
              <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar shrink-0 animate-in fade-in duration-150">
                {CHARACTER_SUBSTYLES.map((sub) => {
                  const isSubActive = selectedSubStyle === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubStyle(sub.id)}
                      className={`px-2 py-0.5 rounded-md text-[9.5px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                        isSubActive
                          ? "bg-cyan-600 text-white font-semibold shadow-2xs"
                          : "bg-black/[0.03] text-[#16181f]/60 hover:bg-black/[0.06] hover:text-[#16181f]"
                      }`}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Spacious Avatar Grid (Drag-to-Scroll + Mobile Touch) */}
            <div
              ref={gridRef}
              onMouseDown={handleGridMouseDown}
              onMouseMove={handleGridMouseMove}
              onMouseUp={handleGridMouseUp}
              onMouseLeave={handleGridMouseUp}
              className="flex-1 min-h-[220px] max-h-[280px] sm:max-h-[300px] overflow-y-auto overflow-x-hidden p-2.5 rounded-2xl bg-black/[0.02] border border-black/8 select-none cursor-grab active:cursor-grabbing custom-scrollbar"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              {visibleAvatars.length > 0 ? (
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-2.5">
                  {visibleAvatars.map((item) => {
                    const isSelected = avatarStyle === item.style && avatarSeed === item.seed;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={(e) => {
                          if (isDragging.current) {
                            e.preventDefault();
                            return;
                          }
                          setAvatarStyle(item.style);
                          setAvatarSeed(item.seed);
                        }}
                        className={`group relative aspect-square rounded-full flex items-center justify-center overflow-hidden transition-all cursor-pointer ${
                          isSelected
                            ? "shadow-md scale-110 z-10"
                            : "bg-white/80 hover:scale-105 hover:bg-white hover:shadow-xs"
                        }`}
                        style={
                          isSelected
                            ? {
                                backgroundColor: color,
                                boxShadow: `0 0 0 2px white, 0 0 0 4px ${color}`,
                              }
                            : {}
                        }
                        title={`${item.style} #${item.seed}`}
                      >
                        <img
                          src={`https://api.dicebear.com/10.x/${item.style}/svg?seed=${item.seed}`}
                          alt={item.id}
                          loading="lazy"
                          draggable={false}
                          className={`w-full h-full object-cover pointer-events-none transition-all ${
                            isSelected
                              ? "scale-110 opacity-100"
                              : "opacity-85 group-hover:opacity-100 group-hover:scale-105"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center text-[#16181f]/40">
                  <Search className="w-8 h-8 mb-2 opacity-30 stroke-[1.5]" />
                  <p className="text-xs font-semibold text-[#16181f]/70">
                    No avatars found
                  </p>
                  <p className="text-[11px] text-[#16181f]/40 mt-0.5">
                    Try searching for &ldquo;anime&rdquo;, &ldquo;robot&rdquo;, &ldquo;pixel&rdquo;, or click a category above.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-black/8 shrink-0">
            <span className="text-[10px] text-[#16181f]/50 font-medium capitalize">
              Selected: <strong className="text-[#16181f]">{avatarStyle} #{avatarSeed}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-xs text-[#16181f]/60 hover:text-[#16181f] font-semibold rounded-full hover:bg-black/5 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-1.5 bg-[#16181f] text-white text-xs font-semibold rounded-full hover:bg-black transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}



