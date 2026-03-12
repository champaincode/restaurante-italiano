import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Reservation {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  cancelled_by?: 'customer' | 'restaurant';
  cancelled_at?: string;
  attended?: boolean;
  attended_at?: string;
  updated_at: string;
}

export interface ReservationInsert {
  name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  message?: string;
}
