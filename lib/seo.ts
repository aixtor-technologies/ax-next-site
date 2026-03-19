import type { Metadata } from "next";

/** Base URL for canonical and Open Graph URLs. Set NEXT_PUBLIC_SITE_URL in .env */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

export type YoastMeta = {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_image?: Array<{ url?: string; width?: number; height?: number }>;
  twitter_title?: string;
  twitter_description?: string;
};

/**
 * Maps a pathname to the WordPress endpoint and slug used for SEO (yoast_head_json).
 * Mirrors Frontity getSEOEndpointAndSlug + Theme index.js route mapping.
 */
export function getSEOEndpointAndSlug(pathname: string): {
  endpoint: string;
  slug: string;
} {
  const path = pathname.replace(/\/$/, "") || "/";
  const pathParts = path === "/" ? [] : path.split("/").filter(Boolean);
  const segment0 = pathParts[0] ?? "";
  const slug = pathParts.slice(1).join("/") || segment0 || "home-page";

  if (path === "/") {
    return { endpoint: "home-page", slug: "home-page" };
  }

  if (segment0 === "contact-us" || segment0 === "contact") {
    return { endpoint: "career-and-about", slug: "career-and-about" };
  }

  if (segment0 === "services") {
    if (pathParts.length < 2) {
      return { endpoint: "service-main-sections", slug: "main-section" };
    }
    return { endpoint: "services", slug: pathParts[1]! };
  }

  if (segment0 === "solutions") {
    if (pathParts.length < 2) {
      return { endpoint: "solution-main-sections", slug: "main-section" };
    }
    return { endpoint: "solutions", slug: pathParts[1]! };
  }

  if (segment0 === "industries") {
    if (pathParts.length < 2) {
      return { endpoint: "industry-main-sections", slug: "main-section" };
    }
    return { endpoint: "industry", slug: pathParts[1]! };
  }

  if (segment0 === "case-study") {
    if (pathParts.length < 2) {
      return { endpoint: "case-studies-main-sections", slug: "main-section" };
    }
    return { endpoint: "case-studies", slug: pathParts[1]! };
  }

  if (segment0 === "blog") {
    if (pathParts.length < 2) {
      return { endpoint: "blog-main-sections", slug: "main-section" };
    }
    return { endpoint: "blogs-and-news", slug: pathParts[1]! };
  }

  if (segment0 === "company") {
    return { endpoint: "career-and-about", slug: "career-and-about" };
  }

  if (segment0 === "privacy-policy") {
    return { endpoint: "policy", slug: "privacy-policy" };
  }
  if (segment0 === "cookie-policy") {
    return { endpoint: "policy", slug: "cookie-policy" };
  }

  return { endpoint: segment0 || "home-page", slug };
}

/**
 * Fetches SEO meta (yoast_head_json) from WordPress for the given endpoint and slug.
 * Returns null on error or when no post is found.
 */
export async function fetchSEOMeta(
  endpoint: string,
  slug: string,
): Promise<YoastMeta | null> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!baseUrl) {
    return null;
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const url = new URL(`${normalizedBaseUrl}/wp/v2/${endpoint}`);
  url.searchParams.set("slug", slug);

  try {
    const response = await fetch(url.toString(), {
      // Keep SEO fast between route transitions while refreshing periodically.
      next: { revalidate: 300 },
      headers: {
        "X-Custom-Header": "METATAG",
      },
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as Array<{ yoast_head_json?: YoastMeta }>;
    const first = Array.isArray(data) ? data[0] : null;
    return first?.yoast_head_json ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetches SEO for a pathname and returns Next.js Metadata.
 * Use in generateMetadata({ params }) by building pathname from the route.
 */
export async function getMetadataForPath(pathname: string): Promise<Metadata> {
  const { endpoint, slug } = getSEOEndpointAndSlug(pathname);
  const yoast = await fetchSEOMeta(endpoint, slug);

  const title = yoast?.title ?? "Aixtor Website";
  const description =
    yoast?.description ?? "Next.js + WordPress CMS Website";
  const canonical = yoast?.canonical || (SITE_URL ? `${SITE_URL}${pathname === "/" ? "" : pathname}` : undefined);
  const ogImage = yoast?.og_image?.[0];
  const imageUrl = ogImage?.url;

  return {
    title,
    description,
    openGraph: {
      title: yoast?.og_title ?? title,
      description: yoast?.og_description ?? description,
      url: yoast?.og_url ?? canonical,
      siteName: yoast?.og_site_name ?? "Aixtor Technologies",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: ogImage?.width ?? 1200,
            height: ogImage?.height ?? 630,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: yoast?.twitter_title ?? yoast?.og_title ?? title,
      description:
        yoast?.twitter_description ?? yoast?.og_description ?? description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    ...(canonical && {
      alternates: { canonical },
    }),
  };
}
