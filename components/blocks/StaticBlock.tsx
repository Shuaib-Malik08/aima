// import type { Block } from "@/types/blocks.types";
// import HasBackground from "./HasBackground";

// type StaticBlockType = Extract<Block, { type: "static" }>;

// export default function StaticBlock({ block }: { block: StaticBlockType }) {
//   const { title, description, detail, bg_photo } = block;
//   if (!title && !description && !detail) return null;

//   const hasBackground = !!bg_photo;

//   const inner = (
//     <div
//       className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ${hasBackground ? "relative z-10" : ""}`}
//     >
//       {title && (
//         <div dangerouslySetInnerHTML={{ __html: title }} />
//       )}

//       {description && (
//         <div
//           // className="prose-headings:font-heading prose-headings:leading-tight"
//           dangerouslySetInnerHTML={{ __html: description }}
//         />
//       )}

//       {/* Detail — body content, rendered as HTML */}
//       {detail && (
//         <div
//           className={`${hasBackground ? "prose-invert" : ""}`}
//           dangerouslySetInnerHTML={{ __html: detail }}
//         />
//       )}
//     </div>
//   );

//   if (hasBackground) {
//     return (
//       <HasBackground data={block} />
//     );
//   }

//   return <section>{inner}</section>;
// }

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Block } from "@/types/blocks.types";
import HasBackground from "./HasBackground";

type StaticBlockType = Extract<Block, { type: "static" }>;

export default function StaticBlock({ block }: { block: StaticBlockType }) {
  const { title, description, detail, bg_photo } = block;

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      // Ignore external links
      if (!href || href.startsWith("http")) return;

      e.preventDefault();

      router.push(href);
    };

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [router]);

  if (!title && !description && !detail) return null;

  const hasBackground = !!bg_photo;

  const inner = (
    <div
      ref={containerRef}
      className={hasBackground ? "relative z-10" : ""}
    >
      {title && <div dangerouslySetInnerHTML={{ __html: title }} />}

      {description && (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}

      {detail && (
        <div
          className={hasBackground ? "prose-invert" : ""}
          dangerouslySetInnerHTML={{ __html: detail }}
        />
      )}
    </div>
  );

  if (hasBackground) {
    return <HasBackground data={block} />;
  }

  return <section>{inner}</section>;
}