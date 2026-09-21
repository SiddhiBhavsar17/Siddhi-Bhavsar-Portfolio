import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Image as ImageIcon, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Project, ProjectMediaItem } from '../types';

interface ProjectMediaModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectMediaModal: React.FC<ProjectMediaModalProps> = ({ project, onClose }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Reset active index whenever the selected project changes
  useEffect(() => {
    setActiveMediaIndex(0);
  }, [project?.id]);

  // Support closing with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  // Build items array from project.mediaGallery or generate graceful preview item
  const mediaItems: ProjectMediaItem[] = (project.mediaGallery && project.mediaGallery.length > 0)
    ? project.mediaGallery
    : [
        {
          id: `${project.id}-default-img`,
          type: 'image',
          title: `${project.name} Visual`,
          url: project.image,
          caption: project.description
        }
      ];

  const currentMedia = mediaItems[activeMediaIndex] || mediaItems[0];
  const hasMultiple = mediaItems.length > 1;

  const handlePrev = () => {
    setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  };

  const handleNext = () => {
    setActiveMediaIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
  };

  const isConcept = project.visualType === 'concept';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
        {/* Backdrop click to dismiss */}
        <div 
          className="absolute inset-0" 
          onClick={onClose} 
          aria-label="Close modal overlay"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl bg-[#080d24] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.25)] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-[#060a1c] sticky top-0 z-20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 flex-shrink-0">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold truncate">
                    {project.category}
                  </span>
                  {hasMultiple && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {activeMediaIndex + 1} of {mediaItems.length}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-base sm:text-xl font-display font-bold text-white tracking-wide truncate">
                  {project.name}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/80 ml-3 flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Stage Area (High-Resolution Preview) */}
          <div className="relative flex-1 bg-[#030614] flex items-center justify-center min-h-[280px] sm:min-h-[380px] p-4 sm:p-6 overflow-hidden">
            {currentMedia.type === 'video' ? (
              <video
                src={currentMedia.url}
                controls
                className="max-h-[55vh] w-auto max-w-full rounded-xl border border-slate-800 shadow-2xl object-contain"
                poster={currentMedia.thumbnail}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="relative group max-h-[58vh] flex items-center justify-center">
                <img
                  src={currentMedia.url}
                  alt={currentMedia.title}
                  className="max-h-[55vh] w-auto max-w-full rounded-xl border border-slate-800/90 shadow-2xl object-contain bg-[#030614]"
                />
              </div>
            )}

            {/* Carousel Previous / Next Controls */}
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/90 hover:bg-cyan-950 text-white border border-slate-700 hover:border-cyan-500/60 shadow-lg transition-all z-10"
                  aria-label="Previous visual"
                >
                  <ChevronLeft className="w-5 h-5 text-cyan-300" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/90 hover:bg-cyan-950 text-white border border-slate-700 hover:border-cyan-500/60 shadow-lg transition-all z-10"
                  aria-label="Next visual"
                >
                  <ChevronRight className="w-5 h-5 text-cyan-300" />
                </button>
              </>
            )}
          </div>

          {/* Caption & Metadata Footer */}
          <div className="px-5 py-4 bg-[#060a1c] border-t border-slate-800/90">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  {currentMedia.title}
                </h4>
                {currentMedia.caption && (
                  <p className="text-xs text-slate-300 font-light mt-0.5 leading-relaxed max-w-2xl">
                    {currentMedia.caption}
                  </p>
                )}
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-lg flex-shrink-0 self-start sm:self-auto border bg-slate-900/80">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {isConcept ? (
                  <span className="text-slate-300">Project Concept Visual</span>
                ) : (
                  <span className="text-cyan-300">Official Project Asset</span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip (if multiple media items exist) */}
            {hasMultiple && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800/60 overflow-x-auto pb-1">
                {mediaItems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border flex-shrink-0 transition-all ${
                      activeMediaIndex === idx 
                        ? 'border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] scale-105' 
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
