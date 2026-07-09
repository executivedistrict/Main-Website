# Open questions - 004 Jacob Concierge

Questions awaiting owner / stakeholder input. Kept in-plan so they don't get
lost in chat.

## 1. Jacob's conversational context contradicts the live site copy (owner to clarify)

Per the owner's direction, the `DEFAULT_CONTEXT` in
`docs/jacob-concierge-plugin-v2/server.js` ships VERBATIM even though it
disagrees with the site in several places. Jacob will say these things to
prospects, so the business owner needs to confirm or correct them:

| Context says | Live site says |
| --- | --- |
| "$480K profit increase in first year for a services firm" | $480K annual profit increase, roofing contractor, 6 months |
| "600% year-over-year revenue growth for a tech company" | 600% YOY assessment growth, health-tech platform |
| "$2.1M recurring revenue backlog built in 18 months" | $2.1M recurring contract backlog, utility services, 90 days |
| "29% increase in billable utilization across a consulting firm" | 29% increase in monthly billables, law firm, no added hours |
| Offers a fractional **CTO** | Site offers CFOs, COOs, CMOs, and legal counsel only (no CTO) |
| "Operators work inside the business 1-3 days per week" | Not stated anywhere on the site |
| Industries include healthcare, manufacturing | Site does not enumerate industries this way |

Once clarified, updating `src/lib/jacob/context.ts` is a one-file change.

## 2. Tavus credentials

`TAVUS_API_KEY`, `TAVUS_REPLICA_ID`, `TAVUS_PERSONA_ID` are needed for the
live end-to-end test and for production (set in `.env.local` and in the
hosting provider's env settings). Who supplies them, and is the replica the
same one used by the production widget?

## 3. Jacob beyond the hero (later)

Should Jacob also be reachable from other pages (e.g. the plugin's original
floating-button mode on `/how-we-work` or `/book`)? Out of scope for 004;
worth a follow-on decision after seeing hero engagement.
