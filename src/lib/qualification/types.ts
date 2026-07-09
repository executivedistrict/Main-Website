/**
 * Shared types and validation for the lead-qualification application
 * (plan 006, Phase 0 contracts). Option values are locked string unions;
 * the form, the API routes, and the scoring engine all speak these values.
 *
 * This module is intentionally client-safe (no secrets, no server-only):
 * the form imports the types. The scoring rules themselves live in
 * `config.ts`, which is server-only and must never be imported from a
 * client component.
 */

export type Tier = "qualified" | "borderline" | "no-fit";

export type Ownership = "owner" | "partner" | "researcher";
export type YearsOwned = "under-2" | "2-5" | "6-15" | "15-plus";
export type Employees = "solo" | "2-10" | "11-50" | "51-200" | "200-plus";
export type Journey = "grow" | "stabilize" | "sell" | "transition" | "unsure";
export type RevenueRange =
  | "under-500k"
  | "500k-1m"
  | "1m-5m"
  | "5m-20m"
  | "20m-plus"
  | "undisclosed";
export type ContactMethod = "phone" | "email" | "text";

/**
 * The scored application answer set, as validated server-side. Contact
 * details are deliberately NOT part of the application: they're collected
 * after the tier is known (qualified leads give them to the booking
 * calendar, which feeds the CRM directly; borderline and no-fit leads
 * give them to the internal contact form). See ContactDetails.
 */
export interface QualificationAnswers {
  businessName: string;
  ownership: Ownership;
  industry: string;
  yearsOwned: YearsOwned;
  employees: Employees;
  journey: Journey;
  /** Open text, required. Substance is judged by the operator; length is
   * only a scoring proxy (see config.points.whyNow). */
  whyNow: string;
  /** Optional on the form; a skipped answer normalizes to "undisclosed". */
  revenueRange: RevenueRange;
}

/**
 * Personal contact details, collected post-tier by the internal contact
 * form (tier 2 follow-up and the tier 3 "I'm stuck" path) and sent to
 * POST /api/lead-contact alongside the application echo.
 */
export interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
}

const OWNERSHIP_VALUES: readonly Ownership[] = ["owner", "partner", "researcher"];
const YEARS_OWNED_VALUES: readonly YearsOwned[] = ["under-2", "2-5", "6-15", "15-plus"];
const EMPLOYEES_VALUES: readonly Employees[] = ["solo", "2-10", "11-50", "51-200", "200-plus"];
const JOURNEY_VALUES: readonly Journey[] = ["grow", "stabilize", "sell", "transition", "unsure"];
const REVENUE_RANGE_VALUES: readonly RevenueRange[] = [
  "under-500k",
  "500k-1m",
  "1m-5m",
  "5m-20m",
  "20m-plus",
  "undisclosed",
];
const CONTACT_METHOD_VALUES: readonly ContactMethod[] = ["phone", "email", "text"];

const SHORT_TEXT_MAX = 200;
const LONG_TEXT_MAX = 5000;

function isOneOf<T extends string>(value: unknown, values: readonly T[]): value is T {
  return typeof value === "string" && (values as readonly string[]).includes(value);
}

function shortText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > SHORT_TEXT_MAX) return null;
  return trimmed;
}

function longText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > LONG_TEXT_MAX) return null;
  return trimmed;
}

/**
 * Validates an unknown payload (e.g. a parsed request body) into a
 * QualificationAnswers object. Returns null on any invalid or missing
 * field. Unknown extra keys are ignored; the honeypot check is the
 * route's responsibility, not this parser's.
 */
export function parseQualificationAnswers(input: unknown): QualificationAnswers | null {
  if (input === null || typeof input !== "object") return null;
  const record = input as Record<string, unknown>;

  const businessName = shortText(record.businessName);
  const industry = shortText(record.industry);
  const whyNow = longText(record.whyNow);

  if (!businessName || !industry || !whyNow) return null;

  if (!isOneOf(record.ownership, OWNERSHIP_VALUES)) return null;
  if (!isOneOf(record.yearsOwned, YEARS_OWNED_VALUES)) return null;
  if (!isOneOf(record.employees, EMPLOYEES_VALUES)) return null;
  if (!isOneOf(record.journey, JOURNEY_VALUES)) return null;

  // Revenue range is optional on the form; missing or empty means the
  // applicant skipped it, which scores as "undisclosed".
  let revenueRange: RevenueRange = "undisclosed";
  if (record.revenueRange !== undefined && record.revenueRange !== null && record.revenueRange !== "") {
    if (!isOneOf(record.revenueRange, REVENUE_RANGE_VALUES)) return null;
    revenueRange = record.revenueRange;
  }

  return {
    businessName,
    ownership: record.ownership,
    industry,
    yearsOwned: record.yearsOwned,
    employees: record.employees,
    journey: record.journey,
    whyNow,
    revenueRange,
  };
}

/**
 * Validates an unknown payload into a ContactDetails object. Returns null
 * on any invalid or missing field.
 */
export function parseContactDetails(input: unknown): ContactDetails | null {
  if (input === null || typeof input !== "object") return null;
  const record = input as Record<string, unknown>;

  const name = shortText(record.name);
  const email = shortText(record.email);
  const phone = shortText(record.phone);

  if (!name || !email || !phone) return null;
  if (!email.includes("@")) return null;
  if (!isOneOf(record.contactMethod, CONTACT_METHOD_VALUES)) return null;

  return { name, email, phone, contactMethod: record.contactMethod };
}
