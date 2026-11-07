"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Share2,
  LogIn,
  Menu,
  X as CloseIcon,
} from "lucide-react";

export default function TechfestHUD() {
  const pathname = usePathname();
  const router = useRouter();
  const isWorkshopsPage = pathname === "/workshops";
  const isGalleryPage = pathname === "/gallery";
  const isSchedulePage = pathname === "/schedule";
  const isSubPage = isWorkshopsPage || isGalleryPage || isSchedulePage;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(
    isSchedulePage
      ? "schedule"
      : isGalleryPage
      ? "gallery"
      : isWorkshopsPage
      ? "workshops"
      : "home"
  );

  // Synchronize activeTab on route change
  useEffect(() => {
    if (pathname === "/workshops") {
      setActiveTab("workshops");
    } else if (pathname === "/gallery") {
      setActiveTab("gallery");
    } else if (pathname === "/schedule") {
      setActiveTab("schedule");
    }
  }, [pathname]);

  // ScrollSpy: Automatically highlight the menu item matching user's scroll position (on home page)
  useEffect(() => {
    if (isSubPage) {
      if (isWorkshopsPage) setActiveTab("workshops");
      if (isGalleryPage) setActiveTab("gallery");
      if (isSchedulePage) setActiveTab("schedule");
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If in Hero / Top section
      if (scrollY < windowHeight * 0.75) {
        setActiveTab("home");
        return;
      }

      // Section mappings checked from bottom to top
      const sections = [
        { id: "competitions", tab: "competitions" },
        { id: "about", tab: "about" },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= 120) {
            setActiveTab(sec.tab);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubPage, isWorkshopsPage, isGalleryPage, isSchedulePage]);

  const scrollToSection = (id: string, tabName: string) => {
    // User request: "about and contact should not lead to anywhere"
    if (tabName === "about" || tabName === "contact") {
      return;
    }

    setActiveTab(tabName);

    if (tabName === "schedule") {
      if (isSchedulePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/schedule");
      }
      return;
    }

    if (tabName === "workshops") {
      if (isWorkshopsPage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/workshops");
      }
      return;
    }

    if (tabName === "gallery") {
      if (isGalleryPage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/gallery");
      }
      return;
    }

    if (tabName === "home") {
      if (isSubPage) {
        router.push("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // For other sections like competitions:
    if (isSubPage) {
      router.push(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 1.5, behavior: "smooth" });
    }
  };

  return (
    <>
      <style jsx global>{`
        /* Global HUD wrapper */
        .hud-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 100;
          font-family: var(--font-orbitron), system-ui, -apple-system, sans-serif;
        }

        /* Interactive HUD layers */
        .hud-interactive {
          pointer-events: auto;
        }

        /* Unified Top Navigation Pill Bar */
        .top-pill-bar {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(860px, 92vw, 1380px);
          height: 56px;
          border-radius: 9999px;
          background: rgba(10, 16, 32, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 212, 255, 0.35);
          box-shadow: 0 0 22px rgba(0, 212, 255, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px 0 24px;
          z-index: 90;
          transition: all 0.3s ease;
        }
        .top-pill-bar:hover {
          border-color: rgba(0, 212, 255, 0.55);
          box-shadow: 0 0 28px rgba(0, 212, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Left Logo Segment */
        .nav-logo-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .nav-logo-img {
          height: 34px;
          width: auto;
          display: block;
          filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.5)) drop-shadow(0 0 16px rgba(168, 85, 247, 0.4));
          transition: transform 0.25s ease, filter 0.25s ease;
        }
        .nav-logo-group:hover .nav-logo-img {
          transform: scale(1.08);
          filter: drop-shadow(0 0 16px rgba(0, 240, 255, 0.8)) drop-shadow(0 0 24px rgba(168, 85, 247, 0.7));
        }
        .nav-vertical-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.18);
        }

        /* Center Links (Home, Schedule, Workshops, Competitions, Gallery, About, Contact) */
        .nav-center-menu {
          display: flex;
          align-items: center;
          gap: 0;
          justify-content: center;
          flex: 1;
        }
        .nav-link-btn {
          position: relative;
          color: #94a3b8;
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.5px;
          padding: 8px 18px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          white-space: nowrap;
          background: transparent;
          border: none;
        }
        .nav-link-btn:hover {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
        }

        /* Unified Active Tab Style for All Menu Items (Electric Cyan Theme) */
        .nav-link-btn.active {
          color: #38bdf8;
          text-shadow: 0 0 12px rgba(56, 189, 248, 0.85);
          font-weight: 600;
        }
        .nav-link-btn.active::after {
          content: "";
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 2px;
          background: #00d4ff;
          box-shadow: 0 0 10px #00d4ff, 0 0 18px #00d4ff;
          border-radius: 9999px;
          animation: tabGlowIn 0.25s ease-out;
        }
        @keyframes tabGlowIn {
          from {
            width: 0px;
            opacity: 0;
          }
          to {
            width: 30px;
            opacity: 1;
          }
        }

        /* Top Right Sign In Button */
        .nav-signin-btn {
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          padding: 7px 18px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.25s ease;
          flex-shrink: 0;
          text-decoration: none;
        }
        .nav-signin-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(0, 212, 255, 0.6);
          box-shadow: 0 0 14px rgba(0, 212, 255, 0.35);
        }

        /* Bottom Center Futuristic Scroll Prompt SVG */
        .scroll-prompt-btn {
          position: fixed;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 6px 12px;
          transition: transform 0.25s ease;
          z-index: 80;
          text-decoration: none;
        }
        .scroll-prompt-btn:hover {
          transform: translateX(-50%) translateY(3px);
        }
        .scroll-prompt-label {
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #94a3b8;
          text-transform: uppercase;
          font-family: var(--font-orbitron);
          margin-bottom: 2px;
          text-shadow: 0 0 8px rgba(0, 212, 255, 0.35);
          transition: color 0.25s ease;
        }
        .scroll-prompt-btn:hover .scroll-prompt-label {
          color: #00d4ff;
          text-shadow: 0 0 12px #00d4ff;
        }
        .scroll-mouse-chassis {
          width: 20px;
          height: 32px;
          border-radius: 9999px;
          border: 1.6px solid rgba(0, 212, 255, 0.7);
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.4), inset 0 0 6px rgba(0, 212, 255, 0.2);
          position: relative;
          background: rgba(10, 16, 32, 0.45);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .scroll-wheel-dot {
          width: 3px;
          height: 6px;
          background: #00d4ff;
          border-radius: 9999px;
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 6px #00d4ff;
          animation: mouseWheelSlide 1.6s ease-in-out infinite;
        }
        @keyframes mouseWheelSlide {
          0% {
            opacity: 1;
            top: 5px;
          }
          50% {
            opacity: 1;
            top: 14px;
          }
          100% {
            opacity: 0;
            top: 17px;
          }
        }
        .scroll-chevron-svg {
          animation: chevronPulse 1.6s ease-in-out infinite;
          filter: drop-shadow(0 0 6px #00d4ff);
        }
        @keyframes chevronPulse {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(3px);
          }
        }

        /* Bottom Right "Connect" Social Widget */
        .bottom-right-social-wrapper {
          position: fixed;
          bottom: 24px;
          right: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          z-index: 80;
        }

        /* Social Card Popover */
        .social-card-popover {
          position: relative;
          border-radius: 18px;
          background: rgba(10, 16, 32, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(168, 85, 247, 0.35);
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.55), 0 0 22px rgba(168, 85, 247, 0.2);
          padding: 14px 18px;
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 14px;
          align-items: start;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        /* Speech notch triangle */
        .social-card-popover::after {
          content: "";
          position: absolute;
          bottom: -7px;
          right: 38px;
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 7px solid rgba(168, 85, 247, 0.5);
        }

        .social-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .social-column-divider {
          width: 1px;
          background: rgba(255, 255, 255, 0.12);
          height: 100%;
        }

        .social-card-row {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #e2e8f0;
          font-size: 11px;
          font-weight: 500;
          text-decoration: none;
          padding: 4px 6px;
          border-radius: 6px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .social-card-row:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(2px);
        }
        .social-card-row svg {
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .social-card-row:hover svg {
          transform: scale(1.12);
        }

        /* Connect Button */
        .connect-pill-btn {
          border-radius: 9999px;
          padding: 7px 20px;
          background: rgba(10, 16, 32, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1.5px solid #a855f7;
          box-shadow: 0 0 16px rgba(168, 85, 247, 0.4), inset 0 0 8px rgba(168, 85, 247, 0.2);
          display: flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.25s ease;
        }
        .connect-pill-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 24px rgba(168, 85, 247, 0.65), inset 0 0 10px rgba(168, 85, 247, 0.35);
        }

        /* Mobile Hamburger & Drawer */
        .mobile-toggle-btn {
          display: none;
          position: fixed;
          top: 18px;
          left: 18px;
          background: rgba(10, 16, 32, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 212, 255, 0.4);
          color: white;
          border-radius: 10px;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 120;
          pointer-events: auto;
          box-shadow: 0 0 16px rgba(0, 212, 255, 0.25);
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 290px;
          height: 100vh;
          background: rgba(8, 12, 24, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-right: 1px solid rgba(0, 212, 255, 0.3);
          z-index: 115;
          padding: 80px 24px 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: auto;
        }
        .mobile-drawer.open {
          transform: translateX(0);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .top-pill-bar {
            width: 95vw;
            padding: 0 10px 0 14px;
          }
          .nav-link-btn {
            padding: 8px 10px;
            font-size: 11px;
          }
          .bottom-right-social-wrapper {
            right: 18px;
            bottom: 18px;
          }
        }

        @media (max-width: 860px) {
          .top-pill-bar {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
          }
          .bottom-right-social-wrapper {
            display: none;
          }
        }
      `}</style>

      <div className="hud-wrapper">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle-btn"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <CloseIcon className="w-5 h-5 text-cyan-400" />
          ) : (
            <Menu className="w-5 h-5 text-cyan-400" />
          )}
        </button>

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/tf_logo_new.png" alt="TechFiesta Logo" className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
            <span className="font-bold text-lg tracking-tight">
              <span className="text-white">Tech</span>
              <span className="text-[#00f0ff]">Fiesta</span>
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
              Navigation
            </span>
            <button
              onClick={() => {
                scrollToSection("top", "home");
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm py-2 border-b border-white/10 ${
                activeTab === "home" ? "text-cyan-400 font-bold" : "text-slate-200 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                scrollToSection("competitions", "competitions");
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm py-2 border-b border-white/10 ${
                activeTab === "competitions" ? "text-cyan-400 font-bold" : "text-slate-200 hover:text-white"
              }`}
            >
              Competitions
            </button>
            <button
              onClick={() => {
                scrollToSection("schedule", "schedule");
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm py-2 border-b border-white/10 ${
                activeTab === "schedule" ? "text-cyan-400 font-bold" : "text-slate-200 hover:text-white"
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => {
                scrollToSection("workshops", "workshops");
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm py-2 border-b border-white/10 ${
                activeTab === "workshops" ? "text-cyan-400 font-bold" : "text-slate-200 hover:text-white"
              }`}
            >
              Workshops
            </button>
            <button
              onClick={() => {
                scrollToSection("gallery", "gallery");
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm py-2 border-b border-white/10 ${
                activeTab === "gallery" ? "text-cyan-400 font-bold" : "text-slate-200 hover:text-white"
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm py-2 border-b border-white/10 text-slate-300 hover:text-white"
            >
              About
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm py-2 border-b border-white/10 text-slate-300 hover:text-white"
            >
              Contact
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[10px] tracking-widest text-purple-400 font-bold uppercase">
              Social Links
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="py-1">
                Instagram
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="py-1">
                X
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="py-1">
                LinkedIn
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="py-1">
                YouTube
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="py-1">
                Facebook
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="py-1">
                WhatsApp
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="py-1">
                Discord
              </a>
            </div>
          </div>
        </div>

        {/* 1. TOP NAV PILL BAR */}
        <header className="top-pill-bar hud-interactive" role="banner">
          {/* Left: Logo & Separator */}
          <div className="nav-logo-group">
            <button
              type="button"
              onClick={() => scrollToSection("top", "home")}
              className="bg-transparent border-0 p-0 cursor-pointer"
              aria-label="TechFiesta Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/tf_logo_new.png"
                alt="TechFiesta"
                className="nav-logo-img"
              />
            </button>
            <div className="nav-vertical-divider" />
          </div>

          {/* Center: Home | Schedule | Workshops | Competitions | Gallery | About | Contact */}
          <nav className="nav-center-menu" aria-label="Main Navigation">
            {/* Home */}
            <button
              type="button"
              onClick={() => scrollToSection("top", "home")}
              className={`nav-link-btn ${activeTab === "home" ? "active" : ""}`}
            >
              <span>Home</span>
            </button>

            <div className="nav-vertical-divider" />

            {/* Competitions */}
            <button
              type="button"
              onClick={() => scrollToSection("competitions", "competitions")}
              className={`nav-link-btn ${activeTab === "competitions" ? "active" : ""}`}
            >
              <span>Competitions</span>
            </button>

            <div className="nav-vertical-divider" />

            {/* Schedule */}
            <button
              type="button"
              onClick={() => scrollToSection("schedule", "schedule")}
              className={`nav-link-btn ${activeTab === "schedule" ? "active" : ""}`}
            >
              <span>Schedule</span>
            </button>

            <div className="nav-vertical-divider" />

            {/* Workshops */}
            <button
              type="button"
              onClick={() => scrollToSection("workshops", "workshops")}
              className={`nav-link-btn ${activeTab === "workshops" ? "active" : ""}`}
            >
              <span>Workshops</span>
            </button>

            <div className="nav-vertical-divider" />

            {/* Gallery */}
            <button
              type="button"
              onClick={() => scrollToSection("gallery", "gallery")}
              className={`nav-link-btn ${activeTab === "gallery" ? "active" : ""}`}
            >
              <span>Gallery</span>
            </button>

            <div className="nav-vertical-divider" />

            {/* About */}
            <button
              type="button"
              onClick={() => scrollToSection("about", "about")}
              className={`nav-link-btn ${activeTab === "about" ? "active" : ""}`}
            >
              <span>About</span>
            </button>

            <div className="nav-vertical-divider" />

            {/* Contact */}
            <button
              type="button"
              onClick={() => scrollToSection("contact", "contact")}
              className={`nav-link-btn ${activeTab === "contact" ? "active" : ""}`}
            >
              <span>Contact</span>
            </button>
          </nav>

          {/* Right: Rounded Sign In Pill */}
          <a href="#signin" className="nav-signin-btn" aria-label="Sign In">
            <LogIn className="w-3.5 h-3.5 text-slate-300" />
            <span>Sign in</span>
          </a>
        </header>

        {/* 2. BOTTOM CENTER SCROLL SVG */}
        <button
          type="button"
          onClick={() => {
            if (isSchedulePage) {
              const el = document.getElementById("schedule-grid");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
              }
            } else if (isGalleryPage) {
              const el = document.getElementById("gallery-grid");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
              }
            } else if (isWorkshopsPage) {
              const el = document.getElementById("workshops-grid");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
              }
            } else {
              window.scrollTo({
                top: window.innerHeight * 1.5,
                behavior: "smooth",
              });
            }
          }}
          className="scroll-prompt-btn hud-interactive"
          aria-label="Scroll to experience"
        >
          <span className="scroll-prompt-label">SCROLL</span>
          <div className="scroll-mouse-chassis">
            <div className="scroll-wheel-dot" />
          </div>
          <svg 
            className="scroll-chevron-svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#00d4ff" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>

        {/* 3. BOTTOM RIGHT "CONNECT" SOCIAL WIDGET */}
        <div className="bottom-right-social-wrapper hud-interactive">
          {socialOpen && (
            <div className="social-card-popover" role="region" aria-label="Social Channels">
              <div className="social-column">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-row"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="14" width="14">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-row"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="14" width="14">
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-row"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="14" width="14">
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                  <span>Facebook</span>
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-row"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="14" width="14">
                    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.54,309.54,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.119a1.819,1.819,0,0,1,1.9-.261c94.47,43.083,196.883,43.083,290.419,0a1.825,1.825,0,0,1,1.923.235c2.944,2.408,6.027,4.836,9.109,7.145a1.883,1.883,0,0,1-.16,3.126,301.407,301.407,0,0,1-45.894,21.827,1.862,1.862,0,0,0-1.019,2.588,341.255,341.255,0,0,0,29.986,48.868,1.888,1.888,0,0,0,2.063.676A486.087,486.087,0,0,0,571.216,405.7a1.983,1.983,0,0,0,.765-1.375C584.288,279.79,551.488,169.576,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.436,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                  </svg>
                  <span>Discord</span>
                </a>
              </div>

              <div className="social-column-divider" />

              <div className="social-column">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-row"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.066H5.028z" />
                  </svg>
                  <span>X</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-row"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="14" width="14">
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                  </svg>
                  <span>YouTube</span>
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-row"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="14" width="14">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* Grounding Connect Pill Button */}
          <button
            type="button"
            onClick={() => setSocialOpen(!socialOpen)}
            className="connect-pill-btn"
            aria-label="Toggle social channels"
          >
            <Share2 className="w-3.5 h-3.5 text-purple-300" />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </>
  );
}
