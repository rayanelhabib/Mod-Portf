"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AppCircleBgProps {
  color?: string;
  triggerRef?: React.RefObject<HTMLDivElement | null>;
  scrub?: boolean;
  className?: string;
}

export function AppCircleBg({
  color = "#f4f0ea",
  triggerRef,
  scrub = false,
  className = "",
}: AppCircleBgProps) {
  const circleElementRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!circleElementRef.current) return;

    const targetTrigger = triggerRef?.current || containerRef.current;
    if (!targetTrigger) return;

    const ctx = gsap.context(() => {
      if (scrub) {
        // Scrubbed expansion directly tied to scroll progress
        gsap.fromTo(
          circleElementRef.current,
          { scale: 0 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: targetTrigger,
              start: "top 85%",
              end: "center 40%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      } else {
        // Elastic smooth expansion when entering view (like Hisami Kurita toExtend)
        gsap.fromTo(
          circleElementRef.current,
          { scale: 0 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: targetTrigger,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [triggerRef, scrub]);

  return (
    <span
      ref={containerRef}
      className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] overflow-hidden -z-10 ${className}`}
    >
      <span
        ref={circleElementRef}
        style={{ backgroundColor: color }}
        className="block w-full h-full rounded-full will-change-transform shadow-[inset_0_0_120px_rgba(0,0,0,0.02)]"
      />
    </span>
  );
}
