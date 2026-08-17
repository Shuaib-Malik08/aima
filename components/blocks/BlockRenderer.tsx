import { Block } from "@/types/blocks.types";
import HeroSection from "../home/HeroSection";
import EducationSection from "../home/EductionSection";
import UpcomingEvents from "../home/UpcomingEventSection";
import StaticBlock from "./StaticBlock";
import ResearchSection from "../home/ResearchSection";
import EventsSection from "../home/ExploreSection";
import ManagerialSection from "../home/ManagerialSection";
import EventHeroSection from "../eventsConferences/EventHeroSection";
import ManagementHeroSection from "../management_eduction/ManagementHeroSection";
import FeatureManagement from "../management_eduction/FeatureManagement";
import TestingHeroSection from "../testingAssesment/TestingHeroSection";
import Aptitude from "../testingAssesment/Aptitude";
import TraningHeroSection from "../trainingDevelopment/TraningHeroSection";
import WorkshopTraining from "../trainingDevelopment/WorkshopTraining";
import KnowledgeHeroSection from "../knowledgeResources/HeroSection";
import Academic from "../knowledgeResources/Academic";
import Publications from "../knowledgeResources/Publications";
import ManagementTV from "../knowledgeResources/ManagementTV";
import EventAward from "../eventsConferences/EventAward";
import InternationalEvent from "../eventsConferences/InternationalEvent";
import NationalEvent from "../eventsConferences/NationalEvent";
import MembershipHeroSection from "../membershipNetwork/MembershipHeroSection";
import AboutHeroSection from "../about/AboutHeroSection";
import MediaHeroSection from "../media/HeroSection";
import AimaNews from "../media/AimaNews";
import EventCalendar from "../eventsConferences/EventCalendar";
import Secretariat from "../about/Secretariat";
import PastPresidents from "../about/PastPresidents";
import OfficeBearers from "../about/OfficeBearers";
import CouncilOfManagement from "../about/CouncilOfManagement";
import CommitteeChairperson from "../about/CommitteeChairperson";
import SpecailEcnomic from "../media/SpecailEcnomic";
import ContactSection from "../home/ContactSection";
import PressRelease from "../media/PressRelease";
import BuildManagment from "../management_eduction/BuildManagment";
import JoinAIMA from "../membershipNetwork/JoinAIMA";
import LmaNetworkSection from "../membershipNetwork/LmaNetworkSection";
import ProfessionalTestimonials from "../trainingDevelopment/ProfessionalTestimonials";
import SubCategoryListing from "../eventsConferences/SubCategoryListing";
import EventCategoryHero from "../eventsConferences/EventCategoryHero";

// ads blocks with a real module_code
const ADS_MODULE_MAP: Record<
  string,
  React.ComponentType<{ block: Extract<Block, { type: "ads" }> }>
> = {
  "media-center": HeroSection,
  "committee-chairman": EventsSection,
  "aima-secretariat": EducationSection,
  "past-presidents": ResearchSection,
  // "management-tv-categories": ManagementTV as any,/
  "management-tv-categories": ManagerialSection,
  // article: ManagementHeroSection,
  "Working Professionals": TestingHeroSection,
  events: Aptitude,
  national: InternationalEvent as any,
  international: InternationalEvent as any,
  // "article-categories": TraningHeroSection,
};

// ads blocks where module_code is null — match by block.name instead
const ADS_NAME_MAP: Record<string, React.ComponentType<{ block: any }>> = {
  "Knowledge Resources Banner": KnowledgeHeroSection,
  "Management TV Banner": ManagementTV as React.ComponentType<{ block: any }>,
  Reports: Academic,
  "Events & Conferences Banner": EventHeroSection as React.ComponentType<{
    block: any;
  }>,
  InternationalEvent: InternationalEvent as React.ComponentType<{ block: any }>,
  "International Events": InternationalEvent as React.ComponentType<{ block: any }>,
  "International Event": InternationalEvent as React.ComponentType<{ block: any }>,
  "International Event Listing": InternationalEvent as React.ComponentType<{ block: any }>,
  "National Events": InternationalEvent as React.ComponentType<{ block: any }>,
  "National Event": InternationalEvent as React.ComponentType<{ block: any }>,
  "National Event Listing": InternationalEvent as React.ComponentType<{ block: any }>,
  "AIMA Awards": EventAward as React.ComponentType<{ block: any }>,
  "Testing and Assessment Banner": TestingHeroSection as React.ComponentType<{
    block: any;
  }>,
  "Membership & Network Banner": MembershipHeroSection as React.ComponentType<{
    block: any;
  }>,
  Banner: AboutHeroSection as React.ComponentType<{ block: any }>,
  "Media Banner": MediaHeroSection as React.ComponentType<{ block: any }>,
  "Event Calender": EventCalendar as React.ComponentType<{ block: any }>,
  "Training & Development Banner": TraningHeroSection as React.ComponentType<{
    block: any;
  }>,
  'Management Education Banner': ManagementHeroSection as React.ComponentType<{
    block: any;
  }>,
};

