import React from 'react';
import { Target, TrendingUp, Smartphone, Rocket, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DifferenceSection() {
  const cards = [
    {
      number: '01',
      title: 'Built Around Your Business',
      tagline: 'Custom Architecture, Zero Bloat',
      icon: Target,
      accent: 'cyan',
      description: 'Every website is designed around the actual services, customers, and goals of your business. No generic templates, no unnecessary filler.',
      bulletPoints: [
        'Custom layout aligned with your specific sales model',
        'Highlights your most profitable services first',
        'Direct answers to your prospective clients’ top objections'
      ]
    },
    {
      number: '02',
      title: 'Designed To Convert',
      tagline: 'Engineered For Inquiries & Calls',
      icon: TrendingUp,
      accent: 'emerald',
      description: 'Strategic CTAs, clear service presentation, psychological trust elements, and frictionless inquiry flows that guide visitors toward hiring you.',
      bulletPoints: [
        'High-contrast call-to-actions placed at key decision points',
        'Instant quote estimators and self-qualifying contact forms',
        'Prominent trust markers, guarantees, and licensing credentials'
      ]
    },
    {
      number: '03',
      title: 'Mobile First',
      tagline: 'Flawless on Every Screen',
      icon: Smartphone,
      accent: 'blue',
      description: 'Over 70% of your local customers are browsing from phones. Your website must load instantly and feel like a silky native mobile app.',
      bulletPoints: [
        '1-tap phone calls, SMS triggers, and maps navigation',
        'Optimized for one-thumb mobile browsing and booking',
        'Sub-second mobile speed eliminating customer bounce rate'
      ]
    },
    {
      number: '04',
      title: 'Built To Grow',
      tagline: 'Modular & Future-Proof',
      icon: Rocket,
      accent: 'indigo',
      description: 'Easy to expand with new services, products, booking systems, forms, integrations, and features as your business scales over time.',
      bulletPoints: [
        'Clean modern code with zero proprietary lock-in',
        'Seamless integration with booking calendars & CRM tools',
        'Simple to add new service packages, locations, or staff'
      ]
    }
  ];

  return (
    <section id="why-different" className="py-24 relative bg-[#090d15] border-y border-slate-800/80 overflow-hidden">
      {/* Glow backgrounds */}
      <div className="ambient-glow bg-cyan-500/10 -top-24 right-1/4" />
      <div className="ambient-glow bg-emerald-500/10 -bottom-24 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Strategic Difference</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            I Don't Just Design Pages.{' '}
            <span className="gradient-text-cyan">
              I Design Customer Journeys.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Most freelancers deliver pretty graphics that don't generate leads. Here is the foundation behind every site I build:
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.number}
                className="p-8 rounded-2xl bg-[#0d121c] border border-slate-800 hover:border-slate-700/90 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-3xl sm:text-4xl text-slate-700 group-hover:text-cyan-400/80 transition-colors">
                      {card.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-110 group-hover:border-cyan-500/50 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {card.tagline}
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  {/* Core Description */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Concrete Deliverable Bullets */}
                <div className="pt-5 border-t border-slate-800/80 space-y-2.5">
                  {card.bulletPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
