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
        {/* Equal Housing Opportunity Icon — house shape with = sign inside */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 120"
          className="w-5 h-5 flex-shrink-0"
          aria-label="Equal Housing Opportunity"
          fill="currentColor"
        >
          {/* House shape */}
          <polygon points="50,5 95,45 80,45 80,95 20,95 20,45 5,45" />
          {/* Equal sign — two horizontal bars inside house */}
          <rect x="32" y="55" width="36" height="8" fill="white" />
          <rect x="32" y="70" width="36" height="8" fill="white" />
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
