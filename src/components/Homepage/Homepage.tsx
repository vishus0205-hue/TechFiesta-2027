"use client";

import { useState } from "react";
import { 
  Trophy, 
  Flame, 
  Users, 
  Layers, 

  Terminal,
  Zap,
  Radio,
  BookOpen,
  ChevronRight,
  X as CloseIcon,
  Clock,

  CheckCircle2
} from "lucide-react";

interface CompetitionEvent {
  title: string;
  category: string;
  tag: string;
  prize: string;
  teams: string;
  timeline: string;
  venue: string;
  desc: string;
  rules: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeModalEvent, setActiveModalEvent] = useState<CompetitionEvent | null>(null);

  const categories = [
    { id: "all", label: "All Competitions" },
    { id: "track1", label: "Track 1" },
    { id: "track2", label: "Track 2" },
    { id: "track3", label: "Track 3" },
    { id: "track4", label: "Track 4" },
  ];

  const events = [
    {
      title: "Competition 1",
      category: "track1",
      tag: "Track 1 // Flagship",
      prize: "₹X,XX,XXX",
      teams: "XXX Teams",
      timeline: "Unannounced // 2027",
      venue: "Arena Colosseum [TBA]",
      desc: "Template competition specification. Complete problem statement, technical stack constraints, and real-world evaluation benchmarks will be detailed upon launch.",
      rules: [
        "Team size and eligibility criteria to be unsealed in Phase 1",
        "Submission repository and deployment guidelines published upon flag-off",
        "Standard festival safety and competition code of conduct applies",
      ],
      icon: Terminal,
    },
    {
      title: "Competition 2",
      category: "track2",
      tag: "Track 2 // Robotics",
      prize: "₹X,XX,XXX",
      teams: "XX Robots",
      timeline: "Unannounced // 2027",
      venue: "Arena Colosseum [TBA]",
      desc: "Template robotics combat specification. Machine weight limits, failsafe telemetry requirements, and arena hazard rules will be confirmed in Phase 1.",
      rules: [
        "Machine weight division specifications to be announced",
        "Dual emergency radio killswitch requirement applies",
        "Mandatory safety inspection required prior to weigh-in",
      ],
      icon: Zap,
    },
    {
      title: "Competition 3",
      category: "track3",
      tag: "Track 3 // Esports",
      prize: "₹X,XX,XXX",
      teams: "XX Squads",
      timeline: "Unannounced // 2027",
      venue: "Arena Colosseum [TBA]",
      desc: "Template esports tournament specification. Official tournament rulebooks, elimination brackets, and live spectator broadcast schedules will be published upon launch.",
      rules: [
        "Standard collegiate esports competitive guidelines apply",
        "Hardware anti-cheat and verification check enforced",
        "Double elimination fixtures leading to Grand Finals",
      ],
      icon: Flame,
    },
    {
      title: "Competition 4",
      category: "track1",
      tag: "Track 4 // Security",
      prize: "₹XX,XXX",
      teams: "XX Teams",
      timeline: "Unannounced // 2027",
      venue: "Arena Colosseum [TBA]",
      desc: "Template cybersecurity challenge specification. Attack-defense rules, flag verification mechanisms, and sandbox environment access will be unsealed in Phase 1.",
      rules: [
        "Team size limited to verified student/pro researchers",
        "Real-time hybrid scoring with dynamic flag verification",
        "Independent sandbox testing without external network intervention",
      ],
      icon: Radio,
    },
    {
      title: "Competition 5",
      category: "track2",
      tag: "Track 5 // Aero",
      prize: "₹XX,XXX",
      teams: "XX Pilots",
      timeline: "Unannounced // 2027",
      venue: "Arena Colosseum [TBA]",
      desc: "Template aerial racing specification. Vehicle dimensions, optical transponder frequencies, and course obstacle layouts will be published in official bulletins.",
      rules: [
        "Chassis dimensions and battery voltage limits enforced",
        "Mandatory transponder mounting for lap timing",
        "Qualification heats into elimination bracket tiers",
      ],
      icon: Layers,
    },
    {
      title: "Competition 6",
      category: "track4",
      tag: "Track 6 // Innovation",
      prize: "₹XX,XXX",
      teams: "XXX Teams",
      timeline: "Unannounced // 2027",
      venue: "Arena Colosseum [TBA]",
      desc: "Template grand innovation challenge specification. Multidisciplinary project guidelines, live demonstration booths, and jury evaluation rubrics will be detailed soon.",
      rules: [
        "Open multidisciplinary hardware and software prototypes",
        "Live interactive jury evaluation and rubric scoring",
        "Includes access to cloud infrastructure and partner kits",
      ],
      icon: BookOpen,
    },
  ];

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="relative w-full text-white selection:bg-purple-500 selection:text-white bg-transparent">
      {/* Metrics Banner & About Overview */}
      <section id="about" className="relative z-10 py-16 px-6 border-b border-purple-900/30 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Prize Pool", value: "₹XX,XX,XXX+", icon: Trophy },
              { label: "Competitions", value: "XX+ Events", icon: Flame },
              { label: "Footfall", value: "XX,XXX+", icon: Users },
              { label: "Teams", value: "XXX+ Teams", icon: Layers },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-purple-500/30 flex flex-col items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:border-cyan-400/50 transition-colors"
                >
                  <Icon className="w-6 h-6 text-purple-400 mb-2" />
                  <span className="font-tech text-xl md:text-2xl font-bold text-white glow-cyan">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-tech">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section id="competitions" className="relative z-10 py-24 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-tech text-xs tracking-[0.3em] uppercase text-cyan-400 mb-2 block">
              Flagship Battlegrounds
            </span>
            <h2 className="font-tech text-4xl md:text-6xl font-bold tracking-tight text-white glow-purple">
              COMPETITIONS
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mt-4 text-sm md:text-base">
              Compete against the sharpest minds across India for cash prizes, incubation grants, and national glory.
            </p>
          </div>

          {/* Anchor for Workshops */}
          <div id="workshops" className="scroll-mt-36" />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-tech text-xs tracking-wider uppercase transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "bg-black/50 border border-purple-900/40 text-slate-400 hover:text-white hover:border-purple-500/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Events Grid With Sci-Fi Cyber Armor Frames */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveModalEvent(card)}
                  className="group relative w-full aspect-[3/4] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 select-none"
                >
                  {/* Cyber Metallic Frame Overlay */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/cyber_frame.png"
                    alt="Cyber Armor Frame"
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none z-20 filter drop-shadow-[0_0_12px_rgba(0,212,255,0.35)] group-hover:drop-shadow-[0_0_26px_rgba(0,240,255,0.75)] group-hover:brightness-110 transition-all duration-300"
                  />

                  {/* Inner Content Container (Generous clearance from metallic frame & cyan neon edges) */}
                  <div className="relative z-10 w-full h-full px-[18%] pt-[16%] pb-[15%] flex flex-col justify-between bg-[#040614]/85 backdrop-blur-md rounded-[28px] overflow-hidden">
                    {/* Atmospheric Glows */}
                    <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-500" />
                    <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-purple-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/25 transition-all duration-500" />

                    {/* Top Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-950/70 to-purple-950/70 border border-cyan-500/40 shadow-[0_0_8px_rgba(0,212,255,0.25)]">
                          <Icon className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30">
                          <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="font-tech text-[8px] uppercase tracking-wider text-purple-200 font-bold">
                            {card.tag}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-tech text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors uppercase leading-snug line-clamp-2 mb-1.5">
                        {card.title}
                      </h3>

                      <p className="text-slate-300 text-[10px] sm:text-[11px] leading-relaxed line-clamp-2 mb-2">
                        {card.desc}
                      </p>

                      <div className="flex items-center gap-1.5 text-[9px] text-cyan-400 font-tech">
                        <Clock className="w-2.5 h-2.5 text-cyan-400" />
                        <span>{card.timeline}</span>
                      </div>
                    </div>

                    {/* Bottom Content inside Frame */}
                    <div className="relative z-10 pt-2 border-t border-cyan-500/20 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block font-tech text-[7.5px] text-slate-400 uppercase tracking-widest">
                            Prize Pool
                          </span>
                          <span className="font-tech text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                            {card.prize}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block font-tech text-[7.5px] text-slate-400 uppercase tracking-widest">
                            Bracket
                          </span>
                          <span className="font-tech text-[9.5px] sm:text-[10px] font-semibold text-purple-300">
                            {card.teams}
                          </span>
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalEvent(card);
                        }}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-purple-600/40 via-cyan-600/30 to-purple-600/40 border border-cyan-400/40 hover:border-cyan-300 hover:shadow-[0_0_12px_rgba(0,212,255,0.45)] text-white font-tech text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all group-hover:bg-cyan-500/20"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Event Dossier Modal Inside the Frame */}
          {activeModalEvent && (
            <div 
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6"
              onClick={() => setActiveModalEvent(null)}
            >
              <div 
                className="relative w-full max-w-[460px] aspect-[3/4] flex flex-col animate-in fade-in zoom-in-95 duration-200 select-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cyber Frame Overlay */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cyber_frame.png"
                  alt="Cyber Frame"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-30 filter drop-shadow-[0_0_35px_rgba(0,240,255,0.8)]"
                />

                {/* Close Button at Top Right Outside Border */}
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-40 p-2 rounded-full bg-black/90 border border-cyan-400 text-white hover:bg-cyan-500/20 shadow-[0_0_18px_rgba(0,240,255,0.6)] transition"
                  aria-label="Close details"
                >
                  <CloseIcon className="w-4 h-4 text-cyan-300" />
                </button>

                {/* Modal Inner Content (Generous 20% horizontal and 18% vertical margins) */}
                <div className="relative z-20 w-full h-full px-[20%] pt-[18%] pb-[18%] flex flex-col justify-between bg-[#040614]/95 backdrop-blur-2xl rounded-[28px] overflow-y-auto">
                  <div>
                    {/* Header with Tag & Icon */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-950 to-purple-950 border border-cyan-500/50 shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                          {(() => {
                            const IconComponent = activeModalEvent.icon;
                            return <IconComponent className="w-4 h-4 text-cyan-400" />;
                          })()}
                        </div>
                        <div>
                          <span className="font-tech text-[8.5px] tracking-widest text-cyan-400 uppercase font-semibold">
                            {activeModalEvent.tag}
                          </span>
                          <h3 className="font-tech text-base sm:text-lg font-black text-white uppercase leading-snug">
                            {activeModalEvent.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
                      {activeModalEvent.desc}
                    </p>

                    {/* Metadata Badges */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs font-tech">
                      <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30">
                        <span className="text-slate-400 block text-[8px] uppercase">Timeline</span>
                        <span className="text-purple-200 font-bold text-[10.5px]">{activeModalEvent.timeline}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                        <span className="text-slate-400 block text-[8px] uppercase">Venue</span>
                        <span className="text-cyan-200 font-bold text-[10.5px]">{activeModalEvent.venue}</span>
                      </div>
                    </div>

                    {/* Rules & Guidelines */}
                    <div className="mb-2">
                      <span className="font-tech text-[10px] uppercase tracking-wider text-purple-300 font-bold block mb-1">
                        Battleground Guidelines
                      </span>
                      <ul className="space-y-1 text-[10px] text-slate-300">
                        {activeModalEvent.rules?.map((rule: string, rIdx: number) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Modal Action Bar */}
                  <div className="pt-2.5 border-t border-cyan-500/20 flex items-center justify-between gap-3">
                    <div>
                      <span className="block font-tech text-[8px] text-slate-400 uppercase tracking-widest">
                        Total Bounty
                      </span>
                      <span className="font-tech text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                        {activeModalEvent.prize}
                      </span>
                    </div>

                    <button 
                      onClick={() => alert(`Registration initiated for ${activeModalEvent.title}! Registration portal opens shortly.`)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:scale-105 font-tech text-[10px] font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(0,212,255,0.5)] transition"
                    >
                      Confirm Registration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
