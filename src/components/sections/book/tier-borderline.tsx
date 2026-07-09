"use client";

import { useEffect, useRef } from "react";
import { tierCopy, type QualifyAnswers } from "./content";
import { LeadContactForm } from "./lead-contact-form";

/**
 * Tier 2 panel: the personal-follow-up promise plus the shared contact
 * form (message + contact details; the scored application collects none).
 * Focus moves to the heading on reveal.
 */
export function TierBorderline({ application }: { application: QualifyAnswers }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="rounded-none border-line bg-mist px-5 py-10 sm:rounded-md sm:border sm:px-8">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mb-2 text-2xl font-bold text-navy focus-visible:outline-none"
      >
        {tierCopy.borderline.heading}
      </h2>
      <p className="mb-8 text-[15px] leading-[1.7] text-slate">
        {tierCopy.borderline.body}
      </p>

      <LeadContactForm
        application={application}
        tier="borderline"
        messageLabel={tierCopy.borderline.messageLabel}
        confirmationHeading={tierCopy.borderline.confirmationHeading}
        confirmationBody={tierCopy.borderline.confirmationBody}
      />
    </div>
  );
}
