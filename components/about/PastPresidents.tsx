"use client";

import React, { useRef } from "react";
import { Block } from "@/types/blocks.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { useRouter } from "next/navigation";

interface Props {
  block: Block;
}

interface President {
  name: string;
  image: string;
  years: string;
  role: string;
  company: string;
  slug: string;
}

const resolveImage = (profilePic: string | null): string => {
  if (profilePic) {
    if (profilePic.startsWith("http")) return profilePic;
    let cleanPath = profilePic;
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }
    if (cleanPath.startsWith("public/storage/")) {
      return `https://aima.sanntra.com/administrator/${cleanPath}`;
    }
    if (cleanPath.startsWith("storage/")) {
      return `https://aima.sanntra.com/administrator/public/${cleanPath}`;
    }
    return `https://aima.sanntra.com/administrator/public/storage/${cleanPath}`;
  }
  return "";
};

export default function PastPresidents({ block }: Props) {
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const rawPresidents = Array.isArray(block.data) ? block.data : [];

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const parsedPresidents: President[] = [];
  const seenNames = new Set<string>();

  for (const item of rawPresidents) {
    if (!item || !item.name) continue;
    const cleanName = item.name.toLowerCase().replace(/[^a-z]/g, "");

    if (!seenNames.has(cleanName)) {
      seenNames.add(cleanName);
      parsedPresidents.push({
        name: item.name,
        image: resolveImage(item.profile_pic),
        years: item.duration || "",
        role: item.designation || "Past President",
        company: item.organisation || "",
        slug: item.slug,
      });
    }
  }

  if (parsedPresidents.length === 0) return null;

  return (
    <section className="py-20 bg-white" id="past-presidents">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between w-full mb-14 gap-4">
          {block.description ? (
            <div
              className="md:absolute md:left-1/2 md:-translate-x-1/2 text-center w-full md:w-auto font-heading"
              dangerouslySetInnerHTML={{ __html: block.description }}
            />
          ) : (
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 text-center w-full md:w-auto">
              <p className="tracking-widest uppercase text-xs text-gray-500">
                Decades of Illustrious Leadership
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
                AIMA <span className="text-[#E4AB25]">Past Presidents</span>
              </h2>
            </div>
          )}

          <div className="flex justify-center md:justify-end ml-auto">
            <a
              href="#"
              className="bg-[#0D478B] cursor-pointer text-white px-6 py-4 rounded-full text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
            >
              View All
            </a>
          </div>
        </div>

        <div className="relative px-6 md:px-12">
          <button
            onClick={handlePrev}
            aria-label="Previous President"
            className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-3 border border-gray-100 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center w-11 h-11"
          >
            ❮
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="w-full"
          >
            {parsedPresidents.map((president, index) => (
              <SwiperSlide key={index} className="py-2">
                <div
                  className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() =>
                    router.push(`/management-detail/${president.slug}`)
                  }
                >
                  <div className="relative h-56 w-full shrink-0">
                    {president.image ? (
                      <img
                        src={president.image}
                        alt={president.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f3f4f6] flex items-center justify-center text-gray-400">
                        <svg
                          className="w-12 h-12"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      {president.years && (
                        <span className="inline-block bg-[#0D478B] text-white text-[10px] px-2 py-1 rounded-full font-medium">
                          {president.years}
                        </span>
                      )}

                      <h3 className="text-lg font-semibold mt-3 text-gray-900 leading-snug">
                        {president.name}
                      </h3>

                      <p className="text-sm text-gray-700 mt-1 font-medium leading-normal">
                        {president.role}
                      </p>
                    </div>

                    {president.company && (
                      <p className="text-xs text-gray-500 mt-2 border-t border-gray-100 pt-2 leading-relaxed">
                        {president.company}
                      </p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={handleNext}
            aria-label="Next President"
            className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-3 border border-gray-100 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center w-11 h-11"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
}
