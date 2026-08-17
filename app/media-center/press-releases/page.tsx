import { getAllEvents, getMediaCenterList } from "@/actionCreator/home.actionCreator";
import MediaList from "@/components/media/MediaList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIMA Press Releases",
  description: "Browse and filter AIMA's press releases.",
};

interface PageProps {
  searchParams: Promise<{
    month?: string;
    year?: string;
    type?: string;
    page?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { month, year, type, page } = await searchParams;

  const currentType = "press-releases";
  const currentPage = page ? parseInt(page) : 1;

  // Parameters for the backend media list API
  const apiParams = {
    month,
    year,
    page: currentPage,
  };

  // Fetch media list based on type, along with the filter lists (from event filters)
  const [mediaResponse, filtersResponse] = await Promise.all([
    getMediaCenterList(currentType, apiParams),
    getAllEvents(),
  ]);

  const mediaItems = mediaResponse?.data || [];
  const meta = mediaResponse?.meta || null;
  const filtersData = filtersResponse?.data || {};

  const years = filtersData.years || [];
  const months = filtersData.months || [];

  return (
    <MediaList
      mediaItems={mediaItems}
      years={years}
      months={months}
      meta={meta}
      currentFilters={{
        month,
        year,
        type: currentType,
        page: currentPage.toString(),
      }}
    />
  );
}
