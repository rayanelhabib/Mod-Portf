"use client";

import React, { useRef, useState } from "react";
import { AppCard, CardData } from "./app-card";
import { ProjectModal } from "./project-modal";
import { BounceLine } from "@/components/ui/bounce-line";
import { AppCircleBg } from "@/components/ui/app-circle-bg";
import { useLanguage } from "@/hooks/use-language";
import { ArrowUpRight } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export const CARDS_DATA: CardData[] = [
  {
    id: "rayocr-intel",
    num: "01",
    name: {
      en: "RayOCR Intell Engine",
      de: "RayOCR Intell Engine",
    },
    shortTitle: "RAYOCR",
    category: {
      en: "INTELLIGENT OCR & DOCUMENT EXTRACTION",
      de: "DOKUMENTENINTELLIGENZ & OCR",
    },
    desc: {
      en: "Ultra-low latency document parsing engine combining neural inference, SIMD vectorization, and WebGL interactive document inspection.",
      de: "Extrem latenzarme Dokumenten-Engine mit neuronaler Inferenz, SIMD-Vektorisierung und WebGL-Visualisierung.",
    },
    metrics: [
      { label: "Latency", value: "3.2ms" },
      { label: "Throughput", value: "1,450 doc/m" },
    ],
    tags: ["Rust", "ONNX", "SIMD", "WebGL"],
    terminalSnippet: "$ rayocr-cli --threads 8 --accel cuda\n[OK] AVX-512 SIMD active\n[OK] 42 pages in 134ms",
    liveUrl: "https://github.com/rayanelhabib/RayOCR_Intell",
    githubUrl: "https://github.com/rayanelhabib/RayOCR_Intell",
    rotate: -8,
    xspeed: 0.05,
    yspeed: 0.09,
    pos: {
      top: "4%",
      left: "6%",
    },
    shadowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: "kernel-ebpf-flow",
    num: "02",
    name: {
      en: "KernelFlow eBPF Telemetry",
      de: "KernelFlow eBPF Telemetrie",
    },
    shortTitle: "KERNEL",
    category: {
      en: "LINUX KERNEL OBSERVABILITY & TELEMETRY",
      de: "LINUX-KERNEL-TELEMETRIE",
    },
    desc: {
      en: "Sub-microsecond kernel socket probe & distributed packet inspector running directly on eBPF/XDP network hook layers.",
      de: "Sub-Mikrosekunden-Kernel-Socket-Prüfung und verteilte Paketanalyse auf eBPF/XDP-Ebene.",
    },
    metrics: [
      { label: "Hook Overhead", value: "< 0.18µs" },
      { label: "Line Rate", value: "10 Gbps" },
    ],
    tags: ["C", "eBPF / XDP", "Linux", "Go"],
    terminalSnippet: "$ sudo kernel-flow attach --mode xdp-drv\n[eBPF] JIT verified: 48 insns\n[OK] 1.4M pkts/s processed",
    githubUrl: "https://github.com/rayanelhabib",
    rotate: 7,
    xspeed: -0.05,
    yspeed: 0.12,
    pos: {
      top: "22%",
      right: "8%",
    },
    shadowColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    id: "nexus-kv-engine",
    num: "03",
    name: {
      en: "Nexus Distributed KV Store",
      de: "Nexus Verteilter KV-Speicher",
    },
    shortTitle: "NEXUS",
    category: {
      en: "DISTRIBUTED CONSENSUS & LSM STORAGE",
      de: "VERTEILTER KONSENS & SPEICHER",
    },
    desc: {
      en: "High-throughput Log-Structured Merge (LSM) storage engine with Raft quorum consensus and lock-free memory indexing.",
      de: "LSM-Speicher-Engine mit hohem Durchsatz, Raft-Konsens und sperrenfreier Speicher-Indexierung.",
    },
    metrics: [
      { label: "Throughput", value: "240K QPS" },
      { label: "Commit", value: "< 1.2ms" },
    ],
    tags: ["Rust", "Tokio", "Raft", "gRPC"],
    terminalSnippet: "$ nexus-cluster --nodes 5\n[RAFT] Leader elected for Term 84\n[BENCH] 240,812 writes/sec",
    githubUrl: "https://github.com/rayanelhabib",
    rotate: -11,
    xspeed: 0.07,
    yspeed: 0.10,
    pos: {
      top: "44%",
      left: "14%",
    },
    shadowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    id: "netmesh-p2p-overlay",
    num: "04",
    name: {
      en: "NetMesh Zero-Trust Overlay",
      de: "NetMesh Zero-Trust Netzwerk",
    },
    shortTitle: "NETMESH",
    category: {
      en: "PEER-TO-PEER MESH & ENCRYPTED PROTOCOLS",
      de: "PEER-TO-PEER-MESH & PROTOKOLLE",
    },
    desc: {
      en: "Decentralized mesh routing daemon with NAT hole-punching, WireGuard cryptographic noise handshakes & TUN/TAP adapters.",
      de: "Dezentrales Mesh-Routing mit NAT-Hole-Punching, WireGuard-Kryptographie und TUN/TAP-Adaptern.",
    },
    metrics: [
      { label: "Transit", value: "< 8.4ms" },
      { label: "Cipher", value: "ChaCha20" },
    ],
    tags: ["Go", "WireGuard", "P2P", "TUN/TAP"],
    terminalSnippet: "$ netmesh-daemon --join-peer 198.51.100.4\n[NOISE] Handshake complete\n[TUN0] 10.99.0.4/24 ready",
    githubUrl: "https://github.com/rayanelhabib",
    rotate: 9,
    xspeed: -0.06,
    yspeed: 0.14,
    pos: {
      top: "65%",
      right: "12%",
    },
    shadowColor: "rgba(20, 184, 166, 0.4)",
  },
  {
    id: "archive",
    num: "05",
    name: {
      en: "Systems Archive & Lab",
      de: "Systemarchiv & Labor",
    },
    shortTitle: "ARCVE",
    category: {
      en: "RESEARCH & EXPERIMENTAL PROTOTYPES",
      de: "FORSCHUNG & EXPERIMENTE",
    },
    desc: {
      en: "A dynamic archive of low-level systems prototypes, SIMD benchmarks, Linux kernel modules, and WebGL shader explorations.",
      de: "Ein Archiv von Low-Level-Prototypen, SIMD-Benchmarks, Linux-Kernel-Modulen und WebGL-Shadern.",
    },
    metrics: [
      { label: "Prototypes", value: "25+" },
      { label: "Open Source", value: "100%" },
    ],
    tags: ["Research", "C++", "eBPF", "WebGL"],
    terminalSnippet: "$ git clone https://github.com/rayanelhabib/archive\n[OK] 25 experimental modules loaded",
    githubUrl: "https://github.com/rayanelhabib",
    rotate: -4,
    xspeed: 0.04,
    yspeed: 0.11,
    pos: {
      top: "84%",
      left: "30%",
    },
    shadowColor: "rgba(244, 63, 94, 0.4)",
  },
];

