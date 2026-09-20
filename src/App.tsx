import React, { useState } from 'react';
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

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#04060f] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Background Starfield & Celestial Canvas */}
      <CosmicBackground />

      {/* Sticky Glass Navbar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4 sm:space-y-8">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Futuristic Footer */}
      <Footer />

      {/* Central Resume Download Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}
