'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, CheckCircle, DollarSign, Phone, ArrowRight, Building, FileText, Banknote, PiggyBank, Users, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const loanTypes = {
  en: [
    {
      icon: Building,
      title: 'DSCR Loans',
      subtitle: 'Debt Service Coverage Ratio',
      desc: 'Qualify based on property cash flow, not personal income. Perfect for experienced investors.',
      features: ['No personal income verification', 'Based on property rental income', 'Multiple properties allowed', 'LLCs and corporations OK'],
      requirements: '20-25% down, 1.0+ DSCR ratio, 680+ credit',
    },
    {
      icon: FileText,
      title: 'Bank Statement Loans',
      subtitle: '12-24 Month Statements',
      desc: 'Use bank deposits instead of tax returns to qualify. Great for self-employed borrowers.',
      features: ['No tax returns required', '12 or 24 month options', 'Personal or business statements', 'Investment properties OK'],
      requirements: '10-20% down, 12+ months statements, 660+ credit',
    },
    {
      icon: PiggyBank,
      title: 'Asset-Based Loans',
      subtitle: 'Asset Depletion',
      desc: 'Qualify using liquid assets like stocks, bonds, and retirement accounts.',
      features: ['No employment required', 'Use investment portfolios', 'Retirement accounts count', 'Good for retirees/high net worth'],
      requirements: '20%+ down, significant liquid assets, 700+ credit',
    },
    {
      icon: Banknote,
      title: '1099 Income Loans',
      subtitle: 'For Contractors & Freelancers',
      desc: 'Use 1099 income to qualify without full tax returns.',
      features: ['1099 forms only', 'No Schedule C required', '1-2 years 1099 history', 'Investment properties allowed'],
      requirements: '10-20% down, 2 years 1099 history, 660+ credit',
    },
  ],
  es: [
    {
      icon: Building,
      title: 'Préstamos DSCR',
      subtitle: 'Ratio de Cobertura de Servicio de Deuda',
      desc: 'Califica basado en el flujo de efectivo de la propiedad, no ingresos personales. Perfecto para inversionistas experimentados.',
      features: ['Sin verificación de ingresos personales', 'Basado en ingresos de renta', 'Múltiples propiedades permitidas', 'LLCs y corporaciones OK'],
      requirements: '20-25% enganche, ratio DSCR 1.0+, crédito 680+',
    },
    {
      icon: FileText,
      title: 'Préstamos de Estado de Cuenta',
      subtitle: 'Estados de Cuenta 12-24 Meses',
      desc: 'Usa depósitos bancarios en lugar de declaraciones de impuestos para calificar. Excelente para auto-empleados.',
      features: ['Sin declaraciones de impuestos', 'Opciones de 12 o 24 meses', 'Estados personales o de negocio', 'Propiedades de inversión OK'],
      requirements: '10-20% enganche, 12+ meses de estados, crédito 660+',
    },
    {
      icon: PiggyBank,
      title: 'Préstamos Basados en Activos',
      subtitle: 'Agotamiento de Activos',
      desc: 'Califica usando activos líquidos como acciones, bonos y cuentas de retiro.',
      features: ['Sin empleo requerido', 'Usa portafolios de inversión', 'Cuentas de retiro cuentan', 'Bueno para retirados/alto patrimonio'],
      requirements: '20%+ enganche, activos líquidos significativos, crédito 700+',
    },
    {
      icon: Banknote,
      title: 'Préstamos de Ingresos 1099',
      subtitle: 'Para Contratistas e Independientes',
      desc: 'Usa ingresos 1099 para calificar sin declaraciones de impuestos completas.',
      features: ['Solo formularios 1099', 'Sin Schedule C requerido', '1-2 años de historial 1099', 'Propiedades de inversión permitidas'],
      requirements: '10-20% enganche, 2 años historial 1099, crédito 660+',
    },
  ],
};

const whoIsItFor = {
  en: ['Real estate investors', 'Self-employed business owners', 'Freelancers and contractors', 'High net worth individuals', 'Retirees with significant assets', 'Foreign nationals investing in US'],
  es: ['Inversionistas de bienes raíces', 'Dueños de negocios auto-empleados', 'Freelancers y contratistas', 'Individuos de alto patrimonio', 'Retirados con activos significativos', 'Extranjeros invirtiendo en EE.UU.'],
};

