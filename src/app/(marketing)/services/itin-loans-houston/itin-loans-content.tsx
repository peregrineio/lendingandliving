'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { RelatedServices, itinRelatedServices } from '@/components/shared/RelatedServices';
import { motion, useInView } from 'framer-motion';
import {
  FileText,
  CheckCircle,
  Users,
  Clock,
  Shield,
  Phone,
  ArrowRight,
  Globe,
  Home,
  CreditCard,
  FileCheck,
  Banknote,
  Key,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// FAQ Data
const faqData = {
  en: [
    {
      question: 'Can I buy a house without a Social Security number in Texas?',
      answer:
        'Yes, you can buy a house in Texas without a Social Security number. ITIN loans are specifically designed for individuals who have an Individual Taxpayer Identification Number (ITIN) instead of an SSN. Daisy specializes in helping Houston families navigate this process.',
    },
    {
      question: 'What is an ITIN and how do I get one?',
      answer:
        'An ITIN (Individual Taxpayer Identification Number) is a tax processing number issued by the IRS to individuals who need to file taxes but are not eligible for a Social Security number. You can apply for an ITIN by submitting Form W-7 to the IRS along with your federal tax return and proof of identity and foreign status.',
    },
    {
      question: 'What credit score do I need for an ITIN loan?',
      answer:
        'Most ITIN loan programs require a minimum credit score of 660-680 (lender requirements may vary). However, we also work with alternative credit options for borrowers who may not have a traditional credit history. This can include rental payments, utility bills, and other regular payment histories.',
    },
    {
      question: 'How much down payment do I need?',
      answer:
        'ITIN loans typically require a down payment of 10-20% of the home purchase price. The exact amount depends on your credit profile, income, and the specific loan program. Some programs may allow gift funds from family members to help with the down payment.',
    },
    {
      question: 'Can I use an ITIN loan for a primary residence?',
      answer:
        'Yes, ITIN loans are primarily designed for primary residence purchases. This means the home must be your main place of living. Investment properties may have different requirements and typically require larger down payments.',
    },
    {
      question: 'How long does the ITIN loan process take?',
      answer:
        'The ITIN loan process typically takes 30-45 days from application to closing. This timeline can vary based on document preparation, property appraisal scheduling, and underwriting review. Working with an experienced loan officer like Daisy helps streamline the process.',
    },
    {
      question: 'What interest rates can I expect?',
      answer:
        'ITIN loan interest rates are typically higher than conventional loan rates. The exact rate depends on your credit profile, down payment, and lender. Contact Daisy to get a personalized rate estimate.',
    },
    {
      question: 'Can my spouse use their SSN if I have an ITIN?',
      answer:
        'Yes, if one spouse has an SSN and the other has an ITIN, you may have more loan options available. In some cases, this can help you qualify for better rates or terms. Daisy can evaluate your specific situation and recommend the best approach for your family.',
    },
    {
      question: 'Are ITIN loans available across all of Houston?',
      answer:
        'Yes, ITIN loans are available throughout the Greater Houston area, including all neighborhoods and suburbs. Whether you are looking to buy in Katy, Sugar Land, Spring, Cypress, The Woodlands, or anywhere else in the Houston metro, Daisy can help you find an eligible property.',
    },
    {
      question: 'How do I get started with Daisy?',
      answer:
        'Getting started is easy! Simply call Daisy at 832-894-7676 or fill out the contact form on this page. She offers free consultations in both English and Spanish and will walk you through your options, answer all your questions, and help you understand what documents you will need.',
    },
  ],
  es: [
    {
      question: '¿Puedo comprar una casa sin número de Seguro Social en Texas?',
      answer:
        'Sí, puedes comprar una casa en Texas sin número de Seguro Social. Los préstamos ITIN están diseñados específicamente para personas que tienen un Número de Identificación Personal del Contribuyente (ITIN) en lugar de un SSN. Daisy se especializa en ayudar a familias de Houston a navegar este proceso.',
    },
    {
      question: '¿Qué es un ITIN y cómo lo obtengo?',
      answer:
        'Un ITIN (Número de Identificación Personal del Contribuyente) es un número de procesamiento de impuestos emitido por el IRS a individuos que necesitan declarar impuestos pero no son elegibles para un número de Seguro Social. Puedes solicitar un ITIN enviando el Formulario W-7 al IRS junto con tu declaración de impuestos federal y prueba de identidad y estatus extranjero.',
    },
    {
      question: '¿Qué puntaje de crédito necesito para un préstamo ITIN?',
      answer:
        'La mayoría de los programas de préstamos ITIN requieren un puntaje de crédito mínimo de 660-680 (los requisitos del prestamista pueden variar). Sin embargo, también trabajamos con opciones de crédito alternativas para prestatarios que no tienen un historial de crédito tradicional. Esto puede incluir pagos de renta, facturas de servicios públicos y otros historiales de pagos regulares.',
    },
    {
      question: '¿Cuánto enganche necesito?',
      answer:
        'Los préstamos ITIN típicamente requieren un enganche del 10-20% del precio de compra de la casa. La cantidad exacta depende de tu perfil de crédito, ingresos y el programa de préstamo específico. Algunos programas permiten fondos de regalo de familiares para ayudar con el enganche.',
    },
    {
      question: '¿Puedo usar un préstamo ITIN para una residencia principal?',
      answer:
        'Sí, los préstamos ITIN están diseñados principalmente para compras de residencia principal. Esto significa que la casa debe ser tu lugar principal de residencia. Las propiedades de inversión pueden tener requisitos diferentes y típicamente requieren enganches más grandes.',
    },
    {
      question: '¿Cuánto tiempo toma el proceso de préstamo ITIN?',
      answer:
        'El proceso de préstamo ITIN típicamente toma 30-45 días desde la solicitud hasta el cierre. Este tiempo puede variar según la preparación de documentos, la programación del avalúo de la propiedad y la revisión de suscripción. Trabajar con una oficial de préstamos experimentada como Daisy ayuda a agilizar el proceso.',
    },
    {
      question: '¿Qué tasas de interés puedo esperar?',
      answer:
        'Las tasas de interés de los préstamos ITIN son típicamente más altas que las tasas de préstamos convencionales. La tasa exacta depende de tu perfil de crédito, enganche y prestamista. Contacta a Daisy para obtener un estimado de tasa personalizado.',
    },
    {
      question: '¿Puede mi cónyuge usar su SSN si yo tengo un ITIN?',
      answer:
        'Sí, si un cónyuge tiene un SSN y el otro tiene un ITIN, pueden tener más opciones de préstamo disponibles. En algunos casos, esto puede ayudarles a calificar para mejores tasas o términos. Daisy puede evaluar tu situación específica y recomendar el mejor enfoque para tu familia.',
    },
    {
      question: '¿Los préstamos ITIN están disponibles en todo Houston?',
      answer:
        'Sí, los préstamos ITIN están disponibles en toda el área metropolitana de Houston, incluyendo todos los vecindarios y suburbios. Ya sea que estés buscando comprar en Katy, Sugar Land, Spring, Cypress, The Woodlands o cualquier otro lugar en el área metropolitana de Houston, Daisy puede ayudarte a encontrar una propiedad elegible.',
    },
    {
      question: '¿Cómo empiezo con Daisy?',
      answer:
        '¡Empezar es fácil! Simplemente llama a Daisy al 832-894-7676 o llena el formulario de contacto en esta página. Ella ofrece consultas gratuitas en inglés y español y te guiará a través de tus opciones, responderá todas tus preguntas y te ayudará a entender qué documentos necesitarás.',
    },
  ],
};

// Documents data
const documentsData = {
  en: [
    'Valid ITIN letter from the IRS',
    '2 years of tax returns (with ITIN)',
    'Proof of income (W-2s, 1099s, or bank statements)',
    '2 months of bank statements',
    'Valid photo ID (passport, consular ID, or state ID)',
    'Proof of residency (utility bills, lease agreement)',
    'Rental history (12-24 months)',
  ],
  es: [
    'Carta válida del ITIN del IRS',
    '2 años de declaraciones de impuestos (con ITIN)',
    'Comprobante de ingresos (W-2s, 1099s, o estados de cuenta bancarios)',
    '2 meses de estados de cuenta bancarios',
    'Identificación con foto válida (pasaporte, ID consular, o ID estatal)',
    'Comprobante de residencia (facturas de servicios, contrato de renta)',
    'Historial de renta (12-24 meses)',
  ],
};

// Process steps
const processSteps = {
  en: [
    {
      title: 'Free Consultation',
      description: 'Call Daisy for a free, confidential conversation about your goals and situation.',
    },
    {
      title: 'Document Gathering',
      description: 'Collect your ITIN letter, tax returns, proof of income, and other required documents.',
    },
    {
      title: 'Pre-Approval',
      description: 'Get pre-approved to know exactly how much home you can afford before house hunting.',
    },
    {
      title: 'Home Shopping',
      description: 'Work with a real estate agent to find your perfect home in Houston.',
    },
    {
      title: 'Close & Celebrate',
      description: 'Complete the final paperwork and get the keys to your new home!',
    },
  ],
  es: [
    {
      title: 'Consulta Gratuita',
      description: 'Llama a Daisy para una conversación gratuita y confidencial sobre tus metas y situación.',
    },
    {
      title: 'Recolección de Documentos',
      description: 'Reúne tu carta del ITIN, declaraciones de impuestos, comprobante de ingresos y otros documentos requeridos.',
    },
    {
      title: 'Pre-Aprobación',
      description: 'Obtén la pre-aprobación para saber exactamente cuánta casa puedes pagar antes de buscar.',
    },
    {
      title: 'Buscar Casa',
      description: 'Trabaja con un agente de bienes raíces para encontrar tu casa perfecta en Houston.',
    },
    {
      title: 'Cierra y Celebra',
      description: '¡Completa el papeleo final y obtén las llaves de tu nueva casa!',
    },
  ],
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
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

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Lending & Living - Daisy Castro',
    description: language === 'en'
      ? 'ITIN mortgage loans for Houston families. Buy a home without a Social Security number.'
      : 'Préstamos hipotecarios ITIN para familias de Houston. Compra una casa sin número de Seguro Social.',
    url: 'https://lendingandliving.com/services/itin-loans-houston',
    telephone: '832-894-7676',
    email: 'Daisy@matadorlending.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5718 Westheimer Rd Suite 1000',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77057',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 29.7372,
      longitude: -95.4702,
    },
    areaServed: {
      '@type': 'City',
      name: 'Houston',
    },
    priceRange: '$$',
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daisy Castro',
    jobTitle: language === 'en' ? 'Mortgage Loan Officer' : 'Oficial de Préstamos Hipotecarios',
    worksFor: {
      '@type': 'Organization',
      name: 'Matador Lending',
    },
    description: language === 'en'
      ? 'Bilingual mortgage loan officer specializing in ITIN loans for Houston ITIN borrowers and their families.'
      : 'Oficial de préstamos hipotecarios bilingüe especializada en préstamos ITIN para prestatarios ITIN y sus familias en Houston.',
    telephone: '832-894-7676',
    email: 'Daisy@matadorlending.com',
    knowsLanguage: ['English', 'Spanish'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}

export function ITINLoansContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const whatIsRef = useRef(null);
  const qualifiesRef = useRef(null);
  const documentsRef = useRef(null);
  const processRef = useRef(null);
  const whyDaisyRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const whatIsInView = useInView(whatIsRef, { once: true, margin: '-100px' });
  const qualifiesInView = useInView(qualifiesRef, { once: true, margin: '-100px' });
  const documentsInView = useInView(documentsRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const whyDaisyInView = useInView(whyDaisyRef, { once: true, margin: '-100px' });
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
                  ? 'Préstamos Hipotecarios ITIN Houston TX — Compra una Casa Sin Número de Seguro Social'
                  : 'ITIN Mortgage Loans Houston TX — Buy a Home Without a Social Security Number'}
              </h1>

              {/* Spanish Callout Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border-2 border-gold-accent/40 rounded-xl p-6 mt-8 max-w-2xl mx-auto"
              >
                <p className="font-cormorant italic text-xl text-gold-accent">
                  ¿Tienes un número ITIN? Puedes comprar una casa en Houston.
                </p>
                <p className="text-text-muted text-sm mt-2">
                  {isSpanish
                    ? 'Hablamos español — llama a Daisy hoy'
                    : 'We speak Spanish — call Daisy today'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <Link
                  href="/contact?type=itin"
                  className="btn-primary flex items-center gap-2"
                >
                  {isSpanish ? 'Obtén Pre-Calificación' : 'Get Pre-Qualified'}
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

        {/* What is an ITIN Loan Section */}
        <section ref={whatIsRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-display-lg text-deep-brown mb-6">
                  {isSpanish ? '¿Qué es un Préstamo ITIN?' : 'What is an ITIN Loan?'}
                </h2>
                <div className="prose prose-lg text-text-muted">
                  {isSpanish ? (
                    <>
                      <p>
                        Un préstamo ITIN es un programa hipotecario diseñado específicamente para
                        personas que tienen un Número de Identificación Personal del Contribuyente
                        (ITIN) en lugar de un número de Seguro Social.
                      </p>
                      <p>
                        Estos préstamos permiten a familias con ITIN en Houston lograr su sueño de
                        ser propietarios de una casa, incluso sin estatus de ciudadanía. Daisy se
                        especializa en ayudar a familias como la tuya a navegar este proceso con
                        claridad y confianza.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        An ITIN loan is a mortgage program specifically designed for individuals who
                        have an Individual Taxpayer Identification Number (ITIN) instead of a Social
                        Security Number.
                      </p>
                      <p>
                        These loans allow ITIN borrowers and their families in Houston to achieve their dream of
                        homeownership, even without citizenship status. Daisy specializes in helping
                        families like yours navigate this process with clarity and confidence.
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-cream rounded-2xl p-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Globe className="w-6 h-6 text-gold-accent" />
                    </div>
                    <p className="text-2xl font-display font-bold text-deep-brown">100%</p>
                    <p className="text-sm text-text-muted">
                      {isSpanish ? 'Bilingüe' : 'Bilingual'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Home className="w-6 h-6 text-gold-accent" />
                    </div>
                    <p className="text-2xl font-display font-bold text-deep-brown">10-20%</p>
                    <p className="text-sm text-text-muted">
                      {isSpanish ? 'Enganche' : 'Down Payment'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="w-6 h-6 text-gold-accent" />
                    </div>
                    <p className="text-2xl font-display font-bold text-deep-brown">660+</p>
                    <p className="text-sm text-text-muted">
                      {isSpanish ? 'Crédito Mín.' : 'Min. Credit'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-gold-accent" />
                    </div>
                    <p className="text-2xl font-display font-bold text-deep-brown">30-45</p>
                    <p className="text-sm text-text-muted">
                      {isSpanish ? 'Días al Cierre' : 'Days to Close'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Who Qualifies Section */}
        <section ref={qualifiesRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={qualifiesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? '¿Quién Califica?' : 'Who Qualifies?'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'Los préstamos ITIN están disponibles para muchos compradores en Houston'
                  : 'ITIN loans are available to many buyers across Houston'}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={qualifiesInView ? 'visible' : 'hidden'}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: Users,
                  title: isSpanish ? 'Prestatarios con ITIN' : 'ITIN Borrowers',
                  desc: isSpanish
                    ? 'Individuos con ITINs válidos que pagan impuestos'
                    : 'Individuals with valid ITINs who pay taxes',
                },
                {
                  icon: FileCheck,
                  title: isSpanish ? 'Auto-Empleados' : 'Self-Employed',
                  desc: isSpanish
                    ? 'Dueños de negocios y contratistas independientes'
                    : 'Business owners and independent contractors',
                },
                {
                  icon: Shield,
                  title: isSpanish ? 'Compradores Primerizos' : 'First-Time Buyers',
                  desc: isSpanish
                    ? 'Familias listas para su primera casa en Houston'
                    : 'Families ready for their first home in Houston',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  custom={index * 0.1}
                  className="bg-white rounded-xl p-6 border border-brand-border"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-gold-accent" />
                  </div>
                  <h3 className="font-display text-lg text-deep-brown mb-2">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Documents Section */}
        <section ref={documentsRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={documentsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-display-lg text-deep-brown mb-6">
                  {isSpanish ? 'Documentos que Necesitarás' : "Documents You'll Need"}
                </h2>
                <p className="text-text-muted mb-8">
                  {isSpanish
                    ? 'Reunir estos documentos antes de aplicar agilizará tu proceso de préstamo.'
                    : 'Gathering these documents before applying will streamline your loan process.'}
                </p>
                <ul className="space-y-4">
                  {documentsData[language].map((doc, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={documentsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-body">{doc}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={documentsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-deep-brown rounded-2xl p-8 text-center flex flex-col justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-gold-accent" />
                </div>
                <h3 className="font-display text-2xl text-cream mb-4">
                  {isSpanish ? '¿No estás seguro qué documentos tienes?' : 'Not sure what documents you have?'}
                </h3>
                <p className="text-warm-taupe/80 mb-6">
                  {isSpanish
                    ? 'Daisy revisará tu situación y te dirá exactamente qué necesitas.'
                    : "Daisy will review your situation and tell you exactly what you need."}
                </p>
                <a
                  href="tel:8328947676"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {isSpanish ? 'Llama Ahora' : 'Call Now'}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Timeline Section */}
        <section ref={processRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'El Proceso de Préstamo ITIN' : 'The ITIN Loan Process'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? '5 pasos simples para la propiedad de tu casa'
                  : '5 simple steps to homeownership'}
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
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
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gold-accent text-dark-footer flex items-center justify-center mx-auto mb-4 font-display font-bold text-lg">
                      {index + 1}
                    </div>
                    <h3 className="font-display text-lg text-deep-brown mb-2">{step.title}</h3>
                    <p className="text-sm text-text-muted">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Daisy Section */}
        <section ref={whyDaisyRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={whyDaisyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-display-lg text-deep-brown mb-6">
                  {isSpanish ? '¿Por Qué Elegir a Daisy?' : 'Why Choose Daisy?'}
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Globe,
                      title: isSpanish ? 'Completamente Bilingüe' : 'Fully Bilingual',
                      desc: isSpanish
                        ? 'Toda la comunicación en inglés o español — sin barreras de idioma'
                        : 'All communication in English or Spanish — no language barriers',
                    },
                    {
                      icon: Users,
                      title: isSpanish ? 'Experta en ITIN' : 'ITIN Specialist',
                      desc: isSpanish
                        ? 'Experiencia extensa ayudando a prestatarios ITIN y sus familias a comprar casas'
                        : 'Extensive experience helping ITIN borrowers and their families buy homes',
                    },
                    {
                      icon: Shield,
                      title: isSpanish ? 'Proceso Transparente' : 'Transparent Process',
                      desc: isSpanish
                        ? 'Sin sorpresas — sabrás exactamente qué esperar en cada paso'
                        : "No surprises — you'll know exactly what to expect every step of the way",
                    },
                    {
                      icon: Banknote,
                      title: isSpanish ? 'Acceso a Múltiples Programas' : 'Access to Multiple Programs',
                      desc: isSpanish
                        ? 'Compara opciones de diferentes prestamistas para encontrar la mejor tasa'
                        : 'Compare options from different lenders to find the best rate',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={whyDaisyInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-gold-accent" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-deep-brown mb-1">{item.title}</h3>
                        <p className="text-sm text-text-muted">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={whyDaisyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-cream rounded-2xl p-8"
              >
                <div className="aspect-square bg-warm-taupe/30 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-text-muted text-sm">
                    {isSpanish ? 'Foto de Daisy' : 'Daisy Photo'}
                  </span>
                </div>
                <blockquote className="font-cormorant italic text-xl text-deep-brown mb-4">
                  {isSpanish
                    ? '"Me especializo en ayudar a personas con ITIN a lograr ser dueños de su hogar. Has trabajado duro y construido una vida aquí — ser dueño de una casa debe ser parte de esa historia. Te guío en cada paso con claridad, paciencia y dedicación."'
                    : '"I specialize in helping ITIN individuals navigate the path to homeownership. You\'ve worked hard and built a life here — owning a home should be part of that story. I\'ll guide you through every step with clarity, patience, and care."'}
                </blockquote>
                <p className="text-text-muted">
                  — Daisy Castro, NMLS #2592627
                </p>
              </motion.div>
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
                {isSpanish ? 'Preguntas Frecuentes sobre Préstamos ITIN' : 'ITIN Loan FAQs'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'Respuestas a las preguntas más comunes sobre préstamos ITIN en Houston'
                  : 'Answers to the most common questions about ITIN loans in Houston'}
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

        {/* Related Services */}
        <RelatedServices
          services={itinRelatedServices}
          title={{
            en: 'Explore More Options',
            es: 'Explora Más Opciones',
          }}
        />

        {/* Final CTA Section */}
        <section className="section-padding bg-deep-brown">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-6">
                <Key className="w-8 h-8 text-gold-accent" />
              </div>
              <h2 className="text-display-lg text-cream mb-4">
                {isSpanish
                  ? '¿Listo para Comprar Tu Casa con un Préstamo ITIN?'
                  : 'Ready to Buy Your Home with an ITIN Loan?'}
              </h2>
              <p className="text-warm-taupe/80 text-lg mb-8">
                {isSpanish
                  ? 'Da el primer paso hacia la propiedad de tu casa. Daisy está aquí para guiarte.'
                  : 'Take the first step toward homeownership. Daisy is here to guide you.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?type=itin"
                  className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
                >
                  {isSpanish ? 'Obtén Pre-Calificación para ITIN' : 'Get Pre-Qualified for ITIN'}
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
