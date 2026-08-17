import React from "react";

function Membership() {
  return (
    <section className="bg-gray-100 py-10 px-4 font-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <div className="bg-[#1E4C8F] p-3 rounded-xl">
            <img
              src="membership-img/group.png"
              className="rounded-lg w-full max-w-md"
            />
          </div>
        </div>
        <div className="text-center lg:text-left">
          <h2 className="font-heading text-3xl sm:text-4xl mb-4">
            International <span className="text-[#E4AB25]">Membership</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-xl mx-auto lg:mx-0">
            AIMA's International Membership provides a forum for sharing of
            international management ethos, thinking and principles. Management
            practices are constantly evolving across the globe, and AIMA
            International Members would benefit from the expertise and
            experience of their global counterparts.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-6">
            <img src="membership-img/AAMO_logo.png" className="h-full" />
          </div>
          <button className="border border-[#1E4C8F] text-[#1E4C8F] px-5 py-2 rounded-md text-sm hover:bg-[#1E4C8F] hover:text-white transition">
            Know More →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Membership;
