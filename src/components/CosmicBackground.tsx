import React, { useEffect, useRef } from 'react';

/**
 * CosmicBackground Component
 * Renders a lightweight, high-performance starry particle field
 * with deep space nebula gradients and subtle constellations.
 * Honors prefers-reduced-motion automatically.
 */
export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = Math.min(Math.floor((width * height) / 14000), 100);
    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      alphaSpeed: number;
    }

    const colors = ['#38bdf8', '#818cf8', '#a855f7', '#06b6d4', '#e2e8f0'];
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.6 + 0.2,
      alphaSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1)
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between nearby stars
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update stars
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          p.alpha += p.alphaSpeed;
          if (p.alpha > 0.85 || p.alpha < 0.15) {
            p.alphaSpeed = -p.alphaSpeed;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Space Background Layer */}
      <div className="absolute inset-0 bg-[#040612]" />

      {/* Subtle Atmospheric Nebula Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-950/20 blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute top-[35%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-950/25 blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-indigo-950/20 blur-[150px] -z-10 pointer-events-none" />

      {/* Subtle Coordinate Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:6rem_6rem]" 
      />

      {/* Dynamic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
