import { notFound } from "next/navigation";
import { safeFetchWordPress } from "@/lib/api";
import ServiceDetailClient from "./ServiceDetailClient";

type ApiImage = {
  url?: string;
  alt?: string;
};

type ServiceDetailsPage = {
  service_type?: "Consulting" | "Migration" | string;
  banner_section?: {
    title?: string;
    description_list?: Array<{ description?: string }>;
    cta_title?: string;
    side_image?: ApiImage;
  };
  empower_section?: {
    title?: string;
    description?: string;
    cta_title?: string;
    move_up_image_list?: Array<{ move_up_image?: ApiImage }>;
    move_down_image_list?: Array<{ move_down_image?: ApiImage }>;
  };
  customizable_section?: {
    title?: string;
    description?: string;
    cta_title?: string;
    left_top_image?: ApiImage;
    right_top_image?: ApiImage;
    center_image?: ApiImage;
    left_bottom_image?: ApiImage;
    right_bottom_image?: ApiImage;
  };
  what_we_offer_section?: {
    heading?: string;
    cta_title?: string;
    what_we_offer?: Array<{
      title?: string;
      description?: string;
      image?: ApiImage;
      read_more_link?: { url?: string };
    }>;
  };
  migrate_to_liferay_section?: {
    heading?: string;
    cta_title?: string;
    migrate_to_liferay?: Array<{
      title?: string;
      description?: string;
      image?: ApiImage;
      read_more_link?: { url?: string };
    }>;
  };
  continue_section?: {
    title?: string;
    description?: string;
    cta_title?: string;
    continue_list?: Array<{
      title?: string;
      description?: string;
      icon?: ApiImage;
    }>;
  };
  liferay_products_section?: {
    heading?: string;
    liferay_products?: false | Array<{
      title?: string;
      description?: string;
      icon?: ApiImage;
    }>;
  };
  why_choose_aixtor_section?: {
    heading?: string;
    cta_title?: string;
    reason_1?: string;
    reason_2?: string;
    reason_3?: string;
    reason_4?: string;
    reason_5?: string;
    reason_6?: string;
    reason_7?: string;
    reason_8?: string;
  };
  faq_section?: {
    faq?: false | Array<{ title?: string; description?: string }>;
  };
  case_studies_section?: {
    section_title?: string;
    section_description?: string;
    primary_category?: unknown;
  };
};

type ServiceAcf = {
  service_listing_page?: {
    title?: string;
  };
  service_details_page?: ServiceDetailsPage;
};

type ServicePost = {
  id: number;
  slug: string;
  acf?: ServiceAcf;
};

type CaseStudyItem = {
  id: number;
  slug: string;
  acf?: {
    home_page?: {
      title?: string;
      description?: string;
      image?: ApiImage;
    };
  };
};

type CaseStudyMainSection = {
  home_page?: {
    title?: string;
    description?: string;
    cta_title?: string;
  };
};

type HomePageStartSection = {
  start_project_section?: {
    heading?: string;
    description?: string;
    cta_title?: string;
  };
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [
    servicesResponse,
    caseStudiesResponse,
    caseStudyMainResponse,
    homePageResponse,
  ] = await Promise.all([
    safeFetchWordPress<ServicePost[]>("services", [], { slug }),
    safeFetchWordPress<CaseStudyItem[]>("case-studies", [], { per_page: 10 }),
    safeFetchWordPress<Array<{ acf?: CaseStudyMainSection }>>(
      "case-studies-main-sections",
      [],
      { slug: "main-section" },
    ),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);

  const service = servicesResponse?.[0];

  if (!service?.acf?.service_details_page) {
    notFound();
  }

  const serviceCustomField = service.acf;
  const caseStudies = caseStudiesResponse ?? [];
  const caseStudyMainSection = caseStudyMainResponse?.[0]?.acf ?? {};
  const homePage = homePageResponse?.[0]?.acf ?? {};

  return (
    <div className="wrappper">
      <ServiceDetailClient
        slug={slug}
        serviceCustomField={serviceCustomField}
        caseStudies={caseStudies}
        caseStudyMainSection={caseStudyMainSection}
        homePage={homePage}
      />
    </div>
  );
}

