"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface EventItem {
  id: number;
  title: string;
  slug: string;
  event_date: string;
  event_location: string;
  venue: string;
  event_type: string[];
  event_image: string | null;
  short_description: string;
}

interface Banner {
  id: number;
  banner_setting_id: number;
  title: string | null;
  image: string | null;
  description: string | null;
  detail_text: string | null;
  url: string | null;
  sort_order: number;
  status: number;
}

interface BannerBlockData {
  id: number;
  title: string;
  type: string;
  width: number;
  height: number;
  has_description: number;
  has_url: number;
  status: number;
  banners: Banner[];
}

interface Props {
  block: {
    type: string;
    block_style: string;
    name: string;
    module_code: string | null;
    title: string | null;
    description: string | null;
    detail: string | null;
    bg_photo: string | null;
    data: BannerBlockData;
  };
}

export default function EventCalendar({ block }: Props) {
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "international" | "national" | "online"
  >("upcoming");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fallback default image or use the image uploaded in the block banners
  const calendarImage =
    block?.data?.banners?.[0]?.image ??
    "https://aima.sanntra.com/administrator/public/storage/files/1/eventcal.png";

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const typeParam = activeTab === "upcoming" ? "" : activeTab;
        const url = `https://aima.sanntra.com/administrator/api/v1/event/upcoming${typeParam ? `?event_type=${typeParam}` : ""
          }`;
        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
            "X-API-KEY": "vin001",
          },
        });
        const json = await res.json();
        setEvents(json?.data || []);
      } catch (err) {
        // console.error("Error loading events: ", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [activeTab]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const tabs = [
    {
      code: "upcoming" as const,
      label: "Upcoming Events",
      icon: (isActive: boolean) => {
        const color = isActive ? "#0D478B" : "#E5E7EB";
        return (
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3280_1071)">
              <path
                d="M8.63086 10.7147C8.63086 10.2215 9.03061 9.82178 9.52375 9.82178H9.82139C10.3145 9.82178 10.7143 10.2215 10.7143 10.7147C10.7143 11.2078 10.3145 11.6076 9.82139 11.6076H9.52375C9.03061 11.6076 8.63086 11.2078 8.63086 10.7147Z"
                fill={color}
              ></path>
              <path
                d="M9.52375 14.584C9.03061 14.584 8.63086 14.9838 8.63086 15.4769C8.63086 15.97 9.03061 16.3698 9.52375 16.3698H9.82139C10.3145 16.3698 10.7143 15.97 10.7143 15.4769C10.7143 14.9838 10.3145 14.584 9.82139 14.584H9.52375Z"
                fill={color}
              ></path>
              <path
                d="M13.3936 10.7147C13.3936 10.2215 13.7933 9.82178 14.2865 9.82178H14.5841C15.0772 9.82178 15.477 10.2215 15.477 10.7147C15.477 11.2078 15.0772 11.6076 14.5841 11.6076H14.2865C13.7933 11.6076 13.3936 11.2078 13.3936 10.7147Z"
                fill={color}
              ></path>
              <path
                d="M14.2865 14.584C13.7933 14.584 13.3936 14.9838 13.3936 15.4769C13.3936 15.97 13.7933 16.3698 14.2865 16.3698H14.5841C15.0772 16.3698 15.477 15.97 15.477 15.4769C15.477 14.9838 15.0772 14.584 14.5841 14.584H14.2865Z"
                fill={color}
              ></path>
              <path
                d="M18.1553 10.7147C18.1553 10.2215 18.5551 9.82178 19.0482 9.82178H19.3458C19.8389 9.82178 20.2387 10.2215 20.2387 10.7147C20.2387 11.2078 19.8389 11.6076 19.3458 11.6076H19.0482C18.5551 11.6076 18.1553 11.2078 18.1553 10.7147Z"
                fill={color}
              ></path>
              <path
                d="M19.0482 14.584C18.5551 14.584 18.1553 14.9838 18.1553 15.4769C18.1553 15.97 18.5551 16.3698 19.0482 16.3698H19.3458C19.8389 16.3698 20.2387 15.97 20.2387 15.4769C20.2387 14.9838 19.8389 14.584 19.3458 14.584H19.0482Z"
                fill={color}
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.6078 3.57161C11.6078 3.07848 11.208 2.67871 10.7149 2.67871C10.2218 2.67871 9.82202 3.07848 9.82202 3.57161V3.86982H8.31233C5.51791 3.86982 3.25259 6.13515 3.25259 8.92956V11.313L3.25272 11.3287C3.30422 14.2516 3.09426 15.7092 2.8629 16.5505C2.74954 16.9628 2.62671 17.2433 2.50479 17.5034C2.48953 17.536 2.47349 17.5698 2.45692 17.6046C2.34632 17.8373 2.21135 18.1214 2.11831 18.4503C1.92849 19.1214 1.902 19.7469 2.06701 20.309C2.23491 20.8809 2.5787 21.3101 2.99267 21.6138C3.08823 21.6839 3.18757 21.7475 3.28969 21.8051C3.48043 24.095 5.39942 25.894 7.7386 25.894H21.4296C24.224 25.894 26.4894 23.6287 26.4894 20.8343V15.3516C26.4958 15.14 26.4968 14.9236 26.492 14.703V8.92956C26.492 6.13515 24.2267 3.86982 21.4323 3.86982H19.9415V3.57161C19.9415 3.07848 19.5417 2.67871 19.0486 2.67871C18.5555 2.67871 18.1557 3.07848 18.1557 3.57161V3.86982H11.6078V3.57161ZM9.82202 5.65561V5.95266C9.82202 6.44579 10.2218 6.84556 10.7149 6.84556C11.208 6.84556 11.6078 6.44579 11.6078 5.95266V5.65561H18.1557V5.95266C18.1557 6.44579 18.5555 6.84556 19.0486 6.84556C19.5417 6.84556 19.9415 6.44579 19.9415 5.95266V5.65561H21.4323C23.2404 5.65561 24.7062 7.12141 24.7062 8.92956V14.2864H24.7036V15.3266C24.6436 17.151 24.1086 18.4084 23.395 19.2163C22.6089 20.1062 21.5323 20.5366 20.382 20.5366H5.56773C4.94524 20.5366 4.37347 20.4121 4.0492 20.1741C3.9092 20.0714 3.8243 19.9552 3.78049 19.806C3.73379 19.6469 3.71256 19.3753 3.83671 18.9363C3.88626 18.7611 3.95208 18.6215 4.06543 18.3812L4.12183 18.2613C4.26601 17.9537 4.43418 17.5716 4.58477 17.024C4.88106 15.9465 5.09066 14.2968 5.03838 11.3052V8.92956C5.03838 7.12141 6.50417 5.65561 8.31233 5.65561H9.82202ZM24.7036 20.8343V20.4321C23.5483 21.72 21.9785 22.3224 20.382 22.3224H5.56773C5.45391 22.3224 5.33364 22.3193 5.20875 22.3122C5.57359 23.3579 6.56848 24.1082 7.7386 24.1082H21.4296C23.2378 24.1082 24.7036 22.6424 24.7036 20.8343Z"
                fill={color}
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.6078 3.57161C11.6078 3.07848 11.208 2.67871 10.7149 2.67871C10.2218 2.67871 9.82202 3.07848 9.82202 3.57161V3.86982H8.31233C5.51791 3.86982 3.25259 6.13515 3.25259 8.92956V11.313L3.25272 11.3287C3.30422 14.2516 3.09426 15.7092 2.8629 16.5505C2.74954 16.9628 2.62671 17.2433 2.50479 17.5034C2.48953 17.536 2.47349 17.5698 2.45692 17.6046C2.34632 17.8373 2.21135 18.1214 2.11831 18.4503C1.92849 19.1214 1.902 19.7469 2.06701 20.309C2.23491 20.8809 2.5787 21.3101 2.99267 21.6138C3.08823 21.6839 3.18757 21.7475 3.28969 21.8051C3.48043 24.095 5.39942 25.894 7.7386 25.894H21.4296C24.224 25.894 26.4894 23.6287 26.4894 20.8343V15.3516C26.4958 15.14 26.4968 14.9236 26.492 14.703V8.92956C26.492 6.13515 24.2267 3.86982 21.4323 3.86982H19.9415V3.57161C19.9415 3.07848 19.5417 2.67871 19.0486 2.67871C18.5555 2.67871 18.1557 3.07848 18.1557 3.57161V3.86982H11.6078V3.57161ZM9.82202 5.65561V5.95266C9.82202 6.44579 10.2218 6.84556 10.7149 6.84556C11.208 6.84556 11.6078 6.44579 11.6078 5.95266V5.65561H18.1557V5.95266C18.1557 6.44579 18.5555 6.84556 19.0486 6.84556C19.5417 6.84556 19.9415 6.44579 19.9415 5.95266V5.65561H21.4323C23.2404 5.65561 24.7062 7.12141 24.7062 8.92956V14.2864H24.7036V15.3266C24.6436 17.151 24.1086 18.4084 23.395 19.2163C22.6089 20.1062 21.5323 20.5366 20.382 20.5366H5.56773C4.94524 20.5366 4.37347 20.4121 4.0492 20.1741C3.9092 20.0714 3.8243 19.9552 3.78049 19.806C3.73379 19.6469 3.71256 19.3753 3.83671 18.9363C3.88626 18.7611 3.95208 18.6215 4.06543 18.3812L4.12183 18.2613C4.26601 17.9537 4.43418 17.5716 4.58477 17.024C4.88106 15.9465 5.09066 14.2968 5.03838 11.3052V8.92956C5.03838 7.12141 6.50417 5.65561 8.31233 5.65561H9.82202ZM24.7036 20.8343V20.4321C23.5483 21.72 21.9785 22.3224 20.382 22.3224H5.56773C5.45391 22.3224 5.33364 22.3193 5.20875 22.3122C5.57359 23.3579 6.56848 24.1082 7.7386 24.1082H21.4296C23.2378 24.1082 24.7036 22.6424 24.7036 20.8343Z"
                fill={color}
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3280_1071">
                <rect width="28.5727" height="28.5727" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        );
      },
    },
    {
      code: "international" as const,
      label: "International",
      icon: (isActive: boolean) => {
        const color = isActive ? "#0D478B" : "#E5E7EB";
        return (
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.0416 1.16172C20.0416 0.520688 20.6752 0 21.4587 0C22.2422 0 22.8759 0.520688 22.8759 1.16172V6.25071C22.8759 6.89175 22.2422 7.41243 21.4587 7.41243C20.6752 7.41243 20.0416 6.89175 20.0416 6.25071V1.16172ZM15.375 15.0557L16.8487 18.4721L20.55 18.8037C20.589 18.8068 20.6269 18.8176 20.6617 18.8355C20.6965 18.8534 20.7273 18.8781 20.7525 18.908C20.7776 18.9379 20.7965 18.9726 20.8082 19.0099C20.8198 19.0473 20.8239 19.0865 20.8201 19.1255C20.8173 19.1636 20.807 19.2009 20.7897 19.235C20.7724 19.2691 20.7485 19.2995 20.7194 19.3244L17.9171 21.7805L18.7448 25.4032C18.7538 25.4413 18.7552 25.4808 18.7489 25.5194C18.7425 25.558 18.7285 25.595 18.7077 25.6281C18.6869 25.6613 18.6597 25.6899 18.6277 25.7125C18.5957 25.735 18.5595 25.7509 18.5213 25.7593C18.4418 25.776 18.359 25.761 18.2904 25.7176L15.0975 23.8166L11.9046 25.7274C11.8367 25.7672 11.7559 25.7787 11.6796 25.7594C11.6033 25.74 11.5377 25.6915 11.4969 25.6242C11.4568 25.5579 11.4445 25.4785 11.4625 25.4032L12.2804 21.7706L9.48045 19.3146C9.4262 19.3146 9.39311 19.1934 9.38766 19.1189C9.3822 19.0444 9.40479 18.9705 9.45098 18.9118C9.5059 18.8528 9.58168 18.8175 9.6622 18.8135L13.3463 18.4844L14.82 15.0631C14.8352 15.0271 14.8575 14.9945 14.8854 14.9671C14.9133 14.9397 14.9463 14.9181 14.9826 14.9034C15.0189 14.8888 15.0577 14.8815 15.0968 14.882C15.1359 14.8824 15.1745 14.8905 15.2105 14.9059C15.2463 14.9201 15.2788 14.9413 15.3062 14.9683C15.3337 14.9953 15.3554 15.0276 15.3701 15.0631L15.375 15.0557ZM7.27244 1.16172C7.27244 0.520688 7.90611 0 8.68959 0C9.47308 0 10.1067 0.520688 10.1067 1.16172V6.25071C10.1067 6.89175 9.47308 7.41243 8.68959 7.41243C7.90611 7.41243 7.27244 6.89175 7.27244 6.25071V1.16172ZM1.57189 11.1309H28.6059V5.27319C28.6038 5.0828 28.5281 4.9006 28.3947 4.76479C28.328 4.69783 28.2488 4.6447 28.1616 4.60845C28.0743 4.5722 27.9808 4.55355 27.8863 4.55356H25.2976C25.1944 4.55356 25.0922 4.53323 24.9968 4.49374C24.9015 4.45424 24.8148 4.39635 24.7418 4.32337C24.6688 4.25038 24.611 4.16374 24.5715 4.06839C24.532 3.97303 24.5116 3.87083 24.5116 3.76762C24.5116 3.66441 24.532 3.56221 24.5715 3.46685C24.611 3.3715 24.6688 3.28485 24.7418 3.21187C24.8148 3.13889 24.9015 3.081 24.9968 3.0415C25.0922 3.002 25.1944 2.98168 25.2976 2.98168H27.8887C28.4959 2.98362 29.0776 3.22567 29.5069 3.65499C29.9363 4.08431 30.1783 4.66604 30.1803 5.27319V27.8887C30.1783 28.4959 29.9363 29.0776 29.5069 29.5069C29.0776 29.9363 28.4959 30.1783 27.8887 30.1803H2.29152C1.68394 30.1783 1.10184 29.9359 0.672453 29.5061C0.24306 29.0762 0.00129513 28.4939 0 27.8863L0 5.27319C0.0019429 4.66604 0.243994 4.08431 0.673316 3.65499C1.10264 3.22567 1.68437 2.98362 2.29152 2.98168H5.05951C5.16273 2.98168 5.26493 3.002 5.36028 3.0415C5.45564 3.081 5.54228 3.13889 5.61526 3.21187C5.68824 3.28485 5.74613 3.3715 5.78563 3.46685C5.82513 3.56221 5.84546 3.66441 5.84546 3.76762C5.84546 3.87083 5.82513 3.97303 5.78563 4.06839C5.74613 4.16374 5.68824 4.25038 5.61526 4.32337C5.54228 4.39635 5.45564 4.45424 5.36028 4.49374C5.26493 4.53323 5.16273 4.55356 5.05951 4.55356H2.29152C2.10112 4.55564 1.91892 4.63133 1.78311 4.76479C1.71615 4.83144 1.66302 4.91067 1.62677 4.99791C1.59052 5.08516 1.57187 5.17871 1.57189 5.27319V11.1309ZM28.6059 12.7053H1.57189V27.8863C1.57396 28.0767 1.64966 28.2589 1.78311 28.3947C1.84976 28.4616 1.92899 28.5148 2.01624 28.551C2.10349 28.5873 2.19704 28.6059 2.29152 28.6059H27.8863C28.0767 28.6038 28.2589 28.5281 28.3947 28.3947C28.4616 28.328 28.5148 28.2488 28.551 28.1616C28.5873 28.0743 28.6059 27.9808 28.6059 27.8863V12.7053ZM12.3958 4.55356C12.1874 4.55356 11.9875 4.47076 11.8401 4.32337C11.6927 4.17597 11.6099 3.97606 11.6099 3.76762C11.6099 3.55917 11.6927 3.35927 11.8401 3.21187C11.9875 3.06448 12.1874 2.98168 12.3958 2.98168H17.6616C17.8701 2.98168 18.07 3.06448 18.2174 3.21187C18.3648 3.35927 18.4476 3.55917 18.4476 3.76762C18.4476 3.97606 18.3648 4.17597 18.2174 4.32337C18.07 4.47076 17.8701 4.55356 17.6616 4.55356H12.3958Z"
              fill={color}
            ></path>
          </svg>
        );
      },
    },
    {
      code: "national" as const,
      label: "National",
      icon: (isActive: boolean) => {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2L2 7l10 5 10-5-10-5zm0 7v13"
              stroke={isActive ? "#0D478B" : "#E5E7EB"}
            ></path>
          </svg>
        );
      },
    },
    {
      code: "online" as const,
      label: "Online Events",
      icon: (isActive: boolean) => {
        const color = isActive ? "#0D478B" : "#E5E7EB";
        return (
          <svg
            width="28"
            height="19"
            viewBox="0 0 28 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.3431 0H2.32361C1.04028 0 0 1.05885 0 2.3651V16.6349C0 17.9411 1.04028 19 2.32361 19H16.3431C17.6264 19 18.6667 17.9411 18.6667 16.6349V2.3651C18.6667 1.05885 17.6264 0 16.3431 0ZM25.55 1.86536L20.2222 5.60599V13.394L25.55 17.1297C26.5806 17.8521 28 17.1148 28 15.8531V3.14193C28 1.88516 26.5854 1.14297 25.55 1.86536Z"
              fill={color}
              fillOpacity={isActive ? "1" : "0.6"}
            ></path>
          </svg>
        );
      },
    },
  ];

  const displayedEvents = events.slice(0, 5);

  return (
    <section className=" pb-20 bg-white" id="eventcalendar">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-gray-300 rounded-[14px] overflow-hidden bg-[#F8F8F8] shadow-sm">
          {/* Tabs header */}
          <div className="grid grid-cols-1 md:grid-cols-4">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.code;
              const isLast = idx === tabs.length - 1;
              return (
                <button
                  key={tab.code}
                  onClick={() => setActiveTab(tab.code)}
                  className={`flex items-center justify-center gap-2 py-4 text-[15px] sm:text-[17px] font-semibold transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-white text-[#0D478B] border-b-[3px] border-[#0D478B]"
                    : `bg-[#4E74A6] text-white hover:bg-[#426490] ${!isLast ? "border-r border-[#6D8DB8]" : ""
                    }`
                    }`}
                >
                  {tab.icon(isActive)}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content area */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] items-center gap-10 px-6 sm:px-10 py-10">
            {/* Left list */}
            <div>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-10 h-10 border-4 border-[#0D478B] border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-gray-500 text-sm font-medium">
                    Loading events...
                  </p>
                </div>
              ) : displayedEvents.length === 0 ? (
                <div className="py-20 text-center text-gray-500 font-medium">
                  No upcoming {activeTab !== "upcoming" ? activeTab : ""} events
                  found.
                </div>
              ) : (
                <div className="space-y-6 h-[300px] overflow-y-auto overflow-x-hidden">
                  {displayedEvents.map((item, idx) => {
                    const isLastEvent = idx === displayedEvents.length - 1;
                    const isInt = item.event_type?.some(
                      (t: string) => t.toLowerCase() === "international",
                    );
                    const categoryPath = isInt
                      ? "international-event"
                      : "national-event";
                    const cardHref = `/events/${categoryPath}/${item.slug}`;
                    return (
                      <div
                        key={item.id}
                        className={`pb-6 ${!isLastEvent ? "border-b border-gray-300" : ""}`}
                      >
                        <Link
                          href={cardHref}
                          className="hover:underline text-[#0D478B]"
                        >
                          <h3 className="text-[#0D478B] text-[18px] sm:text-[20px] leading-snug font-semibold hover:text-blue-900 transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="mt-3 space-y-1 text-sm sm:text-[16px] text-gray-800 font-medium">
                          <p>
                            <span className="font-bold text-black">Date:</span>{" "}
                            {formatDate(item.event_date)}
                          </p>
                          {item.venue && (
                            <p>
                              <span className="font-bold text-black">
                                Venue:
                              </span>{" "}
                              {item.venue}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* View All Button */}
              {events.length > 0 && (
                <div className="mt-10">
                  <Link
                    href={`/events/event-listing?type=${activeTab}`}
                    className="inline-block text-center bg-[#0D478B] hover:bg-blue-800 text-white px-10 py-3.5 rounded-md text-[16px] sm:text-[18px] font-semibold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    View All Events
                  </Link>
                </div>
              )}
            </div>

            {/* Right illustration image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={calendarImage}
                alt="Event Calendar"
                className="w-full max-w-[520px] h-[300px] sm:h-[400px] object-cover rounded-[22px] shadow-md border border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
