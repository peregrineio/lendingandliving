// Shared types and constants for blog (safe for client components)

export interface BlogPost {
  slug: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  image?: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  image?: string;
}

// Blog image mapping by slug
export const blogImages: Record<string, string> = {
  'first-time-homebuyer-houston-guide': '/images/blog/couple-home-search.jpg',
  'como-comprar-primera-casa-houston': '/images/blog/hispanic-family-new-home.jpg',
  'itin-loan-houston-complete-guide': '/images/blog/closing-keys.jpg',
  'down-payment-assistance-houston-guide': '/images/blog/first-time-homebuyer.jpg',
  'gift-of-equity-explained': '/images/blog/family-gift-equity.jpg',
  'what-not-to-do-before-buying-home': '/images/blog/mortgage-caution.jpg',
  'surprising-things-that-lower-credit-score': '/images/blog/credit-score-new.jpg',
}

export const categories = [
  { value: 'all', label: 'All Posts', labelEs: 'Todos' },
  { value: 'first-time-buyers', label: 'First-Time Buyers', labelEs: 'Compradores Primerizos' },
  { value: 'itin-loans', label: 'ITIN Loans', labelEs: 'Préstamos ITIN' },
  { value: 'dpa', label: 'Down Payment Assistance', labelEs: 'Ayuda para Enganche' },
  { value: 'refinance', label: 'Refinance', labelEs: 'Refinanciamiento' },
  { value: 'investor', label: 'Investor Loans', labelEs: 'Préstamos Inversionistas' },
];
