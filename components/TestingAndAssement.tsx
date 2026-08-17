"use client";

import { useState, useRef } from "react";
import {
  ClipboardCheck,
  Cpu,
  Globe,
  Rocket,
  Briefcase,
  Building2,
  Users,
  FileText,
  GraduationCap,
  BookOpen,
  Laptop,
  Brain,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  BarChart3,
  BookOpenCheck,
} from "lucide-react";
import Image from "next/image";
import journeyImg from "../public/TestingIMG/journeyImg.jpeg";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Html } from "next/document";

// ─── Data ───────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Briefcase, value: "18+", label: "Years of\nexperience" },
  { icon: Building2, value: "1,200+", label: "Test centre\nnetwork" },
  { icon: Users, value: "650+", label: "Clients\nserved" },
  {
    icon: FileText,
    value: "PBT/CBT/IBT",
    label: "Multiple mode\nexamination\ncapability",
  },
  { icon: Globe, value: "500+", label: "SMEs & Domain\nexperts" },
  { icon: GraduationCap, value: "10MN+", label: "Assessments\nconducted" },
];

// const OFFERINGS = [
//     { icon: GraduationCap, bg: "#3B5998", title: "MAT", sub: "Management Aptitude Test" },
//     { icon: BookOpen, bg: "#00A88F", title: "UGAT", sub: "Undergraduate Aptitude Test" },
//     { icon: Users, bg: "#E53935", title: "Recruitment Exam", sub: "End-to-end recruitment examination services" },
//     { icon: Building2, bg: "#D4AF37", title: "Admissions Exam", sub: "Admission examination solutions" },
//     { icon: Laptop, bg: "#00A88F", title: "Application Management Portal", sub: "Comprehensive candidate lifecycle management" },
//     { icon: Brain, bg: "#1E3A5F", title: "Psychometric & Behavioral Assessment", sub: "Psychometric, Behavioral & competency assessments" },
//     { icon: Users, bg: "#7E57C2", title: "AMT", sub: "Aptitude & Management Test" },
//     { icon: Award, bg: "#FFA726", title: "Skill Test", sub: "Skill Assessment & certification tests" },
// ];

const OFFERINGS = [
  {
    icon: "/aimaweb/TestingIMG/one.svg",
    bg: "#3E5CC8",
    title: "MAT",
    url: "https://mat.aima.in/",
    sub: "Management Aptitude \n Test",
  },
  {
    icon: "/aimaweb/TestingIMG/two.svg",
    bg: "#0DB39E",
    title: "UGAT",
    url: "ugat",
    sub: "Undergraduate Aptitude Test",
  },
  {
    icon: "/aimaweb/TestingIMG/three.svg",
    bg: "#F25454",
    url: "recruitment-examination",
    title: "Recruitment Exam",
    sub: "End-to-end recruitment examination services",
  },
  {
    icon: "/aimaweb/TestingIMG/four.svg",
    bg: "#D9B12B",
    url: "admissions-examination",
    title: "Admissions Exam",
    sub: "Admission examination solutions",
  },
  {
    icon: "/aimaweb/TestingIMG/five.svg",
    bg: "#41B1B8",
    url: "application-management-portal",
    title: "Application Management Portal",
    sub: "Comprehensive candidate lifecycle management",
  },
  {
    icon: "/aimaweb/TestingIMG/six.svg",
    bg: "#2F4267",
    url: "psychometric-behavioral-assessment",
    title: "Psychometric & Behavioral Assessment",
    sub: "Psychometric, Behavioral & competency assessments",
  },
  {
    icon: "/aimaweb/TestingIMG/seven.svg",
    bg: "#9089F4",
    title: "AMT",
    url: "amt",
    sub: "Accredited Management Teacher ",
  },
  {
    icon: "/aimaweb/TestingIMG/eigth.svg",
    bg: "#F9AF3A",
    title: "Skill Test",
    url: "skill-test",
    sub: "Skill Assessment & certification tests",
  },
];

const JOURNEY = [
  {
    year: "1957",
    text: "Established as an Autonomous Not-for-Profit Organisation",
  },
  {
    year: "1988",
    text: "Introduction of MAT as National Level Management Assessments",
  },
  {
    year: "1997",
    text: "Launch of Dedicated Examination & Assessment Services through Centre for Management Services(CMS)",
    active: true,
  },
  {
    year: "2003",
    text: "MAT Accorded National-Level Test Status by Ministry of HRD, Achievement of ISO 9001:2008 Certification",
  },
  {
    year: "2009",
    text: "First to introduce Computer Based Examinations for MAT",
  },
];

