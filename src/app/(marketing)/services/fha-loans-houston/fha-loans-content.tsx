'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Home,
  CheckCircle,
  CreditCard,
  Percent,
  Shield,
  Phone,
  ArrowRight,
  Users,
  Clock,
  FileCheck,
  DollarSign,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// FHA vs Conventional comparison data
const comparisonData = {
  en: {
    headers: ['Feature', 'FHA Loan', 'Conventional Loan'],
    rows: [
      ['Minimum Down Payment', '3.5%', '3-20%'],
      ['Minimum Credit Score', '580 (500 with 10% down)', '620+'],
      ['Mortgage Insurance', 'Required for life of loan', 'Removable at 80% LTV'],
      ['Property Standards', 'Strict FHA requirements', 'More flexible'],
      ['Best For', 'First-time buyers, lower credit', 'Strong credit, larger down payment'],
    ],
  },
  es: {
    headers: ['Característica', 'Préstamo FHA', 'Préstamo Convencional'],
    rows: [
      ['Enganche Mínimo', '3.5%', '3-20%'],
      ['Puntaje de Crédito Mínimo', '580 (500 con 10% enganche)', '620+'],
      ['Seguro Hipotecario', 'Requerido por vida del préstamo', 'Removible al 80% LTV'],
      ['Estándares de Propiedad', 'Requisitos estrictos FHA', 'Más flexible'],
      ['Mejor Para', 'Compradores primerizos, crédito bajo', 'Buen crédito, enganche mayor'],
    ],
  },
};

// FHA Benefits
const fhaBenefits = {
  en: [
    {
      icon: Percent,
      title: '3.5% Down Payment',
      desc: 'One of the lowest down payments available — just $10,500 on a $300,000 home.',
    },
    {
      icon: CreditCard,
      title: 'Flexible Credit',
      desc: 'Qualify with a 580 credit score. Even 500 with 10% down.',
    },
    {
      icon: Users,
      title: 'Gift Funds Allowed',
      desc: '100% of your down payment can come from family, employer, or approved donors.',
    },
    {
      icon: Shield,
      title: 'Government Backed',
      desc: 'FHA insurance protects lenders, making it easier for you to qualify.',
    },
    {
      icon: DollarSign,
      title: 'Combine with DPA',
      desc: 'Stack FHA with down payment assistance programs for even lower out-of-pocket costs.',
    },
    {
      icon: Clock,
      title: 'Shorter Waiting Periods',
      desc: 'Bankruptcy or foreclosure? FHA has shorter waiting periods than conventional.',
    },
  ],
  es: [
    {
      icon: Percent,
      title: '3.5% de Enganche',
      desc: 'Uno de los enganches más bajos disponibles — solo $10,500 en una casa de $300,000.',
    },
    {
      icon: CreditCard,
      title: 'Crédito Flexible',
      desc: 'Califica con puntaje de crédito de 580. Hasta 500 con 10% de enganche.',
    },
    {
      icon: Users,
      title: 'Fondos de Regalo Permitidos',
      desc: '100% de tu enganche puede venir de familia, empleador o donantes aprobados.',
    },
    {
      icon: Shield,
      title: 'Respaldado por el Gobierno',
      desc: 'El seguro FHA protege a los prestamistas, facilitando que califiques.',
    },
    {
      icon: DollarSign,
      title: 'Combina con DPA',
      desc: 'Combina FHA con programas de ayuda para el enganche para costos aún más bajos.',
    },
    {
      icon: Clock,
      title: 'Períodos de Espera Más Cortos',
      desc: '¿Bancarrota o ejecución hipotecaria? FHA tiene períodos de espera más cortos.',
    },
  ],
};

// FHA Requirements
const fhaRequirements = {
  en: [
    'Minimum credit score of 580 (500 with 10% down)',
    '3.5% minimum down payment',
    'Steady employment history (2 years)',
    'Property must meet FHA standards',
    'Primary residence only',
    'Valid Social Security Number',
    'Proof of income and assets',
  ],
  es: [
    'Puntaje de crédito mínimo de 580 (500 con 10% enganche)',
    '3.5% de enganche mínimo',
    'Historial de empleo estable (2 años)',
    'La propiedad debe cumplir estándares FHA',
    'Solo residencia principal',
    'Número de Seguro Social válido',
    'Comprobante de ingresos y activos',
  ],
};

