"use client";

import { useEffect, useRef } from "react";
import { tierCopy } from "./content";

/**
 * Tier 3 panel: the respectful off-ramp. Copy only, by design: no calendar,
 * no form, no links. Focus moves to the heading on reveal.
 */
export function TierNoFit() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="rounded-none border-line bg-mist px-5 py-10 sm:rounded-md sm:border sm:px-8">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mb-3 text-2xl font-bold leading-[1.3] text-navy focus-visible:outline-none"
      >
        {tierCopy.noFit.heading}
      </h2>
      <p className="text-[15px] leading-[1.7] text-slate">{tierCopy.noFit.body}</p>
    </div>
  );
}
