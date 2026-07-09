import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold leading-none cursor-pointer transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none";

const variants: Record<Variant, string> = {
  // Blue is the primary action color everywhere on the site.
  primary: "bg-blue text-white hover:bg-blue-deep",
  // Gold buttons appear only on navy CTA bands.
  gold: "bg-gold text-navy hover:brightness-110",
  outline: "border border-line text-slate hover:border-slate hover:text-navy",
  ghost: "px-2 text-slate hover:text-navy hover:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "px-[22px] py-[10px] text-[13px] tracking-[0.5px]",
  md: "px-9 py-4 text-[15px] tracking-[0.3px]",
  lg: "px-11 py-[18px] text-base tracking-[0.3px]",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** When set, the button renders as an anchor. */
  href?: string;
};

/**
 * Presentational button. Renders an `<a>` when `href` is provided,
 * otherwise a `<button type="button">`. Server-component safe.
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  type,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant !== "ghost" && sizes[size],
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return <button type={type ?? "button"} className={classes} {...props} />;
}
