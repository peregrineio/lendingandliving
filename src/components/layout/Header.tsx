'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/shared/LanguageToggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

// Service dropdown items
const serviceLinks = [
  { href: '/services/fha-loans-houston', labelKey: 'fha_title' },
  { href: '/services/itin-loans-houston', labelKey: 'itin_title', badge: 'Unique in Houston' },
  { href: '/services/down-payment-assistance-houston', labelKey: 'dpa_title' },
  { href: '/services/va-loans-houston', labelKey: 'va_title' },
  { href: '/services/refinance-houston', labelKey: 'refinance_title' },
  { href: '/services/investor-loans-houston', labelKey: 'investor_title' },
  { href: '/services/first-time-homebuyer-houston', labelKey: 'nontraditional_title' },
];

// Main nav links
const navLinks = [
  { href: '/', labelKey: 'home' },
  { href: '/services', labelKey: 'services', hasDropdown: true },
  { href: '/resources', labelKey: 'resources' },
  { href: '/blog', labelKey: 'blog' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, isSpanish } = useLanguage();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Close mobile menu
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl md:text-3xl font-bold text-deep-brown group-hover:text-gold-accent transition-colors">
              L&L
            </span>
            <span className="hidden sm:block font-body text-sm text-text-muted">
              Lending & Living
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.hasDropdown ? (
                  // Services with dropdown
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? 'text-gold-accent'
                          : 'text-text-body hover:text-gold-accent'
                      }`}
                    >
                      {t(`nav.${link.labelKey}`)}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isServicesOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </Link>

                    {/* Active indicator */}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold-accent"
                      />
                    )}

                    {/* Dropdown */}
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-brand-border overflow-hidden"
                        >
                          <div className="p-2">
                            {serviceLinks.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-cream transition-colors group"
                              >
                                <span className="text-sm font-medium text-text-body group-hover:text-gold-accent transition-colors">
                                  {t(`services.${service.labelKey}`)}
                                </span>
                                {service.badge && (
                                  <span className="text-[10px] px-2 py-0.5 bg-gold-accent/10 text-gold-accent rounded-full font-medium">
                                    {isSpanish ? 'Único en Houston' : service.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-brand-border p-2">
                            <Link
                              href="/services"
                              className="block px-4 py-2 text-sm font-medium text-gold-accent hover:bg-cream rounded-lg transition-colors"
                            >
                              {isSpanish ? 'Ver Todos los Servicios →' : 'View All Services →'}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Regular nav link
                  <div className="relative">
                    <Link
                      href={link.href}
                      className={`block px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? 'text-gold-accent'
                          : 'text-text-body hover:text-gold-accent'
                      }`}
                    >
                      {t(`nav.${link.labelKey}`)}
                    </Link>
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold-accent"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageToggle variant="compact" />
            <Link href="/contact" className="btn-primary text-sm">
              {t('nav.cta')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger
                className="p-2 text-deep-brown hover:text-gold-accent transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-cream border-l border-brand-border">
                <SheetHeader className="text-left pb-6 border-b border-brand-border">
                  <SheetTitle className="font-display text-2xl text-deep-brown">
                    L&L
                  </SheetTitle>
                </SheetHeader>

                <div className="py-6 space-y-2">
                  {navLinks.map((link) => (
                    <div key={link.href}>
                      {link.hasDropdown ? (
                        <>
                          <Link
                            href={link.href}
                            onClick={closeMobileMenu}
                            className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                              isActive(link.href)
                                ? 'text-gold-accent bg-gold-accent/5'
                                : 'text-text-body hover:bg-warm-taupe/10'
                            }`}
                          >
                            {t(`nav.${link.labelKey}`)}
                          </Link>
                          <div className="pl-4 mt-1 space-y-1">
                            {serviceLinks.slice(0, 4).map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={closeMobileMenu}
                                className="block px-4 py-2 text-sm text-text-muted hover:text-gold-accent transition-colors"
                              >
                                {t(`services.${service.labelKey}`)}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={closeMobileMenu}
                          className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                            isActive(link.href)
                              ? 'text-gold-accent bg-gold-accent/5'
                              : 'text-text-body hover:bg-warm-taupe/10'
                          }`}
                        >
                          {t(`nav.${link.labelKey}`)}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-brand-border space-y-4">
                  <LanguageToggle className="w-full justify-center" />
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="btn-primary w-full text-center block"
                  >
                    {t('nav.cta')}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
