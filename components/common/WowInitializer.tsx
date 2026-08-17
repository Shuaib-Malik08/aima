"use client";

import { useEffect } from "react";

type WowConstructor = new (config?: {
  boxClass?: string;
  animateClass?: string;
  offset?: number;
  mobile?: boolean;
  live?: boolean;
}) => {
  init: () => void;
};

export default function WowInitializer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let isMounted = true;

    const initWow = async () => {
      const wowModule = (await import("wowjs")) as { WOW?: WowConstructor };
      if (!isMounted || !wowModule.WOW) {
        return;
      }

      const wow = new wowModule.WOW({
        offset: 30,
        mobile: true,
        live: true,
      });

      wow.init();
    };

    void initWow();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}
