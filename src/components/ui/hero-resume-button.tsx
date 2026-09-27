"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { PdfModal } from "./pdf-modal";

interface HeroResumeButtonProps {
  className?: string;
}

export function HeroResumeButton({
  className = "",
}: HeroResumeButtonProps) {
  const { lang } = useLanguage();
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const isGerman = lang === "de";
  const buttonText = isGerman ? "LEBENSLAUF" : "RESUME";
  const pdfUrl = isGerman ? "/lebenslauf.pdf" : "/cv_eng.pdf";
  const title = isGerman ? "Lebenslauf - Rayan El Habib" : "Resume - Rayan El Habib";

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsPdfOpen(true)}
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
        {/* Halo lumineux cyan au survol */}
        <div className="absolute -inset-1 rounded-2xl bg-cyan-400/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

        {/* Carte-Bouton Epurée */}
        <div className="relative flex items-center gap-3.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-md border border-black/10 group-hover:border-cyan-400/50 shadow-[0_15px_35px_-5px_rgba(22,24,31,0.08),0_5px_15px_rgba(0,0,0,0.03)] group-hover:shadow-[0_25px_50px_-8px_rgba(0,229,255,0.22)] transition-all duration-300">
          
          <img
            src="/Resume.png"
            alt={buttonText}
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
          />

          <span className="font-sixcaps text-4xl sm:text-5xl text-[#16181f] leading-none tracking-tight mt-1">
            {buttonText}
          </span>

          <div className="w-6 h-6 rounded-md bg-black/[0.04] group-hover:bg-cyan-500/10 flex items-center justify-center transition-colors ml-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#16181f]/40 group-hover:text-cyan-600 transition-colors" />
          </div>
        </div>
      </motion.button>

      <PdfModal 
        isOpen={isPdfOpen} 
        onClose={() => setIsPdfOpen(false)} 
        pdfUrl={pdfUrl}
        title={title}
      />
    </>
  );
}

