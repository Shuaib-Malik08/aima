"use client";

import React from "react";
import Link from "next/link";

interface Props {
  block?: any;
}

const FALLBACK_LATEST = [
  {
    id: 1,
    title: "Innovation Practitioners Summit",
    publish_date: "18 Jun 2024",
    duration: "18 Min",
    thumbnail:
      "https://www.aima.in/backend/web/uploads/video-list/1783588470China%20in%20the%20New%20world_-%20SS.png",
    slug: "innovation-practitioners-summit",
  },
  {
    id: 2,
    title: "Global Procurement Summit",
    publish_date: "05 May 2024",
    duration: "24 Min",
    thumbnail:
      "https://www.aima.in/backend/web/uploads/video-list/1776409739Session%203%20NLC.png",
    slug: "global-procurement-summit",
  },
  {
    id: 3,
    title: "Shaping Young Minds Programme",
    publish_date: "12 Apr 2024",
    duration: "16 Min",
    thumbnail:
      "https://www.aima.in/backend/web/uploads/video-list/1776410067Session%202%20NLC.png",
    slug: "shaping-young-minds-programme",
  },
  {
    id: 4,
    title: "HR Power Workshop",
    publish_date: "27 Mar 2024",
    duration: "21 Min",
    thumbnail:
      "https://www.aima.in/backend/web/uploads/video-list/1776410781Session-1%20NLC.png",
    slug: "hr-power-workshop",
  },
];

export default function LatestVideos({ block }: Props) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const videos =
    block?.data && Array.isArray(block.data) && block.data.length > 0
      ? block.data.map((item: any, idx: number) => ({
        id: item.id || idx + 1,
        title: item.title,
        publish_date: formatDate(item.publish_date) || "18 Jun 2024",
        duration: item.duration || "18 Min",
        thumbnail:
          item.thumbnail ||
          FALLBACK_LATEST[idx % FALLBACK_LATEST.length].thumbnail,
        slug: item.slug || `video-${item.id || idx}`,
      }))
      : FALLBACK_LATEST;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="relative flex flex-col items-center mb-12">
          <div className="text-center">
            <p className="tracking-widest uppercase text-xs text-gray-500 mb-2">
              Watch management insights, interviews and leadership discussions.
            </p>
            {block?.title ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: block.title.replace(/className=/g, "class="),
                }}
              />
            ) : (
              <h2 className="text-3xl sm:text-4xl md:text-[56px] font-semibold font-heading leading-[1.2]">
                <span className="text-black me-3 inline-block">Latest</span>
                <span className="text-[#E4AB25] inline-block">Videos</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {videos.map((item: any) => (
            <Link
              key={item.id}
              href={`/management-tv/${item.slug}`}
              className="group block rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full aspect-video object-cover"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center group-hover:scale-110 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7 text-black ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {item.publish_date}
                  </span>

                  <span className="flex items-center gap-1">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {item.duration}
                  </span>
                </div>

                <h3 className="font-semibold text-lg text-black leading-7">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
