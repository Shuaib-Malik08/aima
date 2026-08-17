"use client";

import React from "react";

interface Props {
  block?: any;
}

export default function ManagementTvHero({ block }: Props) {
  const title = block?.title;
  const description =
    block?.description ||
    "Watch exclusive leadership conversations, expert interviews, management discussions and inspiring video series curated by AIMA for professionals, students and business leaders.";
  const bgImage =
    block?.bg_photo ||
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop";

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Management TV"
          className="w-full h-full object-cover"
        />
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-[#0D478B]/80"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-28 py-24 md:py-32">
        <div className="max-w-3xl">
          {title ? (
            <div
              dangerouslySetInnerHTML={{
                __html: title.replace(/className=/g, "class="),
              }}
            />
          ) : (
            <h1 className="font-heading font-semibold text-4xl md:text-6xl text-white leading-tight">
              AIMA <span className="text-[#E4AB25]">Management TV</span>
            </h1>
          )}

          <p className="mt-6 text-lg md:text-xl text-gray-200 leading-8 font-primary">
            {description}
          </p>

          <div className="w-28 h-1 bg-[#E4AB25] rounded-full mt-8"></div>
        </div>
      </div>
    </section>
  );
}
