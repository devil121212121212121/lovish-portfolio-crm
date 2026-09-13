import React, { useState } from 'react';
import { Sparkles, XCircle, CheckCircle2, ArrowLeftRight, Smartphone, ShieldCheck, Zap } from 'lucide-react';

export default function BeforeAfterSection({ onOpenQuickLead }) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [activeTab, setActiveTab] = useState('after'); // for quick toggle mode on touch devices

  const beforeItems = [
    { title: 'Facebook-Only Presence', desc: 'Buried in algorithm feeds, zero Google Search indexing for local intent.' },
    { title: 'Outdated, Slow or Broken Design', desc: 'Frustrates mobile visitors and makes your business look stagnant or closed.' },
    { title: 'Difficult & Clunky to Contact', desc: 'Random direct messages, missed voicemail tags, and unanswered questions.' },
    { title: 'No Clear Service Structure', desc: 'Customers get confused about what you offer, how much it costs, and what to do next.' },
    { title: 'Low Online Credibility', desc: 'Over 80% of local prospects will choose a competitor who has a verified, crisp website.' }
  ];

  const afterItems = [
    { title: 'Bespoke Professional Website', desc: 'High-authority digital asset that ranks in local search and commands premium rates.' },
    { title: 'Clear & Distinctive Brand Identity', desc: 'Instantly positions you as the premier local choice in your market and industry.' },
    { title: '100% Mobile-First Touch Experience', desc: 'Loads in under 1 second with 1-tap calling, SMS triggers, and maps navigation.' },
    { title: 'Strategic High-Converting CTAs', desc: 'Clear quote request forms, booking widgets, and consultation intake funnels.' },
    { title: 'Automated 24/7 Lead Capture', desc: 'Captures inquiries while you sleep, sending instant SMS/email alerts straight to your phone.' }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="ambient-glow bg-blue-600/10 -top-20 left-1/3" />
      <div className="ambient-glow bg-amber-500/10 -bottom-20 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>The Transformation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            From "We Exist" To{' '}
            <span className="gradient-text-cyan">
              "We're Impossible To Miss."
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            See the massive contrast between relying on a basic social presence versus launching a dedicated, conversion-engineered business website.
          </p>
        </div>

        {/* Interactive Comparison Tabs (Mobile & Desktop) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800">
            <button
              onClick={() => setActiveTab('before')}
              className={`px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'before'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              BEFORE (Outdated / Social Only)
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'after'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              AFTER (Conversion Machine)
            </button>
            <button
              onClick={() => setActiveTab('side-by-side')}
              className={`hidden md:inline-flex px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'side-by-side'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Side-by-Side Comparison
            </button>
          </div>
        </div>

        {/* Interactive Views */}
        {activeTab === 'side-by-side' ? (
          /* Side-by-side Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before Column */}
            <div className="p-8 rounded-2xl bg-[#0e1118] border border-red-950/80 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl bg-red-950/90 border-l border-b border-red-800/40 text-[11px] font-bold text-red-400 tracking-wider">
                THE OLD WAY
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-red-300">
                  Before: Frustrating & Invisible
                </h3>
                <p className="text-xs text-slate-400">
                  What happens when customers try finding you without a dedicated site:
                </p>
              </div>

              <div className="space-y-4">
                {beforeItems.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3.5">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* After Column */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0b1424] to-[#070e1a] border border-cyan-500/40 space-y-6 shadow-glow-cyan relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl bg-cyan-950/90 border-l border-b border-cyan-500/50 text-[11px] font-bold text-cyan-300 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>WITH WEBCRAFT STUDIO</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-white">
                  After: High-Converting Brand
                </h3>
                <p className="text-xs text-cyan-300/80">
                  Engineered to capture, convince, and convert local customers:
                </p>
              </div>

              <div className="space-y-4">
                {afterItems.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === 'before' ? (
          /* Focused Before Card */
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-[#0e1118] border border-red-950/90 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40">
                Typical Current Reality
              </span>
              <span className="text-xs text-slate-400">Low Conversion • High Customer Frustration</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-red-300">
              Before: Outdated Presence & Missed Revenue
            </h3>

            <div className="space-y-3.5">
              {beforeItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-200">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => setActiveTab('after')}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                See What Your Business Looks Like After →
              </button>
            </div>
          </div>
        ) : (
          /* Focused After Card */
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-b from-[#0b1424] to-[#070e1a] border border-cyan-500/40 space-y-6 shadow-glow-cyan">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>The WebCraft Transformation</span>
              </span>
              <span className="text-xs text-emerald-400 font-semibold">Ready to Hire • 24/7 Leads</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              After: An Online Brand That Converts Every Day
            </h3>

            <div className="space-y-3.5">
              {afterItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={onOpenQuickLead}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-105"
              >
                Upgrade My Business Online Today
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
