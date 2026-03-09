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

/* ================= MENU (WP-REST-API Menus plugin) ================= */

export interface MenuChildItem {
  ID: number;
  title: string;
  slug: string;
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
