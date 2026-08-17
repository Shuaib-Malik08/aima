"use client";
import { Block } from "@/types/blocks.types";
import { useRouter } from "next/navigation";

interface Props {
  block: Block;
}

interface Member {
  name: string;
  image: string;
  role: string;
  department: string;
  slug: string;
}

const resolveImage = (profilePic: string | null): string => {
  if (profilePic) {
    if (profilePic.startsWith("http")) return profilePic;
    let cleanPath = profilePic;
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }
    if (cleanPath.startsWith("public/storage/")) {
      return `https://aima.sanntra.com/administrator/${cleanPath}`;
    }
    if (cleanPath.startsWith("storage/")) {
      return `https://aima.sanntra.com/administrator/public/${cleanPath}`;
    }
    return `https://aima.sanntra.com/administrator/public/storage/${cleanPath}`;
  }
  return "";
};

export default function Secretariat({ block }: Props) {
  const router = useRouter();
  const rawMembers = Array.isArray(block.data) ? block.data : [];

  const parsedMembers: Member[] = [];
  const seenNames = new Set<string>();

  for (const item of rawMembers) {
    if (!item || !item.name) continue;
    const cleanName = item.name.toLowerCase().replace(/[^a-z]/g, "");

    if (!seenNames.has(cleanName)) {
      seenNames.add(cleanName);
      parsedMembers.push({
        name: item.name,
        image: resolveImage(item.profile_pic),
        role:
          item.post_committee_name || item.designation || "Secretariat Member",
        department: item.organisation || "All India Management Association",
        slug: item.slug,
      });
    }
  }

  if (parsedMembers.length === 0) return null;

  return (
    <section className="relative py-16 overflow-hidden" id="AIMA-secretariat">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #114C97 0%, #0B376F 50%, #08284F 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {block.description ? (
          <div
            className="text-center mb-12 font-heading text-white"
            dangerouslySetInnerHTML={{ __html: block.description }}
          />
        ) : (
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
              AIMA <span className="text-[#E4AB25]">Secretariat</span>
            </h2>
          </div>
        )}

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {parsedMembers.map((member, index) => (
            <div
              key={index}
              className="w-full max-w-[250px] min-h-[300px] flex flex-col justify-between bg-white rounded-xl border-2 border-[#E8B13A] shadow-md p-5 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              style={{ borderColor: "#E8B13A" }}
              onClick={() => router.push(`/management-detail/${member?.slug}`)}
            >
              <div>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 mx-auto rounded-full border-2 border-[#E8B13A] object-cover"
                    style={{ borderColor: "#E8B13A" }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#f3f4f6] border-2 border-[#E8B13A] flex items-center justify-center text-gray-400" style={{ borderColor: "#E8B13A" }}>
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}

                <h3 className="mt-4 text-xl font-semibold text-[#123E84]" style={{ color: "#123E84" }}>
                  {member.name}
                </h3>

                <p className="text-sm font-medium text-black mt-1">
                  {member.role}
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-3 leading-5">
                {member.department}
              </p>
            </div>
          ))}
        </div> */}

        {/* First Row - 4 Cards */}
        <div className="flex flex-wrap justify-center gap-5 mb-5">
          {parsedMembers.slice(0, 1).map((member, index) => (
            <div
              key={index}
              className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] xl:w-[270px]   flex flex-col justify-between bg-white rounded-xl border-2 border-[#E8B13A] shadow-md p-4 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              style={{ borderColor: "#E8B13A" }}
              onClick={() => router.push(`/management-detail/${member.slug}`)}
            >
              <div>
                {member.image ? (
                  <div className="flex justify-center items-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-[150px] h-[150px] rounded-full border-2 border-[#E8B13A] object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#f3f4f6] border-2 border-[#E8B13A] flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}

                <h3 className="mt-3 text-lg font-semibold text-[#123E84]">
                  {member.name}
                </h3>

                <p className="text-xs font-medium text-black mt-1">
                  {member.role}
                </p>
              </div>

              <p className="text-[11px] text-gray-500 mt-2 leading-4">
                {member.department}
              </p>
            </div>
          ))}
        </div>

        {/* Second Row - Remaining 5 Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {parsedMembers.slice(1).map((member, index) => (
            <div
              key={index + 4}
              className="w-full    flex flex-col justify-between bg-white rounded-xl border-2 border-[#E8B13A] shadow-md p-4 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              style={{ borderColor: "#E8B13A" }}
              onClick={() => router.push(`/management-detail/${member.slug}`)}
            >
              <div>
                {member.image ? (
                  <div className="flex justify-center items-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-[150px] h-[150px] mx-auto rounded-full border-2 border-[#E8B13A] object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#f3f4f6] border-2 border-[#E8B13A] flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}

                <h3 className="mt-3 text-lg font-semibold text-[#123E84]">
                  {member.name}
                </h3>

                <p className="text-xs font-medium text-black mt-1">
                  {member.role}
                </p>
              </div>

              <p className="text-[11px] text-gray-500 mt-2 leading-4">
                {member.department}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
