import {
  getManagementTVVideos,
  getManagementTVVideoType,
  getManagementTVCategoriesBySlug,
} from "@/actionCreator/home.actionCreator";
import VideoListing from "@/components/management_tv/VideoListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIMA Management TV",
  description: "Watch AIMA's management insights, leadership discussions, and video categories.",
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
    series?: string;
    keyword?: string;
    page?: string;
    type?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { category, series, keyword, page, type } = await searchParams;

  const currentKeyword = keyword || "";
  const currentPage = page ? parseInt(page) : 1;
  const currentCategory = category || series;

  // Fetch lists and videos in parallel
  const [videosResponse, seriesResponse] = await Promise.all([
    getManagementTVVideos({
      categorySlug: currentCategory ?? '',
      keyword: currentKeyword,
      page: currentPage,
      type: type ?? ''
    }),
    getManagementTVCategoriesBySlug(),
  ]);


  const initialVideos = videosResponse?.data || [];
  const meta = videosResponse?.meta || null;
  const seriesCategories = seriesResponse?.data || [];
  return (
    <VideoListing
      initialVideos={initialVideos}
      seriesCategories={seriesCategories}
      generalCategories={[]}
      meta={meta}
      currentFilters={{
        category,
        series,
        keyword,
        page,
        type,
      }}
    />
  );
}
