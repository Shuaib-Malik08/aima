

export default function CustomizedSolutions({data}: any) {
  const solutions = [
    {
      title: "Testing & Assessment",
    },
    {
      title: "Company Training",
    },
    {
      title: "Consultancy Projects",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <p className="text-center tracking-widest uppercase text-xs mb-3">
          SMART APPROACHES FOR UNIQUE CHALLENGES
        </p>

        <h2 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl font-semibold mb-12 md:mb-16">
          <span className="text-black">Customized</span>{" "}
          <span className="text-[#E4AB25]">Solutions</span>
        </h2>

        {/* Image + Cards */}
        <div className="relative">
          
          {/* Background Image */}
          <img
            src="/img/costmsolve.svg"
            className="w-full h-[240px] sm:h-[320px] md:h-[480px] object-cover rounded-3xl"
            loading="lazy"
          />

          {/* Cards Wrapper */}
          <div className="mt-8 md:mt-0 md:absolute md:left-0 md:right-0 md:-bottom-20 px-2 md:px-10">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              
              {solutions.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 md:p-7 shadow-md border
                  hover:-translate-y-4 hover:shadow-2xl hover:scale-[1.02] 
                  transition duration-300"
                >
                  <h3 className="text-xl font-[500] mb-3 group-hover:text-yellow-400">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-6">
                    The standard lorem ipsum passage has been a printer’s friend
                    for centuries.
                  </p>

                  <button className="flex items-center gap-3 font-medium group">
                    Learn More
                    <span
                      className="w-8 h-8 border rounded-md flex items-center justify-center
                      group-hover:bg-black group-hover:text-white transition"
                    >
                      →
                    </span>
                  </button>
                </div>
              ))}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}