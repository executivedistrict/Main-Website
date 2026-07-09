import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Operator } from "./content";

/**
 * Subtle color-coding per function area so the field chips can be told
 * apart at a glance. Tint backgrounds with AA-passing text colors; new
 * fields fall back to the neutral chip.
 */
const FIELD_CHIPS: Record<string, string> = {
  "Financial Leadership": "bg-blue/10 text-blue-deep",
  "Operational Leadership": "bg-navy/10 text-navy",
  "Revenue & Growth": "bg-gold/15 text-gold-deep",
  "M&A Advisory & Exit Strategy": "bg-sage/10 text-sage",
  "Legal Operations & Corporate Strategy": "bg-plum/10 text-plum",
  "Operations Support": "bg-charcoal/8 text-slate",
};

/**
 * Team member card: circular grayscale headshot over the field tag, name,
 * role, and a short bio. Vertical and centered so cards tile evenly in the
 * bench grid at any column count.
 */
export function OperatorCard({ operator }: { operator: Operator }) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative shrink-0 overflow-hidden rounded-full border-2 border-line transition-colors duration-300 group-hover:border-gold">
        <Image
          src={operator.image}
          alt={operator.name}
          width={200}
          height={200}
          sizes="100px"
          className="size-[100px] object-cover grayscale contrast-105 transition-[filter] duration-400 group-hover:grayscale-60"
        />
      </div>
      <div
        className={cn(
          "mt-5 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold tracking-[1.5px] uppercase",
          FIELD_CHIPS[operator.field] ?? "bg-mist text-slate",
        )}
      >
        {operator.field}
      </div>
      <div className="mt-2 text-lg font-bold text-navy">{operator.name}</div>
      <div className="mt-0.5 text-[13px] font-semibold text-blue">
        {operator.role}
      </div>
      <p className="mt-3 text-sm leading-[1.7] text-charcoal">
        {operator.bio}
      </p>
    </div>
  );
}
