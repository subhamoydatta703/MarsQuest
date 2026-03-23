import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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
gsap.config({ force3D: true });

function App() {
  const mainRef = useRef(null);
  const [introComplete, setIntroComplete] = useState(false);
  const getRocketRestState = () => {
    const isMobile = window.innerWidth < 768;

    return {
      restY: isMobile ? '23vh' : '15vh',
      touchDownY: isMobile ? '4vh' : '12vh',
      bounceY: isMobile ? '5vh' : '13vh',
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
      document.body.style.overflow = 'auto';
      ScrollTrigger.refresh();
      gsap.to('.launchpad-dashboard', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
      gsap.to('.cinematic-rocket', { opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.4 });
      gsap.to('.journey-hud', { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 });
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [introComplete]);

  useGSAP(() => {
    const rocketRestState = getRocketRestState();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        invalidateOnRefresh: true,
        fastScrollEnd: true
      }
    });

    gsap.set('.cinematic-rocket', {
      scale: rocketRestState.scale,
      y: rocketRestState.restY,
      x: '0vw',
      xPercent: -50,
      yPercent: -50
    });
    tl.to('.journey-hud', { opacity: 1, y: 0, duration: 0.05 }, 0);

    tl.to('.rocket-exhaust', { opacity: 1, scaleY: 1, duration: 0.1 }, 0);
    // Phase 1: Launch from Earth (0 - 0.15)
    tl.to('.cinematic-rocket', { y: '-45vh', x: '0vw', xPercent: -50, rotation: 0, scale: 1, duration: 0.15, ease: 'power2.inOut' }, 0);
    
    // Phase 2: Lunar Flyby Loop (0.15 - 0.38)
    tl.to('.cinematic-rocket', { rotation: 160, y: '-20vh', x: '10vw', scale: 0.8, duration: 0.06, ease: 'sine.inOut' }, 0.15);
    tl.to('.cinematic-rocket', { rotation: 90, x: '25vw', y: '10vh', scale: 0.7, duration: 0.06, ease: 'sine.inOut' }, 0.21);
    tl.to('.cinematic-rocket', { rotation: 0, x: '35vw', y: '-10vh', scale: 0.65, duration: 0.06, ease: 'sine.inOut' }, 0.27);
    tl.to('.cinematic-rocket', { rotation: -90, x: '15vw', y: '-25vh', scale: 0.7, duration: 0.06, ease: 'sine.inOut' }, 0.33);
    
    // Phase 3: Deep Space Cruise (0.38 - 0.48)
    tl.to('.cinematic-rocket', { rotation: -180, x: '0vw', y: '-10vh', scale: 0.8, duration: 0.10, ease: 'power1.inOut' }, 0.38);
    
    // Phase 4: Asteroid Belt Dodge (0.48 - 0.60)
    tl.to('.cinematic-rocket', { x: '-20vw', y: '-5vh', rotation: -210, scale: 0.75, duration: 0.06, ease: 'power2.out' }, 0.48);
    tl.to('.cinematic-rocket', { x: '15vw', y: '5vh', rotation: -150, scale: 0.7, duration: 0.06, ease: 'power2.inOut' }, 0.54);
    
    // Phase 5: Through the Void (0.60 - 0.75) — previously the dead zone
    tl.to('.cinematic-rocket', { x: '5vw', y: '0vh', rotation: -180, scale: 0.75, duration: 0.05, ease: 'power1.inOut' }, 0.60);
    tl.to('.cinematic-rocket', { x: '-5vw', y: '5vh', rotation: -175, scale: 0.7, duration: 0.05, ease: 'sine.inOut' }, 0.65);
    tl.to('.cinematic-rocket', { x: '0vw', y: '10vh', rotation: -180, scale: 0.75, duration: 0.05, ease: 'sine.inOut' }, 0.70);

    // Phase 6: Mars Approach & Descent (0.75 - 0.92)
    tl.to('.cinematic-rocket', { rotation: 0, scale: 0.8, x: '0vw', y: '-5vh', duration: 0.08, ease: 'power2.inOut' }, 0.75);
    tl.to('.cinematic-rocket', { y: '5vh', scale: 0.75, duration: 0.09, ease: 'sine.in' }, 0.83);

    const metrics = { dist: 0, vel: 11.2, days: 0, fuel: 100 };
    tl.to(metrics, {
      dist: 140000000,
      vel: 24.5,
      days: 210,
      fuel: 14,
      duration: 0.5,
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
    }, 0.4);

    tl.to(metrics, { vel: 3.5, duration: 0.15, ease: 'none' }, 0.80);

    // Phase 7: Touchdown (0.92 - 1.0)
    tl.to('.rocket-exhaust', { opacity: 0, scaleY: 0, duration: 0.03 }, 0.92);
    tl.to('.cinematic-rocket', { y: rocketRestState.touchDownY, scale: 0.7, duration: 0.03 }, 0.92);
    tl.to('.cinematic-rocket', { scaleY: 0.65, scaleX: 0.72, y: rocketRestState.bounceY, duration: 0.02 }, 0.95);
    tl.to('.cinematic-rocket', { scaleY: 0.7, scaleX: 0.7, y: rocketRestState.touchDownY, duration: 0.03 }, 0.97);
    tl.to('.hud-status-light', { backgroundColor: '#3b82f6', duration: 0.05 }, 0.95);
    tl.to('.hud-status-text', { textContent: 'Touchdown Confirmed', duration: 0.05 }, 0.95);
    tl.to('.landing-ui-panel', { opacity: 1, duration: 0.03 }, 0.92);
    tl.to('.landing-scanline', { height: '100%', duration: 0.05 }, 0.92);

  }, { scope: mainRef });

  return (
    <>
      <ParticleBackground />
      {!introComplete && <SectionSolarSystem onComplete={() => setIntroComplete(true)} />}

      <div ref={mainRef} className="relative w-full bg-transparent selection:bg-accent selection:text-space-900 overflow-x-hidden text-white font-sans">
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
