import { safeFetchWordPress } from "@/lib/api";
import IndustriesListClient from "./IndustriesListClient";

import type {
  CaseStudyItem,
  CaseStudyMainSection,
  HomePageStartSection,
  IndustryItem,
  IndustryMainSection,
} from "./industryTypes";

export default async function IndustriesListPage() {
  const [
    industryMainResponse,
    industryListResponse,
    caseStudiesResponse,
    caseStudyMainResponse,
    homePageResponse,
  ] = await Promise.all([
    safeFetchWordPress<Array<{ acf?: IndustryMainSection }>>(
      "industry-main-sections",
      [],
      { slug: "main-section" },
    ),
    safeFetchWordPress<IndustryItem[]>("industry", [], { per_page: 10 }),
    safeFetchWordPress<CaseStudyItem[]>("case-studies", [], { per_page: 6 }),
    safeFetchWordPress<Array<{ acf?: CaseStudyMainSection }>>(
      "case-studies-main-sections",
      [],
      { slug: "main-section" },
    ),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);

  const industryMainSection = industryMainResponse?.[0]?.acf ?? {};
  const industry = industryListResponse ?? [];
  const caseStudies = caseStudiesResponse ?? [];
  const caseStudyMainSection = caseStudyMainResponse?.[0]?.acf ?? {};
  const homePage = homePageResponse?.[0]?.acf ?? {};

  return (
    <div className="wrappper">
      <IndustriesListClient
        industryMainSection={industryMainSection}
        industry={industry}
        caseStudies={caseStudies}
        caseStudyMainSection={caseStudyMainSection}
        homePage={homePage}
      />
    </div>
  );
}

