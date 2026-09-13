import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SalesCtaSection({ onOpenQuickLead }) {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#07090e] via-[#0a0f1c] to-[#07090e] border-y border-slate-800">
      {/* Background ambient lighting */}
      <div className="ambient-glow bg-cyan-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-glow-cyan">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Accepting Select Projects in the US & Canada</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Still Running Your Business{' '}
          <span className="gradient-text-cyan">
            Without a Website?
          </span>
        </h2>

        {/* Subheadline & Text */}
        <div className="max-w-2xl mx-auto space-y-3">
          <p className="text-2xl sm:text-3xl font-bold text-slate-200 font-display">
            Let's change that.
          </p>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether you're starting from scratch or replacing an outdated website, I'll build you a modern online presence designed around your business.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenQuickLead}
            className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-glow-cyan transition-all duration-300 hover:scale-105 active:scale-98 text-base group"
          >
            <Sparkles className="w-4 h-4 mr-2 text-slate-950" />
            <span>Start My Website</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#work"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 shadow-lg transition-all duration-300 hover:scale-105 text-base"
          >
            <span>View My Projects</span>
          </a>
        </div>

        {/* Secondary Reassurance Line */}
        <p className="text-xs sm:text-sm text-slate-400 font-medium pt-2">
          No pressure. Just a conversation about what your business needs.
        </p>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Custom Code & Design</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mobile-First Conversion Structure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Direct Communication & Fast Turnaround</span>
          </div>
        </div>

      </div>
    </section>
  );
}
