import React from "react";

function SocialMediaSection({data}: any) {
  return (
    <section className="relative px-4 bg-social bg-cover bg-center bg-no-repeat ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="flex items-center gap-2 mb-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_437_674)">
                <path
                  d="M37.0492 0.000151475H2.95082C2.17715 -0.00772217 1.43196 0.291639 0.87875 0.832548C0.325544 1.37346 0.00951189 2.11173 0 2.88538V37.1212C0.0112321 37.8937 0.32802 38.6303 0.881039 39.1698C1.43406 39.7093 2.17827 40.0077 2.95082 39.9999H37.0492C37.8229 40.006 38.5676 39.7056 39.1205 39.1644C39.6734 38.6231 39.9896 37.885 40 37.1113V2.87554C39.9862 2.10416 39.6685 1.36941 39.1159 0.830984C38.5634 0.292558 37.8207 -0.00601951 37.0492 0.000151475Z"
                  fill="#0076B2"
                />
                <path
                  d="M6.58135 15.228H12.2407V33.4374H6.58135V15.228ZM9.4126 6.16553C10.0617 6.16553 10.6962 6.35805 11.2359 6.71874C11.7756 7.07942 12.1961 7.59207 12.4444 8.19182C12.6926 8.79157 12.7574 9.45148 12.6306 10.0881C12.5037 10.7247 12.1909 11.3093 11.7317 11.7681C11.2725 12.2268 10.6875 12.5391 10.0508 12.6654C9.41412 12.7916 8.75427 12.7262 8.15475 12.4774C7.55524 12.2285 7.04299 11.8075 6.68282 11.2675C6.32265 10.7275 6.13073 10.0928 6.13135 9.44365C6.13218 8.57395 6.47824 7.74016 7.09351 7.12548C7.70877 6.5108 8.5429 6.16553 9.4126 6.16553ZM15.7907 15.228H21.2157V17.728H21.2907C22.047 16.2968 23.8907 14.7874 26.6439 14.7874C32.3751 14.7749 33.4376 18.5468 33.4376 23.4374V33.4374H27.7782V24.578C27.7782 22.4687 27.7407 19.753 24.8376 19.753C21.9345 19.753 21.4407 22.053 21.4407 24.4405V33.4374H15.7907V15.228Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_437_674">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="font-medium text-sm">
              LinkedIn <br />{" "}
              <span className="text-[#627084] text-[12px] font-normal">
                @PKI_India
              </span>
            </span>
          </div>

          <div className="border border-[#DAE0E7] rounded p-4 bg-[#F3F5F780] text-left text-xs text-gray-600 mb-4">
            Join us for the upcoming workshop on sustainable procurement
            practices. Registration is now open!
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span>2 days ago</span>
              </div>
              <div className="flex gap-3">
                <span>
                  👍 <br />
                  24
                </span>
                <span>
                  💬 <br />5
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#DAE0E7] rounded p-4 bg-[#F3F5F780] text-left text-xs text-gray-600 mb-4">
            Join us for the upcoming workshop on sustainable procurement
            practices. Registration is now open!
            <div className="flex justify-between mt-3 text-[10px]">
              <div>
                <span>2 days ago</span>
              </div>
              <div className="flex gap-3">
                <span>
                  👍 <br />
                  24
                </span>
                <span>
                  💬 <br />5
                </span>
              </div>
            </div>
          </div>

          <a href="#" className="text-blue-700 text-xs mt-4 inline-block">
            Follow on LinkedIn ↗
          </a>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="flex items-center  gap-2 mb-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.625 0H9.375C4.19733 0 0 4.19733 0 9.375V30.625C0 35.8027 4.19733 40 9.375 40H30.625C35.8027 40 40 35.8027 40 30.625V9.375C40 4.19733 35.8027 0 30.625 0Z"
                fill="url(#paint0_radial_437_679)"
              />
              <path
                d="M30.625 0H9.375C4.19733 0 0 4.19733 0 9.375V30.625C0 35.8027 4.19733 40 9.375 40H30.625C35.8027 40 40 35.8027 40 30.625V9.375C40 4.19733 35.8027 0 30.625 0Z"
                fill="url(#paint1_radial_437_679)"
              />
              <path
                d="M20.0014 4.375C15.758 4.375 15.2253 4.39359 13.5588 4.46938C11.8953 4.54563 10.7598 4.80891 9.76641 5.19531C8.73859 5.59438 7.86688 6.12828 6.99844 6.99703C6.12922 7.86562 5.59531 8.73734 5.195 9.76469C4.8075 10.7584 4.54391 11.8944 4.46906 13.557C4.39453 15.2238 4.375 15.7566 4.375 20.0002C4.375 24.2438 4.39375 24.7747 4.46938 26.4412C4.54594 28.1047 4.80922 29.2402 5.19531 30.2336C5.59469 31.2614 6.12859 32.1331 6.99734 33.0016C7.86563 33.8708 8.73734 34.4059 9.76438 34.805C10.7586 35.1914 11.8942 35.4547 13.5573 35.5309C15.2241 35.6067 15.7563 35.6253 19.9995 35.6253C24.2434 35.6253 24.7744 35.6067 26.4409 35.5309C28.1044 35.4547 29.2411 35.1914 30.2353 34.805C31.2627 34.4059 32.1331 33.8708 33.0012 33.0016C33.8705 32.1331 34.4042 31.2614 34.8047 30.2341C35.1887 29.2402 35.4525 28.1044 35.5306 26.4416C35.6055 24.775 35.625 24.2438 35.625 20.0002C35.625 15.7566 35.6055 15.2241 35.5306 13.5573C35.4525 11.8939 35.1887 10.7586 34.8047 9.76516C34.4042 8.73734 33.8705 7.86562 33.0012 6.99703C32.1322 6.12797 31.263 5.59406 30.2344 5.19547C29.2383 4.80891 28.1022 4.54547 26.4387 4.46938C24.772 4.39359 24.2414 4.375 19.9966 4.375H20.0014ZM18.5997 7.19078C19.0158 7.19016 19.48 7.19078 20.0014 7.19078C24.1734 7.19078 24.6678 7.20578 26.3153 7.28063C27.8387 7.35031 28.6656 7.60484 29.2164 7.81875C29.9456 8.10188 30.4655 8.44047 31.012 8.9875C31.5589 9.53438 31.8973 10.0552 32.1813 10.7844C32.3952 11.3344 32.65 12.1613 32.7194 13.6847C32.7942 15.3319 32.8105 15.8266 32.8105 19.9966C32.8105 24.1666 32.7942 24.6614 32.7194 26.3084C32.6497 27.8319 32.3952 28.6587 32.1813 29.2089C31.8981 29.9381 31.5589 30.4573 31.012 31.0039C30.4652 31.5508 29.9459 31.8892 29.2164 32.1725C28.6663 32.3873 27.8387 32.6413 26.3153 32.7109C24.6681 32.7858 24.1734 32.802 20.0014 32.802C15.8292 32.802 15.3347 32.7858 13.6877 32.7109C12.1642 32.6406 11.3373 32.3861 10.7861 32.1722C10.057 31.8889 9.53609 31.5505 8.98922 31.0036C8.44234 30.4567 8.10391 29.9372 7.82 29.2077C7.60609 28.6575 7.35125 27.8306 7.28188 26.3072C7.20703 24.66 7.19203 24.1653 7.19203 19.9927C7.19203 15.82 7.20703 15.328 7.28188 13.6808C7.35156 12.1573 7.60609 11.3305 7.82 10.7797C8.10328 10.0505 8.44234 9.52969 8.98938 8.98281C9.53641 8.43594 10.057 8.09734 10.7862 7.81359C11.337 7.59875 12.1642 7.34484 13.6877 7.27484C15.1291 7.20969 15.6877 7.19016 18.5997 7.18687V7.19078ZM28.342 9.78516C27.3069 9.78516 26.467 10.6242 26.467 11.6595C26.467 12.6947 27.3069 13.5345 28.342 13.5345C29.3772 13.5345 30.217 12.6947 30.217 11.6595C30.217 10.6244 29.3772 9.78453 28.342 9.78453V9.78516ZM20.0014 11.9759C15.5702 11.9759 11.9773 15.5688 11.9773 20.0002C11.9773 24.4316 15.5702 28.0227 20.0014 28.0227C24.4328 28.0227 28.0244 24.4316 28.0244 20.0002C28.0244 15.5689 24.4325 11.9759 20.0011 11.9759H20.0014ZM20.0014 14.7917C22.8778 14.7917 25.2098 17.1234 25.2098 20.0002C25.2098 22.8766 22.8778 25.2086 20.0014 25.2086C17.125 25.2086 14.7931 22.8766 14.7931 20.0002C14.7931 17.1234 17.1248 14.7917 20.0014 14.7917Z"
                fill="white"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_437_679"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(10.625 43.0808) rotate(-90) scale(39.643 36.8711)"
                >
                  <stop stopColor="#FFDD55" />
                  <stop offset="0.1" stopColor="#FFDD55" />
                  <stop offset="0.5" stopColor="#FF543E" />
                  <stop offset="1" stopColor="#C837AB" />
                </radialGradient>
                <radialGradient
                  id="paint1_radial_437_679"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(-6.70016 2.88141) rotate(78.681) scale(17.7206 73.045)"
                >
                  <stop stopColor="#3771C8" />
                  <stop offset="0.128" stopColor="#3771C8" />
                  <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            <span className="font-medium text-sm">
              Instagram <br />{" "}
              <span className="text-[#627084] text-[12px] font-normal">
                @PKI_India
              </span>
            </span>
          </div>

          <div className="border border-[#DAE0E7] rounded p-4 bg-[#F3F5F780] text-left text-xs text-gray-600 mb-4">
            Join us for the upcoming workshop on sustainable procurement
            practices. Registration is now open!
            <div className="flex justify-between mt-3 text-[10px]">
              <div>
                <span>2 days ago</span>
              </div>
              <div className="flex gap-3">
                <span>
                  👍 <br />
                  24
                </span>
                <span>
                  💬 <br />5
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#DAE0E7] rounded p-4 bg-[#F3F5F780] text-left text-xs text-gray-600 mb-4">
            Join us for the upcoming workshop on sustainable procurement
            practices. Registration is now open!
            <div className="flex justify-between mt-3 text-[10px]">
              <div>
                <span>2 days ago</span>
              </div>
              <div className="flex gap-3">
                <span>
                  👍 <br />
                  24
                </span>
                <span>
                  💬 <br />5
                </span>
              </div>
            </div>
          </div>

          <a href="#" className="text-pink-600 text-xs mt-4 inline-block">
            Follow on Instagram ↗
          </a>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="flex items-center  gap-2 mb-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="8" fill="#0D478B" />
              <path
                d="M25.0007 11.6641H22.5007C21.3956 11.6641 20.3358 12.103 19.5544 12.8845C18.773 13.6659 18.334 14.7257 18.334 15.8307V18.3307H15.834V21.6641H18.334V28.3307H21.6673V21.6641H24.1673L25.0007 18.3307H21.6673V15.8307C21.6673 15.6097 21.7551 15.3978 21.9114 15.2415C22.0677 15.0852 22.2796 14.9974 22.5007 14.9974H25.0007V11.6641Z"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="font-medium text-sm">
              Facebook <br />{" "}
              <span className="text-[#627084] text-[12px] font-normal">
                @PKI_India
              </span>
            </span>
          </div>

          <div className="border border-[#DAE0E7] rounded p-4 bg-[#F3F5F780] text-left text-xs text-gray-600 mb-4">
            Join us for the upcoming workshop on sustainable procurement
            practices. Registration is now open!
            <div className="flex justify-between mt-3 text-[10px]">
              <div>
                <span>2 days ago</span>
              </div>
              <div className="flex gap-3">
                <span>
                  👍 <br />
                  24
                </span>
                <span>
                  💬 <br />5
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#DAE0E7] rounded p-4 bg-[#F3F5F780] text-left text-xs text-gray-600 mb-4">
            Join us for the upcoming workshop on sustainable procurement
            practices. Registration is now open!
            <div className="flex justify-between mt-3 text-[10px]">
              <div>
                <span>2 days ago</span>
              </div>
              <div className="flex gap-3">
                <span>
                  👍 <br />
                  24
                </span>
                <span>
                  💬 <br />5
                </span>
              </div>
            </div>
          </div>

          <a href="#" className="text-blue-600 text-xs mt-4 inline-block">
            Follow on Facebook ↗
          </a>
        </div>
      </div>
    </section>
  );
}

export default SocialMediaSection;
