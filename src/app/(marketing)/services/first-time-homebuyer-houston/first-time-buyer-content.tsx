'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Home,
  CheckCircle,
  CreditCard,
  DollarSign,
  FileText,
  Phone,
  ArrowRight,
  Users,
  Clock,
  Shield,
  BookOpen,
  Target,
  Lightbulb,
  AlertCircle,
  Download,
  Mail,
  Award,
  MapPin,
  Briefcase,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Checklist data
const checklistData = {
  en: [
    {
      title: 'Before You Start',
      items: [
        'Check your credit score (aim for 580+ for FHA)',
        'Calculate your debt-to-income ratio',
        'Save for down payment (as low as 3.5% with FHA)',
        'Gather 2 years of tax returns',
        'Collect recent pay stubs and bank statements',
      ],
    },
    {
      title: 'Getting Pre-Approved',
      items: [
        'Contact a loan officer (like Daisy!)',
        'Submit application and documents',
        'Get pre-approval letter',
        'Understand your budget',
        'Learn about loan options',
      ],
    },
    {
      title: 'House Hunting',
      items: [
        'Find a real estate agent',
        'Define your must-haves vs. nice-to-haves',
        'Research Houston neighborhoods',
        'Schedule home tours',
        'Make an offer',
      ],
    },
    {
      title: 'Under Contract',
      items: [
        'Schedule home inspection',
        'Complete appraisal',
        'Finalize your loan',
        'Get homeowner\'s insurance',
        'Review closing disclosure',
      ],
    },
    {
      title: 'Closing Day',
      items: [
        'Do final walkthrough',
        'Bring ID and certified funds',
        'Sign closing documents',
        'Get your keys!',
        'Celebrate your new home!',
      ],
    },
  ],
  es: [
    {
      title: 'Antes de Empezar',
      items: [
        'Revisa tu puntaje de crédito (apunta a 580+ para FHA)',
        'Calcula tu relación deuda-ingreso',
        'Ahorra para el enganche (tan bajo como 3.5% con FHA)',
        'Reúne 2 años de declaraciones de impuestos',
        'Recolecta talones de pago y estados de cuenta recientes',
      ],
    },
    {
      title: 'Obtener Pre-Aprobación',
      items: [
        'Contacta a una oficial de préstamos (¡como Daisy!)',
        'Envía solicitud y documentos',
        'Obtén carta de pre-aprobación',
        'Entiende tu presupuesto',
        'Aprende sobre opciones de préstamo',
      ],
    },
    {
      title: 'Buscar Casa',
      items: [
        'Encuentra un agente de bienes raíces',
        'Define lo que necesitas vs. lo que te gustaría',
        'Investiga vecindarios de Houston',
        'Programa tours de casas',
        'Haz una oferta',
      ],
    },
    {
      title: 'Bajo Contrato',
      items: [
        'Programa inspección de la casa',
        'Completa el avalúo',
        'Finaliza tu préstamo',
        'Obtén seguro de propietario',
        'Revisa el documento de cierre',
      ],
    },
    {
      title: 'Día del Cierre',
      items: [
        'Haz recorrido final',
        'Trae identificación y fondos certificados',
        'Firma documentos de cierre',
        '¡Obtén tus llaves!',
        '¡Celebra tu nueva casa!',
      ],
    },
  ],
};

