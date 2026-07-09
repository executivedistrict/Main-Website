// Site navigation config. Pure data, framework-agnostic (no React imports) so
// it stays in lib/. Flat nav per plan 005: three links plus a single
// "Book a Call" CTA.

export interface NavLeaf {
  label: string;
  href: string;
}

export interface NavCta {
  label: string;
  href: string;
}

export interface NavConfig {
  /** Left-aligned, immediately after the logo. */
  items: NavLeaf[];
  /** Right-aligned button. Always the booking call. */
  cta: NavCta;
}

export const navConfig: NavConfig = {
  items: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Results", href: "/results" },
  ],
  cta: { label: "Book a Call", href: "/book" },
};
