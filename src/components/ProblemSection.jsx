import React from 'react';
import { AlertCircle, SearchX, Users, HelpCircle, FileQuestion, ShieldAlert, SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react';

export default function ProblemSection({ onOpenQuickLead }) {
  const problems = [
    {
      icon: SearchX,
      title: "Customers Can't Find You Easily",
      description: "When locals search on Google for what you offer, they find competitors who have indexed websites instead of your buried social profile."
    },
    {
      icon: Users,
      title: "Your Competitors Look More Professional",
      description: "A customer deciding between two local providers will almost always pick the one with a crisp, credible website over an inactive social page."
    },
    {
      icon: HelpCircle,
      title: "Visitors Don't Know What You Offer",
      description: "Social media feeds are cluttered. Customers have to scroll through dozens of posts just to figure out your pricing, hours, or packages."
    },
    {
      icon: FileQuestion,
      title: "People Can't Easily Request a Quote",
      description: "Relying on random DMs and unanswered phone calls means qualified, high-paying jobs slip through the cracks every single week."
    },
    {
      icon: ShieldAlert,
      title: "Loss of Trust & Credibility",
      description: "In the US and Canada, over 84% of consumers believe a dedicated business website makes your company far more trustworthy than a social page alone."
    },
    {
      icon: SlidersHorizontal,
      title: "Zero Control Over Your Own Brand",
      description: "Algorithms change constantly, ad costs fluctuate, and you don't own your social followers. Your website is your 100% owned digital property."
    }
  ];

  return (
    <section id="problem" className="py-24 relative bg-[#090d15] border-y border-slate-800/80 overflow-hidden">
      {/* Background glow accents */}
      <div className="ambient-glow bg-red-500/10 top-1/2 left-0 -translate-y-1/2" />
      <div className="ambient-glow bg-cyan-500/10 -bottom-24 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/50 text-red-400 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The Reality for Many Small Businesses</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Your Business Deserves More Than a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-orange-400">
              Facebook Page.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Relying solely on social media or an outdated, broken website quietly costs you valuable local customers every single day. Here is what happens behind the scenes:
          </p>
        </div>

        {/* 6 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, i) => {
            const Icon = prob.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-2xl bg-[#0d121c]/90 border border-slate-800/80 hover:border-slate-700/80 shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                  {prob.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {prob.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Transition Bridge: "That's where I come in." */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e1626] to-slate-900 border border-cyan-500/30 shadow-glow-cyan max-w-4xl mx-auto">
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-display font-extrabold text-2xl sm:text-3xl">
                <Sparkles className="w-6 h-6 shrink-0" />
                <span>That's where I come in.</span>
              </div>
              <p className="text-sm sm:text-base text-slate-300">
                I replace the friction with a tailored, high-converting digital asset that establishes instant authority, showcases your exact services, and captures qualified customer leads 24/7.
              </p>
            </div>

            <button
              onClick={onOpenQuickLead}
              className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>Fix My Online Presence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
