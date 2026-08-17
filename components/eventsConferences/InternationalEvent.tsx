import React from "react";
import Link from "next/link";

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

  return (
    <section className="bg-[#0D478B] py-20 overflow-hidden">
      <div className="container-custom px-4 md:px-12" id={sectionId}>
        {/* Header row */}
        <div className="relative flex flex-col items-center gap-4 mb-12">
          <div>{renderHeader()}</div>

          {/* RIGHT BUTTON */}
          <div className="md:block md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2">
            <Link href={viewAllUrl}>
              <button className="border-2 border-white text-white px-6 py-3.5 rounded-full text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl hover:bg-white hover:text-[#0D478B] transition duration-300 cursor-pointer">
                View All
              </button>
            </Link>
          </div>
        </div>

        {/* Cards grid */}
        {items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 mt-10 lg:grid-cols-3">
            {items.map((item: any) => {
              const CardContent = (
                <>
                  {/* Image */}
                  <div className="h-56 w-full overflow-hidden bg-black/20">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Title */}
                  <div className="my-auto flex items-center justify-center px-6 py-4 min-h-[76px]">
                    <h3 className="text-white text-[18px] font-medium text-center leading-snug group-hover:text-[#E4AB25] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </>
              );

              return item.url ? (
                <Link
                  href={item.url}
                  key={item.id}
                  className="group rounded-xl overflow-hidden shadow-xl border border-white/20 bg-[#0D478B] flex flex-col hover:border-[#E4AB25]/70 hover:shadow-2xl transition duration-300"
                >
                  {CardContent}
                </Link>
              ) : (
                <div
                  key={item.id}
                  className="group rounded-xl overflow-hidden shadow-xl border border-white/20 bg-[#0D478B] flex flex-col"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default InternationalEvent;
