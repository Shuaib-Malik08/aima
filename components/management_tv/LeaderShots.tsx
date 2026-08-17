"use client";

import React from "react";
import Link from "next/link";

interface Props {
  block?: any;
}

const LEADER_SHOTS = [
  {
    id: 1,
    title: "Make Indian Education Global With Research Boost",
    description:
      "Pradeep Khosla shares how research capabilities can accelerate innovation.",
    date: "13 May 2024",
    duration: "05:30",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1715596842WhatsApp%20Image%202024-05-13%20at%2012.01.05.jpeg",
    link: "/aima-management-tv/listing",
  },
  {
    id: 2,
    title: "Compounding Wealth Through Patient Investing",
    description:
      "Ankur Warikoo explains the importance of disciplined investing.",
    date: "13 May 2024",
    duration: "05:00",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1715598172Screenshot%20(1).png",
    link: "/aima-management-tv/listing",
  },
  {
    id: 3,
    title: "Digital Innovation Transforms Indian Banking",
    description:
      "Sanjiv Bajaj discusses the future of digital financial services.",
    date: "27 Mar 2024",
    duration: "01:23",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1711524115digital-ttransform.jpeg",
    link: "/aima-management-tv/listing",
  },
  {
    id: 4,
    title: "Sustainable Leadership for the Future",
    description:
      "Leading experts share strategies for building sustainable organizations.",
    date: "15 Mar 2024",
    duration: "04:15",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1710999106sustainableleaderspeak.jpeg",
    link: "/aima-management-tv/listing",
  },
];

export default function LeaderShots({ block }: Props) {
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
          description: item.short_description || "",
          date: formatDate(item.publish_date) || "13 May 2024",
          duration: item.duration || "05:00",
          image:
            item.thumbnail ||
            LEADER_SHOTS[idx % LEADER_SHOTS.length].image,
          slug: item.slug || `video-${item.id || idx}`,
        }))
      : LEADER_SHOTS;

  return (
    <section className="py-20 bg-[#0D478B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="relative flex flex-col items-center mb-12">
          <div className="text-center">
            <p className="tracking-widest uppercase text-xs text-gray-300 mb-2">
              Quick management insights and opinions
            </p>
            {block?.title ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: block.title.replace(/className=/g, "class="),
                }}
              />
            ) : (
              <h2 className="font-heading text-3xl text-white sm:text-4xl md:text-5xl font-semibold">
                Leader{" "}
                <span className="text-[#E4AB25] inline-block">Shots</span>
              </h2>
            )}
          </div>
          <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2">
            <Link href="/aima-management-tv/listing?series=leaderspeak">
              <button className="border-2 border-white text-white px-6 py-4 rounded-full text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
                View All
              </button>
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((shot: any) => (
            <Link
              key={shot.id}
              href={`/management-tv/${shot.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={shot.image}
                  alt={shot.title}
                  className="w-full h-52 object-fill"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-[#0D478B]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {shot.duration}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 leading-6 mb-2 line-clamp-2 min-h-[48px]">
                  {shot.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {shot.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{shot.date}</span>
                  <span className="text-[#E4AB25] font-semibold text-sm">
                    Watch →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
