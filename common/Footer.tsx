import React from "react";
import Link from "next/link";
import { FaFacebook, FaYoutube, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";

const socialLinks = [
  {
    id: 1,
    icon: "FaFacebook",
    url: "https://www.facebook.com/allindiamanagementassociation",
  },
  {
    id: 2,
    icon: "FaYoutube",
    url: "https://www.youtube.com/@AIMAIndiaOfficial",
  },
  {
    id: 3,
    icon: "FaTwitter",
    url: "https://x.com/aimaindia",
  },
  {
    id: 4,
    icon: "FaLinkedinIn",
    url: "https://www.linkedin.com/school/aimaindia/",
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaFacebook: FaFacebook,
  FaYoutube: FaYoutube,
  FaTwitter: FaTwitter,
  FaLinkedinIn: FaLinkedinIn,
};

function Footer() {
  return (
    <footer className="relative text-white py-12  bg-[#030e1ce6]  items-center">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start  relative  px-8 w-full mb-8">
        <div className="flex flex-col items-start lg:w-[20%]">
          <div>
            <img
              src="/aimaweb/img/footer-logo.svg"
              className="h-28"
              loading="lazy"
            />
            <img
              src="/aimaweb/img/AAMO_LOGO.svg"
              className="h-6 mb-6"
              loading="lazy"
            />

            <div className="flex gap-4 mt-2">
              {socialLinks.map((link) => {
                const IconComponent = iconMap[link.icon];
                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    {IconComponent && (
                      <IconComponent className="text-black text-lg" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-8 lg:w-[75%] mt-5 md:mt-0">
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>

            <ul className="text-sm text-gray-300 grid grid-cols-1  md:grid-cols-2 grid-rows-4 gap-3 md:grid-flow-col">
              <li>
                <Link
                  className="hover:text-white text-[#c1cdce]"
                  href={"/about-aima"}
                >
                  About AIMA
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white text-[#c1cdce]"
                  href={"/events"}
                >
                  Events & Conferences
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white text-[#c1cdce]"
                  href={"/management-education"}
                >
                  Management Education
                </Link>
              </li>
              <li>
                <Link
                  href={"/knowledge-resources"}
                  className="hover:text-white text-[#c1cdce]"
                >
                  Research Reports & Publications
                </Link>
              </li>

              <li>
                <Link
                  href={"/testing-and-assessment"}
                  className="hover:text-white text-[#c1cdce]"
                >
                  Testing & Assessment
                </Link>
              </li>
              <li>
                <Link
                  href={"/embership"}
                  className="hover:text-white text-[#c1cdce]"
                >
                  Membership & Network
                </Link>
              </li>
              <li>
                <Link href={"#"} className="hover:text-white text-[#c1cdce]">
                  Professional Development
                </Link>
              </li>
              <li>
                <Link
                  href={"/media-center"}
                  className="hover:text-white text-[#c1cdce]"
                >
                  Media Centre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">More Help</h4>

            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href={"https://blog.aima.in/"}
                  target="_blank"
                  className="hover:text-white text-[#c1cdce]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href={"/media-center"}
                  className="hover:text-white text-[#c1cdce]"
                >
                  Media
                </Link>
              </li>
              <li>
                <Link
                  href={"/for-student"}
                  className="hover:text-white text-[#c1cdce]"
                >
                  Students Corner
                </Link>
              </li>
              <li>
                <Link
                  href={"/for-members"}
                  className="hover:text-white text-[#c1cdce]"
                >
                  Member Corner
                </Link>
              </li>
              <li>
                <Link
                  href={"/contact"}
                  className="hover:text-white text-[#c1cdce]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>

            <p className="text-sm text-gray-300 mb-5">
              Sign up for our newsletter to receive special offers.
            </p>

            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="px-8 mt-5">
        <div className="border-t border-white/30"></div>

        <p className="mt-3 text-sm font-semibold text-white">
          © Copyrights {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
