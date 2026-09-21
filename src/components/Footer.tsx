import React from 'react';
import { Orbit, ArrowUp, FileDown, Eye } from 'lucide-react';
import { personalData } from '../data/personalData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyan-500/15 bg-[#030612]/95 backdrop-blur-md pt-10 pb-8 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand with Orbit icon & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] flex-shrink-0">
            <div className="w-full h-full bg-[#080d22] rounded-full flex items-center justify-center">
              <Orbit className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-extrabold text-sm text-white tracking-wider uppercase">
              {personalData.name}
            </span>
            <span className="text-[11px] text-cyan-400/80 font-mono tracking-wide">
              {personalData.brandTagline || 'Code · Create · Explore · Repeat'}
            </span>
          </div>
        </div>

        {/* Right: View & Download Resume links + Copyright information + Back to top button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Resume link */}
          <a
            href={personalData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 hover:text-cyan-300 font-mono text-[11px] transition-colors"
            title="View Official Resume (PDF in browser)"
            id="footer-view-resume-link"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Resume</span>
          </a>

          {/* Download Resume link */}
          <a
            href={personalData.resume}
            target="_blank"
            rel="noopener noreferrer"
            download={`${personalData.name.replace(/\s+/g, '_')}_Resume.pdf`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-purple-300 hover:text-purple-200 font-mono text-[11px] transition-colors"
            title="Download Official Resume (PDF)"
            id="footer-download-resume-link"
          >
            <FileDown className="w-3.5 h-3.5 text-purple-400" />
            <span>Download</span>
          </a>

          <span className="text-xs text-slate-400 font-mono">
            &copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-all active:scale-95"
            title="Back to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
