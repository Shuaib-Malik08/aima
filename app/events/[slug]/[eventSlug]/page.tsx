import React from "react";
import { Metadata } from "next";
import {
  getEventsBySlug,
  getEventSubtypeBySlug,
} from "@/actionCreator/home.actionCreator";
import EventSubTypeDetails from "@/components/eventsConferences/EventSubTypeDetails";
import EventDetails from "@/components/eventsConferences/EventDetails";

interface PageProps {
  params: Promise<{ slug: string; eventSlug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, eventSlug } = await params;

  const [subTypeRes, eventRes] = await Promise.all([
    getEventSubtypeBySlug({ slug: eventSlug?.trim() }),
    getEventsBySlug({ slug: eventSlug?.trim() }),
  ]);

  const subTypeData = subTypeRes?.data;
  const eventData = eventRes?.data;

  const formattedType = slug
    ? slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Events";

  const title =
    subTypeData?.meta_title ||
    subTypeData?.name ||
    eventData?.meta_title ||
    eventData?.title ||
    `${formattedType} - AIMA`;

  const description =
    subTypeData?.meta_description ||
    eventData?.meta_description ||
    `Browse ${formattedType} and conferences from All India Management Association (AIMA).`;

  return {
    title: `${title} | AIMA`,
    description,
  };
}

export default async function EventNestedSlugPage({ params }: PageProps) {
  const { slug, eventSlug } = await params;

  const [subTypeRes, eventRes] = await Promise.all([
    getEventSubtypeBySlug({ slug: eventSlug?.trim() }),
    getEventsBySlug({ slug: eventSlug?.trim() }),
  ]);

  const subTypeData = subTypeRes?.data;
  const eventData = eventRes?.data;

  // If subtype details are available from the API (has speakers, partners, banner, etc.)
  if (subTypeData) {
    return (
      <EventSubTypeDetails
        data={subTypeData}
        slug={eventSlug}
        type={slug}
      />
    );
  }

  // If a single event with tabs / agenda is returned
  if (eventData?.event_tabs && eventData.event_tabs.length > 0) {
    return <EventDetails eventData={eventData} />;
  }

  // Otherwise render EventSubTypeDetails with available data (or graceful fallback)
  return (
    <EventSubTypeDetails
      data={subTypeData || eventData || null}
      slug={eventSlug}
      type={slug}
    />
  );
}
