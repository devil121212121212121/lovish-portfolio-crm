import { createClient } from '@supabase/supabase-js';

// Server-side lead calculation & validation
function calculateLeadScoreAndTemp(data) {
  let score = 0;

  // +20 No website
  const hasNoWebsite = data.has_website === false || data.website_condition === 'NO_WEBSITE' || !data.has_website;
  if (hasNoWebsite) score += 20;

  // +20 Budget $1,000+
  const b = (data.budget_range || '').toLowerCase();
  if (b.includes('1,000') || b.includes('1,500') || b.includes('1000') || b.includes('1500') || b.includes('$1,000+')) {
    score += 20;
  } else if (b.includes('500')) {
    score += 10;
  }

  // +15 ASAP timeline
  const tl = (data.project_timeline || '').toUpperCase();
  if (tl.includes('ASAP') || tl.includes('URGENT') || tl.includes('IMMEDIATE')) {
    score += 15;
  } else if (tl.includes('WEEKS') || tl.includes('MONTH')) {
    score += 10;
  }

  // +15 Detailed requirements
  const desc = (data.project_description || data.message || '').trim();
  if (desc.length >= 50) {
    score += 15;
  } else if (desc.length > 15) {
    score += 5;
  }

  // +10 Phone provided
  const phone = (data.phone || data.whatsapp || '').trim();
  if (phone.length >= 7) score += 10;

  // +10 Business name provided
  const biz = (data.business_name || '').trim();
  if (biz.length >= 2) score += 10;

  // +10 Services clearly selected
  const services = Array.isArray(data.services_required) ? data.services_required : (data.service_needed ? [data.service_needed] : []);
  if (services.length > 0) score += 10;

  // Cap at 100
  score = Math.min(100, score);

  let temperature = 'COLD';
  if (score >= 80) temperature = 'HOT';
  else if (score >= 60) temperature = 'WARM';

  return { score, temperature };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// In-memory rate limiting map: IP -> array of timestamps
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

function sanitizeText(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // strip HTML tags
    .replace(/[<>]/g, '')     // strip remaining angle brackets
    .trim()
    .slice(0, maxLen);
}

function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  // Reject unsafe protocol schemes (javascript:, data:, vbscript:)
  if (/^(javascript|data|vbscript):/i.test(trimmed)) {
    return null;
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed.slice(0, 200)}`;
  }
  return trimmed.slice(0, 250);
}

// Serverless Handler compatible with Vercel and local Vite dev server
export default async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    // Check Client IP for rate limiting
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                     req.headers['x-real-ip'] || 
                     req.connection?.remoteAddress || 
                     'unknown';

    if (isRateLimited(clientIp)) {
      console.warn(`[RATE LIMIT EXCEEDED] IP: ${clientIp}`);
      return res.status(429).json({ 
        error: 'Too many requests. Please wait a few minutes before submitting again.' 
      });
    }

    let payload = req.body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (err) {
        payload = {};
      }
    }
    payload = payload || {};

    // 1. Spam Prevention: Honeypot Check
    if (payload.website_hp && payload.website_hp.trim() !== '') {
      console.warn('[SPAM DETECTED] Honeypot triggered. Silently rejecting.');
      return res.status(200).json({ success: true, message: 'Inquiry received.' });
    }

    // 2. Validate & Sanitize Required Fields
    const fullName = sanitizeText(payload.full_name || payload.name || '', 100);
    const email = (payload.email || '').trim().toLowerCase().slice(0, 150);
    const businessName = sanitizeText(payload.business_name || payload.business || '', 120);
    const phone = sanitizeText(payload.phone || payload.whatsapp || payload.contact || '', 30);

    if (!fullName) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    if (!businessName) {
      return res.status(400).json({ error: 'Business name is required.' });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    // 3. Initialize Supabase Server Client
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('[CONFIG ERROR] Supabase URL or Key is missing in server environment.');
      return res.status(500).json({
        error: 'Database configuration missing on server. Please ensure Supabase environment variables are configured in Vercel or .env.'
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });

    // 4. Calculate Lead Score & Temperature
    const { score: leadScore, temperature: leadTemperature } = calculateLeadScoreAndTemp({
      ...payload,
      full_name: fullName,
      business_name: businessName,
      phone: phone
    });

    // Format services
    let services = [];
    if (Array.isArray(payload.services_required)) {
      services = payload.services_required.map(s => sanitizeText(s, 60));
    } else if (payload.serviceNeeded) {
      services = [sanitizeText(payload.serviceNeeded, 60)];
    } else if (payload.need) {
      services = [sanitizeText(payload.need, 60)];
    }

    const rawWebsite = payload.current_website_url || payload.websiteUrl;
    const cleanWebsiteUrl = sanitizeUrl(rawWebsite);

    const sanitizedData = {
      full_name: fullName,
      email: email,
      phone: phone || null,
      whatsapp: sanitizeText(payload.whatsapp || phone || '', 30) || null,
      business_name: businessName,
      business_type: sanitizeText(payload.business_type || payload.businessType || 'Small Business', 60),
      business_location: sanitizeText(payload.business_location || payload.location || '', 100) || null,
      business_description: sanitizeText(payload.business_description || '', 500) || null,
      has_website: payload.has_website === true || payload.website_condition === 'OUTDATED',
      current_website_url: cleanWebsiteUrl,
      website_condition: sanitizeText(payload.website_condition || (payload.has_website ? 'OUTDATED' : 'NO_WEBSITE'), 40),
      services_required: services,
      project_description: sanitizeText(payload.project_description || payload.message || '', 2500),
      features_required: Array.isArray(payload.features_required) ? payload.features_required.map(f => sanitizeText(f, 60)) : [],
      preferred_style: sanitizeText(payload.preferred_style || '', 80) || null,
      budget_range: sanitizeText(payload.budget_range || payload.budgetRange || '$500–$1,000', 50),
      project_timeline: sanitizeText(payload.project_timeline || payload.timeline || 'ASAP', 50),
      lead_source: sanitizeText(payload.lead_source || 'Website Contact Form', 80),
      landing_page: sanitizeText(payload.landing_page || '/', 100),
      referrer: sanitizeUrl(payload.referrer),
      utm_source: sanitizeText(payload.utm_source || '', 50) || null,
      utm_medium: sanitizeText(payload.utm_medium || '', 50) || null,
      utm_campaign: sanitizeText(payload.utm_campaign || '', 50) || null,
      utm_term: sanitizeText(payload.utm_term || '', 50) || null,
      utm_content: sanitizeText(payload.utm_content || '', 50) || null,
      user_agent: sanitizeText(req.headers['user-agent'] || '', 250) || null,
      device_type: req.headers['sec-ch-ua-mobile'] === '?1' ? 'Mobile' : 'Desktop',
      lead_score: leadScore,
      lead_temperature: leadTemperature,
      status: 'NEW',
      updated_at: new Date().toISOString()
    };

    // 5. Duplicate Detection by Email or Phone
    let existingLeadQuery = supabase.from('leads').select('id, full_name, email, phone, business_name, lead_score').eq('email', email);
    const { data: duplicateByEmail } = await existingLeadQuery;

    let duplicateLead = duplicateByEmail && duplicateByEmail.length > 0 ? duplicateByEmail[0] : null;

    if (!duplicateLead && phone && phone.length >= 7) {
      const { data: duplicateByPhone } = await supabase.from('leads').select('id, full_name, email, phone, business_name, lead_score').eq('phone', phone);
      if (duplicateByPhone && duplicateByPhone.length > 0) {
        duplicateLead = duplicateByPhone[0];
      }
    }

    let finalLeadId = null;
    let isDuplicate = false;

    if (duplicateLead) {
      // Duplicate found: PRESERVE original lead, update relevant fields, log activity
      isDuplicate = true;
      finalLeadId = duplicateLead.id;

      await supabase
        .from('leads')
        .update({
          business_name: businessName || duplicateLead.business_name,
          budget_range: sanitizedData.budget_range,
          services_required: sanitizedData.services_required,
          project_description: sanitizedData.project_description,
          lead_score: Math.max(duplicateLead.lead_score || 0, leadScore),
          lead_temperature: leadTemperature,
          updated_at: new Date().toISOString()
        })
        .eq('id', finalLeadId);

      // Record activity in lead_activities
      await supabase.from('lead_activities').insert({
        lead_id: finalLeadId,
        activity_type: 'LEAD_UPDATED',
        description: `Subsequent enquiry received from ${sanitizedData.lead_source}. Budget: ${sanitizedData.budget_range}. Requirements: "${sanitizedData.project_description.slice(0, 120)}..."`,
        created_by: 'system'
      });
    } else {
      // Fresh new lead: insert record
      const { data: insertedLead, error: insertError } = await supabase
        .from('leads')
        .insert(sanitizedData)
        .select('id')
        .single();

      if (insertError) {
        console.error('[DATABASE ERROR] Failed to insert lead:', insertError);
        return res.status(500).json({ error: 'Database insert failed. Please try again later.' });
      }

      finalLeadId = insertedLead.id;

      // Record LEAD_CREATED in lead_activities
      await supabase.from('lead_activities').insert({
        lead_id: finalLeadId,
        activity_type: 'LEAD_CREATED',
        description: `Lead created via ${sanitizedData.lead_source}. Initial Score: ${leadScore}/100 (${leadTemperature}).`,
        created_by: 'system'
      });
    }

    // 6. Real Email Notification to garglovish938@gmail.com (via Resend if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Lovish Studio Leads <leads@resend.dev>',
            to: ['garglovish938@gmail.com'],
            subject: `🚀 New Website Lead — ${businessName} (${leadTemperature} • Score ${leadScore})`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #0b0f17; color: #f1f5f9;">
                <h2 style="color: #06b6d4; margin-top: 0;">🚀 New Client Lead Received!</h2>
                <div style="background: #121824; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 4px 0;"><strong>Name:</strong> ${fullName}</p>
                  <p style="margin: 4px 0;"><strong>Business:</strong> ${businessName}</p>
                  <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
                  <p style="margin: 4px 0;"><strong>Phone / WhatsApp:</strong> <a href="tel:${phone}" style="color: #10b981;">${phone || 'Not provided'}</a></p>
                  <p style="margin: 4px 0;"><strong>Lead Score:</strong> <span style="color: #f59e0b; font-weight: bold;">${leadScore}/100 (${leadTemperature})</span></p>
                </div>
                <div style="background: #121824; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 4px 0;"><strong>Website Status:</strong> ${sanitizedData.website_condition} ${sanitizedData.current_website_url ? `(${sanitizedData.current_website_url})` : ''}</p>
                  <p style="margin: 4px 0;"><strong>Services Required:</strong> ${services.join(', ') || 'Custom Website'}</p>
                  <p style="margin: 4px 0;"><strong>Budget:</strong> ${sanitizedData.budget_range}</p>
                  <p style="margin: 4px 0;"><strong>Timeline:</strong> ${sanitizedData.project_timeline}</p>
                  <p style="margin: 4px 0;"><strong>Source:</strong> ${sanitizedData.lead_source}</p>
                </div>
                <div style="background: #121824; padding: 15px; border-radius: 8px;">
                  <p style="margin: 4px 0; color: #94a3b8;"><strong>Requirements:</strong></p>
                  <p style="margin: 8px 0; line-height: 1.5;">${sanitizedData.project_description || 'No additional details provided.'}</p>
                </div>
                <p style="font-size: 11px; color: #64748b; margin-top: 25px;">Lovish Garg Client CRM • Captured on ${new Date().toLocaleString()}</p>
              </div>
            `
          })
        });
      } catch (emailErr) {
        console.warn('[EMAIL WARNING] Resend notification failed:', emailErr);
      }
    }

    // Return clean success response
    return res.status(200).json({
      success: true,
      id: finalLeadId,
      is_duplicate: isDuplicate,
      lead_score: leadScore,
      lead_temperature: leadTemperature,
      message: isDuplicate ? 'Inquiry logged to existing profile.' : 'Lead created successfully.'
    });

  } catch (error) {
    console.error('[UNHANDLED SERVER ERROR] /api/leads:', error);
    return res.status(500).json({ error: 'An unexpected error occurred while processing the lead.' });
  }
}
