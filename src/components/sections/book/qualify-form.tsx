"use client";

import { useEffect, useRef, useState } from "react";
import { CircleAlert, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import {
  contactMethodOptions,
  employeeOptions,
  journeyOptions,
  ownershipOptions,
  qualifyCopy,
  revenueRangeOptions,
  yearsOwnedOptions,
  type ContactMethodValue,
  type EmployeesValue,
  type JourneyValue,
  type Option,
  type OwnershipValue,
  type QualifyAnswers,
  type RevenueRangeValue,
  type Tier,
  type YearsOwnedValue,
} from "./content";
import { TierBorderline } from "./tier-borderline";
import { TierNoFit } from "./tier-no-fit";
import { TierQualified } from "./tier-qualified";

/* ------------------------------------------------------------------ */
/* Form model                                                          */
/* ------------------------------------------------------------------ */

type FormState = {
  name: string;
  businessName: string;
  ownership: OwnershipValue | "";
  industry: string;
  yearsOwned: YearsOwnedValue | "";
  employees: EmployeesValue | "";
  journey: JourneyValue | "";
  whyNow: string;
  email: string;
  phone: string;
  contactMethod: ContactMethodValue | "";
  revenueRange: RevenueRangeValue | "";
};

type FieldName = keyof FormState;

const initialState: FormState = {
  name: "",
  businessName: "",
  ownership: "",
  industry: "",
  yearsOwned: "",
  employees: "",
  journey: "",
  whyNow: "",
  email: "",
  phone: "",
  contactMethod: "",
  revenueRange: "",
};

/** Required fields per step, in visual order (drives error focus). */
const stepFields: FieldName[][] = [
  ["name", "businessName", "ownership", "industry", "yearsOwned"],
  ["employees", "journey", "whyNow"],
  ["email", "phone", "contactMethod"],
];

const radioFirstOption: Partial<Record<FieldName, string>> = {
  ownership: ownershipOptions[0].value,
  yearsOwned: yearsOwnedOptions[0].value,
  employees: employeeOptions[0].value,
  journey: journeyOptions[0].value,
  contactMethod: contactMethodOptions[0].value,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep(
  step: number,
  form: FormState,
): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  for (const field of stepFields[step]) {
    if (form[field].trim() !== "") continue;
    errors[field] =
      field in radioFirstOption
        ? qualifyCopy.errors.requiredChoice
        : qualifyCopy.errors.required;
  }
  if (step === 2 && !errors.email && !EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = qualifyCopy.errors.email;
  }
  return errors;
}

function focusField(field: FieldName) {
  const first = radioFirstOption[field];
  const id = first ? `qf-${field}-${first}` : `qf-${field}`;
  document.getElementById(id)?.focus();
}

/* ------------------------------------------------------------------ */
/* Field building blocks                                               */
/* ------------------------------------------------------------------ */

const inputClasses =
  "w-full rounded-sm border border-line bg-white px-4 py-3 text-[15px] text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-1";

function FieldError({ id, message }: { id: string; message: string }) {
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
  field: FieldName;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helper?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  textarea?: boolean;
};

function TextField({
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
  field: FieldName;
  legend: string;
  options: readonly Option<V>[];
  value: string;
  onChange: (value: V) => void;
  error?: string;
  /** Two columns from `sm` up; long labels stay single-column. */
  columns?: boolean;
};

function RadioGroup<V extends string>({
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

/* ------------------------------------------------------------------ */
/* The form                                                            */
/* ------------------------------------------------------------------ */

/**
 * The gated-booking application (plan 006). Three steps with trust-first
 * sequencing, per-step validation, and a hidden honeypot. Submits to
 * POST /api/qualify; all qualification logic is server-side and this
 * component only renders the tier the server returns.
 */
export function QualifyForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    tier: Tier;
    answers: QualifyAnswers;
  } | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) headingRef.current?.focus();
    mounted.current = true;
  }, [step]);

  function setField<F extends FieldName>(field: F, value: FormState[F]) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) =>
      previous[field] ? { ...previous, [field]: undefined } : previous,
    );
  }

  /** Validates the current step; focuses the first invalid field on failure. */
  function stepIsValid(): boolean {
    const stepErrors = validateStep(step, form);
    setErrors(stepErrors);
    const firstInvalid = stepFields[step].find((field) => stepErrors[field]);
    if (firstInvalid) {
      focusField(firstInvalid);
      return false;
    }
    return true;
  }

  async function submit() {
    const { ownership, yearsOwned, employees, journey, contactMethod } = form;
    if (!ownership || !yearsOwned || !employees || !journey || !contactMethod) {
      return; // unreachable after validation; satisfies the type system
    }
    const answers: QualifyAnswers = {
      name: form.name.trim(),
      businessName: form.businessName.trim(),
      ownership,
      industry: form.industry.trim(),
      yearsOwned,
      employees,
      journey,
      whyNow: form.whyNow.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      contactMethod,
      revenueRange: form.revenueRange === "" ? "undisclosed" : form.revenueRange,
    };

    setStatus("submitting");
    setSubmitError(null);
    try {
      const response = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, company_website: honeypot }),
      });
      if (!response.ok) {
        setSubmitError(
          response.status === 429
            ? qualifyCopy.errors.rateLimited
            : qualifyCopy.errors.generic,
        );
        setStatus("idle");
        return;
      }
      const data = (await response.json()) as { tier: Tier };
      if (
        data.tier === "qualified" ||
        data.tier === "borderline" ||
        data.tier === "no-fit"
      ) {
        setResult({ tier: data.tier, answers });
      } else {
        setSubmitError(qualifyCopy.errors.generic);
        setStatus("idle");
      }
    } catch {
      setSubmitError(qualifyCopy.errors.generic);
      setStatus("idle");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stepIsValid()) return;
    if (step < 2) {
      setStep(step + 1);
    } else {
      void submit();
    }
  }

  if (result) {
    if (result.tier === "qualified") return <TierQualified />;
    if (result.tier === "borderline") {
      return <TierBorderline application={result.answers} />;
    }
    return <TierNoFit />;
  }

  const revenueDescribedBy = "qf-revenueRange-helper";

  return (
    <div className="rounded-none border-line bg-mist px-5 py-8 sm:rounded-md sm:border sm:px-8 sm:py-10">
      <p className="mb-8 flex items-start gap-2.5 text-[15px] leading-[1.7] text-slate">
        <Lock
          aria-hidden
          strokeWidth={1.5}
          className="mt-1 h-4 w-4 shrink-0 text-gold"
        />
        <span>{qualifyCopy.intro}</span>
      </p>

      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-slate">
        Step {step + 1} of 3
      </p>
      <div aria-hidden="true" className="mb-6 flex gap-1.5">
        {qualifyCopy.stepTitles.map((title, index) => (
          <span
            key={title}
            className={cn(
              "h-1 flex-1 rounded-xs",
              index <= step ? "bg-blue" : "bg-line",
            )}
          />
        ))}
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mb-6 text-xl font-bold text-navy focus-visible:outline-none"
      >
        {qualifyCopy.stepTitles[step]}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="relative">
        {/* Honeypot: hidden from real users, present in the payload. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor="qf-company-website">Company website</label>
          <input
            id="qf-company-website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        {step === 0 && (
          <div className="flex flex-col gap-6">
            <TextField
              field="name"
              label={qualifyCopy.fields.name.label}
              value={form.name}
              onChange={(value) => setField("name", value)}
              error={errors.name}
              autoComplete="name"
            />
            <TextField
              field="businessName"
              label={qualifyCopy.fields.businessName.label}
              value={form.businessName}
              onChange={(value) => setField("businessName", value)}
              error={errors.businessName}
              autoComplete="organization"
            />
            <RadioGroup
              field="ownership"
              legend={qualifyCopy.fields.ownership.label}
              options={ownershipOptions}
              value={form.ownership}
              onChange={(value) => setField("ownership", value)}
              error={errors.ownership}
            />
            <TextField
              field="industry"
              label={qualifyCopy.fields.industry.label}
              value={form.industry}
              onChange={(value) => setField("industry", value)}
              error={errors.industry}
            />
            <RadioGroup
              field="yearsOwned"
              legend={qualifyCopy.fields.yearsOwned.label}
              options={yearsOwnedOptions}
              value={form.yearsOwned}
              onChange={(value) => setField("yearsOwned", value)}
              error={errors.yearsOwned}
              columns
            />
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <RadioGroup
              field="employees"
              legend={qualifyCopy.fields.employees.label}
              options={employeeOptions}
              value={form.employees}
              onChange={(value) => setField("employees", value)}
              error={errors.employees}
              columns
            />
            <RadioGroup
              field="journey"
              legend={qualifyCopy.fields.journey.label}
              options={journeyOptions}
              value={form.journey}
              onChange={(value) => setField("journey", value)}
              error={errors.journey}
              columns
            />
            <TextField
              field="whyNow"
              label={qualifyCopy.fields.whyNow.label}
              helper={qualifyCopy.fields.whyNow.helper}
              value={form.whyNow}
              onChange={(value) => setField("whyNow", value)}
              error={errors.whyNow}
              textarea
            />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <TextField
              field="email"
              label={qualifyCopy.fields.email.label}
              value={form.email}
              onChange={(value) => setField("email", value)}
              error={errors.email}
              type="email"
              autoComplete="email"
            />
            <TextField
              field="phone"
              label={qualifyCopy.fields.phone.label}
              value={form.phone}
              onChange={(value) => setField("phone", value)}
              error={errors.phone}
              type="tel"
              autoComplete="tel"
            />
            <RadioGroup
              field="contactMethod"
              legend={qualifyCopy.fields.contactMethod.label}
              options={contactMethodOptions}
              value={form.contactMethod}
              onChange={(value) => setField("contactMethod", value)}
              error={errors.contactMethod}
              columns
            />
            <div>
              <label
                htmlFor="qf-revenueRange"
                className="mb-1.5 block text-sm font-semibold text-navy"
              >
                {qualifyCopy.fields.revenueRange.label}
              </label>
              <p
                id={revenueDescribedBy}
                className="mb-1.5 text-[13px] leading-[1.5] text-slate"
              >
                {qualifyCopy.fields.revenueRange.helper}
              </p>
              <select
                id="qf-revenueRange"
                name="revenueRange"
                value={form.revenueRange}
                aria-describedby={revenueDescribedBy}
                onChange={(event) =>
                  setField(
                    "revenueRange",
                    event.target.value as RevenueRangeValue | "",
                  )
                }
                className={inputClasses}
              >
                <option value="">
                  {qualifyCopy.fields.revenueRange.placeholder}
                </option>
                {revenueRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {submitError && (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2 rounded-sm border border-line bg-white px-4 py-3 text-sm font-medium text-red-700"
          >
            <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {submitError}
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={status === "submitting"}
            >
              {qualifyCopy.buttons.back}
            </Button>
          ) : (
            <span aria-hidden="true" />
          )}
          <Button type="submit" size="md" disabled={status === "submitting"}>
            {step < 2
              ? qualifyCopy.buttons.next
              : status === "submitting"
                ? qualifyCopy.buttons.submitting
                : qualifyCopy.buttons.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}
