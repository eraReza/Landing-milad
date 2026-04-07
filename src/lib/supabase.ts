import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export const STORAGE_BUCKET = 'images';

export function getSupabase(): SupabaseClient | null {
  if (!supabaseClient) {
    // @ts-ignore
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    // @ts-ignore
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    }
  }
  return supabaseClient;
}
