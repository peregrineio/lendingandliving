'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Terms of Use.
 *
 * COMPLIANCE — do not edit without Legal Agent review.
 * See legal-agent/reviews/2026-07-31_lending-and-living-compliance-research.md
 *
 * Key points this page must preserve:
 * - No offer / commitment to lend (avoids implying a credit decision)
 * - Rates and program terms subject to change (Reg Z / Reg N)
 * - No government affiliation or endorsement (Reg N § 1014.3(14),(15))
 * - Calculators are estimates only
 * - Governing law: Texas
 */

const LAST_UPDATED = { en: 'July 31, 2026', es: '31 de julio de 2026' };

type Section = {
  id: string;
  heading: { en: string; es: string };
  body: { en: React.ReactNode; es: React.ReactNode };
};

const sections: Section[] = [
  {
    id: 'about',
    heading: { en: 'About This Site', es: 'Acerca de Este Sitio' },
    body: {
      en: (
        <p>
          This website is operated by <strong>Daisy Castro</strong>, a licensed mortgage loan
          originator (<strong>NMLS ID #2592627</strong>), who originates residential mortgage loans
          through <strong>Matador Lending, NMLS ID #1871433</strong>, a licensed mortgage broker. By
          using this site, you agree to these terms.
        </p>
      ),
      es: (
        <p>
          Este sitio web es operado por <strong>Daisy Castro</strong>, originadora de préstamos
          hipotecarios con licencia (<strong>NMLS ID #2592627</strong>), quien origina préstamos
          hipotecarios residenciales a través de{' '}
          <strong>Matador Lending, NMLS ID #1871433</strong>, un corredor hipotecario con licencia. Al
          usar este sitio, usted acepta estos términos.
        </p>
      ),
    },
  },
  {
    id: 'not-an-offer',
    heading: { en: 'Not an Offer or Commitment to Lend', es: 'No Es una Oferta ni Compromiso de Préstamo' },
    body: {
      en: (
        <>
          <p>
            Nothing on this website is an offer to lend, a commitment to lend, or an approval of
            credit. Information here is for general educational purposes only.
          </p>
          <p>
            All loans are subject to credit review, income and asset verification, property
            appraisal, underwriting approval, and program requirements. Not all applicants will
            qualify. Loan programs, terms, and availability are subject to change without notice.
          </p>
        </>
      ),
      es: (
        <>
          <p>
            Nada en este sitio web constituye una oferta de préstamo, un compromiso de préstamo ni una
            aprobación de crédito. La información aquí es solo para fines educativos generales.
          </p>
          <p>
            Todos los préstamos están sujetos a revisión de crédito, verificación de ingresos y
            activos, avalúo de la propiedad, aprobación de suscripción y requisitos del programa. No
            todos los solicitantes calificarán. Los programas, términos y disponibilidad de préstamos
            están sujetos a cambios sin previo aviso.
          </p>
        </>
      ),
    },
  },
  {
    id: 'calculators',
    heading: { en: 'Calculators and Estimates', es: 'Calculadoras y Estimaciones' },
    body: {
      en: (
        <p>
          Any calculator, estimate, or figure shown on this site is for illustration only. Results
          are estimates based on the information entered and general assumptions. They are not a
          quote, and they do not include all costs — such as taxes, insurance, mortgage insurance, or
          association dues. Your actual terms will be provided in official loan disclosures.
        </p>
      ),
      es: (
        <p>
          Cualquier calculadora, estimación o cifra que aparezca en este sitio es solo ilustrativa.
          Los resultados son estimaciones basadas en la información ingresada y en suposiciones
          generales. No son una cotización y no incluyen todos los costos — como impuestos, seguro,
          seguro hipotecario o cuotas de asociación. Sus términos reales se le proporcionarán en las
          divulgaciones oficiales del préstamo.
        </p>
      ),
    },
  },
  {
    id: 'assistance-programs',
    heading: { en: 'Assistance Programs', es: 'Programas de Asistencia' },
    body: {
      en: (
        <p>
          Information about down payment assistance and other homebuyer programs is provided for
          general education. These programs are administered by government agencies and housing
          organizations — not by us. Eligibility, funding availability, award amounts, and terms are
          set by each program administrator and change over time. We are not affiliated with, endorsed
          by, or acting on behalf of any government agency. Final eligibility is determined by the
          program administrator and the lender.
        </p>
      ),
      es: (
        <p>
          La información sobre ayuda para el enganche y otros programas para compradores de vivienda
          se proporciona con fines educativos generales. Estos programas son administrados por
          agencias gubernamentales y organizaciones de vivienda — no por nosotros. La elegibilidad, la
          disponibilidad de fondos, los montos y los términos los establece cada administrador del
          programa y cambian con el tiempo. No estamos afiliados, respaldados ni actuando en nombre de
          ninguna agencia gubernamental. La elegibilidad final la determina el administrador del
          programa y el prestamista.
        </p>
      ),
    },
  },
  {
    id: 'content',
    heading: { en: 'Content and Accuracy', es: 'Contenido y Exactitud' },
    body: {
      en: (
        <p>
          We work to keep this site accurate and current, but content may become outdated. Blog posts
          and guides reflect general information at the time of writing and are not personalized
          advice. We are not tax, legal, or financial advisors — please consult a qualified
          professional for advice about your situation.
        </p>
      ),
      es: (
        <p>
          Trabajamos para mantener este sitio exacto y actualizado, pero el contenido puede quedar
          desactualizado. Las publicaciones del blog y las guías reflejan información general al
          momento de escribirse y no son asesoramiento personalizado. No somos asesores fiscales,
          legales ni financieros — consulte a un profesional calificado para obtener asesoramiento
          sobre su situación.
        </p>
      ),
    },
  },
  {
    id: 'third-party',
    heading: { en: 'Third-Party Links', es: 'Enlaces de Terceros' },
    body: {
      en: (
        <p>
          This site links to third-party websites, including government program pages. We do not
          control those sites and are not responsible for their content, accuracy, or privacy
          practices.
        </p>
      ),
      es: (
        <p>
          Este sitio enlaza a sitios web de terceros, incluidas páginas de programas gubernamentales.
          No controlamos esos sitios y no somos responsables de su contenido, exactitud ni prácticas
          de privacidad.
        </p>
      ),
    },
  },
  {
    id: 'ip',
    heading: { en: 'Intellectual Property', es: 'Propiedad Intelectual' },
    body: {
      en: (
        <p>
          Content on this site — text, images, and design — is owned by us or used with permission.
          You may not reproduce or redistribute it commercially without written permission.
        </p>
      ),
      es: (
        <p>
          El contenido de este sitio — texto, imágenes y diseño — es de nuestra propiedad o se usa con
          permiso. No puede reproducirlo ni redistribuirlo comercialmente sin permiso por escrito.
        </p>
      ),
    },
  },
  {
    id: 'liability',
    heading: { en: 'Disclaimer and Limitation of Liability', es: 'Descargo y Limitación de Responsabilidad' },
    body: {
      en: (
        <p>
          This site is provided &ldquo;as is&rdquo; without warranties of any kind, to the fullest
          extent permitted by law. We are not liable for any indirect, incidental, or consequential
          damages arising from your use of this site. Nothing here limits any right you have under
          applicable consumer protection law.
        </p>
      ),
      es: (
        <p>
          Este sitio se proporciona &laquo;tal cual&raquo;, sin garantías de ningún tipo, en la máxima
          medida permitida por la ley. No somos responsables de daños indirectos, incidentales o
          consecuentes derivados de su uso de este sitio. Nada aquí limita los derechos que usted
          tenga conforme a las leyes de protección al consumidor aplicables.
        </p>
      ),
    },
  },
  {
    id: 'governing-law',
    heading: { en: 'Governing Law', es: 'Ley Aplicable' },
    body: {
      en: (
        <p>
          These terms are governed by the laws of the State of Texas, without regard to conflict of
          law principles.
        </p>
      ),
      es: (
        <p>
          Estos términos se rigen por las leyes del Estado de Texas, sin consideración a los
          principios de conflicto de leyes.
        </p>
      ),
    },
  },
  {
    id: 'changes',
    heading: { en: 'Changes to These Terms', es: 'Cambios a Estos Términos' },
    body: {
      en: (
        <p>
          We may update these terms. Continued use of the site after an update means you accept the
          revised terms.
        </p>
      ),
      es: (
        <p>
          Podemos actualizar estos términos. El uso continuado del sitio después de una actualización
          significa que acepta los términos revisados.
        </p>
      ),
    },
  },
];

export function TermsContent() {
  const { language, isSpanish } = useLanguage();

  return (
    <div className="bg-cream">
      <section className="section-padding bg-warm-white border-b border-brand-border">
        <div className="section-container max-w-4xl">
          <h1 className="text-display-xl text-deep-brown">
            {isSpanish ? 'Términos de Uso' : 'Terms of Use'}
          </h1>
          <p className="text-text-muted mt-4">
            {isSpanish ? 'Última actualización: ' : 'Last updated: '}
            {LAST_UPDATED[language]}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-12">
          {sections.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="text-display-md text-deep-brown mb-4">{s.heading[language]}</h2>
              <div className="prose prose-lg max-w-none text-text-muted prose-a:text-gold-accent prose-a:underline prose-strong:text-deep-brown">
                {s.body[language]}
              </div>
            </div>
          ))}

          <div className="border-t border-brand-border pt-10">
            <h2 className="text-display-md text-deep-brown mb-4">
              {isSpanish ? 'Contacto' : 'Contact'}
            </h2>
            <div className="prose prose-lg max-w-none text-text-muted prose-strong:text-deep-brown">
              <p>
                <strong>Daisy Castro</strong> — NMLS ID #2592627
                <br />
                Matador Lending — NMLS ID #1871433
                <br />
                5718 Westheimer Rd, Suite 1000, Houston, TX 77057
                <br />
                <a href="tel:8328947676">832-894-7676</a>
                <br />
                <a href="mailto:Daisy@matadorlending.com">Daisy@matadorlending.com</a>
              </p>
              <p>
                <Link href="/privacy">
                  {isSpanish ? 'Ver nuestra Política de Privacidad' : 'View our Privacy Policy'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
