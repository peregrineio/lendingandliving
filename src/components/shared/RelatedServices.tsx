'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceLink {
  href: string;
  labelEn: string;
  labelEs: string;
}

interface RelatedServicesProps {
  services: ServiceLink[];
  title?: {
    en: string;
    es: string;
  };
}

const defaultTitle = {
  en: 'Related Services',
  es: 'Servicios Relacionados',
};

export function RelatedServices({ services, title = defaultTitle }: RelatedServicesProps) {
  const { isSpanish } = useLanguage();

  return (
    <section className="py-12 bg-cream">
      <div className="section-container">
        <h2 className="font-display text-2xl text-deep-brown text-center mb-8">
          {isSpanish ? title.es : title.en}
        </h2>
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-brand-border hover:border-gold-accent/50 hover:shadow-md transition-all group"
            >
              <span className="font-medium text-deep-brown group-hover:text-gold-accent transition-colors">
                {isSpanish ? service.labelEs : service.labelEn}
              </span>
              <ArrowRight className="w-4 h-4 text-gold-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Predefined service link sets for common page types
export const itinRelatedServices: ServiceLink[] = [
  {
    href: '/services/down-payment-assistance-houston',
    labelEn: 'Down Payment Assistance',
    labelEs: 'Ayuda para Enganche',
  },
  {
    href: '/services/first-time-homebuyer-houston',
    labelEn: 'First-Time Buyers',
    labelEs: 'Compradores Primerizos',
  },
  {
    href: '/contact',
    labelEn: 'Contact Daisy',
    labelEs: 'Contactar a Daisy',
  },
];

export const dpaRelatedServices: ServiceLink[] = [
  {
    href: '/services/fha-loans-houston',
    labelEn: 'FHA Loans',
    labelEs: 'Préstamos FHA',
  },
  {
    href: '/services/first-time-homebuyer-houston',
    labelEn: 'First-Time Buyers',
    labelEs: 'Compradores Primerizos',
  },
  {
    href: '/contact',
    labelEn: 'Contact Daisy',
    labelEs: 'Contactar a Daisy',
  },
];

export const fhaRelatedServices: ServiceLink[] = [
  {
    href: '/services/down-payment-assistance-houston',
    labelEn: 'Down Payment Assistance',
    labelEs: 'Ayuda para Enganche',
  },
  {
    href: '/services/first-time-homebuyer-houston',
    labelEn: 'First-Time Buyers',
    labelEs: 'Compradores Primerizos',
  },
  {
    href: '/contact',
    labelEn: 'Contact Daisy',
    labelEs: 'Contactar a Daisy',
  },
];

export const firstTimeBuyerRelatedServices: ServiceLink[] = [
  {
    href: '/services/fha-loans-houston',
    labelEn: 'FHA Loans',
    labelEs: 'Préstamos FHA',
  },
  {
    href: '/services/down-payment-assistance-houston',
    labelEn: 'Down Payment Assistance',
    labelEs: 'Ayuda para Enganche',
  },
  {
    href: '/services/itin-loans-houston',
    labelEn: 'ITIN Loans',
    labelEs: 'Préstamos ITIN',
  },
];
