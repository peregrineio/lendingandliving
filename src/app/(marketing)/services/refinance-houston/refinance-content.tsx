'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { RefreshCw, CheckCircle, DollarSign, Phone, ArrowRight, TrendingDown, Banknote, Home, Calculator, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const refinanceTypes = {
  en: [
    {
      title: 'Rate-and-Term Refinance',
      desc: 'Lower your interest rate or change your loan term without taking cash out.',
      benefits: ['Lower monthly payments', 'Pay off your home faster', 'Switch from ARM to fixed rate', 'Remove PMI if you have 20% equity'],
      bestFor: 'Homeowners who want to reduce their rate or monthly payment',
    },
    {
      title: 'Cash-Out Refinance',
      desc: 'Access your home equity by refinancing for more than you owe.',
      benefits: ['Access cash for home improvements', 'Consolidate high-interest debt', 'Fund major purchases or investments', 'Typically better rates than HELOCs'],
      bestFor: 'Homeowners with significant equity who need cash',
    },
  ],
  es: [
    {
      title: 'Refinanciamiento de Tasa y Plazo',
      desc: 'Baja tu tasa de interés o cambia el plazo de tu préstamo sin retirar efectivo.',
      benefits: ['Pagos mensuales más bajos', 'Paga tu casa más rápido', 'Cambia de tasa ajustable a fija', 'Elimina PMI si tienes 20% de equidad'],
      bestFor: 'Propietarios que quieren reducir su tasa o pago mensual',
    },
    {
      title: 'Refinanciamiento con Retiro de Efectivo',
      desc: 'Accede al capital de tu casa refinanciando por más de lo que debes.',
      benefits: ['Accede a efectivo para mejoras del hogar', 'Consolida deudas de alto interés', 'Financia compras o inversiones importantes', 'Típicamente mejores tasas que HELOCs'],
      bestFor: 'Propietarios con equidad significativa que necesitan efectivo',
    },
  ],
};

const reasons = {
  en: ['Lower your interest rate', 'Reduce monthly payments', 'Pay off your loan faster', 'Switch from adjustable to fixed rate', 'Remove private mortgage insurance (PMI)', 'Access home equity (cash out)', 'Consolidate debt', 'Fund home improvements'],
  es: ['Bajar tu tasa de interés', 'Reducir pagos mensuales', 'Pagar tu préstamo más rápido', 'Cambiar de tasa ajustable a fija', 'Eliminar seguro hipotecario privado (PMI)', 'Acceder al capital de tu casa (retiro)', 'Consolidar deudas', 'Financiar mejoras del hogar'],
};

