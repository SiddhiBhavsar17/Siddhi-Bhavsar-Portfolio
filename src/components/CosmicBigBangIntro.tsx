import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, FastForward, Sparkles, Orbit, ArrowRight, FileText } from 'lucide-react';
import { cosmicAudio } from '../utils/cosmicAudio';
import { personalData } from '../data/personalData';
import { skillsData } from '../data/skills';

interface CosmicBigBangIntroProps {
  onComplete: () => void;
}

interface IncomingSkill {
  id: string;
  name: string;
  side: 'left' | 'right';
  startTime: number;
  endTime: number;
  curveYRatio: number;
  color: string;
  glowColor: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
  color: string;
  width: number;
}

interface ExplosionParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  isStardust: boolean;
}

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  growthSpeed: number;
  angle: number;
  rotationSpeed: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
}

/**
 * Safe Canvas Radial Gradient Helper
 * Validates finite values and prevents negative/inverted radii.
 */
function createSafeRadialGradient(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  r0: number,
  x1: number,
  y1: number,
  r1: number
): CanvasGradient | null {
  if (
    !Number.isFinite(x0) ||
    !Number.isFinite(y0) ||
    !Number.isFinite(r0) ||
    !Number.isFinite(x1) ||
    !Number.isFinite(y1) ||
    !Number.isFinite(r1)
  ) {
    return null;
  }
  const safeR0 = Math.max(0, r0);
  const safeR1 = Math.max(safeR0 + 0.01, r1);
  try {
    return ctx.createRadialGradient(x0, y0, safeR0, x1, y1, safeR1);
  } catch {
    return null;
  }
}

