'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const STEPS = [
  'Select Dates',
  'Guest Details',
  'Stay Details',
  'Review & Confirm',
];

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(first, second) {
  if (!first || !second) return false;

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function isBefore(first, second) {
  return startOfDay(first).getTime() < startOfDay(second).getTime();
}

function isAfter(first, second) {
  return startOfDay(first).getTime() > startOfDay(second).getTime();
}

function formatDate(date) {
  if (!date) return '';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);

  const previousMonthDays = firstDay;

  const previousMonth = new Date(year, month, 0);
  const previousMonthTotalDays = previousMonth.getDate();

  const days = [];

  // Previous month's trailing days
  for (let i = previousMonthDays - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, previousMonthTotalDays - i),
      currentMonth: false,
    });
  }

  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: new Date(year, month, day),
      currentMonth: true,
    });
  }

  // Next month's leading days
  const remainingDays = 42 - days.length;

  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      date: new Date(year, month + 1, day),
      currentMonth: false,
    });
  }

  return days;
}

function isDateUnavailable(date, confirmedBookings) {
  const currentDate = startOfDay(date);

  return confirmedBookings.some((booking) => {
    const checkIn = startOfDay(new Date(booking.checkIn));
    const checkOut = startOfDay(new Date(booking.checkOut));

    /*
     * Check-in is unavailable.
     * Check-out is intentionally available because
     * a new guest can arrive on the same day another
     * guest checks out.
     *
     * Example:
     * Existing: Oct 17 → Oct 20
     * New guest may select Oct 20 as check-in.
     */
    return (
      currentDate.getTime() >= checkIn.getTime() &&
      currentDate.getTime() < checkOut.getTime()
    );
  });
}

function hasUnavailableDateBetween(startDate, endDate, confirmedBookings) {
  if (!startDate || !endDate) return false;

  const current = startOfDay(startDate);
  const end = startOfDay(endDate);

  while (current < end) {
    if (isDateUnavailable(current, confirmedBookings)) {
      return true;
    }

    current.setDate(current.getDate() + 1);
  }

  return false;
}

