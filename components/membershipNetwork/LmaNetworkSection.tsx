"use client";

import React, { useState, useEffect } from "react";

interface OfficeBearer {
  id: number;
  name: string;
  type: string;
  designation?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  tel?: string;
  mobile?: string;
  website?: string;
}

interface LmaItem {
  id: number;
  lma_name: string;
  region: string;
  lma_networks?: OfficeBearer[];
}

interface LmaNetworkSectionProps {
  block?: {
    name?: string;
    sub_module?: string[];
    data?: LmaItem[];
  };
}

export default function LmaNetworkSection({ block }: LmaNetworkSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dataList = block?.data || [];

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredLMAs = dataList.filter((lma) =>
    lma.lma_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredLMAs.length / itemsPerPage);
  const paginatedLMAs = filteredLMAs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getInitials = (name: string) => {
    if (!name) return "";
    const ignoreWords = ["and", "of", "in", "for", "the", "&"];
    return name
      .split(/\s+/)
      .filter((word) => !ignoreWords.includes(word.toLowerCase()))
      .map((word) =>
        word
          .replace(/[^a-zA-Z0-9]/g, "")
          .charAt(0)
          .toUpperCase(),
      )
      .join("");
  };

  const sortBearers = (bearers: OfficeBearer[]) => {
    return [...bearers].sort((a, b) => {
      const rank = (type: string) => {
        const t = type?.toLowerCase() || "";
        if (
          t.includes("president") &&
          !t.includes("vice") &&
          !t.includes("working")
        )
          return 1;
        if (
          t.includes("working president") ||
          t.includes("vice president") ||
          t.includes("ceo")
        )
          return 2;
        if (t.includes("secretary") || t.includes("director")) return 3;
        return 4;
      };
      return rank(a.type) - rank(b.type);
    });
  };

  const getZoneDisplayName = () => {
    const rawName = block?.name || block?.sub_module?.[0] || "";
    if (!rawName) return "Network";
    return (
      rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase() + " Zone"
    );
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
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

  return (
    <div className="w-full font-primary">
      {/* Search & Header Section */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center">
            <p className="uppercase tracking-[4px] text-[#0D478B] text-sm font-semibold">
              Local Management Associations
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#0B1F3A] mt-3">
              LMA Network{" "}
              <span className="text-[#E4AB25]">{getZoneDisplayName()}</span>
            </h1>
            <p className="text-gray-500 max-w-3xl mx-auto mt-5 leading-8">
              Connect with Local Management Associations across the{" "}
              {getZoneDisplayName()?.replace(" Zone", "")} Region. Browse office
              bearers and contact information for each association.
            </p>
            <div className="w-20 h-1 bg-[#E4AB25] rounded-full mx-auto mt-5"></div>
          </div>

          {/* Search Box */}
          <div className="mt-14">
            <div className="max-w-xl mx-auto relative mt-5">
              <input
                type="text"
                placeholder="Search by LMA Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 rounded-xl border border-gray-300 pl-5 pr-14 outline-none focus:border-[#0D478B] focus:ring-1 focus:ring-[#0D478B] transition-all bg-gray-50/30 text-gray-800"
              />
              {/* <div className="absolute right-2 top-2 w-10 h-10 rounded-lg bg-[#0D478B] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Associations Listing Cards */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
          {paginatedLMAs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">
                No Associations Found
              </h3>
              <p className="text-gray-500 mt-2">
                We couldn&apos;t find any local management associations matching
                &quot;{searchQuery}&quot;.
              </p>
            </div>
          ) : (
            paginatedLMAs.map((lma) => {
              const bearers = lma.lma_networks
                ? sortBearers(lma.lma_networks)
                : [];
              const initials = getInitials(lma.lma_name);
              const stateName = lma.lma_networks?.[0]?.state || lma.region;

              return (
                <div
                  key={lma.id}
                  className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Header Banner */}
                  <div className="bg-[#0D478B] px-8 py-5 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white">
                        {lma.lma_name}
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm mt-1 uppercase tracking-wider font-semibold">
                        {initials} • {stateName}
                      </p>
                    </div>
                  </div>

                  {/* Office Bearers Columns Grid */}
                  <div
                    className={`grid grid-cols-1 ${bearers.length > 1 ? "lg:grid-cols-2" : ""}`}
                  >
                    {bearers.map((person, idx) => {
                      const isFirst = idx === 0;
                      const hasDivider = isFirst && bearers.length > 1;

                      return (
                        <div
                          key={person.id}
                          className={`p-8 flex flex-col justify-between ${
                            hasDivider
                              ? "border-b lg:border-b-0 lg:border-r border-gray-200"
                              : ""
                          }`}
                        >
                          <div>
                            {/* Person Header */}
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-14 h-14 rounded-xl bg-[#EEF3F8] flex items-center justify-center shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-7 h-7 text-[#0D478B]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-lg md:text-xl font-semibold text-[#0B1F3A]">
                                  {person.name}
                                </h4>
                                <p className="text-[#0D478B] text-sm font-semibold capitalize tracking-wide">
                                  {person.designation || person.type}
                                </p>
                              </div>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                              {/* Address */}
                              {person.address && (
                                <div className="flex gap-3 items-start">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mt-0.5 text-[#0D478B] shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  <div>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: person.address,
                                      }}
                                    />
                                    {(person.city ||
                                      person.state ||
                                      person.pincode) && (
                                      <p className="mt-0.5 font-medium">
                                        {[
                                          person.city,
                                          person.state,
                                          person.pincode,
                                        ]
                                          .filter(Boolean)
                                          .join(", ")}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Phone / Mobile */}
                              {(person.tel || person.mobile) && (
                                <div className="flex items-center gap-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-[#0D478B] shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M3 5a2 2 0 012-2h3l2 5-2 1a15 15 0 006 6l1-2 5 2v3a2 2 0 01-2 2h-1C9.716 20 4 14.284 4 7V5z"
                                    />
                                  </svg>
                                  <span>
                                    {[person.tel, person.mobile]
                                      .filter(Boolean)
                                      .join(", ")}
                                  </span>
                                </div>
                              )}

                              {/* Email */}
                              {person.email && (
                                <div className="flex items-center gap-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-[#0D478B] shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5"
                                    />
                                  </svg>
                                  <a
                                    href={`mailto:${person.email}`}
                                    className="text-[#0D478B] hover:underline break-all"
                                  >
                                    {person.email}
                                  </a>
                                </div>
                              )}

                              {/* Website link */}
                              {person.website && (
                                <div className="flex items-center gap-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-[#0D478B] shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                  <a
                                    href={
                                      person.website.startsWith("http")
                                        ? person.website
                                        : `https://${person.website}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0D478B] hover:underline"
                                  >
                                    Visit Website
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}

          {/* Local Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-start gap-2">
              {/* Previous Button */}
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-[#0D478B] hover:text-white hover:border-[#0D478B] transition-all font-semibold text-sm cursor-pointer shadow-sm"
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

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((p, index) => {
                  if (p === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="px-3 py-2 text-gray-400 font-semibold select-none"
                      >
                        ...
                      </span>
                    );
                  }
                  const isActive = p === currentPage;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setCurrentPage(p as number)}
                      className={`px-4.5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer transition-all ${
                        isActive
                          ? "bg-[#0D478B] text-white shadow-md shadow-[#0D478B]/10"
                          : "border border-gray-200 bg-white text-gray-600 hover:bg-[#0D478B] hover:text-white hover:border-[#0D478B]"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              {currentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-[#0D478B] hover:text-white hover:border-[#0D478B] transition-all font-semibold text-sm cursor-pointer shadow-sm"
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
          )}
        </div>
      </section>
    </div>
  );
}
