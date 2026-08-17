"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { submitContactForm } from "@/actionCreator/home.actionCreator";

export interface SpeakerItem {
  id: number;
  name: string;
  designation?: string;
  photo?: string;
  pivot?: {
    event_id?: number;
    speaker_id?: number;
    designation?: string;
    priority?: number;
  };
}

export interface PartnerItem {
  id: number;
  title: string;
  image: string;
  url?: string;
  pivot?: {
    event_id?: number;
    partner_id?: number;
    title?: string;
    priority?: number;
  };
}

export interface MediaCenterItem {
  id: number;
  title: string;
  slug?: string;
  publish_date?: string;
  image?: string;
}

export interface TestimonialItem {
  id: number;
  title: string;
  thumb?: string;
  url?: string;
  type?: string;
  url_type?: string;
  status?: number;
}

export interface SubtypeEventItem {
  id: number;
  title: string;
  sub_title?: string | null;
  event_date?: string;
  event_location?: string;
  venue?: string;
  event_type?: string[];
  short_description?: string | null;
  contact_details?: string | null;
  event_image?: string | null;
  meta_title?: string;
  slug?: string;
}

export interface EventSubtypeData {
  id?: number;
  name?: string;
  slug?: string;
  banner_detail?: string;
  description?: string;
  sub_type?: string;
  type?: string;
  image?: string | null;
  status?: number;
  meta_title?: string;
  meta_keywords?: string | null;
  meta_description?: string | null;
  meta_tags?: string | null;
  testimonials?: TestimonialItem[];
  events?: SubtypeEventItem[];
  speakers?: SpeakerItem[];
  partners?: PartnerItem[];
  media_centers?: MediaCenterItem[];
}

// Helper to extract YouTube embed URL from various YouTube link formats
function getYouTubeEmbedUrl(url?: string): string {
  if (!url) return "https://www.youtube.com/embed/ksT2f4NwjsA";

  try {
    if (url.includes("/embed/")) return url;

    // e.g. https://www.youtube.com/live/ksT2f4NwjsA?si=...
    if (url.includes("/live/")) {
      const parts = url.split("/live/");
      const id = parts[1]?.split("?")[0];
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }

    // e.g. https://www.youtube.com/watch?v=ksT2f4NwjsA
    if (url.includes("watch?v=")) {
      const parts = url.split("watch?v=");
      const id = parts[1]?.split("&")[0];
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }

    // e.g. https://youtu.be/ksT2f4NwjsA
    if (url.includes("youtu.be/")) {
      const parts = url.split("youtu.be/");
      const id = parts[1]?.split("?")[0];
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }

    return url;
  } catch (e) {
    return url;
  }
}

