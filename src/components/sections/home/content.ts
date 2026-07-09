// Home page copy, reproduced verbatim from the owner-approved plan-005 copy
// deck (plans/005-site-simplification/copy-deck.md), which supersedes the
// production snapshot. The deck is law: do not reword. Straight quotes inside
// the copy strings are intentional; the copy contains no em dashes.

/** Headline split around the single Lora-italic `<em>` accent. */
export type EmHeadline = {
  pre: string;
  em: string;
  post: string;
};

export const heroContent = {
  headline: {
    pre: "Building a company is hard. Building it ",
    em: "alone",
    post: " is harder.",
  } satisfies EmHeadline,
  sub: "We're fractional C-suite operators for founders and owners running $500K–$50M businesses. We don't advise from the outside. We embed inside your company, own outcomes, and share the weight.",
  cta: "Book a Confidential Discovery Call",
};

// New writing (not part of the 1:1 production copy): the Jacob AI concierge
// card that replaced the hero photo, an owner-approved deviation
// (plans/004-jacob-concierge/). Brand voice, no em-dashes.
export const jacobCard = {
  heading: "AI Concierge",
  subline:
    "Have a question first? Jacob can walk you through how we work, live.",
  buttonLabel: "Talk with Jacob",
};

export type ProofItem = {
  pre?: string;
  strong: string;
  post: string;
};

export const proofItems: ProofItem[] = [
  { strong: "75+", post: " companies served" },
  { strong: "$500K–$50M", post: " revenue range" },
  { pre: "Fractional ", strong: "CFOs, COOs, CMOs", post: " & Legal Counsel" },
];

export type Pain = {
  id: string;
  number: string;
  label: string;
  headline: EmHeadline;
  paragraph: string;
  callout: string;
};

export const pains: Pain[] = [
  {
    id: "pain1",
    number: "01",
    label: "The Money Problem",
    headline: {
      pre: '"Revenue is up. So why isn\'t there any ',
      em: "money?",
      post: '"',
    },
    paragraph:
      "Revenue is climbing, but profit doesn't follow and cash flow makes no sense. That's not a revenue problem. The business has outgrown its systems, and nobody has built the financial visibility you need to make confident decisions. We sit inside your business and build it.",
    callout:
      "We don't just read your financials. We engineer how money moves through your business so that growth and profit are the same story.",
  },
  {
    id: "pain2",
    number: "02",
    label: "The Partner Problem",
    headline: {
      pre: '"I have a team. But I don\'t have a ',
      em: "partner.",
      post: '"',
    },
    paragraph:
      "Nobody in your world sees the whole picture: the cash reality, the people dynamics, the tradeoffs you weigh every week. You've tried coaches, masterminds, maybe an expensive hire who didn't last a year. The problem was never the advice. It was the model. You need someone at your table who owns the outcome with you.",
    callout:
      "We don't keep three-dozen clients on speed dial. We sit inside your business, learn your team, and operate like the partner you've been missing.",
  },
  {
    id: "pain3",
    number: "03",
    label: "The Direction Problem",
    headline: {
      pre: '"I don\'t know if I should scale, sell, or just ',
      em: "survive.",
      post: '"',
    },
    paragraph:
      "Maybe the business is worth something and you want to know what. Maybe you're just tired, and another ten years feels like a sentence, not a choice. Selling, succession, stepping back: these questions cut across operations, finance, and legacy, and no single hire can answer them.",
    callout:
      "We help you answer the only question that matters: What do you actually want? Then we build the plan and execute it alongside you.",
  },
];

export const connectedContent = {
  title: "These three problems are connected. So is the solution.",
  paragraph:
    "They're symptoms of one structural gap: the company has outgrown your capacity to lead it alone. Everything you've tried was designed to advise you, not to sit beside you and do the work. Executive District closes that gap by embedding proven operators (fractional CFOs, COOs, CMOs, and legal counsel) who sit at your leadership table and own outcomes with you.",
};

