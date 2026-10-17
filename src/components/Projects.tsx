import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  Github, 
  Crown,
  Maximize2,
  Sparkles,
  ExternalLink,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { ProjectMediaModal } from './ProjectMediaModal';

export const Projects: React.FC = () => {
  const [mediaProject, setMediaProject] = useState<Project | null>(null);

  // Flagship featured project (Journey Bhai)
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  // Standard project cards (NovaSentinel, Sign Language, Constellation)
  const standardProjects = projectsData.filter((p) => p.id !== featuredProject.id);

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting accent */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header with Refined Cosmic Hierarchy */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-5 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>APPLIED AI ENGINEERING & RESEARCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Featured Creations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide mt-1">
            Production-grade AI architectures, autonomous agents, and real-time computer vision models.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-300/80">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>JOURNEY BHAI FLAGSHIP ACTIVE</span>
        </div>
      </div>

      <div className="space-y-10">
        
        {/* ========================================================================= */}
        {/* 1. FEATURED PROJECT — JOURNEY BHAI (Flagship Prominence Card)            */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="relative group/flagship"
        >
          {/* Cosmic Purple-Gold Animated Halo Glow */}
          <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-amber-500 via-purple-600 to-amber-400 opacity-60 group-hover/flagship:opacity-100 blur-md transition-all duration-700 -z-10" />
          
          <div className="rounded-3xl bg-gradient-to-br from-[#120f36]/95 via-[#0a0d26]/95 to-[#040614]/95 backdrop-blur-2xl border border-amber-400/50 p-6 sm:p-8 lg:p-10 shadow-[0_0_40px_rgba(251,191,36,0.2)] group-hover/flagship:shadow-[0_0_60px_rgba(251,191,36,0.35)] transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive Image Banner (Click to Enlarge) */}
              <div className="lg:col-span-6 space-y-4">
                <button
                  type="button"
                  onClick={() => setMediaProject(featuredProject)}
                  aria-label={`Enlarge ${featuredProject.name} visual preview`}
                  className="w-full text-left relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#060a1c] border-2 border-amber-400/40 group-hover/flagship:border-amber-400 transition-all shadow-2xl cursor-pointer group/canvas focus:outline-none focus:ring-2 focus:ring-amber-400/50 block"
                >
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/canvas:scale-105 transition-transform duration-700 opacity-95 group-hover/canvas:opacity-100"
                  />
                  
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06091d] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Top Featured Ribbon in Golden Cosmic Gradient */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg border border-amber-300">
                      <Crown className="w-3.5 h-3.5 text-slate-950" />
                      <span>FLAGSHIP AI SHOWCASE</span>
                    </span>
                  </div>

                  {/* Hover Overlay: Click to Enlarge Indicator */}
                  <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover/canvas:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px] pointer-events-none z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-950 bg-amber-400 shadow-xl transform translate-y-1 group-hover/canvas:translate-y-0 transition-transform">
                      <Maximize2 className="w-4 h-4 text-slate-950" />
                      <span>Click to enlarge preview</span>
                    </span>
                  </div>

                  {/* Journey Bhai Brandmark Logo overlay */}
                  {featuredProject.logo && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-[#060a1c]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-400/50 shadow-xl pointer-events-none z-10">
                      <img 
                        src={featuredProject.logo} 
                        alt="Journey Bhai Logo" 
                        className="w-7 h-7 object-cover rounded-full ring-2 ring-amber-400"
                      />
                      <span className="text-xs font-display font-extrabold text-white tracking-wider">
                        JOURNEY BHAI
                      </span>
                    </div>
                  )}
                </button>
              </div>

              {/* Right Column: Project Details & Actions */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2.5">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold px-3 py-1 rounded-md bg-amber-500/20 border border-amber-400/40">
                      {featuredProject.category}
                    </span>
                    <span className="text-xs font-mono text-purple-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Intelligent Travel Planner & Multi-City Engine</span>
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight group-hover/flagship:text-amber-200 transition-colors">
                    {featuredProject.name}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light mt-4">
                    {featuredProject.description}
                  </p>
                </div>

                {/* Technical Stack Pills with Purple-Gold Harmonics */}
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2.5 font-medium">
                    Integrated Technologies & Frameworks:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-[#14123d] text-amber-300 border border-purple-500/40 font-medium shadow-sm hover:border-amber-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions: GitHub Repository & Preview Modal */}
                <div className="pt-4 border-t border-slate-800/90 flex flex-wrap items-center gap-3">
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold font-display tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.35)] transition-all active:scale-95 cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-slate-950" />
                    <span>View GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setMediaProject(featuredProject)}
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-medium font-mono text-purple-200 hover:text-white bg-[#150f33]/80 hover:bg-[#20164c] border border-purple-500/50 hover:border-purple-300 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Enlarge Showcase</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. THREE STANDARD PROJECTS: NovaSentinel, Sign Language, Constellation   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {standardProjects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative rounded-2xl overflow-hidden border border-purple-500/25 hover:border-amber-400/60 bg-gradient-to-b from-[#0b0e2b]/95 via-[#070b20]/95 to-[#030614]/95 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300"
              >
                <div>
                  {/* Project Image Banner — Clickable to Enlarge */}
                  <button
                    type="button"
                    onClick={() => setMediaProject(project)}
                    aria-label={`Enlarge ${project.name} visual preview`}
                    className="w-full text-left relative aspect-[16/10] bg-[#070b1e] overflow-hidden border-b border-slate-800/80 cursor-pointer group/canvas focus:outline-none focus:ring-2 focus:ring-amber-400/50 block"
                  >
                    <img 
                      src={project.image} 
                      alt={project.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/canvas:scale-105 transition-transform duration-700 opacity-90 group-hover/canvas:opacity-100"
                    />

                    {/* Dark Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080d24] via-transparent to-transparent opacity-80 pointer-events-none" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 pointer-events-none z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide shadow-md border bg-[#060a1e]/90 border-purple-500/40 text-purple-200">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Overlay: Click to Enlarge Indicator */}
                    <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover/canvas:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px] pointer-events-none z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-950 bg-amber-400 shadow-xl transform translate-y-1 group-hover/canvas:translate-y-0 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-950" />
                        <span>Enlarge preview</span>
                      </span>
                    </div>
                  </button>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-3.5">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-200 transition-colors">
                      {project.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Technical Stack Badges */}
                    <div className="pt-2">
                      <span className="text-[10.5px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                        Technical Stack:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#110f33] text-purple-200 border border-purple-500/30 group-hover:border-amber-400/40 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action: [ GitHub Repository ] */}
                <div className="p-6 pt-0 mt-4">
                  <div className="pt-4 border-t border-slate-800/80 flex items-center">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold font-display tracking-wider text-slate-200 hover:text-white bg-[#0e1233] hover:bg-[#181d4a] border border-slate-700/80 hover:border-amber-400/60 transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5 text-amber-300" />
                      <span>GitHub Repository</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
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
