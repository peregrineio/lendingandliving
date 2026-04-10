import { Metadata } from 'next';
import { ConventionalLoansContent } from './conventional-loans-content';

export const metadata: Metadata = {
  title: 'Conventional Loans Houston TX | Traditional Mortgage Financing | Lending & Living',
  description: 'Conventional mortgage loans in Houston TX. Competitive rates, flexible terms, and expert guidance from bilingual loan officer Daisy Castro. NMLS #2592627',
  keywords: [
    'conventional loans Houston',
    'conventional mortgage Houston TX',
    'traditional mortgage Texas',
    'Houston mortgage lender',
    'conforming loan Houston',
    'conventional vs FHA Houston',
    'préstamos convencionales Houston',
    'no PMI mortgage Houston',
  ],
  openGraph: {
    title: 'Conventional Loans Houston TX | Traditional Mortgage Financing',
    description: 'Conventional mortgage loans in Houston TX. Competitive rates, flexible terms, and expert guidance from bilingual loan officer.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
  },
};

export default function ConventionalLoansHoustonPage() {
  return <ConventionalLoansContent />;
}
