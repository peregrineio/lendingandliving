'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Trees, CheckCircle, DollarSign, Phone, ArrowRight, MapPin, Home, Users, Shield, Percent } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const usdaBenefits = {
  en: [
    { icon: DollarSign, title: 'Zero Down Payment', desc: 'No down payment required — finance 100% of the home purchase price.' },
    { icon: Percent, title: 'Low Interest Rates', desc: 'USDA loans offer competitive, below-market interest rates.' },
    { icon: Shield, title: 'Lower Mortgage Insurance', desc: 'USDA mortgage insurance is lower than FHA or conventional PMI.' },
    { icon: Users, title: 'Flexible Credit', desc: 'Credit score requirements are more flexible than conventional loans.' },
    { icon: MapPin, title: 'Rural & Suburban Areas', desc: 'Many areas near Houston qualify — you might be surprised!' },
    { icon: Home, title: 'Finance Closing Costs', desc: 'Closing costs can be rolled into the loan or paid by seller.' },
  ],
  es: [
    { icon: DollarSign, title: 'Cero Enganche', desc: 'No se requiere enganche — financia el 100% del precio de compra.' },
    { icon: Percent, title: 'Tasas de Interés Bajas', desc: 'Los préstamos USDA ofrecen tasas de interés competitivas, por debajo del mercado.' },
    { icon: Shield, title: 'Seguro Hipotecario Menor', desc: 'El seguro hipotecario USDA es menor que FHA o PMI convencional.' },
    { icon: Users, title: 'Crédito Flexible', desc: 'Los requisitos de puntaje de crédito son más flexibles que los préstamos convencionales.' },
    { icon: MapPin, title: 'Áreas Rurales y Suburbanas', desc: 'Muchas áreas cerca de Houston califican — ¡te sorprenderás!' },
    { icon: Home, title: 'Financia Costos de Cierre', desc: 'Los costos de cierre pueden incluirse en el préstamo o ser pagados por el vendedor.' },
  ],
};

const eligibleAreas = {
  en: ['Katy (outer areas)', 'Waller', 'Fulshear', 'Hockley', 'Brookshire', 'Sealy', 'Magnolia', 'Tomball (outer areas)', 'Conroe (outer areas)', 'Dayton', 'Liberty', 'Cleveland'],
  es: ['Katy (áreas exteriores)', 'Waller', 'Fulshear', 'Hockley', 'Brookshire', 'Sealy', 'Magnolia', 'Tomball (áreas exteriores)', 'Conroe (áreas exteriores)', 'Dayton', 'Liberty', 'Cleveland'],
};

const requirements = {
  en: ['Primary residence only', 'Meet income limits (115% of area median)', 'Property in USDA-eligible area', 'U.S. citizen or permanent resident', 'Stable income and employment', 'Credit score typically 640+'],
  es: ['Solo residencia principal', 'Cumplir límites de ingresos (115% del promedio del área)', 'Propiedad en área elegible USDA', 'Ciudadano de EE.UU. o residente permanente', 'Ingresos y empleo estables', 'Puntaje de crédito típicamente 640+'],
};

const faqData = {
  en: [
    { question: 'What areas near Houston qualify for USDA loans?', answer: 'Many suburban and rural areas near Houston qualify, including parts of Katy, Waller, Fulshear, Magnolia, and more. The USDA eligibility map changes periodically. Daisy can check if your desired area qualifies.' },
    { question: 'What are the income limits for USDA loans?', answer: 'USDA loans have income limits based on your location and household size. Generally, your household income must be at or below 115% of the area median income. For most Houston-area eligible zones, this allows for moderate to middle-income families.' },
    { question: 'Do I have to be a first-time homebuyer?', answer: 'No! USDA loans are available to both first-time and repeat homebuyers, as long as the property will be your primary residence.' },
    { question: 'What is USDA mortgage insurance?', answer: 'USDA loans require an upfront guarantee fee (1% of loan amount) and an annual fee (0.35% of loan balance). These are significantly lower than FHA mortgage insurance.' },
    { question: 'Can I build a home with a USDA loan?', answer: 'USDA offers both single-close construction loans and standard purchase loans. Building with USDA requires working with approved builders in eligible areas.' },
    { question: 'How long does USDA approval take?', answer: 'USDA loans can take slightly longer due to the additional government approval. Expect 45-60 days to close. Working with an experienced USDA lender helps streamline the process.' },
  ],
  es: [
    { question: '¿Qué áreas cerca de Houston califican para préstamos USDA?', answer: 'Muchas áreas suburbanas y rurales cerca de Houston califican, incluyendo partes de Katy, Waller, Fulshear, Magnolia, y más. El mapa de elegibilidad USDA cambia periódicamente. Daisy puede verificar si tu área deseada califica.' },
    { question: '¿Cuáles son los límites de ingresos para préstamos USDA?', answer: 'Los préstamos USDA tienen límites de ingresos basados en tu ubicación y tamaño del hogar. Generalmente, los ingresos de tu hogar deben estar al o debajo del 115% del ingreso medio del área.' },
    { question: '¿Tengo que ser comprador primerizo?', answer: '¡No! Los préstamos USDA están disponibles tanto para compradores primerizos como repetidos, siempre que la propiedad sea tu residencia principal.' },
    { question: '¿Qué es el seguro hipotecario USDA?', answer: 'Los préstamos USDA requieren una tarifa de garantía inicial (1% del monto del préstamo) y una tarifa anual (0.35% del saldo del préstamo). Estos son significativamente más bajos que el seguro hipotecario FHA.' },
    { question: '¿Puedo construir una casa con un préstamo USDA?', answer: 'USDA ofrece tanto préstamos de construcción de cierre único como préstamos de compra estándar. Construir con USDA requiere trabajar con constructores aprobados en áreas elegibles.' },
    { question: '¿Cuánto tiempo toma la aprobación USDA?', answer: 'Los préstamos USDA pueden tardar un poco más debido a la aprobación gubernamental adicional. Espera 45-60 días para cerrar. Trabajar con un prestamista USDA experimentado ayuda a agilizar el proceso.' },
  ],
};

