import React from "react";

function Academic() {
  return (
    <section className="bg-[#1E4C8F] py-12 px-4 font-primary text-white" id="reports">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-5xl mb-3 text-center">
          <span className="text-[#E4AB25]">Reports</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-200 mb-10 max-w-2xl mx-auto">
          AIMA conducts and publishes industry and academic based research,
          surveys and reports in various facets of management
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white text-black rounded-md overflow-hidden shadow">
            <img
              src="knowledge_resources_img/report1.png"
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-sm mb-2">MCDI India 2024 Report</p>
              <button className="text-sm text-[#1E4C8F] font-medium">
                Learn More →
              </button>
            </div>
          </div>
          <div className="bg-white text-black rounded-md overflow-hidden shadow">
            <img
              src="knowledge_resources_img/report2.png"
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-sm mb-2">AIMA – KPMG Collaborative Research</p>
              <button className="text-sm text-[#1E4C8F] font-medium">
                Learn More →
              </button>
            </div>
          </div>
          <div className="bg-white text-black rounded-md overflow-hidden shadow">
            <img
              src="knowledge_resources_img/report3.png"
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-sm mb-2">AIMA – PwC Collaborative Research</p>
              <button className="text-sm text-[#1E4C8F] font-medium">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Academic;
