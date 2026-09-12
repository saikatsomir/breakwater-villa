'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { FiArrowDown } from 'react-icons/fi';

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
        flex
        min-h-[680px]
        w-full
        items-end
        justify-center
        overflow-hidden
        bg-midnight
        sm:min-h-[720px]
        lg:min-h-[820px]
        xl:min-h-[860px]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <Image
        src="/images/home/villa-intro.jpg"
        alt="Breakwater Villa luxury vacation rental in Ocean Club Estates, Paradise Island, Bahamas"
        fill
        priority
        sizes="100vw"
        className="
          object-cover
          object-center
        "
      />

      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-midnight/85
          via-midnight/35
          to-transparent
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_bottom,rgba(49,75,53,0.55),transparent_65%)]
        "
      />

      {/* =====================================================
          CENTERED CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1440px]
          justify-center
          px-5
          pb-14
          text-center
          sm:px-8
          sm:pb-16
          md:px-10
          md:pb-20
          lg:px-14
          lg:pb-24
          xl:px-16
          xl:pb-28
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            max-w-4xl
            flex-col
            items-center
            text-white
          "
        >
          {/* =================================================
              EYEBROW
          ================================================= */}

          {/* =================================================
              HEADING
          ================================================= */}

          <h1
            id="booking-hero-heading"
            className="
              max-w-4xl
              font-display
              text-5xl
              font-normal
              leading-[0.95]
              tracking-[-0.035em]
              sm:text-6xl
              md:text-7xl
              lg:text-[84px]
              xl:text-[96px]
            "
          >
            Your private escape{' '}
            <span className="italic text-[#B68A52]">awaits.</span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-white/80
              sm:mt-7
              sm:text-base
              sm:leading-8
              md:text-lg
            "
          >
            Reserve your stay at Breakwater Villa and experience effortless
            island living in Ocean Club Estates, Paradise Island, The Bahamas.
          </p>

          {/* =================================================
              LOCATION
          ================================================= */}

          <div className="mt-7 flex items-center justify-center gap-3 sm:mt-9">
            <span
              aria-hidden="true"
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#B68A52]
              "
            />

            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 sm:text-xs sm:tracking-[0.26em]">
              Ocean Club Estates · Paradise Island
            </span>

            <span
              aria-hidden="true"
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#B68A52]
              "
            />
          </div>

          {/* =================================================
              SCROLL CTA
          ================================================= */}

          <button
            type="button"
            onClick={scrollToBooking}
            className="
              group
              mt-9
              inline-flex
              items-center
              justify-center
              gap-4
              text-xs
              font-medium
              uppercase
              tracking-[0.22em]
              text-white
              transition-colors
              duration-300
              hover:text-[#B68A52]
              sm:mt-10
            "
          >
            <span
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                transition-all
                duration-500
                group-hover:border-[#B68A52]
                group-hover:bg-[#B68A52]
                group-hover:text-white
              "
            >
              <FiArrowDown
                size={17}
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-y-1
                "
              />
            </span>

            <span>Begin Your Reservation</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
