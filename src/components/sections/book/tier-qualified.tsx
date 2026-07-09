"use client";

import { useEffect, useRef } from "react";
import { BookingCalendar } from "./booking-calendar";
import { tierCopy } from "./content";

/**
 * Tier 1 panel: brief confirmation, then the existing booking calendar.
 * This is the ONLY place the calendar renders inside the application flow.
 * Focus moves to the heading on reveal.
 */
export function TierQualified() {
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
      <BookingCalendar />
    </div>
  );
}
