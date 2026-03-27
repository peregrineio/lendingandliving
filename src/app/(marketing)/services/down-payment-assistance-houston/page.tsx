import { Metadata } from 'next';
import { DPAContent } from './dpa-content';

export const metadata: Metadata = {
  title: 'Down Payment Assistance Houston TX | Up to $40K | First-Time Buyers | Lending & Living',
  description: 'Houston down payment assistance programs for first-time buyers. TDHCA, SETH, Harris County programs. Find out how much assistance you qualify for. Bilingual.',
  keywords: [
    'down payment assistance Houston',
    'DPA Houston',
    'first-time buyer assistance Houston',
    'TDHCA My First Texas Home',
    'SETH 5 Star program',
    'Harris County HAP',
    'Houston homebuyer programs',
    'down payment help Houston TX',
    'ayuda para enganche Houston',
    'first-time homebuyer grants Houston',
  ],
  openGraph: {
    title: 'Down Payment Assistance Houston TX | Up to $40K for First-Time Buyers',
    description: 'Houston down payment assistance programs for first-time buyers. TDHCA, SETH, Harris County programs. Find out how much assistance you qualify for. Bilingual.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
  },
};

export default function DPAHoustonPage() {
  return <DPAContent />;
}
