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

  const headingClasses = {
    default: 'text-deep-brown',
    light: 'text-cream',
  };

  return (
    <div className={`text-xs font-body leading-relaxed border-t pt-4 mt-4 space-y-2 ${textClasses[variant]} ${borderClasses[variant]} ${className}`}>
      <p className={`font-medium ${headingClasses[variant]}`}>
        Daisy Castro | NMLS #2592627
      </p>
      <p>
        {isSpanish
          ? 'Soy una oficial de préstamos con licencia afiliada a Matador Lending. Los préstamos hipotecarios son originados a través de Matador Lending, NMLS #1871433, un corredor hipotecario con licencia.'
          : 'I am a licensed loan officer affiliated with Matador Lending. Mortgage loans are originated through Matador Lending, NMLS #1871433, a licensed mortgage broker.'}
      </p>
      <p className="flex items-center gap-2">
        {/* Equal Housing Opportunity Icon */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
          <path d="M12 3L2 9v12h20V9L12 3zm0 2.17l8 4.8V19H4V9.97l8-4.8zM12 11c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
        </svg>
        <span>{isSpanish ? 'Oportunidad Igual de Vivienda' : 'Equal Housing Opportunity'}</span>
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
