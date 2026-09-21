import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Award, FileText } from 'lucide-react';
import { Certification } from '../types';

interface CertificateModalProps {
  certification: Certification | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certification, onClose }) => {
  // Smoothly close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certification) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certification, onClose]);

  if (!certification) return null;

  const certificateImage = certification.previewUrl || certification.thumbnail;
  const externalDoc = certification.documentUrl;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div 
          className="absolute inset-0" 
          onClick={onClose} 
          aria-label="Close modal overlay"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-2xl bg-[#080d24] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-[#060a1c] sticky top-0 z-20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block truncate">
                  {certification.issuer}
                </span>
                <h3 className="text-base sm:text-xl font-display font-bold text-white tracking-wide truncate">
                  {certification.name}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/80 flex-shrink-0 ml-3"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real Certificate Document Canvas (High-Resolution Preview) */}
          <div className="relative bg-[#030614] flex items-center justify-center p-4 sm:p-6 overflow-hidden border-b border-slate-800/80 min-h-[300px]">
            <img
              src={certificateImage}
              alt={`${certification.name} - Verified Document`}
              className="max-h-[62vh] w-auto max-w-full rounded-lg border border-slate-700/60 shadow-2xl object-contain bg-[#030614]"
            />
          </div>

          {/* Certificate Metadata & Details Body */}
          <div className="p-5 sm:p-6 space-y-4 bg-[#080d24]">
            {/* Metadata Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0a102c] border border-slate-800/90 text-xs">
              <div>
                <span className="text-slate-400 font-mono block mb-0.5">Issuing Organization / Platform:</span>
                <span className="font-semibold text-white text-sm">{certification.issuer}</span>
              </div>
              
              {certification.year && (
                <div>
                  <span className="text-slate-400 font-mono block mb-0.5">Year of Completion:</span>
                  <span className="font-semibold text-cyan-300 text-sm">{certification.year}</span>
                </div>
              )}

              {/* Credential ID — only shown if actually available */}
              {certification.credentialId && certification.credentialId.trim() !== '' && (
                <div className="sm:col-span-2 pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400 font-mono block mb-0.5">Credential ID:</span>
                  <span className="font-mono text-cyan-400 font-semibold">{certification.credentialId}</span>
                </div>
              )}
            </div>

            {/* Description / Summary */}
            {certification.description && (
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {certification.description}
              </p>
            )}

            {/* Skills & Topics Covered */}
            {certification.skillsCovered && certification.skillsCovered.length > 0 && (
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-medium">
                  Skills &amp; Topics Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {certification.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#0e163d] border border-cyan-500/25 text-cyan-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="px-5 py-4 bg-[#060a1c] border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
            <div className="flex items-center gap-2.5">
              {/* Direct PDF Link (Opens in new tab, 100% Edge compatible) */}
              {externalDoc && (
                <a
                  href={externalDoc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-display font-semibold text-xs tracking-wider border border-cyan-400/40 transition-all shadow-md active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Open Full PDF in New Tab</span>
                  <ExternalLink className="w-3 h-3 text-cyan-200" />
                </a>
              )}

              {/* View / Verify Credential button — ONLY when genuine verification link exists */}
              {certification.credentialUrl && certification.credentialUrl.trim() !== '' && (
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-display font-semibold text-xs tracking-wider border border-slate-700 transition-all shadow-md active:scale-95"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-200" />
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors ml-auto"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
