"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface BounceLineProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export function BounceLine({
  className = "",
  strokeColor = "currentColor",
  strokeWidth = 1.2,
}: BounceLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState<number>(800);
  const [pathY, setPathY] = useState<number>(80);
  const animRef = useRef<gsap.core.Tween | null>(null);

  const baseLine = 80;
  const amplitude = 0.08;

  // Responsive width tracking
  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth || 800);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;

    if (animRef.current) animRef.current.kill();

    const targetY =
      (offsetY / rect.height - 0.5) *
        (rect.height + rect.width) *
        amplitude +
      baseLine;

    const proxy = { y: pathY };
    animRef.current = gsap.to(proxy, {
      duration: 0.25,
      ease: "power1.out",
      y: targetY,
      onUpdate: () => setPathY(proxy.y),
    });
  };

  const handleMouseLeave = () => {
    if (animRef.current) animRef.current.kill();

    const proxy = { y: pathY };
    animRef.current = gsap.to(proxy, {
      duration: 1.1,
      ease: "elastic.out(1, 0.3)",
      y: baseLine,
      onUpdate: () => setPathY(proxy.y),
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[32px] flex items-center overflow-visible select-none ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} 160`}
        preserveAspectRatio="none"
        className="w-full h-[160px] absolute -top-[64px] left-0 cursor-pointer overflow-visible z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <path
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d={`M 0,80 Q ${width / 2},${pathY} ${width},80`}
          className="transition-colors duration-200"
        />
      </svg>
    </div>
  );
}
