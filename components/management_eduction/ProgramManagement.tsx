import React from "react";

function ProgramManagement() {
  return (
    <section
      className="bg-[#123E73] py-16 md:py-14 font-primary "
      id="academic-program"
    >
      <h2 className="font-playfair-display font-semibold text-center text-white text-[34px] md:text-[56px] mb-12">
        Our<span className="text-[#D9A32B]"> Offering</span>
      </h2>
      <div className="max-w-7xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
        <div
          className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent
                hover:border-[#E4AB25] transition duration-300 flex flex-col"
        >
          <div className="w-[150px] h-[150px] mx-auto mb-4 flex items-center justify-center  rounded-full">
            <img
              src="/aimaweb/EducationIMG/academic.png"
              className="w-full h-full object-cover"
              alt="Academic Programmes "
            />
          </div>

          <h3 className="font-semibold text-lg">Academic Programmes</h3>

          <div className="w-10 h-[2px] bg-[#E4AB25] mx-auto mt-3 mb-4"></div>

          <a
            href="academic-programmes"
            className="mt-auto pt-4 inline-block text-sm font-medium"
          >
            Learn More →
          </a>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent
                hover:border-[#E4AB25] transition duration-300 flex flex-col"
        >
          <div className="w-[150px] h-[150px] mx-auto mb-4 flex items-center justify-center  rounded-full">
            <img
              src="/aimaweb/EducationIMG/certificate.png"
              className="w-full h-full object-cover"
              alt="Short Term Certifications"
            />
          </div>

          <h3 className="font-semibold text-lg">Short Term Certifications</h3>

          <div className="w-10 h-[2px] bg-[#E4AB25] mx-auto mt-3 mb-4"></div>

          <a
            href="short-term-certifications"
            className="mt-auto pt-4 inline-block text-sm font-medium"
          >
            Learn More →
          </a>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent
                hover:border-[#E4AB25] transition duration-300 flex flex-col"
        >
          <div className="w-[150px] h-[150px] mx-auto mb-4 flex items-center justify-center  rounded-full">
            <img
              src="/aimaweb/EducationIMG/capacitybuild.png"
              className="w-full h-full object-cover"
              alt=" Consultancy & Capacity Building"
            />
          </div>

          <h3 className="font-semibold text-lg">
            Consultancy & Capacity Building
          </h3>

          <div className="w-10 h-[2px] bg-[#E4AB25] mx-auto mt-3 mb-4"></div>

          <a
            href="consultancy-capacity-building"
            className="mt-auto pt-4 inline-block text-sm font-medium"
          >
            Learn More →
          </a>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent
                hover:border-[#E4AB25] transition duration-300 flex flex-col"
        >
          <div className="w-[150px] h-[150px] mx-auto mb-4 flex items-center justify-center  rounded-full">
            <img
              src="/aimaweb/EducationIMG/Report.png"
              className="w-full h-full object-cover"
              alt=" Research   & Reports"
            />
          </div>

          <h3 className="font-semibold text-lg">
            Research <br /> & Reports
          </h3>

          <div className="w-10 h-[2px] bg-[#E4AB25] mx-auto mt-3 mb-4"></div>

          <a
            href="research-reports"
            className="mt-auto pt-4 inline-block text-sm font-medium"
          >
            Learn More →
          </a>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent
                hover:border-[#E4AB25] transition duration-300 flex flex-col"
        >
          <div className="w-[150px] h-[150px] mx-auto mb-4 flex items-center justify-center  rounded-full">
            <img
              src="/aimaweb/EducationIMG/MSME.png"
              className="w-full h-full object-cover"
              alt="MSME & Skill Development"
            />
          </div>

          <h3 className="font-semibold text-lg">MSME & Skill Development</h3>

          <div className="w-10 h-[2px] bg-[#E4AB25] mx-auto mt-3 mb-4"></div>

          <a
            href="msme-skill-development"
            className="mt-auto pt-4 inline-block text-sm font-medium"
          >
            Learn More →
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProgramManagement;
