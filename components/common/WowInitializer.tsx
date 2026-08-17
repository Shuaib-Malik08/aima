"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type WowConstructor = new (config?: {
  boxClass?: string;
  animateClass?: string;
  offset?: number;
  mobile?: boolean;
  live?: boolean;
}) => {
  init: () => void;
  sync?: () => void;
};

export default function WowInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let isMounted = true;

    const initWow = async () => {
      try {
        const wowModule = (await import("wowjs")) as { WOW?: WowConstructor };
        if (!isMounted || !wowModule.WOW) {
          return;
        }

        const wow = new wowModule.WOW({
          boxClass: "wow",
          animateClass: "animate__animated",
          offset: 30,
          mobile: true,
          live: true,
        });

        wow.init();
      } catch (err) {
        console.error("Failed to initialize WOW.js:", err);
      }
    };

    // Small delay to ensure React DOM has finished rendering after route transition
    const timer = setTimeout(() => {
      void initWow();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}

