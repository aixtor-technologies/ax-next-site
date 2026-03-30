import { notFound } from "next/navigation";
import {
  fetchIndustryBySlug,
  safeFetchWordPress,
} from "@/lib/api";
import IndustryDetailClient from "./IndustryDetailClient";

import type {
  IndustryCustomField,
} from "../industryTypes";

type IndustryPost = {
  id: number;
  slug: string;
  acf?: IndustryCustomField;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Only fetch the primary industry data on the server.
  // Case studies, blogs, and shared sections are loaded lazily on the client.
  const industry = await fetchIndustryBySlug<IndustryPost>(slug);

  if (!industry) notFound();

  const industryCustomField = industry.acf ?? {};

  return (
    <div className="wrappper">
      <IndustryDetailClient
        slug={slug}
        industryCustomField={industryCustomField}
      />
    </div>
  );
}
