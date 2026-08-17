import React from "react";

function PublishingIndustry() {
  return (
    <section className="px-4 sm:px-6 lg:px-28 py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-block bg-[#0D478B] rounded-tr-lg rounded-bl-lg p-3 mb-4">
            <img src="knowledge_resources_img/icrc.png" className="h-16" />
          </div>
          <p className="text-gray-600 text-sm sm:text-base mb-5 max-w-md mx-auto lg:mx-0">
            The AIMA case research centre is established after a lot of
            discussion, deliberation and research. The purpose of setting up of
            India case research centre at AIMA is primarily to focus on
            developing and publishing industry based India-focused cases.
          </p>
          <button className="bg-[#1E4C8F] text-white px-5 py-2 rounded text-sm hover:bg-blue-900 transition">
            Know More →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <img
            src="knowledge_resources_img/case1.png"
            className="rounded-lg shadow w-full"
          />
          <img
            src="knowledge_resources_img/case2.png"
            className="rounded-lg shadow w-full"
          />
          <img
            src="knowledge_resources_img/case3.png"
            className="rounded-lg shadow w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default PublishingIndustry;
