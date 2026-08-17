"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Block } from "@/types/blocks.types";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  block: Block;
}

interface CouncilMember {
  id: number;
  name: string;
  slug: string;
  designation: string | null;
  post_committee_name: string | null;
  organisation: string | null;
  duration: string | null;
  profile_pic: string | null;
  priority: number;
}

const ITEMS_PER_PAGE = 10;

export default function CouncilOfManagement({ block }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rawMembers = useMemo(() => {
    return Array.isArray(block.data) ? (block.data as CouncilMember[]) : [];
  }, [block.data]);

  // Sort by priority if available, otherwise preserve order
  const sortedMembers = useMemo(() => {
    return [...rawMembers].sort(
      (a, b) => (a.priority || 999) - (b.priority || 999),
    );
  }, [rawMembers]);

  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return sortedMembers;
    const lowerSearch = searchTerm.toLowerCase();
    return sortedMembers.filter(
      (m) =>
        (m.name && m.name.toLowerCase().includes(lowerSearch)) ||
        (m.post_committee_name &&
          m.post_committee_name.toLowerCase().includes(lowerSearch)) ||
        (m.designation && m.designation.toLowerCase().includes(lowerSearch)) ||
        (m.organisation && m.organisation.toLowerCase().includes(lowerSearch)),
    );
  }, [sortedMembers, searchTerm]);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMembers.length / ITEMS_PER_PAGE),
  );

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMembers, currentPage]);

  const sectionTitle = useMemo(() => {
    if (block.title) return block.title;
    if (block.name) return block.name;
    return "Council of Management";
  }, [block.title, block.name]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="pb-20 pt-10 bg-[#EEF3F8]" id="council-of-management">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Description */}
        {/* <div className="text-center mb-10">
          {block.description ? (
            <div
              className="font-heading text-center"
              dangerouslySetInnerHTML={{ __html: block.description }}
            />
          ) : (
            <div>
              <p className="tracking-widest uppercase text-xs text-gray-500 mb-2 font-medium">
                AIMA Leadership
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0B1F3A]">
                {sectionTitle}
              </h2>
            </div>
          )}
        </div> */}

        {/* Search Box - Premium styling */}
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, position, or company..."
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
                    Position
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">
                    Name &amp; Designation
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-100">
                {paginatedMembers.length > 0 ? (
                  paginatedMembers.map((member, index) => {
                    const globalIndex =
                      (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                    return (
                      <tr
                        key={member.id || index}
                        // onClick={() => {
                        //   if (member.slug) {
                        //     router.push(`/management-detail/${member.slug}`);
                        //   }
                        // }}
                        className="group hover:bg-blue-50/40 transition duration-150 cursor-pointer"
                      >
                        {/* S.No */}
                        <td className="px-5 py-4 text-center text-sm font-medium text-gray-500 border-r border-gray-100 group-hover:border-blue-100/50">
                          {globalIndex}
                        </td>

                        {/* Position */}
                        <td className="px-6 py-4 font-semibold text-gray-800 border-r border-gray-100 group-hover:border-blue-100/50 text-sm">
                          {member.post_committee_name || "Member"}
                        </td>

                        {/* Name & Designation */}
                        <td className="px-6 py-4 text-left">
                          <div className="flex flex-col">
                            <p className="font-bold text-[#0B1F3A] group-hover:text-[#0D478B] transition text-[15px]">
                              {member.name}
                            </p>
                            {member.designation && (
                              <p className="text-sm text-gray-600 mt-0.5">
                                {member.designation}
                              </p>
                            )}
                            {member.organisation && (
                              <p className="text-sm text-[#0D478B] mt-0.5 font-medium">
                                {member.organisation}
                              </p>
                            )}
                            {member.duration && (
                              <span className="inline-block bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-medium mt-1 w-max">
                                {member.duration}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No members found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Premium Pagination controls inside the container footer */}
          {filteredMembers.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4 select-none">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-800">
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredMembers.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {filteredMembers.length}
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
                    // Show current page, first, last, and pages close to current
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
