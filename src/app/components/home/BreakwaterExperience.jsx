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
      className="relative overflow-hidden   bg-midnight py-20 md:py-24 lg:py-28"
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-ocean/10 to-midnight" />

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-seaglass/5 blur-[120px]" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-0">
        {/* ===================================================
            HEADER
        =================================================== */}
        <div
          ref={headerRef}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
        >
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-champagne/60" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne">
              The Breakwater Experience
            </span>

            <span className="h-px w-8 bg-champagne/60" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl leading-[1] tracking-tight text-white sm:text-5xl md:text-6xl">
            Days that move
            <br />
            <span className="italic text-champagne">at your pace.</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-6 text-white/55 md:text-lg">
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
            md:grid-cols-3
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
              <div className="relative h-[390px] overflow-hidden md:h-[420px]">
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
                    bg-gradient-to-t
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
                <div className="absolute left-5 top-5 md:left-6 md:top-6">
                  <span className="font-display text-3xl text-white/40">
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
                    h-10
                    w-10
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
                    md:right-6
                    md:top-6
                  "
                >
                  <GoArrowUpRight size={17} />
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.22em] text-champagne">
                    Experience {experience.number}
                  </p>

                  <h3 className="font-display text-2xl leading-none text-white md:text-[28px]">
                    {experience.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-sm
                      text-xs
                      leading-5
                      text-white/60
                      transition-colors
                      duration-500
                      group-hover:text-white/75
                      md:text-sm
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
