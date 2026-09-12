'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
} from 'react-icons/fi';

const footerLinks = {
  explore: [
    { label: 'Home', href: '/' },
    { label: 'The Villa & Gallery', href: '/villa-gallery' },
    { label: 'Availability', href: '/availability' },
    { label: 'Contact & Booking', href: '/contact-booking' },
  ],
  experience: [
    { label: 'The Villa', href: '/villa-gallery' },
    { label: 'Amenities', href: '/villa-gallery#amenities' },
    { label: 'Rates', href: '/#rates' },
    { label: 'Book Your Stay', href: '/booking-my-stay' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white ">
      {/* Main Footer */}
      <div className="relative isolate overflow-hidden  rounded-t-[30px]">
        {/* Background Image */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/home/highlights.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Dark overlays */}
        <div className="absolute inset-0 -z-10 bg-midnight/82" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight/70 via-midnight/80 to-midnight/95" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 md:px-10 md:py-16 lg:px-14 lg:py-20 xl:px-16 xl:py-24">
          {/* Newsletter */}
          {/* <div className="grid gap-10 border-b border-white/10 pb-12 sm:pb-14 md:gap-12 md:pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="Breakwater Villa home"
            >
              <Image
                src="/logo.png"
                alt="Breakwater Villa"
                width={140}
                height={40}
                priority
                className="h-7 w-auto brightness-0 invert md:h-13"
              />
            </Link>
            <div>
              <h2 className="max-w-3xl font-display text-[46px] font-medium leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[88px]">
                Paradise is
                <br />
                <span className="italic text-champagne">waiting.</span>
              </h2>
            </div>
          </div> */}

          {/* Footer Content */}
          <div className="grid gap-12 py-12 sm:py-14 md:grid-cols-2 md:gap-14 lg:grid-cols-[1.35fr_0.7fr_0.7fr_0.9fr] lg:gap-12 lg:py-16 xl:gap-20">
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="flex shrink-0 items-center"
                aria-label="Breakwater Villa home"
              >
                <Image
                  src="/logo.png"
                  alt="Breakwater Villa"
                  width={140}
                  height={40}
                  priority
                  className="h-7 w-auto brightness-0 invert md:h-13"
                />
              </Link>

              <p className="mt-6 max-w-sm text-base leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                A private oceanfront retreat in Ocean Club Estates, created for
                slow mornings, long afternoons, and unforgettable island stays.
              </p>

              {/* Social */}
              <div className="mt-7 flex items-center gap-2">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-500 hover:border-champagne hover:bg-champagne hover:text-midnight"
                >
                  <FiInstagram size={17} strokeWidth={1.5} />
                </a>

                <a
                  href="mailto:hello@breakwatervilla.com"
                  aria-label="Email"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-500 hover:border-champagne hover:bg-champagne hover:text-midnight"
                >
                  <FiMail size={17} strokeWidth={1.5} />
                </a>

                <a
                  href="tel:+12425555555"
                  aria-label="Phone"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-500 hover:border-champagne hover:bg-champagne hover:text-midnight"
                >
                  <FiPhone size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">
                Explore
              </h3>

              <ul className="mt-6 space-y-4">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors duration-300 hover:text-white"
                    >
                      <span>{link.label}</span>
                      <FiArrowUpRight
                        size={13}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">
                Experience
              </h3>

              <ul className="mt-6 space-y-4">
                {footerLinks.experience.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors duration-300 hover:text-white"
                    >
                      <span>{link.label}</span>
                      <FiArrowUpRight
                        size={13}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">
                Contact
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <FiMapPin
                    size={17}
                    strokeWidth={1.4}
                    className="mt-0.5 shrink-0 text-champagne"
                  />

                  <p className="text-sm leading-5 text-white/65">
                    Ocean Club Estates
                    <br />
                    Paradise Island
                    <br />
                    The Bahamas
                  </p>
                </div>

                <a
                  href="mailto:hello@breakwatervilla.com"
                  className="flex items-center gap-3 text-sm text-white/65 transition-colors duration-300 hover:text-white"
                >
                  <FiMail
                    size={17}
                    strokeWidth={1.4}
                    className="shrink-0 text-champagne"
                  />
                  <span className="break-all">hello@breakwatervilla.com</span>
                </a>

                <a
                  href="tel:+12425555555"
                  className="flex items-center gap-3 text-sm text-white/65 transition-colors duration-300 hover:text-white"
                >
                  <FiPhone
                    size={17}
                    strokeWidth={1.4}
                    className="shrink-0 text-champagne"
                  />
                  <span>+1 (242) 555-5555</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-5 border-t border-white/10 pt-6 sm:pt-7 md:flex-row md:items-center md:justify-between">
            <p className="text-[10px] tracking-wide text-white/45 sm:text-[11px]">
              © {new Date().getFullYear()} Breakwater Villa. All rights
              reserved.
            </p>

            <div className="flex items-center gap-5">
              <Link
                href="#"
                className="text-[10px] text-white/45 transition-colors hover:text-white sm:text-[11px]"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="text-[10px] text-white/45 transition-colors hover:text-white sm:text-[11px]"
              >
                Terms
              </Link>
            </div>

            <p className="hidden text-[10px] uppercase tracking-[0.18em] text-white/35 md:block">
              Paradise Island · The Bahamas
            </p>
          </div>
        </div>

        {/* Large background word */}
        <div className="pointer-events-none absolute bottom-[-22px] left-1/2 -z-0 hidden -translate-x-1/2 select-none whitespace-nowrap lg:block">
          <span className="font-display text-[150px] font-medium leading-none text-white/[0.035] xl:text-[190px]">
            BREAKWATER
          </span>
        </div>
      </div>
    </footer>
  );
}
