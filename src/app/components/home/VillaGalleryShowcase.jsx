'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from 'react-icons/go';

const galleryItems = [
  {
    number: '01',
    title: 'The Living Room',
    category: 'Living Spaces',
    description: 'Elegant interiors designed for effortless island living.',
    image: '/images/home/couch.jpg',
  },
  {
    number: '02',
    title: 'Oceanfront Pool',
    category: 'Outdoor Living',
    description: 'A private infinity pool overlooking the Caribbean.',
    image: '/images/home/highlights.jpg',
  },
  {
    number: '03',
    title: 'Master Bedroom',
    category: 'Bedrooms',
    description: 'Wake up to beautiful ocean views in complete comfort.',
    image: '/images/home/living-room.jpg',
  },
  {
    number: '04',
    title: 'The Kitchen',
    category: 'Interior',
    description: 'A beautifully appointed kitchen made for gathering.',
    image: '/images/home/kitchen.jpg',
  },
  {
    number: '05',
    title: 'Oceanfront Terrace',
    category: 'Outdoor Living',
    description: 'Open-air spaces made for slow mornings and sunsets.',
    image: '/images/home/terrace.jpg',
  },
  {
    number: '06',
    title: 'Dining Area',
    category: 'Living Spaces',
    description: 'Gather around the table for unforgettable evenings.',
    image: '/images/home/dining.jpg',
  },
  {
    number: '07',
    title: 'Guest Bedroom',
    category: 'Bedrooms',
    description: 'Quiet, comfortable spaces for peaceful island nights.',
    image: '/images/home/guest-bedroom.jpg',
  },
  {
    number: '08',
    title: 'Private Beach',
    category: 'The Outdoors',
    description: 'Step closer to the turquoise waters of Paradise Island.',
    image: '/images/home/pool.jpg',
  },
  {
    number: '10',
    title: 'Villa Exterior',
    category: 'The Villa',
    description: 'Your private retreat in the heart of Paradise Island.',
    image: '/images/home/breakwater-hero.jpg',
  },
];

const infiniteItems = [...galleryItems, ...galleryItems, ...galleryItems];

