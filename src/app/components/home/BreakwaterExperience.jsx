'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoArrowUpRight } from 'react-icons/go';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    number: '01',
    title: 'Oceanfront Living',
    description:
      'Wake to open water, slow mornings by the pool, and Caribbean sunsets just beyond your door.',
    image: '/images/home/breakwater-hero.jpg',
    href: '/villa-gallery',
  },
  {
    number: '02',
    title: 'Gather & Unwind',
    description:
      'Generous living spaces designed for long dinners, relaxed conversations, and unforgettable evenings together.',
    image: '/images/home/living-room.jpg',
    href: '/villa-gallery',
  },
  {
    number: '03',
    title: 'Island at Your Doorstep',
    description:
      'Enjoy the beaches, golf, dining, and experiences of Paradise Island from an exclusive oceanfront setting.',
    image: '/images/home/couch.jpg',
    href: '/amenities',
  },
];

export default function BreakwaterExperience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards.length) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         HEADER REVEAL
      ===================================================== */
      gsap.fromTo(
        header,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      );

      /* =====================================================
         CARDS REVEAL
      ===================================================== */
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 70,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 82%',
            once: true,
          },
        }
      );

      /* =====================================================
         IMAGE PARALLAX
      ===================================================== */
      cards.forEach((card) => {
        const image = card.querySelector('.experience-image');

        if (!image) return;

        gsap.fromTo(
          image,
          {
            scale: 1.08,
          },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-midnight

        py-16

        sm:py-20

        md:py-24

        lg:py-28

        xl:py-32

        2xl:py-36
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0 relative">
        <div
          className="
            absolute
            inset-0

            bg-linear-to-b
            from-midnight
            via-ocean/10
            to-midnight
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-0

            h-[320px]
            w-[90vw]
            -translate-x-1/2

            rounded-full
            bg-seaglass/5
            blur-[80px]

            sm:h-[380px]

            md:h-[420px]
            md:w-[600px]
            md:blur-[100px]

            lg:h-[460px]
            lg:w-[650px]

            xl:h-[500px]
            xl:w-[700px]
            xl:blur-[120px]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-360

          px-3

          sm:px-4

          md:px-6

          lg:px-8

          xl:px-10

          2xl:px-12
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}
        <div
          ref={headerRef}
          className="
            mx-auto
            mb-12
            max-w-3xl
            text-center
            sm:mb-13

            md:mb-14

            xl:mb-16
          "
        >
          <div
            className="border-b border-white pb-5 -top-13 absolute"
            id="villa-experience"
          ></div>
          {/* =================================================
              EYEBROW

              Bordered pill, matching Highlights/Gallery,
              with the champagne dot accent kept for tone.
          ================================================= */}
          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2

              rounded-full
              border
              border-white/15
              bg-white/5
              px-3
              py-1.5

              sm:mb-6
              sm:px-3.5

              md:px-4
            "
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-champagne

                sm:text-[10px]

                lg:text-[11px]
              "
            >
              The Breakwater Experience
            </span>
          </div>

          {/* Heading */}
          <h2
            className="
              font-display
              font-medium
              leading-[1.05]
              tracking-tight
              text-white

              text-[40px]

              sm:text-5xl

              md:text-6xl

              lg:text-[56px]

              xl:text-[64px]

              2xl:text-[72px]
            "
          >
            Days that move
            <br />
            <span className="italic text-champagne">at your pace.</span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-5
              w-full

              max-w-xl
              text-base
              leading-6
              text-white/55

              sm:mt-6
              sm:text-lg
              sm:leading-7

              sm:max-w-3xl
              xl:text-xl
              xl:leading-8
            "
          >
            From quiet mornings by the water to evenings shared under the
            Caribbean sky, every moment at Breakwater is designed to be
            remembered.
          </p>
        </div>

        {/* ===================================================
            EXPERIENCE CARDS
        =================================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-4

            sm:gap-5

            md:grid-cols-3

            xl:gap-6

            2xl:gap-8
          "
        >
          {experiences.map((experience, index) => (
            <Link
              key={experience.number}
              href={experience.href}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="
                group
                relative
                block
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-ocean/20
                opacity-0
              "
            >
              {/* =================================================
                  IMAGE
              ================================================= */}
              <div
                className="
                  relative
                  overflow-hidden

                  h-[390px]

                  md:h-[420px]

                  lg:h-[460px]

                  xl:h-[500px]

                  2xl:h-[540px]
                "
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="
                    experience-image
                    object-cover
                    transition-transform
                    duration-1000
                    ease-out
                    group-hover:scale-105
                  "
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Dark overlay */}
                <div
                  className="
                    absolute
                    inset-0

                    bg-linear-to-t
                    from-midnight
                    via-midnight/30
                    to-midnight/5

                    transition-all
                    duration-700
                    group-hover:from-midnight/90
                  "
                />

                {/* Slight hover overlay */}
                <div className="absolute inset-0 bg-midnight/0 transition-colors duration-700 group-hover:bg-midnight/10" />

                {/* =================================================
                    NUMBER
                ================================================= */}
                <div
                  className="
                    absolute
                    left-5
                    top-5

                    md:left-6
                    md:top-6

                    xl:left-7
                    xl:top-7
                  "
                >
                  <span
                    className="
                      font-display
                      text-white/40

                      text-3xl

                      xl:text-4xl
                    "
                  >
                    {experience.number}
                  </span>
                </div>

                {/* =================================================
                    ARROW
                ================================================= */}
                <div
                  className="
                    absolute
                    right-5
                    top-5
                    flex
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/5
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-500
                    group-hover:rotate-45
                    group-hover:border-champagne
                    group-hover:bg-champagne
                    group-hover:text-midnight

                    h-10
                    w-10

                    md:right-6
                    md:top-6

                    xl:right-7
                    xl:top-7
                    xl:h-11
                    xl:w-11
                  "
                >
                  <GoArrowUpRight size={17} className="xl:size-[19px]" />
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0

                    p-5

                    md:p-6

                    xl:p-7
                  "
                >
                  <p
                    className="
                      mb-2
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.22em]
                      text-champagne

                      xl:text-[10px]
                    "
                  >
                    Experience {experience.number}
                  </p>

                  <h3
                    className="
                      font-display
                      leading-none
                      text-white

                      text-2xl

                      md:text-[28px]

                      xl:text-[32px]
                    "
                  >
                    {experience.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-sm
                      leading-5
                      text-white/60

                      text-xs

                      transition-colors
                      duration-500
                      group-hover:text-white/75

                      md:text-sm

                      xl:mt-4
                      xl:max-w-md
                      xl:text-base
                      xl:leading-6
                    "
                  >
                    {experience.description}
                  </p>

                  {/* Explore */}
                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2

                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-white/80

                      xl:mt-6
                      xl:text-[11px]
                    "
                  >
                    <span>Explore</span>

                    <span className="h-px w-7 bg-white/40 transition-all duration-500 group-hover:w-12 group-hover:bg-champagne" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
