import { getManagementTeamDetailBySlug } from "@/actionCreator/home.actionCreator";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const resolveImage = (profilePic: string | null): string => {
  if (profilePic) {
    if (profilePic.startsWith("http")) return profilePic;
    let cleanPath = profilePic;
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }
    if (cleanPath.startsWith("public/storage/")) {
      return `https://aima.sanntra.com/administrator/${cleanPath}`;
    }
    if (cleanPath.startsWith("storage/")) {
      return `https://aima.sanntra.com/administrator/public/${cleanPath}`;
    }
    return `https://aima.sanntra.com/administrator/public/storage/${cleanPath}`;
  }
  return "";
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const response = await getManagementTeamDetailBySlug({ slug });
  const data = response?.data;

  return {
    title: data?.meta_title || data?.name || "Management Detail | AIMA",
    description: data?.meta_description || data?.designation || "",
    keywords: data?.meta_keywords || "",
  };
};

export default async function ManagementDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const response = await getManagementTeamDetailBySlug({ slug });
  if (!response || !response.status || !response.data) {
    return notFound();
  }

  const member = response.data;
  const imageSrc = resolveImage(member.profile_pic);

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 font-primary">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-900 transition">Home</Link>
          <span>/</span>
          <Link href={'/about-aima'} className="text-gray-400">About AIMA</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[250px]">
            {member.name}
          </span>
        </nav>

        {/* Member Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Image */}
            {imageSrc ? (
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden shadow-md border border-gray-100 shrink-0">
                <img
                  src={imageSrc}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}

            <div className="flex-1 text-center md:text-left">
              {/* Type tag */}
              {member.type && (
                <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100 mb-4 capitalize">
                  {member.type.replace(/-/g, " ")}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {member.name}
              </h1>

              <p className="text-lg font-semibold text-[#0C478B] mb-1">
                {member.post_committee_name || member.designation}
              </p>

              {member.organisation && (
                <p className="text-gray-600 font-medium text-sm mb-4">
                  {member.organisation}
                </p>
              )}

              {member.duration && (
                <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-md border border-gray-100 mt-2">
                  <span className="font-semibold text-gray-700">Duration:</span>
                  <span>{member.duration}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Member Biography / Description */}
        {member.description && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              Biography
            </h2>
            <article
              className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-[16px]
                [&>p]:mb-6 [&>p:last-child]:mb-0
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
                [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4
                [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3
                [&>strong]:font-semibold [&>strong]:text-gray-900
                [&_img]:max-w-full [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-6 [&_img]:object-cover"
              dangerouslySetInnerHTML={{
                __html: member.description,
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