export function ProjectsSection() {
  const { lang } = useLanguage();
  const isDe = lang === "de";

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const readTag = isDe ? "・ AUSGEWÄHLTE PROJEKTE" : "・ SELECTED PROJECTS";
  const marqueeText1 = isDe
    ? "HAUPTSÄCHLICH EINE AUSWAHL VON PROJEKTEN, AUF DIE ICH MICH KONZENTRIERT HABE."
    : "MAINLY A SELECTION OF PROJECTS THAT I HAVE FOCUSED ON.";
  const marqueeText2 = isDe
    ? "LOW-LEVEL KERNEL TELEMETRIE • VERTEILTE RUNTIMES • HIGH-PERFORMANCE SYSTEME •"
    : "LOW-LEVEL KERNEL TELEMETRY • DISTRIBUTED RUNTIMES • HIGH-PERFORMANCE COMPUTING •";

  return (
    <section
      id="projects"
      className="relative w-full bg-transparent text-[#16181f] pt-24 pb-20 overflow-hidden select-none border-t border-[#e5e7eb]"
    >
      {/* Hisami Kurita AppCircleBg: soft cool platinum circle background */}
      <AppCircleBg color="#f0f5fa" triggerRef={containerRef} scrub={true} />

      {/* 1. Hisami Kurita Header with Double Loop Text & BounceLine */}
      <div className="w-full px-6 sm:px-16 md:px-20 lg:pl-36 lg:pr-14 max-w-screen-2xl mx-auto mb-8 relative z-10">
        
        {/* Top Read Title Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.24em] font-semibold text-cyan-800 bg-white/80 px-3 py-1 rounded-full border border-cyan-300 shadow-xs">
              {readTag}
            </span>
            <span className="font-mono text-xs text-[#16181f]/40 tracking-wider">
              [DRAGGABLE TACTILE FIELD]
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-[#16181f]/40 uppercase tracking-widest">
            (TRY THROWING CARDS WITH MOUSE)
          </span>
        </div>

        {/* Dual Marquee Track bounded by 2 BounceLines */}
        <div className="w-full flex flex-col gap-2 my-6">
          <BounceLine
            strokeColor="#16181f"
            strokeWidth={1.5}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />

          {/* Marquee Track 1 */}
          <div className="w-full overflow-hidden whitespace-nowrap py-1">
            <div className="inline-block animate-loop-scroll font-sixcaps text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#16181f] uppercase">
              <span className="mx-6">{marqueeText1}</span>
              <span className="mx-6 text-cyan-600">✦</span>
              <span className="mx-6">{marqueeText1}</span>
              <span className="mx-6 text-cyan-600">✦</span>
            </div>
          </div>

          <BounceLine
            strokeColor="#16181f"
            strokeWidth={1.2}
            className="opacity-40 hover:opacity-100 transition-opacity"
          />

          {/* Marquee Track 2 (Reverse) */}
          <div className="w-full overflow-hidden whitespace-nowrap py-1">
            <div className="inline-block animate-loop-scroll-reverse font-sixcaps text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#16181f]/60 uppercase">
              <span className="mx-6">{marqueeText2}</span>
              <span className="mx-6 text-cyan-600">✦</span>
              <span className="mx-6">{marqueeText2}</span>
              <span className="mx-6 text-cyan-600">✦</span>
            </div>
          </div>

          <BounceLine
            strokeColor="#16181f"
            strokeWidth={1.5}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>

      </div>

      {/* 2. Hisami Kurita Scattered Cards Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-[1800px] sm:h-[1900px] lg:h-[2100px] max-w-screen-2xl mx-auto px-4 overflow-hidden z-10"
      >
        {CARDS_DATA.map((card, idx) => (
          <AppCard
            key={card.id}
            card={card}
            index={idx}
            isDe={isDe}
            onSelect={(c) => setSelectedCard(c)}
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* 3. Bottom CTA */}
      <div className="w-full px-6 sm:px-16 md:px-20 lg:pl-36 lg:pr-14 max-w-screen-2xl mx-auto mt-12 pt-8 border-t border-[#16181f]/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#16181f]/70">
            {isDe ? "Alle Karten sind frei beweglich & werfbar" : "Cards are physically draggable and throwable"}
          </span>
        </div>

        <a
          href="https://github.com/rayanelhabib"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#16181f] text-white hover:bg-cyan-500 hover:text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 shadow-md group"
        >
          <GithubIcon className="w-4 h-4" />
          <span>{isDe ? "GitHub Repositorys" : "Explore All On GitHub"}</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* 4. Interactive Project Inspection Drawer / Modal with CardWorks */}
      <ProjectModal
        card={selectedCard}
        isDe={isDe}
        onClose={() => setSelectedCard(null)}
      />
    </section>
  );
}
