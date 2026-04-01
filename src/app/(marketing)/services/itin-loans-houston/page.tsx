import { Metadata } from 'next';
import { ITINLoansContent } from './itin-loans-content';

export const metadata: Metadata = {
  title: 'ITIN Loans Houston TX | Buy a Home Without Social Security Number | Lending & Living',
  description: 'Qualify for a mortgage in Houston with your ITIN number. No Social Security Number required. Bilingual loan officer Daisy Castro helps ITIN borrowers and their families become homeowners.',
  keywords: [
    'ITIN loans Houston',
    'ITIN mortgage Houston',
    'buy home without SSN Texas',
    'ITIN home loan',
    'immigrant mortgage Houston',
    'no social security number mortgage',
    'ITIN loan requirements',
    'Houston ITIN lender',
    'bilingual mortgage officer Houston',
    'préstamos ITIN Houston',
  ],
  openGraph: {
    title: 'ITIN Loans Houston TX | Buy a Home Without Social Security Number',
    description: 'Qualify for a mortgage in Houston with your ITIN number. No Social Security Number required. Bilingual loan officer Daisy Castro helps ITIN borrowers and their families become homeowners.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
  },
};

export default function ITINLoansHoustonPage() {
  return <ITINLoansContent />;
}
