import React from "react";

function Professionals() {
  return (
    <section className="pb-11 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
            Open and In-Company Programmes for Working Professionals
          </p>

          <h2 className="text-[28px] md:text-[48px] font-[900] font-heading">
            Workshops & <span className="text-[#E4AB25]">&nbsp; Trainings</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="Training&Dev_img/Workshop1.png"
              className="w-full h-64 object-cover bg-white"
            />

            <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
              <button className="border border-white text-white px-5 py-2 rounded-md transition hover:bg-[#0D478B]">
                Know More →
              </button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <img
              src="Training&Dev_img/Workshop2.png"
              className="w-full h-64 object-cover bg-white"
            />

            <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
              <button className="border border-white text-white px-5 py-2 rounded-md transition hover:bg-[#0D478B]">
                Know More →
              </button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <img
              src="Training&Dev_img/Workshop3.png"
              className="w-full h-64 object-cover bg-white"
            />

            <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
              <button className="border border-white text-white px-5 py-2 rounded-md transition hover:bg-[#0D478B]">
                Know More →
              </button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <img
              src="Training&Dev_img/Workshop4.png"
              className="w-full h-64 object-cover bg-white"
            />

            <div className="absolute btoom-0 bg-black/65 flex items-center justify-center">
              <button className="border border-white text-white px-5 py-2 rounded-md transition hover:bg-[#0D478B]">
                Know More →
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-6">
          <button className="bg-[#0D478B] text-white px-6 py-2 rounded-md hover:bg-blue-900 transition">
            View All →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Professionals;
