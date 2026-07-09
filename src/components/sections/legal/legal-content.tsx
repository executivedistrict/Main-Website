import { cn } from "@/lib/utils";

/**
 * The legal prose column: max-w 800px, centered, with the production
 * typography applied to plain semantic children (h2/h3/p/ul/li/a) via
 * direct-child selectors, so page copy stays as plain HTML. Callout
 * paragraphs are direct children of `LegalCallout`, not of this wrapper,
 * so they keep their own styling.
 */
export function LegalContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[800px] px-5 py-10 sm:px-8 sm:pb-[100px] sm:pt-16",
        // h2 - numbered section headings
        "[&>h2]:mb-4 [&>h2]:mt-12 [&>h2]:text-[22px] [&>h2]:font-bold [&>h2]:leading-[1.3]",
        // h3 - subheadings
        "[&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:text-[17px] [&>h3]:font-semibold [&>h3]:text-slate",
        // body copy
        "[&>p]:mb-4 [&>p]:text-[15px] [&>p]:leading-[1.8]",
        "[&>ul]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc",
        "[&>ul>li]:mb-2 [&>ul>li]:text-[15px] [&>ul>li]:leading-[1.8]",
        // links anywhere in the column
        "[&_a]:text-blue [&_a:hover]:underline",
        className,
      )}
      {...props}
    />
  );
}

/** The short gold rule between legal sections. */
export function LegalDivider() {
  return <hr className="my-12 h-[3px] w-[60px] border-0 bg-gold" />;
}

/** Ice callout box with the blue left rule, for plain-language summaries. */
export function LegalCallout({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "my-6 rounded-r-sm border-l-4 border-blue bg-ice px-4 py-5 sm:px-6",
        "[&>p]:text-sm [&>p]:leading-[1.7] [&>p]:text-slate",
        className,
      )}
      {...props}
    />
  );
}
