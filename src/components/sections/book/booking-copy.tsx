import { Check } from "lucide-react";
import { bookingCopy, expectItems } from "./content";

/**
 * Left column of the booking section: label, headline, intro copy, and the
 * "What to expect" checklist.
 */
export function BookingCopy() {
  return (
    <div>
      <p className="eyebrow-label mb-5">{bookingCopy.label}</p>
      <h1 className="mb-6 text-[28px] font-bold leading-[1.15] sm:text-[clamp(32px,3.5vw,44px)]">
        Let&apos;s talk about what&apos;s really going on in <em>your business.</em>
      </h1>

      {bookingCopy.body.map((paragraph) => (
        <p key={paragraph} className="mb-4 text-base leading-[1.8] last-of-type:mb-0">
          {paragraph}
        </p>
      ))}

      <div className="mt-12 border-t border-line pt-10">
        <h3 className="mb-6 text-lg font-bold">What to expect</h3>
        <ul className="flex flex-col gap-4">
          {expectItems.map((item) => (
            <li key={item.lead} className="group flex items-start gap-3.5">
              <span className="mt-px flex h-7 w-7 min-w-7 items-center justify-center rounded-full border-2 border-blue bg-ice transition-colors duration-200 group-hover:bg-blue">
                <Check
                  aria-hidden
                  strokeWidth={2.5}
                  className="h-3 w-3 text-blue transition-colors duration-200 group-hover:text-white"
                />
              </span>
              <span className="text-[15px] leading-[1.6]">
                <strong className="text-navy">{item.lead}</strong> {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
