import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileCheck, 
  Sparkles, 
  Maximize2,
  ExternalLink,
  Award
} from 'lucide-react';
import { certificationsData } from '../data/certifications';
import { Certification } from '../types';
import { CertificateModal } from './CertificateModal';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header with Refined Cosmic Hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VERIFIED ACADEMIC & INDUSTRY CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Certifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide mt-1">
            Rigorous programs in AI Engineering, Machine Learning, Data Analytics, and Software Architecture.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0e29] border border-amber-400/30 text-xs font-mono text-amber-300">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>{certificationsData.length} Verified Credentials</span>
        </div>
      </div>

      {/* All 6 Certifications Displayed in Refined Cosmic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {certificationsData.map((cert, index) => {
          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl overflow-hidden border border-purple-500/30 hover:border-amber-400/60 bg-gradient-to-b from-[#0b0e2b]/95 via-[#070b20]/95 to-[#030614]/95 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_30px_rgba(251,191,36,0.18)] transition-all duration-300"
            >
              <div>
                {/* Certificate Thumbnail Preview (Clickable to Enlarge) */}
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  aria-label={`Enlarge ${cert.name} certificate`}
                  className="w-full text-left relative aspect-[16/10] bg-[#070b1e] overflow-hidden border-b border-slate-800/80 cursor-pointer group/canvas focus:outline-none focus:ring-2 focus:ring-amber-400/50 block"
                >
                  <img
                    src={cert.previewUrl || cert.thumbnail}
                    alt={cert.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/canvas:scale-105 transition-transform duration-700 opacity-90 group-hover/canvas:opacity-100"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d24] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Issuer & Year Tag */}
                  <div className="absolute top-3 left-3 pointer-events-none z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide shadow-md border bg-[#060a1e]/90 border-amber-400/40 text-amber-300">
                      {cert.issuer}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 pointer-events-none z-10">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-950/80 border border-slate-700 text-slate-300">
                      {cert.year}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover/canvas:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px] pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-950 bg-amber-400 shadow-xl transform translate-y-1 group-hover/canvas:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-slate-950" />
                      <span>View Full Certificate</span>
                    </span>
                  </div>
                </button>

                {/* Card Content Body */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                    {cert.name}
                  </h3>

                  {cert.description && (
                    <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-light">
                      {cert.description}
                    </p>
                  )}

                  {/* Skills Covered */}
                  {cert.skillsCovered && cert.skillsCovered.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10.5px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5 font-medium">
                        Core Competencies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skillsCovered.map((skill: string) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#110f33] text-purple-200 border border-purple-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 mt-4">
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold font-display tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_15px_rgba(251,191,36,0.25)] transition-all active:scale-95 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-slate-950" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Certificate Modal Preview */}
      <CertificateModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
