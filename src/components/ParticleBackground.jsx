import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Pseudo-3D starfield logic
    let stars = [];
    const numStars = width < 768 ? 400 : 800;
    const baseSpeed = 1.0;

    const init = () => {
      canvas.width = width;
      canvas.height = height;
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width
        });
      }
    };

    const render = () => {
      ctx.fillStyle = 'rgba(3, 6, 16, 0.25)'; // Trailing effect
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Make scroll position affect speed slightly for parallax
      const scrollY = window.scrollY;
      const dynamicSpeed = baseSpeed + (scrollY * 0.0005);

      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        
        star.z -= dynamicSpeed;
        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
        }

        const x = cx + star.x / star.z * width;
        const y = cy + star.y / star.z * width;
        
        // Star size gets bigger as it gets closer
        const r = Math.max(0.1, (1 - star.z / width) * 2);
        
        // Parallax tail
        const pz = star.z + dynamicSpeed;
        const px = cx + star.x / pz * width;
        const py = cy + star.y / pz * width;

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.lineWidth = r;
          ctx.strokeStyle = `rgba(200, 220, 255, ${Math.min(1, 1 - star.z / width + 0.2)})`;
          ctx.stroke();
        }
      }
      
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
        className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen pointer-events-none"
      />
    </div>
  );
};

export default ParticleBackground;
