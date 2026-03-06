"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import HomeBanner from "@/app/home/homeBanner";

type ApiImage = {
  url?: string;
  alt?: string;
};

type IndustryItem = {
  industry_name?: string;
  industry_slug?: string;
  icon?: ApiImage;
  image?: ApiImage;
};

type SuccessItem = {
  number?: string;
  success_name?: string;
};

type HomePageData = {
  banner_section?: {
    description?: string;
    cta_title?: string;
  };
  industries_section?: {
    heading?: string;
    description?: string;
    industries?: IndustryItem[];
  };
  success_stories_section?: {
    heading?: string;
    description?: string;
    success_list?: SuccessItem[];
  };
  start_project_section?: {
    heading?: string;
    description?: string;
    cta_title?: string;
  };
};

type ServiceItem = {
  id: number;
  slug: string;
  acf?: {
    home_page_fields?: {
      is_display_home_page?: boolean;
      icon?: ApiImage;
      title?: string;
      description?: string;
    };
  };
};

type SolutionItem = {
  id: number;
  slug: string;
  acf?: {
    home_page?: {
      title?: string;
      description?: string;
      icon?: ApiImage;
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

type MainSection = {
  home_page?: {
    title?: string;
    description?: string;
    cta_title?: string;
  };
};

type HomePageClientProps = {
  homePage: HomePageData;
  services: ServiceItem[];
  serviceMainSection: MainSection;
  solutions: SolutionItem[];
  solutionMainSection: MainSection;
  caseStudies: CaseStudyItem[];
  caseStudyMainSection: MainSection;
};

function SectionHeader({
  title,
  description,
  ctaTitle,
  ctaHref,
  centered = false,
}: {
  title?: string;
  description?: string;
  ctaTitle?: string;
  ctaHref?: string;
  centered?: boolean;
}) {
  if (!title && !description && !ctaTitle) {
    return null;
  }

  return (
    <div className={`section_title${centered ? " text-center" : ""}`}>
      <div className="main_title_block">
        <div className="leftbar">
          {title ? <h2 className="title">{title}</h2> : null}
          {description ? <p className="details">{description}</p> : null}
        </div>
        {ctaTitle && ctaHref ? (
          <div className="rightbar">
            <Link href={ctaHref} className="trans outline-btn">
              <span className="text_wrap button-content">{ctaTitle}</span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

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

    if (!container) {
      return;
    }

    const firstCard = container.querySelector<HTMLElement>("[data-slider-card]");
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

function AnimatedCount({
  value,
  shouldAnimate,
}: {
  value: string;
  shouldAnimate: boolean;
}) {
  const parsedValue = Number.parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
  const suffix = value.replace(/[\d,\s]/g, "") || "+";
  const [displayValue, setDisplayValue] = useState(shouldAnimate ? 0 : parsedValue);

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayValue(parsedValue);
      return;
    }

    let frameId = 0;
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayValue(Math.round(parsedValue * progress));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [parsedValue, shouldAnimate]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export default function HomePageClient({
  homePage,
  services,
  serviceMainSection,
  solutions,
  solutionMainSection,
  caseStudies,
  caseStudyMainSection,
}: HomePageClientProps) {
  const filteredServices = useMemo(
    () =>
      services.filter(
        (service) => service.acf?.home_page_fields?.is_display_home_page,
      ),
    [services],
  );

  const [activeSolutionId, setActiveSolutionId] = useState<number | null>(
    solutions[0]?.id ?? null,
  );
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const successSectionRef = useRef<HTMLDivElement | null>(null);

  const activeSolution =
    solutions.find((solution) => solution.id === activeSolutionId) ?? solutions[0];

  useEffect(() => {
    if (!solutions.length) {
      return;
    }

    setActiveSolutionId((current) => current ?? solutions[0].id);
  }, [solutions]);

  useEffect(() => {
    const element = successSectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const industries = homePage.industries_section?.industries?.slice(0, 8) ?? [];
  const successStories = homePage.success_stories_section?.success_list ?? [];
  const industryClassNames = [
    "industries_one",
    "industries_two",
    "industries_three",
    "industries_four",
    "industries_five",
    "industries_six",
    "industries_sevan",
    "industries_eight",
  ];

  return (
    <>
      <HomeBanner homePage={homePage} />

      <section className="home_services">
        <div className="container">
          <SectionHeader
            title={serviceMainSection.home_page?.title}
            description={serviceMainSection.home_page?.description}
            ctaTitle={serviceMainSection.home_page?.cta_title}
            ctaHref="/services/"
          />
          <div className="section_content">
            <HorizontalSlider className="services_slider">
              {filteredServices.map((service) => (
                <div key={service.id} className="slider_item" data-slider-card>
                  <Link href={`/services/${service.slug}/`} className="service_card">
                    <div className="service_card_body">
                      {service.acf?.home_page_fields?.icon?.url ? (
                        <img
                          className="service_card_icon"
                          src={service.acf.home_page_fields.icon.url}
                          alt={service.acf.home_page_fields.icon.alt || ""}
                        />
                      ) : null}
                      {service.acf?.home_page_fields?.title ? (
                        <h4 className="service_card_title">
                          {service.acf.home_page_fields.title}
                        </h4>
                      ) : null}
                      {service.acf?.home_page_fields?.description ? (
                        <p className="service_card_text">
                          {service.acf.home_page_fields.description}
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

      <section className="home_solution">
        <div className="container">
          <SectionHeader
            title={solutionMainSection.home_page?.title}
            description={solutionMainSection.home_page?.description}
            ctaTitle={solutionMainSection.home_page?.cta_title}
            ctaHref="/solutions/"
          />
          <div className="section_content">
            <div className="row">
              <div className="col-lg-5 col-md-5">
                <div className="ax_accordion">
                  {solutions.map((solution) => {
                    const isActive = solution.id === activeSolution?.id;

                    return (
                      <div
                        key={solution.id}
                        className={`ax_accordion_item${isActive ? " open" : ""}`}
                      >
                        <button
                          type="button"
                          className="ax_accordion_trigger"
                          onClick={() => setActiveSolutionId(solution.id)}
                        >
                          {solution.acf?.home_page?.title}
                        </button>
                        <div className="ax_accordion_panel" hidden={!isActive}>
                          {solution.acf?.home_page?.description ? (
                            <p>{solution.acf.home_page.description}</p>
                          ) : null}
                          <div className="moreInfo">
                            <Link
                              href={`/solutions/${solution.slug}/`}
                              className="trans link_more"
                            >
                              Know More
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-lg-7 col-md-7">
                {activeSolution?.acf?.home_page?.icon?.url ? (
                  <div className="accordion_images">
                    <div className="imgWrap">
                      <img
                        src={activeSolution.acf.home_page.icon.url}
                        alt={activeSolution.acf.home_page.icon.alt || ""}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home_success_story">
        <div className="container">
          <SectionHeader
            title={homePage.success_stories_section?.heading}
            description={homePage.success_stories_section?.description}
            centered
          />
          <div className="section_content">
            <div className="row">
              <div className="col-md-12">
                <div className="imgbox text-center">
                  <img src="/assets/images/map-2.webp" alt="" />
                </div>
              </div>
            </div>
            <div id="counterWrap" className="row" ref={successSectionRef}>
              {successStories.map((story, index) => (
                <div
                  key={`${story.success_name}-${index}`}
                  className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb32"
                >
                  <div className="story_card">
                    <div className="story_card_number">
                      <AnimatedCount
                        value={story.number || "0+"}
                        shouldAnimate={startCounting}
                      />
                    </div>
                    <div className="story_card_text">
                      {story.success_name || ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home_industries">
        <div className="container">
          <SectionHeader
            title={homePage.industries_section?.heading}
            description={homePage.industries_section?.description}
            centered
          />
          <div className="section_content">
            <div className="industries_board">
              <img src="/assets/images/trans_1080X667.png" alt="" />
              <ul>
                {industries.map((industry, index) => (
                  <li
                    key={`${industry.industry_slug}-${index}`}
                    className={`${industryClassNames[index]}${
                      activeIndustryIndex === index ? " active" : ""
                    }`}
                    onMouseEnter={() => setActiveIndustryIndex(index)}
                  >
                    <Link href={`/industries/${industry.industry_slug}/`}>
                      <figure className="industries_card">
                        <div className="imgbox">
                          {industry.icon?.url ? (
                            <img
                              src={industry.icon.url}
                              alt={industry.icon.alt || ""}
                              width={40}
                              height={40}
                            />
                          ) : null}
                        </div>
                        <div className="imgcontent">
                          {industry.industry_name || ""}
                        </div>
                      </figure>
                      {industry.image?.url ? (
                        <div className="industries_card_body">
                          <img
                            src={industry.image.url}
                            alt={industry.image.alt || ""}
                          />
                        </div>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="home_case_studies">
        <div className="container">
          <SectionHeader
            title={caseStudyMainSection.home_page?.title}
            description={caseStudyMainSection.home_page?.description}
            ctaTitle={caseStudyMainSection.home_page?.cta_title}
            ctaHref="/case-study/"
          />
          <div className="section_content">
            <HorizontalSlider className="case_studies_slider">
              {caseStudies.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="slider_item case_study_item"
                  data-slider-card
                >
                  <Link
                    href={`/case-study/${caseStudy.slug}/`}
                    className="casestudies_card trans"
                  >
                    {caseStudy.acf?.home_page?.image?.url ? (
                      <div className="imgbox">
                        <img
                          src={caseStudy.acf.home_page.image.url}
                          alt={caseStudy.acf.home_page.image.alt || ""}
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
          <img className="mark1" src="/assets/images/map_marker.svg" alt="" />
          <img
            className="mark2"
            src="/assets/images/destination_flag.svg"
            alt=""
          />
          <img className="bgImg" src="/assets/images/startNewProjectBg.svg" alt="" />
        </div>
        <div className="inner_home_start_project">
          <div className="container">
            <div className="section_title">
              <div className="aixtor_animated_logo">
                <img
                  className="rotated_pattern"
                  src="/assets/images/pattern.svg"
                  alt=""
                />
                <div className="centeral_logo">
                  <img src="/assets/images/AX-logo.svg" alt="" width={55} height={55} />
                </div>
              </div>
              <div className="main_title_block">
                <div className="leftbar">
                  <h2 className="title">
                    {homePage.start_project_section?.heading || ""}
                  </h2>
                  <p className="details">
                    {homePage.start_project_section?.description || ""}
                  </p>
                </div>
                <div className="rightbar">
                  <Link href="/contact/" className="outline-btn trans">
                    <span className="text_wrap button-content">
                      {homePage.start_project_section?.cta_title || "Contact Us"}
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
