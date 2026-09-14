import Image from 'next/image';
import { GoArrowDown } from 'react-icons/go';
export default function GalleryHero() {
  return (
    <section
      className=" relative flex w-full overflow-hidden bg-midnight h-[620px] 
          sm:h-[700px]

          md:h-[720px]

          lg:h-[840px]

          xl:h-[860px]

          2xl:h-[980px] "
      aria-labelledby="gallery-hero-heading"
    >
      {/* ===================================================== BACKGROUND IMAGE ===================================================== */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/villa.jpg"
          alt="Breakwater Villa in Ocean Club Estates, Paradise Island, Bahamas"
          fill
          priority
          sizes="100vw"
          className=" object-cover object-top "
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
      </div>
      {/* ===================================================== CONTENT ===================================================== */}
      <div className=" relative z-10 mx-auto flex h-full w-full max-w-360 flex-1 flex-col justify-end px-3 pb-28 sm:px-4 sm:pb-14 md:px-6 md:pb-16 lg:px-8 lg:pb-20 xl:px-10 xl:pb-24 2xl:px-0 2xl:pb-28 ">
        {/* ================================================= HERO CONTENT ================================================= */}
        <div className=" mx-auto w-full max-w-4xl text-center ">
          {/* ================================================= EYEBROW ================================================= */}
          <div className=" mb-5 flex items-center justify-center gap-3 sm:mb-7 sm:gap-4 md:mb-8 ">
            <span className=" h-px w-8 bg-[#B68A52] sm:w-10 md:w-12 lg:w-14 " />
            <p className=" text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[10px] lg:text-[11px] ">
              The Gallery
            </p>
            <span className=" h-px w-8 bg-[#B68A52] sm:w-10 md:w-12 lg:w-14 " />
          </div>
          {/* ================================================= HEADING ================================================= */}
          <h1
            id="gallery-hero-heading"
            className=" mx-auto max-w-4xl font-display font-medium leading-[1.05] tracking-tight text-white text-[40px] sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] 2xl:text-[72px] "
          >
            A closer look at <br />
            <span className="italic text-champagne"> island living. </span>
          </h1>
          {/* ================================================= DESCRIPTION ================================================= */}
          <p className=" mx-auto mt-5 w-full max-w-lg text-sm leading-6 text-white/75 sm:mt-6 sm:max-w-xl sm:text-base sm:leading-7 md:mt-7 md:text-lg md:leading-8 xl:max-w-2xl xl:text-xl xl:leading-8.5 ">
            Explore the spaces, details, and quiet moments that make Breakwater
            Villa a private retreat in Paradise Island.
          </p>
        </div>
        {/* ================================================= SCROLL INDICATOR ================================================= */}
        <div
          id="scroll-indicator-gallery"
          className=" mt-8 flex flex-col items-center gap-2 text-white/60 sm:mt-10 sm:gap-3 md:mt-12 lg:mt-14 "
        >
          <span className=" text-[8px] font-medium uppercase tracking-[0.28em] sm:text-[9px] lg:text-[10px] ">
            Explore
          </span>
          <div className=" flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition-all duration-500 sm:h-10 sm:w-10 md:h-11 md:w-11 hover:border-champagne hover:text-champagne ">
            <GoArrowDown
              size={15}
              strokeWidth={1.4}
              className=" sm:h-4 sm:w-4 md:h-[17px] md:w-[17px] "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
