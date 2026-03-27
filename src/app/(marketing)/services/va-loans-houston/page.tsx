import { Metadata } from 'next';
import { VALoansContent } from './va-loans-content';

export const metadata: Metadata = {
  title: 'VA Loans Houston TX | Zero Down Payment for Veterans | Lending & Living',
  description: 'VA home loans in Houston with zero down payment and no PMI. For veterans, active duty, and eligible surviving spouses. Bilingual loan officer.',
  keywords: [
    'VA loans Houston',
    'VA home loan Houston TX',
    'veteran mortgage Houston',
    'zero down VA loan',
    'VA loan no PMI',
    'military home loan Houston',
    'VA loan requirements Texas',
    'veteran home buying Houston',
  ],
  openGraph: {
    title: 'VA Loans Houston TX | Zero Down Payment for Veterans',
    description: 'VA home loans in Houston with zero down payment and no PMI. For veterans, active duty, and eligible surviving spouses.',
    type: 'website',
  },
};

export default function VALoansHoustonPage() {
  return <VALoansContent />;
}
