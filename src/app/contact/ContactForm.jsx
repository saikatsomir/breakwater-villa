'use client';

import { useState } from 'react';
import {
  FiArrowUpRight,
  FiMail,
  FiMessageCircle,
  FiPhone,
} from 'react-icons/fi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    setSubmitStatus({
      type: '',
      message: '',
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send your message.');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you. Your message has been sent successfully.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form submission error:', error);

      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="overflow-hidden bg-ivory py-20 sm:py-24 md:py-32 lg:py-40 xl:py-44 2xl:py-52">
      <div className="mx-auto max-w-360 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-0">
        <div
          className="
            grid items-start
            gap-10
            sm:gap-12
            md:gap-14
            lg:grid-cols-[0.8fr_1.2fr] lg:gap-16
            xl:grid-cols-[0.72fr_1.28fr] xl:gap-20
            2xl:grid-cols-[0.7fr_1.3fr] 2xl:gap-24
          "
        >
          {/* =========================================
              LEFT — CONTACT INFORMATION
          ========================================= */}
          <div className="w-full max-w-2xl lg:pt-2">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-2.5 sm:mb-7 sm:gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-ocean sm:h-2 sm:w-2" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-muted sm:text-[10px] lg:text-[11px]">
                Get In Touch
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                max-w-2xl
                font-display font-medium leading-[1.05] tracking-tight text-midnight
                text-[40px]
                sm:text-5xl
                md:text-6xl
                lg:text-[56px]
                xl:text-[64px]
                2xl:text-[72px]
              "
            >
              Have a question?
              <br />
              <span className="italic text-ocean">
                We’d love to hear from you.
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-5 max-w-xl text-sm leading-6 text-slate-muted
                sm:mt-6 sm:text-base sm:leading-7
                md:mt-7 md:text-lg md:leading-8
                xl:text-xl xl:leading-8.5
              "
            >
              Whether you're curious about the villa, the area, or simply want
              to say hello, send us a message. Our team will be happy to help.
            </p>

            {/* Contact Cards */}
            <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
              {/* Email */}
              <a
                href="mailto:hello@breakwatervilla.com"
                className="
                  group flex items-center gap-3
                  rounded-xl bg-white p-4
                  shadow-[0_6px_25px_rgba(11,42,58,0.04)]
                  transition-all duration-500
                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_30px_rgba(11,42,58,0.08)]
                  sm:gap-4 sm:rounded-2xl sm:p-5
                "
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist/60 text-ocean transition-colors duration-300 group-hover:bg-champagne sm:h-11 sm:w-11">
                  <FiMail size={17} strokeWidth={1.5} />
                </span>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-muted">
                    Email Us
                  </p>

                  <p className="mt-1 truncate text-xs font-medium text-midnight sm:text-[15px]">
                    hello@breakwatervilla.com
                  </p>
                </div>

                <FiArrowUpRight
                  size={16}
                  className="
                    ml-auto shrink-0 text-slate-muted
                    transition-all duration-500
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-midnight
                    sm:size-[17px]
                  "
                />
              </a>

              {/* Phone */}
              <a
                href="tel:+12425555555"
                className="
                  group flex items-center gap-3
                  rounded-xl bg-white p-4
                  shadow-[0_6px_25px_rgba(11,42,58,0.04)]
                  transition-all duration-500
                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_30px_rgba(11,42,58,0.08)]
                  sm:gap-4 sm:rounded-2xl sm:p-5
                "
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist/60 text-ocean transition-colors duration-300 group-hover:bg-champagne sm:h-11 sm:w-11">
                  <FiPhone size={16} strokeWidth={1.5} />
                </span>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-muted">
                    Give Us A Call
                  </p>

                  <p className="mt-1 text-xs font-medium text-midnight sm:text-[15px]">
                    +1 (242) 555-5555
                  </p>
                </div>

                <FiArrowUpRight
                  size={16}
                  className="
                    ml-auto shrink-0 text-slate-muted
                    transition-all duration-500
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-midnight
                    sm:size-[17px]
                  "
                />
              </a>
            </div>

            {/* Response Note */}
            <div className="mt-6 flex items-start gap-3 sm:mt-8">
              <FiMessageCircle
                size={16}
                strokeWidth={1.4}
                className="mt-0.5 shrink-0 text-ocean sm:size-[17px]"
              />

              <p className="max-w-sm text-xs leading-5 text-slate-muted sm:text-sm sm:leading-6">
                We’ll get back to you as soon as we can. We look forward to
                hearing from you.
              </p>
            </div>
          </div>

          {/* =========================================
              RIGHT — FORM
          ========================================= */}
          <div
            className="
              rounded-2xl bg-white
              p-5
              shadow-[0_12px_45px_rgba(11,42,58,0.06)]
              sm:rounded-3xl sm:p-6
              md:p-8
              lg:p-9
              xl:p-10
              2xl:p-12
            "
          >
            {/* Form Header */}
            <div className="mb-7 sm:mb-8 md:mb-9">
              <h3 className="font-display text-2xl font-medium text-midnight sm:text-3xl md:text-[32px]">
                Send us a message
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-muted sm:text-base">
                Fill out the form below and we'll be in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <InputField
                  label="Your Name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone + Subject */}
              <div className="mt-5 grid gap-5 sm:mt-6 sm:grid-cols-2 sm:gap-6">
                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+1 (242) ..."
                  value={formData.phone}
                  onChange={handleChange}
                />

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-xs font-medium text-midnight"
                  >
                    What can we help with?
                  </label>

                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="
                        h-12.5 w-full appearance-none rounded-xl
                        bg-ivory px-4 pr-10
                        text-sm text-midnight
                        outline-none
                        ring-1 ring-transparent
                        transition-all duration-300
                        placeholder:text-slate-muted
                        hover:bg-mist/30
                        focus:bg-white
                        focus:ring-midnight/15
                        sm:h-14
                      "
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>

                      <option value="general">General Question</option>

                      <option value="villa">About The Villa</option>

                      <option value="amenities">Amenities & Services</option>

                      <option value="location">Location</option>

                      <option value="availability">Availability</option>

                      <option value="other">Something Else</option>
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-slate-muted" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mt-5 sm:mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-medium text-midnight"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us a little about what you need..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="
                    min-h-[140px] w-full resize-none
                    rounded-xl bg-ivory
                    px-4 py-3.5
                    text-sm leading-6 text-midnight
                    outline-none
                    ring-1 ring-transparent
                    transition-all duration-300
                    placeholder:text-slate-muted
                    hover:bg-mist/30
                    focus:bg-white
                    focus:ring-midnight/15
                    sm:min-h-[160px] sm:text-base
                  "
                />
              </div>

              {/* Submission Status */}
              {submitStatus.message && (
                <div
                  role="status"
                  className={`mt-5 rounded-xl px-4 py-3 text-sm leading-5 ${
                    submitStatus.type === 'success'
                      ? 'bg-mist/60 text-ocean'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Bottom */}
              <div
                className="
                  mt-6 flex flex-col gap-5
                  sm:mt-7
                  sm:flex-row sm:items-center sm:justify-between
                "
              >
                <p className="max-w-xs text-[10px] leading-4.5 text-slate-muted">
                  Your information is only used to respond to your message.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    group flex h-13.5 w-full shrink-0
                    items-center justify-between
                    rounded-full bg-midnight
                    pl-5 pr-2
                    text-sm font-medium text-white
                    transition-all duration-500
                    hover:bg-ocean
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                    sm:h-15 sm:w-auto sm:min-w-[190px] sm:pl-6
                  "
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne text-midnight transition-all duration-500 group-hover:bg-ocean sm:h-10 sm:w-10">
                    <FiArrowUpRight
                      size={18}
                      strokeWidth={1.6}
                      className="transition-transform duration-500 group-hover:rotate-45"
                    />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   INPUT FIELD
========================================= */

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium text-midnight"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          h-12.5 w-full rounded-xl
          bg-ivory px-4
          text-sm text-midnight
          outline-none
          ring-1 ring-transparent
          transition-all duration-300
          placeholder:text-slate-muted
          hover:bg-mist/30
          focus:bg-white
          focus:ring-midnight/15
          sm:h-14 sm:text-base
        "
      />
    </div>
  );
}
