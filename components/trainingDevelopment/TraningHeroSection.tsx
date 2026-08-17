import Image from "next/image";
interface Banner {
  id: number;
  banner_setting_id: number;
  title: string;
  image: string;
  description: string | null;
  detail_text: string | null;
  url: string | null;
  sort_order: number;
  status: number;
  created_at: string;
  updated_at: string;
}

interface BannerData {
  id: number;
  title: string;
  type: string;
  width: number;
  height: number;
  has_description: number;
  has_url: number;
  status: number;
  created_at: string;
  updated_at: string;
  banners: Banner[];
}

interface TraningHeroBlock {
  type: string;
  block_style: string;
  name: string;
  module_code: string | null;
  sub_module: string[] | null;
  title: string | null;
  description: string | null;
  detail: string | null;
  bg_photo: string | null;
  data: BannerData;
}

function TraningHeroSection({ block }: { block?: TraningHeroBlock }) {
  const banner = block?.data?.banners?.[0];
  const bgImage =
    banner?.image ??
    "https://aima.sanntra.com/administrator/public/storage/files/1/sdfgsd.png";
  const fullTitle =
    banner?.title ?? block?.data?.title ?? "Training & Development";
  const description =
    banner?.description ??
    "Building management skills and leadership competencies through quality training and development programs.";

  return (
    <>
      <section className="relative w-full h-[350px] lg:h-[500px] flex items-center overflow-hidden [border-radius:0]">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={bgImage}
            alt={fullTitle}
            className="w-full h-full object-cover object-center block [border-radius:0]"
            loading="eager"
            width={1000}
            height={500}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_30%,rgba(0,0,0,0)_70%,rgba(0,0,0,0)_100%)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 ">
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] ">
            <div className="item">
              <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl text-left">
                <div dangerouslySetInnerHTML={{ __html: fullTitle }} />
                <div
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TraningHeroSection;
