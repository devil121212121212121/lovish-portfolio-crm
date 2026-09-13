import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Phone, Sparkles, ShieldCheck, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLead } from '../services/leadDatabase';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    businessType: 'Local Service Business',
    businessLocation: '',
    hasWebsite: false,
    currentWebsiteUrl: '',
    servicesRequired: ['New Custom Website'],
    budgetRange: '$1,000–$1,500',
    projectTimeline: 'ASAP (Next 1-2 Weeks)',
    preferredStyle: 'Modern & High-Converting',
    projectDescription: '',
    website_hp: '' // Honeypot field for bot protection
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const budgetOptions = [
    '$300–$500',
    '$500–$1,000',
    '$1,000–$1,500',
    '$1,500+'
  ];

  const timelineOptions = [
    'ASAP (Next 1-2 Weeks)',
    '2–3 Weeks',
    '1–2 Months',
    'Flexible / Planning Phase'
  ];

  const availableServices = [
    'New Custom Website',
    'Redesign Outdated Website',
    'High-Converting Landing Page',
    'Online Booking / Scheduling',
    'E-Commerce Storefront',
    'Lead Generation & Quote Calculator'
  ];

  const businessTypes = [
    'Local Service Pro (Automotive, Contractor, etc.)',
    'Healthcare & Clinic (Chiro, Dental, Wellness)',
    'Food, Bakery & Hospitality',
    'Education, Coaching or Academy',
    'Fitness / Martial Arts Studio',
    'E-Commerce / Consumer Brand',
    'B2B / Professional Agency',
    'Other Small Business'
  ];

  const toggleService = (srv) => {
    setFormData((prev) => {
      const exists = prev.servicesRequired.includes(srv);
      if (exists) {
        const next = prev.servicesRequired.filter((s) => s !== s);
        return { ...prev, servicesRequired: next.length ? next : [srv] };
      } else {
        return { ...prev, servicesRequired: [...prev.servicesRequired, srv] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Prepare payload for POST /api/leads
    const payload = {
      full_name: formData.fullName,
      business_name: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.phone,
      business_type: formData.businessType,
      business_location: formData.businessLocation,
      has_website: formData.hasWebsite,
      current_website_url: formData.hasWebsite ? formData.currentWebsiteUrl : null,
      website_condition: formData.hasWebsite ? 'OUTDATED' : 'NO_WEBSITE',
      services_required: formData.servicesRequired,
      budget_range: formData.budgetRange,
      project_timeline: formData.projectTimeline,
      preferred_style: formData.preferredStyle,
      project_description: formData.projectDescription,
      lead_source: 'Website Main Contact Form',
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
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } else {
      setErrorMessage(res.error || 'Failed to submit inquiry. Please check your information and try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07090e]">
      <div className="ambient-glow bg-cyan-500/10 top-20 -left-20" />
      <div className="ambient-glow bg-blue-600/10 bottom-20 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Lovish Garg</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Let's Build{' '}
            <span className="gradient-text-cyan">
              Something Great.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Tell me about your business and goals. You will receive a detailed scope breakdown, pricing estimate, and next steps directly from Lovish within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-7 rounded-2xl bg-[#0d121c] border border-slate-800 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Direct Channels
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Prefer immediate communication? Reach out directly to Lovish Garg via WhatsApp or email.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="mailto:garglovish938@gmail.com"
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-3.5 group transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Email to Lovish</div>
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      garglovish938@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/919350641477?text=Hi%20Lovish%2C%20I%20saw%20your%20portfolio%20and%20I%20want%20to%20build%20a%20website%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 flex items-center gap-3.5 group transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">WhatsApp Chat (Fast Reply)</div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      +91 9350641477 (Chat on WhatsApp →)
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+919350641477"
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 flex items-center gap-3.5 group transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Phone</div>
                    <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                      +91 9350641477
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#0d121c] border border-slate-800 space-y-4 shadow-xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>What Happens After You Inquire:</span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </div>
                  <span>Lovish personally reviews your business model, competitors, and target customers.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </div>
                  <span>You receive a clear scope recommendation, exact timeline, and transparent pricing.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </div>
                  <span>Zero aggressive sales tactics — just an honest, strategic assessment.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Full CRM Lead Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0d121c] border border-slate-800 shadow-2xl relative">
              
              {submitted ? (
                <div className="py-16 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-glow-emerald">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Inquiry Received by Lovish!
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName || 'there'}</strong>! Your inquiry for <strong className="text-white">{formData.businessName || 'your business'}</strong> has been saved directly to our client database and emailed to Lovish Garg.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          businessName: '',
                          email: '',
                          phone: '',
                          businessType: 'Local Service Business',
                          businessLocation: '',
                          hasWebsite: false,
                          currentWebsiteUrl: '',
                          servicesRequired: ['New Custom Website'],
                          budgetRange: '$1,000–$1,500',
                          projectTimeline: 'ASAP (Next 1-2 Weeks)',
                          preferredStyle: 'Modern & High-Converting',
                          projectDescription: '',
                          website_hp: ''
                        });
                      }}
                      className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  
                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-950/80 border border-red-800/80 flex items-start gap-3 text-red-200 text-xs animate-in fade-in">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Submission Error:</strong> {errorMessage}
                      </div>
                    </div>
                  )}

                  {/* Honeypot Field (Spam Protection - Hidden) */}
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

                  {/* Name & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="client-name">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        required
                        placeholder="e.g. Marcus Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:border-cyan-400 focus:bg-[#151c2a] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="business-name">
                        Business Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="business-name"
                        type="text"
                        required
                        placeholder="e.g. Apex Detailing Studio"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:border-cyan-400 focus:bg-[#151c2a] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="client-email">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="client-email"
                        type="email"
                        required
                        placeholder="marcus@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:border-cyan-400 focus:bg-[#151c2a] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="client-phone">
                        Phone / WhatsApp <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="client-phone"
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000 or +91..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:border-cyan-400 focus:bg-[#151c2a] transition-all"
                      />
                    </div>
                  </div>

                  {/* Business Type & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="business-type">
                        Business Type
                      </label>
                      <select
                        id="business-type"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white text-sm focus:border-cyan-400 transition-all"
                      >
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="business-loc">
                        City / Location (Optional)
                      </label>
                      <input
                        id="business-loc"
                        type="text"
                        placeholder="e.g. Austin, TX or Toronto, ON"
                        value={formData.businessLocation}
                        onChange={(e) => setFormData({ ...formData, businessLocation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:border-cyan-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Website Status Radio */}
                  <div className="p-4 rounded-xl bg-[#0e1420] border border-slate-800 space-y-3">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Do you currently have an existing website?
                    </label>
                    <div className="flex flex-wrap gap-4 text-xs font-medium">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="radio"
                          name="hasWebsite"
                          checked={!formData.hasWebsite}
                          onChange={() => setFormData({ ...formData, hasWebsite: false, currentWebsiteUrl: '' })}
                          className="text-cyan-400 focus:ring-cyan-400"
                        />
                        <span>No, starting fresh</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="radio"
                          name="hasWebsite"
                          checked={formData.hasWebsite}
                          onChange={() => setFormData({ ...formData, hasWebsite: true })}
                          className="text-cyan-400 focus:ring-cyan-400"
                        />
                        <span>Yes, but it's outdated or needs redesign</span>
                      </label>
                    </div>

                    {formData.hasWebsite && (
                      <div className="pt-2 animate-in fade-in">
                        <input
                          type="url"
                          placeholder="https://yourcurrentwebsite.com"
                          value={formData.currentWebsiteUrl}
                          onChange={(e) => setFormData({ ...formData, currentWebsiteUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#121722] border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:border-cyan-400"
                        />
                      </div>
                    )}
                  </div>

                  {/* Services Required Multi-select Pills */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">
                      What services are required? (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableServices.map((srv) => {
                        const isSelected = formData.servicesRequired.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => toggleService(srv)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-sm'
                                : 'bg-[#121722] text-slate-400 border border-slate-800 hover:text-slate-200'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Estimated Budget Range
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgetOptions.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData({ ...formData, budgetRange: b })}
                            className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                              formData.budgetRange === b
                                ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-sm'
                                : 'bg-[#121722] border-slate-700/80 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block" htmlFor="timeline-select">
                        Target Timeline
                      </label>
                      <select
                        id="timeline-select"
                        value={formData.projectTimeline}
                        onChange={(e) => setFormData({ ...formData, projectTimeline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white text-xs focus:border-cyan-400 transition-all"
                      >
                        {timelineOptions.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Description Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300" htmlFor="project-desc">
                      Project Requirements & Goals <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="project-desc"
                      required
                      rows={4}
                      placeholder="What services do you offer? Who is your ideal customer? What specific features or goals do you need (e.g. quote requests, booking, payments)?"
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:border-cyan-400 focus:bg-[#151c2a] transition-all resize-none"
                    />
                  </div>

                  {/* Privacy Notice */}
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    By submitting this form, you agree that Lovish Garg may use your provided information to respond to your project enquiry. Your details remain confidential.
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-extrabold text-base shadow-glow-cyan transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Validating & sending inquiry...</span>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-slate-950" />
                        <span>Send Project Inquiry</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
