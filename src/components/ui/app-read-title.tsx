"use client";

import React from "react";

interface AppReadTitleProps {
  text: string[];
  className?: string;
  dotColor?: string;
}

export function AppReadTitle({
  text,
  className = "",
  dotColor = "currentColor",
}: AppReadTitleProps) {
  const bullet = text[0] || "・";
  const label = text.slice(1).join(" ");

  return (
    <span
      className={`inline-flex items-center gap-2 font-sans text-xs tracking-[0.06em] uppercase font-bold select-none ${className}`}
    >
      <span
        style={{ color: dotColor }}
        className="text-2xl leading-none -mt-1 font-normal select-none"
      >
        {bullet}
      </span>
      <span>{label}</span>
    </span>
  );
}
