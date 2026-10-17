import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Brain, 
  Code2, 
  Layers, 
  Wrench, 
  Database,
  Orbit,
  Maximize2,
  ChevronRight,
  Info,
  CheckCircle2,
  Zap,
  Star
} from 'lucide-react';
import { skillsData, skillCategories } from '../data/skills';
import { Skill } from '../types';

// Coordinates (normalized 0-100%) for the Constellation Map
interface ConstellationNode {
  skill: Skill;
  x: number;
  y: number;
  cluster: string;
  color: string;
  glowColor: string;
  size: number;
}

// Cluster definitions with cosmic colors
const clusterColors: Record<string, { main: string; glow: string; text: string; bg: string }> = {
  "Siddhi's Specialty": {
    main: '#fbbf24', // Amber/Gold
    glow: 'rgba(251, 191, 36, 0.6)',
    text: 'text-amber-300',
    bg: 'bg-amber-500/20'
  },
  "Languages": {
    main: '#38bdf8', // Cyan
    glow: 'rgba(56, 189, 248, 0.6)',
    text: 'text-cyan-300',
    bg: 'bg-cyan-500/20'
  },
  "Development": {
    main: '#c084fc', // Purple
    glow: 'rgba(192, 132, 252, 0.6)',
    text: 'text-purple-300',
    bg: 'bg-purple-500/20'
  },
  "Tools & Platforms": {
    main: '#4ade80', // Emerald
    glow: 'rgba(74, 222, 128, 0.6)',
    text: 'text-emerald-300',
    bg: 'bg-emerald-500/20'
  },
  "Others": {
    main: '#f472b6', // Pink / Data
    glow: 'rgba(244, 114, 182, 0.6)',
    text: 'text-pink-300',
    bg: 'bg-pink-500/20'
  }
};

