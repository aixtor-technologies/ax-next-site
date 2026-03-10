export type ApiImage = {
  url?: string;
  alt?: string;
};

export type BannerData = {
  title?: string;
  description_list?: Array<{ description?: string }>;
  cta_title?: string;
  side_image?: ApiImage;
};

export type UltimateSection = {
  title?: string;
  description?: string;
  cta_title?: string;
};

export type ChallengeItem = {
  image?: ApiImage;
  title?: string;
  description?: string;
};

export type ChallengesSection = {
  challenges_heading?: string;
  challenges?: ChallengeItem[] | Record<string, ChallengeItem>;
  cta_title?: string;
};

export type ReasonsSection = {
  title?: string;
  reasons_list?: Array<{ reson?: string } | string> | Record<string, unknown>;
};

export type BenefitItem = {
  icon?: ApiImage;
  title?: string;
  description?: string;
};

export type FaqItem = {
  title?: string;
  description?: string;
};

export type BenefitsSection = {
  benefits_heading?: string;
  benefits?: BenefitItem[];
  faq?: FaqItem[];
};

export type CaseStudiesSection = {
  section_title?: string;
  section_description?: string;
};

export type SolutionDetailsPage = {
  banner_section?: BannerData;
  ultimate_section?: UltimateSection;
  challenges_section?: ChallengesSection;
  reasons_section?: ReasonsSection;
  benefits_section?: BenefitsSection;
  case_studies_section?: CaseStudiesSection;
  faq_section?: {
    faq?: FaqItem[];
  };
};

export type SolutionCustomField = {
  solution_details_page?: SolutionDetailsPage;
};

