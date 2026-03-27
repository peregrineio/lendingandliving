import { Metadata } from 'next';
import { FHALoansContent } from './fha-loans-content';

export const metadata: Metadata = {
  title: 'FHA Loans Houston TX | Low Down Payment, Flexible Credit | Lending & Living',
  description: 'FHA loans in Houston with 3.5% down payment and 580+ credit score. Perfect for first-time buyers. Bilingual loan officer Daisy Castro helps you qualify.',
  keywords: [
    'FHA loans Houston',
    'FHA loan Houston TX',
    'FHA loan requirements Texas',
    'first-time buyer FHA Houston',
    '3.5 down payment Houston',
    'low credit score mortgage Houston',
    'FHA lender Houston',
    'préstamos FHA Houston',
    'FHA vs conventional Houston',
  ],
  openGraph: {
    title: 'FHA Loans Houston TX | 3.5% Down Payment, 580+ Credit Score',
    description: 'FHA loans in Houston with 3.5% down payment and 580+ credit score. Perfect for first-time buyers. Bilingual loan officer.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
  },
};

export default function FHALoansHoustonPage() {
  return <FHALoansContent />;
}
