export type ApiImage = {
  url?: string;
  alt?: string;
};

export type IndustryListPageField = {
  title?: string;
  description?: string;
  image?: ApiImage;
};

export type IndustryItem = {
  id: number;
  slug: string;
  acf?: {
    industry_list_page?: IndustryListPageField;
  };
};

export type IndustryMainSection = {
  list_page?: {
    banner_section?: {
      title?: string;
      description?: string;
      side_image?: ApiImage;
    };
    modern_section?: {
      title?: string;
      description?: string;
    };
  };
};

export type IndustryCaseStudiesCategory = {
  term_id?: number;
  slug?: string;
  name?: string;
};

export type IndustryDetailsPage = {
  banner_section?: {
    title?: string;
    description?: string;
    side_image?: ApiImage;
  };
  challenges_section?: {
    title?: string;
    challenges?: Array<{ challenge?: string }>;
  };
  aixtor_help?: {
    heading?: string;
    help?: Array<{
      title?: string;
      description?: string;
      side_image?: ApiImage;
      read_more?: { url?: string };
    }>;
  };
  maximizing_manufacturing?: {
    heading?: string;
    maximize_list?: Array<{
      icon?: ApiImage;
      title?: string;
      description?: string;
    }>;
  };
  case_studies_section?: {
    heading?: string;
    description?: string;
    category?: IndustryCaseStudiesCategory;
  };
};

export type IndustryCustomField = {
  industries_details_page?: IndustryDetailsPage;
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
  };
};

export type CaseStudyMainSection = {
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

export type BlogMainSection = {
  details_page?: {
    recent_section?: {
      title?: string;
      description?: string;
    };
  };
};

export type RecentBlogItem = {
  id: number;
  slug: string;
  title?: string;
  content?: string;
  categories?: string;
  blog_image_url?: string;
  blog_image_alt?: string;
  blog_post_date?: string;
  author_name?: string;
};

