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
  Phone,
  CheckCircle,
  Wheat,
  Building,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

// Extended services data
const services = [
  {
    icon: Home,
    titleKey: 'fha_title',
    descKey: 'fha_desc',
    href: '/services/fha-loans-houston',
    whoFor: {
      en: 'First-time buyers, lower credit scores, gift down payments',
      es: 'Compradores primerizos, puntaje de crédito bajo, enganche de regalo',
    },
    requirements: {
      en: ['580+ credit score', '3.5% down payment', '2 years employment history'],
      es: ['580+ puntaje de crédito', '3.5% de enganche', '2 años de historial laboral'],
    },
  },
  {
    icon: CreditCard,
    titleKey: 'conventional_title',
    descKey: 'conventional_desc',
    href: '/services/conventional-loans-houston',
    whoFor: {
      en: 'Strong credit, larger down payments, avoiding PMI',
      es: 'Buen crédito, enganche mayor, evitar PMI',
    },
    requirements: {
      en: ['620+ credit score', '3-20% down payment', 'Stable income verification'],
      es: ['620+ puntaje de crédito', '3-20% de enganche', 'Verificación de ingresos'],
    },
  },
  {
    icon: FileCheck,
    titleKey: 'itin_title',
    descKey: 'itin_desc',
    href: '/services/itin-loans-houston',
    badge: { en: 'Unique in Houston', es: 'Único en Houston' },
    whoFor: {
      en: 'Immigrant families, no SSN required, building credit',
      es: 'Familias inmigrantes, sin SSN requerido, construyendo crédito',
    },
    requirements: {
      en: ['Valid ITIN', '10-20% down payment', '2 years tax returns'],
      es: ['ITIN válido', '10-20% de enganche', '2 años de declaraciones'],
    },
  },
  {
    icon: Percent,
    titleKey: 'dpa_title',
    descKey: 'dpa_desc',
    href: '/services/down-payment-assistance-houston',
    badge: { en: 'Most Popular', es: 'Más Popular' },
    whoFor: {
      en: 'Income-qualified buyers, first-time buyers',
      es: 'Compradores que califican por ingresos, compradores primerizos',
    },
    requirements: {
      en: ['Income limits apply', 'Primary residence only', 'Homebuyer education'],
      es: ['Aplican límites de ingresos', 'Solo residencia principal', 'Educación de comprador'],
    },
  },
  {
    icon: Shield,
    titleKey: 'va_title',
    descKey: 'va_desc',
    href: '/services/va-loans-houston',
    whoFor: {
      en: 'Veterans, active duty, eligible surviving spouses',
      es: 'Veteranos, servicio activo, cónyuges sobrevivientes elegibles',
    },
    requirements: {
      en: ['VA Certificate of Eligibility', 'No down payment required', 'No PMI'],
      es: ['Certificado de elegibilidad VA', 'Sin enganche requerido', 'Sin PMI'],
    },
  },
  {
    icon: Wheat,
    titleKey: 'usda_title',
    descKey: 'usda_desc',
    href: '/services/usda-loans-houston',
    whoFor: {
      en: 'Buyers in rural and suburban areas near Houston',
      es: 'Compradores en áreas rurales y suburbanas cerca de Houston',
    },
    requirements: {
      en: ['Property in eligible area', 'Income limits apply', 'Primary residence only'],
      es: ['Propiedad en área elegible', 'Aplican límites de ingresos', 'Solo residencia principal'],
    },
  },
  {
    icon: RefreshCw,
    titleKey: 'refinance_title',
    descKey: 'refinance_desc',
    href: '/services/refinance-houston',
    whoFor: {
      en: 'Homeowners seeking lower rates or cash-out',
      es: 'Propietarios buscando tasas más bajas o retiro de efectivo',
    },
    requirements: {
      en: ['Minimum 620 credit', 'Sufficient equity', 'Current on payments'],
      es: ['Mínimo 620 crédito', 'Suficiente equidad', 'Al día con pagos'],
    },
  },
  {
    icon: TrendingUp,
    titleKey: 'investor_title',
    descKey: 'investor_desc',
    href: '/services/investor-loans-houston',
    whoFor: {
      en: 'Real estate investors, self-employed, 1099 income',
      es: 'Inversionistas, auto-empleados, ingresos 1099',
    },
    requirements: {
      en: ['DSCR, bank statements, or assets', '20-25% down payment', 'Rental property experience'],
      es: ['DSCR, estados de cuenta, o activos', '20-25% de enganche', 'Experiencia en propiedades'],
    },
  },
  {
    icon: Users,
    titleKey: 'nontraditional_title',
    descKey: 'nontraditional_desc',
    href: '/services/non-traditional-loans-houston',
    whoFor: {
      en: 'Self-employed, gig workers, complex income',
      es: 'Auto-empleados, trabajadores independientes, ingresos complejos',
    },
    requirements: {
      en: ['12-24 months bank statements', 'Alternative credit sources', 'Higher reserves'],
      es: ['12-24 meses de estados de cuenta', 'Fuentes de crédito alternativas', 'Mayores reservas'],
    },
  },
  {
    icon: Building,
    titleKey: 'jumbo_title',
    descKey: 'jumbo_desc',
    href: '/services/jumbo-loans-houston',
    whoFor: {
      en: 'High-value homes, luxury properties, above $832,750',
      es: 'Casas de alto valor, propiedades de lujo, más de $832,750',
    },
    requirements: {
      en: ['700+ credit score', '10-20% down payment', 'Strong income documentation'],
      es: ['Puntaje de crédito 700+', '10-20% de enganche', 'Documentación de ingresos sólida'],
    },
  },
];

