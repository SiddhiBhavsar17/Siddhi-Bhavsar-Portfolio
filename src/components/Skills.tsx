import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Database,
  Brain,
  Zap,
  Sparkles,
  Layers,
  Terminal,
  FileCode,
  Flame,
  GitBranch,
  Github,
  Trello,
  Workflow,
  Atom,
  Binary,
  Cpu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { skillsData, skillCategories, prioritySkillNames } from '../data/skills';

// Color themes for the neon cards across Cyan, Blue, Purple, Pink, Magenta
const neonBorderStyles: Record<string, {
  border: string;
  glow: string;
  badge: string;
}> = {
  Cyan: {
    border: 'border-cyan-500/40 hover:border-cyan-400',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.18)] hover:shadow-[0_0_22px_rgba(6,182,212,0.35)]',
    badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
  },
  Blue: {
    border: 'border-blue-500/40 hover:border-blue-400',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.18)] hover:shadow-[0_0_22px_rgba(59,130,246,0.35)]',
    badge: 'bg-blue-950/60 text-blue-300 border-blue-500/30'
  },
  Purple: {
    border: 'border-purple-500/40 hover:border-purple-400',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.18)] hover:shadow-[0_0_22px_rgba(168,85,247,0.35)]',
    badge: 'bg-purple-950/60 text-purple-300 border-purple-500/30'
  },
  Pink: {
    border: 'border-pink-500/40 hover:border-pink-400',
    glow: 'shadow-[0_0_15px_rgba(236,72,153,0.18)] hover:shadow-[0_0_22px_rgba(236,72,153,0.35)]',
    badge: 'bg-pink-950/60 text-pink-300 border-pink-500/30'
  },
  Magenta: {
    border: 'border-fuchsia-500/40 hover:border-fuchsia-400',
    glow: 'shadow-[0_0_15px_rgba(217,70,239,0.18)] hover:shadow-[0_0_22px_rgba(217,70,239,0.35)]',
    badge: 'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-500/30'
  }
};

const colorPalette = ['Cyan', 'Blue', 'Purple', 'Pink', 'Magenta'] as const;

