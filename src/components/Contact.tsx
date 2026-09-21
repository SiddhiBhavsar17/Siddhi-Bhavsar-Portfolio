import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  FileDown, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { personalData } from '../data/personalData';

interface ContactProps {
  onOpenResume?: () => void;
}

// Custom crisp SVGs for HackerRank and LeetCode to ensure immediate recognition
const HackerRankIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0a12 12 0 0 0-1.748.127l.004.053c0 .034-.016.064-.047.078l-3.327 1.48a.105.105 0 0 0-.063.097v3.298c0 .041.025.078.063.095l3.327 1.48c.031.014.047.045.047.079v3.076c0 .043-.025.081-.064.098l-3.326 1.48a.105.105 0 0 0-.063.097v3.297c0 .042.025.08.063.096l3.327 1.48c.031.015.047.045.047.08v3.074c0 .042-.025.08-.064.098l-3.326 1.479a.105.105 0 0 0-.063.097v3.297c0 .043.025.08.063.097l3.327 1.48c.031.013.047.044.047.078v.047A12 12 0 1 0 12 0zm-1.89 4.331 1.89-.841 1.89.841v1.682l-1.89.841-1.89-.841zm0 6.183 1.89-.841 1.89.841v1.682l-1.89.841-1.89-.841zm0 6.183 1.89-.841 1.89.841v1.682l-1.89.841-1.89-.841z" />
  </svg>
);

const LeetCodeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.874 5.874 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.593 5.49 5.49 0 0 0 1.978-.175 5.753 5.753 0 0 0 2.066-1.077l3.053-2.812a1.374 1.374 0 1 0-1.868-2.023l-3.05 2.808a3.003 3.003 0 0 1-1.082.563 2.74 2.74 0 0 1-.989.088 3.19 3.19 0 0 1-2.593-1.932 3.16 3.16 0 0 1-.188-.546 2.793 2.793 0 0 1-.033-1.196 2.83 2.83 0 0 1 .65-1.13l3.858-4.13 5.406-5.787a1.376 1.376 0 0 0-.968-2.32zm2.593 8.857a1.38 1.38 0 0 0-1.377 1.382v.004c0 .762.616 1.38 1.377 1.38h6.544a1.38 1.38 0 0 0 1.38-1.38v-.004a1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // 6 Contact & Social Links in exact order
  const contactLinks = [
    {
      name: "LinkedIn",
      href: personalData.linkedin,
      icon: <Linkedin className="w-6 h-6" />,
      tag: "Professional Profile",
      color: "blue",
      borderHover: "hover:border-blue-500/60 hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]",
      iconBg: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      isAction: false
    },
    {
      name: "GitHub",
      href: personalData.github,
      icon: <Github className="w-6 h-6" />,
      tag: "Code Repositories",
      color: "slate",
      borderHover: "hover:border-slate-400/60 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]",
      iconBg: "bg-slate-800 border-slate-700 text-slate-200",
      isAction: false
    },
    {
      name: "Email",
      href: `mailto:${personalData.email}`,
      icon: copied ? <Check className="w-6 h-6 text-emerald-400" /> : <Mail className="w-6 h-6" />,
      tag: copied ? "Copied to Clipboard!" : "Direct Mail",
      color: "cyan",
      borderHover: "hover:border-cyan-500/60 hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]",
      iconBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
      isAction: true,
      onClick: handleCopyEmail
    },
    {
      name: "Resume",
      href: personalData.resume,
      icon: <FileDown className="w-6 h-6" />,
      tag: "View & Download CV (PDF)",
      color: "purple",
      borderHover: "hover:border-purple-500/60 hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]",
      iconBg: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      isAction: true,
      onClick: (e: React.MouseEvent) => {
        if (onOpenResume) {
          e.preventDefault();
          onOpenResume();
        }
      }
    },
    {
      name: "HackerRank",
      href: personalData.hackerrank || "https://www.hackerrank.com/profile/bhavsarsiddhi14",
      icon: <HackerRankIcon className="w-6 h-6" />,
      tag: "Algorithms & Problem Solving",
      color: "emerald",
      borderHover: "hover:border-emerald-500/60 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]",
      iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      isAction: false
    },
    {
      name: "LeetCode",
      href: personalData.leetcode || "https://leetcode.com/u/bhavsarsiddhi14/",
      icon: <LeetCodeIcon className="w-6 h-6" />,
      tag: "DSA & Coding Practice",
      color: "amber",
      borderHover: "hover:border-amber-500/60 hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]",
      iconBg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      isAction: false
    }
  ];

  return (
    <section id="contact" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background ambient lighting accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Let&apos;s Connect
            </h2>
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
              COLLABORATION • HACKATHONS • RESEARCH INQUIRIES
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>INBOX OPEN</span>
        </div>
      </div>

      {/* Rebalanced 6 Contact Cards Grid (Neat 2x3 or 3x2, perfectly centered) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {contactLinks.map((item, index) => {
          const isButton = item.isAction && item.name === 'Resume';

          const content = (
            <>
              <div className="flex items-center justify-between w-full">
                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                  {item.icon}
                </div>
                <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-slate-700 transition-colors">
                  {item.name === 'Email' ? (
                    <Copy className="w-4 h-4" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </div>
              </div>

              <div className="w-full text-left pt-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                  {item.tag}
                </span>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {item.name}
                </h3>
              </div>
            </>
          );

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="h-full"
            >
              {isButton ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={`w-full h-full p-5 sm:p-6 rounded-2xl bg-[#090e24]/90 border border-slate-800 flex flex-col justify-between items-start gap-4 transition-all duration-300 group shadow-lg hud-corner backdrop-blur-xl ${item.borderHover} cursor-pointer text-left`}
                >
                  {content}
                </button>
              ) : (
                <a
                  href={item.href}
                  target={item.name === 'Email' ? '_self' : '_blank'}
                  rel="noreferrer"
                  onClick={item.onClick}
                  className={`w-full h-full p-5 sm:p-6 rounded-2xl bg-[#090e24]/90 border border-slate-800 flex flex-col justify-between items-start gap-4 transition-all duration-300 group shadow-lg hud-corner backdrop-blur-xl ${item.borderHover} cursor-pointer`}
                >
                  {content}
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Dreams Chalkboard Note: "Same Dreams Bigger Plans ♡" */}
      <div className="mt-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl bg-[#080d22] border-2 border-dashed border-indigo-500/30 p-6 sm:p-7 text-center shadow-xl overflow-hidden group"
        >
          {/* Subtle star glimmers */}
          <div className="absolute top-2 left-3 text-pink-400/40 text-sm select-none">✦</div>
          <div className="absolute bottom-2 right-4 text-cyan-400/40 text-sm select-none">✦</div>
          <div className="absolute top-3 right-6 text-indigo-400/40 text-xs select-none">★</div>
          
          <div>
            <p className="font-handwriting text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 font-bold tracking-wide select-none drop-shadow-[0_0_12px_rgba(244,114,182,0.4)]">
              Same Dreams Bigger Plans ♡
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
};
