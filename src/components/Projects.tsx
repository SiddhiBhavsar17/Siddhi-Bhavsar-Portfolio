import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Github, 
  Image as ImageIcon, 
  Sparkles, 
  Crown,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { ProjectMediaModal } from './ProjectMediaModal';
import journeyBhaiFallback from '../assets/projects/journey-bhai.svg';
import novaSentinelFallback from '../assets/projects/novasentinel.svg';
import signLanguageFallback from '../assets/projects/sign-language.svg';
import constellationFallback from '../assets/projects/constellation.svg';
import journeyBhaiLogo from '../assets/logos/journey-bhai-logo.svg';

const fallbackProjectImages: Record<string, string> = {
  'journey-bhai': journeyBhaiFallback,
  'novasentinel': novaSentinelFallback,
  'sign-language-translator': signLanguageFallback,
  'constellation-explorer': constellationFallback,
};

export const Projects: React.FC = () => {
  const [mediaProject, setMediaProject] = useState<Project | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Flagship featured project
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  // Standard project cards
  const standardProjects = projectsData.filter((p) => p.id !== featuredProject.id);

  return (
    <section id="projects" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background ambient lighting accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Projects
            </h2>
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
              AI / ML • COMPUTER VISION • GENERATIVE AI
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        
        {/* ========================================================================= */}
        {/* 1. FEATURED PROJECT — JOURNEY BHAI (Flagship Prominence Card)            */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          {/* Neon Animated Flow Border Glow */}
          <div className="absolute -inset-[1.5px] rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 opacity-60 group-hover:opacity-100 blur-sm transition-all duration-500 -z-10" />
          
          <div className="rounded-3xl bg-[#090d26]/95 backdrop-blur-xl border border-purple-500/50 p-6 sm:p-8 lg:p-10 shadow-[0_0_35px_rgba(168,85,247,0.25)] hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Image / Visual Banner & Logo */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#060a1c] border border-purple-500/30 group-hover:border-purple-400/60 transition-colors shadow-2xl">
                  <img
                    src={imgErrors[featuredProject.id] ? journeyBhaiFallback : featuredProject.image}
                    alt={featuredProject.name}
                    onError={() => setImgErrors(prev => ({ ...prev, [featuredProject.id]: true }))}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d24] via-transparent to-transparent opacity-80" />

                  {/* Top Featured Ribbon */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border border-pink-300/40">
                      <Crown className="w-3.5 h-3.5 text-amber-300" />
                      <span>Featured Flagship</span>
                    </span>
                  </div>

                  {/* Journey Bhai Brandmark Logo overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-[#060a1c]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-purple-500/40 shadow-xl">
                    <img 
                      src={featuredProject.logo || journeyBhaiLogo} 
                      alt="Journey Bhai Logo" 
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-xs font-display font-bold text-white tracking-wider">
                      JOURNEY BHAI
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Project Details & Actions */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-semibold px-2.5 py-0.5 rounded-md bg-purple-950/70 border border-purple-500/30">
                      {featuredProject.category}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">✦ Flagship Architecture</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight group-hover:text-purple-200 transition-colors">
                    {featuredProject.name}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mt-3">
                    {featuredProject.description}
                  </p>
                </div>

                {/* Technical Stack Pills */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-medium">
                    Technical Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#0e163d] text-cyan-300 border border-cyan-500/30 font-medium shadow-sm hover:border-cyan-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: [ GitHub Repository ] & [ View Media ] */}
                <div className="pt-4 border-t border-slate-800/90 flex flex-wrap items-center gap-3">
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold font-display tracking-wider text-slate-200 bg-[#0c122e] hover:bg-[#151f4d] border border-slate-700 hover:border-slate-400 transition-all shadow-md active:scale-95"
                  >
                    <Github className="w-4 h-4 text-slate-300" />
                    <span>GitHub Repository</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setMediaProject(featuredProject)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold font-display tracking-wider text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/50 transition-all shadow-[0_0_18px_rgba(168,85,247,0.35)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95"
                  >
                    <ImageIcon className="w-4 h-4 text-pink-200" />
                    <span>View Media</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. THREE STANDARD PROJECTS: NovaSentinel, Sign Language, Constellation   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {standardProjects.map((project, index) => {
            // Distinct neon theme accents per card
            const neonCardBorder = index === 0
              ? 'border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]'
              : index === 1
              ? 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]'
              : 'border-fuchsia-500/40 hover:border-fuchsia-400 hover:shadow-[0_0_24px_rgba(217,70,239,0.25)]';

            const badgeStyle = index === 0
              ? 'bg-blue-950/80 border-blue-400/50 text-blue-200'
              : index === 1
              ? 'bg-cyan-950/80 border-cyan-400/50 text-cyan-200'
              : 'bg-fuchsia-950/80 border-fuchsia-400/50 text-fuchsia-200';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`glass-panel glass-panel-hover rounded-2xl overflow-hidden border flex flex-col justify-between group hud-corner relative shadow-xl transition-all duration-300 ${neonCardBorder}`}
              >
                <div>
                  {/* Project Image Banner */}
                  <div className="relative w-full aspect-[16/10] bg-[#070b1e] overflow-hidden border-b border-slate-800/80">
                    <img 
                      src={imgErrors[project.id] ? (fallbackProjectImages[project.id] || constellationFallback) : project.image} 
                      alt={project.name}
                      onError={() => setImgErrors(prev => ({ ...prev, [project.id]: true }))}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />

                    {/* Dark Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080d24] via-transparent to-transparent opacity-75" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide shadow-md border ${badgeStyle}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Quick Media badge trigger */}
                    <button
                      type="button"
                      onClick={() => setMediaProject(project)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-sm transition-colors"
                      title="View Project Media"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {project.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Technical Stack Badges */}
                    <div className="pt-2">
                      <span className="text-[10.5px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                        Technical Stack:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#0c1436] text-cyan-300 border border-cyan-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dual Action Buttons: [ GitHub Repository ] and [ View Media ] */}
                <div className="p-5 sm:p-6 pt-0 mt-4">
                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold font-display tracking-wider text-slate-200 bg-[#0c122e] hover:bg-[#121c46] border border-slate-700/80 hover:border-slate-500 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                      <span>GitHub</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setMediaProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold font-display tracking-wider text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 border border-cyan-400/30 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)] active:scale-95"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-200" />
                      <span>View Media</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Project Media Gallery Modal */}
      <ProjectMediaModal
        project={mediaProject}
        onClose={() => setMediaProject(null)}
      />

    </section>
  );
};
