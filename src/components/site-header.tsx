"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navConfig } from "@/lib/nav";

// Two-line uppercase wordmark, shared with the footer (navy on white here,
// white on navy there via the color prop).
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "text-sm leading-tight font-bold tracking-[3px] uppercase",
        className ?? "text-navy",
      )}
    >
      <span className="block">Executive</span>
      <span className="block">District</span>
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow appears once the page scrolls, matching the production nav.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-line bg-white transition-shadow",
        scrolled && "shadow-e1",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {navConfig.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-[0.3px] text-slate transition-colors hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={navConfig.cta.href}
            className="rounded-sm bg-blue px-[22px] py-2.5 text-[13px] font-semibold tracking-[0.5px] text-white transition-[background-color,transform] hover:-translate-y-px hover:bg-blue-deep"
          >
            {navConfig.cta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="p-2 text-navy md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </div>

      {mobileOpen ? (
        <nav
          aria-label="Main"
          className="absolute inset-x-0 top-[72px] flex flex-col gap-1 border-b border-line bg-white px-5 py-6 shadow-e2 md:hidden"
        >
          {navConfig.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-sm px-2 py-3 text-sm font-medium text-slate transition-colors hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={navConfig.cta.href}
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-sm bg-blue px-[22px] py-2.5 text-center text-[13px] font-semibold tracking-[0.5px] text-white transition-colors hover:bg-blue-deep"
          >
            {navConfig.cta.label}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
