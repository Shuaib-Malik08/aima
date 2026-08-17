"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import fallBackImg from "../../public/EventsIMG/not-found.jpg";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface EventType {
  code: string;
  name: string;
}

interface FilterMonth {
  code: number;
  name: string;
}

interface EventListProps {
  events: any[];
  eventTypes: EventType[];
  locations: string[];
  years: number[];
  months: FilterMonth[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  } | null;
  currentFilters: {
    month?: string;
    year?: string;
    location?: string;
    type?: string;
    tab?: string;
    page?: string;
  };
}

const getPageNumbers = (currentPage: number, lastPage: number) => {
  const delta = 2;
  const range = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= lastPage; i++) {
    if (
      i === 1 ||
      i === lastPage ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l !== undefined) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

const EventList = ({
  events,
  eventTypes,
  locations,
  years,
  months,
  meta,
  currentFilters,
}: EventListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    // Reset page parameter when filters change, but not when changing the page itself
    if (name !== "page") {
      params.delete("page");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleTabToggle = () => {
    const params = new URLSearchParams(searchParams.toString());
    const currentTab = currentFilters.tab || "upcoming";
    const nextTab = currentTab === "upcoming" ? "past" : "upcoming";
    params.set("tab", nextTab);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentTab = currentFilters.tab || "upcoming";
  const buttonText =
    currentTab === "upcoming"
      ? "Explore Past Events"
      : "Explore Upcoming Events";
  const headingText =
    currentTab === "upcoming" ? "Upcoming Events" : "Past Events";

  return (
    <>
      <section className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 font-primary">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-2">
            <Link className="hover:text-blue-900 transition" href="/">
              Home
            </Link>
            <span>/</span>
            <Link className="hover:text-blue-900 transition" href="/events">
              Events
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold truncate max-w-[250px] capitalize">
              {currentFilters.type
                ? `${currentFilters.type.replace(/-/g, " ")} Events`
                : "All Events"}
            </span>
          </nav>

          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8 p-5 lg:p-10">
            <div className="heading-wrapper flex flex-col sm:flex-row items-start gap-5 sm:items-center justify-start sm:justify-between">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {headingText}
              </h1>
              <button
                type="button"
                onClick={handleTabToggle}
                className="bg-[#0D4A8C] text-white px-10 py-3 rounded-md text-lg font-semibold hover:bg-[#08396d] transition cursor-pointer"
              >
                {buttonText}
              </button>
            </div>
            <div className="from-wrapper mt-10">
              <form onSubmit={(e) => e.preventDefault()} className="block">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {/* Month Filter */}
                  <div className="item-wrapper">
                    <select
                      name="month"
                      value={currentFilters.month || ""}
                      onChange={(e) =>
                        handleFilterChange("month", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white text-gray-500"
                    >
                      <option value="">Select Month</option>
                      {months.map((m) => (
                        <option key={m.code} value={m.code}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div className="item-wrapper">
                    <select
                      name="year"
                      value={currentFilters.year || ""}
                      onChange={(e) =>
                        handleFilterChange("year", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white text-gray-500"
                    >
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div className="item-wrapper">
                    <select
                      name="location"
                      value={currentFilters.location || ""}
                      onChange={(e) =>
                        handleFilterChange("location", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white text-gray-500"
                    >
                      <option value="">Select Location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Event Type Filter */}
                  <div className="item-wrapper">
                    <select
                      name="type"
                      value={currentFilters.type || ""}
                      onChange={(e) =>
                        handleFilterChange("type", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white text-gray-500"
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map((t) => (
                        <option key={t.code} value={t.code}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reset Actions */}
                  <div className="item-wrapper flex flex-nowrap gap-3 lg:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (currentFilters.tab) {
                          params.set("tab", currentFilters.tab);
                        }
                        router.push(`${pathname}?${params.toString()}`);
                      }}
                      className="bg-[#D8A12A] text-white px-6 py-3 rounded-md w-full text-sm font-semibold hover:bg-[#b0811e] transition cursor-pointer text-center flex items-center justify-center"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm w-full">
                <h3 className="text-lg md:text-2xl font-medium text-black">
                  No {currentTab} events found!!
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Try clearing your filters or choosing different options.
                </p>
              </div>
            ) : (
              events.map((event: any) => {
                const formattedDate = event.event_date
                  ? new Date(event.event_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "";
                const displayLocation =
                  event.event_location || event.venue || "Location TBD";
                const isInt = event.event_type?.some(
                  (t: string) => t.toLowerCase() === "international",
                );
                const categoryPath = isInt
                  ? "international-event"
                  : "national-event";
                const cardHref = `/events/${categoryPath}/${event.slug}`;
                return (
                  <Link
                    key={event.id}
                    className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 transform transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-4 relative"
                    href={cardHref}
                  >
                    <div className="absolute inset-0 rounded-2xl pointer-events-none border-b-4 border-r-4 border-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <Image
                      alt={event.title}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                      width={409}
                      height={250}
                      src={event.event_image || fallBackImg}
                    />
                    <div className="p-6 relative">
                      {formattedDate && (
                        <span className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700 group-hover:bg-[#114F97] group-hover:text-white transition-all duration-500">
                          {formattedDate}
                        </span>
                      )}
                      <h3 className="text-gray-900 font-medium text-xl mt-4 transition-colors duration-500 line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-3 transition-colors duration-500">
                        <div className="rounded-full bg-gray-100 p-1 group-hover:bg-[#0D478B] transition-colors duration-500">
                          <svg
                            className="w-4 h-4 text-[#0D478B] group-hover:text-white transition-colors duration-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <circle cx="12" cy="11" r="3"></circle>
                          </svg>
                        </div>
                        <span className="text-sm">{displayLocation}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Dynamic Pagination Controls */}
        {meta && meta.last_page > 1 && (
          <div className="max-w-7xl mx-auto mt-10">
            <div className="flex items-center flex-wrap justify-start gap-2">
              {/* Previous Button */}
              {meta.current_page > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange(
                      "page",
                      (meta.current_page - 1).toString(),
                    )
                  }
                  className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-[#114F97] hover:text-white hover:border-[#114F97] transition-all duration-300 font-semibold text-sm cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Previous</span>
                </button>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers(meta.current_page, meta.last_page).map((p, index) => {
                  if (p === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="px-3 py-2 text-gray-400 font-medium select-none"
                      >
                        ...
                      </span>
                    );
                  }
                  const isActive = p === meta.current_page;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleFilterChange("page", p.toString())}
                      className={`px-4 py-2.5 rounded-lg transition-all duration-300 font-semibold text-sm cursor-pointer ${
                        isActive
                          ? "bg-[#114F97] text-white"
                          : "border border-gray-200 bg-white text-gray-600 hover:bg-[#114F97] hover:text-white hover:border-[#114F97]"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              {meta.current_page < meta.last_page && (
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange(
                      "page",
                      (meta.current_page + 1).toString(),
                    )
                  }
                  className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-[#114F97] hover:text-white hover:border-[#114F97] transition-all duration-300 font-semibold text-sm cursor-pointer"
                >
                  <span>Next</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default EventList;
