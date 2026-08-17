"use client";

import { Block } from "@/types/blocks.types";

type AdsBlock = Extract<Block, { type: "ads" }>;

interface Props {
  block: AdsBlock;
}

export default function HeroSection({ block }: Props) {
  const { banners, width, height } = block.data as {
    banners: { image: string; title: string }[];
    width: number;
    height: number;
  };

  const banner = banners?.[0];

  return (
    <section className="w-full">
      <div
        className="w-full overflow-hidden"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {banner?.image ? (
          <div className="relative w-full h-full">
            <img
              src={banner.image}
              alt={banner.title ?? "Hero Banner"}
              className="w-full h-full object-cover"
            />

            {/* {banner.title && (
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-3xl px-8 md:px-16">
                  <h1 className="text-white text-2xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                    {banner.title}
                  </h1>
                </div>
              </div>
            )} */}
          </div>
        ) : null}
      </div>
    </section>
  );
}