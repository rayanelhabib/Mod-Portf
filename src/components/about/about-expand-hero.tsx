"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppCircleBg } from "@/components/ui/app-circle-bg";
import { BounceLine } from "@/components/ui/bounce-line";
import { useLanguage } from "@/hooks/use-language";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutExpandHero() {
  const { lang } = useLanguage();
  const isDe = lang === "de";

  const triggerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLDivElement>(null);
  const tickerTextRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Scrubbed Image Expansion & Text Reveal (Exact Hisami Kurita IntroSection.vue)
  useEffect(() => {
    if (!triggerRef.current || !imageWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Scrubbed Image Expansion: Starts small pill and expands to 100% full width
      gsap.fromTo(
        imageWrapperRef.current,
        {
          width: "300px",
          height: "200px",
          borderRadius: "36px",
          scale: 0.9,
        },
        {
          width: "100%",
          height: "580px",
          borderRadius: "16px",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 75%",
            end: "center center",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );

      // 2. Reveal ABOUT title & text inside the expanding frame
      if (textOverlayRef.current) {
        gsap.fromTo(
          textOverlayRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 55%",
              end: "center center",
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Parallax background horizontal ticker scrub
      if (tickerTextRef.current) {
        gsap.fromTo(
          tickerTextRef.current,
          { x: 180 },
          {
            x: -240,
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 85%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
      }
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const readTag = isDe ? "・ SYSTEMARCHITEKTUR & PHILOSOPHIE" : "・ DETAILS & ARCHITECTURE";
  const title1 = isDe ? "LOW-LEVEL INGENIEURSKUNST" : "DETERMINISTIC SYSTEMS";
  const title2 = isDe ? "ARCHITEKTONISCHE STRENGE" : "ARCHITECTURAL RIGOR";

  return (
    <div ref={triggerRef} className="relative w-full flex flex-col select-none pt-6 pb-12 overflow-hidden">
      
      {/* 1. Hisami Kurita AppCircleBg: expanding warm blush/cream circle background */}
      <AppCircleBg color="#f7f3ee" triggerRef={triggerRef} />

      {/* Top Read Title Badge */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <span className="font-mono text-xs uppercase tracking-[0.24em] font-semibold text-cyan-800 bg-white/80 px-3 py-1 rounded-full border border-cyan-300 shadow-xs">
          {readTag}
        </span>
        <span className="font-mono text-xs text-[#16181f]/40 tracking-wider">
          [ABOUT &amp; EXPANSION]
        </span>
      </div>

      {/* Kinetic Tilted Six Caps Manifesto (AppTextAnimation style in Hisami Kurita) */}
      <div ref={aboutTitleRef} className="flex flex-col mb-4 relative z-10">
        <div className="overflow-hidden">
          <h2 className="font-sixcaps text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] tracking-tight text-[#16181f] leading-[0.80] uppercase transform -rotate-1 origin-left">
            {title1}
          </h2>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 mt-1 pl-6 sm:pl-14 md:pl-24 overflow-hidden">
          <h2 className="font-sixcaps text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] tracking-tight text-cyan-700 leading-[0.80] uppercase whitespace-nowrap transform rotate-1 origin-left">
            {title2}
          </h2>
          <div className="flex-1 hidden md:block">
            <BounceLine
              strokeColor="#0e7490"
              strokeWidth={1.5}
              className="opacity-50 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Background Scrubbed Text Track (intro-read-text in Hisami Kurita) */}
      <div className="w-full overflow-hidden my-3 py-1 relative z-10">
        <div
          ref={tickerTextRef}
          className="font-sixcaps text-4xl sm:text-5xl text-[#16181f]/20 uppercase whitespace-nowrap will-change-transform"
        >
          LOW-LATENCY KERNEL ARCHITECTURES • DISTRIBUTED RUNTIMES • DETERMINISTIC COMPUTING • ZERO-COPY I/O •
        </div>
      </div>

      {/* 2. Image Expansion Stage (Starts small, expands to full width as you scroll, revealing ABOUT text) */}
      <div className="relative w-full my-6 flex justify-center items-center overflow-hidden min-h-[600px] z-10">
        <div
          ref={imageWrapperRef}
          className="relative overflow-hidden shadow-[0_30px_70px_-15px_rgba(22,24,31,0.25)] border border-[#16181f]/10 mx-auto will-change-transform bg-[#121319]"
        >
          {/* Photo of Rayan */}
          <img
            src="/profile.jpg"
            alt="Rayan El Habib"
            className="w-full h-full object-cover object-center filter grayscale contrast-105"
          />

          {/* Atmospheric dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* ABOUT text revealed right on top of the expanding image */}
          <div
            ref={textOverlayRef}
            className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-between text-white z-10 pointer-events-none"
          >
            {/* Top Badge inside Image */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-400 font-bold bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                ・ ABOUT RAYAN
              </span>
              <span className="font-mono text-xs text-white/60">
                SYSTEMS RESEARCH
              </span>
            </div>

            {/* Bottom Giant Typography & Bio snippet */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 block mb-1">
                  // LEAD ARCHITECT
                </span>
                <h3 className="font-sixcaps text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.82]">
                  Rayan El Habib
                </h3>
              </div>
              <p className="max-w-md font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                {isDe
                  ? "Spezialisiert auf Linux-Kernel-Interna, eBPF/XDP-Netzwerktreiber, lock-free Rust-Runtimes und WebGL-Visualisierungen."
                  : "Specializing in Linux kernel internals, eBPF/XDP network drivers, lock-free Rust runtimes, and hardware-accelerated WebGL."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Systems Philosophy Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 pb-8 border-b border-[#16181f]/10 relative z-10">
        <div className="lg:col-span-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#16181f]/60 block mb-2">
            {isDe ? "DIE INGENIEURSPHILOSOPHIE" : "THE SYSTEMS PHILOSOPHY"}
          </span>
          <span className="text-xl sm:text-2xl font-sans font-medium text-[#16181f] leading-snug">
            {isDe
              ? "Software ist am schnellsten und zuverlässigsten, wenn man die Hardware versteht, auf der sie läuft."
              : "Software achieves peak velocity and determinism when architected with deep reverence for the underlying hardware."}
          </span>
        </div>

        <div className="lg:col-span-8 flex flex-col justify-center">
          <p className="font-sans text-sm sm:text-base text-[#16181f]/80 leading-relaxed font-light mb-4">
            {isDe
              ? "Mein ingenieurtechnischer Schwerpunkt liegt auf der Schnittstelle zwischen Betriebssystemkern und hochverteilten Anwendungen. Ob es um das Abfangen von Netzwerkpaketen im Linux-Kernel via eBPF/XDP, die Implementierung sperrenfreier Speicher-Engines in Rust oder die Orchestrierung synchroner Inferenzpipelines geht: Jede Zeile Code zielt auf minimale Latenz, Speichersicherheit und architektonische Eleganz ab."
              : "My engineering focus bridges the boundary between operating system kernels and distributed, high-throughput applications. Whether capturing network packets directly in the Linux kernel via eBPF/XDP, crafting lock-free LSM storage engines in Rust, or orchestrating sub-millisecond document neural inference: every system is built for determinism, memory safety, and uncompromising architectural elegance."}
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#16181f]/60 leading-relaxed font-light">
            {isDe
              ? "Verbindet low-level Performance mit modernen interaktiven Oberflächen (WebGL, Shaders) für ganzheitliche High-End-Erlebnisse."
              : "Uniting low-level bare-metal systems performance with fluid creative computing (WebGL, Shaders) to build complete end-to-end digital experiences."}
          </p>
        </div>
      </div>

    </div>
  );
}
