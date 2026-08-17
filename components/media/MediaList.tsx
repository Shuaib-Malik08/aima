"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface FilterMonth {
  code: number;
  name: string;
}

interface MediaListProps {
  mediaItems: any[];
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
    type?: string;
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

const MediaList = ({
  mediaItems,
  years,
  months,
  meta,
  currentFilters,
}: MediaListProps) => {
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getHeadingText = () => {
    if (currentFilters.type === "aima-in-the-news") {
      return "AIMA in the News";
    }
    if (currentFilters.type === "special-economic-times-supplements") {
      return "Special Economic Times Supplements";
    }
    if (currentFilters.type === "press-releases") {
      return "Press Releases";
    }
    return "Media Center";
  };

  return (
    <section className="  bg-gray-50/50 py-12 px-4  font-primary">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-2">
          <Link className="hover:text-blue-900 transition" href="/">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate capitalize">
            {getHeadingText()}
          </span>
        </nav>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8 p-5 lg:p-10">
          <div className="heading-wrapper flex flex-col sm:flex-row items-start gap-5 sm:items-center justify-start sm:justify-between">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
              {getHeadingText()}
            </h1>
          </div>
          <div className="from-wrapper mt-10">
            <form onSubmit={(e) => e.preventDefault()} className="block">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                    onChange={(e) => handleFilterChange("year", e.target.value)}
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

                {/* Reset Actions */}
                <div className="item-wrapper flex flex-nowrap gap-3 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (currentFilters.type) {
                        params.set("type", currentFilters.type);
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

        {/* Media Grid */}
        <div className="max-w-7xl mx-auto">
          {mediaItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm w-full">
              <h3 className="text-lg md:text-2xl font-medium text-black">
                No items found!!
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Try clearing your filters or choosing different options.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mediaItems.map((item: any) => {
                const basePath =
                  currentFilters.type === "press-releases"
                    ? "press-releases"
                    : "media-center";
                const linkHref = item.pdf_file
                  ? item.pdf_file
                  : `/${basePath}/${item.slug}`;
                const targetProps = item.pdf_file
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {};

                return (
                  <Link
                    href={linkHref}
                    key={item.id}
                    {...targetProps}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 p-4 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="relative w-full h-[180px] rounded-lg overflow-hidden mb-4 bg-gray-50">
                        <img
                          src={item.image || "/aimaweb/fallbackImg.jpeg"}
                          onError={(e) => {
                            e.currentTarget.src = "/aimaweb/fallbackImg.jpeg";
                          }}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 text-[10px] mb-3">
                        {item.publish_date && (
                          <div className="rounded-full bg-[#0D478B] px-3 py-1 font-semibold text-white">
                            {formatDate(item.publish_date)}
                          </div>
                        )}
                        {item.publisher_name && (
                          <div className="rounded-full bg-[#E4AB25] px-3 py-1 font-semibold text-white uppercase">
                            {item.publisher_name}
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-800 text-base mb-4 line-clamp-3 leading-snug group-hover:text-[#0D478B] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-50">
                      <span className="inline-flex items-center text-[#0D478B] font-semibold text-sm group-hover:text-blue-800 group-hover:underline">
                        Read News <span className="ml-1.5">→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
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
                {getPageNumbers(meta.current_page, meta.last_page).map(
                  (p, index) => {
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
                  },
                )}
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
      </div>
    </section>
  );
};

export default MediaList;
