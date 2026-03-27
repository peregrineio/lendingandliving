import { Metadata } from 'next';
import { ServicesHubContent } from './services-hub-content';

export const metadata: Metadata = {
  title: 'Mortgage Services Houston TX | FHA, ITIN, DPA, VA, USDA | Lending & Living',
  description: 'Houston mortgage services including FHA, ITIN loans, down payment assistance, VA, USDA, refinance, and investor loans. Bilingual English & Spanish.',
  keywords: [
    'Houston mortgage services',
    'FHA loans Houston',
    'ITIN loans Houston',
    'down payment assistance Houston',
    'VA loans Houston',
    'USDA loans Houston',
    'refinance Houston',
    'investor loans Houston',
    'bilingual mortgage services',
  ],
};

export default function ServicesPage() {
  return <ServicesHubContent />;
}
