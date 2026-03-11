import { getMetadataForPath } from "@/lib/seo";
import CompanyPage from "../page";

export async function generateMetadata() {
  return getMetadataForPath("/company/about-us");
}

export default CompanyPage;

