"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import type {
  BlogMainSection,
  CaseStudyItem,
  CaseStudyMainSection,
  HomePageStartSection,
  IndustryCustomField,
  RecentBlogItem,
} from "../industryTypes";

type IndustryDetailClientProps = {
  slug: string;
  industryCustomField: IndustryCustomField;
  caseStudies: CaseStudyItem[];
  caseStudyMainSection: CaseStudyMainSection;
  blogMainSection: BlogMainSection;
  recentBlogList: RecentBlogItem[];
  homePage: HomePageStartSection;
};

function HorizontalSlider({
  children,
  className,
  cardsSelector = "[data-slider-card]",
}: {
  children: ReactNode;
  className: string;
  cardsSelector?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const container = containerRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>(cardsSelector);
    const cardWidth = firstCard?.offsetWidth ?? 320;

    container.scrollBy({
      left: (cardWidth + 24) * direction,
      behavior: "smooth",
    });
  };

  return (
    <div className={`home_card_slider ${className}`}>
      <button
        type="button"
        className="slider_nav prev"
        aria-label="Previous items"
        onClick={() => scrollByCard(-1)}
      />
      <div ref={containerRef} className="slider_track">
        {children}
      </div>
      <button
        type="button"
        className="slider_nav next"
        aria-label="Next items"
        onClick={() => scrollByCard(1)}
      />
    </div>
  );
}

