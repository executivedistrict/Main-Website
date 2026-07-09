// Copy source: plans/005-site-simplification/copy-deck.md (owner-approved),
// "Book (/book)" section. Edit copy only against that deck.
// The qualification-application copy below (qualifyCopy, tierCopy, option
// labels) comes from plans/006-lead-qualification/phase-0-contracts.md
// (owner-approved) and is recorded as an amendment in the plan-005 deck.
// Option VALUES are locked to the qualification config's option keys
// (src/lib/qualification/config.ts); never change a value here without
// changing the config, and vice versa.
import { Check, Clock, Lock, Star, type LucideIcon } from "lucide-react";
import type {
  ContactMethod,
  Employees,
  Journey,
  Ownership,
  QualificationAnswers,
  RevenueRange,
  Tier,
  YearsOwned,
} from "@/lib/qualification/types";

/** The live GHL booking calendar embedded on the page. */
export const BOOKING_CALENDAR_URL =
  "https://api.carlewcapital.com/widget/booking/6vpS1kWXARTtCEQz5eLC";

export const bookingCopy = {
  label: "Start Here",
  body: [
    "This is a confidential, 30-minute conversation with a senior operator who has been where you are. No pitch. No contracts. No obligations.",
    "We'll listen, ask a few questions, and tell you honestly whether Executive District is the right fit for where your company is right now.",
  ],
} as const;

export type ExpectItem = {
  /** The bold navy lead-in. */
  lead: string;
  /** The rest of the sentence. */
  text: string;
};

export const expectItems: ExpectItem[] = [
  {
    lead: "A real conversation",
    text: "with a senior operator, not a business development rep.",
  },
  {
    lead: "An honest assessment",
    text: "of whether we're the right fit. If we're not, we'll say so.",
  },
  {
    lead: "Immediate clarity",
    text: "on your biggest leadership gaps and what's causing the pressure you're feeling.",
  },
  {
    lead: "Zero obligation, zero pressure,",
    text: "complete confidentiality. A conversation between peers.",
  },
];

export const calendarCard = {
  label: "Discovery Call",
  title: "Confidential Conversation · 30 min",
  footer:
    "This conversation is completely confidential. Nothing you share leaves this call.",
} as const;

export type TrustItem = {
  icon: LucideIcon;
  label: string;
  desc: string;
};

export const trustItems: TrustItem[] = [
  {
    icon: Clock,
    label: "30 Minutes",
    desc: "Focused, efficient, respectful of your time",
  },
  {
    icon: Lock,
    label: "Confidential",
    desc: "Nothing shared leaves the conversation",
  },
  {
    icon: Star,
    label: "Senior Operator",
    desc: "Not a salesperson. Not a junior rep.",
  },
  {
    icon: Check,
    label: "Zero Obligation",
    desc: "No pitch, no contracts, no pressure",
  },
];

export const reassurance =
  "If we're the right fit, you'll know. If we're not, you'll leave the call with more clarity than you had before it. Either way, the conversation costs you nothing.";

/* ------------------------------------------------------------------ */
/* Qualification application (plan 006)                               */
/* ------------------------------------------------------------------ */

/** A selectable option whose `value` matches a qualification-config key. */
export type Option<V extends string = string> = {
  value: V;
  label: string;
};

export const ownershipOptions = [
  { value: "owner", label: "Yes" },
  { value: "partner", label: "No, I'm a partner or executive" },
  { value: "researcher", label: "No, I'm researching for someone else" },
] as const satisfies readonly Option<Ownership>[];

export const yearsOwnedOptions = [
  { value: "under-2", label: "Under 2" },
  { value: "2-5", label: "2–5" },
  { value: "6-15", label: "6–15" },
  { value: "15-plus", label: "15+" },
] as const satisfies readonly Option<YearsOwned>[];

export const employeeOptions = [
  { value: "solo", label: "Just me" },
  { value: "2-10", label: "2–10" },
  { value: "11-50", label: "11–50" },
  { value: "51-200", label: "51–200" },
  { value: "200-plus", label: "200+" },
] as const satisfies readonly Option<Employees>[];

