import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  Award, 
  FileText, 
  Sparkles,
  Monitor,
  ExternalLink,
  Bot
} from 'lucide-react';
import { experienceData } from '../data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Experience
            </h2>
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
              INTERNSHIPS &amp; TECHNICAL EXPERIENCE
            </p>
          </div>
        </div>

        {/* Total experiences count badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{experienceData.length} Roles Completed</span>
        </div>
      </div>

      {/* 2 Animated Glassmorphism Experience Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {experienceData.map((item, index) => {
          const isLabmentix = item.id === 'exp-labmentix';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800/90 hover:border-cyan-500/40 relative group hud-corner shadow-xl transition-all duration-300 hover:shadow-cyan-950/30"
            >
              <div>
                {/* 1. Company Name & Icon */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${
                      isLabmentix 
                        ? 'bg-cyan-950/50 border-cyan-500/30 text-cyan-400 shadow-cyan-950/50' 
                        : 'bg-purple-950/50 border-purple-500/30 text-purple-400 shadow-purple-950/50'
                    }`}>
                      {isLabmentix ? (
                        <Bot className="w-6 h-6" />
                      ) : (
                        <Building2 className="w-6 h-6" />
                      )}
                    </div>

                    <div>
                      {/* Company Name */}
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-semibold">
                        {item.organization}
                      </span>
                      {/* Role / Experience Title */}
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide group-hover:text-cyan-200 transition-colors mt-0.5">
                        {item.role}
                      </h3>
                    </div>
                  </div>

                  {/* Duration Badge with Calendar Icon */}
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border shadow-sm ${
                      isLabmentix 
                        ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300' 
                        : 'bg-purple-950/70 border-purple-500/40 text-purple-300'
                    }`}>
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* 3. Work Type & Location metadata row */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 font-mono my-3 pb-3 border-b border-slate-800/80">
                  {/* Work Type with Monitor/Remote Icon */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-cyan-300">
                    <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.type}</span>
                  </span>

                  {/* Location (for Labmentix) */}
                  {item.location && item.location !== 'Virtual' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>

                {/* 4. Short Description */}
                <p className="text-sm sm:text-[14.5px] text-slate-300 leading-relaxed my-4 font-light">
                  {item.description}
                </p>
              </div>

              {/* 5. Documents / Action Buttons (Open in New Tab) */}
              <div className="pt-5 mt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                {/* Labmentix: View Experience Certificate & View Offer Letter */}
                {isLabmentix && (
                  <>
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600/90 via-blue-600/90 to-indigo-600/90 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-display font-semibold tracking-wider shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/25 active:scale-95 transition-all"
                    >
                      <Award className="w-4 h-4 text-cyan-200" />
                      <span>View Experience Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-200 ml-0.5" />
                    </a>

                    <a
                      href={item.offerLetterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/50 border border-purple-500/40 hover:border-purple-400 text-purple-200 text-xs font-display font-semibold tracking-wider shadow active:scale-95 transition-all"
                    >
                      <FileText className="w-4 h-4 text-purple-400" />
                      <span>View Offer Letter</span>
                      <ExternalLink className="w-3.5 h-3.5 text-purple-300 ml-0.5" />
                    </a>
                  </>
                )}

                {/* Tata Group × Forage: View Certificate */}
                {!isLabmentix && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/90 via-indigo-600/90 to-cyan-600/90 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-display font-semibold tracking-wider shadow-lg shadow-purple-950/50 hover:shadow-purple-500/25 active:scale-95 transition-all"
                  >
                    <Award className="w-4 h-4 text-purple-200" />
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-200 ml-0.5" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
