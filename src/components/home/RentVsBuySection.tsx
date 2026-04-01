'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Home, DollarSign, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export function RentVsBuySection() {
  const { language, isSpanish } = useLanguage();
  const t = translations[language].rentVsBuy;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="section-padding bg-cream">
      <div className="section-container">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display-lg text-deep-brown mb-6">
              {t.headline}
            </h2>
            <p className="text-lg text-text-muted mb-8 max-w-lg">
              {t.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/resources#mortgage-calculator"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                {t.cta_primary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                {t.cta_secondary}
              </Link>
            </div>
          </motion.div>

          {/* Right - Visual Comparison Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-lg"
          >
            <div className="grid grid-cols-2">
              {/* Renting Column */}
              <div className="p-6 border-r border-brand-border bg-warm-white/50">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-text-muted/10 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-text-muted" />
                  </div>
                  <h3 className="font-display text-lg text-deep-brown mb-2">
                    {t.rent_label}
                  </h3>
                  <div className="h-px w-12 bg-text-muted/30 mx-auto mb-4" />
                  <p className="text-sm text-text-muted mb-6">
                    {t.rent_desc}
                  </p>
                  <div className="bg-cream rounded-lg p-4">
                    <p className="font-semibold text-deep-brown text-lg">
                      {t.rent_monthly}
                    </p>
                    <p className="text-sm text-red-500 font-medium mt-1">
                      {t.rent_equity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Owning Column */}
              <div className="p-6 bg-gold-accent/5">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Home className="w-6 h-6 text-gold-accent" />
                  </div>
                  <h3 className="font-display text-lg text-deep-brown mb-2">
                    {t.own_label}
                  </h3>
                  <div className="h-px w-12 bg-gold-accent/50 mx-auto mb-4" />
                  <p className="text-sm text-gold-accent font-medium mb-6">
                    {t.own_desc}
                  </p>
                  <div className="bg-gold-accent/10 rounded-lg p-4 border border-gold-accent/30">
                    <p className="font-semibold text-deep-brown text-lg">
                      {t.own_monthly}
                    </p>
                    <p className="text-sm text-green-600 font-medium mt-1 flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {t.own_equity}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <div className="w-10 h-10 rounded-full bg-gold-accent flex items-center justify-center shadow-lg">
                <ArrowRight className="w-5 h-5 text-dark-footer" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
