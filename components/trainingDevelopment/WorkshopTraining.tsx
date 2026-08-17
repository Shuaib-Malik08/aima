// "use client";

// import React, { useRef } from "react";
// import Link from "next/link";
// import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";

// interface EventItem {
//   id: number;
//   title: string;
//   sub_title: string | null;
//   event_date: string;
//   status: string;
//   is_home: boolean;
//   event_location: string | null;
//   venue: string | null;
//   event_type: string[];
//   short_description: string;
//   contact_details: string | null;
//   event_image: string | null;
//   cta: any;
//   sponsors: any;
//   slug: string;
// }

// interface WorkshopBlock {
//   type: "dynamic";
//   block_style: string;
//   name: string;
//   module_code: string;
//   sub_module?: string[] | null;
//   title: string | null;
//   description: string | null;
//   detail: string | null;
//   bg_photo: string | null;
//   data: EventItem[];
// }

// const FALLBACK_IMAGES = [
//   "https://aima.sanntra.com/administrator/public/storage/files/1/Training-Development/Workshop1.png",
//   "https://aima.sanntra.com/administrator/public/storage/files/1/Training-Development/Workshop2.png",
//   "https://aima.sanntra.com/administrator/public/storage/files/1/Training-Development/Workshop3.png",
//   "https://aima.sanntra.com/administrator/public/storage/files/1/Training-Development/Workshop4.png",
// ];

// export default function WorkshopTraining({ block }: { block: WorkshopBlock }) {
//   const swiperRef = useRef<any>(null);
//   const items = block?.data || [];

//   const handlePrev = () => {
//     swiperRef.current?.slidePrev();
//   };

//   const handleNext = () => {
//     swiperRef.current?.slideNext();
//   };

//   // Safe header parsing logic for truncated backend HTML strings
//   const renderHeader = () => {
//     if (block?.title && !block.title.includes("font-head")) {
//       return (
//         <div
//           className="relative mb-14 text-center"
//           dangerouslySetInnerHTML={{ __html: block.title }}
//         />
//       );
//     }

//     return (
//       <div className="relative mb-14 text-center">
//         <p className="tracking-widest uppercase text-xs text-gray-500 mb-2">
//           Open and In-Company Programmes for Working Professionals
//         </p>
//         <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
//           Workshops and <span className="text-[#E4AB25]">Trainings</span>
//         </h2>
//       </div>
//     );
//   };

//   if (!items || items.length === 0) {
//     return null;
//   }

//   const isCarousel = block?.block_style === "carousel";

//   const renderCardContent = (item: EventItem, index: number) => {
//     const imageUrl =
//       item.event_image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

//     // Format date beautifully if present
//     let formattedDate = "";
//     if (item.event_date) {
//       try {
//         formattedDate = new Date(item.event_date).toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//           year: "numeric",
//         });
//       } catch (e) {
//         formattedDate = item.event_date;
//       }
//     }

//     return (
//       // <Link href={`/events/workshop-training/${item.slug}`}>
//       //   <div className="relative rounded-xl overflow-hidden group aspect-[4/5] bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
//       //     <img
//       //       src={imageUrl}
//       //       alt={item.title}
//       //       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-white"
//       //       loading="lazy"
//       //     />

//       //     {/* Hover Gradient Overlay */}
//       //     <div className="absolute inset-0 bg-black/60 group-hover:bg-black/75 transition-colors duration-300 flex flex-col justify-end p-5 text-left" />

//       //     {/* Dynamic Details Overlay Container */}
//       //     <div className="absolute inset-0 p-5 flex flex-col justify-end text-left z-10">
//       //       <div className="mb-auto">
//       //         {formattedDate && (
//       //           <span className="inline-block bg-[#E4AB25] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
//       //             {formattedDate}
//       //           </span>
//       //         )}
//       //       </div>
//       //       <div>
//       //         <h3 className="text-white text-base md:text-lg font-semibold font-heading mb-3 line-clamp-2 leading-snug group-hover:text-[#E4AB25] transition-colors duration-300">
//       //           {item.title}
//       //         </h3>

//       //         {(item.event_location || item.venue) && (
//       //           <p className="text-gray-300 text-xs mb-4 flex items-center gap-1.5 font-medium">
//       //             <MapPin className="w-3.5 h-3.5 text-[#E4AB25] shrink-0" />
//       //             <span className="truncate">
//       //               {[item.venue, item.event_location]
//       //                 .filter(Boolean)
//       //                 .join(" - ")}
//       //             </span>
//       //           </p>
//       //         )}

