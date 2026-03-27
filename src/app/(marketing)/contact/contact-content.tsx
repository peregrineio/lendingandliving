'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ContactForm } from '@/components/forms/ContactForm';

const contactInfo = {
  en: {
    phone: '832-894-7676',
    email: 'Daisy@matadorlending.com',
    address: '5718 Westheimer Rd Suite 1000, Houston TX 77057',
    hours: 'Mon–Fri 9am–6pm, Sat by appointment',
  },
  es: {
    phone: '832-894-7676',
    email: 'Daisy@matadorlending.com',
    address: '5718 Westheimer Rd Suite 1000, Houston TX 77057',
    hours: 'Lun–Vie 9am–6pm, Sáb con cita',
  },
};

function JsonLdSchema() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Lending & Living - Daisy Castro',
    telephone: '832-894-7676',
    email: 'Daisy@matadorlending.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5718 Westheimer Rd Suite 1000',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77057',
      addressCountry: 'US',
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 29.7372,
      longitude: -95.4702,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />;
}

export function ContactContent() {
  const { language, isSpanish, t } = useLanguage();
  const heroRef = useRef(null);
  const formRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: '-100px' });

  const info = contactInfo[language];

  return (
    <>
      <JsonLdSchema />
      <div className="pt-20 md:pt-24">
        {/* Hero */}
        <section ref={heroRef} className="bg-cream py-12 md:py-16">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
              <h1 className="text-display-xl text-deep-brown mb-4">{t('contact.headline')}</h1>
              <p className="text-lg text-text-muted">{t('contact.subheadline')}</p>
            </motion.div>
          </div>
        </section>

        {/* Form + Info Grid */}
        <section ref={formRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-[1fr_400px] gap-12">
              {/* Form Column */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={formInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-border">
                  <h2 className="font-display text-2xl text-deep-brown mb-6">
                    {isSpanish ? 'Envíame un Mensaje' : 'Send Me a Message'}
                  </h2>
                  <ContactForm />
                </div>
              </motion.div>

              {/* Info Column */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={formInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
                {/* Phone CTA */}
                <div className="bg-deep-brown rounded-2xl p-6 text-center">
                  <Phone className="w-10 h-10 text-gold-accent mx-auto mb-4" />
                  <p className="text-warm-taupe/80 text-sm mb-2">
                    {isSpanish ? '¿Prefieres hablar?' : 'Prefer to talk?'}
                  </p>
                  <a href={`tel:${info.phone.replace(/-/g, '')}`} className="block text-3xl font-display text-cream hover:text-gold-accent transition-colors">
                    {info.phone}
                  </a>
                  <p className="text-gold-accent text-sm mt-2 font-cormorant italic">
                    {isSpanish ? 'Hablamos Español' : 'Se Habla Español'}
                  </p>
                </div>

                {/* Contact Info Card */}
                <div className="bg-cream rounded-2xl p-6">
                  <h3 className="font-display text-lg text-deep-brown mb-4">
                    {isSpanish ? 'Información de Contacto' : 'Contact Information'}
                  </h3>
                  <div className="space-y-4">
                    <a href={`mailto:${info.email}`} className="flex items-start gap-3 group">
                      <Mail className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-muted group-hover:text-gold-accent transition-colors">{info.email}</span>
                    </a>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-muted">{info.address}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-muted">{info.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="rounded-2xl overflow-hidden border border-brand-border h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.3!2d-95.47!3d29.737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ0JzEzLjIiTiA5NcKwMjgnMTIuNyJX!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                </div>

                {/* Trust Bar */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-gold-accent" />
                    NMLS #2592627
                  </span>
                  <span>Matador Lending NMLS #1871433</span>
                  <span>Equal Housing Opportunity</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
