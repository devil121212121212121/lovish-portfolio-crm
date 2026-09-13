import React from 'react';
import { User, Palette, Code2, Sparkles, TrendingUp, Briefcase, Mail, MessageSquare } from 'lucide-react';

export default function AboutSection() {
  const disciplines = [
    {
      icon: Palette,
      title: 'Design & Visual Identity',
      desc: 'Sophisticated aesthetics, refined typography, and purposeful layouts that make local businesses look like dominant brands.'
    },
    {
      icon: Code2,
      title: 'Creative Engineering',
      desc: 'Clean, modern, lightweight code that loads sub-second on mobile phones with zero unnecessary framework bulk.'
    },
    {
      icon: Sparkles,
      title: 'User Experience (UX)',
      desc: 'Frictionless customer journeys where visitors instinctively know what you offer, why to trust you, and how to book.'
    },
    {
      icon: TrendingUp,
      title: 'Conversion Strategy',
      desc: 'Psychological triggers, clear value framing, and strategic inquiry placement engineered to generate real phone calls and quotes.'
    },
    {
      icon: Briefcase,
      title: 'Business-First Thinking',
      desc: 'Every website is treated as an investment with an ROI outcome — not just a pretty design exercise.'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="ambient-glow bg-cyan-500/10 top-1/2 -right-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>Behind The Websites</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Hi, I'm Lovish Garg —{' '}
            <span className="gradient-text-cyan">
              Creative Developer & Designer.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            I help businesses turn their online presence into an authoritative, customer-attracting brand. No middlemen, no bloated agency retainers — just high-performance digital craftsmanship.
          </p>
        </div>

        {/* 5 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {disciplines.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0d121c] border border-slate-800 hover:border-slate-700 shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Statement with Direct Contact Links */}
        <div className="mt-14 max-w-4xl mx-auto p-7 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d1525] to-slate-900 border border-cyan-500/30 shadow-glow-cyan">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-2xl shrink-0 shadow-lg">
              LG
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Direct Partnership with Lovish Garg
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you hire me, you collaborate directly with the person strategizing, designing, and coding your site from start to finish. Ready to talk about your project? Contact me directly anytime.
              </p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-semibold">
                <a
                  href="mailto:garglovish938@gmail.com"
                  className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>garglovish938@gmail.com</span>
                </a>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <a
                  href="https://wa.me/919350641477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: +91 9350641477</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
