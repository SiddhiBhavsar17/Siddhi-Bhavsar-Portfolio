import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Orbit, FileDown, Eye, Sparkles } from 'lucide-react';
import { personalData } from '../data/personalData';

interface NavbarProps {
  onOpenResume: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onReplayIntro }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-[#030614]/85 backdrop-blur-xl border-b border-amber-400/20 shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
          : 'py-4 md:py-5 bg-[#030614]/40 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: Cosmic Orbit Icon + Name + Tagline */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-3 text-slate-100 transition-all cursor-pointer"
          id="nav-brand-logo"
        >
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-purple-500 to-yellow-300 p-[1.5px] shadow-[0_0_15px_rgba(251,191,36,0.35)] group-hover:shadow-[0_0_22px_rgba(251,191,36,0.6)] transition-all flex-shrink-0">
            <div className="w-full h-full bg-[#05091d] rounded-full flex items-center justify-center">
              <Orbit className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform duration-700" />
            </div>
            {/* Small glowing orbit beacon */}
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400 animate-ping ring-2 ring-[#030614]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-white group-hover:text-amber-300 transition-colors uppercase">
              {personalData.name}
            </span>
            <span className="text-[10px] text-amber-300/80 font-mono tracking-wide">
              {personalData.brandTagline || 'AI/ML · Deep Learning · Generative AI'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Clear Cosmic Active-Section Indicator */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#080d26]/85 border border-purple-500/30 backdrop-blur-xl shadow-lg">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-amber-300 font-bold bg-gradient-to-r from-amber-500/25 via-purple-600/30 to-amber-500/20 border border-amber-400/60 shadow-[0_0_16px_rgba(251,191,36,0.35)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                )}
                <span className={isActive ? 'pl-1' : ''}>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Cosmic Intro Replay + View Resume + Connect */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Replay Cosmic Big Bang Intro Button */}
          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              id="nav-replay-intro-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-display tracking-wider text-amber-300 hover:text-white bg-[#1a1236]/90 hover:bg-[#251b4c] border border-amber-400/40 hover:border-amber-300 transition-all shadow-[0_0_15px_rgba(251,191,36,0.25)] active:scale-95 cursor-pointer"
              title="Replay Big Bang Cosmic Intro Animation"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="hidden xl:inline">Cosmic Big Bang</span>
            </button>
          )}

          {/* View Resume Direct Action */}
          <a
            href={personalData.resume}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-view-resume-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-purple-200 hover:text-white bg-[#100a26]/80 hover:bg-[#19103c] border border-purple-500/40 hover:border-purple-300 transition-all shadow-sm active:scale-95 cursor-pointer"
            title="View Official Resume (PDF)"
          >
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span>Resume</span>
          </a>

          {/* Resume Hub Download Button */}
          <button
            type="button"
            onClick={onOpenResume}
            id="nav-resume-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-slate-300 hover:text-white bg-slate-900/60 hover:bg-[#0c1436] border border-slate-700/80 hover:border-amber-400/50 transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Download Official Resume & Details"
          >
            <FileDown className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">PDF</span>
          </button>

          {/* Let's Connect Button */}
          <button
            type="button"
            onClick={handleConnectClick}
            id="nav-connect-btn"
            className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-bold tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 border border-amber-300/60 transition-all shadow-[0_0_15px_rgba(251,191,36,0.35)] hover:shadow-[0_0_22px_rgba(251,191,36,0.55)] active:scale-95 cursor-pointer"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Trigger & Replay */}
        <div className="flex lg:hidden items-center gap-2">
          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              className="p-2 rounded-full text-amber-400 hover:text-white bg-[#1a1236]/90 border border-amber-400/40"
              title="Replay Big Bang Intro"
            >
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-200 hover:text-white bg-[#080d26]/80 border border-slate-700 hover:border-amber-400 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#030614]/95 border-b border-amber-400/30 backdrop-blur-2xl space-y-2">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-center transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/25 to-purple-600/30 text-amber-300 border border-amber-400/50 font-bold'
                      : 'text-slate-300 hover:bg-white/5 border border-slate-800'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#120d2a] border border-purple-500/40 text-purple-200 text-xs font-mono"
            >
              <Eye className="w-4 h-4 text-purple-400" />
              <span>View Official Resume</span>
            </a>

            <button
              type="button"
              onClick={handleConnectClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              <span>Connect with Siddhi</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
