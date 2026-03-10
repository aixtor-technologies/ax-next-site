"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import type {
  CaseStudyCustomField,
  CaseStudyItem,
  CaseStudyMainSection,
  ContactForm,
  HomePageStartSection,
} from "../caseStudyTypes";

type CaseStudyDetailClientProps = {
  slug: string;
  caseStudiesCustomField: CaseStudyCustomField;
  mainCaseStudySection: CaseStudyMainSection;
  recentCaseStudies: CaseStudyItem[];
  contactForms: ContactForm[];
  homePage: HomePageStartSection;
};

function HorizontalSlider({
  children,
}: {
  children: ReactNode;
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
    <div className="home_card_slider service">
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

export default function CaseStudyDetailClient({
  caseStudiesCustomField,
  mainCaseStudySection,
  recentCaseStudies,
  contactForms,
  homePage,
}: CaseStudyDetailClientProps) {
  const [activeSection, setActiveSection] = useState<"businessneeds" | "thesolution" | "technologys">("businessneeds");
  const [fixedClass, setFixedClass] = useState<string | null>(null);
  const caseStudyOffset = useRef<HTMLDivElement | null>(null);

  const details = caseStudiesCustomField?.case_studies_details_page ?? {};
  const banner = details.banner_section ?? {};
  const results = details.results_section ?? {};
  const about = details.about_project_section ?? {};
  const business = details.business_needs_section ?? {};
  const solution = details.solution_section ?? {};
  const technology = details.technology_section ?? {};
  const start = homePage?.start_project_section ?? {};

  const handleScroll = useCallback(() => {
    const headerHeight = 120;
    const scrollPosition = window.scrollY + headerHeight;

    const offsetEl = caseStudyOffset.current;
    if (offsetEl) {
      const rect = offsetEl.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      const visible = top <= scrollPosition && bottom >= scrollPosition;
      setFixedClass(visible ? "fixed" : null);
    }

    const sections: Array<"businessneeds" | "thesolution" | "technologys"> = [
      "businessneeds",
      "thesolution",
      "technologys",
    ];
    let current: typeof activeSection | null = null;
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const isVisible =
        rect.top <= headerHeight && rect.bottom >= headerHeight;
      if (isVisible) current = id;
    });
    if (current) setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const clickNavbar = useCallback((section: "businessneeds" | "thesolution" | "technologys") => {
    const el = document.getElementById(section);
    if (el) {
      const yOffset = -110;
      const y =
        el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => setActiveSection(section), 300);
    }
  }, []);

  const handleScrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById("caseStudyForm");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Banner */}
      <section className="servie_banner">
        <div className="container">
          <div className="row main_pitch_banner">
            <div className="col-lg-7 col-md-12 col-sm-12">
              <div className="banner_content_details">
                {banner?.title ? <h1>{banner.title}</h1> : null}
                {banner?.description ? <p>{banner.description}</p> : null}
                {banner?.cta_title ? (
                  <button
                    type="button"
                    className="outline-btn trans"
                    title={banner.cta_title}
                    onClick={handleScrollToForm}
                  >
                    <span className="button-content">{banner.cta_title}</span>
                  </button>
                ) : null}
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

      {/* Results */}
      <section className="case_study_results">
        <div className="container">
          <div className="section_title text-center">
            <div className="main_title_block">
              {results?.title ? (
                <h2 className="title">{results.title}</h2>
              ) : null}
              {results?.description ? (
                <p className="details">{results.description}</p>
              ) : null}
            </div>
          </div>
          <div className="row">
            {Array.isArray(results?.stats) &&
              results.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="col-lg-4 col-md-4 col-sm-12 mb-cst"
                >
                  <div className="result_box">
                    {stat?.title ? <h3>{stat.title}</h3> : null}
                    {stat?.description ? <p>{stat.description}</p> : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* About Project */}
      <section className="about_project">
        <div className="container">
          <div className="section_title">
            <div className="main_title_block">
              {about?.title ? <h2 className="title">{about.title}</h2> : null}
            </div>
          </div>
          {about?.description ? (
            <div className="section_content">
              <p>{about.description}</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Business / Solution / Technology with sticky nav */}
      <section className="case_study_details" ref={caseStudyOffset}>
        <div className="container">
          <div className={`case_study_nav ${fixedClass ?? ""}`}>
            <ul>
              <li className={activeSection === "businessneeds" ? "active" : ""}>
                <button type="button" onClick={() => clickNavbar("businessneeds")}>
                  Business Needs
                </button>
              </li>
              <li className={activeSection === "thesolution" ? "active" : ""}>
                <button type="button" onClick={() => clickNavbar("thesolution")}>
                  The Solution
                </button>
              </li>
              <li className={activeSection === "technologys" ? "active" : ""}>
                <button type="button" onClick={() => clickNavbar("technologys")}>
                  Technology
                </button>
              </li>
            </ul>
          </div>

          <div id="businessneeds" className="case_study_section">
            {business?.title ? <h3>{business.title}</h3> : null}
            {business?.description ? <p>{business.description}</p> : null}
          </div>

          <div id="thesolution" className="case_study_section">
            {solution?.title ? <h3>{solution.title}</h3> : null}
            {solution?.description ? <p>{solution.description}</p> : null}
          </div>

          <div id="technologys" className="case_study_section">
            {technology?.title ? <h3>{technology.title}</h3> : null}
            {Array.isArray(technology?.items) && (
              <ul>
                {technology.items.map((item, idx) => (
                  <li key={idx}>
                    {item?.title ? <strong>{item.title}: </strong> : null}
                    {item?.description ?? ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Case-study form (simple placeholder using contact forms) */}
      <section id="caseStudyForm" className="case_study_form">
        <div className="container">
          <div className="section_title text-center">
            <div className="main_title_block">
              <h2 className="title">Discuss your case study</h2>
              <p className="details">
                Select a form to get in touch with us.
              </p>
            </div>
          </div>
          <div className="section_content">
            {contactForms.length > 0 ? (
              <ul className="contact_form_list">
                {contactForms.map((form) => (
                  <li key={form.id}>
                    {form.title?.rendered ?? `Form #${form.id}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No forms configured yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Recent case studies */}
      <section className="home_case_studies service">
        <div className="container">
          {recentCaseStudies.length > 0 && (
            <div
              className="section_title"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              <div className="main_title_block">
                <div className="leftbar">
                  {mainCaseStudySection?.home_page?.title ? (
                    <h2 className="title">
                      {mainCaseStudySection.home_page.title}
                    </h2>
                  ) : null}
                  {mainCaseStudySection?.home_page?.description ? (
                    <p className="details">
                      {mainCaseStudySection.home_page.description}
                    </p>
                  ) : null}
                </div>
                {mainCaseStudySection?.home_page?.cta_title ? (
                  <div className="rightbar">
                    <Link
                      href="/case-study/"
                      className="trans outline-btn"
                      title={mainCaseStudySection.home_page.cta_title}
                    >
                      <span className="text_wrap button-content">
                        {mainCaseStudySection.home_page.cta_title}
                      </span>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {recentCaseStudies.length > 0 && (
            <div className="section_content">
              <HorizontalSlider>
                {recentCaseStudies.map((cs) => (
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
          )}
        </div>
      </section>

      {/* Start project */}
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

