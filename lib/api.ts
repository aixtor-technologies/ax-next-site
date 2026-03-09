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
