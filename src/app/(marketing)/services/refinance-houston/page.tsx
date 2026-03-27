import { Metadata } from 'next';
import { RefinanceContent } from './refinance-content';

export const metadata: Metadata = {
  title: 'Refinance Your Mortgage Houston TX | Lower Rates & Cash Out | Lending & Living',
  description: 'Refinance your Houston home to lower your rate, reduce payments, or access cash. Rate-and-term and cash-out refinancing options. Bilingual loan officer.',
  keywords: [
    'refinance Houston',
    'mortgage refinance Houston TX',
    'cash out refinance Houston',
    'lower mortgage rate Houston',
    'refinance home loan Texas',
    'Houston refinance rates',
    'refinanciar hipoteca Houston',
  ],
  openGraph: {
    title: 'Refinance Your Mortgage Houston TX | Lower Rates & Cash Out',
    description: 'Refinance your Houston home to lower your rate, reduce payments, or access cash.',
    type: 'website',
  },
};

export default function RefinanceHoustonPage() {
  return <RefinanceContent />;
}
