import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileDown, 
  ArrowRight,
  Loader2,
  Eye,
  ExternalLink,
  Code2,
  FolderGit2,
  Compass
} from 'lucide-react';
import { personalData } from '../data/personalData';
import { downloadResumeFile } from '../utils/resume';
import profileFallback from '../assets/profile/profile-placeholder.svg';

interface HeroProps {
  onOpenResume: () => void;
  introActive?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, introActive = false }) => {
  const [avatarError, setAvatarError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      await downloadResumeFile();
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    setAvatarError(false);
  }, [personalData.profileImage]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[94vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. COSMIC BACKGROUND HARMONICS: GOLDEN & PURPLE AMBIENT ENERGY CORE       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        {/* Giant golden-purple cosmic energy aura centered on the hero */}
        <div className="absolute w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] lg:w-[720px] lg:h-[720px] rounded-full bg-gradient-to-tr from-amber-500/10 via-purple-600/15 to-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full bg-amber-400/8 blur-2xl pointer-events-none" />

        {/* Concentric faint orbital harmonic rings */}
        <div className="absolute w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] lg:w-[620px] lg:h-[620px] rounded-full border border-amber-400/15 pointer-events-none" />
        <div className="absolute w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] lg:w-[820px] lg:h-[820px] rounded-full border border-purple-500/10 border-dashed pointer-events-none" />
        <div className="absolute w-[560px] h-[560px] sm:w-[800px] sm:h-[800px] lg:w-[1040px] lg:h-[1040px] rounded-full border border-cyan-400/10 pointer-events-none" />

        {/* Subtle breathing cosmic star nodes */}
        <span className="absolute top-[16%] left-[20%] w-1.5 h-1.5 rounded-full bg-amber-400/60 shadow-[0_0_8px_#f59e0b] animate-pulse" />
        <span className="absolute top-[75%] right-[22%] w-1.5 h-1.5 rounded-full bg-purple-400/60 shadow-[0_0_8px_#c084fc] animate-pulse delay-1000" />
        <span className="absolute top-[28%] right-[18%] w-1 h-1 rounded-full bg-cyan-400/60 shadow-[0_0_6px_#38bdf8] animate-pulse delay-500" />
        <span className="absolute bottom-[22%] left-[26%] w-1 h-1 rounded-full bg-yellow-300/60 shadow-[0_0_6px_#fde047] animate-pulse delay-700" />
      </div>

      {/* ========================================================================= */}
      {/* 2. CENTERED COSMIC IDENTITY HERO CONTENT CONTAINER                        */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10">

        {/* ----------------------------------------------------------------------- */}
        {/* 3. CENTERED PROFILE: GLOWING GOLDEN COSMIC RING AROUND ACTUAL PHOTO    */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative my-3 flex items-center justify-center group/avatar cursor-pointer"
        >
          {/* Outer Pulsing Golden Halo */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-amber-500/25 via-purple-500/20 to-yellow-400/25 blur-xl group-hover/avatar:blur-2xl transition-all duration-700 pointer-events-none" />

          {/* Golden Cosmic Orbit Ring with Subtle Celestial Markers */}
          <div 
            className="absolute -inset-3 sm:-inset-4 rounded-full border border-amber-400/60 border-dashed animate-spin pointer-events-none" 
            style={{ animationDuration: '24s' }}
          />

          {/* Secondary Counter-Rotating Violet Energy Ring */}
          <div 
            className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-purple-500/40 border-dotted animate-spin pointer-events-none" 
            style={{ animationDuration: '18s', animationDirection: 'reverse' }}
          />

          {/* Glowing Golden Ring Vessel */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-[3px] sm:p-1 bg-gradient-to-tr from-amber-400 via-purple-500 to-yellow-300 shadow-[0_0_40px_rgba(251,191,36,0.45)] group-hover/avatar:shadow-[0_0_60px_rgba(251,191,36,0.7)] transition-all duration-500">
            {/* Inner Dark Rim */}
            <div className="w-full h-full rounded-full overflow-hidden bg-[#070b1f] border-2 border-[#030614] relative">
              <img 
                src={avatarError ? profileFallback : (personalData.profileImage || "/assets/profile/profile.jpeg")} 
                alt={personalData.name} 
                loading="eager"
                onError={() => setAvatarError(true)}
                className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-700"
              />
              {/* Subtle Starlight Sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030614]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Golden Status Crown Pip */}
            <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030614]/95 border border-amber-400/80 shadow-[0_0_12px_rgba(251,191,36,0.5)]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[9px] sm:text-[10px] font-mono text-amber-200 font-bold tracking-widest">AI CORE</span>
            </div>
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* 4. NAME & IDENTITY: SIDDHI BHAVSAR IN GRAND COSMIC TYPOGRAPHY          */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-4 space-y-2 w-full"
        >
          {/* Main Name Heading with Purple-Gold Sheen */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-purple-200 uppercase drop-shadow-[0_0_35px_rgba(251,191,36,0.4)]">
            {personalData.name}
          </h1>

          {/* Professional Headline */}
          <p className="text-base sm:text-xl font-display font-semibold text-slate-200 tracking-wide">
            {personalData.title}
          </p>

          {/* Academic Institution & CGPA */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-cyan-300">
            <span>{personalData.college}</span>
            <span className="text-amber-400" aria-hidden="true">✦</span>
            <span className="text-amber-300 font-semibold">CGPA 9.07</span>
          </div>

          {/* Real Introduction & Motto */}
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto pt-1 font-light leading-relaxed">
            {personalData.heroSubtitle || "Building intelligent systems for a better tomorrow. Passionate about machine learning algorithms, generative models, and computer vision."}
          </p>

          {personalData.motto && (
            <p className="text-xs sm:text-sm font-handwriting text-amber-300/90 tracking-wider italic pt-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
              &ldquo;{personalData.motto}&rdquo;
            </p>
          )}
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* 5. SPECIALIZATIONS: CLEAN COSMIC CONSTELLATION NODES                   */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono tracking-wider"
        >
          {personalData.specialization.map((spec, i) => (
            <React.Fragment key={spec}>
              <span className="text-amber-200/90 hover:text-amber-100 transition-colors font-medium">
                {spec}
              </span>
              {i < personalData.specialization.length - 1 && (
                <span className="text-amber-400/70 font-mono text-xs" aria-hidden="true">✦</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* 6. CALL-TO-ACTION BUTTONS: GOLDEN & PURPLE COSMIC INTERACTIONS        */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Explore Projects Button - Golden Cosmic Primary */}
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            id="hero-view-projects-btn"
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.65)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* View Resume Button - Purple Glow Secondary */}
          <a
            href={personalData.resume}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-view-resume-btn"
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm tracking-wider text-purple-200 hover:text-white bg-[#120d2a]/85 hover:bg-[#1a123d] border border-purple-500/50 hover:border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] backdrop-blur-md transition-all active:scale-[0.98] cursor-pointer"
            title="View Official Resume (PDF in new tab)"
          >
            <Eye className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>View Resume</span>
          </a>

          {/* Download Resume Button */}
          <a
            href={personalData.resume}
            download={`${personalData.name.replace(/\s+/g, '_')}_Resume.pdf`}
            onClick={handleDownloadResume}
            id="hero-download-resume-btn"
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl font-display font-medium text-xs sm:text-sm tracking-wider text-slate-300 hover:text-white bg-[#090e24]/80 hover:bg-[#0f183d] border border-slate-700/80 hover:border-amber-400/50 shadow-md backdrop-blur-md transition-all active:scale-[0.98] cursor-pointer"
            title="Download Official Resume (PDF)"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 text-amber-300 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4 text-amber-300" />
                <span>Download Resume</span>
              </>
            )}
          </a>
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* 7. QUICK SOCIAL CHANNELS & SCROLL INDICATOR                             */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-3 text-slate-500 text-xs font-mono"
        >
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a 
              href={personalData.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href={personalData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">|</span>
            <button 
              type="button" 
              onClick={handleScrollToAbout}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>About Siddhi</span>
            </button>
          </div>

          <div 
            onClick={handleScrollToAbout} 
            className="cursor-pointer group flex flex-col items-center gap-1.5 pt-2"
          >
            <span className="text-[10px] tracking-widest uppercase text-slate-400 group-hover:text-amber-300 transition-colors">
              SCROLL TO EXPLORE COSMOS
            </span>
            <div className="w-4 h-7 rounded-full border border-amber-400/40 group-hover:border-amber-400 flex items-start justify-center p-1 transition-colors">
              <div className="w-1 h-2 rounded-full bg-amber-400 animate-bounce" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
