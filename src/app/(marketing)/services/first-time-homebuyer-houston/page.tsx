import { Metadata } from 'next';
import { FirstTimeBuyerContent } from './first-time-buyer-content';

export const metadata: Metadata = {
  title: 'First-Time Homebuyer Guide Houston TX | Everything You Need to Know | Lending & Living',
  description: 'Complete first-time homebuyer guide for Houston TX. Learn about FHA loans, down payment assistance, ITIN loans, and more. Free consultation with bilingual loan officer Daisy.',
  keywords: [
    'first-time homebuyer Houston',
    'first-time buyer guide Houston TX',
    'how to buy first home Houston',
    'first-time buyer programs Houston',
    'new homebuyer Houston',
    'buying first house Texas',
    'compradores primerizos Houston',
    'primera casa Houston',
    'first-time buyer checklist',
  ],
  openGraph: {
    title: 'First-Time Homebuyer Guide Houston TX | Complete Guide',
    description: 'Complete first-time homebuyer guide for Houston TX. Learn about FHA loans, down payment assistance, ITIN loans, and more.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
  },
};

export default function FirstTimeBuyerHoustonPage() {
  return <FirstTimeBuyerContent />;
}
