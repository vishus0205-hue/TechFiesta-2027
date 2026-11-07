"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Homepage from "@/components/Homepage/Homepage";
import TechfestHUD from "@/components/TechfestHUD/TechfestHUD";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 80;

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flashOverlayRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const portalHeroRef = useRef<HTMLDivElement | null>(null);
  const firstFrameFallbackRef = useRef<HTMLImageElement | null>(null);
  const fixedBgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const flashOverlay = flashOverlayRef.current;
    const hint = hintRef.current;
    const portalHero = portalHeroRef.current;
    const firstFrameFallback = firstFrameFallbackRef.current;
    const fixedBg = fixedBgRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let canvasWidth = (canvas.width = window.innerWidth);
    let canvasHeight = (canvas.height = window.innerHeight);

    const resizeCanvas = () => {
      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = window.innerHeight;
      renderFrame(currentFrameObj.frame);
    };

    const images: HTMLImageElement[] = [];

    const getFrameUrl = (idx: number) => {
      const numStr = String(idx).padStart(3, "0");
      return `/frames/frame_${numStr}.jpg`;
    };

    const renderFrame = (frameIndex: number) => {
      const img = images[frameIndex];
      if (!img || !img.complete || !ctx) return;

      // Hide the initial static image fallback once the canvas takes over
      if (firstFrameFallback && firstFrameFallback.style.opacity !== "0") {
        firstFrameFallback.style.opacity = "0";
      }

      const w = canvasWidth;
      const h = canvasHeight;
      const imgRatio = (img.naturalWidth || 1920) / (img.naturalHeight || 1080);
      const canvasRatio = w / h;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = w;
        drawHeight = w / imgRatio;
        offsetX = 0;
        offsetY = (h - drawHeight) / 2;
      } else {
        drawWidth = h * imgRatio;
        drawHeight = h;
        offsetX = (w - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const currentFrameObj = { frame: 0 };

    // Preload frames progressively
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (i === 1) {
          renderFrame(0);
        }
      };
      images.push(img);
    }

    // Immediately render frame 0 if cached
    if (images[0]?.complete) {
      renderFrame(0);
    }

    // Setup GSAP scroll timeline right away
    if (portalHero) {
      gsap.set(portalHero, { opacity: 0, pointerEvents: "none" });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=3000",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Frames scrub across 0.0 to 0.78
          const frameProgress = Math.min(1, p / 0.78);
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(frameProgress * (TOTAL_FRAMES - 1))
          );

          currentFrameObj.frame = targetFrame;
          renderFrame(targetFrame);

          if (p >= 0.78) {
            if (canvas) canvas.style.opacity = "0";
            if (firstFrameFallback) firstFrameFallback.style.opacity = "0";
            if (fixedBg) fixedBg.style.opacity = "1";
            if (portalHero) {
              portalHero.style.opacity = "1";
              portalHero.style.pointerEvents = "auto";
            }
          } else {
            if (canvas) canvas.style.opacity = "1";
            if (fixedBg) fixedBg.style.opacity = "0";
            if (portalHero) {
              portalHero.style.opacity = "0";
              portalHero.style.pointerEvents = "none";
            }
          }
        },
      },
    });

    if (hint) {
      tl.to(hint, { opacity: 0, duration: 0.08, ease: "power1.out" }, 0);
    }

    if (flashOverlay) {
      tl.to(
        flashOverlay,
        {
          opacity: 1,
          duration: 0.10,
          ease: "power2.in",
        },
        0.74
      );
    }

    if (canvas) {
      tl.to(canvas, { opacity: 0, duration: 0.1, ease: "power2.out" }, 0.78);
    }

    if (fixedBg) {
      tl.to(
        fixedBg,
        {
          opacity: 1,
          duration: 0.12,
          ease: "power2.out",
        },
        0.78
      );
    }

    if (portalHero) {
      tl.to(
        portalHero,
        {
          opacity: 1,
          duration: 0.12,
          ease: "power2.out",
        },
        0.80
      );
    }

    if (flashOverlay) {
      tl.to(
        flashOverlay,
        {
          opacity: 0,
          duration: 0.14,
          ease: "power2.out",
        },
        0.82
      );
    }

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main id="top" className="relative w-full min-h-screen bg-black">
      {/* 
        New Futuristic HUD (Always visible on top)
      */}
      <TechfestHUD />

      {/* Single Pure Continuous Video Background (Unveiled after Flash - No overlays, no duplication) */}
      <div 
        ref={fixedBgRef}
        className="fixed inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-500 overflow-hidden"
      >
        <video
          src="/homepage_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 
        Pinned Scroll Animation Viewport
      */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-transparent select-none z-10"
      >
        {/* Instant Static First-Frame Fallback (Guarantees zero blank screen while loading) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={firstFrameFallbackRef}
          src="/frames/frame_001.jpg"
          alt="Hands Initial Frame"
          className="absolute inset-0 w-full h-full object-cover z-5 transition-opacity duration-300"
        />

        {/* Dynamic 80-Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-200"
        />

        {/* Portal Hero Content (Unveiled on Flash - Pure video shines through underneath) */}
        <div
          ref={portalHeroRef}
          className="absolute inset-0 z-25 flex flex-col items-center justify-center opacity-0 overflow-hidden bg-transparent pointer-events-none"
        >
          {/* Title Container with Gentle Semi-Transparent Backdrop Blur */}
          <div className="relative z-10 flex flex-col items-center justify-center px-8 py-5 sm:px-12 sm:py-7 rounded-3xl bg-black/20 backdrop-blur-[4px] border border-white/10 shadow-[0_0_35px_rgba(0,0,0,0.35)] max-w-[92vw]">
            {/* Authentic High-Res Stylized Wordmark (Enlarged) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/techfiesta_wordmark.png"
              alt="TechFiesta"
              className="h-20 sm:h-28 md:h-36 lg:h-44 w-auto object-contain filter drop-shadow-[0_0_35px_rgba(0,240,255,0.75)] drop-shadow-[0_0_70px_rgba(168,85,247,0.5)] transition-transform hover:scale-105 duration-300 pointer-events-auto"
            />
            <h1 className="sr-only">TechFiesta</h1>
          </div>
        </div>

        {/* Flash Overlay */}
        <div
          ref={flashOverlayRef}
          className="absolute inset-0 z-30 bg-white pointer-events-none opacity-0 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-radial from-white via-purple-300 to-cyan-200 opacity-95" />
        </div>
      </div>

      {/* Lower Sections */}
      <div className="relative z-20">
        <Homepage />
      </div>
    </main>
  );
}
