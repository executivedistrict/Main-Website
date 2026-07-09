import { Lock } from "lucide-react";
import { BOOKING_CALENDAR_URL, calendarCard } from "./content";

/**
 * Right column of the booking section: the calendar card with its navy
 * header, the embedded GHL booking calendar, and the confidentiality
 * footer. Ordered first on mobile (production `order: -1`) and sticky
 * below the fixed header on desktop.
 */
export function BookingCalendar() {
  return (
    <div className="order-first lg:order-none lg:sticky lg:top-[104px]">
      <div className="overflow-hidden rounded-none border-line bg-mist sm:rounded-md sm:border">
        <div className="bg-navy px-7 py-6">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[3px] text-gold">
            {calendarCard.label}
          </p>
          <p className="text-lg font-semibold text-white">{calendarCard.title}</p>
        </div>
        <div className="flex min-h-[480px] flex-col items-center justify-center px-4 py-8 sm:px-7">
          <iframe
            src={BOOKING_CALENDAR_URL}
            title="Booking calendar: schedule a confidential 30-minute discovery call"
            loading="lazy"
            className="block h-[776px] min-h-[600px] w-full border-0"
          />
        </div>
        <div className="flex items-center gap-2 border-t border-line px-7 py-4">
          <Lock aria-hidden strokeWidth={1.5} className="h-4 w-4 min-w-4 text-slate" />
          <p className="text-xs leading-[1.4] text-slate">{calendarCard.footer}</p>
        </div>
      </div>
    </div>
  );
}
