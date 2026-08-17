import {
  getArticalesBySlug,
  getEventsBySlug,
  getEventSubtypeBySlug,
  getLmaNetworkBySlug,
  getManagementTVBySlug,
  getMediaCenterBySlug,
  getReportPublicationBySlug,
} from "@/actionCreator/home.actionCreator";
import EventDetails from "@/components/eventsConferences/EventDetails";
import EventSubTypeDetails from "@/components/eventsConferences/EventSubTypeDetails";
import MediaGallery from "@/components/media/MediaGallery";
import { redirect } from "next/navigation";

async function page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  const isEvent = slug?.[0] === "events";
  const isArticle = slug?.[0] === "articles";
  const isMediaCenter = slug?.[0] === "media-center";
  const isPressRelease = slug?.[0] === "press-releases";
  const isPhotoGallery = slug?.[0] === "photo-gallery";
  const isAimaInTheNews = slug?.[0] === 'aima-in-the-news'
  const isManagementTv = slug?.[0] === "management-tv";
  const isLmaNetwork = slug?.[0] === "lma-network";
  const isReportPublication = slug?.[0] === "report-publications";

  // Check if URL has a category segment: /events/[category]/[slug]
  const hasCategory = isEvent && slug?.length >= 3;
  const eventCategory = hasCategory ? slug?.[1] : undefined;
  const eventSlug = hasCategory ? slug?.[2] : slug?.[1];

  const [eventSubtypeResponse, eventResponse] = isEvent && eventSlug
    ? await Promise.all([
        getEventSubtypeBySlug({ slug: eventSlug.trim() }),
        getEventsBySlug({ slug: eventSlug.trim() }),
      ])
    : [null, null];

  const eventSubtypeData = eventSubtypeResponse?.data;
  const eventData = eventResponse?.data;
  const articlesData = isArticle
    ? await getArticalesBySlug({ slug: slug?.[1]?.trim() })
    : null;
  const articleData = articlesData?.data?.article;
  const relatedArticles = articlesData?.data?.related_articles || [];

  const mediaCenterResponse =
    isMediaCenter || isPressRelease || isPhotoGallery || isAimaInTheNews
      ? await getMediaCenterBySlug({
          slug: slug?.[1]?.trim(),
          type: isPressRelease
            ? "press-releases"
            : isPhotoGallery
              ? "photo-gallery"
              : "aima-in-the-news",
        })
      : null;
  const mediaCenterData = mediaCenterResponse?.data;
  // console.log('mediaCenterResponse', mediaCenterResponse)
  const managementTvResponse = isManagementTv
    ? await getManagementTVBySlug({ slug: slug?.[1]?.trim() })
    : null;

  const lmaNetworkResponse = isLmaNetwork
    ? await getLmaNetworkBySlug({ slug: slug?.[1]?.trim() })
    : null;
  const lmaNetworkData = lmaNetworkResponse?.data;

  const reportPublicationResponse = isReportPublication
    ? await getReportPublicationBySlug({ slug: slug?.[1]?.trim() })
    : null;
  const reportPublicationData = reportPublicationResponse?.data;

  // Event subtype exists
  if (eventSubtypeData) {
    return (
      <EventSubTypeDetails
        data={eventSubtypeData}
        slug={eventSlug}
        type={eventCategory}
      />
    );
  }

  // Event exists
  if (eventData) {
    return <EventDetails eventData={eventData} />;
  }

  // Article exists
  if (articleData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 font-primary">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-blue-900 transition">
            Home
          </a>
          <span>/</span>
          {/* <span className="text-gray-400 capitalize">{slug?.[0]}</span>
          <span>/</span> */}
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">
            {articleData.title}
          </span>
        </div>

        {/* Article Header */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {articleData.title}
        </h1>

        {/* Authors Info */}
        {articleData.authors && articleData.authors.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 mb-8 border-y border-gray-100 py-4">
            {articleData.authors.map((author: any) => (
              <div key={author.id} className="flex items-center gap-3">
                {author.photo && (
                  <img
                    src={author.photo}
                    alt={author.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {author.name}
                  </h4>
                  {author.description && (
                    <p className="text-xs text-gray-500">
                      {author.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {articleData.created_at && (
              <div className="ml-auto text-xs text-gray-400">
                Published:{" "}
                {new Date(articleData.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        )}

        {/* Featured Image */}
        {articleData.thumbnail && (
          <div className="w-full mb-8 rounded-xl overflow-hidden shadow-lg aspect-video max-h-[450px]">
            <img
              src={articleData.thumbnail}
              alt={articleData.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div
          className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-[16px] md:text-[17px] mb-12
            [&>p]:mb-6 [&>p:last-child]:mb-0
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3
            [&>strong]:font-semibold [&>strong]:text-gray-900"
          dangerouslySetInnerHTML={{
            __html: articleData.short_description || "",
          }}
        />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-gray-200 pt-10 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((rel: any) => (
                <a
                  key={rel.id}
                  href={`/articles/${rel.slug}`}
                  className="group flex gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition duration-200 text-left"
                >
                  {rel.thumbnail && (
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex flex-col justify-center">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-900 transition line-clamp-2 text-sm leading-snug">
                      {rel.title}
                    </h4>
                    {rel.created_at && (
                      <span className="text-[11px] text-gray-400 mt-2">
                        {new Date(rel.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Media Center item exists
  if (mediaCenterData) {
    const isSpecialType =
      mediaCenterData.type === "aima-in-the-news" ||
      mediaCenterData.type === "special-economic-times-supplements";

    if (isSpecialType && mediaCenterData.pdf_file) {
      redirect(mediaCenterData.pdf_file);
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 font-primary">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-blue-900 transition">
            Home
          </a>
          <span>/</span>
          {/* <span className="text-gray-400 capitalize">{slug?.[0]?.replace(/-/g, ' ')}</span>
          <span>/</span> */}
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">
            {mediaCenterData.title}
          </span>
        </div>

        {/* Media Center Header */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight text-left">
          {mediaCenterData.title}
        </h1>

        {/* Publish Info */}
        <div className="flex flex-wrap items-center gap-4 mb-8 border-y border-gray-100 py-4 text-xs text-gray-500">
          {mediaCenterData.publisher_name && (
            <div>
              <span className="font-semibold text-gray-700">Publisher:</span>{" "}
              {mediaCenterData.publisher_name}
            </div>
          )}
          {mediaCenterData.publish_date && (
            <div className="ml-auto text-gray-400">
              Published:{" "}
              {new Date(mediaCenterData.publish_date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </div>
          )}
        </div>

        {/* Gallery Slider (if photo-gallery) or Featured Image */}
        {mediaCenterData.type === "photo-gallery" &&
        mediaCenterData.galleries &&
        mediaCenterData.galleries.length > 0 ? (
          <MediaGallery galleries={mediaCenterData.galleries} />
        ) : (
          mediaCenterData.image && (
            <div className="w-full mb-8 rounded-xl overflow-hidden shadow-lg aspect-video max-h-[450px]">
              <img
                src={mediaCenterData.image}
                alt={mediaCenterData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )
        )}

        {/* Media Center Body */}
        <div
          className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-[16px] md:text-[17px] mb-12 text-left
            [&>p]:mb-6 [&>p:last-child]:mb-0
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3
            [&>strong]:font-semibold [&>strong]:text-gray-900"
          dangerouslySetInnerHTML={{
            __html: mediaCenterData.description || "",
          }}
        />

        {/* PDF Attachment Download */}
        {mediaCenterData.pdf_file && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-left">
            <div className="flex items-center gap-3">
              <svg
                className="w-8 h-8 text-red-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Attachment Available
                </h4>
                <p className="text-xs text-gray-500">
                  Download the related press release or media document.
                </p>
              </div>
            </div>
            <a
              href={mediaCenterData.pdf_file}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-[#0C478B] hover:bg-blue-800 text-white rounded-lg text-sm font-semibold transition shadow-sm"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    );
  }

  // Management TV exists
  const managementTvData = managementTvResponse?.data;
  if (managementTvData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 font-primary">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-blue-900 transition">
            Home
          </a>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">
            {managementTvData.title}
          </span>
        </div>

        {/* Video Player Container */}
        {managementTvData.video_link ? (
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8 bg-black">
            <iframe
              src={managementTvData.video_link}
              title={managementTvData.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : managementTvData.thumbnail ? (
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-8 max-h-[450px]">
            <img
              src={managementTvData.thumbnail}
              alt={managementTvData.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {/* Video Header */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight text-left">
          {managementTvData.title}
        </h1>

        {/* Video Metadata Panel */}
        <div className="flex flex-wrap items-center gap-6 mb-8 border-y border-gray-100 py-4 text-xs text-gray-500 text-left">
          {managementTvData.duration && (
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Duration:{" "}
                <strong className="text-gray-700">
                  {managementTvData.duration}
                </strong>
              </span>
            </div>
          )}
          {managementTvData.publish_date && (
            <div className="flex items-center gap-1.5 ml-0 md:ml-auto">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                Published:{" "}
                <strong className="text-gray-700">
                  {new Date(managementTvData.publish_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* Speakers Section */}
        {managementTvData.speakers && (
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-8 text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Speakers
            </h3>
            <p className="text-sm font-medium text-gray-800 leading-relaxed">
              {managementTvData.speakers}
            </p>
          </div>
        )}

        {/* Description Body */}
        {managementTvData.short_description && (
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              About Video
            </h3>
            <div
              className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-[16px]
                [&>p]:mb-6 [&>p:last-child]:mb-0
                [&>a]:text-[#0C478B] [&>a]:font-semibold [&>a]:hover:underline"
              dangerouslySetInnerHTML={{
                __html: managementTvData.short_description,
              }}
            />
          </div>
        )}
      </div>
    );
  }

  // LMA Network item exists
  if (lmaNetworkData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-primary">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-blue-900 transition">
            Home
          </a>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">
            LMA Network
          </span>
        </div>

        {/* Header */}
        <div className="text-left mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100 mb-2">
            LMA Network
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight capitalize">
            {slug?.[1]?.trim().replace(/-/g, " ")} Region Associations
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            List of Local Management Associations and office bearers in the{" "}
            {slug?.[1]?.trim()} region.
          </p>
        </div>

        {/* LMA Cards Grid */}
        {lmaNetworkData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No associations found in this region.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lmaNetworkData.map((lma: any) => (
              <div
                key={lma.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col justify-between text-left"
              >
                {/* LMA Details */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-snug">
                      {lma.lma_name}
                    </h3>
                    <span className="text-[11px] font-semibold tracking-wider uppercase bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md border border-gray-100">
                      {lma.region}
                    </span>
                  </div>

                  {/* Office Bearers / Contact Persons */}
                  {lma.lma_networks && lma.lma_networks.length > 0 && (
                    <div className="mt-6 space-y-6">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
                        Office Bearers
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {lma.lma_networks.map((person: any) => (
                          <div key={person.id} className="space-y-1">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 capitalize">
                              {person.type}
                            </span>
                            <h5 className="font-semibold text-gray-800 text-sm mt-1">
                              {person.name}
                            </h5>
                            {person.designation && (
                              <p className="text-xs text-gray-500">
                                {person.designation}
                              </p>
                            )}

                            {/* Bearer contact info */}
                            <div className="text-xs space-y-1 pt-2">
                              {person.email && (
                                <a
                                  href={`mailto:${person.email}`}
                                  className="flex items-center gap-1.5 text-[#0C478B] hover:underline break-all"
                                >
                                  <svg
                                    className="w-3.5 h-3.5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span>{person.email}</span>
                                </a>
                              )}
                              {person.mobile && (
                                <a
                                  href={`tel:${person.mobile}`}
                                  className="flex items-center gap-1.5 text-gray-600 hover:text-[#0C478B] hover:underline"
                                >
                                  <svg
                                    className="w-3.5 h-3.5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span>{person.mobile}</span>
                                </a>
                              )}
                              {person.tel && (
                                <a
                                  href={`tel:${person.tel}`}
                                  className="flex items-center gap-1.5 text-gray-600 hover:text-[#0C478B] hover:underline"
                                >
                                  <svg
                                    className="w-3.5 h-3.5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                  </svg>
                                  <span>{person.tel}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with Address & website if available */}
                <div className="bg-gray-50/75 border-t border-gray-100 p-6 md:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  {lma.lma_networks?.[0]?.address && (
                    <div className="flex items-start gap-2 max-w-[280px]">
                      <svg
                        className="w-4.5 h-4.5 text-gray-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="text-xs text-gray-600 leading-normal">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: lma.lma_networks[0].address,
                          }}
                        />
                        <div>
                          {lma.lma_networks[0].city},{" "}
                          {lma.lma_networks[0].state}{" "}
                          {lma.lma_networks[0].pincode}
                        </div>
                      </div>
                    </div>
                  )}
                  {lma.lma_networks?.[0]?.website && (
                    <a
                      href={
                        lma.lma_networks[0].website.startsWith("http")
                          ? lma.lma_networks[0].website
                          : `https://${lma.lma_networks[0].website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:text-blue-900 hover:border-blue-900 text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <span>Visit Website</span>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Publication exists
  if (reportPublicationData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-primary">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-blue-900 transition">
            Home
          </a>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">
            Publications
          </span>
        </div>

        {/* Header */}
        <div className="text-left mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 mb-2">
            Publication
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight capitalize">
            {slug?.[1]?.trim().replace(/-/g, " ")} Archives
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Explore the monthly issues and download resources for{" "}
            {slug?.[1]?.trim().replace(/-/g, " ")}.
          </p>
        </div>

        {/* Publications Grid */}
        {reportPublicationData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No publications found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reportPublicationData.map((pub: any) => {
              const thumbnail = pub.thumbnails?.[0]?.image;
              return (
                <div
                  key={pub.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col justify-between text-left"
                >
                  {/* Thumbnail / Header */}
                  <div>
                    {thumbnail ? (
                      <div className="w-full aspect-[3/4] bg-gray-50 overflow-hidden border-b border-gray-100 relative group">
                        <img
                          src={thumbnail}
                          alt={pub.title}
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#0C478B]/10 to-blue-50 flex flex-col items-center justify-center p-6 border-b border-gray-100 relative">
                        <svg
                          className="w-16 h-16 text-[#0C478B]/20 mb-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                          />
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#0C478B]/40">
                          No Thumbnail
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                          {pub.month} {pub.year}
                        </span>
                        {pub.content_type && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                            {pub.content_type}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-gray-950 line-clamp-2 leading-snug">
                        {pub.title}
                      </h3>
                      {pub.description && (
                        <div
                          className="text-xs text-gray-500 line-clamp-3 mt-2 font-medium leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: pub.description,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0">
                    {pub.cta_pdfs && pub.cta_pdfs.length > 0 ? (
                      <div className="space-y-2">
                        {pub.cta_pdfs.map((pdf: any, pIdx: number) => (
                          <a
                            key={pIdx}
                            href={pdf.pdf_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 bg-[#0C478B] hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors duration-200 flex items-center justify-center gap-1.5"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span>{pdf.label || "View Publication"}</span>
                          </a>
                        ))}
                      </div>
                    ) : pub.cta_links && pub.cta_links.length > 0 ? (
                      <div className="space-y-2">
                        {pub.cta_links.map((link: any, lIdx: number) => (
                          <a
                            key={lIdx}
                            href={link.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 bg-[#0C478B] hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors duration-200 flex items-center justify-center gap-1.5"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            <span>{link.label || "Learn More"}</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2 bg-gray-100 text-gray-400 rounded-lg text-xs font-semibold cursor-not-allowed text-center"
                      >
                        No resources available
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default page;
