"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CategoryItem {
  children: any;
  id: number;
  name: string;
  slug: string;
  image?: string;
}

interface VideoItem {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  video_link: string;
  publish_date: string;
  duration?: string;
  thumbnail: string;
}

interface VideoListingProps {
  initialVideos: VideoItem[];
  seriesCategories: CategoryItem[];
  generalCategories: CategoryItem[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  } | null;
  currentFilters: {
    category?: string;
    series?: string;
    keyword?: string;
    page?: string;
    type?: string;
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

export default function VideoListing({
  initialVideos,
  seriesCategories,
  generalCategories,
  meta,
  currentFilters,
}: VideoListingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchVal, setSearchVal] = useState<string>(
    currentFilters.keyword || "",
  );

  // Update input field if query changes externally
  useEffect(() => {
    setSearchVal(currentFilters.keyword || "");
  }, [currentFilters.keyword]);

  const handleFilterChange = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, val]) => {
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });

    // If changing category/series/keyword, reset the page to 1
    if (!updates.hasOwnProperty("page")) {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange({ keyword: searchVal || null });
  };

  const handleCategorySelect = (
    slug: string,
    filterType: "series" | "category" | "type",
  ) => {
    switch (filterType) {
      case "type":
        handleFilterChange({
          type: currentFilters.type === slug ? null : slug,
          category: null,
          series: null,
        });
        break;

      case "category":
        handleFilterChange({
          category: currentFilters.category === slug ? null : slug,
          series: null,
          type: null,
        });
        break;

      case "series":
        handleFilterChange({
          series: currentFilters.series === slug ? null : slug,
          category: null,
          type: null,
        });
        break;
    }
  };
  const handleClearFilters = () => {
    setSearchVal("");
    router.push(pathname);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr || "";
    }
  };

  const activeCategorySlug =
    currentFilters.category ||
    currentFilters.series ||
    currentFilters.type ||
    "latest";

  const getActiveCategoryName = () => {
    if (activeCategorySlug === "latest") return "Latest Videos";

    const userTypes = [
      { slug: "students", name: "Students" },
      { slug: "working-professionals", name: "Working Professionals" },
      { slug: "ceos-cxos", name: "CEOs / CXOs" },
    ];
    const foundUserType = userTypes.find(
      (ut) => ut.slug === activeCategorySlug,
    );
    if (foundUserType) return foundUserType.name;

    const foundSeries = seriesCategories.find(
      (s) => s.slug === activeCategorySlug,
    );
    if (foundSeries) return foundSeries.name;

    // Search in children of seriesCategories
    for (const parent of seriesCategories || []) {
      if (Array.isArray(parent.children)) {
        const foundChild = parent.children.find(
          (child: any) => child.slug === activeCategorySlug,
        );
        if (foundChild) return foundChild.name;
      }
    }

    const foundCat = generalCategories.find(
      (c) => c.slug === activeCategorySlug,
    );
    if (foundCat) return foundCat.name;

    // Friendly formatting of slugs for displaying name
    return activeCategorySlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const managementSeriesParent = (seriesCategories || []).find(
    (s) => s.slug === "management-series",
  );
  const managementSeriesChildrenSlugs =
    managementSeriesParent?.children?.map((child: any) => child.slug) || [];
  const managementSeriesCategories = managementSeriesParent?.children || [];

  const categoriesParent = (seriesCategories || []).find(
    (s) => s.slug === "categories",
  );
  const categoriesChildrenSlugs = [
    ...(categoriesParent?.children?.map((child: any) => child.slug) || []),
    "leader-shots",
    "subscribers-only",
  ];

  const leaderShotsCategory = (seriesCategories || []).find(
    (s) => s.slug === "leader-shots",
  ) || {
    id: 23,
    parent_id: null,
    name: "Leader Shots",
    slug: "leader-shots",
    priority: 3,
    image:
      "https://aima.sanntra.com/administrator/public/storage/management-tv/category/1784712026_resized-3_6a608b5a4a7e4.jpg",
  };

  const subscribersOnlyCategory = (seriesCategories || []).find(
    (s) => s.slug === "subscribers-only",
  ) || {
    id: 24,
    parent_id: null,
    name: "Subscribers Only",
    slug: "subscribers-only",
    priority: 4,
    image:
      "https://aima.sanntra.com/administrator/public/storage/management-tv/category/1784712598_resized-1-9_6a608d96afbec.jpg",
  };

  const categoriesList = [
    ...(categoriesParent?.children || []),
    leaderShotsCategory,
    subscribersOnlyCategory,
  ].filter((category, index, array) => {
    if (!category?.slug) return false;
    return array.findIndex((item) => item?.slug === category.slug) === index;
  });

  const visibleSeriesCategories =
    (seriesCategories || []).length > 0
      ? (seriesCategories || []).filter((item) => {
          const slug = item?.slug?.toLowerCase?.() || "";
          return slug === "management-series" || slug === "categories";
        })
      : [
          { id: 20, name: "Management Series", slug: "management-series" },
          { id: 21, name: "Categories", slug: "categories" },
        ];

  const currentTab =
    activeCategorySlug === "management-series" ||
    managementSeriesChildrenSlugs.includes(activeCategorySlug)
      ? "management-series"
      : activeCategorySlug === "categories" ||
          categoriesChildrenSlugs.includes(activeCategorySlug)
        ? "categories"
        : "management-series"; // default to management-series

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 font-primary">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-2">
          <Link className="hover:text-blue-900 transition" href="/">
            Home
          </Link>
          <span>/</span>
          <Link
            className="hover:text-blue-900 transition"
            href="/aima-management-tv"
          >
            Management TV
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate capitalize">
            {getActiveCategoryName()}
          </span>
        </nav>

        {/* Categories, Series & Search Bar Wrapper */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-8 p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100">
            <div>
              <p className="uppercase tracking-[4px] text-[#0D478B] text-xs font-bold mb-2">
                AIMA Management TV
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">
                {getActiveCategoryName()}
              </h1>
            </div>

            {/* Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full lg:max-w-md"
            >
              <input
                type="text"
                placeholder="Search videos by title..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full h-14 rounded-xl border border-gray-200 pl-5 pr-14 outline-none focus:border-[#0D478B] transition-all bg-gray-50/50 text-gray-800"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 w-10 h-10 rounded-lg bg-[#0D478B] flex items-center justify-center hover:bg-blue-900 transition cursor-pointer"
              >
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
              </button>
            </form>
          </div>

          {/* Dynamic Tabs Filters */}
          <div className="mt-8 space-y-6">
            {/* User types */}
            <div>
              <div className="relative mb-3">
                <h2 className="text-xl font-bold mb-[10px]">User Types</h2>
                <div className="h-[3px] bg-[#e4ab25] w-[30px]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { slug: "students", name: "Students" },
                  {
                    slug: "working-professionals",
                    name: "Working Professionals",
                  },
                  { slug: "ceos-cxos", name: "CEOs / CXOs" },
                ].map((ut) => {
                  const isActive = currentFilters.type === ut.slug;
                  return (
                    <button
                      key={ut.slug}
                      onClick={() => handleCategorySelect(ut.slug, "type")}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#0D478B] text-white border-[#0D478B] shadow-md shadow-[#0D478B]/10"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#0D478B] hover:text-[#0D478B]"
                      }`}
                    >
                      {ut.name}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Curated Series / Tabs Selector */}
            <div className="w-full h-[2px] bg-gray-200" />
            <div>
              <div className="flex flex-wrap gap-2">
                {visibleSeriesCategories.map((s) => {
                  const isActive = currentTab === s.slug;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleCategorySelect(s.slug, "series")}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#0D478B] text-white border-[#0D478B] shadow-md shadow-[#0D478B]/10"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#0D478B] hover:text-[#0D478B]"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Categories (based on current tab) */}
            {((currentTab === "management-series" &&
              managementSeriesCategories.length > 0) ||
              (currentTab === "categories" && categoriesList.length > 0)) && (
              <div>
                <div className="relative mb-3">
                  <h2 className="text-xl font-bold mb-[10px]">
                    {" "}
                    {currentTab === "management-series"
                      ? "Management Series"
                      : "Categories"}
                  </h2>
                  <div className="h-[3px] bg-[#e4ab25] w-[30px]" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {(currentTab === "management-series"
                    ? managementSeriesCategories
                    : categoriesList
                  ).map((c: any) => {
                    const isActive = activeCategorySlug === c.slug;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleCategorySelect(c.slug, "category")}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#0D478B] text-white border-[#0D478B] shadow-md shadow-[#0D478B]/10"
                            : "bg-white text-gray-600 border-gray-200 hover:border-[#0D478B] hover:text-[#0D478B]"
                        }`}
                      >
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clear Filters Helper banner */}
        {(currentFilters.keyword ||
          currentFilters.category ||
          currentFilters.series ||
          currentFilters.type) && (
          <div className="flex items-center justify-between bg-blue-50/60 border border-blue-100 rounded-xl p-4 mb-6">
            <span className="text-sm text-gray-600">
              Showing filtered results
              {currentFilters.keyword && (
                <span>
                  {" "}
                  for search: &quot;<strong>{currentFilters.keyword}</strong>
                  &quot;
                </span>
              )}
            </span>
            <button
              onClick={handleClearFilters}
              className="text-xs text-[#0D478B] font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Video Grid */}
        <div>
          {initialVideos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm w-full">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                No Videos Found
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                We couldn&apos;t find any videos matching your filter options or
                search. Try adjusting them.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {initialVideos.map((video) => (
                <Link
                  key={video.id}
                  href={`/management-tv/${video.slug}`}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Thumbnail with overlay play icon */}
                    <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                      <img
                        src={video.thumbnail || "/aimaweb/fallbackImg.jpeg"}
                        alt={video.title}
                        onError={(e) => {
                          e.currentTarget.src = "/aimaweb/fallbackImg.jpeg";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 shadow-md flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-slate-900 ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Duration Badge */}
                      {video.duration && (
                        <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {video.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      {/* Publish Date */}
                      {video.publish_date && (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0D478B] mb-2.5 uppercase tracking-wider">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{formatDate(video.publish_date)}</span>
                        </div>
                      )}

                      <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-[#0D478B] transition-colors duration-200">
                        {video.title}
                      </h3>

                      {video.short_description && (
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {video.short_description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0 mt-2">
                    <div className="w-full h-[1px] bg-gray-100 mb-4" />
                    <span className="inline-flex items-center text-xs font-bold text-[#0D478B] group-hover:text-blue-900 group-hover:underline">
                      Watch Video <span className="ml-1.5 font-normal">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Server-Side Pagination Controls */}
        {meta && meta.last_page > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-start gap-2">
            {/* Previous */}
            {meta.current_page > 1 && (
              <button
                type="button"
                onClick={() =>
                  handleFilterChange({
                    page: (meta.current_page - 1).toString(),
                  })
                }
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
            {getPageNumbers(meta.current_page, meta.last_page).map(
              (p, index) => {
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
                const isActive = p === meta.current_page;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleFilterChange({ page: p.toString() })}
                    className={`px-4.5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer transition-all ${
                      isActive
                        ? "bg-[#0D478B] text-white shadow-md shadow-[#0D478B]/10"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-[#0D478B] hover:text-white hover:border-[#0D478B]"
                    }`}
                  >
                    {p}
                  </button>
                );
              },
            )}
            {meta.current_page < meta.last_page && (
              <button
                type="button"
                onClick={() =>
                  handleFilterChange({
                    page: (meta.current_page + 1).toString(),
                  })
                }
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

            {/* Next */}
          </div>
        )}
      </div>
    </section>
  );
}
