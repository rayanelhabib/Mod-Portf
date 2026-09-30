"use client";

import React from "react";

export interface AwardItem {
  id: string;
  group: string;
  title: string;
  rank: string;
  shortCode: string;
  date: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  logo: string;
}

interface CardAwardProps {
  award: AwardItem;
  className?: string;
}

export function CardAward({ award, className = "" }: CardAwardProps) {
  return (
    <div
      style={{ width: "244px", height: "330px" }}
      className={`relative select-none pointer-events-none shrink-0 ${className}`}
    >
      <article
        style={{
          backgroundColor: award.bgColor,
          width: "244px",
          height: "330px",
        }}
        className="relative p-[26px_20px] rounded-[12px] shadow-[0_30px_70px_rgba(0,0,0,0.55)] flex flex-col justify-between overflow-hidden border border-white/30 shrink-0"
      >
        {/* Top Header Badge & Logo */}
        <div className="relative z-10">
          <div className="h-8 mb-3 flex items-center">
            <img
              src={award.logo}
              alt={award.group}
              className="max-h-7 max-w-[130px] object-contain block drop-shadow-xs"
            />
          </div>

          {/* Rank & Date */}
          <p
            style={{ color: award.accentColor }}
            className="font-sans text-[11px] font-extrabold tracking-wider uppercase leading-tight m-0 mb-1"
          >
            {award.rank}
          </p>
          <p
            style={{ color: award.accentColor }}
            className="font-sans text-[11px] font-medium tracking-wide m-0 mb-2.5 opacity-90"
          >
            {award.date}
          </p>

          {/* Award Title */}
          <h2
            style={{ color: award.textColor }}
            className="font-sans text-[13px] font-bold leading-snug max-w-[200px] m-0"
          >
            {award.title}
          </h2>
        </div>

        {/* Monumental Six Caps bottom abbreviation (Exact Hisami Kurita CardAward title-wrapper-05) */}
        <div className="relative -mx-[20px] -mb-[26px] overflow-hidden">
          <span
            style={{ color: award.accentColor }}
            className="font-sixcaps text-[128px] leading-[0.72] uppercase block whitespace-nowrap px-4 select-none tracking-tight"
          >
            {award.shortCode}
          </span>
        </div>
      </article>
    </div>
  );
}
