import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
