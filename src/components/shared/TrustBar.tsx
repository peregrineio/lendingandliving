'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Shield, Home, Award } from 'lucide-react';

interface TrustBarProps {
  className?: string;
  variant?: 'default' | 'light' | 'compact';
}

export function TrustBar({ className = '', variant = 'default' }: TrustBarProps) {
  const { language } = useLanguage();

  const baseClasses = 'flex flex-wrap items-center gap-x-4 gap-y-1 font-body';

  const variantClasses = {
    default: 'text-xs text-text-muted',
    light: 'text-xs text-warm-taupe/80',
    compact: 'text-[11px] text-text-muted',
  };

  const iconClasses = {
    default: 'text-gold-accent',
    light: 'text-gold-accent',
    compact: 'text-gold-accent',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <span className="flex items-center gap-1">
        <Shield className={`w-3 h-3 ${iconClasses[variant]}`} />
        NMLS #2461273
      </span>
      <span className="flex items-center gap-1">
        <Home className={`w-3 h-3 ${iconClasses[variant]}`} />
        Matador Lending NMLS #1871433
      </span>
      <span className="flex items-center gap-1">
        <Award className={`w-3 h-3 ${iconClasses[variant]}`} />
        Equal Housing Opportunity
      </span>
      {language === 'es' && (
        <span className="font-accent italic text-gold-accent">
          Hablamos Español
        </span>
      )}
    </div>
  );
}
