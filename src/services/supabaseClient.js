import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').toString();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').toString();

// Clean up any BOM or whitespace characters introduced during environment variable injection
export const cleanSupabaseUrl = rawUrl.replace(/^[\uFEFF\u00EF\u00BB\u00BF\s]+/, '').trim();
export const cleanSupabaseAnonKey = rawKey.replace(/^[\uFEFF\u00EF\u00BB\u00BF\s]+/, '').trim();

export const isSupabaseConfigured = () => {
  return Boolean(
    cleanSupabaseUrl && 
    cleanSupabaseAnonKey && 
    cleanSupabaseUrl.includes('supabase.co') &&
    !cleanSupabaseUrl.includes('your-project-id')
  );
};

// Create Supabase client with auth persistence and realtime enabled
export const supabase = isSupabaseConfigured()
  ? createClient(cleanSupabaseUrl, cleanSupabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null;
