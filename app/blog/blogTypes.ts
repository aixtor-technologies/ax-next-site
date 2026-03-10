export type ApiImage = {
  url?: string;
  alt?: string;
};

export type BlogMainSection = {
  list_page?: {
    banner_section?: {
      title?: string;
      description?: string;
      side_image?: ApiImage;
    };
    related?: {
      title?: string;
      description?: string;
    };
  };
  details_page?: {
    recent_section?: {
      title?: string;
      description?: string;
    };
  };
};

export type BlogListItem = {
  id: number;
  slug: string;
  title?: string;
  categories?: string;
  blog_image_url?: string;
  blog_image_alt?: string;
  blog_post_date?: string;
  author_name?: string;
  content?: string;
};

export type BlogListResponse = {
  posts: BlogListItem[];
  total: number;
  pages: number;
  current_page: number;
};

export type BlogDetailAcf = {
  title?: string;
  author_name?: string;
  blog_post_date?: string;
  blog_image?: ApiImage;
  content?: string;
  faq_section?: Array<{ title?: string; description?: string }>;
};

export type BlogDetail = {
  id: number;
  slug: string;
  acf?: BlogDetailAcf;
  categories?: number[];
};

