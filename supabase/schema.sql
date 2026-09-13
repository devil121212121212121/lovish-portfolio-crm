-- ==============================================================================
-- LOVISH GARG | PRODUCTION CLIENT CRM DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ==============================================================================
-- Run this script in your Supabase SQL Editor.
-- Safe to execute on a fresh Supabase project.

-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create updated_at automatic trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Create LEADS Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Client Contact Details
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  
  -- Business Details
  business_name TEXT NOT NULL,
  business_type TEXT,
  business_location TEXT,
  business_description TEXT,
  
  -- Current Website Status
  has_website BOOLEAN DEFAULT FALSE,
  current_website_url TEXT,
  website_condition TEXT, -- e.g., 'NO_WEBSITE', 'OUTDATED', 'NEEDS_REDESIGN'
  
  -- Project Scope & Requirements
  services_required TEXT[] DEFAULT '{}',
  project_description TEXT,
  features_required TEXT[] DEFAULT '{}',
  preferred_style TEXT,
  budget_range TEXT,
  project_timeline TEXT, -- e.g., 'ASAP', '2-3_WEEKS', '1-2_MONTHS', 'FLEXIBLE'
  
  -- Source & Marketing Tracking
  lead_source TEXT DEFAULT 'Website Contact Form',
  landing_page TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  user_agent TEXT,
  device_type TEXT,
  
  -- Lead Scoring & Status
  lead_score INTEGER DEFAULT 0,
  lead_temperature TEXT CHECK (lead_temperature IN ('HOT', 'WARM', 'COLD')) DEFAULT 'COLD',
  status TEXT CHECK (status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST')) DEFAULT 'NEW',
  
  -- Pipeline Management
  last_contacted_at TIMESTAMPTZ,
  follow_up_date DATE,
  created_by TEXT DEFAULT 'public',
  updated_by TEXT
);

-- 4. Create LEAD_ACTIVITIES Table
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'LEAD_CREATED',
    'STATUS_CHANGED',
    'NOTE_ADDED',
    'WHATSAPP_CLICKED',
    'CALL_CLICKED',
    'EMAIL_CLICKED',
    'FOLLOW_UP_SET',
    'FOLLOW_UP_COMPLETED',
    'LEAD_UPDATED',
    'PROPOSAL_SENT',
    'WON',
    'LOST'
  )),
  description TEXT NOT NULL,
  created_by TEXT DEFAULT 'system'
);

-- 5. Create LEAD_NOTES Table (Private Internal Notes)
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  note TEXT NOT NULL,
  created_by TEXT DEFAULT 'admin'
);

-- 6. Add Triggers for updated_at
DROP TRIGGER IF EXISTS set_leads_updated_at ON leads;
CREATE TRIGGER set_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_lead_notes_updated_at ON lead_notes;
CREATE TRIGGER set_lead_notes_updated_at
BEFORE UPDATE ON lead_notes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 7. High-Performance Indexes for Scale
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_business_name ON leads(business_name);
CREATE INDEX IF NOT EXISTS idx_leads_follow_up_date ON leads(follow_up_date);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);

-- 8. Row Level Security (RLS) Configuration
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;

-- Leads RLS Policies:
-- Allow public visitors to submit new leads
DROP POLICY IF EXISTS "Allow public lead insert" ON leads;
CREATE POLICY "Allow public lead insert" ON leads
FOR INSERT
WITH CHECK (true);

-- Allow authenticated admin full access to leads (strictly restricted to authorized admin email)
DROP POLICY IF EXISTS "Allow authenticated admin full access on leads" ON leads;
CREATE POLICY "Allow authenticated admin full access on leads" ON leads
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' = 'garglovish938@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'garglovish938@gmail.com');

-- Lead Activities RLS Policies:
-- Allow insertion of initial lead activities on lead creation
DROP POLICY IF EXISTS "Allow insert activities on lead creation" ON lead_activities;
CREATE POLICY "Allow insert activities on lead creation" ON lead_activities
FOR INSERT
WITH CHECK (true);

-- Allow authenticated admin full access to activities (strictly restricted to authorized admin email)
DROP POLICY IF EXISTS "Allow authenticated admin full access on activities" ON lead_activities;
CREATE POLICY "Allow authenticated admin full access on activities" ON lead_activities
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' = 'garglovish938@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'garglovish938@gmail.com');

-- Lead Notes RLS Policies (STRICTLY PRIVATE - Only authorized admin):
DROP POLICY IF EXISTS "Allow authenticated admin full access on notes" ON lead_notes;
CREATE POLICY "Allow authenticated admin full access on notes" ON lead_notes
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' = 'garglovish938@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'garglovish938@gmail.com');

-- 9. Realtime Publication Setup
-- Enable Supabase Realtime for instant dashboard updates without page reloads
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'leads'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE leads;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'lead_activities'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE lead_activities;
  END IF;
END $$;
