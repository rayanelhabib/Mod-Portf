"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface HeroResumeButtonProps {
  href?: string;
  className?: string;
}

export function HeroResumeButton({
  href = "/cv.pdf",
  className = "",
}: HeroResumeButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ rotate: -3.5, y: 0 }}
      whileHover={{
        rotate: 0,
        y: -6,
        scale: 1.03,
        transition: { type: "spring", stiffness: 350, damping: 20 },
      }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-block select-none cursor-pointer ${className}`}
    >
      {/* Halo lumineux cyan au survol (Inspiré de 3D-Portfolio) */}
      <div className="absolute -inset-1 rounded-2xl bg-cyan-400/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

      {/* Carte-Bouton épurée (Style Hisami Kurita) */}
      <div className="relative flex items-center gap-3.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-md border border-black/10 group-hover:border-cyan-400/50 shadow-[0_15px_35px_-5px_rgba(22,24,31,0.08),0_5px_15px_rgba(0,0,0,0.03)] group-hover:shadow-[0_25px_50px_-8px_rgba(0,229,255,0.22)] transition-all duration-300">
        
        {/* Logo Resume.png */}
        <img
          src="/Resume.png"
          alt="Resume"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
        />

        {/* Mot Resume en typographie Six Caps monumentale */}
        <span className="font-sixcaps text-4xl sm:text-5xl text-[#16181f] leading-none tracking-tight">
          RESUME
        </span>

        {/* Indicateur d'ouverture propre et discret */}
        <div className="w-6 h-6 rounded-md bg-black/[0.04] group-hover:bg-cyan-500/10 flex items-center justify-center transition-colors ml-1">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#16181f]/60 group-hover:text-cyan-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

      </div>
    </motion.a>
  );
}
