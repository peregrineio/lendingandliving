'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Home,
  CheckCircle,
  CreditCard,
  Percent,
  DollarSign,
  Phone,
  ArrowRight,
  FileCheck,
  Building,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Jumbo vs Conventional comparison data
const comparisonData = {
  en: {
    headers: ['', 'Conventional', 'Jumbo'],
    rows: [
      ['2026 Loan Limit', 'Up to $832,750', 'Above $832,750'],
      ['Down Payment', 'As low as 3%', 'Typically 10–20%'],
      ['Credit Score', '620+', 'Typically 700+'],
      ['PMI', 'May apply', 'Not required (with 20% down)'],
      ['Income Documentation', 'Standard', 'More thorough'],
    ],
  },
  es: {
    headers: ['', 'Convencional', 'Jumbo'],
    rows: [
      ['Límite de Préstamo 2026', 'Hasta $832,750', 'Más de $832,750'],
      ['Enganche', 'Desde 3%', 'Típicamente 10–20%'],
      ['Puntaje de Crédito', '620+', 'Típicamente 700+'],
      ['PMI', 'Puede aplicar', 'No requerido (con 20% enganche)'],
      ['Documentación de Ingresos', 'Estándar', 'Más detallada'],
    ],
  },
};

// Jumbo loan types
const jumboTypes = {
  en: [
    {
      icon: Home,
      title: 'Fixed-Rate Jumbo Loans',
      desc: '15, 20, and 30-year fixed options with predictable monthly payments.',
    },
    {
      icon: TrendingUp,
      title: 'Adjustable-Rate Jumbo (ARM)',
      desc: 'Lower initial rates with adjustable terms — ideal for shorter ownership horizons.',
    },
    {
      icon: Briefcase,
      title: 'Bank Statement Jumbo',
      desc: 'For self-employed buyers — qualify using 12–24 months of bank statements.',
    },
    {
      icon: Percent,
      title: 'Interest-Only Jumbo',
      desc: 'Pay interest only for the first years, freeing up cash flow.',
    },
  ],
  es: [
    {
      icon: Home,
      title: 'Préstamos Jumbo de Tasa Fija',
      desc: 'Opciones fijas a 15, 20 y 30 años con pagos mensuales predecibles.',
    },
    {
      icon: TrendingUp,
      title: 'Jumbo de Tasa Ajustable (ARM)',
      desc: 'Tasas iniciales más bajas con términos ajustables — ideal para periodos más cortos.',
    },
    {
      icon: Briefcase,
      title: 'Jumbo con Estado de Cuenta',
      desc: 'Para compradores autoempleados — califica usando 12–24 meses de estados de cuenta.',
    },
    {
      icon: Percent,
      title: 'Jumbo Solo Interés',
      desc: 'Paga solo interés los primeros años, liberando flujo de efectivo.',
    },
  ],
};

// Jumbo requirements
const jumboRequirements = {
  en: [
    'Minimum credit score: typically 700+',
    'Down payment: typically 10–20% minimum',
    'Strong income documentation required',
    'Debt-to-income ratios reviewed on a case-by-case basis',
    'Reserves: typically 6–12 months of mortgage payments in savings',
    'Property appraisal required (may require two appraisals for very high-value properties)',
  ],
  es: [
    'Puntaje de crédito mínimo: típicamente 700+',
    'Enganche: típicamente 10–20% mínimo',
    'Documentación de ingresos sólida requerida',
    'Ratios de deuda-ingreso revisados caso por caso',
    'Reservas: típicamente 6–12 meses de pagos hipotecarios en ahorros',
    'Avalúo de propiedad requerido (puede requerir dos avalúos para propiedades de muy alto valor)',
  ],
};