/**
 * Cross-browser rounded rectangle helper for Canvas.
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export const CosmicBigBangIntro: React.FC<CosmicBigBangIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [phase, setPhase] = useState<'initial' | 'absorbing' | 'suspense' | 'supernova' | 'reveal' | 'complete'>('initial');
  const [isMuted, setIsMuted] = useState<boolean>(() => cosmicAudio.getMuted());
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [activeSkillLabel, setActiveSkillLabel] = useState<string | null>(null);

  // =========================================================================
  // SEQUENTIAL TIMING SCHEDULE (Target ~11–13 seconds)
  // ONE particle arrives at a time -> COLLISION -> ball grows -> PAUSE
  // =========================================================================
  // 1. Initial 2 skills collide at center to create the persistent golden ball:
  //    Travel: 300ms -> 1900ms. Collision at 1900ms. Pause: 1900ms -> 2500ms.
  // 2. Sequential individual arrivals (alternating Left / Right):
  //    Skill 3: 2500ms -> 3200ms. Collision at 3200ms. Pause: 3200ms -> 3600ms.
  //    Skill 4: 3600ms -> 4300ms. Collision at 4300ms. Pause: 4300ms -> 4700ms.
  //    Skill 5: 4700ms -> 5400ms. Collision at 5400ms. Pause: 5400ms -> 5800ms.
  //    Skill 6: 5800ms -> 6500ms. Collision at 6500ms. Pause: 6500ms -> 6900ms.
  //    Skill 7: 6900ms -> 7600ms. Collision at 7600ms. Pause: 7600ms -> 8000ms.
  //    Skill 8: 8000ms -> 8700ms. Collision at 8700ms. Pause: 8700ms -> 9100ms.
  // 3. Suspense Pulse: 9100ms -> 10200ms (Giant golden ball pulses and builds tension)
  // 4. Supernova Explosion: 10200ms -> 11500ms (Massive explosion!)
  // 5. Portfolio Reveal: 11500ms -> 13600ms (Name, photo, headline appear)
  // 6. Complete & Smooth Transition: 13600ms -> 14100ms
  const INITIAL_COLLISION = 1900;
  const SUSPENSE_START = 9100;
  const SUPERNOVA_EXPLOSION = 10200;
  const REVEAL_START = 11200;
  const FADEOUT_START = 16800;
  const TOTAL_DURATION = 17400;

  // Ball radius growth stages:
  // Initial 2 skills: 16px
  // After skill 3: 24px
  // After skill 4: 32px
  // After skill 5: 41px
  // After skill 6: 50px
  // After skill 7: 60px
  // After skill 8: 72px (giant golden energy ball)
  const BALL_RADII = [16, 24, 32, 41, 50, 60, 72];

  // Curated 8 real skills from existing skillsData in portfolio
  const sequenceSkills: IncomingSkill[] = useMemo(() => {
    // Verified real skills from skillsData
    const pool = [
      { name: "Machine Learning", side: 'left' as const, start: 300, end: 1900, yRatio: 0.46, color: '#38bdf8', glow: '#0284c7' },
      { name: "Deep Learning", side: 'right' as const, start: 300, end: 1900, yRatio: 0.54, color: '#c084fc', glow: '#9333ea' },
      { name: "Generative AI", side: 'left' as const, start: 2500, end: 3200, yRatio: 0.42, color: '#facc15', glow: '#ca8a04' },
      { name: "Python", side: 'right' as const, start: 3600, end: 4300, yRatio: 0.58, color: '#38bdf8', glow: '#0284c7' },
      { name: "OpenCV", side: 'left' as const, start: 4700, end: 5400, yRatio: 0.50, color: '#4ade80', glow: '#16a34a' },
      { name: "FastAPI", side: 'right' as const, start: 5800, end: 6500, yRatio: 0.44, color: '#2dd4bf', glow: '#0d9488' },
      { name: "NLP", side: 'left' as const, start: 6900, end: 7600, yRatio: 0.56, color: '#e879f9', glow: '#c026d3' },
      { name: "React", side: 'right' as const, start: 8000, end: 8700, yRatio: 0.48, color: '#67e8f9', glow: '#0891b2' }
    ];

    return pool.map((s, idx) => ({
      id: `skill-${idx}`,
      name: s.name,
      side: s.side,
      startTime: s.start,
      endTime: s.end,
      curveYRatio: s.yRatio,
      color: s.color,
      glowColor: s.glow
    }));
  }, []);

  const isCompletedRef = useRef(false);
  const isFadingOutRef = useRef(false);
  const collisionsTriggeredRef = useRef<boolean[]>([]);
  const explosionAudioTriggeredRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    isFadingOutRef.current = true;

    // Immediately stop and silence any audio
    cosmicAudio.stopAll();

    // Immediately unlock body and html scrolling for normal portfolio navigation
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    setIsFadingOut(true);
    setPhase('complete');
    
    // Quick, smooth handoff to the portfolio without holding the visitor back
    setTimeout(() => {
      onComplete();
    }, 350);
  }, [onComplete]);

  // Handle Mute toggle
  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const muted = cosmicAudio.toggleMute();
    setIsMuted(muted);
  };

  // Keyboard controls: ESC or Space to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Only lock body scroll during initial star collision sequence.
  // As soon as reveal or complete phase is reached, or when intro finishes, unlock immediately!
  useEffect(() => {
    if (phase !== 'reveal' && phase !== 'complete') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [phase]);

  // Clean initialization and teardown of audio and scroll
  useEffect(() => {
    cosmicAudio.reset();
    isCompletedRef.current = false;
    isFadingOutRef.current = false;
    collisionsTriggeredRef.current = new Array(sequenceSkills.length).fill(false);
    explosionAudioTriggeredRef.current = false;

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      cosmicAudio.stopAll();
    };
  }, [sequenceSkills.length]);

  // Allow natural mouse wheel or mobile touch scrolling during reveal phase
  useEffect(() => {
    if (phase !== 'reveal') return;

    // Ensure scrolling is completely open
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 15) {
        handleFinish();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY || 0;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY || 0;
      if (touchStartY - currentY > 20) {
        handleFinish();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [phase, handleFinish]);

  useEffect(() => {
    // Check user prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      handleFinish();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const getDimensions = () => {
      const w = Math.max(320, window.innerWidth || document.documentElement.clientWidth || 800);
      const h = Math.max(320, window.innerHeight || document.documentElement.clientHeight || 600);
      return { w, h };
    };

    let { w: width, h: height } = getDimensions();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setupCanvasSize = () => {
      const dims = getDimensions();
      width = dims.w;
      height = dims.h;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    setupCanvasSize();

    const onResize = () => {
      setupCanvasSize();
    };
    window.addEventListener('resize', onResize);

    const startTime = performance.now();

    // Sound and collision triggers tracked by flags
    const collisionTriggered = new Array(sequenceSkills.length).fill(false);
    let explosionAudioTriggered = false;

    // Persistent shockwaves and ripples
    const shockwaves: Shockwave[] = [];
    const explosionParticles: ExplosionParticle[] = [];
    const nebulaClouds: NebulaCloud[] = [];

    // Ambient background stars
    const bgStars: { x: number; y: number; r: number; alpha: number; color: string }[] = [];
    for (let i = 0; i < 180; i++) {
      bgStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: ['#ffffff', '#bae6fd', '#fef08a', '#e9d5ff'][Math.floor(Math.random() * 4)]
      });
    }

    let shakeIntensity = 0;

    // Helper: spawn massive Supernova explosion at final stage
    const triggerSupernova = (cx: number, cy: number) => {
      shakeIntensity = 28;

      // Concentric expanding shockwaves
      shockwaves.push(
        { x: cx, y: cy, radius: 10, maxRadius: Math.max(width, height) * 1.25, speed: 28, alpha: 1, color: '#ffffff', width: 8 },
        { x: cx, y: cy, radius: 20, maxRadius: Math.max(width, height) * 1.10, speed: 22, alpha: 0.95, color: '#facc15', width: 14 },
        { x: cx, y: cy, radius: 30, maxRadius: Math.max(width, height) * 0.95, speed: 17, alpha: 0.9, color: '#38bdf8', width: 18 },
        { x: cx, y: cy, radius: 45, maxRadius: Math.max(width, height) * 0.85, speed: 13, alpha: 0.85, color: '#c084fc', width: 24 }
      );

      // Swirling golden and purple nebula clouds
      const nebulaCols = [
        { r: 250, g: 204, b: 21 }, // Golden
        { r: 168, g: 85, b: 247 }, // Purple
        { r: 56, g: 189, b: 248 }, // Electric blue
        { r: 245, g: 158, b: 11 }, // Amber
        { r: 192, g: 132, b: 252 }  // Lavender
      ];

      for (let i = 0; i < 10; i++) {
        const col = nebulaCols[i % nebulaCols.length];
        nebulaClouds.push({
          x: cx + (Math.random() - 0.5) * 60,
          y: cy + (Math.random() - 0.5) * 60,
          radius: 30 + Math.random() * 35,
          maxRadius: Math.min(width, height) * (0.45 + Math.random() * 0.3),
          growthSpeed: 4.8 + Math.random() * 2.5,
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.012,
          r: col.r,
          g: col.g,
          b: col.b,
          alpha: 0.8
        });
      }

      // Over 1,800 energetic cosmic particles
      const particleCols = ['#ffffff', '#fef08a', '#facc15', '#38bdf8', '#c084fc', '#e879f9', '#67e8f9', '#fbbf24'];
      const count = Math.min(Math.floor((width * height) / 800), 2000);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speedMultiplier = Math.pow(Math.random(), 1.6);
        const speed = 2.5 + speedMultiplier * 32;

        explosionParticles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.4),
          vy: Math.sin(angle) * speed * (0.8 + Math.random() * 0.4),
          size: Math.random() * 3.0 + 0.6,
          alpha: 1,
          decay: 0.002 + Math.random() * 0.0045,
          color: particleCols[Math.floor(Math.random() * particleCols.length)],
          twinkleSpeed: 0.05 + Math.random() * 0.1,
          twinklePhase: Math.random() * Math.PI * 2,
          isStardust: Math.random() > 0.3
        });
      }
    };

    // Main animation loop
    const render = (now: number) => {
      try {
        const currentNow = Number.isFinite(now) ? now : performance.now();
        const elapsed = Math.max(0, currentNow - startTime);
        const cx = width / 2;
        const cy = height / 2;

        if (isCompletedRef.current) return;

        // =====================================================================
        // COLLISION DETECTION & AUDIO TRIGGERS (ONE AT A TIME)
        // =====================================================================
        // Collision 1 (Initial 2 particles hit simultaneously at 1900ms)
        if (!collisionsTriggeredRef.current[0] && !isCompletedRef.current && elapsed >= INITIAL_COLLISION) {
          collisionsTriggeredRef.current[0] = true;
          collisionsTriggeredRef.current[1] = true;
          cosmicAudio.playAbsorption(0);
          shakeIntensity = 8;
          // Spawn golden ripple
          shockwaves.push({
            x: cx,
            y: cy,
            radius: 8,
            maxRadius: Math.min(width, height) * 0.35,
            speed: 8,
            alpha: 1,
            color: '#fef08a',
            width: 4
          });
          setPhase('absorbing');
        }

        // Sequential individual collisions for skills 3 to 8
        for (let i = 2; i < sequenceSkills.length; i++) {
          const sk = sequenceSkills[i];
          if (!collisionsTriggeredRef.current[i] && !isCompletedRef.current && elapsed >= sk.endTime) {
            collisionsTriggeredRef.current[i] = true;
            cosmicAudio.playAbsorption(i - 1);
            shakeIntensity = 4 + (i * 1.2);
            // Spawn expanding golden shockwave ripple
            shockwaves.push({
              x: cx,
              y: cy,
              radius: BALL_RADII[i - 1] || 20,
              maxRadius: Math.min(width, height) * (0.28 + i * 0.04),
              speed: 9 + i * 0.8,
              alpha: 0.95,
              color: i % 2 === 0 ? '#facc15' : '#fef08a',
              width: 3.5 + i * 0.5
            });
          }
        }

        // Suspense state
        if (elapsed >= SUSPENSE_START && elapsed < SUPERNOVA_EXPLOSION && phase !== 'suspense') {
          setPhase('suspense');
        }

        // Supernova explosion
        if (!explosionAudioTriggeredRef.current && !isCompletedRef.current && elapsed >= SUPERNOVA_EXPLOSION) {
          explosionAudioTriggeredRef.current = true;
          cosmicAudio.playBigBangImpact();
          triggerSupernova(cx, cy);
          setPhase('supernova');
        }

        // Portfolio reveal - immediately restore natural page scrolling
        if (elapsed >= REVEAL_START && elapsed < FADEOUT_START && phase !== 'reveal') {
          setPhase('reveal');
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }

        if (elapsed >= FADEOUT_START && !isFadingOutRef.current) {
          isFadingOutRef.current = true;
          setIsFadingOut(true);
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }

        if (elapsed >= TOTAL_DURATION) {
          handleFinish();
          return;
        }

        // Screen shake computation
        let offsetX = 0;
        let offsetY = 0;
        if (shakeIntensity > 0.1) {
          offsetX = (Math.random() - 0.5) * shakeIntensity;
          offsetY = (Math.random() - 0.5) * shakeIntensity;
          shakeIntensity *= 0.91;
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.translate(offsetX, offsetY);

        // 1. Deep Space Black Canvas
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#030510';
        ctx.fillRect(-50, -50, width + 100, height + 100);

        // Dynamic Space Atmosphere Gradient
        const maxDim = Math.max(width, height, 100);
        const bgGrad = createSafeRadialGradient(
          ctx,
          cx, cy, 10,
          cx, cy, maxDim * 0.85
        );

        if (bgGrad) {
          if (elapsed < SUPERNOVA_EXPLOSION) {
            // Calm atmospheric purple-blue space with warm golden glow gathering at center
            const energyBuildRatio = Math.min(1, elapsed / SUSPENSE_START);
            bgGrad.addColorStop(0, `rgba(45, 25, 75, ${0.35 + energyBuildRatio * 0.3})`);
            bgGrad.addColorStop(0.35, `rgba(12, 18, 48, ${0.25 + energyBuildRatio * 0.2})`);
            bgGrad.addColorStop(1, 'rgba(2, 4, 12, 1)');
          } else {
            // Post-supernova cosmic bloom
            const expAge = elapsed - SUPERNOVA_EXPLOSION;
            const atmosphereAlpha = Math.max(0, 1 - expAge / 3200);
            bgGrad.addColorStop(0, `rgba(65, 25, 100, ${atmosphereAlpha * 0.7})`);
            bgGrad.addColorStop(0.4, `rgba(18, 30, 80, ${atmosphereAlpha * 0.45})`);
            bgGrad.addColorStop(1, 'rgba(2, 4, 12, 1)');
          }
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, width, height);
        }

        // Render ambient background stars
        for (let i = 0; i < bgStars.length; i++) {
          const star = bgStars[i];
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.alpha;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // =====================================================================
        // PERSISTENT CENTRAL GOLDEN ENERGY BALL (Born at 1900ms, grows repeatedly)
        // =====================================================================
        if (elapsed >= INITIAL_COLLISION && elapsed < SUPERNOVA_EXPLOSION) {
          // Count how many collisions have occurred so far
          let collisionCount = 0;
          if (elapsed >= INITIAL_COLLISION) collisionCount = 1; // initial pair
          for (let i = 2; i < sequenceSkills.length; i++) {
            if (elapsed >= sequenceSkills[i].endTime) {
              collisionCount = i;
            }
          }

          // Target radius according to collisions
          const baseRadius = BALL_RADII[Math.min(collisionCount - 1, BALL_RADII.length - 1)] || 16;
          
          // Suspense pulsing in Scene 3 (8s - 10s)
          let pulseFactor = 1;
          if (elapsed >= SUSPENSE_START) {
            const suspenseProgress = (elapsed - SUSPENSE_START) / (SUPERNOVA_EXPLOSION - SUSPENSE_START);
            // Throbbing rapid pulse building tension
            pulseFactor = 1 + Math.sin(suspenseProgress * Math.PI * 12) * 0.15 + (suspenseProgress * 0.2);
          } else {
            // Gentle idle breathing
            pulseFactor = 1 + Math.sin(elapsed * 0.005) * 0.03;
          }

          const currentRadius = baseRadius * pulseFactor;

          // Outer Volumetric Golden Corona Halo
          const coronaRadius = Math.max(currentRadius * 2.5, currentRadius + 30);
          const coronaGrad = createSafeRadialGradient(
            ctx,
            cx, cy, currentRadius * 0.4,
            cx, cy, coronaRadius
          );

          if (coronaGrad) {
            coronaGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)'); // Bright golden yellow
            coronaGrad.addColorStop(0.3, 'rgba(250, 204, 21, 0.65)');  // Pure gold
            coronaGrad.addColorStop(0.65, 'rgba(245, 158, 11, 0.35)'); // Amber aura
            coronaGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
            ctx.fillStyle = coronaGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, coronaRadius, 0, Math.PI * 2);
            ctx.fill();
          }

          // Intense Golden Core
          const coreGrad = createSafeRadialGradient(
            ctx,
            cx, cy, 0,
            cx, cy, currentRadius
          );
          if (coreGrad) {
            coreGrad.addColorStop(0, '#ffffff');                     // Pure white-hot center
            coreGrad.addColorStop(0.35, '#fef9c3');                  // Warm white
            coreGrad.addColorStop(0.7, '#facc15');                   // Deep gold
            coreGrad.addColorStop(1, 'rgba(234, 179, 8, 0.8)');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
            ctx.fill();
          }

          // Golden Star Diffracting Diffraction Cross-Spikes (grow with the ball)
          const spikeLen = currentRadius * 2.6;
          const spikeAlpha = Math.min(1, 0.4 + (collisionCount / sequenceSkills.length) * 0.5);
          ctx.strokeStyle = `rgba(255, 255, 255, ${spikeAlpha})`;
          ctx.lineWidth = Math.max(1, 1.2 + collisionCount * 0.3);
          ctx.beginPath();
          ctx.moveTo(cx - spikeLen, cy);
          ctx.lineTo(cx + spikeLen, cy);
          ctx.moveTo(cx, cy - spikeLen);
          ctx.lineTo(cx, cy + spikeLen);
          ctx.stroke();

          // Energy Count Indicator badge in top center of ball
          ctx.font = '600 10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`ENERGY LEVEL ${collisionCount}/${sequenceSkills.length - 1}`, cx, cy + currentRadius + 18);
        }

        // =====================================================================
        // ACTIVE INCOMING SKILL PARTICLES (ONLY ONE AT A TIME IN SCENE 2)
        // =====================================================================
        let currentActiveLabel: string | null = null;

        // 1. Initial 2 skills (0ms -> 1900ms)
        if (elapsed < INITIAL_COLLISION) {
          const sk1 = sequenceSkills[0]; // Left
          const sk2 = sequenceSkills[1]; // Right
          const progress = Math.min(1, Math.max(0, (elapsed - sk1.startTime) / (sk1.endTime - sk1.startTime)));
          // Quadratic ease-in to emphasize approach
          const ease = Math.pow(progress, 1.6);

          // Left skill particle
          const startXLeft = Math.max(30, width * 0.05);
          const startYLeft = height * sk1.curveYRatio;
          const leftX = startXLeft + (cx - startXLeft) * ease;
          const leftY = startYLeft + (cy - startYLeft) * ease;

          // Right skill particle
          const startXRight = Math.min(width - 30, width * 0.95);
          const startYRight = height * sk2.curveYRatio;
          const rightX = startXRight + (cx - startXRight) * ease;
          const rightY = startYRight + (cy - startYRight) * ease;

          // Render skill nodes
          renderSkillNode(ctx, leftX, leftY, sk1.name, 'left', sk1.color, sk1.glowColor);
          renderSkillNode(ctx, rightX, rightY, sk2.name, 'right', sk2.color, sk2.glowColor);

          // Plasma lightning arc between them as they approach
          const dist = Math.hypot(rightX - leftX, rightY - leftY);
          if (dist < width * 0.6) {
            const arcAlpha = Math.max(0, 1 - dist / (width * 0.6));
            ctx.strokeStyle = `rgba(254, 240, 138, ${arcAlpha * 0.8})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(leftX, leftY);
            ctx.quadraticCurveTo((leftX + rightX) / 2, (leftY + rightY) / 2 + (Math.random() - 0.5) * 40, rightX, rightY);
            ctx.stroke();
          }

          currentActiveLabel = `${sk1.name} & ${sk2.name} Approaching`;
        }

        // 2. Sequential individual skills (2500ms -> 8700ms)
        // STRICT RULE: Only ONE particle active at a time!
        for (let i = 2; i < sequenceSkills.length; i++) {
          const sk = sequenceSkills[i];
          if (elapsed >= sk.startTime && elapsed < sk.endTime) {
            currentActiveLabel = `${sk.name} Approaching`;
            const progress = Math.min(1, Math.max(0, (elapsed - sk.startTime) / (sk.endTime - sk.startTime)));
            const ease = Math.pow(progress, 1.7); // Accelerates into collision

            let x = 0;
            let y = 0;
            if (sk.side === 'left') {
              const startX = Math.max(25, width * 0.04);
              const startY = height * sk.curveYRatio;
              x = startX + (cx - startX) * ease;
              // Gentle bezier wave
              y = startY + (cy - startY) * ease + Math.sin(progress * Math.PI) * 25;
            } else {
              const startX = Math.min(width - 25, width * 0.96);
              const startY = height * sk.curveYRatio;
              x = startX + (cx - startX) * ease;
              y = startY + (cy - startY) * ease - Math.sin(progress * Math.PI) * 25;
            }

            // Render glowing trail behind incoming particle
            ctx.fillStyle = sk.color;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(x + (sk.side === 'left' ? -15 : 15), y, 4, 0, Math.PI * 2);
            ctx.fill();

            renderSkillNode(ctx, x, y, sk.name, sk.side, sk.color, sk.glowColor);
            break; // Guaranteed ONLY ONE skill particle active!
          }
        }

        setActiveSkillLabel(currentActiveLabel);

        // =====================================================================
        // SHOCKWAVES & RIPPLES (Render and update)
        // =====================================================================
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const sw = shockwaves[i];
          sw.radius += sw.speed;
          const ratio = sw.maxRadius > 0 ? sw.radius / sw.maxRadius : 1;
          sw.alpha = Math.max(0, 1 - ratio);

          if (sw.alpha <= 0.01 || sw.radius >= sw.maxRadius) {
            shockwaves.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = Math.max(1, sw.width * sw.alpha);
          ctx.globalAlpha = Math.max(0, Math.min(1, sw.alpha));
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, Math.max(1, sw.radius), 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // =====================================================================
        // SUPERNOVA EXPLOSION PARTICLES & NEBULA CLOUDS (Scene 3 & 4)
        // =====================================================================
        if (elapsed >= SUPERNOVA_EXPLOSION) {
          const expAge = elapsed - SUPERNOVA_EXPLOSION;
          ctx.globalCompositeOperation = 'lighter';

          // Swirling Nebula Clouds
          for (let i = 0; i < nebulaClouds.length; i++) {
            const cloud = nebulaClouds[i];
            if (cloud.radius < cloud.maxRadius) {
              cloud.radius += cloud.growthSpeed;
            }
            cloud.angle += cloud.rotationSpeed;

            const currentAlpha = Math.max(0, cloud.alpha * (1 - expAge / 3400));
            const safeRadius = Math.max(5, cloud.radius);

            const nGrad = createSafeRadialGradient(
              ctx,
              cloud.x, cloud.y, 0,
              cloud.x, cloud.y, safeRadius
            );

            if (nGrad) {
              nGrad.addColorStop(0, `rgba(${cloud.r}, ${cloud.g}, ${cloud.b}, ${currentAlpha * 0.4})`);
              nGrad.addColorStop(0.5, `rgba(${cloud.r}, ${cloud.g}, ${cloud.b}, ${currentAlpha * 0.18})`);
              nGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

              ctx.fillStyle = nGrad;
              ctx.beginPath();
              ctx.arc(cloud.x, cloud.y, safeRadius, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          // Cosmic Stardust Particles
          for (let i = 0; i < explosionParticles.length; i++) {
            const p = explosionParticles[i];
            p.x += p.vx;
            p.y += p.vy;

            // Deceleration into twinkling starfield
            p.vx *= 0.965;
            p.vy *= 0.965;

            p.alpha -= p.decay;
            if (p.alpha < 0.18 && p.isStardust) {
              p.alpha = 0.35 + Math.sin(p.twinklePhase) * 0.25;
              p.twinklePhase += p.twinkleSpeed;
            }

            if (p.alpha <= 0) continue;

            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
            ctx.fill();
          }

          // Initial White-Hot Supernova Flash (0 – 450ms)
          if (expAge < 450) {
            const flashProgress = expAge / 450;
            const flashAlpha = Math.sin(flashProgress * Math.PI);
            const flashRadius = Math.max(100, maxDim * 0.75);

            const flashGrad = createSafeRadialGradient(
              ctx,
              cx, cy, 0,
              cx, cy, flashRadius
            );

            if (flashGrad) {
              flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha * 0.98})`);
              flashGrad.addColorStop(0.25, `rgba(254, 240, 138, ${flashAlpha * 0.85})`);
              flashGrad.addColorStop(0.5, `rgba(168, 85, 247, ${flashAlpha * 0.6})`);
              flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

              ctx.fillStyle = flashGrad;
              ctx.fillRect(0, 0, width, height);
            }

            // High-power starburst cross
            ctx.strokeStyle = `rgba(255, 255, 255, ${flashAlpha})`;
            ctx.lineWidth = Math.max(1, 4.5 * flashAlpha);
            ctx.beginPath();
            ctx.moveTo(cx - width, cy);
            ctx.lineTo(cx + width, cy);
            ctx.moveTo(cx, cy - height);
            ctx.lineTo(cx, cy + height);
            ctx.stroke();
          }
        }

        ctx.restore();
      } catch (err) {
        console.warn('Frame render recovery:', err);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      cosmicAudio.stopAll();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [handleFinish, sequenceSkills]);

  /**
   * Helper to render an incoming skill particle with a crisp, readable glass badge
   */
  function renderSkillNode(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    name: string,
    side: 'left' | 'right',
    color: string,
    glowColor: string
  ) {
    ctx.save();
    ctx.translate(x, y);

    // Glowing core orb
    const orbGrad = createSafeRadialGradient(ctx, 0, 0, 0, 0, 0, 16);
    if (orbGrad) {
      orbGrad.addColorStop(0, '#ffffff');
      orbGrad.addColorStop(0.35, color);
      orbGrad.addColorStop(0.7, glowColor);
      orbGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    // Brilliant center dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    // High-Contrast Glass Skill Name Badge
    const fontSize = 12;
    ctx.font = `600 ${fontSize}px "JetBrains Mono", "Fira Code", monospace`;
    const textMetrics = ctx.measureText(name);
    const textWidth = textMetrics.width;
    const paddingX = 12;
    const pillWidth = textWidth + paddingX * 2;
    const pillHeight = fontSize + 12;

    // Position pill beside the orb (away from moving direction)
    const pillX = side === 'left' ? -(pillWidth + 12) : 12;
    const pillY = -pillHeight / 2;

    // Capsule background
    ctx.fillStyle = 'rgba(5, 8, 22, 0.92)';
    drawRoundedRect(ctx, pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
    ctx.fill();

    // Glowing border
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Skill Name Text
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, pillX + paddingX, 0.5);

    ctx.restore();
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] bg-[#030510] overflow-hidden select-none transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-label="Cosmic Big Bang Portfolio Intro"
    >
      {/* High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Top Controls: Sound Toggle & Skip Intro */}
      <div className="absolute top-3 sm:top-5 left-0 right-0 z-30 px-3 sm:px-8 flex items-center justify-between pointer-events-auto">
        {/* Sound Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-slate-950/85 border border-slate-700/60 hover:border-yellow-400 text-slate-200 hover:text-white backdrop-blur-md transition-all text-[11px] sm:text-xs font-mono group cursor-pointer shadow-lg min-h-[42px] active:scale-95"
          aria-label={isMuted ? 'Turn Sound On' : 'Mute Sound'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-yellow-400" />
              <span>Sound: Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span className="text-yellow-300">Sound: On</span>
            </>
          )}
        </button>

        {/* Skip Intro Button */}
        <button
          type="button"
          onClick={handleFinish}
          className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950/85 border border-slate-700/60 hover:border-yellow-400 text-slate-200 hover:text-white backdrop-blur-md transition-all text-[11px] sm:text-xs font-mono group cursor-pointer shadow-lg min-h-[42px] active:scale-95"
          aria-label="Skip Intro Animation"
        >
          <span>Skip</span>
          <FastForward className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline text-[10px] text-slate-400 font-mono">[Esc]</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SCENE 4: REVEAL MY PORTFOLIO (Centered Cosmic Identity Reveal)             */}
      {/* ========================================================================= */}
      {phase === 'reveal' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-3 sm:px-4">
          <div className="text-center max-w-xl mx-auto space-y-2.5 sm:space-y-3.5 my-auto py-6 sm:py-8 pointer-events-auto w-full">
            {/* 1. Staggered Profile Photo with Glowing Golden Cosmic Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center"
            >
              {/* Outer Golden Glow Aura */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-tr from-amber-500/30 via-purple-500/25 to-yellow-400/30 blur-lg sm:blur-xl pointer-events-none" />

              {/* Spinning Golden Dashed Orbit Ring */}
              <div 
                className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-amber-400/60 border-dashed animate-spin pointer-events-none" 
                style={{ animationDuration: '20s' }} 
              />

              {/* Glowing Golden Cosmic Ring Vessel */}
              <div className="relative w-full h-full rounded-full p-[2.5px] sm:p-[3px] bg-gradient-to-tr from-amber-400 via-purple-500 to-yellow-300 shadow-[0_0_35px_rgba(251,191,36,0.65)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#070b1f] border-2 border-[#030614]">
                  <img
                    src={personalData.profileImage}
                    alt={personalData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Orbit Sparkle Badge */}
              <div className="absolute bottom-0 right-0 p-1 sm:p-1.5 rounded-full bg-[#030614] border border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]">
                <Orbit className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </motion.div>

            {/* 2. Cosmic Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-amber-300 text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase px-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE DIGITAL UNIVERSE OF</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </motion.div>

            {/* 3. Full Name in Grand Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-purple-200 tracking-tight sm:tracking-wider uppercase drop-shadow-[0_0_35px_rgba(251,191,36,0.6)] break-words px-2"
            >
              {personalData.name}
            </motion.h1>

            {/* 4. Professional Headline & Academic Credential */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-0.5 sm:space-y-1 px-2"
            >
              <p className="text-xs sm:text-sm text-slate-200 font-mono tracking-wider sm:tracking-widest uppercase">
                {personalData.title} · PCU (CGPA 9.07)
              </p>
              <p className="text-[11px] sm:text-xs md:text-sm text-amber-300/90 font-mono">
                Machine Learning ✦ Deep Learning ✦ Generative AI ✦ Python
              </p>
            </motion.div>

            {/* 5. Introduction & Motto */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light px-2"
            >
              &ldquo;{personalData.motto || "Building intelligent systems for a better tomorrow."}&rdquo;
            </motion.p>

            {/* 6. Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-0 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={handleFinish}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(251,191,36,0.6)] cursor-pointer active:scale-95 min-h-[44px] w-full sm:w-auto"
              >
                <span>Enter Portfolio</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href={personalData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#120d2a]/90 hover:bg-[#1c1440] border border-purple-500/60 hover:border-purple-300 text-purple-200 hover:text-white font-mono text-xs transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95 min-h-[44px] w-full sm:w-auto"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>View Resume</span>
              </a>
            </motion.div>
          </div>
        </div>
      )}

      {/* Dynamic Status Badge (Bottom) */}
      <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-300 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          <span>
            {phase === 'initial' && 'Cosmic Skill Stream Initializing...'}
            {phase === 'absorbing' && (activeSkillLabel || 'Golden Energy Core Absorbing Skills...')}
            {phase === 'suspense' && 'Energy Ball Reaching Critical Mass...'}
            {phase === 'supernova' && 'Supernova Big Bang Explosion!'}
            {phase === 'reveal' && 'Welcome to Siddhi\'s Digital Universe'}
            {phase === 'complete' && 'Welcome'}
          </span>
        </div>
      </div>
    </div>
  );
};
