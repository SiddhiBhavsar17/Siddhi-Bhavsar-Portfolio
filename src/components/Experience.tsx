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
  Bot, 
  FileCheck2, 
  FileBadge 
} from 'lucide-react';
import { experienceData } from '../data/experience';
import { ExperienceDocument } from '../types';

export const Experience: React.FC = () => {
  const getDocumentIcon = (doc: ExperienceDocument) => {
    switch (doc.type) {
      case 'offer-letter':
        return <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />;
      case 'internship-certificate':
        return <Award className="w-4 h-4 text-amber-300 flex-shrink-0" />;
      case 'experience-certificate':
        return <FileBadge className="w-4 h-4 text-emerald-300 flex-shrink-0" />;
      case 'letter-of-recommendation':
        return <FileCheck2 className="w-4 h-4 text-yellow-300 flex-shrink-0" />;
      default:
        return <FileText className="w-4 h-4 text-amber-300 flex-shrink-0" />;
    }
  };

  const getDocumentButtonClasses = (doc: ExperienceDocument) => {
    switch (doc.type) {
      case 'offer-letter':
        return "bg-[#181136]/90 hover:bg-[#251a54] border border-purple-500/50 hover:border-purple-300 text-purple-200 hover:text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]";
      case 'internship-certificate':
        return "bg-gradient-to-r from-amber-500/90 to-yellow-500/90 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]";
      case 'experience-certificate':
        return "bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50";
      default:
        return "bg-slate-900/90 hover:bg-slate-800 border border-amber-400/30 text-amber-200 hover:text-white";
    }
  };

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header with Refined Cosmic Hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INDUSTRY TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide mt-1">
            Hands-on machine learning development, data processing pipelines, and production codebases.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0e29] border border-amber-400/30 text-xs font-mono text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{experienceData.length} Roles Completed</span>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {experienceData.map((item, index) => {
          const isLabmentix = item.id === 'exp-labmentix';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#0b0e2b]/95 via-[#070b20]/95 to-[#030614]/95 border border-purple-500/30 hover:border-amber-400/60 shadow-xl hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] backdrop-blur-xl transition-all duration-300 group"
            >
              <div>
                {/* Company Name & Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${
                      isLabmentix 
                        ? 'bg-[#1a1238] border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.2)]' 
                        : 'bg-[#150e30] border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    }`}>
                      {isLabmentix ? (
                        <Bot className="w-6 h-6" />
                      ) : (
                        <Building2 className="w-6 h-6" />
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-mono text-amber-300 uppercase tracking-widest block font-semibold">
                        {item.organization}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors mt-0.5">
                        {item.role}
                      </h3>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border bg-[#060a1e]/90 border-amber-400/40 text-amber-300 shadow-sm">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{item.period}</span>
                    </span>
                  </div>
                </div>

                {/* Work Type & Location */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 font-mono my-3.5 pb-3.5 border-b border-slate-800/80">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0e163d] border border-purple-500/30 text-purple-200">
                    <Monitor className="w-3.5 h-3.5 text-purple-400" />
                    <span>{item.type}</span>
                  </span>

                  {item.location && item.location !== 'Virtual' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0f29] border border-slate-700/80 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed my-4 font-light">
                  {item.description}
                </p>
              </div>

              {/* Documents & Action Buttons */}
              <div className="pt-5 mt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                {item.documents && item.documents.length > 0 ? (
                  item.documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-display font-semibold tracking-wider transition-all active:scale-95 cursor-pointer ${getDocumentButtonClasses(doc)}`}
                      title={`${doc.title} (${item.organization})`}
                    >
                      {getDocumentIcon(doc)}
                      <span>{doc.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80 ml-0.5" />
                    </a>
                  ))
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
