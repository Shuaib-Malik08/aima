"use client";


import { Block } from "@/types/blocks.types";

type AdsBlock = Extract<Block, { type: "ads" }>;

interface Banner {
  id: number;
  title: string;
  image: string | null;
  url: string | null;
  sort_order: number;
  status: number;
}

interface BannerData {
  banners: Banner[];
}

interface Props {
  block: AdsBlock;
}

export default function ResearchSection({ block }: Props) {
  const { banners } = block.data as BannerData;
  const activeBanners = (banners ?? [])
    .filter((b) => b.status === 1)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section className="bg-[#0D478B] py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Heading ── */}
        {block.description ? (
          <div
            className="text-center mb-5"
            dangerouslySetInnerHTML={{ __html: block.description }}
          />
        ) : (
          <h2 className="text-center text-4xl font-semibold text-white  font-playfair-display">
            Research & <span className="text-yellow-400 font-heading">Report</span>
          </h2>
        )}

        {/* ── Cards Grid ── */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeBanners.map((item) => (
            <a
              key={item.id}
              href={item.url ?? "#"}
              className="flex mt-5 items-center justify-between bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* Left: icon + title */}
              <div className="flex items-center gap-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 shrink-0 flex items-center justify-center">
                    <span className="text-[10px] text-gray-400">IMG</span>
                  </div>
                )}

                <p className="px-4 text-gray-800 font-medium text-sm leading-snug">
                  {item.title}
                </p>
              </div>

              {/* Arrow */}
              <span className="pr-4 text-[#0D478B] text-xl font-bold shrink-0">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}