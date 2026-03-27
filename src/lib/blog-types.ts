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
}

export const categories = [
  { value: 'all', label: 'All Posts', labelEs: 'Todos' },
  { value: 'first-time-buyers', label: 'First-Time Buyers', labelEs: 'Compradores Primerizos' },
  { value: 'itin-loans', label: 'ITIN Loans', labelEs: 'Préstamos ITIN' },
  { value: 'dpa', label: 'Down Payment Assistance', labelEs: 'Ayuda para Enganche' },
  { value: 'refinance', label: 'Refinance', labelEs: 'Refinanciamiento' },
  { value: 'investor', label: 'Investor Loans', labelEs: 'Préstamos Inversionistas' },
];
