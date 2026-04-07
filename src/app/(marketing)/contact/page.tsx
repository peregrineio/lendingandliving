import { Metadata } from 'next';
import { ContactContent } from './contact-content';

export const metadata: Metadata = {
  title: 'Contact Daisy | Houston Mortgage Loan Officer | Get Pre-Approved | Lending & Living',
  description: 'Contact Daisy Castro for mortgage help in Houston. Get pre-approved for FHA, ITIN, or DPA loan. Call 832-894-7676.',
  keywords: [
    'contact mortgage officer Houston',
    'get pre-approved Houston',
    'mortgage consultation Houston',
    'Daisy Castro contact',
  ],
  openGraph: {
    title: 'Contact Daisy | Houston Mortgage Loan Officer',
    description: 'Contact Daisy Castro for mortgage help in Houston. Get pre-approved for FHA, ITIN, or DPA loan.',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
