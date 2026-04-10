'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Home,
  CreditCard,
  FileCheck,
  Percent,
  Shield,
  RefreshCw,
  TrendingUp,
  Users,
  ArrowRight,
  Wheat,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Services data
const services = [
  {
    icon: Home,
    titleKey: 'fha_title',
    descKey: 'fha_desc',
    href: '/services/fha-loans-houston',
  },
  {
    icon: CreditCard,
    titleKey: 'conventional_title',
    descKey: 'conventional_desc',
    href: '/services',
  },
  {
    icon: FileCheck,
    titleKey: 'itin_title',
    descKey: 'itin_desc',
    href: '/services/itin-loans-houston',
    badge: { en: 'Unique in Houston', es: 'Único en Houston' },
  },
  {
    icon: Percent,
    titleKey: 'dpa_title',
    descKey: 'dpa_desc',
    href: '/services/down-payment-assistance-houston',
    badge: { en: 'Most Popular', es: 'Más Popular' },
  },
  {
    icon: Shield,
    titleKey: 'va_title',
    descKey: 'va_desc',
    href: '/services/va-loans-houston',
  },
  {
    icon: Wheat,
    titleKey: 'usda_title',
    descKey: 'usda_desc',
    href: '/services/usda-loans-houston',
  },
  {
    icon: RefreshCw,
    titleKey: 'refinance_title',
    descKey: 'refinance_desc',
    href: '/services/refinance-houston',
  },
  {
    icon: TrendingUp,
    titleKey: 'investor_title',
    descKey: 'investor_desc',
    href: '/services/investor-loans-houston',
  },
  {
    icon: Users,
    titleKey: 'nontraditional_title',
    descKey: 'nontraditional_desc',
    href: '/services/non-traditional-loans-houston',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function ServicesPreview() {
  const { t, language, isSpanish } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-cream section-padding relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-display-lg text-deep-brown mb-4">
            {t('services.headline')}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link
                href={service.href}
                className="group block h-full bg-warm-white rounded-xl p-6 border border-transparent hover:border-gold-accent/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Badge */}
                {service.badge && (
                  <div className="mb-4">
                    <span className="inline-block text-[10px] px-2.5 py-1 bg-gold-accent/10 text-gold-accent rounded-full font-medium uppercase tracking-wide">
                      {service.badge[language]}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center mb-4 group-hover:bg-gold-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-gold-accent" />
                </div>

                {/* Content */}
                <h3 className="font-display text-lg text-deep-brown mb-2 group-hover:text-gold-accent transition-colors">
                  {t(`services.${service.titleKey}`)}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {t(`services.${service.descKey}`)}
                </p>

                {/* Link */}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-gold-accent group-hover:gap-2 transition-all">
                  {t('services.cta')}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-lg font-medium text-deep-brown hover:text-gold-accent transition-colors group"
          >
            {isSpanish ? 'Ver Todas las Opciones de Préstamo' : 'See All Loan Options'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
