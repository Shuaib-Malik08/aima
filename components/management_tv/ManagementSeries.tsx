"use client";

import React from "react";
import Link from "next/link";

interface Props {
  block?: any;
}

const MANAGEMENT_SERIES = [
  {
    id: 1,
    title: "Thought Leadership",
    description:
      "Hear from eminent political and industry leaders addressing AIMA flagship programmes.",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1664518346Shri Jagdeep Dhankhar.png",
    link: "/aima-management-tv/listing?series=thought-leadership",
  },
  {
    id: 2,
    title: "LeaderSpeak",
    description:
      "Conversations with global thought leaders, CEOs and distinguished management experts.",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1754117354Leaderspeak - Rahul Kapoor .jpeg",
    link: "/aima-management-tv/listing?series=leaderspeak",
  },
  {
    id: 3,
    title: "Tête-à-Tête",
    description:
      "Fireside conversations with eminent business leaders and policy makers.",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1754393162Forward to Fundamentals.jpeg",
    link: "/aima-management-tv/listing?series=tete-a-tete",
  },
  {
    id: 4,
    title: "Management Discussions",
    description:
      "Expert panel discussions on current business trends and management practices.",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1754116947Bouyant India .jpeg",
    link: "/aima-management-tv/listing?series=management-discussions",
  },
  {
    id: 5,
    title: "Young Leaders",
    description:
      "Inspiring stories of young entrepreneurs, innovators and future business leaders.",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1754393456Breeding Unicorns .jpeg",
    link: "/aima-management-tv/listing?series=young-leaders",
  },
  {
    id: 6,
    title: "Success Stories",
    description:
      "Inspiring success journeys and life lessons from iconic leaders and achievers.",
    image:
      "https://www.aima.in/backend/web/uploads/video-list/1663236792Mr. Shiv Shivakumar.png",
    link: "/aima-management-tv/listing?series=success-stories",
  },
];

export default function ManagementSeries({ block }: Props) {
  const seriesList =
    block?.data?.children && Array.isArray(block.data.children) && block.data.children.length > 0
      ? block.data.children.map((child: any, idx: number) => ({
        id: child.id || idx + 1,
        title: child.name,
        description: child.video?.short_description || `Conversations and insights in the ${child.name} series.`,
        image: child.image || child.video?.thumbnail || MANAGEMENT_SERIES[idx % MANAGEMENT_SERIES.length].image,
        link: `/aima-management-tv/listing?series=${child.slug}`,
      }))
      : MANAGEMENT_SERIES;

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Heading */}
        <div className="relative flex flex-col items-center mb-12">
          <div className="text-center">
            <p className="tracking-widest uppercase text-xs text-gray-500 mb-2">
              Specially curated series in various segments
            </p>
            {block?.title ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: block.title.replace(/className=/g, "class="),
                }}
              />
            ) : (
              <h2 className="text-3xl sm:text-4xl md:text-[56px] font-semibold font-heading leading-[1.2]">
                <span className="text-black me-3 inline-block">Management</span>
                <span className="text-[#E4AB25] inline-block">Series</span>
              </h2>
            )}
          </div>
          <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2">
            <Link href="/aima-management-tv/listing?series=management-series">
              <button className="border-2 border-[#0D478B] text-[#0D478B] px-6 py-4 rounded-full text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl hover:bg-[#0D478B] hover:text-white transition duration-300 cursor-pointer">
                View All
              </button>
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {seriesList.map((series: any) => (
            <Link
              key={series.id}
              href={series.link}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow hover:shadow-2xl transition duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={series.image}
                  alt={series.title}
                  className="w-full h-64 object-fill group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-[#0D478B] ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mt-2 mb-3">
                  {series.title}
                </h3>
                <p className="text-gray-600 leading-7 text-sm line-clamp-3">
                  {series.description}
                </p>
                <span className="inline-flex items-center mt-6 font-semibold text-[#0D478B]">
                  Watch Series →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
