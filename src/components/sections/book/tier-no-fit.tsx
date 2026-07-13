"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";
import { tierCopy, type QualifyAnswers } from "./content";
import { LeadContactForm } from "./lead-contact-form";

/**
 * Tier 3 panel: a congratulatory off-ramp. No calendar, ever. The copy
 * still discourages proceeding, but an applicant who's genuinely stuck
 * can opt into the shared contact form (never the booking calendar) via
 * the low-key help button. Focus moves to the heading on reveal, and into
 * the form when it's opened.
 */
export function TierNoFit({ application }: { application: QualifyAnswers }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [showForm, setShowForm] = useState(false);

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

      <div className="mt-8 border-t border-line pt-8">
        <p className="mb-5 text-[15px] leading-[1.7] text-slate">
          {tierCopy.noFit.helpPrompt}
        </p>
        {showForm ? (
          <LeadContactForm
            application={application}
            tier="no-fit"
            messageLabel={tierCopy.noFit.messageLabel}
            confirmationHeading={tierCopy.noFit.confirmationHeading}
            confirmationBody={tierCopy.noFit.confirmationBody}
            focusMessageOnMount
          />
        ) : (
          <Button
            variant="outline"
            size="sm"
            type="button"
            aria-expanded={false}
            onClick={() => setShowForm(true)}
          >
            {tierCopy.noFit.helpButton}
          </Button>
        )}
      </div>
    </div>
  );
}
