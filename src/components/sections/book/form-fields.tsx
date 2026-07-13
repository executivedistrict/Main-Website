import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Option } from "./content";

/**
 * Shared field building blocks for the /book forms (the qualification
 * application and the post-tier contact form). Client-only by usage:
 * every prop set includes handlers, so these render inside client
 * components. Ids follow the `qf-<field>` scheme; the two forms never
 * mount at the same time, so ids cannot collide.
 */

export const inputClasses =
  "w-full rounded-sm border border-line bg-white px-4 py-3 text-[15px] text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-1";

export function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-red-700"
    >
      <CircleAlert aria-hidden className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

type TextFieldProps = {
  field: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helper?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  textarea?: boolean;
};

export function TextField({
  field,
  label,
  value,
  onChange,
  error,
  helper,
  type = "text",
  autoComplete,
  textarea = false,
}: TextFieldProps) {
  const id = `qf-${field}`;
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [helperId, errorId].filter(Boolean).join(" ") || undefined;
  const shared = {
    id,
    name: field,
    value,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: cn(inputClasses, error && "border-red-700"),
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      {helper && (
        <p id={helperId} className="mb-1.5 text-[13px] leading-[1.5] text-slate">
          {helper}
        </p>
      )}
      {textarea ? (
        <textarea
          {...shared}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {error && errorId && <FieldError id={errorId} message={error} />}
    </div>
  );
}

type RadioGroupProps<V extends string> = {
  field: string;
  legend: string;
  options: readonly Option<V>[];
  value: string;
  onChange: (value: V) => void;
  error?: string;
  /** Two columns from `sm` up; long labels stay single-column. */
  columns?: boolean;
};

export function RadioGroup<V extends string>({
  field,
  legend,
  options,
  value,
  onChange,
  error,
  columns = false,
}: RadioGroupProps<V>) {
  const errorId = error ? `qf-${field}-error` : undefined;
  return (
    <fieldset aria-describedby={errorId}>
      <legend className="mb-2 text-sm font-semibold text-navy">{legend}</legend>
      <div
        className={cn(
          "grid grid-cols-1 gap-2",
          columns && "sm:grid-cols-2",
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`qf-${field}-${option.value}`}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-sm border bg-white px-4 py-3 transition-colors duration-150",
              error ? "border-red-700" : "border-line",
              "hover:border-slate has-[:checked]:border-blue has-[:checked]:bg-ice",
            )}
          >
            <input
              type="radio"
              id={`qf-${field}-${option.value}`}
              name={field}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 shrink-0 accent-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            />
            <span className="text-[15px] leading-[1.4] text-charcoal">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && errorId && <FieldError id={errorId} message={error} />}
    </fieldset>
  );
}
