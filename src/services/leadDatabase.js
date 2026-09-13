import { supabase, isSupabaseConfigured } from './supabaseClient';

/**
 * Submits a new lead through the secure serverless API endpoint.
 * Never calls database credentials directly from client components.
 */
export async function submitLead(leadPayload) {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(leadPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit lead.');
    }

    return { success: true, ...data };
  } catch (err) {
    console.error('[SUBMISSION ERROR] submitLead:', err);
    return { success: false, error: err.message || 'Network error submitting lead.' };
  }
}

/**
 * Fetches leads from Supabase with search, status filtering, and sorting.
 * Requires authenticated admin session via RLS.
 */
export async function fetchLeads(filters = {}) {
  if (!isSupabaseConfigured() || !supabase) {
    return { leads: [], error: 'Supabase is not configured. Please set environment variables.' };
  }

  try {
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    // Status filter
    if (filters.status && filters.status !== 'ALL') {
      query = query.eq('status', filters.status);
    }

    // Temperature filter
    if (filters.temperature && filters.temperature !== 'ALL') {
      query = query.eq('lead_temperature', filters.temperature);
    }

    // Business type filter
    if (filters.businessType && filters.businessType !== 'ALL') {
      query = query.eq('business_type', filters.businessType);
    }

    // Budget range filter
    if (filters.budget && filters.budget !== 'ALL') {
      query = query.eq('budget_range', filters.budget);
    }

    // Search query across name, business, email, phone, and website
    if (filters.search && filters.search.trim() !== '') {
      const term = `%${filters.search.trim()}%`;
      query = query.or(
        `full_name.ilike.${term},business_name.ilike.${term},email.ilike.${term},phone.ilike.${term},current_website_url.ilike.${term}`
      );
    }

    // Follow-up filters
    if (filters.followUp) {
      const today = new Date().toISOString().slice(0, 10);
      if (filters.followUp === 'TODAY') {
        query = query.eq('follow_up_date', today);
      } else if (filters.followUp === 'OVERDUE') {
        query = query.lt('follow_up_date', today).not('follow_up_date', 'is', null);
      } else if (filters.followUp === 'UPCOMING') {
        query = query.gt('follow_up_date', today);
      } else if (filters.followUp === 'NONE') {
        query = query.is('follow_up_date', null);
      }
    }

    const { data, error } = await query;

    if (error) throw error;
    return { leads: data || [], error: null };
  } catch (err) {
    console.error('[DATABASE FETCH ERROR] fetchLeads:', err);
    return { leads: [], error: err.message };
  }
}

/**
 * Updates a lead in Supabase and records the corresponding activity.
 */
export async function updateLead(leadId, updates, adminEmail = 'admin') {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, error: 'Supabase client unavailable' };
  }

  try {
    // Get existing lead to track differences
    const { data: currentLead } = await supabase.from('leads').select('*').eq('id', leadId).single();

    const { data, error } = await supabase
      .from('leads')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
        updated_by: adminEmail
      })
      .eq('id', leadId)
      .select()
      .single();

    if (error) throw error;

    // Log Activity based on what changed
    if (updates.status && currentLead && updates.status !== currentLead.status) {
      await logLeadActivity(
        leadId,
        'STATUS_CHANGED',
        `Status updated from ${currentLead.status} to ${updates.status}`,
        adminEmail
      );
    } else if (updates.follow_up_date && (!currentLead || updates.follow_up_date !== currentLead.follow_up_date)) {
      await logLeadActivity(
        leadId,
        'FOLLOW_UP_SET',
        `Follow-up date scheduled for ${updates.follow_up_date}`,
        adminEmail
      );
    } else {
      await logLeadActivity(
        leadId,
        'LEAD_UPDATED',
        `Lead details modified by ${adminEmail}`,
        adminEmail
      );
    }

    return { success: true, lead: data };
  } catch (err) {
    console.error('[UPDATE ERROR] updateLead:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetches all audit activities for a specific lead.
 */
export async function fetchLeadActivities(leadId) {
  if (!isSupabaseConfigured() || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('lead_activities')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('[FETCH ERROR] fetchLeadActivities:', err);
    return [];
  }
}

/**
 * Fetches all private internal notes for a specific lead.
 */
export async function fetchLeadNotes(leadId) {
  if (!isSupabaseConfigured() || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('lead_notes')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('[FETCH ERROR] fetchLeadNotes:', err);
    return [];
  }
}

/**
 * Adds a private internal note for a lead and logs the activity.
 */
export async function addLeadNote(leadId, noteText, adminEmail = 'admin') {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, error: 'Database unavailable' };
  }

  try {
    const { data, error } = await supabase
      .from('lead_notes')
      .insert({
        lead_id: leadId,
        note: noteText.trim(),
        created_by: adminEmail
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logLeadActivity(
      leadId,
      'NOTE_ADDED',
      `Internal note added: "${noteText.trim().slice(0, 80)}${noteText.length > 80 ? '...' : ''}"`,
      adminEmail
    );

    return { success: true, note: data };
  } catch (err) {
    console.error('[INSERT ERROR] addLeadNote:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Logs an action in the lead_activities audit table.
 */
export async function logLeadActivity(leadId, activityType, description, createdBy = 'admin') {
  if (!isSupabaseConfigured() || !supabase) return;
  try {
    await supabase.from('lead_activities').insert({
      lead_id: leadId,
      activity_type: activityType,
      description: description,
      created_by: createdBy
    });
  } catch (err) {
    console.warn('[ACTIVITY LOG WARNING]', err);
  }
}

/**
 * Exports leads to a well-formatted CSV with correct string escaping.
 */
export function exportLeadsToCSV(leads) {
  if (!leads || !leads.length) return;

  const headers = [
    'Lead ID',
    'Created At',
    'Updated At',
    'Full Name',
    'Business Name',
    'Email',
    'Phone',
    'WhatsApp',
    'Business Type',
    'Location',
    'Has Website',
    'Current Website',
    'Website Condition',
    'Services Required',
    'Requirements',
    'Budget',
    'Timeline',
    'Lead Source',
    'Landing Page',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'Lead Score',
    'Temperature',
    'Status',
    'Follow-up Date',
    'Last Contacted'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map((l) => [
    escapeCSV(l.id),
    escapeCSV(new Date(l.created_at).toLocaleString()),
    escapeCSV(new Date(l.updated_at).toLocaleString()),
    escapeCSV(l.full_name),
    escapeCSV(l.business_name),
    escapeCSV(l.email),
    escapeCSV(l.phone),
    escapeCSV(l.whatsapp),
    escapeCSV(l.business_type),
    escapeCSV(l.business_location),
    escapeCSV(l.has_website ? 'YES' : 'NO'),
    escapeCSV(l.current_website_url),
    escapeCSV(l.website_condition),
    escapeCSV(Array.isArray(l.services_required) ? l.services_required.join('; ') : l.services_required),
    escapeCSV(l.project_description),
    escapeCSV(l.budget_range),
    escapeCSV(l.project_timeline),
    escapeCSV(l.lead_source),
    escapeCSV(l.landing_page),
    escapeCSV(l.utm_source),
    escapeCSV(l.utm_medium),
    escapeCSV(l.utm_campaign),
    escapeCSV(l.lead_score),
    escapeCSV(l.lead_temperature),
    escapeCSV(l.status),
    escapeCSV(l.follow_up_date || 'None'),
    escapeCSV(l.last_contacted_at ? new Date(l.last_contacted_at).toLocaleString() : 'Never')
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `lovish_crm_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
