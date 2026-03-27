'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Shield,
  CheckCircle,
  DollarSign,
  Phone,
  ArrowRight,
  Award,
  Home,
  Users,
  FileCheck,
  Clock,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const vaBenefits = {
  en: [
    { icon: DollarSign, title: 'Zero Down Payment', desc: 'No down payment required — buy with $0 out of pocket for the down payment.' },
    { icon: Shield, title: 'No PMI', desc: 'Unlike conventional loans, VA loans never require private mortgage insurance.' },
    { icon: Award, title: 'Competitive Rates', desc: 'VA loan rates are typically lower than conventional rates.' },
    { icon: Users, title: 'Flexible Credit', desc: 'More flexible credit requirements than most loan types.' },
    { icon: FileCheck, title: 'Limited Closing Costs', desc: 'VA limits what veterans can pay in closing costs.' },
    { icon: Clock, title: 'Reusable Benefit', desc: 'Your VA loan benefit can be used multiple times throughout your life.' },
  ],
  es: [
    { icon: DollarSign, title: 'Cero Enganche', desc: 'No se requiere enganche — compra con $0 de tu bolsillo para el enganche.' },
    { icon: Shield, title: 'Sin PMI', desc: 'A diferencia de los préstamos convencionales, los préstamos VA nunca requieren seguro hipotecario privado.' },
    { icon: Award, title: 'Tasas Competitivas', desc: 'Las tasas de préstamos VA son típicamente más bajas que las tasas convencionales.' },
    { icon: Users, title: 'Crédito Flexible', desc: 'Requisitos de crédito más flexibles que la mayoría de los tipos de préstamos.' },
    { icon: FileCheck, title: 'Costos de Cierre Limitados', desc: 'VA limita lo que los veteranos pueden pagar en costos de cierre.' },
    { icon: Clock, title: 'Beneficio Reutilizable', desc: 'Tu beneficio de préstamo VA se puede usar múltiples veces a lo largo de tu vida.' },
  ],
};

const eligibility = {
  en: [
    'Veterans with honorable discharge',
    'Active duty service members (90+ continuous days)',
    'National Guard or Reserve members (6+ years)',
    'Eligible surviving spouses',
    'Must obtain Certificate of Eligibility (COE)',
    'Property must be primary residence',
  ],
  es: [
    'Veteranos con baja honorable',
    'Miembros en servicio activo (90+ días continuos)',
    'Miembros de la Guardia Nacional o Reserva (6+ años)',
    'Cónyuges sobrevivientes elegibles',
    'Debe obtener Certificado de Elegibilidad (COE)',
    'La propiedad debe ser residencia principal',
  ],
};

const faqData = {
  en: [
    { question: 'What is a VA loan?', answer: 'A VA loan is a mortgage guaranteed by the U.S. Department of Veterans Affairs. This guarantee allows lenders to offer favorable terms including zero down payment and no PMI.' },
    { question: 'How do I get my Certificate of Eligibility?', answer: 'You can obtain your COE through the VA eBenefits portal, by mail using VA Form 26-1880, or Daisy can often retrieve it for you directly through the lender portal.' },
    { question: 'Is there a VA loan limit?', answer: 'For veterans with full entitlement, there is no loan limit. If you have reduced entitlement (from a previous VA loan), county loan limits apply.' },
    { question: 'What is the VA funding fee?', answer: 'The VA funding fee is a one-time fee (1.25-3.3% depending on factors). It can be rolled into your loan. Some veterans are exempt, including those with service-connected disabilities.' },
    { question: 'Can I use a VA loan more than once?', answer: 'Yes! Your VA loan benefit is reusable. You can use it multiple times as long as you have remaining entitlement or restore your entitlement by paying off a previous VA loan.' },
    { question: 'Do VA loans take longer to close?', answer: 'Not necessarily. VA loans can close in 30-45 days, similar to conventional loans. Working with an experienced VA lender helps ensure a smooth process.' },
  ],
  es: [
    { question: '¿Qué es un préstamo VA?', answer: 'Un préstamo VA es una hipoteca garantizada por el Departamento de Asuntos de Veteranos de EE.UU. Esta garantía permite a los prestamistas ofrecer términos favorables incluyendo cero enganche y sin PMI.' },
    { question: '¿Cómo obtengo mi Certificado de Elegibilidad?', answer: 'Puedes obtener tu COE a través del portal VA eBenefits, por correo usando el Formulario VA 26-1880, o Daisy puede recuperarlo directamente a través del portal del prestamista.' },
    { question: '¿Hay un límite de préstamo VA?', answer: 'Para veteranos con derecho completo, no hay límite de préstamo. Si tienes derecho reducido (de un préstamo VA anterior), aplican límites de condado.' },
    { question: '¿Qué es la tarifa de financiamiento VA?', answer: 'La tarifa de financiamiento VA es una tarifa única (1.25-3.3% dependiendo de factores). Se puede incluir en tu préstamo. Algunos veteranos están exentos, incluyendo aquellos con discapacidades relacionadas al servicio.' },
    { question: '¿Puedo usar un préstamo VA más de una vez?', answer: '¡Sí! Tu beneficio de préstamo VA es reutilizable. Puedes usarlo múltiples veces mientras tengas derecho restante o restaures tu derecho pagando un préstamo VA anterior.' },
    { question: '¿Los préstamos VA tardan más en cerrar?', answer: 'No necesariamente. Los préstamos VA pueden cerrar en 30-45 días, similar a préstamos convencionales. Trabajar con un prestamista VA experimentado ayuda a asegurar un proceso suave.' },
  ],
};

