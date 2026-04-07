'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  DollarSign,
  CheckCircle,
  XCircle,
  Users,
  Home,
  Phone,
  ArrowRight,
  Building,
  Award,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Income limits table data (Harris County)
const incomeLimits = {
  headers: {
    en: ['Household Size', '80% AMI (Most Programs)', '115% AMI (TDHCA)'],
    es: ['Tamaño del Hogar', '80% AMI (Mayoría de Programas)', '115% AMI (TDHCA)'],
  },
  rows: [
    ['1', '$62,500', '$89,700'],
    ['2', '$71,400', '$102,500'],
    ['3', '$80,350', '$115,300'],
    ['4', '$89,250', '$128,100'],
    ['5', '$96,400', '$138,350'],
    ['6+', '$103,550', '$148,600'],
  ],
};

// Myths data
const mythsData = {
  en: [
    {
      myth: 'Down payment assistance is only for low-income buyers',
      truth: 'Many programs serve middle-income families. Income limits can be as high as $128,000+ for a family of 4 depending on the program.',
    },
    {
      myth: 'The application process takes forever',
      truth: 'With an experienced loan officer like Daisy, DPA can be added to your loan with minimal additional time — often just a few extra days.',
    },
    {
      myth: "You have to pay back all the assistance if you sell",
      truth: "Many programs are forgiven over time (3-10 years). If you sell after the forgiveness period, you owe nothing back.",
    },
    {
      myth: 'DPA is only for first-time buyers',
      truth: "While many programs target first-time buyers, some (like SETH) are available to repeat buyers, and veterans often qualify regardless of previous homeownership.",
    },
  ],
  es: [
    {
      myth: 'La ayuda para enganche es solo para compradores de bajos ingresos',
      truth: 'Muchos programas sirven a familias de ingresos medios. Los límites de ingresos pueden ser hasta $128,000+ para una familia de 4 dependiendo del programa.',
    },
    {
      myth: 'El proceso de solicitud toma una eternidad',
      truth: 'Con una oficial de préstamos experimentada como Daisy, DPA se puede agregar a tu préstamo con tiempo adicional mínimo — a menudo solo unos días extra.',
    },
    {
      myth: 'Tienes que devolver toda la asistencia si vendes',
      truth: 'Muchos programas se perdonan con el tiempo (3-10 años). Si vendes después del período de perdón, no debes nada.',
    },
    {
      myth: 'DPA es solo para compradores primerizos',
      truth: 'Mientras muchos programas se enfocan en compradores primerizos, algunos (como SETH) están disponibles para compradores repetidos, y los veteranos a menudo califican sin importar si han tenido casa antes.',
    },
  ],
};