export type CapabilityCard = {
  headline: EmHeadline;
  body: string;
};

/** The one non-duplicate idea merged from the removed How We Work page. */
export const capabilitiesContent = {
  header: {
    title: "One model. Three capabilities.",
    sub: "Everything a business needs to grow, stabilize, or exit, under one roof.",
  },
  cards: [
    {
      headline: {
        pre: "Your leadership team, built around your ",
        em: "stage.",
        post: "",
      },
      body: "You've outgrown the founder-does-everything model but can't yet justify a full-time executive team. We embed fractional executives who work as if they're on staff: a CFO for financial clarity and cash flow, a COO for operational accountability, a CMO for revenue systems, and general counsel for M&A, governance, and risk.",
    },
    {
      headline: {
        pre: "You only sell your business ",
        em: "once.",
        post: "",
      },
      body: "Most owners wait for a buyer, then scramble. We build exit readiness into how the company runs: stronger EBITDA, a leadership structure that works without you, less owner dependency, and a clear read on what buyers actually evaluate. Six months out or six years, you won't negotiate from weakness.",
    },
    {
      headline: {
        pre: "Growth without systems is ",
        em: "expensive motion.",
        post: "",
      },
      body: "We build revenue engines, not campaigns: lead generation systems, sales process and compensation design, pricing, and attribution dashboards that connect marketing spend to revenue. Infrastructure your team can run without you, built to compound over time instead of expiring when the campaign ends.",
    },
  ] satisfies CapabilityCard[],
};

export type ProcessStep = {
  num: string;
  title: string;
  desc: string;
};

export const processContent = {
  title: "The engagement is simple. The impact isn't.",
  sub: "Here's what happens when you reach out.",
  steps: [
    {
      num: "01",
      title: "Confidential Conversation",
      desc: "A 30-minute call with a senior operator. No pitch. No pressure. We listen and tell you honestly whether this is the right fit.",
    },
    {
      num: "02",
      title: "Diagnostic Deep-Dive",
      desc: "We assess the business across five pillars: financial clarity, operational systems, revenue infrastructure, leadership capacity, and strategic direction.",
    },
    {
      num: "03",
      title: "Operator Match & Embed",
      desc: "We match you with the right fractional executive, who embeds inside your business and owns outcomes from day one.",
    },
    {
      num: "04",
      title: "Results & Evolve",
      desc: "Monthly accountability cycles. Measurable outcomes. As your business evolves, so does the engagement.",
    },
  ] satisfies ProcessStep[],
};

export type Metric = {
  value: string;
  label: string;
  context: string;
};

export const metrics: Metric[] = [
  {
    value: "$480K",
    label: "Annual profit increase",
    context: "Roofing contractor · 6 months",
  },
  {
    value: "600%",
    label: "YOY assessment growth",
    context: "Health-tech platform",
  },
  {
    value: "29%",
    label: "Increase in monthly billables",
    context: "Law firm · no added hours",
  },
  {
    value: "$2.1M",
    label: "Recurring contract backlog",
    context: "Utility services · 90 days",
  },
];

/** Claims-policy footnote rendered under the metrics band. */
export const metricsFootnote =
  "Self-reported results from anonymized engagements.";

export const ctaCloseContent = {
  headline: {
    pre: "You've carried this long enough. ",
    em: "Let's carry it together.",
    post: "",
  } satisfies EmHeadline,
  paragraphs: [
    "Carrying this alone costs you something: profit you can't see, decisions made without the right data, and years spent running a business that was supposed to serve you.",
    "The conversation is confidential, takes thirty minutes, and is with an operator who has been where you are, not a salesperson reading a script.",
  ],
  cta: "Book a Confidential Discovery Call",
  expectTitle: "What to expect",
  expectItems: [
    "A real conversation, not a sales script",
    "An honest assessment of whether we're the right fit",
    "Immediate clarity on your biggest leadership gaps",
    "Zero obligation, zero pressure, complete confidentiality",
  ],
};
