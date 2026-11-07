"use client";

import { useState } from "react";
import TechfestHUD from "@/components/TechfestHUD/TechfestHUD";
import {
  Cpu,
  ShieldAlert,
  Bot,
  Atom,
  Glasses,
  Database,
  ChevronRight,
  X as CloseIcon,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface Workshop {
  id: string;
  code: string;
  title: string;
  category: "track1" | "track2" | "track3" | "track4" | "track5" | "track6";
  categoryLabel: string;
  duration: string;
  capacity: string;
  mentorStatus: string;
  hardware: string;
  level: string;
  desc: string;
  prototypeNotice: string;
  modules: string[];
  prerequisites: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const WORKSHOPS: Workshop[] = [
  {
    id: "workshop-1",
    code: "LAB-01",
    title: "Workshop 1",
    category: "track1",
    categoryLabel: "Track 1",
    duration: "X Hours (Hands-on)",
    capacity: "XX Seats",
    mentorStatus: "[UNANNOUNCED // TBA]",
    hardware: "Hardware & cloud compute provided [TBA]",
    level: "All Skill Levels",
    desc: "Template workshop specification. Comprehensive hands-on laboratory modules, instructor credentials, and prerequisite toolchains will be detailed in the official 2027 release.",
    prototypeNotice: "TEMPLATE SPECIFICATION // Curriculum details under review for 2027.",
    modules: [
      "Unit 1: Foundation Architecture Overview [TBA]",
      "Unit 2: Hands-on Implementation & Lab Exercise [TBA]",
      "Unit 3: Production Pipeline & Best Practices [TBA]",
      "Unit 4: Interactive Capstone & Evaluation [TBA]",
    ],
    prerequisites: [
      "Prerequisite details will be released prior to registration launch.",
      "Laptop with modern browser and development tools.",
      "No prior domain certification required.",
    ],
    icon: Cpu,
  },
  {
    id: "workshop-2",
    code: "LAB-02",
    title: "Workshop 2",
    category: "track2",
    categoryLabel: "Track 2",
    duration: "X Hours (Live Hardware)",
    capacity: "XX Seats",
    mentorStatus: "[UNANNOUNCED // TBA]",
    hardware: "Lab equipment provided [TBA]",
    level: "All Skill Levels",
    desc: "Template workshop specification. Comprehensive hands-on laboratory modules, instructor credentials, and prerequisite toolchains will be detailed in the official 2027 release.",
    prototypeNotice: "TEMPLATE SPECIFICATION // Hardware verification in progress for 2027.",
    modules: [
      "Unit 1: Hardware Specs & System Engineering [TBA]",
      "Unit 2: Power Telemetry & Sensor Integration [TBA]",
      "Unit 3: Safety Protocols & Fail-Safe Mechanisms [TBA]",
      "Unit 4: Field Testing & Live Demonstration [TBA]",
    ],
    prerequisites: [
      "Basic electronics and hardware familiarity recommended.",
      "Safety gear and tools provided on-site.",
    ],
    icon: Bot,
  },
  {
    id: "workshop-3",
    code: "LAB-03",
    title: "Workshop 3",
    category: "track3",
    categoryLabel: "Track 3",
    duration: "X Hours (Sandbox CTF)",
    capacity: "XX Seats",
    mentorStatus: "[UNANNOUNCED // TBA]",
    hardware: "Cloud Sandbox Provided",
    level: "All Skill Levels",
    desc: "Template workshop specification. Comprehensive hands-on laboratory modules, instructor credentials, and prerequisite toolchains will be detailed in the official 2027 release.",
    prototypeNotice: "TEMPLATE SPECIFICATION // Sandbox environment preparation for 2027.",
    modules: [
      "Unit 1: System Architecture & Threat Modeling [TBA]",
      "Unit 2: Vulnerability Analysis & Sandbox Testing [TBA]",
      "Unit 3: Security Telemetry & Hardening Techniques [TBA]",
      "Unit 4: Live CTF Scenario & Evaluation [TBA]",
    ],
    prerequisites: [
      "Command-line and programming fundamentals.",
      "Personal laptop with standard SSH capabilities.",
    ],
    icon: ShieldAlert,
  },
  {
    id: "workshop-4",
    code: "LAB-04",
    title: "Workshop 4",
    category: "track4",
    categoryLabel: "Track 4",
    duration: "X Hours (Interactive)",
    capacity: "XX Seats",
    mentorStatus: "[UNANNOUNCED // TBA]",
    hardware: "Cloud Lab Workspace Provided",
    level: "All Skill Levels",
    desc: "Template workshop specification. Comprehensive hands-on laboratory modules, instructor credentials, and prerequisite toolchains will be detailed in the official 2027 release.",
    prototypeNotice: "TEMPLATE SPECIFICATION // Lab allocation scheduled for 2027.",
    modules: [
      "Unit 1: Core Mathematical & Algorithmic Foundations [TBA]",
      "Unit 2: Interactive Circuit & Algorithm Simulation [TBA]",
      "Unit 3: Optimization Pipelines & Benchmarking [TBA]",
      "Unit 4: Emerging Industry Applications [TBA]",
    ],
    prerequisites: [
      "Basic programming and algebra fundamentals.",
      "All compute frameworks provided in cloud container.",
    ],
    icon: Atom,
  },
  {
    id: "workshop-5",
    code: "LAB-05",
    title: "Workshop 5",
    category: "track5",
    categoryLabel: "Track 5",
    duration: "X Hours (Studio Lab)",
    capacity: "XX Seats",
    mentorStatus: "[UNANNOUNCED // TBA]",
    hardware: "Studio Hardware Provided [TBA]",
    level: "All Skill Levels",
    desc: "Template workshop specification. Comprehensive hands-on laboratory modules, instructor credentials, and prerequisite toolchains will be detailed in the official 2027 release.",
    prototypeNotice: "TEMPLATE SPECIFICATION // Studio allocation in progress for 2027.",
    modules: [
      "Unit 1: 3D Graphics & Spatial Rendering Pipelines [TBA]",
      "Unit 2: Real-Time Interactive Synthesis [TBA]",
      "Unit 3: Spatial Physics & Multi-User Interaction [TBA]",
      "Unit 4: Web Deployment & Device Testing [TBA]",
    ],
    prerequisites: [
      "Interest in interactive computer graphics or XR.",
      "Laptop with modern WebGL / WebGPU compatible browser.",
    ],
    icon: Glasses,
  },
  {
    id: "workshop-6",
    code: "LAB-06",
    title: "Workshop 6",
    category: "track6",
    categoryLabel: "Track 6",
    duration: "X Hours (Code Audit)",
    capacity: "XX Seats",
    mentorStatus: "[UNANNOUNCED // TBA]",
    hardware: "Development Suite Provided",
    level: "All Skill Levels",
    desc: "Template workshop specification. Comprehensive hands-on laboratory modules, instructor credentials, and prerequisite toolchains will be detailed in the official 2027 release.",
    prototypeNotice: "TEMPLATE SPECIFICATION // Test harness validation for 2027.",
    modules: [
      "Unit 1: Protocol Security & Invariant Formulation [TBA]",
      "Unit 2: Automated Testing & Property Verification [TBA]",
      "Unit 3: Security Auditing Best Practices [TBA]",
      "Unit 4: Autonomous Monitoring Deployments [TBA]",
    ],
    prerequisites: [
      "Programming and software design familiarity.",
      "Personal development machine with Git installed.",
    ],
    icon: Database,
  },
];

export default function WorkshopsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalWorkshop, setActiveModalWorkshop] = useState<Workshop | null>(null);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertSubmitted, setAlertSubmitted] = useState(false);

  const categories = [
    { id: "all", label: "All Labs" },
    { id: "track1", label: "Track 1" },
    { id: "track2", label: "Track 2" },
    { id: "track3", label: "Track 3" },
    { id: "track4", label: "Track 4" },
    { id: "track5", label: "Track 5" },
    { id: "track6", label: "Track 6" },
  ];

  const filteredWorkshops =
    selectedCategory === "all"
      ? WORKSHOPS
      : WORKSHOPS.filter((w) => w.category === selectedCategory);

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail.trim()) return;
    setAlertSubmitted(true);
    setTimeout(() => {
      setAlertSubmitted(false);
      setAlertEmail("");
    }, 4000);
  };

  return (
    <main className="relative min-h-screen text-[#e2e8f0] font-sans antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      {/* 1. Continuous Background Video (Matching user requirement) */}
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
        {/* Hero Title Only */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-tech tracking-tight text-white uppercase drop-shadow-[0_0_25px_rgba(250,204,21,0.35)]">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">Workshops</span> & Labs
          </h1>
        </div>

        {/* Category Filter Pills */}
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

        {/* Workshop Cards Grid - Framed Inside Provided Yellow Cyber Frame */}
        <div id="workshops-grid" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredWorkshops.map((workshop) => (
            <div
              key={workshop.id}
                onClick={() => setActiveModalWorkshop(workshop)}
                className="group relative w-full aspect-[768/1024] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 select-none"
              >
                {/* Yellow Cyber Mecha Frame Overlay (Provided Asset) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/workshop_frame.png"
                  alt="Workshop Mecha Frame"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-20 filter drop-shadow-[0_0_12px_rgba(234,179,8,0.3)] group-hover:drop-shadow-[0_0_24px_rgba(250,204,21,0.65)] group-hover:brightness-105 transition-all duration-300"
                />

                {/* Inner Content Container - Carefully Padded (px-[16%] pt-[15%] pb-[15%]) to Never Touch Any Frame Edges */}
                <div className="relative z-10 w-full h-full px-[16%] pt-[15%] pb-[15%] flex flex-col justify-between bg-[#050711]/75 backdrop-blur-sm rounded-[24px] overflow-hidden">
                  {/* Subtle Inner Ambient Glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-yellow-500/20 transition-all duration-500" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-600/20 transition-all duration-500" />

                  {/* Top Content Area */}
                  <div className="relative z-10">
                    {/* Header Row: Prototype Chip & Lab Code */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-tech text-[9.5px] px-2.5 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                        PROTOTYPE
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                        {workshop.code}
                      </span>
                    </div>

                    {/* Workshop Title */}
                    <h3 className="font-tech text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 leading-snug mt-1 mb-1">
                      {workshop.title}
                    </h3>

                    {/* Prototype Notice Line */}
                    <div className="text-[10px] font-mono text-yellow-400/90 font-medium tracking-wide uppercase mb-2">
                      [UNANNOUNCED // TENTATIVE SPEC]
                    </div>

                    {/* Description (Clamped so it never pushes layout) */}
                    <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed line-clamp-3 mb-2 font-light">
                      {workshop.desc}
                    </p>
                  </div>

                  {/* Middle Area: Telemetry Spec Box */}
                  <div className="relative z-10 my-auto py-2 px-3 rounded-xl bg-black/50 border border-yellow-500/25 grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="block text-[9px] font-tech text-slate-400 uppercase tracking-wider">Duration</span>
                      <span className="font-tech font-semibold text-yellow-300 truncate block">{workshop.duration}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-tech text-slate-400 uppercase tracking-wider">Capacity</span>
                      <span className="font-tech font-semibold text-white truncate block">{workshop.capacity}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-white/10">
                      <span className="block text-[9px] font-tech text-slate-400 uppercase tracking-wider">Instructor Status</span>
                      <span className="font-mono text-[9.5px] text-yellow-200/90 truncate block">To Be Announced</span>
                    </div>
                  </div>

                  {/* Bottom Footer Area */}
                  <div className="relative z-10 pt-2 border-t border-yellow-500/20 flex items-center justify-between">
                    <div>
                      <span className="block font-tech text-[8.5px] text-slate-400 uppercase tracking-wider">Curriculum</span>
                      <span className="font-tech text-[10.5px] font-bold text-yellow-400">Phase 2 Drop</span>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-[10.5px] font-tech tracking-wider uppercase group-hover:bg-yellow-400 group-hover:text-black group-hover:border-yellow-400 transition-all duration-200"
                    >
                      <span>Spec Blueprint</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Global Prototype Subscribe / Notice Section */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-black/60 border border-yellow-500/35 backdrop-blur-md shadow-[0_0_35px_rgba(234,179,8,0.15)] max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <span className="inline-block text-[11px] font-tech text-yellow-400 tracking-widest uppercase mb-1">
                Priority Notification Frequency
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-tech text-white uppercase tracking-tight mb-2">
                Get Unlocked When Labs Are Announced
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                Seats in each cyber workshop are strictly capped to ensure 1-on-1 mentor guidance. Enter your email to receive an early access cryptographic token 24 hours before tickets go live to the general public.
              </p>
            </div>

            <form onSubmit={handleAlertSubmit} className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
                placeholder="Enter cyber mail address..."
                className="px-4 py-2.5 rounded-xl bg-black/80 border border-yellow-500/40 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-yellow-400 w-full sm:w-64"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-tech font-bold text-xs tracking-wider uppercase hover:brightness-110 shadow-[0_0_18px_rgba(250,204,21,0.5)] transition-all cursor-pointer whitespace-nowrap"
              >
                {alertSubmitted ? "Token Reserved!" : "Request Access Token"}
              </button>
            </form>
          </div>

          {alertSubmitted && (
            <div className="mt-4 p-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span>Priority alert registered. We will transmit full syllabus and mentor disclosures directly to your inbox.</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. EXPANDED PROTOTYPE WORKSHOP MODAL */}
      {activeModalWorkshop && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={() => setActiveModalWorkshop(null)}
        >
          <div
            className="relative w-full max-w-2xl aspect-[768/1024] max-h-[92vh] flex flex-col justify-between select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Yellow Cyber Frame for Modal */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/workshop_frame.png"
              alt="Modal Mecha Frame"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none z-20 filter drop-shadow-[0_0_35px_rgba(250,204,21,0.5)]"
            />

            {/* Inner Content with Safe Margins */}
            <div className="relative z-10 w-full h-full px-[18%] pt-[16%] pb-[16%] flex flex-col justify-between bg-[#040610]/95 backdrop-blur-2xl rounded-[28px] overflow-y-auto custom-scrollbar">
              {/* Top Modal Controls */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-tech text-[10px] px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    PROTOTYPE DOSSIER // {activeModalWorkshop.code}
                  </span>

                  <button
                    onClick={() => setActiveModalWorkshop(null)}
                    className="p-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:text-white hover:bg-yellow-500/20 transition-all cursor-pointer"
                    aria-label="Close Modal"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="font-tech text-lg sm:text-2xl font-bold text-white mb-1.5 leading-snug">
                  {activeModalWorkshop.title}
                </h2>

                <div className="text-[11px] font-mono text-yellow-400/90 font-medium uppercase mb-3">
                  Domain: {activeModalWorkshop.categoryLabel} | Level: {activeModalWorkshop.level}
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {activeModalWorkshop.desc}
                </p>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/60 border border-yellow-500/30 mb-4 text-xs">
                  <div>
                    <span className="text-[9.5px] font-tech text-slate-400 uppercase tracking-wider block">Duration</span>
                    <span className="font-tech font-bold text-yellow-300">{activeModalWorkshop.duration}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-tech text-slate-400 uppercase tracking-wider block">Lab Capacity</span>
                    <span className="font-tech font-bold text-white">{activeModalWorkshop.capacity}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-white/10">
                    <span className="text-[9.5px] font-tech text-slate-400 uppercase tracking-wider block">Mentor Disclosure</span>
                    <span className="font-mono text-yellow-200 text-xs">{activeModalWorkshop.mentorStatus}</span>
                  </div>
                </div>

                {/* Curriculum Blueprint (Demo Modules) */}
                <div className="mb-4">
                  <h4 className="font-tech text-xs uppercase tracking-wider text-yellow-400 font-bold mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Curriculum Blueprint (Tentative Syllabus)</span>
                  </h4>
                  <div className="space-y-1.5">
                    {activeModalWorkshop.modules.map((mod, i) => (
                      <div key={i} className="text-[11px] text-slate-300 flex items-start gap-2 bg-yellow-500/5 px-2.5 py-1.5 rounded-lg border border-yellow-500/15">
                        <span className="text-yellow-400 font-mono">▸</span>
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="mb-4">
                  <h4 className="font-tech text-xs uppercase tracking-wider text-slate-300 font-bold mb-1.5">
                    Participant Prerequisites
                  </h4>
                  <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1 font-light">
                    {activeModalWorkshop.prerequisites.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action in Modal */}
              <div className="pt-3 border-t border-yellow-500/30 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[9px] font-tech text-slate-400 uppercase block">Enrollment Status</span>
                  <span className="text-xs font-tech font-bold text-yellow-400">Locked Until Phase 2</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    alert("Priority notification logged for " + activeModalWorkshop.title);
                    setActiveModalWorkshop(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs font-tech font-bold tracking-wider uppercase hover:brightness-110 shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all cursor-pointer"
                >
                  Notify When Announced
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