function VerticalHelpSlider({
  items,
}: {
  items: Array<{
    title?: string;
    description?: string;
    side_image?: { url?: string; alt?: string };
    read_more?: { url?: string };
  }>;
}) {
  const [index, setIndex] = useState(0);
  const parentRef = useRef<HTMLUListElement | null>(null);

  const safeItems = items ?? [];
  const clampedIndex =
    safeItems.length === 0 ? 0 : Math.min(Math.max(index, 0), safeItems.length - 1);

  useEffect(() => {
    setIndex(clampedIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeItems.length]);

  useEffect(() => {
    const el = parentRef.current;
    if (!el || safeItems.length <= 1) return;

    let isScrolling: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      if (safeItems.length <= 1) return;
      const isFirst = clampedIndex === 0;
      const isLast = clampedIndex === safeItems.length - 1;

      if ((isFirst && e.deltaY < 0) || (isLast && e.deltaY > 0)) return;

      clearTimeout(isScrolling);
      e.preventDefault();
      isScrolling = setTimeout(() => {
        setIndex((prev) => {
          if (e.deltaY > 0) return Math.min(prev + 1, safeItems.length - 1);
          return Math.max(prev - 1, 0);
        });
      }, 150);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel as EventListener);
      clearTimeout(isScrolling);
    };
  }, [clampedIndex, safeItems.length]);

  const active = safeItems[clampedIndex];
  if (!active) return null;

  const slide = (
    <div className="slider_item">
      <div className="sliderImg">
        <div className="imgbox">
          {active?.side_image?.url ? (
            <img
              loading="eager"
              src={active.side_image.url}
              alt={active.side_image.alt ?? ""}
            />
          ) : null}
        </div>
      </div>
      <div className="sliderDetails">
        {active?.title ? <h3>{active.title}</h3> : null}
        {active?.description ? <p>{active.description}</p> : null}
        {active?.read_more?.url ? (
          <span className="link_more mt-2">Read More</span>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="vertical_slider" data-aos="fade-up" data-aos-duration="15">
      <ul ref={parentRef}>
        <li>
          {active?.read_more?.url ? (
            <Link
              href={`${active.read_more.url}/`}
              className="link-container"
              title="Read More Services"
            >
              {slide}
            </Link>
          ) : (
            slide
          )}
        </li>
      </ul>

      {safeItems.length > 1 ? (
        <div className="vertical_dots" aria-label="Slider pagination">
          {safeItems.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === clampedIndex ? "active" : ""}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function IndustryDetailClient({
  industryCustomField,
  caseStudies,
  caseStudyMainSection,
  blogMainSection,
  recentBlogList,
  homePage,
}: IndustryDetailClientProps) {
  const details = industryCustomField?.industries_details_page ?? {};
  const banner = details.banner_section ?? {};
  const challenges = details.challenges_section ?? {};
  const help = details.aixtor_help ?? {};
  const maximizing = details.maximizing_manufacturing ?? {};
  const start = homePage?.start_project_section ?? {};

  const secTitle =
    details.case_studies_section?.heading ?? caseStudyMainSection.home_page?.title ?? "";
  const secDesc =
    details.case_studies_section?.description ??
    caseStudyMainSection.home_page?.description ??
    "";

  const recentTitle =
    blogMainSection?.details_page?.recent_section?.title ?? "Recent blogs";
  const recentDesc = blogMainSection?.details_page?.recent_section?.description ?? "";

  const safeChallenges = useMemo(
    () => (Array.isArray(challenges?.challenges) ? challenges.challenges : []),
    [challenges?.challenges],
  );

  const safeHelpItems = useMemo(
    () => (Array.isArray(help?.help) ? help.help : []),
    [help?.help],
  );

  const safeMaximize = useMemo(
    () => (Array.isArray(maximizing?.maximize_list) ? maximizing.maximize_list : []),
    [maximizing?.maximize_list],
  );

  return (
    <>
      <section className="servie_banner">
        <div className="container">
          <div className="row main_pitch_banner">
            <div className="col-lg-7 col-md-12 col-sm-12">
              <div className="banner_content_details">
                <div className="bedge_text">Industry</div>
                {banner?.title ? <h1>{banner.title}</h1> : null}
                {banner?.description ? <p>{banner.description}</p> : null}
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="imgbox">
                {banner?.side_image?.url ? (
                  <img
                    loading="eager"
                    src={banner.side_image.url}
                    alt={banner.side_image.alt ?? ""}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="manufacturing_industries">
        <div className="container">
          <div className="section_title text-center">
            <div className="main_title_block">
              {challenges?.title ? <h2 className="title">{challenges.title}</h2> : null}
            </div>
          </div>
          <div className="manufacturing_challenges">
            <ul>
              {safeChallenges.map((c, idx) => (
                <li key={idx}>
                  <div className="challengesBox">
                    <span className="counter">›</span>
                    {c?.challenge ?? ""}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="what_we_offer">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {help?.heading ? <h2 className="title">{help.heading}</h2> : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <VerticalHelpSlider items={safeHelpItems} />
            </div>
          </div>
        </div>
      </section>

      <section className="manufacturing_excellence">
        <div className="container">
          <div className="section_title text-center">
            <div className="main_title_block">
              {maximizing?.heading ? (
                <h2 className="title">{maximizing.heading}</h2>
              ) : null}
            </div>
          </div>
          <div className="row">
            {safeMaximize.map((m, idx) => (
              <div key={idx} className="col-lg-6 col-md-6 col-sm-12 mb-cst">
                <div className="manufacturing_excellence_box">
                  <div className="icon">
                    {m?.icon?.url ? (
                      <img
                        loading="eager"
                        src={m.icon.url}
                        alt={m.icon.alt ?? ""}
                      />
                    ) : null}
                  </div>
                  <div className="details">
                    {m?.title ? <h6>{m.title}</h6> : null}
                    {m?.description ? <p>{m.description}</p> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home_case_studies service">
        <div className="container">
          <div
            className="section_title"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              <div className="leftbar">
                {secTitle ? <h2 className="title">{secTitle}</h2> : null}
                {secDesc ? <p className="details">{secDesc}</p> : null}
              </div>
              {caseStudyMainSection?.home_page?.cta_title ? (
                <div className="rightbar">
                  <Link
                    href="/case-study/"
                    className="trans outline-btn"
                    title={caseStudyMainSection.home_page.cta_title}
                  >
                    <span className="text_wrap button-content">
                      {caseStudyMainSection.home_page.cta_title}
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          <div className="section_content">
            <HorizontalSlider className="service">
              {caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="slider_card"
                  data-slider-card
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <Link
                    className="casestudies_card trans"
                    href={`/case-study/${cs.slug}/`}
                    title={cs?.acf?.home_page?.title}
                  >
                    {cs?.acf?.home_page?.image?.url ? (
                      <div className="imgbox">
                        <img
                          loading="eager"
                          src={cs.acf.home_page.image.url}
                          alt={cs.acf.home_page.image.alt ?? ""}
                        />
                      </div>
                    ) : null}
                    <div className="casestudies_card_body">
                      {cs?.acf?.home_page?.title ? (
                        <h4 className="casestudies_card_title">
                          {cs.acf.home_page.title}
                        </h4>
                      ) : null}
                      {cs?.acf?.home_page?.description ? (
                        <p className="casestudies_card_text">
                          {cs.acf.home_page.description}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </div>
              ))}
            </HorizontalSlider>
          </div>
        </div>
      </section>

      <section className="recent_blogs">
        <div className="container">
          <div className="section_title" data-aos="fade-up" data-aos-duration="15">
            <div className="main_title_block">
              <div className="leftbar">
                {recentTitle ? <h2 className="title">{recentTitle}</h2> : null}
                {recentDesc ? <p className="details">{recentDesc}</p> : null}
              </div>
              <div className="rightbar">
                <Link href="/blog/" className="trans outline-btn" title="View all blogs">
                  <span className="text_wrap button-content">View all blogs</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="section_content">
            <HorizontalSlider className="blog" cardsSelector="[data-blog-card]">
              {recentBlogList.map((blog) => (
                <div
                  key={blog.id}
                  className="slider_card"
                  data-blog-card
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <Link href={`/blog/${blog.slug}/`} title={blog?.title}>
                    <div className="blog_card trans">
                      {blog.categories ? (
                        <div className="blog_badge">{blog.categories}</div>
                      ) : null}
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
                          <div className="blog_published">{blog.blog_post_date}</div>
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
            </HorizontalSlider>
          </div>
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

