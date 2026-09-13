import React, { useState, useEffect } from 'react';
import { 
  X, Phone, Mail, MessageSquare, Calendar, CheckCircle2, Clock, 
  ExternalLink, Sparkles, Tag, FileText, Send, AlertCircle, Trash2, ArrowUpRight 
} from 'lucide-react';
import { 
  updateLead, fetchLeadActivities, fetchLeadNotes, addLeadNote, logLeadActivity 
} from '../../services/leadDatabase';

export default function LeadDetailDrawer({ lead, onClose, onLeadUpdated, adminEmail }) {
  const [activities, setActivities] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [followUpDate, setFollowUpDate] = useState(lead?.follow_up_date || '');
  const [status, setStatus] = useState(lead?.status || 'NEW');
  const [savingStatus, setSavingStatus] = useState(false);

  useEffect(() => {
    if (lead) {
      setStatus(lead.status || 'NEW');
      setFollowUpDate(lead.follow_up_date || '');
      loadActivitiesAndNotes(lead.id);
    }
  }, [lead]);

  const loadActivitiesAndNotes = async (leadId) => {
    const [acts, nts] = await Promise.all([
      fetchLeadActivities(leadId),
      fetchLeadNotes(leadId)
    ]);
    setActivities(acts);
    setNotes(nts);
  };

  if (!lead) return null;

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    setSavingStatus(true);
    const res = await updateLead(lead.id, { status: newStatus }, adminEmail);
    setSavingStatus(false);
    if (res.success) {
      onLeadUpdated(res.lead);
      loadActivitiesAndNotes(lead.id);
    }
  };

  const handleFollowUpChange = async (newDate) => {
    setFollowUpDate(newDate);
    const res = await updateLead(lead.id, { follow_up_date: newDate || null }, adminEmail);
    if (res.success) {
      onLeadUpdated(res.lead);
      loadActivitiesAndNotes(lead.id);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSavingNote(true);
    const res = await addLeadNote(lead.id, newNote, adminEmail);
    setSavingNote(false);
    if (res.success) {
      setNewNote('');
      loadActivitiesAndNotes(lead.id);
    }
  };

  // WhatsApp Action
  const handleWhatsAppClick = () => {
    const rawPhone = (lead.whatsapp || lead.phone || '').replace(/[^0-9]/g, '');
    const message = `Hi ${lead.full_name}, this is Lovish. I received your website enquiry regarding ${lead.business_name}. I'd love to discuss your project.`;
    const url = `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;
    
    // Log activity
    logLeadActivity(lead.id, 'WHATSAPP_CLICKED', `WhatsApp chat initiated to ${lead.phone || lead.whatsapp}`, adminEmail);
    loadActivitiesAndNotes(lead.id);

    window.open(url, '_blank');
  };

  // Call Action
  const handleCallClick = () => {
    logLeadActivity(lead.id, 'CALL_CLICKED', `Call clicked for ${lead.phone || lead.whatsapp}`, adminEmail);
    loadActivitiesAndNotes(lead.id);
  };

  // Email Action
  const handleEmailClick = () => {
    const subject = `Website Project — ${lead.business_name}`;
    logLeadActivity(lead.id, 'EMAIL_CLICKED', `Email draft opened to ${lead.email}`, adminEmail);
    loadActivitiesAndNotes(lead.id);
    window.location.href = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}`;
  };

  const isOverdue = lead.follow_up_date && new Date(lead.follow_up_date) < new Date(new Date().toISOString().slice(0, 10));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0b0f17] border-l border-slate-800 h-full overflow-y-auto p-6 sm:p-8 space-y-7 text-left shadow-2xl no-scrollbar relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                lead.lead_temperature === 'HOT' 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : lead.lead_temperature === 'WARM'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
              }`}>
                {lead.lead_temperature} • Score {lead.lead_score}/100
              </span>
              <span className="text-[11px] text-slate-400">
                ID: {lead.id.slice(0, 8)}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {lead.full_name}
            </h2>
            <p className="text-sm font-semibold text-cyan-400">
              {lead.business_name} {lead.business_type ? `• ${lead.business_type}` : ''}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar (WhatsApp, Call, Email) */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={handleWhatsAppClick}
            disabled={!lead.phone && !lead.whatsapp}
            className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-102"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <a
            href={`tel:${lead.phone || lead.whatsapp}`}
            onClick={handleCallClick}
            className="p-3 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/40 text-blue-400 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-102"
          >
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </a>

          <button
            onClick={handleEmailClick}
            className="p-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-102"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>
        </div>

        {/* Status & Follow-Up Management */}
        <div className="p-4 rounded-xl bg-[#0e1420] border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Lead Status
            </label>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={savingStatus}
              className="w-full px-3 py-2 rounded-lg bg-[#141a27] border border-slate-700 text-white text-xs font-bold focus:border-cyan-400"
            >
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="QUALIFIED">QUALIFIED</option>
              <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
              <option value="NEGOTIATION">NEGOTIATION</option>
              <option value="WON">WON 🎉</option>
              <option value="LOST">LOST</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Follow-Up Date</span>
              {isOverdue && (
                <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-1.5 py-0.5 rounded">
                  OVERDUE
                </span>
              )}
            </label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => handleFollowUpChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141a27] border border-slate-700 text-white text-xs focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Complete Client Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Client & Project Dossier
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Email</span>
              <span className="font-semibold text-white truncate block">{lead.email}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Phone / WhatsApp</span>
              <span className="font-semibold text-white truncate block">{lead.phone || lead.whatsapp || 'None'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Budget Range</span>
              <span className="font-bold text-emerald-400">{lead.budget_range || 'Not specified'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Target Timeline</span>
              <span className="font-semibold text-amber-300">{lead.project_timeline || 'Flexible'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 sm:col-span-2">
              <span className="text-slate-400 block mb-1">Current Website Status</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">
                  {lead.has_website ? 'Has Existing Website' : 'No Current Website (Starting Fresh)'}
                </span>
                {lead.current_website_url && (
                  <a
                    href={lead.current_website_url.startsWith('http') ? lead.current_website_url : `https://${lead.current_website_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{lead.current_website_url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {lead.services_required && lead.services_required.length > 0 && (
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 sm:col-span-2">
                <span className="text-slate-400 block mb-1.5">Services Requested</span>
                <div className="flex flex-wrap gap-1.5">
                  {lead.services_required.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Requirements text */}
          <div className="p-4 rounded-xl bg-[#090d14] border border-slate-800 space-y-1 text-xs">
            <span className="text-slate-400 font-semibold block">Project Requirements & Message:</span>
            <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
              {lead.project_description || 'No additional project requirements written.'}
            </p>
          </div>

          {/* Source Attribution Metadata */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400">
            <div>
              <span className="block text-[10px] uppercase text-slate-400">Lead Source</span>
              <span className="text-slate-300 font-medium">{lead.lead_source || 'Website'}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-slate-400">Device</span>
              <span className="text-slate-300 font-medium">{lead.device_type || 'Desktop'}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-slate-400">Created</span>
              <span className="text-slate-300 font-medium">{new Date(lead.created_at).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-slate-400">Updated</span>
              <span className="text-slate-300 font-medium">{new Date(lead.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Private Internal Notes */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Private Internal Notes</span>
            </h3>
            <span className="text-[10px] text-slate-400">Never visible to client</span>
          </div>

          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="space-y-2">
            <textarea
              rows={2}
              placeholder="Add internal notes (e.g. called on Monday, client budget is firm, sending proposal on Friday)..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#121722] border border-slate-700 text-white text-xs focus:border-cyan-400 resize-none"
            />
            <button
              type="submit"
              disabled={savingNote || !newNote.trim()}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all disabled:opacity-50"
            >
              {savingNote ? 'Saving Note...' : 'Add Note'}
            </button>
          </form>

          {/* Notes List */}
          <div className="space-y-2 pt-1">
            {notes.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No notes added yet.</p>
            ) : (
              notes.map((n) => (
                <div key={n.id} className="p-3 rounded-lg bg-[#0e1420] border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{n.created_by || 'Admin'}</span>
                    <span>{new Date(n.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">{n.note}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Activity Timeline */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Activity History & Audit Log</span>
          </h3>

          <div className="space-y-2 relative border-l border-slate-800 ml-2 pl-3">
            {activities.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No activity recorded yet.</p>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="relative pb-2 text-xs">
                  <div className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-cyan-400" />
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-bold text-cyan-300">{act.activity_type}</span>
                    <span>{new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(act.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-300 mt-0.5 leading-snug">{act.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
