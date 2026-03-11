import { safeFetchWordPress } from "@/lib/api";
import { getMetadataForPath } from "@/lib/seo";
import SolutionsListClient from "./SolutionsListClient";

export async function generateMetadata() {
  return getMetadataForPath("/solutions");
}

type ApiImage = {
  url?: string;
  alt?: string;
};

type SolutionItem = {
  id: number;
  slug: string;
  acf?: {
    solution_list_page?: {
      title?: string;
      description?: string;
      image?: ApiImage;
    };
  };
};

type SolutionMainSection = {
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

export default async function SolutionsPage() {
  const [
    solutionMainResponse,
    solutionsResponse,
    caseStudiesResponse,
    caseStudyMainResponse,
    homePageResponse,
  ] = await Promise.all([
    safeFetchWordPress<Array<{ acf?: SolutionMainSection }>>(
      "solution-main-sections",
      [],
      { slug: "main-section" },
    ),
    safeFetchWordPress<SolutionItem[]>("solutions", [], { per_page: 15 }),
    safeFetchWordPress<CaseStudyItem[]>("case-studies", [], { per_page: 10 }),
    safeFetchWordPress<Array<{ acf?: CaseStudyMainSection }>>(
      "case-studies-main-sections",
      [],
      { slug: "main-section" },
    ),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);

  const solutionMainSection = solutionMainResponse?.[0]?.acf ?? {};
  const solutions = solutionsResponse ?? [];
  const caseStudies = caseStudiesResponse ?? [];
  const caseStudyMainSection = caseStudyMainResponse?.[0]?.acf ?? {};
  const homePage = homePageResponse?.[0]?.acf ?? {};

  return (
    <div className="wrappper">
      <SolutionsListClient
        solutionMainSection={solutionMainSection}
        solutions={solutions}
        caseStudies={caseStudies}
        caseStudyMainSection={caseStudyMainSection}
        homePage={homePage}
      />
    </div>
  );
}