function JsonLdSchema({ language }: { language: 'en' | 'es' }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData[language].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />;
}

export function VALoansContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const eligibilityRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });
  const eligibilityInView = useInView(eligibilityRef, { once: true, margin: '-100px' });
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
                {isSpanish ? 'Préstamos VA Houston TX — Cero Enganche para Veteranos' : 'VA Loans Houston TX — Zero Down Payment for Veterans'}
              </h1>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white border-2 border-gold-accent/40 rounded-xl p-6 mt-8 max-w-2xl mx-auto">
                <p className="font-cormorant italic text-xl text-gold-accent">
                  {isSpanish ? 'Gracias por tu servicio. Déjanos ayudarte a comprar tu casa.' : 'Thank you for your service. Let us help you buy your home.'}
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href="/contact?type=va" className="btn-primary flex items-center gap-2">
                  {isSpanish ? 'Obtén Pre-Aprobación VA' : 'Get VA Pre-Approved'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:8328947676" className="btn-secondary flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  832-894-7676
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto">
                {[
                  { value: '$0', label: isSpanish ? 'Enganche' : 'Down' },
                  { value: '0%', label: 'PMI' },
                  { value: isSpanish ? 'Bajas' : 'Low', label: isSpanish ? 'Tasas' : 'Rates' },
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

        {/* Benefits */}
        <section ref={benefitsRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Beneficios del Préstamo VA' : 'VA Loan Benefits'}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaBenefits[language].map((benefit, index) => (
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

        {/* Eligibility */}
        <section ref={eligibilityRef} className="section-padding bg-cream">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={eligibilityInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
                <h2 className="text-display-lg text-deep-brown mb-6">{isSpanish ? '¿Quién Califica?' : 'Who Qualifies?'}</h2>
                <ul className="space-y-4">
                  {eligibility[language].map((item, index) => (
                    <motion.li key={index} initial={{ opacity: 0, x: -20 }} animate={eligibilityInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: index * 0.05 }} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-body">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={eligibilityInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-deep-brown rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-gold-accent" />
                </div>
                <h3 className="font-display text-2xl text-cream mb-4">{isSpanish ? '¿No Estás Seguro de Tu Elegibilidad?' : 'Not Sure About Your Eligibility?'}</h3>
                <p className="text-warm-taupe/80 mb-6">{isSpanish ? 'Daisy puede ayudarte a obtener tu COE y verificar tu elegibilidad.' : 'Daisy can help you obtain your COE and verify your eligibility.'}</p>
                <a href="tel:8328947676" className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors">
                  <Phone className="w-4 h-4" />
                  {isSpanish ? 'Llama Ahora' : 'Call Now'}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Preguntas Frecuentes sobre VA' : 'VA Loan FAQs'}</h2>
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
                <Home className="w-8 h-8 text-gold-accent" />
              </div>
              <h2 className="text-display-lg text-cream mb-4">{isSpanish ? '¿Listo para Usar Tu Beneficio VA?' : 'Ready to Use Your VA Benefit?'}</h2>
              <p className="text-warm-taupe/80 text-lg mb-8">{isSpanish ? 'Has servido a tu país. Ahora deja que Daisy te sirva a ti.' : "You've served your country. Now let Daisy serve you."}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact?type=va" className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors">
                  {isSpanish ? 'Empezar Mi Préstamo VA' : 'Start My VA Loan'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:8328947676" className="inline-flex items-center gap-2 py-3 px-8 border border-cream/30 text-cream rounded-xl font-semibold hover:bg-cream/10 transition-colors">
                  <Phone className="w-4 h-4" />
                  832-894-7676
                </a>
              </div>
              <p className="text-sm text-warm-taupe/60 mt-6">{isSpanish ? 'Hablamos Español • Consulta Gratuita' : 'Se Habla Español • Free Consultation'}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