// Process steps
const processSteps = {
  en: [
    { title: 'Get Pre-Approved', desc: 'Quick application with Daisy to know your budget' },
    { title: 'Find Your Home', desc: 'Shop for homes within your FHA loan amount' },
    { title: 'Make an Offer', desc: "Your pre-approval strengthens your offer" },
    { title: 'FHA Appraisal', desc: 'Home must meet FHA property standards' },
    { title: 'Close & Move In', desc: 'Sign papers and get your keys!' },
  ],
  es: [
    { title: 'Obtén Pre-Aprobación', desc: 'Solicitud rápida con Daisy para conocer tu presupuesto' },
    { title: 'Encuentra Tu Casa', desc: 'Busca casas dentro de tu monto de préstamo FHA' },
    { title: 'Haz una Oferta', desc: 'Tu pre-aprobación fortalece tu oferta' },
    { title: 'Avalúo FHA', desc: 'La casa debe cumplir estándares de propiedad FHA' },
    { title: 'Cierra y Múdate', desc: '¡Firma papeles y obtén tus llaves!' },
  ],
};

// FAQ data
const faqData = {
  en: [
    {
      question: 'What is an FHA loan?',
      answer: 'An FHA loan is a mortgage insured by the Federal Housing Administration. This government backing allows lenders to offer more flexible qualification requirements, lower down payments, and competitive interest rates — making homeownership accessible to more buyers.',
    },
    {
      question: 'What credit score do I need for an FHA loan in Texas?',
      answer: 'You need a minimum credit score of 580 to qualify for an FHA loan with 3.5% down. If your score is between 500-579, you can still qualify with 10% down. Daisy can help you explore your options based on your specific credit situation.',
    },
    {
      question: 'How much down payment do I need for an FHA loan?',
      answer: 'The minimum down payment for an FHA loan is 3.5% of the purchase price with a 580+ credit score. On a $300,000 home, that is just $10,500. Plus, you can combine FHA with down payment assistance programs to reduce your out-of-pocket costs even further.',
    },
    {
      question: 'What are FHA loan limits in Houston?',
      answer: 'FHA loan limits vary by county and are updated annually. For 2026, the FHA loan limit in Harris County is $524,225 for a single-family home. Higher limits apply to multi-family properties: $671,200 for duplexes, $811,275 for triplexes, and $1,008,300 for fourplexes. Daisy can confirm the current limits for your target area.',
    },
    {
      question: 'Can I buy a duplex or triplex with an FHA loan?',
      answer: 'Yes — FHA loans can be used to purchase multi-unit properties including duplexes (2 units), triplexes (3 units), and fourplexes (4 units), as long as you live in one of the units as your primary residence. This is one of the most powerful FHA benefits for buyers who want to start building wealth through real estate. The rental income from the other units can also help offset your mortgage payment. Contact Daisy to learn how this strategy could work for you.',
    },
    {
      question: 'Do FHA loans require mortgage insurance?',
      answer: 'Yes, FHA loans require both an upfront mortgage insurance premium (UFMIP) of 1.75% of the loan amount (which can be rolled into your loan) and annual mortgage insurance premiums (MIP) for the life of the loan on most FHA loans.',
    },
    {
      question: 'Can I use an FHA loan to buy a condo?',
      answer: 'Yes, but the condo complex must be on the FHA-approved condo list. Not all condos qualify. Daisy can help you verify if a specific condo complex is FHA-approved before you make an offer.',
    },
    {
      question: 'How long does it take to close an FHA loan?',
      answer: 'FHA loans typically close in 30-45 days, similar to conventional loans. The FHA appraisal may add a few days if repairs are needed to meet FHA property standards. Working with an experienced loan officer helps keep things on track.',
    },
    {
      question: 'Can I refinance into an FHA loan?',
      answer: 'Yes, FHA offers both rate-and-term refinancing and FHA Streamline refinancing (for existing FHA borrowers). The Streamline option has reduced documentation requirements and can be faster. Contact Daisy to discuss your refinance options.',
    },
  ],
  es: [
    {
      question: '¿Qué es un préstamo FHA?',
      answer: 'Un préstamo FHA es una hipoteca asegurada por la Administración Federal de Vivienda. Este respaldo del gobierno permite a los prestamistas ofrecer requisitos de calificación más flexibles, enganches más bajos y tasas de interés competitivas — haciendo que la propiedad de vivienda sea accesible para más compradores.',
    },
    {
      question: '¿Qué puntaje de crédito necesito para un préstamo FHA en Texas?',
      answer: 'Necesitas un puntaje de crédito mínimo de 580 para calificar para un préstamo FHA con 3.5% de enganche. Si tu puntaje está entre 500-579, aún puedes calificar con 10% de enganche. Daisy puede ayudarte a explorar tus opciones basado en tu situación de crédito específica.',
    },
    {
      question: '¿Cuánto enganche necesito para un préstamo FHA?',
      answer: 'El enganche mínimo para un préstamo FHA es 3.5% del precio de compra con un puntaje de crédito de 580+. En una casa de $300,000, eso es solo $10,500. Además, puedes combinar FHA con programas de ayuda para el enganche para reducir tus costos aún más.',
    },
    {
      question: '¿Cuáles son los límites de préstamos FHA en Houston?',
      answer: 'Los límites de préstamos FHA varían por condado y se actualizan anualmente. Para 2026, el límite de préstamo FHA en el Condado Harris es $524,225 para una casa unifamiliar. Límites más altos aplican a propiedades multifamiliares: $671,200 para dúplex, $811,275 para tríplex, y $1,008,300 para cuádruplex. Daisy puede confirmar los límites actuales para tu área objetivo.',
    },
    {
      question: '¿Puedo comprar un dúplex o tríplex con un préstamo FHA?',
      answer: 'Sí — los préstamos FHA se pueden usar para comprar propiedades de múltiples unidades, incluyendo dúplex (2 unidades), tríplex (3 unidades) y cuádruplex (4 unidades), siempre que vivas en una de las unidades como tu residencia principal. Esta es una de las ventajas más poderosas del FHA para compradores que quieren comenzar a construir riqueza a través de bienes raíces. Los ingresos de renta de las otras unidades también pueden ayudar a compensar tu pago hipotecario. Contacta a Daisy para conocer cómo esta estrategia puede funcionar para ti.',
    },
    {
      question: '¿Los préstamos FHA requieren seguro hipotecario?',
      answer: 'Sí, los préstamos FHA requieren tanto una prima de seguro hipotecario inicial (UFMIP) del 1.75% del monto del préstamo (que se puede incluir en tu préstamo) como primas anuales de seguro hipotecario (MIP) por la vida del préstamo en la mayoría de los préstamos FHA.',
    },
    {
      question: '¿Puedo usar un préstamo FHA para comprar un condominio?',
      answer: 'Sí, pero el complejo de condominios debe estar en la lista de condominios aprobados por FHA. No todos los condominios califican. Daisy puede ayudarte a verificar si un complejo de condominios específico está aprobado por FHA antes de que hagas una oferta.',
    },
    {
      question: '¿Cuánto tiempo toma cerrar un préstamo FHA?',
      answer: 'Los préstamos FHA típicamente cierran en 30-45 días, similar a los préstamos convencionales. El avalúo FHA puede agregar unos días si se necesitan reparaciones para cumplir con los estándares de propiedad FHA. Trabajar con una oficial de préstamos experimentada ayuda a mantener las cosas en tiempo.',
    },
    {
      question: '¿Puedo refinanciar a un préstamo FHA?',
      answer: 'Sí, FHA ofrece refinanciamiento de tasa y plazo y refinanciamiento FHA Streamline (para prestatarios FHA existentes). La opción Streamline tiene requisitos de documentación reducidos y puede ser más rápida. Contacta a Daisy para discutir tus opciones de refinanciamiento.',
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
    name: 'FHA Loans Houston',
    description: language === 'en'
      ? 'FHA home loans in Houston, Texas with low down payment and flexible credit requirements.'
      : 'Préstamos de vivienda FHA en Houston, Texas con bajo enganche y requisitos de crédito flexibles.',
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

export function FHALoansContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const requirementsRef = useRef(null);
  const comparisonRef = useRef(null);
  const processRef = useRef(null);
  const loanLimitsRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });
  const requirementsInView = useInView(requirementsRef, { once: true, margin: '-100px' });
  const comparisonInView = useInView(comparisonRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const loanLimitsInView = useInView(loanLimitsRef, { once: true, margin: '-100px' });
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
                  ? 'Préstamos FHA Houston TX — Bajo Enganche, Requisitos de Crédito Flexibles'
                  : 'FHA Loans Houston TX — Low Down Payment, Flexible Credit Requirements'}
              </h1>

              {/* Spanish Callout Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border-2 border-gold-accent/40 rounded-xl p-6 mt-8 max-w-2xl mx-auto"
              >
                <p className="font-cormorant italic text-xl text-gold-accent">
                  {isSpanish
                    ? 'Los préstamos FHA son perfectos para compradores primerizos. Solo necesitas 3.5% de enganche.'
                    : 'FHA loans are perfect for first-time buyers. You only need 3.5% down.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <Link
                  href="/contact?type=fha"
                  className="btn-primary flex items-center gap-2"
                >
                  {isSpanish ? 'Obtén Pre-Aprobación FHA' : 'Get FHA Pre-Approved'}
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
                  { value: '3.5%', label: isSpanish ? 'Enganche' : 'Down' },
                  { value: '580', label: isSpanish ? 'Crédito Min.' : 'Min. Credit' },
                  { value: '$524K', label: isSpanish ? 'Límite 2026' : '2026 Limit' },
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
                {isSpanish ? 'Beneficios de los Préstamos FHA' : 'FHA Loan Benefits'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? '¿Por qué millones de compradores eligen FHA cada año?'
                  : 'Why do millions of buyers choose FHA each year?'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fhaBenefits[language].map((benefit, index) => (
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
                  {isSpanish ? 'Requisitos de Préstamo FHA' : 'FHA Loan Requirements'}
                </h2>
                <p className="text-text-muted mb-8">
                  {isSpanish
                    ? 'FHA tiene algunos de los requisitos de calificación más flexibles disponibles.'
                    : 'FHA has some of the most flexible qualification requirements available.'}
                </p>
                <ul className="space-y-4">
                  {fhaRequirements[language].map((req, index) => (
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
                  <FileCheck className="w-8 h-8 text-gold-accent" />
                </div>
                <h3 className="font-display text-2xl text-cream mb-4">
                  {isSpanish ? '¿No Cumples Todos los Requisitos?' : "Don't Meet Every Requirement?"}
                </h3>
                <p className="text-warm-taupe/80 mb-6">
                  {isSpanish
                    ? 'No te preocupes — Daisy puede revisar tu situación y encontrar la mejor opción para ti.'
                    : "Don't worry — Daisy can review your situation and find the best option for you."}
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
                {isSpanish ? 'FHA vs. Préstamo Convencional' : 'FHA vs. Conventional Loan'}
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

        {/* Process Section */}
        <section ref={processRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'El Proceso de Préstamo FHA' : 'The FHA Loan Process'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'De la solicitud a las llaves en 5 pasos simples'
                  : 'From application to keys in 5 simple steps'}
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gold-accent/30 -translate-y-1/2" />

              <div className="grid md:grid-cols-5 gap-8">
                {processSteps[language].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={processInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative text-center"
                  >
                    <div className="relative z-10 w-10 h-10 rounded-full bg-gold-accent text-dark-footer flex items-center justify-center mx-auto mb-3 font-display font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-display text-base text-deep-brown mb-1">{step.title}</h3>
                    <p className="text-xs text-text-muted">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2026 FHA Loan Limits Section */}
        <section ref={loanLimitsRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loanLimitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'Límites de Préstamos FHA 2026 — Área de Houston' : '2026 FHA Loan Limits — Houston Area'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'Los límites de préstamos FHA son establecidos anualmente por HUD. Para 2026, los límites del área de Houston (Condado Harris) son:'
                  : 'FHA loan limits are set annually by HUD. For 2026, the Houston-area (Harris County) FHA limits are:'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loanLimitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-xl border border-brand-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cream">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-deep-brown">
                        {isSpanish ? 'Tipo de Propiedad' : 'Property Type'}
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-deep-brown">
                        {isSpanish ? 'Límite 2026' : '2026 Limit'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-brand-border">
                      <td className="px-6 py-4 text-sm text-text-body">
                        {isSpanish ? 'Casa Unifamiliar (1 Unidad)' : 'Single Family (1 Unit)'}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-gold-accent">$524,225</td>
                    </tr>
                    <tr className="border-t border-brand-border bg-cream/50">
                      <td className="px-6 py-4 text-sm text-text-body">
                        {isSpanish ? 'Dúplex (2 Unidades)' : 'Duplex (2 Units)'}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-gold-accent">$671,200</td>
                    </tr>
                    <tr className="border-t border-brand-border">
                      <td className="px-6 py-4 text-sm text-text-body">
                        {isSpanish ? 'Tríplex (3 Unidades)' : 'Triplex (3 Units)'}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-gold-accent">$811,275</td>
                    </tr>
                    <tr className="border-t border-brand-border bg-cream/50">
                      <td className="px-6 py-4 text-sm text-text-body">
                        {isSpanish ? 'Cuádruplex (4 Unidades)' : 'Fourplex (4 Units)'}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-gold-accent">$1,008,300</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-text-muted mt-4 text-center">
                {isSpanish
                  ? 'Estos límites representan el monto máximo del préstamo para una hipoteca asegurada por FHA en el área metropolitana de Houston. Propiedades con precios por encima de estos límites requerirían un tipo de préstamo diferente, como un préstamo convencional o jumbo.'
                  : 'These limits represent the maximum loan amount for an FHA-insured mortgage in the Houston metropolitan area. Properties priced above these limits would require a different loan type such as a conventional or jumbo loan.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'Preguntas Frecuentes sobre FHA' : 'FHA Loan FAQs'}
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
                <Home className="w-8 h-8 text-gold-accent" />
              </div>
              <h2 className="text-display-lg text-cream mb-4">
                {isSpanish
                  ? '¿Listo para Explorar Tu Opción FHA?'
                  : 'Ready to Explore Your FHA Option?'}
              </h2>
              <p className="text-warm-taupe/80 text-lg mb-8">
                {isSpanish
                  ? 'Daisy te ayudará a determinar si FHA es la mejor opción para ti.'
                  : "Daisy will help you determine if FHA is the best fit for you."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?type=fha"
                  className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
                >
                  {isSpanish ? 'Obtén Pre-Aprobación FHA' : 'Get FHA Pre-Approved'}
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
