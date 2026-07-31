'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Privacy Policy.
 *
 * COMPLIANCE — do not edit without Legal Agent review.
 * See legal-agent/reviews/2026-07-31_lending-and-living-compliance-research.md
 *
 * Satisfies:
 * - GLBA Privacy Rule (15 U.S.C. § 6803; 12 CFR Part 1016) — notice of NPI collection,
 *   sharing, and protection, provided at or before establishing a customer relationship.
 * - TDPSA (Tex. Bus. & Com. Code Ch. 541) — consumer rights, targeted-advertising opt-out,
 *   appeal process. Note the GLBA exemption covers GLBA-regulated data, NOT general
 *   website analytics/marketing data, which is why both regimes are addressed.
 * - CFPB LEP Statement (86 Fed. Reg. 6306) — Spanish availability and its limits.
 *
 * Content is reviewed against what the site ACTUALLY does:
 * - Contact form fields: first name, phone, email (optional), best time, purpose,
 *   message, source page, language  (src/app/api/contact/route.ts)
 * - Stored in Supabase; notification + auto-reply sent via Resend
 * - Google Analytics + Meta Pixel loaded site-wide (src/components/shared/Analytics.tsx)
 * If any of those change, this page must change with them.
 */

const LAST_UPDATED = { en: 'July 31, 2026', es: '31 de julio de 2026' };

type Section = {
  id: string;
  heading: { en: string; es: string };
  body: { en: React.ReactNode; es: React.ReactNode };
};

