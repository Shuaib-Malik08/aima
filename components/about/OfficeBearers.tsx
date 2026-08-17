"use client";
import React from "react";
import { Block } from "@/types/blocks.types";
import { useRouter } from "next/navigation";

interface Props {
  block: Block;
}

interface Bearer {
  name: string;
  image: string;
  role: string;
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

export default function OfficeBearers({ block }: Props) {
  const router = useRouter();
  const rawBearers = Array.isArray(block.data) ? block.data : [];

  const parsedBearers: Bearer[] = [];
  const seenNames = new Set<string>();

  for (const item of rawBearers) {
    if (!item || !item.name) continue;
    const cleanName = item.name.toLowerCase().replace(/[^a-z]/g, "");

    if (!seenNames.has(cleanName)) {
      seenNames.add(cleanName);
      parsedBearers.push({
        name: item.name,
        image: resolveImage(item.profile_pic),
        role:
          item.post_committee_name || item.designation || "Office Bearer, AIMA",
        slug: item.slug,
      });
    }
  }

  if (parsedBearers.length === 0) return null;

  const bgImage =
    "https://aima.sanntra.com/administrator/public/storage/files/1/aboutaima/bgimg.png";

  return (
    <section className="relative py-20 overflow-hidden" id="office-bearers">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative max-w-7xl mx-auto px-6">
        {block.description ? (
          <div
            className="text-center mb-14 font-heading text-white"
            dangerouslySetInnerHTML={{ __html: block.description }}
          />
        ) : (
          <h2 className="font-heading font-semibold text-center text-3xl md:text-5xl text-white mb-14">
            AIMA <span className="text-yellow-400">Office Bearers</span>
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3    gap-6 max-w-5xl mx-auto">
          {parsedBearers.slice(0, 6).map((bearer, index) => (
            <div
              key={index}
              onClick={() => router.push(`/management-detail/${bearer.slug}`)}
              className="bg-[#0D4C9A] rounded-xl overflow-hidden shadow-lg border border-transparent hover:border-yellow-400/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              <div className="p-2">
                {bearer.image ? (
                  <img
                    src={bearer.image}
                    alt={bearer.name}
                    loading="lazy"
                    className="w-full h-[250px] object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-[220px] bg-[#0b3c7b] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white/30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-white leading-snug min-h-[44px]">
                  {bearer.name}
                </h3>

                <div className="w-16 h-[2px] bg-yellow-400 my-2" />

                <p className="text-sm text-gray-200 flex-grow leading-5">
                  {bearer.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
