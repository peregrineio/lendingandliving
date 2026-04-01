// ========================================
// LENDING & LIVING - TRANSLATIONS
// Complete bilingual content (EN/ES)
// ========================================

export type Language = 'en' | 'es';

export interface Translations {
  [key: string]: {
    nav: {
      home: string;
      services: string;
      resources: string;
      blog: string;
      about: string;
      contact: string;
      cta: string;
    };
    hero: {
      headline: string;
      subheadline: string;
      cta_primary: string;
      cta_secondary: string;
      trust: string;
    };
    whyDaisy: {
      headline: string;
      subheadline: string;
      card1_title: string;
      card1_desc: string;
      card2_title: string;
      card2_desc: string;
      card3_title: string;
      card3_desc: string;
      bio: string;
    };
    services: {
      headline: string;
      fha_title: string;
      fha_desc: string;
      conventional_title: string;
      conventional_desc: string;
      itin_title: string;
      itin_desc: string;
      dpa_title: string;
      dpa_desc: string;
      va_title: string;
      va_desc: string;
      refinance_title: string;
      refinance_desc: string;
      investor_title: string;
      investor_desc: string;
      nontraditional_title: string;
      nontraditional_desc: string;
      cta: string;
    };
    dpa: {
      headline: string;
      subheadline: string;
      stat1: string;
      stat1_value: string;
      stat2: string;
      stat2_value: string;
      stat3: string;
      stat3_value: string;
      cta: string;
    };
    howItWorks: {
      headline: string;
      step1: string;
      step1_desc: string;
      step2: string;
      step2_desc: string;
      step3: string;
      step3_desc: string;
      step4: string;
      step4_desc: string;
    };
    testimonials: {
      headline: string;
    };
    contact: {
      headline: string;
      subheadline: string;
      name: string;
      phone: string;
      timing: string;
      purpose: string;
      purpose_options: string[];
      submit: string;
      success: string;
    };
    footer: {
      tagline: string;
      address: string;
      phone: string;
      email: string;
      rights: string;
    };
    calculator: {
      homePrice: string;
      downPayment: string;
      downPaymentPct: string;
      interestRate: string;
      loanTerm: string;
      principalInterest: string;
      propertyTax: string;
      insurance: string;
      totalPayment: string;
      toggleAccurate: string;
      toggleHomestead: string;
      withHomestead: string;
      withoutHomestead: string;
      getExact: string;
      disclaimer: string;
      homesteadTooltip: string;
      loanAmount: string;
      addressPlaceholder: string;
      addressNote: string;
      years: string;
    };
    refinance: {
      title: string;
      currentLoan: string;
      newLoan: string;
      homeValue: string;
      loanBalance: string;
      currentRate: string;
      currentPayment: string;
      remainingTerm: string;
      newRate: string;
      newTerm: string;
      closingCosts: string;
      results: string;
      currentMonthly: string;
      newMonthly: string;
      monthlySavings: string;
      annualSavings: string;
      breakEven: string;
      breakEvenDesc: string;
      lifetimeSavings: string;
      cta: string;
      disclaimer: string;
      years: string;
      months: string;
      autoCalc: string;
    };
    preApproval: {
      headline: string;
      sub: string;
      apply: string;
      call: string;
    };
    rentVsBuy: {
      headline: string;
      sub: string;
      cta_primary: string;
      cta_secondary: string;
      rent_label: string;
      own_label: string;
      rent_desc: string;
      own_desc: string;
      rent_monthly: string;
      own_monthly: string;
      rent_equity: string;
      own_equity: string;
    };
    fsbo: {
      hero_headline: string;
      hero_sub: string;
      hero_body: string;
      cta_verify: string;
      cta_talk: string;
      problem_headline: string;
      problem_body: string;
      problem_stat: string;
      card1_title: string;
      card1_body: string;
      card2_title: string;
      card2_body: string;
      card3_title: string;
      card3_body: string;
      hook_headline: string;
      hook_body: string;
      cta_check: string;
      cta_preapproval: string;
      trust1: string;
      trust2: string;
      trust3: string;
      offers_headline: string;
    };
  };
}

