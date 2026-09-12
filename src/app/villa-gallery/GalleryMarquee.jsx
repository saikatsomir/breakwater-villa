'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const images = [
  {
    src: '/images/home/villa.jpg',
    alt: 'Breakwater Villa exterior in Paradise Island, Bahamas',
  },
  {
    src: '/images/home/villa-intro.jpg',
    alt: 'Breakwater Villa exterior and surrounding grounds',
  },
  {
    src: '/images/home/outside.jpg',
    alt: 'Outdoor area at Breakwater Villa',
  },
  {
    src: '/images/home/big-terrace.jpg',
    alt: 'Large private terrace at Breakwater Villa',
  },
  {
    src: '/images/home/terrace.jpg',
    alt: 'Terrace at Breakwater Villa',
  },
  {
    src: '/images/home/front-side.jpg',
    alt: 'Front side exterior of Breakwater Villa',
  },
  {
    src: '/images/home/couch.jpg',
    alt: 'Elegant living area at Breakwater Villa',
  },
  {
    src: '/images/home/living-room.jpg',
    alt: 'Living room at Breakwater Villa',
  },
  {
    src: '/images/home/drawing-room.jpg',
    alt: 'Drawing room at Breakwater Villa',
  },
  {
    src: '/images/home/drawing-room-2.jpg',
    alt: 'Drawing room interior at Breakwater Villa',
  },
  {
    src: '/images/home/dining.jpg',
    alt: 'Dining area at Breakwater Villa',
  },
  {
    src: '/images/home/kitchen.jpg',
    alt: 'Kitchen at Breakwater Villa',
  },
  {
    src: '/images/home/guest-bedroom.jpg',
    alt: 'Guest bedroom at Breakwater Villa',
  },
  {
    src: '/images/home/bed-2.jpg',
    alt: 'Bedroom at Breakwater Villa',
  },
  {
    src: '/images/home/bed-3.jpg',
    alt: 'Bedroom interior at Breakwater Villa',
  },
  {
    src: '/images/home/bath-1.jpg',
    alt: 'Bathroom at Breakwater Villa',
  },
  {
    src: '/images/home/bath-2.jpg',
    alt: 'Luxury bathroom at Breakwater Villa',
  },
  {
    src: '/images/home/bathroom-1.jpg',
    alt: 'Bathroom interior at Breakwater Villa',
  },
  {
    src: '/images/home/bathroom-2.jpg',
    alt: 'Bathroom details at Breakwater Villa',
  },
  {
    src: '/images/home/highlights.jpg',
    alt: 'Outdoor highlights at Breakwater Villa',
  },
  {
    src: '/images/home/villa-video-thumbnail.jpg',
    alt: 'Breakwater Villa video preview',
  },
];

const rows = [images.slice(0, 7), images.slice(7, 14), images.slice(14, 21)];

