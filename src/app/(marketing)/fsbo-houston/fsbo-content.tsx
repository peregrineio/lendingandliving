'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Search,
  CheckCircle,
  FileCheck,
  Home,
  ArrowRight,
  AlertTriangle,
  Phone,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Header, Footer } from '@/components/layout';

export function FSBOContent() {
  const { language, isSpanish } = useLanguage();
  const t = translations[language].fsbo;

  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const offersRef = useRef(null);
  const hookRef = useRef(null);
  const trustRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const problemInView = useInView(problemRef, { once: true, margin: '-100px' });
  const offersInView = useInView(offersRef, { once: true, margin: '-100px' });
  const hookInView = useInView(hookRef, { once: true, margin: '-100px' });
  const trustInView = useInView(trustRef, { once: true, margin: '-100px' });

  const cards = [
    {
      icon: Search,
      title: t.card1_title,
      body: t.card1_body,
    },
    {
      icon: FileCheck,
      title: t.card2_title,
      body: t.card2_body,
    },
    {
      icon: Home,
      title: t.card3_title,
      body: t.card3_body,
    },
  ];

  const trustPoints = [t.trust1, t.trust2, t.trust3];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative bg-deep-brown py-20 md:py-28 overflow-hidden"
        >
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-brown via-deep-brown/95 to-deep-brown/90" />

          <div className="section-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-display-lg text-white mb-6">
                {t.hero_headline}
              </h1>
              <p className="text-xl text-gold-accent font-display mb-4">
                {t.hero_sub}
              </p>
              <p className="text-lg text-warm-taupe mb-8">{t.hero_body}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#verify-buyer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  {t.cta_verify}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact?purpose=fsbo"
                  className="border-2 border-white text-white hover:bg-white hover:text-deep-brown transition-colors px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center gap-2"
                >
                  {t.cta_talk}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem Section */}
        <section ref={problemRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-display-md text-deep-brown mb-6">
                {t.problem_headline}
              </h2>
              <p className="text-lg text-text-muted mb-8">{t.problem_body}</p>

              <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm">
                <p className="text-2xl font-display text-deep-brown font-semibold">
                  {t.problem_stat}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Daisy Offers Section */}
        <section ref={offersRef} className="section-padding bg-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={offersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-md text-deep-brown">
                {t.offers_headline}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={offersInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-cream rounded-xl border border-brand-border p-8 text-center"
                >
                  <div className="w-14 h-14 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <card.icon className="w-7 h-7 text-gold-accent" />
                  </div>
                  <h3 className="font-display text-xl text-deep-brown mb-4">
                    {card.title}
                  </h3>
                  <p className="text-text-muted">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Hook Section */}
        <section
          ref={hookRef}
          id="verify-buyer"
          className="section-padding bg-deep-brown"
        >
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hookInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-display-md text-white mb-6">
                {t.hook_headline}
              </h2>
              <p className="text-lg text-warm-taupe mb-10">{t.hook_body}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact?purpose=fsbo-buyer-check"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  {t.cta_check}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact?purpose=pre-approval"
                  className="border-2 border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-deep-brown transition-colors px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center gap-2"
                >
                  {t.cta_preapproval}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Builders Section */}
        <section ref={trustRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={trustInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <ul className="space-y-4">
                {trustPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={trustInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-white rounded-lg border border-brand-border p-4"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-deep-brown">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Compliance Footer Section */}
        <section className="section-padding bg-white border-t border-brand-border">
          <div className="section-container">
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-medium text-deep-brown mb-2">
                Daisy Castro | NMLS #2592627
              </p>
              <p className="text-sm text-text-muted mb-4">
                {isSpanish
                  ? 'Los préstamos hipotecarios son originados a través de Matador Lending, NMLS #1871433, un corredor hipotecario con licencia.'
                  : 'Mortgage loans are originated through Matador Lending, NMLS #1871433, a licensed mortgage broker.'}
              </p>
              <p className="text-sm text-text-muted">
                {isSpanish ? 'Oportunidad Igual de Vivienda' : 'Equal Housing Opportunity'}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
