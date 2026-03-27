'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageToggleProps {
  className?: string;
  variant?: 'default' | 'compact' | 'light';
}

export function LanguageToggle({ className = '', variant = 'default' }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  const baseClasses = 'flex items-center gap-2 rounded-full border transition-all duration-300 group select-none';

  const variantClasses = {
    default: 'px-3 py-1.5 border-gold-accent/40 bg-cream hover:bg-warm-taupe/30 hover:border-gold-accent text-sm',
    compact: 'px-2.5 py-1 border-gold-accent/30 bg-cream/80 hover:bg-warm-taupe/20 hover:border-gold-accent text-xs',
    light: 'px-3 py-1.5 border-warm-taupe/30 bg-white/10 hover:bg-white/20 hover:border-warm-taupe text-sm text-cream',
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={language}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5"
        >
          {language === 'en' ? (
            <>
              <span className="text-base leading-none">🇲🇽</span>
              <span className={`font-accent italic font-medium ${variant === 'light' ? 'text-cream' : 'text-gold-accent'}`}>
                En Español
              </span>
            </>
          ) : (
            <>
              <span className="text-base leading-none">🇺🇸</span>
              <span className={`font-body font-medium ${variant === 'light' ? 'text-cream' : 'text-text-body'}`}>
                In English
              </span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
