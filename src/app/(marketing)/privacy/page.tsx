import { Metadata } from 'next';
import { PrivacyContent } from './privacy-content';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lending & Living',
  description:
    'How Daisy Castro (NMLS #2592627) and Lending & Living collect, use, share, and protect your personal information. Includes GLBA privacy notice and Texas privacy rights.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
