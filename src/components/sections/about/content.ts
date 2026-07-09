/**
 * Copy and roster data for the /about (Our Team) page. Copy follows the
 * owner-approved plan-005 copy deck
 * (plans/complete/005-site-simplification/copy-deck.md); the bench bios
 * were shortened further by owner request (see the deck's Amendments
 * section). The founder bio is unchanged from the deck.
 */

export type Operator = {
  name: string;
  role: string;
  /** Function area shown as the card's gold tag (replaces the old group bands). */
  field: string;
  bio: string;
  /** Path under /public, e.g. /images/team/ben-ipema.png */
  image: string;
};

export const hero = {
  label: "The Team",
  sub: "Executive District is a bench of proven operators: people who've made payroll, built teams, scaled companies, and navigated exits. P&L responsibility in their background, not just a certificate on the wall.",
};

export const founder = {
  label: "Founding Operator",
  name: "Zach Booker",
  title: "Founder & CEO",
  image: "/images/team/zach-booker.png",
  bio: "Zach has spent 25 years leading more than 75 companies. He founded ADHD Online / Mentavi Health and built it into one of the nation's fastest-growing health-tech companies. He's lived the 100-hour weeks, took a 90-day sabbatical in 2023 when the weight became unsustainable, and came back with one mission: helping founders build companies without losing themselves. His faith and his commitment to serve drive the work.",
};

export const benchIntro = {
  title: "The Senior Operator Bench",
  sub: "Every operator here has built, scaled, or exited a real business. You're matched by gap, industry, and stage.",
};

export const bench: Operator[] = [
  {
    name: "Ben Ipema",
    role: "Fractional CFO",
    field: "Financial Leadership",
    image: "/images/team/ben-ipema.png",
    bio: "Licensed CPA and MBA with 20+ years of finance leadership. Led exits in SaaS and technology services, guided multiple acquisitions, and brings financial clarity to companies from early stage to $30M+.",
  },
  {
    name: "Philip Johnson",
    role: "Fractional COO",
    field: "Operational Leadership",
    image: "/images/team/philip-johnson.png",
    bio: "Phil has led companies through the messy middle across hospitality, real estate development, renewable energy, and global sourcing: ground-up resort development, hospitality exits, and multi-property portfolios. Boardroom strategy, ground-level execution.",
  },
  {
    name: "Michael Davis",
    role: "Fractional COO",
    field: "Operational Leadership",
    image: "/images/team/michael-davis.png",
    bio: "Michael built an appliance side hustle into a multi-channel retail and e-commerce business with 75,000+ square feet and a team of 25, then exited. He builds operating infrastructure that scales without burnout.",
  },
  {
    name: "Andy Straub",
    role: "Fractional Operator & Business Advisor",
    field: "Operational Leadership",
    image: "/images/team/andy-straub.png",
    bio: "Andy launched his first business at 24 and has started, operated, and sold multiple companies since, while building one of West Michigan's top real estate track records. He builds systems and develops people.",
  },
  {
    name: "Mike King",
    role: "Fractional CMO",
    field: "Revenue & Growth",
    image: "/images/team/mike-king.png",
    bio: "Mike scaled 10X Health's paid advertising to $1 million in weekly revenue and cut acquisition costs 42% for Grant Cardone's business line. He builds $1M+ monthly revenue engines for 7- to 9-figure brands.",
  },
  {
    name: "Mya Stone",
    role: "Fractional M&A Advisor",
    field: "M&A Advisory & Exit Strategy",
    image: "/images/team/mya-stone.png",
    bio: "Mya founded, scaled, and exited two companies before moving into investment banking and founding Stone Capital Partners. Harvard MBA. She helps owners protect performance through growth, diligence, and transition.",
  },
  {
    name: "Andrew Longcore",
    role: "Fractional General Counsel",
    field: "Legal Operations & Corporate Strategy",
    image: "/images/team/andrew-longcore.png",
    bio: "Andrew advises lower-middle-market companies where legal decisions directly affect enterprise value: 16+ years as lead counsel on more than 100 M&A transactions and Outside General Counsel to operating businesses.",
  },
  {
    name: "Jacob Mirandette",
    role: "Operations Coordinator",
    field: "Operations Support",
    image: "/images/team/jacob-mirandette.png",
    bio: "Jacob works alongside our senior operators and founder teams to turn complexity into clarity, building disciplined systems across organizational restructuring and administrative operations so the senior team can focus on what matters most.",
  },
];

export const positioning =
  "Our operators have built something real. They've made payroll. They've sat in the chair you're sitting in. And they're invested in your outcomes, not advising from the outside.";

export const cta = {
  body: "A confidential call with a senior operator. Thirty minutes. No pitch.",
  button: "Book a Confidential Discovery Call",
  href: "/book",
};
