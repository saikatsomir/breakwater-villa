import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-white">
      <section
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-5
          py-20
          sm:px-8
          md:px-10
          lg:px-14
          xl:px-16
        "
      >
        <div className="mx-auto w-full max-w-[900px] text-center">
          {/* =================================================
              SUCCESS ICON
          ================================================= */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#B68A52]/30 bg-[#B68A52]/8 sm:h-20 sm:w-20">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight text-white sm:h-12 sm:w-12">
              <FiCheck size={20} strokeWidth={1.8} className="sm:h-6 sm:w-6" />
            </div>
          </div>

          {/* =================================================
              EYEBROW
          ================================================= */}

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.3em] text-[#B68A52] sm:text-xs">
            Inquiry Received
          </p>

          {/* =================================================
              HEADING
          ================================================= */}

          <h1
            className="
              mx-auto
              mt-4
              max-w-3xl
              font-display
              text-4xl
              font-normal
              leading-[1]
              tracking-[-0.035em]
              text-midnight
              sm:text-5xl
              md:text-6xl
              lg:text-[72px]
            "
          >
            Thank you for
            <br />
            <span className="italic text-[#B68A52]">reaching out.</span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              text-sm
              leading-7
              text-slate-muted
              sm:text-base
              sm:leading-8
            "
          >
            We've received your reservation inquiry for 32 ocean. Our team will
            review your request and get back to you shortly.
          </p>

          {/* =================================================
              STATUS CARD
          ================================================= */}

          <div
            className="
              mx-auto
              mt-10
              max-w-2xl
              rounded-2xl
              border
              border-slate/10
              bg-ivory
              px-6
              py-7
              text-left
              sm:px-8
              sm:py-8
            "
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-midnight">
                <FiCheck size={15} />
              </div>

              <div>
                <p className="text-sm font-medium text-midnight">
                  Your inquiry has been submitted.
                </p>

                <p className="mt-1.5 text-sm leading-6 text-slate-muted">
                  Your selected dates and contact information have been sent to
                  the 32 ocean team.
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-slate/10 pt-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-muted">
                What happens next
              </p>

              <p className="mt-2 text-sm leading-6 text-slate">
                Our team will review your inquiry and contact you using your
                preferred contact method. Your reservation is not confirmed
                until you receive confirmation from our team.
              </p>
            </div>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="
                group
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-midnight
                px-7
                text-sm
                font-medium
                tracking-wide
                text-white
                transition-all
                duration-500
                hover:bg-ocean
                active:scale-[0.99]
                sm:w-auto
                sm:min-w-[190px]
              "
            >
              <span>Return to Home</span>

              <FiArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              href="/the-villa"
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                rounded-full
                border
                border-slate/15
                bg-white
                px-7
                text-sm
                font-medium
                tracking-wide
                text-midnight
                transition-all
                duration-500
                hover:border-midnight/25
                hover:bg-ivory
                sm:w-auto
                sm:min-w-[190px]
              "
            >
              Explore the Villa
            </Link>
          </div>

          {/* =================================================
              FOOTNOTE
          ================================================= */}

          <p className="mx-auto mt-8 max-w-lg text-[11px] leading-5 text-slate-muted">
            Thank you for considering 32 ocean for your stay on Paradise Island.
          </p>
        </div>
      </section>
    </main>
  );
}
