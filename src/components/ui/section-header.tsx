import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

type SectionHeaderProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Optional gold overline. */
  eyebrow?: string;
  /** The headline. May contain an `<em>` for the Lora italic accent. */
  title: React.ReactNode;
  /** Optional supporting line. */
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Set when rendering on a navy surface. */
  onNavy?: boolean;
};

/**
 * Recurring header pattern: optional gold eyebrow, a display-m headline,
 * and an optional supporting line.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  onNavy = false,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-[640px]",
        align === "center" && "mx-auto max-w-[720px] text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <h2 className={cn("display-m text-balance", onNavy && "text-white")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-[17px] leading-relaxed", onNavy ? "text-frost-soft" : "text-slate")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
