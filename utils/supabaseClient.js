import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  cookies: {
    secure: false, // Only for local development without HTTPS
  },
});