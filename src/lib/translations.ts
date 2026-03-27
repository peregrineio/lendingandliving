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
  };
}

export const translations: Translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
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
      card3_desc: 'I help immigrant families and non-traditional borrowers access homeownership that others say is impossible.',
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
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
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
      card3_desc: 'Ayudo a familias inmigrantes y prestatarios no tradicionales a acceder a la propiedad de vivienda.',
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
  },
};
