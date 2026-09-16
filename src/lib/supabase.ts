import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// App imports all route modules up front, so this module always loads. A hard
// throw here blanked the UI when .env was missing. Use placeholders so the
// marketing site runs locally; real Supabase calls fail until env is set.
const resolvedUrl = isSupabaseConfigured
  ? supabaseUrl!
  : 'https://local-dev-placeholder.supabase.co';

const resolvedKey = isSupabaseConfigured
  ? supabaseAnonKey!
  : 'local-dev-placeholder-anon-key';

export const supabase = createClient(resolvedUrl, resolvedKey);

export interface TripRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travel_start_date?: string;
  travel_end_date?: string;
  number_of_travelers: number;
  budget?: string;
  trip_type: string;
  additional_notes?: string;
  status?: string;
  created_at?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  subscribed_at?: string;
  is_active?: boolean;
}
