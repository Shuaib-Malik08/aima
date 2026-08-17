const PressRelease: React.FC = () => {
  return (
    <>
      <section className="min-h-screen bg-gray-50/50 py-20 px-4  font-primary">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-2">
            <a className="hover:text-blue-900 transition" href="/aimaweb">
              Home
            </a>
            <span>/</span>
            <a
              className="hover:text-blue-900 transition"
              href="/aimaweb/events"
            >
              Gallery
            </a>
          </nav>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8 p-5 lg:p-10">
            <div className="heading-wrapper">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
                Gallery
              </h1>
            </div>
            <div className="from-wrapper mt-10">
              <form className="block">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="item-wrapper">
                    <select
                      name="month"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white text-gray-500"
                    >
                      <option value="">Select Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="item-wrapper">
                    <select
                      name="year"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white text-gray-500"
                    >
                      <option value="">Select Year</option>
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </select>
                  </div>

                  <div className="item-wrapper flex flex-nowrap gap-3 lg:justify-end">
                    <button
                      type="button"
                      className="bg-[#D8A12A] text-white px-6 py-3 rounded-md w-full text-sm font-semibold hover:bg-[#b0811e] transition cursor-pointer text-center flex items-center justify-center"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 p-4 flex flex-col justify-between cursor-pointer group"
              href="/aimaweb/media-center/70th-foundation-day"
            >
              <div>
                <div className="relative w-full h-[180px] rounded-lg overflow-hidden mb-4">
                  <img
                    alt="70th Foundation Day"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    src="https://aima.sanntra.com/administrator/public/storage/media/1777752542_news1_69f659de43d55.png"
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] mb-3">
                  <div className="rounded-full bg-[#0D478B] px-3 py-1 font-semibold text-white">
                    25 Mar 2026
                  </div>
                  <div className="rounded-full bg-[#E4AB25] px-3 py-1 font-semibold text-white uppercase">
                    AIMA
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-base mb-4 line-clamp-3 leading-snug group-hover:text-[#0D478B] transition-colors">
                  70th Foundation Day
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50">
                <span className="inline-flex items-center text-[#0D478B] font-semibold text-sm group-hover:text-blue-800 group-hover:underline">
                  Read News <span className="ml-1.5">→</span>
                </span>
              </div>
            </a>
          </div>
          <div className="flex items-center flex-wrap justify-start gap-2 mt-8">
            <button
              type="button"
              className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-[#114F97] hover:text-white hover:border-[#114F97] transition-all duration-300 font-semibold text-sm cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="px-4 py-2.5 rounded-lg transition-all duration-300 font-semibold text-sm cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-[#114F97] hover:text-white hover:border-[#114F97]"
              >
                1
              </button>
              <button
                type="button"
                className="px-4 py-2.5 rounded-lg transition-all duration-300 font-semibold text-sm cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-[#114F97] hover:text-white hover:border-[#114F97]"
              >
                2
              </button>
              <button
                type="button"
                className="px-4 py-2.5 rounded-lg transition-all duration-300 font-semibold text-sm cursor-pointer bg-[#114F97] text-white"
              >
                3
              </button>
              <button
                type="button"
                className="px-4 py-2.5 rounded-lg transition-all duration-300 font-semibold text-sm cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-[#114F97] hover:text-white hover:border-[#114F97]"
              >
                4
              </button>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-[#114F97] hover:text-white hover:border-[#114F97] transition-all duration-300 font-semibold text-sm cursor-pointer"
            >
              <span>Next</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default PressRelease;
