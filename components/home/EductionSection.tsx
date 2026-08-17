"use client";

import { Block } from "@/types/blocks.types";

type AdsBlock = Extract<Block, { type: "ads" }>;

interface Banner {
  id: number;
  title: string;
  image: string | null;
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

export default function EducationSection({ block }: Props) {
  const { banners } = block.data as BannerData;
  const activeBanners = (banners ?? [])
    .filter((b) => b.status === 1)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center text-center gap-6 mb-14">
          <div>
            {block.title && (
              <p className="tracking-widest uppercase text-xs mb-3 text-gray-500 font-playfair-display">
                {block.title}
              </p>
            )}

            {block.description ? (
              <div
                className="font-heading"
                dangerouslySetInnerHTML={{ __html: block.description }}
              />
            ) : (
              <h2 className="text-[32px] md:text-[56px] font-[900] font-semibold font-playfair-display">
                Education & Capacity{" "}
                <span className="text-[#E4AB25] font-heading">Building</span>
              </h2>
            )}
          </div>

          <div className="md:text-right md:ms-20">
            <button className="bg-[#0D478B] text-white px-6 py-4 rounded-full text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl transition duration-300">
              View All
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {activeBanners.map((item) => (
            <div
              key={item.id}
              className=" rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group cursor-pointer"
            >
              {/* Image */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[265px] object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-[265px] bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl mb-2 group-hover:text-[#0D478B] transition">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-sm text-gray-500 mb-4">
                    {item.description}
                  </p>
                )}

                <a
                  href="#"
                  className="text-sm flex items-center gap-2 text-[#0D478B] font-medium hover:gap-3 transition-all"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}