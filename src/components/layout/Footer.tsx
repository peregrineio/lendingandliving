'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import { NMLSDisclosure } from '@/components/shared/NMLSDisclosure';

// Service links
const serviceLinks = [
  { href: '/services/fha-loans-houston', labelKey: 'fha_title' },
  { href: '/services/itin-loans-houston', labelKey: 'itin_title' },
  { href: '/services/down-payment-assistance-houston', labelKey: 'dpa_title' },
  { href: '/services/va-loans-houston', labelKey: 'va_title' },
  { href: '/services/refinance-houston', labelKey: 'refinance_title' },
  { href: '/services/investor-loans-houston', labelKey: 'investor_title' },
];

// Resource links
const resourceLinks = [
  { href: '/resources/calculator', label: { en: 'Mortgage Calculator', es: 'Calculadora Hipotecaria' } },
  { href: '/resources', label: { en: 'Resource Center', es: 'Centro de Recursos' } },
  { href: '/blog', label: { en: 'Blog', es: 'Blog' } },
  { href: '/resources/first-time-buyer-guide', label: { en: 'First-Time Buyer Guide', es: 'Guía para Compradores' } },
  { href: '/about', label: { en: 'About Daisy', es: 'Sobre Daisy' } },
];

// Social icons as SVG components
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

// Social links
const socialLinks = [
  { href: 'https://facebook.com', Icon: FacebookIcon, label: 'Facebook' },
  { href: 'https://instagram.com', Icon: InstagramIcon, label: 'Instagram' },
  { href: 'https://linkedin.com', Icon: LinkedinIcon, label: 'LinkedIn' },
];

export function Footer() {
  const { t, language, isSpanish } = useLanguage();

  return (
    <footer className="bg-dark-footer text-warm-taupe">
      {/* Main Footer Content */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div>
              {/* TODO: Replace with <Image src="/images/logo-white.png" alt="Lending & Living" width={120} height={60} className="h-10 w-auto" /> when Daisy provides logo files */}
              <Link href="/" className="inline-block group">
                <span className="font-display text-3xl font-bold text-cream group-hover:text-gold-accent transition-colors">
                  L&L
                </span>
                <span className="block font-body text-sm text-warm-taupe/70 mt-1">
                  Lending & Living
                </span>
              </Link>
            </div>
            <p className="text-warm-taupe/80 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-warm-taupe/10 flex items-center justify-center text-warm-taupe hover:bg-gold-accent hover:text-dark-footer transition-all"
                  aria-label={social.label}
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Language Toggle */}
            <LanguageToggle variant="light" />
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-display text-lg text-gold-accent mb-6">
              {isSpanish ? 'Servicios' : 'Services'}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-taupe/80 hover:text-gold-accent transition-colors"
                  >
                    {t(`services.${link.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-display text-lg text-gold-accent mb-6">
              {isSpanish ? 'Recursos' : 'Resources'}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-taupe/80 hover:text-gold-accent transition-colors"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-display text-lg text-gold-accent mb-6">
              {isSpanish ? 'Contacto' : 'Contact'}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${t('footer.phone').replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-3 text-sm text-warm-taupe/80 hover:text-gold-accent transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-warm-taupe/10 flex items-center justify-center group-hover:bg-gold-accent/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{t('footer.phone')}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t('footer.email')}`}
                  className="flex items-center gap-3 text-sm text-warm-taupe/80 hover:text-gold-accent transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-warm-taupe/10 flex items-center justify-center group-hover:bg-gold-accent/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="break-all">{t('footer.email')}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-warm-taupe/80">
                  <div className="w-10 h-10 rounded-full bg-warm-taupe/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>{t('footer.address')}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-taupe/10">
        <div className="section-container py-8">
          {/* Equal Housing & Rights */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 text-warm-taupe/60 text-sm">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 3L2 9v12h20V9L12 3zm0 2.17l8 4.8V19H4V9.97l8-4.8zM12 11c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                </svg>
              </div>
              <span>Equal Housing Opportunity</span>
            </div>
            <p className="text-warm-taupe/60 text-sm">
              {t('footer.rights')}
            </p>
          </div>

          {/* NMLS Disclosure */}
          <NMLSDisclosure variant="light" />
        </div>
      </div>
    </footer>
  );
}
