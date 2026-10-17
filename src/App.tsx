import React, { useState, useEffect } from 'react';
import { CosmicBigBangIntro } from './components/CosmicBigBangIntro';
import { CosmicBackground } from './components/CosmicBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { cosmicAudio } from './utils/cosmicAudio';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (!showIntro) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [showIntro]);

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    cosmicAudio.reset();
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030510] text-slate-100 selection:bg-amber-400/30 selection:text-amber-200">
      {/* ========================================================================= */}
      {/* CINEMATIC BIG BANG INTRO ANIMATION (SCENE 1, 2 & 3)                      */}
      {/* ========================================================================= */}
      {showIntro && (
        <CosmicBigBangIntro 
          onComplete={() => setShowIntro(false)} 
        />
      )}

      {/* Background Starfield & Celestial Canvas */}
      <CosmicBackground />

      {/* Sticky Glass Navbar with Replay Cosmic Intro support */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)} 
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4 sm:space-y-8">
        <Hero 
          onOpenResume={() => setIsResumeOpen(true)} 
          introActive={showIntro}
        />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Futuristic Footer with Replay Cosmic Intro */}
      <Footer onReplayIntro={handleReplayIntro} />

      {/* Central Resume Download Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}
