import Link from "next/link";
import { Wordmark } from "@/components/site-header";
import { navConfig } from "@/lib/nav";

const NAVIGATE = [...navConfig.items, navConfig.cta];

const CONNECT = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zachariahbooker/",
    external: true,
  },
  {
    label: "Hello@executivedistrict.com",
    href: "mailto:Hello@executivedistrict.com",
    external: false,
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy px-5 pt-16 pb-8 sm:px-8">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 border-b border-line-onnavy pb-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
        <div>
          <Wordmark className="text-white" />
          <p className="mt-3 text-sm leading-relaxed text-frost-faint">
            Fractional C-Suite Services
            <br />
            for $500K–$50M Business Owners
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-5 text-xs font-bold tracking-[2px] text-gold uppercase">
            Navigate
          </p>
          <ul className="flex flex-col gap-3">
            {NAVIGATE.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-frost-soft transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-5 text-xs font-bold tracking-[2px] text-gold uppercase">
            Connect
          </p>
          <ul className="flex flex-col gap-3">
            {CONNECT.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-sm text-frost-soft transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-[1200px] flex-col gap-2 text-center text-xs text-frost-faint md:flex-row md:justify-between md:text-left">
        <span>© 2026 Executive District. All rights reserved.</span>
        <span>
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          {"  |  "}
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms &amp; Conditions
          </Link>
        </span>
      </div>
    </footer>
  );
}
