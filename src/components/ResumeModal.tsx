import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileDown, FileText, CheckCircle2, ExternalLink, Loader2, Eye } from 'lucide-react';
import { personalData } from '../data/personalData';
import { downloadResumeFile } from '../utils/resume';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadResumeFile();
    setIsDownloading(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-xl rounded-2xl bg-[#080d24] border border-cyan-500/30 shadow-2xl p-6 sm:p-8 hud-corner"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
            aria-label="Close Resume Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                CURRICULUM VITAE
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {personalData.name}&apos;s Resume
              </h3>
            </div>
          </div>

          {/* Resume Snapshot Card */}
          <div className="p-5 rounded-xl bg-[#0a102c] border border-slate-800/80 space-y-4 mb-6 text-sm text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Candidate:</span>
              <span className="text-white font-semibold">{personalData.name}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Education:</span>
              <span className="text-cyan-300">{personalData.college}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Specialization:</span>
              <span className="text-violet-300">{personalData.specialization.join(' • ')}</span>
            </div>

            {/* Verified Resume Status */}
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/25 flex items-center gap-2.5 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span className="font-semibold text-emerald-200">Official Resume PDF Active</span>
                <span className="font-mono text-[11px] text-emerald-400/80">Siddhi_Bhavsar_2026_Latest_Resume2.1.pdf</span>
              </div>
            </div>
          </div>

          {/* Download & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* View Resume Button (Opens PDF in browser tab without downloading) */}
            <a
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              id="modal-view-resume-browser"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-[#0c1436] hover:from-cyan-900/80 hover:to-indigo-900/70 border border-cyan-500/50 hover:border-cyan-300 text-cyan-200 hover:text-white font-display font-semibold text-xs tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] active:scale-95 transition-all"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>View Resume (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400/70 ml-0.5" />
            </a>

            {/* Download Resume Button (Downloads the exact same real PDF) */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              id="modal-download-resume-action"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-display font-semibold text-xs tracking-wider shadow-lg shadow-cyan-950/50 active:scale-95 transition-all disabled:opacity-75"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  <span>Download Resume</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-display font-medium transition-colors"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