// Loan options for first-time buyers
const loanOptions = {
  en: [
    {
      name: 'FHA Loans',
      href: '/services/fha-loans-houston',
      icon: Shield,
      highlight: '3.5% Down',
      desc: 'Government-backed loans with low down payment and flexible credit requirements. Perfect for first-time buyers.',
      best: 'Credit scores 580+, limited savings',
    },
    {
      name: 'Down Payment Assistance',
      href: '/services/down-payment-assistance-houston',
      icon: DollarSign,
      highlight: 'Up to $40K',
      desc: 'Grants and forgivable loans to help cover your down payment and closing costs.',
      best: 'Income-qualified buyers, Houston area',
    },
    {
      name: 'ITIN Loans',
      href: '/services/itin-loans-houston',
      icon: FileText,
      highlight: 'No SSN Required',
      desc: 'Buy a home without a Social Security Number using your ITIN.',
      best: 'Immigrant families with ITIN',
    },
    {
      name: 'Conventional Loans',
      href: '/services',
      icon: Home,
      highlight: '3-20% Down',
      desc: 'Traditional financing with competitive rates. PMI removable at 80% LTV.',
      best: 'Credit scores 620+, larger down payment',
    },
    {
      name: 'VA Loans',
      href: '/services/va-loans-houston',
      icon: Award,
      highlight: '0% Down',
      desc: 'For eligible veterans, active-duty military, and surviving spouses. Zero down payment required and no private mortgage insurance (PMI). One of the best loan options available if you qualify.',
      best: 'Veterans, active-duty military, surviving spouses',
    },
    {
      name: 'USDA Loans',
      href: '/services/usda-loans-houston',
      icon: MapPin,
      highlight: '0% Down',
      desc: 'Zero down payment for buyers purchasing in eligible rural and suburban areas near Houston. Income limits apply. Great option for homes in Katy, Fulshear, Waller County, and surrounding areas.',
      best: 'Buyers in eligible rural/suburban areas',
    },
    {
      name: 'Non-Traditional Loans',
      href: '/services/non-traditional-loans-houston',
      icon: Briefcase,
      highlight: 'Self-Employed',
      desc: "If you're self-employed, a contractor, or your income doesn't fit the standard W-2 mold — options like Bank Statement loans, P&L loans, Asset-Based loans, 1099 loans, and WVOE loans may be right for you.",
      best: 'Self-employed, contractors, non-W2 income',
    },
  ],
  es: [
    {
      name: 'Préstamos FHA',
      href: '/services/fha-loans-houston',
      icon: Shield,
      highlight: '3.5% Enganche',
      desc: 'Préstamos respaldados por el gobierno con bajo enganche y requisitos de crédito flexibles. Perfecto para compradores primerizos.',
      best: 'Puntaje de crédito 580+, ahorros limitados',
    },
    {
      name: 'Ayuda para Enganche',
      href: '/services/down-payment-assistance-houston',
      icon: DollarSign,
      highlight: 'Hasta $40K',
      desc: 'Subvenciones y préstamos perdonables para ayudar a cubrir tu enganche y costos de cierre.',
      best: 'Compradores que califican por ingresos, área de Houston',
    },
    {
      name: 'Préstamos ITIN',
      href: '/services/itin-loans-houston',
      icon: FileText,
      highlight: 'Sin SSN Requerido',
      desc: 'Compra una casa sin número de Seguro Social usando tu ITIN.',
      best: 'Familias inmigrantes con ITIN',
    },
    {
      name: 'Préstamos Convencionales',
      href: '/services',
      icon: Home,
      highlight: '3-20% Enganche',
      desc: 'Financiamiento tradicional con tasas competitivas. PMI removible al 80% LTV.',
      best: 'Puntaje de crédito 620+, enganche mayor',
    },
    {
      name: 'Préstamos VA',
      href: '/services/va-loans-houston',
      icon: Award,
      highlight: '0% Enganche',
      desc: 'Para veteranos elegibles, militares en servicio activo y cónyuges sobrevivientes. Sin enganche requerido y sin seguro hipotecario privado (PMI). Una de las mejores opciones si calificas.',
      best: 'Veteranos, militares activos, cónyuges sobrevivientes',
    },
    {
      name: 'Préstamos USDA',
      href: '/services/usda-loans-houston',
      icon: MapPin,
      highlight: '0% Enganche',
      desc: 'Sin enganche para compradores en áreas rurales y suburbanas elegibles cerca de Houston. Se aplican límites de ingresos. Excelente opción para casas en Katy, Fulshear, Waller County y áreas circundantes.',
      best: 'Compradores en áreas rurales/suburbanas elegibles',
    },
    {
      name: 'Préstamos No Tradicionales',
      href: '/services/non-traditional-loans-houston',
      icon: Briefcase,
      highlight: 'Independientes',
      desc: 'Si eres trabajador independiente, contratista, o tus ingresos no encajan en el molde estándar W-2 — opciones como préstamos de estado de cuenta bancario, P&L, basados en activos, 1099 y WVOE pueden ser para ti.',
      best: 'Trabajadores independientes, contratistas, ingresos no-W2',
    },
  ],
};

