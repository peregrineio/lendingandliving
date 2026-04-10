'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Building,
  CheckCircle,
  CreditCard,
  Percent,
  Shield,
  Phone,
  ArrowRight,
  DollarSign,
  Clock,
  FileCheck,
  Home,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Conventional vs FHA comparison data
const comparisonData = {
  en: {
    headers: ['Feature', 'Conventional Loan', 'FHA Loan'],
    rows: [
      ['Minimum Down Payment', '3-20%', '3.5%'],
      ['Minimum Credit Score', '620+', '580 (500 with 10% down)'],
      ['Mortgage Insurance', 'Removable at 80% LTV', 'Required for life of loan'],
      ['Property Types', 'Primary, Secondary, Investment', 'Primary residence only'],
      ['Best For', 'Strong credit, larger down payment', 'First-time buyers, lower credit'],
    ],
  },
  es: {
    headers: ['Característica', 'Préstamo Convencional', 'Préstamo FHA'],
    rows: [
      ['Enganche Mínimo', '3-20%', '3.5%'],
      ['Puntaje de Crédito Mínimo', '620+', '580 (500 con 10% enganche)'],
      ['Seguro Hipotecario', 'Removible al 80% LTV', 'Requerido por vida del préstamo'],
      ['Tipos de Propiedad', 'Principal, Secundaria, Inversión', 'Solo residencia principal'],
      ['Mejor Para', 'Buen crédito, enganche mayor', 'Compradores primerizos, crédito bajo'],
    ],
  },
};

// Conventional Benefits
const conventionalBenefits = {
  en: [
    {
      icon: Percent,
      title: 'Competitive Interest Rates',
      desc: 'Often lower rates than FHA for qualified buyers with strong credit profiles.',
    },
    {
      icon: Shield,
      title: 'No Upfront Mortgage Insurance',
      desc: 'With 20% down, you avoid PMI entirely — saving hundreds per month.',
    },
    {
      icon: Clock,
      title: 'Removable PMI',
      desc: 'Unlike FHA, PMI can be removed once you reach 80% loan-to-value.',
    },
    {
      icon: TrendingUp,
      title: 'Flexible Property Types',
      desc: 'Use for primary residence, vacation home, or investment property.',
    },
    {
      icon: DollarSign,
      title: 'Higher Loan Limits',
      desc: '2026 conforming limit of $806,500 — higher than FHA limits.',
    },
    {
      icon: FileCheck,
      title: 'Flexible Terms',
      desc: 'Choose 10, 15, 20, or 30-year terms to fit your financial goals.',
    },
  ],
  es: [
    {
      icon: Percent,
      title: 'Tasas de Interés Competitivas',
      desc: 'A menudo tasas más bajas que FHA para compradores calificados con buen crédito.',
    },
    {
      icon: Shield,
      title: 'Sin Seguro Hipotecario Inicial',
      desc: 'Con 20% de enganche, evitas el PMI completamente — ahorrando cientos por mes.',
    },
    {
      icon: Clock,
      title: 'PMI Removible',
      desc: 'A diferencia de FHA, el PMI se puede remover cuando alcanzas 80% de valor del préstamo.',
    },
    {
      icon: TrendingUp,
      title: 'Tipos de Propiedad Flexibles',
      desc: 'Úsalo para residencia principal, casa vacacional o propiedad de inversión.',
    },
    {
      icon: DollarSign,
      title: 'Límites de Préstamo Más Altos',
      desc: 'Límite conforme de 2026 de $806,500 — más alto que los límites FHA.',
    },
    {
      icon: FileCheck,
      title: 'Plazos Flexibles',
      desc: 'Elige plazos de 10, 15, 20 o 30 años para ajustarte a tus metas financieras.',
    },
  ],
};

// Requirements
const conventionalRequirements = {
  en: [
    'Minimum credit score of 620',
    '3-20% down payment (20% avoids PMI)',
    'Stable employment history (2 years)',
    'Debt-to-income ratio within guidelines',
    'Proof of income and assets',
    'Property appraisal required',
  ],
  es: [
    'Puntaje de crédito mínimo de 620',
    '3-20% de enganche (20% evita PMI)',
    'Historial de empleo estable (2 años)',
    'Relación deuda-ingreso dentro de lineamientos',
    'Comprobante de ingresos y activos',
    'Avalúo de propiedad requerido',
  ],
};

