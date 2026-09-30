"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppCircleBg } from "@/components/ui/app-circle-bg";
import { AppReadTitle } from "@/components/ui/app-read-title";
import { BounceLine } from "@/components/ui/bounce-line";
import { ProjectModal } from "@/components/projects/project-modal";
import { CardData } from "@/components/projects/app-card";
import { CARDS_DATA } from "@/components/projects/projects-section";
import { useLanguage } from "@/hooks/use-language";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SideProjectItem {
  id: string;
  name: string;
  category: string;
  img1: string;
  img2: string;
}

const SIDE_PROJECTS: SideProjectItem[] = [
  {
    id: "rayocr",
    name: "RAYOCR ENGINE",
    category: "AI SIMD DOCUMENT VISION",
    img1: "/images/poster-asovision.webp",
    img2: "/images/poster-redandgreen.webp",
  },
  {
    id: "kernelflow",
    name: "KERNELFLOW EBPF",
    category: "RING0 SOCKET OBSERVABILITY",
    img1: "/images/poster-frontier.webp",
    img2: "/images/poster-basta.webp",
  },
  {
    id: "nexus",
    name: "NEXUS STORAGE",
    category: "DISTRIBUTED LSM-TREE RUNTIME",
    img1: "/images/poster-ketakuma.webp",
    img2: "/images/poster-mtrust.webp",
  },
  {
    id: "netmesh",
    name: "NETMESH PROTOCOL",
    category: "ZERO-TRUST P2P TUNNELING",
    img1: "/images/poster-yakudoh.webp",
    img2: "/images/poster-asovision.webp",
  },
  {
    id: "archive",
    name: "ARCHIVE LAB",
    category: "RESEARCH BENCHMARKS & EXPERIMENTS",
    img1: "/images/about-sidescroll-archive-01.webp",
    img2: "/images/about-sidescroll-archive-02.webp",
  },
];

export function SideScrollReel() {
  const { lang } = useLanguage();
  const isDe = lang === "de";

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const scrollDist = trackRef.current!.scrollWidth - window.innerWidth + 240;

      gsap.fromTo(
        trackRef.current,
        { x: window.innerWidth * 0.35 },
        {
          x: -scrollDist,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1800px",
            pin: wrapperRef.current,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleProjectClick = (projectId: string) => {
    const card = CARDS_DATA.find((c: CardData) => c.id === projectId) || CARDS_DATA[0];
    setSelectedCard(card);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-[2200px] select-none"
      >
        {/* Pinned 100vh stage */}
        <div
          ref={wrapperRef}
          className="sticky top-0 left-0 w-full h-screen overflow-visible flex flex-col justify-center bg-[#000000]"
        >
          {/* CircleBg expands warm skin color (#f0efeb) over black background */}
          <AppCircleBg color="#f0efeb" triggerRef={containerRef} />

          <div className="w-full px-6 sm:px-14 lg:px-24 z-10">
            {/* Header Read Title */}
            <div className="mb-12">
              <AppReadTitle
                text={["・", isDe ? "AUSGEWÄHLTE PROJEKTE" : "SELECTED PROJECTS"]}
                className="text-[#16181f]"
                dotColor="#16181f"
              />
            </div>

            {/* Horizontal Line Flanked by 2 BounceLine Cables */}
            <div className="relative w-full py-8">
              {/* Top BounceLine */}
              <div className="absolute top-0 inset-x-0 pointer-events-none z-20">
                <BounceLine strokeColor="#16181f" strokeWidth={1.5} className="opacity-60" />
              </div>

              {/* Horizontal Scrolling Projects Stream */}
              <div className="relative w-full overflow-visible py-6">
                <div
                  ref={trackRef}
                  className="flex items-center gap-16 sm:gap-24 w-max will-change-transform"
                >
                  {SIDE_PROJECTS.map((item, index) => {
                    const isHover = hoveredIdx === index;
                    const isOther = hoveredIdx !== null && !isHover;

                    return (
                      <div
                        key={item.id}
                        onMouseEnter={() => setHoveredIdx(index)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        onClick={() => handleProjectClick(item.id)}
                        className="group relative flex items-center gap-16 sm:gap-24 cursor-pointer"
                      >
                        {/* Project Name in Monumental Six Caps 135px */}
                        <div className="relative">
                          <span
                            style={{
                              opacity: isOther ? 0.35 : 1,
                              transition: "opacity 0.3s ease, color 0.3s ease",
                            }}
                            className="font-sixcaps text-[90px] sm:text-[120px] lg:text-[145px] leading-none text-[#16181f] group-hover:text-cyan-700 uppercase whitespace-nowrap block select-none"
                          >
                            {item.name}
                          </span>

                          {/* Pop-out Angled Image 1 (Tilted -8deg on the left top) */}
                          <div
                            style={{
                              transform: isHover
                                ? "scale(1) rotate(-8deg) translateY(-60px)"
                                : "scale(0) rotate(-20deg) translateY(0px)",
                              opacity: isHover ? 1 : 0,
                              transition: "transform 0.35s cubic-bezier(0.44, 0.05, 0.17, 1), opacity 0.25s ease",
                            }}
                            className="absolute -top-12 -left-24 w-[240px] sm:w-[280px] h-[165px] sm:h-[190px] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.45)] pointer-events-none z-50 hidden md:block border border-black/10"
                          >
                            <img
                              src={item.img1}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Pop-out Angled Image 2 (Tilted +8deg on the right bottom) */}
                          <div
                            style={{
                              transform: isHover
                                ? "scale(1) rotate(8deg) translateY(60px)"
                                : "scale(0) rotate(20deg) translateY(0px)",
                              opacity: isHover ? 1 : 0,
                              transition: "transform 0.35s cubic-bezier(0.44, 0.05, 0.17, 1), opacity 0.25s ease",
                            }}
                            className="absolute -bottom-12 -right-24 w-[240px] sm:w-[280px] h-[165px] sm:h-[190px] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.45)] pointer-events-none z-50 hidden md:block border border-black/10"
                          >
                            <img
                              src={item.img2}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Dot circle separator between projects (project-item-circle in Hisami Kurita) */}
                        {index < SIDE_PROJECTS.length - 1 && (
                          <span className="w-4 h-4 rounded-full bg-[#16181f] shrink-0 select-none pointer-events-none opacity-80" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom BounceLine */}
              <div className="absolute bottom-0 inset-x-0 pointer-events-none z-20">
                <BounceLine strokeColor="#16181f" strokeWidth={1.5} className="opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal for interactive inspection */}
      <ProjectModal
        card={selectedCard}
        isDe={isDe}
        onClose={() => setSelectedCard(null)}
      />
    </>
  );
}