const faqData = {
  en: [
    { question: 'When does it make sense to refinance?', answer: 'Generally, refinancing makes sense if you can lower your rate by at least 0.5-1%, plan to stay in your home long enough to recoup closing costs, or need to access equity. Daisy can run a break-even analysis for your specific situation.' },
    { question: 'What are refinance closing costs?', answer: 'Refinance closing costs typically range from 2-5% of the loan amount. These can sometimes be rolled into the loan or offset by lender credits. Daisy will show you all options.' },
    { question: 'How much equity do I need to refinance?', answer: 'Most refinance programs require at least 20% equity for the best rates, though some allow as little as 5%. Cash-out refinances typically require more equity and limit how much you can take.' },
    { question: 'Can I refinance with bad credit?', answer: 'Yes, though your options may be limited. FHA Streamline refinance (for existing FHA loans) has minimal credit requirements. Daisy can help you explore options based on your credit situation.' },
    { question: 'How long does a refinance take?', answer: 'Most refinances close in 30-45 days. FHA Streamline and VA IRRRL refinances can be faster due to reduced documentation requirements.' },
    { question: 'Will refinancing affect my credit score?', answer: 'The hard inquiry and new account may cause a small, temporary dip. However, if refinancing lowers your debt-to-income ratio or credit utilization, it can help your score long-term.' },
  ],
  es: [
    { question: '¿Cuándo tiene sentido refinanciar?', answer: 'Generalmente, refinanciar tiene sentido si puedes bajar tu tasa al menos 0.5-1%, planeas quedarte en tu casa el tiempo suficiente para recuperar los costos de cierre, o necesitas acceder a tu capital. Daisy puede hacer un análisis de punto de equilibrio para tu situación.' },
    { question: '¿Cuáles son los costos de cierre de refinanciamiento?', answer: 'Los costos de cierre de refinanciamiento típicamente van del 2-5% del monto del préstamo. Estos a veces pueden incluirse en el préstamo o compensarse con créditos del prestamista.' },
    { question: '¿Cuánta equidad necesito para refinanciar?', answer: 'La mayoría de los programas de refinanciamiento requieren al menos 20% de equidad para las mejores tasas, aunque algunos permiten tan poco como 5%. Los refinanciamientos con retiro de efectivo típicamente requieren más equidad.' },
    { question: '¿Puedo refinanciar con mal crédito?', answer: 'Sí, aunque tus opciones pueden ser limitadas. El refinanciamiento FHA Streamline (para préstamos FHA existentes) tiene requisitos de crédito mínimos. Daisy puede ayudarte a explorar opciones.' },
    { question: '¿Cuánto tiempo toma un refinanciamiento?', answer: 'La mayoría de los refinanciamientos cierran en 30-45 días. Los refinanciamientos FHA Streamline y VA IRRRL pueden ser más rápidos debido a requisitos de documentación reducidos.' },
    { question: '¿El refinanciamiento afectará mi puntaje de crédito?', answer: 'La consulta y la cuenta nueva pueden causar una pequeña caída temporal. Sin embargo, si el refinanciamiento baja tu relación deuda-ingreso, puede ayudar a tu puntaje a largo plazo.' },
  ],
};

