import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Sparkles, 
  Star, 
  Eye, 
  Award, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Crown,
  X,
  FileText
} from 'lucide-react';
import { achievementsData } from '../data/achievements';
import { Achievement, Project, Certification } from '../types';
import { projectsData } from '../data/projects';
import { certificationsData } from '../data/certifications';
import { ProjectMediaModal } from './ProjectMediaModal';
import { CertificateModal } from './CertificateModal';

export const Achievements: React.FC = () => {
  // Modal states
  const [selectedAchievementCert, setSelectedAchievementCert] = useState<Achievement | null>(null);
  const [mediaModalProject, setMediaModalProject] = useState<Project | null>(null);
  const [selectedCertModal, setSelectedCertModal] = useState<Certification | null>(null);

  // Retrieve Journey Bhai project data
  const journeyBhaiProject = projectsData.find((p) => p.id === 'journey-bhai') || projectsData[0];

  // Retrieve AI Engineer Course certification data
  const aiEngineerCert = certificationsData.find((c) => c.id === 'cert-ai-engineer-bootcamp') || certificationsData[0];

  return (
    <section id="achievements" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* SECTION 1: ⭐ HIGHLIGHTS                                                  */}
      {/* ========================================================================= */}
      <div>
        {/* Subsection Header */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <span>Highlights</span>
                <span className="text-amber-400 text-xl sm:text-2xl">⭐</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                FEATURED FLAGSHIP WORK &amp; PRIMARY CREDENTIALS
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Highlights Grid: Journey Bhai & AI Engineer Course */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Highlight 1: Journey Bhai (Featured Project) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel glass-panel-hover rounded-2xl border border-purple-500/40 hover:border-purple-400/80 shadow-[0_0_30px_rgba(168,85,247,0.18)] hover:shadow-[0_0_36px_rgba(168,85,247,0.3)] flex flex-col justify-between overflow-hidden relative hud-corner group bg-[#090d26]/90 backdrop-blur-xl"
          >
            {/* Top Label & Visual */}
            <div>
              <div className="relative aspect-[16/9] bg-[#050818] overflow-hidden border-b border-slate-800/80 p-3 flex items-center justify-center">
                <img
                  src={journeyBhaiProject.image}
                  alt={journeyBhaiProject.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlaid Logo */}
                {journeyBhaiProject.logo && (
                  <div className="absolute bottom-3 left-3 p-1.5 rounded-xl bg-slate-950/90 border border-purple-500/40 shadow-lg">
                    <img
                      src={journeyBhaiProject.logo}
                      alt="Journey Bhai Logo"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                )}

                {/* Featured Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border border-pink-300/40">
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  <span>Featured Project</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-950/80 border border-purple-400/50 text-purple-300 uppercase tracking-wide">
                    {journeyBhaiProject.tagline || 'AI Travel Assistant'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-purple-200 transition-colors">
                  {journeyBhaiProject.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {journeyBhaiProject.description}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 pt-0 mt-2">
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMediaModalProject(journeyBhaiProject)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold font-display tracking-wider text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/50 shadow-md transition-all active:scale-95"
                >
                  <Eye className="w-4 h-4 text-purple-200" />
                  <span>View Project / View Media</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Highlight 2: AI Engineer Course (Featured Certification) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-panel glass-panel-hover rounded-2xl border border-cyan-500/40 hover:border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.18)] hover:shadow-[0_0_36px_rgba(6,182,212,0.3)] flex flex-col justify-between overflow-hidden relative hud-corner group bg-[#090d26]/90 backdrop-blur-xl"
          >
            {/* Top Label & Visual */}
            <div>
              <div className="relative aspect-[16/9] bg-[#050818] overflow-hidden border-b border-slate-800/80 p-3 flex items-center justify-center">
                <img
                  src={aiEngineerCert.thumbnail}
                  alt={aiEngineerCert.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {/* Featured Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg border border-cyan-300/40">
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  <span>Featured Certification</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 uppercase tracking-wide">
                    365 Careers · Udemy
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                  AI Engineer Course — Complete AI Engineer Bootcamp
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Comprehensive artificial intelligence specialization covering foundational machine learning principles through modern deep architectures, LLM systems, and production engineering.
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 pt-0 mt-2">
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCertModal(aiEngineerCert)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold font-display tracking-wider text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border border-cyan-400/50 shadow-md transition-all active:scale-95"
                >
                  <Eye className="w-4 h-4 text-cyan-200" />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: 🏆 ACHIEVEMENTS                                                */}
      {/* ========================================================================= */}
      <div>
        {/* Subsection Header */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <span>Achievements</span>
                <span className="text-amber-400 text-xl sm:text-2xl">🏆</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                HACKATHONS • RECOGNITIONS
              </p>
            </div>
          </div>
        </div>

        {/* 3 Cards Row in Exact Order: HackACE 2026 -> Adobe 2026 -> IEEE ACSS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {achievementsData.map((item, index) => {
            const isHackACE = item.id.includes('hackace');
            const isAdobe = item.id.includes('adobe');
            const isIEEE = item.id.includes('ieee');

            const cardBorder = isHackACE
              ? 'border-purple-500/50 hover:border-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.18)] hover:shadow-[0_0_32px_rgba(168,85,247,0.3)]'
              : isAdobe
              ? 'border-red-500/50 hover:border-red-400 shadow-[0_0_24px_rgba(239,68,68,0.18)] hover:shadow-[0_0_32px_rgba(239,68,68,0.3)]'
              : 'border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_24px_rgba(6,182,212,0.18)] hover:shadow-[0_0_32px_rgba(6,182,212,0.3)]';

            const statusBadgeStyle = isHackACE
              ? 'bg-purple-950/80 text-purple-300 border-purple-400/50'
              : isAdobe
              ? 'bg-red-950/80 text-red-300 border-red-400/50'
              : 'bg-cyan-950/80 text-cyan-300 border-cyan-400/50';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className={`glass-panel glass-panel-hover rounded-2xl overflow-hidden border flex flex-col justify-between relative group hud-corner shadow-xl bg-[#090d26]/90 backdrop-blur-xl transition-all duration-300 ${cardBorder}`}
              >
                <div>
                  {/* Certificate / Credential Thumbnail Stage */}
                  <div className="relative aspect-[16/10] bg-[#050818] overflow-hidden border-b border-slate-800/80 p-2.5 flex items-center justify-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                    />

                    {/* Status Badge Tag on Card Top Right */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold tracking-wider uppercase border shadow-md ${statusBadgeStyle}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Content: Event -> Status -> Project */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {/* Event Name */}
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Status Display */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">Status:</span>
                      <span className="text-xs font-mono font-semibold text-amber-300">
                        {item.status}
                      </span>
                    </div>

                    {/* Project Name (when applicable) */}
                    {item.project && (
                      <div className="p-2.5 rounded-xl bg-[#0b1338] border border-slate-800 text-xs">
                        <span className="text-slate-400 font-mono block text-[10.5px] uppercase tracking-wider mb-0.5">
                          Project:
                        </span>
                        <span className="font-semibold text-white text-sm">
                          {item.project}
                        </span>
                      </div>
                    )}

                    {/* Short Project Description (e.g. for IEEE ACSS) */}
                    {item.description && (
                      <p className="text-xs text-slate-300 font-light leading-relaxed pt-1">
                        "{item.description}"
                      </p>
                    )}
                  </div>
                </div>

                {/* View Certificate Action Button */}
                <div className="p-5 sm:p-6 pt-0 mt-2">
                  <div className="pt-3 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setSelectedAchievementCert(item)}
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
      </div>

      {/* ========================================================================= */}
      {/* ACHIEVEMENT CERTIFICATE MODAL / LIGHTBOX                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedAchievementCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setSelectedAchievementCert(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#080d24] border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.25)] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-[#060a1c]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block truncate">
                      {selectedAchievementCert.status}
                    </span>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-wide truncate">
                      {selectedAchievementCert.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedAchievementCert(null)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/80 flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Lightbox Canvas */}
              <div className="relative bg-[#040612] flex items-center justify-center min-h-[280px] sm:min-h-[380px] p-4 sm:p-6 overflow-hidden border-b border-slate-800/80">
                <img
                  src={selectedAchievementCert.certificateUrl || selectedAchievementCert.thumbnail}
                  alt={selectedAchievementCert.title}
                  className="max-h-[55vh] w-auto max-w-full rounded-xl border border-slate-800 shadow-2xl object-contain bg-[#070b1e]"
                />
              </div>

              {/* Details Body */}
              <div className="p-5 sm:p-6 space-y-3 bg-[#080d24]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0a102c] border border-slate-800/90 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono block mb-0.5">Event:</span>
                    <span className="font-semibold text-white text-sm">{selectedAchievementCert.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block mb-0.5">Status:</span>
                    <span className="font-semibold text-amber-300 text-sm">{selectedAchievementCert.status}</span>
                  </div>
                  {selectedAchievementCert.project && (
                    <div className="sm:col-span-2 pt-2 border-t border-slate-800/80">
                      <span className="text-slate-400 font-mono block mb-0.5">Project:</span>
                      <span className="font-semibold text-white text-sm">{selectedAchievementCert.project}</span>
                    </div>
                  )}
                </div>

                {selectedAchievementCert.description && (
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    "{selectedAchievementCert.description}"
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-4 bg-[#060a1c] border-t border-slate-800/80 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedAchievementCert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reusable Project Media Modal for Journey Bhai */}
      {mediaModalProject && (
        <ProjectMediaModal
          project={mediaModalProject}
          onClose={() => setMediaModalProject(null)}
        />
      )}

      {/* Reusable Certificate Modal for AI Engineer Course */}
      {selectedCertModal && (
        <CertificateModal
          certification={selectedCertModal}
          onClose={() => setSelectedCertModal(null)}
        />
      )}

    </section>
  );
};
