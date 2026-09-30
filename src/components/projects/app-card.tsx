"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable, InertiaPlugin);
}

export interface CardData {
  id: string;
  num: string;
  name: { en: string; de: string };
  shortTitle: string; // The massive Six Caps bottom code (e.g. RAYOCR, KERNEL, NEXUS, NETMESH, ARCVE)
  desc: { en: string; de: string };
  category: { en: string; de: string };
  metrics: { label: string; value: string }[];
  tags: string[];
  terminalSnippet: string;
  liveUrl?: string;
  githubUrl: string;
  rotate: number; // Initial tilt angle (e.g. -8, 7, -12)
  xspeed: number; // Parallax multiplier
  yspeed: number;
  pos: {
    top: string;
    left?: string;
    right?: string;
  };
  shadowColor: string;
}

interface AppCardProps {
  card: CardData;
  index: number;
  isDe: boolean;
  onSelect: (card: CardData) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function AppCard({ card, isDe, onSelect, containerRef }: AppCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardAngle = useRef<number>(card.rotate);
  const draggableInstance = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Setup GSAP Draggable with Throw Physics (like Hisami Kurita AppCard.vue)
  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return;

    draggableInstance.current = Draggable.create(wrapperRef.current, {
      type: "x,y",
      bounds: containerRef.current,
      edgeResistance: 0.65,
      inertia: true,
      allowEventDefault: true,
      onPress: () => {
        setIsDragging(true);
        gsap.to(wrapperRef.current, {
          scale: 1.04,
          boxShadow: "0 35px 70px -10px rgba(22, 24, 31, 0.22)",
          duration: 0.2,
        });
      },
      onRelease: () => {
        setIsDragging(false);
        gsap.to(wrapperRef.current, {
          scale: 1.0,
          boxShadow: "0 20px 45px -12px rgba(22, 24, 31, 0.10)",
          duration: 0.3,
        });
      },
      onThrowUpdate: function () {
        // Dynamic angle tilt while throwing
        cardAngle.current += (this.deltaX + this.deltaY) / 3.0;
        gsap.to(wrapperRef.current, {
          duration: 0.01,
          ease: "none",
          rotate: cardAngle.current,
        });
      },
    })[0];

    return () => {
      if (draggableInstance.current) {
        draggableInstance.current.kill();
      }
    };
  }, [containerRef]);

  // Multi-axis scroll parallax (like Hisami Kurita parallax)
  useEffect(() => {
    if (!rootRef.current) return;

    const handleScroll = () => {
      if (!rootRef.current || isDragging) return;
      const rect = rootRef.current.getBoundingClientRect();
      const topOffset = rect.top;

      gsap.to(rootRef.current, {
        duration: 0.3,
        ease: "none",
        x: topOffset * card.xspeed,
        y: topOffset * card.yspeed,
        overwrite: "auto",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [card.xspeed, card.yspeed, isDragging]);

  return (
    <div
      ref={rootRef}
      style={{
        top: card.pos.top,
        left: card.pos.left,
        right: card.pos.right,
      }}
      className="absolute z-10 pointer-events-auto"
    >
      <div
        ref={wrapperRef}
        style={{
          transform: `rotate(${card.rotate}deg)`,
        }}
        onClick={(e) => {
          // If not thrown violently, open preview
          if (!draggableInstance.current || draggableInstance.current.isThrowing) return;
          onSelect(card);
        }}
        className="w-[280px] sm:w-[293px] h-[390px] sm:h-[400px] p-6 sm:p-7 bg-white text-[#16181f] rounded-[14px] border border-[#e5e7eb] shadow-[0_20px_45px_-12px_rgba(22,24,31,0.12)] cursor-grab active:cursor-grabbing hover:border-cyan-500/80 transition-colors relative overflow-hidden select-none group"
      >
        {/* Subtle ambient accent glow behind card */}
        <div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
          style={{ backgroundColor: card.shadowColor }}
        />

        {/* Card Content Layout (Matches CardProject.vue in Hisami Kurita) */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          
          {/* TOP BLOCK: Iconic Japanese Bullet dot + Full Project Name */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-3xl sm:text-4xl leading-none text-[#16181f] -ml-1">
                ・
              </span>
              <span className="font-mono text-[11px] font-bold text-cyan-600 tracking-wider">
                [{card.num}]
              </span>
            </div>

            <h3 className="font-sans text-base sm:text-lg font-bold tracking-tight text-[#16181f] leading-snug group-hover:text-cyan-600 transition-colors uppercase">
              {isDe ? card.name.de : card.name.en}
            </h3>

            <span className="font-mono text-[10px] uppercase tracking-widest text-[#16181f]/50 block mt-1">
              {isDe ? card.category.de : card.category.en}
            </span>
          </div>

          {/* MIDDLE BLOCK: Crisp short editorial description (width ~200px) */}
          <div className="w-[200px] sm:w-[210px] my-auto">
            <p className="font-sans text-[11.5px] sm:text-xs text-[#16181f]/75 leading-relaxed tracking-normal font-normal">
              {isDe ? card.desc.de : card.desc.en}
            </p>
          </div>

          {/* BOTTOM BLOCK: Monumental 120px Six Caps abbreviation anchored at the foot */}
          <div className="relative -mx-7 -mb-7 px-4 pt-2 overflow-hidden border-t border-[#16181f]/5 bg-gradient-to-t from-[#f9fafb] to-transparent flex items-end justify-between">
            <span className="font-sixcaps text-[100px] sm:text-[115px] leading-[0.78] text-[#16181f] group-hover:text-cyan-600 transition-colors uppercase whitespace-nowrap block select-none pointer-events-none">
              {card.shortTitle}
            </span>

            {/* Click to open badge */}
            <div className="mb-3 mr-3 w-7 h-7 rounded-full bg-[#16181f] text-white group-hover:bg-cyan-500 group-hover:text-black flex items-center justify-center transition-colors shadow-xs">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
