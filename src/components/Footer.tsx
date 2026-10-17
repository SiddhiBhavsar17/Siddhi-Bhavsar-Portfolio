import React from 'react';
import { Orbit, ArrowUp, FileDown, Eye, Sparkles } from 'lucide-react';
import { personalData } from '../data/personalData';

interface FooterProps {
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-amber-400/20 bg-[#030614]/95 backdrop-blur-xl pt-10 sm:pt-12 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
        
        {/* Left: Brand with Orbit icon & Tagline */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-purple-500 to-yellow-300 p-[1.5px] flex-shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.35)]">
            <div className="w-full h-full bg-[#05091d] rounded-full flex items-center justify-center">
              <Orbit className="w-4 h-4 text-amber-300" />
            </div>
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="font-display font-extrabold text-sm text-white tracking-wider uppercase truncate">
              {personalData.name}
            </span>
            <span className="text-[10px] sm:text-[11px] text-amber-300/80 font-mono tracking-wide truncate">
              {personalData.brandTagline || 'AI/ML · Deep Learning · Generative AI'}
            </span>
          </div>
        </div>

        {/* Center: Cosmic Motto / Reflection */}
        <p className="text-xs font-handwriting text-amber-200/90 text-center tracking-wider italic px-2">
          &ldquo;Building intelligent systems for a better tomorrow.&rdquo;
        </p>

        {/* Right: View & Download Resume links + Copyright + Back to top */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {/* View Resume link */}
          <a
            href={personalData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#110d2e]/80 hover:bg-[#1a1445] border border-purple-500/40 hover:border-purple-300 text-purple-200 font-mono text-[11px] transition-colors shadow-sm min-h-[38px]"
            title="View Official Resume (PDF in browser)"
            id="footer-view-resume-link"
          >
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span>View Resume</span>
          </a>

          {/* Download Resume link */}
          <a
            href={personalData.resume}
            target="_blank"
            rel="noopener noreferrer"
            download={`${personalData.name.replace(/\s+/g, '_')}_Resume.pdf`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-amber-300 font-mono text-[11px] transition-colors shadow-sm min-h-[38px]"
            title="Download Official Resume (PDF)"
            id="footer-download-resume-link"
          >
            <FileDown className="w-3.5 h-3.5 text-amber-400" />
            <span>PDF</span>
          </a>

          {/* Replay Cosmic Intro button */}
          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-purple-600/20 hover:from-amber-500/30 hover:to-purple-600/30 border border-amber-400/50 text-amber-300 hover:text-white font-mono text-[11px] transition-all shadow-sm cursor-pointer min-h-[38px]"
              title="Replay Big Bang Cosmic Intro"
              id="footer-replay-intro-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Replay Big Bang</span>
            </button>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 transition-all active:scale-95 cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            title="Back to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] font-mono">
        <span>&copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.</span>
        <span>Born from the Big Bang · AI/ML Universe</span>
      </div>
    </footer>
  );
};
