import { fetchCareerAndAbout, safeFetchWordPress } from "@/lib/api";
import CareerPageClient from "./CareerPageClient";

import type { HomePageStartSection } from "../../case-study/caseStudyTypes";

type ApiImage = {
  url?: string;
  alt?: string;
};

type CareerAndAbout = {
  career_page?: {
    banner_section?: {
      title?: string;
      description?: string;
      side_image?: ApiImage;
      cta_title?: string;
    };
    what_aixtor_has?: {
      heading?: string;
      aixtor_list?: Array<{
        aixtor_has?: string;
      }>;
    };
    truly_believe_section?: {
      heading?: string;
      believe_list?: Array<{
        image?: ApiImage;
        name?: string;
      }>;
    };
    life_aixtor?: {
      heading?: string;
      description?: string;
      cta_title?: string;
      cta_link?: { url?: string };
      top_slider_images?: {
        slider_images?: Array<{
          image_1?: ApiImage;
          image_2?: ApiImage;
          image_3?: ApiImage;
        }>;
      };
    };
    grow_section?: {
      heading?: string;
      description?: string;
      job_openings?: Array<{
        job_title?: string;
        skills?: string;
        experience?: string;
        location?: string;
        positions?: string;
        qualifications?: string;
        job_descriptions?: Array<{ description?: string }>;
      }>;
    };
    team_comments?: {
      heading?: string;
      team_comment?: Array<{
        comment?: string;
        employee_name?: string;
        employee_designation?: string;
      }>;
    };
  };
};

export default async function CareerPage() {
  const [career, homePageResponse] = await Promise.all([
    fetchCareerAndAbout<CareerAndAbout>(),
    safeFetchWordPress<Array<{ acf?: HomePageStartSection }>>("home-page", []),
  ]);

  if (!career) {
    return null;
  }

  const homePage = homePageResponse?.[0]?.acf ?? {};

  return (
    <div className="wrappper">
      <CareerPageClient career={career} homePage={homePage} />
    </div>
  );
}

