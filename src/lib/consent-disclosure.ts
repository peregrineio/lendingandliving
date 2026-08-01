/**
 * TCPA / TX SB 140 consent disclosure — versioned. The EXACT text shown to
 * the consumer is snapshotted into the consents row (platform requirement:
 * we must be able to prove what they saw).
 *
 * COMPLIANCE — do not edit without Legal Agent review. Authored Spanish,
 * never machine translation.
 */

export const DISCLOSURE_VERSION = "v2.1";

export const DISCLOSURE_TEXT: Record<"en" | "es", string> = {
  en:
    "By checking this box, I agree that Daisy Castro (NMLS #2592627) with Matador Lending " +
    "(NMLS #1871433) may contact me about my inquiry by phone call, text message, and email " +
    "at the phone number and email address I provided, including using automated technology. " +
    "Message and data rates may apply, and message frequency varies. I can opt out at any " +
    "time by replying STOP to any text or using the unsubscribe link in any email. " +
    "I understand that my consent is not a condition of obtaining credit or of any loan approval.",
  es:
    "Al marcar esta casilla, acepto que Daisy Castro (NMLS #2592627) de Matador Lending " +
    "(NMLS #1871433) me contacte sobre mi consulta por llamada telefónica, mensaje de texto y " +
    "correo electrónico al número y la dirección que proporcioné, incluso mediante tecnología " +
    "automatizada. Pueden aplicarse tarifas de mensajes y datos, y la frecuencia de los mensajes " +
    "varía. Puedo cancelar en cualquier momento respondiendo STOP a cualquier mensaje de texto o " +
    "usando el enlace para darse de baja en cualquier correo. Entiendo que mi consentimiento no " +
    "es una condición para obtener crédito ni para la aprobación de ningún préstamo.",
};
