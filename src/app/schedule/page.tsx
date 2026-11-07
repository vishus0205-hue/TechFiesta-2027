"use client";

import { useState } from "react";
import TechfestHUD from "@/components/TechfestHUD/TechfestHUD";
import {
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight,
  X as CloseIcon,
  Tag,
  CheckCircle2,
  CalendarPlus,
} from "lucide-react";

interface ScheduleSession {
  id: string;
  day: "day1" | "day2" | "day3";
  dayLabel: string;
  date: string;
  time: string;
  title: string;
  track: string;
  venue: string;
  highlights: string[];
  desc: string;
}

const SCHEDULE_SESSIONS: ScheduleSession[] = [
  {
    id: "session-1",
    day: "day1",
    dayLabel: "Day 01",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 1",
    track: "Track 1 // Inauguration",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "Keynote address by industry pioneer [TBA]",
      "Live holographic festival portal ignition",
      "Announcement of ₹XX,XX,XXX+ bounty pool",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
  {
    id: "session-2",
    day: "day1",
    dayLabel: "Day 01",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 2",
    track: "Track 2 // Hackathons",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "Release of classified problem statements [TBA]",
      "High-performance cloud compute quotas allocated",
      "Mentor evaluation checkpoints schedule",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
  {
    id: "session-3",
    day: "day1",
    dayLabel: "Day 01",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 3",
    track: "Track 3 // Workshops",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "Hands-on technical laboratory curriculum [TBA]",
      "Interactive tools and framework deployment",
      "Verified certification awarded upon exit",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
  {
    id: "session-4",
    day: "day1",
    dayLabel: "Day 01",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 4",
    track: "Track 4 // Robotics",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "Double elimination tournament fixtures [TBA]",
      "Live spectator telemetry display",
      "Safety inspection and driver weigh-in",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
  {
    id: "session-5",
    day: "day2",
    dayLabel: "Day 02",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 5",
    track: "Track 4 // Robotics",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "Full contact tournament brackets [TBA]",
      "Arena telemetry and hazard activation",
      "Live audience cheer integration",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
  {
    id: "session-6",
    day: "day2",
    dayLabel: "Day 02",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 6",
    track: "Track 5 // Security",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "Sandbox environment CTF deployment [TBA]",
      "Live attack-defense telemetry scoring",
      "Vulnerability analysis and mitigation review",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
  {
    id: "session-7",
    day: "day2",
    dayLabel: "Day 02",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 7",
    track: "Track 6 // Aerial",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "High-speed aerial obstacle navigation [TBA]",
      "Illuminated laser gates & telemetry timing",
      "Cockpit FPV live streaming to stadium displays",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
  {
    id: "session-8",
    day: "day3",
    dayLabel: "Day 03",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 8",
    track: "Track 7 // Esports",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "Collegiate championship finals [TBA]",
      "Live shoutcasting and commentary desk",
      "Stadium HUD display and trophy battle",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
  {
    id: "session-9",
    day: "day3",
    dayLabel: "Day 03",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 9",
    track: "Track 8 // Valedictory",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "₹XX,XX,XXX+ cash prizes & trophies distribution",
      "Project incubation awards for winners",
      "Closing address by TechFiesta 2027 council",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
  {
    id: "session-10",
    day: "day3",
    dayLabel: "Day 03",
    date: "Unannounced // 2027",
    time: "Time Slot TBA",
    title: "Session 10",
    track: "Track 9 // Pro-Nite",
    venue: "Arena Colosseum [TBA]",
    highlights: [
      "Headline artist concert showcase [TBA]",
      "Synchronized aerial drone sky show",
      "Laser and atmospheric lighting production",
    ],
    desc: "Template festival session specification. Live broadcast telemetry, speaker lineups, and stage access passes will be published upon schedule confirmation.",
  },
];

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [activeSession, setActiveSession] = useState<ScheduleSession | null>(null);
  const [reminderSaved, setReminderSaved] = useState(false);

  const days = [
    { id: "all", label: "All Sessions" },
    { id: "day1", label: "Day 01 // Unannounced" },
    { id: "day2", label: "Day 02 // Unannounced" },
    { id: "day3", label: "Day 03 // Unannounced" },
  ];

  const filteredSessions =
    selectedDay === "all"
      ? SCHEDULE_SESSIONS
      : SCHEDULE_SESSIONS.filter((s) => s.day === selectedDay);

  const handleSetReminder = () => {
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 3000);
  };

  return (
    <main className="relative min-h-screen text-[#e2e8f0] font-sans antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      {/* 1. Continuous Background Video (Matching Workshops/Gallery Theme) */}
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
        {/* Hero Title Only (Matching Theme) */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-tech tracking-tight text-white uppercase drop-shadow-[0_0_25px_rgba(250,204,21,0.35)]">
            Festival <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">Timeline</span> & Schedule
          </h1>
        </div>

        {/* Day Filter Pills (Matching Workshops/Gallery Golden Style) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`px-4 py-2 rounded-full text-xs font-tech tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedDay === day.id
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold shadow-[0_0_18px_rgba(250,204,21,0.55)] scale-105"
                  : "bg-black/50 text-slate-300 border border-yellow-500/25 hover:border-yellow-400/60 hover:text-white backdrop-blur-md"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Schedule Cards Grid - Framed inside Yellow Cyber Mecha Frame (workshop_frame.png) */}
        <div id="schedule-grid" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setActiveSession(session)}
              className="group relative w-full aspect-[768/1024] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 select-none"
            >
              {/* Yellow Cyber Mecha Frame Overlay (workshop_frame.png) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/workshop_frame.png"
                alt="Schedule Frame"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none z-20 filter drop-shadow-[0_0_12px_rgba(234,179,8,0.3)] group-hover:drop-shadow-[0_0_24px_rgba(250,204,21,0.65)] group-hover:brightness-105 transition-all duration-300"
              />

              {/* Inner Content Container - Safely Padded to never touch borders */}
              <div className="relative z-10 w-full h-full px-[16%] pt-[15%] pb-[15%] flex flex-col justify-between bg-[#050711]/75 backdrop-blur-sm rounded-[24px] overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-yellow-500/20 transition-all duration-500" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-600/20 transition-all duration-500" />

                {/* Top Info */}
                <div className="relative z-10">
                  {/* Day Badge & Track */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-tech text-[9.5px] px-2.5 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 flex items-center gap-1.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                      {session.dayLabel}
                    </span>
                    <span className="font-mono text-[10px] text-yellow-400/90 tracking-wider uppercase truncate">
                      {session.track}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-tech text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 leading-snug mt-1 mb-1">
                    {session.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed line-clamp-3 mb-2 font-light">
                    {session.desc}
                  </p>
                </div>

                {/* Middle Info Telemetry Box */}
                <div className="relative z-10 my-auto py-2 px-3 rounded-xl bg-black/50 border border-yellow-500/25 grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="block text-[9px] font-tech text-slate-400 uppercase tracking-wider">Time Slot</span>
                    <span className="font-tech font-semibold text-yellow-300 truncate block">{session.time}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-tech text-slate-400 uppercase tracking-wider">Date</span>
                    <span className="font-tech font-semibold text-white truncate block">{session.date}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-white/10 flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3 h-3 text-yellow-400 shrink-0" />
                    <span className="font-mono text-[9.5px] text-yellow-200/90 truncate block">{session.venue}</span>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="relative z-10 pt-2 border-t border-yellow-500/20 flex items-center justify-between">
                  <div>
                    <span className="block font-tech text-[8.5px] text-slate-400 uppercase tracking-wider">Stage Access</span>
                    <span className="font-tech text-[10.5px] font-bold text-yellow-400">All Passes</span>
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-[10.5px] font-tech tracking-wider uppercase group-hover:bg-yellow-400 group-hover:text-black group-hover:border-yellow-400 transition-all duration-200"
                  >
                    <span>View Dossier</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. EXPANDED SCHEDULE MODAL */}
      {activeSession && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setActiveSession(null)}
        >
          <div
            className="relative w-full max-w-2xl aspect-[768/1024] max-h-[92vh] flex flex-col justify-between select-none"
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
              {/* Top Controls */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-tech text-[10px] px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span>{activeSession.dayLabel} // {activeSession.track}</span>
                  </span>

                  <button
                    onClick={() => setActiveSession(null)}
                    className="p-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:text-white hover:bg-yellow-500/20 transition-all cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="font-tech text-lg sm:text-2xl font-bold text-white mb-2 leading-snug">
                  {activeSession.title}
                </h2>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4">
                  {activeSession.desc}
                </p>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/60 border border-yellow-500/30 text-xs mb-4">
                  <div>
                    <span className="text-[9.5px] font-tech text-slate-400 uppercase tracking-wider block">Date & Day</span>
                    <span className="font-tech font-bold text-yellow-300">{activeSession.date}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-tech text-slate-400 uppercase tracking-wider block">Time Window</span>
                    <span className="font-tech font-bold text-white">{activeSession.time}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-white/10 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="font-mono text-yellow-200 text-xs font-semibold">{activeSession.venue}</span>
                  </div>
                </div>

                {/* Key Session Highlights */}
                <div className="mb-4">
                  <h4 className="font-tech text-xs uppercase tracking-wider text-yellow-400 font-bold mb-2">
                    Key Highlights & Agenda
                  </h4>
                  <div className="space-y-1.5">
                    {activeSession.highlights.map((item, idx) => (
                      <div key={idx} className="text-[11px] text-slate-300 flex items-start gap-2 bg-yellow-500/5 px-2.5 py-1.5 rounded-lg border border-yellow-500/15">
                        <span className="text-yellow-400 font-mono">▸</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-yellow-500/30 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleSetReminder}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-tech tracking-wider uppercase hover:bg-yellow-500/30 transition-all cursor-pointer"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>{reminderSaved ? "Reminder Set!" : "Set Reminder"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSession(null)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs font-tech font-bold tracking-wider uppercase hover:brightness-110 shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

