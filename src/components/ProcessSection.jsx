import React from 'react';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/process';

export default function ProcessSection({ onOpenQuickLead }) {
  return (
    <section id="process" className="py-24 relative bg-[#090d15] border-y border-slate-800/80 overflow-hidden">
      {/* Glows */}
      <div className="ambient-glow bg-cyan-500/10 top-1/3 -left-32" />
      <div className="ambient-glow bg-indigo-500/10 bottom-1/3 -right-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Clear & Predictable Delivery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Simple Process.{' '}
            <span className="gradient-text-cyan">
              Serious Results.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            No endless meetings, no technical confusion, and no surprise costs. Just a streamlined, proven 4-stage sprint from concept to live revenue engine.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="p-7 rounded-2xl bg-[#0d121c] border border-slate-800/90 hover:border-slate-700 shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group relative"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display font-black text-4xl text-slate-700 group-hover:text-cyan-400 transition-colors">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                    {step.phase}
                  </span>
                </div>

                {/* Title & Summary */}
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-cyan-400/90 mb-3">
                  {step.summary}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {step.detail}
                </p>
              </div>

              {/* Deliverables */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  What You Receive:
                </div>
                {step.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenQuickLead}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-glow-cyan transition-all hover:scale-105"
          >
            <span>Let's Discuss Your Project Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
