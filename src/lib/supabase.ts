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

// Map the form's purpose string to the platform's loan_interest enum
function purposeToInterest(purpose?: string | null): string {
  const p = (purpose ?? '').toLowerCase();
  if (p.includes('dpa') || p.includes('elegibilidad')) return 'dpa';
  if (p.includes('itin')) return 'itin';
  if (p.includes('refi')) return 'refinance';
  if (p.includes('buy') || p.includes('home') || p.includes('comprar') || p.includes('casa')) return 'purchase';
  return 'unknown';
}

export interface WebsiteConsentPayload {
  granted: boolean;
  disclosureVersion: string;
  disclosureText: string;
  sourceUrl?: string | null;
  ip?: string | null;
  userAgent?: string | null;
}

/**
 * Writes the lead into the SHARED platform Supabase project (contacts +
 * consents + interactions) using the ANON key — inserts are allowed by
 * narrow RLS policies (lead_provenance='website_form' only); anon can never
 * read anything back. No service-role key needed on the website.
 */
export async function insertLead(
  lead: Omit<Lead, 'id' | 'created_at'>,
  consent?: WebsiteConsentPayload
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();

  if (!client) {
    console.warn('Supabase client not configured - lead not saved to database');
    return { success: true }; // Don't fail the form if Supabase isn't configured
  }

  const notesParts = [
    lead.message ? `Message: ${lead.message}` : null,
    lead.purpose ? `Purpose: ${lead.purpose}` : null,
    lead.best_time ? `Best time to call: ${lead.best_time}` : null,
  ].filter(Boolean);

  const { data: contact, error } = await client
    .from('contacts')
    .insert({
      first_name: lead.first_name,
      phone: lead.phone,
      email: lead.email || null,
      language_preference: lead.language === 'es' ? 'es' : 'en',
      segment: 'new_lead',
      loan_interest: purposeToInterest(lead.purpose),
      lead_source: 'website',
      lead_provenance: 'website_form',
      source_page: lead.source_page || null,
      data_class: 'tdpsa',
      notes: notesParts.length ? notesParts.join('\n') : null,
    })
    .select('id')
    .single();

  if (error || !contact) {
    console.error('Supabase insert error:', error);
    return { success: false, error: error?.message };
  }

  // Consent rows only when the box was checked — an unconsented lead is
  // captured but has NO consent row (visibly distinguishable, not contactable).
  if (consent?.granted) {
    for (const channel of ['email', 'sms'] as const) {
      const { error: consentError } = await client.from('consents').insert({
        contact_id: contact.id,
        channel,
        status: 'granted',
        disclosure_version: consent.disclosureVersion,
        disclosure_text_snapshot: consent.disclosureText,
        source_url: consent.sourceUrl ?? null,
        ip_address: consent.ip ?? null,
        user_agent: consent.userAgent ?? null,
      });
      if (consentError) console.error(`Supabase ${channel} consent insert error:`, consentError);
    }
  }

  const { error: interactionError } = await client.from('interactions').insert({
    contact_id: contact.id,
    type: 'form_submission',
    summary: `Website form submission (${lead.source_page ?? 'unknown page'})`,
    created_by: 'website',
  });
  if (interactionError) console.error('Supabase interaction insert error:', interactionError);

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
