'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiPlus } from 'react-icons/fi';
import Button from '../ui/Button';

const faqs = [
  {
    number: '01',
    question: 'What is Breakwater Villa like?',
    answer:
      'Breakwater Villa is an exclusive Caribbean residence designed around tranquility, luxury, and natural beauty. The spacious interiors create a calm atmosphere, while views of lush greenery and beautiful sunsets bring the surrounding island into everyday life. Guests enjoy a private retreat with privileged access to the surrounding area and its world-class amenities.',
  },
  {
    number: '02',
    question: 'How many guests can the villa accommodate?',
    answer:
      'The residence features 6 bedrooms, 6 bathrooms, and approximately 6,500 square feet of living space. With six bedrooms accommodating two guests each, Breakwater Villa can comfortably host up to 12 guests.',
  },
  {
    number: '03',
    question: 'What are the bedroom arrangements?',
    answer:
      'There are six bedrooms in total. Bedrooms 1, 2, and 3 each feature one king bed and accommodate two guests. Bedrooms 4, 5, and 6 each feature one queen bed and accommodate two guests.',
  },
  {
    number: '04',
    question: 'What are the bathrooms like?',
    answer:
      'The villa has six en-suite bathrooms. Bathrooms 1 through 5 each feature a toilet, shower, and tub. Bathroom 6 features a toilet and shower. Every bedroom has convenient private en-suite facilities.',
  },
  {
    number: '05',
    question: 'What amenities and experiences are available?',
    answer:
      'General amenities include air conditioning, Wi-Fi, housekeeping, a private pool, a gated community setting, an office, and a theatre room. The villa is approximately a two-minute walk from a private beach and a two-minute golf cart ride from the Private Beach Club. Guests can also enjoy easy access to Atlantis, including its thrilling slides and captivating aquariums.',
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      className="
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-[0_8px_30px_rgba(11,42,58,0.06)]
        transition-shadow
        duration-500
        hover:shadow-[0_12px_36px_rgba(11,42,58,0.09)]
      "
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.number}`}
        className="
          group
          flex
          w-full
          items-center
          justify-between
          gap-4
          px-4
          py-5
          text-left
          sm:gap-5
          sm:px-6
          sm:py-6
          lg:px-7
          lg:py-7
        "
      >
        <div className="flex min-w-0 items-start gap-3 sm:gap-5">
          <span
            className="
              mt-0.5
              shrink-0
              font-display
              text-sm
              italic
              text-[#B68A52]
              sm:text-base
            "
          >
            {faq.number}
          </span>

          <span
            className="
              font-display
              text-[17px]
              font-medium
              leading-[1.15]
              text-midnight
              transition-colors
              duration-300
              group-hover:text-ocean
              sm:text-xl
              lg:text-[22px]
            "
          >
            {faq.question}
          </span>
        </div>

        <span
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-500
            sm:h-10
            sm:w-10
            ${
              isOpen
                ? 'rotate-45 border-[#B68A52] bg-[#B68A52] text-white'
                : 'border-slate/12 bg-ivory text-slate'
            }
          `}
        >
          <FiPlus size={17} strokeWidth={1.5} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.number}`}
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
              height: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.25,
              },
            }}
          >
            <div className="px-4 pb-6 sm:px-6 sm:pb-7 lg:px-7 lg:pb-7">
              <div className="border-t border-slate/8 pt-5">
                <p className="max-w-2xl text-sm leading-7 text-slate-muted md:text-[15px] md:leading-7">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="
        bg-white
        py-20
        sm:py-24
        md:py-32
        lg:py-40
      "
    >
      <div
        className="
          mx-auto
          max-w-360
          px-4
          sm:px-5
          md:px-8
          lg:px-0
        "
      >
        <div
          className="
            grid
            gap-12
            lg:grid-cols-[0.72fr_1.28fr]
            lg:items-start
            lg:gap-20
            xl:grid-cols-[0.7fr_1.3fr]
            xl:gap-24
          "
        >
          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              w-full
              max-w-xl
              text-center
              lg:sticky
              lg:top-32
              lg:mx-0
              lg:text-left
            "
          >
            {/* Eyebrow */}

            <div className="mb-6 flex items-center justify-center gap-3 sm:mb-7 lg:justify-start">
              <span className="h-2.5 w-2.5 rounded-full bg-midnight sm:h-3 sm:w-3" />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.23em]
                  text-slate-muted
                  sm:text-[10px]
                  sm:tracking-[0.25em]
                "
              >
                FAQ
              </span>
            </div>

            {/* Title */}

            <h2
              id="faq-heading"
              className="
                max-w-lg
                font-display
                text-[42px]
                font-medium
                leading-[0.95]
                tracking-tight
                text-midnight
                sm:text-5xl
                md:text-6xl
                lg:text-[64px]
                xl:text-[70px]
              "
            >
              Everything
              <br />
              <span className="italic text-[#B68A52]">you need to know.</span>
            </h2>

            {/* Subtitle */}

            <p
              className="
                mx-auto
                mt-6
                max-w-md
                text-sm
                leading-6.5
                text-slate-muted
                sm:mt-7
                sm:text-base
                sm:leading-7
                md:text-lg
                md:leading-8
                lg:mx-0
              "
            >
              Discover everything you need to know before your stay at
              Breakwater Villa.
            </p>

            {/* Button */}

            <div className="mt-8 flex justify-center lg:mt-9 lg:justify-start">
              <Button href="/contact">Book Your Stay</Button>
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT SIDE — FAQ
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-3 sm:space-y-4"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.number}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
