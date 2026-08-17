"use client";

import React, { useState } from "react";
import { submitContactForm } from "@/actionCreator/home.actionCreator";
import { toast } from "sonner";

interface OfficeDetail {
  title: string;
  address: string;
  phones: string[];
}

function parseOfficeDetailsFromHtml(html: string): OfficeDetail {
  const defaults: OfficeDetail = {
    title: "Head Office",
    address:
      "Management House, 14 Institutional Area, Lodhi Road, New Delhi – 110003",
    phones: ["011 – 24617354", "011 – 24617354"],
  };

  if (!html) return defaults;

  try {
    // Strip HTML comments to avoid parsing commented-out code
    const cleanedHtml = html.replace(/<!--[\s\S]*?-->/g, "");

    // Find Left side block by index lookup to be completely safe against nested divs
    const startIdx = cleanedHtml.indexOf("bg-[#0D478B]");
    const endIdx = cleanedHtml.indexOf("bg-[#EEF3F8]");

    const leftSideHtml =
      startIdx !== -1 && endIdx !== -1
        ? cleanedHtml.substring(startIdx, endIdx)
        : cleanedHtml;

    // 1. Try to extract Title (e.g. Head Office) from leftSideHtml
    let title = defaults.title;
    const titleMatch = leftSideHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].replace(/<[^>]*>/g, "").trim();
    }

    // 2. We extract address and phone numbers inside the <p> tags from leftSideHtml only
    const pMatches = Array.from(
      leftSideHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi),
    );

    let address = defaults.address;
    let phones = defaults.phones;

    const cleanText = (text: string) => {
      return text
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/&ndash;/g, "–")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/<[^>]*>/g, "") // strip other HTML tags
        .replace(/[ \t]+/g, " ") // normalize spacing
        .trim();
    };

    if (pMatches.length >= 2) {
      // First <p> tag is address details
      address = cleanText(pMatches[0][1]);

      // Second <p> tag has phone numbers
      const phoneText = cleanText(pMatches[1][1]);
      phones = phoneText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);
    } else if (pMatches.length === 1) {
      address = cleanText(pMatches[0][1]);
    }

    return { title, address, phones };
  } catch (e) {
    // console.error("Failed to parse address data from HTML, using defaults", e);
    return defaults;
  }
}

function parseOfficesFromHtml(html: string): string[] {
  const defaults = ["Lodhi Road Office", "Lajpat Nagar Office"];
  if (!html) return defaults;

  try {
    const cleanedHtml = html.replace(/<!--[\s\S]*?-->/g, "");

    const radioSectionMatch =
      cleanedHtml.match(
        /<!--Office Selection-->\s*<div[^>]*>([\s\S]*?)<\/div>/i,
      ) ||
      cleanedHtml.match(
        /<div class="[^"]*flex flex-wrap items-center justify-center[^"]*">([\s\S]*?)<\/div>/i,
      ) ||
      cleanedHtml.match(/<div[^>]*gap-8[^>]*>([\s\S]*?)<\/div>/i);

    const contentToSearch = radioSectionMatch
      ? radioSectionMatch[1]
      : cleanedHtml;

    const spanMatches = Array.from(
      contentToSearch.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/gi),
    );
    if (spanMatches.length > 0) {
      return spanMatches
        .map((m) =>
          m[1]
            .replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .trim(),
        )
        .filter(Boolean);
    }

    return defaults;
  } catch (e) {
    // console.error("Failed to parse office names from HTML, using defaults", e);
    return defaults;
  }
}

