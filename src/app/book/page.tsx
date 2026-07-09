import type { Metadata } from "next";
import { BookingCopy } from "@/components/sections/book/booking-copy";
import { BottomReassurance } from "@/components/sections/book/bottom-reassurance";
import { QualifyForm } from "@/components/sections/book/qualify-form";
import { TrustStrip } from "@/components/sections/book/trust-strip";

export const metadata: Metadata = {
  title: "Book a Confidential Discovery Call",
  description:
    "Thirty minutes with a senior operator. No pitch. No contracts. Just a real conversation about where your business is.",
};

export default function BookPage() {
  return (
    <>
      {/* Main booking section: copy left, qualification application right.
          The calendar renders only inside the qualified tier panel
          (plan 006: booking is gated behind the application). */}
      <section className="bg-white px-5 pb-12 pt-[110px] sm:px-8 sm:pb-[100px] sm:pt-[140px]">
        <div className="mx-auto grid max-w-[1200px] items-start gap-10 lg:grid-cols-2 lg:gap-[72px]">
          <BookingCopy />
          <QualifyForm />
        </div>
      </section>

      <TrustStrip />
      <BottomReassurance />
    </>
  );
}
