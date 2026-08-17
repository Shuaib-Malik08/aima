"use client";

import React, { useState } from "react";
import { requestBrochure } from "@/actionCreator/home.actionCreator";
import { toast } from "sonner";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Other",
];

function BuildManagment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Main Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    profile: "",
    area_of_interest: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Modal Form State (Only 3 fields as previous)
  const [modalFormData, setModalFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.state ||
      !formData.profile ||
      !formData.area_of_interest
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await requestBrochure(formData);

      if (res?.status || res?.success) {
        toast.success("Your request has been submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          state: "",
          profile: "",
          area_of_interest: "",
        });
      } else {
        toast.error(res?.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFormData.name || !modalFormData.email || !modalFormData.phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    setModalSubmitting(true);
    try {
      const payload = {
        name: modalFormData.name,
        email: modalFormData.email,
        phone: modalFormData.phone,
        state: "N/A",
        profile: "N/A",
        area_of_interest: "N/A",
      };
      const res = await requestBrochure(payload);

      if (res?.status || res?.success) {
        toast.success("Your request has been submitted successfully!");
        setModalFormData({
          name: "",
          email: "",
          phone: "",
        });
        setIsModalOpen(false);
      } else {
        toast.error(res?.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setModalSubmitting(false);
    }
  };

  return (
    <>
      <section className=" py-20">
        <div className="max-w-360 mx-auto px-4 md:px-15 xl:px-33">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20  items-center">
            <div className="col">
              <h1 className="font-playfair-display font-semibold text-[34px] md:text-[56px] leading-[1.05] text-black">
                Build Your <br />
                Management Career <br />
                with{" "}
                <span className="text-[#D8A12A]">
                  AIMA <br />
                  Programmes.
                </span>
              </h1>

              <p className="text-gray-500 text-base leading-6 mt-4 max-w-125">
                AIMA, the apex body of management in India, has pioneered
                management education across the nation for over seven decades.
                With a legacy of excellence, AIMA continues to shape leaders
                through{" "}
                <strong>contemporary, technology-embedded programmes</strong>{" "}
                that blend academic rigor with practical relevance.
              </p>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-7 bg-[#0D4A8C] text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-[#08396d] transition cursor-pointer"
              >
                Request Brochure & Call Back
              </button>

              <div className="relative mt-10 max-w-175">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2"></div>

                <div className="grid md:grid-cols-2 grid-cols-1">
                  <div className="pr-8 pb-6 border-b border-gray-300">
                    <h3 className="text-[#0D4A8C] font-bold text-[32px] leading-tight inline-block">
                      40+
                      <span className="block w-13.75 h-0.5 bg-[#0D4A8C] mt-2"></span>
                    </h3>

                    <p className="text-[#0D4A8C] font-semibold text-base mt-3">
                      Specialised Programmes
                    </p>

                    <p className="text-gray-500 text-base leading-5 mt-1">
                      across diverse management domains
                    </p>
                  </div>

                  <div className="  py-6 md:pl-8 md:pt-0 md:pb-6 border-b border-gray-300">
                    <h3 className="text-[#0D4A8C] font-bold text-[32px] leading-tight inline-block">
                      70,000+
                      <span className="block w-13.75 h-0.5 bg-[#0D4A8C] mt-2"></span>
                    </h3>

                    <p className="text-[#0D4A8C] font-semibold text-base mt-3">
                      Alumni
                    </p>

                    <p className="text-gray-500 text-base leading-5 mt-1">
                      thriving in top organisations worldwide
                    </p>
                  </div>

                  <div className="md:pr-8  py-6 md:pb-6 border-b md:border-0 border-gray-300">
                    <p className="text-[#0D4A8C] font-semibold text-base leading-6">
                      Flexible learning options to fit your career goals.
                    </p>
                  </div>

                  <div className="md:pl-8 py-6 md:pb-6">
                    <p className="text-[#0D4A8C] font-semibold text-base leading-6">
                      Pioneers in Management Education
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="bg-[#F7F7F7] border border-gray-300 rounded-2xl w-full max-w-135 md:p-8 p-4 shadow-sm ml-auto">
                <h2 className="font-semibold font-heading text-[32px] text-center text-black leading-tight">
                  Start your Journey
                </h2>

                <p className="text-center text-gray-500 text-base mt-2 leading-5">
                  Fill the form to receive programme details, eligibility
                  guidance and fee information.
                </p>

                <div className="w-20 h-0.5 bg-[#D8A12A] mx-auto mt-3 mb-6"></div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white"
                  />

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white text-gray-500"
                  >
                    <option value="">Select State</option>
                    {STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <select
                    name="profile"
                    value={formData.profile}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white text-gray-500"
                  >
                    <option value="">Profile</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Working">Working</option>
                    <option value="Academic Institute">
                      Academic Institute
                    </option>
                    <option value="Corporate">Corporate</option>
                    <option value="Govt/PSU">Govt/PSU</option>
                    <option value="Partner">Partner</option>
                  </select>

                  <select
                    name="area_of_interest"
                    value={formData.area_of_interest}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white text-gray-500"
                  >
                    <option value="">Your Area of Interest</option>
                    <option value="AICTE Programs">AICTE Programs</option>
                    <option value="Autonomous Program">
                      Autonomous Program
                    </option>
                    <option value="Capacity Building Program">
                      Capacity Building Program
                    </option>
                    <option value="Consultancy Project">
                      Consultancy Project
                    </option>
                  </select>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#0D4A8C] text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-[#08396d] transition cursor-pointer disabled:opacity-50"
                    >
                      {submitting
                        ? "Submitting..."
                        : "Request Brochure & Call Back"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-[#F7F7F7] border border-gray-200 shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-200 bg-white">
              <div>
                <h2 className="font-semibold font-heading text-[28px] md:text-[32px] text-black leading-tight">
                  Request Brochure
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-2 leading-5">
                  Fill the form to receive programme details, eligibility
                  guidance and fee information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:text-black hover:border-gray-400 transition flex items-center justify-center text-xl font-bold"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="w-20 h-0.5 bg-[#D8A12A] mb-6"></div>

              <form onSubmit={handleModalFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={modalFormData.name}
                  onChange={handleModalInputChange}
                  placeholder="Name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white"
                />

                <input
                  type="email"
                  name="email"
                  value={modalFormData.email}
                  onChange={handleModalInputChange}
                  placeholder="Email Address"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white"
                />

                <input
                  type="tel"
                  name="phone"
                  value={modalFormData.phone}
                  onChange={handleModalInputChange}
                  placeholder="Mobile Number"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D4A8C] text-sm bg-white"
                />

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={modalSubmitting}
                    className="bg-[#0D4A8C] text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-[#08396d] transition disabled:opacity-50 cursor-pointer"
                  >
                    {modalSubmitting
                      ? "Submitting..."
                      : "Request Brochure & Call Back"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BuildManagment;
