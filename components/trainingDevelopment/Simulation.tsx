import React from "react";

function Simulation() {
  return (
    <section className="pb-12 sm:pb-16 lg:pb-20 py-12 px-4 md:px-12 md:mt-5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src="Training&Dev_img/new-vision.jpg"
            className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <h2 className="font-heading text-2xl md:text-4xl text-white text-center font-[900]">
              Business <span className="text-[#E4AB25]">Simulation</span>
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="border border-white bg-[#0D478B] text-white py-4 rounded-md text-sm font-medium">
                CORPORATES
              </button>

              <button className="border border-white text-white py-4 rounded-md text-sm transition hover:bg-[#0D478B]">
                PROFESSIONALS
              </button>

              <button className="border border-white text-white py-4 rounded-md text-sm transition hover:bg-[#0D478B]">
                B-SCHOOLS
              </button>

              <button className="border border-white text-white py-4 rounded-md text-sm transition hover:bg-[#0D478B]">
                STUDENTS
              </button>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src="Training&Dev_img/Competitions.png"
            className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <h2 className="font-heading text-2xl md:text-4xl text-white text-center font-[900]">
              Competitions <span className="text-[#E4AB25]">& Quizzes</span>
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="uppercase bg-[#0D478B] border border-white text-white py-4 rounded-md text-sm font-medium">
                National Competition
              </button>

              <button className="uppercase border border-white text-white py-4 rounded-md text-sm transition hover:bg-[#0D478B]">
                National Quiz
              </button>

              <button className="uppercase border border-white text-white py-4 rounded-md text-sm transition hover:bg-[#0D478B]">
                Corporate Olympiad
              </button>

              <button className="uppercase border border-white text-white py-4 rounded-md text-sm transition hover:bg-[#0D478B]">
                Pragati - Women's Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Simulation;
