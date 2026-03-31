"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

/**
 * PageLoader — a full-screen loader overlay (matching loading.tsx)
 * that shows immediately when a route change starts.
 *
 * It intercepts <a> clicks inside the app so the loader appears
 * *before* Next.js even begins the navigation fetch.
 */
export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- helpers ---------- */

  const clearTimers = useCallback(() => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const startLoading = useCallback(() => {
    clearTimers();
    setIsLoading(true);
  }, [clearTimers]);

  const finishLoading = useCallback(() => {
    clearTimers();
    // Small delay so the loader doesn't flash off too abruptly
    fadeTimerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [clearTimers]);

  /* ---------- finish when pathname/params change ---------- */

  useEffect(() => {
    if (isLoading) {
      finishLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  /* ---------- intercept link clicks ---------- */

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, anchors, mailto, tel, javascript, etc.
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      // Don't trigger if it's the same page
      const url = new URL(href, window.location.origin);
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      startLoading();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [startLoading]);

  /* ---------- cleanup on unmount ---------- */

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  /* ---------- render ---------- */

  if (!isLoading) return null;

  return (
    <div className="loader">
      <Image
        src="/assets/images/Main-Loader.webp"
        alt="Loading"
        height={470}
        width={500}
      />
    </div>
  );
}
