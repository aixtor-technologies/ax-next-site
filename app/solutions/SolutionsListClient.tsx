"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";

type ApiImage = {
  url?: string;
  alt?: string;
};

type SolutionItem = {
  id: number;
  slug: string;
  acf?: {
    solution_list_page?: {
      title?: string;
      description?: string;
      image?: ApiImage;
    };
  };
};

type SolutionMainSection = {
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

type CaseStudyItem = {
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

type CaseStudyMainSection = {
  home_page?: {
    title?: string;
    description?: string;
    cta_title?: string;
  };
};

type HomePageStartSection = {
  start_project_section?: {
    heading?: string;
    description?: string;
    cta_title?: string;
  };
};

type SolutionsListClientProps = {
  solutionMainSection: SolutionMainSection;
  solutions: SolutionItem[];
  caseStudies: CaseStudyItem[];
  caseStudyMainSection: CaseStudyMainSection;
  homePage: HomePageStartSection;
};

function HorizontalSlider({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const container = containerRef.current;
    if (!container) return;

    const firstCard =
      container.querySelector<HTMLElement>("[data-slider-card]");
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

export default function SolutionsListClient({
  solutionMainSection,
  solutions,
  caseStudies,
  caseStudyMainSection,
  homePage,
}: SolutionsListClientProps) {
  const bannerSection = solutionMainSection?.list_page?.banner_section ?? {};
  const modernSection = solutionMainSection?.list_page?.modern_section ?? {};

  return (
    <>
      <section className="servie_banner">
        <div className="inner_banner">
          <div className="container">
            <div className="row main_pitch_banner">
              <div
                className="col-lg-7 col-md-12 col-sm-12"
                data-aos="fade-right"
                data-aos-duration="15"
              >
                <div className="banner_content_details">
                  {bannerSection?.title ? <h1>{bannerSection.title}</h1> : null}
                  {bannerSection?.description ? (
                    <p>{bannerSection.description}</p>
                  ) : null}
                </div>
              </div>
              <div
                className="col-lg-5 col-md-12 col-sm-12"
                data-aos="fade-left"
                data-aos-duration="15"
              >
                <div className="imgbox">
                  {bannerSection?.side_image?.url ? (
                    <img
                      loading="eager"
                      src={bannerSection.side_image.url}
                      alt={bannerSection.side_image.alt ?? ""}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="digital_experience">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {modernSection?.title ? (
                <h2 className="title">{modernSection.title}</h2>
              ) : null}
              {modernSection?.description ? (
                <p className="details">{modernSection.description}</p>
              ) : null}
            </div>
          </div>
          <div className="digital_experience_listing">
            <div className="row">
              {solutions.map((solution) => (
                <div
                  key={solution.id}
                  className="col-lg-4 col-md-4 mb-4"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <Link
                    href={`/solutions/${solution.slug}/`}
                    className="service_list_card trans"
                    title={solution.acf?.solution_list_page?.title}
                  >
                    <div className="service_card_body">
                      <div className="detailsBox">
                        {solution.acf?.solution_list_page?.title ? (
                          <h4 className="service_card_title">
                            {solution.acf.solution_list_page.title}
                          </h4>
                        ) : null}
                        {solution.acf?.solution_list_page?.description ? (
                          <p className="service_card_text">
                            {solution.acf.solution_list_page.description}
                          </p>
                        ) : null}
                      </div>
                      {solution.acf?.solution_list_page?.image?.url ? (
                        <div className="imgbox">
                          <img
                            loading="eager"
                            className="service_card_icon"
                            src={solution.acf.solution_list_page.image.url}
                            alt={solution.acf.solution_list_page.image.alt ?? ""}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
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
                {caseStudyMainSection.home_page?.title ? (
                  <h2 className="title">
                    {caseStudyMainSection.home_page.title}
                  </h2>
                ) : null}
                {caseStudyMainSection.home_page?.description ? (
                  <p className="details">
                    {caseStudyMainSection.home_page.description}
                  </p>
                ) : null}
              </div>
              {caseStudyMainSection.home_page?.cta_title ? (
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
            <HorizontalSlider className="case_studies_slider">
              {caseStudies.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="slider_item"
                  data-slider-card
                >
                  <Link
                    href={`/case-study/${caseStudy.slug}/`}
                    className="casestudies_card trans"
                    title={caseStudy.acf?.home_page?.title}
                  >
                    {caseStudy.acf?.home_page?.image?.url ? (
                      <div className="imgbox">
                        <img
                          loading="eager"
                          src={caseStudy.acf.home_page.image.url}
                          alt={caseStudy.acf.home_page.image.alt ?? ""}
                        />
                      </div>
                    ) : null}
                    <div className="casestudies_card_body">
                      {caseStudy.acf?.home_page?.title ? (
                        <h4 className="casestudies_card_title">
                          {caseStudy.acf.home_page.title}
                        </h4>
                      ) : null}
                      {caseStudy.acf?.home_page?.description ? (
                        <p className="casestudies_card_text">
                          {caseStudy.acf.home_page.description}
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

      <section className="home_start_project">
        <div className="bg">
          <img
            className="mark1"
            src="/assets/images/map_marker.svg"
            alt=""
          />
          <img
            className="mark2"
            src="/assets/images/destination_flag.svg"
            alt=""
          />
          <img
            className="bgImg"
            src="/assets/images/startNewProjectBg.svg"
            alt=""
          />
        </div>
        <div className="inner_home_start_project">
          <div className="container">
            <div
              className="section_title"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              <div className="aixtor_animated_logo">
                <img
                  className="rotated_pattern"
                  src="/assets/images/pattern.svg"
                  alt=""
                />
                <div className="centeral_logo">
                  <img
                    src="/assets/images/AX-logo.svg"
                    alt=""
                    width={55}
                    height={55}
                  />
                </div>
              </div>
              <div className="main_title_block">
                <div className="leftbar">
                  {homePage.start_project_section?.heading ? (
                    <h2 className="title">
                      {homePage.start_project_section.heading}
                    </h2>
                  ) : null}
                  {homePage.start_project_section?.description ? (
                    <p className="details">
                      {homePage.start_project_section.description}
                    </p>
                  ) : null}
                </div>
                <div className="rightbar">
                  <Link href="/contact/" className="outline-btn trans">
                    <span className="text_wrap button-content">
                      {homePage.start_project_section?.cta_title ??
                        "Contact Us"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

