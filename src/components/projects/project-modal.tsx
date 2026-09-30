"use client";

import React, { useEffect } from "react";
import { CardData } from "./app-card";
import { CardWorks } from "./card-works";
import { X, Terminal, Cpu, Activity, ArrowUpRight } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface ProjectModalProps {
  card: CardData | null;
  isDe: boolean;
  onClose: () => void;
}

export function ProjectModal({ card, isDe, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (card) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [card, onClose]);

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white text-[#16181f] rounded-3xl p-6 sm:p-10 border border-[#e5e7eb] shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#f3f4f6] hover:bg-[#16181f] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Project Metadata, Six Caps Title, Description & Telemetry */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2 font-mono text-xs text-cyan-600 font-bold">
                <span>[{card.num}]</span>
                <span className="uppercase tracking-[0.2em] text-[#16181f]/60 font-semibold">
                  {isDe ? card.category.de : card.category.en}
                </span>
              </div>

              <h2 className="font-sixcaps text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.82] text-[#16181f] uppercase mb-4">
                {isDe ? card.name.de : card.name.en}
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#16181f]/80 leading-relaxed mb-6 font-normal">
                {isDe ? card.desc.de : card.desc.en}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-[#f3f4f6] text-[#16181f]/80 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Terminal Snippet */}
              <div className="bg-[#121319] text-white rounded-xl p-4 font-mono text-xs border border-white/10 shadow-lg mb-6">
                <div className="flex items-center gap-2 text-white/40 mb-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] uppercase tracking-wider">Engine Shell Output</span>
                </div>
                <pre className="text-emerald-300 text-[11px] leading-relaxed whitespace-pre-wrap">
                  {card.terminalSnippet}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <a
                  href={card.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16181f] text-white hover:bg-cyan-500 hover:text-black font-sans text-xs uppercase tracking-widest font-semibold transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{isDe ? "GitHub Quellcode" : "GitHub Repository"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Floating Hisami Kurita CardWorks component */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <CardWorks
              shadowColor={card.shadowColor}
              externalLink={card.liveUrl || card.githubUrl}
              projectName={isDe ? card.name.de : card.name.en}
              isDe={isDe}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
