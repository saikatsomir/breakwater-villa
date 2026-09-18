'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { FiMapPin, FiSun, FiUmbrella, FiUsers } from 'react-icons/fi';

import highlightImg from '../../../../public/images/home/highlights.jpg';

const highlights = [
  {
    icon: FiMapPin,
    title: 'Prime Location',
    description: ' Paradise Island',
  },
  {
    icon: FiSun,
    title: 'Private Pool',
    description: 'With Ocean Views',
  },
  {
    icon: FiUmbrella,
    title: 'Luxury Services',
    description: 'Chef, Butler, Concierge',
  },
  {
    icon: FiUsers,
    title: 'Walk to the Beach',
    description: 'Minutes Away',
  },
];

export default function Highlights() {
  return (
    <section className="relative w-full overflow-hidden bg-midnight">
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div className="absolute inset-0">
        <Image
          src={highlightImg}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />

        {/* Main overlay */}
        <div className="absolute inset-0 bg-midnight/72" />

        {/* Bottom depth */}
        <div
          className="
            absolute
            inset-0

            bg-linear-to-t
            from-midnight/90
            via-midnight/60
            to-midnight/65
          "
        />

        {/* Side depth */}
        <div
          className="
            absolute
            inset-0

            bg-linear-to-r
            from-midnight/20
            via-transparent
            to-midnight/30
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

          2xl:px-0

          py-14

          sm:py-20

          md:py-24

          lg:py-28

          xl:py-32
        "
      >
        {/* =================================================
            EYEBROW + HEADING

            Same pill-badge language as VillaIntro's eyebrow,
            adapted for the dark background.
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="
            mb-10
            flex
            flex-col
            items-center
            text-center

            sm:mb-12

            md:mb-14

            lg:mb-16
          "
        >
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2

              rounded-full
              border
              border-white/15
              bg-white/5
              px-3
              py-1.5

              sm:mb-5
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
                text-white/80

                sm:text-[10px]

                lg:text-[11px]
              "
            >
              Villa Highlights
            </span>
          </div>

          <h2
            className="
              font-display
              font-medium
              leading-[1.1]
              tracking-tight
              text-white

              text-[28px]

              sm:text-4xl

              md:text-[44px]

              lg:text-5xl

              xl:text-[52px]
            "
          >
            Everything you need,
            <span className="italic text-champagne"> and more.</span>
          </h2>
        </motion.div>

        {/* =================================================
            HIGHLIGHTS GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-2

            overflow-hidden
            rounded-xl
            border
            border-white/12

            sm:rounded-2xl

            md:grid-cols-4
          "
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;

            const isLastInRow2 = index % 2 === 1;
            const isLastInRow4 = index === highlights.length - 1;
            const isLastRow2 = index >= highlights.length - 2;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  group
                  relative
                  flex
                  min-h-[175px]
                  flex-col
                  items-center
                  justify-center
                  px-3
                  py-9
                  text-center
                  transition-colors
                  duration-500
                  hover:bg-white/5

                  sm:min-h-[190px]
                  sm:px-5
                  sm:py-10

                  md:min-h-[210px]
                  md:px-6
                  md:py-12

                  lg:min-h-[225px]
                  lg:px-8
                  lg:py-14

                  xl:min-h-[240px]
                  xl:px-10

                  2xl:min-h-[255px]

                  border-white/12

                  ${!isLastInRow2 ? 'border-r' : ''}
                  ${!isLastRow2 ? 'border-b' : ''}

                  md:border-b-0
                  ${!isLastInRow4 ? 'md:border-r' : 'md:border-r-0'}
                `}
              >
                {/* =================================================
                    ICON

                    Bordered circle, matching the icon-in-a-circle
                    treatment used in Hero's booking bar.
                ================================================= */}

                <div
                  className="
                    mb-4
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/5
                    text-champagne/90
                    transition-all
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:border-champagne/40
                    group-hover:text-champagne

                    sm:mb-5
                    sm:h-13
                    sm:w-13

                    md:h-14
                    md:w-14

                    xl:h-16
                    xl:w-16
                  "
                >
                  <Icon size={22} strokeWidth={1.15} className="sm:hidden" />

                  <Icon
                    size={24}
                    strokeWidth={1.15}
                    className="hidden sm:block md:hidden"
                  />

                  <Icon
                    size={26}
                    strokeWidth={1.15}
                    className="hidden md:block xl:hidden"
                  />

                  <Icon
                    size={29}
                    strokeWidth={1.15}
                    className="hidden xl:block"
                  />
                </div>

                {/* =================================================
                    TITLE
                ================================================= */}

                <h3
                  className="
                    font-body
                    font-medium
                    leading-5
                    tracking-[0.01em]
                    text-white

                    text-[12px]

                    sm:text-[13px]

                    md:text-sm

                    lg:text-base

                    xl:text-lg
                  "
                >
                  {item.title}
                </h3>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <p
                  className="
                    mt-1.5
                    max-w-[150px]
                    leading-4
                    text-white/60

                    text-[10px]

                    sm:mt-2
                    sm:max-w-none
                    sm:text-[11px]
                    sm:leading-5

                    md:text-xs
                    md:text-white/55

                    lg:text-sm

                    xl:mt-2.5
                  "
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          TOP SOFT BORDER
      ===================================================== */}

      <div className="absolute inset-x-0 top-0 z-20 h-px bg-white/10" />

      {/* =====================================================
          BOTTOM ACCENT
      ===================================================== */}

      <div
        className="
          relative
          z-20
          h-[2px]
          w-full

          bg-linear-to-r
          from-ocean
          via-seaglass
          to-sand
        "
      />
    </section>
  );
}
