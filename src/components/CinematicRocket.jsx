import React, { forwardRef } from 'react';

const CinematicRocket = forwardRef((props, ref) => {
  return (
    <div 
      ref={ref}
      className="cinematic-rocket fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] pointer-events-none z-[100] will-change-transform"
      style={{ originY: '50%', originX: '50%' }}
    >
      <div className="rocket-exhaust absolute bottom-[-55px] left-1/2 -translate-x-1/2 w-16 h-40 opacity-0 transform origin-top scale-y-0 will-change-transform flex flex-col items-center">
        {/* Restored gorgeous flame aesthetics using tiny, GPU-friendly blurs (2-4px) instead of the extremely heavy 40px blurs */}
        <div className="absolute w-16 h-32 bg-gradient-to-b from-orange-500/80 via-red-600/40 to-transparent rounded-full blur-[4px]" />
        <div className="absolute w-8 h-24 bg-gradient-to-b from-yellow-400 via-orange-500/80 to-transparent rounded-full blur-[2px]" 
             style={{ animation: 'flicker 0.2s ease-in-out infinite alternate' }} />
        <div className="absolute w-3 h-16 bg-gradient-to-b from-white via-cyan-200/80 to-transparent rounded-full"
             style={{ animation: 'flicker 0.15s ease-in-out infinite alternate-reverse' }} />
        <div className="absolute w-1 h-1 bg-yellow-300 rounded-full blur-[1px] top-28 left-[45%]"
             style={{ animation: 'sparkDrift 0.6s ease-out infinite' }} />
        <div className="absolute w-1 h-1 bg-orange-400 rounded-full blur-[1px] top-24 left-[55%]"
             style={{ animation: 'sparkDrift 0.8s ease-out infinite 0.2s' }} />
      </div>

      <div className="relative z-10 drop-shadow-[0_0_25px_rgba(200,220,255,0.3)]">
        <svg 
          width="64" 
          height="120" 
          viewBox="0 0 64 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b0b8c8" />
              <stop offset="30%" stopColor="#e8ecf2" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#e0e4ec" />
              <stop offset="100%" stopColor="#8a92a4" />
            </linearGradient>
            <linearGradient id="noseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c0c8d8" />
              <stop offset="40%" stopColor="#f0f2f6" />
              <stop offset="60%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a0a8b8" />
            </linearGradient>
            <radialGradient id="windowGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#80d4ff" />
              <stop offset="60%" stopColor="#2090cc" />
              <stop offset="100%" stopColor="#104060" />
            </radialGradient>
            <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#708090" />
              <stop offset="100%" stopColor="#404850" />
            </linearGradient>
            <linearGradient id="nozzleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#555d6d" />
              <stop offset="100%" stopColor="#2a2e36" />
            </linearGradient>
            <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cc3030" />
              <stop offset="50%" stopColor="#ee4040" />
              <stop offset="100%" stopColor="#cc3030" />
            </linearGradient>
          </defs>

          <path d="M32 2 C32 2, 22 28, 20 35 L44 35 C42 28, 32 2, 32 2Z" fill="url(#noseGrad)" />
          <path d="M32 2 C32 2, 28 18, 27 25 L32 25 C31 18, 32 2, 32 2Z" fill="white" opacity="0.3" />
          <rect x="20" y="35" width="24" height="55" rx="2" fill="url(#bodyGrad)" />
          <rect x="30" y="35" width="4" height="55" fill="white" opacity="0.12" />
          <rect x="20" y="40" width="24" height="3" rx="0.5" fill="url(#stripeGrad)" />
          <rect x="20" y="78" width="24" height="3" rx="0.5" fill="url(#stripeGrad)" />
          <circle cx="32" cy="54" r="6" fill="url(#windowGlow)" stroke="#607080" strokeWidth="1.5" />
          <ellipse cx="30" cy="52" rx="2" ry="1.2" fill="white" opacity="0.5" />
          <line x1="20" y1="65" x2="44" y2="65" stroke="#a0a8b8" strokeWidth="0.5" opacity="0.5" />
          <line x1="20" y1="72" x2="44" y2="72" stroke="#a0a8b8" strokeWidth="0.5" opacity="0.5" />
          <path d="M20 75 L6 100 L10 100 L20 90 Z" fill="url(#finGrad)" stroke="#505860" strokeWidth="0.5" />
          <path d="M20 75 L12 95 L16 95 L20 85 Z" fill="white" opacity="0.1" />
          <path d="M44 75 L58 100 L54 100 L44 90 Z" fill="url(#finGrad)" stroke="#505860" strokeWidth="0.5" />
          <path d="M44 75 L52 95 L48 95 L44 85 Z" fill="white" opacity="0.1" />
          <path d="M28 85 L32 100 L36 85 Z" fill="#506070" opacity="0.5" />
          <path d="M24 90 L22 104 Q32 108 42 104 L40 90 Z" fill="url(#nozzleGrad)" stroke="#404850" strokeWidth="0.5" />
          <ellipse cx="32" cy="103" rx="8" ry="3" fill="#1a1e26" stroke="#404850" strokeWidth="0.5" />
          <line x1="22" y1="92" x2="14" y2="108" stroke="#606870" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="92" x2="50" y2="108" stroke="#606870" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="13" cy="109" rx="3" ry="1" fill="#505860" />
          <ellipse cx="51" cy="109" rx="3" ry="1" fill="#505860" />
        </svg>
      </div>

      <style>{`
        @keyframes flicker {
          0% { transform: scaleX(1) scaleY(1); opacity: 0.85; }
          100% { transform: scaleX(1.1) scaleY(1.04); opacity: 1; }
        }
        @keyframes sparkDrift {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(20px) scale(0); opacity: 0; }
        }
      `}</style>

    </div>
  );
});

export default CinematicRocket;
