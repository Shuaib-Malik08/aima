import { getAllEvents, getMediaCenterList } from "@/actionCreator/home.actionCreator";
import PhotoGallery from "@/components/media/PhotoGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIMA Photo Gallery",
  description: "Browse AIMA's photo gallery events and media.",
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

  const currentType = "photo-gallery";
  const currentPage = page ? parseInt(page) : 1;


  const apiParams = {
    month,
    year,
    page: currentPage,
  };


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
    <PhotoGallery
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
