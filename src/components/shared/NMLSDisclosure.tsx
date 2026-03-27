'use client';

import { useLanguage } from '@/context/LanguageContext';

interface NMLSDisclosureProps {
  className?: string;
  variant?: 'default' | 'light';
}

export function NMLSDisclosure({ className = '', variant = 'default' }: NMLSDisclosureProps) {
  const { isSpanish } = useLanguage();

  const textClasses = {
    default: 'text-text-muted',
    light: 'text-warm-taupe/70',
  };

  const linkClasses = {
    default: 'underline hover:text-gold-accent transition-colors',
    light: 'underline hover:text-cream transition-colors',
  };

  const borderClasses = {
    default: 'border-brand-border',
    light: 'border-warm-taupe/20',
  };

  return (
    <div className={`text-xs font-body leading-relaxed border-t pt-4 mt-4 ${textClasses[variant]} ${borderClasses[variant]} ${className}`}>
      <p>
        Daisy Castro-Shahin | NMLS #2461273 | Matador Lending | NMLS #1871433 |
        5718 Westheimer Rd Suite 1000, Houston TX 77057
      </p>
      <p className="mt-2">
        {isSpanish ? (
          <>
            Figura: 7 TAC §80.200(b) — El consumidor que desee presentar una queja contra una empresa
            o un originador de préstamos hipotecarios residenciales debe completar y enviar un formulario
            de queja al Departamento de Ahorros y Préstamos Hipotecarios de Texas, 2601 North Lamar,
            Suite 201, Austin, Texas 78705. Los formularios de queja e instrucciones pueden obtenerse
            del sitio web del departamento en{' '}
            <a
              href="https://www.sml.texas.gov"
              className={linkClasses[variant]}
              target="_blank"
              rel="noopener noreferrer"
            >
              www.sml.texas.gov
            </a>.
          </>
        ) : (
          <>
            Figure: 7 TAC §80.200(b) — Consumer wishing to file a complaint against a company
            or a residential mortgage loan originator should complete and send a complaint form
            to the Texas Department of Savings and Mortgage Lending, 2601 North Lamar, Suite 201,
            Austin, Texas 78705. Complaint forms and instructions may be obtained from the
            department&apos;s website at{' '}
            <a
              href="https://www.sml.texas.gov"
              className={linkClasses[variant]}
              target="_blank"
              rel="noopener noreferrer"
            >
              www.sml.texas.gov
            </a>.
          </>
        )}
      </p>
    </div>
  );
}
