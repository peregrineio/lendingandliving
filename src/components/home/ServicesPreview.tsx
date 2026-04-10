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
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Services data with categories
const featuredService = {
  icon: Percent,
  titleKey: 'dpa_title',
  descKey: 'dpa_desc',
  href: '/services/down-payment-assistance-houston',
  badge: { en: 'Most Popular', es: 'Más Popular' },
  highlight: true,
};

const specialtyServices = [
  {
    icon: FileCheck,
    titleKey: 'itin_title',
    descKey: 'itin_desc',
    href: '/services/itin-loans-houston',
    badge: { en: 'Unique in Houston', es: 'Único en Houston' },
  },
  {
    icon: Users,
    titleKey: 'nontraditional_title',
    descKey: 'nontraditional_desc',
    href: '/services/non-traditional-loans-houston',
  },
];

const standardServices = [
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
    href: '/services/conventional-loans-houston',
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
];

export function ServicesPreview() {
  const { t, language, isSpanish } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-cream section-padding relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold-accent/[0.03] blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-deep-brown/[0.02] blur-3xl translate-y-1/2 -translate-x-1/4" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(var(--deep-brown) 1px, transparent 1px), linear-gradient(90deg, var(--deep-brown) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-container relative">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block font-accent text-gold-accent text-lg italic mb-4"
            >
              {isSpanish ? 'Descubre tu camino' : 'Discover your path'}
            </motion.span>
            <h2 className="text-display-lg text-deep-brown leading-tight">
              {t('services.headline')}
            </h2>
          </div>
        </motion.div>

        {/* Bento-style Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Featured Card - Large spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:row-span-2"
          >
            <Link
              href={featuredService.href}
              className="group relative block h-full min-h-[400px] lg:min-h-full overflow-hidden rounded-3xl bg-gradient-to-br from-deep-brown via-deep-brown to-[#5A4838] p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-deep-brown/20"
            >
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold-accent/30 transition-colors duration-500" />

              {/* Badge */}
              <div className="relative z-10 mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-accent/20 backdrop-blur-sm rounded-full text-gold-accent text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  {featuredService.badge[language]}
                </span>
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gold-accent/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold-accent/20 transition-colors duration-300">
                  <featuredService.icon className="w-10 h-10 text-gold-accent" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                <h3 className="font-display text-3xl lg:text-4xl text-cream mb-4 group-hover:text-gold-accent transition-colors duration-300">
                  {t(`services.${featuredService.titleKey}`)}
                </h3>
                <p className="text-warm-taupe text-lg leading-relaxed mb-8 max-w-sm">
                  {t(`services.${featuredService.descKey}`)}
                </p>
                <span className="inline-flex items-center gap-3 text-gold-accent font-medium text-lg group-hover:gap-4 transition-all duration-300">
                  {t('services.cta')}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          </motion.div>

          {/* Specialty Services - Horizontal stack */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {specialtyServices.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={service.href}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-warm-white border border-brand-border/50 p-6 lg:p-8 transition-all duration-400 hover:border-gold-accent/30 hover:shadow-xl hover:shadow-deep-brown/5 hover:-translate-y-1"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="relative z-10">
                    {/* Badge */}
                    {service.badge && (
                      <div className="mb-4">
                        <span className="inline-block text-[11px] px-3 py-1.5 bg-gold-accent/10 text-gold-accent rounded-full font-semibold uppercase tracking-wider">
                          {service.badge[language]}
                        </span>
                      </div>
                    )}

                    {/* Icon with animated ring */}
                    <div className="relative mb-5">
                      <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center border border-brand-border group-hover:border-gold-accent/30 transition-colors duration-300">
                        <service.icon className="w-7 h-7 text-gold-accent" />
                      </div>
                      <div className="absolute inset-0 rounded-xl border-2 border-gold-accent/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                    </div>

                    <h3 className="font-display text-xl text-deep-brown mb-3 group-hover:text-gold-accent transition-colors duration-300">
                      {t(`services.${service.titleKey}`)}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-5">
                      {t(`services.${service.descKey}`)}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-accent group-hover:gap-3 transition-all duration-300">
                      {t('services.cta')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Standard Services - Flowing grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5">
            {standardServices.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={service.href}
                  className="group relative block h-full rounded-xl bg-white/60 backdrop-blur-sm border border-brand-border/30 p-5 transition-all duration-300 hover:bg-white hover:border-gold-accent/20 hover:shadow-lg hover:shadow-deep-brown/5 hover:-translate-y-0.5"
                >
                  {/* Minimal icon */}
                  <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center mb-4 group-hover:bg-gold-accent/10 transition-colors duration-300">
                    <service.icon className="w-5 h-5 text-deep-brown group-hover:text-gold-accent transition-colors duration-300" />
                  </div>

                  <h4 className="font-display text-base text-deep-brown mb-1.5 group-hover:text-gold-accent transition-colors duration-300 leading-tight">
                    {t(`services.${service.titleKey}`)}
                  </h4>

                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {t(`services.${service.descKey}`)}
                  </p>

                  {/* Subtle arrow indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 text-gold-accent" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 lg:mt-20"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-deep-brown text-cream font-medium transition-all duration-300 hover:bg-gold-accent hover:shadow-lg hover:shadow-gold-accent/25 hover:-translate-y-0.5"
          >
            <span>{isSpanish ? 'Ver Todas las Opciones de Préstamo' : 'See All Loan Options'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
