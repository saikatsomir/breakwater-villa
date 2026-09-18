'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { FiArrowDown, FiMapPin } from 'react-icons/fi';

export default function AvailabilityBanner() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-midnight sm:min-h-[760px] lg:min-h-[820px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/outside.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Main dark overlay */}
        <div className="absolute inset-0 bg-midnight/75" />

        {/* Additional depth */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/65 to-midnight/55" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-transparent to-midnight/35" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-360 items-center px-4 pb-16 pt-32 sm:min-h-[760px] sm:px-5 sm:pb-20 sm:pt-36 md:px-8 lg:min-h-[820px] lg:px-0 lg:pb-24">
        <div className="grid w-full items-center gap-14 md:gap-16 lg:grid-cols-[1fr_0.72fr] lg:gap-24 xl:grid-cols-[1fr_0.68fr] xl:gap-28">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3 sm:mb-7">
              <span className="h-px w-8 bg-champagne" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-champagne sm:text-[10px]">
                Plan Your Stay
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-[48px] font-medium leading-[0.94] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[86px]">
              Find your
              <br />
              <span className="italic text-champagne">perfect dates.</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-sm leading-6.5 text-white/65 sm:mt-8 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              Discover the perfect time to experience 32 ocean. Explore
              available dates and begin planning your private island escape in
              Paradise Island, The Bahamas.
            </p>

            {/* Location */}
            <div className="mt-8 flex items-center gap-3 text-white/60 sm:mt-10">
              <FiMapPin
                size={17}
                strokeWidth={1.4}
                className="text-champagne"
              />

              <span className="text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px]">
                Ocean View Villa on Paradise Island · Paradise Island
              </span>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-xl justify-self-end"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/6] lg:aspect-[4/5]">
              <Image
                src="/images/home/terrace.jpg"
                alt="Terrace at 32 ocean"
                fill
                className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 500px"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/55 via-transparent to-transparent" />

              {/* Image caption */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-7 sm:left-7 sm:right-7">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-champagne sm:text-[9px]">
                    32 ocean
                  </p>

                  <p className="mt-1 font-display text-xl leading-none text-white sm:text-2xl">
                    Island Living
                  </p>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm sm:h-10 sm:w-10">
                  <FiArrowDown size={16} strokeWidth={1.4} />
                </span>
              </div>
            </div>

            {/* Small decorative label */}
            <div className="absolute -bottom-5 -left-3 hidden sm:block lg:-left-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-midnight/60 backdrop-blur-md">
                <span className="max-w-[50px] text-center text-[8px] font-medium uppercase leading-3 tracking-[0.14em] text-white/65">
                  Your
                  <br />
                  private
                  <br />
                  escape
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-white/40 lg:flex"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.25em]">
          Explore Availability
        </span>

        <span className="h-8 w-px bg-white/20" />

        <FiArrowDown size={14} strokeWidth={1.2} />
      </motion.div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
    </section>
  );
}
