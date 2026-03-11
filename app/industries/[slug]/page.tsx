import { notFound } from "next/navigation";
import {
  fetchCaseStudyMainSection,
  fetchIndustryBySlug,
  safeFetchWordPress,
} from "@/lib/api";
import { getMetadataForPath } from "@/lib/seo";
import IndustryDetailClient from "./IndustryDetailClient";

type PagePropsMeta = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PagePropsMeta) {
  const { slug } = await params;
  return getMetadataForPath(`/industries/${slug}`);
}

import type {
  BlogMainSection,
  CaseStudyItem,
  CaseStudyMainSection,
  HomePageStartSection,
  IndustryCustomField,
  RecentBlogItem,
} from "../industryTypes";

type IndustryPost = {
  id: number;
  slug: string;
  acf?: IndustryCustomField;
};

type RecentBlogsResponse = {
  posts?: RecentBlogItem[];
  count?: number;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((it) => {
    if (!it?.slug) return false;
    if (seen.has(it.slug)) return false;
    seen.add(it.slug);
    return true;
  });
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [industry, caseStudyMainSection, homePageResponse] = await Promise.all([
    fetchIndustryBySlug<IndustryPost>(slug),
    fetchCaseStudyMainSection<CaseStudyMainSection>(),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);
  if (!industry) notFound();

  const industryCustomField = industry.acf ?? {};
  const caseStudyCategoryId =
    industryCustomField?.industries_details_page?.case_studies_section?.category
      ?.term_id;

  const [
    categoryCaseStudiesResponse,
    fallbackCaseStudiesResponse,
    blogMainResponse,
    recentBlogsResponse,
  ] = await Promise.all([
    caseStudyCategoryId
      ? safeFetchWordPress<CaseStudyItem[]>("case-studies", [], {
          categories: caseStudyCategoryId,
          per_page: 5,
        })
      : Promise.resolve([] as CaseStudyItem[]),
    safeFetchWordPress<CaseStudyItem[]>("case-studies", [], { per_page: 10 }),
    safeFetchWordPress<Array<{ acf?: BlogMainSection }>>(
      "blog-main-sections",
      [],
      { slug: "main-section" },
    ),
    safeFetchWordPress<RecentBlogsResponse>("recent-blogs", { posts: [] }, {
      category: "",
    }),
  ]);

  const mergedCaseStudies = uniqueBySlug([
    ...(categoryCaseStudiesResponse ?? []),
    ...(fallbackCaseStudiesResponse ?? []),
  ]).slice(0, 5);

  const homePage = homePageResponse?.[0]?.acf ?? {};
  const blogMainSection = blogMainResponse?.[0]?.acf ?? {};
  const recentBlogList = recentBlogsResponse?.posts ?? [];

  return (
    <div className="wrappper">
      <IndustryDetailClient
        slug={slug}
        industryCustomField={industryCustomField}
        caseStudies={mergedCaseStudies}
        caseStudyMainSection={caseStudyMainSection}
        blogMainSection={blogMainSection}
        recentBlogList={recentBlogList}
        homePage={homePage}
      />
    </div>
  );
}

