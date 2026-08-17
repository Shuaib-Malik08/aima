import React from "react";

function Certification() {
  return (
    <div className="mb-20 md:px-28">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5 items-center">
        <div className="flex justify-center md:justify-start">
          <img
            src="TestingIMG/mettingcerti.jpg"
            alt="AMT"
            className="rounded-3xl w-full max-w-md object-cover"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="font-heading text-4xl font-bold  mb-4">
            AMT <span className="text-yellow-500">Certification</span>
          </h2>

          <p className="font-primary text-gray-600 font-bold mb-6 max-w-md mx-auto md:mx-0 text-sm md:text-base">
            The Accredited Management Teacher (AMT) Certification is
            administered by Centre for Management Services of AIMA, New Delhi
            since 1996.
          </p>

          <button
            className="bg-[#0D478B] text-white px-6 py-4 rounded-full text-sm font-semibold  shadow-md 
hover:scale-105 hover:shadow-xl transition duration-300"
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Certification;
