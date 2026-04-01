'use client';

import { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { RefreshCw, CheckCircle, DollarSign, Phone, ArrowRight, TrendingDown, Banknote, Home, Calculator, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
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

// Bankrate-Style Refinance Calculator
function RefinanceCalculator({ language }: { language: 'en' | 'es' }) {
  const t = translations[language].refinance;

  // Current loan inputs
  const [homeValue, setHomeValue] = useState('400000');
  const [loanBalance, setLoanBalance] = useState('300000');
  const [currentRate, setCurrentRate] = useState('7.5');
  const [currentPaymentInput, setCurrentPaymentInput] = useState('');
  const [remainingTerm, setRemainingTerm] = useState('25');

  // New loan inputs
  const [newRate, setNewRate] = useState('6.5');
  const [newTerm, setNewTerm] = useState('30');
  const [closingCosts, setClosingCosts] = useState('3500');

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  const results = useMemo(() => {
    const balance = parseFloat(loanBalance.replace(/,/g, '')) || 0;
    const currentRateNum = (parseFloat(currentRate) || 0) / 100 / 12;
    const remainingPayments = (parseInt(remainingTerm) || 25) * 12;
    const newRateNum = (parseFloat(newRate) || 0) / 100 / 12;
    const newPayments = (parseInt(newTerm) || 30) * 12;
    const costs = parseFloat(closingCosts.replace(/,/g, '')) || 3500;

    // Calculate current payment (if not entered, auto-calculate)
    let currentPayment = parseFloat(currentPaymentInput.replace(/,/g, ''));
    if (isNaN(currentPayment) || currentPayment === 0) {
      if (currentRateNum > 0 && balance > 0) {
        currentPayment = balance * (currentRateNum * Math.pow(1 + currentRateNum, remainingPayments)) / (Math.pow(1 + currentRateNum, remainingPayments) - 1);
      } else {
        currentPayment = 0;
      }
    }

    // Calculate new payment
    let newPayment = 0;
    if (newRateNum > 0 && balance > 0) {
      newPayment = balance * (newRateNum * Math.pow(1 + newRateNum, newPayments)) / (Math.pow(1 + newRateNum, newPayments) - 1);
    }

    // Calculate savings
    const monthlySavings = currentPayment - newPayment;
    const annualSavings = monthlySavings * 12;

    // Break-even (how many months to recover closing costs)
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(costs / monthlySavings) : 0;

    // Lifetime savings (simplified - remaining term vs new term)
    const yearsToCompare = Math.min(parseInt(remainingTerm) || 25, parseInt(newTerm) || 30);
    const lifetimeSavings = annualSavings * yearsToCompare;

    return {
      currentPayment,
      newPayment,
      monthlySavings,
      annualSavings,
      breakEvenMonths,
      lifetimeSavings,
      isPositive: monthlySavings > 0,
    };
  }, [loanBalance, currentRate, remainingTerm, newRate, newTerm, closingCosts, currentPaymentInput]);

  return (
    <div className="bg-cream rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gold-accent/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-gold-accent" />
        </div>
        <h3 className="font-display text-xl text-deep-brown">{t.title}</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Current Loan Section */}
          <div>
            <h4 className="font-semibold text-deep-brown mb-3 uppercase text-sm tracking-wide border-b border-brand-border pb-2">
              {t.currentLoan}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-text-muted mb-1">{t.homeValue}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                  <input
                    type="text"
                    value={homeValue}
                    onChange={(e) => setHomeValue(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">{t.loanBalance}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                  <input
                    type="text"
                    value={loanBalance}
                    onChange={(e) => setLoanBalance(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">{t.currentRate}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(e.target.value)}
                    className="w-full pl-4 pr-8 py-2 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">
                  {t.currentPayment} <span className="text-xs italic">({t.autoCalc})</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                  <input
                    type="text"
                    value={currentPaymentInput}
                    onChange={(e) => setCurrentPaymentInput(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder={formatCurrency(results.currentPayment).replace('$', '')}
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">{t.remainingTerm}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={remainingTerm}
                    onChange={(e) => setRemainingTerm(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full pl-4 pr-16 py-2 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">{t.years}</span>
                </div>
              </div>
            </div>
          </div>

          {/* New Loan Section */}
          <div>
            <h4 className="font-semibold text-deep-brown mb-3 uppercase text-sm tracking-wide border-b border-brand-border pb-2">
              {t.newLoan}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-text-muted mb-1">{t.newRate}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    className="w-full pl-4 pr-8 py-2 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">{t.newTerm}</label>
                <select
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none"
                >
                  <option value="10">10 {t.years}</option>
                  <option value="15">15 {t.years}</option>
                  <option value="20">20 {t.years}</option>
                  <option value="30">30 {t.years}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">{t.closingCosts}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                  <input
                    type="text"
                    value={closingCosts}
                    onChange={(e) => setClosingCosts(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl p-6 border border-brand-border">
          <h4 className="font-semibold text-deep-brown mb-4 uppercase text-sm tracking-wide border-b border-brand-border pb-2">
            {t.results}
          </h4>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-brand-border/50">
              <span className="text-text-muted">{t.currentMonthly}</span>
              <span className="font-medium text-deep-brown">{formatCurrency(results.currentPayment)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-border/50">
              <span className="text-text-muted">{t.newMonthly}</span>
              <span className="font-medium text-deep-brown">{formatCurrency(results.newPayment)}</span>
            </div>

            <div className="bg-cream/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-deep-brown">{t.monthlySavings}</span>
                <span className={`text-2xl font-display font-bold ${results.isPositive ? 'text-gold-accent' : 'text-red-500'}`}>
                  {formatCurrency(results.monthlySavings)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">{t.annualSavings}</span>
                <span className="font-medium">{formatCurrency(results.annualSavings)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-text-muted">{t.breakEven}</span>
                <span className="font-medium text-deep-brown">
                  {results.isPositive ? `${results.breakEvenMonths} ${t.months}` : '—'}
                </span>
              </div>
              {results.isPositive && results.breakEvenMonths > 0 && (
                <p className="text-xs text-text-muted italic">
                  {t.breakEvenDesc} {results.breakEvenMonths} {t.months}
                </p>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-brand-border/50">
                <span className="text-text-muted">{t.lifetimeSavings}</span>
                <span className="font-bold text-green-600">{formatCurrency(results.lifetimeSavings)}</span>
              </div>
            </div>
          </div>

          <Link
            href="/contact?purpose=refinance"
            className="w-full mt-6 inline-flex items-center justify-center gap-2 py-3 bg-gold-accent text-dark-footer rounded-lg font-semibold hover:bg-gold-accent/90 transition-colors"
          >
            {t.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-text-muted font-dm italic border-t border-brand-border pt-4 mt-6">
        {t.disclaimer}
      </p>
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={calcInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-8">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? '¿Vale la Pena Refinanciar?' : 'Is Refinancing Worth It?'}</h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                {isSpanish
                  ? 'Compara tu préstamo actual con un nuevo préstamo para ver tus ahorros potenciales.'
                  : 'Compare your current loan with a new loan to see your potential savings.'}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={calcInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <RefinanceCalculator language={language} />
            </motion.div>
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
