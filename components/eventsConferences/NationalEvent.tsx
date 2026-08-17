"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Banner {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  url: string | null;
  sort_order: number;
  status: number;
}

interface BannerData {
  id: number;
  title: string;
  banners: Banner[];
}

interface NationalEventBlock {
  type: string;
  block_style: string;
  name: string;
  title: string | null;
  description: string | null;
  data: BannerData | any;
}

// Function to dynamically generate colors (excluding reds/oranges for contrast/aesthetics)
function dynamicColorChange() {
  let hue;

  do {
    hue = Math.floor(Math.random() * 360);
  } while ((hue >= 0 && hue <= 30) || (hue >= 330 && hue <= 360));

  return `hsl(${hue}, 80%, 30%)`;
}

function NationalEvent({ block }: { block: NationalEventBlock }) {
  const eyebrow = block?.title;
  const headingHtml = block?.title;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Normalize banners/events into a common structure
  const items = React.useMemo(() => {
    return Array.isArray(block?.data)
      ? block.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          url: item.slug
            ? `/events/national-event/${item.slug}`
            : item.url || null,
        }))
      : (block?.data?.banners ?? []).map((banner: any) => ({
          id: banner.id,
          title: banner.title,
          url: banner.url
            ? banner.url.replace("/events/", "/events/national-event/")
            : null,
        }));
  }, [block?.data]);

  // Generate stable dynamic colors for the items to avoid flickering on re-renders (e.g. during hover)
  const itemColors = React.useMemo(() => {
    return items.map(() => dynamicColorChange());
  }, [items]);

  // Clean the title (e.g., "Dynamic National Events" -> "National Events")
  const rawTitle =
    (!Array.isArray(block?.data) && block?.data?.title) ||
    block?.name ||
    "National Events";
  const mainTitle = rawTitle.replace(/^Dynamic\s+/i, "");
  // console.log("three are items: " + items);
  // console.log("Full Data:", block?.data);
  // console.log("Items Count:", items.length);
  // console.log("All Items:", items);
  return (
    <section className="bg-white  py-20">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 m-auto "
        id="nationalevents"
      >
        {/* Header */}
        <div className="relative flex flex-col items-center gap-4 pb-5">
          {eyebrow && (
            <div
              dangerouslySetInnerHTML={{
                __html: eyebrow,
              }}
            />
          )}

          {/* RIGHT BUTTON */}
          <div className=" md:block md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2">
            <Link href="/events/event-listing?type=national">
              <button className="border-2 border-[#0D478B] text-[#0D478B] px-6 py-4 rounded-full text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl hover:bg-[#0D478B] hover:text-white transition duration-300 cursor-pointer">
                View All
              </button>
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  ">
          {items.slice(0, 8).map((item: any, index: number) => {
            const color = itemColors[index] || "hsl(210, 80%, 30%)";
            const number = String(index + 1).padStart(2, "0");

            // Every 4th column (last in a row) gets no right border on lg
            const isLastInRow = (index + 1) % 4 === 0;
            // Second row onwards gets top margin
            const isSecondRow = index >= 4;

            const cardClasses = [
              "flex items-start gap-5 px-6 py-10 border-gray-300 transition-all duration-300 group",
              !isLastInRow ? "lg:border-r-2" : "",
              isSecondRow ? "mt-8" : "",
              item.url ? "hover:bg-gray-50/50 cursor-pointer" : "",
            ]
              .filter(Boolean)
              .join(" ");

            const CardContent = (
              <>
                {/* Number + underline */}
                <div className="flex flex-col items-center shrink-0">
                  <h3
                    className="text-[42px] font-light leading-none transition-transform duration-300 group-hover:scale-105"
                    style={{ color }}
                  >
                    {number}
                  </h3>
                  <div
                    className="w-[30px] h-1 mt-3 rounded transition-transform duration-300 group-hover:scale-x-110"
                    style={{ backgroundColor: color }}
                  />
                </div>

                {/* Vertical divider */}
                <div className="w-[2px] h-[90px] bg-gray-300 shrink-0" />

                <div>
                  <p
                    className="text-[17px] leading-7 text-gray-800 font-medium transition-colors duration-300"
                    style={{
                      color: hoveredIndex === index ? color : undefined,
                    }}
                  >
                    {item?.title.split(" ").slice(0, 6).join(" ") + "..."}
                  </p>
                </div>
              </>
            );

            if (item.url) {
              return (
                <Link
                  href={item.url}
                  key={item.id}
                  className={cardClasses}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                className={cardClasses}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NationalEvent;
