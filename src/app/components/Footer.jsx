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
    <footer className="relative overflow-hidden bg-white">
      {/* ===================================================== MAIN FOOTER ===================================================== */}
      <div className=" relative isolate overflow-hidden rounded-t-[24px] sm:rounded-t-[28px] md:rounded-t-[30px] ">
        {/* =================================================== BACKGROUND IMAGE =================================================== */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/home/highlights.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* =================================================== OVERLAYS =================================================== */}
        <div className="absolute inset-0 -z-10 bg-midnight/82" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight/70 via-midnight/80 to-midnight/95" />
        {/* =================================================== CONTAINER =================================================== */}
        <div className=" relative mx-auto w-full max-w-360 px-3 py-12 sm:px-4 sm:py-14 md:px-6 md:py-16 lg:px-8 lg:py-20 xl:px-10 xl:py-24 2xl:px-0 ">
          {/* ================================================= FOOTER CONTENT ================================================= */}
          <div className=" grid gap-10 py-8 sm:gap-12 sm:py-10 md:grid-cols-2 md:gap-14 md:py-12 lg:grid-cols-[1.35fr_0.7fr_0.7fr_0.9fr] lg:gap-12 lg:py-14 xl:gap-20 xl:py-16 ">
            {/* ================================================= BRAND ================================================= */}
            <div className="max-w-xl">
              <Link
                href="/"
                className="flex shrink-0 items-center"
                aria-label="32 ocean home"
              >
                <Image
                  src="/logo.png"
                  alt="32 ocean"
                  width={140}
                  height={40}
                  priority
                  className=" h-7 w-auto brightness-0 invert sm:h-8 md:h-13 "
                />
              </Link>
              <p className=" mt-5 max-w-sm text-sm leading-6 text-white/55 sm:mt-6 sm:text-[15px] sm:leading-7 md:text-base ">
                A private Ocean View retreat in Paradise Island, created for
                slow mornings, long afternoons, and unforgettable island stays.
              </p>
              {/* ================================================= SOCIAL ================================================= */}
              <div className=" mt-6 flex items-center gap-2 sm:mt-7 ">
                <a
                  href="#"
                  aria-label="Instagram"
                  className=" flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-500 hover:border-champagne hover:bg-champagne hover:text-midnight sm:h-10 sm:w-10 "
                >
                  <FiInstagram
                    size={16}
                    strokeWidth={1.5}
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                </a>
                <a
                  href="mailto:hello@breakwatervilla.com"
                  aria-label="Email"
                  className=" flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-500 hover:border-champagne hover:bg-champagne hover:text-midnight sm:h-10 sm:w-10 "
                >
                  <FiMail
                    size={16}
                    strokeWidth={1.5}
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                </a>
                <a
                  href="tel:+12425555555"
                  aria-label="Phone"
                  className=" flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-500 hover:border-champagne hover:bg-champagne hover:text-midnight sm:h-10 sm:w-10 "
                >
                  <FiPhone
                    size={15}
                    strokeWidth={1.5}
                    className="sm:h-[16px] sm:w-[16px]"
                  />
                </a>
              </div>
            </div>
            {/* ================================================= EXPLORE ================================================= */}
            <div>
              <h3 className=" text-[9px] font-semibold uppercase tracking-[0.2em] text-champagne sm:text-[10px] sm:tracking-[0.22em] lg:text-[11px] ">
                Explore
              </h3>
              <ul className=" mt-5 space-y-3 sm:mt-6 sm:space-y-4 ">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className=" group inline-flex items-center gap-1.5 text-[13px] text-white/65 transition-colors duration-300 hover:text-white sm:text-sm "
                    >
                      <span>{link.label}</span>
                      <FiArrowUpRight
                        size={12}
                        className=" opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:h-[13px] sm:w-[13px] "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* ================================================= EXPERIENCE ================================================= */}
            <div>
              <h3 className=" text-[9px] font-semibold uppercase tracking-[0.2em] text-champagne sm:text-[10px] sm:tracking-[0.22em] lg:text-[11px] ">
                Experience
              </h3>
              <ul className=" mt-5 space-y-3 sm:mt-6 sm:space-y-4 ">
                {footerLinks.experience.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className=" group inline-flex items-center gap-1.5 text-[13px] text-white/65 transition-colors duration-300 hover:text-white sm:text-sm "
                    >
                      <span>{link.label}</span>
                      <FiArrowUpRight
                        size={12}
                        className=" opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:h-[13px] sm:w-[13px] "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* ================================================= CONTACT ================================================= */}
            <div>
              <h3 className=" text-[9px] font-semibold uppercase tracking-[0.2em] text-champagne sm:text-[10px] sm:tracking-[0.22em] lg:text-[11px] ">
                Contact
              </h3>
              <div className=" mt-5 space-y-4 sm:mt-6 sm:space-y-5 ">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <FiMapPin
                    size={16}
                    strokeWidth={1.4}
                    className=" mt-0.5 shrink-0 text-champagne sm:h-[17px] sm:w-[17px] "
                  />
                  <p className=" text-[13px] leading-5 text-white/65 sm:text-sm ">
                    Ocean View Villa <br /> on Paradise Island{' '}
                    {/* <br /> The Bahamas */}
                  </p>
                </div>
                {/* Email */}
                <a
                  href="mailto:hello@breakwatervilla.com"
                  className=" flex items-center gap-3 text-[13px] text-white/65 transition-colors duration-300 hover:text-white sm:text-sm "
                >
                  <FiMail
                    size={16}
                    strokeWidth={1.4}
                    className=" shrink-0 text-champagne sm:h-[17px] sm:w-[17px] "
                  />
                  <span className="break-all"> hello@breakwatervilla.com </span>
                </a>
                {/* Phone */}
                <a
                  href="tel:+12425555555"
                  className=" flex items-center gap-3 text-[13px] text-white/65 transition-colors duration-300 hover:text-white sm:text-sm "
                >
                  <FiPhone
                    size={16}
                    strokeWidth={1.4}
                    className=" shrink-0 text-champagne sm:h-[17px] sm:w-[17px] "
                  />
                  <span>+1 (242) 555-5555</span>
                </a>
              </div>
            </div>
          </div>
          {/* =================================================== BOTTOM =================================================== */}
          <div className=" flex flex-col gap-4  pt-5 sm:gap-5 sm:pt-7 md:flex-row md:items-center md:justify-between lg:gap-6 ">
            {/* Copyright */}
            <p className=" text-[9px] tracking-wide text-white/45 sm:text-[11px] ">
              © {new Date().getFullYear()} 32 ocean. All rights reserved.
            </p>
            {/* Legal */}
            <div className=" flex items-center gap-4 sm:gap-5 ">
              <Link
                href="#"
                className=" text-[9px] text-white/45 transition-colors hover:text-white sm:text-[11px] "
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className=" text-[9px] text-white/45 transition-colors hover:text-white sm:text-[11px] "
              >
                Terms
              </Link>
            </div>
            {/* Location */}
            <p className=" hidden text-[9px] uppercase tracking-[0.18em] text-white/35 md:block sm:text-[11px] ">
              Paradise Island · The Bahamas
            </p>
          </div>
        </div>
        {/* ===================================================== LARGE BACKGROUND WORD ===================================================== */}
        <div className=" pointer-events-none absolute bottom-[-18px] left-1/2 -z-0 hidden -translate-x-1/2 select-none whitespace-nowrap lg:block ">
          <span className=" font-display text-[140px] font-medium leading-none text-white/[0.035] xl:text-[190px] 2xl:text-[220px] ">
            32 ocean
          </span>
        </div>
      </div>
    </footer>
  );
}
