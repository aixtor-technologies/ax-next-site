export type ApiImage = {
  url?: string;
  alt?: string;
};

export type CaseStudyListPageField = {
  title?: string;
  description?: string;
  image?: ApiImage;
};

export type CaseStudyItem = {
  id: number;
  slug: string;
  acf?: {
    home_page?: {
      title?: string;
      description?: string;
      image?: ApiImage;
    };
    case_studies_list_page?: CaseStudyListPageField;
    category_name?: {
      term_id?: number;
      name?: string;
      slug?: string;
    };
    categories?: number[];
  };
};

export type CaseStudyMainSection = {
  list_page?: {
    banner_section?: {
      title?: string;
      description?: string;
      side_image?: ApiImage;
    };
    related_section?: {
      title?: string;
      description?: string;
    };
  };
  home_page?: {
    title?: string;
    description?: string;
    cta_title?: string;
  };
};

export type HomePageStartSection = {
  start_project_section?: {
    heading?: string;
    description?: string;
    cta_title?: string;
  };
};

export type ContactForm = {
  id: number;
  title?: { rendered?: string };
};

export type CaseStudiesDetailsPage = {
  banner_section?: {
    title?: string;
    description?: string;
    side_image?: ApiImage;
    cta_title?: string;
  };
  results_section?: {
    title?: string;
    description?: string;
    stats?: Array<{
      title?: string;
      description?: string;
    }>;
  };
  about_project_section?: {
    title?: string;
    description?: string;
  };
  business_needs_section?: {
    title?: string;
    description?: string;
  };
  solution_section?: {
    title?: string;
    description?: string;
  };
  technology_section?: {
    title?: string;
    items?: Array<{
      title?: string;
      description?: string;
    }>;
  };
};

export type CaseStudyCustomField = {
  case_studies_details_page?: CaseStudiesDetailsPage;
};

