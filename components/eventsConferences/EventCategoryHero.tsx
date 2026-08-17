import React from "react";

interface EventCategoryHeroProps {
  block?: {
    type?: string;
    name?: string;
    title?: string | null;
    description?: string | null;
    detail?: string | null;
  };
  categoryTitle?: string;
}

export default function EventCategoryHero({
  block,
  categoryTitle = "International Events",
}: EventCategoryHeroProps) {
  const isInternational =
    !categoryTitle || categoryTitle.toLowerCase().includes("international");

  return (
    <>
      {/* Banner Section */}
      <section className="relative overflow-hidden">
        <img
          src="/EventsIMG2/EventBanner.png"
          alt="Banner"
          className="h-auto min-h-[400px] w-full object-cover object-right md:min-h-[500px]"
        />

        <div className="absolute inset-0 flex items-center bg-black/10 md:bg-transparent">
          <div className="mx-auto w-full max-w-7xl px-8 md:px-12 lg:px-20">
            <div
              className="max-w-[620px] wow animate__animated animate__fadeInLeft"
              data-wow-duration="1s"
            >
              <h1 className="text-4xl font-heading font-semibold leading-tight text-[#06447e] sm:text-5xl md:text-[58px]">
                {isInternational ? (
                  <>
                    International <span className="text-[#efa900]">Events</span>
                  </>
                ) : (
                  <>
                    {categoryTitle}{" "}
                    <span className="text-[#efa900]">Events</span>
                  </>
                )}
              </h1>

              <p className="mt-3 text-base text-[#202020] md:text-[17px]">
                Going Beyond Indian Shores
              </p>

              <a
                href="#events"
                className="mt-5 inline-flex items-center justify-center rounded-[4px] bg-[#efa900] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#d99500] wow animate__animated animate__fadeInUp shadow-md"
                data-wow-delay="0.2s"
              >
                View Our Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-[url('/images/worldmap.svg')] bg-no-repeat bg-top bg-cover pt-0 pb-16 relative px-4">
        <div className="bg-white/90 absolute left-0 top-0 w-full h-full z-0 pointer-events-none" />

        <div className="max-w-5xl mx-auto p-6 lg:p-12 bg-white rounded-xl shadow-xl z-10 relative -mt-16 lg:-mt-28 border border-gray-100">
          <div className="content-wrapper">
            {/* ICON */}
            <div
              className="icon max-w-[60px] lg:max-w-[100px] wow animate__animated animate__zoomIn"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-md"
              >
                <circle cx="50" cy="50" r="50" fill="#0C478B" />
                <path
                  d="M10 43.8214C11.2211 42.2074 11.1665 40.1758 11.7319 38.3541C17.3793 20.1097 35.6774 7.96637 54.1584 10.2834C74.1021 12.783 89.2728 28.7838 89.9706 48.0608C90.6936 67.9737 77.2863 85.2821 58.1265 89.2655C57.0756 89.4754 55.8146 88.8457 54.9949 90.0043H43.7462C43 88.9045 41.7095 89.1921 40.6902 88.9171C25.7886 84.9001 16.0994 75.504 11.4397 60.8674C10.9563 59.3479 11.053 57.6458 10 56.3068V43.8214ZM86.2946 50.2456C86.366 30.1543 70.2328 13.8785 50.1839 13.8135C30.0636 13.7484 13.7664 29.8563 13.7033 49.8699C13.6403 69.957 29.7819 86.2433 49.814 86.3063C69.9364 86.3671 86.2189 70.2719 86.2904 50.2393L86.2946 50.2456Z"
                  fill="white"
                />
                <path
                  d="M58.2821 66.3262C51.838 66.3262 51.4744 65.8455 53.1495 59.5682C53.3366 58.8672 53.5699 58.1809 53.7548 57.4694C54.4631 54.6655 55.6464 51.9833 55.678 49.0073C55.7053 46.3272 54.4169 44.6314 51.9893 43.8696C48.4752 42.7656 45.2342 44.0795 42.0374 45.3597C41.2366 45.6808 41.0622 46.5287 41.2387 47.2129C41.4048 47.8572 42.0963 47.4773 42.5755 47.4227C46.8021 47.0156 47.6912 47.9369 46.7013 52.04C45.8605 55.5659 44.5995 59.0015 43.8618 62.5337C43.0631 66.3262 44.4229 68.6012 47.6281 69.6863C50.6925 70.7209 57.0273 69.2476 58.2211 67.1929C58.3556 66.9957 58.2673 66.6326 58.2821 66.3262ZM59.1228 34.782C59.1543 32.2257 56.7604 30.0598 53.9335 30.0871C51.2327 30.1123 48.9375 32.1082 48.8114 34.5406C48.6832 37.0591 51.0498 39.3531 53.8557 39.4244C56.6616 39.4958 59.0912 37.3173 59.1207 34.782H59.1228Z"
                  fill="white"
                />
              </svg>
            </div>

            {/* HEADING */}
            <h2
              className="font-heading text-[38px] sm:text-[42px] mt-4 font-semibold leading-[1.1] text-black md:text-[52px] lg:text-[58px] wow animate__animated animate__fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.4s"
            >
              About
              <span className="mx-2">—</span>
              <span className="text-[#e9a91a]">
                {isInternational ? "International Event" : `${categoryTitle} Event`}
              </span>
            </h2>

            {/* CONTENT */}
            <div className="mt-6 flex flex-col gap-4 text-gray-700 leading-relaxed text-[15px] sm:text-[16px]">
              {block?.detail && block.detail !== "<p>Hero</p>" ? (
                <div dangerouslySetInnerHTML={{ __html: block.detail }} />
              ) : (
                <>
                  <p
                    className="wow animate__animated animate__fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay="0.6s"
                  >
                    AIMA’s International Events connect business leaders, management
                    professionals, policymakers, academics and global experts on a
                    common platform for knowledge exchange and collaboration.
                    Through international conferences, leadership programmes, global
                    partnerships and delegation visits, AIMA provides valuable
                    exposure to emerging business trends, innovation, technology and
                    international management practices. These initiatives strengthen
                    connections between India and the global business community
                    while encouraging cross-border learning and collaboration.
                  </p>

                  <p
                    className="wow animate__animated animate__fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay="0.8s"
                  >
                    AIMA’s International Events connect business leaders, management
                    professionals, policymakers, academics and global experts on a
                    common platform for knowledge exchange and collaboration.
                    Through international conferences, leadership programmes, global
                    partnerships and delegation visits, AIMA provides valuable
                    exposure to emerging business trends, innovation, technology and
                    international management practices. These initiatives strengthen
                    connections between India and the global business community
                    while encouraging cross-border learning and collaboration.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
