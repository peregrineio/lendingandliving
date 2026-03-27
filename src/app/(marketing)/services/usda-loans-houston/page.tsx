import { Metadata } from 'next';
import { USDALoansContent } from './usda-loans-content';

export const metadata: Metadata = {
  title: 'USDA Loans Houston TX | Zero Down Rural Home Loans | Lending & Living',
  description: 'USDA rural home loans near Houston with zero down payment. Eligible areas include Katy, Waller, Fulshear, and more. Bilingual loan officer.',
  keywords: [
    'USDA loans Houston',
    'USDA rural home loan Texas',
    'zero down rural loan',
    'Katy USDA loan',
    'Waller USDA loan',
    'Fulshear USDA loan',
    'rural home loan Houston area',
  ],
  openGraph: {
    title: 'USDA Loans Houston TX | Zero Down Rural Home Loans',
    description: 'USDA rural home loans near Houston with zero down payment. Eligible areas include Katy, Waller, Fulshear, and more.',
    type: 'website',
  },
};

export default function USDALoansHoustonPage() {
  return <USDALoansContent />;
}
