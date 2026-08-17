import React from "react";

function Aptitude() {
  return (
    <section className="bg-[#f3f3f3] py-12">
      <div className="max-w-6xl mx-auto px-11 item-center">
        {/* <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src="TestingIMG/mat.png"
              alt="MAT"
              className="w-[441px] md:w-[480px]"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="font-heading text-2xl sm:text-2xl md:text-4xl leading-[1.3] mb-8">
              Management <span className="text-yellow-500">Aptitude Test</span>
            </h2>

            <p className="text-gray-600 mb-5 text-sm md:text-base">
              Management Aptitude Test (MAT) is a standardised test being
              administered since 1988 to facilitate B-Schools to screen
              candidates for admission to MBA and allied programmes.
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button className="bg-[#0D478B] text-white px-5 py-2 rounded-md text-sm hover:bg-blue-900 transition">
                MAT MAY 2025 Result
              </button>

              <button className="border border-[#0D478B] text-[#0D478B] px-5 py-2 rounded-md text-sm  hover:bg-[#0D478B] hover:text-white transition">
                Register MAT FEB 2026
              </button>

              <button className="border border-[#0D478B] text-[#0D478B] px-5 py-2 rounded-md text-sm hover:bg-[#0D478B] hover:text-white transition">
                FAQs
              </button>
            </div>
          </div>
        </div> */}

        <div className="text-center mt-7">
          <h3 className="font-heading text-2xl sm:text-2xl md:text-[56px]">
            Assessments
          </h3>

          <div className="w-16 h-[2px] bg-yellow-500 mx-auto mt-5"></div>

          <p className="text-gray-600 mb-10 text-sm md:text-base">
            Also available in remote proctored mode
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            <div className="bg-white py-3 rounded-xl border border-[#9CA3AF] shadow hover:shadow-lg transition text-center">
              <img
                src="TestingIMG/aptest1.png"
                className="mx-auto mb-3 w-[80px]"
              />
              <p className="text-base font-[600]">
                Admission <br /> Tests
              </p>
            </div>

            <div className="bg-white py-3 rounded-xl border border-[#9CA3AF] shadow hover:shadow-lg transition text-center">
              <img
                src="TestingIMG/aptest2.png"
                className="mx-auto mb-3 w-[80px]"
              />
              <p className="text-base font-[600]">
                Recruitment <br /> Test
              </p>
            </div>

            <div className="bg-white py-3 rounded-xl border border-[#9CA3AF] shadow hover:shadow-lg transition text-center">
              <img
                src="TestingIMG/aptest2.png"
                className="mx-auto mb-3 w-[80px]"
              />
              <p className="text-base font-[600] mb-3">
                Vocational Skills <br /> Assessment
              </p>
            </div>

            <div className="bg-white py-3 rounded-xl border border-[#9CA3AF] shadow hover:shadow-lg transition text-center">
              <img src="/img/aptest3.png" className="mx-auto mb-3 w-[80px]" />
              <p className="text-base font-[600]">
                Online <br /> Interview
              </p>
            </div>

            <div className="bg-white py-3 rounded-xl border border-[#9CA3AF] shadow hover:shadow-lg transition text-center">
              <img
                src="TestingIMG/aptes4.png"
                className="mx-auto mb-3 w-[80px]"
              />
              <p className="text-base font-[600]">
                Online <br /> Counselling
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aptitude;
