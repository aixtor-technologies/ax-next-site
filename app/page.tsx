import { safeFetchWordPress } from "@/lib/api";
import HomePageClient from "@/app/home/HomePageClient";

type ApiImage = {
  url?: string;
  alt?: string;
};

type HomePageData = {
  banner_section?: {
    description?: string;
    cta_title?: string;
  };
  industries_section?: {
    heading?: string;
    description?: string;
    industries?: Array<{
      industry_name?: string;
      industry_slug?: string;
      icon?: ApiImage;
      image?: ApiImage;
    }>;
  };
  success_stories_section?: {
    heading?: string;
    description?: string;
    success_list?: Array<{
      number?: string;
      success_name?: string;
    }>;
  };
  start_project_section?: {
    heading?: string;
    description?: string;
    cta_title?: string;
  };
};

type ServiceItem = {
  id: number;
  slug: string;
  acf?: {
    home_page_fields?: {
      is_display_home_page?: boolean;
      icon?: ApiImage;
      title?: string;
      description?: string;
    };
  };
};

type SolutionItem = {
  id: number;
  slug: string;
  acf?: {
    home_page?: {
      title?: string;
      description?: string;
      icon?: ApiImage;
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

type MainSection = {
  home_page?: {
    title?: string;
    description?: string;
    cta_title?: string;
  };
};

export default async function Home() {
  const [
    homePageResponse,
    servicesResponse,
    serviceMainResponse,
    solutionsResponse,
    solutionMainResponse,
    caseStudiesResponse,
    caseStudyMainResponse,
  ] = await Promise.all([
    safeFetchWordPress<Array<{ acf?: HomePageData }>>("home-page", []),
    safeFetchWordPress<ServiceItem[]>("services", [], { per_page: 10 }),
    safeFetchWordPress<Array<{ acf?: MainSection }>>("service-main-sections", [], {
      slug: "main-section",
    }),
    safeFetchWordPress<SolutionItem[]>("solutions", [], { per_page: 10 }),
    safeFetchWordPress<Array<{ acf?: MainSection }>>("solution-main-sections", [], {
      slug: "main-section",
    }),
    safeFetchWordPress<CaseStudyItem[]>("case-studies", [], { per_page: 5 }),
    safeFetchWordPress<Array<{ acf?: MainSection }>>("case-studies-main-sections", [], {
      slug: "main-section",
    }),
  ]);

  return (
    <HomePageClient
      homePage={homePageResponse?.[0]?.acf ?? {}}
      services={servicesResponse ?? []}
      serviceMainSection={serviceMainResponse?.[0]?.acf ?? {}}
      solutions={solutionsResponse ?? []}
      solutionMainSection={solutionMainResponse?.[0]?.acf ?? {}}
      caseStudies={caseStudiesResponse ?? []}
      caseStudyMainSection={caseStudyMainResponse?.[0]?.acf ?? {}}
    />
  );
}
