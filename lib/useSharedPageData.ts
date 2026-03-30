"use client";

import { useEffect, useState } from "react";

type ApiImage = {
  url?: string;
  alt?: string;
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

type BlogMainSection = {
  details_page?: {
    recent_section?: {
      title?: string;
      description?: string;
    };
  };
};

type RecentBlogItem = {
  id: number;
  slug: string;
  title?: string;
  content?: string;
  categories?: string;
  blog_image_url?: string;
  blog_image_alt?: string;
  blog_post_date?: string;
  author_name?: string;
};

type SharedData = {
  caseStudies: CaseStudyItem[];
  caseStudyMainSection: CaseStudyMainSection;
  homePage: HomePageStartSection;
  blogMainSection: BlogMainSection;
  recentBlogList: RecentBlogItem[];
};

const cache: { data: SharedData | null; promise: Promise<SharedData> | null } = {
  data: null,
  promise: null,
};

async function fetchSharedData(): Promise<SharedData> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!baseUrl) {
    return { caseStudies: [], caseStudyMainSection: {}, homePage: {}, blogMainSection: {}, recentBlogList: [] };
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  async function safeFetch<T>(endpoint: string, fallback: T, params: Record<string, string | number> = {}): Promise<T> {
    try {
      const url = new URL(`${normalizedBaseUrl}/wp/v2/${endpoint}`);
      Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url.toString(), { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) return fallback;
      return res.json();
    } catch {
      return fallback;
    }
  }

  const [caseStudies, caseStudyMainResponse, homePageResponse, blogMainResponse, recentBlogsResponse] = await Promise.all([
    safeFetch<CaseStudyItem[]>("case-studies", [], { per_page: 10 }),
    safeFetch<Array<{ acf?: CaseStudyMainSection }>>("case-studies-main-sections", [], { slug: "main-section" }),
    safeFetch<Array<{ acf?: HomePageStartSection }>>("home-page", []),
    safeFetch<Array<{ acf?: BlogMainSection }>>("blog-main-sections", [], { slug: "main-section" }),
    safeFetch<{ posts?: RecentBlogItem[] }>("recent-blogs", { posts: [] }, { category: "" }),
  ]);

  return {
    caseStudies,
    caseStudyMainSection: caseStudyMainResponse?.[0]?.acf ?? {},
    homePage: homePageResponse?.[0]?.acf ?? {},
    blogMainSection: blogMainResponse?.[0]?.acf ?? {},
    recentBlogList: recentBlogsResponse?.posts ?? [],
  };
}

/**
 * Hook to lazily fetch shared page data (case studies, start project section, blogs)
 * on the client side, so it doesn't block the initial server render.
 * The data is cached in memory so subsequent navigations are instant.
 */
export function useSharedPageData() {
  const [data, setData] = useState<SharedData>(
    cache.data ?? { caseStudies: [], caseStudyMainSection: {}, homePage: {}, blogMainSection: {}, recentBlogList: [] }
  );
  const [loading, setLoading] = useState(!cache.data);

  useEffect(() => {
    if (cache.data) {
      setData(cache.data);
      setLoading(false);
      return;
    }

    if (!cache.promise) {
      cache.promise = fetchSharedData();
    }

    cache.promise.then((result) => {
      cache.data = result;
      setData(result);
      setLoading(false);
    });
  }, []);

  return { ...data, loading };
}