function MonthCalendar({
  monthDate,
  checkIn,
  checkOut,
  today,
  confirmedBookings,
  onDateSelect,
}) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const days = useMemo(() => getCalendarDays(year, month), [year, month]);

  return (
    <div className="flex-1">
      {/* Month Header */}

      <div className="mb-7 text-center">
        <h3 className="font-body text-sm font-medium tracking-wide text-midnight">
          {MONTHS[month]} {year}
        </h3>
      </div>

      {/* Weekdays */}

      <div className="mb-3 grid grid-cols-7">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="
              flex
              h-8
              items-center
              justify-center
              text-[10px]
              font-medium
              uppercase
              tracking-wide
              text-slate-muted
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}

      <div className="grid grid-cols-7">
        {days.map(({ date, currentMonth }, index) => {
          const pastDate = isBefore(date, today);

          const unavailableDate = isDateUnavailable(date, confirmedBookings);

          /*
           * Dates belonging to the previous/next month are
           * displayed only to complete the calendar grid.
           * They must NEVER be selectable.
           */
          const disabled = !currentMonth || pastDate || unavailableDate;

          /*
           * Overflow days (currentMonth === false) are placeholder
           * cells that fill out the 6x7 grid. The SAME date value
           * can legitimately appear as a real, selectable day in the
           * adjacent month's own calendar (e.g. Jan 30 is a real day
           * in the January grid, but also shows up as a disabled
           * leading placeholder in the February grid).
           *
           * Selected/in-range styling must only ever apply to the
           * cell that actually belongs to its own month — otherwise
           * the placeholder cell in the *other* calendar lights up
           * too, even though it's disabled and shouldn't be treated
           * as selected.
           */
          const selectedStart =
            currentMonth && checkIn && isSameDay(date, checkIn);

          const selectedEnd =
            currentMonth && checkOut && isSameDay(date, checkOut);

          const isSelected = selectedStart || selectedEnd;

          const isInRange =
            currentMonth &&
            checkIn &&
            checkOut &&
            date > checkIn &&
            date < checkOut;

          return (
            <div
              key={`${date.toISOString()}-${index}`}
              className="relative flex h-11 items-center justify-center"
            >
              {/* Range background */}

              {isInRange && (
                <div
                  className="
                    absolute
                    inset-y-1
                    left-0
                    right-0
                    bg-midnight/8
                  "
                />
              )}

              <button
                type="button"
                disabled={disabled}
                onClick={() => onDateSelect(date)}
                aria-label={`Select ${formatDate(date)}`}
                aria-disabled={disabled}
                className={`
                  relative
                  z-10
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-sm
                  transition-all
                  duration-200
                  ${
                    !currentMonth
                      ? 'cursor-default text-slate/15'
                      : pastDate
                      ? 'cursor-not-allowed text-slate/20'
                      : unavailableDate
                      ? 'cursor-not-allowed text-slate/25 line-through'
                      : 'text-slate hover:bg-mist hover:text-midnight'
                  }
                  ${
                    isSelected
                      ? 'bg-midnight font-medium text-white hover:bg-midnight hover:text-white'
                      : ''
                  }
                `}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingDates() {
  const router = useRouter();

  const today = useMemo(() => startOfDay(new Date()), []);

  const initialMonth = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
    [today]
  );

  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const [confirmedBookings, setConfirmedBookings] = useState([]);

  const [availabilityLoading, setAvailabilityLoading] = useState(true);

  const [availabilityError, setAvailabilityError] = useState('');

  const nextMonth = useMemo(
    () => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    [currentMonth]
  );

  /*
   * Load all confirmed bookings.
   *
   * This runs once when the calendar loads.
   */
  useEffect(() => {
    async function loadAvailability() {
      try {
        setAvailabilityLoading(true);
        setAvailabilityError('');

        const response = await fetch('/api/bookings/availability', {
          method: 'GET',
          cache: 'no-store',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'Unable to load booking availability.'
          );
        }

        setConfirmedBookings(data.bookings || []);
      } catch (error) {
        console.error('Load booking availability error:', error);

        setAvailabilityError(
          'Unable to load availability. Please refresh the page and try again.'
        );
      } finally {
        setAvailabilityLoading(false);
      }
    }

    loadAvailability();
  }, []);

  const handleDateSelect = (date) => {
    /*
     * Never allow dates from another month to be selected.
     * MonthCalendar already disables them, but this is
     * an additional safety check.
     */
    const visibleCurrentMonth =
      date.getFullYear() === currentMonth.getFullYear() &&
      date.getMonth() === currentMonth.getMonth();

    const visibleNextMonth =
      date.getFullYear() === nextMonth.getFullYear() &&
      date.getMonth() === nextMonth.getMonth();

    if (!visibleCurrentMonth && !visibleNextMonth) {
      return;
    }

    // Never allow past dates.
    if (isBefore(date, today)) return;

    // Never allow confirmed/unavailable dates.
    if (isDateUnavailable(date, confirmedBookings)) {
      return;
    }

    /*
     * No check-in selected yet.
     */
    if (!checkIn) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }

    /*
     * User clicked an earlier date.
     * Treat it as the new check-in.
     */
    if (isBefore(date, checkIn)) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }

    /*
     * Same date as check-in.
     */
    if (isSameDay(date, checkIn)) {
      setCheckOut(null);
      return;
    }

    /*
     * Do not allow a range to cross an unavailable
     * confirmed booking.
     */
    if (hasUnavailableDateBetween(checkIn, date, confirmedBookings)) {
      /*
       * Instead of creating an invalid range,
       * treat the clicked date as the new check-in.
       */
      setCheckIn(date);
      setCheckOut(null);
      return;
    }

    /*
     * Complete the range.
     */
    setCheckOut(date);
  };

  const goToPreviousMonth = () => {
    const previousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );

    const minimumMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (previousMonth < minimumMonth) return;

    setCurrentMonth(previousMonth);
  };

  const goToNextMonth = () => {
    setCurrentMonth(nextMonth);
  };

  const canContinue = Boolean(checkIn && checkOut);

  const handleContinue = () => {
    if (!canContinue) return;

    const params = new URLSearchParams({
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
    });

    router.push(`/booking-my-stay/details?${params.toString()}`);
  };

  const nights =
    checkIn && checkOut
      ? Math.round(
          (startOfDay(checkOut).getTime() - startOfDay(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <section
      id="booking-form"
      aria-labelledby="booking-dates-heading"
      className="
        bg-white
        px-5
        py-16
        sm:px-8
        sm:py-20
        md:px-10
        md:py-28
        lg:px-14
        lg:py-32
        xl:px-16
      "
    >
      <div className="mx-auto max-w-[1440px]">
        {/* =====================================================
            BOOKING STEPS
        ===================================================== */}

        <div className="mb-14 hidden lg:block">
          <div className="mx-auto flex max-w-6xl items-center">
            {STEPS.map((step, index) => {
              const active = index === 0;

              return (
                <div key={step} className="flex flex-1 items-center">
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        text-xs
                        font-medium
                        ${
                          active
                            ? 'border-midnight bg-midnight text-white'
                            : 'border-slate/20 bg-white text-slate'
                        }
                      `}
                    >
                      {index + 1}
                    </span>

                    <span
                      className={`
                        whitespace-nowrap
                        text-xs
                        tracking-wide
                        ${
                          active
                            ? 'font-medium text-midnight'
                            : 'text-slate-muted'
                        }
                      `}
                    >
                      {step}
                    </span>
                  </div>

                  {index < STEPS.length - 1 && (
                    <div className="mx-5 h-px flex-1 bg-slate/10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            MOBILE STEP
        ===================================================== */}

        <div className="mb-10 flex items-center justify-between lg:hidden">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-slate-muted">
              Step 01
            </p>

            <p className="mt-1 font-display text-2xl text-midnight">
              Select Your Dates
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {STEPS.map((_, index) => (
              <span
                key={index}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  ${index === 0 ? 'w-6 bg-midnight' : 'w-1.5 bg-slate/15'}
                `}
              />
            ))}
          </div>
        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.75fr)] xl:gap-14">
          {/* ===================================================
              LEFT — DATE SELECTION
          =================================================== */}

          <div>
            {/* Heading */}

            <div className="mb-8">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#B68A52] sm:text-xs">
                Booking Inquiry
              </p>

              <h1
                id="booking-dates-heading"
                className="
                  font-display
                  text-4xl
                  font-normal
                  leading-[1]
                  tracking-[-0.035em]
                  text-midnight
                  sm:text-5xl
                  md:text-6xl
                "
              >
                Select your dates.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-muted sm:text-base sm:leading-7">
                Choose your preferred check-in and check-out dates to begin
                planning your stay at 32 ocean.
              </p>
            </div>

            {/* =================================================
                CALENDAR
            ================================================= */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-slate/10
                bg-ivory/40
                p-5
                sm:p-7
                md:p-8
              "
            >
              {/* Calendar Navigation */}

              <div className="mb-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  disabled={
                    currentMonth.getFullYear() === today.getFullYear() &&
                    currentMonth.getMonth() === today.getMonth()
                  }
                  aria-label="Previous month"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate/10
                    text-midnight
                    transition-all
                    duration-300
                    hover:border-midnight/20
                    hover:bg-white
                    disabled:cursor-not-allowed
                    disabled:opacity-25
                  "
                >
                  <FiArrowLeft size={15} />
                </button>

                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-slate-muted">
                  Choose your stay
                </span>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate/10
                    text-midnight
                    transition-all
                    duration-300
                    hover:border-midnight/20
                    hover:bg-white
                  "
                >
                  <FiArrowRight size={15} />
                </button>
              </div>

              {/* Availability loading */}

              {availabilityLoading && (
                <div className="mb-5 rounded-xl border border-slate/10 bg-white/60 px-4 py-3 text-center text-xs text-slate-muted">
                  Checking availability...
                </div>
              )}

              {/* Availability error */}

              {availabilityError && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-xs leading-5 text-red-700">
                  {availabilityError}
                </div>
              )}

              {/* Two Month Calendar */}

              <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                <MonthCalendar
                  monthDate={currentMonth}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  today={today}
                  confirmedBookings={confirmedBookings}
                  onDateSelect={handleDateSelect}
                />

                <div className="hidden border-l border-slate/10 pl-8 md:block">
                  <MonthCalendar
                    monthDate={nextMonth}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    today={today}
                    confirmedBookings={confirmedBookings}
                    onDateSelect={handleDateSelect}
                  />
                </div>
              </div>

              {/* Legend */}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate/10 pt-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-midnight" />

                  <span className="text-[10px] uppercase tracking-[0.16em] text-slate-muted">
                    Available
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 items-center justify-center text-[11px] leading-none text-slate/40">
                    ×
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.16em] text-slate-muted">
                    Not Available
                  </span>
                </div>
              </div>

              {/* Selected Dates */}

              <div className="mt-8 border-t border-slate/10 pt-6">
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-muted">
                      Check-in
                    </p>

                    <p className="mt-1.5 text-sm font-medium text-midnight sm:text-base">
                      {checkIn ? formatDate(checkIn) : 'Select a date'}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-muted">
                      Check-out
                    </p>

                    <p className="mt-1.5 text-sm font-medium text-midnight sm:text-base">
                      {checkOut ? formatDate(checkOut) : 'Select a date'}
                    </p>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="mt-5 flex items-center gap-2 text-xs text-slate-muted">
                    <FiCheck size={14} className="text-[#B68A52]" />

                    <span>
                      {nights} {nights === 1 ? 'night' : 'nights'} selected
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                CONTINUE
            ================================================= */}

            <div className="mt-6">
              <button
                type="button"
                disabled={!canContinue}
                onClick={handleContinue}
                className="
                  group
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-midnight
                  px-6
                  text-sm
                  font-medium
                  tracking-wide
                  text-white
                  transition-all
                  duration-500
                  hover:bg-ocean
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:bg-slate/15
                  disabled:text-slate/40
                  sm:h-16
                "
              >
                <span>
                  {canContinue
                    ? 'Continue to Guest Details'
                    : 'Select Your Dates'}
                </span>

                {canContinue && (
                  <FiArrowRight
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                )}
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-slate-muted">
                Your selected dates will be carried into the next step. No
                reservation is confirmed yet.
              </p>
            </div>
          </div>

          {/* ===================================================
              RIGHT — VILLA INSIGHTS
          =================================================== */}

          <aside className="lg:pt-1">
            <div className="overflow-hidden rounded-2xl bg-ivory">
              {/* Image */}

              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/home/couch.jpg"
                  alt="Interior lounge at 32 ocean in Ocean View Villa on Paradise Island, Paradise Island, Bahamas"
                  fill
                  sizes="
                    (max-width: 1024px) 100vw,
                    (max-width: 1280px) 35vw,
                    30vw
                  "
                  className="
                    object-cover
                    object-center
                  "
                />
              </div>

              {/* Villa Information */}

              <div className="p-6 sm:p-7 md:p-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#B68A52]">
                  Your Stay
                </p>

                <h2 className="mt-2 font-display text-3xl font-normal tracking-[-0.025em] text-midnight sm:text-4xl">
                  32 ocean
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-muted">
                  Ocean View Villa on Paradise Island
                </p>

                {/* Insights */}

                <div className="mt-7 border-t border-slate/10 pt-6">
                  <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-muted">
                    Villa Insights
                  </p>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <p className="font-display text-2xl text-midnight">6</p>

                      <p className="mt-1 text-xs text-slate-muted">Bedrooms</p>
                    </div>

                    <div>
                      <p className="font-display text-2xl text-midnight">6</p>

                      <p className="mt-1 text-xs text-slate-muted">Bathrooms</p>
                    </div>

                    <div>
                      <p className="font-display text-2xl text-midnight">
                        6,500
                      </p>

                      <p className="mt-1 text-xs text-slate-muted">Sq. Ft.</p>
                    </div>

                    <div>
                      <p className="font-display text-2xl text-midnight">1</p>

                      <p className="mt-1 text-xs text-slate-muted">
                        Private Pool
                      </p>
                    </div>
                  </div>
                </div>

                {/* Short Insight */}

                <div className="mt-7 border-t border-slate/10 pt-6">
                  <p className="text-sm leading-7 text-slate">
                    A private island residence designed for unhurried days,
                    effortless gatherings, and memorable stays.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
