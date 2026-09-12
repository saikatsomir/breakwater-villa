'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

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
      "
    >
      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="mx-auto max-w-360">
        <div
          className="
            relative
            flex
          h-140
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            sm:rounded-3xl
          "
        >
          {/* =================================================
              BACKGROUND IMAGE
          ================================================= */}

          <div ref={imageRef} className="absolute inset-[-4%] opacity-0">
            <img
              src="/images/home/front-side.jpg"
              alt="Breakwater Villa luxury oceanfront vacation rental in Paradise Island, Bahamas"
              className="h-full w-full object-cover"
            />
          </div>

          {/* =================================================
              OVERLAY
          ================================================= */}

          <div className="absolute inset-0 bg-gradient-to-t from-midnight/75 via-midnight/30 to-transparent" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(49,75,53,0.45),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(49,75,53,0.35),transparent_55%)]" />

          {/* =================================================
              CENTER CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[560px]
              w-full
              items-center
              justify-center
              px-5
              py-20
              sm:min-h-[640px]
              sm:px-6
              sm:py-24
              md:min-h-[700px]
              md:py-28
              lg:min-h-[760px]
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
              "
            >
              {/* Eyebrow */}

              <div className="mb-6 flex items-center gap-3 sm:mb-7">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B68A52] sm:h-3 sm:w-3" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/75 sm:text-[9px] sm:tracking-[0.28em]">
                  Reservations
                </span>
              </div>

              {/* Title */}

              <h2
                id="final-booking-cta-heading"
                className="
                  max-w-4xl
                  font-display
                  text-[42px]
                  font-medium
                  leading-[0.94]
                  tracking-tight
                  text-white
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[80px]
                "
              >
                Your time in paradise
                <br />
                <span className="italic text-[#B68A52]">starts here.</span>
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
                "
              >
                Come experience the quiet luxury, privacy, and natural beauty of
                Breakwater Villa on Paradise Island.
              </p>

              {/* Button */}

              <div className="mt-8 sm:mt-9">
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
