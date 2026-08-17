import React from "react";

function AssociationsNetwork() {
  return (
    <section className="w-full font-primary">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#0D478B] text-white px-6 sm:px-10 py-20 flex flex-col justify-center">
          <h2 className="font-heading text-3xl md:text-5xl mb-6">
            Local Management <br />
            <span className="text-[#E4AB25]">Associations Network</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <button className="bg-white text-[#1E4C8F] py-2 rounded-md text-sm font-semibold">
              Northern Region
            </button>
            <button className="border border-white py-2 rounded-md text-sm font-semibold">
              Eastern Region
            </button>
            <button className="border border-white py-2 rounded-md text-sm font-semibold">
              Western Region
            </button>
            <button className="border border-white py-2 rounded-md text-sm font-semibold">
              Southern Region
            </button>
          </div>
        </div>
        <div className="relative bg-[#0B2C5F] flex items-center justify-center px-6 py-10 overflow-hidden">
          <img
            src="membership-img/world-map.png"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative text-center text-white">
            <h3 className="flex items-end justify-center gap-2 leading-none">
              <span className="text-5xl sm:text-7xl font-heading text-[#E4AB25]">
                68
              </span>
              <span className="text-lg sm:text-2xl mb-1">LMAs</span>
            </h3>
            <h3 className="flex items-end justify-center gap-2 leading-none">
              <span className="text-lg sm:text-2xl mb-1">in</span>
              <span className="text-5xl sm:text-7xl font-heading text-[#E4AB25]">
                20
              </span>
              <span className="text-lg sm:text-2xl mb-1">states</span>
            </h3>
            <div className=" mt-5 flex flex-wrap justify-center gap-0 text-xs sm:text-sm">
              <div className="border border-white px-3 py-5 flex items-center gap-2">
                LMA Events <span className="text-yellow-400">→</span>
              </div>
              <div className="border border-white px-3 py-5 flex items-center gap-2">
                Best LMA Awards <span className="text-yellow-400">→</span>
              </div>
              <div className="border border-white px-3 py-5 flex items-center gap-2">
                Model Constitution for LMAs{" "}
                <span className="text-yellow-400">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssociationsNetwork;
