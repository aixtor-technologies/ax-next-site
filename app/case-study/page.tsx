import {
  fetchCaseStudies,
  fetchCaseStudyMainSection,
  safeFetchWordPress,
} from "@/lib/api";
import CaseStudyListClient from "./CaseStudyListClient";

import type {
  CaseStudyItem,
  CaseStudyMainSection,
  HomePageStartSection,
} from "./caseStudyTypes";

export default async function CaseStudyListPage() {
  const [mainCaseStudySection, caseStudies, homePageResponse] = await Promise.all([
    fetchCaseStudyMainSection<CaseStudyMainSection>(),
    fetchCaseStudies<CaseStudyItem>(10),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);
  const homePage = homePageResponse?.[0]?.acf ?? {};

  return (
    <div className="wrappper">
      <CaseStudyListClient
        mainCaseStudySection={mainCaseStudySection}
        caseStudies={caseStudies}
        homePage={homePage}
      />
    </div>
  );
}

