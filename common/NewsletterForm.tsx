"use client";

import React, { useState } from "react";
import { subscribeNewsletter } from "@/actionCreator/home.actionCreator";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg({ type: "", text: "" });

    // Validate email
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatusMsg({ type: "error", text: "Please enter your email address." });
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setStatusMsg({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    // Validate agreement checkbox
    if (!agreed) {
      setStatusMsg({
        type: "error",
        text: "You must agree to the terms and conditions.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await subscribeNewsletter(trimmedEmail);
      if (response?.success || response?.status === true) {
        setStatusMsg({
          type: "success",
          text: response?.message || "Subscribed successfully! Thank you.",
        });
        setEmail("");
        setAgreed(false);
      } else {
        setStatusMsg({
          type: "error",
          text: response?.message || "Subscription failed. Please try again.",
        });
      }
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err?.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[320px]">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex bg-white rounded-full overflow-hidden w-full border border-transparent focus-within:border-[#0D478B] transition duration-200">
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="flex-1 min-w-0 px-5 py-3 text-black outline-none text-[12px] bg-transparent placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0D478B] px-5 flex items-center justify-center shrink-0 text-white hover:bg-blue-800 disabled:bg-gray-400 transition-colors duration-200 cursor-pointer"
            title="Subscribe"
          >
            {loading ? (
              <svg
                className="animate-spin h-4.5 w-4.5 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
            ) : (
              <span className="text-sm font-bold">→</span>
            )}
          </button>
        </div>

        <div className="flex items-start gap-2.5 text-xs text-gray-300">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={loading}
            className="mt-0.5 rounded border-gray-400 text-[#0D478B] focus:ring-[#0D478B] cursor-pointer"
          />
          <label htmlFor="terms" className="cursor-pointer select-none leading-tight">
            I agree with the terms &amp; conditions
          </label>
        </div>
      </form>

      {statusMsg.text && (
        <div
          className={`mt-3 text-xs font-semibold rounded-lg p-2.5 transition-all duration-300 text-left ${
            statusMsg.type === "success"
              ? "bg-green-950/40 text-green-300 border border-green-800/30"
              : "bg-red-950/40 text-red-300 border border-red-800/30"
          }`}
        >
          {statusMsg.text}
        </div>
      )}
    </div>
  );
}
