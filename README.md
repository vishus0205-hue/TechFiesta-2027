# TechFiesta 2027 🚀

> Annual National Science & Technology Festival Portal & Cyber Arena Template

![TechFiesta 2027](https://img.shields.io/badge/TechFiesta-2027-00f0ff?style=for-the-badge&logo=react&logoColor=black)
![Next.js 16](https://img.shields.io/badge/Next.js-16.4.5-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock)

---

## 🌌 Overview

**TechFiesta 2027** is a next-generation, hyper-futuristic web portal designed for science and technology festivals. Built with Next.js 16 (App Router), Tailwind CSS v4, and GSAP ScrollTrigger, it features high-performance cyber UI elements, custom metallic armor frames, interactive dossiers, and continuous atmospheric video backgrounds.

---

## ✨ Key Features

- **Futuristic HUD Navigation Bar**:
  - Floating top navigation pill with electric cyan glow and active underline bars.
  - Automatic ScrollSpy that tracks viewport position across festival sections.
  - Modular routing across `/`, `/schedule`, `/workshops`, and `/gallery`.
  - Collapsible bottom-right "Connect" social channels popover.

- **Cinematic Canvas Portal Sequence**:
  - High-speed 80-frame canvas scrubbing synchronized with scroll velocity via GSAP ScrollTrigger.
  - Instant fallback rendering ensuring zero blank screens while loading.
  - Seamless optical flash transition into a continuous looping background video.

- **Sci-Fi Cyber Armor Framing**:
  - All competition cards are individually framed in high-resolution metallic armor frames (`/cyber_frame.png`) with cyan & purple edge illumination.
  - Calculated safe interior margins ensuring content never collides with frame apertures.

- **Dedicated Workshops Division (`/workshops`)**:
  - Yellow Mecha Cyber Armor frames (`/workshop_frame.png`) with amber ambient glows.
  - Interactive specification dossiers with modular syllabus blueprints and early access reservation tokens.

- **Media Archives & Retrospective (`/gallery`)**:
  - Rich archive cards displaying video reels and photo archives from previous editions.
  - Interactive lightbox modal with responsive video players and stadium metadata.

- **Festival Timeline & Schedule (`/schedule`)**:
  - Multi-day breakdown across all festival tracks.
  - Session dossier modals with venue coordinates, key highlights, and calendar reminder triggers.

- **Template Generalization & Abstracted Metrics**:
  - Abstracted prize bounty figures (`₹XX,XX,XXX+`) and parameterized event tracks.
  - Fully customizable structure ready for annual festival rollouts.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.4.5](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS
- **Animations**: [GSAP 3.15](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Typography**: [Orbitron](https://fonts.google.com/specimen/Orbitron) & [Inter](https://fonts.google.com/specimen/Inter)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or Node.js 20+

### Installation

```bash
# Clone the repository
git clone https://github.com/vishus0205-hue/TechFiesta-2027.git
cd TechFiesta-2027

# Install dependencies
npm install

# Start development server
npm run dev

# Or build for production
npm run build
npm start
```

Visit `http://localhost:3000` to explore the experience.

---

## 📄 License
MIT License. Inspired by annual collegiate technical symposiums.
