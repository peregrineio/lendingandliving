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
  // July 2026 batch (Daisy's requested posts) — images reused from the
  // existing library; unique art can be swapped in per-slug later.
  'how-much-house-can-i-afford-texas': '/images/blog/couple-home-search.jpg',
  'texas-first-time-buyer-programs': '/images/blog/first-time-homebuyer.jpg',
  'credit-score-needed-to-buy-house-texas': '/images/blog/credit-score.jpg',
  'prequalification-vs-preapproval-texas': '/images/blog/mortgage-caution.jpg',
  'offer-accepted-to-closing-texas': '/images/blog/closing-keys.jpg',
  'how-long-to-close-house-texas': '/images/blog/closing-keys.jpg',
  'fha-vs-conventional-texas': '/images/blog/couple-home-search.jpg',
  'va-loan-texas-guide': '/images/blog/hispanic-family-new-home.jpg',
  'buy-now-or-wait-texas': '/images/blog/mortgage-caution.jpg',
  'self-employed-mortgage-texas': '/images/blog/first-time-homebuyer.jpg',
  'tax-deductions-add-backs-self-employed-mortgage': '/images/blog/credit-score-new.jpg',
  'non-occupant-co-borrower-texas': '/images/blog/family-gift-equity.jpg',
  'job-loss-mortgage-options-texas': '/images/blog/mortgage-caution.jpg',
}

export const categories = [
  { value: 'all', label: 'All Posts', labelEs: 'Todos' },
  { value: 'first-time-buyers', label: 'First-Time Buyers', labelEs: 'Compradores Primerizos' },
  { value: 'itin-loans', label: 'ITIN Loans', labelEs: 'Préstamos ITIN' },
  { value: 'dpa', label: 'Down Payment Assistance', labelEs: 'Ayuda para Enganche' },
  { value: 'refinance', label: 'Refinance', labelEs: 'Refinanciamiento' },
  { value: 'investor', label: 'Investor Loans', labelEs: 'Préstamos Inversionistas' },
];
