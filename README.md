# Journey to Mars

Journey to Mars (MarsQuest) is a cinematic, scroll-driven space experience. The project takes the user from an interactive solar system intro to Earth launch, lunar flyby, deep-space transit, and final Martian descent using React, GSAP, and Tailwind CSS.

**Author:** Subhamoy Datta

## What It Does

- Opens with an interactive solar system scene that transitions into the mission.
- Animates a persistent rocket across the full journey using GSAP and ScrollTrigger.
- Displays mission telemetry, fuel, and status updates as the story progresses.
- Uses large atmospheric planet visuals and story cards to make the trip feel like a narrative instead of a static landing page.
- Ends with a Mars touchdown sequence and mission confirmation panel.

## Tech Stack

- React 19
- Vite 8
- GSAP + ScrollTrigger
- Tailwind CSS 4
- Lucide React

## Project Structure

```text
src/
  App.jsx                        Main orchestration and master timeline
  index.css                      Global theme tokens and base styles
  components/
    SectionSolarSystem.jsx       Intro scene and Earth transition
    SectionLaunchpad.jsx         Launch scene on Earth
    SectionAtmosphericBreach.jsx Lunar flyby scene
    SectionAntigravityVoid.jsx   Deep-space horizontal scroll section
    SectionMartianDescent.jsx    Arrival and landing scene
    CinematicRocket.jsx          Persistent rocket visual
    JourneyHUD.jsx               Telemetry overlay
    ParticleBackground.jsx       Animated starfield background
```

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is ready to deploy on Vercel.

- Framework: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

A matching config is already included in [`vercel.json`](./vercel.json).

## Notes

- The app is a single-page experience with no backend or environment variables required.
- Some visuals use remote planet imagery URLs, so an internet connection is needed for those textures to load.
- The repository still contains a few starter assets from the original Vite scaffold, but the app itself is powered by the components in `src/components`.

## Project Vision

Journey to Mars turns a normal project page into an interactive mission. Instead of explaining space travel with static blocks of text, it lets the user feel the arc of launch, transit, and landing through motion, telemetry, and immersive visuals.
