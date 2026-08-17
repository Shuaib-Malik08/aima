"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Script from "next/script";
import "swiper/css";

const getEmbedIframe = (url: string, id: number | string) => {
  if (!url) return "";
  if (url.trim().startsWith("<iframe")) {
    return url;
  }
  let shortcode = url.trim();
  if (shortcode.includes("instagram.com")) {
    const match = shortcode.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
    if (match && match[1]) {
      shortcode = match[1];
    }
  }
  const embedUrl = `https://www.instagram.com/reel/${shortcode}/embed/?cr=1&v=14`;
  return `<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-${id}"
    src="${embedUrl}"
    allowtransparency="true"
    allowfullscreen="true"
    frameborder="0"
    height="600"
    scrolling="no"
    style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
  </iframe>`;
};

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    iframe: `<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-0"
      src="https://www.instagram.com/reel/C_NSFpvy4b8/embed/?cr=1&v=14"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="600"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
  {
    id: 2,
    iframe: `<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-1"
      src="https://www.instagram.com/reel/C9p00RySXhR/embed/?cr=1&v=14"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="600"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
  {
    id: 3,
    iframe: `<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-2"
      src="https://www.instagram.com/reel/C-kQMK2y5Cj/embed/?cr=1&v=14"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="600"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
  {
    id: 4,
    iframe: `<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-3"
      src="https://www.instagram.com/reel/C-KrYivSFu1/embed/?cr=1&v=14"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="600"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
  {
    id: 5,
    iframe: `<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-4"
      src="https://www.instagram.com/reel/C9zKQo3SHWD/embed/?cr=1&v=14"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="600"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
  {
    id: 6,
    iframe: `<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-5"
      src="https://www.instagram.com/reel/C-W7KvwS6Ue/embed/?cr=1&v=14"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="600"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
];

function FeatureManagement({ block }: { block?: any } = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState("");
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const testimonialsList =
    block?.data && Array.isArray(block.data) && block.data.length > 0
      ? block.data.map((item: any, idx: number) => ({
          id: item.id || idx + 1,
          iframe: getEmbedIframe(item.url, item.id || idx),
        }))
      : DEFAULT_TESTIMONIALS;

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };
  return (
    <>
      {/* Testimonials Section */}
      <section
        className={`overflow-hidden ${
          block?.sub_module?.includes("aspirant-testing-and-assessment")
            ? "pb-20  "
            : "bg-gray-50/50  py-20  "
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            {block?.title ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: block.title.replace(/className=/g, "class="),
                }}
              />
            ) : (
              <h2 className="font-playfair-display font-semibold text-[40px] md:text-[56px] text-black">
                Testimonials
              </h2>
            )}
          </div>
          <Script async src="https://www.instagram.com/embed.js" />
          <div className="relative flex items-center justify-center px-12">
            <button
              onClick={handlePrev}
              className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={32}
              slidesPerView={1}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setCurrentIndex(swiper.realIndex);
              }}
              // autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="max-w-5xl w-full"
            >
              {testimonialsList.map((item: any, idx: number) => (
                <SwiperSlide key={idx} className="pb-4">
                  <div dangerouslySetInnerHTML={{ __html: item?.iframe }} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={handleNext}
              className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsList.map((_: any, idx: number) => (
              <span
                key={idx}
                onClick={() => {
                  swiperRef.current?.slideToLoop(idx);
                  setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  currentIndex === idx
                    ? "bg-[#184D91] scale-110"
                    : "border border-gray-500 bg-transparent"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isPlaying && activeVideoId && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300"
          onClick={() => {
            setIsPlaying(false);
            setActiveVideoId("");
          }}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveVideoId("");
              }}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Video wrapper */}
            <div className="aspect-video w-full relative bg-black">
              {isVideoLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
                  <div className="w-12 h-12 border-4 border-[#D9A32B] border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-white/70 text-xs font-semibold tracking-wider uppercase">
                    Loading Video...
                  </p>
                </div>
              )}
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="AIMA Testimonial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                onLoad={() => setIsVideoLoading(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FeatureManagement;
