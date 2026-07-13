"use client";

import { useEffect, useRef } from "react";
import { BookingCalendar } from "./booking-calendar";
import {
  employeeOptions,
  journeyOptions,
  ownershipOptions,
  revenueRangeOptions,
  tierCopy,
  yearsOwnedOptions,
  type Option,
  type QualifyAnswers,
} from "./content";

/** Human label for a locked option value (falls back to the raw value). */
function label<V extends string>(
  options: readonly Option<V>[],
  value: V,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

/**
 * Business context injected into the booking iframe as query parameters.
 * The GHL widget prefills any form field whose key matches a parameter
 * name, so these keys must match the custom-field keys on the calendar's
 * form in GHL (unknown parameters are ignored harmlessly until the
 * matching fields exist). Values are human-readable labels, never our
 * internal option values. No personal contact details: the lead types
 * name/email/phone into the calendar themselves.
 */
function calendarPrefill(application: QualifyAnswers): Record<string, string> {
  const prefill: Record<string, string> = {
    business_name: application.businessName,
    ownership: label(ownershipOptions, application.ownership),
    industry: application.industry,
    years_owned: label(yearsOwnedOptions, application.yearsOwned),
    employees: label(employeeOptions, application.employees),
    journey: label(journeyOptions, application.journey),
    why_now: application.whyNow,
  };
  if (application.revenueRange !== "undisclosed") {
    prefill.revenue_range = label(revenueRangeOptions, application.revenueRange);
  }
  return prefill;
}

/**
 * Tier 1 panel: brief confirmation, then the existing booking calendar
 * with the application's business context injected as prefill params.
 * This is the ONLY place the calendar renders inside the application flow.
 * Focus moves to the heading on reveal.
 */
export function TierQualified({ application }: { application: QualifyAnswers }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mb-2 text-2xl font-bold text-navy focus-visible:outline-none"
      >
        {tierCopy.qualified.heading}
      </h2>
      <p className="mb-8 text-[15px] leading-[1.7] text-slate">
        {tierCopy.qualified.body}
      </p>
      <BookingCalendar prefill={calendarPrefill(application)} />
    </div>
  );
}
