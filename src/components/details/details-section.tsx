"use client";

import React from "react";
import { IntroSection } from "@/components/about/intro-section";
import { AwardSection } from "@/components/about/award-section";
import { SideScrollReel } from "@/components/about/side-scroll-reel";
import { ContactSection } from "@/components/about/contact-section";

export function DetailsSection() {
  return (
    <section
      id="details"
      className="relative w-full bg-transparent text-[#16181f] select-none"
    >
      {/* 1. Hisami Kurita IntroSection (Expanding capsule + Six Caps banner + Editorial reveal) */}
      <IntroSection />

      {/* 2. Hisami Kurita AwardSection (Deep black stage + 60px Six Caps + Cursor follower CardAward) */}
      <AwardSection />

      {/* 3. Hisami Kurita SideScrollReel (CircleBg over black + 140px Six Caps stream + dual popout cards) */}
      <SideScrollReel />

      {/* 4. Hisami Kurita ContactSection (CircleBg + Monumental Six Caps CTA + Social Links) */}
      <ContactSection />
    </section>
  );
}