export const translations: Translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Home Loan Programs',
      resources: 'Resources',
      blog: 'Blog',
      about: 'About Daisy',
      contact: 'Contact',
      cta: 'Get Pre-Approved',
    },
    hero: {
      headline: "Houston's Trusted Mortgage Advisor",
      subheadline: 'Helping first-time buyers and families achieve homeownership with clarity, care, and zero confusion.',
      cta_primary: 'Get Pre-Approved',
      cta_secondary: 'View Services',
      trust: 'NMLS #2461273 | Matador Lending | Equal Housing Opportunity',
    },
    whyDaisy: {
      headline: 'A Loan Officer Who Actually Speaks Your Language',
      subheadline: "Whether you're buying your first home or investing in property, I'm here to guide you every step of the way.",
      card1_title: 'First-Time Buyer Expert',
      card1_desc: 'Specialized in guiding first-time buyers through every step, removing confusion and fear from the process.',
      card2_title: 'Bilingual English & Spanish',
      card2_desc: "I serve Houston's diverse community in both English and Spanish — no language barrier, no miscommunication.",
      card3_title: 'ITIN & Non-Traditional Loans',
      card3_desc: 'I help ITIN borrowers and non-traditional borrowers access homeownership that others say is impossible.',
      bio: "Hi, my name is Daisy. As a mom of two, I understand how life-changing a new home can be — it's where memories are made and futures are built.",
    },
    services: {
      headline: "Every Loan Has a Story. Let's Find Yours.",
      fha_title: 'FHA Loans',
      fha_desc: 'Low down payment, flexible credit. Perfect for first-time buyers.',
      conventional_title: 'Conventional Loans',
      conventional_desc: 'Traditional financing with competitive rates for qualified buyers.',
      itin_title: 'ITIN Loans',
      itin_desc: "Buy a home without a Social Security Number. We make it possible.",
      dpa_title: 'Down Payment Assistance',
      dpa_desc: "You may qualify for thousands in assistance. Most buyers don't even know it exists.",
      va_title: 'VA & USDA Loans',
      va_desc: 'Zero down payment options for veterans and rural buyers.',
      refinance_title: 'Refinance',
      refinance_desc: 'Lower your rate, reduce your payment, or cash out your equity.',
      investor_title: 'Investor Finance',
      investor_desc: 'DSCR, bank statement, and asset-based loans for real estate investors.',
      nontraditional_title: 'Non-Traditional Loans',
      nontraditional_desc: "Self-employed? 1099? Bank statement loans for non-W2 borrowers.",
      cta: 'Learn More',
    },
    dpa: {
      headline: 'You May Qualify for Down Payment Assistance',
      subheadline: "Most Houston buyers don't know these programs exist. Let's change that.",
      stat1: 'Programs Available',
      stat1_value: '10+',
      stat2: 'Max Assistance',
      stat2_value: 'Up to $40K',
      stat3: 'Buyers Helped',
      stat3_value: '100s',
      cta: 'Check My Eligibility',
    },
    howItWorks: {
      headline: 'How It Works',
      step1: 'Apply',
      step1_desc: 'Fill out a quick pre-qualification form. Takes less than 5 minutes.',
      step2: 'Review Options',
      step2_desc: 'Daisy walks you through every loan option that fits your situation.',
      step3: 'Choose Your Loan',
      step3_desc: 'Pick the program that works best for your family and goals.',
      step4: 'Close & Celebrate',
      step4_desc: 'Get the keys to your new home. Your journey starts here.',
    },
    testimonials: {
      headline: 'What Clients Are Saying',
    },
    contact: {
      headline: "Ready to Start? Let's Talk.",
      subheadline: 'Fill out the quick form and Daisy will be in touch within 24 hours.',
      name: 'First Name',
      phone: 'Phone Number',
      timing: 'Best Time to Reach You',
      purpose: 'How Can I Help?',
      purpose_options: ['Buy a Home', 'Refinance', 'Check DPA Eligibility', 'ITIN Loan Inquiry', 'General Question'],
      submit: 'Send Message',
      success: 'Message sent! Daisy will be in touch within 24 hours.',
    },
    footer: {
      tagline: 'Making homeownership accessible for every Houston family.',
      address: '5718 Westheimer Rd Suite 1000, Houston TX 77057',
      phone: '832-894-7676',
      email: 'Daisy@matadorlending.com',
      rights: '© 2026 Lending & Living. All rights reserved.',
    },
    calculator: {
      homePrice: 'Home Price',
      downPayment: 'Down Payment',
      downPaymentPct: 'Down Payment %',
      interestRate: 'Interest Rate',
      loanTerm: 'Loan Term',
      principalInterest: 'Principal & Interest',
      propertyTax: 'Property Tax (est.)',
      insurance: "Homeowner's Insurance (est.)",
      totalPayment: 'Total Monthly Payment',
      toggleAccurate: 'Want more accurate numbers? Add property address',
      toggleHomestead: 'Apply Homestead Exemption',
      withHomestead: 'With Homestead',
      withoutHomestead: 'Without Homestead',
      getExact: 'Get My Exact Payment Estimate',
      disclaimer: 'Payment estimates use Texas average tax (2.5%) and insurance (1.0%) rates. Actual payments vary. Contact Daisy for a personalized quote.',
      homesteadTooltip: 'Texas homestead exemption can reduce your taxable property value by up to 20%, lowering your estimated tax bill.',
      loanAmount: 'Loan Amount',
      addressPlaceholder: 'Enter property address',
      addressNote: 'Based on Texas average tax rates (2.5%) and insurance estimates (1.0%). For exact numbers based on your property, contact Daisy directly.',
      years: 'years',
    },
    refinance: {
      title: 'Refinance Calculator',
      currentLoan: 'Current Loan',
      newLoan: 'New Loan',
      homeValue: 'Current Home Value',
      loanBalance: 'Current Loan Balance',
      currentRate: 'Current Interest Rate',
      currentPayment: 'Current Monthly Payment',
      remainingTerm: 'Remaining Loan Term',
      newRate: 'New Interest Rate',
      newTerm: 'New Loan Term',
      closingCosts: 'Estimated Closing Costs',
      results: 'Refinance Results',
      currentMonthly: 'Current Monthly Payment',
      newMonthly: 'New Monthly Payment',
      monthlySavings: 'Monthly Savings',
      annualSavings: 'Annual Savings',
      breakEven: 'Break-Even Point',
      breakEvenDesc: "You'll recover closing costs in",
      lifetimeSavings: 'Lifetime Savings',
      cta: 'See If Refinancing Makes Sense for You',
      disclaimer: 'Calculator Disclaimer: The refinance calculator is intended to be used for educational purposes only. Savings are not guaranteed; savings are dependent upon your current loan terms, credit profile, and available lender loan terms. Actual available rates and monthly payment amounts are subject to market fluctuations and will depend on a number of factors, including geography and loan characteristics. The estimates are based on information you provide, and do not include other fees and costs that a lender may assess in addition to monthly principal and interest, such as taxes and insurance — the actual payment obligation may be greater.',
      years: 'years',
      months: 'months',
      autoCalc: 'Auto-calculate if blank',
    },
    preApproval: {
      headline: 'Get Pre-Approved',
      sub: 'Apply Today — Fast, Simple, No Obligation',
      apply: 'Start My Application',
      call: 'Call Daisy: 832-894-7676',
    },
    rentVsBuy: {
      headline: 'Still Renting?',
      sub: "Many Houston residents are already paying enough in rent to qualify for a mortgage. Let's find out what you can afford.",
      cta_primary: 'Find Out What You Can Afford',
      cta_secondary: 'Talk to Daisy',
      rent_label: 'Renting',
      own_label: 'Owning',
      rent_desc: "Building someone else's wealth",
      own_desc: 'Building YOUR equity',
      rent_monthly: '$1,800/mo rent',
      own_monthly: '$1,800/mo own',
      rent_equity: '= $0 equity',
      own_equity: '= equity growing',
    },
    fsbo: {
      hero_headline: 'Selling Your Home Without an Agent?',
      hero_sub: 'I Can Help You Close the Deal — Even Without a Realtor',
      hero_body: 'Make sure your buyer is qualified and your sale goes smoothly.',
      cta_verify: 'Verify a Buyer',
      cta_talk: 'Talk to Daisy',
      problem_headline: 'The Biggest Risk of Selling FSBO',
      problem_body: "Selling your home on your own can save money — but one of the biggest risks is accepting an offer from a buyer who isn't fully approved. Don't let a deal fall through at closing.",
      problem_stat: '1 in 3 FSBO deals fall through due to financing issues',
      card1_title: 'Verify Your Buyer',
      card1_body: "I'll review your buyer's pre-approval, verify their income, credit, and funds, and confirm they're ready to close.",
      card2_title: "If They're Not Fully Qualified",
      card2_body: 'I can help your buyer explore loan options and get approved to keep your deal alive.',
      card3_title: 'Guidance Through Closing',
      card3_body: 'Clear communication and fewer surprises at the closing table.',
      hook_headline: 'Most FSBO Sellers End Up Buying Again',
      hook_body: "After your sale closes, you'll likely need to buy your next home. I can get you pre-approved before you even list.",
      cta_check: 'Check My Buyer',
      cta_preapproval: 'Get Pre-Approved for My Next Home',
      trust1: 'Bilingual support available (English & Spanish)',
      trust2: 'Experience with first-time buyers and complex loan situations',
      trust3: 'Access to multiple loan programs and lenders',
      offers_headline: 'What Daisy Offers',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Programas de Préstamos',
      resources: 'Recursos',
      blog: 'Blog',
      about: 'Sobre Daisy',
      contact: 'Contacto',
      cta: 'Pre-Calificación',
    },
    hero: {
      headline: 'Tu Asesora Hipotecaria de Confianza en Houston',
      subheadline: 'Ayudando a compradores por primera vez y familias a lograr ser dueños de casa, con claridad y sin confusión.',
      cta_primary: 'Obtén Pre-Aprobación',
      cta_secondary: 'Ver Servicios',
      trust: 'NMLS #2461273 | Matador Lending | Oportunidad Igual de Vivienda',
    },
    whyDaisy: {
      headline: 'Una Oficial de Préstamos Que Habla Tu Idioma',
      subheadline: 'Ya sea que compres tu primera casa o inviertas en propiedad, estoy aquí para guiarte en cada paso.',
      card1_title: 'Experta en Compradores Primerizos',
      card1_desc: 'Me especializo en guiar a compradores por primera vez, eliminando la confusión y el miedo del proceso.',
      card2_title: 'Bilingüe Inglés y Español',
      card2_desc: 'Sirvo a la comunidad diversa de Houston en inglés y español — sin barreras de idioma.',
      card3_title: 'Préstamos ITIN y No Tradicionales',
      card3_desc: 'Ayudo a prestatarios con ITIN y prestatarios no tradicionales a acceder a la propiedad de vivienda.',
      bio: 'Hola, mi nombre es Daisy. Como mamá de dos hijos, entiendo lo que significa una nueva casa para una familia.',
    },
    services: {
      headline: 'Cada Préstamo Tiene Una Historia. Encontremos La Tuya.',
      fha_title: 'Préstamos FHA',
      fha_desc: 'Enganche bajo, crédito flexible. Perfecto para compradores primerizos.',
      conventional_title: 'Préstamos Convencionales',
      conventional_desc: 'Financiamiento tradicional con tasas competitivas.',
      itin_title: 'Préstamos ITIN',
      itin_desc: 'Compra una casa sin número de seguro social. Lo hacemos posible.',
      dpa_title: 'Ayuda para Enganche',
      dpa_desc: 'Puedes calificar para miles en asistencia. La mayoría no sabe que existe.',
      va_title: 'Préstamos VA y USDA',
      va_desc: 'Opciones sin enganche para veteranos y compradores rurales.',
      refinance_title: 'Refinanciamiento',
      refinance_desc: 'Baja tu tasa, reduce tu pago o retira el capital de tu casa.',
      investor_title: 'Finanzas para Inversionistas',
      investor_desc: 'Préstamos DSCR, estado de cuenta bancario y basados en activos.',
      nontraditional_title: 'Préstamos No Tradicionales',
      nontraditional_desc: '¿Trabajas por tu cuenta? Préstamos para prestatarios sin W2.',
      cta: 'Ver Más',
    },
    dpa: {
      headline: 'Puedes Calificar para Ayuda con el Enganche',
      subheadline: 'La mayoría de los compradores en Houston no saben que estos programas existen. Vamos a cambiar eso.',
      stat1: 'Programas Disponibles',
      stat1_value: '10+',
      stat2: 'Asistencia Máxima',
      stat2_value: 'Hasta $40K',
      stat3: 'Familias Ayudadas',
      stat3_value: '100s',
      cta: 'Verificar Mi Elegibilidad',
    },
    howItWorks: {
      headline: 'Cómo Funciona',
      step1: 'Aplica',
      step1_desc: 'Llena un formulario rápido de pre-calificación. Toma menos de 5 minutos.',
      step2: 'Revisa Opciones',
      step2_desc: 'Daisy te explica cada opción de préstamo que se adapta a tu situación.',
      step3: 'Elige Tu Préstamo',
      step3_desc: 'Selecciona el programa que mejor funcione para tu familia y metas.',
      step4: 'Cierra y Celebra',
      step4_desc: 'Recibe las llaves de tu nueva casa. Tu historia comienza aquí.',
    },
    testimonials: {
      headline: 'Lo Que Dicen los Clientes',
    },
    contact: {
      headline: '¿Listo para Empezar? Hablemos.',
      subheadline: 'Llena el formulario rápido y Daisy te contactará en 24 horas.',
      name: 'Nombre',
      phone: 'Número de Teléfono',
      timing: 'Mejor Hora para Llamarte',
      purpose: '¿Cómo Puedo Ayudarte?',
      purpose_options: ['Comprar una Casa', 'Refinanciamiento', 'Verificar Elegibilidad DPA', 'Consulta de Préstamo ITIN', 'Pregunta General'],
      submit: 'Enviar Mensaje',
      success: '¡Mensaje enviado! Daisy te contactará en 24 horas.',
    },
    footer: {
      tagline: 'Haciendo que la propiedad de vivienda sea accesible para cada familia de Houston.',
      address: '5718 Westheimer Rd Suite 1000, Houston TX 77057',
      phone: '832-894-7676',
      email: 'Daisy@matadorlending.com',
      rights: '© 2026 Lending & Living. Todos los derechos reservados.',
    },
    calculator: {
      homePrice: 'Precio de la Casa',
      downPayment: 'Enganche',
      downPaymentPct: '% de Enganche',
      interestRate: 'Tasa de Interés',
      loanTerm: 'Plazo del Préstamo',
      principalInterest: 'Capital e Interés',
      propertyTax: 'Impuesto de Propiedad (est.)',
      insurance: 'Seguro de Propietario (est.)',
      totalPayment: 'Pago Mensual Total',
      toggleAccurate: '¿Quieres números más exactos? Agrega la dirección',
      toggleHomestead: 'Aplicar Exención de Homestead',
      withHomestead: 'Con Homestead',
      withoutHomestead: 'Sin Homestead',
      getExact: 'Obtener Mi Estimado Exacto de Pago',
      disclaimer: 'Los estimados usan tasas promedio de Texas: impuesto 2.5%, seguro 1.0%. Los pagos reales varían. Contacta a Daisy para una cotización personalizada.',
      homesteadTooltip: 'La exención de homestead en Texas puede reducir el valor gravable de tu propiedad hasta un 20%.',
      loanAmount: 'Monto del Préstamo',
      addressPlaceholder: 'Ingresa la dirección de la propiedad',
      addressNote: 'Basado en tasas promedio de Texas: impuesto 2.5%, seguro 1.0%. Para números exactos, contacta a Daisy directamente.',
      years: 'años',
    },
    refinance: {
      title: 'Calculadora de Refinanciamiento',
      currentLoan: 'Préstamo Actual',
      newLoan: 'Nuevo Préstamo',
      homeValue: 'Valor Actual de la Casa',
      loanBalance: 'Saldo del Préstamo Actual',
      currentRate: 'Tasa de Interés Actual',
      currentPayment: 'Pago Mensual Actual',
      remainingTerm: 'Plazo Restante del Préstamo',
      newRate: 'Nueva Tasa de Interés',
      newTerm: 'Nuevo Plazo del Préstamo',
      closingCosts: 'Costos de Cierre Estimados',
      results: 'Resultados del Refinanciamiento',
      currentMonthly: 'Pago Mensual Actual',
      newMonthly: 'Nuevo Pago Mensual',
      monthlySavings: 'Ahorro Mensual',
      annualSavings: 'Ahorro Anual',
      breakEven: 'Punto de Equilibrio',
      breakEvenDesc: 'Recuperarás los costos de cierre en',
      lifetimeSavings: 'Ahorro de por Vida',
      cta: 'Ver Si el Refinanciamiento Tiene Sentido para Ti',
      disclaimer: 'Aviso de la Calculadora: Esta calculadora de refinanciamiento es solo para fines educativos. Los ahorros no están garantizados; dependen de los términos de tu préstamo actual, perfil crediticio y términos disponibles del prestamista. Las tasas y pagos mensuales están sujetos a fluctuaciones del mercado y dependen de varios factores. Los estimados no incluyen otros cargos como impuestos y seguro — la obligación de pago real puede ser mayor.',
      years: 'años',
      months: 'meses',
      autoCalc: 'Auto-calcular si está vacío',
    },
    preApproval: {
      headline: 'Obtén Pre-Aprobación',
      sub: 'Aplica Hoy — Rápido, Simple, Sin Compromiso',
      apply: 'Comenzar Mi Solicitud',
      call: 'Llamar a Daisy: 832-894-7676',
    },
    rentVsBuy: {
      headline: '¿Todavía Rentando?',
      sub: 'Muchos residentes de Houston ya pagan suficiente en renta para calificar para una hipoteca. Veamos qué puedes pagar.',
      cta_primary: 'Ver Qué Puedes Pagar',
      cta_secondary: 'Hablar con Daisy',
      rent_label: 'Rentando',
      own_label: 'Siendo Dueño',
      rent_desc: 'Construyendo la riqueza de otro',
      own_desc: 'Construyendo TU capital',
      rent_monthly: '$1,800/mes renta',
      own_monthly: '$1,800/mes propio',
      rent_equity: '= $0 capital',
      own_equity: '= capital creciendo',
    },
    fsbo: {
      hero_headline: '¿Vendiendo Tu Casa Sin un Agente?',
      hero_sub: 'Puedo Ayudarte a Cerrar el Trato — Incluso Sin un Agente',
      hero_body: 'Asegúrate de que tu comprador esté calificado y que tu venta sea exitosa.',
      cta_verify: 'Verificar a Mi Comprador',
      cta_talk: 'Hablar con Daisy',
      problem_headline: 'El Mayor Riesgo de Vender Sin Agente',
      problem_body: 'Vender tu casa por tu cuenta puede ahorrarte dinero, pero uno de los mayores riesgos es aceptar una oferta de un comprador que no está realmente aprobado.',
      problem_stat: '1 de cada 3 ventas FSBO fallan por problemas de financiamiento',
      card1_title: 'Verificar a Tu Comprador',
      card1_body: 'Revisaré la pre-aprobación de tu comprador, verificaré sus ingresos, crédito y fondos, y confirmaré que están listos para cerrar.',
      card2_title: 'Si No Están Totalmente Calificados',
      card2_body: 'Puedo ayudar a tu comprador a explorar opciones de préstamo y obtener aprobación para mantener tu trato vivo.',
      card3_title: 'Guía Hasta el Cierre',
      card3_body: 'Comunicación clara y menos sorpresas en la mesa de cierre.',
      hook_headline: 'La Mayoría Vuelven a Comprar Después de Vender',
      hook_body: 'Después de cerrar tu venta, probablemente necesitarás comprar tu próxima casa. Puedo pre-aprobarte antes de que pongas tu casa en venta.',
      cta_check: 'Verificar Mi Comprador',
      cta_preapproval: 'Pre-Aprobación para Mi Próxima Casa',
      trust1: 'Soporte bilingüe disponible (inglés y español)',
      trust2: 'Experiencia con compradores primerizos y situaciones complejas',
      trust3: 'Acceso a múltiples programas de préstamo y prestamistas',
      offers_headline: 'Lo Que Ofrece Daisy',
    },
  },
};