// Common mistakes
const commonMistakes = {
  en: [
    {
      mistake: 'Not getting pre-approved first',
      tip: 'Get pre-approved before house hunting. Sellers take you more seriously, and you know your budget.',
    },
    {
      mistake: 'Making big purchases before closing',
      tip: 'Avoid buying cars, furniture, or taking new credit cards until after you close. It can affect your approval.',
    },
    {
      mistake: 'Skipping the home inspection',
      tip: "Never skip the inspection. It's worth the cost to know what you're buying.",
    },
    {
      mistake: "Not knowing about DPA programs",
      tip: 'Many buyers leave thousands on the table. Ask about down payment assistance programs.',
    },
    {
      mistake: 'Ignoring closing costs',
      tip: 'Budget 2-5% of the purchase price for closing costs in addition to your down payment.',
    },
  ],
  es: [
    {
      mistake: 'No obtener pre-aprobación primero',
      tip: 'Obtén pre-aprobación antes de buscar casa. Los vendedores te toman más en serio y conoces tu presupuesto.',
    },
    {
      mistake: 'Hacer compras grandes antes del cierre',
      tip: 'Evita comprar autos, muebles o sacar nuevas tarjetas de crédito hasta después del cierre. Puede afectar tu aprobación.',
    },
    {
      mistake: 'Saltarse la inspección de la casa',
      tip: 'Nunca te saltes la inspección. Vale la pena el costo para saber lo que estás comprando.',
    },
    {
      mistake: 'No conocer los programas DPA',
      tip: 'Muchos compradores dejan miles en la mesa. Pregunta sobre programas de ayuda para el enganche.',
    },
    {
      mistake: 'Ignorar los costos de cierre',
      tip: 'Presupuesta 2-5% del precio de compra para costos de cierre además de tu enganche.',
    },
  ],
};

// FAQ data
const faqData = {
  en: [
    {
      question: 'How much do I need for a down payment as a first-time buyer?',
      answer: 'As little as 3.5% with an FHA loan. On a $300,000 home, that is just $10,500. Plus, you may qualify for down payment assistance programs that can cover some or all of your down payment.',
    },
    {
      question: 'What credit score do I need to buy my first home?',
      answer: 'You can qualify for an FHA loan with a credit score as low as 580 (or 500 with 10% down). Conventional loans typically require 620+. Daisy can help you understand your options based on your specific credit situation.',
    },
    {
      question: 'Am I considered a first-time homebuyer if I owned a home before?',
      answer: 'For most programs, you are considered a first-time buyer if you have not owned a home in the past 3 years. So if you owned previously but have been renting for 3+ years, you may still qualify for first-time buyer programs.',
    },
    {
      question: 'How long does it take to buy a home?',
      answer: 'From starting to work with a loan officer to closing, the typical timeline is 30-60 days once you find a home. The house hunting phase varies depending on the market and your criteria.',
    },
    {
      question: 'What is the difference between pre-qualification and pre-approval?',
      answer: 'Pre-qualification is a quick estimate based on self-reported information. Pre-approval involves verifying your income, credit, and assets, resulting in a formal letter that shows sellers you are a serious, qualified buyer.',
    },
    {
      question: 'How much house can I afford?',
      answer: 'A general rule is that your monthly housing payment should not exceed 28-31% of your gross monthly income. However, this varies based on your other debts and expenses. Daisy can help you calculate your specific buying power.',
    },
    {
      question: 'Do I need a real estate agent?',
      answer: 'While not required, a buyer\'s agent is highly recommended. They can negotiate on your behalf, guide you through the process, and help you avoid costly mistakes. Be sure to discuss compensation arrangements upfront with any agent you work with.',
    },
    {
      question: 'What are closing costs?',
      answer: 'Closing costs are fees for services like appraisal, title insurance, attorney fees, and lender fees. They typically run 2-5% of the purchase price. Some can be negotiated with the seller or covered by DPA programs.',
    },
  ],
  es: [
    {
      question: '¿Cuánto necesito para un enganche como comprador primerizo?',
      answer: 'Tan poco como 3.5% con un préstamo FHA. En una casa de $300,000, eso es solo $10,500. Además, puedes calificar para programas de ayuda para el enganche que pueden cubrir parte o todo tu enganche.',
    },
    {
      question: '¿Qué puntaje de crédito necesito para comprar mi primera casa?',
      answer: 'Puedes calificar para un préstamo FHA con un puntaje de crédito tan bajo como 580 (o 500 con 10% de enganche). Los préstamos convencionales típicamente requieren 620+. Daisy puede ayudarte a entender tus opciones basado en tu situación de crédito específica.',
    },
    {
      question: '¿Soy considerado comprador primerizo si tuve una casa antes?',
      answer: 'Para la mayoría de los programas, eres considerado comprador primerizo si no has sido dueño de una casa en los últimos 3 años. Así que si tuviste casa antes pero has estado rentando por 3+ años, aún puedes calificar para programas de compradores primerizos.',
    },
    {
      question: '¿Cuánto tiempo toma comprar una casa?',
      answer: 'Desde empezar a trabajar con una oficial de préstamos hasta el cierre, el tiempo típico es 30-60 días una vez que encuentras una casa. La fase de buscar casa varía dependiendo del mercado y tus criterios.',
    },
    {
      question: '¿Cuál es la diferencia entre pre-calificación y pre-aprobación?',
      answer: 'La pre-calificación es una estimación rápida basada en información auto-reportada. La pre-aprobación involucra verificar tus ingresos, crédito y activos, resultando en una carta formal que muestra a los vendedores que eres un comprador serio y calificado.',
    },
    {
      question: '¿Cuánta casa puedo pagar?',
      answer: 'Una regla general es que tu pago mensual de vivienda no debe exceder 28-31% de tu ingreso mensual bruto. Sin embargo, esto varía basado en tus otras deudas y gastos. Daisy puede ayudarte a calcular tu poder de compra específico.',
    },
    {
      question: '¿Necesito un agente de bienes raíces?',
      answer: 'Aunque no es requerido, un agente de compradores es altamente recomendado. Pueden negociar en tu nombre, guiarte en el proceso y ayudarte a evitar errores costosos. Asegúrate de discutir los arreglos de compensación con cualquier agente con el que trabajes.',
    },
    {
      question: '¿Qué son los costos de cierre?',
      answer: 'Los costos de cierre son tarifas por servicios como avalúo, seguro de título, tarifas de abogado y tarifas del prestamista. Típicamente son 2-5% del precio de compra. Algunos pueden negociarse con el vendedor o cubrirse con programas DPA.',
    },
  ],
};

