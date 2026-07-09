import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** Section background: white (default), mist gray, ice tint, or navy. */
  tone?: "white" | "mist" | "ice" | "navy";
};

const tones = {
  white: "bg-white",
  mist: "bg-mist",
  ice: "bg-ice",
  navy: "bg-navy",
};

/** Vertical page rhythm. Production sections alternate white / mist / navy. */
export function Section({ className, tone = "white", ...props }: SectionProps) {
  return (
    <section
      className={cn("px-5 py-16 sm:px-8 sm:py-24", tones[tone], className)}
      {...props}
    />
  );
}
