export type BannerItem = {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  detail_text: string | null;
  url: string | null;
  sort_order: number;
  status: number;
};

export type AdsData = {
  id: number;
  title: string;
  type: "photo" | "text";
  width: number;
  height: number;
  has_description: number;
  has_url: number;
  status: number;
  banners: BannerItem[];
};

export type EventItem = {
  id: number;
  title: string;
  slug: string;
  event_date: string;
  event_location: string;
  venue: string;
  event_type: string[];
  event_image: string | null;
  short_description: string;
  cta: { cta_title: string; cta_link: string; cta_priority: string; cta_type: string }[] | null;
};

export type Block =
  | { type: "static"; name: string; module_code: string | null; sub_module?: string[] | null; title: string | null; description: string | null; detail: string; bg_photo: string | null; data: unknown }
  | { type: "ads"; name: string; module_code: string; sub_module?: string[] | null; title: string | null; description: string | null; detail: string | null; bg_photo: string | null; data: AdsData }
  | { type: "dynamic"; name: string; module_code: string; sub_module?: string[] | null; title: string | null; description: string | null; detail: string | null; bg_photo: string | null; data: any };