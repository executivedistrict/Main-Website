import "server-only";

/**
 * Minimal Resend client: a single fetch POST to the Resend REST API, no
 * SDK dependency. Server-only; RESEND_API_KEY must never leave this layer.
 *
 * Env (see .env.example): RESEND_API_KEY only. The FROM address is
 * hard-coded below (owner decision: it is the authorized sender for the
 * API key, not configuration). The recipient is not env either: it is
 * `notifications.internalContact` in `src/lib/qualification/config.ts`,
 * edited by the owner alongside the qualification rules.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 15000;

/** The verified sender for all site email, authorized for the API key. */
const FROM_EMAIL = "Website <notifications@workwithcoba.com>";

export interface LeadEmailInput {
  to: string;
  subject: string;
  html: string;
}

/** True when the Resend API key is present. */
export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Sends one email via Resend. Throws on missing env or a non-2xx
 * response; callers decide whether that failure is fatal (lead-contact)
 * or logged and swallowed (qualify's fire-and-forget notification).
 */
export async function sendLeadEmail({ to, subject, html }: LeadEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Resend is not configured: RESEND_API_KEY must be set.");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      // Unique per send so Gmail never groups lead notifications into one
      // conversation (grouped threads display the first message's subject,
      // which misreads as every lead having that tier).
      headers: { "X-Entity-Ref-ID": crypto.randomUUID() },
    }),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend request failed (${response.status}): ${detail.slice(0, 500)}`
    );
  }
}
