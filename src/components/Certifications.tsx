import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileCheck, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { certificationsData } from '../data/certifications';
import { Certification } from '../types';
import { CertificateModal } from './CertificateModal';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background ambient lighting accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Certifications
            </h2>
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
              VERIFIED SPECIALIZATIONS &amp; CREDENTIALS
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{certificationsData.length} Verified Credentials</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ALL 6 CERTIFICATIONS DISPLAYED DIRECTLY (NO ACCORDION / NO HIDDEN CARDS) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
        {certificationsData.map((cert, index) => {
          // Curated border accents for visual hierarchy
          const cardBorder = index === 0
            ? 'border-purple-500/60 shadow-[0_0_28px_rgba(168,85,247,0.2)] hover:border-purple-400 hover:shadow-[0_0_36px_rgba(168,85,247,0.35)]'
            : index === 1
            ? 'border-cyan-500/50 shadow-[0_0_24px_rgba(6,182,212,0.18)] hover:border-cyan-400 hover:shadow-[0_0_32px_rgba(6,182,212,0.3)]'
            : index === 2
            ? 'border-blue-500/50 shadow-[0_0_24px_rgba(59,130,246,0.18)] hover:border-blue-400 hover:shadow-[0_0_32px_rgba(59,130,246,0.3)]'
            : index === 3
            ? 'border-amber-500/50 shadow-[0_0_24px_rgba(245,158,11,0.18)] hover:border-amber-400 hover:shadow-[0_0_32px_rgba(245,158,11,0.3)]'
            : index === 4
            ? 'border-teal-500/50 shadow-[0_0_24px_rgba(20,184,166,0.18)] hover:border-teal-400 hover:shadow-[0_0_32px_rgba(20,184,166,0.3)]'
            : 'border-indigo-500/50 shadow-[0_0_24px_rgba(99,102,241,0.18)] hover:border-indigo-400 hover:shadow-[0_0_32px_rgba(99,102,241,0.3)]';

          const tagBadgeStyle = index === 0
            ? 'bg-purple-950/80 border-purple-400/50 text-purple-300'
            : index === 1
            ? 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300'
            : index === 2
            ? 'bg-blue-950/80 border-blue-400/50 text-blue-300'
            : index === 3
            ? 'bg-amber-950/80 border-amber-400/50 text-amber-300'
            : index === 4
            ? 'bg-teal-950/80 border-teal-400/50 text-teal-300'
            : 'bg-indigo-950/80 border-indigo-400/50 text-indigo-300';

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`glass-panel glass-panel-hover rounded-2xl overflow-hidden border flex flex-col justify-between group hud-corner relative transition-all duration-300 bg-[#090d26]/90 backdrop-blur-xl ${cardBorder}`}
            >
              <div>
                {/* Real Certificate Preview Picture (Click/Touch to Enlarge) */}
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  aria-label={`Enlarge original certificate: ${cert.name}`}
                  className="w-full text-left relative aspect-[16/11] bg-[#030614] overflow-hidden border-b border-slate-800/80 p-2 sm:p-2.5 flex items-center justify-center cursor-pointer group/canvas focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <img
                    src={cert.previewUrl || cert.thumbnail}
                    alt={`${cert.name} - Original Certificate`}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-lg shadow-lg group-hover/canvas:scale-[1.03] transition-transform duration-300"
                  />

                  {/* Year Tag */}
                  {cert.year && (
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded text-[10.5px] font-mono bg-slate-900/90 border border-slate-700 text-cyan-300 shadow">
                        {cert.year}
                      </span>
                    </div>
                  )}

                  {/* Hover / Touch Indicator: Click to enlarge original certificate */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/canvas:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1px] z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-white bg-slate-900/95 border border-cyan-400/50 shadow-xl transform translate-y-1 group-hover/canvas:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Click to enlarge certificate</span>
                    </span>
                  </div>
                </button>

                {/* Certificate Meta Details */}
                <div className="p-5 sm:p-6 space-y-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide uppercase border ${tagBadgeStyle}`}>
                    {cert.issuer}
                  </span>

                  <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {cert.name}
                  </h3>

                  {/* Description / Summary */}
                  {cert.description && (
                    <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>
                  )}

                  {/* Skills covered tags */}
                  {cert.skillsCovered && cert.skillsCovered.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                        Skills Covered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skillsCovered.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0b1338] text-slate-300 border border-cyan-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Data-Driven Certificate Lightbox (Edge-Safe, Zero iframes) */}
      <CertificateModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

    </section>
  );
};