// When Conventional Makes Sense
const whenConventional = {
  en: [
    {
      title: 'Strong Credit Score (680+)',
      desc: 'Better rates and terms with higher credit scores.',
    },
    {
      title: 'Larger Down Payment Available',
      desc: '20% down eliminates PMI and reduces monthly payment.',
    },
    {
      title: 'Investment or Second Home',
      desc: 'FHA is limited to primary residence — conventional is not.',
    },
    {
      title: 'Want PMI to Go Away',
      desc: 'Conventional PMI drops off automatically at 78% LTV.',
    },
  ],
  es: [
    {
      title: 'Buen Puntaje de Crédito (680+)',
      desc: 'Mejores tasas y términos con puntajes de crédito más altos.',
    },
    {
      title: 'Enganche Mayor Disponible',
      desc: '20% de enganche elimina el PMI y reduce el pago mensual.',
    },
    {
      title: 'Inversión o Segunda Casa',
      desc: 'FHA está limitado a residencia principal — convencional no.',
    },
    {
      title: 'Quieres que el PMI Desaparezca',
      desc: 'El PMI convencional se elimina automáticamente al 78% LTV.',
    },
  ],
};

// FAQ data
const faqData = {
  en: [
    {
      question: 'What is a conventional loan?',
      answer: 'A conventional loan is a mortgage that is not backed or insured by a government agency like FHA or VA. These loans are offered by private lenders such as banks, credit unions, and mortgage companies. Because they are not government-insured, lenders take on more risk, which is why credit and down payment requirements are typically higher than FHA loans.',
    },
    {
      question: 'How much down payment do I need for a conventional loan?',
      answer: 'The minimum down payment for a conventional loan can be as low as 3% for first-time homebuyers through certain programs. However, 5-20% is more common. With 20% down, you avoid private mortgage insurance (PMI) entirely, which can save you hundreds of dollars per month.',
    },
    {
      question: 'What credit score do I need?',
      answer: 'Most conventional loan programs require a minimum credit score of 620. However, to get the best interest rates and terms, a score of 740 or higher is recommended. Daisy can review your credit profile and help you understand your options.',
    },
    {
      question: 'How does PMI work on conventional loans?',
      answer: 'Private Mortgage Insurance (PMI) is required when your down payment is less than 20%. The good news is that conventional PMI can be removed once you reach 80% loan-to-value — either through paying down your loan or home appreciation. This is a significant advantage over FHA loans, which require mortgage insurance for the life of the loan.',
    },
    {
      question: 'What is the 2026 conventional loan limit in Houston?',
      answer: 'The 2026 conforming loan limit for conventional loans in the Houston area is $806,500 for single-family homes. Loans above this amount are considered jumbo loans.',
    },
    {
      question: 'Should I choose FHA or conventional?',
      answer: 'It depends on your situation. FHA is often better for first-time buyers with lower credit scores or smaller down payments. Conventional is typically better if you have a 620+ credit score, can put 10-20% down, or want to buy an investment property. Daisy can run the numbers for both options and help you choose the best path.',
    },
  ],
  es: [
    {
      question: '¿Qué es un préstamo convencional?',
      answer: 'Un préstamo convencional es una hipoteca que no está respaldada o asegurada por una agencia gubernamental como FHA o VA. Estos préstamos son ofrecidos por prestamistas privados como bancos, cooperativas de crédito y compañías hipotecarias. Como no están asegurados por el gobierno, los prestamistas asumen más riesgo, por lo que los requisitos de crédito y enganche son típicamente más altos que los préstamos FHA.',
    },
    {
      question: '¿Cuánto enganche necesito para un préstamo convencional?',
      answer: 'El enganche mínimo para un préstamo convencional puede ser tan bajo como 3% para compradores primerizos a través de ciertos programas. Sin embargo, 5-20% es más común. Con 20% de enganche, evitas el seguro hipotecario privado (PMI) completamente, lo que puede ahorrarte cientos de dólares por mes.',
    },
    {
      question: '¿Qué puntaje de crédito necesito?',
      answer: 'La mayoría de los programas de préstamos convencionales requieren un puntaje de crédito mínimo de 620. Sin embargo, para obtener las mejores tasas de interés y términos, se recomienda un puntaje de 740 o más. Daisy puede revisar tu perfil de crédito y ayudarte a entender tus opciones.',
    },
    {
      question: '¿Cómo funciona el PMI en préstamos convencionales?',
      answer: 'El Seguro Hipotecario Privado (PMI) es requerido cuando tu enganche es menor al 20%. La buena noticia es que el PMI convencional se puede remover una vez que alcanzas 80% de valor del préstamo — ya sea pagando tu préstamo o por apreciación de la casa. Esta es una ventaja significativa sobre los préstamos FHA, que requieren seguro hipotecario por la vida del préstamo.',
    },
    {
      question: '¿Cuál es el límite de préstamo convencional 2026 en Houston?',
      answer: 'El límite de préstamo conforme de 2026 para préstamos convencionales en el área de Houston es $806,500 para casas unifamiliares. Los préstamos por encima de esta cantidad se consideran préstamos jumbo.',
    },
    {
      question: '¿Debería elegir FHA o convencional?',
      answer: 'Depende de tu situación. FHA es a menudo mejor para compradores primerizos con puntajes de crédito más bajos o enganches más pequeños. Convencional es típicamente mejor si tienes un puntaje de crédito de 620+, puedes poner 10-20% de enganche, o quieres comprar una propiedad de inversión. Daisy puede calcular los números para ambas opciones y ayudarte a elegir el mejor camino.',
    },
  ],
};

