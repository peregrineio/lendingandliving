import { Metadata } from 'next';
import { JumboLoansContent } from './jumbo-loans-content';

export const metadata: Metadata = {
  title: 'Jumbo Loans Houston TX | High-Value Home Financing | Lending & Living',
  description: 'Jumbo mortgage loans in Houston TX for home purchases above conforming loan limits. Expert guidance from bilingual loan officer Daisy Castro. NMLS #2592627',
  keywords: [
    'jumbo loans Houston',
    'jumbo mortgage Houston TX',
    'high-value home loan Houston',
    'luxury home financing Houston',
    'jumbo loan requirements Texas',
    'River Oaks mortgage',
    'Memorial home loan',
    'The Woodlands jumbo loan',
    'préstamos jumbo Houston',
    'jumbo loan rates Houston',
  ],
  openGraph: {
    title: 'Jumbo Loans Houston TX | Financing for High-Value Homes',
    description: 'Jumbo mortgage loans in Houston TX for home purchases above conforming loan limits. Expert guidance from bilingual loan officer.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
  },
};

export default function JumboLoansHoustonPage() {
  return <JumboLoansContent />;
}
