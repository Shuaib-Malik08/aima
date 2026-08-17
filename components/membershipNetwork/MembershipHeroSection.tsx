import Image from "next/image";
function MembershipHeroSection({ block }: any) {
  const bannerData = block?.data?.banners?.[0];

  const bannerImage =
    bannerData?.image ?? "membership-img/membership-banner.png";

  return (
    <>
      <section className="relative w-full h-[350px] lg:h-[500px] flex items-center overflow-hidden [border-radius:0]">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={bannerData?.image}
            alt={bannerData?.title}
            className="w-full h-full object-cover object-center block "
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
                <div dangerouslySetInnerHTML={{ __html: bannerData?.title }} />
                <div
                  dangerouslySetInnerHTML={{
                    __html: bannerData?.description,
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

export default MembershipHeroSection;