// Constellation edges linking real skills
const constellationEdges = [
  // AI/ML Core Constellation (Amber)
  ['Machine Learning', 'Deep Learning'],
  ['Machine Learning', 'Generative AI'],
  ['Machine Learning', 'OpenCV'],
  ['Deep Learning', 'NLP'],
  ['Generative AI', 'Python'],
  ['Machine Learning', 'Python'],

  // Languages Constellation (Cyan)
  ['Python', 'C++'],
  ['Python', 'SQL'],
  ['C++', 'C'],
  ['C++', 'Java'],
  ['JavaScript', 'HTML'],
  ['HTML', 'CSS'],
  ['JavaScript', 'React'],

  // Development Constellation (Purple)
  ['Python', 'FastAPI'],
  ['FastAPI', 'Django'],
  ['FastAPI', 'Streamlit'],
  ['React', 'Angular'],
  ['React', 'FastAPI'],

  // Tools Constellation (Emerald)
  ['Git', 'GitHub'],
  ['Git', 'Linux'],
  ['GitHub', 'Agile'],
  ['Jira', 'Agile'],
  ['Figma', 'React'],

  // Data Science Constellation (Pink)
  ['Python', 'NumPy'],
  ['NumPy', 'Pandas'],
  ['Pandas', 'MySQL'],
  ['SQL', 'MySQL'],
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(() => {
    return skillsData.find(s => s.name === 'Machine Learning') || skillsData[0];
  });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'constellation' | 'grid'>('constellation');

  // Curated 2D coordinates for celestial star placement
  const constellationNodes: ConstellationNode[] = useMemo(() => {
    const coordsMap: Record<string, { x: number; y: number }> = {
      // AI/ML Specialty (Center Hub - Amber)
      'Machine Learning': { x: 50, y: 45 },
      'Deep Learning': { x: 44, y: 32 },
      'Generative AI': { x: 57, y: 33 },
      'OpenCV': { x: 40, y: 52 },
      'NLP': { x: 58, y: 50 },

      // Languages (Left & Upper Orbit - Cyan)
      'Python': { x: 50, y: 22 },
      'C++': { x: 33, y: 20 },
      'Java': { x: 22, y: 28 },
      'C': { x: 24, y: 15 },
      'SQL': { x: 36, y: 35 },
      'JavaScript': { x: 20, y: 44 },
      'HTML': { x: 14, y: 55 },
      'CSS': { x: 12, y: 66 },

      // Development (Right & Lower Right - Purple)
      'React': { x: 70, y: 38 },
      'FastAPI': { x: 67, y: 22 },
      'Django': { x: 80, y: 26 },
      'Streamlit': { x: 82, y: 38 },
      'Angular': { x: 84, y: 50 },

      // Tools & Platforms (Lower Center / Left - Emerald)
      'Git': { x: 32, y: 68 },
      'GitHub': { x: 42, y: 74 },
      'Linux': { x: 25, y: 80 },
      'Agile': { x: 52, y: 82 },
      'Jira': { x: 60, y: 88 },
      'Figma': { x: 74, y: 72 },

      // Others / Data (Lower Right - Pink)
      'NumPy': { x: 64, y: 60 },
      'Pandas': { x: 74, y: 60 },
      'MySQL': { x: 50, y: 64 },
    };

    return skillsData.map((skill) => {
      const pos = coordsMap[skill.name] || {
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60
      };
      const colors = clusterColors[skill.category] || clusterColors['Languages'];
      const isCore = skill.category === "Siddhi's Specialty";

      return {
        skill,
        x: pos.x,
        y: pos.y,
        cluster: skill.category,
        color: colors.main,
        glowColor: colors.glow,
        size: isCore ? 14 : skill.highlight ? 10 : 8
      };
    });
  }, []);

  // Filter nodes according to selected category
  const filteredNodes = useMemo(() => {
    if (activeCategory === 'All') return constellationNodes;
    return constellationNodes.filter(n => n.cluster === activeCategory);
  }, [activeCategory, constellationNodes]);

  // Active skill info
  const activeNode = useMemo(() => {
    const currentName = hoveredSkill || (selectedSkill ? selectedSkill.name : null);
    if (!currentName) return null;
    return constellationNodes.find(n => n.skill.name === currentName) || null;
  }, [hoveredSkill, selectedSkill, constellationNodes]);

  // Highlighted edges connected to hovered or selected node
  const activeEdges = useMemo(() => {
    const activeName = hoveredSkill || (selectedSkill ? selectedSkill.name : null);
    if (!activeName) return new Set<string>();

    const connected = new Set<string>();
    const activeCluster = activeCategory !== 'All' ? activeCategory : null;

    constellationEdges.forEach(([from, to]) => {
      if (from === activeName || to === activeName) {
        connected.add(`${from}---${to}`);
        connected.add(`${to}---${from}`);
      }
    });
    return connected;
  }, [hoveredSkill, selectedSkill, activeCategory]);

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Starry Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header with Refined Cosmic Hierarchy */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-5 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI/ML TECHNICAL UNIVERSE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Skills Constellation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide mt-1">
            An interactive celestial star map connecting technical capabilities, AI algorithms, and development toolkits.
          </p>
        </div>

        {/* View Mode Toggle: Interactive Constellation vs Celestial Grid */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-[#080d26] border border-slate-800 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('constellation')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              viewMode === 'constellation'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>Constellation</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-purple-600 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Grid Cards</span>
          </button>
        </div>
      </div>

      {/* Constellation Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {skillCategories.map((cat) => {
          const isActive = activeCategory === cat;
          const colors = clusterColors[cat] || clusterColors['Languages'];
          const isSpecialty = cat === "Siddhi's Specialty";

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                isActive
                  ? isSpecialty
                    ? 'bg-amber-400 text-slate-950 font-bold border border-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.5)]'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                  : 'bg-[#060a1e]/90 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MAIN VIEW: INTERACTIVE CONSTELLATION MAP                                  */}
      {/* ========================================================================= */}
      {viewMode === 'constellation' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Interactive Constellation Visualizer Canvas (8 cols on Desktop) */}
          <div className="lg:col-span-8 relative w-full h-[460px] sm:h-[540px] md:h-[600px] rounded-2xl bg-gradient-to-b from-[#06091d]/95 via-[#030614]/95 to-[#02040d]/95 border border-purple-500/30 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.8)] select-none">
            
            {/* Background Starlight & Grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-amber-400/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-purple-500/10 border-dashed pointer-events-none" />

            {/* SVG Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <linearGradient id="edgeGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="edgeCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {constellationEdges.map(([fromName, toName], idx) => {
                const nodeA = constellationNodes.find(n => n.skill.name === fromName);
                const nodeB = constellationNodes.find(n => n.skill.name === toName);
                if (!nodeA || !nodeB) return null;

                const isEdgeActive = activeEdges.has(`${fromName}---${toName}`);
                const isClusterMatch = activeCategory === 'All' || 
                  (nodeA.cluster === activeCategory && nodeB.cluster === activeCategory);

                return (
                  <line
                    key={`edge-${fromName}-${toName}-${idx}`}
                    x1={`${nodeA.x}%`}
                    y1={`${nodeA.y}%`}
                    x2={`${nodeB.x}%`}
                    y2={`${nodeB.y}%`}
                    stroke={
                      isEdgeActive 
                        ? '#fbbf24' 
                        : isClusterMatch 
                          ? 'rgba(168, 85, 247, 0.35)' 
                          : 'rgba(255, 255, 255, 0.08)'
                    }
                    strokeWidth={isEdgeActive ? '2.5' : isClusterMatch ? '1.2' : '0.6'}
                    strokeDasharray={isEdgeActive ? 'none' : isClusterMatch ? 'none' : '3 6'}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Interactive Celestial Star Nodes */}
            <div className="absolute inset-0 z-20">
              {constellationNodes.map((node) => {
                const isSelected = selectedSkill?.name === node.skill.name;
                const isHovered = hoveredSkill === node.skill.name;
                const isFiltered = activeCategory === 'All' || node.cluster === activeCategory;
                const isCore = node.cluster === "Siddhi's Specialty";

                return (
                  <div
                    key={node.skill.id}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group ${
                      isFiltered ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
                    }`}
                    onClick={() => setSelectedSkill(node.skill)}
                    onMouseEnter={() => setHoveredSkill(node.skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Pulsing halo for active/hovered/core node */}
                    {(isSelected || isHovered || isCore) && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                        style={{
                          backgroundColor: node.color,
                          opacity: isSelected || isHovered ? 0.45 : 0.15,
                          transform: 'scale(2.2)'
                        }}
                      />
                    )}

                    {/* Outer Star Ring */}
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-transform duration-300 ${
                        isSelected || isHovered ? 'scale-125' : 'group-hover:scale-110'
                      }`}
                      style={{
                        width: `${node.size * 2.2}px`,
                        height: `${node.size * 2.2}px`,
                        backgroundColor: '#030614',
                        border: `2px solid ${isSelected || isHovered ? '#ffffff' : node.color}`,
                        boxShadow: isSelected || isHovered
                          ? `0 0 25px ${node.color}, inset 0 0 8px ${node.color}`
                          : `0 0 10px ${node.glowColor}`
                      }}
                    >
                      {/* Inner glowing celestial core */}
                      <div
                        className="rounded-full"
                        style={{
                          width: `${node.size}px`,
                          height: `${node.size}px`,
                          backgroundColor: node.color
                        }}
                      />
                    </div>

                    {/* Star Label */}
                    <span
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono tracking-wider whitespace-nowrap pointer-events-none transition-all ${
                        isSelected || isHovered
                          ? 'bg-slate-950/95 text-amber-300 border border-amber-400 font-bold shadow-lg z-30 scale-105'
                          : isCore
                            ? 'bg-[#080d26]/85 text-amber-200/90 border border-amber-500/30'
                            : 'bg-[#080d26]/75 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {node.skill.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Constellation Legend */}
            <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-950/85 border border-slate-800 backdrop-blur-md text-[10px] font-mono text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>AI/ML Core</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Languages</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Dev</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Tools</span>
                </span>
              </div>

              <div className="text-[10px] font-mono text-slate-400 bg-slate-950/85 px-3 py-1.5 rounded-full border border-slate-800">
                Click any star to inspect node
              </div>
            </div>
          </div>

          {/* Celestial Inspector HUD Panel (4 cols on Desktop) */}
          <div className="lg:col-span-4 space-y-4">
            {activeNode ? (
              <motion.div
                key={activeNode.skill.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl p-6 bg-gradient-to-b from-[#0c0d2e]/95 via-[#080c24]/95 to-[#040614]/95 border border-amber-400/40 shadow-[0_8px_30px_rgba(251,191,36,0.15)] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>STAR NODE INSPECTOR</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                    {activeNode.cluster}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border"
                      style={{
                        backgroundColor: '#0a0f2e',
                        borderColor: activeNode.color,
                        boxShadow: `0 0 20px ${activeNode.glowColor}`
                      }}
                    >
                      <Brain className="w-6 h-6" style={{ color: activeNode.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-extrabold text-white tracking-wide">
                        {activeNode.skill.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-400">
                        {activeNode.skill.highlight ? '✦ Flagship Core Skill' : '✦ Core Proficiency'}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {activeNode.skill.description}
                  </p>

                  {/* Connected Constellation Neighbors */}
                  <div className="pt-3 border-t border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-medium">
                      Connected Constellation Stars:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {constellationEdges
                        .filter(([a, b]) => a === activeNode.skill.name || b === activeNode.skill.name)
                        .map(([a, b]) => {
                          const neighborName = a === activeNode.skill.name ? b : a;
                          return (
                            <button
                              key={neighborName}
                              type="button"
                              onClick={() => {
                                const target = skillsData.find(s => s.name === neighborName);
                                if (target) setSelectedSkill(target);
                              }}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#0e163d] hover:bg-amber-400/20 text-slate-200 hover:text-amber-300 border border-slate-700 hover:border-amber-400/50 transition-all cursor-pointer flex items-center gap-1"
                            >
                              <span>{neighborName}</span>
                              <ChevronRight className="w-3 h-3 text-slate-500" />
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* Related Projects Anchor */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Featured in Project:</span>
                    <a
                      href="#projects"
                      className="text-xs font-mono font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1"
                    >
                      <span>Journey Bhai</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {/* Quick Constellation Metrics Card */}
            <div className="rounded-2xl p-5 bg-[#070a1e]/80 border border-slate-800 text-xs font-mono space-y-2.5">
              <div className="flex items-center justify-between text-slate-400">
                <span>Total Cataloged Skills:</span>
                <span className="text-white font-bold">{skillsData.length} Skills</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Specialty Focus:</span>
                <span className="text-amber-300 font-bold">AI/ML & GenAI</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Constellation Links:</span>
                <span className="text-cyan-300 font-bold">{constellationEdges.length} Pathways</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* ALTERNATIVE VIEW: CELESTIAL GRID CARDS                                    */
        /* ========================================================================= */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {filteredNodes.map((node) => {
            const isCore = node.cluster === "Siddhi's Specialty";
            return (
              <div
                key={node.skill.id}
                onClick={() => {
                  setSelectedSkill(node.skill);
                  setViewMode('constellation');
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isCore
                    ? 'bg-gradient-to-b from-[#14123d] to-[#070b24] border-amber-400/50 hover:border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                    : 'bg-[#080d26]/80 border-slate-800 hover:border-purple-400/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: node.color }}
                    />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      {node.cluster.replace("Siddhi's ", '')}
                    </span>
                  </div>
                  <h4 className="text-sm font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                    {node.skill.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {node.skill.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Inspect Star</span>
                  <ChevronRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
