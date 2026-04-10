'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Briefcase,
  FileText,
  PiggyBank,
  Banknote,
  ClipboardCheck,
  Phone,
  ArrowRight,
  CheckCircle,
  Building,
  Users,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Loan Types Data
const loanTypesData = {
  en: [
    {
      icon: FileText,
      title: 'Bank Statement Loans',
      whoFor: 'Self-employed borrowers, business owners, freelancers',
      howItWorks: 'Instead of tax returns, we use 12–24 months of personal or business bank statements to verify your income.',
      keyBenefit: 'No tax returns required. Perfect if your write-offs make your taxable income look lower than your actual cash flow.',
    },
    {
      icon: Building,
      title: 'P&L Loans (Profit & Loss Statement)',
      whoFor: 'Self-employed borrowers with a CPA-prepared P&L',
      howItWorks: 'A CPA-prepared profit and loss statement is used in place of traditional income documentation.',
      keyBenefit: 'Streamlined qualification for business owners with clean financial records.',
    },
    {
      icon: PiggyBank,
      title: 'Asset-Based Loans',
      whoFor: 'High-net-worth borrowers with significant liquid assets',
      howItWorks: 'Your qualifying assets (savings, investments, retirement accounts) are used to calculate income eligibility instead of employment income.',
      keyBenefit: 'Ideal for retirees or borrowers with large asset portfolios and limited monthly income.',
    },
    {
      icon: Banknote,
      title: '1099 Loans',
      whoFor: 'Independent contractors and gig workers who receive 1099s',
      howItWorks: 'Your 1099 income is used to qualify instead of W-2s or tax returns.',
      keyBenefit: 'Recognizes your real income without being penalized for business deductions on your tax return.',
    },
    {
      icon: ClipboardCheck,
      title: 'WVOE Loans (Written Verification of Employment)',
      whoFor: 'Borrowers whose employer can verify income in writing but who may not have standard pay stubs or W-2s',
      howItWorks: 'A written verification from your employer or a CPA is used to confirm your income and employment status.',
      keyBenefit: 'Flexible documentation option for non-traditional employment arrangements.',
    },
  ],
  es: [
    {
      icon: FileText,
      title: 'Préstamos de Estado de Cuenta Bancario',
      whoFor: 'Trabajadores independientes, dueños de negocios, freelancers',
      howItWorks: 'En lugar de declaraciones de impuestos, usamos 12–24 meses de estados de cuenta bancarios personales o de negocio para verificar tus ingresos.',
      keyBenefit: 'Sin declaraciones de impuestos requeridas. Perfecto si tus deducciones hacen que tu ingreso gravable se vea menor que tu flujo de efectivo real.',
    },
    {
      icon: Building,
      title: 'Préstamos P&L (Estado de Pérdidas y Ganancias)',
      whoFor: 'Trabajadores independientes con un P&L preparado por un CPA',
      howItWorks: 'Un estado de pérdidas y ganancias preparado por un CPA se usa en lugar de documentación de ingresos tradicional.',
      keyBenefit: 'Calificación simplificada para dueños de negocios con registros financieros limpios.',
    },
    {
      icon: PiggyBank,
      title: 'Préstamos Basados en Activos',
      whoFor: 'Prestatarios de alto patrimonio con activos líquidos significativos',
      howItWorks: 'Tus activos que califican (ahorros, inversiones, cuentas de retiro) se usan para calcular elegibilidad de ingresos en lugar de ingresos de empleo.',
      keyBenefit: 'Ideal para retirados o prestatarios con grandes portafolios de activos e ingresos mensuales limitados.',
    },
    {
      icon: Banknote,
      title: 'Préstamos 1099',
      whoFor: 'Contratistas independientes y trabajadores gig que reciben 1099s',
      howItWorks: 'Tus ingresos 1099 se usan para calificar en lugar de W-2s o declaraciones de impuestos.',
      keyBenefit: 'Reconoce tus ingresos reales sin ser penalizado por deducciones de negocio en tu declaración de impuestos.',
    },
    {
      icon: ClipboardCheck,
      title: 'Préstamos WVOE (Verificación Escrita de Empleo)',
      whoFor: 'Prestatarios cuyo empleador puede verificar ingresos por escrito pero que no tienen talones de pago o W-2s estándar',
      howItWorks: 'Una verificación escrita de tu empleador o un CPA se usa para confirmar tus ingresos y estado de empleo.',
      keyBenefit: 'Opción de documentación flexible para arreglos de empleo no tradicionales.',
    },
  ],
};

