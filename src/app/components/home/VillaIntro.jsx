'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { GoArrowUpRight } from 'react-icons/go';
import villa from '../../../../public/images/home/villa.jpg';

export default function VillaIntro() {
  return (
    <section
      aria-labelledby="villa-intro-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 md:py-32 lg:py-40 xl:py-44"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-5 md:px-8 lg:px-10 xl:px-0">
        <div className="grid items-center gap-14 sm:gap-16 md:gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">
          {/* =====================================================
              LEFT — CONTENT
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="order-2 max-w-xl lg:order-1"
          >
            {/* Eyebrow */}

            <div className="mb-6 flex items-center gap-3 sm:mb-7">
              <span className="h-3 w-3 rounded-full bg-midnight" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.23em] text-slate-muted sm:text-[10px] sm:tracking-[0.25em]">
                The Villa
              </span>
            </div>

            {/* Heading */}

            <h2
              id="villa-intro-heading"
              className="
                max-w-2xl
                font-display
                text-[40px]
                font-medium
                leading-[0.98]
                tracking-tight
                text-black
                sm:text-5xl
                md:text-6xl
                lg:text-[62px]
                xl:text-[68px]
              "
            >
              A private escape,
              <br />
              designed for
              <br />
              <span className="italic text-[#B68A52]">
                unforgettable stays.
              </span>
            </h2>

            {/* Description */}

            <div className="mt-7 space-y-4 text-sm leading-6.5 text-slate-muted sm:mt-8 sm:space-y-5 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              <p>
                Welcome to Breakwater Villa — a private oceanfront retreat
                created for slow mornings, long afternoons by the pool, and
                evenings spent together overlooking the Caribbean.
              </p>

              <p>
                Set within the exclusive Ocean Club Estates on Paradise Island,
                the villa combines generous living spaces, six private bedrooms,
                and effortless access to the best of The Bahamas.
              </p>
            </div>

            {/* =================================================
                STATS
            ================================================= */}

            <div className="mt-8 grid grid-cols-3 border-y border-slate/10 py-6 sm:mt-10 sm:py-7">
              {/* Stat 1 */}

              <div className="border-r border-slate/10 pr-3 sm:pr-4">
                <p className="font-display text-3xl leading-none text-midnight sm:text-4xl md:text-5xl">
                  6
                </p>

                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-muted sm:text-[9px] sm:tracking-[0.18em]">
                  Bedrooms
                </p>
              </div>

              {/* Stat 2 */}

              <div className="border-r border-slate/10 px-3 sm:px-4">
                <p className="font-display text-3xl leading-none text-midnight sm:text-4xl md:text-5xl">
                  6
                </p>

                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-muted sm:text-[9px] sm:tracking-[0.18em]">
                  Bathrooms
                </p>
              </div>

              {/* Stat 3 */}

              <div className="pl-3 sm:pl-4">
                <p className="font-display text-3xl leading-none text-midnight sm:text-4xl md:text-5xl">
                  12
                </p>

                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-muted sm:text-[9px] sm:tracking-[0.18em]">
                  Guests
                </p>
              </div>
            </div>

            {/* =================================================
                LINK
            ================================================= */}

            <Link
              href="/villa-gallery"
              aria-label="Explore Breakwater Villa and view the villa gallery"
              className="
                group
                mt-8
                hidden
                items-center
                gap-3
                text-sm
                font-medium
                tracking-wide
                text-midnight
                md:inline-flex
                sm:mt-9
                sm:gap-4
                sm:text-base
              "
            >
              <span className="relative">
                Explore The Villa
                <span
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-px
                    w-full
                    origin-left
                    bg-midnight
                    transition-transform
                    duration-500
                    group-hover:scale-x-0
                  "
                />
              </span>

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate/15
                  bg-white
                  transition-all
                  duration-500
                  group-hover:border-[#B68A52]
                  group-hover:bg-[#B68A52]
                  sm:h-10
                  sm:w-10
                "
              >
                <GoArrowUpRight
                  size={16}
                  className="
                    transition-transform
                    duration-500
                    group-hover:rotate-45
                    sm:size-[17px]
                  "
                />
              </span>
            </Link>
          </motion.div>

          {/* =====================================================
              RIGHT — VILLA IMAGE
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative order-1 lg:order-2"
          >
            {/* Image frame */}

            <div
              className="
                relative
                aspect-[4/3]
                w-full
                overflow-hidden
                rounded-xl
                sm:aspect-[5/4]
                sm:rounded-2xl
                lg:aspect-[5/4]
              "
            >
              <Image
                src={villa.src}
                alt="Breakwater Villa private oceanfront residence in Ocean Club Estates, Paradise Island, Bahamas"
                fill
                priority={false}
                className="
                  object-cover
                  transition-transform
                  duration-[1200ms]
                  ease-out
                  hover:scale-[1.03]
                "
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 100vw,
                  55vw
                "
              />

              {/* Image overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-midnight/45 via-midnight/5 to-transparent" />

              {/* Image label */}

              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  right-4
                  flex
                  items-end
                  justify-between
                  gap-4
                  sm:bottom-6
                  sm:left-6
                  sm:right-6
                  md:bottom-8
                  md:left-8
                  md:right-8
                "
              >
                <div className="min-w-0">
                  <p
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.2em]
                      text-midnight
                      sm:text-[9px]
                      sm:tracking-[0.22em]
                    "
                  >
                    Breakwater Villa
                  </p>

                  <p
                    className="
                      mt-1
                      truncate
                      font-display
                      text-xl
                      leading-none
                      text-white
                      sm:text-2xl
                      md:text-3xl
                    "
                  >
                    Paradise Island
                  </p>
                </div>

                <Link
                  href="/villa-gallery"
                  aria-label="View Breakwater Villa gallery"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-midnight
                    transition-all
                    duration-500
                    hover:rotate-45
                    hover:bg-[#B68A52]
                    sm:h-11
                    sm:w-11
                  "
                >
                  <GoArrowUpRight size={17} className="sm:hidden" />

                  <GoArrowUpRight size={19} className="hidden sm:block" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
