import "server-only";

/**
 * Thin Tavus API client for the Jacob AI concierge. Server-only: the API
 * key, replica ID, and persona ID must never reach the browser. Ported from
 * docs/jacob-concierge-plugin-v2/server.js (axios replaced with native
 * fetch); the conversation properties are the plugin's values verbatim.
 */

const TAVUS_API_URL = "https://tavusapi.com/v2/conversations";
const REQUEST_TIMEOUT_MS = 15000;

/** Error thrown when the Tavus API call fails, carrying the upstream HTTP status (if any). */
export class TavusError extends Error {
  /** Upstream HTTP status, or undefined for network/timeout/shape failures. */
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "TavusError";
    this.status = status;
  }
}

export interface CreateConversationInput {
  context: string;
  conversationName: string;
}

/**
 * Creates a Tavus conversation and returns its conversation_url.
 * Throws TavusError on any failure. Never call this speculatively: each
 * conversation burns paid Tavus minutes.
 */
export async function createConversation(
  ctx: CreateConversationInput
): Promise<string> {
  const apiKey = process.env.TAVUS_API_KEY;
  const replicaId = process.env.TAVUS_REPLICA_ID;
  const personaId = process.env.TAVUS_PERSONA_ID;

  if (!apiKey || !replicaId || !personaId) {
    throw new TavusError("Missing Tavus environment variables");
  }

  let response: Response;
  try {
    response = await fetch(TAVUS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        replica_id: replicaId,
        persona_id: personaId,
        conversation_name: ctx.conversationName,
        conversational_context: ctx.context,
        properties: {
          max_call_duration: 1800,
          participant_left_timeout: 30,
          enable_recording: false,
          language: "english",
        },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw new TavusError(
      error instanceof Error ? error.message : "Tavus request failed"
    );
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new TavusError(
      `Tavus API responded ${response.status}: ${body}`,
      response.status
    );
  }

  const data: unknown = await response.json().catch(() => null);
  const conversationUrl =
    data !== null &&
    typeof data === "object" &&
    "conversation_url" in data &&
    typeof (data as { conversation_url: unknown }).conversation_url === "string"
      ? (data as { conversation_url: string }).conversation_url
      : undefined;

  if (!conversationUrl) {
    throw new TavusError("Tavus API returned no conversation_url");
  }

  return conversationUrl;
}
