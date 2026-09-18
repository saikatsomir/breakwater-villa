'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiPhone } from 'react-icons/fi';
import { HiMiniBars3BottomRight, HiMiniXMark } from 'react-icons/hi2';

import Button from './ui/SiteButton';

const navLinks = [
  { href: '/#villa-experience', label: 'The Villa' },
  { href: '/villa-gallery', label: 'Gallery' },
  // { href: '/#pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /*
   * Keep the active hash in sync with the URL.
   */
  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();

    window.addEventListener('hashchange', updateHash);

    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []);

  /*
   * Smooth scroll helper.
   */
  const smoothScrollTo = (element) => {
    if (!element) return;

    const navbarOffset = 120;

    const startPosition = window.scrollY;

    const targetPosition =
      element.getBoundingClientRect().top + window.scrollY - navbarOffset;

    const distance = targetPosition - startPosition;

    const duration = 1200;

    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  /*
   * Handle navigation links containing hashes.
   */
  const handleNavClick = (event, href) => {
    if (!href.includes('#')) {
      setOpen(false);
      return;
    }

    event.preventDefault();

    const [path, hash] = href.split('#');

    /*
     * If we're already on the homepage,
     * smoothly scroll directly to the section.
     */
    if (pathname === '/' && path === '/') {
      const target = document.getElementById(hash);

      if (target) {
        smoothScrollTo(target);

        window.history.pushState(null, '', `/#${hash}`);

        setActiveHash(`#${hash}`);
      }

      setOpen(false);
      return;
    }

    /*
     * If we're on another page, navigate to homepage.
     * The hash will be handled after homepage loads.
     */
    router.push(href);
    setOpen(false);
  };

  /*
   * When arriving at homepage with a hash,
   * wait until the page has rendered and then scroll.
   */
  useEffect(() => {
    if (pathname !== '/') return;

    const hash = window.location.hash.replace('#', '');

    if (!hash) return;

    let attempts = 0;
    let animationFrame;

    const findAndScroll = () => {
      const target = document.getElementById(hash);

      if (target) {
        setTimeout(() => {
          smoothScrollTo(target);
        }, 100);

        return;
      }

      attempts += 1;

      if (attempts < 60) {
        animationFrame = requestAnimationFrame(findAndScroll);
      }
    };

    animationFrame = requestAnimationFrame(findAndScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [pathname]);

  return (
    <header
      className="
        fixed
        inset-x-0
        top-3
        z-50
        px-3

        sm:top-4
        sm:px-4

        md:top-5
        md:px-6

        lg:top-7
        lg:px-8

        xl:top-8
        xl:px-10

        2xl:px-12
      "
    >
      <nav
        className="
          mx-auto
          w-full
          max-w-360

          overflow-hidden
          rounded-lg

          border
          border-slate-100

          bg-white

          shadow-sm

          md:rounded-xl
        "
      >
        {/* =====================================================
            MAIN NAVBAR
        ===================================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            px-4
            py-3

            sm:px-5

            md:px-6
            md:py-3.5

            lg:px-7

            xl:px-8
            xl:py-4
          "
        >
          {/* ===================================================
              LOGO
          =================================================== */}

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
              className="
                h-7
                w-auto

                sm:h-8

                md:h-10

                lg:h-11

                xl:h-12
              "
            />
          </Link>

          {/* ===================================================
              DESKTOP NAVIGATION
              ONLY VISIBLE FROM XL
          =================================================== */}

          <ul className="hidden items-center gap-8 xl:flex 2xl:gap-10">
            {navLinks.map((link) => {
              const isHashLink = link.href.includes('#');

              const hash = isHashLink ? `#${link.href.split('#')[1]}` : '';

              const active = isHashLink
                ? pathname === '/' && activeHash === hash
                : pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={`
                      relative
                      text-base
                      tracking-wide
                      transition-colors
                      duration-300

                      2xl:text-lg

                      ${
                        active
                          ? 'font-medium text-ocean'
                          : 'font-medium text-slate hover:text-ocean'
                      }
                    `}
                  >
                    {link.label}

                    {active && (
                      <motion.span
                        layoutId="navbar-active"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{
                          duration: 0.3,
                          ease: 'easeOut',
                        }}
                        className="
                          absolute
                          -bottom-2
                          left-0
                          h-px
                          bg-ocean
                        "
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ===================================================
              DESKTOP CTA
              ONLY VISIBLE FROM XL
          =================================================== */}

          <div className="hidden xl:block">
            <Button href="/booking-my-stay">Book Your Stay</Button>
          </div>

          {/* ===================================================
              MOBILE + TABLET ACTIONS
              VISIBLE BELOW XL
          =================================================== */}

          <div className="flex items-center gap-2 xl:hidden">
            {/* CALL BUTTON */}

            <a
              href="tel:+12425555555"
              aria-label="Call 32 ocean"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-midnight
                text-xs
                font-medium
                tracking-wide
                text-white
                transition-all
                duration-300
                hover:bg-ocean
                active:scale-95

                sm:h-11
                sm:w-11

                md:h-12
                md:w-12
              "
            >
              <FiPhone size={14} className="md:hidden" />
              <FiPhone size={16} className="hidden md:block" />
            </a>

            {/* MENU BUTTON */}

            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                bg-white
                text-midnight
                transition-all
                duration-300
                hover:bg-mist/40
                active:scale-95

                sm:h-11
                sm:w-11

                md:h-12
                md:w-12
              "
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -45,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 45,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeOut',
                    }}
                    className="
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <HiMiniXMark size={28} className="md:hidden" />
                    <HiMiniXMark size={32} className="hidden md:block" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 45,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -45,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeOut',
                    }}
                    className="
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <HiMiniBars3BottomRight size={28} className="md:hidden" />
                    <HiMiniBars3BottomRight
                      size={32}
                      className="hidden md:block"
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE + TABLET NAVIGATION
            VISIBLE BELOW XL
        ===================================================== */}

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden xl:hidden"
            >
              <motion.div
                initial={{
                  y: -12,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -8,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.04,
                  ease: 'easeOut',
                }}
                className="
                  mx-2
                  mb-2
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-100
                  bg-ivory

                  sm:mx-3
                  sm:mb-3

                  md:mx-4
                  md:mb-4
                "
              >
                <ul
                  className="
                    space-y-1
                    p-3

                    md:space-y-2
                    md:p-4
                  "
                >
                  {navLinks.map((link, index) => {
                    const isHashLink = link.href.includes('#');

                    const hash = isHashLink
                      ? `#${link.href.split('#')[1]}`
                      : '';

                    const active = isHashLink
                      ? pathname === '/' && activeHash === hash
                      : pathname === link.href;

                    return (
                      <motion.li
                        key={link.href}
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.08 + index * 0.05,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={(event) => handleNavClick(event, link.href)}
                          className={`
                            flex
                            items-center
                            justify-between
                            rounded-lg
                            px-4
                            py-3.5
                            text-sm
                            transition-colors
                            duration-300

                            md:px-5
                            md:py-4
                            md:text-base

                            ${
                              active
                                ? 'bg-mist/60 font-medium text-ocean'
                                : 'text-slate hover:bg-white hover:text-ocean'
                            }
                          `}
                        >
                          <span>{link.label}</span>

                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-ocean" />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}

                  {/* MOBILE + TABLET CTA */}

                  <motion.li
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: 0.22,
                    }}
                    className="pt-2"
                  >
                    <Button
                      href="/booking-my-stay"
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      Book Your Stay
                    </Button>
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