export default function EventSubTypeDetails({
  data,
  slug,
  type,
}: {
  data?: EventSubtypeData | null;
  slug?: string;
  type?: string;
}) {
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // Pagination states
  const [eventsPageIndex, setEventsPageIndex] = useState(0);
  const [galleryPageIndex, setGalleryPageIndex] = useState(0);
  const [testimonialsPageIndex, setTestimonialsPageIndex] = useState(0);

  const ITEMS_PER_PAGE = 3;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await submitContactForm({
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.mobile,
        message: formData.message,
        location: slug || data?.name || "Event",
      });

      toast.success("Thank you! Your inquiry has been sent successfully.");
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (err) {
      toast.success("Thank you! Your inquiry has been submitted.");
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageTitle = data?.name || "Global Advanced Management Programme";
  const rawType = data?.type || type || "international-event";
  const displayCategoryLabel = rawType
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const eventTypeRouteParam = type || (rawType.endsWith("-event") ? rawType : `${rawType}-event`);

  const speakersList = data?.speakers || [];
  const partnersList = data?.partners || [];
  const eventsList = data?.events || [];
  const galleryList = data?.media_centers || [];
  const testimonialsList = data?.testimonials || [];

  // Paginated slices
  const totalEventsPages = Math.ceil(eventsList.length / ITEMS_PER_PAGE) || 1;
  const currentEvents = eventsList.slice(
    eventsPageIndex * ITEMS_PER_PAGE,
    (eventsPageIndex + 1) * ITEMS_PER_PAGE
  );

  const totalGalleryPages = Math.ceil(galleryList.length / ITEMS_PER_PAGE) || 1;
  const currentGallery = galleryList.slice(
    galleryPageIndex * ITEMS_PER_PAGE,
    (galleryPageIndex + 1) * ITEMS_PER_PAGE
  );

  const totalTestimonialsPages =
    Math.ceil(testimonialsList.length / ITEMS_PER_PAGE) || 1;
  const currentTestimonials = testimonialsList.slice(
    testimonialsPageIndex * ITEMS_PER_PAGE,
    (testimonialsPageIndex + 1) * ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-gray-100 font-primary">
      {/* ================= HERO BANNER SECTION ================= */}
      <section className="relative min-h-[650px] overflow-hidden bg-[#063568] md:h-[650px]">
        {/* Background Image */}
        <img
          src="/EventsIMG2/EventHeroimg.png"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Event Hero"
        />

        {/* Dark Blue Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,36,78,0.62),rgba(0,36,78,0.62))]" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl flex-col items-center justify-center px-4 pb-24 pt-20 text-center sm:px-6 md:h-full md:min-h-0 md:px-8 md:pb-20 md:pt-0">
          {/* Small Label */}
          <div
            className="wow animate__animated animate__fadeInDown mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4b719] sm:gap-3 sm:text-sm"
            data-wow-duration="0.8s"
            data-wow-delay="0.1s"
          >
            <span className="h-[1px] w-3 bg-[#f4b719] sm:w-4" />
            {displayCategoryLabel.includes("Event")
              ? displayCategoryLabel
              : `${displayCategoryLabel} Events`}
            <span className="h-[1px] w-3 bg-[#f4b719] sm:w-4" />
          </div>

          {/* Heading */}
          <h1
            className="wow animate__animated animate__fadeInUp font-heading text-[34px] font-semibold leading-[1.12] text-white sm:text-[44px] md:text-[64px]"
            data-wow-duration="1s"
            data-wow-delay="0.25s"
          >
            {pageTitle.includes("Management") ? (
              <>
                Global Advanced
                <br />
                <span className="text-[#f5b719]"> Management Programme </span>
              </>
            ) : (
              <>
                {pageTitle.split(" ").slice(0, 2).join(" ")}
                <br />
                <span className="text-[#f5b719]">
                  {" "}
                  {pageTitle.split(" ").slice(2).join(" ") || "CONFERENCE"}{" "}
                </span>
              </>
            )}
          </h1>

          {/* Description */}
          <p
            className="wow animate__animated animate__fadeInUp mt-4 max-w-[760px] px-1 text-[14px] leading-6 text-white/80 sm:mt-5 sm:px-4 sm:text-[16px] sm:leading-7 md:text-[17px]"
            data-wow-duration="1s"
            data-wow-delay="0.45s"
          >
            Connecting Indian management with global ecosystems. Join
            world-class think tanks, leading policymakers, and visionary
            academics shaping the future of global commerce.
          </p>

          {/* Buttons */}
          <div
            className="wow animate__animated animate__fadeInUp mt-6 flex w-full flex-col items-center justify-center gap-3 px-2 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-4 sm:px-0"
            data-wow-duration="1s"
            data-wow-delay="0.65s"
          >
            {/* Download Brochure */}
            <a
              href="#inquiry"
              className="flex w-full max-w-[320px] items-center justify-center gap-2 rounded-md bg-[#f5b719] px-6 py-3.5 text-sm font-semibold text-[#111] transition hover:bg-[#ffc72c] sm:min-w-[220px] sm:w-auto sm:px-7 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                />
              </svg>
              Download Brochure
            </a>

            {/* View All Events */}
            <Link
              href="/events/event-listing?type=international"
              className="flex w-full max-w-[320px] items-center justify-center rounded-md border border-white/80 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#003568] sm:min-w-[220px] sm:w-auto sm:px-7"
            >
              View All Events
            </Link>
          </div>

          {/* Registration */}
          <a
            href="#inquiry"
            className="wow animate__animated animate__fadeInUp mt-4 flex w-full max-w-[320px] items-center justify-center gap-3 rounded-md border border-white/80 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#003568] sm:mt-6 sm:w-auto sm:max-w-none sm:px-10 cursor-pointer"
            data-wow-duration="1s"
            data-wow-delay="0.85s"
          >
            Online Registration
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </a>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-[-1px] left-0 z-20 w-full pointer-events-none">
          <svg
            className="block h-[55px] w-full sm:h-[75px] md:h-[105px]"
            viewBox="0 0 1440 105"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0 C260 55, 430 78, 720 85 C1010 78, 1180 55, 1440 0 L1440 105 L0 105 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ================= ABOUT US + INQUIRY SECTION ================= */}
      <section id="inquiry" className="relative overflow-hidden bg-white py-20">
        {/* Decorative Dots */}
        <div
          className="pointer-events-none absolute right-[3rem] top-0 hidden h-[250px] w-[300px] opacity-50 lg:block"
          style={{
            backgroundImage:
              "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
            backgroundSize: "13px 13px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_435px] lg:gap-16">
            {/* LEFT COLUMN: About Content from API description */}
            <div
              className="wow animate__animated animate__fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay="0.1s"
            >
              {data?.description ? (
                <div
                  className="space-y-6 text-[18px] leading-[1.6] text-[#5f6e8a] md:text-[19px] 
                    [&>h2]:font-heading [&>h2]:text-[42px] [&>h2]:font-semibold [&>h2]:leading-[1.1] [&>h2]:text-black [&>h2]:md:text-[52px] [&>h2]:lg:text-[58px] [&>h2]:mb-6
                    [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-4
                    [&>p]:mb-5 [&>p:last-child]:mb-0
                    [&_strong]:font-semibold [&_strong]:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              ) : (
                <>
                  <h2 className="font-heading text-[42px] font-semibold leading-[1.1] text-black md:text-[52px] lg:text-[58px]">
                    About
                    <span className="mx-2">—</span>
                    <span className="text-[#e9a91a]">
                      {data?.sub_type === "global-advanced-management-programme"
                        ? "GAMP"
                        : pageTitle}
                    </span>
                  </h2>

                  <div className="mt-7 max-w-[900px] space-y-8 text-[18px] leading-[1.5] tracking-[0.01em] text-[#5f6e8a] md:text-[20px]">
                    <p>
                      AIMA has been organising its unique Global Advanced
                      Management Programme since 2010 with the aim to give
                      exposure to Innovations happening in the hotspots across
                      the world.
                    </p>
                    <p>
                      So far 23 editions have been held across the Silicon
                      Valley, USA, Beijing and Shanghai in China, Israel, and
                      Europe.
                    </p>
                    <p>
                      GAMP is designed to help business leaders get insights into
                      the emerging trends/business models and will focus on open
                      innovation strategies that will help deal with the current
                      VUCA environment also prepare for future scenarios.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT COLUMN: Inquiry Form */}
            <div
              className="wow animate__animated animate__fadeInRight lg:sticky lg:top-8"
              data-wow-duration="1s"
              data-wow-delay="0.25s"
            >
              <div className="rounded-[24px] border border-[#d9e0e8] bg-white p-7 shadow-[0_5px_12px_rgba(0,0,0,0.18)] md:p-8">
                <h3 className="font-heading text-[30px] font-semibold leading-tight text-black md:text-[32px]">
                  Inquiry
                </h3>

                <form onSubmit={handleFormSubmit} className="mt-7 space-y-5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name *"
                    required
                    className="h-[60px] w-full rounded-[13px] border border-[#dedede] bg-white px-4 text-[16px] text-[#333] outline-none transition placeholder:text-[#a7a7a7] focus:border-[#15569a] focus:ring-1 focus:ring-[#15569a]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address *"
                    required
                    className="h-[60px] w-full rounded-[13px] border border-[#dedede] bg-white px-4 text-[16px] text-[#333] outline-none transition placeholder:text-[#a7a7a7] focus:border-[#15569a] focus:ring-1 focus:ring-[#15569a]"
                  />

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile Number *"
                    required
                    className="h-[60px] w-full rounded-[13px] border border-[#dedede] bg-white px-4 text-[16px] text-[#333] outline-none transition placeholder:text-[#a7a7a7] focus:border-[#15569a] focus:ring-1 focus:ring-[#15569a]"
                  />

                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message"
                    className="min-h-[160px] w-full resize-none rounded-[13px] border border-[#dedede] bg-white px-4 py-4 text-[16px] text-[#333] outline-none transition placeholder:text-[#a7a7a7] focus:border-[#15569a] focus:ring-1 focus:ring-[#15569a]"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-[#15569a] px-7 py-3.5 text-[18px] font-medium text-white transition duration-300 hover:bg-[#0e467f] disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPEAKERS SECTION ================= */}
      {speakersList.length > 0 && (
        <section className="relative overflow-hidden bg-[linear-gradient(181.25deg,#06192F_8.84%,#0A305D_57.26%,#062A55_99.27%)] py-20">
          <div className="relative z-10 mx-auto max-w-7xl px-4">
            <div
              className="wow animate__animated animate__fadeInDown mb-10 text-center md:mb-14"
              data-wow-duration="1s"
              data-wow-delay="0.1s"
            >
              <h2 className="font-heading text-[44px] font-semibold leading-none text-[#f5b719] sm:text-[52px] md:text-[60px] lg:text-[68px]">
                Speaker&apos;s
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-4 xl:grid-cols-5">
              {speakersList.map((speaker, index) => {
                const designation =
                  speaker.designation ||
                  speaker.pivot?.designation ||
                  "Distinguished Speaker";

                return (
                  <div
                    key={speaker.id || index}
                    className="wow animate__animated animate__fadeInUp group"
                    data-wow-duration="0.8s"
                    data-wow-delay={`${(index % 5) * 0.1 + 0.1}s`}
                  >
                    <div className="relative aspect-[0.78] overflow-hidden rounded-[15px] bg-[#0c2f57] shadow-lg transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] border border-white/10">
                      {speaker.photo ? (
                        <img
                          src={speaker.photo}
                          alt={speaker.name}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center text-white/50 text-4xl font-bold font-heading">
                          {speaker.name ? speaker.name.charAt(0) : "S"}
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-all duration-500 group-hover:h-[75%]" />

                      <div className="absolute inset-x-0 bottom-0 z-10 translate-y-2 p-5 transition-all duration-500 group-hover:translate-y-0 text-left">
                        <h3 className="text-[17px] font-bold leading-tight text-white line-clamp-1">
                          {speaker.name}
                        </h3>
                        {designation && (
                          <p className="mt-1 text-[13px] text-white/80 line-clamp-2">
                            {designation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= PARTNERS & SPONSORS SECTION ================= */}
      {partnersList.length > 0 && (
        <section className="relative overflow-hidden bg-white py-20">
          <div className="absolute left-0 top-0 h-[12px] w-full bg-[#062a55]" />

          <div className="relative z-10 mx-auto max-w-7xl px-4">
            <div className="relative overflow-hidden rounded-[28px] border border-[#dfe5ec] bg-[#f5f7fa] px-5 py-12 shadow-[0_8px_20px_rgba(0,0,0,0.1)] sm:px-8 md:px-12 lg:px-14 lg:py-14">
              <div className="relative z-10">
                <div
                  className="wow animate__animated animate__fadeInDown mb-10 text-center md:mb-12"
                  data-wow-duration="1s"
                  data-wow-delay="0.1s"
                >
                  <h2 className="font-heading text-[42px] font-semibold leading-none text-black sm:text-[50px] md:text-[60px] lg:text-[68px]">
                    Partner&apos;s &amp;
                    <span className="text-[#e9a914]"> Sponsors</span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:gap-7 lg:grid-cols-4 xl:grid-cols-7">
                  {partnersList.map((partner, index) => (
                    <div
                      key={partner.id || index}
                      className="wow animate__animated animate__fadeInUp group"
                      data-wow-duration="0.8s"
                      data-wow-delay={`${(index % 7) * 0.1 + 0.1}s`}
                    >
                      <a
                        href={partner.url || "#"}
                        target={partner.url ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="flex h-[130px] items-center justify-center rounded-[14px] border-2 border-transparent bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out group-hover:-translate-y-1 group-hover:border-[#0057b8] group-hover:shadow-[0_10px_25px_rgba(0,87,184,0.18)]"
                      >
                        <img
                          src={partner.image}
                          alt={partner.title}
                          className="max-h-[85px] max-w-full object-contain grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
                          loading="lazy"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= PREVIOUS EVENTS LISTING SECTION ================= */}
      {eventsList.length > 0 && (
        <section className="bg-[#e8ecf1] relative py-20">
          <div className="max-w-7xl mx-auto px-4 relative z-1">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-center text-[#1a202c] mb-14 wow animate__animated animate__fadeInDown"
              data-wow-duration="1s"
            >
              Previous <span className="text-[#E3AB26]">Events</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {currentEvents.map((event, index) => {
                const formattedDate = event.event_date
                  ? new Date(event.event_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Date TBA";

                const locationText =
                  event.event_location || event.venue || "Location TBA";

                return (
                  <div
                    key={event.id || index}
                    className="bg-white rounded-xl border-b-4 border-[#E3AB26] overflow-hidden wow animate__animated animate__fadeInUp transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
                    data-wow-duration="1s"
                    data-wow-delay={`${(index + 1) * 0.1}s`}
                  >
                    <div className="w-full h-64 overflow-hidden">
                      <img
                        src={
                          event.event_image ||
                          "/EventsIMG2/InternationalE1.png"
                        }
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="px-6 pt-4 pb-7 flex flex-col flex-grow justify-between text-left">
                      <div>
                        {/* Meta Data */}
                        <div className="flex flex-wrap items-center justify-between text-sm text-[#1a202c] mb-4 gap-3">
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <g fill="#0f3d7a">
                                <path d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />
                                <path
                                  fillRule="evenodd"
                                  d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827q.39.03.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238q.35-.046.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71q-.034.255-.058.539h18.336q-.024-.284-.058-.54c-.135-1.005-.389-1.585-.812-2.008s-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008s-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812s-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z"
                                  clipRule="evenodd"
                                />
                              </g>
                            </svg>
                            <span className="text-xs text-gray-500">
                              {formattedDate}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path
                                fill="#0f3d7a"
                                d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4m0-6c1.103 0 2 .897 2 2s-.897 2-2 2s-2-.897-2-2s.897-2 2-2"
                              />
                              <path
                                fill="#0f3d7a"
                                d="M11.42 21.814a1 1 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819M12 4c3.309 0 6 2.691 6 6.005c.021 4.438-4.388 8.423-6 9.73c-1.611-1.308-6.021-5.294-6-9.735c0-3.309 2.691-6 6-6"
                              />
                            </svg>
                            <span className="text-xs text-gray-500 line-clamp-1">
                              {locationText}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-[#0f3d7a] mb-3 leading-snug">
                          {event.title}
                        </h3>

                        {/* Description */}
                        {event.short_description ? (
                          <div
                            className="text-gray-600 text-[15px] leading-relaxed mb-6 font-normal line-clamp-3"
                            dangerouslySetInnerHTML={{
                              __html: event.short_description,
                            }}
                          />
                        ) : (
                          <p className="text-gray-600 text-[15px] leading-relaxed mb-6 font-normal">
                            Explore key takeaways, sessions, and thought
                            leadership from this edition.
                          </p>
                        )}
                      </div>

                      {/* View More */}
                      <div>
                        <Link
                          href={`/events/international-event/${event.slug || "event-detail"}`}
                          className="inline-flex items-center text-[#0f3d7a] font-bold text-sm hover:opacity-80 transition-opacity group"
                        >
                          <span>View More</span>
                          <span className="ml-2 bg-[#0f3d7a] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] group-hover:translate-x-1 transition-transform">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 1024 1024"
                            >
                              <path d="M0 0h1024v1024H0z" fill="none" />
                              <path
                                fill="currentColor"
                                d="M754.8 480H160a32 32 0 1 0 0 64h594.8L521.3 777.3a32 32 0 0 0 45.4 45.4l288-288a32 32 0 0 0 0-45.4l-288-288a32 32 0 1 0-45.4 45.4z"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Indicators */}
            {totalEventsPages > 1 && (
              <div
                className="flex justify-center items-center gap-3 wow animate__animated animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="0.6s"
              >
                {Array.from({ length: totalEventsPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setEventsPageIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`w-3.5 h-3.5 rounded-full transition-colors cursor-pointer ${
                      eventsPageIndex === idx
                        ? "bg-[#0f3d7a]"
                        : "border-2 border-[#0f3d7a] bg-transparent hover:bg-[#0f3d7a]/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= GALLERY SECTION ================= */}
      {galleryList.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-center text-black mb-12 wow animate__animated animate__fadeInDown"
              data-wow-duration="1s"
            >
              Gallery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
              {currentGallery.map((item, index) => {
                const displayDate = item.publish_date
                  ? new Date(item.publish_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "";

                return (
                  <div
                    key={item.id || index}
                    className="bg-white border border-gray-200 rounded-[16px] overflow-hidden wow animate__animated animate__fadeInUp shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between"
                    data-wow-duration="1s"
                    data-wow-delay={`${(index + 1) * 0.1}s`}
                  >
                    <div className="w-full h-56 overflow-hidden">
                      <img
                        src={item.image || "/EventsIMG2/EventBanner.png"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6">
                      {displayDate && (
                        <p className="text-xs text-gray-400 mb-2 font-medium">
                          {displayDate}
                        </p>
                      )}

                      <h3 className="text-xl font-bold text-[#0f3d7a] mb-5 line-clamp-2">
                        {item.title}
                      </h3>

                      <Link
                        href={`/media-center/${item.slug || "photo-gallery"}`}
                        className="inline-flex items-center text-[#0f3d7a] font-bold text-sm hover:opacity-80 transition-opacity"
                      >
                        <span>View Gallery</span>
                        <span className="ml-2 bg-[#0f3d7a] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 1024 1024"
                          >
                            <path d="M0 0h1024v1024H0z" fill="none" />
                            <path
                              fill="currentColor"
                              d="M754.8 480H160a32 32 0 1 0 0 64h594.8L521.3 777.3a32 32 0 0 0 45.4 45.4l288-288a32 32 0 0 0 0-45.4l-288-288a32 32 0 1 0-45.4 45.4z"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gallery Pagination Indicators */}
            {totalGalleryPages > 1 && (
              <div
                className="flex justify-center items-center gap-3 wow animate__animated animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="0.6s"
              >
                {Array.from({ length: totalGalleryPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setGalleryPageIndex(idx)}
                    aria-label={`Gallery Page ${idx + 1}`}
                    className={`w-3.5 h-3.5 rounded-full transition-colors cursor-pointer ${
                      galleryPageIndex === idx
                        ? "bg-[#0f3d7a]"
                        : "border-2 border-[#0f3d7a] bg-transparent hover:bg-[#0f3d7a]/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= TESTIMONIALS SECTION ================= */}
      {testimonialsList.length > 0 && (
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-center text-black mb-12 wow animate__animated animate__fadeInDown"
              data-wow-duration="1s"
            >
              Testimonials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
              {currentTestimonials.map((item, index) => {
                const videoUrl = item.url || "";

                return (
                  <div
                    key={item.id || index}
                    className="relative group rounded-3xl overflow-hidden wow animate__animated animate__fadeInUp transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                    data-wow-duration="1s"
                    data-wow-delay={`${(index + 1) * 0.15}s`}
                    onClick={() => {
                      if (videoUrl) {
                        setActiveVideoModal(getYouTubeEmbedUrl(videoUrl));
                      }
                    }}
                  >
                    <img
                      src={
                        item.thumb ||
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
                      }
                      alt={item.title || `Testimonial ${index + 1}`}
                      className="w-full h-64 md:h-72 object-cover"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-all duration-300">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2em"
                          height="2em"
                          viewBox="0 0 24 24"
                          className="ml-1"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="#0f3d7a"
                            d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Testimonials Pagination Indicators */}
            {totalTestimonialsPages > 1 && (
              <div
                className="flex justify-center items-center gap-3 wow animate__animated animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="0.6s"
              >
                {Array.from({ length: totalTestimonialsPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTestimonialsPageIndex(idx)}
                    aria-label={`Testimonials Page ${idx + 1}`}
                    className={`w-3.5 h-3.5 rounded-full transition-colors cursor-pointer ${
                      testimonialsPageIndex === idx
                        ? "bg-[#0f3d7a]"
                        : "border-2 border-[#0f3d7a] bg-transparent hover:bg-[#0f3d7a]/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= VIDEO MODAL ================= */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-black/95 flex items-center justify-center text-lg transition"
            >
              ✕
            </button>
            <iframe
              src={activeVideoModal}
              title="Testimonial Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}
