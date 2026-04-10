'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Calculator, Home, DollarSign, Percent, Phone, ArrowRight, BookOpen, Download, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

// Smart default rates for Texas
const TAX_RATE_DEFAULT = 0.025; // 2.5% of home value annually
const INSURANCE_RATE_DEFAULT = 0.010; // 1.0% of home value annually

// Mortgage Payment Calculator with PITI breakdown
function MortgageCalculator({ language }: { language: 'en' | 'es' }) {
  const t = translations[language].calculator;

  const [homePrice, setHomePrice] = useState('300000');
  const [downPaymentDollar, setDownPaymentDollar] = useState('10500');
  const [downPaymentPercent, setDownPaymentPercent] = useState('3.5');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');

  const price = parseFloat(homePrice.replace(/,/g, '')) || 0;

  // Sync down payment fields when home price changes
  useEffect(() => {
    const pct = parseFloat(downPaymentPercent) || 0;
    const newDollar = Math.round(price * (pct / 100));
    setDownPaymentDollar(newDollar.toString());
  }, [homePrice, downPaymentPercent]);

  // Handle down payment % change
  const handlePercentChange = (value: string) => {
    setDownPaymentPercent(value);
    const pct = parseFloat(value) || 0;
    const newDollar = Math.round(price * (pct / 100));
    setDownPaymentDollar(newDollar.toString());
  };

  // Handle down payment $ change
  const handleDollarChange = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    setDownPaymentDollar(cleanValue);
    const dollar = parseFloat(cleanValue) || 0;
    if (price > 0) {
      const newPct = ((dollar / price) * 100).toFixed(1);
      setDownPaymentPercent(newPct);
    }
  };

  const downPayment = parseFloat(downPaymentDollar.replace(/,/g, '')) || 0;
  const loanAmount = price - downPayment;
  const monthlyRate = (parseFloat(interestRate) || 0) / 100 / 12;
  const numPayments = (parseInt(loanTerm) || 30) * 12;

  // Calculate P&I
  let monthlyPI = 0;
  if (monthlyRate > 0 && loanAmount > 0) {
    monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  // Calculate taxes and insurance
  const monthlyTax = (price * TAX_RATE_DEFAULT) / 12;
  const monthlyInsurance = (price * INSURANCE_RATE_DEFAULT) / 12;

  // Total PITI
  const totalPayment = monthlyPI + monthlyTax + monthlyInsurance;

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  return (
    <div id="mortgage-calculator" className="bg-cream rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gold-accent/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-gold-accent" />
        </div>
        <h3 className="font-display text-xl text-deep-brown">
          {language === 'es' ? 'Calculadora de Pago Mensual' : 'Mortgage Payment Calculator'}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs Column */}
        <div className="space-y-4">
          {/* Home Price */}
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-1">{t.homePrice}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
              <input
                type="text"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white focus:ring-2 focus:ring-gold-accent/50 focus:border-gold-accent outline-none"
              />
            </div>
          </div>

          {/* Down Payment - Two Fields */}
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-1">{t.downPayment}</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">%</span>
                <input
                  type="text"
                  value={downPaymentPercent}
                  onChange={(e) => handlePercentChange(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white focus:ring-2 focus:ring-gold-accent/50 focus:border-gold-accent outline-none"
                  placeholder="3.5"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                <input
                  type="text"
                  value={downPaymentDollar}
                  onChange={(e) => handleDollarChange(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white focus:ring-2 focus:ring-gold-accent/50 focus:border-gold-accent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-1">{t.interestRate}</label>
            <div className="relative">
              <input
                type="text"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full pl-4 pr-8 py-2 rounded-lg border border-brand-border bg-white focus:ring-2 focus:ring-gold-accent/50 focus:border-gold-accent outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">%</span>
            </div>
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-1">{t.loanTerm}</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-brand-border bg-white focus:ring-2 focus:ring-gold-accent/50 focus:border-gold-accent outline-none"
            >
              <option value="30">30 {t.years}</option>
              <option value="20">20 {t.years}</option>
              <option value="15">15 {t.years}</option>
            </select>
          </div>
        </div>

        {/* Results Column */}
        <div className="bg-white rounded-xl p-6 flex flex-col">
          <p className="text-sm font-medium text-deep-brown uppercase tracking-wide mb-4">
            {language === 'es' ? 'Pago Mensual Estimado' : 'Estimated Monthly Payment'}
          </p>

          {/* PITI Breakdown */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-muted">{t.principalInterest}</span>
              <span className="font-medium">{formatCurrency(monthlyPI)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-muted">{t.propertyTax}</span>
              <span className="font-medium">{formatCurrency(monthlyTax)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-muted">{t.insurance}</span>
              <span className="font-medium">{formatCurrency(monthlyInsurance)}</span>
            </div>
            <div className="border-t border-brand-border pt-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-deep-brown">{t.totalPayment}</span>
                <span className="text-2xl font-display font-bold text-gold-accent">{formatCurrency(totalPayment)}</span>
              </div>
            </div>
          </div>

          {/* Loan Amount Info */}
          <div className="text-sm text-text-muted mt-auto">
            <div className="flex justify-between">
              <span>{t.loanAmount}:</span>
              <span className="font-medium">{formatCurrency(loanAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 pt-4 border-t border-brand-border">
        <Link
          href="/contact?purpose=payment-estimate"
          className="inline-flex items-center gap-2 bg-gold-accent text-dark-footer px-6 py-3 rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
        >
          {t.getExact}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs text-text-muted mt-4 italic">
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
}

// Affordability Calculator
function AffordabilityCalculator({ language }: { language: 'en' | 'es' }) {
  const [monthlyIncome, setMonthlyIncome] = useState('8000');
  const [monthlyDebts, setMonthlyDebts] = useState('500');
  const [downPaymentAmount, setDownPaymentAmount] = useState('20000');
  const [interestRate, setInterestRate] = useState('6.5');

  const income = parseFloat(monthlyIncome.replace(/,/g, '')) || 0;
  const debts = parseFloat(monthlyDebts.replace(/,/g, '')) || 0;
  const down = parseFloat(downPaymentAmount.replace(/,/g, '')) || 0;
  const rate = (parseFloat(interestRate) || 6.5) / 100 / 12;

  const maxPayment = income * 0.28;
  const availableForMortgage = maxPayment;
  const numPayments = 360;

  let maxLoan = 0;
  if (rate > 0) {
    maxLoan = availableForMortgage * (Math.pow(1 + rate, numPayments) - 1) / (rate * Math.pow(1 + rate, numPayments));
  }

  const maxHomePrice = maxLoan + down;
  const recommendedPrice = maxHomePrice * 0.9;

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="bg-cream rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gold-accent/10 flex items-center justify-center">
          <Home className="w-5 h-5 text-gold-accent" />
        </div>
        <h3 className="font-display text-xl text-deep-brown">
          {language === 'es' ? 'Calculadora de Asequibilidad' : 'Affordability Calculator'}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-1">{language === 'es' ? 'Ingreso Mensual Bruto' : 'Gross Monthly Income'}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
              <input type="text" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-brown mb-1">{language === 'es' ? 'Deudas Mensuales' : 'Monthly Debts'}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
              <input type="text" value={monthlyDebts} onChange={(e) => setMonthlyDebts(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-brown mb-1">{language === 'es' ? 'Enganche Disponible' : 'Available Down Payment'}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
              <input type="text" value={downPaymentAmount} onChange={(e) => setDownPaymentAmount(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-brown mb-1">{language === 'es' ? 'Tasa de Interés Estimada' : 'Estimated Interest Rate'}</label>
            <div className="relative">
              <input type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full pl-4 pr-8 py-2 rounded-lg border border-brand-border bg-white" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 flex flex-col justify-center">
          <p className="text-sm text-text-muted mb-1">{language === 'es' ? 'Precio Máximo de Casa' : 'Maximum Home Price'}</p>
          <p className="text-4xl font-display font-bold text-gold-accent mb-2">{formatCurrency(maxHomePrice)}</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">{language === 'es' ? 'Precio Recomendado' : 'Recommended Price'}</span><span className="font-medium text-green-600">{formatCurrency(recommendedPrice)}</span></div>
            <div className="flex justify-between"><span className="text-text-muted">{language === 'es' ? 'Pago Mensual Máx.' : 'Max Monthly Payment'}</span><span className="font-medium">{formatCurrency(maxPayment)}</span></div>
          </div>
          <p className="text-xs text-text-muted mt-4">{language === 'es' ? '*Basado en 28% de ingresos brutos' : '*Based on 28% of gross income'}</p>
        </div>
      </div>

      <Link href="/contact" className="inline-flex items-center gap-1 text-sm text-gold-accent hover:underline mt-4">
        {language === 'es' ? 'Habla con Daisy sobre tus números →' : 'Talk to Daisy about your numbers →'}
      </Link>
    </div>
  );
}

// DTI Calculator
function DTICalculator({ language }: { language: 'en' | 'es' }) {
  const [grossIncome, setGrossIncome] = useState('8000');
  const [housingPayment, setHousingPayment] = useState('2000');
  const [carPayment, setCarPayment] = useState('400');
  const [creditCards, setCreditCards] = useState('200');
  const [studentLoans, setStudentLoans] = useState('300');
  const [otherDebts, setOtherDebts] = useState('0');

  const income = parseFloat(grossIncome.replace(/,/g, '')) || 0;
  const housing = parseFloat(housingPayment.replace(/,/g, '')) || 0;
  const car = parseFloat(carPayment.replace(/,/g, '')) || 0;
  const cards = parseFloat(creditCards.replace(/,/g, '')) || 0;
  const student = parseFloat(studentLoans.replace(/,/g, '')) || 0;
  const other = parseFloat(otherDebts.replace(/,/g, '')) || 0;

  const totalDebt = housing + car + cards + student + other;
  const dti = income > 0 ? (totalDebt / income) * 100 : 0;

  const getColor = () => {
    if (dti <= 36) return 'text-green-600';
    if (dti <= 43) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMessage = () => {
    if (dti <= 36) return language === 'es' ? '¡Excelente! Tu DTI está en buen rango.' : 'Excellent! Your DTI is in good range.';
    if (dti <= 43) return language === 'es' ? 'Aceptable, pero podrías tener opciones limitadas.' : 'Acceptable, but you may have limited options.';
    return language === 'es' ? 'Alto. Considera pagar deudas antes de comprar.' : 'High. Consider paying down debts before buying.';
  };

  return (
    <div className="bg-cream rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gold-accent/10 flex items-center justify-center">
          <Percent className="w-5 h-5 text-gold-accent" />
        </div>
        <h3 className="font-display text-xl text-deep-brown">
          {language === 'es' ? 'Calculadora de DTI' : 'DTI Calculator'}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-1">{language === 'es' ? 'Ingreso Mensual Bruto' : 'Gross Monthly Income'}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
              <input type="text" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-8 pr-4 py-2 rounded-lg border border-brand-border bg-white" />
            </div>
          </div>

          <p className="text-sm font-medium text-deep-brown">{language === 'es' ? 'Deudas Mensuales:' : 'Monthly Debts:'}</p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-text-muted mb-1">{language === 'es' ? 'Pago de Vivienda' : 'Housing Payment'}</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                <input type="text" value={housingPayment} onChange={(e) => setHousingPayment(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-brand-border bg-white text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">{language === 'es' ? 'Pago de Auto' : 'Car Payment'}</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                <input type="text" value={carPayment} onChange={(e) => setCarPayment(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-brand-border bg-white text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">{language === 'es' ? 'Tarjetas de Crédito' : 'Credit Cards'}</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                <input type="text" value={creditCards} onChange={(e) => setCreditCards(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-brand-border bg-white text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">{language === 'es' ? 'Préstamos Estudiantiles' : 'Student Loans'}</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                <input type="text" value={studentLoans} onChange={(e) => setStudentLoans(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-brand-border bg-white text-sm" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-text-muted mb-1">{language === 'es' ? 'Otras Deudas' : 'Other Debts'}</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                <input type="text" value={otherDebts} onChange={(e) => setOtherDebts(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-brand-border bg-white text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 flex flex-col justify-center">
          <p className="text-sm text-text-muted mb-1">{language === 'es' ? 'Tu Ratio DTI' : 'Your DTI Ratio'}</p>
          <p className={`text-5xl font-display font-bold ${getColor()} mb-2`}>{dti.toFixed(1)}%</p>
          <p className={`text-sm ${getColor()} mb-4`}>{getMessage()}</p>
          <div className="space-y-1 text-xs text-text-muted">
            <p>• ≤36%: {language === 'es' ? 'Excelente' : 'Excellent'}</p>
            <p>• 36-43%: {language === 'es' ? 'Aceptable' : 'Acceptable'}</p>
            <p>• &gt;43%: {language === 'es' ? 'Alto' : 'High'}</p>
          </div>
        </div>
      </div>

      <Link href="/contact" className="inline-flex items-center gap-1 text-sm text-gold-accent hover:underline mt-4">
        {language === 'es' ? 'Habla con Daisy sobre tus números →' : 'Talk to Daisy about your numbers →'}
      </Link>
    </div>
  );
}

export function ResourcesContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const calcRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const calcInView = useInView(calcRef, { once: true, margin: '-100px' });

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section ref={heroRef} className="bg-cream py-12 md:py-16">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <h1 className="text-display-xl text-deep-brown mb-4">
              {isSpanish ? 'Tu Centro de Recursos Hipotecarios' : 'Your Mortgage Resource Center'}
            </h1>
            <p className="text-lg text-text-muted">
              {isSpanish ? 'Calculadoras gratuitas para ayudarte a planificar tu compra de casa.' : 'Free calculators to help you plan your home purchase.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculators */}
      <section ref={calcRef} className="section-padding bg-warm-white">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={calcInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="space-y-8">
            <MortgageCalculator language={language} />
            <AffordabilityCalculator language={language} />
            <DTICalculator language={language} />
          </motion.div>
        </div>
      </section>

      {/* Homebuyer Guide Section */}
      <section id="homebuyer-guide" className="section-padding bg-cream">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-brand-border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-accent/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-gold-accent" />
                    </div>
                    <h2 className="font-display text-2xl text-deep-brown">
                      {isSpanish ? 'Guía para Compradores Primerizos' : 'First-Time Homebuyer Guide'}
                    </h2>
                  </div>
                  <p className="text-text-muted mb-6">
                    {isSpanish
                      ? 'Todo lo que necesitas saber para comprar tu primera casa en Houston. Desde pre-aprobación hasta cierre, te guiamos en cada paso.'
                      : 'Everything you need to know to buy your first home in Houston. From pre-approval to closing, we guide you every step of the way.'}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      isSpanish ? 'Lista de verificación paso a paso' : 'Step-by-step checklist',
                      isSpanish ? 'Opciones de préstamos explicadas' : 'Loan options explained',
                      isSpanish ? 'Errores comunes a evitar' : 'Common mistakes to avoid',
                      isSpanish ? 'Programas de ayuda para enganche' : 'Down payment assistance programs',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                        <CheckCircle className="w-4 h-4 text-gold-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services/first-time-homebuyer-houston"
                    className="inline-flex items-center gap-2 bg-gold-accent text-dark-footer px-6 py-3 rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors"
                  >
                    {isSpanish ? 'Ver la Guía Completa' : 'View Complete Guide'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gold-accent/10 flex items-center justify-center">
                    <Download className="w-20 h-20 text-gold-accent/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-deep-brown">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto">
            <DollarSign className="w-12 h-12 text-gold-accent mx-auto mb-6" />
            <h2 className="text-display-lg text-cream mb-4">
              {isSpanish ? '¿Listo para Obtener Números Reales?' : 'Ready to Get Real Numbers?'}
            </h2>
            <p className="text-warm-taupe/80 text-lg mb-8">
              {isSpanish ? 'Estas calculadoras son solo estimaciones. Daisy puede darte números precisos basados en tu situación.' : 'These calculators are just estimates. Daisy can give you precise numbers based on your situation.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors">
                {isSpanish ? 'Obtener Pre-Aprobación' : 'Get Pre-Approved'}
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
  );
}
