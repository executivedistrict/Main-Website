# Open questions - 006 Lead Qualification

## Resolved (owner, 2026-07-09)

1. **Entry point**: gate `/book` itself (recommended default accepted).
2. **Email routing**: tier-2 contact-form submissions ONLY. No emails for
   plain applications (any tier), and no confirmation emails to leads.
   Accepted tradeoff: turned-away leads leave no record for tuning the
   config later; GHL's own booking notifications cover tier 1. Revisit by
   flipping one flag if filtering ever needs auditing.
3. **Persistence**: none beyond the tier-2 email. Supabase is offloaded
   and unused; plan 003 retired as obsolete.
4. **Tier-3 off-ramp**: respectful message only.
5. **Resend/DNS**: owner controls DNS and will add the verification
   records; assume Resend is good to go.

## Resolved (owner, 2026-07-09, second pass)

6. **Tier 1/3 visibility**: instead of a database, an internal contact
   defined in `config.ts` (`notifications.internalContact`) is emailed
   for EVERY submission, all tiers, via Resend. All emails (internal
   notification + tier-2 follow-up) use the branded site template. Still
   no confirmation emails to leads.
7. **Copy + calibration**: approved as drafted ("go ahead and implement").
8. **Resend key**: owner adds `RESEND_API_KEY` later; build proceeds now,
   live-send test deferred until the key lands.

## Still open

1. ~~`RESEND_API_KEY` + `LEAD_FROM_EMAIL`~~ Resolved 2026-07-09: owner
   added `RESEND_API_KEY`; the FROM address is hard-coded per owner
   decision as `Website <notifications@workwithcoba.com>` in
   `src/lib/email/resend.ts` (no env var).
2. **Confirm the internal contact address** to ship in `config.ts`
   (drafted as `Hello@executivedistrict.com`; one-line edit to change).
3. **Old GHL calendar link** - after launch, regenerate/disable the
   calendar's public URL in HighLevel so the tier-1 embed is the only
   working path (recommended; owner action in GHL).
