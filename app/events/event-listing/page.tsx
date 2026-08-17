import { getAllEvents, getUpcomingEvents, getPastEvents } from "@/actionCreator/home.actionCreator";
import EventList from "@/components/eventsConferences/EventList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIMA Events - Upcoming & Past Events",
  description: "Browse and filter AIMA's upcoming and past national and international events.",
};

interface PageProps {
  searchParams: Promise<{
    month?: string;
    year?: string;
    location?: string;
    type?: string;
    tab?: string;
    page?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { month, year, location, type, tab, page } = await searchParams;

  const currentTab = tab || "upcoming";
  const currentPage = page ? parseInt(page) : 1;

  // Parameters for the backend filter API
  const apiParams = {
    month,
    year,
    location,
    event_type: type === "upcoming" ? undefined : type,
    page: currentPage,
  };

  // Fetch events based on whether it is past or upcoming, along with the filter lists
  const [eventsResponse, filtersResponse] = await Promise.all([
    currentTab === "past" ? getPastEvents(apiParams) : getUpcomingEvents(apiParams),
    getAllEvents(),
  ]);

  const events = eventsResponse?.data || [];
  const meta = eventsResponse?.meta || null;
  const filtersData = filtersResponse?.data || {};

  const eventTypes = filtersData.eventTypes || [];
  const locations = filtersData.locations || [];
  const years = filtersData.years || [];
  const months = filtersData.months || [];

  return (
    <EventList
      events={events}
      eventTypes={eventTypes}
      locations={locations}
      years={years}
      months={months}
      meta={meta}
      currentFilters={{
        month,
        year,
        location,
        type,
        tab: currentTab,
        page: currentPage.toString(),
      }}
    />
  );
}
