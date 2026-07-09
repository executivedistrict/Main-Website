"use client";

import { useState } from "react";
import Image from "next/image";

import { Eyebrow } from "@/components/ui";
import { JacobDialog } from "./jacob-dialog";

type JacobHeroCardProps = {
  /** Eyebrow label above the invitation line. */
  heading?: string;
  /** One-line invitation under the eyebrow. */
  subline?: string;
  /** Action label shown on the card. */
  buttonLabel?: string;
};

/**
 * Hero centerpiece for the Jacob AI concierge: Jacob's circular portrait
 * floating above a card that carries the live chip, invitation, and CTA.
 * The whole stack is a single button: clicking it opens JacobDialog, which
 * creates the Tavus session. Copy arrives via props (the home hero passes
 * it from content.ts); the defaults let the component preview standalone.
 */
export function JacobHeroCard({
  heading = "AI Concierge",
  subline = "Have a question first? Jacob can walk you through how we work, live.",
  buttonLabel = "Talk with Jacob",
}: JacobHeroCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${buttonLabel}: start a live video conversation with Executive District's AI concierge`}
        className="group flex w-full cursor-pointer flex-col items-center rounded-md focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        {/* Circular portrait, overlapping the card below. */}
        <span className="relative z-10 -mb-16 block size-40 overflow-hidden rounded-full border-4 border-white bg-ice shadow-e2 transition-shadow duration-300 ease-out group-hover:shadow-e3 sm:size-48">
          <Image
            src="/images/ai-jacob.jpg"
            alt="Jacob, Executive District AI concierge"
            width={800}
            height={800}
            priority
            sizes="192px"
            className="size-full object-cover"
          />
        </span>

        {/* Card with the chip, invitation, and CTA. */}
        <span className="relative flex w-full max-w-[440px] flex-col items-center gap-4 rounded-md border border-line bg-white px-6 pt-20 pb-7 text-center shadow-e1 transition-[border-color,box-shadow] duration-300 ease-out after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-b-md after:bg-gold after:content-[''] group-hover:border-gold group-hover:shadow-e2 sm:px-8 sm:pt-[88px]">
          <span className="flex items-center gap-2 rounded-full bg-ice px-3.5 py-1.5">
            <span
              aria-hidden="true"
              className="size-2 animate-pulse rounded-full bg-gold"
            />
            <Eyebrow className="text-[10px] tracking-[3px]">{heading}</Eyebrow>
          </span>

          <span className="text-[15px] leading-[1.6] text-charcoal sm:text-base">
            {subline}
          </span>

          <span className="mt-1 inline-flex items-center justify-center rounded-sm bg-blue px-7 py-3.5 text-sm font-semibold tracking-[0.3px] text-white transition-colors duration-300 group-hover:bg-blue-deep sm:text-[15px]">
            {buttonLabel}
          </span>
        </span>
      </button>

      <JacobDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
