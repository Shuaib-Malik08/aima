"use client";

import ManagementTvHero from "../management_tv/ManagementTvHero";
import LatestVideos from "../management_tv/LatestVideos";
import ManagementSeries from "../management_tv/ManagementSeries";
import VideoCategories from "../management_tv/VideoCategories";
import LeaderShots from "../management_tv/LeaderShots";

export {
  ManagementTvHero,
  LatestVideos,
  ManagementSeries,
  VideoCategories,
  LeaderShots,
};

export default function ManagementTV({ block }: { block?: any } = {}) {
  if (block) {
    const code = block?.module_code || "";
    const name = block?.name?.toLowerCase() || "";
    const subModules = Array.isArray(block?.sub_module) ? block.sub_module : [];

    if (
      code === "management-series" ||
      subModules.includes("management-series")
    ) {
      return <ManagementSeries block={block} />;
    }

    if (
      code === "leader-shots" ||
      subModules.includes("leader-shots") ||
      subModules.includes("leaderspeak") ||
      name.includes("leader shots") ||
      name.includes("leadershots")
    ) {
      return <LeaderShots block={block} />;
    }

    if (
      code === "management-tv-videos" ||
      subModules.includes("management-tv-videos")
    ) {
      return <LatestVideos block={block} />;
    }

    if (
      code === "management-tv-categories" ||
      subModules.includes("management-tv-categories")
    ) {
      return <VideoCategories block={block} />;
    }

    if (name.includes("banner") || block?.type === "ads") {
      return <ManagementTvHero block={block} />;
    }
  }

  return (
    <>
      <ManagementTvHero block={block} />
      <LatestVideos block={block} />
      <ManagementSeries block={block} />
      <VideoCategories block={block} />
      <LeaderShots block={block} />
    </>
  );
}
