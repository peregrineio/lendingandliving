'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface NMLSDisclosureProps {
  className?: string;
  variant?: 'default' | 'light';
}

/**
 * Required licensing + regulatory disclosures.
 *
 * COMPLIANCE — do not edit copy without Legal Agent review.
 * See legal-agent/reviews/2026-07-31_lending-and-living-compliance-research.md
 *
 * - SAFE Act (12 U.S.C. § 5101): individual + sponsoring-company NMLS IDs must appear on
 *   every consumer-facing surface, plus a link to NMLS Consumer Access.
 * - 7 TAC § 56.200 (Texas SML, mortgage companies + sponsored originators): the prescribed
 *   consumer complaint / Recovery Fund notice must be posted on every site used to
 *   originate or advertise. The notice is a PRESCRIBED FORM — reproduced verbatim in
 *   English; it must not be paraphrased, shortened, or replaced by a translation.
 *   Spanish is provided as a clearly-labeled courtesy translation; the English controls.
 *
 * NOTE: Texas renumbered these rules (7 TAC Ch. 80 → Ch. 56 for mortgage companies;
 * Ch. 81 → Ch. 57 for mortgage bankers). Confirm Matador's license track on NMLS Consumer
 * Access and re-check the current SML-prescribed form at sml.texas.gov before changing this.
 */

const SML_NOTICE_EN = `CONSUMERS WISHING TO FILE A COMPLAINT AGAINST A COMPANY OR A RESIDENTIAL MORTGAGE LOAN ORIGINATOR SHOULD COMPLETE AND SEND A COMPLAINT FORM TO THE TEXAS DEPARTMENT OF SAVINGS AND MORTGAGE LENDING, 2601 NORTH LAMAR, SUITE 201, AUSTIN, TEXAS 78705. COMPLAINT FORMS AND INSTRUCTIONS MAY BE OBTAINED FROM THE DEPARTMENT'S WEBSITE AT WWW.SML.TEXAS.GOV. A TOLL-FREE CONSUMER HOTLINE IS AVAILABLE AT 1-877-276-5550.

THE DEPARTMENT MAINTAINS A RECOVERY FUND TO MAKE PAYMENTS OF CERTAIN ACTUAL OUT OF POCKET DAMAGES SUSTAINED BY BORROWERS CAUSED BY ACTS OF LICENSED RESIDENTIAL MORTGAGE LOAN ORIGINATORS. A WRITTEN APPLICATION FOR REIMBURSEMENT FROM THE RECOVERY FUND MUST BE FILED WITH AND INVESTIGATED BY THE DEPARTMENT PRIOR TO THE PAYMENT OF A CLAIM. FOR MORE INFORMATION ABOUT THE RECOVERY FUND, PLEASE CONSULT THE DEPARTMENT'S WEBSITE AT WWW.SML.TEXAS.GOV.`;

const SML_NOTICE_ES_COURTESY = `Los consumidores que deseen presentar una queja contra una compañía o un originador de préstamos hipotecarios residenciales deben completar y enviar un formulario de queja al Departamento de Ahorros y Préstamos Hipotecarios de Texas (Texas Department of Savings and Mortgage Lending), 2601 North Lamar, Suite 201, Austin, Texas 78705. Los formularios de queja e instrucciones están disponibles en el sitio web del departamento: www.sml.texas.gov. Hay una línea gratuita para el consumidor: 1-877-276-5550.

El departamento mantiene un Fondo de Recuperación (Recovery Fund) para pagar ciertos daños reales, de su propio bolsillo, sufridos por prestatarios y causados por actos de originadores de préstamos hipotecarios residenciales con licencia. Debe presentarse una solicitud escrita de reembolso del Fondo de Recuperación ante el departamento, y el departamento debe investigarla, antes de que se pague una reclamación. Para más información sobre el Fondo de Recuperación, consulte el sitio web del departamento: www.sml.texas.gov.`;

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
    <div
      className={`text-xs font-body leading-relaxed border-t pt-4 mt-4 space-y-3 ${textClasses[variant]} ${borderClasses[variant]} ${className}`}
    >
      {/* Licensing identity — SAFE Act */}
      <p className={`font-medium ${headingClasses[variant]}`}>
        Daisy Castro | NMLS ID #2592627
      </p>
      <p>
        {isSpanish
          ? 'Soy una oficial de préstamos con licencia afiliada a Matador Lending. Los préstamos hipotecarios son originados a través de Matador Lending, NMLS ID #1871433, un corredor hipotecario con licencia.'
          : 'I am a licensed loan officer affiliated with Matador Lending. Mortgage loans are originated through Matador Lending, NMLS ID #1871433, a licensed mortgage broker.'}
      </p>
      <p>
        {isSpanish ? 'Verifique nuestras licencias en ' : 'Verify our licensing at '}
        <a
          href="https://www.nmlsconsumeraccess.org/"
          className={linkClasses[variant]}
          target="_blank"
          rel="noopener noreferrer"
        >
          NMLS Consumer Access
        </a>
        .
      </p>

      {/* Equal Housing Opportunity */}
      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 120"
          className="w-5 h-5 flex-shrink-0"
          role="img"
          aria-label={isSpanish ? 'Oportunidad Igual de Vivienda' : 'Equal Housing Opportunity'}
          fill="currentColor"
        >
          <polygon points="50,5 95,45 80,45 80,95 20,95 20,45 5,45" />
          <rect x="32" y="55" width="36" height="8" fill="white" />
          <rect x="32" y="70" width="36" height="8" fill="white" />
        </svg>
        <span>{isSpanish ? 'Oportunidad Igual de Vivienda' : 'Equal Housing Opportunity'}</span>
      </p>

      {/* Legal / privacy links */}
      <p className="flex flex-wrap gap-x-3 gap-y-1">
        <Link href="/privacy" className={linkClasses[variant]}>
          {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/terms" className={linkClasses[variant]}>
          {isSpanish ? 'Términos de Uso' : 'Terms of Use'}
        </Link>
      </p>

      {/* Texas SML prescribed notice — 7 TAC § 56.200. Reproduced verbatim, English. */}
      <div className="pt-2 space-y-2">
        <p className="whitespace-pre-line">{SML_NOTICE_EN}</p>
        <p>
          <a
            href="https://www.sml.texas.gov"
            className={linkClasses[variant]}
            target="_blank"
            rel="noopener noreferrer"
          >
            www.sml.texas.gov
          </a>
        </p>
        {isSpanish && (
          <div className="pt-2 space-y-1 opacity-90">
            <p className="italic">
              Traducción de cortesía. El texto en inglés que aparece arriba es el aviso oficial
              requerido y es el que prevalece.
            </p>
            <p className="whitespace-pre-line">{SML_NOTICE_ES_COURTESY}</p>
          </div>
        )}
      </div>
    </div>
  );
}
