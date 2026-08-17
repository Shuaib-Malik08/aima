"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: number;
  title?: string;
  name?: string;
  image?: string | null;
  description?: string | null;
  url?: string | null;
  sort_order?: number;
  status?: number;
}

interface BannerData {
  id?: number;
  title?: string;
  banners?: Banner[];
}

interface InternationalEventBlock {
  type?: string;
  block_style?: string | null;
  name?: string;
  module_code?: string | null;
  sub_module?: string[] | string | null;
  title?: string | null;
  description?: string | null;
  detail?: string | null;
  bg_photo?: string | null;
  data?: BannerData | any[] | any;
}

const NATIONAL_FALLBACK_IMAGES = [
  "/EventsIMG2/NationalE1.png",
  "/EventsIMG2/NationalE2.png",
  "/EventsIMG2/NationalE3.png",
];

const INTERNATIONAL_FALLBACK_IMAGES = [
  "/EventsIMG2/InternationalE1.png",
  "/EventsIMG2/InternationalE2.png",
  "/EventsIMG2/InternationalE3.png",
];

function InternationalEvent({ block }: { block: InternationalEventBlock }) {
  const swiperRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isNational =
    block?.module_code === "national" ||
    block?.name?.toLowerCase().includes("national") ||
    (Array.isArray(block?.sub_module) &&
      block.sub_module.some((s) => typeof s === "string" && s.includes("national"))) ||
    (Array.isArray(block?.data) &&
      block.data.some((d: any) => d?.type === "national"));

  const fallbackImages = isNational
    ? NATIONAL_FALLBACK_IMAGES
    : INTERNATIONAL_FALLBACK_IMAGES;

  // Local WOW.js sync on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isMounted = true;
    const initWow = async () => {
      try {
        const wowModule = await import("wowjs");
        if (!isMounted) return;
        const WOW = wowModule.WOW || (wowModule as any).default?.WOW;
        if (WOW) {
          const wow = new WOW({
            boxClass: "wow",
            animateClass: "animate__animated",
            offset: 30,
            mobile: true,
            live: true,
          });
          wow.init();
        }
      } catch (err) {
        // ignore
      }
    };

    const timer = setTimeout(() => {
      void initWow();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [block]);

  // Normalize banners/events into a common structure
  const items = Array.isArray(block?.data)
    ? block.data.map((item: any, index: number) => {
        const itemType =
          item.type || (isNational ? "national-event" : "international-event");
        const normalizedType = itemType.endsWith("-event")
          ? itemType
          : `${itemType}-event`;

        const fallbackImg = fallbackImages[index % fallbackImages.length];

        return {
          id: item.id ?? index,
          title: item.title || item.name || "Event",
          image: item.image || item.event_image || fallbackImg,
          url: item.slug
            ? `/events/${normalizedType}/${item.slug}`
            : item.url || null,
        };
      })
    : (block?.data?.banners ?? []).map((banner: any, index: number) => {
        const fallbackImg = fallbackImages[index % fallbackImages.length];

        let bannerUrl = banner.url || null;
        if (
          bannerUrl &&
          isNational &&
          bannerUrl.startsWith("/events/") &&
          !bannerUrl.includes("national-event")
        ) {
          bannerUrl = bannerUrl.replace("/events/", "/events/national-event/");
        } else if (
          bannerUrl &&
          !isNational &&
          bannerUrl.startsWith("/events/") &&
          !bannerUrl.includes("international-event")
        ) {
          bannerUrl = bannerUrl.replace(
            "/events/",
            "/events/international-event/"
          );
        }

        return {
          id: banner.id ?? index,
          title: banner.title || banner.name || "Event",
          image: banner.image || fallbackImg,
          url: bannerUrl,
        };
      });

  const sectionId = isNational ? "National-Events" : "International-Events";
  const viewAllUrl = isNational
    ? "/events/event-listing?type=national"
    : "/events/event-listing?type=international";

  const renderHeader = () => {
    if (block?.title) {
      if (block.title.includes("<")) {
        return <div dangerouslySetInnerHTML={{ __html: block.title }} />;
      }
      return (
        <h2 className="font-heading text-3xl md:text-5xl font-semibold leading-tight text-white text-center">
          {block.title}
        </h2>
      );
    }

    if (block?.description) {
      return <div dangerouslySetInnerHTML={{ __html: block.description }} />;
    }

    if (isNational) {
      return (
        <h2 className="font-heading text-3xl md:text-5xl font-semibold leading-tight text-white text-center">
          National <span className="text-[#E4AB25]">Events</span>
        </h2>
      );
    }

    return (
      <h2 className="font-heading text-3xl md:text-5xl font-semibold leading-tight text-white text-center">
        Going beyond <span className="text-[#E4AB25]">Indian shores</span>
      </h2>
    );
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="bg-[#0D478B] py-20 overflow-hidden font-primary">
      <div className="container-custom px-4 md:px-12" id={sectionId}>
        {/* Header row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Main Title with WOW animation */}
          <div
            className="wow animate__animated animate__fadeInDown text-center md:text-left flex-1"
            data-wow-duration="0.9s"
            data-wow-delay="0.1s"
          >
            {renderHeader()}
          </div>

          {/* Action buttons & Nav with WOW animation */}
          <div
            className="wow animate__animated animate__fadeInDown flex items-center gap-3 shrink-0"
            data-wow-duration="0.9s"
            data-wow-delay="0.25s"
          >
            {/* View All Button */}
            <Link href={viewAllUrl}>
              <button className="border-2 border-white text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl hover:bg-white hover:text-[#0D478B] transition duration-300 cursor-pointer">
                View All
              </button>
            </Link>

            {/* Slider Nav Arrows */}
            {items.length > 1 && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Slide"
                  className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-[#0D478B] hover:scale-105 active:scale-95 transition duration-300 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Slide"
                  className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-[#0D478B] hover:scale-105 active:scale-95 transition duration-300 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Swiper Slider with WOW animation */}
        {items.length > 0 && (
          <div
            className="wow animate__animated animate__fadeInUp relative"
            data-wow-duration="1s"
            data-wow-delay="0.3s"
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setCurrentIndex(swiper.realIndex);
              }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              loop={items.length > 3}
              className="!pb-12"
            >
              {items.map((item: any, idx: number) => {
                const CardContent = (
                  <div className="group h-full rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-[#0c3d77] flex flex-col hover:border-[#E4AB25]/80 hover:shadow-2xl transition-all duration-300">
                    {/* Image */}
                    <div className="h-60 w-full overflow-hidden bg-black/30 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c3d77] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    </div>

                    {/* Title & Content */}
                    <div className="flex flex-col flex-1 justify-between p-6">
                      <h3 className="text-white text-[19px] font-semibold leading-snug group-hover:text-[#E4AB25] transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>

                      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#E4AB25] group-hover:text-white transition-colors duration-300">
                        <span>Explore Event</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                );

                return (
                  <SwiperSlide key={item.id || idx} className="h-auto pb-2">
                    {item.url ? (
                      <Link href={item.url} className="block h-full cursor-pointer">
                        {CardContent}
                      </Link>
                    ) : (
                      <div className="h-full">{CardContent}</div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

export default InternationalEvent;

