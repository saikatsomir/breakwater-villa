'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/SiteButton';

gsap.registerPlugin(ScrollTrigger);

export default function FinalBookingCTA() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         IMAGE REVEAL
      ===================================================== */

      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 1.04,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      /* =====================================================
         IMAGE PARALLAX
      ===================================================== */

      gsap.fromTo(
        imageRef.current,
        {
          yPercent: -3,
        },
        {
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      /* =====================================================
         CONTENT REVEAL
      ===================================================== */

      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: [0.22, 1, 0.36, 1],
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 78%',
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
      aria-labelledby="final-booking-cta-heading"
      className="
        bg-white

        px-3
        pb-20
        pt-3

        sm:px-4
        sm:pb-24
        sm:pt-4

        md:px-6
        md:pb-28
        md:pt-6

        lg:px-8
        lg:pb-32
        lg:pt-8

        xl:px-10
        xl:pb-36

        2xl:px-12
        2xl:pb-40
      "
    >
      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full max-w-360">
        <div
          className="
            relative
            flex
            items-center
            justify-center
            overflow-hidden
            rounded-2xl

            h-[500px]

            sm:h-[600px]
            sm:rounded-3xl

            md:h-[680px]

            lg:h-[560px]

            xl:h-[600px]

            2xl:h-[680px]
          "
        >
          {/* =================================================
              BACKGROUND IMAGE
          ================================================= */}

          <div ref={imageRef} className="absolute inset-[-4%] opacity-0">
            <img
              src="/images/home/highlights.jpg"
              alt="32 ocean luxury Ocean View vacation rental in Paradise Island, Bahamas"
              className="h-full w-full object-cover"
            />
          </div>

          {/* =================================================
              OVERLAY

              Rebuilt for actual legibility: a full bottom-to-top
              dark fade guarantees coverage behind the text block,
              a subtle top fade protects the eyebrow badge, and a
              midnight-toned radial (replacing the old off-brand
              green one) reinforces contrast right behind the
              heading rather than only darkening the corners.
          ================================================= */}

          <div
            className="
              absolute
              inset-0

              bg-linear-to-t
              from-midnight/90
              via-midnight/55
              to-midnight/10
            "
          />

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-1/3

              bg-linear-to-b
              from-midnight/40
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(ellipse_at_center,rgba(11,42,58,0.55),transparent_60%)]
            "
          />

          {/* =================================================
              CENTER CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              h-full
              w-full
              items-center
              justify-center

              px-5
              py-16

              sm:px-6
              sm:py-20

              md:py-24

              lg:py-28
            "
          >
            <div
              ref={contentRef}
              className="
                flex
                w-full
                max-w-3xl
                flex-col
                items-center
                text-center

                xl:max-w-4xl
              "
            >
              {/* Eyebrow */}

              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2

                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-3
                  py-1.5

                  backdrop-blur-md

                  sm:mb-7
                  sm:px-3.5

                  md:px-4
                "
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-white/85

                    sm:text-[9px]
                    sm:tracking-[0.28em]

                    lg:text-[10px]
                  "
                >
                  Reservations
                </span>
              </div>

              {/* Title */}

              <h2
                id="final-booking-cta-heading"
                className="
                  max-w-4xl
                  font-display
                  font-medium
                  leading-[1.02]
                  tracking-tight
                  text-white

                  text-[42px]

                  sm:text-[56px]

                  md:text-[68px]

                  lg:text-[80px]

                  xl:text-[88px]

                  2xl:text-[96px]
                "
              >
                Your time in paradise
                <br />
                <span className="italic text-champagne">starts here.</span>
              </h2>

              {/* Subtitle */}

              <p
                className="
                  mt-5
                  max-w-lg
                  text-base
                  leading-6
                  text-white/85

                  sm:mt-6
                  sm:leading-7

                  md:text-lg
                  md:leading-7

                  lg:mt-7

                  xl:max-w-xl
                  xl:text-xl
                  xl:leading-8
                "
              >
                Come experience the quiet luxury, privacy, and natural beauty of
                32 ocean on Paradise Island.
              </p>

              {/* Button */}

              <div
                className="
                  mt-8

                  sm:mt-9

                  lg:mt-10
                "
              >
                <Button
                  href="/booking-my-stay"
                  className="
                    border-sand!
                    hover:border-midnight!
                  "
                >
                  Book Your Stay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
