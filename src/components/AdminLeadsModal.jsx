import React, { useState, useEffect } from 'react';
import { X, Download, Phone, Mail, MessageSquare, Trash2, CheckCircle2, RefreshCw, ShieldAlert, Sparkles } from 'lucide-react';
import { getStoredLeads, updateLeadStatus, deleteLeadFromDatabase, exportLeadsToCSV } from '../services/leadDatabase';

export default function AdminLeadsModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const loadLeads = () => {
    setLeads(getStoredLeads());
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
      const handleLeadReceived = () => loadLeads();
      window.addEventListener('lovish_lead_received', handleLeadReceived);
      return () => window.removeEventListener('lovish_lead_received', handleLeadReceived);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredLeads = filterStatus === 'ALL'
    ? leads
    : leads.filter((l) => l.status === filterStatus);

  const handleStatusChange = (id, newStatus) => {
    updateLeadStatus(id, newStatus);
    loadLeads();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this inquiry from database?')) {
      deleteLeadFromDatabase(id);
      loadLeads();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0b0f17] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-left space-y-6 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Lovish Garg Studio
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Client Inquiries & Database
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live leads captured from your portfolio website. All submissions are automatically saved here and emailed to <span className="text-cyan-300 font-mono">garglovish938@gmail.com</span>.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={exportLeadsToCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-bold text-white transition-all hover:scale-105"
              title="Download spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close portal"
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['ALL', 'New', 'Contacted', 'Proposal Sent', 'Closed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === st
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st} ({st === 'ALL' ? leads.length : leads.filter((l) => l.status === st).length})
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Total Captured: <strong className="text-white">{leads.length}</strong> Leads
          </div>
        </div>

        {/* Leads List */}
        {filteredLeads.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-[#070a10] rounded-xl border border-slate-800/80">
            <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-base font-bold text-slate-300">No Inquiries Found</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Any client who fills out your quote form or the quick lead popup will immediately appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => {
              const cleanPhone = (lead.phone || lead.contact || '').replace(/[^0-9]/g, '');
              const cleanEmail = lead.email || (lead.contact && lead.contact.includes('@') ? lead.contact : '');

              return (
                <div
                  key={lead.id}
                  className="p-5 rounded-xl bg-[#0e1420] border border-slate-800 hover:border-slate-700 space-y-4 transition-all shadow-lg"
                >
                  {/* Lead Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">
                          {lead.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800/50 px-2 py-0.5 rounded">
                          {lead.businessName || lead.business || 'Business Lead'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Submitted: {new Date(lead.timestamp).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="text-xs bg-[#141b2b] border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:border-cyan-400"
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Proposal Sent">Status: Proposal Sent</option>
                        <option value="Closed">Status: Closed</option>
                      </select>

                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80">
                      <div className="text-slate-400 mb-1">Service Needed</div>
                      <div className="font-bold text-white truncate">
                        {lead.serviceNeeded || lead.need || 'New Website'}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80">
                      <div className="text-slate-400 mb-1">Budget Range</div>
                      <div className="font-bold text-emerald-400">
                        {lead.budgetRange || '$500–$1,000'}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80">
                      <div className="text-slate-400 mb-1">Business Type</div>
                      <div className="font-bold text-slate-300 truncate">
                        {lead.businessType || 'Local Business'}
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  {lead.message && (
                    <div className="p-3.5 rounded-lg bg-[#080b12] border border-slate-800/60 text-xs text-slate-300 leading-relaxed">
                      <span className="text-slate-400 font-semibold block mb-1">Client Message:</span>
                      "{lead.message}"
                    </div>
                  )}

                  {/* 1-Click Action Buttons for Lovish */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {cleanPhone && (
                      <>
                        <a
                          href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(lead.name)}%2C%20this%20is%20Lovish%20Garg%20from%20LovishCraft%20Studio.%20I%20received%20your%20inquiry%20regarding%20a%20website%20for%20${encodeURIComponent(lead.businessName || 'your business')}!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-bold text-xs transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </a>

                        <a
                          href={`tel:${cleanPhone}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
                        >
                          <Phone className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Call: {lead.phone || lead.contact}</span>
                        </a>
                      </>
                    )}

                    {cleanEmail && (
                      <a
                        href={`mailto:${cleanEmail}?subject=Regarding%20your%20website%20inquiry%20-%20Lovish%20Garg`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Email: {cleanEmail}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
