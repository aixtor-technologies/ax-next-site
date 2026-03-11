import { fetchBlogList, fetchBlogMainSection, safeFetchWordPress } from "@/lib/api";
import { getMetadataForPath } from "@/lib/seo";
import BlogListClient from "./BlogListClient";

export async function generateMetadata() {
  return getMetadataForPath("/blog");
}

import type { BlogListResponse, BlogMainSection } from "./blogTypes";
import type { HomePageStartSection } from "../case-study/caseStudyTypes";

export default async function BlogListPage() {
  const [blogMainSection, blogListResponse, homePageResponse] = await Promise.all([
    fetchBlogMainSection<BlogMainSection>(),
    fetchBlogList<BlogListResponse>(1, 12),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);

  const homePage = homePageResponse?.[0]?.acf ?? {};

  return (
    <div className="wrappper">
      <BlogListClient
        blogMainSection={blogMainSection}
        blogListResponse={blogListResponse}
        homePage={homePage}
      />
    </div>
  );
}

