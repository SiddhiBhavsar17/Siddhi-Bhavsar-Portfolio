import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  GraduationCap, 
  Heart, 
  BookOpen, 
  Gamepad2, 
  Sparkles, 
  Headphones, 
  Compass,
  MapPin,
  Building2,
  Calendar,
  Award
} from 'lucide-react';
import { personalData } from '../data/personalData';
import { educationData, hobbiesData } from '../data/education';

// Map icons to Lucide components for the 5 hobbies
const hobbyIconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-4 h-4 text-indigo-400" />,
  Gamepad2: <Gamepad2 className="w-4 h-4 text-emerald-400" />,
  Sparkles: <Sparkles className="w-4 h-4 text-pink-400" />,
  Headphones: <Headphones className="w-4 h-4 text-cyan-400" />,
  Compass: <Compass className="w-4 h-4 text-purple-400" />
};

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 3-Card Bento Box Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* ======================================================================= */}
        {/* CARD 1: ABOUT ME */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800/90 hover:border-cyan-500/40 relative group hud-corner"
        >
          <div>
            {/* Header with circular user icon - No subtitle as requested */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-wide">
                  About Me
                </h3>
              </div>
            </div>

            {/* Exact Requested Professional Bio */}
            <div className="space-y-3.5 text-sm sm:text-[14.5px] text-slate-300 leading-relaxed font-light mb-6">
              <p>
                Hi, I’m Siddhi Bhavsar, a curious and driven Computer Science and Engineering student passionate about AI/ML, technology, problem-solving, and continuous learning. I am currently pursuing my B.Tech in Computer Science and Engineering at Pimpri Chinchwad University with a CGPA of 9.07.
              </p>
              <p>
                My goal is to build a strong career in AI/ML, gain valuable industry experience, and eventually turn my ideas into a technology-driven startup.
              </p>
            </div>
          </div>

          {/* Essential Info Directly Visible Inside The Card */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Institution:</span>
              </span>
              <span className="text-cyan-300 font-medium">{personalData.college}</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Location:</span>
              </span>
              <span className="text-slate-300 font-medium">{personalData.location}</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
              <span className="text-slate-400">Specialization:</span>
              <div className="flex flex-wrap gap-1 justify-end">
                {personalData.specialization.map((spec) => (
                  <span
                    key={spec}
                    className="text-[10.5px] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* CARD 2: EDUCATION (3 EXACT STACKED ENTRIES) */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800/90 hover:border-indigo-500/40 relative group hud-corner"
        >
          <div>
            {/* Header with circular mortarboard icon - Subtitle removed as requested */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-wide">
                  Education
                </h3>
              </div>
            </div>

            {/* Stacked Education Timeline Cards */}
            <div className="space-y-3.5">
              {educationData.map((edu, index) => {
                const isFirst = index === 0;

                return (
                  <div
                    key={edu.degree}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isFirst
                        ? 'bg-[#090f2b]/90 border-cyan-500/30 shadow-md shadow-cyan-950/30'
                        : 'bg-[#070b20]/80 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-display font-bold text-white leading-snug">
                          {edu.degree}
                        </h4>
                        <p className="text-xs font-medium text-slate-300">
                          {edu.institution}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-slate-300 flex-shrink-0">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        {edu.period}
                      </span>
                    </div>

                    {/* Grade Score Badge: CGPA or Percentage */}
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">Score:</span>
                      <span className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        edu.cgpa
                          ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40'
                          : 'bg-indigo-950/70 text-indigo-300 border border-indigo-500/40'
                      }`}>
                        <Award className="w-3 h-3" />
                        {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 mt-3 text-right">
            <span className="text-[11px] font-mono text-slate-400">
              Verified Academic Records
            </span>
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* CARD 3: HOBBIES (EXACTLY 5 ITEMS) */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800/90 hover:border-pink-500/40 relative group hud-corner md:col-span-2 lg:col-span-1"
        >
          <div>
            {/* Header with circular heart icon - Keep subtitle "Personal Interests" as requested */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                <Heart className="w-5 h-5 fill-pink-500/20" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-wide">
                  Hobbies
                </h3>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  PERSONAL INTERESTS
                </p>
              </div>
            </div>

            {/* Exactly 5 Hobbies with Futuristic Glass Design */}
            <div className="space-y-2.5">
              {hobbiesData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#080d24]/90 border border-slate-800/80 hover:border-cyan-500/35 transition-all group/item"
                >
                  <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex-shrink-0 group-hover/item:scale-110 transition-transform shadow-sm">
                    {hobbyIconMap[item.icon] || <Sparkles className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <span className="text-sm font-medium text-slate-200 group-hover/item:text-white transition-colors">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-3 text-right">
            <span className="text-[11px] font-mono text-slate-400">
              5 Core Passions
            </span>
          </div>
        </motion.div>

      </div>

    </section>
  );
};