export default function VillaGalleryShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const currentIndex = useRef(galleryItems.length);
  const autoScrollRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isInteractingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  /* ==========================================================
      GET CARD POSITION

      The active card is always centered in the viewport.

      Desktop:
      partial | previous | ACTIVE | next | partial

      Mobile:
      partial | ACTIVE | partial
  ========================================================== */

  const getCardX = (index) => {
    const card = cardRefs.current[index];
    const track = trackRef.current;

    if (!card || !track) return 0;

    const cardWidth = card.offsetWidth;
    const viewportWidth = window.innerWidth;

    const centeredPosition = viewportWidth / 2 - cardWidth / 2;

    return centeredPosition - card.offsetLeft;
  };

  /* ==========================================================
      MOVE TO CARD
  ========================================================== */

  const moveToIndex = (
    targetIndex,
    { duration = 0.8, immediate = false } = {}
  ) => {
    const track = trackRef.current;

    if (!track) return;

    const targetCard = cardRefs.current[targetIndex];

    if (!targetCard) return;

    const targetX = getCardX(targetIndex);

    if (immediate) {
      gsap.set(track, {
        x: targetX,
      });

      return;
    }

    isAnimatingRef.current = true;

    gsap.to(track, {
      x: targetX,
      duration,
      ease: 'power3.inOut',
      overwrite: true,
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  };

  /* ==========================================================
      NORMALIZE INFINITE POSITION
  ========================================================== */

  const normalizePosition = () => {
    const total = galleryItems.length;
    const current = currentIndex.current;

    /*
     * We have:
     *
     * 0 → first set
     * N → middle set
     * 2N → third set
     *
     * Once we reach the third set, silently
     * move back to the middle set.
     */

    if (current >= total * 2) {
      currentIndex.current = current - total;

      moveToIndex(currentIndex.current, {
        immediate: true,
      });
    }

    if (current < total) {
      currentIndex.current = current + total;

      moveToIndex(currentIndex.current, {
        immediate: true,
      });
    }
  };

  /* ==========================================================
      MOVE NEXT
  ========================================================== */

  const moveNext = ({ automatic = false } = {}) => {
    if (isAnimatingRef.current) return;

    currentIndex.current += 1;

    const logicalIndex = currentIndex.current % galleryItems.length;

    setActiveIndex(logicalIndex);

    moveToIndex(currentIndex.current, {
      duration: automatic ? 1.1 : 0.85,
    });

    setTimeout(
      () => {
        normalizePosition();
      },
      automatic ? 1150 : 900
    );
  };

  /* ==========================================================
      MOVE PREVIOUS
  ========================================================== */

  const movePrevious = () => {
    if (isAnimatingRef.current) return;

    currentIndex.current -= 1;

    const logicalIndex =
      ((currentIndex.current % galleryItems.length) + galleryItems.length) %
      galleryItems.length;

    setActiveIndex(logicalIndex);

    moveToIndex(currentIndex.current, {
      duration: 0.85,
    });

    setTimeout(() => {
      normalizePosition();
    }, 900);
  };

  /* ==========================================================
      AUTO SCROLL
  ========================================================== */

  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      if (isHoveringRef.current) return;
      if (isInteractingRef.current) return;
      if (isAnimatingRef.current) return;

      moveNext({
        automatic: true,
      });
    }, 3200);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  /* ==========================================================
      INITIAL SETUP
  ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      /*
       * Put the carousel at the middle copy
       * and center the active card.
       */

      requestAnimationFrame(() => {
        moveToIndex(currentIndex.current, {
          immediate: true,
        });
      });

      /* =====================================================
          HEADER REVEAL
      ===================================================== */

      gsap.fromTo(
        '.gallery-header',
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        }
      );

      /* =====================================================
          CARD REVEAL
      ===================================================== */

      gsap.fromTo(
        '.gallery-card',
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: track,
            start: 'top 85%',
            once: true,
          },
        }
      );

      /* =====================================================
          START AUTO SCROLL
      ===================================================== */

      startAutoScroll();
    }, section);

    /* ========================================================
        RESIZE
    ======================================================== */

    const handleResize = () => {
      requestAnimationFrame(() => {
        moveToIndex(currentIndex.current, {
          immediate: true,
        });
      });
    };

    window.addEventListener('resize', handleResize);

    /* ========================================================
        VISIBILITY
    ======================================================== */

    const handleVisibility = () => {
      if (document.hidden) {
        stopAutoScroll();
      } else {
        startAutoScroll();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stopAutoScroll();

      window.removeEventListener('resize', handleResize);

      document.removeEventListener('visibilitychange', handleVisibility);

      ctx.revert();
    };
  }, []);

  /* ==========================================================
      TOUCH INTERACTION
  ========================================================== */

  const handleTouchStart = () => {
    isInteractingRef.current = true;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 1200);
  };

  /* ==========================================================
      RENDER
  ========================================================== */

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        md:py-28
        lg:py-32
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0">
        <div
          className="
            gallery-header
            mb-12
            grid
            gap-10
            md:mb-14
            lg:grid-cols-[1fr_0.75fr]
            lg:items-end
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT — TITLE
          ================================================= */}

          <div className="max-w-2xl">
            {/* Eyebrow */}

            <div className="mb-5 flex justify-center md:justify-start items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-midnight" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-slate-muted
                "
              >
                Explore The Villa
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                font-display 
                text-center
                md:text-left
                text-5xl
                font-medium
                leading-[0.95]
                tracking-tight
                text-midnight
                sm:text-6xl
                md:text-7xl
              "
            >
              A closer look at
              <br />
              <span className="italic text-ocean">Breakwater.</span>
            </h2>
          </div>

          {/* =================================================
              RIGHT — DESCRIPTION + CONTROLS
          ================================================= */}

          <div className="max-w-lg lg:justify-self-end">
            <p
              className="
                max-w-lg
                md:text-end
                -mt-5 md:mt-0
                text-base
                leading-7
                text-center 
                text-slate-muted
                md:text-lg
                md:leading-8
              "
            >
              Explore the spaces, views, and details that make your stay at
              Breakwater Villa truly exceptional.
            </p>

            {/* Desktop Controls */}

            <div
              className="
                mt-7
                hidden
                items-center
                justify-end
                gap-3
                md:flex
              "
            >
              <button
                type="button"
                onClick={movePrevious}
                aria-label="Previous gallery image"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate/20
                  text-midnight
                  transition-all
                  duration-300
                  hover:border-ocean
                  hover:bg-ocean
                  hover:text-white
                "
              >
                <GoArrowLeft size={19} />
              </button>

              <button
                type="button"
                onClick={() => moveNext()}
                aria-label="Next gallery image"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate/20
                  text-midnight
                  transition-all
                  duration-300
                  hover:border-ocean
                  hover:bg-ocean
                  hover:text-white
                "
              >
                <GoArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          HORIZONTAL INFINITE GALLERY
      ===================================================== */}

      <div
        className="
          relative
          w-full
          overflow-hidden
        "
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="
            flex
            w-max
            gap-3
            pl-5
            pr-5
            sm:gap-4
            md:gap-5
          "
        >
          {infiniteItems.map((item, index) => (
            <Link
              href="/villa-gallery"
              key={`${item.number}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="
                gallery-card
                group
                relative
                block
                h-[440px]
                w-[78vw]
                shrink-0
                overflow-hidden
                rounded-2xl
                bg-midnight
                sm:h-[470px]
                sm:w-[340px]
                md:h-[500px]
                md:w-[380px]
              "
            >
              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-1000
                    ease-out
                    group-hover:scale-105
                  "
                  sizes="380px"
                />
              </div>

              {/* =================================================
                  DARK OVERLAY
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-midnight
                  via-midnight/35
                  to-midnight/5
                  transition-all
                  duration-700
                  group-hover:from-midnight/90
                  group-hover:via-midnight/45
                "
              />

              {/* =================================================
                  TOP CONTENT
              ================================================= */}

              <div
                className="
                  absolute
                  left-5
                  right-5
                  top-5
                  flex
                  items-start
                  justify-between
                  md:left-6
                  md:right-6
                  md:top-6
                "
              >
                {/* Category */}

                <span
                  className="
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                    px-3
                    py-1.5
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    text-white/90
                    backdrop-blur-md
                  "
                >
                  {item.category}
                </span>

                {/* Number */}

                <span
                  className="
                    font-display
                    text-2xl
                    text-white/50
                  "
                >
                  {item.number}
                </span>
              </div>

              {/* =================================================
                  BOTTOM CONTENT
              ================================================= */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  p-5
                  md:p-6
                "
              >
                {/* Title */}

                <h3
                  className="
                    font-display
                    text-3xl
                    leading-none
                    text-white
                    md:text-[34px]
                  "
                >
                  {item.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-3
                    max-w-[300px]
                    text-xs
                    leading-5
                    text-white/60
                    md:text-sm
                  "
                >
                  {item.description}
                </p>

                {/* Explore */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      flex
                      items-center
                      gap-2
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-champagne
                    "
                  >
                    View Gallery
                    <span
                      className="
                        h-px
                        w-7
                        bg-champagne/60
                        transition-all
                        duration-500
                        group-hover:w-12
                      "
                    />
                  </span>

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-midnight
                      transition-all
                      duration-500
                      group-hover:rotate-45
                      group-hover:bg-champagne
                    "
                  >
                    <GoArrowUpRight size={17} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* =====================================================
          MOBILE CONTROLS
      ===================================================== */}

      <div
        className="
          mt-8
          flex
          items-center
          justify-center
          gap-3
          md:hidden
        "
      >
        <button
          type="button"
          onClick={movePrevious}
          aria-label="Previous gallery image"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-slate/20
            bg-white
            text-midnight
            transition-all
            duration-300
            active:scale-95
            active:bg-ivory
          "
        >
          <GoArrowLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => moveNext()}
          aria-label="Next gallery image"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-slate/20
            bg-white
            text-midnight
            transition-all
            duration-300
            active:scale-95
            active:bg-ivory
          "
        >
          <GoArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
