import { notFound } from "next/navigation";
import { fetchBlogDetail } from "@/lib/api";
import BlogDetailClient from "./BlogDetailClient";

import type { BlogDetail } from "../blogTypes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Only fetch the primary blog data on the server.
  // Recent blogs, blog main section, and home page data are loaded lazily on the client.
  const blogCustomField = await fetchBlogDetail<BlogDetail>(slug);

  if (!blogCustomField) {
    notFound();
  }

  return (
    <div className="wrappper">
      <BlogDetailClient blogCustomField={blogCustomField} />
    </div>
  );
}
