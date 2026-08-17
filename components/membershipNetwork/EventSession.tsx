import React from "react";

function EventSession() {
  return (
    <section className="bg-gray-100 py-10 px-4 font-primary">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-5xl mb-3 font-semibold text-center">
          AIMA <span className="text-[#E4AB25]">Membership</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto mb-10">
          A catalyst in the evolution of a new management ethos AIMA has the
          support of close to 6,000 Corporate / Institutional members and over
          38,000 Individual members
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition">
            <img
              src="membership-img/event.png"
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700">
                Interactive
                <br />
                Events &amp; Sessions
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition">
            <img
              src="membership-img/publication.png"
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700">
                AIMA Publications &amp; <br /> Reports
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition">
            <img
              src="membership-img/library.png"
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700">
                AIMA
                <br />
                Library
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition">
            <img
              src="membership-img/constitution.png"
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700">
                Constitution &amp; <br /> Code of Conduct
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventSession;
