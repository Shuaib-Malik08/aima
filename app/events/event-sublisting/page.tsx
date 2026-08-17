import { getAllEvents, getSubTypesEvents } from "@/actionCreator/home.actionCreator";
import EventSubList from "@/components/eventsConferences/EventSubList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AIMA Events - Upcoming & Past Events",
    description: "Browse and filter AIMA's upcoming and past national and international events.",
};

interface PageProps {
    searchParams: Promise<{
        year?: string;
        type?: string;
        page?: string;
        sub_type?: string
    }>;
}

export default async function Page({ searchParams }: PageProps) {
    const { year, type, sub_type, page } = await searchParams;

    const currentPage = page ? parseInt(page) : 1;

    // Parameters for the backend filter API
    const apiParams = {
        year,
        type: type,
        sub_type: sub_type,
        page: currentPage,
    };

    // Fetch events based on whether it is past or upcoming, along with the filter lists
    const [eventsResponse, filtersResponse] = await Promise.all([
        getSubTypesEvents(apiParams),
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
        <EventSubList
            events={events}
            eventTypes={eventTypes}
            locations={locations}
            years={years}
            months={months}
            meta={meta}
            currentFilters={{
                year,
                type,
                sub_type,
                page: currentPage.toString(),
            }}
        />
    );
}