function JsonLdSchema({ language }: { language: 'en' | 'es' }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData[language].map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />;
}

export function USDALoansContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const areasRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });
  const areasInView = useInView(areasRef, { once: true, margin: '-100px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });

  return (
    <>
      <JsonLdSchema language={language} />
      <div className="pt-20 md:pt-24">
        {/* Hero */}
        <section ref={heroRef} className="bg-cream py-16 md:py-20">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
              <h1 className="text-display-xl text-deep-brown mb-6">
                {isSpanish ? 'Préstamos USDA Houston TX — Cero Enganche en Áreas Rurales' : 'USDA Loans Houston TX — Zero Down Payment in Rural Areas'}
              </h1>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white border-2 border-gold-accent/40 rounded-xl p-6 mt-8 max-w-2xl mx-auto">
                <p className="font-cormorant italic text-xl text-gold-accent">
                  {isSpanish ? 'Muchas áreas cerca de Houston califican para préstamos USDA sin enganche.' : 'Many areas near Houston qualify for zero down USDA loans.'}
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href="/contact?type=usda" className="btn-primary flex items-center gap-2">
                  {isSpanish ? 'Verificar Elegibilidad USDA' : 'Check USDA Eligibility'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:8328947676" className="btn-secondary flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  832-894-7676
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section ref={benefitsRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Beneficios del Préstamo USDA' : 'USDA Loan Benefits'}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usdaBenefits[language].map((benefit, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-cream rounded-xl p-6">
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

        {/* Eligible Areas */}
        <section ref={areasRef} className="section-padding bg-cream">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={areasInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
                <h2 className="text-display-lg text-deep-brown mb-6">{isSpanish ? 'Áreas Elegibles Cerca de Houston' : 'Eligible Areas Near Houston'}</h2>
                <p className="text-text-muted mb-6">{isSpanish ? 'Estas son algunas de las áreas que típicamente califican para préstamos USDA:' : 'These are some areas that typically qualify for USDA loans:'}</p>
                <div className="grid grid-cols-2 gap-3">
                  {eligibleAreas[language].map((area, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={areasInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: index * 0.05 }} className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-accent flex-shrink-0" />
                      <span className="text-sm text-text-body">{area}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-4">{isSpanish ? '*La elegibilidad puede variar por dirección específica. Contacta a Daisy para verificar.' : '*Eligibility may vary by specific address. Contact Daisy to verify.'}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={areasInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="bg-white rounded-xl p-6 border border-brand-border">
                  <h3 className="font-display text-lg text-deep-brown mb-4">{isSpanish ? 'Requisitos USDA' : 'USDA Requirements'}</h3>
                  <ul className="space-y-3">
                    {requirements[language].map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-text-muted">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Preguntas Frecuentes sobre USDA' : 'USDA Loan FAQs'}</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-3xl mx-auto">
              <Accordion className="space-y-4">
                {faqData[language].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-xl border border-brand-border px-6">
                    <AccordionTrigger className="text-left font-display text-deep-brown hover:no-underline py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-text-muted pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-deep-brown">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-6">
                <Trees className="w-8 h-8 text-gold-accent" />
              </div>
              <h2 className="text-display-lg text-cream mb-4">{isSpanish ? '¿Buscando en Áreas Rurales?' : 'Looking in Rural Areas?'}</h2>
              <p className="text-warm-taupe/80 text-lg mb-8">{isSpanish ? 'Deja que Daisy verifique si tu área deseada califica para financiamiento USDA.' : 'Let Daisy check if your desired area qualifies for USDA financing.'}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact?type=usda" className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors">
                  {isSpanish ? 'Verificar Mi Área' : 'Check My Area'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:8328947676" className="inline-flex items-center gap-2 py-3 px-8 border border-cream/30 text-cream rounded-xl font-semibold hover:bg-cream/10 transition-colors">
                  <Phone className="w-4 h-4" />
                  832-894-7676
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
