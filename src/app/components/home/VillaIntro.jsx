'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { GoArrowUpRight } from 'react-icons/go';

import Button from '../ui/SiteButton';
import villa from '../../../../public/images/home/villa.jpg';

const stats = [
  { value: '6', label: 'Bedrooms' },
  { value: '6', label: 'Bathrooms' },
  { value: '10', label: 'Guests' },
];

export default function VillaIntro() {
  return (
    <section
      aria-labelledby="villa-intro-heading"
      className="
        relative
        overflow-hidden
        bg-white

        py-20

        sm:py-24

        md:py-32

        lg:py-40

        xl:py-44

        2xl:py-52
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-360

          px-3

          sm:px-4

          md:px-6

          lg:px-8

          xl:px-10

          2xl:px-0
        "
      >
        <div
          className="
            grid
            items-center
            gap-14

            sm:gap-16

            md:gap-20

            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-20

            xl:gap-28
          "
        >
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
            {/* =================================================
                EYEBROW

                Same pill treatment as Hero's key-point chips.
            ================================================= */}

            <div
              className="
                mb-6
                inline-flex
                items-center
                gap-2

                rounded-full
                border
                border-slate-200
                bg-mist
                px-3
                py-1.5

                sm:mb-7
                sm:px-3.5

                md:px-4
              "
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#B58A52]" />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-slate-muted

                  sm:text-[10px]

                  lg:text-[11px]
                "
              >
                The Villa
              </span>
            </div>

            {/* =================================================
                HEADING

                Matches Hero's desktop H1 scale (48px xl / 64px 2xl)
                so this section heading doesn't outsize the page H1.
            ================================================= */}

            <h2
              id="villa-intro-heading"
              className="
                max-w-2xl
                font-display
                font-medium
                leading-[1.05]
                tracking-tight
                text-black

                text-[40px]

                sm:text-5xl

                md:text-6xl

                lg:text-[56px]

                xl:text-[64px]

                2xl:text-[72px]
              "
            >
              A private escape,
              <br />
              designed for
              <br />
              <span className="italic text-[#B58A52]">
                unforgettable stays.
              </span>
            </h2>

            {/* =================================================
                DESCRIPTION

                Same subtitle scale as Hero's hero paragraph.
            ================================================= */}

            <div
              className="
                mt-7
                space-y-4

                text-sm
                leading-6.5
                text-slate-muted

                sm:mt-8
                sm:space-y-5
                sm:text-base
                sm:leading-7

                md:text-lg
                md:leading-8

                lg:mt-9

                xl:max-w-lg
                xl:text-lg

                2xl:text-xl
                2xl:leading-9
              "
            >
              <p>
                Welcome to 32 ocean — a private Ocean View retreat created for
                slow mornings, long afternoons by the pool, and evenings spent
                together overlooking the Caribbean.
              </p>

              <p>
                Set within the exclusive Ocean View Villa on Paradise Island,
                the villa combines generous living spaces, six private bedrooms,
                and effortless access to the best of The Bahamas.
              </p>
            </div>

            {/* =================================================
                STATS

                Redesigned as bordered cards, matching the
                card treatment used in Hero's booking bar.
            ================================================= */}

            <div
              className="
                mt-8
                grid
                grid-cols-3
                gap-3

                sm:mt-10
                sm:gap-4

                lg:mt-11
              "
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="
                    rounded-xl
                    border
                    border-slate-100
                    bg-white
                    px-3
                    py-4

                    text-center

                    shadow-[0_2px_10px_rgba(11,42,58,0.04)]

                    sm:rounded-2xl
                    sm:px-4
                    sm:py-5

                    xl:py-6
                  "
                >
                  <p
                    className="
                      font-display
                      leading-none
                      text-midnight

                      text-3xl

                      sm:text-4xl

                      md:text-5xl

                      xl:text-[54px]
                    "
                  >
                    {stat.value}
                  </p>

                  <p
                    className="
                      mt-2
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-slate-muted

                      sm:text-[9px]
                      sm:tracking-[0.18em]

                      lg:mt-3
                    "
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* =================================================
                CTA ROW

                Same pattern as Hero: filled Button +
                underlined secondary link, hidden below md.
            ================================================= */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-4

                sm:mt-10
                sm:gap-6

                lg:mt-11
              "
            >
              <Button
                href="/villa-gallery"
                className="
                  text-white
                  hover:bg-champagne
                  hover:text-midnight
                "
              >
                Explore The Villa
              </Button>

              <Link
                href="/villa-gallery"
                aria-label="View the full 32 ocean gallery"
                className="
                  group
                  hidden
                  items-center
                  gap-3
                  border-b
                  border-midnight
                  pb-1

                  text-base
                  font-medium
                  text-midnight

                  transition-all
                  duration-300

                  md:inline-flex

                  lg:text-lg

                  hover:border-champagne
                  hover:text-champagne
                "
              >
                View Full Gallery
                <GoArrowUpRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:rotate-45
                  "
                />
              </Link>
            </div>
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
            {/* =================================================
                BACKGROUND DROP GRADIENT

                Champagne glow behind the frame, matching
                the accent token used across Hero/Navbar.
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-4
                -z-10

                rounded-[2rem]
                bg-linear-to-br
                from-champagne/35
                via-champagne/10
                to-transparent

                blur-2xl

                sm:-inset-6
                sm:rounded-[2.5rem]

                md:-inset-8

                lg:-inset-10
                lg:blur-3xl

                xl:-inset-12
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-6
                -right-6
                -z-10
                h-40
                w-40

                rounded-full
                bg-linear-to-tl
                from-midnight/25
                to-transparent

                blur-3xl

                sm:-bottom-8
                sm:-right-8
                sm:h-52
                sm:w-52

                lg:h-64
                lg:w-64

                xl:h-72
                xl:w-72
              "
            />

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
                lg:rounded-[1.75rem]

                xl:rounded-[2rem]
              "
            >
              <Image
                src={villa.src}
                alt="32 ocean private Ocean View residence in Paradise Island"
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

              {/* =============================================
                  IMAGE OVERLAY — bold bottom fade

                  Same ratio as Hero's own bottom fade so the
                  dark treatment feels consistent site-wide.
              ============================================= */}

              <div className="absolute inset-0 bg-midnight/10" />

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-[60%]

                  bg-linear-to-t
                  from-midnight/90
                  via-midnight/45
                  to-transparent
                "
              />

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
                      text-champagne

                      sm:text-[9px]
                      sm:tracking-[0.22em]
                    "
                  >
                    32 ocean
                  </p>

                  <p
                    className="
                      mt-1
                      truncate
                      font-display
                      leading-none
                      text-white

                      text-xl

                      sm:text-2xl

                      md:text-3xl

                      xl:text-4xl
                    "
                  >
                    Paradise Island
                  </p>
                </div>

                <Link
                  href="/villa-gallery"
                  aria-label="View 32 ocean gallery"
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
                    hover:bg-champagne

                    sm:h-11
                    sm:w-11

                    xl:h-12
                    xl:w-12
                  "
                >
                  <GoArrowUpRight size={17} className="sm:hidden" />

                  <GoArrowUpRight
                    size={19}
                    className="hidden sm:block xl:hidden"
                  />

                  <GoArrowUpRight size={20} className="hidden xl:block" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