// Break-even Calculator
function BreakEvenCalculator({ language }: { language: 'en' | 'es' }) {
  const [currentPayment, setCurrentPayment] = useState('');
  const [newPayment, setNewPayment] = useState('');
  const [closingCosts, setClosingCosts] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const current = parseFloat(currentPayment.replace(/,/g, ''));
    const newPmt = parseFloat(newPayment.replace(/,/g, ''));
    const costs = parseFloat(closingCosts.replace(/,/g, ''));
    if (isNaN(current) || isNaN(newPmt) || isNaN(costs) || current <= newPmt) return;
    const monthsToBreakEven = Math.ceil(costs / (current - newPmt));
    setResult(monthsToBreakEven);
  };

  return (
    <div className="bg-cream rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-gold-accent" />
        </div>
        <div>
          <h3 className="font-display text-lg text-deep-brown">{language === 'es' ? 'Calculadora de Punto de Equilibrio' : 'Break-Even Calculator'}</h3>
          <p className="text-sm text-text-muted">{language === 'es' ? '¿Cuánto tiempo para recuperar costos?' : 'How long to recoup costs?'}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-deep-brown mb-1">{language === 'es' ? 'Pago Mensual Actual' : 'Current Monthly Payment'}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
            <input type="text" value={currentPayment} onChange={(e) => setCurrentPayment(e.target.value.replace(/[^0-9,]/g, ''))} placeholder="2,500" className="w-full pl-8 pr-4 py-3 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-brown mb-1">{language === 'es' ? 'Nuevo Pago Mensual' : 'New Monthly Payment'}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
            <input type="text" value={newPayment} onChange={(e) => setNewPayment(e.target.value.replace(/[^0-9,]/g, ''))} placeholder="2,200" className="w-full pl-8 pr-4 py-3 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-brown mb-1">{language === 'es' ? 'Costos de Cierre Estimados' : 'Estimated Closing Costs'}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
            <input type="text" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value.replace(/[^0-9,]/g, ''))} placeholder="6,000" className="w-full pl-8 pr-4 py-3 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all" />
          </div>
        </div>
        <button onClick={calculate} className="w-full py-3 bg-gold-accent text-dark-footer rounded-lg font-semibold hover:bg-gold-accent/90 transition-colors">
          {language === 'es' ? 'Calcular' : 'Calculate'}
        </button>
        {result !== null && (
          <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-center">
            <p className="text-green-800">
              {language === 'es' ? 'Punto de equilibrio: ' : 'Break-even: '}
              <span className="font-bold">{result} {language === 'es' ? 'meses' : 'months'}</span>
              {result <= 24 && <span className="block text-sm mt-1">{language === 'es' ? '¡Probablemente vale la pena!' : 'Likely worth it!'}</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function JsonLdSchema({ language }: { language: 'en' | 'es' }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData[language].map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />;
}

export function RefinanceContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const typesRef = useRef(null);
  const calcRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const typesInView = useInView(typesRef, { once: true, margin: '-100px' });
  const calcInView = useInView(calcRef, { once: true, margin: '-100px' });
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
                {isSpanish ? 'Refinancia Tu Hipoteca Houston TX' : 'Refinance Your Mortgage Houston TX'}
              </h1>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {isSpanish ? 'Baja tu tasa, reduce tus pagos, o accede al capital de tu casa.' : 'Lower your rate, reduce your payments, or access your home equity.'}
              </p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href="/contact?type=refinance" className="btn-primary flex items-center gap-2">
                  {isSpanish ? 'Obtén Cotización de Refinanciamiento' : 'Get Refinance Quote'}
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

        {/* Reasons to Refinance */}
        <section className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Razones para Refinanciar' : 'Reasons to Refinance'}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {reasons[language].map((reason, index) => (
                <div key={index} className="flex items-center gap-2 bg-cream rounded-lg p-3">
                  <CheckCircle className="w-4 h-4 text-gold-accent flex-shrink-0" />
                  <span className="text-sm text-text-body">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Refinance Types */}
        <section ref={typesRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={typesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Tipos de Refinanciamiento' : 'Types of Refinancing'}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {refinanceTypes[language].map((type, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={typesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-xl p-6 border border-brand-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gold-accent/10 flex items-center justify-center">
                      {index === 0 ? <TrendingDown className="w-5 h-5 text-gold-accent" /> : <Banknote className="w-5 h-5 text-gold-accent" />}
                    </div>
                    <h3 className="font-display text-xl text-deep-brown">{type.title}</h3>
                  </div>
                  <p className="text-text-muted mb-4">{type.desc}</p>
                  <ul className="space-y-2 mb-4">
                    {type.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                        <CheckCircle className="w-4 h-4 text-gold-accent flex-shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-text-muted border-t border-brand-border pt-4">
                    <span className="font-semibold text-deep-brown">{isSpanish ? 'Mejor para: ' : 'Best for: '}</span>
                    {type.bestFor}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section ref={calcRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={calcInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
                <h2 className="text-display-lg text-deep-brown mb-6">{isSpanish ? '¿Vale la Pena Refinanciar?' : 'Is Refinancing Worth It?'}</h2>
                <p className="text-text-muted mb-6">
                  {isSpanish
                    ? 'Usa esta calculadora para estimar cuánto tiempo tomará recuperar tus costos de cierre con tus ahorros mensuales.'
                    : 'Use this calculator to estimate how long it will take to recoup your closing costs with your monthly savings.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold-accent mt-0.5" />
                    <p className="text-sm text-text-muted">{isSpanish ? 'Si planeas quedarte más de 2-3 años, probablemente vale la pena' : 'If you plan to stay 2-3+ years, it is likely worth it'}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold-accent mt-0.5" />
                    <p className="text-sm text-text-muted">{isSpanish ? 'Daisy puede hacer un análisis completo para tu situación' : 'Daisy can run a full analysis for your situation'}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={calcInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
                <BreakEvenCalculator language={language} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Preguntas Frecuentes sobre Refinanciamiento' : 'Refinance FAQs'}</h2>
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
                <RefreshCw className="w-8 h-8 text-gold-accent" />
              </div>
              <h2 className="text-display-lg text-cream mb-4">{isSpanish ? '¿Listo para Explorar Opciones de Refinanciamiento?' : 'Ready to Explore Refinance Options?'}</h2>
              <p className="text-warm-taupe/80 text-lg mb-8">{isSpanish ? 'Obtén una cotización gratuita y sin compromiso de Daisy.' : 'Get a free, no-obligation quote from Daisy.'}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact?type=refinance" className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors">
                  {isSpanish ? 'Obtener Cotización' : 'Get My Quote'}
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
