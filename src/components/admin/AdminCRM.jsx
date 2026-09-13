import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, LogOut, RefreshCw, Sparkles, User, Calendar, 
  ExternalLink, Phone, MessageSquare, Mail, AlertCircle, ArrowLeft, ShieldCheck, 
  Layers, CheckCircle2, Flame, Thermometer 
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';
import { fetchLeads, exportLeadsToCSV } from '../../services/leadDatabase';
import LeadDetailDrawer from './LeadDetailDrawer';

export default function AdminCRM({ user, onLogout, onBackToPortfolio }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuickFilter, setSelectedQuickFilter] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedBudget, setSelectedBudget] = useState('ALL');
  const [selectedBusinessType, setSelectedBusinessType] = useState('ALL');
  const [activeLead, setActiveLead] = useState(null);
  const [realtimeToast, setRealtimeToast] = useState(null);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    const res = await fetchLeads({
      search: searchQuery,
      status: selectedStatus,
      budget: selectedBudget,
      businessType: selectedBusinessType
    });
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setLeads(res.leads);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [selectedStatus, selectedBudget, selectedBusinessType]);

  // Handle Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      loadLeads();
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Real-time Supabase Subscription
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) return;

    const channel = supabase
      .channel('leads-crm-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setRealtimeToast(`🚀 New lead received: ${payload.new.full_name || payload.new.business_name}`);
            setTimeout(() => setRealtimeToast(null), 6000);
          }
          loadLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // KPI Calculations from REAL records
  const kpis = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'NEW').length,
    contacted: leads.filter((l) => l.status === 'CONTACTED').length,
    qualified: leads.filter((l) => l.status === 'QUALIFIED').length,
    proposals: leads.filter((l) => l.status === 'PROPOSAL_SENT').length,
    won: leads.filter((l) => l.status === 'WON').length,
    lost: leads.filter((l) => l.status === 'LOST').length
  };

  // Quick Filter Filter Logic
  const filteredLeads = leads.filter((lead) => {
    if (selectedQuickFilter === 'ALL') return true;
    if (selectedQuickFilter === 'NEW') return lead.status === 'NEW';
    if (selectedQuickFilter === 'HOT') return lead.lead_temperature === 'HOT';
    if (selectedQuickFilter === 'NO_WEBSITE') return lead.has_website === false || lead.website_condition === 'NO_WEBSITE';
    if (selectedQuickFilter === 'PROPOSAL_SENT') return lead.status === 'PROPOSAL_SENT';
    if (selectedQuickFilter === 'WON') return lead.status === 'WON';

    const today = new Date().toISOString().slice(0, 10);
    if (selectedQuickFilter === 'FOLLOW_UP_TODAY') {
      return lead.follow_up_date === today;
    }
    if (selectedQuickFilter === 'OVERDUE') {
      return lead.follow_up_date && lead.follow_up_date < today && lead.status !== 'WON' && lead.status !== 'LOST';
    }

    return true;
  });

  const handleExportCSV = () => {
    exportLeadsToCSV(filteredLeads);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans pb-16">
      
      {/* Realtime Toast Notification */}
      {realtimeToast && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-200 shadow-glow-cyan flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold">{realtimeToast}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-[#0c1018]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-glow-cyan">
                <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center font-extrabold text-cyan-400 font-display text-xs">
                  LG
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-sm text-white">
                  Lovish Garg Client CRM
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Supabase Connected</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden md:inline">
              {user?.email || 'garglovish938@gmail.com'}
            </span>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-bold text-white transition-all hover:scale-102"
              title="Export all records to CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-xs font-bold text-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Summary Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="p-4 rounded-xl bg-[#0d121c] border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Leads</span>
            <span className="font-display font-black text-2xl text-white">{kpis.total}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0d121c] border border-blue-900/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-1">New</span>
            <span className="font-display font-black text-2xl text-blue-300">{kpis.new}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0d121c] border border-amber-900/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">Contacted</span>
            <span className="font-display font-black text-2xl text-amber-300">{kpis.contacted}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0d121c] border border-purple-900/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">Qualified</span>
            <span className="font-display font-black text-2xl text-purple-300">{kpis.qualified}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0d121c] border border-cyan-900/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">Proposals</span>
            <span className="font-display font-black text-2xl text-cyan-300">{kpis.proposals}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0d121c] border border-emerald-900/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">Won 🎉</span>
            <span className="font-display font-black text-2xl text-emerald-400">{kpis.won}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0d121c] border border-red-900/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block mb-1">Lost</span>
            <span className="font-display font-black text-2xl text-red-400">{kpis.lost}</span>
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { key: 'ALL', label: 'ALL' },
            { key: 'NEW', label: 'NEW' },
            { key: 'HOT', label: '🔥 HOT' },
            { key: 'NO_WEBSITE', label: 'NO WEBSITE' },
            { key: 'FOLLOW_UP_TODAY', label: 'FOLLOW-UP TODAY' },
            { key: 'OVERDUE', label: '⚠️ OVERDUE' },
            { key: 'PROPOSAL_SENT', label: 'PROPOSAL SENT' },
            { key: 'WON', label: 'WON' }
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setSelectedQuickFilter(btn.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedQuickFilter === btn.key
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-glow-cyan'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Search & Secondary Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-[#0c1018] border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Name, Business, Email, Phone, or Website..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121722] border border-slate-700/80 text-white placeholder:text-slate-500 text-xs focus:border-cyan-400"
            />
          </div>

          {/* Secondary Filters */}
          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#121722] border border-slate-700 text-xs text-slate-300 focus:border-cyan-400"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="QUALIFIED">QUALIFIED</option>
              <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
              <option value="NEGOTIATION">NEGOTIATION</option>
              <option value="WON">WON</option>
              <option value="LOST">LOST</option>
            </select>

            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#121722] border border-slate-700 text-xs text-slate-300 focus:border-cyan-400"
            >
              <option value="ALL">All Budgets</option>
              <option value="$300–$500">$300–$500</option>
              <option value="$500–$1,000">$500–$1,000</option>
              <option value="$1,000–$1,500">$1,000–$1,500</option>
              <option value="$1,500+">$1,500+</option>
            </select>

            <button
              onClick={loadLeads}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-all"
              title="Refresh database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>

        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>Database Query Notice: {error}</span>
          </div>
        )}

        {/* Leads Table */}
        <div className="rounded-2xl bg-[#0c1018] border border-slate-800 overflow-hidden shadow-xl">
          {loading && leads.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400">Loading Supabase leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Layers className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">No matching leads found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your search query or filters to view all database records.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#090d14] text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3.5 px-4">Score</th>
                    <th className="py-3.5 px-4">Client / Business</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Budget</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Follow-Up</th>
                    <th className="py-3.5 px-4">Source</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredLeads.map((lead) => {
                    const today = new Date().toISOString().slice(0, 10);
                    const isOverdue = lead.follow_up_date && lead.follow_up_date < today && lead.status !== 'WON' && lead.status !== 'LOST';

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setActiveLead(lead)}
                        className="hover:bg-[#121826] cursor-pointer transition-colors group"
                      >
                        {/* Score & Temperature */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase ${
                            lead.lead_temperature === 'HOT'
                              ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                              : lead.lead_temperature === 'WARM'
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          }`}>
                            {lead.lead_temperature === 'HOT' && <Flame className="w-3 h-3 text-red-400" />}
                            <span>{lead.lead_score || 0}</span>
                          </span>
                        </td>

                        {/* Name & Business */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {lead.full_name}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {lead.business_name}
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-4">
                          <div className="text-slate-300 truncate max-w-[170px]">
                            {lead.email}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {lead.phone || lead.whatsapp || 'No phone'}
                          </div>
                        </td>

                        {/* Budget */}
                        <td className="py-3.5 px-4 font-semibold text-emerald-400 whitespace-nowrap">
                          {lead.budget_range || '$500–$1,000'}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            lead.status === 'WON'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : lead.status === 'NEW'
                              ? 'bg-blue-950 text-blue-400 border border-blue-500/40'
                              : lead.status === 'PROPOSAL_SENT'
                              ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                              : lead.status === 'LOST'
                              ? 'bg-red-950 text-red-400 border border-red-500/40'
                              : 'bg-slate-900 text-slate-300 border border-slate-700'
                          }`}>
                            {lead.status}
                          </span>
                        </td>

                        {/* Follow-Up */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {lead.follow_up_date ? (
                            <span className={`text-[11px] font-medium ${isOverdue ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                              {lead.follow_up_date} {isOverdue && '⚠️'}
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-500">None set</span>
                          )}
                        </td>

                        {/* Source */}
                        <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap truncate max-w-[120px]">
                          {lead.lead_source || 'Website'}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="inline-flex items-center gap-1">
                            {lead.phone && (
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.full_name)}%2C%20this%20is%20Lovish.%20I%20received%20your%20website%20enquiry%20regarding%20${encodeURIComponent(lead.business_name)}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/40 transition-colors"
                                title="WhatsApp Client"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}?subject=Website%20Project%20%E2%80%94%20${encodeURIComponent(lead.business_name)}`}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-950/40 transition-colors"
                                title="Email Client"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => setActiveLead(lead)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                              title="Open Full Profile"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Detail Drawer */}
      {activeLead && (
        <LeadDetailDrawer
          lead={activeLead}
          onClose={() => setActiveLead(null)}
          onLeadUpdated={(updated) => {
            setActiveLead(updated);
            setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
          }}
          adminEmail={user?.email || 'admin'}
        />
      )}

    </div>
  );
}
