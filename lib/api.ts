export async function fetchWordPress<T>(
  endpoint: string,
  searchParams?: Record<string, string | number>,
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_WP_API_URL is not configured.");
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  let url: URL;
  try {
    url = new URL(`${normalizedBaseUrl}/wp/v2/${endpoint}`);
  } catch (urlError) {
    throw new Error(
      `Invalid WordPress API URL: ${normalizedBaseUrl}/wp/v2/${endpoint}. Check NEXT_PUBLIC_WP_API_URL.`,
    );
  }

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const requestUrl = url.toString();

  let response: Response;
  try {
    response = await fetch(requestUrl, { cache: "no-store" });
  } catch (networkError) {
    const message =
      networkError instanceof Error ? networkError.message : String(networkError);
    const cause =
      networkError instanceof Error && "cause" in networkError
        ? String((networkError as Error & { cause?: unknown }).cause)
        : "";
    throw new Error(
      `WordPress API request failed (${endpoint}). URL: ${requestUrl}. ${message}${cause ? ` Cause: ${cause}` : ""}. Check that the API is reachable (e.g. not localhost from server), CORS, and NEXT_PUBLIC_WP_API_URL.`,
      { cause: networkError },
    );
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}. URL: ${requestUrl}`);
  }

  return response.json();
}

export async function safeFetchWordPress<T>(
  endpoint: string,
  fallback: T,
  searchParams?: Record<string, string | number>,
): Promise<T> {
  try {
    return await fetchWordPress<T>(endpoint, searchParams);
  } catch (error) {
    console.error(`WordPress fetch failed for "${endpoint}"`, error);
    return fallback;
  }
}

/* ================= DOMAIN HELPERS (Industries, Case Studies, etc.) ================= */

// Industries
export async function fetchIndustryMainSection<T = unknown>(): Promise<T> {
  const response = await safeFetchWordPress<Array<{ acf?: T }>>(
    "industry-main-sections",
    [],
    { slug: "main-section" },
  );
  return (response?.[0]?.acf ?? {}) as T;
}

export async function fetchIndustries<T = unknown>(
  perPage = 10,
): Promise<T[]> {
  return safeFetchWordPress<T[]>("industry", [], { per_page: perPage });
}

export async function fetchIndustryBySlug<T = unknown>(
  slug: string,
): Promise<T | null> {
  const response = await safeFetchWordPress<T[]>("industry", [], { slug });
  return response?.[0] ?? null;
}

// Case studies
export async function fetchCaseStudyMainSection<T = unknown>(): Promise<T> {
  const response = await safeFetchWordPress<Array<{ acf?: T }>>(
    "case-studies-main-sections",
    [],
    { slug: "main-section" },
  );
  return (response?.[0]?.acf ?? {}) as T;
}

export async function fetchCaseStudies<T = unknown>(
  perPage = 10,
  extraParams: Record<string, string | number> = {},
): Promise<T[]> {
  return safeFetchWordPress<T[]>("case-studies", [], {
    per_page: perPage,
    ...extraParams,
  });
}

export async function fetchCaseStudyBySlug<T = unknown>(
  slug: string,
): Promise<T | null> {
  const response = await safeFetchWordPress<T[]>("case-studies", [], { slug });
  return response?.[0] ?? null;
}

// Blogs (custom endpoints)
export async function fetchBlogMainSection<T = unknown>(): Promise<T> {
  const response = await safeFetchWordPress<Array<{ acf?: T }>>(
    "blog-main-sections",
    [],
    { slug: "main-section" },
  );
  return (response?.[0]?.acf ?? {}) as T;
}

export async function fetchBlogList<T = unknown>(
  page = 1,
  perPage = 12,
  extraParams: Record<string, string | number> = {},
): Promise<T> {
  return safeFetchWordPress<T>("blogs", {} as T, {
    page,
    per_page: perPage,
    ...extraParams,
  });
}

export async function fetchBlogDetail<T = unknown>(
  slug: string,
): Promise<T | null> {
  const response = await safeFetchWordPress<T[]>("blogs-and-news", [], {
    slug,
  });
  return response?.[0] ?? null;
}

// Company / career-and-about
export async function fetchCareerAndAbout<T = unknown>(): Promise<T | null> {
  const response = await safeFetchWordPress<Array<{ acf?: T }>>(
    "career-and-about",
    [],
  );
  return (response?.[0]?.acf ?? null) as T | null;
}



/* ================= MENU (WP-REST-API Menus plugin) ================= */

export interface MenuChildItem {
  ID: number;
  title: string;
  slug: string;
  thumbnail_src?: string;
}

export interface MenuItem {
  ID: number;
  title: string;
  url: string;
  slug: string;
  child_items?: MenuChildItem[];
}

async function fetchMenuFromApi(menuSlug: string): Promise<MenuItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_WP_API_URL is not configured.");
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const requestUrl = `${normalizedBaseUrl}/menus/v1/menus/${menuSlug}`;

  let response: Response;
  try {
    response = await fetch(requestUrl, { cache: "no-store" });
  } catch (networkError) {
    const message =
      networkError instanceof Error ? networkError.message : String(networkError);
    const cause =
      networkError instanceof Error && "cause" in networkError
        ? String((networkError as Error & { cause?: unknown }).cause)
        : "";
    throw new Error(
      `Menu API request failed (${menuSlug}). URL: ${requestUrl}. ${message}${cause ? ` Cause: ${cause}` : ""}. Check that the API is reachable and NEXT_PUBLIC_WP_API_URL.`,
      { cause: networkError },
    );
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch menu "${menuSlug}": ${response.status} ${response.statusText}. URL: ${requestUrl}`,
    );
  }

  const data = await response.json();
  return Array.isArray(data) ? data : (data?.items ?? []);
}

export async function fetchMenu(menuSlug = "main_menu"): Promise<MenuItem[]> {
  return fetchMenuFromApi(menuSlug);
}

export async function safeFetchMenu(
  fallback: MenuItem[] = [],
  menuSlug = "main_menu",
): Promise<MenuItem[]> {
  try {
    return await fetchMenuFromApi(menuSlug);
  } catch (error) {
    console.error(`Menu fetch failed for "${menuSlug}"`, error);
    return fallback;
  }
}
