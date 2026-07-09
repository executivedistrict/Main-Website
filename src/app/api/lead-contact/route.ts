import { checkRateLimit } from "@/lib/rate-limit";
import { isResendConfigured, sendLeadEmail } from "@/lib/email/resend";
import {
  applicationRows,
  contactRows,
  renderLeadEmail,
} from "@/lib/email/template";
import { qualificationConfig } from "@/lib/qualification/config";
import {
  parseContactDetails,
  parseQualificationAnswers,
} from "@/lib/qualification/types";

/**
 * POST /api/lead-contact
 *
 * Post-tier follow-up: tier 2 (borderline, an operator reaches out) and
 * tier 3 (no-fit, the applicant asked for help with a bottleneck). This
 * is where contact details are collected; the scored application carries
 * none. Body: { message, preferredTimes?, tier, contact, application }
 * where `application` is the original answers echo held in client state
 * and `contact` is { name, email, phone, contactMethod }. Sends the
 * branded `[Lead follow-up]` email to the internal contact and returns
 * { ok: true }.
 *
 * Errors (generic messages; specifics logged server-side only):
 *   400 - invalid body
 *   429 - rate limited (5/min/IP best-effort)
 *   500 - Resend env missing or the send failed
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MESSAGE_MAX = 5000;
const PREFERRED_TIMES_MAX = 500;

/** Tiers this route accepts; qualified leads never reach it. */
const FOLLOW_UP_TIERS = {
  borderline: {
    label: "Borderline",
    intro: "A borderline applicant left a message.",
  },
  "no-fit": {
    label: "No fit",
    intro:
      "A no-fit applicant says they're stuck on a bottleneck and asked for help.",
  },
} as const;

type FollowUpTier = keyof typeof FOLLOW_UP_TIERS;

function isFollowUpTier(value: unknown): value is FollowUpTier {
  return typeof value === "string" && value in FOLLOW_UP_TIERS;
}

export async function POST(request: Request): Promise<Response> {
  // Rate limiting keyed by client IP (first x-forwarded-for hop),
  // namespaced per route.
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(`lead-contact:${clientIp}`)) {
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
  if (body === null || typeof body !== "object") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const record = body as Record<string, unknown>;

  const message =
    typeof record.message === "string" ? record.message.trim() : "";
  if (!message || message.length > MESSAGE_MAX) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  let preferredTimes: string | undefined;
  if (record.preferredTimes !== undefined && record.preferredTimes !== null) {
    if (typeof record.preferredTimes !== "string") {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
    const trimmed = record.preferredTimes.trim();
    if (trimmed.length > PREFERRED_TIMES_MAX) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
    preferredTimes = trimmed || undefined;
  }

  if (!isFollowUpTier(record.tier)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const tier = FOLLOW_UP_TIERS[record.tier];

  const contact = parseContactDetails(record.contact);
  if (!contact) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const answers = parseQualificationAnswers(record.application);
  if (!answers) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isResendConfigured()) {
    console.error(
      "[Lead contact] RESEND_API_KEY missing; " +
        "cannot send the follow-up email."
    );
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  const rows = [...contactRows(contact), ...applicationRows(answers)];
  if (preferredTimes) {
    rows.push({ label: "Preferred times", value: preferredTimes });
  }

  const html = renderLeadEmail({
    title: "Lead follow-up",
    intro: `${tier.intro} Submitted ${new Date().toISOString()}.`,
    rows,
    blocks: [
      { label: "Their message", text: message },
      { label: "What's prompting them now", text: answers.whyNow },
    ],
  });

  try {
    await sendLeadEmail({
      to: qualificationConfig.notifications.internalContact,
      subject: `[Lead follow-up: ${tier.label}] ${answers.businessName}`,
      html,
    });
  } catch (error) {
    console.error("[Lead contact] Failed to send follow-up email:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
