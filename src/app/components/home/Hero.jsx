'use client';

import { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

import {
  FiCalendar,
  FiChevronDown,
  FiCheck,
  FiPhone,
  FiUsers,
  FiArrowUpRight,
} from 'react-icons/fi';

import { Calendar } from '../ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import Button from '../ui/SiteButton';

import google from '../../../../public/images/icons/google.svg';
import facebook from '../../../../public/images/icons/facebook.png';

/* =========================================================
   CONSTANTS
========================================================= */

const guests = [
  '/images/guests/guest-1.webp',
  '/images/guests/guest-2.webp',
  '/images/guests/guest-3.webp',
];

const keyPoints = ['Paid Golf Course', 'Sunset Views', 'Walk to the Beach'];

const MAX_GUESTS = 10;

/* =========================================================
   DATE HELPERS
========================================================= */

const startOfDay = (date) => {
  const value = new Date(date);

  value.setHours(0, 0, 0, 0);

  return value;
};

const formatDate = (date) => {
  if (!date) {
    return 'Select date';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const formatDateForQuery = (date) => {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const parseApiDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return startOfDay(date);
};

/* =========================================================
   CHECK IF DATE IS PART OF A CONFIRMED BOOKING
========================================================= */

const isDateInsideBooking = (date, booking) => {
  const current = startOfDay(date);

  const checkIn = parseApiDate(booking.checkIn);

  const checkOut = parseApiDate(booking.checkOut);

  if (!checkIn || !checkOut) {
    return false;
  }

  return current >= checkIn && current < checkOut;
};

/* =========================================================
   CHECK IF DATE IS UNAVAILABLE
========================================================= */

const isDateUnavailable = (date, bookings) => {
  const current = startOfDay(date);

  const today = startOfDay(new Date());

  /*
   * Past dates cannot be selected.
   */
  if (current < today) {
    return true;
  }

  /*
   * Confirmed booking dates cannot
   * be selected.
   */
  return bookings.some((booking) => isDateInsideBooking(current, booking));
};

/* =========================================================
   CHECK DATE RANGE
========================================================= */

const hasUnavailableDateBetween = (start, end, bookings) => {
  if (!start || !end) {
    return false;
  }

  const current = startOfDay(start);
  const last = startOfDay(end);

  /*
   * We check every night between
   * check-in and check-out.
   *
   * The checkout date itself is not
   * considered part of the stay.
   */
  while (current < last) {
    if (isDateUnavailable(current, bookings)) {
      return true;
    }

    current.setDate(current.getDate() + 1);
  }

  return false;
};

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const router = useRouter();

  /* =======================================================
     BOOKING STATE
  ======================================================= */

  const [checkIn, setCheckIn] = useState(null);

  const [checkOut, setCheckOut] = useState(null);

  const [guestsCount, setGuestsCount] = useState('2');

  /* =======================================================
     AVAILABILITY STATE
  ======================================================= */

  const [confirmedBookings, setConfirmedBookings] = useState([]);

  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

  const [availabilityError, setAvailabilityError] = useState('');

  /* =======================================================
     UI STATE
  ======================================================= */

  const [openDatePicker, setOpenDatePicker] = useState(null);

  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);

  /* =======================================================
     RANGE USED INSIDE AVAILABILITY DIALOG
  ======================================================= */

  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  });

  /* =======================================================
     LOAD AVAILABILITY
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadAvailability = async () => {
      try {
        const response = await fetch('/api/bookings/availability');

        if (!response.ok) {
          throw new Error('Unable to load availability.');
        }

        const result = await response.json();

        if (mounted && result.success) {
          setConfirmedBookings(result.bookings || []);
        }
      } catch (error) {
        console.error('Hero availability error:', error);

        if (mounted) {
          setAvailabilityError(
            'Unable to load availability right now. Please try again.'
          );
        }
      }
    };

    loadAvailability();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     BUILD UNAVAILABLE DATE LIST
  ======================================================= */

  const unavailableDates = useMemo(() => {
    return confirmedBookings.flatMap((booking) => {
      const dates = [];

      const current = parseApiDate(booking.checkIn);

      const checkOut = parseApiDate(booking.checkOut);

      if (!current || !checkOut) {
        return dates;
      }

      while (current < checkOut) {
        dates.push(new Date(current));

        current.setDate(current.getDate() + 1);
      }

      return dates;
    });
  }, [confirmedBookings]);

  /* =======================================================
     DATE SELECTION
  ======================================================= */

  const handleDateSelect = (date) => {
    if (!date) {
      return;
    }

    const selectedDate = startOfDay(date);

    /*
     * CHECK-IN
     */
    if (openDatePicker === 'checkIn') {
      setCheckIn(selectedDate);

      /*
       * If the new check-in is
       * after the existing checkout,
       * reset checkout.
       */
      if (checkOut && selectedDate >= checkOut) {
        setCheckOut(null);
      }

      /*
       * Automatically move to
       * checkout selection.
       */
      setOpenDatePicker('checkOut');

      return;
    }

    /*
     * CHECK-OUT
     */
    if (openDatePicker === 'checkOut') {
      if (checkIn && selectedDate > checkIn) {
        const rangeUnavailable = hasUnavailableDateBetween(
          checkIn,
          selectedDate,
          confirmedBookings
        );

        if (!rangeUnavailable) {
          setCheckOut(selectedDate);

          setOpenDatePicker(null);
        }
      }
    }
  };

  /* =======================================================
     CHECK AVAILABILITY
  ======================================================= */

  const handleAvailability = async () => {
    setAvailabilityError('');

    /*
     * No check-in selected.
     */
    if (!checkIn) {
      setOpenDatePicker('checkIn');

      return;
    }

    /*
     * No checkout selected.
     */
    if (!checkOut) {
      setOpenDatePicker('checkOut');

      return;
    }

    /*
     * Invalid range.
     */
    if (checkOut <= checkIn) {
      setAvailabilityError('Check-out must be after check-in.');

      setOpenDatePicker('checkOut');

      return;
    }

    setIsLoadingAvailability(true);

    try {
      /*
       * Fetch the latest availability
       * again when the user clicks
       * Check Availability.
       */
      const response = await fetch('/api/bookings/availability', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Unable to check availability.');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Unable to check availability.');
      }

      /*
       * Use the newest booking data.
       */
      const bookings = result.bookings || [];

      setConfirmedBookings(bookings);

      /*
       * Check the selected range
       * against the newest data.
       */
      const rangeUnavailable = hasUnavailableDateBetween(
        checkIn,
        checkOut,
        bookings
      );

      /*
       * Store the selected range
       * for the popup.
       */
      setSelectedRange({
        from: checkIn,
        to: checkOut,
      });

      if (rangeUnavailable) {
        setAvailabilityError(
          'Some dates in your selected stay are unavailable. Please choose another range.'
        );
      }

      /*
       * Open availability popup.
       */
      setAvailabilityDialogOpen(true);
    } catch (error) {
      console.error('Check availability error:', error);

      setAvailabilityError(
        error.message ||
          'Unable to check availability right now. Please try again.'
      );

      setAvailabilityDialogOpen(true);
    } finally {
      setIsLoadingAvailability(false);
    }
  };

  /* =======================================================
     BOOKING BUTTON
  ======================================================= */

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      return;
    }

    const params = new URLSearchParams({
      checkIn: formatDateForQuery(checkIn),

      checkOut: formatDateForQuery(checkOut),

      guests: guestsCount,
    });

    /*
     * Send the selected booking
     * information to the booking
     * details page.
     */
    router.push(`/booking-my-stay/details?${params.toString()}`);
  };

  /* =======================================================
     CURRENT RANGE STATUS
  ======================================================= */

  const isSelectedRangeAvailable = Boolean(
    selectedRange.from &&
      selectedRange.to &&
      !hasUnavailableDateBetween(
        selectedRange.from,
        selectedRange.to,
        confirmedBookings
      )
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="relative bg-white">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        className="
          relative
          h-[680px]
          w-full
          overflow-hidden
          bg-midnight

          sm:h-[700px]

          md:h-[720px]

          lg:h-[840px]

          xl:h-[860px]

          2xl:h-[980px]
        "
      >
        {/* =======================================================
            BACKGROUND IMAGE
        ======================================================= */}

        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/home/breakwater-hero.jpg"
            alt="32 ocean overlooking the ocean"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-top
            "
          />

          {/* =====================================================
              IMAGE OVERLAY
          ===================================================== */}

          {/* Overall subtle treatment */}

          <div
            className="
              absolute
              inset-0
              bg-midnight/15

              md:bg-midnight/10
            "
          />

          {/* Left readability */}

          <div
            className="
              absolute
              inset-y-0
              left-0
              w-full

              bg-linear-to-r
              from-midnight/75
              via-midnight/40
              to-transparent

              md:w-[88%]
              md:from-midnight/70
              md:via-midnight/30
              md:to-transparent

              xl:w-[72%]
              xl:from-midnight/80
              xl:via-midnight/35
              xl:to-transparent
            "
          />

          {/* Bottom fade */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[45%]

              bg-linear-to-t
              from-midnight/90
              via-midnight/35
              to-transparent

              md:h-[40%]
            "
          />

          {/* Top subtle fade */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-32

              bg-linear-to-b
              from-midnight/25
              to-transparent
            "
          />
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            h-full
            w-full
            max-w-360
            items-end

            px-3
            pb-28

            sm:px-4
            sm:pb-14

            md:px-6
            md:pb-16

            lg:px-8
            lg:pb-24

            xl:pb-24

            2xl:px-0
            2xl:pb-50
          "
        >
          <div className="w-full">
            {/* =================================================
                CONTENT
            ================================================= */}

            <div
              className="
                grid
                items-end
                gap-8

                xl:grid-cols-[minmax(0,1fr)_auto]
                xl:gap-14

                2xl:gap-20
              "
            >
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <div
                className="
                  mx-auto
                  w-full
                  max-w-3xl
                  text-center

                  xl:mx-0
                  xl:text-left
                "
              >
                {/* =================================================
                    REVIEWS
                ================================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15,
                  }}
                  className="
                    mb-5
                    flex
                    items-center
                    justify-center

                    xl:justify-start
                  "
                >
                  <div className="flex items-center">
                    <img
                      src={google.src}
                      alt="Google Reviews"
                      className="
                        h-7
                        w-7
                        object-contain

                        sm:h-8
                        sm:w-8

                        md:h-9
                        md:w-9

                        lg:h-10
                        lg:w-10
                      "
                    />

                    <img
                      src={facebook.src}
                      alt="Facebook Reviews"
                      className="
                        -ml-2
                        h-7
                        w-7
                        object-contain

                        sm:h-8
                        sm:w-8

                        md:h-9
                        md:w-9

                        lg:h-10
                        lg:w-10
                      "
                    />
                  </div>

                  <div className="ml-3 h-7 w-px bg-white/25 lg:h-8" />

                  <div className="ml-3 text-left">
                    <div className="flex items-center gap-2">
                      <span
                        className="
                          text-sm
                          tracking-[2px]
                          text-[#FBBF24]

                          sm:text-base

                          lg:text-lg
                        "
                        aria-label="5 out of 5 stars"
                      >
                        ★★★★★
                      </span>

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-white

                          sm:text-base

                          lg:text-lg
                        "
                      >
                        4.9
                      </span>
                    </div>

                    <p
                      className="
                        text-xs
                        font-normal
                        text-white/80

                        sm:text-sm

                        lg:text-base
                      "
                    >
                      <span className="font-medium text-white">98%</span>{' '}
                      Positive Feedback
                    </p>
                  </div>
                </motion.div>

                {/* =================================================
                    KEY POINTS
                ================================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                  }}
                  className="
                    mb-6
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    gap-2

                    sm:mb-10

                    xl:justify-start
                  "
                >
                  {keyPoints.map((item) => (
                    <span
                      key={item}
                      className="
                          rounded-full
                          border
                          border-white/20
                          bg-white/10
                          px-3
                          py-1

                          text-[8px]
                          font-medium
                          uppercase
                          tracking-[0.12em]
                          text-white/90

                          backdrop-blur-xl

                          sm:px-3.5
                          sm:text-[9px]

                          md:px-4
                          md:text-[10px]

                          lg:text-[11px]

                          xl:py-1.5
                        "
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>

                {/* =================================================
                    DESKTOP H1
                ================================================= */}

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25,
                  }}
                  className="
                    hidden
                    mb-0
                    font-display
                    font-medium
                    leading-[1.05]
                    tracking-[-0.04em]
                    text-white

                    xl:block
                    xl:text-[48px]

                    2xl:text-[64px]
                  "
                >
                  <span>Luxury 6-Bedroom</span>

                  <br />

                  <span className="italic text-champagne">
                    Ocean View Villa
                  </span>

                  <br />

                  <span>in Paradise Island</span>
                </motion.h1>

                {/* =================================================
                    MOBILE + TABLET H1
                ================================================= */}

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25,
                  }}
                  className="
                    mx-auto
                    max-w-3xl
                    font-display
                    font-medium
                    leading-[0.94]
                    tracking-[-0.04em]
                    text-white
                    mb-3
                    text-[40px]

                    sm:mb-0
                    sm:text-5xl

                    md:text-[54px]

                    lg:text-[60px]

                    xl:hidden
                  "
                >
                  <span className="italic text-champagne">
                    Ocean View Villa
                  </span>

                  <br />

                  <span
                    className="
                      text-[31px]

                      sm:text-[38px]

                      md:text-[42px]

                      lg:text-[46px]
                    "
                  >
                    in Paradise Island, Bahamas
                  </span>
                </motion.h1>

                {/* =================================================
                    SUBTITLE
                ================================================= */}

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.35,
                  }}
                  className="
                    mx-auto
                    max-w-xl
                    text-sm
                    leading-6
                    text-white/85

                    sm:text-base
                    sm:leading-7

                    md:text-lg

                    lg:leading-8

                    xl:mx-0
                    xl:text-lg
                    mt-0

                    sm:mt-3

                    2xl:text-xl
                    2xl:leading-9
                  "
                >
                  Six bedrooms of Ocean View luxury, a private infinity pool,
                  and effortless access to Paradise Island — all within the
                  exclusive Paradise Island.
                </motion.p>

                {/* =================================================
                    CTA
                ================================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.45,
                  }}
                  className="
                    mt-6
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    gap-4

                    sm:mt-10
                    sm:gap-6

                    xl:justify-start
                  "
                >
                  <Button
                    href="/booking-my-stay"
                    className="
                      text-midnight
                      hover:bg-champagne
                    "
                  >
                    Book Your Stay
                  </Button>

                  <a
                    href="tel:+12425555555"
                    className="
                      group
                      hidden
                      items-center
                      gap-3
                      border-b
                      border-white
                      pb-1
                      text-base
                      font-medium
                      text-white
                      transition-all
                      duration-300

                      md:inline-flex

                      lg:text-lg

                      xl:text-xl

                      hover:border-champagne
                      hover:text-champagne
                    "
                  >
                    <FiPhone
                      size={18}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-rotate-12
                      "
                    />
                    Call Us Now
                  </a>
                </motion.div>
              </div>

              {/* =================================================
                  GUEST INFORMATION
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                }}
                className="
                  hidden

                  xl:flex
                  xl:items-center
                  xl:gap-5

                  2xl:gap-6
                "
              >
                {/* AVATARS */}

                <div className="flex items-center">
                  {guests.map((guest, index) => (
                    <div
                      key={guest}
                      className={`
                          relative
                          h-11
                          w-11
                          shrink-0
                          overflow-hidden
                          rounded-full
                          border-2
                          border-white/80

                          2xl:h-12
                          2xl:w-12

                          ${index !== 0 ? '-ml-3' : ''}
                        `}
                      style={{
                        zIndex: guests.length - index,
                      }}
                    >
                      <Image
                        src={guest}
                        alt="Happy guest"
                        fill
                        sizes="
                            (min-width: 1536px) 48px,
                            44px
                          "
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* DIVIDER */}

                <div className="h-10 w-px bg-white/30 2xl:h-12" />

                {/* GUEST COUNT */}

                <div className="text-left">
                  <p
                    className="
                      font-display
                      text-4xl
                      leading-none
                      text-white

                      2xl:text-5xl
                    "
                  >
                    100+
                  </p>

                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.2em]
                      text-white/65

                      2xl:text-[10px]
                    "
                  >
                    Happy Guests
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BOOKING SEARCH BAR
      ========================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.7,
        }}
        className="
          relative
          z-30
          mx-auto
          mt-6
          w-full
          max-w-6xl

          px-3

          sm:px-4

          md:px-6

          lg:px-8

          xl:absolute
          xl:left-1/2
          xl:bottom-0
          xl:mt-0
          xl:w-[calc(100%-5rem)]
          xl:max-w-6xl
          xl:-translate-x-1/2
          xl:translate-y-1/2
          xl:px-0
        "
      >
        <div
          className="
            overflow-visible
            rounded-xl
            border
            border-slate-200
            bg-white
            p-2

            shadow-none

            md:rounded-2xl

            xl:shadow-[0_20px_60px_rgba(11,42,58,0.18)]
          "
        >
          <div
            className="
              grid
              grid-cols-2

              md:grid-cols-[1fr_1fr_1fr_auto]
            "
          >
            {/* =================================================
                CHECK IN
            ================================================= */}

            <div
              className="
                flex
                min-h-20
                items-center
                gap-3
                border-b
                border-r
                border-slate-100
                px-4
                py-4

                md:min-h-26
                md:gap-4
                md:border-b-0
                md:px-6
                md:py-5
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-mist
                  text-ocean

                  md:h-12
                  md:w-12
                "
              >
                <FiCalendar size={18} className="md:hidden" />

                <FiCalendar size={20} className="hidden md:block" />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-slate-muted

                    md:text-[10px]
                  "
                >
                  Check In
                </p>

                <Popover
                  open={openDatePicker === 'checkIn'}
                  onOpenChange={(open) =>
                    setOpenDatePicker(open ? 'checkIn' : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="
                        mt-1
                        flex
                        max-w-full
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-midnight
                        transition-colors
                        hover:text-ocean

                        md:text-base
                      "
                    >
                      <span className="truncate">{formatDate(checkIn)}</span>

                      <FiChevronDown
                        size={15}
                        className="
                          shrink-0
                          text-slate-muted
                        "
                      />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    sideOffset={8}
                    className="w-[min(380px,calc(100vw-1rem))] max-w-none max-h-[calc(100dvh-1rem)] overflow-y-auto overflow-x-hidden rounded-2xl p-3 sm:w-[380px]"
                  >
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      className="w-full"
                      onSelect={handleDateSelect}
                      disabled={(date) =>
                        isDateUnavailable(date, confirmedBookings)
                      }
                      modifiers={{
                        unavailable: unavailableDates,
                      }}
                      modifiersClassNames={{
                        unavailable: 'text-slate-300 line-through',
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* =================================================
                CHECK OUT
            ================================================= */}

            <div
              className="
                flex
                min-h-20
                items-center
                gap-3
                border-b
                border-slate-100
                px-4
                py-4

                md:min-h-26
                md:gap-4
                md:border-b-0
                md:border-r
                md:px-6
                md:py-5
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-mist
                  text-ocean

                  md:h-12
                  md:w-12
                "
              >
                <FiCalendar size={18} className="md:hidden" />

                <FiCalendar size={20} className="hidden md:block" />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-slate-muted

                    md:text-[10px]
                  "
                >
                  Check Out
                </p>

                <Popover
                  open={openDatePicker === 'checkOut'}
                  onOpenChange={(open) =>
                    setOpenDatePicker(open ? 'checkOut' : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="
                        mt-1
                        flex
                        max-w-full
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-midnight
                        transition-colors
                        hover:text-ocean

                        md:text-base
                      "
                    >
                      <span className="truncate">{formatDate(checkOut)}</span>

                      <FiChevronDown
                        size={15}
                        className="
                          shrink-0
                          text-slate-muted
                        "
                      />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    sideOffset={8}
                    className="w-[min(380px,calc(100vw-1rem))] max-w-none max-h-[calc(100dvh-1rem)] overflow-y-auto overflow-x-hidden rounded-2xl p-3 sm:w-[380px]"
                  >
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      className="w-full"
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        if (isDateUnavailable(date, confirmedBookings)) {
                          return true;
                        }

                        if (checkIn) {
                          return startOfDay(date) <= checkIn;
                        }

                        return false;
                      }}
                      modifiers={{
                        unavailable: unavailableDates,
                      }}
                      modifiersClassNames={{
                        unavailable: 'text-slate-300 line-through',
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* =================================================
                GUESTS
            ================================================= */}

            <div
              className="
                flex
                min-h-20
                items-center
                gap-3
                border-r
                border-slate-100
                px-4
                py-4

                md:min-h-26
                md:gap-4
                md:px-6
                md:py-5
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-mist
                  text-ocean

                  md:h-12
                  md:w-12
                "
              >
                <FiUsers size={18} className="md:hidden" />

                <FiUsers size={20} className="hidden md:block" />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-slate-muted

                    md:text-[10px]
                  "
                >
                  Guests
                </p>

                <Select value={guestsCount} onValueChange={setGuestsCount}>
                  <SelectTrigger
                    className="
                      mt-1
                      h-auto
                      w-auto
                      max-w-full
                      gap-2
                      border-0
                      p-0
                      text-sm
                      font-medium
                      text-midnight
                      shadow-none
                      focus:ring-0
                      focus:ring-offset-0

                      md:text-base
                    "
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {Array.from(
                      {
                        length: MAX_GUESTS,
                      },
                      (_, index) => index + 1
                    ).map((count) => (
                      <SelectItem key={count} value={String(count)}>
                        {count} {count === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* =================================================
                AVAILABILITY
            ================================================= */}

            <div
              className="
                flex
                min-h-20
                items-center
                justify-center
                p-2

                md:min-h-26
                md:p-3
              "
            >
              <button
                type="button"
                onClick={handleAvailability}
                disabled={isLoadingAvailability}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-ocean
                  px-4
                  text-xs
                  font-medium
                  tracking-wide
                  text-white
                  transition-all
                  duration-300
                  hover:bg-midnight
                  disabled:cursor-not-allowed
                  disabled:opacity-70

                  md:h-16
                  md:min-w-45
                  md:gap-3
                  md:px-7
                  md:text-base
                "
              >
                <FiCheck size={18} />

                <span>
                  {isLoadingAvailability ? 'Checking...' : 'Check Availability'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          AVAILABILITY POPUP
      ========================================================= */}

      <Dialog
        open={availabilityDialogOpen}
        onOpenChange={setAvailabilityDialogOpen}
      >
        <DialogContent
          className="
    w-[calc(100%-1rem)]
    max-w-4xl
    max-h-[calc(100dvh-1rem)]
    overflow-hidden
    rounded-2xl
    border-0
    p-4

    sm:w-[calc(100%-2rem)]
    sm:max-w-4xl
    sm:rounded-3xl
  "
        >
          <div
            className="
      flex
      max-h-[calc(100dvh-1rem)]
      min-h-0
      flex-col
    "
          >
            {/* =====================================================
        SCROLLABLE CONTENT
    ===================================================== */}

            <div
              className="
        min-h-0
        flex-1
        overflow-y-auto
        overflow-x-hidden
        overscroll-contain
        [-webkit-overflow-scrolling:touch]
      "
            >
              <div className="space-y-5 p-4 sm:p-7 md:p-8">
                <DialogHeader>
                  <DialogTitle
                    className="
              font-display
              text-2xl
              font-medium
              text-midnight
              sm:text-3xl
            "
                  >
                    Check Availability
                  </DialogTitle>

                  <DialogDescription
                    className="
              text-sm
              leading-6
              text-slate-muted
              sm:text-base
            "
                  >
                    {checkIn && checkOut
                      ? `${formatDate(checkIn)} — ${formatDate(
                          checkOut
                        )} · ${guestsCount} ${
                          guestsCount === '1' ? 'Guest' : 'Guests'
                        }`
                      : 'Select your preferred dates for your stay.'}
                  </DialogDescription>
                </DialogHeader>

                {availabilityError ? (
                  <div
                    className="
              rounded-2xl
              bg-red-50
              px-4
              py-4
              text-sm
              leading-6
              text-red-700
            "
                  >
                    {availabilityError}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* YOUR SELECTED STAY */}
                    <div
                      className="
                rounded-2xl
                bg-mist/40
                p-4
              "
                    >
                      <p
                        className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-slate-muted
                "
                      >
                        Your selected stay
                      </p>

                      <div
                        className="
                  mt-2
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-midnight
                  sm:text-base
                "
                      >
                        <span>{formatDate(selectedRange.from)}</span>

                        <span className="text-slate-muted">→</span>

                        <span>{formatDate(selectedRange.to)}</span>
                      </div>
                    </div>

                    {/* DATE SUMMARY */}
                    <div
                      className="
                grid
                gap-3
                sm:grid-cols-2
              "
                    >
                      <div
                        className="
                  rounded-xl
                  border
                  border-slate-200
                  p-4
                "
                      >
                        <p
                          className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-muted
                  "
                        >
                          Check In
                        </p>

                        <p
                          className="
                    mt-1
                    text-sm
                    font-medium
                    text-midnight
                  "
                        >
                          {formatDate(checkIn)}
                        </p>
                      </div>

                      <div
                        className="
                  rounded-xl
                  border
                  border-slate-200
                  p-4
                "
                      >
                        <p
                          className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-muted
                  "
                        >
                          Check Out
                        </p>

                        <p
                          className="
                    mt-1
                    text-sm
                    font-medium
                    text-midnight
                  "
                        >
                          {formatDate(checkOut)}
                        </p>
                      </div>
                    </div>

                    {/* AVAILABILITY MESSAGE */}
                    {isSelectedRangeAvailable ? (
                      <div
                        className="
                  rounded-2xl
                  bg-mist/60
                  px-4
                  py-4
                  text-sm
                  leading-6
                  text-ocean
                "
                      >
                        Great news — all dates in your selected stay are
                        available.
                      </div>
                    ) : (
                      <div
                        className="
                  rounded-2xl
                  bg-red-50
                  px-4
                  py-4
                  text-sm
                  leading-6
                  text-red-700
                "
                      >
                        The selected range contains unavailable dates. Please
                        choose another range.
                      </div>
                    )}

                    {/* AVAILABILITY CALENDAR */}
                    <div>
                      <p
                        className="
                  mb-3
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-slate-muted
                "
                      >
                        Available / unavailable dates
                      </p>

                      <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden pb-1">
                        <Calendar
                          mode="range"
                          selected={selectedRange}
                          onSelect={(range) => {
                            if (!range) {
                              return;
                            }

                            setSelectedRange(range);

                            if (range.from) {
                              setCheckIn(startOfDay(range.from));
                            }

                            if (range.from && range.to) {
                              const nextCheckOut = startOfDay(range.to);

                              const rangeUnavailable =
                                hasUnavailableDateBetween(
                                  startOfDay(range.from),
                                  nextCheckOut,
                                  confirmedBookings
                                );

                              if (!rangeUnavailable) {
                                setCheckOut(nextCheckOut);
                              } else {
                                setCheckOut(null);
                              }
                            }
                          }}
                          disabled={(date) =>
                            isDateUnavailable(date, confirmedBookings)
                          }
                          modifiers={{
                            unavailable: unavailableDates,
                          }}
                          modifiersClassNames={{
                            unavailable: 'text-slate-300 line-through',
                          }}
                          numberOfMonths={2}
                          initialFocus
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* =====================================================
        FIXED FOOTER
    ===================================================== */}

            <DialogFooter
              className="
        shrink-0
        border-t
        border-slate-200
        bg-white
        px-4
        py-4
        flex-col
        gap-3

        sm:px-7
        sm:py-5
        sm:flex-row
        sm:justify-end
      "
            >
              <button
                type="button"
                onClick={() => setAvailabilityDialogOpen(false)}
                className="
          flex
          h-12
          w-full
          items-center
          justify-center
          rounded-full
          border
          border-slate-200
          px-6
          text-sm
          font-medium
          text-midnight
          transition-colors
          hover:bg-mist/40
          sm:w-auto
        "
              >
                Close
              </button>

              <button
                type="button"
                disabled={!isSelectedRangeAvailable}
                onClick={handleBooking}
                className="
          flex
          h-12
          w-full
          items-center
          justify-center
          rounded-full
          bg-ocean
          px-7
          text-sm
          font-medium
          text-white
          transition-all
          hover:bg-midnight
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:w-auto
        "
              >
                Book This Stay
                <FiArrowUpRight size={16} className="ml-2" />
              </button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