// FAQ data
const faqData = {
  en: [
    {
      question: 'What is the jumbo loan limit in Houston for 2026?',
      answer: 'For 2026, the conforming loan limit is $832,750 for single-family homes in most areas including Houston. Any loan amount above this requires a jumbo loan. For multi-unit properties, the limits are higher — contact Daisy for specifics.',
    },
    {
      question: 'What credit score do I need for a jumbo loan?',
      answer: 'Most jumbo loan lenders require a minimum credit score of 700, though some programs may accept 680. Higher credit scores typically qualify for better rates. Your overall financial profile matters too — strong income, low debt, and substantial reserves can help offset a slightly lower score.',
    },
    {
      question: 'How much down payment is required for a jumbo loan?',
      answer: 'Typical jumbo loans require 10–20% down payment. Some lenders offer programs with as little as 10% down, but 20% is more common and helps you avoid any additional costs. The larger your down payment, the better your rate and terms.',
    },
    {
      question: 'Are jumbo loan rates higher than conventional?',
      answer: 'Historically, jumbo rates were higher than conforming rates. Today, jumbo rates are often competitive with — or even lower than — conventional rates for well-qualified borrowers. Your actual rate depends on credit score, down payment, and overall financial strength.',
    },
    {
      question: 'Can self-employed buyers get a jumbo loan?',
      answer: 'Yes. Bank statement jumbo loans are designed for self-employed borrowers who may not have traditional W-2 income. These programs use 12–24 months of personal or business bank statements to verify income instead of tax returns.',
    },
    {
      question: 'How long does the jumbo loan process take?',
      answer: 'Jumbo loans typically take 30–45 days to close, similar to conventional loans. However, the underwriting process may be more thorough due to the larger loan amount. Having all documentation ready upfront helps speed up the process.',
    },
  ],
  es: [
    {
      question: '¿Cuál es el límite del préstamo jumbo en Houston para 2026?',
      answer: 'Para 2026, el límite de préstamo conforme es $832,750 para casas unifamiliares en la mayoría de áreas incluyendo Houston. Cualquier monto por encima de esto requiere un préstamo jumbo. Para propiedades de múltiples unidades, los límites son más altos — contacta a Daisy para más detalles.',
    },
    {
      question: '¿Qué puntaje de crédito necesito para un préstamo jumbo?',
      answer: 'La mayoría de prestamistas de préstamos jumbo requieren un puntaje de crédito mínimo de 700, aunque algunos programas pueden aceptar 680. Puntajes de crédito más altos típicamente califican para mejores tasas. Tu perfil financiero general también importa — ingresos fuertes, deuda baja y reservas sustanciales pueden ayudar a compensar un puntaje ligeramente más bajo.',
    },
    {
      question: '¿Cuánto enganche se requiere para un préstamo jumbo?',
      answer: 'Los préstamos jumbo típicos requieren 10–20% de enganche. Algunos prestamistas ofrecen programas con tan solo 10% de enganche, pero 20% es más común y te ayuda a evitar costos adicionales. Mientras mayor sea tu enganche, mejor será tu tasa y términos.',
    },
    {
      question: '¿Las tasas de préstamos jumbo son más altas que las convencionales?',
      answer: 'Históricamente, las tasas jumbo eran más altas que las tasas conformes. Hoy, las tasas jumbo son frecuentemente competitivas con — o incluso más bajas que — las tasas convencionales para prestatarios bien calificados. Tu tasa real depende del puntaje de crédito, enganche y solidez financiera general.',
    },
    {
      question: '¿Pueden los compradores autoempleados obtener un préstamo jumbo?',
      answer: 'Sí. Los préstamos jumbo con estado de cuenta bancario están diseñados para prestatarios autoempleados que pueden no tener ingresos tradicionales W-2. Estos programas usan 12–24 meses de estados de cuenta personales o de negocios para verificar ingresos en lugar de declaraciones de impuestos.',
    },
    {
      question: '¿Cuánto tiempo toma el proceso del préstamo jumbo?',
      answer: 'Los préstamos jumbo típicamente toman 30–45 días para cerrar, similar a los préstamos convencionales. Sin embargo, el proceso de suscripción puede ser más minucioso debido al monto mayor del préstamo. Tener toda la documentación lista por adelantado ayuda a acelerar el proceso.',
    },
  ],
};

