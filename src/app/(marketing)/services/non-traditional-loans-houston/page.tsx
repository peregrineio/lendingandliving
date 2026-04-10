import { Metadata } from 'next';
import { NonTraditionalLoansContent } from './non-traditional-loans-content';

export const metadata: Metadata = {
  title: 'Non-Traditional Loans Houston TX | Bank Statement, P&L, 1099, WVOE, Asset-Based | Lending & Living',
  description: 'Non-traditional mortgage loans in Houston for self-employed, contractors, and non-W2 borrowers. Bank Statement, P&L, Asset-Based, 1099, and WVOE loans. Bilingual. NMLS #2592627',
  keywords: [
    'non-traditional loans Houston',
    'bank statement loans Houston',
    'self-employed mortgage Houston',
    'P&L loans Houston',
    '1099 loans Houston',
    'asset-based loans Houston',
    'WVOE loans Houston',
    'non-W2 mortgage Houston',
    'préstamos no tradicionales Houston',
  ],
  openGraph: {
    title: 'Non-Traditional Loans Houston TX | Bank Statement, P&L, 1099, WVOE, Asset-Based',
    description: 'Non-traditional mortgage loans in Houston for self-employed, contractors, and non-W2 borrowers.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
  },
};

export default function NonTraditionalLoansHoustonPage() {
  return <NonTraditionalLoansContent />;
}
