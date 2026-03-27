// ========================================
// LENDING & LIVING - SHARED TYPES
// ========================================

import type { Language } from '@/context/LanguageContext';

// ========================================
// NAVIGATION & LAYOUT
// ========================================

export interface NavItem {
  label: {
    en: string;
    es: string;
  };
  href: string;
  children?: NavItem[];
}

export interface FooterLink {
  label: {
    en: string;
    es: string;
  };
  href: string;
}

export interface FooterSection {
  title: {
    en: string;
    es: string;
  };
  links: FooterLink[];
}

// ========================================
// SERVICES
// ========================================

export interface ServiceItem {
  id: string;
  slug: string;
  title: {
    en: string;
    es: string;
  };
  shortDescription: {
    en: string;
    es: string;
  };
  longDescription: {
    en: string;
    es: string;
  };
  icon: string;
  benefits: {
    en: string[];
    es: string[];
  };
  requirements?: {
    en: string[];
    es: string[];
  };
  ctaText: {
    en: string;
    es: string;
  };
}

// ========================================
// TESTIMONIALS
// ========================================

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: {
    en: string;
    es: string;
  };
  rating: number;
  loanType?: string;
  image?: string;
}

// ========================================
// CONTACT & FORMS
// ========================================

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loanType: string;
  message: string;
  preferredLanguage: Language;
  preferredContact: 'email' | 'phone' | 'text';
}

export interface CalculatorFormData {
  homePrice: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  propertyTax?: number;
  homeInsurance?: number;
  pmi?: number;
}

export interface CalculatorResult {
  monthlyPayment: number;
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  totalPayment: number;
  totalInterest: number;
}

// ========================================
// BLOG & RESOURCES
// ========================================

export interface BlogPost {
  id: string;
  slug: string;
  title: {
    en: string;
    es: string;
  };
  excerpt: {
    en: string;
    es: string;
  };
  content: {
    en: string;
    es: string;
  };
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  readingTime: number;
}

export interface ResourceItem {
  id: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  type: 'guide' | 'checklist' | 'video' | 'document';
  url?: string;
  downloadUrl?: string;
  category: string;
}

// ========================================
// FAQ
// ========================================

export interface FAQItem {
  id: string;
  question: {
    en: string;
    es: string;
  };
  answer: {
    en: string;
    es: string;
  };
  category: string;
}

// ========================================
// TEAM & ABOUT
// ========================================

export interface TeamMember {
  id: string;
  name: string;
  role: {
    en: string;
    es: string;
  };
  bio: {
    en: string;
    es: string;
  };
  image: string;
  email?: string;
  phone?: string;
  nmls?: string;
  socialLinks?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
}

// ========================================
// UI COMPONENTS
// ========================================

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

// ========================================
// API RESPONSES
// ========================================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactAPIResponse {
  success: boolean;
  message: string;
  referenceId?: string;
}

// ========================================
// SEO & METADATA
// ========================================

export interface PageMeta {
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  keywords?: string[];
  ogImage?: string;
}
