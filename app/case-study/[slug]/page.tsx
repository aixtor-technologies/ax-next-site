import { notFound } from "next/navigation";
import {
  fetchCaseStudies,
  fetchCaseStudyBySlug,
  fetchCaseStudyMainSection,
  safeFetchWordPress,
} from "@/lib/api";
import CaseStudyDetailClient from "./CaseStudyDetailClient";

import type {
  CaseStudyCustomField,
  CaseStudyItem,
  CaseStudyMainSection,
  ContactForm,
  HomePageStartSection,
} from "../caseStudyTypes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [
    caseStudy,
    mainCaseStudySection,
    allCaseStudies,
    contactFormsResponse,
    homePageResponse,
  ] = await Promise.all([
    fetchCaseStudyBySlug<{ id: number; slug: string; acf?: CaseStudyCustomField }>(slug),
    fetchCaseStudyMainSection<CaseStudyMainSection>(),
    fetchCaseStudies<CaseStudyItem>(20),
    safeFetchWordPress<ContactForm[]>("contact-forms", []),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);

  if (!caseStudy) {
    notFound();
  }

  const caseStudiesCustomField = caseStudy.acf ?? {};

  // Filter recent case studies in the same category as this one, like Frontity does.
  const termId =
    (caseStudy as unknown as { acf?: { category_name?: { term_id?: number } } })
      ?.acf?.category_name?.term_id;
  const recentCaseStudies =
    termId != null
      ? allCaseStudies.filter(
          (cs) => Array.isArray(cs.acf?.categories) && cs.acf!.categories!.includes(termId),
        )
      : [];

  const contactForms = contactFormsResponse ?? [];
  const homePage = homePageResponse?.[0]?.acf ?? {};

  return (
    <div className="wrappper">
      <CaseStudyDetailClient
        slug={slug}
        caseStudiesCustomField={caseStudiesCustomField}
        mainCaseStudySection={mainCaseStudySection}
        recentCaseStudies={recentCaseStudies}
        contactForms={contactForms}
        homePage={homePage}
      />
    </div>
  );
}