// FAQ data
const faqData = {
  en: [
    {
      question: 'What is down payment assistance?',
      answer: 'Down payment assistance (DPA) programs provide grants, forgivable loans, or low-interest loans to help homebuyers cover their down payment and closing costs. In Houston, these programs can provide up to $40,000 in assistance.',
    },
    {
      question: 'Do I have to be a first-time homebuyer to qualify?',
      answer: 'Not always. While many programs require first-time buyer status (meaning you have not owned a home in the past 3 years), some programs like SETH are available to repeat buyers. Veterans often qualify regardless of previous ownership.',
    },
    {
      question: 'What income limits apply to DPA programs?',
      answer: 'Income limits vary by program and household size. Generally, you need to earn below 80-115% of the Area Median Income (AMI). For Harris County in 2026, this can range from $62,500 to $128,000+ depending on household size and program.',
    },
    {
      question: 'Can I combine DPA with FHA, VA, or conventional loans?',
      answer: 'Yes! Most DPA programs are designed to work alongside FHA, VA, USDA, and conventional loans. Daisy can help you find the best combination for your situation.',
    },
    {
      question: 'Do I have to pay back the down payment assistance?',
      answer: 'It depends on the program. Some DPA is a true grant (never repaid). Others are forgivable loans that are forgiven after 3-10 years if you stay in the home. Some are deferred loans repaid when you sell or refinance.',
    },
    {
      question: 'How long does the DPA process take?',
      answer: 'When working with an experienced loan officer, adding DPA to your loan typically adds only a few days to the closing timeline. Most DPA loans close in 30-45 days total.',
    },
    {
      question: 'What can DPA funds be used for?',
      answer: 'Down payment assistance can typically be used for your down payment, closing costs, and sometimes even prepaid items like homeowners insurance and property taxes.',
    },
    {
      question: 'How do I know which DPA program I qualify for?',
      answer: 'The best way to find out is to talk to Daisy. She will review your income, household size, purchase area, and loan type to identify all the programs you may qualify for — often revealing options you did not know existed.',
    },
  ],
  es: [
    {
      question: '¿Qué es la ayuda para el enganche?',
      answer: 'Los programas de ayuda para el enganche (DPA) proporcionan subvenciones, préstamos perdonables o préstamos de bajo interés para ayudar a los compradores a cubrir su enganche y costos de cierre. En Houston, estos programas pueden proporcionar hasta $40,000 en asistencia.',
    },
    {
      question: '¿Tengo que ser comprador primerizo para calificar?',
      answer: 'No siempre. Mientras muchos programas requieren ser comprador primerizo (significa que no has sido dueño de una casa en los últimos 3 años), algunos programas como SETH están disponibles para compradores repetidos. Los veteranos a menudo califican sin importar propiedad previa.',
    },
    {
      question: '¿Qué límites de ingresos aplican a los programas DPA?',
      answer: 'Los límites de ingresos varían por programa y tamaño del hogar. Generalmente, necesitas ganar menos del 80-115% del Ingreso Medio del Área (AMI). Para el Condado Harris en 2026, esto puede variar de $62,500 a $128,000+ dependiendo del tamaño del hogar y programa.',
    },
    {
      question: '¿Puedo combinar DPA con préstamos FHA, VA o convencionales?',
      answer: '¡Sí! La mayoría de los programas DPA están diseñados para funcionar junto con préstamos FHA, VA, USDA y convencionales. Daisy puede ayudarte a encontrar la mejor combinación para tu situación.',
    },
    {
      question: '¿Tengo que devolver la ayuda para el enganche?',
      answer: 'Depende del programa. Algunos DPA son subvenciones verdaderas (nunca se devuelven). Otros son préstamos perdonables que se perdonan después de 3-10 años si te quedas en la casa. Algunos son préstamos diferidos que se pagan cuando vendes o refinancias.',
    },
    {
      question: '¿Cuánto tiempo toma el proceso de DPA?',
      answer: 'Cuando trabajas con una oficial de préstamos experimentada, agregar DPA a tu préstamo típicamente agrega solo unos días al tiempo de cierre. La mayoría de los préstamos DPA cierran en 30-45 días en total.',
    },
    {
      question: '¿Para qué se pueden usar los fondos DPA?',
      answer: 'La ayuda para el enganche típicamente se puede usar para tu enganche, costos de cierre, y a veces incluso artículos prepagados como seguro de propietario e impuestos de propiedad.',
    },
    {
      question: '¿Cómo sé para cuál programa DPA califico?',
      answer: 'La mejor manera de saberlo es hablar con Daisy. Ella revisará tus ingresos, tamaño del hogar, área de compra y tipo de préstamo para identificar todos los programas para los que puedes calificar — a menudo revelando opciones que no sabías que existían.',
    },
  ],
};

