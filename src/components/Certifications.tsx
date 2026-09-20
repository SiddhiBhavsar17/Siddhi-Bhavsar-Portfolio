import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  FileCheck, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Crown
} from 'lucide-react';
import { certificationsData } from '../data/certifications';
import { Certification } from '../types';
import { CertificateModal } from './CertificateModal';

export const Certifications: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Top 3 featured certificates (strongest visual emphasis)
  const featuredCertificates = certificationsData.slice(0, 3);
  // Remaining certificates for the expanded view
  const remainingCertificates = certificationsData.slice(3);

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
              VERIFIED SPECIALIZATIONS &amp; BOOTCAMPS
            </p>
          </div>
        </div>

        {/* Counter and Header Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{certificationsData.length} Credentials Available</span>
          </div>

          {/* Quick Header Toggle Button */}
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-cyan-400 hover:text-cyan-300 font-mono transition-colors px-2 py-1 rounded-lg hover:bg-slate-900/60"
          >
            <span>{showAll ? 'Show Less ↑' : 'View All →'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP 3 FEATURED CERTIFICATES                                            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
        {featuredCertificates.map((cert, index) => {
          const isPrimary = index === 0;

          // Subtle animated neon glow borders consistent with Projects and Skills
          const cardBorder = isPrimary
            ? 'border-purple-500/60 shadow-[0_0_28px_rgba(168,85,247,0.25)] hover:border-purple-400 hover:shadow-[0_0_36px_rgba(168,85,247,0.4)]'
            : index === 1
            ? 'border-cyan-500/50 shadow-[0_0_24px_rgba(6,182,212,0.2)] hover:border-cyan-400 hover:shadow-[0_0_32px_rgba(6,182,212,0.35)]'
            : 'border-blue-500/50 shadow-[0_0_24px_rgba(59,130,246,0.2)] hover:border-blue-400 hover:shadow-[0_0_32px_rgba(59,130,246,0.35)]';

          const tagBadgeStyle = isPrimary
            ? 'bg-purple-950/80 border-purple-400/50 text-purple-300'
            : index === 1
            ? 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300'
            : 'bg-blue-950/80 border-blue-400/50 text-blue-300';

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`glass-panel glass-panel-hover rounded-2xl overflow-hidden border flex flex-col justify-between group hud-corner relative transition-all duration-300 bg-[#090d26]/90 backdrop-blur-xl ${cardBorder}`}
            >
              <div>
                {/* Certificate Image Canvas */}
                <div className="relative aspect-[16/10] bg-[#050818] overflow-hidden border-b border-slate-800/80 p-2.5 flex items-center justify-center">
                  <img
                    src={cert.thumbnail}
                    alt={cert.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />

                  {/* Primary Featured Crown Badge on Certificate 1 */}
                  {isPrimary && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border border-pink-300/40">
                      <Crown className="w-3 h-3 text-amber-300" />
                      <span>Primary Featured</span>
                    </div>
                  )}

                  {/* Year Tag */}
                  {cert.year && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded text-[10.5px] font-mono bg-slate-900/90 border border-slate-700 text-cyan-300 shadow">
                        {cert.year}
                      </span>
                    </div>
                  )}
                </div>

                {/* Certificate Meta Details */}
                <div className="p-5 sm:p-6 space-y-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide uppercase border ${tagBadgeStyle}`}>
                    {cert.issuer}
                  </span>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {cert.name}
                  </h3>

                  {/* Skills tags */}
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

              {/* View Certificate Action Button */}
              <div className="p-5 sm:p-6 pt-0 mt-3">
                <div className="pt-3 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold font-display tracking-wider text-slate-200 bg-[#0c122e] hover:bg-[#131d47] border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-sm active:scale-95 group/btn"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. REMAINING CERTIFICATES (Revealed on View All with Smooth Animation)    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                  Additional Professional Credentials
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
                {remainingCertificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-slate-800/90 hover:border-cyan-500/40 flex flex-col justify-between group hud-corner relative shadow-lg bg-[#080d24]/90 backdrop-blur-md hover:shadow-[0_0_24px_rgba(6,182,212,0.25)] transition-all duration-300"
                  >
                    <div>
                      {/* Image Canvas */}
                      <div className="relative aspect-[16/10] bg-[#050818] overflow-hidden border-b border-slate-800/80 p-2 flex items-center justify-center">
                        <img
                          src={cert.thumbnail}
                          alt={cert.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                        />
                        {cert.year && (
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/90 border border-slate-700 text-cyan-300 shadow">
                              {cert.year}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 space-y-2.5">
                        <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wide block font-medium">
                          {cert.issuer}
                        </span>

                        <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                          {cert.name}
                        </h3>

                        {cert.skillsCovered && cert.skillsCovered.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {cert.skillsCovered.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded text-[9.5px] font-mono bg-[#0b1338] text-slate-300 border border-slate-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* View Certificate Button */}
                    <div className="p-4 sm:p-5 pt-0 mt-2">
                      <div className="pt-3 border-t border-slate-800/80">
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold font-display tracking-wider text-slate-200 bg-[#090e24] hover:bg-[#0f173c] border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-sm active:scale-95"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View Certificate</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 3. EXPAND / COLLAPSE BUTTON BAR                                           */}
      {/* ========================================================================= */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold font-display tracking-wider text-white bg-gradient-to-r from-[#0c163b] via-[#101c4e] to-[#0c163b] hover:from-[#13225c] hover:to-[#13225c] border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300 active:scale-95 group"
        >
          {showAll ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            </>
          ) : (
            <>
              <span>View All Certifications ({certificationsData.length})</span>
              <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>

      {/* Data-Driven Certificate Modal / Lightbox */}
      <CertificateModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

    </section>
  );
};