export function ServicesHubContent() {
  const { t, language, isSpanish } = useLanguage();
  const preApproval = translations[language].preApproval;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div className="pt-20 md:pt-24">
      {/* Pre-Approval Banner */}
      <section className="bg-[#4A3728] border-b-4 border-gold-accent">
        <div className="section-container py-8 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-center md:text-left">
              <h2 className="font-display text-2xl md:text-3xl text-white mb-2">
                {preApproval.headline}
              </h2>
              <p className="text-warm-taupe/80 text-sm md:text-base">
                {preApproval.sub}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/contact?purpose=pre-approval"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
              >
                {preApproval.apply}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:8328947676"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {preApproval.call}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="bg-cream py-12 md:py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display-xl text-deep-brown mb-6">
              {isSpanish ? 'Programas de Préstamos Hipotecarios' : 'Home Loan Programs'}
            </h1>
            <p className="text-lg text-text-muted">
              {isSpanish
                ? 'Las opciones hipotecarias más completas de Houston — en inglés y español'
                : "Houston's most comprehensive mortgage options — in English and Spanish"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section ref={sectionRef} className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={service.href}
                    className="group block h-full bg-white rounded-xl p-6 border border-brand-border hover:border-gold-accent/50 hover:shadow-lg transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center group-hover:bg-gold-accent/20 transition-colors">
                        <service.icon className="w-6 h-6 text-gold-accent" />
                      </div>
                      {service.badge && (
                        <span className="text-[10px] px-2.5 py-1 bg-gold-accent/10 text-gold-accent rounded-full font-medium uppercase">
                          {service.badge[language]}
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h2 className="font-display text-xl text-deep-brown mb-2 group-hover:text-gold-accent transition-colors">
                      {t(`services.${service.titleKey}`)}
                    </h2>
                    <p className="text-sm text-text-muted mb-4">
                      {t(`services.${service.descKey}`)}
                    </p>

                    {/* Who It's For */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-deep-brown mb-1">
                        {isSpanish ? 'Ideal para:' : 'Ideal for:'}
                      </p>
                      <p className="text-xs text-text-muted">
                        {service.whoFor[language]}
                      </p>
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-deep-brown mb-2">
                        {isSpanish ? 'Requisitos:' : 'Key Requirements:'}
                      </p>
                      <ul className="space-y-1">
                        {service.requirements[language].map((req, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-text-muted">
                            <CheckCircle className="w-3 h-3 text-gold-accent flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Link */}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gold-accent group-hover:gap-2 transition-all">
                      {t('services.cta')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Sticky Sidebar CTA */}
            <div className="lg:sticky lg:top-24 h-fit">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-deep-brown rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-gold-accent" />
                </div>
                <h3 className="font-display text-xl text-cream mb-2">
                  {isSpanish ? '¿No estás seguro qué préstamo te conviene?' : 'Not sure which loan fits?'}
                </h3>
                <p className="text-warm-taupe/80 text-sm mb-6">
                  {isSpanish
                    ? 'Llama a Daisy para una consulta gratuita'
                    : 'Call Daisy for a free consultation'}
                </p>
                <a
                  href="tel:8328947676"
                  className="block w-full py-3 px-4 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors mb-3"
                >
                  832-894-7676
                </a>
                <p className="text-xs text-warm-taupe/60">
                  {isSpanish ? 'Hablamos Español' : 'Se Habla Español'}
                </p>
              </motion.div>

              {/* Quick Links */}
              <div className="mt-6 bg-cream rounded-xl p-4">
                <p className="text-sm font-semibold text-deep-brown mb-3">
                  {isSpanish ? 'Enlaces Rápidos' : 'Quick Links'}
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link href="/resources/calculator" className="text-sm text-text-muted hover:text-gold-accent transition-colors">
                      {isSpanish ? '→ Calculadora Hipotecaria' : '→ Mortgage Calculator'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-text-muted hover:text-gold-accent transition-colors">
                      {isSpanish ? '→ Obtén Pre-Aprobación' : '→ Get Pre-Approved'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-sm text-text-muted hover:text-gold-accent transition-colors">
                      {isSpanish ? '→ Conoce a Daisy' : '→ Meet Daisy'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
