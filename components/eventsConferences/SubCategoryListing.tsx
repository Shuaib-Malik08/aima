import React from "react";
import Link from "next/link";

interface SubCategoryItem {
  id: number;
  name: string;
  slug: string;
  banner_detail?: string | null;
  description?: string | null;
  sub_type?: string | null;
  type?: string | null;
  image?: string | null;
  status?: number;
  meta_title?: string | null;
}

interface SubCategoryListingProps {
  block?: {
    type?: string;
    block_style?: string | null;
    name?: string;
    module_code?: string | null;
    title?: string | null;
    description?: string | null;
    data?: SubCategoryItem[];
  };
}

const FALLBACK_IMAGES = [
  "/EventsIMG2/InternationalE1.png",
  "/EventsIMG2/InternationalE2.png",
  "/EventsIMG2/InternationalE3.png",
];

// Helper to strip HTML tags for card excerpt
function extractTextSnippet(html?: string | null): string {
  if (!html) return "Explore key takeaways, discussions, executive panels, and global innovations from this event.";
  // Strip out HTML tags
  const text = html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
  // Remove "About — [Name]" if present at start
  const cleaned = text.replace(/^About\s*—\s*[^.]*?\.\s*/i, "").trim();
  return cleaned || "Explore key takeaways, discussions, executive panels, and global innovations from this event.";
}

export default function SubCategoryListing({ block }: SubCategoryListingProps) {
  const items = Array.isArray(block?.data) ? block.data : [];

  if (items.length === 0) return null;

  return (
    <section id="events" className="bg-[#E9F2FF] py-20 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 relative z-1">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-center text-[#1a202c] mb-14 wow animate__animated animate__fadeInDown"
          data-wow-duration="1s"
        >
          Previous <span className="text-[#E3AB26]">Events</span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {items.map((item, index) => {
            const fallbackImg = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
            const eventType = item.type
              ? item.type.endsWith("-event")
                ? item.type
                : `${item.type}-event`
              : "international-event";

            const snippet = extractTextSnippet(item.description);

            return (
              <div
                key={item.id || index}
                className="bg-white rounded-xl border-b-4 border-[#E3AB26] overflow-hidden wow animate__animated animate__fadeInUp transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
                data-wow-duration="1s"
                data-wow-delay={`${(index % 3) * 0.1 + 0.1}s`}
              >
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={item.image || fallbackImg}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="px-6 pt-4 pb-7 flex flex-col flex-grow justify-between text-left">
                  <div>
                    {/* Meta Data */}
                    <div className="flex flex-wrap items-center justify-between text-sm text-[#1a202c] mb-4 gap-3">
                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.1em"
                          height="1.1em"
                          viewBox="0 0 24 24"
                          className="shrink-0"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <g fill="#0f3d7a">
                            <path d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />
                            <path
                              fillRule="evenodd"
                              d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827q.39.03.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238q.35-.046.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71q-.034.255-.058.539h18.336q-.024-.284-.058-.54c-.135-1.005-.389-1.585-.812-2.008s-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008s-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812s-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z"
                              clipRule="evenodd"
                            />
                          </g>
                        </svg>
                        <span className="text-xs text-gray-500">October 7, 2024</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.1em"
                          height="1.1em"
                          viewBox="0 0 24 24"
                          className="shrink-0"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="#0f3d7a"
                            d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4m0-6c1.103 0 2 .897 2 2s-.897 2-2 2s-2-.897-2-2s.897-2 2-2"
                          />
                          <path
                            fill="#0f3d7a"
                            d="M11.42 21.814a1 1 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819M12 4c3.309 0 6 2.691 6 6.005c.021 4.438-4.388 8.423-6 9.73c-1.611-1.308-6.021-5.294-6-9.735c0-3.309 2.691-6 6-6"
                          />
                        </svg>
                        <span className="text-xs text-gray-500">New York, NY 10118, US</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-[#0f3d7a] mb-3 leading-snug">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-[15px] leading-relaxed mb-6 font-normal line-clamp-3">
                      {snippet}
                    </p>
                  </div>

                  {/* View More Link */}
                  <div>
                    <Link
                      href={`/events/${eventType}/${item.slug}`}
                      className="inline-flex items-center text-[#0f3d7a] font-bold text-sm hover:opacity-80 transition-opacity group"
                    >
                      <span>View More</span>
                      <span className="ml-2 bg-[#0f3d7a] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] group-hover:translate-x-1 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 1024 1024"
                        >
                          <path d="M0 0h1024v1024H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="M754.8 480H160a32 32 0 1 0 0 64h594.8L521.3 777.3a32 32 0 0 0 45.4 45.4l288-288a32 32 0 0 0 0-45.4l-288-288a32 32 0 1 0-45.4 45.4z"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
