import { safeFetchWordPress } from "@/lib/api";
import ServicesListClient from "./ServicesListClient";

type ApiImage = {
  url?: string;
  alt?: string;
};

type ServiceListingItem = {
  id: number;
  slug: string;
  acf?: {
    service_listing_page?: {
      title?: string;
      description?: string;
      image?: ApiImage;
    };
  };
};

type ServiceListMainSection = {
  list_page?: {
    banner_section?: {
      title?: string;
      description?: string;
      side_image?: ApiImage;
    };
    modern_section?: {
      title?: string;
      description?: string;
    };
  };
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

export default async function ServicesPage() {
  const [
    serviceMainResponse,
    servicesResponse,
    caseStudiesResponse,
    caseStudyMainResponse,
    homePageResponse,
  ] = await Promise.all([
    safeFetchWordPress<Array<{ acf?: ServiceListMainSection }>>(
      "service-main-sections",
      [],
      { slug: "main-section" },
    ),
    safeFetchWordPress<ServiceListingItem[]>("services", [], { per_page: 15 }),
    safeFetchWordPress<CaseStudyItem[]>("case-studies", [], { per_page: 10 }),
    safeFetchWordPress<Array<{ acf?: CaseStudyMainSection }>>(
      "case-studies-main-sections",
      [],
      { slug: "main-section" },
    ),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);

  const serviceMainSection = serviceMainResponse?.[0]?.acf ?? {};
  const services = servicesResponse ?? [];
  const caseStudies = caseStudiesResponse ?? [];
  const caseStudyMainSection = caseStudyMainResponse?.[0]?.acf ?? {};
  const homePage = homePageResponse?.[0]?.acf ?? {};

  return (
    <div className="wrappper">
      <ServicesListClient
        serviceMainSection={serviceMainSection}
        services={services}
        caseStudies={caseStudies}
        caseStudyMainSection={caseStudyMainSection}
        homePage={homePage}
      />
    </div>
  );
}

