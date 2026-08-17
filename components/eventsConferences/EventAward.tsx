import React from "react";

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

interface EventAwardBlock {
  type: string;
  block_style: string;
  name: string;
  title: string | null;
  description: string | null;
  bg_photo: string | null;
  data: BannerData;
}

// ── Shared trophy SVG ────────────────────────────────────────────────────────
const TrophyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.8681 1.98611H15.8889V0.993056C15.8889 0.729681 15.7843 0.477093 15.598 0.290859C15.4118 0.104625 15.1592 0 14.8958 0H4.96528C4.7019 0 4.44932 0.104625 4.26308 0.290859C4.07685 0.477093 3.97222 0.729681 3.97222 0.993056V1.98611H0.993056C0.729681 1.98611 0.477093 2.09074 0.290859 2.27697C0.104625 2.4632 0 2.71579 0 2.97917V5.95833C0 7.01183 0.418501 8.02218 1.16344 8.76712C1.90837 9.51205 2.91872 9.93056 3.97222 9.93056H5.50153C6.39978 10.9327 7.61084 11.6012 8.9375 11.8273V13.9028H7.94444C7.15432 13.9028 6.39656 14.2167 5.83786 14.7754C5.27915 15.3341 4.96528 16.0918 4.96528 16.8819V18.8681C4.96528 19.1314 5.0699 19.384 5.25614 19.5703C5.44237 19.7565 5.69496 19.8611 5.95833 19.8611H13.9028C14.1662 19.8611 14.4187 19.7565 14.605 19.5703C14.7912 19.384 14.8958 19.1314 14.8958 18.8681V16.8819C14.8958 16.0918 14.582 15.3341 14.0233 14.7754C13.4646 14.2167 12.7068 13.9028 11.9167 13.9028H10.9236V11.8273C12.2503 11.6012 13.4613 10.9327 14.3596 9.93056H15.8889C16.9424 9.93056 17.9527 9.51205 18.6977 8.76712C19.4426 8.02218 19.8611 7.01183 19.8611 5.95833V2.97917C19.8611 2.71579 19.7565 2.4632 19.5703 2.27697C19.384 2.09074 19.1314 1.98611 18.8681 1.98611ZM3.97222 7.94444C3.44547 7.94444 2.9403 7.73519 2.56783 7.36273C2.19536 6.99026 1.98611 6.48508 1.98611 5.95833V3.97222H3.97222V5.95833C3.97441 6.63531 4.09195 7.30696 4.31979 7.94444H3.97222ZM11.9167 15.8889C12.18 15.8889 12.4326 15.9935 12.6189 16.1797C12.8051 16.366 12.9097 16.6186 12.9097 16.8819V17.875H6.95139V16.8819C6.95139 16.6186 7.05601 16.366 7.24225 16.1797C7.42848 15.9935 7.68107 15.8889 7.94444 15.8889H11.9167ZM13.9028 5.95833C13.9028 7.01183 13.4843 8.02218 12.7393 8.76712C11.9944 9.51205 10.9841 9.93056 9.93056 9.93056C8.87706 9.93056 7.86671 9.51205 7.12177 8.76712C6.37683 8.02218 5.95833 7.01183 5.95833 5.95833V1.98611H13.9028V5.95833ZM17.875 5.95833C17.875 6.48508 17.6657 6.99026 17.2933 7.36273C16.9208 7.73519 16.4156 7.94444 15.8889 7.94444H15.5413C15.7692 7.30696 15.8867 6.63531 15.8889 5.95833V3.97222H17.875V5.95833Z"
      fill="#FFFDF9"
    />
  </svg>
);

// ── Image fallback ───────────────────────────────────────────────────────────
function ImagePlaceholder({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#0A2B57] flex items-center justify-center ${className}`}
    >
      <span className="text-white/30 text-sm text-center px-4">{title}</span>
    </div>
  );
}

// ── Small card (grid row) ────────────────────────────────────────────────────
function AwardCard({ banner }: { banner: Banner }) {
  return (
    <div className="bg-[#0A2B57]/90 rounded-[14px] p-2 border border-[#E4AB25]/70 shadow-2xl">
      <div className="relative rounded-[10px] overflow-hidden border border-[#E4AB25]/60">
        <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-[#E4AB25] flex items-center justify-center">
          <TrophyIcon />
        </div>

        {banner.image ? (
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-[220px] object-cover"
          />
        ) : (
          <ImagePlaceholder title={banner.title} className="w-full h-[220px]" />
        )}

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#071B3B] via-[#071B3B]/90 to-transparent pt-20 pb-5 px-4 text-center">
          <div className="w-16 h-[2px] bg-[#E4AB25] mx-auto mb-2" />
          <h3 className="text-[18px] font-medium leading-7 text-white">
            {banner.title} sdsd
          </h3>
        </div>
      </div>
    </div>
  );
}

// ── Featured card (full-width) ────────────────────────────────────────────────
function FeaturedAwardCard({ banner }: { banner: Banner }) {
  return (
    <div className="bg-[#0A2B57]/90 rounded-[16px] p-3 border border-[#E4AB25]/70 shadow-2xl">
      <div className="relative rounded-[14px] overflow-hidden border border-[#E4AB25]/60">
        <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-[#E4AB25] flex items-center justify-center">
          <TrophyIcon />
        </div>

        {banner.image ? (
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-[380px] object-cover"
          />
        ) : (
          <ImagePlaceholder title={banner.title} className="w-full h-[380px]" />
        )}

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#071B3B] via-[#071B3B]/90 to-transparent pt-20 pb-8 px-6 text-center">
          <div className="w-20 h-[2px] bg-[#E4AB25] mx-auto mb-5" />
          <h3 className="text-[22px] md:text-[28px] font-medium text-white">
            {banner.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
function EventAward({ block }: { block: EventAwardBlock }) {
  const eyebrow = block?.title;
  const headingHtml = block?.description;
  const bgPhoto = block?.bg_photo;
  const banners = block?.data?.banners ?? [];

  // Layout rule: last banner → featured full-width card; rest → 3-col grid
  const gridBanners = banners.slice(0, -1);
  const featuredBanner = banners[banners.length - 1] ?? null;

  return (
    <section className="relative py-16 px-4 md:px-12 text-white mb-10">
      {/* Background */}
      <div className="absolute inset-0">
        {bgPhoto ? (
          <img src={bgPhoto} alt="" className="w-full h-full object-cover" />
        ) : (
          <img
            src="EventsIMG2/Awardbg.png"
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          {eyebrow && (
            <p className="tracking-[3px] uppercase text-[11px] text-white/70">
              {eyebrow}
            </p>
          )}

          {headingHtml ? (
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: headingHtml }}
            />
          ) : (
            <h2 className="text-[34px] md:text-[58px] font-[900] font-heading leading-none mt-2">
              {block?.data?.title}
            </h2>
          )}
        </div>

        {/* Grid cards */}
        {gridBanners.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {gridBanners.map((banner) => (
              <AwardCard key={banner.id} banner={banner} />
            ))}
          </div>
        )}

        {/* Featured card */}
        {featuredBanner && <FeaturedAwardCard banner={featuredBanner} />}
      </div>
    </section>
  );
}

export default EventAward;
