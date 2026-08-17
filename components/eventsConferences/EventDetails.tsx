"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Download, Award, Landmark, User } from "lucide-react";
import Link from "next/link";

interface CTAItem {
  cta_title: string;
  cta_link: string;
  cta_priority: string;
  cta_type: string;
}

interface EventTab {
  id: number;
  event_id: number;
  title: string;
  description: string;
}

interface EventData {
  id: number;
  title: string;
  sub_title: string | null;
  event_date: string;
  status: string;
  is_home: boolean;
  event_location: string | null;
  venue: string | null;
  event_type: string[];
  short_description: string;
  contact_details: string;
  event_image: string | null;
  cta: CTAItem[] | null;
  sponsors: any;
  meta_title: string;
  slug: string;
  meta_description: string;
  meta_tags: string;
  meta_keywords: string | null;
  speakers?: any[];
  media_centers?: any[];
  management_tv_videos?: any[];
  event_tabs?: EventTab[];
}

export default function EventDetails({ eventData }: { eventData: EventData }) {
  const tabs = eventData.event_tabs || [];
  const [activeTabId, setActiveTabId] = useState<number | null>(
    tabs.length > 0 ? tabs[0].id : null
  );

  const activeTab = tabs.find((t) => t.id === activeTabId);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isMounted = true;
    const initWow = async () => {
      try {
        const wowModule = await import("wowjs");
        if (!isMounted) return;
        const WOW = wowModule.WOW || (wowModule as any).default?.WOW;
        if (WOW) {
          const wow = new WOW({
            boxClass: "wow",
            animateClass: "animate__animated",
            offset: 30,
            mobile: true,
            live: true,
          });
          wow.init();
        }
      } catch (e) {
        // ignore
      }
    };

    const timer = setTimeout(() => {
      void initWow();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [eventData, activeTabId]);


  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const isNational = eventData.event_type?.some((t) => t.toLowerCase() === "national");
  const isInternational = eventData.event_type?.some((t) => t.toLowerCase() === "international");
  const isAwards = eventData.event_type?.some((t) => t.toLowerCase() === "awards");
  const isWorkshop = eventData.event_type?.some(
    (t) => t.toLowerCase() === "workshop-training" || t.toLowerCase() === "workshop & trainings"
  );

  let categoryLabel = "";
  let categoryUrl = "";

  if (isInternational) {
    categoryLabel = "International Events";
    categoryUrl = "/events#International-Events";
  } else if (isNational) {
    categoryLabel = "National Events";
    categoryUrl = "/events#nationalevents";
  } else if (isAwards) {
    categoryLabel = "Awards";
    categoryUrl = "/events#AIMA-awards";
  } else if (isWorkshop) {
    categoryLabel = "Workshops & Trainings";
    categoryUrl = "/professional-development";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-primary">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[#0C478B] transition duration-200">
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <Link href="/events" className="hover:text-[#0C478B] transition duration-200">Events</Link>
        {categoryLabel && (
          <>
            <span className="text-gray-400">/</span>
            <Link href={categoryUrl} className="hover:text-[#0C478B] transition duration-200">
              {categoryLabel}
            </Link>
          </>
        )}
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-md">
          {eventData.title}
        </span>
      </nav>

      {/* Hero Header Banner */}
      <div className="wow animate__animated animate__fadeInDown relative bg-gradient-to-br from-[#0B2545] via-[#0C478B] to-[#134074] rounded-3xl overflow-hidden shadow-2xl mb-12 text-white border border-white/10" data-wow-duration="0.9s">
        {/* Abstract design overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,171,37,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E4AB25]/10 rounded-full blur-3xl" />

        <div className="relative p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-5 text-left">
            {/* Tags */}
            {eventData.event_type && eventData.event_type.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {eventData.event_type.map((type) => (
                  <span
                    key={type}
                    className="px-3.5 py-1 text-[11px] font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md text-[#E4AB25] border border-white/15 rounded-full shadow-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              {eventData.title}
            </h1>

            {/* Subtitle */}
            {eventData.sub_title && (
              <p className="text-lg text-white/80 font-light max-w-3xl leading-relaxed">
                {eventData.sub_title}
              </p>
            )}

            {/* Date & Venue Info */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-sm sm:text-base text-white/90">
              {eventData.event_date && (
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-[#E4AB25] shrink-0" />
                  <span className="font-medium">{formatDate(eventData.event_date)}</span>
                </div>
              )}
              {(eventData.venue || eventData.event_location) && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-[#E4AB25] shrink-0" />
                  <span className="font-medium">
                    {[eventData.venue, eventData.event_location].filter(Boolean).join(" - ")}
                  </span>
                </div>
              )}
            </div>

            {/* Main Action Buttons */}
            {eventData.cta && eventData.cta.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {eventData.cta.map((ctaItem, idx) => (
                  <a
                    key={idx}
                    href={ctaItem.cta_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm shadow-md hover:-translate-y-0.5 ${idx === 0
                      ? "bg-[#E4AB25] hover:bg-[#d0991d] text-gray-900"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/25"
                      }`}
                  >
                    <Download className="w-4.5 h-4.5 shrink-0" />
                    <span>{ctaItem.cta_title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Featured Image */}
          {eventData.event_image && (
            <div className="w-full lg:w-[420px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 relative group">
              <img
                src={eventData.event_image}
                alt={eventData.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
          )}
        </div>
      </div>


      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Side Content - About and Tabs */}
        <div className="wow animate__animated animate__fadeInLeft lg:col-span-8 space-y-12 text-left" data-wow-duration="0.9s" data-wow-delay="0.1s">
          {/* About / Description */}
          {eventData.short_description && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-[#0C478B] after:rounded">
                About the Event
              </h2>
              <div
                className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-[15px] sm:text-[16px]
                  [&>p]:mb-5 [&>p:last-child]:mb-0
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5
                  [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3
                  [&_strong]:font-semibold [&_strong]:text-gray-900"
                dangerouslySetInnerHTML={{ __html: eventData.short_description }}
              />
            </div>
          )}

          {/* Interactive Tabs */}
          {tabs.length > 0 && (
            <div className="space-y-6">
              {/* Tab Navigation List */}
              <div className="border-b border-gray-200">
                <nav className="flex flex-wrap gap-2 -mb-px" aria-label="Tabs">
                  {tabs.map((tab) => {
                    const isActive = tab.id === activeTabId;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`py-3 px-5 text-sm font-semibold rounded-t-xl border-t border-x transition-all duration-200 ${isActive
                          ? "border-gray-200 border-b-transparent bg-white text-[#0C478B]"
                          : "border-transparent bg-gray-50/50 hover:bg-gray-100/50 text-gray-500 hover:text-gray-700 border-b-gray-200"
                          }`}
                      >
                        {tab.title}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content Panel */}
              {activeTab && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm transition-all duration-300 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0C478B]" />
                    <span>{activeTab.title}</span>
                  </h3>
                  <div
                    className="prose prose-blue max-w-none text-gray-700 text-[15px] leading-relaxed
                      [&>p]:mb-4 [&>p:last-child]:mb-0
                      [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4
                      [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4
                      [&_strong]:font-bold [&_strong]:text-gray-900
                      
                      /* Normalizing and Styling Nested TinyMCE Tables to a Premium Design */
                      [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:border [&_table]:border-gray-200 [&_table]:shadow-sm [&_table]:rounded-xl [&_table]:overflow-hidden
                      [&_th]:bg-gray-50 [&_th]:text-gray-800 [&_th]:font-semibold [&_th]:p-3 [&_th]:border [&_th]:border-gray-200 [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-center
                      [&_td]:p-3.5 [&_td]:border [&_td]:border-gray-200 [&_td]:text-gray-600 [&_td]:text-sm [&_td]:align-middle [&_td]:bg-white
                      [&_tr:hover_td]:bg-gray-50/40"
                    dangerouslySetInnerHTML={{ __html: activeTab.description }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side Sidebar - Quick Info, Contact, Speakers */}
        <div className="wow animate__animated animate__fadeInRight lg:col-span-4 space-y-8 text-left" data-wow-duration="0.9s" data-wow-delay="0.2s">
          {/* Quick Stats Widget */}
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#0C478B]" />
              <span>Event Information</span>
            </h3>


            <div className="space-y-4 text-sm border-t border-gray-100 pt-4">
              <div>
                <span className="text-gray-400 block mb-1">Date & Time</span>
                <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <Calendar className="w-4.5 h-4.5 text-gray-500" />
                  {formatDate(eventData.event_date)}
                </span>
              </div>

              <div>
                <span className="text-gray-400 block mb-1">Venue Type</span>
                <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <MapPin className="w-4.5 h-4.5 text-gray-500" />
                  {eventData.venue || "To Be Decided"}
                </span>
              </div>

              {eventData.event_location && (
                <div>
                  <span className="text-gray-400 block mb-1">Location</span>
                  <span className="font-semibold text-gray-800">
                    {eventData.event_location}
                  </span>
                </div>
              )}
            </div>

            {/* CTAs listed in the Sidebar */}
            {eventData.cta && eventData.cta.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                {eventData.cta.map((ctaItem, idx) => (
                  <a
                    key={idx}
                    href={ctaItem.cta_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center transition-all duration-200 flex items-center justify-center gap-2 border bg-white border-gray-200 text-gray-700 hover:text-[#0C478B] hover:border-[#0C478B] hover:shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{ctaItem.cta_title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Contact Details Widget */}
          {eventData.contact_details && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0C478B]" />
                <span>Contact Details</span>
              </h3>

              <div
                className="text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-4
                  [&_p]:mb-3 [&_p:last-child]:mb-0
                  [&_strong]:font-semibold [&_strong]:text-gray-800 [&_strong]:block [&_strong]:text-sm [&_strong]:mt-4 [&_strong:first-child]:mt-0
                  [&_a]:text-[#0C478B] [&_a]:font-semibold [&_a]:hover:underline"
                dangerouslySetInnerHTML={{ __html: eventData.contact_details }}
              />
            </div>
          )}

          {/* Speakers Widget (If present) */}
          {eventData.speakers && eventData.speakers.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Distinguished Speakers
              </h3>
              <div className="divide-y divide-gray-100 border-t border-gray-100">
                {eventData.speakers.map((speaker: any, index: number) => (
                  <div key={index} className="py-3 flex items-center gap-3">
                    {speaker.photo ? (
                      <img
                        src={speaker.photo}
                        alt={speaker.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm">
                        {speaker.name ? speaker.name.charAt(0) : "S"}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {speaker.name}
                      </h4>
                      {speaker.designation && (
                        <p className="text-xs text-gray-500">{speaker.designation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
