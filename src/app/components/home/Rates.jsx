'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const rates = [
  {
    period: 'December 15th — January 8th',
    season: 'Holiday Season',
    price: '$17,100',
  },
  {
    period: 'January 9th — April 14th',
    season: 'Winter Season',
    price: '$12,300',
  },
  {
    period: 'April 15th — December 15th',
    season: 'Summer Season',
    price: '$10,900',
  },
];

export default function Rates() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* =====================================================
          HEADER REVEAL
      ===================================================== */

      gsap.fromTo(
        headerRef.current.children,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      /* =====================================================
          CARDS REVEAL
      ===================================================== */

      gsap.fromTo(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="rates-heading"
      className="
        overflow-hidden
        bg-[#f4f3f0]
        py-20
        sm:py-24
        md:py-32
        lg:py-40
      "
    >
      <div
        className="
          mx-auto
          max-w-360
          px-4
          sm:px-5
          md:px-8
          lg:px-0
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          ref={headerRef}
          className="
            grid
            gap-8
            sm:gap-10
            lg:grid-cols-[1fr_0.8fr]
            lg:items-end
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT — TITLE
          ================================================= */}

          <div>
            {/* Eyebrow */}

            <div className="mb-5 flex items-center gap-3 sm:mb-7">
              <span className="h-2.5 w-2.5 rounded-full bg-midnight sm:h-3 sm:w-3" />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-slate-muted
                  sm:text-sm
                  sm:tracking-[0.25em]
                "
              >
                Rates
              </span>
            </div>

            {/* Title */}

            <h2
              id="rates-heading"
              className="
                max-w-3xl
                font-display
                text-[42px]
                font-medium
                leading-[0.95]
                tracking-tight
                text-midnight
                sm:text-5xl
                md:text-6xl
                lg:text-[72px]
              "
            >
              Your stay,
              <br />
              <span className="italic text-[#B68A52]">your season.</span>
            </h2>
          </div>

          {/* =================================================
              RIGHT — SUBTITLE + BUTTON
          ================================================= */}

          <div
            className="
              max-w-lg
              lg:justify-self-end
            "
          >
            <p
              className="
                max-w-lg
                text-sm
                leading-6
                text-slate-muted
                sm:text-base
                sm:leading-7
                md:text-lg
                md:leading-8
                lg:text-right
              "
            >
              Explore our seasonal nightly rates and find the perfect time for
              your stay at Breakwater Villa.
            </p>

            <div className="mt-6 sm:mt-8 lg:flex lg:justify-end">
              <Button href="/booking-my-stay" className="sm:w-auto">
                Book Your Stay
              </Button>
            </div>
          </div>
        </div>

        {/* =====================================================
            CARDS
        ===================================================== */}

        <div
          ref={cardsRef}
          className="
            mt-10
            grid
            gap-3
            sm:mt-12
            sm:gap-4
            md:mt-16
            md:grid-cols-2
            md:gap-5
            lg:mt-20
            lg:grid-cols-4
          "
        >
          {/* =================================================
              IMAGE CARD
          ================================================= */}

          <div
            className="
              group
              relative
              h-[300px]
              overflow-hidden
              rounded-xl
              bg-midnight
              opacity-0
              sm:h-[330px]
              sm:rounded-2xl
              md:h-[360px]
              lg:h-120
            "
          >
            <Image
              src="/images/home/terrace.jpg"
              alt="Oceanfront terrace at Breakwater Villa in Paradise Island, Bahamas"
              fill
              className="
                object-cover
                transition-transform
                duration-[1200ms]
                ease-out
                group-hover:scale-[1.04]
              "
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 768px) 50vw,
                (max-width: 1024px) 50vw,
                25vw
              "
            />

            {/* Image Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-midnight/65 via-midnight/10 to-transparent" />

            {/* Image Content */}

            <div
              className="
                absolute
                bottom-5
                left-5
                right-5
                sm:bottom-7
                sm:left-7
                sm:right-7
                lg:bottom-8
                lg:left-8
                lg:right-8
              "
            >
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#B68A52]
                  sm:text-[9px]
                  sm:tracking-[0.24em]
                "
              >
                Breakwater Villa
              </p>

              <p
                className="
                  mt-1.5
                  font-display
                  text-2xl
                  leading-none
                  text-white
                  sm:mt-2
                  sm:text-3xl
                  lg:text-4xl
                "
              >
                Paradise Island
              </p>
            </div>
          </div>

          {/* =================================================
              PRICING CARDS
          ================================================= */}

          {rates.map((rate, index) => (
            <article
              key={rate.season}
              className="
                group
                flex
                h-[250px]
                flex-col
                justify-between
                rounded-xl
                bg-white
                p-5
                opacity-0
                shadow-[0_8px_30px_rgba(11,42,58,0.06)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_14px_38px_rgba(11,42,58,0.10)]
                sm:h-[280px]
                sm:rounded-2xl
                sm:p-6
                md:h-[300px]
                md:p-7
                lg:h-120
                lg:p-8
              "
            >
              {/* =================================================
                  TOP
              ================================================= */}

              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="
                      font-display
                      text-sm
                      italic
                      text-[#B68A52]
                      sm:text-base
                    "
                  >
                    0{index + 1}
                  </span>

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#B68A52]/60
                      transition-colors
                      duration-300
                      group-hover:bg-[#B68A52]
                      sm:h-2
                      sm:w-2
                    "
                  />
                </div>

                <div className="mt-7 sm:mt-9 md:mt-10 lg:mt-12">
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-slate-muted
                      sm:text-[9px]
                      sm:tracking-[0.2em]
                    "
                  >
                    Seasonal Rate
                  </p>

                  <h3
                    className="
                      mt-2
                      font-display
                      text-2xl
                      font-medium
                      leading-none
                      text-midnight
                      sm:mt-3
                      sm:text-3xl
                      lg:text-4xl
                    "
                  >
                    {rate.season}
                  </h3>
                </div>
              </div>

              {/* =================================================
                  BOTTOM
              ================================================= */}

              <div>
                <div
                  className="
                    border-t
                    border-slate/10
                    pt-4
                    sm:pt-5
                    lg:pt-6
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      leading-4
                      tracking-[0.11em]
                      text-slate-muted
                      sm:text-[9px]
                      sm:leading-5
                      sm:tracking-[0.13em]
                    "
                  >
                    {rate.period}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 lg:mt-8">
                  <p
                    className="
                      font-display
                      text-3xl
                      font-medium
                      leading-none
                      tracking-tight
                      text-midnight
                      sm:text-4xl
                      lg:text-5xl
                    "
                  >
                    {rate.price}
                  </p>

                  <p
                    className="
                      mt-1.5
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-slate-muted
                      sm:mt-2
                      sm:text-[9px]
                      sm:tracking-[0.18em]
                    "
                  >
                    Per Night · USD
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
