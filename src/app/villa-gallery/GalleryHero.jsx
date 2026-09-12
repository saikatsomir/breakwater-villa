import Image from 'next/image';
import { GoArrowDown } from 'react-icons/go';

export default function GalleryHero() {
  return (
    <section
      className="relative flex min-h-[620px] h-[78svh] max-h-[860px] overflow-hidden bg-midnight sm:min-h-[680px] sm:h-[82svh] lg:min-h-[720px] lg:h-[86svh]"
      aria-labelledby="gallery-hero-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/villa.jpg"
          alt="Breakwater Villa in Ocean Club Estates, Paradise Island, Bahamas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
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

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/20 to-midnight/5" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-14 md:pb-16 lg:px-12 lg:pb-20">
        <div className="mx-auto w-full max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4">
            <span className="h-px w-8 bg-[#B68A52] sm:w-12 md:w-14" />

            <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-[10px] md:text-[11px]">
              The Gallery
            </p>

            <span className="h-px w-8 bg-[#B68A52] sm:w-12 md:w-14" />
          </div>

          {/* Heading */}
          <h1
            id="gallery-hero-heading"
            className="font-display text-[44px] font-normal leading-[0.94] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            A closer look at
            <br />
            <span className="italic text-[#B68A52]">island living.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-[500px] text-[13px] leading-6 text-white/75 sm:mt-6 sm:text-sm sm:leading-7 md:mt-7 md:text-base md:leading-8">
            Explore the spaces, details, and quiet moments that make Breakwater
            Villa a private retreat in Paradise Island.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex flex-col items-center gap-2 text-white/60 sm:mt-10 sm:gap-3 md:mt-12">
          <span className="text-[8px] font-medium uppercase tracking-[0.28em] sm:text-[9px]">
            Explore
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 sm:h-10 sm:w-10">
            <GoArrowDown size={15} strokeWidth={1.4} />
          </div>
        </div>
      </div>
    </section>
  );
}
