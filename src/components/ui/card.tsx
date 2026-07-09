import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  /** Gold top rule, for the one card that stands apart. */
  featured?: boolean;
};

/** Surface container - white card with a hairline border and soft lift. */
export function Card({ className, featured = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 rounded-md border border-line bg-white p-8 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-e2",
        featured &&
          "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-md before:bg-gold before:content-['']",
        className,
      )}
      {...props}
    />
  );
}

/** Card heading, used inside `<Card>`. */
export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn("text-xl font-bold text-navy", className)} {...props} />
  );
}