//       //         <Link
//       //           href={`/events/workshop-training/${item.slug}`}
//       //           className="inline-block border border-white text-white px-5 py-2 rounded-md transition duration-300 hover:bg-[#0D478B] hover:border-[#0D478B] text-sm font-semibold cursor-pointer"
//       //         >
//       //           Know More →
//       //         </Link>
//       //       </div>
//       //     </div>
//       //   </div>
//       // </Link>

//       <Link
//         href={`/events/workshop-training/${item.slug}`}
//         className="block h-full"
//       >
//         <div className="relative rounded-2xl overflow-hidden group aspect-[4/5] bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
//           {/* Image */}
//           <div className="absolute inset-0">
//             <img
//               src={imageUrl}
//               alt={item.title}
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
//               loading="lazy"
//             />
//             {/* Dark Overlay for Text Readability */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
//           </div>

//           {/* Content */}
//           <div className="absolute inset-0 p-6 flex flex-col justify-between">
//             {/* Top - Date Badge */}
//             {formattedDate && (
//               <div className="flex justify-start">
//                 <span className="bg-[#E4AB25] text-black text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
//                   {formattedDate}
//                 </span>
//               </div>
//             )}

//             {/* Bottom - Details */}
//             <div className="space-y-3">
//               {/* Title */}
//               <h3 className="text-white text-xl font-bold leading-tight line-clamp-2 drop-shadow-lg">
//                 {item.title}
//               </h3>

//               {/* Location */}
//               {(item.event_location || item.venue) && (
//                 <div className="flex items-center gap-2 text-white/90 text-sm">
//                   <MapPin className="w-4 h-4 text-[#E4AB25] shrink-0" />
//                   <span className="truncate">
//                     {[item.venue, item.event_location]
//                       .filter(Boolean)
//                       .join(" • ")}
//                   </span>
//                 </div>
//               )}

//               {/* CTA Button */}
//               <div className="pt-2">
//                 <span className="inline-flex items-center gap-2 bg-[#E4AB25] text-black px-5 py-2 rounded-full font-semibold text-sm hover:bg-white transition-colors duration-300 cursor-pointer">
//                   Know More
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Hover Border Effect */}
//           <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#E4AB25]/60 transition-all duration-300 pointer-events-none" />
//         </div>
//       </Link>
//     );
//   };

//   return (
//     <section className="pb-11 px-4 md:px-12 py-12">
//       <div className="max-w-7xl mx-auto" id="Workshops-and-Trainings">
//         {renderHeader()}
//         {isCarousel && items.length > 1 ? (
//           <div className="relative px-0 md:px-12">
//             {/* Custom navigation buttons */}
//             <button
//               onClick={handlePrev}
//               aria-label="Previous workshop"
//               className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-3 border border-gray-100 hover:scale-110 active:scale-95 transition-all cursor-pointer items-center justify-center w-11 h-11"
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-700" />
//             </button>

//             <button
//               onClick={handleNext}
//               aria-label="Next workshop"
//               className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-3 border border-gray-100 hover:scale-110 active:scale-95 transition-all cursor-pointer items-center justify-center w-11 h-11"
//             >
//               <ChevronRight className="w-5 h-5 text-gray-700" />
//             </button>