// Recognizable technology SVG icons & standard tech visuals
const renderSkillIcon = (name: string) => {
  switch (name) {
    case 'Python':
      return (
        <svg className="w-5 h-5" viewBox="0 0 110 110" fill="none">
          <path
            d="M54.5 9.5C28.2 9.5 29.8 20.9 29.8 20.9L29.9 32.7H55.4V36.3H19.7C19.7 36.3 9.5 35.1 9.5 61.4C9.5 87.7 18.5 86.6 18.5 86.6H27.9V73.4C27.9 73.4 27.4 57.5 43.6 57.5H68.8C68.8 57.5 83.1 57.8 83.1 43.9V22.7C83.1 22.7 85.3 9.5 54.5 9.5ZM37.8 19.3C40.6 19.3 42.9 21.6 42.9 24.4C42.9 27.2 40.6 29.5 37.8 29.5C35 29.5 32.7 27.2 32.7 24.4C32.7 21.6 35 19.3 37.8 19.3Z"
            fill="#3776AB"
          />
          <path
            d="M55.5 100.5C81.8 100.5 80.2 89.1 80.2 89.1L80.1 77.3H54.6V73.7H90.3C90.3 73.7 100.5 74.9 100.5 48.6C100.5 22.3 91.5 23.4 91.5 23.4H82.1V36.6C82.1 36.6 82.6 52.5 66.4 52.5H41.2C41.2 52.5 26.9 52.2 26.9 66.1V87.3C26.9 87.3 24.7 100.5 55.5 100.5ZM72.2 90.7C69.4 90.7 67.1 88.4 67.1 85.6C67.1 82.8 69.4 80.5 72.2 80.5C75 80.5 77.3 82.8 77.3 85.6C77.3 88.4 75 90.7 72.2 90.7Z"
            fill="#FFD43B"
          />
        </svg>
      );
    case 'Java':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#EA2D2E" d="M8.86 16.38c-.37-.02-.73.01-1.07.08-1.57.32-2.14 1.55-.77 2.22 3.1 1.52 7.74.84 9.17-.45.47-.42.27-.85-.35-1.08-1.74-.65-4.88-.73-6.98-.77zm-1.84-2.85c-.32 0-.62.03-.9.08-1.72.33-2.02 1.43-.8 2.06 2.82 1.46 7.42 1.13 9.4-.19.64-.43.43-.87-.24-1.12-1.73-.65-5.26-.81-7.46-.83zm7.04-4.89c.35 1.13-.37 2.08-1.55 2.76.99-.44 1.94-.38 2.25.32.4 1.12-.55 2.5-2.22 3.29 2.54-.7 3.52-2.23 2.84-3.69-.5-1.08-1.82-1.63-1.32-2.68zm-4.32-.4c-.58 1.48-1.89 2.45-3.62 3.15 2.68-.61 4.74-1.77 5.24-3.32.32-1.01-.19-2.18-.89-3.23.08.97-.28 2.24-.73 3.4zM4.1 19.38c2.89.8 8.04.81 11.23.16 1.05-.21 1.76-.52 1.83-.86.06-.3-.39-.59-1.22-.8-.74-.19-1.8-.29-3.05-.3-4.14-.04-8.81.77-8.79 1.8z" />
        </svg>
      );
    case 'C':
      return (
        <span className="font-mono font-black text-sm text-cyan-400 bg-cyan-950/60 px-1 rounded border border-cyan-500/40">
          C
        </span>
      );
    case 'C++':
      return (
        <span className="font-mono font-black text-xs text-blue-400 bg-blue-950/60 px-1 rounded border border-blue-500/40">
          C++
        </span>
      );
    case 'SQL':
      return <Database className="w-5 h-5 text-amber-400" />;
    case 'HTML':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.59-2.438L1.5 0zm17.09 4.413H5.41l.36 4.09h11.45l-.41 4.542-4.84 1.343-4.84-1.343-.27-3.09H2.81l.52 5.92 8.64 2.4 8.64-2.4 1.18-13.462z" />
        </svg>
      );
    case 'CSS':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.59-2.438L1.5 0zm17.09 4.413H5.41l.36 4.09h11.45l-.41 4.542-4.84 1.343-4.84-1.343-.27-3.09H2.81l.52 5.92 8.64 2.4 8.64-2.4 1.18-13.462z" />
        </svg>
      );
    case 'JavaScript':
      return (
        <span className="font-mono font-black text-xs text-amber-300 bg-amber-950/80 px-1 rounded border border-amber-500/50">
          JS
        </span>
      );

    // Siddhi's Specialty
    case 'Machine Learning':
      return <Brain className="w-5 h-5 text-purple-400" />;
    case 'Deep Learning':
      return <Binary className="w-5 h-5 text-pink-400" />;
    case 'Generative AI':
      return <Sparkles className="w-5 h-5 text-cyan-300" />;
    case 'OpenCV':
      return <Cpu className="w-5 h-5 text-emerald-400" />;
    case 'NLP':
      return <Workflow className="w-5 h-5 text-fuchsia-400" />;

    // Development
    case 'React':
      return <Atom className="w-5 h-5 text-cyan-400 animate-[spin_10s_linear_infinite]" />;
    case 'Angular':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#DD0031" d="M12 2.5L2.6 5.8l1.4 12.3 8 4.4 8-4.4 1.4-12.3L12 2.5zm0 2.8l6.3 2.2-1 8.8-5.3 2.9-5.3-2.9-1-8.8 6.3-2.2zm0 3.2L8.2 16h1.9l.8-2h4.2l.8 2h1.9L12 8.5zm-1.1 4.1l1.1-2.8 1.1 2.8h-2.2z" />
        </svg>
      );
    case 'Django':
      return <FileCode className="w-5 h-5 text-emerald-400" />;
    case 'FastAPI':
      return <Zap className="w-5 h-5 text-teal-300" />;
    case 'Streamlit':
      return <Flame className="w-5 h-5 text-red-400" />;

    // Tools & Platforms
    case 'Git':
      return <GitBranch className="w-5 h-5 text-orange-400" />;
    case 'GitHub':
      return <Github className="w-5 h-5 text-slate-200" />;
    case 'Linux':
      return <Terminal className="w-5 h-5 text-amber-300" />;
    case 'Figma':
      return <Layers className="w-5 h-5 text-violet-400" />;
    case 'Jira':
      return <Trello className="w-5 h-5 text-blue-400" />;
    case 'Agile':
      return <Workflow className="w-5 h-5 text-cyan-400" />;

    // Others
    case 'MySQL':
      return <Database className="w-5 h-5 text-blue-400" />;
    case 'NumPy':
      return (
        <span className="font-mono font-bold text-xs text-indigo-300 bg-indigo-950/60 px-1 rounded border border-indigo-500/40">
          NP
        </span>
      );
    case 'Pandas':
      return (
        <span className="font-mono font-bold text-xs text-rose-300 bg-rose-950/60 px-1 rounded border border-rose-500/40">
          PD
        </span>
      );

    default:
      return <Cpu className="w-5 h-5 text-cyan-400" />;
  }
};

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Filter skills by selected category
  const categorySkills = activeTab === 'All' 
    ? skillsData 
    : skillsData.filter((s) => s.category === activeTab);

  // When in 'All' category and collapsed, show only the curated 10 priority skills
  // In specific categories, if there are more than 8, respect expansion as well
  const displayedSkills = isExpanded
    ? categorySkills
    : activeTab === 'All'
      ? categorySkills.filter((s) => prioritySkillNames.includes(s.name))
      : categorySkills;

  const hasMoreToToggle = activeTab === 'All' && categorySkills.length > displayedSkills.length;

  return (
    <section id="skills" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header with Gear icon - Clean focus on Skills & Category filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Skills
            </h2>
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
              LANGUAGES • SIDDHI&apos;S SPECIALTY • DEVELOPMENT • TOOLS
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {skillCategories.map((cat) => {
            const isActive = activeTab === cat;
            const isSpecialty = cat === "Siddhi's Specialty";

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveTab(cat);
                  // Keep state predictable when switching categories
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? isSpecialty
                      ? 'bg-purple-500/25 text-purple-200 border border-purple-400/70 shadow-[0_0_15px_rgba(168,85,247,0.35)] font-semibold'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(56,189,248,0.25)] font-semibold'
                    : 'bg-[#090e24]/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        Expanded Full-Width Responsive Grid:
        - Desktop: 5-6 columns
        - Tablet / Medium: 3-4 columns
        - Mobile: 2 columns
      */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
      >
        <AnimatePresence>
          {displayedSkills.map((skill, index) => {
            // Assign cycling neon theme from the futuristic palette
            const themeKey = colorPalette[index % colorPalette.length];
            const theme = neonBorderStyles[themeKey];

            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                className={`group relative p-4 rounded-2xl bg-[#080d24]/90 backdrop-blur-sm border transition-all duration-300 flex flex-col justify-between cursor-default ${theme.border} ${theme.glow}`}
              >
                {/* Gentle Pulsing Neon Border Layer */}
                <motion.div
                  animate={{ opacity: [0.35, 0.7, 0.35] }}
                  transition={{ 
                    duration: 3.5 + (index % 3), 
                    repeat: Infinity, 
                    ease: 'easeInOut',
                    delay: (index % 5) * 0.4
                  }}
                  className="absolute -inset-[1px] rounded-2xl pointer-events-none -z-10 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-sm"
                />

                {/* Card Top: Skill Icon and Ambient Halo */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all shadow-inner">
                    {renderSkillIcon(skill.name)}
                  </div>

                  {/* Subtle category dot indicator */}
                  <span className="w-2 h-2 rounded-full bg-cyan-400/60 group-hover:bg-cyan-300 transition-colors" />
                </div>

                {/* Card Content: Skill Name & Category Label */}
                <div className="space-y-1 mt-1">
                  <h4 className="text-sm font-display font-bold text-white tracking-wide truncate group-hover:text-cyan-200 transition-colors">
                    {skill.name}
                  </h4>
                  <span className={`inline-block text-[10.5px] font-mono px-2 py-0.5 rounded-md border truncate max-w-full ${theme.badge}`}>
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Prominent "See More Skills" / "Show Less" Button */}
      {(hasMoreToToggle || isExpanded) && (
        <motion.div 
          layout
          className="mt-8 flex flex-col items-center justify-center"
        >
          <button
            type="button"
            id="toggle-more-skills-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl font-display font-semibold text-xs sm:text-sm tracking-wider text-white bg-gradient-to-r from-cyan-950/90 via-indigo-950/90 to-purple-950/90 hover:from-cyan-900/90 hover:to-purple-900/90 border border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.25)] hover:shadow-[0_0_26px_rgba(6,182,212,0.45)] active:scale-95 transition-all"
          >
            <span>{isExpanded ? "Show Less" : "See More Skills"}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-cyan-300 group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 text-cyan-300 group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </motion.div>
      )}

    </section>
  );
};
