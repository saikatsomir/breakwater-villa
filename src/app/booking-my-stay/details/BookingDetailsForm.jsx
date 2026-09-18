'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  FiArrowRight,
  FiCheck,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';

const contactMethods = ['Call', 'Email', 'Text'];

const inquiryTypes = [
  'Looking to learn more',
  'Ready to book',
  'Travel Agent',
  'Event Planner',
  'Looking to host a wedding or event',
];

const steps = ['Select Dates', 'Guest Details'];

export default function BookingDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  const [contactMethod, setContactMethod] = useState('Email');

  const [inquiryType, setInquiryType] = useState('Ready to book');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return 'Not selected';

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);

    return Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const nights = calculateNights();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setSubmitError('');

    if (!checkIn || !checkOut) {
      setSubmitError(
        'Please select your check-in and check-out dates before continuing.'
      );
      return;
    }

    if (nights <= 0) {
      setSubmitError('Please select valid check-in and check-out dates.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkIn,
          checkOut,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          contactMethod,
          inquiryType,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSubmitError(
          data.message ||
            'Something went wrong while submitting your inquiry. Please try again.'
        );
        return;
      }

      router.push('/booking-my-stay/success');
    } catch (error) {
      console.error('Booking submission error:', error);

      setSubmitError(
        'Unable to submit your inquiry right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* =====================================================
          BOOKING PROGRESS
      ===================================================== */}

      <section
        aria-label="Booking progress"
        className="
          border-b
          border-slate/10
          bg-ivory
          px-5
          py-5
          sm:px-8
          md:px-10
          lg:px-14
          xl:px-16
        "
      >
        <div className="mx-auto max-w-[1440px]">
          {/* Desktop Progress */}

          <div className="hidden items-center justify-center pt-40 lg:flex">
            <div className="flex w-full max-w-5xl items-center">
              {steps.map((step, index) => {
                const completed = index === 0;
                const active = index === 1;

                return (
                  <div key={step} className="flex flex-1 items-center">
                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          border
                          text-xs
                          font-medium
                          ${
                            completed || active
                              ? 'border-midnight bg-midnight text-white'
                              : 'border-slate/20 bg-white text-slate-muted'
                          }
                        `}
                      >
                        {completed ? <FiCheck size={14} /> : index + 1}
                      </span>

                      <span
                        className={`
                          whitespace-nowrap
                          text-xs
                          tracking-wide
                          ${
                            active || completed
                              ? 'font-medium text-midnight'
                              : 'text-slate-muted'
                          }
                        `}
                      >
                        {step}
                      </span>
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        className={`
                          mx-6
                          h-px
                          flex-1
                          ${completed ? 'bg-midnight/20' : 'bg-slate/10'}
                        `}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Progress */}

          <div className="mt-26 flex items-center justify-between lg:hidden">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-slate-muted">
                Step 02 of 02
              </p>

              <p className="mt-1 font-display text-xl text-midnight">
                Guest Details
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-5 rounded-full bg-midnight" />
              <span className="h-1.5 w-5 rounded-full bg-midnight" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section
        aria-labelledby="guest-details-heading"
        className="
          px-5
          py-14
          sm:px-8
          sm:py-20
          md:px-10
          md:py-28
          lg:px-14
          lg:py-32
          xl:px-16
        "
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-28">
            {/* =================================================
                LEFT — FORM
            ================================================= */}

            <div className="max-w-3xl">
              {/* Header */}

              <div className="mb-12">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#B68A52] sm:text-xs">
                  Guest Information
                </p>

                <h1
                  id="guest-details-heading"
                  className="
                    font-display
                    text-4xl
                    font-normal
                    leading-[1]
                    tracking-[-0.035em]
                    text-midnight
                    sm:text-5xl
                    md:text-6xl
                  "
                >
                  Tell us a little{' '}
                  <span className="italic text-[#B68A52]">about yourself.</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-muted sm:text-base">
                  A few details will help us prepare for your stay and make sure
                  our team can assist you throughout the reservation process.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* =================================================
                    DATES
                ================================================= */}

                <div>
                  <div className="mb-4">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-muted">
                      Your Dates
                    </p>
                  </div>

                  <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate/10 bg-ivory">
                    <div className="border-r border-slate/10 p-5 sm:p-6">
                      <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-muted">
                        Check-in
                      </p>

                      <p className="mt-2 font-display text-xl text-midnight sm:text-2xl">
                        {formatDate(checkIn)}
                      </p>
                    </div>

                    <div className="p-5 sm:p-6">
                      <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-muted">
                        Check-out
                      </p>

                      <p className="mt-2 font-display text-xl text-midnight sm:text-2xl">
                        {formatDate(checkOut)}
                      </p>
                    </div>
                  </div>

                  {nights > 0 && (
                    <p className="mt-3 text-xs text-slate-muted">
                      {nights} {nights === 1 ? 'night' : 'nights'} at Breakwater
                      Villa
                    </p>
                  )}
                </div>

                {/* =================================================
                    NAME
                ================================================= */}

                <div>
                  <div className="mb-4">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-muted">
                      Your Information
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-xs font-medium text-slate"
                      >
                        First Name
                        <span className="ml-1 text-[#B68A52]">*</span>
                      </label>

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                        className="
                          h-14
                          w-full
                          rounded-xl
                          border
                          border-slate/12
                          bg-ivory
                          px-4
                          text-sm
                          text-midnight
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-slate-muted/50
                          focus:border-midnight/35
                          focus:bg-white
                        "
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-xs font-medium text-slate"
                      >
                        Last Name
                        <span className="ml-1 text-[#B68A52]">*</span>
                      </label>

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name"
                        className="
                          h-14
                          w-full
                          rounded-xl
                          border
                          border-slate/12
                          bg-ivory
                          px-4
                          text-sm
                          text-midnight
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-slate-muted/50
                          focus:border-midnight/35
                          focus:bg-white
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    EMAIL + PHONE
                ================================================= */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium text-slate"
                    >
                      Email Address
                      <span className="ml-1 text-[#B68A52]">*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="
                        h-14
                        w-full
                        rounded-xl
                        border
                        border-slate/12
                        bg-ivory
                        px-4
                        text-sm
                        text-midnight
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-slate-muted/50
                        focus:border-midnight/35
                        focus:bg-white
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-medium text-slate"
                    >
                      Phone Number
                      <span className="ml-1 text-[#B68A52]">*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (242) 000-0000"
                      className="
                        h-14
                        w-full
                        rounded-xl
                        border
                        border-slate/12
                        bg-ivory
                        px-4
                        text-sm
                        text-midnight
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-slate-muted/50
                        focus:border-midnight/35
                        focus:bg-white
                      "
                    />
                  </div>
                </div>

                {/* =================================================
                    CONTACT PREFERENCE
                ================================================= */}

                <div>
                  <label className="mb-4 block text-xs font-medium text-slate">
                    How would you prefer to be contacted?
                    <span className="ml-1 text-[#B68A52]">*</span>
                  </label>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {contactMethods.map((method) => {
                      const selected = contactMethod === method;

                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => {
                            setContactMethod(method);

                            if (submitError) {
                              setSubmitError('');
                            }
                          }}
                          className={`
                            flex
                            h-12
                            items-center
                            justify-center
                            rounded-xl
                            border
                            text-sm
                            transition-all
                            duration-300
                            ${
                              selected
                                ? 'border-midnight bg-midnight font-medium text-white'
                                : 'border-slate/12 bg-ivory text-slate hover:border-midnight/25 hover:bg-white'
                            }
                          `}
                        >
                          {method}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* =================================================
                    INQUIRY TYPE
                ================================================= */}

                <div>
                  <label className="mb-4 block text-xs font-medium text-slate">
                    You are...
                  </label>

                  <div className="space-y-2">
                    {inquiryTypes.map((type) => {
                      const selected = inquiryType === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setInquiryType(type);

                            if (submitError) {
                              setSubmitError('');
                            }
                          }}
                          className={`
                            flex
                            min-h-12
                            w-full
                            items-center
                            justify-between
                            rounded-xl
                            border
                            px-4
                            py-3
                            text-left
                            text-sm
                            transition-all
                            duration-300
                            ${
                              selected
                                ? 'border-midnight bg-midnight font-medium text-white'
                                : 'border-slate/12 bg-ivory text-slate hover:border-midnight/25 hover:bg-white'
                            }
                          `}
                        >
                          <span>{type}</span>

                          {selected && (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                              <FiCheck size={12} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* =================================================
                    NOTES
                ================================================= */}

                <div>
                  <label
                    htmlFor="notes"
                    className="mb-2 block text-xs font-medium text-slate"
                  >
                    Notes
                    <span className="ml-1 font-normal text-slate-muted">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Anything you'd like our team to know about your stay..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-slate/12
                      bg-ivory
                      px-4
                      py-4
                      text-sm
                      leading-6
                      text-midnight
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-slate-muted/50
                      focus:border-midnight/35
                      focus:bg-white
                    "
                  />
                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <div className="border-t border-slate/10 pt-8">
                  {submitError && (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="
                        mb-5
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        leading-6
                        text-red-700
                      "
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
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
                      px-6
                      text-sm
                      font-medium
                      tracking-wide
                      text-white
                      transition-all
                      duration-500
                      hover:bg-ocean
                      active:scale-[0.99]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:h-16
                    "
                  >
                    <span>
                      {isSubmitting
                        ? 'Submitting Inquiry...'
                        : 'Submit Reservation Inquiry'}
                    </span>

                    {!isSubmitting && (
                      <FiArrowRight
                        size={18}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    )}

                    {isSubmitting && (
                      <span
                        className="
                          h-4
                          w-4
                          animate-spin
                          rounded-full
                          border-2
                          border-white/30
                          border-t-white
                        "
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  <p className="mt-4 text-center text-[11px] leading-5 text-slate-muted">
                    Your information is only used to assist with your Breakwater
                    Villa reservation.
                  </p>
                </div>
              </form>
            </div>

            {/* =================================================
                RIGHT — VILLA INSIGHT
            ================================================= */}

            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="overflow-hidden rounded-2xl bg-ivory">
                {/* Image */}

                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/home/couch.jpg"
                    alt="Elegant interior lounge at 32 ocean in Paradise Island, Bahamas"
                    className="
                      h-full
                      w-full
                      object-cover
                      object-center
                    "
                  />
                </div>

                {/* Content */}

                <div className="p-6 sm:p-7 md:p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#B68A52]">
                    32 ocean
                  </p>

                  <h2 className="mt-2 font-display text-3xl font-normal tracking-[-0.025em] text-midnight sm:text-4xl">
                    A stay worth slowing down for.
                  </h2>

                  <div className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-muted">
                    <FiMapPin
                      size={15}
                      className="mt-1 shrink-0 text-[#B68A52]"
                    />

                    <span>
                      Ocean View Villa
                      <br />
                      on Paradise Island
                    </span>
                  </div>

                  <div className="mt-7 border-t border-slate/10 pt-6">
                    <p className="text-sm leading-7 text-slate">
                      A private six-bedroom residence surrounded by the natural
                      beauty of Paradise Island, created for relaxed days and
                      memorable moments together.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-slate/10 pt-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-midnight">
                      <FiPhone size={14} />
                    </div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-muted">
                        Need assistance?
                      </p>

                      <a
                        href="tel:+12425555555"
                        className="mt-0.5 block text-sm font-medium text-midnight transition-colors hover:text-[#B68A52]"
                      >
                        +1 (242) 555-5555
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
