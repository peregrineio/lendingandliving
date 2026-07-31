import { Metadata } from 'next';
import { TermsContent } from './terms-content';

export const metadata: Metadata = {
  title: 'Terms of Use | Lending & Living',
  description:
    'Terms of use for lendingandliving.com — Daisy Castro, NMLS #2592627, Matador Lending NMLS #1871433.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <TermsContent />;
}
