'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';

export default function BookingHero() {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');

    if (!bookingSection) return;

    const navbarOffset = 120;

    const targetPosition =
      bookingSection.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-labelledby="booking-hero-heading"
      className="
        relative
        h-[680px]
        overflow-hidden
        bg-midnight
        sm:h-[700px]
        md:h-[720px]
        lg:h-[840px]
        xl:h-[860px]
        2xl:h-[980px]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0">
        <Image
          src="/images/home/villa-intro.jpg"
          alt="Breakwater Villa luxury vacation rental in Ocean Club Estates, Paradise Island, Bahamas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />

        {/* Overall image treatment */}
        <div className="absolute inset-0 bg-midnight/20" />

        {/* Left / bottom cinematic gradient */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-midnight
            via-midnight/35
            to-midnight/5
          "
        />

        {/* Subtle side gradient for depth */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-midnight/35
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative z-10
          mx-auto flex h-full w-full max-w-360
          items-end
          px-3 pb-32
          sm:px-4 sm:pb-12
          md:px-6 md:pb-14
          lg:px-8 lg:pb-22
          xl:px-10 xl:pb-30
          2xl:px-0 2xl:pb-40
        "
      >
        <div className="grid w-full items-end lg:grid-cols-[1fr_auto] lg:gap-16 xl:gap-24 2xl:gap-28">
          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-4xl"
          >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-2.5 sm:mb-6 sm:gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne sm:h-2 sm:w-2" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:text-[10px] lg:text-[11px]">
                Reserve Your Stay
              </span>
            </div>

            {/* Heading */}
            <h1
              id="booking-hero-heading"
              className="
                max-w-4xl
                font-display
                text-[40px]
                font-medium
                leading-[1.02]
                tracking-tight
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-[56px]
                xl:text-[64px]
                2xl:text-[72px]
              "
            >
              Your private escape
              <br />
              <span className="italic text-champagne">awaits.</span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-white/65
                sm:mt-6
                sm:text-base
                sm:leading-7
                md:text-lg
                md:leading-8
                xl:mt-7
                xl:text-xl
                xl:leading-8.5
              "
            >
              Reserve your stay at Breakwater Villa and experience effortless
              island living in Ocean Club Estates, Paradise Island, The Bahamas.
            </p>
          </motion.div>

          {/* =================================================
              BOOKING CTA
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8
              flex
              flex-col
              items-start
              lg:mt-0
              lg:items-end
            "
          >
            {/* Location */}
            <div className="mb-5 flex items-center gap-2.5 lg:justify-end">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />

              <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/45 sm:text-[10px] sm:tracking-[0.2em]">
                Ocean Club Estates · Paradise Island
              </span>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={scrollToBooking}
              className="
                group
                inline-flex
                items-center
                gap-4
                rounded-full
                border
                border-white/20
                bg-white/10
                py-2
                pl-5
                pr-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white
                backdrop-blur-sm
                transition-all
                duration-500
                hover:border-champagne
                hover:bg-champagne
                hover:text-midnight
                sm:py-2.5
                sm:pl-6
                sm:pr-2.5
                sm:text-xs
                sm:tracking-[0.2em]
              "
            >
              <span>Begin Your Reservation</span>

              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-champagne
                  text-midnight
                  transition-all
                  duration-500
                  group-hover:bg-midnight
                  group-hover:text-white
                  sm:h-10
                  sm:w-10
                "
              >
                <FiArrowUpRight
                  size={17}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-500
                    group-hover:rotate-45
                  "
                />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.button
        type="button"
        onClick={scrollToBooking}
        aria-label="Scroll to booking form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.8,
        }}
        className="
          absolute
          bottom-5
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          items-center
          justify-center
          text-white/45
          transition-colors
          duration-300
          hover:text-champagne
          sm:flex
          md:bottom-7
          lg:bottom-8
        "
      >
        <span
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            transition-all
            duration-500
            hover:border-champagne
            sm:h-9
            sm:w-9
            md:h-10
            md:w-10
          "
        >
          <FiArrowDown size={14} strokeWidth={1.4} className="animate-pulse" />
        </span>
      </motion.button>
    </section>
  );
}
