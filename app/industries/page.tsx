import {
  fetchCaseStudies,
  fetchCaseStudyMainSection,
  fetchIndustryMainSection,
  fetchIndustries,
  safeFetchWordPress,
} from "@/lib/api";
import { getMetadataForPath } from "@/lib/seo";
import IndustriesListClient from "./IndustriesListClient";

export async function generateMetadata() {
  return getMetadataForPath("/industries");
}

import type {
  CaseStudyItem,
  CaseStudyMainSection,
  HomePageStartSection,
  IndustryItem,
  IndustryMainSection,
} from "./industryTypes";

export default async function IndustriesListPage() {
  const [industryMainSection, industry, caseStudies, caseStudyMainResponse, homePageResponse] =
    await Promise.all([
      fetchIndustryMainSection<IndustryMainSection>(),
      fetchIndustries<IndustryItem>(10),
      fetchCaseStudies<CaseStudyItem>(6),
      safeFetchWordPress<Array<{ acf?: CaseStudyMainSection }>>(
        "case-studies-main-sections",
        [],
        { slug: "main-section" },
      ),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);

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

