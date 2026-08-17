"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Block } from "@/types/blocks.types";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  block: Block;
}

interface CommitteeItem {
  id: number;
  name: string; // Combined name, e.g. "Mr. P Dwarakanath / Mr. Shiv Siddhant Kaul"
  slug: string;
  designation: string | null;
  post_committee_name: string | null; // e.g. "Finance Committee"
  organisation: string | null;
  duration: string | null;
  profile_pic: string | null;
  priority: number;
}

interface ParsedCommittee {
  id: number;
  committeeName: string;
  chairperson: string;
  coChairperson: string;
  slug: string;
}

const ITEMS_PER_PAGE = 10;

export default function CommitteeChairperson({ block }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rawItems = useMemo(() => {
    return Array.isArray(block.data) ? (block.data as CommitteeItem[]) : [];
  }, [block.data]);

  // Sort by priority or default
  const sortedItems = useMemo(() => {
    return [...rawItems].sort(
      (a, b) => (a.priority || 999) - (b.priority || 999),
    );
  }, [rawItems]);

  // Parse names to split chairperson & co-chairperson
  const parsedItems = useMemo<ParsedCommittee[]>(() => {
    return sortedItems.map((item) => {
      const parts = item.name.split("/");
      const chairperson = parts[0]?.trim() || "";
      const coChairperson = parts[1]?.trim() || chairperson; // Fallback to chairperson if not specified

      return {
        id: item.id,
        committeeName: item.post_committee_name || "Special Committee",
        chairperson,
        coChairperson,
        slug: item.slug,
      };
    });
  }, [sortedItems]);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return parsedItems;
    const lowerSearch = searchTerm.toLowerCase();
    return parsedItems.filter(
      (item) =>
        item.committeeName.toLowerCase().includes(lowerSearch) ||
        item.chairperson.toLowerCase().includes(lowerSearch) ||
        item.coChairperson.toLowerCase().includes(lowerSearch),
    );
  }, [parsedItems, searchTerm]);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const sectionTitle = useMemo(() => {
    if (block.title) return block.title;
    if (block.name) return block.name;
    return "Committee Chairpersons";
  }, [block.title, block.name]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="pt-10 pb-20 bg-[#EEF3F8]" id="committee-chairperson">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        {/* <div className="text-center mb-10">
          {block.description ? (
            <div
              className="font-heading text-center"
              dangerouslySetInnerHTML={{ __html: block.description }}
            />
          ) : (
            <div>
              <p className="tracking-widest uppercase text-xs text-gray-500 mb-2 font-medium">
                AIMA Committees
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0B1F3A]">
                {sectionTitle}
              </h2>
            </div>
          )}
        </div> */}

        {/* Premium Search Filter */}
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by committee or member name..."
            className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0D478B] focus:border-transparent text-sm shadow-sm transition duration-150 ease-in-out"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0D478B] text-white">
                  <th className="w-20 px-5 py-4 text-center font-semibold border-r border-blue-400/30 text-sm">
                    S.No.
                  </th>
                  <th className="w-72 px-6 py-4 text-left font-semibold border-r border-blue-400/30 text-sm">
                    Name of Committee
                  </th>
                  <th className="w-72 px-6 py-4 text-left font-semibold border-r border-blue-400/30 text-sm">
                    Chairperson
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">
                    Co-Chairperson
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-100">
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item, index) => {
                    const globalIndex =
                      (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                    return (
                      <tr
                        key={item.id || index}
                        // onClick={() => {
                        //   if (item.slug) {
                        //     router.push(`/management-detail/${item.slug}`);
                        //   }
                        // }}
                        className="group hover:bg-blue-50/40 transition duration-150 cursor-pointer"
                      >
                        {/* S.No. */}
                        <td className="px-5 py-4 text-center text-sm font-medium text-gray-500 border-r border-gray-100 group-hover:border-blue-100/50">
                          {globalIndex}
                        </td>

                        {/* Name of Committee */}
                        <td className="px-6 py-4 font-semibold text-gray-800 border-r border-gray-100 group-hover:border-blue-100/50 text-sm">
                          {item.committeeName}
                        </td>

                        {/* Chairperson */}
                        <td className="px-6 py-4 border-r border-gray-100 group-hover:border-blue-100/50">
                          <p className="font-bold text-[#0B1F3A] group-hover:text-[#0D478B] transition text-[15px]">
                            {item.chairperson}
                          </p>
                        </td>

                        {/* Co-Chairperson */}
                        <td className="px-6 py-4">
                          <p className="font-bold text-[#0B1F3A] group-hover:text-[#0D478B] transition text-[15px]">
                            {item.coChairperson}
                          </p>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No committees found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Premium Pagination controls inside the container footer */}
          {filteredItems.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4 select-none">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-800">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {filteredItems.length}
                </span>{" "}
                entries
              </div>

              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      Math.abs(pageNum - currentPage) <= 1
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-sm font-semibold transition duration-150 ${
                            currentPage === pageNum
                              ? "bg-[#0D478B] text-white"
                              : "border border-transparent text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return (
                        <span
                          key={pageNum}
                          className="text-gray-400 px-1 text-sm select-none"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                  aria-label="Next Page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
