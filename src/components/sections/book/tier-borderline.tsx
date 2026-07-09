"use client";

import { useEffect, useRef, useState } from "react";
import { CircleAlert } from "lucide-react";
import { tierCopy, type QualifyAnswers } from "./content";

const inputClasses =
  "w-full rounded-sm border border-line bg-white px-4 py-3 text-[15px] text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-1";

/**
 * Tier 2 panel: the personal-follow-up promise plus an optional message to
 * the operator. Submits to POST /api/lead-contact with the message,
 * preferred times, and an echo of the original application (held in state
 * by the parent form; there is no lead database). Focus moves to the
 * heading on reveal.
 */
export function TierBorderline({ application }: { application: QualifyAnswers }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const [message, setMessage] = useState("");
  const [preferredTimes, setPreferredTimes] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (status === "sent") confirmationRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (message.trim() === "") {
      setMessageError(true);
      document.getElementById("lead-message")?.focus();
      return;
    }
    setMessageError(false);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          preferredTimes: preferredTimes.trim() || undefined,
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
      <div className="rounded-none border-line bg-mist px-5 py-10 sm:rounded-md sm:border sm:px-8">
        <h2
          ref={confirmationRef}
          tabIndex={-1}
          className="mb-2 text-2xl font-bold text-navy focus-visible:outline-none"
        >
          {tierCopy.borderline.confirmationHeading}
        </h2>
        <p className="text-[15px] leading-[1.7] text-slate">
          {tierCopy.borderline.confirmationBody}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-none border-line bg-mist px-5 py-10 sm:rounded-md sm:border sm:px-8">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mb-2 text-2xl font-bold text-navy focus-visible:outline-none"
      >
        {tierCopy.borderline.heading}
      </h2>
      <p className="mb-8 text-[15px] leading-[1.7] text-slate">
        {tierCopy.borderline.body}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-5">
          <label
            htmlFor="lead-message"
            className="mb-1.5 block text-sm font-semibold text-navy"
          >
            {tierCopy.borderline.messageLabel}
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            aria-invalid={messageError || undefined}
            aria-describedby={messageError ? "lead-message-error" : undefined}
            className={inputClasses}
          />
          {messageError && (
            <p
              id="lead-message-error"
              className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-red-700"
            >
              <CircleAlert aria-hidden className="h-3.5 w-3.5 shrink-0" />
              {tierCopy.borderline.messageRequired}
            </p>
          )}
        </div>

        <div className="mb-7">
          <label
            htmlFor="lead-preferred-times"
            className="mb-1.5 block text-sm font-semibold text-navy"
          >
            {tierCopy.borderline.preferredTimesLabel}
          </label>
          <input
            id="lead-preferred-times"
            name="preferredTimes"
            type="text"
            value={preferredTimes}
            onChange={(event) => setPreferredTimes(event.target.value)}
            className={inputClasses}
          />
        </div>

        {status === "error" && (
          <p
            role="alert"
            className="mb-5 flex items-start gap-2 rounded-sm border border-line bg-white px-4 py-3 text-sm font-medium text-red-700"
          >
            <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {tierCopy.borderline.error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-sm bg-blue px-9 py-4 text-[15px] font-semibold leading-none tracking-[0.3px] text-white transition-colors duration-200 hover:bg-blue-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
        >
          {status === "sending"
            ? tierCopy.borderline.sending
            : tierCopy.borderline.submit}
        </button>
      </form>
    </div>
  );
}
