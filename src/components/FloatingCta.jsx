import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquarePlus, ArrowUpRight } from 'lucide-react';

export default function FloatingCta({ onOpenQuickLead }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling past hero section
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop Floating Pill on Bottom Right */}
      <div className="hidden sm:block fixed bottom-8 left-8 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
        <button
          onClick={onOpenQuickLead}
          className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0e131d]/95 hover:bg-[#131a28] text-white border border-cyan-500/40 shadow-glow-cyan backdrop-blur-xl transition-all duration-300 hover:scale-105"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold tracking-wide">
            Need a Website?
          </span>
          <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Let's Talk
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Mobile Sticky Action Bar on Bottom */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 border-t border-slate-800/90 backdrop-blur-xl p-3 shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="text-left">
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available for Projects</span>
            </div>
            <div className="text-[10px] text-slate-400">US & Canada Local Businesses</div>
          </div>

          <button
            onClick={onOpenQuickLead}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold text-xs shadow-glow-cyan flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get My Website</span>
          </button>
        </div>
      </div>
    </>
  );
}