export function JumboLoansContent() {
  const { language, isSpanish } = useLanguage();

  const heroRef = useRef(null);
  const whatIsRef = useRef(null);
  const requirementsRef = useRef(null);
  const comparisonRef = useRef(null);
  const typesRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const whatIsInView = useInView(whatIsRef, { once: true, margin: '-100px' });
  const requirementsInView = useInView(requirementsRef, { once: true, margin: '-100px' });
  const comparisonInView = useInView(comparisonRef, { once: true, margin: '-100px' });
  const typesInView = useInView(typesRef, { once: true, margin: '-100px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-deep-brown relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-brown via-deep-brown to-[#3a2a1a]" />
        <div className="section-container py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-display-xl text-cream mb-6">
              {isSpanish
                ? 'Préstamos Jumbo Houston TX — Financiamiento para Casas de Alto Valor'
                : 'Jumbo Loans Houston TX — Financing for High-Value Homes'}
            </h1>
            <p className="text-lg text-warm-taupe/90 mb-8 max-w-2xl">
              {isSpanish
                ? '¿Comprando una casa que supera los límites de préstamo convencional? Un préstamo jumbo puede ser la solución correcta. Ayudo a compradores de Houston a navegar el financiamiento jumbo con confianza.'
                : "Purchasing a home above the conventional loan limits? A jumbo loan may be the right solution. I help Houston buyers navigate jumbo financing with confidence."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?purpose=jumbo-loan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
              >
                {isSpanish ? 'Comenzar con Préstamo Jumbo' : 'Get Started with a Jumbo Loan'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:8328947676"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-cream/30 text-cream rounded-xl font-semibold hover:bg-cream/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                832-894-7676
              </a>
            </div>
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-cream/20">
              <div>
                <p className="text-2xl md:text-3xl font-display text-gold-accent">$832,750+</p>
                <p className="text-sm text-warm-taupe/70 mt-1">
                  {isSpanish ? 'Monto Mínimo' : 'Minimum Amount'}
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display text-gold-accent">700+</p>
                <p className="text-sm text-warm-taupe/70 mt-1">
                  {isSpanish ? 'Puntaje de Crédito' : 'Credit Score'}
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display text-gold-accent">10-20%</p>
                <p className="text-sm text-warm-taupe/70 mt-1">
                  {isSpanish ? 'Enganche Típico' : 'Typical Down'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Is a Jumbo Loan Section */}
      <section ref={whatIsRef} className="section-padding bg-warm-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={whatIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-display-lg text-deep-brown mb-6">
              {isSpanish ? '¿Qué es un Préstamo Jumbo?' : 'What Is a Jumbo Loan?'}
            </h2>
            <div className="prose prose-lg text-text-muted text-left">
              <p>
                {isSpanish
                  ? 'Un préstamo jumbo es una hipoteca que excede los límites de préstamo conforme establecidos por la Agencia Federal de Financiamiento de Vivienda (FHFA). Para 2026, el límite de préstamo conforme para la mayoría de las áreas es $832,750. Cualquier monto de préstamo por encima de este umbral se considera un préstamo "jumbo" y no puede ser comprado por Fannie Mae o Freddie Mac.'
                  : 'A jumbo loan is a mortgage that exceeds the conforming loan limits set by the Federal Housing Finance Agency (FHFA). For 2026, the conforming loan limit for most areas is $832,750. Any loan amount above this threshold is considered a "jumbo" loan and cannot be purchased by Fannie Mae or Freddie Mac.'}
              </p>
              <p>
                {isSpanish
                  ? 'En los vecindarios de lujo y alto valor de Houston — incluyendo River Oaks, Memorial, West University, The Woodlands y Sugar Land — los préstamos jumbo son frecuentemente necesarios para financiar la casa que deseas.'
                  : "In Houston's luxury and high-value neighborhoods — including River Oaks, Memorial, West University, The Woodlands, and Sugar Land — jumbo loans are often necessary to finance the home you want."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section ref={requirementsRef} className="section-padding bg-cream">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={requirementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-lg text-deep-brown mb-4">
              {isSpanish ? 'Requisitos del Préstamo Jumbo' : 'Jumbo Loan Requirements'}
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              {isSpanish
                ? 'Los préstamos jumbo tienen estándares de calificación más altos debido a los montos de préstamo más grandes involucrados.'
                : 'Jumbo loans have higher qualification standards due to the larger loan amounts involved.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={requirementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-brand-border"
          >
            <ul className="space-y-4">
              {jumboRequirements[language].map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
                  <span className="text-text-body">{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section ref={comparisonRef} className="section-padding bg-warm-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-lg text-deep-brown mb-4">
              {isSpanish ? 'Jumbo vs Convencional' : 'Jumbo vs Conventional'}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto overflow-x-auto"
          >
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-brand-border">
              <thead>
                <tr className="bg-deep-brown text-cream">
                  {comparisonData[language].headers.map((header, i) => (
                    <th key={i} className="px-6 py-4 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData[language].rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-cream/50'}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-6 py-4 text-sm ${
                          cellIndex === 0 ? 'font-medium text-deep-brown' : 'text-text-muted'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Types of Jumbo Loans */}
      <section ref={typesRef} className="section-padding bg-cream">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={typesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-lg text-deep-brown mb-4">
              {isSpanish ? 'Tipos de Préstamos Jumbo que Ofrece Daisy' : 'Types of Jumbo Loans Daisy Offers'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {jumboTypes[language].map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={typesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-brand-border"
              >
                <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-gold-accent" />
                </div>
                <h3 className="font-display text-lg text-deep-brown mb-2">{type.title}</h3>
                <p className="text-sm text-text-muted">{type.desc}</p>
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
              {isSpanish ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
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
                  value={`faq-${index}`}
                  className="bg-white rounded-xl border border-brand-border overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-cream/50 transition-colors text-left">
                    <span className="font-medium text-deep-brown">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-text-muted">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className="section-padding bg-deep-brown">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-display-lg text-cream mb-4">
              {isSpanish
                ? '¿Listo para financiar la casa de tus sueños? Hablemos de préstamos jumbo.'
                : "Ready to finance your dream home? Let's talk jumbo."}
            </h2>
            <p className="text-warm-taupe/80 mb-8">
              {isSpanish
                ? 'Déjame guiarte a través del proceso de préstamo jumbo con claridad y confianza.'
                : 'Let me guide you through the jumbo loan process with clarity and confidence.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact?purpose=jumbo-loan"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
              >
                {isSpanish ? 'Comenzar con Préstamo Jumbo' : 'Get Started with a Jumbo Loan'}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:8328947676"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cream/30 text-cream rounded-xl font-semibold hover:bg-cream/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {isSpanish ? 'Llamar a Daisy' : 'Call Daisy'}: 832-894-7676
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
