"use client";

import React, { useState, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { checkMyAimaLogin } from "@/actionCreator/home.actionCreator";
import institution from "../../public/membership-img/institution.png";
import professional from "../../public/membership-img/professional.png";
import renew from "../../public/membership-img/renew.png";

const JoinAIMA: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both email/user ID and password.");
      return;
    }

    setLoading(true);
    try {
      // 1. Call API to validate
      const res = await checkMyAimaLogin({
        aimaUser: username,
        aimaUserPassword: password,
        csrfToken: "50ebebf92e10ad0e9bf6a1b5b5f9a9281ae37343", // Default recaptcha/csrf token
      });

      if (res.success && res.data === "22") {
        toast.error("Invalid username or password.");
      } else if (res.success) {
        // Success - submit the hidden form programmatically to log the user in
        toast.success("Success! Redirecting to myAIMA portal...");
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.submit();
          }
        }, 1000);
      } else {
        toast.error(res.error || "Failed to validate login. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 px-4 font-primary" id="Join-AIMA">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-6 md:p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Join AIMA Options Block */}
          <div className="flex-1 border border-gray-200/80 rounded-2xl p-6 md:p-8 bg-gray-50/50">
            <h2 className="text-center font-playfair-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 text-gray-900 leading-tight">
              Join <span className="text-[#D8A12A]">AIMA</span>
            </h2>

            <p className="text-sm text-gray-500 text-center mb-8 max-w-xl mx-auto leading-relaxed">
              Through our widespread global connectivity, we bring for the
              benefit of Indian managers the best management practices
              available.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Institution Member Card */}
              <div className="border border-gray-200 rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col justify-between items-center">
                <div>
                  <div className="h-16 w-16 bg-[#0D4A8C]/5 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Image
                      width={40}
                      height={40}
                      src={institution}
                      alt="Institutional Membership"
                      className="h-9 w-9 object-contain"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-6 leading-snug">
                    Become an Institutional Member
                  </p>
                </div>
                <a
                  href="/institutional-member"
                  className="inline-flex items-center justify-center bg-[#0D4A8C] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#08396d] transition-colors duration-200 w-full"
                >
                  Know More →
                </a>
              </div>

              {/* Professional Individual Member Card */}
              <div className="border border-gray-200 rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col justify-between items-center">
                <div>
                  <div className="h-16 w-16 bg-[#0D4A8C]/5 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Image
                      width={40}
                      height={40}
                      src={professional}
                      alt="Professional Individual Membership"
                      className="h-9 w-9 object-contain"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-6 leading-snug">
                    Become a Professional Individual Member
                  </p>
                </div>
                <a
                  href="/professional-individual-membership"
                  className="inline-flex items-center justify-center bg-[#0D4A8C] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#08396d] transition-colors duration-200 w-full"
                >
                  Know More →
                </a>
              </div>

              {/* Renew Membership Card */}
              <div className="border border-gray-200 rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col justify-between items-center">
                <div>
                  <div className="h-16 w-16 bg-[#0D4A8C]/5 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Image
                      width={70}
                      height={70}
                      src={renew}
                      alt="Renew Membership"
                      className="h-9 w-9 object-contain"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-6 leading-snug">
                    Renew Existing Membership
                  </p>
                </div>
                <a
                  href="https://onlineservices.aima.in/showOnlineMembershipRenwalForm.action"
                  target="_blank"
                  className="inline-flex items-center justify-center bg-[#0D4A8C] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#08396d] transition-colors duration-200 w-full"
                >
                  Know More →
                </a>
              </div>
            </div>
          </div>

          {/* myAIMA Login Block */}
          <div className="w-full lg:w-[360px] border border-gray-200/80 rounded-2xl p-6 md:p-8 bg-gray-50/50 flex flex-col justify-between">
            <div>
              <h2 className="text-center font-heading text-3xl font-semibold mb-2 text-gray-900 leading-tight">
                myAIMA
              </h2>
              <p className="text-xs text-gray-500 text-center mb-6 leading-normal">
                Please enter your Email ID and Password
              </p>

              {/* User-facing Form (Validated on Submit) */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="flex items-center border border-gray-300 focus-within:border-[#0D4A8C] rounded-lg overflow-hidden bg-white px-3 py-2.5 transition duration-200">
                  <span className="text-[#D8A12A] mr-2">
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M7 6C7.79565 6 8.55871 5.68393 9.12132 5.12132C9.68393 4.55871 10 3.79565 10 3C10 2.20435 9.68393 1.44129 9.12132 0.87868C8.55871 0.316071 7.79565 0 7 0C6.20435 0 5.44129 0.316071 4.87868 0.87868C4.31607 1.44129 4 2.20435 4 3C4 3.79565 4.31607 4.55871 4.87868 5.12132C5.44129 5.68393 6.20435 6 7 6ZM0 15C-1.36979e-08 14.0807 0.18106 13.1705 0.532843 12.3212C0.884626 11.4719 1.40024 10.7003 2.05025 10.0503C2.70026 9.40024 3.47194 8.88463 4.32122 8.53284C5.1705 8.18106 6.08075 8 7 8C7.91925 8 8.8295 8.18106 9.67878 8.53284C10.5281 8.88463 11.2997 9.40024 11.9497 10.0503C12.5998 10.7003 13.1154 11.4719 13.4672 12.3212C13.8189 13.1705 14 14.0807 14 15H0Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="User Name / Email ID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center border border-gray-300 focus-within:border-[#0D4A8C] rounded-lg overflow-hidden bg-white px-3 py-2.5 transition duration-200">
                  <span className="text-[#D8A12A] mr-2">
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M2 7V5C2 3.67392 2.52678 2.40215 3.46447 1.46447C4.40215 0.526784 5.67392 0 7 0C8.32608 0 9.59785 0.526784 10.5355 1.46447C11.4732 2.40215 12 3.67392 12 5V7C12.5304 7 13.0391 7.21071 13.4142 7.58579C13.7893 7.96086 14 8.46957 14 9V14C14 14.5304 13.7893 15.0391 13.4142 15.4142C13.0391 15.7893 12.5304 16 12 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V9C0 8.46957 0.210714 7.96086 0.585786 7.58579C0.960859 7.21071 1.46957 7 2 7ZM10 5V7H4V5C4 4.20435 4.31607 3.44129 4.87868 2.87868C5.44129 2.31607 6.20435 2 7 2C7.79565 2 8.55871 2.31607 9.12132 2.87868C9.68393 3.44129 10 4.20435 10 5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
                  >
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M3.2494 0.280712C3.0608 0.0985537 2.80819 -0.00224062 2.546 3.78026e-05C2.2838 0.00231622 2.03299 0.107485 1.84758 0.292893C1.66217 0.478301 1.557 0.729114 1.55473 0.99131C1.55245 1.25351 1.65324 1.50611 1.8354 1.69471L15.8354 15.6947C16.024 15.8769 16.2766 15.9777 16.5388 15.9754C16.801 15.9731 17.0518 15.8679 17.2372 15.6825C17.4226 15.4971 17.5278 15.2463 17.5301 14.9841C17.5324 14.7219 17.4316 14.4693 17.2494 14.2807L15.7764 12.8077C17.3339 11.5658 18.4857 9.88764 19.0844 7.98771C17.8104 3.93071 14.0204 0.987712 9.5424 0.987712C7.97483 0.985586 6.4289 1.35357 5.0304 2.06171L3.2494 0.280712ZM7.5104 4.54071L9.0244 6.05571C9.36349 5.96566 9.72028 5.96626 10.0591 6.05744C10.3979 6.14862 10.7068 6.32719 10.9548 6.57528C11.2029 6.82336 11.3815 7.13226 11.4727 7.47104C11.5639 7.80983 11.5644 8.16662 11.4744 8.50571L12.9884 10.0197C13.4394 9.25573 13.6236 8.36351 13.5121 7.48339C13.4005 6.60327 12.9995 5.78521 12.3722 5.15789C11.7449 4.53057 10.9268 4.12961 10.0467 4.01806C9.1666 3.90652 8.27438 4.08973 7.5104 4.54071Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M11.996 14.6847L9.292 11.9797C8.31969 11.9188 7.40303 11.5051 6.71406 10.8163C6.02509 10.1275 5.61117 9.21097 5.55 8.23867L1.877 4.56567C1.03221 5.57169 0.394349 6.73459 0 7.98767C1.274 12.0447 5.065 14.9877 9.542 14.9877C10.389 14.9877 11.211 14.8827 11.996 14.6847Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0D478B] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-900 transition duration-200 shadow-sm disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Login"}
                </button>
              </form>
            </div>

            {/* Hidden form required by myAIMA external portal */}
            <form
              ref={formRef}
              name="login"
              method="post"
              action="https://www.myaima.in/myaima/frontend/web/index.php?r=site%2Flogin"
              id="myAimaForm"
              className="hidden"
            >
              <input
                type="text"
                name="LoginForm[username]"
                value={username}
                readOnly
              />
              <input
                type="password"
                name="LoginForm[password]"
                value={password}
                readOnly
              />
              <input
                type="hidden"
                name="g-recaptcha-response"
                value="50ebebf92e10ad0e9bf6a1b5b5f9a9281ae37343"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAIMA;
