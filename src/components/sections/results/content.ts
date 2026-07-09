/**
 * Copy and case-study data for the /results page, sourced verbatim from the
 * approved plan-005 copy deck (plans/005-site-simplification/copy-deck.md).
 */

export type AggregateMetric = {
  value: string;
  label: string;
};

export type CaseStudyResult = {
  value: string;
  label: string;
  /** Optional gold context line under the label. */
  context?: string;
};

export type CaseStudy = {
  /** Oversized serif index, e.g. "01". */
  number: string;
  /** Gold uppercase industry label. */
  industry: string;
  title: string;
  /** Single-paragraph engagement summary. */
  summary: string;
  results: CaseStudyResult[];
  /** Section background, matching the production alternation. */
  tone: "white" | "mist";
};

export const hero = {
  label: "Proof",
  sub: "Every engagement is measured by what changes inside the business: the financials, the operations, the owner's quality of life.",
  disclaimer:
    "Results below are self-reported from anonymized client engagements and are not independently verified.",
};

export const aggregateMetrics: AggregateMetric[] = [
  { value: "$480K", label: "Annual profit increase in 6 months" },
  { value: "600%", label: "Year-over-year assessment growth" },
  { value: "$2.1M", label: "Recurring contract backlog in 90 days" },
  { value: "4.5x", label: "LTV:CAC ratio optimized" },
];

export const caseStudies: CaseStudy[] = [
  {
    number: "01",
    industry: "Residential & Commercial Roofing",
    title: "Regional Roofing Contractor",
    summary:
      "A regional contractor with volatile cash flow, poor job costing, and profit tied to storm season. We installed job costing with a 15% EBITDA floor, capacity-based revenue forecasting, gross-profit sales compensation, and a framework for expansion into three adjacent counties.",
    results: [
      {
        value: "7% → 19%",
        label: "EBITDA improvement",
        context: "$480K annual profit increase",
      },
      { value: "-22%", label: "Crew overtime labor costs reduced" },
      { value: "+31%", label: "Close rate improvement" },
      { value: "$1.2M", label: "First-year projected revenue lift" },
    ],
    tone: "mist",
  },
  {
    number: "02",
    industry: "Estate Planning & Probate Legal Services",
    title: "Estate Planning Law Firm",
    summary:
      "A high-trust law firm bottlenecked by founder-dependent workflows and administrative overload. We built an accountability chart, a full client journey with document automation and billing triggers, and an SOP system across estate, probate, and trust work.",
    results: [
      { value: "23 → 11 days", label: "Average processing time reduced" },
      {
        value: "+29%",
        label: "Monthly billables increased",
        context: "Without adding attorney hours",
      },
      { value: "-32%", label: "Founder workload reduced" },
      { value: "3 counties", label: "Growth expansion framework launched" },
    ],
    tone: "white",
  },
  {
    number: "03",
    industry: "Telehealth / Digital Mental Health",
    title: "National Health-Tech Platform",
    summary:
      "A fast-scaling telehealth provider strained by surging demand: fluctuating turnaround times, rising ad costs, inconsistent onboarding. We matched scheduling to clinician capacity, installed a full-funnel performance dashboard, and built a scalability framework covering all 50 states.",
    results: [
      { value: "600%", label: "Assessment throughput YOY growth" },
      { value: "4.5x", label: "LTV:CAC ratio optimized" },
      { value: "9 mo → 3 days", label: "Patient wait time reduced" },
      { value: "$20M", label: "Annualized revenue pipeline" },
    ],
    tone: "white",
  },
  {
    number: "04",
    industry: "Utility Infrastructure & Energy Services",
    title: "Private Utility Services Company",
    summary:
      "A new utility services division with unstructured bidding and heavy equipment costs, struggling to win municipal work. We built a bid pricing model, a municipal contracting readiness package, and a capital equipment ROI model.",
    results: [
      {
        value: "$2.1M",
        label: "Recurring backlog secured",
        context: "3 multi-year municipal contracts",
      },
      {
        value: "18% → 42%",
        label: "Bid-win conversion rate",
        context: "In 90 days",
      },
      { value: "-27%", label: "Equipment downtime costs reduced" },
      { value: "-33%", label: "Fuel cost inefficiencies eliminated" },
    ],
    tone: "mist",
  },
];

export const closingCta = {
  body: "A confidential call with a senior operator. Thirty minutes. No pitch. Just a real conversation about where your business is.",
  buttonLabel: "Book a Confidential Discovery Call",
  buttonHref: "/book",
};
