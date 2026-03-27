'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2, CheckCircle, Send } from 'lucide-react';
import { trackFormSubmit } from '@/lib/analytics';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  phone: z.string().min(10, 'Valid phone number required').regex(/^[\d\s\-\(\)]+$/, 'Invalid phone format'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  bestTime: z.string().min(1, 'Please select a time'),
  purpose: z.string().min(1, 'Please select a purpose'),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const timeOptions = {
  en: ['Morning (9am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-8pm)', 'Anytime'],
  es: ['Mañana (9am-12pm)', 'Tarde (12pm-5pm)', 'Noche (5pm-8pm)', 'Cualquier hora'],
};

const purposeOptions = {
  en: ['Buy a Home', 'Refinance', 'Check DPA Eligibility', 'ITIN Loan Inquiry', 'General Question'],
  es: ['Comprar una Casa', 'Refinanciamiento', 'Verificar Elegibilidad DPA', 'Consulta de Préstamo ITIN', 'Pregunta General'],
};

export function ContactForm() {
  const { language, isSpanish, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          language: language,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : undefined,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      // Track form submission analytics
      trackFormSubmit(data.purpose, language);

      setIsSuccess(true);
      reset();
    } catch {
      setError(isSpanish ? 'Hubo un error. Por favor intenta de nuevo.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-display text-xl text-deep-brown mb-2">
          {isSpanish ? '¡Mensaje Enviado!' : 'Message Sent!'}
        </h3>
        <p className="text-text-muted">
          {t('contact.success')}
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm text-gold-accent hover:underline"
        >
          {isSpanish ? 'Enviar otro mensaje' : 'Send another message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-deep-brown mb-1">
          {t('contact.name')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('firstName')}
          className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-brand-border'} bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all`}
          placeholder={isSpanish ? 'Tu nombre' : 'Your name'}
        />
        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-deep-brown mb-1">
          {t('contact.phone')} <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register('phone')}
          className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-brand-border'} bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all`}
          placeholder="(832) 555-1234"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      {/* Email (optional) */}
      <div>
        <label className="block text-sm font-medium text-deep-brown mb-1">
          Email <span className="text-text-muted text-xs">({isSpanish ? 'opcional' : 'optional'})</span>
        </label>
        <input
          type="email"
          {...register('email')}
          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-brand-border'} bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all`}
          placeholder="you@email.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* Best Time */}
      <div>
        <label className="block text-sm font-medium text-deep-brown mb-1">
          {t('contact.timing')} <span className="text-red-500">*</span>
        </label>
        <select
          {...register('bestTime')}
          className={`w-full px-4 py-3 rounded-lg border ${errors.bestTime ? 'border-red-500' : 'border-brand-border'} bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all`}
        >
          <option value="">{isSpanish ? 'Selecciona una opción' : 'Select an option'}</option>
          {timeOptions[language].map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>
        {errors.bestTime && <p className="text-red-500 text-xs mt-1">{errors.bestTime.message}</p>}
      </div>

      {/* Purpose */}
      <div>
        <label className="block text-sm font-medium text-deep-brown mb-1">
          {t('contact.purpose')} <span className="text-red-500">*</span>
        </label>
        <select
          {...register('purpose')}
          className={`w-full px-4 py-3 rounded-lg border ${errors.purpose ? 'border-red-500' : 'border-brand-border'} bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all`}
        >
          <option value="">{isSpanish ? 'Selecciona una opción' : 'Select an option'}</option>
          {purposeOptions[language].map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>
        {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose.message}</p>}
      </div>

      {/* Message (optional) */}
      <div>
        <label className="block text-sm font-medium text-deep-brown mb-1">
          {isSpanish ? 'Mensaje' : 'Message'} <span className="text-text-muted text-xs">({isSpanish ? 'opcional' : 'optional'})</span>
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all resize-none"
          placeholder={isSpanish ? 'Cuéntame más sobre tu situación...' : 'Tell me more about your situation...'}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-gold-accent text-dark-footer rounded-lg font-semibold hover:bg-gold-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {isSpanish ? 'Enviando...' : 'Sending...'}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t('contact.submit')}
          </>
        )}
      </button>
    </form>
  );
}
