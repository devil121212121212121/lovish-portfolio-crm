import React from 'react';
import { Moon, Clock, ShieldCheck, UserCheck, HelpCircle, Eye, Calendar, Search, Sparkles, ArrowRight } from 'lucide-react';

export default function ValuePropSection({ onOpenQuickLead }) {
  const benefits = [
    {
      icon: Clock,
      title: 'Explain Your Services 24/7',
      desc: 'Prospective clients can learn about your packages, deliverables, and process at 11 PM on a Sunday without you lifting a finger.'
    },
    {
      icon: ShieldCheck,
      title: 'Build Instant Trust Before First Call',
      desc: 'High-definition aesthetics, clear licensing details, and case studies validate your authority before you ever speak.'
    },
    {
      icon: UserCheck,
      title: 'Capture High-Intent Leads',
      desc: 'Structured intake forms collect contact details, project scope, and timeline so you only speak with ready-to-buy prospects.'
    },
    {
      icon: HelpCircle,
      title: 'Answer Common Questions Upfront',
      desc: 'Save dozens of hours each month by answering pricing FAQs, service radii, and turnaround times directly on the page.'
    },
    {
      icon: Eye,
      title: 'Showcase Real Proof & Transformations',
      desc: 'Put your best transformations, before/after shots, and client results on display in an organized, beautiful portfolio.'
    },
    {
      icon: Calendar,
      title: 'Make Booking Frictionless',
      desc: 'Allow parents, patients, or clients to schedule intro calls, estimates, and appointments in 30 seconds from their phones.'
    },
    {
      icon: Search,
      title: 'Help High-Intent Searchers Find You',
      desc: 'Capture local Google searchers looking for services in your city rather than surrendering them to competitors.'
    },
    {
      icon: Sparkles,
      title: 'Look Established & High-End',
      desc: 'A bespoke boutique website commands higher prices and allows you to charge what your services are truly worth.'
    }
  ];

  return (
    <section className="py-24 relative bg-[#090d15] border-y border-slate-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow bg-cyan-500/10 -top-32 left-1/4" />
      <div className="ambient-glow bg-blue-600/10 -bottom-32 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Moon className="w-3.5 h-3.5" />
            <span>24/7 Revenue Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Your Website Should Work{' '}
            <span className="gradient-text-cyan">
              While You Sleep.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Your website isn't an expense or a digital business card. When designed strategically, it is your hardest-working salesperson that never takes a day off.
          </p>
        </div>

        {/* 8 Value Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0d121c] border border-slate-800/80 hover:border-slate-700 shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Big CTA Banner */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenQuickLead}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-extrabold text-base shadow-glow-cyan transition-all hover:scale-105 active:scale-98"
          >
            <span>Get My Business Online</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
