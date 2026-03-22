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
import SectionAntigravityVoid from './components/SectionAntigravityVoid';
import SectionMartianDescent from './components/SectionMartianDescent';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.config({ force3D: true });

function App() {
  const mainRef = useRef(null);
  const [introComplete, setIntroComplete] = useState(false);
  const getRocketRestState = () => {
    const isMobile = window.innerWidth < 768;

    return {
      restY: isMobile ? '4vh' : '12vh',
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
        scrub: 2,
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
    tl.to('.cinematic-rocket', { y: '-45vh', x: '0vw', xPercent: -50, rotation: 0, scale: 1, duration: 0.15, ease: 'power2.inOut' }, 0);
    tl.to('.cinematic-rocket', { rotation: 180, y: '-20vh', x: '10vw', scale: 0.8, duration: 0.08, ease: 'power1.inOut' }, 0.15);
    tl.to('.cinematic-rocket', { rotation: 90, x: '25vw', y: '10vh', scale: 0.7, duration: 0.06, ease: 'power1.inOut' }, 0.23);
    tl.to('.cinematic-rocket', { rotation: 0, x: '35vw', y: '-10vh', scale: 0.6, duration: 0.06, ease: 'power1.inOut' }, 0.29);
    tl.to('.cinematic-rocket', { rotation: -90, x: '15vw', y: '-25vh', scale: 0.7, duration: 0.06, ease: 'power1.inOut' }, 0.35);
    tl.to('.cinematic-rocket', { rotation: -180, x: '0vw', y: '-10vh', scale: 0.8, duration: 0.06, ease: 'power1.inOut' }, 0.41);
    tl.to('.cinematic-rocket', { 
      y: '10vh',
      x: '0.2vw',
      duration: 0.3, 
      ease: 'none' 
    }, 0.47);

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

    tl.to('.cinematic-rocket', { rotation: 0, scale: 0.8, x: '0vw', y: '0vh', duration: 0.15, ease: 'none' }, 0.75);
    tl.to(metrics, { vel: 3.5, duration: 0.2, ease: 'none' }, 0.75);

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
        <CinematicRocket />
        <JourneyHUD />
        <main className="relative z-10 w-full flex flex-col pt-0">
          <SectionLaunchpad />
          <SectionAtmosphericBreach />
          <SectionAntigravityVoid />
          <SectionMartianDescent />
        </main>
      </div>
    </>
  );
}

export default App;
