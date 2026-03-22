import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const init = () => {
      canvas.width = width;
      canvas.height = height;
      particles = [];
      
      const particleCount = Math.floor((width * height) / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 0.5 + 0.1,
          alpha: Math.random() * 0.5 + 0.3
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
        particles.forEach((p) => {
          p.y += p.vy;
          p.x += p.vx;

        if (p.y > height) p.y = 0;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };

    init();
    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        backgroundColor: '#030610',
        backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(20, 10, 60, 0.5) 0%, transparent 70%), radial-gradient(circle at 20% 30%, rgba(10, 30, 80, 0.3) 0%, transparent 50%)'
      }}
    >
      <div className="absolute inset-0 bg-[#030610]/40 mix-blend-multiply pointer-events-none" />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen pointer-events-none"
      />
    </div>
  );
};

export default ParticleBackground;