// FAQ Data
const faqData = {
  en: [
    {
      question: 'What is a non-traditional loan?',
      answer: 'A non-traditional loan is a mortgage designed for borrowers who cannot qualify using standard W-2 income documentation. These loans use alternative methods to verify income, such as bank statements, profit & loss statements, assets, 1099 forms, or written verification of employment.',
    },
    {
      question: 'Do I need good credit for a non-traditional loan?',
      answer: 'Credit requirements vary by loan type, but most non-traditional loans require a minimum credit score of 620-680. Higher scores typically result in better rates and terms. Daisy can review your specific situation to find the best option.',
    },
    {
      question: 'Can I use a non-traditional loan to buy a primary residence?',
      answer: 'Yes! Non-traditional loans can be used for primary residences, second homes, and investment properties. They are not limited to investment properties only.',
    },
    {
      question: 'Are interest rates higher on non-traditional loans?',
      answer: 'Interest rates on non-traditional loans are typically slightly higher than conventional loans because of the alternative documentation. However, the difference is often worth it for borrowers who cannot qualify otherwise. Rates vary based on your credit, down payment, and loan type.',
    },
    {
      question: 'How much down payment do non-traditional loans require?',
      answer: 'Down payment requirements vary by loan type: Bank Statement loans typically require 10-20%, P&L loans 10-15%, Asset-Based loans 20%+, 1099 loans 10-20%, and WVOE loans vary by lender. Contact Daisy for specifics based on your situation.',
    },
    {
      question: 'Which non-traditional loan is right for me?',
      answer: 'The right loan depends on your specific income documentation situation. If you have strong bank statements, a Bank Statement loan is likely your best option. If you have a CPA-prepared P&L, that route may be cleaner. If you have significant assets but limited income, Asset-Based may work best. Contact Daisy and she\'ll walk you through which option fits your situation.',
    },
  ],
  es: [
    {
      question: '¿Qué es un préstamo no tradicional?',
      answer: 'Un préstamo no tradicional es una hipoteca diseñada para prestatarios que no pueden calificar usando documentación de ingresos W-2 estándar. Estos préstamos usan métodos alternativos para verificar ingresos, como estados de cuenta bancarios, estados de pérdidas y ganancias, activos, formularios 1099, o verificación escrita de empleo.',
    },
    {
      question: '¿Necesito buen crédito para un préstamo no tradicional?',
      answer: 'Los requisitos de crédito varían por tipo de préstamo, pero la mayoría de los préstamos no tradicionales requieren un puntaje de crédito mínimo de 620-680. Puntajes más altos típicamente resultan en mejores tasas y términos. Daisy puede revisar tu situación específica para encontrar la mejor opción.',
    },
    {
      question: '¿Puedo usar un préstamo no tradicional para comprar una residencia principal?',
      answer: '¡Sí! Los préstamos no tradicionales se pueden usar para residencias principales, segundas casas y propiedades de inversión. No están limitados solo a propiedades de inversión.',
    },
    {
      question: '¿Las tasas de interés son más altas en préstamos no tradicionales?',
      answer: 'Las tasas de interés en préstamos no tradicionales son típicamente un poco más altas que los préstamos convencionales debido a la documentación alternativa. Sin embargo, la diferencia a menudo vale la pena para prestatarios que no pueden calificar de otra manera. Las tasas varían basadas en tu crédito, enganche y tipo de préstamo.',
    },
    {
      question: '¿Cuánto enganche requieren los préstamos no tradicionales?',
      answer: 'Los requisitos de enganche varían por tipo de préstamo: préstamos de Estado de Cuenta típicamente requieren 10-20%, préstamos P&L 10-15%, préstamos Basados en Activos 20%+, préstamos 1099 10-20%, y préstamos WVOE varían por prestamista. Contacta a Daisy para detalles basados en tu situación.',
    },
    {
      question: '¿Cuál préstamo no tradicional es el correcto para mí?',
      answer: 'El préstamo correcto depende de tu situación específica de documentación de ingresos. Si tienes estados de cuenta bancarios fuertes, un préstamo de Estado de Cuenta es probablemente tu mejor opción. Si tienes un P&L preparado por CPA, esa ruta puede ser más limpia. Si tienes activos significativos pero ingresos limitados, Basado en Activos puede funcionar mejor. Contacta a Daisy y ella te guiará sobre cuál opción se ajusta a tu situación.',
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export function NonTraditionalLoansContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const typesRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const typesInView = useInView(typesRef, { once: true, margin: '-100px' });
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
                  ? 'Préstamos No Tradicionales en Houston — Para Trabajadores Independientes'
                  : 'Non-Traditional Loans Houston TX — Financing for the Self-Employed & Non-W2 Borrower'}
              </h1>

              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? "¿No tienes ingresos W-2 tradicionales? No estás solo — y aún tienes opciones. Los préstamos no tradicionales están diseñados para dueños de negocios, freelancers, contratistas, y cualquiera cuyos ingresos no encajan en los requisitos de documentación estándar. Ayudo a prestatarios de Houston a encontrar financiamiento que realmente se ajuste a su situación."
                  : "Don't have traditional W-2 income? You're not alone — and you still have options. Non-traditional loans are designed for business owners, freelancers, contractors, and anyone whose income doesn't fit the standard documentation requirements. I help Houston borrowers find financing that actually fits their situation."}
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
                    ? '¿Trabajas por tu cuenta o eres contratista independiente? Tenemos opciones de préstamo diseñadas para tu situación. Hablamos tu idioma — llámame hoy.'
                    : 'Self-employed or independent contractor? We have loan options designed for your situation. We speak your language — call me today.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <Link
                  href="/contact?purpose=non-traditional"
                  className="btn-primary flex items-center gap-2"
                >
                  {isSpanish ? 'Hablar con Daisy' : 'Talk to Daisy'}
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

        {/* Loan Types Section */}
        <section ref={typesRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={typesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-deep-brown mb-4">
                {isSpanish ? 'Tipos de Préstamos No Tradicionales' : 'Non-Traditional Loan Types'}
              </h2>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'Encuentra la opción que se ajusta a tu situación de documentación de ingresos.'
                  : 'Find the option that fits your income documentation situation.'}
              </p>
            </motion.div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {loanTypesData[language].map((loan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={typesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-cream rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center flex-shrink-0">
                      <loan.icon className="w-6 h-6 text-gold-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-deep-brown mb-3">{loan.title}</h3>

                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-semibold text-deep-brown">
                            {isSpanish ? 'Para quién es: ' : "Who it's for: "}
                          </span>
                          <span className="text-sm text-text-muted">{loan.whoFor}</span>
                        </div>

                        <div>
                          <span className="text-sm font-semibold text-deep-brown">
                            {isSpanish ? 'Cómo funciona: ' : 'How it works: '}
                          </span>
                          <span className="text-sm text-text-muted">{loan.howItWorks}</span>
                        </div>

                        <div className="flex items-start gap-2 bg-gold-accent/5 rounded-lg p-3">
                          <CheckCircle className="w-4 h-4 text-gold-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-sm font-semibold text-gold-accent">
                              {isSpanish ? 'Beneficio clave: ' : 'Key benefit: '}
                            </span>
                            <span className="text-sm text-text-muted">{loan.keyBenefit}</span>
                          </div>
                        </div>
                      </div>
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

        {/* CTA Section */}
        <section className="section-padding bg-deep-brown">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-gold-accent" />
              </div>
              <h2 className="text-display-lg text-cream mb-4">
                {isSpanish
                  ? '¿No estás seguro cuál opción es la correcta para ti?'
                  : 'Not sure which option is right for you?'}
              </h2>
              <p className="text-warm-taupe/80 text-lg mb-8">
                {isSpanish
                  ? 'Vamos a descubrirlo juntos. Daisy te guiará a través de tus opciones basado en tu situación específica.'
                  : "Let's figure it out together. Daisy will walk you through your options based on your specific situation."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?purpose=non-traditional"
                  className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
                >
                  {isSpanish ? 'Hablar con Daisy' : 'Talk to Daisy'}
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
