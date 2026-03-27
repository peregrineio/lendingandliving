'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Stat data
const stats = [
  { valueKey: 'stat1_value', labelKey: 'stat1' },
  { valueKey: 'stat2_value', labelKey: 'stat2' },
  { valueKey: 'stat3_value', labelKey: 'stat3' },
];

export function DPASpotlight() {
  const { t, isSpanish } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - will be connected to API later
    console.log('DPA Quick Form:', formData);
  };

  return (
    <section ref={sectionRef} className="bg-deep-brown section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(201, 146, 42, 0.15) 0%, transparent 50%)',
        }}
      />

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-display-lg text-cream mb-4">
                <span className="text-gold-accent">{t('dpa.headline').split(' ').slice(0, 3).join(' ')}</span>{' '}
                {t('dpa.headline').split(' ').slice(3).join(' ')}
              </h2>
              <p className="text-lg text-warm-taupe/80 leading-relaxed">
                {t('dpa.subheadline')}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-display text-3xl md:text-4xl text-gold-accent font-bold">
                    {t(`dpa.${stat.valueKey}`)}
                  </p>
                  <p className="text-sm text-warm-taupe/70 mt-1">
                    {t(`dpa.${stat.labelKey}`)}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/services/down-payment-assistance-houston"
                className="inline-flex items-center gap-2 text-gold-accent hover:text-cream transition-colors group"
              >
                <span className="font-medium">
                  {isSpanish ? 'Aprende Más Sobre DPA' : 'Learn More About DPA'}
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right - CTA Card with Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-cream rounded-2xl p-8 shadow-xl">
              <h3 className="font-display text-2xl text-deep-brown mb-2">
                {t('dpa.cta')}
              </h3>
              <p className="text-text-muted mb-6">
                {isSpanish
                  ? 'Completa el formulario rápido y te contactaremos.'
                  : 'Fill out the quick form and we\'ll be in touch.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="dpa-name" className="sr-only">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="dpa-name"
                    placeholder={t('contact.name')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-brand-border bg-white text-text-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dpa-phone" className="sr-only">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    id="dpa-phone"
                    placeholder={t('contact.phone')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-brand-border bg-white text-text-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent transition-all"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  {t('dpa.cta')}
                </button>
              </form>

              <p className="text-xs text-text-muted mt-4 text-center">
                {isSpanish
                  ? 'Responderemos en 24 horas o menos.'
                  : 'We\'ll respond within 24 hours.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
