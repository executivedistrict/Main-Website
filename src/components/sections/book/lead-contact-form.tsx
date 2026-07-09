"use client";

import { useEffect, useRef, useState } from "react";
import { CircleAlert } from "lucide-react";
import {
  contactFormCopy,
  contactMethodOptions,
  qualifyCopy,
  type ContactMethodValue,
  type QualifyAnswers,
} from "./content";
import { RadioGroup, TextField } from "./form-fields";

/**
 * The internal contact form, shared by the tier 2 (borderline) panel and
 * the tier 3 (no-fit) help path. This is where contact details are
 * collected: the scored application carries none, and qualified leads
 * give theirs to the booking calendar instead. Submits to
 * POST /api/lead-contact with the message, contact details, tier, and an
 * echo of the original application (held in client state; there is no
 * lead database), then shows a confirmation state.
 */

type ContactField = "message" | "name" | "email" | "phone" | "contactMethod";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadContactFormProps = {
  application: QualifyAnswers;
  tier: "borderline" | "no-fit";
  messageLabel: string;
  confirmationHeading: string;
  confirmationBody: string;
  /** Focus the message field on mount (the no-fit form appears on demand). */
  focusMessageOnMount?: boolean;
};

export function LeadContactForm({
  application,
  tier,
  messageLabel,
  confirmationHeading,
  confirmationBody,
  focusMessageOnMount = false,
}: LeadContactFormProps) {
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethodValue | "">(
    "",
  );
  const [preferredTimes, setPreferredTimes] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<ContactField, string>>
  >({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  useEffect(() => {
    if (focusMessageOnMount) document.getElementById("qf-message")?.focus();
  }, [focusMessageOnMount]);

  useEffect(() => {
    if (status === "sent") confirmationRef.current?.focus();
  }, [status]);

  function setField(field: ContactField, apply: () => void) {
    apply();
    setErrors((previous) =>
      previous[field] ? { ...previous, [field]: undefined } : previous,
    );
  }

  function validate(): boolean {
    const next: Partial<Record<ContactField, string>> = {};
    if (message.trim() === "") next.message = contactFormCopy.messageRequired;
    if (name.trim() === "") next.name = qualifyCopy.errors.required;
    if (email.trim() === "") {
      next.email = qualifyCopy.errors.required;
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = qualifyCopy.errors.email;
    }
    if (phone.trim() === "") next.phone = qualifyCopy.errors.required;
    if (!contactMethod) {
      next.contactMethod = qualifyCopy.errors.requiredChoice;
    }
    setErrors(next);
    const order: ContactField[] = [
      "message",
      "name",
      "email",
      "phone",
      "contactMethod",
    ];
    const firstInvalid = order.find((field) => next[field]);
    if (firstInvalid) {
      const id =
        firstInvalid === "contactMethod"
          ? `qf-contactMethod-${contactMethodOptions[0].value}`
          : `qf-${firstInvalid}`;
      document.getElementById(id)?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          preferredTimes: preferredTimes.trim() || undefined,
          tier,
          contact: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            contactMethod,
          },
          application,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div>
        <h3
          ref={confirmationRef}
          tabIndex={-1}
          className="mb-2 text-xl font-bold text-navy focus-visible:outline-none"
        >
          {confirmationHeading}
        </h3>
        <p className="text-[15px] leading-[1.7] text-slate">
          {confirmationBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <TextField
        field="message"
        label={messageLabel}
        value={message}
        onChange={(value) => setField("message", () => setMessage(value))}
        error={errors.message}
        textarea
      />
      <TextField
        field="name"
        label={contactFormCopy.fields.name.label}
        value={name}
        onChange={(value) => setField("name", () => setName(value))}
        error={errors.name}
        autoComplete="name"
      />
      <TextField
        field="email"
        label={contactFormCopy.fields.email.label}
        value={email}
        onChange={(value) => setField("email", () => setEmail(value))}
        error={errors.email}
        type="email"
        autoComplete="email"
      />
      <TextField
        field="phone"
        label={contactFormCopy.fields.phone.label}
        value={phone}
        onChange={(value) => setField("phone", () => setPhone(value))}
        error={errors.phone}
        type="tel"
        autoComplete="tel"
      />
      <RadioGroup
        field="contactMethod"
        legend={contactFormCopy.fields.contactMethod.label}
        options={contactMethodOptions}
        value={contactMethod}
        onChange={(value) =>
          setField("contactMethod", () => setContactMethod(value))
        }
        error={errors.contactMethod}
        columns
      />
      <TextField
        field="preferredTimes"
        label={contactFormCopy.preferredTimesLabel}
        value={preferredTimes}
        onChange={setPreferredTimes}
      />

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-sm border border-line bg-white px-4 py-3 text-sm font-medium text-red-700"
        >
          <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          {contactFormCopy.error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-sm bg-blue px-9 py-4 text-[15px] font-semibold leading-none tracking-[0.3px] text-white transition-colors duration-200 hover:bg-blue-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
        >
          {status === "sending"
            ? contactFormCopy.sending
            : contactFormCopy.submit}
        </button>
      </div>
    </form>
  );
}
