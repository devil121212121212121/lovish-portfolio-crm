import React from 'react';
import { 
  Building2, Target, ShoppingBag, CalendarCheck, Zap, Stethoscope, 
  Wrench, UtensilsCrossed, GraduationCap, Flame, Briefcase, LayoutDashboard,
  CheckCircle2, ArrowRight, Layers
} from 'lucide-react';
import { SERVICES } from '../data/services';

const iconMap = {
  Building2,
  Target,
  ShoppingBag,
  CalendarCheck,
  Zap,
  Stethoscope,
  Wrench,
  UtensilsCrossed,
  GraduationCap,
  Flame,
  Briefcase,
  LayoutDashboard
};

export default function ServicesSection({ onOpenQuickLead }) {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="ambient-glow bg-blue-500/10 -top-32 right-10" />
      <div className="ambient-glow bg-emerald-500/10 bottom-10 left-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>High-Value Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Whatever Your Business Needs,{' '}
            <span className="gradient-text-cyan">
              We Can Build It.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every build is 100% custom-coded to your industry specifications, customer expectations, and sales workflow.
          </p>
        </div>

        {/* 12 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => {
            const Icon = iconMap[srv.icon] || Building2;
            return (
              <div
                key={srv.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#0d121c] border border-slate-800/80 hover:border-slate-700/80 shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Deliverables:
                  </div>
                  {srv.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenQuickLead}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:border-cyan-500/50 shadow-lg transition-all hover:scale-105"
          >
            <span>Have a Specific Use Case in Mind? Inquire Now</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

      </div>
    </section>
  );
}
