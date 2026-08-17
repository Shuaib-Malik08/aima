import React from "react";

function ManagementProgramme() {
  return (
    <section className="pb-12 sm:pb-16 lg:pb-20 py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative">
          <div className="bg-[#0D478B] rounded-2xl p-5 relative z-10">
            <img
              src="Training&Dev_img/Global_Advanced.jpg"
              alt="Global"
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#E4AB25] rounded-2xl z-0"></div>
        </div>

        <div className="">
          <h2 className=" text-2xl md:text-4xl leading-snug font-[900] font-heading">
            Global Advanced
            <span className="text-[#E4AB25]">Management Programme</span>
          </h2>

          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-lg">
            AIMA's unique Global Advanced Management Programme conducted in the
            US, Israel and China, attracts active participation from senior
            professionals giving them an opportunity to interact with and visit
            leading global companies.
          </p>

          <button className="mt-6 bg-[#0D478B] text-white px-6 py-3 rounded-md hover:bg-blue-900 transition">
            Know More →
          </button>
        </div>
      </div>
    </section>
  );
}

export default ManagementProgramme;
