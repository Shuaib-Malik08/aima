"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

const TESTIMONIALS = [
  {
    id: 1,
    img: "/aimaweb/EducationIMG/testimonial1.png",
    alt: "AIMA Testimonial 1",
    videoId: "ksT2f4NwjsA",
    title: "Executive Program Experience",
    role: "Working Professional",
  },
  {
    id: 2,
    img: "/aimaweb/EducationIMG/testimonial2.png",
    alt: "AIMA Testimonial 2",
    videoId: "ksT2f4NwjsA",
    title: "Leadership Workshop Impact",
    role: "Senior Manager",
  },
  {
    id: 3,
    img: "/aimaweb/EducationIMG/testimonial1.png",
    alt: "AIMA Testimonial 3",
    videoId: "ksT2f4NwjsA",
    title: "Skill Upgradation Success",
    role: "Technical Lead",
  },
  {
    id: 4,
    img: "/aimaweb/EducationIMG/testimonial2.png",
    alt: "AIMA Testimonial 4",
    videoId: "ksT2f4NwjsA",
    title: "Career Transformation Journey",
    role: "Project Manager",
  },
  {
    id: 5,
    img: "/aimaweb/EducationIMG/testimonial1.png",
    alt: "AIMA Testimonial 5",
    videoId: "ksT2f4NwjsA",
    title: "Industry Relevance & Insights",
    role: "Business Consultant",
  },
];

export default function ProfessionalTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState("");
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const handlePlayVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    setIsVideoLoading(true);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <>
      <section className=" py-20 overflow-hidden font-primary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="mb-3 text-xs md:text-sm font-bold uppercase tracking-wider text-gray-500">
              Hear from our learners
            </p>
            <h2 className="font-playfair-display font-semibold text-[36px] md:text-[52px] leading-tight text-black">
              Testimonials
              {/* <span className="text-[#E4AB25]">Testimonials</span> */}
            </h2>
            <div className="w-16 h-1 bg-[#0C478B] mx-auto mt-4 rounded-full" />
          </div>

          {/* Swiper Slider Wrapper */}
          <div className="relative flex items-center justify-center px-4 md:px-12">
            {/* Custom Navigation - Left */}
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-gray-100 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700 group-hover:text-[#0C478B] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setCurrentIndex(swiper.realIndex);
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="max-w-5xl w-full"
            >
              {TESTIMONIALS.map((item, idx) => (
                <SwiperSlide key={item.id} className="pb-6">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
                    {/* Thumbnail Area */}
                    <div
                      onClick={() => handlePlayVideo(item.videoId)}
                      className="relative aspect-video w-full overflow-hidden cursor-pointer bg-black"
                    >
                      <img
                        src={item.img}
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        {/* Play button */}
                        <div className="w-14 h-14 rounded-full bg-white/95 text-[#0C478B] group-hover:bg-[#E4AB25] group-hover:text-black transition-all duration-300 flex items-center justify-center shadow-lg group-hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6 4l10 6-10 6V4z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    {/* <div className="p-6 flex flex-col flex-grow text-left">
                      <h4 className="text-[17px] font-bold text-gray-900 leading-snug group-hover:text-[#0C478B] transition-colors mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium">
                        {item.role}
                      </p>
                    </div> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation - Right */}
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-gray-100 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700 group-hover:text-[#0C478B] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  swiperRef.current?.slideToLoop(idx);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "bg-[#0C478B] scale-110"
                    : "border border-gray-400 bg-transparent hover:bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Lightbox Modal */}
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
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-105 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video Player */}
            <div className="aspect-video w-full relative bg-black">
              {isVideoLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
                  <div className="w-12 h-12 border-4 border-[#E4AB25] border-t-transparent rounded-full animate-spin mb-3" />
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
