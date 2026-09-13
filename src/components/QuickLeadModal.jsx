import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLead } from '../services/leadDatabase';

export default function QuickLeadModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    need: 'New Website From Scratch',
    website_hp: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const payload = {
      full_name: formData.name,
      business_name: formData.business,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.phone,
      services_required: [formData.need],
      budget_range: '$500–$1,000',
      project_timeline: 'ASAP',
      project_description: `Quick consultation request for ${formData.business}: Looking for ${formData.need}.`,
      lead_source: 'Quick Lead Modal',
      landing_page: window.location.pathname,
      referrer: document.referrer || 'direct',
      website_hp: formData.website_hp
    };

    const res = await submitLead(payload);

    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } else {
      setErrorMessage(res.error || 'Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#0c1018] border border-cyan-500/30 rounded-2xl shadow-glow-cyan p-6 sm:p-7 text-left space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close quick inquiry dialog"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-glow-emerald">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Inquiry Saved & Sent!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Thanks <strong className="text-white">{formData.name || 'there'}</strong>! Your inquiry for <strong className="text-white">{formData.business || 'your business'}</strong> is logged in the CRM database and sent to Lovish Garg.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-2 px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Website Consultation</span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Ready to Upgrade Your Business?
              </h3>
              <p className="text-xs text-slate-400">
                Drop your details below and Lovish will send a custom concept & quote breakdown.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Honeypot Field */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website_hp}
                onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300" htmlFor="quick-name">
                Your Full Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id="quick-name"
                type="text"
                required
                placeholder="e.g. Marcus Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121722] border border-slate-700 text-white text-xs focus:border-cyan-400 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300" htmlFor="quick-business">
                Business Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id="quick-business"
                type="text"
                required
                placeholder="e.g. Apex Auto Studio"
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121722] border border-slate-700 text-white text-xs focus:border-cyan-400 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300" htmlFor="quick-email">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="quick-email"
                  type="email"
                  required
                  placeholder="marcus@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121722] border border-slate-700 text-white text-xs focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300" htmlFor="quick-phone">
                  Phone / WhatsApp
                </label>
                <input
                  id="quick-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121722] border border-slate-700 text-white text-xs focus:border-cyan-400 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300" htmlFor="quick-need">
                What do you need most?
              </label>
              <select
                id="quick-need"
                value={formData.need}
                onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121722] border border-slate-700 text-white text-xs focus:border-cyan-400 transition-all"
              >
                <option value="New Website From Scratch">Brand New Website (No Current Site)</option>
                <option value="Redesign Outdated Website">Redesign My Outdated Website</option>
                <option value="Lead Generation Landing Page">High-Converting Landing Page for Ads</option>
                <option value="Online Booking System">Online Booking & Appointment Scheduling</option>
                <option value="E-Commerce Store">E-Commerce Product Store</option>
              </select>
            </div>

            <p className="text-[10px] text-slate-400 leading-normal">
              By submitting, you agree that Lovish Garg may contact you regarding your enquiry.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Submitting to database...</span>
              ) : (
                <>
                  <span>Send to Lovish Garg</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
