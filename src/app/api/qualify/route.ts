import { checkRateLimit } from "@/lib/rate-limit";
import { sendLeadEmail } from "@/lib/email/resend";
import { applicationRows, renderLeadEmail } from "@/lib/email/template";
import { qualificationConfig } from "@/lib/qualification/config";
import { scoreApplication } from "@/lib/qualification/scoring";
import {
  parseQualificationAnswers,
  type QualificationAnswers,
  type Tier,
} from "@/lib/qualification/types";

/**
 * POST /api/qualify
 *
 * Scores a lead-qualification application (plan 006) and returns ONLY
 * { tier }. The scoring rules never leave the server. Borderline and
 * no-fit submissions fire-and-forget an email to the internal contact
 * from the qualification config; qualified leads get NO internal email,
 * because they land on the booking calendar, which feeds the CRM
 * directly. Email failure (or missing Resend env) is logged server-side
 * and NEVER blocks or changes the response.
 *
 * Errors (generic messages; specifics logged server-side only):
 *   400 - invalid body, invalid option value, or filled honeypot
 *   429 - rate limited (5/min/IP best-effort)
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIER_LABELS: Record<Tier, string> = {
  qualified: "Qualified",
  borderline: "Borderline",
  "no-fit": "No fit",
};

export async function POST(request: Request): Promise<Response> {
  // Rate limiting keyed by client IP (first x-forwarded-for hop),
  // namespaced per route.
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(`qualify:${clientIp}`)) {
    return Response.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real applicants never see or fill this field.
  const honeypot =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>).company_website
      : undefined;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const answers = parseQualificationAnswers(body);
  if (!answers) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { tier, score } = scoreApplication(answers);

  // Fire-and-forget internal notification: never blocks or changes the
  // response, even on total failure. Qualified leads skip it; their
  // booking (with contact details) lands in the CRM via the calendar.
  if (tier !== "qualified") {
    void notifyInternalContact(answers, tier, score).catch((error) => {
      console.error("[Qualify] Failed to send lead notification email:", error);
    });
  }

  return Response.json({ tier });
}

async function notifyInternalContact(
  answers: QualificationAnswers,
  tier: Tier,
  score: number
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.error(
      "[Qualify] RESEND_API_KEY missing; lead notification email skipped. " +
        "Tier and score were still returned."
    );
    return;
  }

  const html = renderLeadEmail({
    title: "New application",
    intro: `Tier: ${TIER_LABELS[tier]} (score ${score}). Submitted ${new Date().toISOString()}.`,
    rows: applicationRows(answers),
    blocks: [{ label: "What's prompting them now", text: answers.whyNow }],
  });

  await sendLeadEmail({
    to: qualificationConfig.notifications.internalContact,
    subject: `[Lead: ${TIER_LABELS[tier]}] ${answers.businessName}`,
    html,
  });
}