// JSON-LD Schema Component
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

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: language === 'en' ? 'How to Get Down Payment Assistance in Houston' : 'Cómo Obtener Ayuda para el Enganche en Houston',
    description: language === 'en'
      ? 'Steps to qualify for and receive down payment assistance for buying a home in Houston, Texas.'
      : 'Pasos para calificar y recibir ayuda para el enganche para comprar una casa en Houston, Texas.',
    step: [
      {
        '@type': 'HowToStep',
        name: language === 'en' ? 'Check Income Eligibility' : 'Verificar Elegibilidad de Ingresos',
        text: language === 'en'
          ? 'Verify your household income falls within program limits (typically 80-115% of Area Median Income).'
          : 'Verifica que los ingresos de tu hogar están dentro de los límites del programa (típicamente 80-115% del Ingreso Medio del Área).',
      },
      {
        '@type': 'HowToStep',
        name: language === 'en' ? 'Contact a DPA-Approved Lender' : 'Contactar a un Prestamista Aprobado para DPA',
        text: language === 'en'
          ? 'Work with a loan officer like Daisy who is approved to offer DPA programs.'
          : 'Trabaja con una oficial de préstamos como Daisy que está aprobada para ofrecer programas DPA.',
      },
      {
        '@type': 'HowToStep',
        name: language === 'en' ? 'Complete Homebuyer Education' : 'Completar Educación de Comprador',
        text: language === 'en'
          ? 'Most programs require a HUD-approved homebuyer education course (often free or low-cost).'
          : 'La mayoría de los programas requieren un curso de educación de comprador aprobado por HUD (a menudo gratis o de bajo costo).',
      },
      {
        '@type': 'HowToStep',
        name: language === 'en' ? 'Apply for Your Loan with DPA' : 'Solicitar Tu Préstamo con DPA',
        text: language === 'en'
          ? 'Submit your loan application with the DPA program included. Your loan officer handles the coordination.'
          : 'Envía tu solicitud de préstamo con el programa DPA incluido. Tu oficial de préstamos maneja la coordinación.',
      },
      {
        '@type': 'HowToStep',
        name: language === 'en' ? 'Close on Your New Home' : 'Cerrar en Tu Nueva Casa',
        text: language === 'en'
          ? 'At closing, the DPA funds are applied to your down payment and/or closing costs automatically.'
          : 'Al cierre, los fondos DPA se aplican a tu enganche y/o costos de cierre automáticamente.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}

export function DPAContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const whatIsRef = useRef(null);
  const incomeRef = useRef(null);
  const mythsRef = useRef(null);
  const qualifyCTARef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const whatIsInView = useInView(whatIsRef, { once: true, margin: '-100px' });
  const incomeInView = useInView(incomeRef, { once: true, margin: '-100px' });
  const mythsInView = useInView(mythsRef, { once: true, margin: '-100px' });
  const qualifyCTAInView = useInView(qualifyCTARef, { once: true, margin: '-100px' });
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
                  ? 'Programas de Ayuda para el Enganche Houston TX'
                  : 'Down Payment Assistance Programs Houston TX'}
              </h1>

              {/* Spanish Callout Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border-2 border-gold-accent/40 rounded-xl p-6 mt-8 max-w-2xl mx-auto"
              >
                <p className="font-cormorant italic text-xl text-gold-accent">
                  Ayuda para el enganche — la mayoría de los compradores en Houston no saben que esto existe.
                </p>
                <p className="text-text-muted text-sm mt-2">
                  {isSpanish
                    ? 'Hasta $40,000 en asistencia disponible'
                    : 'Up to $40,000 in assistance available'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <Link
                  href="/contact?type=dpa"
                  className="btn-primary flex items-center gap-2"
                >
                  {isSpanish ? 'Verificar Mi Elegibilidad' : 'Check My Eligibility'}
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

        {/* What Is DPA Section */}
        <section ref={whatIsRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-display-lg text-deep-brown mb-6">
                  {isSpanish ? '¿Qué es la Ayuda para el Enganche?' : 'What Is Down Payment Assistance?'}
                </h2>
                <div className="prose prose-lg text-text-muted">
                  {isSpanish ? (
                    <>
                      <p>
                        La ayuda para el enganche (DPA) son programas que proporcionan dinero para ayudarte
                        a cubrir tu enganche y costos de cierre cuando compras una casa.
                      </p>
                      <p>
                        En Houston, hay más de 10 programas DPA disponibles que pueden proporcionar desde
                        $10,000 hasta $40,000 en asistencia. La mayoría de los compradores de Houston
                        califican para al menos un programa — pero no lo saben.
                      </p>
                      <p className="font-semibold text-deep-brown">
                        Daisy se especializa en encontrar cada dólar de asistencia para el que calificas.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Down payment assistance (DPA) programs provide money to help you cover your
                        down payment and closing costs when buying a home.
                      </p>
                      <p>
                        In Houston, there are over 10 DPA programs available that can provide anywhere
                        from $10,000 to $40,000 in assistance. Most Houston buyers qualify for at least
                        one program — but they don&apos;t know it.
                      </p>
                      <p className="font-semibold text-deep-brown">
                        Daisy specializes in finding every dollar of assistance you qualify for.
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  {
                    icon: DollarSign,
                    value: '$40K+',
                    label: isSpanish ? 'Máxima Asistencia' : 'Max Assistance',
                  },
                  {
                    icon: Building,
                    value: '10+',
                    label: isSpanish ? 'Programas Disponibles' : 'Programs Available',
                  },
                  {
                    icon: Users,
                    value: '100s',
                    label: isSpanish ? 'Familias Ayudadas' : 'Families Helped',
                  },
                  {
                    icon: Award,
                    value: '0%',
                    label: isSpanish ? 'Interés en Muchos' : 'Interest on Many',
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-cream rounded-xl p-6 text-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold-accent/10 flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-5 h-5 text-gold-accent" />
                    </div>
                    <p className="text-2xl font-display font-bold text-deep-brown">{stat.value}</p>
                    <p className="text-sm text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Income Limits Table Section */}
        <section ref={incomeRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={incomeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-display-lg text-deep-brown mb-4">
                  {isSpanish ? 'Límites de Ingresos 2026' : '2026 Income Limits'}
                </h2>
                <p className="text-text-muted">
                  {isSpanish
                    ? 'Condado Harris / Área Metropolitana de Houston'
                    : 'Harris County / Houston Metro Area'}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-brand-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cream">
                      {incomeLimits.headers[language].map((header, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left text-sm font-semibold text-deep-brown"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {incomeLimits.rows.map((row, i) => (
                      <tr key={i} className="border-t border-brand-border">
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`px-4 py-3 text-sm ${j === 0 ? 'font-semibold text-deep-brown' : 'text-text-muted'}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-text-muted text-center mt-4">
                {isSpanish
                  ? '*AMI = Ingreso Medio del Área. Los límites pueden variar por programa. Contacta a Daisy para información actualizada.'
                  : '*AMI = Area Median Income. Limits may vary by program. Contact Daisy for current information.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Myths Section */}
        <section ref={mythsRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mythsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'Mitos Comunes sobre DPA' : 'Common DPA Myths Debunked'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? "No dejes que la información errónea te detenga"
                  : "Don't let misinformation hold you back"}
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {mythsData[language].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={mythsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-brand-border"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-600 mb-1">
                        {isSpanish ? 'MITO:' : 'MYTH:'}
                      </p>
                      <p className="text-text-body line-through decoration-red-300">{item.myth}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pl-12">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 -ml-12">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-1">
                        {isSpanish ? 'VERDAD:' : 'TRUTH:'}
                      </p>
                      <p className="text-text-muted">{item.truth}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* See If You Qualify CTA Section */}
        <section ref={qualifyCTARef} className="section-padding bg-deep-brown">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={qualifyCTAInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-gold-accent" />
              </div>
              <h2 className="text-display-lg text-cream mb-4">
                {isSpanish ? '¿Quieres Saber Cuánto Puedes Calificar?' : 'Want to Know How Much You May Qualify For?'}
              </h2>
              <p className="text-warm-taupe/80 text-lg mb-8">
                {isSpanish
                  ? 'Daisy revisará tu situación y encontrará todos los programas de ayuda para los que podrías calificar.'
                  : 'Daisy will review your situation and find all the assistance programs you may qualify for.'}
              </p>
              <Link
                href="/contact?purpose=dpa"
                className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
              >
                {isSpanish ? 'Ver Si Califico' : 'See If You Qualify'}
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                {isSpanish ? 'Preguntas Frecuentes sobre DPA' : 'DPA FAQs'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'Respuestas a las preguntas más comunes sobre ayuda para el enganche'
                  : 'Answers to the most common questions about down payment assistance'}
              </p>
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
                  ? '¿Listo para Ver Si Calificas para Ayuda?'
                  : 'Ready to See If You Qualify for Assistance?'}
              </h2>
              <p className="text-warm-taupe/80 text-lg mb-8">
                {isSpanish
                  ? 'Miles de dólares en ayuda podrían estar esperándote. Deja que Daisy revise tu elegibilidad.'
                  : 'Thousands of dollars in help could be waiting for you. Let Daisy review your eligibility.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?type=dpa"
                  className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
                >
                  {isSpanish ? 'Verificar Mi Elegibilidad DPA' : 'Check My DPA Eligibility'}
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
