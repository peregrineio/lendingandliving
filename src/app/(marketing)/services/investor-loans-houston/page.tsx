import { Metadata } from 'next';
import { InvestorLoansContent } from './investor-loans-content';

export const metadata: Metadata = {
  title: 'Investor Loans Houston TX | DSCR, Bank Statement, Asset-Based | Lending & Living',
  description: 'Investment property loans in Houston. DSCR loans, bank statement loans, asset-based lending for real estate investors. No tax returns required.',
  keywords: [
    'investor loans Houston',
    'DSCR loan Houston',
    'bank statement loan Houston',
    'investment property loan Houston',
    'rental property financing Houston',
    'self-employed mortgage Houston',
    'no tax return mortgage Houston',
    'asset-based loan Houston',
  ],
  openGraph: {
    title: 'Investor Loans Houston TX | DSCR, Bank Statement, Asset-Based',
    description: 'Investment property loans in Houston. DSCR loans, bank statement loans, asset-based lending for real estate investors.',
    type: 'website',
  },
};

export default function InvestorLoansHoustonPage() {
  return <InvestorLoansContent />;
}
