"use client";

import { useEffect, useRef, useState } from "react";
import { TriangleAlert, XIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui";

type JacobDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Status = "loading" | "ready" | "error";

/**
 * Modal video conversation with Jacob, the AI concierge. Creates ONE Tavus
 * session per open via POST /api/jacob/conversation (never on mount), drives
 * the loading | ready | error states, and discards session state on close
 * (the server-side participant_left_timeout ends the Tavus call). Focus
 * trap/restore, Escape, backdrop close, and scroll lock come from the
 * shadcn/ui Dialog primitive (Radix).
 */
export function JacobDialog({ open, onOpenChange }: JacobDialogProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  // Bumped by "Try Again" so the effect below re-runs and re-POSTs.
  const [attempt, setAttempt] = useState(0);

  // Render-time state adjustment (the React-sanctioned alternative to
  // setState-in-effect): whenever `open` flips, discard the previous
  // session's UI state before anything renders.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    setStatus("loading");
    setConversationUrl(null);
  }

  // One session per open (or per retry), created only after an intentional
  // click; never on mount. Each Tavus session costs paid minutes, so the
  // startedKey ref dedupes the double effect run under dev StrictMode, and
  // the generation counter (bumped on close) keeps a response that arrives
  // after close from updating state. Effect cleanup can't do either job:
  // StrictMode runs setup-cleanup-setup while the dialog stays open, which
  // would both fire a second POST and orphan the first response.
  const startedKey = useRef<string | null>(null);
  const generation = useRef(0);

  useEffect(() => {
    if (!open) {
      startedKey.current = null;
      generation.current += 1;
      return;
    }
    const key = `attempt-${attempt}`;
    if (startedKey.current === key) return;
    startedKey.current = key;
    const gen = generation.current;

    fetch("/api/jacob/conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data: { conversation_url?: unknown } = await response.json();
        if (
          typeof data.conversation_url !== "string" ||
          !data.conversation_url
        ) {
          throw new Error("No conversation URL received");
        }
        if (generation.current !== gen) return;
        setConversationUrl(data.conversation_url);
        setStatus("ready");
      })
      .catch(() => {
        if (generation.current !== gen) return;
        setStatus("error");
      });
  }, [open, attempt]);

  const handleRetry = () => {
    setStatus("loading");
    setConversationUrl(null);
    setAttempt((n) => n + 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex h-dvh max-h-dvh w-full max-w-full flex-col gap-0 overflow-hidden rounded-none border-0 bg-navy p-0 sm:h-[85vh] sm:max-h-[700px] sm:max-w-[900px] sm:rounded-md sm:border sm:border-line-onnavy"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line-onnavy px-5 py-4">
          <DialogTitle className="truncate text-base font-semibold text-white sm:text-lg">
            Jacob — Executive District Concierge
          </DialogTitle>
          <DialogClose
            aria-label="Close conversation"
            className="shrink-0 cursor-pointer rounded-xs p-1.5 text-frost-soft transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
          >
            <XIcon className="size-5" aria-hidden="true" />
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">
          Live video conversation with Jacob, the Executive District AI
          concierge.
        </DialogDescription>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          {status === "loading" && (
            <div
              role="status"
              className="flex flex-col items-center gap-4 p-10"
            >
              <span
                aria-hidden="true"
                className="size-12 animate-spin rounded-full border-[3px] border-line-onnavy border-t-gold"
              />
              <p className="font-medium text-frost">Loading Jacob...</p>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="flex flex-col items-center gap-4 p-10 text-center"
            >
              <TriangleAlert aria-hidden="true" className="size-12 text-gold" />
              <p className="font-medium text-frost">
                Jacob could not be loaded. Please try again.
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-1 inline-flex cursor-pointer items-center justify-center rounded-sm bg-gold px-6 py-2.5 text-sm font-semibold tracking-[0.3px] text-navy transition-[filter] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy focus-visible:outline-none"
              >
                Try Again
              </button>
            </div>
          )}

          {status === "ready" && conversationUrl && (
            <iframe
              src={conversationUrl}
              allow="camera; microphone; autoplay; fullscreen"
              allowFullScreen
              title="Jacob AI Concierge Conversation"
              className="size-full max-h-none border-0"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
