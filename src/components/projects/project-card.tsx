"use client";

import React, { useRef, useState } from "react";
import { ProjectItem } from "@/data/projects-data";
import { useLanguage } from "@/hooks/use-language";
import { ArrowUpRight, Terminal, Cpu, Activity } from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { lang } = useLanguage();
  const isDe = lang === "de";

  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Danilo De Marco & Hisami Kurita subtle 3D card tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates -1 to 1
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    // Soft spring tilt max 4 degrees (zero CPU lag)
    setRotate({
      x: -yPct * 4,
      y: xPct * 4,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="group relative w-full bg-[#fbfbfb] hover:bg-white border border-[#e5e7eb] hover:border-[#16181f]/40 rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_54px_rgba(22,24,31,0.08)] overflow-hidden"
    >
      {/* Subtle ambient accent glow behind card */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: project.accentGlow }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: Numbering, Category, Monumental Title, Description */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          
          <div>
            {/* Top Meta Line: Number + Category */}
            <div className="flex items-center gap-4 mb-3 sm:mb-4">
              <span className="font-mono text-xs font-semibold text-cyan-600 tracking-wider">
                [{project.num}]
              </span>
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#16181f]/60 font-medium">
                {isDe ? project.category.de : project.category.en}
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-wider text-[#16181f]/40">
                {project.period}
              </span>
            </div>

            {/* Monumental Six Caps Project Title */}
            <h3 className="font-sixcaps text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#16181f] group-hover:text-cyan-600 transition-colors duration-300 leading-[0.85] uppercase mb-4 sm:mb-5">
              {isDe ? project.title.de : project.title.en}
            </h3>

            {/* Role & Tagline */}
            <div className="mb-4">
              <span className="font-sans text-xs uppercase tracking-[0.16em] font-semibold text-[#16181f]/80 block mb-1">
                {isDe ? project.role.de : project.role.en}
              </span>
              <p className="font-sans text-sm sm:text-base text-[#16181f]/80 leading-relaxed font-normal">
                {isDe ? project.tagline.de : project.tagline.en}
              </p>
            </div>

            {/* Deep Description */}
            <p className="font-sans text-xs sm:text-sm text-[#16181f]/60 leading-relaxed mb-6 font-light">
              {isDe ? project.description.de : project.description.en}
            </p>
          </div>

          {/* Tech stack badges + Metrics */}
          <div>
            {/* Tags Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] sm:text-xs px-2.5 py-1 rounded-md border border-[#e5e7eb] bg-white text-[#16181f]/80 font-medium shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Live CTA links */}
            <div className="flex items-center gap-4 pt-2 border-t border-[#16181f]/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#16181f] text-white hover:bg-cyan-500 hover:text-black font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 shadow-sm"
                >
                  <span>{isDe ? "Live Demo" : "Live Demo"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#16181f]/20 bg-white hover:border-[#16181f] text-[#16181f] font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>{isDe ? "Quellcode" : "Repository"}</span>
              </a>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive High-Tech Telemetry & Metrics Frame */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Hardware & Systems Metrics Panel */}
          <div className="bg-[#121319] text-white rounded-xl p-5 border border-white/10 shadow-lg font-mono">
            
            {/* Window title bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] text-white/50 ml-2 tracking-widest uppercase">
                  telemetry.sys
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                <Activity className="w-3 h-3 animate-pulse" />
                <span>LIVE</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {project.metrics.map((metric, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider mb-1 block">
                    {isDe ? metric.label.de : metric.label.en}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Terminal Shell Snippet */}
            <div className="bg-black/60 rounded-lg p-3 border border-white/5 text-[11px] leading-relaxed text-white/80 select-all overflow-x-auto">
              <div className="flex items-center gap-2 text-white/40 mb-1.5">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] uppercase tracking-wider">Kernel Terminal Output</span>
              </div>
              <pre className="font-mono text-emerald-300 text-[10.5px] leading-5 whitespace-pre-wrap">
                {project.terminalSnippet}
              </pre>
            </div>

          </div>

          {/* Quick Architecture Feature Pill */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#f3f4f6] rounded-xl border border-[#e5e7eb] font-mono text-[11px] text-[#16181f]/70">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-600" />
              <span className="uppercase tracking-wider font-semibold">Engine Architecture:</span>
            </div>
            <span className="text-[#16181f] font-medium">Asynchronous / Lock-Free</span>
          </div>

        </div>

      </div>
    </article>
  );
}
