'use client';

import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';

export default function Button({
  children = 'Book Your Stay',
  href,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `
    group
    inline-flex
    py-2
    box-border
    items-center
    justify-between
    rounded-full
    border-2
    border-transparent
    bg-midnight
    pl-2
    pr-2
    text-sm
    font-medium
    tracking-wide
    text-white
    shadow-sm
    hover:shadow-none
    transition-all
    duration-500
    ease-out
    hover:border-[#B68A52]
    hover:bg-white
    hover:text-midnight
    hover:shadow-lg
    active:scale-[0.98]
    ${className}
  `;

  const content = (
    <>
      {/* Button Text */}
      <span
        className="
          flex
          h-full
          items-center
          justify-center
          pl-2
          pr-4
          text-lg
          whitespace-nowrap
        "
      >
        {children}
      </span>

      {/* Arrow Circle */}
      <span
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-champagne
          text-midnight
          transition-colors
          duration-500
          ease-out
          group-hover:bg-[#c89c63]
        "
      >
        {/* Arrow */}
        <span
          className="
            flex
            items-center
            justify-center
            transition-transform
            duration-500
            ease-out
            group-hover:rotate-45
          "
        >
          <GoArrowUpRight size={21} strokeWidth={1.2} />
        </span>
      </span>
    </>
  );

  /* ================= LINK BUTTON ================= */
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  /* ================= NORMAL BUTTON ================= */
  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {content}
    </button>
  );
}
