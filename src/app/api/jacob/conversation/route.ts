import { buildContext } from "@/lib/jacob/context";
import { checkRateLimit } from "@/lib/rate-limit";
import { createConversation, TavusError } from "@/lib/jacob/tavus";

/**
 * POST /api/jacob/conversation
 *
 * Creates one Tavus conversation for the Jacob AI concierge and returns
 * ONLY { conversation_url }. Called on an intentional user click; never
 * pre-warm sessions (each one burns paid Tavus minutes).
 *
 * Errors (generic messages; specifics logged server-side only):
 *   429 - rate limited (5/min/IP best-effort) or Tavus itself rate limited
 *   500 - missing env vars, Tavus auth failure, or any other Tavus failure
 */

export const runtime = "nodejs";
// POST Route Handlers are always dynamic in Next.js 16 (only GET can be
// cached), but make the intent explicit.
export const dynamic = "force-dynamic";

const MAX_FIELD_LENGTH = 100;

function sanitizeField(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, MAX_FIELD_LENGTH);
}

export async function POST(request: Request): Promise<Response> {
  // Validate environment variables.
  if (
    !process.env.TAVUS_API_KEY ||
    !process.env.TAVUS_REPLICA_ID ||
    !process.env.TAVUS_PERSONA_ID
  ) {
    console.error(
      "[Jacob Concierge] Missing required environment variables. " +
        "Ensure TAVUS_API_KEY, TAVUS_REPLICA_ID, and TAVUS_PERSONA_ID are set."
    );
    return Response.json(
      { error: "Server configuration error. Please contact support." },
      { status: 500 }
    );
  }

  // Rate limiting keyed by client IP (first x-forwarded-for hop).
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(clientIp)) {
    return Response.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 }
    );
  }

  // Parse the optional body; a missing or invalid body is treated as empty.
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  const record =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  const visitorName = sanitizeField(record.visitorName);
  const visitorCompany = sanitizeField(record.visitorCompany);

  try {
    const conversationUrl = await createConversation({
      context: buildContext(visitorName, visitorCompany),
      conversationName: `Jacob Concierge - ${visitorName || "Visitor"} - ${new Date().toISOString()}`,
    });

    // Return ONLY the conversation_url: no IDs, no keys, nothing else.
    return Response.json({ conversation_url: conversationUrl });
  } catch (error) {
    console.error("[Jacob Concierge] Failed to create conversation:", error);

    if (error instanceof TavusError && error.status === 401) {
      return Response.json(
        { error: "Authentication failed. Contact the site administrator." },
        { status: 500 }
      );
    }

    if (error instanceof TavusError && error.status === 429) {
      return Response.json(
        { error: "Service is temporarily busy. Please try again in a moment." },
        { status: 429 }
      );
    }

    return Response.json(
      { error: "Failed to create conversation. Please try again." },
      { status: 500 }
    );
  }
}
