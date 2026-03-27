'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function FooterCTA() {
  const { t, isSpanish } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission - will be connected to API later
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', phone: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="bg-dark-footer section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-display-lg text-cream mb-4"
          >
            {t('contact.headline')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-warm-taupe/80 text-lg mb-10"
          >
            {t('contact.subheadline')}
          </motion.p>

          {/* Click to Call - Mobile Prominent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 md:hidden"
          >
            <a
              href="tel:8328947676"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-accent text-dark-footer rounded-full font-semibold text-lg hover:bg-gold-accent/90 transition-colors shadow-lg"
            >
              <Phone className="w-6 h-6" />
              {isSpanish ? 'Llámame Ahora' : 'Call Me Now'}
            </a>
            <p className="text-warm-taupe/60 text-sm mt-3">832-894-7676</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isSubmitted ? (
              <div className="bg-success/10 border border-success/30 rounded-xl p-6">
                <p className="text-cream font-medium">
                  {t('contact.success')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1">
                  <label htmlFor="cta-name" className="sr-only">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="cta-name"
                    placeholder={t('contact.name')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-white/10 border border-warm-taupe/20 text-cream placeholder:text-warm-taupe/50 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent transition-all"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cta-phone" className="sr-only">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    id="cta-phone"
                    placeholder={t('contact.phone')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-white/10 border border-warm-taupe/20 text-cream placeholder:text-warm-taupe/50 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent transition-all"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>{isSpanish ? 'Enviando...' : 'Sending...'}</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('contact.submit')}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Desktop phone */}
            <div className="hidden md:flex items-center justify-center gap-2 mt-6">
              <Phone className="w-4 h-4 text-warm-taupe/60" />
              <span className="text-warm-taupe/60">
                {isSpanish ? 'O llama directamente:' : 'Or call directly:'}
              </span>
              <a
                href="tel:8328947676"
                className="text-gold-accent hover:text-cream transition-colors font-medium"
              >
                832-894-7676
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
