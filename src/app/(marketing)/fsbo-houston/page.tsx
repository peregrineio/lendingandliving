import { Metadata } from 'next';
import { FSBOContent } from './fsbo-content';

export const metadata: Metadata = {
  title: 'Selling Your Home Without an Agent? I Can Help — Houston TX | Lending & Living',
  description: 'Selling your Houston home FSBO? Make sure your buyer is truly qualified. Daisy Castro verifies buyer approval, helps buyers get financed, and can pre-approve you for your next home. NMLS #2592627',
  keywords: [
    'FSBO Houston',
    'sell home without agent Houston',
    'for sale by owner Houston',
    'verify buyer financing',
    'FSBO buyer qualification',
    'sell house without realtor Texas',
    'Houston FSBO help',
    'buyer pre-approval verification',
    'vender casa sin agente Houston',
  ],
  openGraph: {
    title: 'Selling Your Home Without an Agent? I Can Help — Houston TX',
    description: 'Selling your Houston home FSBO? Make sure your buyer is truly qualified. Daisy Castro verifies buyer approval, helps buyers get financed, and can pre-approve you for your next home.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
  },
};

export default function FSBOHoustonPage() {
  return <FSBOContent />;
}