const faqData = {
  en: [
    { question: 'What is a DSCR loan?', answer: 'A DSCR (Debt Service Coverage Ratio) loan qualifies you based on the rental income the property generates, not your personal income. If the property cash flow covers the mortgage payment (1.0 DSCR or higher), you can qualify.' },
    { question: 'Can I get an investment property loan without tax returns?', answer: 'Yes! DSCR loans, bank statement loans, and asset-based loans do not require tax returns. These are specifically designed for investors and self-employed borrowers who may not show high income on tax returns.' },
    { question: 'How many investment properties can I finance?', answer: 'There is no limit with many investor loan programs. DSCR lenders often allow 10+ properties. Daisy can help you structure your portfolio financing.' },
    { question: 'What down payment is required?', answer: 'Investment property loans typically require 20-25% down. Some bank statement loans may allow 10-15% for primary residence or second homes.' },
    { question: 'Can I use an LLC to buy investment property?', answer: 'Yes, many investor loan programs allow purchases through LLCs, corporations, and trusts. This provides liability protection for your investment portfolio.' },
    { question: 'What is the minimum credit score?', answer: 'Most investor loans require 660-700+ credit scores. Higher credit scores typically result in better rates and terms.' },
  ],
  es: [
    { question: '¿Qué es un préstamo DSCR?', answer: 'Un préstamo DSCR (Ratio de Cobertura de Servicio de Deuda) te califica basado en los ingresos de renta que genera la propiedad, no tus ingresos personales. Si el flujo de efectivo de la propiedad cubre el pago de la hipoteca (DSCR 1.0 o mayor), puedes calificar.' },
    { question: '¿Puedo obtener un préstamo de propiedad de inversión sin declaraciones de impuestos?', answer: '¡Sí! Los préstamos DSCR, préstamos de estado de cuenta y préstamos basados en activos no requieren declaraciones de impuestos. Están diseñados específicamente para inversionistas y auto-empleados.' },
    { question: '¿Cuántas propiedades de inversión puedo financiar?', answer: 'No hay límite con muchos programas de préstamos para inversionistas. Los prestamistas DSCR a menudo permiten 10+ propiedades. Daisy puede ayudarte a estructurar el financiamiento de tu portafolio.' },
    { question: '¿Qué enganche se requiere?', answer: 'Los préstamos de propiedades de inversión típicamente requieren 20-25% de enganche. Algunos préstamos de estado de cuenta pueden permitir 10-15% para residencia principal o segundas casas.' },
    { question: '¿Puedo usar una LLC para comprar propiedad de inversión?', answer: 'Sí, muchos programas de préstamos para inversionistas permiten compras a través de LLCs, corporaciones y fideicomisos. Esto proporciona protección de responsabilidad para tu portafolio de inversión.' },
    { question: '¿Cuál es el puntaje de crédito mínimo?', answer: 'La mayoría de los préstamos para inversionistas requieren puntajes de crédito de 660-700+. Puntajes de crédito más altos típicamente resultan en mejores tasas y términos.' },
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

export function InvestorLoansContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const typesRef = useRef(null);
  const whoRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const typesInView = useInView(typesRef, { once: true, margin: '-100px' });
  const whoInView = useInView(whoRef, { once: true, margin: '-100px' });
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
                {isSpanish ? 'Préstamos para Inversionistas Houston TX' : 'Investor Loans Houston TX'}
              </h1>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'DSCR, estado de cuenta bancario, y préstamos basados en activos para inversionistas de bienes raíces.'
                  : 'DSCR, bank statement, and asset-based loans for real estate investors.'}
              </p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white border-2 border-gold-accent/40 rounded-xl p-6 mt-8 max-w-2xl mx-auto">
                <p className="font-cormorant italic text-xl text-gold-accent">
                  {isSpanish ? 'Sin declaraciones de impuestos requeridas. Califica con el flujo de efectivo de la propiedad.' : 'No tax returns required. Qualify with property cash flow.'}
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href="/contact?type=investor" className="btn-primary flex items-center gap-2">
                  {isSpanish ? 'Obtén Cotización de Inversionista' : 'Get Investor Quote'}
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

        {/* Loan Types */}
        <section ref={typesRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={typesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Opciones de Préstamos para Inversionistas' : 'Investor Loan Options'}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {loanTypes[language].map((type, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={typesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-cream rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center flex-shrink-0">
                      <type.icon className="w-6 h-6 text-gold-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-deep-brown">{type.title}</h3>
                      <p className="text-sm text-gold-accent">{type.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-text-muted mb-4">{type.desc}</p>
                  <ul className="space-y-2 mb-4">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                        <CheckCircle className="w-4 h-4 text-gold-accent flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-text-muted border-t border-brand-border pt-4">
                    <span className="font-semibold text-deep-brown">{isSpanish ? 'Requisitos: ' : 'Requirements: '}</span>
                    {type.requirements}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Is It For */}
        <section ref={whoRef} className="section-padding bg-cream">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={whoInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
                <h2 className="text-display-lg text-deep-brown mb-6">{isSpanish ? '¿Para Quién Son Estos Préstamos?' : 'Who Are These Loans For?'}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {whoIsItFor[language].map((item, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={whoInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: index * 0.05 }} className="flex items-center gap-2 bg-white rounded-lg p-3">
                      <Users className="w-4 h-4 text-gold-accent flex-shrink-0" />
                      <span className="text-sm text-text-body">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={whoInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-deep-brown rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-gold-accent" />
                </div>
                <h3 className="font-display text-2xl text-cream mb-4">{isSpanish ? '¿Construyendo Tu Portafolio?' : 'Building Your Portfolio?'}</h3>
                <p className="text-warm-taupe/80 mb-6">
                  {isSpanish
                    ? 'Daisy puede ayudarte a estructurar financiamiento para múltiples propiedades y maximizar tu potencial de inversión.'
                    : 'Daisy can help you structure financing for multiple properties and maximize your investment potential.'}
                </p>
                <a href="tel:8328947676" className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors">
                  <Phone className="w-4 h-4" />
                  {isSpanish ? 'Consulta de Inversionista' : 'Investor Consultation'}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Preguntas Frecuentes de Inversionistas' : 'Investor Loan FAQs'}</h2>
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
                <Building className="w-8 h-8 text-gold-accent" />
              </div>
              <h2 className="text-display-lg text-cream mb-4">{isSpanish ? '¿Listo para Financiar Tu Próxima Inversión?' : 'Ready to Finance Your Next Investment?'}</h2>
              <p className="text-warm-taupe/80 text-lg mb-8">{isSpanish ? 'Daisy se especializa en préstamos creativos para inversionistas de bienes raíces.' : 'Daisy specializes in creative lending for real estate investors.'}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact?type=investor" className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors">
                  {isSpanish ? 'Obtener Cotización de Inversionista' : 'Get Investor Quote'}
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
