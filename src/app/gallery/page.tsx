"use client";

import { useState } from "react";
import TechfestHUD from "@/components/TechfestHUD/TechfestHUD";
import {
  Play,
  Image as ImageIcon,
  Film,
  X as CloseIcon,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  edition: string;
  category: "track1" | "track2" | "track3" | "track4" | "track5" | "track6";
  categoryLabel: string;
  type: "video" | "photo";
  thumbnail: string;
  videoUrl?: string;
  venue: string;
  footfall: string;
  desc: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "highlight-1",
    title: "Event Highlight 1",
    edition: "Archive Highlight",
    category: "track1",
    categoryLabel: "Track 1",
    type: "video",
    thumbnail: "/arena.png",
    videoUrl: "/homepage_bg.mp4",
    venue: "Arena Colosseum [TBA]",
    footfall: "XX,XXX+ Attendees",
    desc: "Template archive media highlight. High-resolution tournament recordings, engineering challenges, and arena clash footage from previous editions.",
  },
  {
    id: "highlight-2",
    title: "Event Highlight 2",
    edition: "Archive Highlight",
    category: "track2",
    categoryLabel: "Track 2",
    type: "photo",
    thumbnail: "/portal.png",
    venue: "Arena Colosseum [TBA]",
    footfall: "XXX+ Teams",
    desc: "Template archive media highlight. High-resolution tournament recordings, engineering challenges, and arena clash footage from previous editions.",
  },
  {
    id: "highlight-3",
    title: "Event Highlight 3",
    edition: "Archive Highlight",
    category: "track3",
    categoryLabel: "Track 3",
    type: "video",
    thumbnail: "/arena.png",
    videoUrl: "/workshops_bg.mp4",
    venue: "Arena Colosseum [TBA]",
    footfall: "XX,XXX+ Attendees",
    desc: "Template archive media highlight. High-resolution tournament recordings, engineering challenges, and arena clash footage from previous editions.",
  },
  {
    id: "highlight-4",
    title: "Event Highlight 4",
    edition: "Archive Highlight",
    category: "track4",
    categoryLabel: "Track 4",
    type: "photo",
    thumbnail: "/frames/frame_001.jpg",
    venue: "Arena Colosseum [TBA]",
    footfall: "XX+ Finalists",
    desc: "Template archive media highlight. High-resolution tournament recordings, engineering challenges, and arena clash footage from previous editions.",
  },
  {
    id: "highlight-5",
    title: "Event Highlight 5",
    edition: "Archive Highlight",
    category: "track5",
    categoryLabel: "Track 5",
    type: "video",
    thumbnail: "/arena.png",
    videoUrl: "/homepage_bg.mp4",
    venue: "Arena Colosseum [TBA]",
    footfall: "XX+ Squads",
    desc: "Template archive media highlight. High-resolution tournament recordings, engineering challenges, and arena clash footage from previous editions.",
  },
  {
    id: "highlight-6",
    title: "Event Highlight 6",
    edition: "Archive Highlight",
    category: "track6",
    categoryLabel: "Track 6",
    type: "photo",
    thumbnail: "/frames/frame_040.jpg",
    venue: "Arena Colosseum [TBA]",
    footfall: "XX+ Labs",
    desc: "Template archive media highlight. High-resolution tournament recordings, engineering challenges, and arena clash footage from previous editions.",
  },
  {
    id: "highlight-7",
    title: "Event Highlight 7",
    edition: "Archive Highlight",
    category: "track2",
    categoryLabel: "Track 2",
    type: "photo",
    thumbnail: "/frames/frame_080.jpg",
    venue: "Arena Colosseum [TBA]",
    footfall: "XXX+ Participants",
    desc: "Template archive media highlight. High-resolution tournament recordings, engineering challenges, and arena clash footage from previous editions.",
  },
  {
    id: "highlight-8",
    title: "Event Highlight 8",
    edition: "Archive Highlight",
    category: "track4",
    categoryLabel: "Track 4",
    type: "video",
    thumbnail: "/portal.png",
    videoUrl: "/workshops_bg.mp4",
    venue: "Arena Colosseum [TBA]",
    footfall: "Grand Spectacle",
    desc: "Template archive media highlight. High-resolution tournament recordings, engineering challenges, and arena clash footage from previous editions.",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: "all", label: "All Highlights" },
    { id: "track1", label: "Track 1" },
    { id: "track2", label: "Track 2" },
    { id: "track3", label: "Track 3" },
    { id: "track4", label: "Track 4" },
    { id: "track5", label: "Track 5" },
    { id: "track6", label: "Track 6" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <main className="relative min-h-screen text-[#e2e8f0] font-sans antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      {/* 1. Continuous Background Video (Matching Workshops Theme) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
        src="/workshops_bg.mp4"
      />

      {/* 2. Top HUD Navigation */}
      <TechfestHUD />

      {/* 3. Main Content Container */}
      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Title Only (Matching Workshops Theme) */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-tech tracking-tight text-white uppercase drop-shadow-[0_0_25px_rgba(250,204,21,0.35)]">
            TechFiesta <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">Archives</span> & Gallery
          </h1>
        </div>

        {/* Category Filter Pills (Matching Workshops Golden/Yellow Style) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-tech tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold shadow-[0_0_18px_rgba(250,204,21,0.55)] scale-105"
                  : "bg-black/50 text-slate-300 border border-yellow-500/25 hover:border-yellow-400/60 hover:text-white backdrop-blur-md"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid - Framed inside Yellow Cyber Mecha Frame (workshop_frame.png) */}
        <div id="gallery-grid" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative w-full aspect-[768/1024] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 select-none"
            >
              {/* Yellow Cyber Mecha Frame Overlay (workshop_frame.png) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/workshop_frame.png"
                alt="Workshop Frame"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none z-20 filter drop-shadow-[0_0_12px_rgba(234,179,8,0.3)] group-hover:drop-shadow-[0_0_24px_rgba(250,204,21,0.65)] group-hover:brightness-105 transition-all duration-300"
              />

              {/* Inner Content Container - Safely Padded to never touch borders */}
              <div className="relative z-10 w-full h-full px-[16%] pt-[15%] pb-[15%] flex flex-col justify-between bg-[#050711]/75 backdrop-blur-sm rounded-[24px] overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-yellow-500/20 transition-all duration-500" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-600/20 transition-all duration-500" />

                {/* Media Image / Thumbnail */}
                <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-3 border border-yellow-500/30 group-hover:border-yellow-400 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

                  {/* Play Button Overlay for Videos */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.8)] group-hover:scale-115 transition-transform">
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-yellow-400/40 text-[9.5px] font-tech text-yellow-300 uppercase">
                    {item.type === "video" ? (
                      <>
                        <Film className="w-3 h-3 text-yellow-400" />
                        <span>Video Reel</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-yellow-400" />
                        <span>Photo Archive</span>
                      </>
                    )}
                  </div>

                  {/* Edition Year */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-yellow-500/40 text-[9px] font-mono text-yellow-300">
                    {item.edition}
                  </div>
                </div>

                {/* Content Info */}
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-tech text-yellow-400 uppercase tracking-widest block mb-1">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-tech text-sm sm:text-base font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 leading-snug mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed line-clamp-2 font-light">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Stats & Trigger */}
                  <div className="pt-2 border-t border-yellow-500/20 flex items-center justify-between mt-2">
                    <span className="font-mono text-[9.5px] text-slate-400 truncate max-w-[55%]">
                      {item.footfall}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-[10.5px] font-tech tracking-wider uppercase group-hover:bg-yellow-400 group-hover:text-black group-hover:border-yellow-400 transition-all duration-200"
                    >
                      <span>{item.type === "video" ? "Watch Reel" : "View Photo"}</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. EXPANDED LIGHTBOX / MEDIA MODAL */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-[768/1024] max-h-[92vh] flex flex-col justify-between select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Yellow Cyber Frame for Modal */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/workshop_frame.png"
              alt="Modal Frame"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none z-20 filter drop-shadow-[0_0_35px_rgba(250,204,21,0.5)]"
            />

            {/* Inner Content with Safe Margins */}
            <div className="relative z-10 w-full h-full px-[18%] pt-[16%] pb-[16%] flex flex-col justify-between bg-[#040610]/95 backdrop-blur-2xl rounded-[28px] overflow-y-auto custom-scrollbar">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-tech text-[10px] px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span>{activeItem.edition} // {activeItem.categoryLabel}</span>
                  </span>

                  <button
                    onClick={() => setActiveItem(null)}
                    className="p-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:text-white hover:bg-yellow-500/20 transition-all cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="font-tech text-lg sm:text-2xl font-bold text-white mb-2 leading-snug">
                  {activeItem.title}
                </h2>

                {/* Media Player / Full Photo */}
                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-yellow-500/40 mb-4 bg-black">
                  {activeItem.type === "video" && activeItem.videoUrl ? (
                    <video
                      src={activeItem.videoUrl}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeItem.thumbnail}
                      alt={activeItem.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4">
                  {activeItem.desc}
                </p>

                {/* Event Metadata Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/60 border border-yellow-500/30 text-xs">
                  <div>
                    <span className="text-[9.5px] font-tech text-slate-400 uppercase tracking-wider block">Historic Venue</span>
                    <span className="font-tech font-bold text-yellow-300">{activeItem.venue}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-tech text-slate-400 uppercase tracking-wider block">Audience & Footfall</span>
                    <span className="font-tech font-bold text-white">{activeItem.footfall}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-yellow-500/30 flex items-center justify-between">
                <span className="text-[9px] font-tech text-slate-400 uppercase">
                  TechFiesta Media Archives
                </span>

                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs font-tech font-bold tracking-wider uppercase hover:brightness-110 shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
