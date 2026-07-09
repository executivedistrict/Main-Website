import { cn } from "@/lib/utils";

/** Centered content column. Max-width 1200px, matching the production grid. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px]", className)} {...props} />
  );
}