export default function GalleryMarquee() {
  const rowRefs = useRef([]);
  const animationRefs = useRef([]);

  useEffect(() => {
    const setupRow = (rowElement, direction) => {
      if (!rowElement) return;

      const track = rowElement.querySelector('[data-marquee-track]');
      const firstSet = rowElement.querySelector('[data-marquee-set]');

      if (!track || !firstSet) return;

      const startAnimation = () => {
        const distance = firstSet.offsetWidth;

        if (!distance) return;

        const previousAnimation = animationRefs.current.find(
          (item) => item.track === track
        );

        if (previousAnimation?.animation) {
          previousAnimation.animation.kill();
        }

        let animation;

        /*
         * LEFT → RIGHT
         *
         * Start one complete set to the left
         * and move back to zero.
         */
        if (direction === 'right') {
          gsap.set(track, {
            x: -distance,
          });

          animation = gsap.to(track, {
            x: 0,
            duration: 30,
            ease: 'none',
            repeat: -1,
          });
        } else {
          /*
           * RIGHT → LEFT
           *
           * Start at zero and move one complete
           * set width to the left.
           */
          gsap.set(track, {
            x: 0,
          });

          animation = gsap.to(track, {
            x: -distance,
            duration: 30,
            ease: 'none',
            repeat: -1,
          });
        }

        animationRefs.current = [
          ...animationRefs.current.filter((item) => item.track !== track),
          {
            track,
            animation,
          },
        ];
      };

      /*
       * Images need to be loaded before measuring
       * the exact width of the first set.
       */
      const imageElements = rowElement.querySelectorAll('img');

      let pendingImages = 0;

      imageElements.forEach((image) => {
        if (!image.complete) {
          pendingImages += 1;

          image.addEventListener('load', startAnimation, {
            once: true,
          });
        }
      });

      if (pendingImages === 0) {
        startAnimation();
      }

      /*
       * Recalculate the animation when the viewport
       * or image dimensions change.
       */
      const resizeObserver = new ResizeObserver(() => {
        startAnimation();
      });

      resizeObserver.observe(firstSet);

      return () => {
        resizeObserver.disconnect();

        imageElements.forEach((image) => {
          image.removeEventListener('load', startAnimation);
        });

        const activeAnimation = animationRefs.current.find(
          (item) => item.track === track
        );

        if (activeAnimation?.animation) {
          activeAnimation.animation.kill();
        }

        animationRefs.current = animationRefs.current.filter(
          (item) => item.track !== track
        );
      };
    };

    const cleanups = [
      setupRow(rowRefs.current[0], 'right'),
      setupRow(rowRefs.current[1], 'left'),
      setupRow(rowRefs.current[2], 'right'),
    ];

    return () => {
      cleanups.forEach((cleanup) => {
        if (cleanup) cleanup();
      });

      animationRefs.current.forEach(({ animation }) => {
        animation.kill();
      });

      animationRefs.current = [];
    };
  }, []);

  const renderImages = (items, rowIndex, setIndex) => {
    return (
      <div
        data-marquee-set={setIndex === 0 ? true : undefined}
        className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
      >
        {items.map((image, index) => (
          <div
            key={`${rowIndex}-${setIndex}-${index}`}
            className="
              group
              relative
              h-[210px]
              w-[280px]
              shrink-0
              overflow-hidden
              rounded-xl
              sm:h-[260px]
              sm:w-[360px]
              md:h-[300px]
              md:w-[420px]
              lg:h-[330px]
              lg:w-[470px]
            "
          >
            <img
              src={image.src}
              alt={image.alt}
              draggable="false"
              loading={rowIndex === 0 && index < 3 ? 'eager' : 'lazy'}
              className="
                h-full
                w-full
                select-none
                object-cover
                object-center
                transition-transform
                duration-1000
                ease-out
                group-hover:scale-[1.025]
              "
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section
      className="
        overflow-hidden
        bg-white
        py-20
        sm:py-24
        md:py-28
        lg:py-32
      "
      aria-labelledby="gallery-marquee-heading"
    >
      {/* Section Intro */}

      <div
        className="
          mx-auto
          mb-12
          max-w-[1440px]
          px-5
          text-center
          sm:mb-14
          sm:px-8
          md:mb-16
          lg:mb-20
          lg:px-12
        "
      >
        {/* Eyebrow */}

        <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4">
          <span className="h-px w-8 bg-[#B68A52] sm:w-12" />

          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#B68A52]
              sm:text-[10px]
              md:text-[11px]
            "
          >
            Life at Breakwater
          </p>

          <span className="h-px w-8 bg-[#B68A52] sm:w-12" />
        </div>

        {/* Heading */}

        <h2
          id="gallery-marquee-heading"
          className="
            font-display
            text-4xl
            font-normal
            leading-[0.98]
            tracking-[-0.035em]
            text-midnight
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          Spaces to settle into.
        </h2>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-5
            max-w-xl
            text-sm
            leading-7
            text-slate-muted
            sm:mt-6
            sm:text-base
            sm:leading-8
          "
        >
          From quiet mornings indoors to long afternoons beneath the island sun,
          every corner of Breakwater Villa is made for living well.
        </p>
      </div>

      {/* Infinite Image Rows */}

      <div className="space-y-3 sm:space-y-4">
        {/* Row 1 — Left → Right */}

        <div
          ref={(element) => {
            rowRefs.current[0] = element;
          }}
          className="relative w-full overflow-hidden"
        >
          <div data-marquee-track className="flex w-max will-change-transform">
            {renderImages(rows[0], 0, 0)}
            {renderImages(rows[0], 0, 1)}
          </div>
        </div>

        {/* Row 2 — Right → Left */}

        <div
          ref={(element) => {
            rowRefs.current[1] = element;
          }}
          className="relative w-full overflow-hidden"
        >
          <div data-marquee-track className="flex w-max will-change-transform">
            {renderImages(rows[1], 1, 0)}
            {renderImages(rows[1], 1, 1)}
          </div>
        </div>

        {/* Row 3 — Left → Right */}

        <div
          ref={(element) => {
            rowRefs.current[2] = element;
          }}
          className="relative w-full overflow-hidden"
        >
          <div data-marquee-track className="flex w-max will-change-transform">
            {renderImages(rows[2], 2, 0)}
            {renderImages(rows[2], 2, 1)}
          </div>
        </div>
      </div>
    </section>
  );
}
