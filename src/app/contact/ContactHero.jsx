'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { FiMail, FiPhone } from 'react-icons/fi';

export default function ContactHero() {
  return (
    <section
      className=" relative
          h-[680px]
          w-full
          overflow-hidden
          bg-midnight

          sm:h-[700px]

          md:h-[720px]

          lg:h-[840px]

          xl:h-[860px]

          2xl:h-[980px]"
      aria-labelledby="contact-hero-heading"
    >
      {/* =========================================
          BACKGROUND
      ========================================= */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/outside.jpg"
          alt="Breakwater Villa in Paradise Island, Bahamas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Overall readability */}
        <div className=" absolute inset-0 bg-midnight/55 sm:bg-midnight/45 md:bg-midnight/25 lg:bg-midnight/20 " />
        {/* ================================================= TOP → BOTTOM GRADIENT ================================================= */}
        <div className=" absolute inset-0 bg-linear-to-b from-midnight/20 via-transparent to-midnight/30 md:from-midnight/15 md:to-midnight/55 " />
        {/* ================================================= BOTTOM DEPTH ================================================= */}
        <div className=" absolute inset-x-0 bottom-0 h-[38%] bg-linear-to-t from-midnight via-midnight/45 to-transparent md:h-[42%] " />
        {/* ================================================= LEFT READABILITY ================================================= */}
        <div className=" absolute inset-y-0 left-0 w-full bg-linear-to-r from-midnight/45 via-midnight/10 to-transparent md:w-[75%] md:from-midnight/55 md:via-midnight/15 md:to-transparent xl:w-[65%] xl:from-midnight/60 xl:via-midnight/15 " />
        {/* ================================================= ADDITIONAL BOTTOM FADE ================================================= */}
        <div className=" absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-midnight/70 to-transparent sm:h-40 md:h-48 " />
        {/* Overall darkening */}
        {/* <div className="absolute inset-0 bg-midnight/55" /> */}
        {/* Left readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/45 to-midnight/15" /> */}
        {/* Bottom fade */}
        {/* <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-midnight/90 via-midnight/45 to-transparent" /> */}
      </div>

      {/* =========================================
          CONTENT
      ========================================= */}
      <div
        className="
          relative z-10 mx-auto flex h-full w-full max-w-360
          items-end
          px-3 pb-10
          sm:px-4 sm:pb-12
          md:px-6 md:pb-14
          lg:px-8 lg:pb-22
          xl:px-10 xl:pb-30
          2xl:px-0 2xl:pb-40
        "
      >
        <div
          className="
            grid w-full items-end
            gap-10
            sm:gap-12
            md:gap-14
            lg:grid-cols-[0.9fr_1.1fr] lg:gap-16
            xl:grid-cols-[0.85fr_1.15fr] xl:gap-20
            2xl:gap-24
          "
        >
          {/* =========================================
              LEFT — CONTACT INFORMATION
          ========================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-2xl text-center lg:text-left"
          >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center justify-center gap-2.5 sm:mb-6 sm:gap-3 lg:justify-start">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne sm:h-2 sm:w-2" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:text-[10px] lg:text-[11px]">
                Contact Breakwater Villa
              </span>
            </div>

            {/* Heading */}
            <h1
              id="contact-hero-heading"
              className="
                font-display font-medium leading-[1.05] tracking-tight text-white
                text-[40px]
                sm:text-5xl
                md:text-6xl
                lg:text-[56px]
                xl:text-[64px]
                2xl:text-[72px]
              "
            >
              We’d love to
              <br />
              <span className="italic text-champagne">hear from you.</span>
            </h1>

            {/* Description */}
            <p
              className="
                mx-auto mt-5 max-w-xl text-sm leading-6 text-white/70
                sm:mt-6 sm:text-base sm:leading-7
                md:mt-7 md:text-lg md:leading-8
                lg:mx-0
                xl:text-xl xl:leading-8.5
              "
            >
              Have a question about Breakwater Villa, our amenities, or the
              surrounding area? Get in touch with our team and we’ll be happy to
              help you plan your time in Paradise Island, The Bahamas.
            </p>

            {/* Contact Actions */}
            <div
              className="
                mt-7 hidden items-center justify-center gap-5
                md:flex
                sm:mt-9 sm:gap-7
                lg:justify-start
              "
            >
              {/* Email */}
              <a
                href="mailto:hello@breakwatervilla.com"
                className="group flex items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8 text-champagne transition-all duration-300 group-hover:border-champagne/40 group-hover:bg-champagne group-hover:text-midnight">
                  <FiMail size={16} strokeWidth={1.5} />
                </span>

                <span className="text-left">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    Email
                  </span>

                  <span className="mt-1 block text-xs text-white/75 transition-colors duration-300 group-hover:text-white sm:text-sm">
                    hello@breakwatervilla.com
                  </span>
                </span>
              </a>

              {/* Divider */}
              <span className="h-8 w-px bg-white/15" />

              {/* Phone */}
              <a
                href="tel:+12425555555"
                className="group flex items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8 text-champagne transition-all duration-300 group-hover:border-champagne/40 group-hover:bg-champagne group-hover:text-midnight">
                  <FiPhone size={16} strokeWidth={1.5} />
                </span>

                <span className="text-left">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    Phone
                  </span>

                  <span className="mt-1 block text-xs text-white/75 transition-colors duration-300 group-hover:text-white sm:text-sm">
                    +1 (242) 555-5555
                  </span>
                </span>
              </a>
            </div>
          </motion.div>

          {/* =========================================
              RIGHT — LOCATION MAP
          ========================================= */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-full
              max-w-[520px]
              justify-self-center
              lg:justify-self-end
              lg:w-[420px]
              xl:w-[490px]
              2xl:w-[560px]
            "
          >
            <div
              className="
                overflow-hidden rounded-xl
                border border-white/15
                bg-white/6
                p-2
                shadow-[0_16px_45px_rgba(0,0,0,0.16)]
                backdrop-blur-sm
                sm:rounded-2xl sm:p-2.5
              "
            >
              <div className="relative aspect-[5/3] overflow-hidden rounded-lg bg-midnight sm:rounded-xl">
                <iframe
                  title="Breakwater Villa location in Ocean Club Estates, Paradise Island, Bahamas"
                  src="https://www.google.com/maps?q=Ocean%20Club%20Estates%2C%20Paradise%20Island%2C%20The%20Bahamas&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
