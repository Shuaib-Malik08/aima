"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UpcomingEvents({ title, block }: any) {
  const router = useRouter();
  const events = Array.isArray(block?.data) ? block?.data : [];


  return (
    <section className="bg-[#0D478B] py-20">
      <div className="max-w-7xl mx-auto px-6 ">
        <div
          dangerouslySetInnerHTML={{
            __html: block?.title ?? "",
          }}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event: any, index: number) => {
            const formattedDate = event?.event_date
              ? new Date(event.event_date).toLocaleDateString("en-GB")
              : "N/A";

            const isInt = event?.event_type?.some((t: string) => t.toLowerCase() === "international");
            const categoryPath = isInt ? "international-event" : "national-event";
            const cardHref = `/events/${categoryPath}/${event?.slug}`;

            return (
              <Link
                href={cardHref}
                key={event?.id}
                className="group block bg-[#114F97] rounded-2xl overflow-hidden 
                border border-transparent transform transition-all duration-500 ease-out 
                hover:bg-white hover:border-gray-200 
                hover:shadow-2xl hover:-translate-y-4 relative"
              >
                {/* Border Effect */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none
                  border-b-4 border-r-4 border-yellow-400
                  opacity-0 group-hover:opacity-100 transition-all duration-500"
                />

                {/* Image */}
                <img
                  src={event?.event_image || "/fallback.jpg"}
                  alt={event?.title || "event"}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />

                {/* Content */}
                <div className="p-6 relative">
                  {/* Date */}
                  <span className="bg-white text-xs px-3 py-1 rounded-full text-gray-700 group-hover:bg-black group-hover:text-white">
                    {formattedDate}
                  </span>

                  {/* Title */}
                  <h3 className="text-white group-hover:text-gray-900 font-medium text-xl mt-4 transition-colors duration-500 line-clamp-2">
                    {event?.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-gray-600 mt-3 transition-colors duration-500">
                    <div className="rounded-full bg-white p-1 group-hover:bg-[#0D478B]">
                      <svg
                        className="w-4 h-4 text-[#0D478B] group-hover:text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <circle cx="12" cy="11" r="3" />
                      </svg>
                    </div>

                    <span className="text-sm">
                      {event?.event_location || "Location TBD"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
