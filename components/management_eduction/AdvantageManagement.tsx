import React from "react";

function AdvantageManagement() {
  const features = [
    {
      id: 1,
      url: "aicte-approved-programs",
      icon: "/aimaweb/EducationIMG/icon1.png",
      title: "AICTE-Approved Programs",
    },
    {
      id: 2,
      url: "a-flexible-learning-pathways",
      icon: "/aimaweb/EducationIMG/icon2.png",
      title: "A Flexible Learning Pathways",
    },
    {
      id: 3,
      url: "strong-corporate-connects",
      icon: "/aimaweb/EducationIMG/icon3.png",
      title: "Strong Corporate Connects",
    },
    {
      id: 4,
      url: "industry-aligned-curriculum-new-age-programs",
      icon: "/aimaweb/EducationIMG/icon4.png",
      title: "Industry-Aligned Curriculum & New Age programs",
    },
    {
      id: 5,
      url: "ai-future-ready-skills",
      icon: "/aimaweb/EducationIMG/icon5.png",
      title: "AI & Future-Ready Skills",
    },
    {
      id: 6,
      url: "expert-faculty-from-academia-industry",
      icon: "/aimaweb/EducationIMG/icon6.png",
      title: "Expert Faculty from Academia & Industry",
    },
    {
      id: 7,
      url: "professional-networks",
      icon: "/aimaweb/EducationIMG/feature1.png",
      title: "Professional Networks",
    },
  ];

  return (
    <section className="mb-20 font-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-base uppercase tracking-wide text-gray-500 mb-2">
            Learner Centric Frameworks
          </p>
          <h2 className="font-playfair-display font-semibold text-3xl md:text-[56px] text-center mb-12">
            CME <span className="text-[#E4AB25]">Advantage</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7   text-center">
          {features.map((data, idx) => (
            <a
              href={data?.url}
              key={idx}
              className="flex flex-col px-4 py-5 items-center hover:bg-gray-50/50 gap-3 border-r-2 border-[#E4AB25] last:border-none pr-4"
            >
              <img src={data?.icon} className="h-10" alt={data?.title} />
              <p className="text-base font-[600] text-black">{data?.title}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdvantageManagement;
