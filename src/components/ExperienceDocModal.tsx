import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Download, FileText, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface ExperienceDocModalData {
  title: string;
  type: 'certificate' | 'offer-letter';
  role: string;
  organization: string;
  period: string;
  documentUrl: string;
}

interface ExperienceDocModalProps {
  data: ExperienceDocModalData | null;
  onClose: () => void;
}

export const ExperienceDocModal: React.FC<ExperienceDocModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = data.documentUrl;
    link.download = `${data.role.replace(/\s+/g, '_')}_${data.type === 'offer-letter' ? 'Offer_Letter' : 'Certificate'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isOfferLetter = data.type === 'offer-letter';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#080d24] border border-cyan-500/30 shadow-2xl p-6 sm:p-8 hud-corner"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl border ${
              isOfferLetter 
                ? 'bg-purple-950/60 border-purple-500/30 text-purple-400' 
                : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-400'
            }`}>
              {isOfferLetter ? <FileText className="w-6 h-6" /> : <Award className="w-6 h-6" />}
            </div>
            <div>
              <span className={`text-xs font-mono uppercase tracking-wider block ${
                isOfferLetter ? 'text-purple-400' : 'text-cyan-400'
              }`}>
                {isOfferLetter ? 'OFFICIAL OFFER LETTER' : 'VERIFIED EXPERIENCE CREDENTIAL'}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {data.title}
              </h3>
            </div>
          </div>

          {/* Metadata Snapshot Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0a102c] border border-slate-800/80 space-y-3 mb-6 text-xs sm:text-sm text-slate-300 font-mono">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
              <span className="text-slate-400">Position:</span>
              <span className="text-white font-semibold">{data.role}</span>
            </div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
              <span className="text-slate-400">Organization:</span>
              <span className="text-cyan-300 font-semibold">{data.organization}</span>
            </div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
              <span className="text-slate-400">Duration:</span>
              <span className="text-purple-300 font-semibold">{data.period}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400">Verification:</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Asset</span>
              </span>
            </div>
          </div>

          {/* Interactive Document Preview Box */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-6 text-center space-y-3 mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              {isOfferLetter ? <FileText className="w-7 h-7" /> : <Award className="w-7 h-7" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {data.title}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                PDF Document Ready for Preview &amp; Download
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Candidate: Siddhi Bhavsar
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                Path: {data.documentUrl}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={data.documentUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-display font-semibold text-xs tracking-wider shadow-lg shadow-cyan-950/50 active:scale-95 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Document in Browser</span>
            </a>

            <button
              type="button"
              onClick={handleDownload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-display font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
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
