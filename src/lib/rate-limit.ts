/**
 * Best-effort in-memory rate limiter shared by the API route handlers
 * (Jacob concierge, /api/qualify, /api/lead-contact). Framework-agnostic,
 * no imports. Fixed window: max 5 checks per key per 60 seconds. Expired
 * entries are pruned lazily inside the check (no setInterval, so it is
 * safe in serverless runtimes where module scope may be frozen or
 * short-lived). State is per-instance, so limits are best-effort, not a
 * hard guarantee.
 *
 * Callers should namespace keys per route (e.g. `qualify:<ip>`) so one
 * endpoint's traffic does not consume another's budget.
 */

const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX = 5;

interface RateLimitRecord {
  windowStart: number;
  count: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Returns true if the request identified by `key` is allowed, false if it
 * exceeds the limit for the current window.
 */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();

  // Lazy pruning: drop entries whose window has long expired.
  for (const [existingKey, record] of rateLimitMap) {
    if (now - record.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitMap.delete(existingKey);
    }
  }

  const record = rateLimitMap.get(key);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(key, { windowStart: now, count: 1 });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}