// dynamic blocks
const DYNAMIC_MODULE_MAP: Record<
  string,
  React.ComponentType<{ block: Extract<Block, { type: "dynamic" }> }>
> = {
  events: UpcomingEvents,
  "article-categories": Publications,
  article: Publications,
  "media-center": AimaNews as any,
  "management-tv-videos": ManagementTV as any,
  "management-tv-categories": ManagementTV as any,
  "management-tv": ManagementTV as any,
  testimonial: FeatureManagement as any,
  "lma-network": LmaNetworkSection as any,
  national: InternationalEvent as any,
  international: InternationalEvent as any,
};

interface Props {
  block: Block;
}

export default function BlockRenderer({ block }: Props) {
  if (block.name === "Build Your Management Education form") {
    return <BuildManagment />;
  }

  if (block.name === "Join AIMA") {
    return <JoinAIMA />;
  }

  if (block.type === "static") {
    if (block.name === "Contact Us") {
      return <ContactSection data={block} />;
    }
    if (block.name === "Hero") {
      return <EventCategoryHero block={block} />;
    }
    return <StaticBlock block={block} />;
  }

  if (block.type === "ads") {
    const Component =
      (block.module_code ? ADS_MODULE_MAP[block.module_code] : undefined) ??
      ADS_NAME_MAP[block.name];
    if (!Component) return null;
    return <Component block={block} />;
  }

  if (block.type === "dynamic") {
    if (
      block.name === "Sub Category Listing" ||
      block.name?.toLowerCase().includes("sub category") ||
      block.name?.toLowerCase().includes("sub-category")
    ) {
      return <SubCategoryListing block={block as any} />;
    }

    if (Array.isArray(block.sub_module)) {
      if (block.sub_module.includes("office-bearers")) {
        return <OfficeBearers block={block} />;
      }
      if (
        block.sub_module.includes("aima-secretariat") ||
        block.sub_module.includes("secretariat")
      ) {
        return <Secretariat block={block} />;
      }
      if (block.sub_module.includes("past-presidents")) {
        return <PastPresidents block={block} />;
      }
      if (
        block.sub_module.includes("council-of-management") ||
        block.sub_module.includes("standing-committee")
      ) {
        return <CouncilOfManagement block={block} />;
      }
      if (
        block.sub_module.includes("committee-chairman") ||
        block.sub_module.includes("committee-chairperson")
      ) {
        return <CommitteeChairperson block={block} />;
      }
      if (block.sub_module.includes("special-economic-times-supplements")) {
        return <SpecailEcnomic block={block} />;
      }
      if (block.sub_module.includes("workshop-training")) {
        return <WorkshopTraining block={block as any} />;
      }
      if (
        block.sub_module.includes("alumni-management-education") ||
        block.sub_module.includes("testimonial")
      ) {
        return <FeatureManagement block={block as any} />;
      }
      if (
        block.sub_module.includes("management-tv") ||
        block.sub_module.includes("management-tv-videos") ||
        block.sub_module.includes("management-tv-categories")
      ) {
        return <ManagementTV block={block as any} />;
      }
      if (
        block.module_code === "lma-network" ||
        block.sub_module.includes("lma-network") ||
        block.sub_module.includes("east") ||
        block.sub_module.includes("west") ||
        block.sub_module.includes("north") ||
        block.sub_module.includes("south")
      ) {
        return <LmaNetworkSection block={block as any} />;
      }
      if (
        block.module_code === "professional-development-testimonials" ||
        block.sub_module.includes("professional-development-testimonials")
      ) {
        return <ProfessionalTestimonials />;
      }
    }

    if (
      block.name?.toLowerCase().includes("international event") ||
      block.name?.toLowerCase().includes("national event") ||
      block.name?.toLowerCase().includes("national events dynamic") ||
      block.module_code === "national" ||
      block.module_code === "international" ||
      (Array.isArray(block.sub_module) &&
        (block.sub_module.includes("national") ||
          block.sub_module.includes("international")))
    ) {
      return <InternationalEvent block={block as any} />;
    }

    if (
      Array.isArray(block.sub_module) &&
      block.sub_module.includes("press-releases")
    ) {
      return <PressRelease />;
    }

    const Component = DYNAMIC_MODULE_MAP[block.module_code];
    if (!Component) return null;
    return <Component block={block} />;
  }

  return null;
}