export const journeyOptions = [
  { value: "grow", label: "Grow" },
  { value: "stabilize", label: "Stabilize" },
  { value: "sell", label: "Sell" },
  { value: "transition", label: "Transition" },
  { value: "unsure", label: "Not sure" },
] as const satisfies readonly Option<Journey>[];

export const contactMethodOptions = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "text", label: "Text" },
] as const satisfies readonly Option<ContactMethod>[];

export const revenueRangeOptions = [
  { value: "under-500k", label: "Under $500K" },
  { value: "500k-1m", label: "$500K–$1M" },
  { value: "1m-5m", label: "$1M–$5M" },
  { value: "5m-20m", label: "$5M–$20M" },
  { value: "20m-plus", label: "$20M+" },
  { value: "undisclosed", label: "Prefer not to say" },
] as const satisfies readonly Option<RevenueRange>[];

export type OwnershipValue = Ownership;
export type YearsOwnedValue = YearsOwned;
export type EmployeesValue = Employees;
export type JourneyValue = Journey;
export type ContactMethodValue = ContactMethod;
export type RevenueRangeValue = RevenueRange;

/** The tier returned by POST /api/qualify (contract, plan 006 Phase 0). */
export type { Tier };

/**
 * The complete answer set POSTed to /api/qualify (minus the honeypot).
 * `revenueRange` is optional in the UI; an unanswered field is sent as
 * "undisclosed". Alias of the server-side QualificationAnswers so the
 * form and the API can never drift.
 */
export type QualifyAnswers = QualificationAnswers;

export const qualifyCopy = {
  /** Trust-first confidentiality beat shown above the fields on every step. */
  intro:
    "A confidential conversation starts with a few questions. We work with a limited number of owners, so we make sure every call is worth your time. Nothing you share leaves this conversation.",
  stepTitles: ["You + the business", "Where you are", "Contact"],
  fields: {
    name: { label: "Your name" },
    businessName: { label: "Business name" },
    ownership: { label: "Are you the owner?" },
    industry: { label: "What does the business do?" },
    yearsOwned: { label: "How long have you owned it?" },
    employees: { label: "Number of employees" },
    journey: { label: "Where are you in your journey?" },
    whyNow: {
      label: "What's prompting you to reach out now?",
      helper:
        "One or two sentences is plenty. This goes straight to the operator you'd meet.",
    },
    email: { label: "Email" },
    phone: { label: "Phone" },
    contactMethod: { label: "Preferred contact method" },
    revenueRange: {
      label: "Annual revenue range",
      helper:
        "Optional. A range is all we need, so we can match you to the right operator.",
      placeholder: "Select a range",
    },
  },
  buttons: {
    back: "Back",
    next: "Continue",
    submit: "Submit application",
    submitting: "Submitting…",
  },
  errors: {
    required: "Please fill this in.",
    requiredChoice: "Please choose an option.",
    email: "Enter a valid email address.",
    generic:
      "Something went wrong on our end. Your answers are still here, so please try again.",
    rateLimited:
      "Too many attempts in a short window. Give it a minute and try again.",
  },
} as const;

export const tierCopy = {
  qualified: {
    heading: "You're a fit. Pick a time.",
    body: "Choose a time below for a confidential, 30-minute conversation with a senior operator.",
  },
  borderline: {
    heading: "You're a fit for a conversation.",
    body: "A senior operator will reach out personally within one business day to find a time.",
    messageLabel: "Anything you want them to know first?",
    preferredTimesLabel: "Preferred times to reach you (optional)",
    messageRequired: "Please add a short message.",
    submit: "Send",
    sending: "Sending…",
    error:
      "Your message didn't go through. Nothing was lost, so please try again.",
    confirmationHeading: "Message sent.",
    confirmationBody:
      "A senior operator will reach out personally within one business day.",
  },
  noFit: {
    heading: "Based on your answers, we're probably not the right partner right now.",
    body: "We embed senior operators in established businesses, and we'd be wasting your time to pretend otherwise. If your situation changes, we'll be here.",
  },
} as const;
