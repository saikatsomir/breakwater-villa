'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { FiMail, FiPhone } from 'react-icons/fi';

export default function ContactHero() {
  return (
    <section className="relative min-h-[780px] overflow-hidden bg-midnight sm:min-h-[820px] lg:min-h-[850px]">
      {/* =========================================
          BACKGROUND
      ========================================= */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/outside.jpg"
          alt="Breakwater Villa in Paradise Island, Bahamas"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Bottom + corner overlay only */}
        <div className="absolute inset-0 bg-midnight/60 md:bg-midnight/15" />

        <div
          className="
              absolute
              inset-0
              bg-linear-to-b
              from-transparent
              via-transparent
              via-35%
              to-midnight/10 md:to-midnight/50
            "
        />

        <div
          className="
              absolute
              inset-x-0
              bottom-0
              h-[32%]
              bg-linear-to-t
              from-midnight
              via-midnight/40
              to-transparent
            "
        />

        <div
          className="
              absolute
              inset-0
              bg-linear-to-r
              from-midnight/30 md:from-midnight/70
              via-transparent
              to-transparent
            "
        />

        <div
          className="
              absolute
              inset-x-0
              bottom-0
              h-40
              bg-linear-to-t
              from-midnight/70
              to-transparent
            "
        />
      </div>

      {/* =========================================
          CONTENT
      ========================================= */}
      <div className="relative z-10 mx-auto flex min-h-[780px] max-w-360 items-center px-4 pb-16 pt-32 sm:min-h-[820px] sm:px-5 sm:pb-20 sm:pt-36 md:px-8 lg:min-h-[850px] lg:px-0 lg:pb-24">
        <div className="grid w-full items-center gap-12 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:grid-cols-[0.85fr_1.15fr] xl:gap-24">
          {/* =========================================
              LEFT — CONTACT INFORMATION
          ========================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left"
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center justify-center gap-3 sm:mb-7 lg:justify-start">
              <span className="h-2.5 w-2.5 rounded-full bg-sand sm:h-3 sm:w-3" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-champagne sm:text-[10px]">
                Contact Breakwater Villa
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-[46px] font-medium leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[68px] xl:text-[78px]">
              We’d love to
              <br />
              <span className="italic text-champagne">hear from you.</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-xl text-base leading-6.5 text-white/85 sm:mt-8 sm:text-base sm:leading-7 md:text-lg md:leading-8 lg:mx-0">
              Have a question about Breakwater Villa, our amenities, or the
              surrounding area? Get in touch with our team and we'll be happy to
              help you plan your time in Paradise Island, The Bahamas.
            </p>

            {/* Contact Details */}
            <div className="mt-8 hidden md:flex flex-row items-center justify-center gap-5 sm:mt-10 sm:gap-8 lg:justify-start">
              {/* Email */}
              <a
                href="mailto:hello@breakwatervilla.com"
                className="group flex min-w-0 items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-champagne backdrop-blur-sm transition-all duration-300 group-hover:bg-champagne group-hover:text-midnight">
                  <FiMail size={17} strokeWidth={1.5} />
                </span>

                <span className="min-w-0 text-left">
                  <span className="block text-[8px] font-semibold uppercase tracking-[0.2em] text-champagne">
                    Email
                  </span>

                  <span className="mt-1 block whitespace-nowrap text-xs text-white/75 transition-colors duration-300 group-hover:text-white sm:text-[15px]">
                    hello@breakwatervilla.com
                  </span>
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+12425555555"
                className="group flex min-w-0 items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-champagne backdrop-blur-sm transition-all duration-300 group-hover:bg-champagne group-hover:text-midnight">
                  <FiPhone size={16} strokeWidth={1.5} />
                </span>

                <span className="text-left">
                  <span className="block text-[8px] font-semibold uppercase tracking-[0.2em] text-champagne">
                    Phone
                  </span>

                  <span className="mt-1 block whitespace-nowrap text-xs text-white/75 transition-colors duration-300 group-hover:text-white sm:text-[15px]">
                    +1 (242) 555-5555
                  </span>
                </span>
              </a>
            </div>

            {/* Location */}
            <div className="mt-7 hidden  md:flex items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/40 sm:mt-8 lg:justify-start">
              <span className="h-px w-5 bg-white/20" />
              <span>Ocean Club Estates · Paradise Island · The Bahamas</span>
              <span className="h-px w-5 bg-white/20" />
            </div>
          </motion.div>

          {/* =========================================
              RIGHT — LOCATION MAP
          ========================================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:justify-self-end"
          >
            {/* Map Frame */}
            <div className=" border border-white/15 bg-white/[0.07] p-3 backdrop-blur-md rounded-2xl sm:p-6">
              <div className="relative overflow-hidden  bg-midnight rounded-lg aspect-[5/3] lg:aspect-5/3">
                {/* Google Maps */}
                <iframe
                  title="Breakwater Villa location in Ocean Club Estates, Paradise Island, Bahamas"
                  src="https://www.google.com/maps?q=Ocean%20Club%20Estates%2C%20Paradise%20Island%2C%20The%20Bahamas&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Map Overlay */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
