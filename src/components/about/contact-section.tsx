"use client";

import React, { useRef } from "react";
import { AppCircleBg } from "@/components/ui/app-circle-bg";
import { AppReadTitle } from "@/components/ui/app-read-title";
import { BounceLine } from "@/components/ui/bounce-line";
import { useLanguage } from "@/hooks/use-language";
import { ArrowUpRight, Send } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.864 9.864 0 0112 21.427c-.339-.036-.677-.087-1.011-.153A10.016 10.016 0 012 12.017C2 6.484 6.477 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export function ContactSection() {
  const { lang } = useLanguage();
  const isDe = lang === "de";
  const containerRef = useRef<HTMLDivElement>(null);

  const contactTitle = isDe
    ? "LASS UNS ETWAS ZUSAMMENBAUEN"
    : "LET'S BUILD DETERMINISTIC SYSTEMS";

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full bg-[#f0efeb] text-[#16181f] pt-32 pb-20 px-6 sm:px-14 lg:px-24 overflow-hidden select-none"
    >
      {/* CircleBg expands peach/skin transition circle */}
      <AppCircleBg color="#eae0cc" triggerRef={containerRef} />

      <div className="w-full max-w-screen-2xl mx-auto relative z-10">
        {/* Header Read Title */}
        <div className="mb-12">
          <AppReadTitle
            text={["・", isDe ? "KONTAKT" : "SAY HI"]}
            className="text-[#16181f]"
            dotColor="#d32254"
          />
        </div>

        {/* Monumental Six Caps Contact Title */}
        <div className="mb-16">
          <h2 className="font-sixcaps text-[11vw] sm:text-[9vw] lg:text-[8vw] leading-[0.82] text-[#16181f] uppercase tracking-tight max-w-5xl">
            {contactTitle}
          </h2>
        </div>

        {/* Cable Separator */}
        <div className="w-full my-12">
          <BounceLine strokeColor="#16181f" strokeWidth={1.5} className="opacity-40" />
        </div>

        {/* Direct Email Link & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          {/* Big Email */}
          <div className="md:col-span-8 flex flex-col">
            <span className="font-sans text-xs tracking-widest uppercase text-[#16181f]/60 mb-2">
              {isDe ? "// DIREKTE SYSTEMANFRAGEN" : "// DIRECT INQUIRIES"}
            </span>
            <a
              href="mailto:contact@rayanelhabib.com"
              className="group font-sixcaps text-5xl sm:text-7xl lg:text-[85px] leading-none text-[#16181f] hover:text-cyan-700 transition-colors uppercase inline-flex items-center gap-4"
            >
              <span>RAYAN.ELHABIB@DEV.COM</span>
              <ArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 text-[#16181f] group-hover:text-cyan-700 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </a>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 flex flex-col md:items-end gap-4 font-sans text-xs tracking-wider uppercase font-semibold">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-700 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB // OPEN SOURCE</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-700 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN // PROFESSIONAL</span>
            </a>
            <a
              href="/Resume.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>RESUME // SYSTEMS CV</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-24 pt-8 border-t border-[#16181f]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-[#16181f]/60 tracking-wider">
          <span>&copy; {new Date().getFullYear()} RAYAN EL HABIB. ALL RIGHTS RESERVED.</span>
          <span>DESIGN CRAFTED WITH INSPIRATION FROM HISAMI KURITA (2022).</span>
        </div>
      </div>
    </footer>
  );
}
