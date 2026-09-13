import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Target, Lightbulb, Sparkles, ArrowRight } from 'lucide-react';

export default function CaseStudyModal({ project, onClose, onOpenQuickLead }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0c1018] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-left space-y-8 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Information */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full">
              {project.industry}
            </span>
            <span className="text-xs font-semibold text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-base text-slate-300">
            {project.shortDescription}
          </p>
        </div>

        {/* Live Website Preview Banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400">Deployed Production URL</div>
            <div className="text-sm font-mono text-cyan-400 font-medium truncate">
              {project.url}
            </div>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-105 shrink-0"
          >
            <span>Visit Live Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Business Goal */}
          <div className="p-5 rounded-xl bg-[#111724] border border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Business Goal</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.businessGoal}
            </p>
          </div>

          {/* Design Approach */}
          <div className="p-5 rounded-xl bg-[#111724] border border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Design Approach</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.designApproach}
            </p>
          </div>

        </div>

        {/* Key Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Key Business & Conversion Features</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-sm text-slate-300 flex items-start gap-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Strategy */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-slate-900 border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Conversion Strategy Breakdown</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {project.conversionStrategy}
          </p>
        </div>

        {/* Modal Footer CTAs */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors"
          >
            <span>Open Website in New Tab</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenQuickLead();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <span>I Want a Website Like This</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