// Email capture component
function ChecklistDownload({ language }: { language: 'en' | 'es' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder for Supabase integration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h4 className="font-display text-lg text-deep-brown mb-2">
          {language === 'es' ? '¡Revisa Tu Email!' : 'Check Your Email!'}
        </h4>
        <p className="text-sm text-text-muted">
          {language === 'es'
            ? 'Tu guía de comprador primerizo está en camino.'
            : 'Your first-time homebuyer guide is on its way.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-deep-brown mb-1">
          {language === 'es' ? 'Tu Correo Electrónico' : 'Your Email'}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={language === 'es' ? 'tu@email.com' : 'you@email.com'}
          className="w-full px-4 py-3 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gold-accent text-dark-footer rounded-lg font-semibold hover:bg-gold-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span>{language === 'es' ? 'Enviando...' : 'Sending...'}</span>
        ) : (
          <>
            <Download className="w-4 h-4" />
            {language === 'es' ? 'Obtener la Guía Gratis' : 'Get the Free Guide'}
          </>
        )}
      </button>
      <p className="text-xs text-text-muted text-center">
        {language === 'es'
          ? 'Sin spam. Solo recursos útiles para tu viaje de compra de casa.'
          : 'No spam. Just helpful resources for your homebuying journey.'}
      </p>
    </form>
  );
}

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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: language === 'en'
      ? 'First-Time Homebuyer Guide Houston TX'
      : 'Guía para Compradores Primerizos Houston TX',
    description: language === 'en'
      ? 'Complete guide for first-time homebuyers in Houston, Texas.'
      : 'Guía completa para compradores primerizos en Houston, Texas.',
    author: {
      '@type': 'Person',
      name: 'Daisy Castro',
      jobTitle: 'Mortgage Loan Officer',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lending & Living',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}

export function FirstTimeBuyerContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const checklistRef = useRef(null);
  const optionsRef = useRef(null);
  const mistakesRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const checklistInView = useInView(checklistRef, { once: true, margin: '-100px' });
  const optionsInView = useInView(optionsRef, { once: true, margin: '-100px' });
  const mistakesInView = useInView(mistakesRef, { once: true, margin: '-100px' });
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
                  ? 'Guía para Compradores Primerizos Houston TX — Todo lo que Necesitas Saber'
                  : 'First-Time Homebuyer Guide Houston TX — Everything You Need to Know'}
              </h1>

              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'Comprar tu primera casa puede ser abrumador. Esta guía te llevará paso a paso a través del proceso.'
                  : 'Buying your first home can be overwhelming. This guide will walk you through the process step by step.'}
              </p>

              {/* Spanish Callout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border-2 border-gold-accent/40 rounded-xl p-6 mt-8 max-w-2xl mx-auto"
              >
                <p className="font-cormorant italic text-xl text-gold-accent">
                  {isSpanish
                    ? '¿Listo para ser dueño de tu primera casa? Daisy está aquí para guiarte.'
                    : 'Ready to own your first home? Daisy is here to guide you.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <Link
                  href="/contact"
                  className="btn-primary flex items-center gap-2"
                >
                  {isSpanish ? 'Empezar Mi Viaje' : 'Start My Journey'}
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
            </motion.div>
          </div>
        </section>

        {/* Checklist Section */}
        <section ref={checklistRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Checklist */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={checklistInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-display-lg text-deep-brown mb-4">
                    {isSpanish ? 'Guía del Comprador Primerizo' : 'First-Time Homebuyer Guide'}
                  </h2>
                  <p className="text-text-muted">
                    {isSpanish
                      ? 'Sigue estos pasos para comprar tu primera casa con confianza.'
                      : 'Follow these steps to buy your first home with confidence.'}
                  </p>
                </motion.div>

                <div className="space-y-6">
                  {checklistData[language].map((section, sectionIndex) => (
                    <motion.div
                      key={sectionIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={checklistInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                      className="bg-cream rounded-xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gold-accent text-dark-footer flex items-center justify-center font-display font-bold text-sm">
                          {sectionIndex + 1}
                        </div>
                        <h3 className="font-display text-lg text-deep-brown">{section.title}</h3>
                      </div>
                      <ul className="space-y-2 pl-11">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm text-text-muted">
                            <div className="w-4 h-4 rounded border border-brand-border mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Download Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={checklistInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-deep-brown rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold-accent/20 flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-gold-accent" />
                  </div>
                  <h3 className="font-display text-xl text-cream mb-2">
                    {isSpanish ? 'Descarga la Guía Gratis' : 'Download Free Homebuyer Guide'}
                  </h3>
                  <p className="text-warm-taupe/80 text-sm mb-6">
                    {isSpanish
                      ? 'Obtén una versión imprimible para seguir tu progreso.'
                      : 'Get a printable version to track your progress.'}
                  </p>
                  <ChecklistDownload language={language} />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Options Section */}
        <section ref={optionsRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={optionsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'Opciones de Préstamo para Compradores Primerizos' : 'Loan Options for First-Time Buyers'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'Hay varias opciones de financiamiento diseñadas para compradores primerizos.'
                  : 'There are several financing options designed for first-time buyers.'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {loanOptions[language].map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={optionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={option.href}
                    className="group block h-full bg-white rounded-xl p-6 border border-brand-border hover:border-gold-accent/50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center group-hover:bg-gold-accent/20 transition-colors">
                        <option.icon className="w-6 h-6 text-gold-accent" />
                      </div>
                      <span className="text-xs px-2.5 py-1 bg-gold-accent/10 text-gold-accent rounded-full font-semibold">
                        {option.highlight}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-deep-brown mb-2 group-hover:text-gold-accent transition-colors">
                      {option.name}
                    </h3>
                    <p className="text-sm text-text-muted mb-4">{option.desc}</p>
                    <p className="text-xs text-text-muted">
                      <span className="font-semibold text-deep-brown">{isSpanish ? 'Mejor para: ' : 'Best for: '}</span>
                      {option.best}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gold-accent mt-4 group-hover:gap-2 transition-all">
                      {isSpanish ? 'Más Información' : 'Learn More'}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section ref={mistakesRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mistakesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'Errores Comunes a Evitar' : 'Common Mistakes to Avoid'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'Aprende de los errores de otros para tener una experiencia de compra más suave.'
                  : 'Learn from others\' mistakes for a smoother buying experience.'}
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {commonMistakes[language].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={mistakesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-cream rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-deep-brown mb-1">{item.mistake}</p>
                      <p className="text-sm text-text-muted flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-gold-accent flex-shrink-0 mt-0.5" />
                        {item.tip}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
                {isSpanish ? 'Preguntas Frecuentes de Compradores Primerizos' : 'First-Time Buyer FAQs'}
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
                  ? '¿Listo para Comprar Tu Primera Casa?'
                  : 'Ready to Buy Your First Home?'}
              </h2>
              <p className="text-warm-taupe/80 text-lg mb-8">
                {isSpanish
                  ? 'Daisy ha ayudado a cientos de compradores primerizos en Houston. Déjala guiarte también.'
                  : 'Daisy has helped hundreds of first-time buyers in Houston. Let her guide you too.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
                >
                  {isSpanish ? 'Empezar Ahora' : 'Get Started Now'}
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
