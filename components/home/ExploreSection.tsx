"use client";

import { useState } from "react";
import { Block } from "@/types/blocks.types";

type AdsBlock = Extract<Block, { type: "ads" }>;

interface Banner {
  id: number;
  title: string;
  description: string | null;
  sort_order: number;
  status: number;
}

interface BannerData {
  banners: Banner[];
}

interface Props {
  block: AdsBlock;
}

export default function EventsSection({ block }: Props) {
  const { banners } = block.data as BannerData;
  const activeBanners = (banners ?? [])
    .filter((b) => b.status === 1)
    .sort((a, b) => a.sort_order - b.sort_order);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-11">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center  gap-6 mb-14 text-center justify-center">
          <div>
            {block.title && (
              // <p className="tracking-widest uppercase text-xs text-gray-500 mb-2 font-playfair-display">
              //   {block.title}
              // </p>
              <div
                // className="font-heading"
                dangerouslySetInnerHTML={{ __html: block.title }}
              />
            )}

            {block.description ? (
              <div
                // className="font-heading"
                dangerouslySetInnerHTML={{ __html: block.description }}
              />
            ) : (
              <h2 className="text-[32px] md:text-[56px] font-[900] font-heading font-playfair-display">
                Explore our{" "}
                <span className="text-[#E4AB25] ">
                  Events
                </span>
              </h2>
            )}
          </div>

          <div className="md:text-right md:ms-20">
            <button className="bg-[#0D478B] text-white px-6 py-4 rounded-full text-sm font-semibold  shadow-md 
hover:scale-105 hover:shadow-xl transition duration-300">
              View All
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Image */}
          {block.bg_photo && (
            <div>
              <img
                src={block.bg_photo}
                alt="Events"
                className="w-full h-[260px] sm:h-[340px] lg:h-[490px] object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          )}

          {/* Events list */}
          <div className="grid gap-3 mb-5">
            {activeBanners.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className="group cursor-pointer border-b pb-6 transition duration-300"
                >
                  <div className="grid grid-cols-[60px_1fr] gap-6">
                    <span
                      className={`text-2xl font-bold transition ${
                        isActive
                          ? "text-[#E4AB25]"
                          : "text-black group-hover:text-[#E4AB25]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3
                        className={`text-2xl font-semibold transition ${
                          isActive
                            ? "text-[#E4AB25]"
                            : "text-black group-hover:text-[#E4AB25]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-gray-600 mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
