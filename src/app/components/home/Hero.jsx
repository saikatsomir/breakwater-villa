'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  FiCalendar,
  FiChevronDown,
  FiCheck,
  FiPhone,
  FiPlay,
  FiUsers,
} from 'react-icons/fi';

import Button from '../ui/Button';
import google from '../../../../public/images/icons/google.svg';
import facebook from '../../../../public/images/icons/facebook.png';

const guests = [
  '/images/guests/guest-1.webp',
  '/images/guests/guest-2.webp',
  '/images/guests/guest-3.webp',
];

export default function Hero() {
  return (
    <div className="relative">
      <section className="relative h-[90vh] min-h-160 sm:min-h-190 w-full bg-midnight">
        {/* =====================================================
            BACKGROUND IMAGE
        ===================================================== */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/home/breakwater-hero.jpg"
            alt="Breakwater Villa overlooking the ocean"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-midnight/60 md:bg-midnight/15" />

          <div
            className="
              absolute
              inset-0
              bg-linear-to-b
              from-transparent
              via-transparent
              via-35%
              to-midnight/10 md:to-midnight/50
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[32%]
              bg-linear-to-t
              from-midnight
              via-midnight/40
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-linear-to-r
              from-midnight/30 md:from-midnight/70
              via-transparent
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-40
              bg-linear-to-t
              from-midnight/70
              to-transparent
            "
          />
        </div>

        {/* =====================================================
            MAIN HERO CONTENT
        ===================================================== */}
        <div
          className="
            relative
            z-10
            mx-auto
            flex
            h-full
            max-w-360
            items-end
            px-3
            md:px-8
            lg:px-0
          "
        >
          <div className="w-full pb-16 sm:pb-20 md:pb-24 lg:pb-52">
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_380px]">
              {/* =================================================
                  LEFT CONTENT — centered on mobile, left-aligned lg+
              ================================================= */}
              <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
                {/* =================================================
                    REVIEWS
                ================================================= */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="mb-5 flex items-center justify-center lg:justify-start"
                >
                  <div className="flex items-center">
                    <img
                      src={google.src}
                      alt="Google Reviews"
                      className="h-8 w-8 md:h-9 md:w-9 object-contain"
                    />

                    <img
                      src={facebook.src}
                      alt="Facebook Reviews"
                      className="-ml-2 h-8 w-8 md:h-9 md:w-9 object-contain"
                    />
                  </div>

                  <div className="ml-3 h-7 w-px bg-white/25" />

                  <div className="ml-3 text-left ">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-base md:text-base tracking-[2px] text-[#FBBF24]"
                        aria-label="5 out of 5 stars"
                      >
                        ★★★★★
                      </span>

                      <span className="text-base font-semibold text-white">
                        4.9
                      </span>
                    </div>

                    <p className="text-sm md:text-base font-medium md:font-normal text-white md:text-white/80">
                      <span className="font-medium text-white/90">98%</span>{' '}
                      Positive Feedback
                    </p>
                  </div>
                </motion.div>

                {/* =================================================
                    KEY POINTS
                ================================================= */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mb-5 hidden md:flex flex-wrap items-center justify-center gap-2 lg:justify-start"
                >
                  {['Golf Course', 'Sunset Views', 'Walk to the Beach'].map(
                    (item) => (
                      <span
                        key={item}
                        className="
                          rounded-full
                          border
                          border-white/20
                          bg-white/10
                          px-3
                          py-1
                          
                          text-[9px]
                          md:text-[10px]
                          uppercase
                          tracking-[0.12em]
                          text-white/90
                          backdrop-blur-xl
                        "
                      >
                        {item}
                      </span>
                    )
                  )}
                </motion.div>

                {/* =================================================
                    SEO H1
                ================================================= */}
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="
                    mx-auto
                    max-w-3xl
                    font-display
                    text-4xl
                    leading-[0.96]
                    tracking-tight
                    text-white
                    sm:text-5xl
                    md:text-6xl
                    lg:mx-0
                    font-medium 
                    lg:text-7xl
                    xl:text-[72px]
                    hidden md:block
                  "
                >
                  <span> Luxury 6-Bedroom</span>
                  <br />
                  <span className="italic text-champagne">
                    Oceanfront Villa
                  </span>
                  <br />
                  in Paradise Island
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="
                    mx-auto
                    max-w-3xl
                    font-display
                    text-[40px]
                    leading-[0.96]
                    tracking-tight
                    text-white
                    sm:text-5xl
                    md:text-6xl
                    lg:mx-0
                    font-medium 
                    lg:text-7xl
                    xl:text-[72px]
                    block md:hidden
                    
                  "
                >
                  <span className="italic text-champagne">
                    Oceanfront Villa
                  </span>
                  <br />
                  <span className="text-[32px]">
                    {' '}
                    in Paradise Island, Bhamas
                  </span>
                </motion.h1>

                {/* =================================================
                    SUBTITLE
                ================================================= */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="
                    mx-auto
                    mt-1 md:mt-5
                    max-w-xl
                    text-base
                    text-white/70
                    md:text-xl
                    lg:mx-0
                  "
                >
                  Six bedrooms of oceanfront luxury, a private infinity pool,
                  and effortless access to Paradise Island — all within the
                  exclusive Ocean Club Estates.
                </motion.p>

                {/* =================================================
                    CTA
                ================================================= */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="mt-7 flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:justify-start"
                >
                  <Button
                    href="/booking-my-stay"
                    className=" text-midnight hover:bg-champagne"
                  >
                    Book Your Stay
                  </Button>

                  <a
                    href="tel:+12425555555"
                    className="
                      group
                      hidden md:inline-flex
                      items-center
                      gap-3
                      md:gap-4
                      border-b
                      border-white
                      pb-1
                      text-lg
                      md:text-xl
                      font-medium
                      text-white
                      transition-all
                      duration-300
                      hover:border-champagne
                      hover:text-champagne
                    "
                  >
                    <FiPhone
                      size={16}
                      className="transition-transform  duration-300 group-hover:-rotate-12 md:h-[18px] md:w-[18px]"
                    />
                    Call Us Now
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className=" md:hidden mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
                >
                  {['Golf Course', 'Sunset ', 'Walk to the Beach'].map(
                    (item) => (
                      <span
                        key={item}
                        className="
                          rounded-full
                          border
                          border-white/20
                          bg-white/10
                          px-3
                          py-1                  
                          text-[9px]
                          md:text-[10px]
                          uppercase
                          tracking-[0.12em]
                          text-white/90
                          backdrop-blur-xl
                        "
                      >
                        {item}
                      </span>
                    )
                  )}
                </motion.div>
              </div>

              {/* =================================================
                  RIGHT SIDE — hidden below lg
              ================================================= */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.35,
                }}
                className="hidden border-2  p-2 rounded-xl border-sand/40 bg-seaglass/30 backdrop-blur-xs lg:flex lg:items-end lg:justify-end"
              >
                <div className="flex w-full max-w-md items-end justify-end gap-4">
                  <div
                    className="
                      flex
                      min-w-[150px]
                      flex-col
                      justify-end
                      self-end
                      pb-1
                      text-white
                    "
                  >
                    <p className="font-display text-4xl leading-none text-white">
                      100+
                    </p>

                    <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/65">
                      Happy Guests
                    </p>

                    <div className="mt-4 flex items-center">
                      {guests.map((guest, index) => (
                        <div
                          key={guest}
                          className={`relative h-10  w-10 shrink-0 overflow-hidden rounded-full border-2 border-sand ${
                            index !== 0 ? '-ml-3' : ''
                          }`}
                          style={{
                            zIndex: guests.length - index,
                          }}
                        >
                          <Image
                            src={guest}
                            alt="Happy guest"
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full max-w-90">
                    <div className="group relative">
                      <div
                        className="
                          relative
                          aspect-[14/10]
                          overflow-hidden
                          rounded-2xl
                          border
                          border-white/20
                          bg-white/10
                          shadow-2xl
                          backdrop-blur-sm
                        "
                      >
                        <Image
                          src="/images/home/villa-video-thumbnail.jpg"
                          alt="Take a look inside Breakwater Villa"
                          fill
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                          sizes="360px"
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-linear-to-t
                            from-midnight/65
                            via-transparent
                            to-midnight/5
                            transition-colors
                            duration-500
                            group-hover:from-midnight/75
                          "
                        />

                        <button
                          type="button"
                          aria-label="Play Breakwater Villa video"
                          className="
                            absolute
                            left-1/2
                            top-1/2
                            flex
                            h-12
                            w-12
                            -translate-x-1/2
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-sand/35 
                            cursor-pointer
                            backdrop-blur-sm
                            text-ocean
                            shadow-2xl
                            transition-all
                            duration-500
                            group-hover:scale-110
                          "
                        >
                          <FiPlay
                            size={18}
                            fill="currentColor"
                            className="ml-0.5"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOOKING SEARCH BAR
          Mobile: outside the hero, normal flow, gap above it.
          md+: straddles the hero's bottom edge, as before.
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
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
    px-5
    md:absolute
    md:left-1/2
    md:bottom-0
    md:mt-0
    md:w-[calc(100%-2rem)]
    md:max-w-6xl
    md:-translate-x-1/2
    md:translate-y-1/2
    md:px-0
  "
      >
        <div
          className="
      overflow-hidden
      rounded-xl md:rounded-2xl
      border
      border-slate-200
      bg-white
      p-2
      shadow-none md:shadow-[0_20px_60px_rgba(11,42,58,0.18)]
    "
        >
          <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto]">
            {/* CHECK IN */}
            <div
              className="
          flex
          min-h-20
          items-center
          gap-3
          border-b
          border-r
          border-sand
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

              <div>
                <p
                  className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-slate-muted
            "
                >
                  Check In
                </p>

                <button
                  type="button"
                  className="
              mt-1
              flex
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
                  Select date
                  <FiChevronDown size={15} className="text-slate-muted" />
                </button>
              </div>
            </div>

            {/* CHECK OUT */}
            <div
              className="
          flex
          min-h-20
          items-center
          gap-3
          border-b
          border-sand
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

              <div>
                <p
                  className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-slate-muted
            "
                >
                  Check Out
                </p>

                <button
                  type="button"
                  className="
              mt-1
              flex
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
                  Select date
                  <FiChevronDown size={15} className="text-slate-muted" />
                </button>
              </div>
            </div>

            {/* GUESTS */}
            <div
              className="
          flex
          min-h-20
          items-center
          gap-3
          border-r
          border-sand
          px-4
          py-4
          md:min-h-26
          md:gap-4
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
                <FiUsers size={18} className="md:hidden" />
                <FiUsers size={20} className="hidden md:block" />
              </div>

              <div>
                <p
                  className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-slate-muted
            "
                >
                  Guests
                </p>

                <button
                  type="button"
                  className="
              mt-1
              flex
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
                  2 Guests
                  <FiChevronDown size={15} className="text-slate-muted" />
                </button>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="flex min-h-20 items-center justify-center p-2 md:min-h-26 md:p-3">
              <Link
                href="/availability"
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
            md:h-16
            md:min-w-45
            md:gap-3
            md:px-7
            md:text-base
          "
              >
                <FiCheck size={18} />

                <span>Check Availability</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
