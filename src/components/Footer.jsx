import React from 'react';
import { ArrowUpRight, Sparkles, Mail, MessageSquare, Database, Shield } from 'lucide-react';
import { PROJECTS } from '../data/projects';

export default function Footer({ onOpenQuickLead, onOpenAdminLeads }) {
  const currentYear = 2026;

  return (
    <footer className="bg-[#05070a] border-t border-slate-800/80 pt-16 pb-24 sm:pb-16 relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-glow-cyan">
                <div className="w-full h-full bg-[#07090e] rounded-[11px] flex items-center justify-center font-extrabold text-cyan-400 font-display text-sm">
                  LG
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white">
                  Lovish Garg
                </span>
                <span className="block text-[11px] text-cyan-400 font-medium">
                  Creative Developer & Designer
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 font-medium">
              "Websites That Turn Local Businesses Into Online Brands."
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              I design and build modern, fast, conversion-focused websites for businesses across the United States, Canada, and internationally that want more customers, more credibility, and a stronger online presence.
            </p>

            {/* Direct Contact Links */}
            <div className="space-y-1.5 pt-1 text-xs">
              <a 
                href="mailto:garglovish938@gmail.com" 
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>garglovish938@gmail.com</span>
              </a>
              <a 
                href="https://wa.me/919350641477" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +91 9350641477</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={onOpenQuickLead}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-xs font-bold text-cyan-300 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start a Project</span>
              </button>

              {/* Discrete Admin Leads Portal Link for Lovish */}
              <button
                onClick={onOpenAdminLeads}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-slate-200 transition-all"
                title="Open Client Leads Database Portal"
              >
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>Leads DB</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#work" className="hover:text-cyan-400 transition-colors">Client Work</a></li>
              <li><a href="#problem" className="hover:text-cyan-400 transition-colors">The Problem</a></li>
              <li><a href="#why-different" className="hover:text-cyan-400 transition-colors">Why Lovish</a></li>
              <li><a href="#process" className="hover:text-cyan-400 transition-colors">4-Step Process</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services Offered</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Lovish</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Get a Quote</a></li>
            </ul>
          </div>

          {/* Real Live Projects */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Featured Client Websites
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {PROJECTS.map((proj) => (
                <li key={proj.id}>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 transition-colors flex items-center justify-between group"
                  >
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Local Service Business Websites</li>
              <li>Healthcare & Clinic Websites</li>
              <li>Bakery & Food Order Systems</li>
              <li>E-Commerce Product Experiences</li>
              <li>Lead Generation & Quote Funnels</li>
              <li>Appointment & Booking Platforms</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} Lovish Garg. All rights reserved. Designed & built for local businesses.
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Built with strategy, design & code.</span>
            <span>•</span>
            <button
              onClick={onOpenAdminLeads}
              className="text-slate-500 hover:text-cyan-400 transition-colors text-[11px]"
            >
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
