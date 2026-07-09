import "server-only";

import type { QualificationAnswers } from "@/lib/qualification/types";

/**
 * Branded HTML template for the internal lead-notification emails
 * (plan 006). One layout, two uses: the application notification and the
 * tier-2 follow-up. Navy header with the two-line uppercase wordmark,
 * gold accent rule, white body with an answers table, slate footer.
 *
 * HEX EXCEPTION: email HTML cannot use the site's Tailwind tokens; inline
 * styles with literal hex values are required by mail clients. This file
 * is the ONE sanctioned exception to the no-hard-coded-colors rule. The
 * hexes mirror the brand tokens in `src/app/globals.css`:
 *   navy #0f1f3d, gold #c8973e, slate #2c3e5a.
 *
 * Every user-provided string MUST pass through `escapeHtml` before being
 * interpolated; a lead's answers must never inject markup.
 */

const NAVY = "#0f1f3d";
const GOLD = "#c8973e";
const SLATE = "#2c3e5a";
const FONT_STACK = "'Inter', Arial, Helvetica, sans-serif";

/** Escapes a string for safe interpolation into HTML text or attributes. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Human labels for the locked option values (kept in sync with types.ts). */
const OPTION_LABELS: Record<string, string> = {
  owner: "Yes, I'm the owner",
  partner: "No, I'm a partner or executive",
  researcher: "No, I'm researching for someone else",
  "under-2": "Under 2 years",
  "2-5": "2-5 years",
  "6-15": "6-15 years",
  "15-plus": "15+ years",
  solo: "Just me",
  "2-10": "2-10",
  "11-50": "11-50",
  "51-200": "51-200",
  "200-plus": "200+",
  grow: "Grow",
  stabilize: "Stabilize",
  sell: "Sell",
  transition: "Transition",
  unsure: "Not sure",
  "under-500k": "Under $500K",
  "500k-1m": "$500K-$1M",
  "1m-5m": "$1M-$5M",
  "5m-20m": "$5M-$20M",
  "20m-plus": "$20M+",
  undisclosed: "Prefer not to say",
  phone: "Phone",
  email: "Email",
  text: "Text",
};

/** Maps a locked option value to its human label (falls back to the raw value). */
export function optionLabel(value: string): string {
  return OPTION_LABELS[value] ?? value;
}

export interface LeadEmailRow {
  label: string;
  value: string;
}

/** The standard answers table shared by both email kinds. */
export function applicationRows(answers: QualificationAnswers): LeadEmailRow[] {
  return [
    { label: "Name", value: answers.name },
    { label: "Business", value: answers.businessName },
    { label: "Ownership", value: optionLabel(answers.ownership) },
    { label: "Industry", value: answers.industry },
    { label: "Years owned", value: optionLabel(answers.yearsOwned) },
    { label: "Employees", value: optionLabel(answers.employees) },
    { label: "Journey", value: optionLabel(answers.journey) },
    { label: "Email", value: answers.email },
    { label: "Phone", value: answers.phone },
    { label: "Preferred contact", value: optionLabel(answers.contactMethod) },
    { label: "Revenue range", value: optionLabel(answers.revenueRange) },
  ];
}

export interface LeadEmailContent {
  /** Heading inside the body, e.g. "New application" or "Lead follow-up". */
  title: string;
  /** Optional short line under the title (already-safe values only after escaping). */
  intro?: string;
  /** Label/value rows rendered as the answers table. Values are escaped here. */
  rows: LeadEmailRow[];
  /** Optional long-form block (the why-now answer or follow-up message). */
  blocks?: { label: string; text: string }[];
}

function renderRows(rows: LeadEmailRow[]): string {
  return rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:10px 16px 10px 0;font-family:${FONT_STACK};font-size:13px;color:${SLATE};text-transform:uppercase;letter-spacing:0.04em;vertical-align:top;white-space:nowrap;border-bottom:1px solid #e8e8e4;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;font-family:${FONT_STACK};font-size:15px;color:#1a1a1a;vertical-align:top;border-bottom:1px solid #e8e8e4;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");
}

function renderBlocks(blocks: { label: string; text: string }[]): string {
  return blocks
    .map(
      ({ label, text }) => `
      <p style="margin:24px 0 6px;font-family:${FONT_STACK};font-size:13px;color:${SLATE};text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(label)}</p>
      <p style="margin:0;padding:14px 16px;background-color:#f6f6f3;border-left:3px solid ${GOLD};font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:#1a1a1a;">${escapeHtml(text)}</p>`
    )
    .join("");
}

/** Renders the full branded email HTML document. */
export function renderLeadEmail(content: LeadEmailContent): string {
  const { title, intro, rows, blocks } = content;

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f0f0ec;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f0ec;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background-color:#ffffff;">
            <tr>
              <td style="background-color:${NAVY};padding:28px 32px 24px;">
                <p style="margin:0;font-family:${FONT_STACK};font-size:20px;font-weight:700;letter-spacing:0.28em;color:#ffffff;text-transform:uppercase;">EXECUTIVE</p>
                <p style="margin:2px 0 0;font-family:${FONT_STACK};font-size:20px;font-weight:700;letter-spacing:0.28em;color:#ffffff;text-transform:uppercase;">DISTRICT</p>
              </td>
            </tr>
            <tr>
              <td style="background-color:${GOLD};height:3px;line-height:3px;font-size:3px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 8px;font-family:${FONT_STACK};font-size:22px;font-weight:700;color:${NAVY};">${escapeHtml(title)}</h1>
                ${intro ? `<p style="margin:0 0 20px;font-family:${FONT_STACK};font-size:14px;color:${SLATE};">${escapeHtml(intro)}</p>` : ""}
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${renderRows(rows)}
                </table>
                ${blocks && blocks.length > 0 ? renderBlocks(blocks) : ""}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#f6f6f3;">
                <p style="margin:0;font-family:${FONT_STACK};font-size:12px;line-height:1.6;color:${SLATE};">Internal lead notification from the Executive District website. Answers are self-reported by the applicant.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
