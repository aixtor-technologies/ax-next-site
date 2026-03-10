"use client";

import { useMemo } from "react";
import Link from "next/link";

import type {
  BlogDetail,
  BlogMainSection,
  BlogListItem,
} from "../blogTypes";
import type { HomePageStartSection } from "../../case-study/caseStudyTypes";

type BlogDetailClientProps = {
  blogCustomField: BlogDetail;
  blogMainSection: BlogMainSection;
  recentBlogList: BlogListItem[];
  homePage: HomePageStartSection;
};

export default function BlogDetailClient({
  blogCustomField,
  blogMainSection,
  recentBlogList,
  homePage,
}: BlogDetailClientProps) {
  const details = blogCustomField?.acf ?? {};
  const recentSection = blogMainSection?.details_page?.recent_section ?? {};
  const start = homePage?.start_project_section ?? {};

  const h2List = useMemo(() => {
    if (typeof window === "undefined") return [];
    const html = details.content ?? "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return Array.from(doc.querySelectorAll("h2")).map((h2) => ({
      id: h2.id,
      text: h2.textContent ?? "",
    }));
  }, [details.content]);

  return (
    <>
      <section className="servie_banner detail_banner">
        <div className="container">
          <div className="row main_pitch_banner">
            <div
              className="col-lg-7 col-md-12 col-sm-12"
              data-aos="fade-right"
              data-aos-duration="15"
            >
              <div className="banner_content_details">
                <div className="bedge_text">Blog</div>
                {details.title ? <h1>{details.title}</h1> : null}
                <div className="publisher_details">
                  {details.author_name ? <span>{details.author_name}</span> : null}
                  {details.blog_post_date ? (
                    <span>{details.blog_post_date}</span>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 col-md-12 col-sm-12"
              data-aos="fade-left"
              data-aos-duration="15"
            >
              <div className="imgbox">
                <div className="innerImgbox">
                  {details.blog_image?.url ? (
                    <img
                      loading="eager"
                      src={details.blog_image.url}
                      alt={details.blog_image.alt ?? ""}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog_details">
        <div className="container">
          <div className="blog_details_wrap">
            <div className="blog_sidebar">
              <div className="sticky-block">
                <div
                  data-aos="fade-up"
                  data-aos-duration="15"
                  className="contactus_block card_blogDetail"
                >
                  <h4 className="title">Table of contents</h4>
                  <div className="row blogContactForm">
                    <div>
                      <ul>
                        {h2List.map((item, index) => (
                          <li key={index}>
                            <a
                              href={`#${item.id}`}
                              title={item.text}
                              className="trans"
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="blog_content">
              {details.content ? (
                <div data-aos="fade-up" data-aos-duration="15">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: details.content,
                    }}
                  />
                </div>
              ) : null}

              {Array.isArray(details.faq_section) &&
                details.faq_section.length > 0 && (
                  <>
                    <h3> Frequently Asked Questions </h3>
                    <div
                      className="faq_list"
                      data-aos="fade-up"
                      data-aos-duration="15"
                    >
                      {details.faq_section.map((faq, index) => (
                        <details key={index}>
                          <summary>{faq.title}</summary>
                          <p>{faq.description}</p>
                        </details>
                      ))}
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </section>

      <section className="recent_blogs">
        <div className="container">
          {recentBlogList.length > 0 && (
            <div
              className="section_title"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              <div className="main_title_block">
                <div className="leftbar">
                  {recentSection?.title ? (
                    <h2 className="title">{recentSection.title}</h2>
                  ) : null}
                  {recentSection?.description ? (
                    <p className="details">{recentSection.description}</p>
                  ) : null}
                </div>
                <div className="rightbar">
                  <Link
                    href="/blog/"
                    className="trans outline-btn"
                    title="View all blogs"
                  >
                    <span className="text_wrap button-content">
                      View all blogs
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {recentBlogList.length > 0 && (
            <div className="section_content">
              <div className="row">
                {recentBlogList.map((blog) => (
                  <div
                    key={blog.id}
                    className="col-lg-4 col-md-4"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    <Link href={`/blog/${blog.slug}/`} title={blog.title}>
                      <div className="blog_card trans">
                        <div className="blog_badge">{blog.categories}</div>
                        <figure className="blog_img">
                          {blog.blog_image_url ? (
                            <img
                              loading="eager"
                              src={blog.blog_image_url}
                              alt={blog.blog_image_alt ?? ""}
                            />
                          ) : null}
                        </figure>
                        <div className="blog_body">
                          {blog.blog_post_date ? (
                            <div className="blog_published">
                              {blog.blog_post_date}
                            </div>
                          ) : null}
                          {blog.title ? <h4>{blog.title}</h4> : null}
                          {blog.content ? (
                            <div className="blog_list_page_card_content">
                              <p>{blog.content}</p>
                            </div>
                          ) : null}
                          {blog.author_name ? (
                            <div className="blog_publishedBy">
                              By <span> {blog.author_name}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="start_project">
        <div className="container">
          <div className="project_box">
            <div className="row">
              <div className="col-md-8" data-aos="fade-right" data-aos-duration="15">
                {start?.heading ? <h2>{start.heading}</h2> : null}
                {start?.description ? <p>{start.description}</p> : null}
              </div>
              <div className="col-md-4" data-aos="fade-left" data-aos-duration="15">
                {start?.cta_title ? (
                  <Link
                    href="/contact-us/"
                    className="outline-btn trans"
                    title={start.cta_title}
                  >
                    <span className="button-content">{start.cta_title}</span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

