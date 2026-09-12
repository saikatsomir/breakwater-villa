'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiPhone } from 'react-icons/fi';
import { HiMiniBars3BottomRight, HiMiniXMark } from 'react-icons/hi2';
import Button from './ui/Button';

const navLinks = [
  { href: '/#villa-experience', label: 'The Villa' },
  { href: '/villa-gallery', label: 'Gallery' },
  { href: '/#pricing', label: 'Pricing' },
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
   *
   * We use the browser's requestAnimationFrame instead of relying
   * on Lenis being available at the exact moment the user clicks.
   * This makes the navigation work consistently every time.
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

        /*
         * Update the URL without letting the browser
         * perform its native instant jump.
         */
        window.history.pushState(null, '', `/#${hash}`);

        setActiveHash(`#${hash}`);
      }

      setOpen(false);
      return;
    }

    /*
     * If we're on another page, navigate to the homepage.
     * The hash will be handled after the homepage loads.
     */
    router.push(href);
    setOpen(false);
  };

  /*
   * When arriving at the homepage with a hash,
   * wait until the page has rendered and then smoothly
   * scroll to the requested section.
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
        /*
         * Small delay ensures images/layout have had a chance
         * to settle before calculating the target position.
         */
        setTimeout(() => {
          smoothScrollTo(target);
        }, 100);

        return;
      }

      /*
       * If the section hasn't mounted yet, try again.
       */
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
    <header className="fixed inset-x-0 top-4 z-50 px-3 md:top-8 md:px-6">
      <nav
        className="
          mx-auto
          max-w-[1440px]
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

        <div className="flex h-18 items-center justify-between px-4 md:h-24 md:px-8">
          {/* ===================================================
              LOGO
          =================================================== */}

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
              className="h-7 w-auto md:h-13"
            />
          </Link>

          {/* ===================================================
              DESKTOP NAVIGATION
          =================================================== */}

          <ul className="hidden items-center gap-8 lg:flex">
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
          =================================================== */}

          <div className="hidden lg:block">
            <Button href="/booking-my-stay">Book Your Stay</Button>
          </div>

          {/* ===================================================
              MOBILE ACTIONS
          =================================================== */}

          <div className="flex items-center gap-2 lg:hidden">
            {/* CALL BUTTON */}

            <a
              href="tel:+12425555555"
              aria-label="Call Breakwater Villa"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                gap-2
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
              "
            >
              <FiPhone size={14} />
            </a>

            {/* =================================================
                MENU BUTTON
            ================================================= */}

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
                    className="flex items-center justify-center"
                  >
                    <HiMiniXMark size={32} />
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
                    className="flex items-center justify-center"
                  >
                    <HiMiniBars3BottomRight size={32} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
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
              className="overflow-hidden lg:hidden"
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
                "
              >
                <ul className="space-y-1 p-3">
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

                  {/* MOBILE CTA */}

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
