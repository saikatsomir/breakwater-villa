'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiPlus } from 'react-icons/fi';
import Button from '../ui/SiteButton';
const faqs = [
  {
    number: '01',
    question: 'What is 32 ocean like?',
    answer:
      '32 ocean is an exclusive Caribbean residence designed around tranquility, luxury, and natural beauty. The spacious interiors create a calm atmosphere, while views of lush greenery and beautiful sunsets bring the surrounding island into everyday life. Guests enjoy a private retreat with privileged access to the surrounding area and its world-class amenities.',
  },
  {
    number: '02',
    question: 'How many guests can the villa accommodate?',
    answer:
      'The residence features 6 bedrooms, 6 bathrooms, and approximately 6,500 square feet of living space. With six bedrooms accommodating two guests each, 32 ocean can comfortably host up to 10 guests.',
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
      'General amenities include air conditioning, Wi-Fi, housekeeping, a private pool, a gated community setting, an office, and a theatre room. The villa is approximately a two-minute walk from a private beach and a two-minute paid golf cart ride from the Private Beach Club. Guests can also enjoy easy access to Atlantis, including its thrilling slides and captivating aquariums.',
  },
];
function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      className=" group overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgba(11,42,58,0.06)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(11,42,58,0.10)] sm:rounded-2xl "
    >
      {' '}
      {/* ===================================================== QUESTION ===================================================== */}{' '}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.number}`}
        className=" flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:gap-5 sm:px-6 sm:py-6 md:px-7 md:py-7 lg:px-8 lg:py-8 xl:px-9 xl:py-9 "
      >
        {' '}
        <div className="flex min-w-0 items-start gap-3 sm:gap-5 md:gap-6">
          {' '}
          {/* Number */}{' '}
          <span className=" mt-0.5 shrink-0 font-display text-sm italic leading-none text-champagne sm:text-base xl:text-lg ">
            {' '}
            {faq.number}{' '}
          </span>{' '}
          {/* Question */}{' '}
          <span className=" min-w-0 font-display text-[18px] font-medium leading-[1.15] text-midnight transition-colors duration-300 group-hover:text-ocean sm:text-xl md:text-[21px] lg:text-[22px] xl:text-[24px] ">
            {' '}
            {faq.question}{' '}
          </span>{' '}
        </div>{' '}
        {/* Plus */}{' '}
        <span
          className={` flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:h-10 sm:w-10 md:h-11 md:w-11 ${
            isOpen
              ? 'rotate-45 border-champagne bg-champagne text-white'
              : 'border-slate/12 bg-[#f4f3f0] text-slate'
          } `}
        >
          {' '}
          <FiPlus
            size={17}
            strokeWidth={1.5}
            className="sm:h-[18px] sm:w-[18px]"
          />{' '}
        </span>{' '}
      </button>{' '}
      {/* ===================================================== ANSWER ===================================================== */}{' '}
      <AnimatePresence initial={false}>
        {' '}
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.number}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.25 },
            }}
          >
            {' '}
            <div className=" px-5 pb-6 sm:px-6 sm:pb-7 md:px-7 md:pb-8 lg:px-8 lg:pb-8 xl:px-9 xl:pb-9 ">
              {' '}
              <div className=" border-t border-slate/10 pt-5 sm:pt-6 md:pt-7 xl:pt-8 ">
                {' '}
                <p className=" max-w-2xl text-sm leading-6 text-slate-muted sm:text-base sm:leading-7 md:text-lg md:leading-8 lg:max-w-3xl xl:text-[17px] xl:leading-8 ">
                  {' '}
                  {faq.answer}{' '}
                </p>{' '}
              </div>{' '}
            </div>{' '}
          </motion.div>
        )}{' '}
      </AnimatePresence>{' '}
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
      className=" overflow-hidden bg-[#f4f3f0] py-20 sm:py-24 md:py-32 lg:py-40 xl:py-44 2xl:py-52 "
    >
      {' '}
      <div className=" mx-auto w-full max-w-360 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-0 ">
        {' '}
        {/* ===================================================== MAIN GRID ===================================================== */}{' '}
        <div className=" grid items-start gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 xl:grid-cols-[0.72fr_1.28fr] xl:gap-20 2xl:grid-cols-[0.7fr_1.3fr] 2xl:gap-24 ">
          {' '}
          {/* ===================================================== LEFT — HEADER ===================================================== */}{' '}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className=" w-full max-w-2xl self-start "
          >
            {' '}
            {/* ================================================= EYEBROW ================================================= */}{' '}
            <div className=" mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-mist px-3 py-1.5 sm:mb-7 sm:px-3.5 md:px-4 ">
              {' '}
              <span className=" h-1.5 w-1.5 shrink-0 rounded-full bg-[#B58A52] sm:h-2 sm:w-2 " />{' '}
              <span className=" text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-muted sm:text-[10px] lg:text-[11px] ">
                {' '}
                FAQ{' '}
              </span>{' '}
            </div>{' '}
            {/* ================================================= TITLE ================================================= */}{' '}
            <h2
              id="faq-heading"
              className=" max-w-3xl font-display text-[40px] font-medium leading-[1.05] tracking-tight text-midnight sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] 2xl:text-[72px] "
            >
              {' '}
              Everything <br />{' '}
              <span className="italic text-[#B58A52]">
                {' '}
                you need to know.{' '}
              </span>{' '}
            </h2>{' '}
            {/* ================================================= SUBTITLE ================================================= */}{' '}
            <p className=" mt-6 max-w-lg text-sm leading-6 text-slate-muted sm:mt-7 sm:text-base sm:leading-7 md:text-lg md:leading-8 xl:max-w-md xl:text-xl xl:leading-8.5 ">
              {' '}
              Discover everything you need to know before your stay at 32 ocean.{' '}
            </p>{' '}
            {/* ================================================= BUTTON ================================================= */}{' '}
            <div className=" mt-6 sm:mt-8 xl:mt-9 ">
              {' '}
              <Button href="/booking-my-stay" className="w-full sm:w-auto">
                {' '}
                Book Your Stay{' '}
              </Button>{' '}
            </div>{' '}
          </motion.div>{' '}
          {/* ===================================================== RIGHT — FAQ LIST ===================================================== */}{' '}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className=" space-y-3 sm:space-y-4 md:space-y-5 "
          >
            {' '}
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.number}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}{' '}
          </motion.div>{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
