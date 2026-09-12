import Image from 'next/image';

export default function ResidenceIntro() {
  return (
    <section
      className="bg-ivory py-20 sm:py-24 md:py-28 lg:py-32"
      aria-labelledby="residence-heading"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-0">
        {/* Section Introduction */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 md:mb-16 lg:mb-20">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4">
            <span className="h-px w-8 bg-[#B68A52] sm:w-12" />

            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B68A52] sm:text-[10px] md:text-[11px]">
              The Residence
            </p>

            <span className="h-px w-8 bg-[#B68A52] sm:w-12" />
          </div>

          {/* Heading */}
          <h2
            id="residence-heading"
            className="font-display text-4xl font-normal leading-[0.98] tracking-[-0.035em] text-midnight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Designed for
            <br className="sm:hidden" /> living well.
          </h2>

          {/* Intro */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-muted sm:mt-6 sm:text-base sm:leading-8">
            Every space at Breakwater Villa is designed to make island living
            feel effortless — from open interiors and sun-filled terraces to
            quiet corners made for slowing down.
          </p>
        </div>

        {/* Editorial Image Grid */}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.65fr_1fr] lg:grid-rows-2">
          {/* Large Exterior */}
          <div className="group relative min-h-[420px] overflow-hidden rounded-2xl sm:min-h-[520px] lg:row-span-2 lg:min-h-[700px]">
            <Image
              src="/images/home/villa-intro.jpg"
              alt="Exterior of Breakwater Villa in Ocean Club Estates, Paradise Island, Bahamas"
              fill
              sizes="(max-width: 1023px) 100vw, 65vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
            />

            {/* Image Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-midnight/65 to-transparent px-6 pb-6 pt-20 sm:px-8 sm:pb-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/85">
                The Exterior
              </p>
            </div>
          </div>

          {/* Interior */}
          <div className="group relative min-h-[300px] overflow-hidden rounded-2xl sm:min-h-[340px] lg:min-h-0">
            <Image
              src="/images/home/couch.jpg"
              alt="Elegant interior lounge at Breakwater Villa in Paradise Island, Bahamas"
              fill
              sizes="(max-width: 1023px) 100vw, 35vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
            />

            {/* Image Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-midnight/65 to-transparent px-6 pb-6 pt-20 sm:px-8 sm:pb-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/85">
                Interior
              </p>
            </div>
          </div>

          {/* Terrace */}
          <div className="group relative min-h-[300px] overflow-hidden rounded-2xl sm:min-h-[340px] lg:min-h-0">
            <Image
              src="/images/home/big-terrace.jpg"
              alt="Spacious terrace at Breakwater Villa overlooking the Bahamas"
              fill
              sizes="(max-width: 1023px) 100vw, 35vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
            />

            {/* Image Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-midnight/65 to-transparent px-6 pb-6 pt-20 sm:px-8 sm:pb-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/85">
                Terrace
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
