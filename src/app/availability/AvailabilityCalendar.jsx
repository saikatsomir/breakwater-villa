'use client';

import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { FiArrowUpRight, FiCalendar, FiCheck } from 'react-icons/fi';

import { Calendar } from '@/components/ui/calendar';

export default function AvailabilityCalendar() {
  const [range, setRange] = useState({
    from: undefined,
    to: undefined,
  });

  const selectedNights = useMemo(() => {
    if (!range?.from || !range?.to) return 0;

    const difference = range.to.getTime() - range.from.getTime();

    return Math.max(0, Math.round(difference / (1000 * 60 * 60 * 24)));
  }, [range]);

  const hasDates = range?.from && range?.to;

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-360 px-4 sm:px-5 md:px-8 lg:px-0">
        <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 xl:grid-cols-[0.72fr_1.28fr] xl:gap-28">
          {/* Left Content */}
          <div className="max-w-xl lg:sticky lg:top-32">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3 sm:mb-7">
              <span className="h-px w-8 bg-sand" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-muted sm:text-[10px]">
                Availability
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-[42px] font-medium leading-[0.96] tracking-tight text-midnight sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px]">
              Your island escape,
              <br />
              <span className="italic text-sand">when it suits you.</span>
            </h2>

            {/* Description */}
            <p className="mt-7 max-w-lg text-sm leading-6.5 text-slate-muted sm:mt-8 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              Select your arrival and departure dates to explore availability at
              Breakwater Villa and begin planning your private stay in Paradise
              Island.
            </p>

            {/* Property Details */}
            <div className="mt-9 grid grid-cols-3 border-y border-slate/10 py-6 sm:mt-10 sm:py-7">
              <div className="border-r border-slate/10 pr-3 sm:pr-5">
                <p className="font-display text-3xl leading-none text-midnight sm:text-4xl">
                  6
                </p>

                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-muted sm:text-[9px]">
                  Bedrooms
                </p>
              </div>

              <div className="border-r border-slate/10 px-3 sm:px-5">
                <p className="font-display text-3xl leading-none text-midnight sm:text-4xl">
                  6
                </p>

                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-muted sm:text-[9px]">
                  Bathrooms
                </p>
              </div>

              <div className="pl-3 sm:pl-5">
                <p className="font-display text-3xl leading-none text-midnight sm:text-4xl">
                  12
                </p>

                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-muted sm:text-[9px]">
                  Guests
                </p>
              </div>
            </div>

            {/* Availability Note */}
            <div className="mt-7 flex items-start gap-3 sm:mt-8">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist/60 text-ocean">
                <FiCalendar size={15} strokeWidth={1.5} />
              </div>

              <p className="max-w-sm text-xs leading-5 text-slate-muted sm:text-sm sm:leading-6">
                Choose your dates to see the length of your stay. Availability
                and final rates are confirmed when your booking request is
                reviewed.
              </p>
            </div>
          </div>

          {/* Calendar / Booking Panel */}
          <div className="rounded-2xl bg-[#f5f4f1] p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Panel Header */}
            <div className="mb-6 flex items-start justify-between gap-5 sm:mb-8">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-muted">
                  Select your stay
                </p>

                <h3 className="mt-2 font-display text-2xl font-medium text-midnight sm:text-3xl">
                  Choose your dates
                </h3>
              </div>

              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-muted sm:flex">
                <FiCalendar size={17} strokeWidth={1.4} />
              </div>
            </div>

            {/* Calendar */}
            <div className="rounded-2xl bg-white p-3 shadow-[0_12px_40px_rgba(11,42,58,0.05)] sm:p-5 md:p-7">
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                disabled={{ before: new Date() }}
                className="mx-auto w-full"
                classNames={{
                  months: 'flex flex-col gap-8 md:flex-row md:gap-10',
                  month: 'w-full space-y-5',
                  caption: 'flex items-center justify-between px-1',
                  caption_label:
                    'font-display text-lg font-medium text-midnight sm:text-xl',
                  nav: 'flex items-center gap-1',
                  button_previous:
                    'h-8 w-8 rounded-full text-slate-muted transition-colors hover:bg-mist hover:text-midnight',
                  button_next:
                    'h-8 w-8 rounded-full text-slate-muted transition-colors hover:bg-mist hover:text-midnight',
                  table: 'w-full border-collapse',
                  head_row: 'flex w-full',
                  head_cell:
                    'w-full pb-3 text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-muted',
                  row: 'mt-1 flex w-full',
                  cell: 'relative h-11 w-full p-0 text-center text-sm',
                  day: 'h-10 w-10 rounded-full p-0 font-body text-sm font-normal text-midnight transition-all duration-200 hover:bg-mist',
                  day_selected:
                    'bg-midnight text-white hover:bg-midnight hover:text-white',
                  day_today: 'bg-champagne/40 font-semibold text-midnight',
                  day_outside: 'text-slate-muted/30',
                  day_disabled: 'text-slate-muted/20 line-through',
                  day_range_start:
                    'bg-midnight text-white hover:bg-midnight hover:text-white',
                  day_range_end:
                    'bg-midnight text-white hover:bg-midnight hover:text-white',
                  day_range_middle: 'rounded-none bg-mist text-midnight',
                }}
              />
            </div>

            {/* Selected Dates */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DateField label="Check In" date={range?.from} />

              <DateField label="Check Out" date={range?.to} />
            </div>

            {/* Stay Summary */}
            <div className="mt-4 flex flex-col gap-4 rounded-xl bg-midnight p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-champagne">
                  Your stay
                </p>

                <p className="mt-1.5 text-sm text-white/75">
                  {hasDates
                    ? `${selectedNights} ${
                        selectedNights === 1 ? 'night' : 'nights'
                      } at Breakwater Villa`
                    : 'Select your arrival and departure dates'}
                </p>
              </div>

              {hasDates && (
                <div className="flex items-center gap-2 text-[10px] font-medium text-white/60">
                  <FiCheck size={14} className="text-champagne" />
                  Dates selected
                </div>
              )}
            </div>

            {/* Action */}
            <button
              type="button"
              disabled={!hasDates}
              className="group mt-4 flex h-14 w-full items-center justify-between rounded-full bg-midnight pl-6 pr-2 text-sm font-medium tracking-wide text-white transition-all duration-500 hover:bg-ocean disabled:cursor-not-allowed disabled:bg-slate/15 disabled:text-slate-muted sm:h-15"
            >
              <span>
                {hasDates ? 'Continue With These Dates' : 'Select Your Dates'}
              </span>

              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-champagne text-midnight transition-all duration-500 ${
                  hasDates
                    ? 'group-hover:bg-sand group-hover:rotate-0'
                    : 'opacity-60'
                }`}
              >
                <FiArrowUpRight
                  size={19}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />
              </span>
            </button>

            <p className="mt-4 text-center text-[9px] leading-4 text-slate-muted">
              Selecting dates does not confirm a reservation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------
   Date Field
-------------------------------- */

function DateField({ label, date }) {
  return (
    <div className="rounded-xl bg-white px-4 py-3.5 shadow-[0_8px_25px_rgba(11,42,58,0.04)] sm:px-5 sm:py-4">
      <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-muted">
        {label}
      </p>

      <p className="mt-1.5 font-display text-lg text-midnight sm:text-xl">
        {date ? format(date, 'MMM d, yyyy') : 'Select date'}
      </p>
    </div>
  );
}
