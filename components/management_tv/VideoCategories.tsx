"use client";

import React from "react";
import Link from "next/link";

interface Props {
  block?: any;
}

const VIDEO_CATEGORIES = [
  {
    id: 1,
    title: "Economy",
    videos_count: "25+ Videos",
    image: "/aimaweb/category1.jpg",
    link: "/aima-management-tv/listing?category=economy",
  },
  {
    id: 2,
    title: "Technology",
    videos_count: "40+ Videos",
    image: "/aimaweb/category2.jpg",
    link: "/aima-management-tv/listing?category=technology",
  },
  {
    id: 3,
    title: "COVID Recovery",
    videos_count: "18+ Videos",
    image: "/aimaweb/category3.jpg",
    link: "/aima-management-tv/listing?category=covid-recovery",
  },
  {
    id: 4,
    title: "Business Management",
    videos_count: "60+ Videos",
    image: "/aimaweb/category4.jpg",
    link: "/aima-management-tv/listing?category=business-management",
  },
];

export default function VideoCategories({ block }: Props) {
  const categoriesList =
    block?.data?.children && Array.isArray(block.data.children) && block.data.children.length > 0
      ? block.data.children.map((child: any, idx: number) => ({
          id: child.id || idx + 1,
          title: child.name,
          videos_count: "Explore Videos",
          image: child.image || VIDEO_CATEGORIES[idx % VIDEO_CATEGORIES.length].image,
          link: `/aima-management-tv/listing?category=${child.slug}`,
        }))
      : VIDEO_CATEGORIES;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="relative flex flex-col items-center mb-12">
          <div className="text-center">
            <p className="tracking-widest uppercase text-xs text-gray-500 mb-2">
              Get insights in trending areas of management
            </p>
            {block?.title ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: block.title.replace(/className=/g, "class="),
                }}
              />
            ) : (
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
                Video{" "}
                <span className="text-[#E4AB25] inline-block">Categories</span>
              </h2>
            )}
          </div>
          <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2">
            <Link href="/aima-management-tv/listing">
              <button className="border-2 border-[#0D478B] text-[#0D478B] px-6 py-4 rounded-full text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl hover:bg-[#0D478B] hover:text-white transition duration-300 cursor-pointer">
                View All
              </button>
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesList.map((cat: any) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow hover:shadow-lg transition duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#0D478B] mb-1 min-h-[56px] flex items-center justify-center">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{cat.videos_count}</p>
                <span className="inline-flex items-center gap-1 text-[#E4AB25] font-semibold text-sm">
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
