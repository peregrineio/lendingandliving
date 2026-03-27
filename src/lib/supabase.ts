import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Lazy initialization to avoid build-time errors
let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

function getSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }
  return _supabaseAdmin;
}

// Export getters for lazy initialization
export const supabase = { get: getSupabaseClient };
export const supabaseAdmin = { get: getSupabaseAdmin };

// Types for our database
export interface Lead {
  id?: string;
  created_at?: string;
  first_name: string;
  phone: string;
  email?: string | null;
  best_time?: string | null;
  purpose?: string | null;
  message?: string | null;
  source_page?: string | null;
  language?: string;
  status?: string;
}

// Lead management functions
export async function insertLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
  const admin = getSupabaseAdmin();

  if (!admin) {
    console.warn('Supabase admin client not configured - lead not saved to database');
    return { success: true }; // Don't fail if Supabase isn't configured
  }

  const { error } = await admin.from('leads').insert({
    first_name: lead.first_name,
    phone: lead.phone,
    email: lead.email || null,
    best_time: lead.best_time || null,
    purpose: lead.purpose || null,
    message: lead.message || null,
    source_page: lead.source_page || null,
    language: lead.language || 'en',
    status: 'new',
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getLeads(status?: string): Promise<Lead[]> {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return [];
  }

  let query = admin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase query error:', error);
    return [];
  }

  return data || [];
}

export async function updateLeadStatus(id: string, status: string): Promise<boolean> {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return false;
  }

  const { error } = await admin
    .from('leads')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Supabase update error:', error);
    return false;
  }

  return true;
}
