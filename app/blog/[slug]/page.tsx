import { notFound } from "next/navigation";
import {
  fetchBlogDetail,
  fetchBlogMainSection,
  fetchBlogList,
  safeFetchWordPress,
} from "@/lib/api";
import BlogDetailClient from "./BlogDetailClient";

import type {
  BlogDetail,
  BlogMainSection,
  BlogListItem,
  BlogListResponse,
} from "../blogTypes";
import type { HomePageStartSection } from "../../case-study/caseStudyTypes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [blogCustomField, blogMainSection, recentListResponse, homePageResponse] =
    await Promise.all([
      fetchBlogDetail<BlogDetail>(slug),
      fetchBlogMainSection<BlogMainSection>(),
      fetchBlogList<BlogListResponse>(1, 10),
      safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
    ]);

  if (!blogCustomField) {
    notFound();
  }

  const homePage = homePageResponse?.[0]?.acf ?? {};
  const recentBlogList: BlogListItem[] = recentListResponse?.posts ?? [];

  return (
    <div className="wrappper">
      <BlogDetailClient
        blogCustomField={blogCustomField}
        blogMainSection={blogMainSection}
        recentBlogList={recentBlogList}
        homePage={homePage}
      />
    </div>
  );
}

