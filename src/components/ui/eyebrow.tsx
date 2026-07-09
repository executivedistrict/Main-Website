import { cn } from "@/lib/utils";

/**
 * Small uppercase gold overline that labels a section
 * ("The Team", "Client Results"). Works on light and navy surfaces.
 */
export function Eyebrow({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("eyebrow-label inline-block", className)} {...props} />;
}
