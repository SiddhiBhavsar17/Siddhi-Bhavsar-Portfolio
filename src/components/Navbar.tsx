import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Orbit, FileDown } from 'lucide-react';
import { personalData } from '../data/personalData';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
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
          ? 'py-3 bg-[#060919]/90 backdrop-blur-md border-b border-cyan-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
          : 'py-4 md:py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo matching reference: Planet icon + SIDDHI BHAVSAR + Tagline */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-3 text-slate-100 transition-all"
          id="nav-brand-logo"
        >
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-sm group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all flex-shrink-0">
            <div className="w-full h-full bg-[#080d22] rounded-full flex items-center justify-center">
              <Orbit className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            {/* Small glowing orbit beacon */}
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-400 animate-pulse ring-2 ring-[#050713]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-white group-hover:text-cyan-300 transition-colors uppercase">
              {personalData.name}
            </span>
            <span className="text-[10px] text-cyan-300/80 font-mono tracking-wide">
              {personalData.brandTagline || 'Code · Create · Explore · Repeat'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-[#0a0f29]/70 border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: "Let's Connect" Button */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Let's Connect Button */}
          <button
            type="button"
            onClick={handleConnectClick}
            id="nav-connect-btn"
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-display tracking-wider text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 border border-cyan-400/40 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_22px_rgba(6,182,212,0.45)] active:scale-95"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenResume}
            className="sm:hidden p-2 rounded-lg text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 text-xs flex items-center"
            title="Resume"
          >
            <FileDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Toggle Navigation Menu"
            id="nav-mobile-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden border-b border-cyan-500/20 bg-[#070b20]/98 backdrop-blur-xl px-4 pt-3 pb-5 mt-2 transition-all space-y-2 shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-1.5 py-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex gap-2">
            <button
              type="button"
              onClick={handleConnectClick}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-display font-semibold text-xs tracking-wider shadow-lg shadow-cyan-900/30"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="p-2.5 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700"
              title="Resume"
            >
              <FileDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
