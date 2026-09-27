"use client";

import React from "react";
import { SystemJoin } from "../types";

interface SystemMessageProps {
  item: SystemJoin;
}

export function SystemMessageRow({ item }: SystemMessageProps) {
  return (
    <div className="flex items-center gap-3 py-2 px-1 select-none text-[#16181f]/40 text-[11px]">
      <div className="flex-1 h-px bg-black/[0.08]" />
      <span className="shrink-0 font-medium">
        {item.username} {item.flag} visited
      </span>
      <div className="flex-1 h-px bg-black/[0.08]" />
    </div>
  );
}
