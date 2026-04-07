import { Metadata } from 'next';
import { AboutContent } from './about-content';

export const metadata: Metadata = {
  title: 'About Daisy Castro | Bilingual Mortgage Loan Officer Houston TX | Lending & Living',
  description: "Meet Daisy Castro, Houston's bilingual mortgage loan officer. Specializing in first-time buyers, ITIN loans, and DPA programs. English & Spanish.",
  keywords: [
    'Daisy Castro mortgage',
    'bilingual loan officer Houston',
    'Houston mortgage officer',
    'Spanish speaking mortgage Houston',
    'Daisy Castro',
    'Matador Lending Houston',
  ],
  openGraph: {
    title: 'About Daisy Castro | Bilingual Mortgage Loan Officer Houston TX',
    description: "Meet Daisy Castro, Houston's bilingual mortgage loan officer specializing in first-time buyers, ITIN loans, and DPA programs.",
    type: 'profile',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
