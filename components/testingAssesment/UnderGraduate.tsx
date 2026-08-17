import React from "react";

function UnderGraduate() {
  return (
    <section className="bg-white pb-20 w-full">
      <div className="w-full">
        <div className="grid md:grid-cols-2 w-full">
          <div className="bg-[#0D478B] text-white p-12 flex flex-col justify-center">
            <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-6">
              <span className="text-white">Under Graduate </span>
              <span className="text-[#E4AB25]"> Aptitude Test</span>
            </h2>

            <p className="text-white/80 leading-relaxed max-w-md">
              Under Graduate Aptitude Test (UGAT) is a standardised test being
              administered by AIMA annually to screen the candidates for various
              under graduate programmes such as Integrated MBA (IMBA), BBA, BCA,
              BHM, B.Com, etc.
            </p>
            <div className="flex gap-5">
              <button
                className="mt-5 bg-yellow-400 text-black border border-white px-5 py-2.5 rounded-md 
                     font-medium hover:bg-yellow-300 transition"
              >
                Know More
              </button>
              <button
                className="mt-5 bg-yellow-400 text-black px-5 py-2.5 rounded-md 
                     font-medium hover:bg-yellow-300 transition"
              >
                FAQs
              </button>
            </div>
          </div>

          <div className="h-[300px] md:h-[420px] lg:h-auto">
            <img
              src="TestingIMG/ugar.png"
              alt=""
              className="w-full md:h-[400px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UnderGraduate;
