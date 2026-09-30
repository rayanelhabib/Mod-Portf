"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppCircleBg } from "@/components/ui/app-circle-bg";
import { AppReadTitle } from "@/components/ui/app-read-title";
import { useLanguage } from "@/hooks/use-language";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function IntroSection() {
  const { lang } = useLanguage();
  const isDe = lang === "de";

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bannerTextRef = useRef<HTMLParagraphElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const photoParallaxRef = useRef<HTMLDivElement>(null);
  const textStageRef = useRef<HTMLDivElement>(null);

  // Exact Hisami Kurita IntroSection scroll timeline:
  // Container height ~2600px, wrapper pinned 100vh.
  // 1. AppCircleBg extends.
  // 2. Banner text moves across.
  // 3. Capsule starts small (width 220px, height 340px, borderRadius 40px)
  //    and smoothly expands in-place to full viewport (width 100%, height 100%, borderRadius 0).
  // 4. Content inside reveals with editorial elegance.
  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current || !capsuleRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2200px",
          pin: wrapperRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Horizontal banner text translates across screen
      if (bannerTextRef.current) {
        tl.fromTo(
          bannerTextRef.current,
          { x: "35vw" },
          { x: "-45vw", ease: "none" },
          0
        );
      }

      // 2. Capsule expands from small rounded pill to full screen
      tl.fromTo(
        capsuleRef.current,
        {
          width: "240px",
          height: "360px",
          borderRadius: "44px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
        },
        {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          ease: "power2.inOut",
        },
        0.05
      );

      // 3. Image parallax inside capsule
      if (photoParallaxRef.current) {
        tl.fromTo(
          photoParallaxRef.current,
          { y: 120 },
          { y: -120, ease: "none" },
          0
        );
      }

      // 4. Text reveal inside photo
      if (textStageRef.current) {
        tl.fromTo(
          textStageRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.35
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const bannerText = isDe
    ? "SYSTEMARCHITEKTUR • LOW-LEVEL INGENIEURSKUNST • SYSTEMARCHITEKTUR • "
    : "SYSTEMS ARCHITECTURE • LOW-LEVEL INGENUITY • SYSTEMS ARCHITECTURE • ";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[2600px] select-none"
    >
      {/* Pinned 100vh viewport stage */}
      <div
        ref={wrapperRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-white"
      >
        {/* Expanding circle background transition (Hisami Kurita about-intro) */}
        <AppCircleBg color="#f0efeb" triggerRef={containerRef} />

        {/* Monumental Six Caps horizontal banner text */}
        <p
          ref={bannerTextRef}
          className="absolute inset-y-0 my-auto flex items-center font-sixcaps text-[22vw] leading-none text-[#d32254]/20 uppercase whitespace-nowrap pointer-events-none will-change-transform z-10"
        >
          {bannerText}
        </p>

        {/* Expanding Rounded Capsule (intro-bg in Hisami Kurita) */}
        <div
          ref={capsuleRef}
          className="relative overflow-hidden z-20 will-change-transform bg-[#101012] flex items-center justify-center"
        >
          {/* Photo with subtle parallax and dark cinematic grading */}
          <div
            ref={photoParallaxRef}
            className="absolute -top-[15%] left-0 w-full h-[130%] pointer-events-none will-change-transform"
          >
            <img
              src="/profile.jpg"
              alt="Rayan El Habib"
              className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-90"
            />
            {/* Cinematic dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/85" />
          </div>

          {/* Reveal content inside expanded photo (Hisami Kurita intro-title & intro-note) */}
          <div
            ref={textStageRef}
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 z-10 text-white pointer-events-none will-change-transform"
          >
            {/* Top Header Badge */}
            <div className="flex items-center justify-between w-full">
              <AppReadTitle
                text={["・", isDe ? "ÜBER MICH" : "ABOUT"]}
                className="text-white"
                dotColor="#38bdf8"
              />
              <span className="font-sans text-[11px] tracking-widest uppercase text-white/50">
                SYSTEMS &amp; KERNEL SPECIALIST
              </span>
            </div>

            {/* Right-aligned Monumental Six Caps typography (Hisami Kurita intro-title) */}
            <div className="w-full flex justify-end my-auto">
              <div className="text-right flex flex-col items-end">
                <h2 className="font-sixcaps text-[11vw] sm:text-[9vw] lg:text-[7.5vw] text-[#eae0cc] leading-[0.82] uppercase tracking-tight">
                  <span className="block transform rotate-1 origin-right">
                    {isDe ? "SYSTEME & KERNEL" : "HI, I SPECIALIZE IN"}
                  </span>
                  <span className="block transform -rotate-1 origin-right text-[#ffffff]">
                    {isDe ? "IN REINSTER FORM" : "LOW-LEVEL SYSTEMS &"}
                  </span>
                  <span className="block transform rotate-1 origin-right text-[#38bdf8]">
                    {isDe ? "HIGH-PERFORMANCE RUNTIMES" : "KERNEL PROGRAMMING"}
                  </span>
                  <span className="block transform -rotate-1 origin-right">
                    {isDe ? "DETERMINISTISCHER CODE" : "BUILDING RUNTIMES IN"}
                  </span>
                  <span className="block transform rotate-1 origin-right text-[#eae0cc]">
                    {isDe ? "IN RUST & LINUX." : "RUST, C & LINUX."}
                  </span>
                </h2>
              </div>
            </div>

            {/* Editorial Statement at bottom (Hisami Kurita intro-note with text-indent) */}
            <div className="w-full flex justify-end">
              <p className="max-w-2xl font-sans text-xs sm:text-sm text-[#eae0cc]/80 leading-relaxed tracking-wide font-light text-left pl-6 border-l border-white/20">
                {isDe
                  ? "DETERMINISTISCHE SYSTEME ERFORDERN KOMPROMISSLOSE PRÄZISION. VON ZERO-COPY RINGPUFFERN UND LOCK-FREE QUEUES BIS HIN ZU HARDWAREBESCHLEUNIGTEN WEBGL-INTERFACES IST JEDE OPERATION FÜR MINIMALE LATENZ UND FORMAL VERIFIZIERTE SICHERHEIT ENTWICKELT."
                  : "DETERMINISTIC SYSTEMS DEMAND UNCOMPROMISING PRECISION. FROM ZERO-COPY RING BUFFERS AND LOCK-FREE QUEUES TO HARDWARE-ACCELERATED COMPUTING INTERFACES, EVERY OPERATION IS ARCHITECTED FOR LOWEST LATENCY AND VERIFIED SAFETY."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