const MILESTONES = [
  { value: "10M+", label: "Assessments <br />  Conducted" },
  {
    value: "35+ ",
    label: "years of experience in \n conducting  various examination",
  },
  { value: "100+", label: "Clients <br /> Served" },
  { value: "100+", label: "SME & <br /> Domain Experts" },
  { value: "Nationwide Test Centre Infrastructure", label: "", wide: true },
  {
    value:
      "PBT (OMR based), CBT (Computer based) and other modes of examination delivery",
    label: "",
    wide: true,
  },
];

const TRUST_BADGES = [
  { icon: ClipboardCheck, label: "Secure & Reliable\n Examination Process" },
  { icon: Building2, label: "Nationwide Test \n Centre Infrastructure" },
  // { icon: Globe, label: "Pan - India Reach with\nRobust infrastructure" },
  {
    icon: BookOpenCheck,
    label: "Multiple modes of \n Examination (PBT / CBT)",
  },
  {
    icon: Cpu,
    label: "Advanced Technology \n & Analytics",
  },
  { icon: BarChart3, label: "Domain Expertise & \n Quality Assurance" },
];

const CERTIFICATES = [
  {
    img: "/aimaweb/TestingIMG/iso_9001_cert.jpg",
    alt: "ISO 9001:2015 Certificate",
    title: "ISO 9001:2015 Certificate",
  },
  {
    img: "/aimaweb/TestingIMG/credential.png",
    alt: "CMMI SVC/3 Certificate",
    title: "CMMI SVC/3 Certificate",
  },
  {
    img: "/aimaweb/TestingIMG/iso_27001_cert.jpg",
    alt: "ISO/IEC 27001:2022 Certificate",
    title: "ISO/IEC 27001:2022 Certificate",
  },
];

const industrySegment = [
  {
    img: "/aimaweb/TestingIMG/psm.png",
    title: "PSU",
    content: "Serving major Public Sector Undertakings",
  },
  {
    img: "/aimaweb/TestingIMG/corporate.png",
    title: "Corporate",
    content: "Empowering corporate - talent acquisition",
  },
  {
    img: "/aimaweb/TestingIMG/institutations.png",
    title: "Educational Institutions",
    content: "Partnering with universities, colleges & B-schools",
  },
  {
    img: "/aimaweb/TestingIMG/government.png",
    title: "Government Institutions",
    content: "Delivering examinations for various government bodies",
  },
];

const TESTIMONIALS = [
  { img: "/aimaweb/EducationIMG/testimonial1.png", alt: "Testimonial Video 1" },
  { img: "/aimaweb/EducationIMG/testimonial2.png", alt: "Testimonial Video 2" },
  { img: "/aimaweb/EducationIMG/testimonial1.png", alt: "Testimonial Video 3" },
  { img: "/aimaweb/EducationIMG/testimonial2.png", alt: "Testimonial Video 4" },
  { img: "/aimaweb/EducationIMG/testimonial1.png", alt: "Testimonial Video 5" },
];

