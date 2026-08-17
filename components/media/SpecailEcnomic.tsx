"use client";
import Link from "next/link";

function SpecailEcnomic({ block }: { block: any }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date
        .toLocaleDateString("en-US", { month: "short" })
        .toUpperCase();
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="bg-[#1f4f8f] py-20" id="Special-Economic-Times">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center gap-5 mb-8">
          {block?.description ? (
            <div dangerouslySetInnerHTML={{ __html: block.description }} />
          ) : (
            <div>
              <h2 className="text-black text-[32px] md:text-[56px] font-[900] font-heading">
                Special Economic
                <span className="text-[#E4AB25]">Times Supplements</span>
              </h2>
            </div>
          )}

          <div className="md:text-right md:ms-11">
            <Link
              href="/media-center/media-listing?type=special-economic-times-supplements"
              className="inline-block bg-[#0D478B] border border-white text-white px-6 py-4 rounded-full text-sm font-semibold shadow-md 
                              hover:scale-105 hover:shadow-xl transition duration-300"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {(block?.data || []).map((item: any) => {
            const linkHref = item.pdf_file
              ? item.pdf_file
              : `/media-center/${item.slug}`;
            const targetProps = item.pdf_file
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};
            const imageSrc = item?.image || "/fallbackImg.jpeg";

            return (
              <Link
                key={item.id}
                href={linkHref}
                {...targetProps}
                className="bg-[#224f8a] rounded-2xl border-2 border-yellow-400 overflow-hidden flex flex-col hover:border-yellow-300 hover:scale-[1.01] transition duration-300 group cursor-pointer"
              >
                <img
                  src={imageSrc}
                  onError={(e) => {
                    e.currentTarget.src = "/fallbackImg.jpeg";
                  }}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition duration-300"
                  alt={item.title}
                />

                <div className="p-5 flex flex-col flex-1 text-white">
                  <h3 className="text-xl mb-3 leading-snug group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                      {formatDate(item.publish_date)}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-white group-hover:text-yellow-400 transition-colors font-medium">
                      Learn More
                      <span className="border border-white group-hover:border-yellow-400 rounded-md px-2 py-1">
                        →
                      </span>
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

export default SpecailEcnomic;
