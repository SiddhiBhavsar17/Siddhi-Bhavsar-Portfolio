import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Gamepad2, 
  Sparkles, 
  Headphones, 
  Compass,
  MapPin,
  Building2,
  Calendar,
  Award,
  Quote
} from 'lucide-react';
import { personalData } from '../data/personalData';
import { educationData, hobbiesData } from '../data/education';

// Map icons to Lucide components for the 5 hobbies
const hobbyIconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-4 h-4 text-amber-400" />,
  Gamepad2: <Gamepad2 className="w-4 h-4 text-emerald-400" />,
  Sparkles: <Sparkles className="w-4 h-4 text-purple-400" />,
  Headphones: <Headphones className="w-4 h-4 text-cyan-400" />,
  Compass: <Compass className="w-4 h-4 text-rose-400" />
};

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Ambient Cosmic Nebulae */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header with Refined Cosmic Hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGIN & FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            About Siddhi
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wider max-w-md">
          Driven by curiosity, powered by machine learning, aiming to create scalable intelligent systems.
        </p>
      </div>

      {/* 3-Card Bento Box Row with Subtle Cosmic Visual Treatment */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* ======================================================================= */}
        {/* CARD 1: ABOUT ME / COSMIC CORE                                          */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#0a0f2e]/90 via-[#070b20]/90 to-[#030614]/90 border border-purple-500/25 hover:border-amber-400/50 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] backdrop-blur-xl transition-all group"
        >
          {/* Subtle celestial corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-tr-2xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.25)]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors">
                  Biography & Vision
                </h3>
                <span className="text-[11px] font-mono text-amber-300/80 tracking-wider">AI/ML PRACTITIONER</span>
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light mb-6">
              <p>
                Hi, I’m <strong className="text-white font-medium">Siddhi Bhavsar</strong>, a curious and driven Computer Science and Engineering student passionate about AI/ML, technology, problem-solving, and continuous learning.
              </p>
              <p>
                Currently pursuing my B.Tech in CSE at <strong className="text-amber-200 font-medium">{personalData.college}</strong> with a <span className="text-amber-300 font-mono font-semibold">CGPA of 9.07</span>.
              </p>
              <p>
                My mission is to build a strong career in AI/ML, master real-world generative models, and turn breakthrough ideas into technology-driven products.
              </p>
            </div>

            {/* Quote / Motto Box */}
            {personalData.motto && (
              <div className="p-3.5 rounded-xl bg-[#0e163b]/60 border border-purple-500/30 flex items-start gap-2.5 mb-4">
                <Quote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/95 font-handwriting italic tracking-wide">
                  &ldquo;{personalData.motto}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Essential Info Directly Visible Inside The Card */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Institution:</span>
              </span>
              <span className="text-amber-200 font-medium sm:text-right">{personalData.college}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span>Location:</span>
              </span>
              <span className="text-slate-300 font-medium sm:text-right">{personalData.location}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 pt-1 gap-1">
              <span className="text-slate-400">Specialization:</span>
              <div className="flex flex-wrap items-center gap-1.5 sm:justify-end text-amber-300 font-medium">
                {personalData.specialization.map((spec, i) => (
                  <React.Fragment key={spec}>
                    <span>{spec}</span>
                    {i < personalData.specialization.length - 1 && (
                      <span className="text-amber-500/50" aria-hidden="true">✦</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* CARD 2: EDUCATION (ACADEMIC ORBIT)                                      */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-gradient-to-b from-[#0c0d2e]/90 via-[#070b20]/90 to-[#030614]/90 border border-indigo-500/25 hover:border-amber-400/50 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] backdrop-blur-xl transition-all group"
        >
          <div>
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-wide group-hover:text-indigo-200 transition-colors">
                  Academic Journey
                </h3>
                <span className="text-[11px] font-mono text-cyan-300/80 tracking-wider">MILESTONES & EXCELLENCE</span>
              </div>
            </div>

            {/* Stacked Education Timeline Cards */}
            <div className="space-y-3.5">
              {educationData.map((edu, index) => {
                const isFirst = index === 0;

                return (
                  <div
                    key={edu.degree}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isFirst
                        ? 'bg-gradient-to-r from-[#14123d]/90 to-[#0c1438]/90 border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                        : 'bg-[#060a1c]/80 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isFirst ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
                          <h4 className="text-sm font-display font-bold text-white leading-tight">
                            {edu.degree}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 pl-4">{edu.institution}</p>
                      </div>

                      <div className="sm:text-right flex items-center sm:flex-col justify-between sm:justify-start gap-2 flex-shrink-0 pl-4 sm:pl-0">
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 sm:justify-end">
                          <Calendar className="w-3 h-3 text-amber-400/80" />
                          <span>{edu.period}</span>
                        </span>
                        <div className="flex items-center gap-1 sm:justify-end">
                          <Award className="w-3 h-3 text-amber-400" />
                          <span className="text-xs font-mono font-bold text-amber-300">
                            {edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.percentage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Academic High-Water Mark Banner */}
          <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-slate-300">Current Standing:</span>
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>B.Tech CSE · Year 3</span>
            </span>
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* CARD 3: PASSIONS & CREATIVE CORE (HOBBIES)                              */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#130d2e]/90 via-[#070b20]/90 to-[#030614]/90 border border-purple-500/25 hover:border-purple-400/50 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-xl transition-all group"
        >
          <div>
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-wide group-hover:text-purple-200 transition-colors">
                  Creative Orbit
                </h3>
                <span className="text-[11px] font-mono text-purple-300/80 tracking-wider">INTERESTS & RECHARGE</span>
              </div>
            </div>

            {/* List of 5 Hobbies */}
            <div className="space-y-3">
              {hobbiesData.map((hobby) => (
                <div
                  key={hobby.id}
                  className="p-3 rounded-xl bg-[#080d26]/80 border border-slate-800/90 hover:border-purple-400/40 transition-all flex items-center justify-between group/hobby"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-700/60 flex items-center justify-center group-hover/hobby:scale-105 transition-transform">
                      {hobbyIconMap[hobby.icon] || <Sparkles className="w-4 h-4 text-purple-400" />}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-display font-bold text-white group-hover/hobby:text-amber-200 transition-colors">
                        {hobby.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-amber-400/40 text-xs font-mono" aria-hidden="true">✦</span>
                </div>
              ))}
            </div>
          </div>

          {/* Balance Statement */}
          <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-slate-300">Mindset:</span>
            <span className="text-purple-300 font-medium">Curiosity · Exploration · Growth</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
