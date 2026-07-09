import Image from "next/image";

import { Eyebrow } from "@/components/ui";
import { founder } from "./content";

/** Founding Operator feature: square photo with gold accent bar, single bio paragraph. */
export function FounderFeature() {
  return (
    <section className="border-b border-line bg-white px-5 py-14 sm:px-8 sm:py-[100px]">
      <div className="mx-auto grid max-w-[1200px] items-start gap-8 lg:grid-cols-[340px_1fr] lg:gap-16">
        <div className="group relative mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none">
          <Image
            src={founder.image}
            alt={founder.name}
            width={680}
            height={680}
            sizes="(max-width: 1024px) 280px, 340px"
            className="aspect-square w-full rounded-sm object-cover grayscale contrast-105 transition-[filter] duration-400 group-hover:grayscale-60"
          />
          <div aria-hidden className="absolute -bottom-2 left-0 h-1 w-[60px] bg-gold" />
        </div>
        <div>
          <Eyebrow className="mb-3 tracking-[3px]">{founder.label}</Eyebrow>
          <h2 className="text-[28px] font-bold text-navy sm:text-[32px]">
            {founder.name}
          </h2>
          <div className="mb-7 mt-1 text-base font-medium text-blue">
            {founder.title}
          </div>
          <p className="text-base leading-[1.8] text-charcoal">{founder.bio}</p>
        </div>
      </div>
    </section>
  );
}
