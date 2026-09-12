'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { FiMapPin, FiSun, FiUmbrella, FiUsers } from 'react-icons/fi';

import highlightImg from '../../../../public/images/home/highlights.jpg';

const highlights = [
  {
    icon: FiMapPin,
    title: 'Prime Location',
    description: 'Ocean Club Estates',
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
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/60 to-midnight/65" />

        {/* Side depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/20 via-transparent to-midnight/30" />
      </div>

      {/* =====================================================
          HIGHLIGHTS
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          sm:px-5
          md:px-8
          lg:px-0
        "
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

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

                  lg:min-h-[220px]
                  lg:px-8

                  ${
                    index % 2 === 0
                      ? 'border-r border-white/12 md:border-r'
                      : ''
                  }

                  ${index < 2 ? 'border-b border-white/12 md:border-b-0' : ''}

                  ${index === 2 ? 'md:border-r border-white/12' : ''}
                `}
              >
                {/* =================================================
                    ICON
                ================================================= */}

                <div
                  className="
                    mb-4
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    text-champagne/90
                    transition-all
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:text-champagne

                    sm:mb-5
                    sm:h-13
                    sm:w-13

                    md:mb-5
                    md:h-14
                    md:w-14
                  "
                >
                  <Icon size={27} strokeWidth={1.15} className="sm:hidden" />

                  <Icon
                    size={29}
                    strokeWidth={1.15}
                    className="hidden sm:block"
                  />
                </div>

                {/* =================================================
                    TITLE
                ================================================= */}

                <h3
                  className="
                    font-body
                    text-[12px]
                    font-medium
                    leading-5
                    tracking-[0.01em]
                    text-white

                    sm:text-[13px]
                    sm:leading-5

                    md:text-sm
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
                    text-[10px]
                    leading-4
                    text-white/60

                    sm:mt-2
                    sm:max-w-none
                    sm:text-[11px]
                    sm:leading-5

                    md:text-xs
                    md:text-white/55
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
          bg-gradient-to-r
          from-ocean
          via-seaglass
          to-sand
        "
      />
    </section>
  );
}
