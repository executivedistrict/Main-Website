"use client";

import { useEffect, useRef, useState } from "react";
import { CircleAlert, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import {
  employeeOptions,
  journeyOptions,
  ownershipOptions,
  qualifyCopy,
  revenueRangeOptions,
  yearsOwnedOptions,
  type EmployeesValue,
  type JourneyValue,
  type OwnershipValue,
  type QualifyAnswers,
  type RevenueRangeValue,
  type Tier,
  type YearsOwnedValue,
} from "./content";
import { inputClasses, RadioGroup, TextField } from "./form-fields";
import { TierBorderline } from "./tier-borderline";
import { TierNoFit } from "./tier-no-fit";
import { TierQualified } from "./tier-qualified";

/* ------------------------------------------------------------------ */
/* Form model                                                          */
/* ------------------------------------------------------------------ */

type FormState = {
  businessName: string;
  ownership: OwnershipValue | "";
  industry: string;
  yearsOwned: YearsOwnedValue | "";
  employees: EmployeesValue | "";
  journey: JourneyValue | "";
  whyNow: string;
  revenueRange: RevenueRangeValue | "";
};

type FieldName = keyof FormState;

const initialState: FormState = {
  businessName: "",
  ownership: "",
  industry: "",
  yearsOwned: "",
  employees: "",
  journey: "",
  whyNow: "",
  revenueRange: "",
};

/** Required fields per step, in visual order (drives error focus). */
const stepFields: FieldName[][] = [
  ["businessName", "ownership", "industry", "yearsOwned"],
  ["employees", "journey", "whyNow"],
];

const lastStep = stepFields.length - 1;

const radioFirstOption: Partial<Record<FieldName, string>> = {
  ownership: ownershipOptions[0].value,
  yearsOwned: yearsOwnedOptions[0].value,
  employees: employeeOptions[0].value,
  journey: journeyOptions[0].value,
};

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
  return errors;
}

function focusField(field: FieldName) {
  const first = radioFirstOption[field];
  const id = first ? `qf-${field}-${first}` : `qf-${field}`;
  document.getElementById(id)?.focus();
}

/* ------------------------------------------------------------------ */
/* The form                                                            */
/* ------------------------------------------------------------------ */

/**
 * The gated-booking application (plan 006). Two steps of business
 * questions with trust-first sequencing, per-step validation, and a
 * hidden honeypot. No contact details are collected here: qualified
 * leads give them to the booking calendar (which feeds the CRM), the
 * other tiers to the contact form inside their panels. Submits to
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
    const { ownership, yearsOwned, employees, journey } = form;
    if (!ownership || !yearsOwned || !employees || !journey) {
      return; // unreachable after validation; satisfies the type system
    }
    const answers: QualifyAnswers = {
      businessName: form.businessName.trim(),
      ownership,
      industry: form.industry.trim(),
      yearsOwned,
      employees,
      journey,
      whyNow: form.whyNow.trim(),
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
    if (step < lastStep) {
      setStep(step + 1);
    } else {
      void submit();
    }
  }

  if (result) {
    if (result.tier === "qualified") {
      return <TierQualified application={result.answers} />;
    }
    if (result.tier === "borderline") {
      return <TierBorderline application={result.answers} />;
    }
    return <TierNoFit application={result.answers} />;
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
        Step {step + 1} of {qualifyCopy.stepTitles.length}
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
            {step < lastStep
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