const achieverData = [
  {
    id: 1,
    url: `<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-0"
      src="https://www.instagram.com/reel/DDeSBgOPrQ5/embed/?cr=1&v=14"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="556"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
  {
    id: 2,
    url: `<iframe class="instagram-media" id="instagram-embed-1"
      src="https://www.instagram.com/reel/DFC0XJFSnEN/embed/"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="556"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
  {
    id: 3,
    url: `<iframe class="instagram-media" id="instagram-embed-2"
      src="https://www.instagram.com/reel/DFVDaWDykB7/embed/"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="556"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
  {
    id: 4,
    url: `<iframe class="instagram-media" id="instagram-embed-3"
      src="https://www.instagram.com/reel/DG-bTTpMQKg/embed/"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="556"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
  {
    id: 5,
    url: `<iframe class="instagram-media" id="instagram-embed-4"
      src="https://www.instagram.com/reel/DG2rXeIPf61/embed/"
      allowtransparency="true"
      allowfullscreen="true"
      frameborder="0"
      height="556"
      scrolling="no"
      style="background:white;width:100%;border-radius:3px;border:1px solid #dbdbdb;">
    </iframe>`,
  },
];
const topBSchool = [
  {
    id: 1,
    url: '<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-5" src="https://www.instagram.com/reel/DO2-AHykg7s/embed/?cr=1&amp;v=14&amp;wp=407&amp;rd=https%3A%2F%2Fwww.aima.sanntra.com&amp;rp=%2FMAT%2Ftestimonials#%7B%22ci%22%3A5%2C%22os%22%3A4322.5999999940395%2C%22ls%22%3A836.6999999880791%2C%22le%22%3A2111.4000000059605%7D" allowtransparency="true" allowfullscreen="true" frameborder="0" height="556" data-instgrm-payload-id="instagram-media-payload-5" scrolling="no" style="background: white; max-width: 540px; width: 100%; border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px 0px 12px;  padding: 0px;"></iframe> ',
  },
  {
    id: 2,
    url: '<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-6" src="https://www.instagram.com/reel/DOvR-dZkvP3/embed/?cr=1&amp;v=14&amp;wp=407&amp;rd=https%3A%2F%2Fwww.aima.sanntra.com&amp;rp=%2FMAT%2Ftestimonials#%7B%22ci%22%3A6%2C%22os%22%3A5775.5%2C%22ls%22%3A836.6999999880791%2C%22le%22%3A2111.4000000059605%7D" allowtransparency="true" allowfullscreen="true" frameborder="0" height="556" data-instgrm-payload-id="instagram-media-payload-6" scrolling="no" style="background: white; max-width: 540px; width: 100%; border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px 0px 12px;  padding: 0px;"></iframe> ',
  },
  {
    id: 3,
    url: '<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-7" src="https://www.instagram.com/reel/DOnVCNNkvmE/embed/?cr=1&amp;v=14&amp;wp=407&amp;rd=https%3A%2F%2Fwww.aima.sanntra.com&amp;rp=%2FMAT%2Ftestimonials#%7B%22ci%22%3A7%2C%22os%22%3A5949.0999999940395%2C%22ls%22%3A836.6999999880791%2C%22le%22%3A2111.4000000059605%7D" allowtransparency="true" allowfullscreen="true" frameborder="0" height="556" data-instgrm-payload-id="instagram-media-payload-7" scrolling="no" style="background: white; max-width: 540px; width: 100%; border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px 0px 12px;   padding: 0px;"></iframe> ',
  },
  {
    id: 4,
    url: '<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-8" src="https://www.instagram.com/reel/DOdcb1XkjHs/embed/?cr=1&amp;v=14&amp;wp=407&amp;rd=https%3A%2F%2Fwww.aima.sanntra.com&amp;rp=%2FMAT%2Ftestimonials#%7B%22ci%22%3A8%2C%22os%22%3A6389.799999982119%2C%22ls%22%3A836.6999999880791%2C%22le%22%3A2111.4000000059605%7D" allowtransparency="true" allowfullscreen="true" frameborder="0" height="556" data-instgrm-payload-id="instagram-media-payload-8" scrolling="no" style="background: white; max-width: 540px; width: 100%; border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px 0px 12px;   padding: 0px;"></iframe> ',
  },
  {
    id: 5,
    url: '<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-9" src="https://www.instagram.com/reel/DGfcdbWPk_J/embed/?cr=1&amp;v=14&amp;wp=407&amp;rd=https%3A%2F%2Fwww.aima.sanntra.com&amp;rp=%2FMAT%2Ftestimonials#%7B%22ci%22%3A9%2C%22os%22%3A7681.5999999940395%2C%22ls%22%3A836.6999999880791%2C%22le%22%3A2111.4000000059605%7D" allowtransparency="true" allowfullscreen="true" frameborder="0" height="556" data-instgrm-payload-id="instagram-media-payload-9" scrolling="no" style="background: white; max-width: 540px; width: 100%; border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px 0px 12px;   padding: 0px;"></iframe> ',
  },
  {
    id: 6,
    url: '<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-10" src="https://www.instagram.com/reel/DG4zP3Ov-NJ/embed/?cr=1&amp;v=14&amp;wp=407&amp;rd=https%3A%2F%2Fwww.aima.sanntra.com&amp;rp=%2FMAT%2Ftestimonials#%7B%22ci%22%3A10%2C%22os%22%3A7909.299999982119%2C%22ls%22%3A836.6999999880791%2C%22le%22%3A2111.4000000059605%7D" allowtransparency="true" allowfullscreen="true" frameborder="0" height="556" data-instgrm-payload-id="instagram-media-payload-10" scrolling="no" style="background: white; max-width: 540px; width: 100%; border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px 0px 12px;  padding: 0px;"></iframe> ',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function TestingAssessments() {
  const [journeyIdx, setJourneyIdx] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const prev = () => setJourneyIdx((i) => Math.max(0, i - 1));
  const next = () => setJourneyIdx((i) => Math.min(JOURNEY.length - 1, i + 1));

  const handleWatchVideo = () => {
    setIsVideoLoading(true);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  // Visible window of 5 items centered around journeyIdx when possible
  const windowStart = Math.max(0, Math.min(journeyIdx - 2, JOURNEY.length - 5));
  const visible = JOURNEY.slice(windowStart, windowStart + 5);

  return (
    <div className=" text-[#1E3A5F]">
      <section
        className="relative min-h-[600px] flex flex-col justify-center overflow-hidden bg-white bg-cover bg-center md:bg-right bg-no-repeat"
        style={{
          backgroundImage: "url('/aimaweb/TestingIMG/testing.jpeg')",
        }}
      >
        {/* Left/Right Container */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
          {/* Left text */}

          <div className="w-full md:w-[45%] flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-semibold  leading-[1.05] mb-6 font-heading whitespace-nowrap">
              <span className="text-black">Testing & </span>
              <span className="text-[#E4AB25]">Assessments</span>
            </h1>

            <p className="text-[#1E3A5F]/90 text-base font-semibold max-w-md leading-relaxed">
              National-level entrance, admission, and recruitment test with
              customized assessment solutions.
            </p>
            <p className=" mt-4  max-w-md leading-relaxed">
              End-to-end examination and assessment services backed by
              technology, expertise and a secure process framework.
            </p>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="w-full border-t border-b border-gray-200 bg-white z-10  absolute bottom-0">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 flex-wrap">
            {TRUST_BADGES.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-[#0C478B] flex-shrink-0" />
                  <p className="text-[#1E3A5F] text-[13px] md:text-[12px] font-semibold whitespace-pre-line leading-snug">
                    {b?.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
        {/* <div className="bg-[#0C478B] rounded-3xl px-6 md:px-8 py-10 flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-0 shadow-lg">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center text-center px-4 relative"
              >
                {i !== 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/20 hidden md:block" />
                )}
                <Icon className="w-8 h-8 text-[#E4AB25] mb-3 flex-shrink-0" />
                <p className="text-white text-2xl md:text-[32px] font-extrabold mb-1">
                  {s.value}
                </p>
                <p className="text-white/80 text-[11px] md:text-[13px] whitespace-pre-line leading-snug font-medium">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div> */}

        <p className="text-center text-[#1E3A5F]/80 text-sm md:text-base  max-w-4xl mx-auto leading-relaxed font-semibold">
          AIMA's Centre for Management Services (CMS) specialises in providing
          testing, assessment, and allied services for admissions, selection,
          recruitment, and promotions to clients including government
          organisations, public sector undertakings, corporations, universities,
          institutions, and independent bodies.
        </p>
      </section>

      {/* ── OUR OFFERINGS ── */}
      {/* <section className="px-6 md:px-12 py-16 bg-gray-50/50">
                <h2 className="text-3xl sm:text-4xl md:text-[56px] font-semibold text-center mb-12 font-heading text-[#0C478B] leading-[1.2]">
                    Our <span className="text-[#E4AB25]  font-heading">Offerings</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {OFFERINGS.map((o, idx) => {
                        const Icon = o.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
                            >
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-white mb-5 shadow-sm"
                                    style={{ backgroundColor: o.bg }}
                                >
                                    <Icon className="w-7 h-7" />
                                </div>
                                <p className="font-semibold text-[#1E3A5F] text-sm md:text-base mb-2 leading-snug">{o.title}</p>
                                <p className="text-gray-500 text-xs leading-relaxed font-medium">{o.sub}</p>
                            </div>
                        );
                    })}
                </div>
            </section> */}

      <section className=" pt-12 " id="our-offering">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center mb-14 font-heading text-[40px] md:text-[56px] font-semibold leading-none">
            <span className="text-black">Our </span>
            <span className="text-[#E4AB25]">Offerings</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {OFFERINGS.map((o, idx) => {
              return (
                <a
                  href={o.url}
                  key={idx}
                  target={o.title === "MAT" ? "_blank" : undefined}
                  rel={o.title === "MAT" ? "noopener noreferrer" : undefined}
                  className="                                    
         w-full min-h-[220px] rounded-[24px] border border-[#8FA7D0] bg-white px-6 py-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md
            "
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: o.bg }}
                  >
                    <img
                      src={o.icon}
                      className="w-10 h-10 object-contain"
                      alt={o.title}
                    />
                  </div>

                  <h3 className="text-[#1A1A1A] text-[18px] font-semibold leading-tight mb-3">
                    {o.title}
                  </h3>

                  <p className="text-[#4B4B4B] text-[15px] leading-[1.35] max-w-[190px]">
                    {o.sub}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-14 font-heading text-[40px] md:text-[56px] font-semibold leading-none">
            <span className="text-black">Industry & </span>
            <span className="text-[#D4A620]">Segments Served</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
            {industrySegment.map((data, id) => (
              <div
                className="item border w-full cursor-pointer border-gray-300 rounded hover:shadow-lg transition-all p-4"
                key={id}
              >
                <div className="item-wrapper flex flex-row gap-5 items-center">
                  <div className="icon-wrapper w-[80px] h-[80px]">
                    <img
                      src={data.img}
                      alt={data.title}
                      className="w-full h-full object-contain max-w-full"
                    />
                  </div>

                  <div className="content-wrapper flex flex-col gap-1">
                    <h3 className="font-bold text-md">{data.title}</h3>
                    <p className="text-sm">{data.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY ── */}
      <section className=" px-6 md:px-12 py-11">
        <div className="img-wrapper">
          <div className="title-content mb-10 text-center  ">
            <h2 className="text-3xl sm:text-4xl md:text-[56px] font-semibold font-heading  leading-[1.2]">
              <span className="text-black me-3 inline-block">Our</span>
              <span className="text-[#E4AB25]  font-heading inline-block">
                Journey
              </span>
            </h2>
            <p className="mt-3">
              A legacy of excellence, innovation and trust since 1957
            </p>
          </div>

          <Image src={journeyImg} alt={"Our Journey"} className="w-full" />
        </div>

        {/* <div className="relative  px-10">
          <div className="absolute top-[28px] left-10 right-10 h-[2px] bg-[#E4AB25]" />

          <button
            onClick={prev}
            disabled={journeyIdx === 0}
            className="absolute left-0 top-[8px] w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0C478B] disabled:opacity-30 hover:bg-gray-50 transition shadow-sm z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            disabled={journeyIdx === JOURNEY.length - 1}
            className="absolute right-0 top-[8px] w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0C478B] disabled:opacity-30 hover:bg-gray-50 transition shadow-sm z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-between gap-4">
            {visible.map((item) => {
              const isActive = item.year === JOURNEY[journeyIdx].year;
              return (
                <div
                  key={item.year}
                  className="flex flex-col items-center text-center w-[18%] cursor-pointer group"
                  onClick={() =>
                    setJourneyIdx(
                      JOURNEY.findIndex((j) => j.year === item.year),
                    )
                  }
                >
                  <div
                    className={`w-20 h-14 rounded-lg border-2 flex items-center justify-center font-semibold text-base md:text-[18px] mb-6 transition-all z-10 ${
                      isActive
                        ? "bg-[#0C478B] border-[#0C478B] text-white shadow-md"
                        : "bg-white border-[#0C478B] text-[#0C478B] group-hover:bg-amber-50/50"
                    }`}
                  >
                    {item.year}
                  </div>
                  <p className="text-gray-600 text-[11px] md:text-[13px] leading-relaxed font-semibold">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div> */}
      </section>

      {/* ── OUR MILESTONES ── */}
      <section className="px-6 md:px-16 py-16 bg-gray-50/50">
        <h2 className="text-3xl sm:text-4xl md:text-[56px] font-semibold text-center mb-12 font-heading  leading-[1.2]">
          <span className="text-black ">Our</span>{" "}
          <span className="text-[#E4AB25]  font-heading">Milestones</span>
        </h2>
        {/* 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {MILESTONES.slice(0, 4).map((m, idx) => (
            <div
              key={idx}
              className="border-2 border-[#E4AB25] rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between"
            >
              <div>
                <p className="text-[#0C478B] text-2xl md:text-[32px] font-extrabold mb-3 pb-3 border-b border-[#E4AB25]">
                  {m.value}
                </p>
                <p className="text-[#1E3A5F] text-xs md:text-[14px] font-semibold leading-normal">
                  {m.label}
                </p>
              </div>
            </div>
          ))}

          <div className="border-2 border-[#E4AB25] rounded-2xl p-6 bg-white shadow-sm flex items-center col-span-1 min-h-[96px]">
            <p className="text-[#0C478B] text-base md:text-[18px] font-extrabold leading-snug">
              {MILESTONES[4].value}
            </p>
          </div>

          <div className="border-2 border-[#E4AB25] rounded-2xl p-6 bg-white shadow-sm flex items-center md:col-span-2 col-span-1 min-h-[96px]">
            <p className="text-[#0C478B] text-base md:text-[18px] font-extrabold leading-snug">
              {MILESTONES[5].value}
            </p>
          </div>
 
        </div> */}
        <div className="bg-[#0C478B] rounded-3xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 shadow-lg flex flex-col gap-7">
          <div
            className="
                  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
gap-6 md:gap-8 items-stretch justify-between
          md:border-0
 
[&>div:not(:last-child)]:border-b
[&>div:not(:last-child)]:border-white
[&>div]:pb-4

/* DESKTOP: remove ALL bottom borders */
md:[&>div]:!border-b-0

/* DESKTOP: remove any default border styles */
md:[&>div]:border-0

/* DESKTOP: left dashed border only */
md:[&>div:not(:first-child)]:border-l-2
md:[&>div:not(:first-child)]:border-solid
md:[&>div:not(:first-child)]:border-white
md:[&>div:not(:first-child)]:pl-6

/* reset padding */
md:[&>div]:pb-0"
          >
            {
              //   STATS.map((s, i) => {
              MILESTONES.slice(0, 4).map((m, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center text-center px-4 relative"
                  >
                    <p className="text-white text-2xl md:text-[22px] font-bold mb-1">
                      {m.value}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{ __html: m.label }}
                      className="text-white  whitespace-pre-line leading-snug "
                    />
                  </div>
                );
              })
            }
          </div>
          {/* <div className="relative border-t-2 border-dashed border-white pt-8 gap-10 text-white flex flex-col lg:flex-row justify-between text-center  ">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
w-full h-[2px]
border-dashed border-white border-2

lg:top-full lg:left-[40%] lg:-translate-y-full lg:-translate-x-1/2
lg:w-[1px] lg:h-[50%]"
            ></div>
            {MILESTONES.slice(4).map((m, idx) => {
              return (
                <div className="item  " key={idx}>
                  {m.value}
                </div>
              );
            })}
          </div> */}
        </div>
      </section>

      {/* ── CREDENTIALS & RECOGNITIONS ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-14 font-heading text-[40px] md:text-[56px] font-semibold leading-none">
            <span className="text-black">Credentials & </span>
            <span className="text-[#D4A620]">Recognitions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {CERTIFICATES.map((cert, idx) => (
              <div key={idx} className="w-full">
                <div className="relative h-[550px] overflow-hidden bg-white rounded-lg">
                  <Image
                    src={cert.img}
                    alt={cert.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-14 md:py-16
       overflow-hidden"> */}
      {/* ======= */}
      {/* Testimonials Section */}
      <section className="pb-14 md:pb-16 overflow-hidden max-w-7xl mx-auto px-6 ">
        {/* >>>>>>> f142e48e2fedb5cfd5a74133d0becc8ad93ddbd3 */}

        <div className="text-center mb-12">
          <h2 className="font-playfair-display font-semibold text-[40px] md:text-[56px] text-black">
            From Aspirant&nbsp;
            <span className="inline-block text-[#D4A620]">to Achiever</span>
          </h2>
          <p>
            Every MAT achiever starts as an aspirant — uncertain but determined.
            What makes their journey <br /> special is not just the score, but
            the confidence they gain along the way.
          </p>
        </div>

        <div className="relative flex items-center justify-center px-12">
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.realIndex);
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="max-w-5xl w-full"
          >
            {achieverData.map((item, idx) => (
              <SwiperSlide key={idx} className="pb-4">
                <div dangerouslySetInnerHTML={{ __html: item.url }} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={handleNext}
            className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <span
              key={idx}
              onClick={() => {
                swiperRef.current?.slideToLoop(idx);
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === idx
                  ? "bg-[#184D91] scale-110"
                  : "border border-gray-500 bg-transparent"
              }`}
            ></span>
          ))}
        </div>
      </section>

      {/* ── bschool  SECTION ── */}
      <section className=" px-6 py-20 bg-gray-50/50 fsd">
        <div className="text-center mb-12 px-6 max-w-7xl mx-auto">
          <h2 className="font-playfair-display font-semibold text-[40px] md:text-[56px] text-black">
            Why Top B-Schools&nbsp;
            <span className="inline-block text-[#D4A620]"> Recommend MAT</span>
          </h2>
          <p>
            Hear from leading B-Schools who trust MAT for its credible legacy
            and its role in identifying and nurturing <br /> high-potential
            management aspirants through a fair, flexible, and effective
            evaluation process.
          </p>

          <div className="relative flex items-center justify-center mt-10 px-12">
            <button
              onClick={handlePrev}
              className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setCurrentIndex(swiper.realIndex);
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="max-w-5xl w-full"
            >
              {topBSchool.map((item, idx) => (
                <SwiperSlide key={idx} className="pb-4">
                  <div dangerouslySetInnerHTML={{ __html: item.url }} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={handleNext}
              className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <span
              key={idx}
              onClick={() => {
                swiperRef.current?.slideToLoop(idx);
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === idx
                  ? "bg-[#184D91] scale-110"
                  : "border border-gray-500 bg-transparent"
              }`}
            ></span>
          ))}
        </div>
        {/* <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
         
          <div
            onClick={handleWatchVideo}
            className="flex-shrink-0 w-full md:w-[480px] h-[280px] rounded-2xl relative overflow-hidden cursor-pointer group shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #0A2540 0%, #0C478B 50%, #0A2540 100%)",
            }}
          >
            
            <svg
              className="absolute inset-0 w-full h-full opacity-35"
              viewBox="0 0 460 280"
            >
              {[...Array(15)].map((_, i) => (
                <circle
                  key={i}
                  cx={30 + (i % 5) * 90}
                  cy={40 + Math.floor(i / 5) * 90}
                  r="3"
                  fill="#E4AB25"
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <line
                  key={i}
                  x1={30 + (i % 5) * 90}
                  y1={40 + Math.floor(i / 5) * 90}
                  x2={30 + ((i + 1) % 5) * 90}
                  y2={40 + Math.floor((i + 1) / 5) * 90}
                  stroke="#4A6FBF"
                  strokeWidth="1"
                />
              ))}
            </svg>

          
            <div className="absolute bottom-6 left-6 text-white z-10">
              <p className="text-xl font-semibold leading-snug mb-2 font-serif">
                Enabling
                <br />
                Assessments.
                <br />
                Empowering
                <br />
                Futures.
              </p>
              <p className="text-xs text-white/75 font-semibold tracking-wider">
                Secure | Scalable | Reliable
              </p>
            </div>

            
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#0C478B] border-b-[10px] border-b-transparent ml-1.5" />
              </div>
            </div>
          </div>

         
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-black leading-snug mb-4 font-semibold">
              Driving Excellence in
              <br />
              Examinations & Assessments
            </h3>
            <p className="text-black text-xs md:text-[14px]  mb-8">
              Watch our corporate video to know more about our capabilities,
              infrastructure, technology and commitment to delivering trusted
              assessment solutions.
            </p>
            <button
              onClick={handleWatchVideo}
              className="inline-flex items-center gap-3 bg-[#0C478B] text-white px-6 py-3.5 rounded-full font-semibold text-xs hover:bg-[#073061] hover:scale-[1.02] transition-all shadow-md"
            >
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-[#0C478B] border-b-[4px] border-b-transparent ml-0.5" />
              </div>
              WATCH VIDEO
            </button>
          </div>
        </div> */}
      </section>

      {/* Video Modal */}
      {isPlaying && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300"
          onClick={() => setIsPlaying(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Video wrapper */}
            <div className="aspect-video w-full relative bg-black">
              {isVideoLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
                  <div className="w-12 h-12 border-4 border-[#E4AB25] border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-white/70 text-xs font-semibold tracking-wider uppercase">
                    Loading Video...
                  </p>
                </div>
              )}
              <iframe
                src="https://www.youtube.com/embed/ksT2f4NwjsA?autoplay=1"
                title="AIMA Corporate Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                onLoad={() => setIsVideoLoading(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
