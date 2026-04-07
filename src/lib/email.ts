import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface LeadData {
  firstName: string;
  phone: string;
  email?: string | null;
  bestTime?: string | null;
  purpose?: string | null;
  message?: string | null;
  language?: string;
  sourcePage?: string | null;
}

/**
 * Send notification email to Daisy about new lead
 */
export async function sendLeadNotification(lead: LeadData): Promise<boolean> {
  if (!resend) {
    console.warn('Resend not configured - notification email not sent');
    return true; // Don't fail if Resend isn't configured
  }

  const isSpanish = lead.language === 'es';

  try {
    await resend.emails.send({
      from: 'Lending & Living <leads@lendingandliving.com>',
      to: 'Daisy@matadorlending.com',
      subject: `New Lead: ${lead.firstName} - ${lead.purpose || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4A3728; padding: 20px; text-align: center;">
            <h1 style="color: #C9922A; margin: 0;">New Lead Received!</h1>
          </div>

          <div style="padding: 30px; background-color: #F8F4EE;">
            <h2 style="color: #4A3728; margin-top: 0;">Contact Information</h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8; font-weight: bold; width: 140px;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8;">${lead.firstName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8;">
                  <a href="tel:${lead.phone}" style="color: #C9922A;">${lead.phone}</a>
                </td>
              </tr>
              ${lead.email ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8;">
                  <a href="mailto:${lead.email}" style="color: #C9922A;">${lead.email}</a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8; font-weight: bold;">Best Time:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8;">${lead.bestTime || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8; font-weight: bold;">Purpose:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8;">${lead.purpose || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8; font-weight: bold;">Language:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8;">
                  ${isSpanish ? '🇪🇸 Spanish' : '🇺🇸 English'}
                </td>
              </tr>
              ${lead.sourcePage ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8; font-weight: bold;">Source Page:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #C4B9A8;">${lead.sourcePage}</td>
              </tr>
              ` : ''}
            </table>

            ${lead.message ? `
            <h3 style="color: #4A3728; margin-top: 25px;">Message:</h3>
            <div style="background-color: white; padding: 15px; border-radius: 8px; border: 1px solid #C4B9A8;">
              ${lead.message}
            </div>
            ` : ''}

            <div style="margin-top: 30px; text-align: center;">
              <a href="tel:${lead.phone}" style="display: inline-block; background-color: #C9922A; color: #2C1F16; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Call ${lead.firstName} Now
              </a>
            </div>
          </div>

          <div style="background-color: #2C1F16; padding: 15px; text-align: center;">
            <p style="color: #C4B9A8; margin: 0; font-size: 12px;">
              Lending & Living | NMLS #2592627 | Matador Lending NMLS #1871433
            </p>
          </div>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Failed to send lead notification:', error);
    return false;
  }
}

/**
 * Send auto-reply to prospect (bilingual based on their language preference)
 */
export async function sendLeadAutoReply(lead: LeadData): Promise<boolean> {
  if (!resend || !lead.email) {
    return true; // Don't fail if Resend isn't configured or no email provided
  }

  const isSpanish = lead.language === 'es';

  const subject = isSpanish
    ? `¡Gracias por contactarme, ${lead.firstName}!`
    : `Thank you for contacting me, ${lead.firstName}!`;

  const body = isSpanish
    ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4A3728; padding: 20px; text-align: center;">
          <h1 style="color: #C9922A; margin: 0;">¡Gracias por Contactarme!</h1>
        </div>

        <div style="padding: 30px; background-color: #F8F4EE;">
          <p style="color: #4A3728; font-size: 16px; line-height: 1.6;">
            Hola ${lead.firstName},
          </p>

          <p style="color: #4A3728; font-size: 16px; line-height: 1.6;">
            ¡Gracias por contactarme! Recibí tu mensaje y te llamaré dentro de las próximas 24 horas para hablar sobre cómo puedo ayudarte con tu préstamo hipotecario.
          </p>

          <p style="color: #4A3728; font-size: 16px; line-height: 1.6;">
            Si tienes alguna pregunta urgente, no dudes en llamarme directamente al <a href="tel:8328947676" style="color: #C9922A; font-weight: bold;">832-894-7676</a>.
          </p>

          <p style="color: #4A3728; font-size: 16px; line-height: 1.6;">
            ¡Espero hablar contigo pronto!
          </p>

          <p style="color: #4A3728; font-size: 16px; line-height: 1.6; margin-top: 25px;">
            Con cariño,<br>
            <strong style="color: #C9922A;">Daisy Castro</strong><br>
            <em>Tu Oficial de Préstamos en Houston</em>
          </p>
        </div>

        <div style="background-color: #2C1F16; padding: 20px; text-align: center;">
          <p style="color: #C9922A; font-weight: bold; margin: 0 0 5px 0;">
            832-894-7676
          </p>
          <p style="color: #C4B9A8; margin: 0; font-size: 12px;">
            NMLS #2592627 | Matador Lending NMLS #1871433
          </p>
          <p style="color: #C4B9A8; margin: 10px 0 0 0; font-size: 11px;">
            Equal Housing Opportunity
          </p>
        </div>
      </div>
    `
    : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4A3728; padding: 20px; text-align: center;">
          <h1 style="color: #C9922A; margin: 0;">Thank You for Reaching Out!</h1>
        </div>

        <div style="padding: 30px; background-color: #F8F4EE;">
          <p style="color: #4A3728; font-size: 16px; line-height: 1.6;">
            Hi ${lead.firstName},
          </p>

          <p style="color: #4A3728; font-size: 16px; line-height: 1.6;">
            Thank you for contacting me! I received your message and will call you within the next 24 hours to discuss how I can help with your mortgage needs.
          </p>

          <p style="color: #4A3728; font-size: 16px; line-height: 1.6;">
            If you have any urgent questions, please don't hesitate to call me directly at <a href="tel:8328947676" style="color: #C9922A; font-weight: bold;">832-894-7676</a>.
          </p>

          <p style="color: #4A3728; font-size: 16px; line-height: 1.6;">
            Looking forward to speaking with you soon!
          </p>

          <p style="color: #4A3728; font-size: 16px; line-height: 1.6; margin-top: 25px;">
            Warm regards,<br>
            <strong style="color: #C9922A;">Daisy Castro</strong><br>
            <em>Your Houston Mortgage Loan Officer</em>
          </p>
        </div>

        <div style="background-color: #2C1F16; padding: 20px; text-align: center;">
          <p style="color: #C9922A; font-weight: bold; margin: 0 0 5px 0;">
            832-894-7676
          </p>
          <p style="color: #C4B9A8; margin: 0; font-size: 12px;">
            NMLS #2592627 | Matador Lending NMLS #1871433
          </p>
          <p style="color: #C4B9A8; margin: 10px 0 0 0; font-size: 11px;">
            Equal Housing Opportunity
          </p>
        </div>
      </div>
    `;

  try {
    await resend.emails.send({
      from: 'Daisy Castro <daisy@lendingandliving.com>',
      to: lead.email,
      subject,
      html: body,
    });

    return true;
  } catch (error) {
    console.error('Failed to send auto-reply:', error);
    return false;
  }
}
