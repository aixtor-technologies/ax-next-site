import { notFound } from "next/navigation";
import { safeFetchWordPress } from "@/lib/api";
import SolutionDetailClient from "./SolutionDetailClient";

type PageProps = { params: Promise<{ slug: string }> };

import type { SolutionCustomField } from "../solutionTypes";

type SolutionPost = {
  id: number;
  slug: string;
  acf?: SolutionCustomField;
};

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Only fetch the primary solution data on the server.
  // Case studies and shared sections are loaded lazily on the client.
  const solutionsResponse = await safeFetchWordPress<SolutionPost[]>("solutions", [], { slug });

  const solution = solutionsResponse?.[0];

  if (!solution) {
    notFound();
  }

  const solutionCustomField = solution.acf ?? {};

  return (
    <div className="wrappper">
      <SolutionDetailClient
        slug={slug}
        solutionCustomField={solutionCustomField}
      />
    </div>
  );
}
