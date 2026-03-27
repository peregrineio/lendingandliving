import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { insertLead } from '@/lib/supabase';
import { sendLeadNotification, sendLeadAutoReply } from '@/lib/email';

const contactSchema = z.object({
  firstName: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  bestTime: z.string().min(1),
  purpose: z.string().min(1),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
  language: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const data = contactSchema.parse(body);

    // Save to Supabase
    const result = await insertLead({
      first_name: data.firstName,
      phone: data.phone,
      email: data.email || null,
      best_time: data.bestTime,
      purpose: data.purpose,
      message: data.message || null,
      source_page: data.sourcePage || null,
      language: data.language || 'en',
    });

    if (!result.success) {
      console.error('Failed to save lead:', result.error);
      // Continue anyway - we don't want form submission to fail if DB is down
    }

    // Send email notification to Daisy
    await sendLeadNotification(data);

    // Send auto-reply to prospect if they provided email
    if (data.email) {
      await sendLeadAutoReply(data);
    }

    // Log for development
    console.log('New contact form submission:', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
