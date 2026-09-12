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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your form API / email service here.
    console.log('Contact form:', formData);
  };

  return (
    <section className="overflow-hidden bg-ivory py-16 sm:py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-360 px-4 sm:px-5 md:px-8 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 xl:grid-cols-[0.7fr_1.3fr] xl:gap-28">
          {/* =========================================
              LEFT
          ========================================= */}
          <div className="lg:pt-4">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-ocean" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-muted sm:text-[10px] sm:tracking-[0.25em]">
                Get In Touch
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-xl font-display text-[40px] font-medium leading-[0.97] tracking-tight text-midnight sm:text-[60px]">
              Have a question?
              <br />
              <div className="pt-3"></div>
              <span className="italic text-ocean">
                We’d love to hear from you.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-md text-sm leading-6.5 text-slate-muted sm:mt-7 sm:text-base sm:leading-7">
              Whether you're curious about the villa, the area, or simply want
              to say hello, send us a message. Our team will be happy to help.
            </p>

            {/* Contact Cards */}
            <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
              {/* Email */}
              <a
                href="mailto:hello@breakwatervilla.com"
                className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_6px_25px_rgba(11,42,58,0.04)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(11,42,58,0.08)] sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist/60 text-ocean transition-colors duration-300 group-hover:bg-champagne">
                  <FiMail size={18} strokeWidth={1.5} />
                </span>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-muted">
                    Email Us
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-midnight sm:text-[15px]">
                    hello@breakwatervilla.com
                  </p>
                </div>

                <FiArrowUpRight
                  size={17}
                  className="ml-auto shrink-0 text-slate-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-midnight"
                />
              </a>

              {/* Phone */}
              <a
                href="tel:+12425555555"
                className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_6px_25px_rgba(11,42,58,0.04)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(11,42,58,0.08)] sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist/60 text-ocean transition-colors duration-300 group-hover:bg-champagne">
                  <FiPhone size={17} strokeWidth={1.5} />
                </span>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-muted">
                    Give Us A Call
                  </p>

                  <p className="mt-1 text-sm font-medium text-midnight sm:text-[15px]">
                    +1 (242) 555-5555
                  </p>
                </div>

                <FiArrowUpRight
                  size={17}
                  className="ml-auto shrink-0 text-slate-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-midnight"
                />
              </a>
            </div>

            {/* Response Note */}
            <div className="mt-7 flex items-start gap-3 sm:mt-8">
              <FiMessageCircle
                size={17}
                strokeWidth={1.4}
                className="mt-0.5 shrink-0 text-ocean"
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
          <div className="rounded-3xl bg-white p-5 shadow-[0_12px_45px_rgba(11,42,58,0.06)] sm:p-7 md:p-9 lg:p-10 xl:p-12">
            {/* Form Header */}
            <div className="mb-7 sm:mb-8">
              <h3 className="font-display text-2xl font-medium text-midnight sm:text-3xl">
                Send us a message
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-muted">
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
                      className="h-13 w-full appearance-none rounded-xl bg-ivory px-4 pr-10 text-sm text-midnight outline-none ring-1 ring-transparent transition-all duration-300 placeholder:text-slate-muted hover:bg-mist/30 focus:bg-white focus:ring-midnight/15 sm:h-14"
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
                  rows={6}
                  placeholder="Tell us a little about what you need..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-xl bg-ivory px-4 py-3.5 text-sm leading-6 text-midnight outline-none ring-1 ring-transparent transition-all duration-300 placeholder:text-slate-muted hover:bg-mist/30 focus:bg-white focus:ring-midnight/15 sm:text-base"
                />
              </div>

              {/* Bottom */}
              <div className="mt-6 flex flex-col gap-5 sm:mt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-[10px] leading-4.5 text-slate-muted">
                  Your information is only used to respond to your message.
                </p>

                <button
                  type="submit"
                  className="group flex h-14 w-full shrink-0 items-center justify-between rounded-full bg-midnight pl-6 pr-2 text-sm font-medium text-white transition-all duration-500 hover:bg-ocean active:scale-[0.98] sm:h-15 sm:w-auto sm:min-w-[190px]"
                >
                  <span>Send Message</span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne text-midnight transition-all duration-500 group-hover:bg-ocean">
                    <FiArrowUpRight
                      size={19}
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
        className="h-13 w-full rounded-xl bg-ivory px-4 text-sm text-midnight outline-none ring-1 ring-transparent transition-all duration-300 placeholder:text-slate-muted hover:bg-mist/30 focus:bg-white focus:ring-midnight/15 sm:h-14 sm:text-base"
      />
    </div>
  );
}