const sections: Section[] = [
  {
    id: 'who-we-are',
    heading: { en: 'Who We Are', es: 'Quiénes Somos' },
    body: {
      en: (
        <>
          <p>
            &ldquo;Lending &amp; Living&rdquo; is the personal brand of <strong>Daisy Castro</strong>,
            a licensed mortgage loan originator, <strong>NMLS ID #2592627</strong>.
          </p>
          <p>
            Mortgage loans are originated through <strong>Matador Lending, NMLS ID #1871433</strong>,
            a licensed mortgage broker. Matador Lending is the licensed entity; Daisy originates
            loans under its sponsorship. When you become a loan applicant, Matador Lending&apos;s
            own privacy practices also apply to your loan file.
          </p>
        </>
      ),
      es: (
        <>
          <p>
            &laquo;Lending &amp; Living&raquo; es la marca personal de <strong>Daisy Castro</strong>,
            originadora de préstamos hipotecarios con licencia, <strong>NMLS ID #2592627</strong>.
          </p>
          <p>
            Los préstamos hipotecarios se originan a través de{' '}
            <strong>Matador Lending, NMLS ID #1871433</strong>, un corredor hipotecario con licencia.
            Matador Lending es la entidad con licencia; Daisy origina préstamos bajo su patrocinio.
            Cuando usted se convierte en solicitante de préstamo, las prácticas de privacidad de
            Matador Lending también se aplican a su expediente.
          </p>
        </>
      ),
    },
  },
  {
    id: 'what-we-collect',
    heading: { en: 'Information We Collect', es: 'Información Que Recopilamos' },
    body: {
      en: (
        <>
          <p><strong>Information you give us.</strong> When you submit a form on this site we collect:</p>
          <ul>
            <li>Your first name</li>
            <li>Your phone number</li>
            <li>Your email address (optional)</li>
            <li>The best time to reach you</li>
            <li>What you&apos;re looking for (for example: purchase, refinance, down payment assistance)</li>
            <li>Any message you choose to write</li>
            <li>Your language preference and the page you submitted from</li>
          </ul>
          <p>
            <strong>Information collected automatically.</strong> Like most websites, we receive
            standard technical information such as IP address, browser and device type, pages viewed,
            and referring site. See <em>Cookies and Tracking</em> below.
          </p>
          <p>
            <strong>We do not collect sensitive financial information through this website.</strong>{' '}
            This site&apos;s forms do not ask for your Social Security number, ITIN, bank account
            numbers, or income documentation. If you proceed to a loan application, that information
            is collected through Matador Lending&apos;s secure loan origination system — never
            through a form on this site and never by email or text.
          </p>
        </>
      ),
      es: (
        <>
          <p><strong>Información que usted nos da.</strong> Cuando envía un formulario en este sitio, recopilamos:</p>
          <ul>
            <li>Su nombre</li>
            <li>Su número de teléfono</li>
            <li>Su correo electrónico (opcional)</li>
            <li>El mejor momento para comunicarnos con usted</li>
            <li>Lo que está buscando (por ejemplo: compra, refinanciamiento, ayuda para el enganche)</li>
            <li>Cualquier mensaje que decida escribir</li>
            <li>Su preferencia de idioma y la página desde la que envió el formulario</li>
          </ul>
          <p>
            <strong>Información recopilada automáticamente.</strong> Como la mayoría de los sitios web,
            recibimos información técnica estándar como dirección IP, tipo de navegador y dispositivo,
            páginas vistas y sitio de referencia. Consulte <em>Cookies y Rastreo</em> más abajo.
          </p>
          <p>
            <strong>No recopilamos información financiera sensible a través de este sitio web.</strong>{' '}
            Los formularios de este sitio no le piden su número de Seguro Social, ITIN, números de
            cuenta bancaria ni documentación de ingresos. Si continúa con una solicitud de préstamo,
            esa información se recopila mediante el sistema seguro de originación de préstamos de
            Matador Lending — nunca por un formulario de este sitio, ni por correo electrónico o texto.
          </p>
        </>
      ),
    },
  },
  {
    id: 'how-we-use',
    heading: { en: 'How We Use Your Information', es: 'Cómo Usamos Su Información' },
    body: {
      en: (
        <ul>
          <li>To respond to you and answer your questions</li>
          <li>To discuss loan options that may fit your situation</li>
          <li>To send you information you requested, such as a homebuyer guide</li>
          <li>To follow up about your inquiry</li>
          <li>To improve this website and understand which pages are useful</li>
          <li>To meet legal, licensing, and recordkeeping obligations</li>
        </ul>
      ),
      es: (
        <ul>
          <li>Para responderle y contestar sus preguntas</li>
          <li>Para hablar sobre opciones de préstamo que puedan servirle</li>
          <li>Para enviarle la información que solicitó, como una guía para compradores</li>
          <li>Para dar seguimiento a su consulta</li>
          <li>Para mejorar este sitio web y entender qué páginas son útiles</li>
          <li>Para cumplir obligaciones legales, de licencia y de mantenimiento de registros</li>
        </ul>
      ),
    },
  },
  {
    id: 'sharing',
    heading: { en: 'How We Share Your Information', es: 'Cómo Compartimos Su Información' },
    body: {
      en: (
        <>
          <p><strong>We do not sell your personal information.</strong></p>
          <p>We share information only as follows:</p>
          <ul>
            <li>
              <strong>Matador Lending</strong> — the licensed mortgage broker through which loans are
              originated
            </li>
            <li>
              <strong>Wholesale lenders</strong> — if you choose to move forward with an application,
              to obtain loan options and pricing
            </li>
            <li>
              <strong>Service providers who operate this site</strong> — our website host, database,
              and email delivery providers, who may process your information only to provide those
              services to us
            </li>
            <li>
              <strong>Analytics and advertising providers</strong> — see <em>Cookies and Tracking</em>
            </li>
            <li>
              <strong>When required by law</strong> — including responses to regulators, subpoenas,
              and court orders
            </li>
          </ul>
        </>
      ),
      es: (
        <>
          <p><strong>No vendemos su información personal.</strong></p>
          <p>Compartimos información únicamente de la siguiente manera:</p>
          <ul>
            <li>
              <strong>Matador Lending</strong> — el corredor hipotecario con licencia a través del cual
              se originan los préstamos
            </li>
            <li>
              <strong>Prestamistas mayoristas</strong> — si usted decide continuar con una solicitud,
              para obtener opciones de préstamo y precios
            </li>
            <li>
              <strong>Proveedores de servicios que operan este sitio</strong> — nuestro proveedor de
              alojamiento web, base de datos y envío de correo electrónico, que pueden procesar su
              información solo para prestarnos esos servicios
            </li>
            <li>
              <strong>Proveedores de análisis y publicidad</strong> — consulte <em>Cookies y Rastreo</em>
            </li>
            <li>
              <strong>Cuando la ley lo exige</strong> — incluidas respuestas a reguladores, citaciones
              y órdenes judiciales
            </li>
          </ul>
        </>
      ),
    },
  },
  {
    id: 'glba',
    heading: {
      en: 'Financial Privacy Notice (Gramm-Leach-Bliley Act)',
      es: 'Aviso de Privacidad Financiera (Ley Gramm-Leach-Bliley)',
    },
    body: {
      en: (
        <>
          <p>
            Federal law requires financial institutions to explain how they handle your nonpublic
            personal information (&ldquo;NPI&rdquo;). NPI is personally identifiable financial
            information — for example, information from a loan application, account balances, or
            information from a consumer report.
          </p>
          <p>
            We collect NPI only when you apply for or inquire about a mortgage loan. We do not
            disclose NPI about current or former customers to anyone except as permitted by law and
            as described in <em>How We Share Your Information</em> above.
          </p>
          <p>
            We maintain physical, electronic, and procedural safeguards designed to protect your
            NPI, and we restrict access to those who need it to provide services to you.
          </p>
          <p>
            Because a mortgage loan is originated through Matador Lending, you will also receive
            Matador Lending&apos;s privacy notice in connection with your application. That notice
            governs the loan file.
          </p>
        </>
      ),
      es: (
        <>
          <p>
            La ley federal exige que las instituciones financieras expliquen cómo manejan su
            información personal no pública (&laquo;NPI&raquo;, por sus siglas en inglés). La NPI es
            información financiera de identificación personal — por ejemplo, información de una
            solicitud de préstamo, saldos de cuentas o información de un informe crediticio.
          </p>
          <p>
            Recopilamos NPI únicamente cuando usted solicita o consulta sobre un préstamo hipotecario.
            No divulgamos NPI sobre clientes actuales o anteriores a nadie, salvo según lo permita la
            ley y según se describe en <em>Cómo Compartimos Su Información</em> más arriba.
          </p>
          <p>
            Mantenemos salvaguardas físicas, electrónicas y de procedimiento diseñadas para proteger
            su NPI, y restringimos el acceso a quienes lo necesitan para prestarle servicios.
          </p>
          <p>
            Debido a que el préstamo hipotecario se origina a través de Matador Lending, usted también
            recibirá el aviso de privacidad de Matador Lending en relación con su solicitud. Ese aviso
            rige el expediente del préstamo.
          </p>
        </>
      ),
    },
  },
  {
    id: 'cookies',
    heading: { en: 'Cookies and Tracking', es: 'Cookies y Rastreo' },
    body: {
      en: (
        <>
          <p>This site uses:</p>
          <ul>
            <li>
              <strong>Google Analytics</strong> — to understand how visitors use the site. You can opt
              out using the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </li>
            <li>
              <strong>Meta (Facebook) Pixel</strong> — to measure and target advertising. You can
              manage this in your{' '}
              <a
                href="https://www.facebook.com/settings?tab=ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook ad preferences
              </a>
              .
            </li>
          </ul>
          <p>
            Most browsers let you block or delete cookies in their settings. We honor recognized
            browser-based opt-out signals, including Global Privacy Control (GPC), as an opt-out of
            targeted advertising.
          </p>
        </>
      ),
      es: (
        <>
          <p>Este sitio utiliza:</p>
          <ul>
            <li>
              <strong>Google Analytics</strong> — para entender cómo los visitantes usan el sitio.
              Puede optar por no participar con el{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                complemento de exclusión de Google Analytics
              </a>
              .
            </li>
            <li>
              <strong>Meta (Facebook) Pixel</strong> — para medir y dirigir publicidad. Puede
              administrarlo en sus{' '}
              <a
                href="https://www.facebook.com/settings?tab=ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                preferencias de anuncios de Facebook
              </a>
              .
            </li>
          </ul>
          <p>
            La mayoría de los navegadores le permiten bloquear o eliminar cookies en su configuración.
            Respetamos las señales de exclusión reconocidas del navegador, incluida Global Privacy
            Control (GPC), como una exclusión de publicidad dirigida.
          </p>
        </>
      ),
    },
  },
  {
    id: 'calls-texts',
    heading: { en: 'Calls, Texts, and Email', es: 'Llamadas, Mensajes de Texto y Correo' },
    body: {
      en: (
        <>
          <p>
            When you submit a form asking us to contact you, you are giving us permission to reach
            you at the phone number and email address you provided — including by text message, if
            you provided a mobile number.
          </p>
          <p>
            Message and data rates may apply. Message frequency varies.{' '}
            <strong>Consent is not a condition of any purchase or of obtaining credit.</strong>
          </p>
          <p>
            To stop text messages, reply <strong>STOP</strong>. To stop marketing emails, use the
            unsubscribe link in any email. You can also ask us to stop contacting you at any time
            using the contact details below, and we will honor that request.
          </p>
        </>
      ),
      es: (
        <>
          <p>
            Cuando envía un formulario pidiéndonos que lo contactemos, nos da permiso para
            comunicarnos con usted al teléfono y correo electrónico que proporcionó — incluso por
            mensaje de texto, si proporcionó un número de celular.
          </p>
          <p>
            Pueden aplicarse tarifas de mensajes y datos. La frecuencia de mensajes varía.{' '}
            <strong>El consentimiento no es condición para ninguna compra ni para obtener crédito.</strong>
          </p>
          <p>
            Para detener los mensajes de texto, responda <strong>STOP</strong>. Para dejar de recibir
            correos de marketing, use el enlace para cancelar la suscripción en cualquier correo.
            También puede pedirnos en cualquier momento que dejemos de contactarlo usando los datos
            de contacto que aparecen abajo, y respetaremos esa solicitud.
          </p>
        </>
      ),
    },
  },
  {
    id: 'texas-rights',
    heading: { en: 'Your Texas Privacy Rights', es: 'Sus Derechos de Privacidad en Texas' },
    body: {
      en: (
        <>
          <p>
            Under the Texas Data Privacy and Security Act, Texas residents may have the right to:
          </p>
          <ul>
            <li>Confirm whether we process your personal data and access it</li>
            <li>Correct inaccuracies in your personal data</li>
            <li>Delete personal data you provided or that we obtained about you</li>
            <li>Obtain a portable copy of your data</li>
            <li>Opt out of targeted advertising, sale of personal data, or certain profiling</li>
          </ul>
          <p>
            These rights do not apply to information covered by the Gramm-Leach-Bliley Act, which is
            exempt from this law. They do generally apply to website analytics and marketing data.
          </p>
          <p>
            To exercise a right, contact us using the details below. We will verify your request
            before acting on it. If we decline, you may <strong>appeal</strong> by replying to our
            decision; we will respond to an appeal within 60 days. You may also file a complaint with
            the{' '}
            <a
              href="https://www.texasattorneygeneral.gov/consumer-protection/file-consumer-complaint"
              target="_blank"
              rel="noopener noreferrer"
            >
              Texas Attorney General
            </a>
            .
          </p>
        </>
      ),
      es: (
        <>
          <p>
            Conforme a la Ley de Privacidad y Seguridad de Datos de Texas, los residentes de Texas
            pueden tener derecho a:
          </p>
          <ul>
            <li>Confirmar si procesamos sus datos personales y acceder a ellos</li>
            <li>Corregir inexactitudes en sus datos personales</li>
            <li>Eliminar datos personales que usted proporcionó o que obtuvimos sobre usted</li>
            <li>Obtener una copia portátil de sus datos</li>
            <li>
              Optar por no participar en publicidad dirigida, venta de datos personales o cierta
              elaboración de perfiles
            </li>
          </ul>
          <p>
            Estos derechos no se aplican a la información cubierta por la Ley Gramm-Leach-Bliley, que
            está exenta de esta ley. Por lo general sí se aplican a los datos de análisis web y
            marketing.
          </p>
          <p>
            Para ejercer un derecho, contáctenos con los datos de abajo. Verificaremos su solicitud
            antes de actuar. Si la rechazamos, usted puede <strong>apelar</strong> respondiendo a
            nuestra decisión; responderemos a una apelación dentro de 60 días. También puede presentar
            una queja ante el{' '}
            <a
              href="https://www.texasattorneygeneral.gov/consumer-protection/file-consumer-complaint"
              target="_blank"
              rel="noopener noreferrer"
            >
              Procurador General de Texas
            </a>
            .
          </p>
        </>
      ),
    },
  },
  {
    id: 'security-retention',
    heading: { en: 'Security and Retention', es: 'Seguridad y Retención' },
    body: {
      en: (
        <>
          <p>
            We use reasonable administrative, technical, and physical safeguards to protect your
            information, including encryption in transit and restricted access. No method of
            transmission or storage is completely secure, so we cannot guarantee absolute security.
          </p>
          <p>
            <strong>Please do not send your Social Security number, ITIN, or account numbers by
            email or text message.</strong> Those channels are not secure. We will always provide a
            secure method when that information is needed.
          </p>
          <p>
            We keep your information for as long as needed to serve you and to meet legal and
            recordkeeping requirements, then dispose of it securely.
          </p>
        </>
      ),
      es: (
        <>
          <p>
            Usamos salvaguardas administrativas, técnicas y físicas razonables para proteger su
            información, incluido el cifrado en tránsito y el acceso restringido. Ningún método de
            transmisión o almacenamiento es completamente seguro, por lo que no podemos garantizar
            seguridad absoluta.
          </p>
          <p>
            <strong>Por favor no envíe su número de Seguro Social, ITIN o números de cuenta por
            correo electrónico o mensaje de texto.</strong> Esos canales no son seguros. Siempre le
            proporcionaremos un método seguro cuando se necesite esa información.
          </p>
          <p>
            Conservamos su información durante el tiempo necesario para atenderle y cumplir con
            requisitos legales y de mantenimiento de registros, y luego la desechamos de forma segura.
          </p>
        </>
      ),
    },
  },
  {
    id: 'language',
    heading: { en: 'Language Services', es: 'Servicios de Idioma' },
    body: {
      en: (
        <>
          <p>
            Daisy is fluent in English and Spanish, and this website is available in both languages.
            You can speak with Daisy in Spanish at any point in the process.
          </p>
          <p>
            <strong>Please note:</strong> many mortgage documents — including loan applications,
            federally required disclosures, and closing documents — are provided in English only,
            because they come from lenders and government programs. Daisy will explain those
            documents to you in Spanish, but the English versions are the official and legally
            binding ones.
          </p>
          <p>
            Where we provide a Spanish translation of a required legal notice on this site, it is a
            courtesy translation and the English version controls.
          </p>
        </>
      ),
      es: (
        <>
          <p>
            Daisy habla inglés y español con fluidez, y este sitio web está disponible en ambos
            idiomas. Puede hablar con Daisy en español en cualquier momento del proceso.
          </p>
          <p>
            <strong>Tenga en cuenta:</strong> muchos documentos hipotecarios — incluidas las
            solicitudes de préstamo, las divulgaciones exigidas por ley federal y los documentos de
            cierre — se proporcionan únicamente en inglés, porque provienen de prestamistas y
            programas gubernamentales. Daisy le explicará esos documentos en español, pero las
            versiones en inglés son las oficiales y legalmente vinculantes.
          </p>
          <p>
            Cuando proporcionamos una traducción al español de un aviso legal requerido en este sitio,
            es una traducción de cortesía y la versión en inglés es la que prevalece.
          </p>
        </>
      ),
    },
  },
  {
    id: 'children',
    heading: { en: "Children's Privacy", es: 'Privacidad de Menores' },
    body: {
      en: (
        <p>
          This site is intended for adults. We do not knowingly collect personal information from
          children under 13. If you believe a child has provided us information, contact us and we
          will delete it.
        </p>
      ),
      es: (
        <p>
          Este sitio está dirigido a adultos. No recopilamos a sabiendas información personal de
          menores de 13 años. Si cree que un menor nos ha proporcionado información, contáctenos y la
          eliminaremos.
        </p>
      ),
    },
  },
  {
    id: 'changes',
    heading: { en: 'Changes to This Policy', es: 'Cambios a Esta Política' },
    body: {
      en: (
        <p>
          We may update this policy. When we do, we will change the &ldquo;Last updated&rdquo; date
          at the top. Material changes will be highlighted on this page.
        </p>
      ),
      es: (
        <p>
          Podemos actualizar esta política. Cuando lo hagamos, cambiaremos la fecha de
          &laquo;Última actualización&raquo; en la parte superior. Los cambios importantes se
          destacarán en esta página.
        </p>
      ),
    },
  },
];

export function PrivacyContent() {
  const { language, isSpanish } = useLanguage();

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="section-padding bg-warm-white border-b border-brand-border">
        <div className="section-container max-w-4xl">
          <h1 className="text-display-xl text-deep-brown">
            {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
          </h1>
          <p className="text-text-muted mt-4">
            {isSpanish ? 'Última actualización: ' : 'Last updated: '}
            {LAST_UPDATED[language]}
          </p>
          <p className="text-text-muted mt-4 max-w-2xl">
            {isSpanish
              ? 'Esta política explica qué información recopilamos, cómo la usamos, con quién la compartimos y qué control tiene usted sobre ella.'
              : 'This policy explains what information we collect, how we use it, who we share it with, and what control you have over it.'}
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-8 border-b border-brand-border">
        <div className="section-container max-w-4xl">
          <nav aria-label={isSpanish ? 'Contenido' : 'Contents'}>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-gold-accent underline hover:text-deep-brown transition-colors"
                  >
                    {s.heading[language]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Body */}
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

          {/* Contact */}
          <div id="contact" className="scroll-mt-28 border-t border-brand-border pt-10">
            <h2 className="text-display-md text-deep-brown mb-4">
              {isSpanish ? 'Contáctenos' : 'Contact Us'}
            </h2>
            <div className="prose prose-lg max-w-none text-text-muted prose-strong:text-deep-brown">
              <p>
                {isSpanish
                  ? 'Para preguntas sobre privacidad o para ejercer sus derechos:'
                  : 'For privacy questions or to exercise your rights:'}
              </p>
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
                <Link href="/contact">
                  {isSpanish ? 'O use nuestro formulario de contacto' : 'Or use our contact form'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
