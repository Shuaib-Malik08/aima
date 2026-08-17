export function getBlock(blocks: Block[], name: string): Block | undefined {
  return blocks?.find((b) => b.name === name);
}
 
/** Get multiple blocks whose names start with a given prefix */
export function getBlocksByPrefix(blocks: Block[], prefix: string): Block[] {
  return blocks?.filter((b) => b.name.startsWith(prefix)) ?? [];
}
 
/** Get events data from a dynamic block */
export function getBlockEvents(block: Block | undefined): EventItem[] {
  if (!block || !Array.isArray(block.data)) return [];
  return block.data as EventItem[];
}


export interface Block {
  type: "static" | "dynamic" | "ads";
  block_style: string | null;
  name: string;
  module_code: string | null;
  title: string;
  description: string | null;
  detail: string | null;
  bg_photo: string | null;
  data: BannerSetting | EventItem[] | Record<string, any> | null;
}

export interface BannerSetting {
  id: number;
  title: string;
  type: string;
  width: number;
  height: number;
  banners: Banner[];
}

export interface Banner {
  id: number;
  title: string;
  image: string;
  description: string | null;
  detail_text: string | null;
  url: string | null;
  sort_order: number;
  status: number;
}

export interface EventItem {
  id: number;
  title: string;
  sub_title: string | null;
  event_date: string;
  event_location: string;
  venue: string;
  event_type: string[];
  short_description: string;
  event_image: string | null;
  cta: { cta_title: string; cta_link: string; cta_priority: string; cta_type: string }[] | null;
  slug: string;
  meta_title: string;
}