// JSON-LD Schema
function JsonLdSchema({ language }: { language: 'en' | 'es' }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData[language].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Conventional Loans Houston',
    description: language === 'en'
      ? 'Conventional mortgage loans in Houston, Texas with competitive rates and flexible terms.'
      : 'Préstamos hipotecarios convencionales en Houston, Texas con tasas competitivas y plazos flexibles.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Lending & Living - Daisy Castro',
      telephone: '832-894-7676',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '5718 Westheimer Rd Suite 1000',
        addressLocality: 'Houston',
        addressRegion: 'TX',
        postalCode: '77057',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Houston',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

export function ConventionalLoansContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const requirementsRef = useRef(null);
  const comparisonRef = useRef(null);
  const whenRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });
  const requirementsInView = useInView(requirementsRef, { once: true, margin: '-100px' });
  const comparisonInView = useInView(comparisonRef, { once: true, margin: '-100px' });
  const whenInView = useInView(whenRef, { once: true, margin: '-100px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });

  return (
    <>
      <JsonLdSchema language={language} />

      <div className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section ref={heroRef} className="bg-cream py-16 md:py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-display-xl text-deep-brown mb-6">
                {isSpanish
                  ? 'Préstamos Convencionales Houston TX — Financiamiento Tradicional, Tasas Competitivas'
                  : 'Conventional Loans Houston TX — Traditional Financing, Competitive Rates'}
              </h1>

              {/* Callout Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border-2 border-gold-accent/40 rounded-xl p-6 mt-8 max-w-2xl mx-auto"
              >
                <p className="font-cormorant italic text-xl text-gold-accent">
                  {isSpanish
                    ? 'Los préstamos convencionales ofrecen tasas competitivas y la posibilidad de eliminar el PMI.'
                    : 'Conventional loans offer competitive rates and the ability to eliminate PMI.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <Link
                  href="/contact?purpose=conventional"
                  className="btn-primary flex items-center gap-2"
                >
                  {isSpanish ? 'Obtén Pre-Aprobación' : 'Get Pre-Approved for a Conventional Loan'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:8328947676"
                  className="btn-secondary flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  832-894-7676
                </a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto"
              >
                {[
                  { value: '3-20%', label: isSpanish ? 'Enganche' : 'Down' },
                  { value: '620', label: isSpanish ? 'Crédito Min.' : 'Min. Credit' },
                  { value: '$806K', label: isSpanish ? 'Límite 2026' : '2026 Limit' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-display font-bold text-gold-accent">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section ref={benefitsRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'Beneficios de los Préstamos Convencionales' : 'Conventional Loan Benefits'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? '¿Por qué elegir un préstamo convencional?'
                  : 'Why choose a conventional loan?'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conventionalBenefits[language].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-cream rounded-xl p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-gold-accent" />
                  </div>
                  <h3 className="font-display text-lg text-deep-brown mb-2">{benefit.title}</h3>
                  <p className="text-sm text-text-muted">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section ref={requirementsRef} className="section-padding bg-cream">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={requirementsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-display-lg text-deep-brown mb-6">
                  {isSpanish ? 'Requisitos de Préstamo Convencional' : 'Conventional Loan Requirements'}
                </h2>
                <p className="text-text-muted mb-8">
                  {isSpanish
                    ? 'Los préstamos convencionales tienen requisitos de calificación estándar.'
                    : 'Conventional loans have standard qualification requirements.'}
                </p>
                <ul className="space-y-4">
                  {conventionalRequirements[language].map((req, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={requirementsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-body">{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={requirementsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-deep-brown rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-gold-accent" />
                </div>
                <h3 className="font-display text-2xl text-cream mb-4">
                  {isSpanish ? '¿No Estás Seguro Si Calificas?' : 'Not Sure If You Qualify?'}
                </h3>
                <p className="text-warm-taupe/80 mb-6">
                  {isSpanish
                    ? 'Daisy puede revisar tu situación y encontrar la mejor opción para ti — FHA, convencional, u otra.'
                    : 'Daisy can review your situation and find the best option for you — FHA, conventional, or another program.'}
                </p>
                <a
                  href="tel:8328947676"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {isSpanish ? 'Consulta Gratuita' : 'Free Consultation'}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section ref={comparisonRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'Convencional vs. Préstamo FHA' : 'Conventional vs. FHA Loan'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? '¿Cuál es mejor para ti? Aquí está la comparación.'
                  : "Which is right for you? Here's the comparison."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl border border-brand-border overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-cream">
                      {comparisonData[language].headers.map((header, i) => (
                        <th
                          key={i}
                          className={`px-4 py-3 text-left text-sm font-semibold text-deep-brown ${i === 1 ? 'bg-gold-accent/10' : ''}`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData[language].rows.map((row, i) => (
                      <tr key={i} className="border-t border-brand-border">
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`px-4 py-3 text-sm ${j === 0 ? 'font-medium text-deep-brown' : 'text-text-muted'} ${j === 1 ? 'bg-gold-accent/5' : ''}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* When Conventional Makes Sense */}
        <section ref={whenRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={whenInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? '¿Cuándo Conviene un Préstamo Convencional?' : 'When Does Conventional Make Sense?'}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {whenConventional[language].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={whenInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-brand-border"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display text-lg text-deep-brown mb-2">{item.title}</h3>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'Preguntas Frecuentes sobre Préstamos Convencionales' : 'Conventional Loan FAQs'}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <Accordion className="space-y-4">
                {faqData[language].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-xl border border-brand-border px-6"
                  >
                    <AccordionTrigger className="text-left font-display text-deep-brown hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-text-muted pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section-padding bg-deep-brown">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-gold-accent" />
              </div>
              <h2 className="text-display-lg text-cream mb-4">
                {isSpanish
                  ? '¿Listo para Explorar Tu Opción Convencional?'
                  : 'Ready to Explore Your Conventional Option?'}
              </h2>
              <p className="text-warm-taupe/80 text-lg mb-8">
                {isSpanish
                  ? 'Daisy te ayudará a determinar si convencional es la mejor opción para ti.'
                  : "Daisy will help you determine if conventional is the best fit for you."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?purpose=conventional"
                  className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
                >
                  {isSpanish ? 'Obtén Pre-Aprobación' : 'Get Pre-Approved'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:8328947676"
                  className="inline-flex items-center gap-2 py-3 px-8 border border-cream/30 text-cream rounded-xl font-semibold hover:bg-cream/10 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  832-894-7676
                </a>
              </div>
              <p className="text-sm text-warm-taupe/60 mt-6">
                {isSpanish ? 'Hablamos Español • Consulta Gratuita' : 'Se Habla Español • Free Consultation'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
