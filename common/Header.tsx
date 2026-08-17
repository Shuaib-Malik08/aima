// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";

// export default function Header({data}:any) {
//   const pathname = usePathname();
//   const routeer = useRouter();
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {
//     const topHeader = document.getElementById("topHeader");

//     const handleScroll = () => {
//       if (!topHeader) return;
//       setIsSticky(window.scrollY > topHeader.offsetHeight);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`bg-white transition-all duration-300 `}
//     >
//       {/* TOP HEADER */}
//       <div
//         id="topHeader"
//         className={`flex items-center justify-between px-4 lg:px-8 h-20 lg:h-22.5`}
//       >
//         {/* LOGO */}
//         <div className="flex items-center" onClick={() => routeer.push('/home')}>
//           <img
//             src="/img/logo.png"
//             className="w-42.5 h-auto object-contain"
//             loading="lazy"
//           />
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-4 lg:gap-6 text-gray-700">
//           {/* SEARCH */}
//           <div className="relative flex items-center">
//             <input
//               type="text"
//               placeholder="Search..."
//               className={`absolute right-10 border border-gray-300 rounded-md px-3 py-1 text-sm transition-all duration-300 ${
//                 searchOpen ? "w-45 opacity-100" : "w-0 opacity-0"
//               }`}
//             />

//             <button
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="ml-4 group lg:text-xl"
//             >
//               <svg
//                 className="w-7 h-7 group-hover:scale-110 transition"
//                 fill="none"
//                 stroke="black"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <circle cx="11" cy="11" r="8" />
//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//             </button>
//           </div>

//           {/* DESKTOP LINKS */}
//           <div className="hidden xl:flex items-center gap-4">
//             <a href="#" className="text-lg hover:text-blue-900 font-bold">
//               Members Corner
//             </a>
//             <a href="#" className="text-lg hover:text-blue-900 font-bold">
//               Students Corner
//             </a>
//             <img
//               src="/img/Aima_TV.svg"
//               alt="AIMA TV"
//               className="h-12"
//               loading="lazy"
//             />
//           </div>

//           {/* MOBILE MENU BTN */}
//           <button
//             onClick={() => setMobileOpen(true)}
//             className="xl:hidden text-3xl"
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       {/* NAVBAR */}
//       <nav className={`hidden xl:flex bg-[#0C478B] text-white h-11.25 items-center z-100 ${
//         isSticky ? "fixed top-0 w-full shadow-2xl" : "relative"
//       }`}>
//         <div className="px-4 lg:px-28 w-full">
//           <ul className="flex  items-center gap-6 text-[15px] font-semibold whitespace-nowrap">
//             {data?.map((item:any) => {
//               const isActive = pathname === item?.url;
//               return (
//                 <li key={item?.id}>
//                   <Link
//                     href={item?.url}
//                     className={`py-1 block border-b-2 transition-all duration-500 ${
//                       isActive ? "border-white" : "border-transparent hover:border-white"
//                     }`}
//                   >
//                     {item?.title}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </nav>

//       {/* MOBILE MENU */}
//       <div
//         className={`fixed top-0 right-0 w-63.5 h-screen bg-white shadow-xl
//         transform transition-transform duration-300 xl:hidden z-999
//         rounded-l-xl overflow-y-auto ${
//           mobileOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-end px-5 py-3 border-b">
//           <button
//             onClick={() => setMobileOpen(false)}
//             className="text-2xl hover:rotate-90 transition duration-300"
//           >
//             ✕
//           </button>
//         </div>

//         <ul className="flex flex-col px-6 py-4 gap-6 text-gray-700 font-semibold">
//           <li>
//             <a href="#" className="text-lg hover:text-blue-900 font-bold">
//               Members Corner
//             </a>
//           </li>
//           <li>
//             <a href="#" className="text-lg hover:text-blue-900 font-bold">
//               Students Corner
//             </a>
//           </li>

//           <hr />

//           {data?.map((item:any) => {
//             const isActive = pathname === item?.url;
//             return (
//               <li key={item?.id}>
//                 <Link
//                   href={item?.url}
//                   onClick={() => setMobileOpen(false)}
//                   className={`block transition-all duration-300 ${
//                     isActive
//                       ? "text-blue-900 font-bold border-l-4 border-blue-900 pl-2"
//                       : "hover:text-blue-700"
//                   }`}
//                 >
//                   {item?.title}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { getSearchResults } from "@/actionCreator/home.actionCreator";

function DropdownItem({ child, pathname }: { child: any; pathname: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const hasSubChildren = child.children && child.children.length > 0;
  const isChildActive = pathname === child.url;
  const isMat = child.title?.trim().toLowerCase() === "mat";
  const targetProps = isMat
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group/sub"
    >
      <div className="flex items-center justify-between w-full hover:bg-[#073970] transition-colors duration-200">
        <Link
          href={child.url}
          {...targetProps}
          className={`flex-grow block px-4 py-2.5 text-sm whitespace-normal text-left ${
            isChildActive
              ? "font-bold text-white"
              : "text-gray-100/90 hover:text-white"
          }`}
        >
          {child.title}
        </Link>
        {hasSubChildren && (
          <svg
            className={`w-3.5 h-3.5 mr-3 text-gray-200/80 transition-transform duration-300 ${isHovered ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>

      {hasSubChildren && isHovered && (
        <div className="absolute left-full top-0 pl-1 z-[1000] min-w-[220px] animate-in fade-in slide-in-from-left-2 duration-200">
          <ul className="bg-[#0C478B] border border-white/10 rounded-lg shadow-2xl py-2 overflow-hidden">
            {child.children.map((subChild: any) => {
              const isSubChildActive = pathname === subChild.url;
              const isSubMat = subChild.title?.trim().toLowerCase() === "mat";
              const subTargetProps = isSubMat
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <li key={subChild.id}>
                  <Link
                    href={subChild.url}
                    {...subTargetProps}
                    className={`block px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-[#073970] text-left whitespace-normal ${
                      isSubChildActive
                        ? "bg-[#073970] font-bold text-white"
                        : "text-gray-100/90 hover:text-white"
                    }`}
                  >
                    {subChild.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}

function NavigationItem({ item, pathname }: { item: any; pathname: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );
  const itemRef = useRef<HTMLLIElement>(null);
  const isHome =
    item?.url === "/home" || item?.url === "home" || item?.url === "/";
  const targetUrl = isHome ? "/" : item?.url;
  const isActive = pathname === targetUrl;
  const hasChildren = item.children && item.children.length > 0;

  const updateCoords = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const dropdownWidth = 240; // min-w-[240px]
      const screenWidth = window.innerWidth;

      let left = rect.left;
      if (rect.left + dropdownWidth > screenWidth) {
        // If it overflows the right side of the screen, align it to the right of the menu item
        left = Math.max(10, rect.right - dropdownWidth);
      }

      setCoords({
        top: rect.bottom,
        left: left,
      });
    }
  };

  useEffect(() => {
    if (isHovered) {
      updateCoords();

      window.addEventListener("scroll", updateCoords, { passive: true });
      window.addEventListener("resize", updateCoords, { passive: true });

      const navEl = itemRef.current?.closest("nav");
      if (navEl) {
        navEl.addEventListener("scroll", updateCoords, { passive: true });
      }

      return () => {
        window.removeEventListener("scroll", updateCoords);
        window.removeEventListener("resize", updateCoords);
        if (navEl) {
          navEl.removeEventListener("scroll", updateCoords);
        }
      };
    }
  }, [isHovered]);

  return (
    <li
      ref={itemRef}
      onMouseEnter={() => {
        setIsHovered(true);
        updateCoords();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative py-2 flex items-center gap-1.5 cursor-pointer"
    >
      <Link
        href={targetUrl}
        className={`py-1 block border-b-2 transition-all duration-500 ${
          isActive
            ? "border-white"
            : "border-transparent group-hover:border-white"
        }`}
      >
        {item?.title}
      </Link>
      {hasChildren && (
        <svg
          className={`w-3.5 h-3.5 opacity-80 transition-transform duration-300 ${
            isHovered ? "rotate-180" : ""
          } cursor-pointer`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}

      {hasChildren && isHovered && coords && (
        <div
          style={{
            position: "fixed",
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
          className="pt-1 z-[999] min-w-[240px] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <ul className="bg-[#0C478B] border border-white/10 rounded-lg shadow-2xl py-2">
            {item.children.map((child: any) => (
              <DropdownItem key={child.id} child={child} pathname={pathname} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function Header({ data }: any) {
  const pathname = usePathname();
  const routeer = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [searchError, setSearchError] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  console.log("results", results);
  // Submenu expansion state for mobile accordion
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<
    Record<number, boolean>
  >({});
  const toggleMobileMenu = (id: number) => {
    setExpandedMobileMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [expandedMobileSubMenus, setExpandedMobileSubMenus] = useState<
    Record<number, boolean>
  >({});
  const toggleMobileSubMenu = (id: number) => {
    setExpandedMobileSubMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Render children items directly as returned by the API
  const menuData = data || [];

  useEffect(() => {
    const topHeader = document.getElementById("topHeader");

    const handleScroll = () => {
      if (!topHeader) return;
      setIsSticky(window.scrollY > topHeader.offsetHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) {
      setKeyword("");
      setResults([]);
      return;
    }

    if (keyword.trim().length < 2) {
      setResults([]);
      setSearchError("");
      return;
    }

    setIsLoading(true);
    setSearchError("");

    const delayDebounce = setTimeout(async () => {
      try {
        const response = await getSearchResults({ keyword: keyword.trim() });
        if (response?.success) {
          setResults(response?.data?.data || []);
        } else {
          setResults([]);
          setSearchError(response?.message || "Something went wrong.");
        }
      } catch (err) {
        // console.error("Search error:", err);
        setResults([]);
        setSearchError("Failed to fetch search results.");
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [keyword, searchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`bg-white transition-all duration-300 `}>
      {/* TOP HEADER */}
      <div
        id="topHeader"
        className={`flex items-center justify-between px-4 lg:px-8 h-20 lg:h-[90px]`}
      >
        {/* LOGO */}
        <div className="flex items-center">
          <Link href={"/home"}>
            <img
              src="https://aima.sanntra.com/aimaweb/img/logo.png"
              className="w-[170px] h-auto object-contain"
              loading="lazy"
            />
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 lg:gap-6 text-gray-700">
          {/* SEARCH */}
          <div ref={searchContainerRef} className="relative flex items-center">
            {/* Desktop Input */}
            <input
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className={`absolute right-10 py-2  text-sm transition-all duration-300 border-2 border-[#0c478b]  focus:border-[#0c478b] focus:outline-none bg-white rounded-md hidden xl:block ${
                searchOpen
                  ? "w-86 px-3 py-1 border border-gray-300 opacity-100"
                  : "w-0 p-0 border-0 opacity-0 pointer-events-none"
              }`}
            />

            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (!searchOpen) {
                  setTimeout(() => {
                    const selector =
                      window.innerWidth >= 1280
                        ? "input.xl\\:block"
                        : "input:not(.xl\\:block)";
                    const input = searchContainerRef.current?.querySelector(
                      selector,
                    ) as HTMLInputElement;
                    input?.focus();
                  }, 100);
                }
              }}
              className="ml-4 group lg:text-xl"
              aria-label="Toggle search"
            >
              <svg
                className="w-7 h-7 group-hover:scale-110 transition"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* DESKTOP SEARCH DROPDOWN */}
            {searchOpen && (
              <div className="absolute right-9 top-8 bg-white border border-gray-200 rounded-lg shadow-xl w-80 lg:w-88 z-[999] max-h-96 overflow-y-auto mt-2 transition-all duration-200 hidden xl:block">
                {isLoading ? (
                  <div className="flex items-center justify-center p-6 text-sm text-gray-500">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0C478B]"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Searching...</span>
                  </div>
                ) : keyword.trim().length < 2 ? (
                  <div className="p-4 text-xs text-gray-400 text-center font-medium">
                    Type at least 2 characters to search
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-6 text-sm text-gray-500 text-center font-medium">
                    {searchError || "No results found"}
                  </div>
                ) : (
                  <div className="py-2">
                    <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 border-b border-gray-100 uppercase tracking-wider">
                      Search Results ({results.length})
                    </div>
                    <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                      {results.map((item: any, idx: number) => {
                        let badgeBg =
                          "bg-blue-50 text-blue-700 border-blue-100";
                        if (item.type === "Event") {
                          badgeBg =
                            "bg-amber-50 text-amber-700 border-amber-100";
                        } else if (item.type === "Media Center") {
                          badgeBg =
                            "bg-purple-50 text-purple-700 border-purple-100";
                        } else if (item.type === "Management TV") {
                          badgeBg = "bg-red-50 text-red-700 border-red-100";
                        } else if (item.type === "Publication") {
                          badgeBg =
                            "bg-emerald-50 text-emerald-700 border-emerald-100";
                        } else if (item.type === "LMA Network") {
                          badgeBg = "bg-teal-50 text-teal-700 border-teal-100";
                        }

                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (item.type === "Event") {
                                routeer.push(`/events/${item.slug}`);
                                setSearchOpen(false);
                              } else if (item.type === "Media Center") {
                                if (item.pdf_file) {
                                  window.open(item.pdf_file, "_blank");
                                } else {
                                  routeer.push(
                                    `/${item.sub_type === "aima-in-the-news" ? "media-center" : item?.sub_type}/${item.slug}`,
                                  );
                                }
                                setSearchOpen(false);
                              } else if (item.type === "Article") {
                                routeer.push(`/articles/${item.slug}`);
                                setSearchOpen(false);
                              } else if (item.type === "Management TV") {
                                routeer.push(`/management-tv/${item.slug}`);
                                setSearchOpen(false);
                              } else if (item.type === "Publication") {
                                routeer.push(
                                  `/report-publications/${item.slug}`,
                                );
                                setSearchOpen(false);
                              } else if (item.type === "LMA Network") {
                                routeer.push(`/lma-network/${item.slug}`);
                                setSearchOpen(false);
                              } else {
                                routeer.push(`/${item.slug}`);
                                setSearchOpen(false);
                              }
                            }}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition flex flex-col gap-1 text-left"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] lowercase font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}
                              >
                                {item.type}
                              </span>
                              <span className="text-[11px] text-gray-400 font-mono truncate max-w-[200px]">
                                /{item.slug}
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-blue-900 transition">
                              {item.title}
                            </h4>
                            {item.description && (
                              <p
                                className="text-xs text-gray-500 line-clamp-1"
                                dangerouslySetInnerHTML={{
                                  __html: item.description.replace(
                                    /<[^>]*>/g,
                                    "",
                                  ),
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE SEARCH OVERLAY (Rendered inside searchContainerRef) */}
            {searchOpen && (
              <div className="fixed inset-x-0 top-0 h-20 bg-white flex items-center px-4 z-[999] xl:hidden shadow-md animate-in fade-in duration-200">
                <div className="flex items-center w-full gap-2 relative">
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <line
                      x1="21"
                      y1="21"
                      x2="16.65"
                      y2="16.65"
                      strokeWidth="2"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full h-11 pl-10 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C478B] bg-white text-black"
                    autoFocus
                  />
                  {keyword && (
                    <button
                      onClick={() => setKeyword("")}
                      className="absolute right-20 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      ✕
                    </button>
                  )}
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-[#0C478B] font-semibold text-sm px-2 py-1 hover:bg-blue-50 rounded focus:outline-none"
                  >
                    Cancel
                  </button>

                  {/* SEARCH DROPDOWN FOR MOBILE */}
                  <div className="absolute top-13 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[70vh] overflow-y-auto mt-2 z-[1000]">
                    {isLoading ? (
                      <div className="flex items-center justify-center p-6 text-sm text-gray-500">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0C478B]"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Searching...</span>
                      </div>
                    ) : keyword.trim().length < 2 ? (
                      <div className="p-4 text-xs text-gray-400 text-center font-medium">
                        Type at least 2 characters to search
                      </div>
                    ) : results.length === 0 ? (
                      <div className="p-6 text-sm text-gray-500 text-center font-medium">
                        {searchError || "No results found"}
                      </div>
                    ) : (
                      <div className="py-2">
                        <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 border-b border-gray-100 uppercase tracking-wider text-left">
                          Search Results ({results.length})
                        </div>
                        <div className="divide-y divide-gray-50 max-h-[50vh] overflow-y-auto">
                          {results.map((item: any, idx: number) => {
                            let badgeBg =
                              "bg-blue-50 text-blue-700 border-blue-100";
                            if (item.type === "Event") {
                              badgeBg =
                                "bg-amber-50 text-amber-700 border-amber-100";
                            } else if (item.type === "Media Center") {
                              badgeBg =
                                "bg-purple-50 text-purple-700 border-purple-100";
                            } else if (item.type === "Management TV") {
                              badgeBg = "bg-red-50 text-red-700 border-red-100";
                            } else if (item.type === "Publication") {
                              badgeBg =
                                "bg-emerald-50 text-emerald-700 border-emerald-100";
                            } else if (item.type === "LMA Network") {
                              badgeBg =
                                "bg-teal-50 text-teal-700 border-teal-100";
                            }

                            return (
                              <div
                                key={idx}
                                onClick={() => {
                                  if (item.type === "Event") {
                                    routeer.push(`/events/${item.slug}`);
                                  } else if (item.type === "Media Center") {
                                    if (item.pdf_file) {
                                      window.open(item.pdf_file, "_blank");
                                    } else {
                                      routeer.push(
                                        `/media-center/${item.slug}`,
                                      );
                                    }
                                  } else if (item.type === "Article") {
                                    routeer.push(`/articles/${item.slug}`);
                                  } else if (item.type === "Management TV") {
                                    routeer.push(`/management-tv/${item.slug}`);
                                  } else if (item.type === "Publication") {
                                    routeer.push(
                                      `/report-publications/${item.slug}`,
                                    );
                                  } else if (item.type === "LMA Network") {
                                    routeer.push(`/lma-network/${item.slug}`);
                                  } else {
                                    routeer.push(`/${item.slug}`);
                                  }
                                  setSearchOpen(false);
                                }}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition flex flex-col gap-1 text-left"
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-[10px] lowercase font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}
                                  >
                                    {item.type}
                                  </span>
                                  <span className="text-[11px] text-gray-400 font-mono truncate max-w-[200px]">
                                    /{item.slug}
                                  </span>
                                </div>
                                <h4 className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-blue-900 transition">
                                  {item.title}
                                </h4>
                                {item.description && (
                                  <p
                                    className="text-xs text-gray-500 line-clamp-1"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description.replace(
                                        /<[^>]*>/g,
                                        "",
                                      ),
                                    }}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden xl:flex items-center gap-4">
            <Link
              href="/for-members"
              className="text-lg hover:text-blue-900 font-bold"
            >
              For Members
            </Link>

            <span className="w-[1px] h-6 bg-gray-300"></span>

            <Link
              href="/for-student"
              className="text-lg hover:text-blue-900 font-bold"
            >
              For Students
            </Link>

            <span className="w-[1px] h-6 bg-gray-300"></span>
            <Link href="/aima-management-tv">
              <img
                src="https://aima.sanntra.com/aimaweb/img/Aima_TV.svg"
                alt="AIMA TV"
                className="h-12"
                loading="lazy"
              />
            </Link>
          </div>

          {/* MOBILE MENU BTN */}
          <button
            onClick={() => setMobileOpen(true)}
            className="xl:hidden text-3xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* NAVBAR */}
      <nav
        className={`hidden xl:flex no-scrollbar  bg-[#0C478B] text-white h-[45px] items-center z-[100] ${
          isSticky ? "fixed top-0 w-full shadow-2xl" : "relative"
        }`}
      >
        <div className="px-4 lg:px-8 xl:px-10 min-[1500px]:px-30 w-full">
          <ul className="flex justify-between gap-2 min-[1400px]:gap-6 text-sm font-semibold whitespace-nowrap">
            {menuData?.map((item: any) => (
              <NavigationItem key={item?.id} item={item} pathname={pathname} />
            ))}
          </ul>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 w-[254px] h-screen bg-white shadow-xl 
        transform transition-transform duration-300 xl:hidden z-999
        rounded-l-xl overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-5 py-3 border-b">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-2xl hover:rotate-90 transition duration-300"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col px-6 py-4 gap-6 text-gray-700 font-semibold">
          <li>
            <Link
              href="/for-members"
              onClick={() => setMobileOpen(false)}
              className="text-lg hover:text-blue-900 font-bold"
            >
              For Members
            </Link>
          </li>
          <li>
            <Link
              href="/for-student"
              onClick={() => setMobileOpen(false)}
              className="text-lg hover:text-blue-900 font-bold"
            >
              For Students
            </Link>
          </li>

          <hr />

          {menuData?.map((item: any) => {
            const isHome =
              item?.url === "/home" ||
              item?.url === "home" ||
              item?.url === "/";
            const targetUrl = isHome ? "/" : item?.url;
            const isActive = pathname === targetUrl;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedMobileMenus[item.id] || false;
            return (
              <li
                key={item?.id}
                className="border-b border-gray-100 last:border-b-0 pb-2 flex flex-col"
              >
                <div className="flex items-center justify-between w-full">
                  <Link
                    href={targetUrl}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-1 transition-all duration-300 flex-grow text-left ${
                      isActive
                        ? "text-blue-900 font-bold"
                        : "hover:text-blue-700"
                    }`}
                  >
                    {item?.title}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => toggleMobileMenu(item.id)}
                      className="p-2 text-gray-500 hover:text-blue-900 transition-colors focus:outline-none"
                      aria-label="Toggle submenu"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {hasChildren && isExpanded && (
                  <ul className="pl-4 mt-2 mb-1 border-l border-gray-200 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
                    {item.children.map((child: any) => {
                      const isChildActive = pathname === child.url;
                      const hasSubChildren =
                        child.children && child.children.length > 0;
                      const isSubExpanded =
                        expandedMobileSubMenus[child.id] || false;
                      return (
                        <li key={child.id} className="flex flex-col">
                          <div className="flex items-center justify-between w-full">
                            <Link
                              href={child.url}
                              onClick={() => setMobileOpen(false)}
                              className={`block py-1 text-sm transition-colors duration-200 text-left flex-grow ${
                                isChildActive
                                  ? "text-blue-900 font-semibold"
                                  : "text-gray-600 hover:text-blue-700"
                              }`}
                            >
                              {child.title}
                            </Link>
                            {hasSubChildren && (
                              <button
                                onClick={() => toggleMobileSubMenu(child.id)}
                                className="p-2 text-gray-400 hover:text-blue-900 transition-colors focus:outline-none"
                                aria-label="Toggle sub-submenu"
                              >
                                <svg
                                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isSubExpanded ? "rotate-180" : ""}`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                          {hasSubChildren && isSubExpanded && (
                            <ul className="pl-4 mt-1.5 mb-1 border-l border-gray-100 flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-150">
                              {child.children.map((subChild: any) => {
                                const isSubChildActive =
                                  pathname === subChild.url;
                                return (
                                  <li key={subChild.id}>
                                    <Link
                                      href={subChild.url}
                                      onClick={() => setMobileOpen(false)}
                                      className={`block py-1 text-[13px] transition-colors duration-200 text-left ${
                                        isSubChildActive
                                          ? "text-blue-900 font-medium"
                                          : "text-gray-500 hover:text-blue-700"
                                      }`}
                                    >
                                      {subChild.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* ARTICLE DETAILS MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[99999] p-4 transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 border-b border-gray-100 bg-gray-50/50">
              <div className="pr-6">
                <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 mb-2 text-left">
                  {selectedArticle.type}
                </span>
                <h3 className="text-xl font-bold text-gray-900 leading-snug text-left">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition p-1.5 rounded-full flex-shrink-0"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 text-gray-700 leading-relaxed text-[15px] space-y-4 text-left">
              {selectedArticle.description ? (
                <div
                  className="prose prose-blue max-w-none 
                    [&>p]:mb-4 [&>p:last-child]:mb-0 
                    [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 
                    [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4
                    [&>strong]:font-semibold [&>strong]:text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: selectedArticle.description,
                  }}
                />
              ) : (
                <p className="text-gray-400 italic">
                  No content details available for this article.
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end items-center gap-3 p-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-[#0C478B] hover:bg-blue-800 text-white rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
