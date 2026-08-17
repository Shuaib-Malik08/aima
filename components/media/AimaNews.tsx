"use client";
import React from "react";
import Link from "next/link";

interface NewsItem {
  id: number;
  slug: string;
  publish_date: string;
  publisher_name: string;
  image: string;
  title: string;
  content_type: string;
  description: string;
  pdf_file: string | null;
}

interface NewsBlock {
  type: string;
  block_style: string;
  name: string;
  module_code: string;
  title: string | null;
  description: string;
  detail: string | null;
  bg_photo: string | null;
  data: NewsItem[];
}

interface Props {
  block: NewsBlock;
}

function AimaNews({ block }: Props) {
  const newsItems = (block?.data || []).slice(0, 4);

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

  return (
    <section className="max-w-7xl mx-auto px-4 py-20" id="aima-in-the-news">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        {block?.description ? (
          <div dangerouslySetInnerHTML={{ __html: block.description }} />
        ) : null}

        <div className="text-center md:text-right">
          <Link
            href="/media-center/media-listing?type=aima-in-the-news"
            className="inline-block bg-[#0D478B] text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {newsItems.map((item: NewsItem) => {
          const linkHref = item.pdf_file
            ? item.pdf_file
            : `/media-center/${item.slug}`;
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
                {item.image && (
                  <div className="relative w-full h-[180px] rounded-lg overflow-hidden mb-4">
                    <img
                      src={item.image}
                      onError={(e) => {
                        e.currentTarget.src = "/aimaweb/fallbackImg.jpeg";
                      }}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
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
                <h3 className="font-semibold text-gray-800 text-base  line-clamp-3 leading-snug group-hover:text-[#0D478B] transition-colors">
                  {item.title}
                </h3>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50">
                <span className="inline-flex items-center text-[#0D478B] font-semibold text-sm group-hover:text-blue-800 group-hover:underline">
                  Read News <span className="ml-1.5">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default AimaNews;
