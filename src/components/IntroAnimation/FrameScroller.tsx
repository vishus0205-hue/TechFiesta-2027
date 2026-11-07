"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 80;

interface FrameScrollerProps {
  onIntroFinished: () => void;
}

export default function FrameScroller({ onIntroFinished }: FrameScrollerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const flashOverlayRef = useRef<HTMLDivElement | null>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const flashOverlay = flashOverlayRef.current;
    const hint = hintRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameObj.frame);
    };

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const getFrameUrl = (idx: number) => {
      const numStr = String(idx).padStart(3, "0");
      return `/frames/frame_${numStr}.jpg`;
    };

    const renderFrame = (frameIndex: number) => {
      const img = images[frameIndex];
      if (!img || !img.complete || !ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
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

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

        if (loadedCount === 1) renderFrame(0);

        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
          renderFrame(0);
          setupScrollAnimation();
        }
      };
      images.push(img);
    }

    let scrollTriggerInstance: ScrollTrigger | null = null;

    const setupScrollAnimation = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2600",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Frames 0 to 79 scrub from 0.0 to 0.85
            const frameProgress = Math.min(1, p / 0.85);
            const targetFrame = Math.min(
              TOTAL_FRAMES - 1,
              Math.floor(frameProgress * (TOTAL_FRAMES - 1))
            );

            currentFrameObj.frame = targetFrame;
            renderFrame(targetFrame);

            // Once the flash peaks and user passes 0.90, switch permanently into homepage
            if (p >= 0.94) {
              onIntroFinished();
            }
          },
        },
      });

      // 1. Prompt fades out instantly
      if (hint) {
        tl.to(hint, { opacity: 0, duration: 0.08, ease: "power1.out" }, 0);
      }

      // 2. Contact shockwave flash
      if (flashOverlay) {
        tl.to(
          flashOverlay,
          {
            opacity: 1,
            duration: 0.12,
            ease: "power3.in",
          },
          0.80
        );

        // Flash clears revealing the portal underneath
        tl.to(
          flashOverlay,
          {
            opacity: 0,
            duration: 0.15,
            ease: "power2.out",
          },
          0.92
        );
      }

      scrollTriggerInstance = tl.scrollTrigger || null;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [onIntroFinished]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#030208] select-none"
    >
      {/* Loading state indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#030208]">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
            <span className="font-tech text-sm tracking-[0.3em] uppercase text-purple-200">
              Initializing Singularity Sequence...
            </span>
          </div>
          <div className="w-64 h-1.5 bg-purple-950 rounded-full overflow-hidden border border-purple-800/40">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-150"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <span className="font-tech text-xs text-purple-400/80 mt-2">
            {loadingProgress}%
          </span>
        </div>
      )}

      {/* Frame canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* Flash overlay for transition */}
      <div
        ref={flashOverlayRef}
        className="absolute inset-0 z-40 bg-white pointer-events-none opacity-0 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-radial from-white via-purple-300 to-cyan-200 opacity-95" />
      </div>

      {/* Bottom prompt with Skip button */}
      <div
        ref={hintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-purple-500/50 bg-black/60 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.4)] pointer-events-none">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span className="font-tech text-xs tracking-widest uppercase text-purple-200 font-semibold">
            Scroll to Initiate Convergence
          </span>
          <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce ml-1" />
        </div>

        <button
          onClick={onIntroFinished}
          className="font-tech text-[10px] tracking-widest uppercase text-slate-400 hover:text-white px-3 py-1 rounded bg-black/40 border border-purple-900/40 hover:border-purple-500/60 transition-colors pointer-events-auto"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}
