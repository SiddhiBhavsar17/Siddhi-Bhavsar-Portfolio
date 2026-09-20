import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileDown, 
  ArrowRight,
  Brain,
  Sparkles,
  Code2,
  Eye,
  Layers,
  Network,
  Zap,
  Cpu,
  Terminal,
  Database,
  GitBranch,
  Github,
  Atom,
  BookOpen,
  Gamepad2
} from 'lucide-react';
import { personalData } from '../data/personalData';
import heroDroneImg from '../assets/hero-drone.svg';
import profileFallback from '../assets/profile/profile-placeholder.svg';

interface HeroProps {
  onOpenResume: () => void;
}

interface OrbitBadge {
  id: string;
  name: string;
  icon: React.ReactNode;
  angleDeg: number; // initial angle on orbit in degrees (0 = top, 90 = right, etc.)
  color: string;
  border: string;
  bg: string;
  glowColor: string;
  isHobby?: boolean;
  desktopOnly?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [avatarError, setAvatarError] = useState(false);
  const fullName = personalData.name.toUpperCase();
  const [typedName, setTypedName] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  // Smooth typewriter effect that runs ONCE upon page load without glitch/distortion
  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;

    const startDelay = setTimeout(() => {
      const typeNextChar = () => {
        if (index < fullName.length) {
          index++;
          setTypedName(fullName.slice(0, index));
          timer = setTimeout(typeNextChar, 80);
        } else {
          setTypingComplete(true);
        }
      };
      typeNextChar();
    }, 750);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timer);
    };
  }, [fullName]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // =========================================================================
  // 1. INNER ORBIT (Radius: ~145px Desktop, ~120px Tablet, ~95px Mobile)
  // CORE AI: AI/ML, Generative AI, Python (3 evenly spaced items at 120° offsets)
  // =========================================================================
  const innerOrbitBadges: OrbitBadge[] = [
    {
      id: 'aiml',
      name: 'AI/ML',
      icon: <Brain className="w-3.5 h-3.5 text-cyan-400" />,
      angleDeg: 30, // upper-right
      color: 'text-cyan-300',
      border: 'border-cyan-500/40',
      bg: 'bg-[#06182c]/90',
      glowColor: 'rgba(6,182,212,0.35)'
    },
    {
      id: 'genai',
      name: 'Generative AI',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
      angleDeg: 150, // lower-right
      color: 'text-purple-300',
      border: 'border-purple-500/40',
      bg: 'bg-[#180a2c]/90',
      glowColor: 'rgba(168,85,247,0.35)'
    },
    {
      id: 'python',
      name: 'Python',
      icon: <Code2 className="w-3.5 h-3.5 text-emerald-400" />,
      angleDeg: 270, // mid-left
      color: 'text-emerald-300',
      border: 'border-emerald-500/40',
      bg: 'bg-[#071f1a]/90',
      glowColor: 'rgba(52,211,153,0.35)'
    }
  ];

  // =========================================================================
  // 2. MIDDLE ORBIT (Radius: ~225px Desktop, ~185px Tablet, ~140px Mobile)
  // TECHNICAL SKILLS: Computer Vision, Machine Learning, Deep Learning, FastAPI, OpenCV
  // (5 items evenly spaced at ~72° offsets)
  // =========================================================================
  const middleOrbitBadges: OrbitBadge[] = [
    {
      id: 'cv',
      name: 'Computer Vision',
      icon: <Eye className="w-3.5 h-3.5 text-blue-400" />,
      angleDeg: 0, // top
      color: 'text-blue-300',
      border: 'border-blue-500/40',
      bg: 'bg-[#081533]/90',
      glowColor: 'rgba(59,130,246,0.3)'
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      icon: <Layers className="w-3.5 h-3.5 text-indigo-400" />,
      angleDeg: 72, // top-right
      color: 'text-indigo-300',
      border: 'border-indigo-500/40',
      bg: 'bg-[#0e1238]/90',
      glowColor: 'rgba(99,102,241,0.3)'
    },
    {
      id: 'dl',
      name: 'Deep Learning',
      icon: <Network className="w-3.5 h-3.5 text-violet-400" />,
      angleDeg: 144, // bottom-right
      color: 'text-violet-300',
      border: 'border-violet-500/40',
      bg: 'bg-[#170e36]/90',
      glowColor: 'rgba(139,92,246,0.3)'
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      icon: <Zap className="w-3.5 h-3.5 text-teal-400" />,
      angleDeg: 216, // bottom-left
      color: 'text-teal-300',
      border: 'border-teal-500/40',
      bg: 'bg-[#051c20]/90',
      glowColor: 'rgba(20,184,166,0.3)',
      desktopOnly: true
    },
    {
      id: 'opencv',
      name: 'OpenCV',
      icon: <Cpu className="w-3.5 h-3.5 text-sky-400" />,
      angleDeg: 288, // top-left
      color: 'text-sky-300',
      border: 'border-sky-500/40',
      bg: 'bg-[#08182b]/90',
      glowColor: 'rgba(14,165,233,0.3)'
    }
  ];

  // =========================================================================
  // 3. OUTER ORBIT (Radius: ~310px Desktop, ~250px Tablet, ~185px Mobile)
  // DEVELOPMENT: C++, Java, SQL, Git, GitHub
  // + 3 subtle small hobby nodes: Physics, Reading, Gaming
  // + 🤖 FLYING BOT AI SATELLITE continuously orbiting this outer ring
  // =========================================================================
  const outerOrbitBadges: OrbitBadge[] = [
    {
      id: 'cpp',
      name: 'C++',
      icon: <Terminal className="w-3 h-3 text-cyan-400" />,
      angleDeg: 20,
      color: 'text-cyan-300',
      border: 'border-cyan-500/35',
      bg: 'bg-[#08172c]/90',
      glowColor: 'rgba(6,182,212,0.25)',
      desktopOnly: true
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: <Atom className="w-3 h-3 text-amber-400" />,
      angleDeg: 65,
      color: 'text-amber-300',
      border: 'border-amber-500/35',
      bg: 'bg-[#1e1708]/90',
      glowColor: 'rgba(245,158,11,0.25)',
      isHobby: true,
      desktopOnly: true
    },
    {
      id: 'java',
      name: 'Java',
      icon: <Code2 className="w-3 h-3 text-orange-400" />,
      angleDeg: 110,
      color: 'text-orange-300',
      border: 'border-orange-500/35',
      bg: 'bg-[#221208]/90',
      glowColor: 'rgba(249,115,22,0.25)',
      desktopOnly: true
    },
    {
      id: 'sql',
      name: 'SQL',
      icon: <Database className="w-3 h-3 text-blue-400" />,
      angleDeg: 160,
      color: 'text-blue-300',
      border: 'border-blue-500/35',
      bg: 'bg-[#09152b]/90',
      glowColor: 'rgba(59,130,246,0.25)'
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: <BookOpen className="w-3 h-3 text-pink-400" />,
      angleDeg: 205,
      color: 'text-pink-300',
      border: 'border-pink-500/35',
      bg: 'bg-[#20091d]/90',
      glowColor: 'rgba(236,72,153,0.25)',
      isHobby: true,
      desktopOnly: true
    },
    {
      id: 'git',
      name: 'Git',
      icon: <GitBranch className="w-3 h-3 text-red-400" />,
      angleDeg: 250,
      color: 'text-red-300',
      border: 'border-red-500/35',
      bg: 'bg-[#220c0e]/90',
      glowColor: 'rgba(239,68,68,0.25)'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: <Gamepad2 className="w-3 h-3 text-purple-400" />,
      angleDeg: 295,
      color: 'text-purple-300',
      border: 'border-purple-500/35',
      bg: 'bg-[#180927]/90',
      glowColor: 'rgba(168,85,247,0.25)',
      isHobby: true,
      desktopOnly: true
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <Github className="w-3 h-3 text-slate-300" />,
      angleDeg: 340,
      color: 'text-slate-300',
      border: 'border-slate-500/35',
      bg: 'bg-[#0d1117]/90',
      glowColor: 'rgba(148,163,184,0.25)'
    }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-[96vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 11. BACKGROUND: SUBTLE COSMIC PARTICLES, NETWORKS & ORBIT TRACES          */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10"
      >
        {/* Soft central solar aura glow behind the profile sun */}
        <div className="absolute w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[680px] lg:h-[680px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-indigo-600/10 to-pink-500/10 blur-3xl pointer-events-none" />

        {/* Faint network connection rays emanating from the core */}
        <svg className="absolute w-[600px] h-[600px] lg:w-[860px] lg:h-[860px] text-cyan-500/15 pointer-events-none">
          <line x1="50%" y1="50%" x2="85%" y2="25%" stroke="rgba(56,189,248,0.18)" strokeWidth="0.8" strokeDasharray="3 6" />
          <line x1="50%" y1="50%" x2="15%" y2="30%" stroke="rgba(168,85,247,0.18)" strokeWidth="0.8" strokeDasharray="3 6" />
          <line x1="50%" y1="50%" x2="80%" y2="75%" stroke="rgba(52,211,153,0.18)" strokeWidth="0.8" strokeDasharray="3 6" />
          <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="rgba(99,102,241,0.18)" strokeWidth="0.8" strokeDasharray="3 6" />
        </svg>

        {/* Subtle twinkling stardust nodes in the solar system */}
        <span className="absolute top-[18%] left-[22%] w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-ping" />
        <span className="absolute top-[72%] right-[18%] w-1.5 h-1.5 rounded-full bg-purple-400/50 animate-ping delay-1000" />
        <span className="absolute top-[28%] right-[20%] w-1 h-1 rounded-full bg-emerald-400/60 animate-pulse delay-500" />
        <span className="absolute bottom-[25%] left-[24%] w-1 h-1 rounded-full bg-pink-400/60 animate-pulse delay-700" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. THE SOLAR SYSTEM: 3 SYMMETRICAL ELLIPTICAL ORBITS + SATELLITES         */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10">

        {/* ----------------------------------------------------------------------- */}
        {/* "Hello!" Playful Handwritten Greeting Pop-in                            */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 15, delay: 0.2 }}
          className="relative mb-3 flex items-center justify-center select-none z-30"
        >
          <span className="font-handwriting text-3xl sm:text-4xl text-cyan-300 font-bold tracking-wide -rotate-6 drop-shadow-[0_0_14px_rgba(56,189,248,0.65)]">
            Hello!
          </span>
          <svg 
            className="w-9 h-7 text-cyan-300 ml-1.5 translate-y-2 rotate-12" 
            viewBox="0 0 50 40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
          >
            <path d="M 10 5 Q 30 15, 30 35" strokeLinecap="round" />
            <path d="M 22 28 L 30 35 L 36 26" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* SOLAR STAGE: CENTRAL PROFILE ("SUN") + 3 ORBITAL RINGS                  */}
        {/* Desktop: 660px stage, Tablet: 520px, Mobile: 360px                     */}
        {/* ----------------------------------------------------------------------- */}
        <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[640px] lg:h-[640px] flex items-center justify-center my-2">

          {/* ===================================================================== */}
          {/* ORBIT RING 1: INNER ORBIT (Core AI: AI/ML, GenAI, Python)             */}
          {/* ===================================================================== */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="absolute w-[210px] h-[210px] sm:w-[270px] sm:h-[270px] lg:w-[330px] lg:h-[330px] rounded-full border border-cyan-400/25 border-dashed pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          />

          {/* Badges for Inner Orbit: Revolving along orbital path without self-rotation (52s cycle) */}
          <div className="absolute inset-0 pointer-events-none">
            {innerOrbitBadges.map((badge) => {
              return (
                <div
                  key={badge.id}
                  style={{
                    top: '50%',
                    left: '50%',
                    animation: `orbit-revolution-cw 52s linear infinite`,
                    // @ts-expect-error CSS custom properties
                    '--orbit-radius': 'calc(var(--inner-orbit-size, 330px) / 2)',
                    '--orbit-angle': `${badge.angleDeg}deg`,
                  }}
                  className="absolute pointer-events-auto [--inner-orbit-size:210px] sm:[--inner-orbit-size:270px] lg:[--inner-orbit-size:330px]"
                >
                  <div 
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full ${badge.bg} border ${badge.border} backdrop-blur-md shadow-lg transition-transform hover:scale-110 cursor-default whitespace-nowrap`}
                    style={{ boxShadow: `0 0 14px ${badge.glowColor}` }}
                  >
                    {badge.icon}
                    <span className={`text-[11px] sm:text-xs font-mono font-medium tracking-wide ${badge.color}`}>
                      {badge.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================================== */}
          {/* ORBIT RING 2: MIDDLE ORBIT (Technical Skills)                          */}
          {/* ===================================================================== */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full border border-purple-500/20 pointer-events-none shadow-[0_0_20px_rgba(168,85,247,0.08)]"
          />

          {/* Badges for Middle Orbit: Revolving along orbit in counter-clockwise direction without self-rotation (75s cycle) */}
          <div className="absolute inset-0 pointer-events-none">
            {middleOrbitBadges.map((badge) => {
              return (
                <div
                  key={badge.id}
                  style={{
                    top: '50%',
                    left: '50%',
                    animation: `orbit-revolution-ccw 75s linear infinite`,
                    // @ts-expect-error CSS custom properties
                    '--orbit-radius': 'calc(var(--mid-orbit-size, 480px) / 2)',
                    '--orbit-angle': `${badge.angleDeg}deg`,
                  }}
                  className={`absolute pointer-events-auto [--mid-orbit-size:290px] sm:[--mid-orbit-size:380px] lg:[--mid-orbit-size:480px] ${badge.desktopOnly ? 'hidden md:block' : 'block'}`}
                >
                  <div 
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full ${badge.bg} border ${badge.border} backdrop-blur-md shadow-lg transition-transform hover:scale-110 cursor-default whitespace-nowrap`}
                    style={{ boxShadow: `0 0 12px ${badge.glowColor}` }}
                  >
                    {badge.icon}
                    <span className={`text-[10.5px] sm:text-xs font-mono font-medium tracking-wide ${badge.color}`}>
                      {badge.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================================== */}
          {/* ORBIT RING 3: OUTER ORBIT (Development + Hobbies + 🤖 AI SATELLITE)   */}
          {/* ===================================================================== */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[610px] lg:h-[610px] rounded-full border border-indigo-400/20 border-dashed pointer-events-none shadow-[0_0_24px_rgba(99,102,241,0.06)]"
          />

          {/* Badges for Outer Orbit: Revolving along orbit in clockwise direction without self-rotation (95s cycle) */}
          <div className="absolute inset-0 pointer-events-none">
            {outerOrbitBadges.map((badge) => {
              return (
                <div
                  key={badge.id}
                  style={{
                    top: '50%',
                    left: '50%',
                    animation: `orbit-revolution-cw 95s linear infinite`,
                    // @ts-expect-error CSS custom properties
                    '--orbit-radius': 'calc(var(--outer-orbit-size, 610px) / 2)',
                    '--orbit-angle': `${badge.angleDeg}deg`,
                  }}
                  className={`absolute pointer-events-auto [--outer-orbit-size:340px] sm:[--outer-orbit-size:460px] lg:[--outer-orbit-size:610px] ${badge.desktopOnly ? 'hidden md:block' : 'block'}`}
                >
                  <div 
                    className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${badge.bg} border ${badge.border} backdrop-blur-md shadow-md transition-transform hover:scale-110 cursor-default whitespace-nowrap ${
                      badge.isHobby ? 'opacity-85 text-[10px]' : ''
                    }`}
                    style={{ boxShadow: `0 0 10px ${badge.glowColor}` }}
                  >
                    {badge.icon}
                    <span className={`text-[10px] sm:text-[11px] font-mono font-medium tracking-wide ${badge.color}`}>
                      {badge.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================================== */}
          {/* 6. THE FLYING BOT: AI SATELLITE ON THE OUTER ORBIT                    */}
          {/* Continuously orbits around the profile along outer ring with trail   */}
          {/* Slightly faster than the badges (36s orbit), smooth rotation & glow  */}
          {/* ===================================================================== */}
          <div className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[610px] lg:h-[610px] animate-[spin_38s_linear_infinite] pointer-events-none z-20">
            {/* Position bot at top of outer ring (top: 0%, left: 50%) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              {/* Counter-rotate so the bot stays naturally oriented and tilts smoothly */}
              <motion.div 
                animate={{
                  y: [-3, 3, -3],
                  rotate: [-6, 6, -6],
                  scale: [0.96, 1.04, 0.96]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative flex flex-col items-center"
              >
                {/* Glowing cyan orbital trail behind the satellite */}
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-2 bg-gradient-to-l from-cyan-400/40 via-cyan-400/10 to-transparent blur-sm rounded-full pointer-events-none" />
                <div className="absolute -inset-2 rounded-full bg-cyan-400/25 blur-md animate-pulse" />

                {/* Satellite Bot Visual */}
                <div className="relative w-11 h-11 sm:w-13 sm:h-13 p-1 rounded-full bg-[#050b1f]/90 border border-cyan-400/60 shadow-[0_0_18px_rgba(56,189,248,0.5)] backdrop-blur-md">
                  <img 
                    src={heroDroneImg} 
                    alt="AI Satellite Bot" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                  />
                  {/* Subtle thruster pulse */}
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-1 rounded-full bg-cyan-300 blur-[0.5px] animate-ping" />
                </div>

                {/* Satellite Tag */}
                <span className="mt-1 px-1.5 py-0.5 rounded text-[8.5px] font-mono tracking-wider text-cyan-300 bg-[#050a1c]/90 border border-cyan-500/40 shadow-sm backdrop-blur-xs whitespace-nowrap">
                  AI SATELLITE
                </span>
              </motion.div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 1. CENTRAL CORE: PROFILE PICTURE AS THE "SUN"                         */}
          {/* ===================================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="relative z-30 group/avatar cursor-pointer"
          >
            {/* Smooth Cyan → Blue → Purple → Pink animated solar glow aura */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle, rgba(6,182,212,0.42) 0%, rgba(59,130,246,0.22) 45%, rgba(168,85,247,0.18) 70%, transparent 100%)',
                  'radial-gradient(circle, rgba(59,130,246,0.42) 0%, rgba(168,85,247,0.22) 45%, rgba(236,72,153,0.18) 70%, transparent 100%)',
                  'radial-gradient(circle, rgba(236,72,153,0.42) 0%, rgba(168,85,247,0.22) 45%, rgba(6,182,212,0.18) 70%, transparent 100%)',
                  'radial-gradient(circle, rgba(6,182,212,0.42) 0%, rgba(59,130,246,0.22) 45%, rgba(168,85,247,0.18) 70%, transparent 100%)'
                ],
                scale: [0.97, 1.06, 0.97]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute -inset-6 sm:-inset-8 rounded-full blur-2xl pointer-events-none"
            />

            {/* Glowing neon ring with smooth color transition and breathing pulse */}
            <motion.div 
              animate={{
                borderColor: [
                  'rgba(6, 182, 212, 0.85)',   // Cyan
                  'rgba(59, 130, 246, 0.85)',  // Blue
                  'rgba(168, 85, 247, 0.85)',  // Purple
                  'rgba(236, 72, 153, 0.85)',  // Pink
                  'rgba(6, 182, 212, 0.85)'    // Cyan
                ],
                boxShadow: [
                  '0 0 30px rgba(6, 182, 212, 0.5), inset 0 0 16px rgba(6, 182, 212, 0.25)',
                  '0 0 30px rgba(59, 130, 246, 0.5), inset 0 0 16px rgba(59, 130, 246, 0.25)',
                  '0 0 30px rgba(168, 85, 247, 0.5), inset 0 0 16px rgba(168, 85, 247, 0.25)',
                  '0 0 30px rgba(236, 72, 153, 0.5), inset 0 0 16px rgba(236, 72, 153, 0.25)',
                  '0 0 30px rgba(6, 182, 212, 0.5), inset 0 0 16px rgba(6, 182, 212, 0.25)'
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full p-1.5 border-2 bg-gradient-to-tr from-[#05091d] via-[#09102c] to-[#040612] shadow-2xl"
            >
              {/* Profile Image Inside Solar Core */}
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0a1028] border-2 border-[#050818] relative">
                <img 
                  src={avatarError ? profileFallback : personalData.profileImage} 
                  alt={personalData.name} 
                  onError={() => setAvatarError(true)}
                  className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Status indicator pip */}
              <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/90 border border-emerald-400/60 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9.5px] font-mono text-emerald-300 font-semibold tracking-wider">CORE</span>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* 8. NAME: SIDDHI BHAVSAR WITH CLEAN ONE-TIME TYPEWRITER EFFECT           */}
        {/* ----------------------------------------------------------------------- */}
        <div className="mt-4 space-y-1.5 w-full">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-wider uppercase min-h-[1.25em] flex items-center justify-center">
            <span>{typedName}</span>
            {/* Blinking cursor while typing, softly fades after completion */}
            <span 
              className={`inline-block w-1 sm:w-1.5 h-7 sm:h-9 md:h-11 bg-cyan-400 ml-1.5 transition-opacity ${
                typingComplete ? 'animate-pulse opacity-30' : 'animate-pulse opacity-100'
              }`} 
            />
          </h1>

          {/* --------------------------------------------------------------------- */}
          {/* 9. PROFESSIONAL INFORMATION: B.Tech CSE Student · PCU                 */}
          {/* --------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="space-y-1 pt-1"
          >
            <p className="text-lg sm:text-xl font-display font-semibold text-slate-200 tracking-wide">
              {personalData.title}
            </p>
            <p className="text-sm sm:text-base text-cyan-300 font-medium tracking-wide">
              {personalData.college}
            </p>
          </motion.div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* SPECIALIZATION PILLS: AI/ML | Generative AI | Python                    */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          {personalData.specialization.map((spec, i) => (
            <React.Fragment key={spec}>
              <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono font-medium tracking-wide bg-[#071330]/90 border border-cyan-500/40 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.15)] hover:border-cyan-400 hover:shadow-[0_0_16px_rgba(6,182,212,0.3)] transition-all">
                {spec}
              </span>
              {i < personalData.specialization.length - 1 && (
                <span className="text-cyan-500/50 hidden sm:inline font-mono">|</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* 10. ACTION BUTTONS: Download Resume · Explore Projects →                */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Download Resume Button */}
          <button
            type="button"
            onClick={onOpenResume}
            id="hero-download-resume-btn"
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm tracking-wider text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 border border-cyan-400/40 shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.5)] transition-all active:scale-[0.98]"
          >
            <FileDown className="w-4 h-4 text-cyan-200 group-hover:translate-y-0.5 transition-transform" />
            <span>Download Resume</span>
          </button>

          {/* Explore Projects Button */}
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            id="hero-view-projects-btn"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-medium text-xs sm:text-sm tracking-wider text-slate-200 bg-[#0c1436]/80 hover:bg-[#121e4e] hover:text-white border border-slate-700/80 hover:border-cyan-500/50 backdrop-blur-md transition-all active:scale-[0.98] shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </a>
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subtle Solar System Status Indicator                                    */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-10 flex flex-col items-center gap-2 text-slate-500 text-xs font-mono"
        >
          <span className="text-[10px] tracking-widest uppercase text-slate-400">AI SOLAR SYSTEM ACTIVE</span>
          <div className="w-4 h-7 rounded-full border border-cyan-500/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
