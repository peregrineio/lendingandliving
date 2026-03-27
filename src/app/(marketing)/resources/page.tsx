import { Metadata } from 'next';
import { ResourcesContent } from './resources-content';

export const metadata: Metadata = {
  title: 'Mortgage Calculators & Resources Houston | Payment, Affordability, DTI | Lending & Living',
  description: 'Free mortgage calculators for Houston homebuyers. Calculate payments, affordability, and DTI ratio. Resources for first-time buyers. Bilingual.',
  keywords: [
    'mortgage calculator Houston',
    'home affordability calculator',
    'mortgage payment calculator',
    'DTI calculator',
    'Houston mortgage resources',
    'first-time buyer resources',
  ],
  openGraph: {
    title: 'Mortgage Calculators & Resources Houston',
    description: 'Free mortgage calculators for Houston homebuyers. Calculate payments, affordability, and DTI ratio.',
    type: 'website',
  },
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
