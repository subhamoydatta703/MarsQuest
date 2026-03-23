import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

import ParticleBackground from './components/ParticleBackground';
import CinematicRocket from './components/CinematicRocket';
import JourneyHUD from './components/JourneyHUD';
import SectionSolarSystem from './components/SectionSolarSystem';
import SectionLaunchpad from './components/SectionLaunchpad';
import SectionAtmosphericBreach from './components/SectionAtmosphericBreach';
import SectionDeepSpace from './components/SectionDeepSpace';
import SectionAntigravityVoid from './components/SectionAntigravityVoid';
import SectionMartianDescent from './components/SectionMartianDescent';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true }); // Crucial for preventing heavy lag on mobile address bar hide/show
gsap.config({ force3D: true });

function App() {
  const mainRef = useRef(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [introUnmounted, setIntroUnmounted] = useState(false);

  useEffect(() => {
    // Initialize Lenis for buttery smooth native-feel scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Smoothness intensity
      wheelMultiplier: 1.0,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from messing with Lenis timing

    window.lenis = lenis; // Expose for reset

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      window.lenis = null;
    };
  }, []);

  const getRocketRestState = () => {
    const isMobile = window.innerWidth < 768;

    return {
      restY: isMobile ? '25vh' : '22vh', // Sits perfectly on the Earth curve apex
      touchDownY: isMobile ? '40vh' : '35vh',
      bounceY: isMobile ? '38vh' : '33vh',
      scale: isMobile ? 0.25 : 0.3,
    };
  };

  useEffect(() => {
    const rocketRestState = getRocketRestState();

    if (!introComplete) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      gsap.set('.launchpad-dashboard', { opacity: 0, y: 60 });
      gsap.set('.journey-hud', { opacity: 0, x: -60 });
      gsap.set('.cinematic-rocket', {
        opacity: 0,
        y: rocketRestState.restY,
        x: '0vw',
        xPercent: -50,
        yPercent: -50,
        rotation: 0,
        scale: rocketRestState.scale
      });
    } else {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0); 
      
      // Start cross-fade handoff
      gsap.to('.solar-intro-container', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => setIntroUnmounted(true)
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100); 

      gsap.to('.launchpad-dashboard', { opacity: 1, y: 0, duration: 1.6, ease: 'power2.out', delay: 0.2 });
      gsap.to('.cinematic-rocket', { opacity: 1, duration: 1.8, ease: 'power2.out', delay: 0.4 });
      gsap.to('.journey-hud', { opacity: 1, x: 0, duration: 1.6, ease: 'power2.out', delay: 0.6 });
    }
    return () => { document.body.style.overflow = ''; };
  }, [introComplete]);

  useGSAP(() => {
    if (!introComplete) return; // Critical: only build scroll timelines ONCE after intro avoids infinite timeline duplication bugs freezing the rocket mid-air on scroll

    const rocketRestState = getRocketRestState();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Lenis handles the smoothing, so GSAP can lock 1:1 without rubber-banding
        invalidateOnRefresh: true,
        fastScrollEnd: true
      }
    });

    gsap.set('.cinematic-rocket', {
      scale: rocketRestState.scale,
      y: rocketRestState.restY,
      x: '0vw',
      rotation: 0
    });

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    
    // Time checkpoints mapped mathematically to scroll distances in px!
    const t0 = 0;
    const tMoon = 1.5 * vh;
    const tAst = 3.0 * vh;
    const tVoid = 4.5 * vh;
    const tVoidEnd = 4.5 * vh + 3 * vw; // 300vw is precisely the pin width
    const tMars = tVoidEnd + 1.0 * vh;
    
    tl.to('.journey-hud', { opacity: 1, y: 0, duration: 0.1 * vh }, t0);
    tl.to('.rocket-exhaust', { opacity: 1, scaleY: 1, duration: 0.2 * vh }, t0);

    // Phase 1: Launch (t0 to 1.0vh)
    tl.to('.cinematic-rocket', { y: '-35vh', x: '0vw', rotation: 0, scale: 1, duration: 1.0 * vh, ease: 'power2.inOut' }, t0);
    
    // Drift & Tilt (Fixes the hanging frozen gap from 1.0 to 1.5vh)
    tl.to('.cinematic-rocket', { y: '-30vh', x: '5vw', rotation: 45, scale: 0.9, duration: 0.5 * vh, ease: 'power1.inOut' }, 1.0 * vh);
    
    // Phase 2: Moon Flyby S-Curve
    tl.to('.cinematic-rocket', { x: '25vw', y: '-10vh', rotation: 90, scale: 0.7, duration: 0.5 * vh, ease: 'sine.inOut' }, tMoon);
    tl.to('.cinematic-rocket', { x: '25vw', y: '15vh', rotation: 180, scale: 0.65, duration: 0.5 * vh, ease: 'sine.inOut' }, tMoon + 0.5 * vh);
    tl.to('.cinematic-rocket', { x: '0vw', y: '15vh', rotation: 225, scale: 0.8, duration: 0.5 * vh, ease: 'sine.inOut' }, tMoon + 1.0 * vh);

    // Phase 3: Asteroid Belt Dodge
    tl.to('.cinematic-rocket', { x: '-25vw', y: '0vh', rotation: 315, scale: 0.75, duration: 0.75 * vh, ease: 'sine.inOut' }, tAst);
    tl.to('.cinematic-rocket', { x: '20vw', y: '10vh', rotation: 150, scale: 0.7, duration: 0.75 * vh, ease: 'sine.inOut' }, tAst + 0.75 * vh);
    
    // Phase 4: Through the Void (Handles exact width of the horizontal scrolling pin dynamically)
    const voidDur = 3 * vw;
    tl.to('.cinematic-rocket', { x: '-15vw', y: '15vh', rotation: 210, scale: 0.85, duration: voidDur * 0.33, ease: 'sine.inOut' }, tVoid);
    tl.to('.cinematic-rocket', { x: '15vw', y: '5vh', rotation: 150, scale: 0.75, duration: voidDur * 0.33, ease: 'sine.inOut' }, tVoid + voidDur * 0.33);
    tl.to('.cinematic-rocket', { x: '0vw', y: '15vh', rotation: 180, scale: 0.8, duration: voidDur * 0.34, ease: 'sine.inOut' }, tVoid + voidDur * 0.66);

    // Phase 5: Mars Approach (Retro-burn flip)
    tl.to('.cinematic-rocket', { rotation: 360, scale: 0.85, x: '0vw', y: '-5vh', duration: 1.0 * vh, ease: 'power2.inOut' }, tVoidEnd);
    tl.to('.cinematic-rocket', { y: '10vh', scale: 0.8, duration: 1.0 * vh, ease: 'sine.in' }, tMars);

    // Telemetry Update
    const metrics = { dist: 0, vel: 11.2, days: 0, fuel: 100 };
    tl.to(metrics, {
      dist: 140000000,
      vel: 24.5,
      days: 210,
      fuel: 14,
      duration: tMars - tAst,
      ease: 'none',
      onUpdate: () => {
        const hudDist = document.querySelector('.hud-dist');
        const hudVel = document.querySelector('.hud-vel');
        const hudDays = document.querySelector('.hud-days');
        const hudFuel = document.querySelector('.hud-fuel');
        
        if (hudDist) hudDist.innerText = `${Math.floor(metrics.dist).toLocaleString()} km`;
        if (hudVel) hudVel.innerText = `${metrics.vel.toFixed(1)} km/s`;
        if (hudDays) hudDays.innerText = String(Math.floor(metrics.days));
        if (hudFuel) hudFuel.innerText = `${Math.floor(metrics.fuel)}%`;
        
        gsap.set('.hud-fuel-bar', { scaleX: Math.max(0, metrics.fuel / 100) });
      }
    }, tAst);

    tl.to(metrics, { vel: 3.5, duration: 0.5 * vh, ease: 'none' }, tMars);

    // Phase 6: Touchdown
    const tTouch = tVoidEnd + 2.0 * vh;
    tl.to('.rocket-exhaust', { opacity: 0, scaleY: 0, duration: 0.1 * vh }, tTouch);
    tl.to('.cinematic-rocket', { y: rocketRestState.touchDownY, scale: 0.7, duration: 0.1 * vh }, tTouch);
    tl.to('.cinematic-rocket', { scaleY: 0.65, scaleX: 0.72, y: rocketRestState.bounceY, duration: 0.1 * vh }, tTouch + 0.1 * vh);
    tl.to('.cinematic-rocket', { scaleY: 0.7, scaleX: 0.7, y: rocketRestState.touchDownY, duration: 0.1 * vh }, tTouch + 0.2 * vh);
    
    tl.to('.hud-status-light', { backgroundColor: '#3b82f6', duration: 0.1 * vh }, tTouch);
    tl.to('.hud-status-text', { textContent: 'Touchdown Confirmed', duration: 0.1 * vh }, tTouch);
    tl.to('.landing-ui-panel', { opacity: 1, duration: 0.2 * vh }, tTouch);
    tl.to('.landing-scanline', { height: '100%', duration: 0.2 * vh }, tTouch);

  }, { scope: mainRef, dependencies: [introComplete] });

  return (
    <>
      <ParticleBackground />
      {!introUnmounted && (
        <div className="solar-intro-container fixed inset-0 z-[999]">
          <SectionSolarSystem onComplete={() => setIntroComplete(true)} />
        </div>
      )}

      <div ref={mainRef} className="relative w-full transition-opacity duration-300 bg-transparent selection:bg-accent selection:text-space-900 overflow-x-hidden text-white font-sans">
        <CustomCursor />
        <CinematicRocket />
        <JourneyHUD />
        <main className="relative z-10 w-full flex flex-col pt-0">
          <SectionLaunchpad />
          <SectionAtmosphericBreach />
          <SectionDeepSpace />
          <SectionAntigravityVoid />
          <SectionMartianDescent />
        </main>
      </div>
    </>
  );
}

export default App;