//             <Swiper
//               modules={[Navigation, Autoplay]}
//               spaceBetween={20}
//               slidesPerView={1}
//               loop={items.length > 4}
//               autoplay={{ delay: 5000, disableOnInteraction: false }}
//               onBeforeInit={(swiper) => {
//                 swiperRef.current = swiper;
//               }}
//               breakpoints={{
//                 640: {
//                   slidesPerView: 2,
//                 },
//                 768: {
//                   slidesPerView: 3,
//                 },
//                 1024: {
//                   slidesPerView: 4,
//                 },
//               }}
//               className="w-full"
//             >
//               {items.map((item, index) => (
//                 <SwiperSlide key={item.id} className="py-2">
//                   {renderCardContent(item, index)}
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         ) : (
//           /* Grid fallback */
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {items.map((item, index) => (
//               <div key={item.id}>{renderCardContent(item, index)}</div>
//             ))}
//           </div>
//         )}
//         <div className="flex justify-center md:justify-end mt-8">
//           <Link
//             href="/events/event-listing?type=workshop-training"
//             className="bg-[#0D478B] text-white px-6 py-2.5 rounded-md hover:bg-blue-900 transition font-semibold text-sm cursor-pointer shadow"
//           >
//             View All →
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

interface EventItem {
  id: number;
  title: string;
  sub_title: string | null;
  event_date: string;
  status: string;
  is_home: boolean;
  event_location: string | null;
  venue: string | null;
  event_type: string[];
  short_description: string;
  contact_details: string | null;
  event_image: string | null;
  cta: any;
  sponsors: any;
  slug: string;
}

interface WorkshopBlock {
  type: "dynamic";
  block_style: string;
  name: string;
  module_code: string;
  sub_module?: string[] | null;
  title: string | null;
  description: string | null;
  detail: string | null;
  bg_photo: string | null;
  data: EventItem[];
}

const FALLBACK_IMAGES = [
  "https://aima.sanntra.com/administrator/public/storage/files/1/Training-Development/Workshop1.png",
  "https://aima.sanntra.com/administrator/public/storage/files/1/Training-Development/Workshop2.png",
  "https://aima.sanntra.com/administrator/public/storage/files/1/Training-Development/Workshop3.png",
  "https://aima.sanntra.com/administrator/public/storage/files/1/Training-Development/Workshop4.png",
];

export default function WorkshopTraining({ block }: { block: WorkshopBlock }) {
  const items = block?.data || [];

  // Safe header parsing logic for truncated backend HTML strings
  const renderHeader = () => {
    if (block?.title && !block.title.includes("font-head")) {
      return (
        <div
          className="relative mb-12 text-center"
          dangerouslySetInnerHTML={{ __html: block.title }}
        />
      );
    }

    return (
      <div className="relative text-center mb-12  max-w-3xl mx-auto px-4">
        <p className="mb-3 text-sm   uppercase " style={{ color: "#4b4b4b" }}>
          Open and In-Company Programmes for Working Professionals
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
          Workshops and <span className="text-[#E4AB25]">Trainings</span>
        </h2>
      </div>
    );
  };

  if (!items || items.length === 0) {
    return null;
  }

  const renderCardContent = (item: EventItem, index: number) => {
    const imageUrl =
      item.event_image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

    // Format date beautifully if present
    let formattedDate = "";
    if (item.event_date) {
      try {
        formattedDate = new Date(item.event_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } catch (e) {
        formattedDate = item.event_date;
      }
    }

    return (
      <Link
        href={`/events/workshop-training/${item.slug}`}
        className="block group"
      >
        <div className="relative h-[240px] rounded-xl overflow-hidden  shadow-md hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 flex flex-col">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>

          {/* Smooth Dark Gradient Overlay */}
          {/* <div className="absolute left-0 top-0 w-full h-full bg-[#0000004f]  z-[19]" /> */}
          <div
            className="absolute inset-0 bg-amber-200"
            style={{ backgroundColor: "#00000066" }}
          />

          {/* Content Wrapper */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between z-20">
            {/* Top - Date Badge */}
            {formattedDate && (
              <div className="flex justify-start">
                <span className="bg-[#E4AB25] text-black text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {formattedDate}
                </span>
              </div>
            )}

            {/* Bottom - Details */}
            <div className="space-y-2.5">
              {/* Title - adjusted font size and line clamp for 240px height */}
              <h3 className="text-white mb-4 text-base sm:text-lg font-bold leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#E4AB25]">
                {item.title}
              </h3>

              {/* Location
              {(item.event_location || item.venue) && (
                <div className="flex items-center gap-1.5 text-white/80 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#E4AB25] shrink-0" />
                  <span className="truncate font-medium">
                    {[item.venue, item.event_location]
                      .filter(Boolean)
                      .join(" • ")}
                  </span>
                </div>
              )} */}

              {/* CTA Link Style */}
              <div className="pt-0.5">
                <span className="inline-flex items-center gap-1.5 text-[#E4AB25] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors duration-300">
                  Know More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>

          {/* Golden Border Highlight on Hover */}
          {/* <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#E4AB25]/30 transition-all duration-500 pointer-events-none z-30" /> */}
        </div>
      </Link>
    );
  };

  return (
    <section className="bg-gray-50  py-20 px-4 sm:px-6 md:px-12 lg:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto" id="Workshops-and-Trainings">
        {renderHeader()}

        {/* Grid Layout with specific card heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div key={item.id}>{renderCardContent(item, index)}</div>
          ))}
        </div>

        {/* View All Button Wrapper */}
        <div className="flex justify-center md:justify-end mt-10">
          <Link
            href="/events/event-listing?type=workshop-training"
            className="cursor-pointer  flex flex-row gap-2 flex-nowrap   bg-[#0D4A8C] text-white px-6 py-3 rounded-md   items-center  font-semibold hover:bg-[#08396d]"
          >
            View All
            <ArrowRight className=" h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
