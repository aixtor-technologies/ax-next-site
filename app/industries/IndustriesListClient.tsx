"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";

import type {
  CaseStudyItem,
  CaseStudyMainSection,
  HomePageStartSection,
  IndustryItem,
  IndustryMainSection,
} from "./industryTypes";

type IndustriesListClientProps = {
  industryMainSection: IndustryMainSection;
  industry: IndustryItem[];
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

export default function IndustriesListClient({
  industryMainSection,
  industry,
  caseStudies,
  caseStudyMainSection,
  homePage,
}: IndustriesListClientProps) {
  const bannerSection = industryMainSection?.list_page?.banner_section ?? {};
  const modernSection = industryMainSection?.list_page?.modern_section ?? {};
  const start = homePage?.start_project_section ?? {};

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
              {industry.map((industryItem) => (
                <div
                  key={industryItem.id}
                  className="col-lg-4 col-md-4 mb-4"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <Link
                    href={`/industries/${industryItem.slug}/`}
                    className="service_list_card trans"
                    title={industryItem?.acf?.industry_list_page?.title}
                  >
                    <div className="service_card_body">
                      <div className="detailsBox">
                        {industryItem?.acf?.industry_list_page?.title ? (
                          <h4 className="service_card_title">
                            {industryItem.acf.industry_list_page.title}
                          </h4>
                        ) : null}
                        {industryItem?.acf?.industry_list_page?.description ? (
                          <p className="service_card_text">
                            {industryItem.acf.industry_list_page.description}
                          </p>
                        ) : null}
                      </div>
                      {industryItem?.acf?.industry_list_page?.image?.url ? (
                        <div className="imgbox">
                          <img
                            loading="eager"
                            className="service_card_icon"
                            src={industryItem.acf.industry_list_page.image.url}
                            alt={
                              industryItem.acf.industry_list_page.image.alt ??
                              ""
                            }
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
                {caseStudyMainSection?.home_page?.title ? (
                  <h2 className="title">{caseStudyMainSection.home_page.title}</h2>
                ) : null}
                {caseStudyMainSection?.home_page?.description ? (
                  <p className="details">
                    {caseStudyMainSection.home_page.description}
                  </p>
                ) : null}
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

