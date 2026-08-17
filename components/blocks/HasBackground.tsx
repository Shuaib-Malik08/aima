import Image from "next/image";

function HasBackground({ data }: any) {
  return (
    <>
      <section className="bg-white w-full">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 w-full">
            <div className="bg-[#0D478B] text-white p-12 flex flex-col justify-center">
              <div dangerouslySetInnerHTML={{ __html: data.description }}></div>

              <div dangerouslySetInnerHTML={{ __html: data.detail }}></div>
            </div>

            <div className="h-75 md:h-105 lg:h-auto">
              <Image
                src={data.bg_photo}
                alt="img"
                className="w-full h-full object-cover"
                priority
                height={500}
                width={500}
                // fill
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HasBackground;
