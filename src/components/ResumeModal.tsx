import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileDown, FileText, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { personalData } from '../data/personalData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = personalData.resume;
    link.download = `${personalData.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

            {/* Asset Replacement Notice */}
            <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-500/25 flex items-start gap-2.5 text-xs text-cyan-200">
              <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-white">Centralized Data Configuration:</span>
                <span>Configured in <code className="bg-black/50 px-1 py-0.5 rounded font-mono text-cyan-300">src/data/personalData.ts</code>. Replace <code className="bg-black/50 px-1 py-0.5 rounded font-mono text-cyan-300">{personalData.resume}</code> with your PDF file path.</span>
              </div>
            </div>
          </div>

          {/* Download & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              id="modal-download-resume-action"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-display font-semibold text-xs tracking-wider shadow-lg shadow-cyan-950/50 active:scale-95 transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </button>

            <a
              href={personalData.resume}
              target="_blank"
              rel="noreferrer"
              id="modal-view-resume-browser"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-display font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View</span>
            </a>

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
