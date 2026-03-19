import { notFound } from "next/navigation";
import { safeFetchWordPress } from "@/lib/api";
import SolutionDetailClient from "./SolutionDetailClient";

type PageProps = { params: Promise<{ slug: string }> };

import type { ApiImage, SolutionCustomField } from "../solutionTypes";

type SolutionPost = {
  id: number;
  slug: string;
  acf?: SolutionCustomField;
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

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [
    solutionsResponse,
    caseStudiesResponse,
    caseStudyMainResponse,
    homePageResponse,
  ] = await Promise.all([
    safeFetchWordPress<SolutionPost[]>("solutions", [], { slug }),
    safeFetchWordPress<CaseStudyItem[]>("case-studies", [], { per_page: 10 }),
    safeFetchWordPress<Array<{ acf?: CaseStudyMainSection }>>(
      "case-studies-main-sections",
      [],
      { slug: "main-section" },
    ),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);

  const solution = solutionsResponse?.[0];

  if (!solution) {
    notFound();
  }

  const solutionCustomField = solution.acf ?? {};
  const caseStudies = caseStudiesResponse ?? [];
  const caseStudyMainSection = caseStudyMainResponse?.[0]?.acf ?? {};
  const homePage = homePageResponse?.[0]?.acf ?? {};

  return (
    <div className="wrappper">
      <SolutionDetailClient
        slug={slug}
        solutionCustomField={solutionCustomField}
        caseStudies={caseStudies}
        caseStudyMainSection={caseStudyMainSection}
        homePage={homePage}
      />
    </div>
  );
}

