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

export default function ManagerialSection({ block }: Props) {
  const { banners } = block.data as BannerData;
  const activeBanners = (banners ?? [])
    .filter((b) => b.status === 1)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section className="py-20 bg-white">
      {/* add new div  */}
      <div className="container-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-11">

          {/* ── Header ── */}
          {block.title && (
            <p className="text-center tracking-widest uppercase text-xs text-gray-500 mb-3 font-playfair-display">
              {block.title}
            </p>
          )}

          {block.description ? (
            <div
              className="text-center mb-20 font-heading "
              dangerouslySetInnerHTML={{ __html: block.description }}
            />
          ) : (
            <h2 className="rounded-tl-2xl text-center text-4xl md:text-5xl font-semibold mb-20 font-heading" style={{ fontFamily: "Playfair Display" }}>
              <span className="font-heading">Managerial &</span>
              <span className="text-[#E4AB25] font-heading"> Leadership Development</span>
            </h2>
          )}

          {/* ── Alternating rows ── */}
          <div className="space-y-10">
            {activeBanners.map((item, index) => {
              const isOdd = index % 2 !== 0;

              return (
                <div
                  key={item.id}
                  className="grid md:grid-cols-2 gap-10 items-center mb-5"
                >
                  {/* ── Image block ── */}
                  <div
                    className={`relative w-full ${isOdd ? "order-1 md:order-2" : "order-1"
                      }`}
                  >
                    {/* Decorative background slab */}
                    <div
                      className={`absolute top-2 w-40 h-40 ${isOdd
                        ? "-right-6 bg-[#E4AB25] rounded-tr-2xl"
                        : "-left-6 bg-[#0D478B] rounded-tl-2xl"
                        }`}
                    />

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="relative w-full max-w-md h-52 rounded-2xl object-cover shadow-lg mt-6 z-10"
                        loading="lazy"
                      />
                    ) : (
                      <div className="relative w-full max-w-md h-52 rounded-2xl bg-gray-100 shadow-lg mt-6 z-10 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* ── Text block ── */}
                  <div
                    className={`${isOdd ? "order-2 md:order-1" : "order-2"
                      } max-w-sm`}
                  >
                    <h3 className="text-3xl font-semibold mb-4">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 mt-6 text-[#0D478B] font-medium text-sm hover:gap-3 transition-all"
                    >
                      Learn More →
                    </a>
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