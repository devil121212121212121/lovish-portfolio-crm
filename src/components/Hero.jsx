import React, { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, ShieldCheck, Zap, Smartphone, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/projects';

export default function Hero({ onOpenQuickLead, onSelectProject }) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const showcaseProjects = PROJECTS.slice(0, 4);
  const currentProject = showcaseProjects[activeProjectIdx];

  // Auto rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProjectIdx((prev) => (prev + 1) % showcaseProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [showcaseProjects.length]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow bg-cyan-500 -top-32 -left-32 opacity-20" />
      <div className="ambient-glow bg-blue-600 top-1/3 -right-32 opacity-15" />
      <div className="ambient-glow bg-indigo-500 -bottom-32 left-1/4 opacity-10" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Personal Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-inner backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-300 tracking-wide">
                Lovish Garg • Creative Developer & UX Strategist
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              Websites That Make Local Businesses Look{' '}
              <span className="gradient-text-cyan">
                Impossible to Ignore.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
              I design and build premium, conversion-focused websites for businesses in the US, Canada, and worldwide that are ready to turn online visitors into real paying customers.
            </p>

            {/* Value Callouts */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero Generic Templates</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Engineered for Phone Calls & Quotes</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct Access to Lovish</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#work"
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-slate-900 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-glow-cyan transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base group"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={onOpenQuickLead}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base group"
              >
                <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
                <span>Let's Build Your Website</span>
              </button>
            </div>

            {/* Reassurance Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Boutique Quality • Direct Developer Access</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Fast 10-14 Day Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Rotating Browser Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-slate-700/50 via-slate-800/20 to-slate-900/80 shadow-2xl border border-slate-700/60 backdrop-blur-xl">
              
              {/* Browser Header */}
              <div className="bg-[#0b0e14] px-4 py-3 rounded-t-xl flex items-center justify-between border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex-1 mx-3 bg-[#131824] px-3 py-1 rounded-md text-[11px] font-mono text-slate-400 flex items-center justify-between truncate border border-slate-800/60">
                  <span className="truncate text-cyan-300">
                    {currentProject.url.replace('https://', '')}
                  </span>
                  <a
                    href={currentProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyan-400 ml-2"
                    title="Open live site"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>

              {/* Tabs */}
              <div className="bg-[#0e121a] px-3 py-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {showcaseProjects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                      activeProjectIdx === idx
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    {proj.title}
                  </button>
                ))}
              </div>

              {/* Preview Window */}
              <div className="relative bg-[#07090e] p-5 sm:p-6 rounded-b-xl overflow-hidden min-h-[360px] flex flex-col justify-between">
                <div className={`absolute inset-0 bg-gradient-to-br ${currentProject.heroGradient} opacity-30 pointer-events-none transition-all duration-700`} />

                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {currentProject.industry}
                    </span>
                    <span 
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: `${currentProject.accentColor}20`, color: currentProject.accentColor }}
                    >
                      {currentProject.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {currentProject.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {currentProject.shortDescription}
                  </p>
                </div>

                <div className="relative z-10 my-4 grid grid-cols-3 gap-2">
                  {currentProject.stats.map((st, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-left">
                      <div className="text-[10px] text-slate-400">{st.label}</div>
                      <div className="text-xs font-bold text-slate-200 mt-0.5 truncate">{st.value}</div>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectProject(currentProject)}
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 group/btn"
                  >
                    <span>Read Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>

                  <a
                    href={currentProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-105"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

            {/* Micro badges */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 shadow-2xl backdrop-blur-md items-center gap-3 animate-float">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                ⚡
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-white">99/100 Speed Score</div>
                <div className="text-[10px] text-slate-400">Google Core Web Vitals</div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -top-5 -right-4 bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 shadow-2xl backdrop-blur-md items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-white">100% Mobile Ready</div>
                <div className="text-[10px] text-slate-400">Touch & Call Optimized</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
