import React from "react";
import Link from "next/link";

function Publications() {
  return (
    <section className="bg-white py-12 px-4 font-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Management Articles &amp; Opinions sdsd
          </p>
          <h2 className="font-heading font-semibold text-3xl md:text-5xl mb-3 text-center">
            Management
            <span className="text-[#E4AB25]"> Perspectives &amp; Articles</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden hover:shadow-xl transition">
            <img
              src="knowledge_resources_img/article1.jpg"
              alt="Adaptability"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-black mb-2">
                Building Cultures of Adaptability
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Organisations often forget that their current successes were
                built on creativity and constant reinvention.
              </p>
              <button className="text-sm font-medium text-[#1E4C8F]">
                Learn More →
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md   border-gray-300 overflow-hidden hover:shadow-xl transition">
            <img
              src="knowledge_resources_img/article2.jpg"
              alt="Message Stick"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-black mb-2">
                Make Your Message Stick
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Storytelling is not a performance; it is a way of thinking that
                helps people connect better.
              </p>
              <button className="text-sm font-medium text-[#1E4C8F]">
                Learn More →
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md border  border-gray-300 overflow-hidden hover:shadow-xl transition">
            <img
              src="knowledge_resources_img/article3.jpg"
              alt="Competence"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-black mb-2">
                Unconscious Competence
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Leadership development grows in a context shaped by beliefs and
                workplace culture.
              </p>
              <button className="text-sm font-medium text-[#1E4C8F]">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Publications;
