// import { Metadata } from "next";
// import {
//     getPageData,
// } from "@/actionCreator/home.actionCreator";
// import { Block } from "@/types/blocks.types";
// import BlockRenderer from "@/components/blocks/BlockRenderer";

// export const generateMetadata = async (): Promise<Metadata> => {
//     const pageData = await getPageData({
//         pageName: "aima",
//     });

//     return {
//         title: pageData?.data?.meta_title || "AIMA",
//         description: pageData?.data?.meta_description || "",
//     };
// };

// export default async function Page() {
//     const pageData = await getPageData({
//         pageName: "home",
//     });

//     const blocks: Block[] = pageData?.data?.blocks || [];

//     console.log('blocks', blocks)

//     if (blocks.length) {
//         return (
//             <>
//                 {blocks.map((block, index) => (
//                     <BlockRenderer
//                         key={`${block.type}-${block.name}-${index}`}
//                         block={block}
//                     />
//                 ))}
//             </>
//         );
//     }

//     return (
//         <div className="flex h-dvh items-center justify-center text-3xl font-semibold">
//             Coming soon...
//         </div>
//     );
// }

import { redirect } from "next/navigation";

function page() {
  return redirect("/aima/home");
}

export default page;
