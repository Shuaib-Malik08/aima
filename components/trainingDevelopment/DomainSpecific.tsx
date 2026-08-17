import React from "react";

function ThirdSection() {
  return (
    <section className="md:px-0 relative   text-white  ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center text-center">
        <div>
          <img
            src="Training&Dev_img/Retreats.png"
            alt="Retreat"
            className=" w-full"
          />
        </div>

        <div className="md:me-11 mb-11">
          <h2 className="text-[32px] md:text-[56px] font-[900] font-heading text-[#E4AB25]">
            Retreats
          </h2>

          <p className="mt-2 text-gray-200 text-sm md:text-base">
            Domain specific offsite management development programmes
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button className="bg-white text-[#0D478B] px-4 py-3 rounded-lg font-medium">
              AI & Big Data Retreat
            </button>

            <button className="border border-white px-4 py-3 rounded-lg hover:bg-white hover:text-[#0D478B] transition">
              Senior Leadership
            </button>

            <button className="border border-white px-4 py-3 rounded-lg hover:bg-white hover:text-[#0D478B] transition">
              Women’s Leadership Retreat
            </button>

            <button className="border border-white px-4 py-3 rounded-lg hover:bg-white hover:text-[#0D478B] transition">
              Human Resources Leadership
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThirdSection;