export default function ContactSection({ data }: any) {
  const [selectedOfficeIndex, setSelectedOfficeIndex] = useState<number>(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Extract block HTML details
  const apiDetailHtml = data?.detail || data?.data?.detail || "";
  const parsedLodhiOffice = parseOfficeDetailsFromHtml(apiDetailHtml);
  const parsedOfficeNames = parseOfficesFromHtml(apiDetailHtml);

  // Dynamic offices list matching parsed names
  const officesList: { name: string; detail: OfficeDetail }[] =
    parsedOfficeNames.map((name, index) => {
      if (index === 0) {
        return {
          name,
          detail: parsedLodhiOffice,
        };
      }
      return {
        name,
        detail: {
          title: name,
          address:
            "15, Link Road, Lajpat Nagar 3, New Delhi – 110024 (Opposite Metro Pillar No. 26)",
          phones: ["011 – 47673000", "011 – 49868399"],
        },
      };
    });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const currentOffice = officesList[selectedOfficeIndex] || officesList[0];

    setLoading(true);
    try {
      const payload = {
        ...formData,
        location: currentOffice.name,
      };

      const res = await submitContactForm(payload);

      if (res?.success || res?.status) {
        toast.success("Your message has been sent successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(
          res?.message || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      // console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const activeOffice = (officesList[selectedOfficeIndex] || officesList[0])
    .detail;

  return (
    <section className="py-20 bg-white" id="home-contact-us">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center tracking-widest uppercase text-xs mb-3 text-gray-500 font-semibold">
          GET IN TOUCH
        </p>

        <h2 className="text-center font-heading text-[32px] md:text-[48px] font-semibold mb-8 text-black">
          Contact <span className="text-[#E4AB25]">Us</span>
        </h2>

        {/* Office Selection Toggle (Parsed dynamically from API response) */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
          {officesList.map((office, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="office"
                checked={selectedOfficeIndex === index}
                onChange={() => setSelectedOfficeIndex(index)}
                className="w-5 h-5 accent-[#0D478B] cursor-pointer"
              />
              <span
                className={`text-lg transition-all duration-200 ${
                  selectedOfficeIndex === index
                    ? "text-black font-semibold scale-105"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              >
                {office.name}
              </span>
            </label>
          ))}
        </div>

        {/* Form and Address Box */}
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          {/* LEFT SIDE - Office Information */}
          <div className="bg-[#0D478B] text-white p-10 lg:p-14 flex flex-col justify-between transition-all duration-500">
            <div>
              <h3 className="text-4xl font-heading font-semibold mb-14 transition-all duration-300">
                {activeOffice.title}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-6 mb-12">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  <svg
                    className="w-7 h-7 text-[#0D478B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M12 21s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <p className="text-[17px]   whitespace-pre-line">
                  {activeOffice.address}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-7 h-7 text-[#0D478B]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.373 20.373 0 0 1-9.472-9.472c-.155-.44.01-1.077.387-1.36l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </div>
                <p className="text-[17px] leading-relaxed pt-1.5">
                  {activeOffice.phones.map((phone, i) => (
                    <React.Fragment key={`${phone}-${i}`}>
                      {phone}
                      {i < activeOffice.phones.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Send Message Form */}
          <div className="bg-[#EEF3F8] p-10 lg:p-14 flex flex-col justify-center">
            <h3 className="font-heading text-4xl font-semibold mb-10 text-black">
              Send us a Message
            </h3>

            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* First Name */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                  className="w-full h-14 rounded-lg border border-gray-300 px-4 outline-none focus:border-[#0D478B] transition duration-200 text-black bg-white"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                  className="w-full h-14 rounded-lg border border-gray-300 px-4 outline-none focus:border-[#0D478B] transition duration-200 text-black bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  className="w-full h-14 rounded-lg border border-gray-300 px-4 outline-none focus:border-[#0D478B] transition duration-200 text-black bg-white"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  required
                  className="w-full h-14 rounded-lg border border-gray-300 px-4 outline-none focus:border-[#0D478B] transition duration-200 text-black bg-white"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2 text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                  rows={4}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0D478B] transition duration-200 text-black bg-white resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto cursor-pointer mt-2 inline-flex items-center justify-center gap-5 bg-[#0D478B] hover:bg-[#0b3d79] transition disabled:opacity-70 text-white font-semibold px-8 py-4 rounded-full shadow-lg"
                >
                  {loading ? "SENDING..." : "SEND MESSAGE"}
                  <span className="w-10 h-10 rounded-full bg-white text-[#0D478B] flex items-center justify-center text-lg shrink-0">
                    &rarr;
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
