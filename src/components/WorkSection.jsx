import React, { useState } from 'react';
import { ExternalLink, Layers, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../data/projects';

export default function WorkSection({ onSelectProject }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredProjects = selectedCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categories.includes(selectedCategory));

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow bg-cyan-500/10 top-1/4 -left-40" />
      <div className="ambient-glow bg-purple-500/10 bottom-1/4 -right-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Client Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Real Websites. Real{' '}
            <span className="gradient-text-cyan">
              Business Use Cases.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            I don't build websites just to look good. I build websites designed around the business, its customers, and its goals.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-14">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 uppercase tracking-wider ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-glow-cyan scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-[#0d121c] border border-slate-800/80 hover:border-slate-700/80 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col group"
            >
              {/* Browser Window Device Mockup Header */}
              <div className="bg-[#121824] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
                  {project.url.replace('https://', '')}
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                  LIVE
                </span>
              </div>

              {/* Card Preview Visual Area */}
              <div className={`relative p-6 bg-gradient-to-br ${project.heroGradient} min-h-[220px] flex flex-col justify-between overflow-hidden`}>
                
                {/* Visual subtle accents */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm">
                    {project.industry}
                  </span>
                  <span 
                    className="text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
                    style={{ backgroundColor: `${project.accentColor}25`, color: project.accentColor }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Center Title & Tagline in Mockup */}
                <div className="my-4 space-y-1">
                  <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {project.tagline}
                  </p>
                </div>

                {/* Key feature pills preview */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.keyFeatures.slice(0, 2).map((feat, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded border border-slate-800/80 truncate max-w-[200px]">
                      ✓ {feat}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Body Information */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-[#0a0e17]">
                
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors py-2 flex items-center gap-1 group/study"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/study:translate-x-0.5 group-hover/study:-translate-y-0.5" />
                  </button>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-bold text-xs border border-cyan-500/30 transition-all duration-200"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
