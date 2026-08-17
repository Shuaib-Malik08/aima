import { Metadata } from "next";
import {
  getEventsBySlug,
  getPageData,
} from "@/actionCreator/home.actionCreator";
import { Block } from "@/types/blocks.types";
import BlockRenderer from "@/components/blocks/BlockRenderer";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;

  const pageData = await getPageData({
    pageName: slug?.trim() || "home",
  });

  const eventData = await getEventsBySlug({
    slug: slug?.trim(),
  });

  return {
    title: pageData?.data?.meta_title || eventData?.data?.meta_title || "AIMA",
    description:
      pageData?.data?.meta_description ||
      eventData?.data?.meta_description ||
      "",
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = await getPageData({
    pageName: slug?.trim() || "home",
  });

  let blocks: Block[] = pageData?.data?.blocks || [];

  if (slug?.trim() === "professional-development") {
    blocks = [
      ...blocks,
      {
        type: "dynamic",
        name: "Professional Development Testimonials",
        module_code: "professional-development-testimonials",
        sub_module: ["professional-development-testimonials"],
        title: "Testimonials",
        description: "",
        detail: null,
        bg_photo: null,
        data: [],
      } as any,
    ];
  }

  console.log('block', blocks)

  if (blocks.length) {
    return (
      <>
        {blocks.map((block, index) => (
          <BlockRenderer
            key={`${block.type}-${block.name}-${index}`}
            block={block}
          />
        ))}
      </>
    );
  }

  return (
    <div className="flex h-dvh items-center justify-center text-3xl font-semibold">
      Coming soon...
    </div>
  );
}
