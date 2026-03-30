"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSharedPageData } from "@/lib/useSharedPageData";

import type {
  ApiImage,
  ChallengeItem,
  FaqItem,
  SolutionCustomField,
} from "../solutionTypes";

type SolutionDetailClientProps = {
  slug: string;
  solutionCustomField: SolutionCustomField;
};

export default function SolutionDetailClient({
  slug,
  solutionCustomField,
}: SolutionDetailClientProps) {
  const [showModal, setShowModal] = useState(false);

  // Lazily load shared data (case studies, start project) on the client
  const { caseStudies, caseStudyMainSection, homePage } = useSharedPageData();

  const handleInquiry = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const details = solutionCustomField.solution_details_page ?? {};
  const banner = details.banner_section ?? {};
  const ultimate = details.ultimate_section ?? {};
  const challenges = details.challenges_section;
  const reasons = details.reasons_section;
  const benefits = details.benefits_section;

  const challengesArray: ChallengeItem[] = Array.isArray(
    challenges?.challenges,
  )
    ? (challenges?.challenges as ChallengeItem[])
    : Object.values(challenges?.challenges ?? {});

  const reasonsArray: Array<{ text: string }> = Array.isArray(
    reasons?.reasons_list,
  )
    ? (reasons?.reasons_list ?? []).map((item) =>
        typeof item === "string"
          ? { text: item }
          : { text: (item as { reson?: string }).reson ?? "" },
      )
    : Object.values(reasons?.reasons_list ?? {}).map((item) =>
        typeof item === "string"
          ? { text: item }
          : { text: (item as { reson?: string }).reson ?? "" },
      );

  const faqList: FaqItem[] =
    benefits?.faq ??
    (Array.isArray(details.faq_section?.faq)
      ? details.faq_section?.faq ?? []
      : []);

  const secTitle =
    details.case_studies_section?.section_title ??
    caseStudyMainSection.home_page?.title ??
    "";
  const secDesc =
    details.case_studies_section?.section_description ??
    caseStudyMainSection.home_page?.description ??
    "";


  return (
    <>
      {/* Banner */}
      <section className="servie_banner detail_banner">
        <div className="container">
          <div className="row main_pitch_banner">
            <div
              className="col-lg-7 col-md-12 col-sm-12"
              data-aos="fade-right"
              data-aos-duration="15"
            >
              <div className="banner_content_details">
                <div className="bedge_text">Solution</div>
                {banner.title ? <h1>{banner.title}</h1> : null}
                {Array.isArray(banner.description_list) && (
                  <ul>
                    {banner.description_list.map((item, index) => (
                      <li key={index}>{item.description}</li>
                    ))}
                  </ul>
                )}
                {banner.cta_title ? (
                  <button
                    type="button"
                    onClick={handleInquiry}
                    className="outline-btn trans"
                    title={banner.cta_title}
                  >
                    <span className="button-content">{banner.cta_title}</span>
                  </button>
                ) : null}
              </div>
            </div>
            {banner.side_image?.url ? (
              <div
                className="col-lg-5 col-md-12 col-sm-12"
                data-aos="fade-left"
                data-aos-duration="15"
              >
                <div className="imgbox">
                  <div className="innerImgbox">
                    <img
                      loading="eager"
                      src={banner.side_image.url}
                      alt={banner.side_image.alt ?? ""}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Ultimate solution */}
      {(ultimate.title || ultimate.description) && (
        <section className="ultimate_solution">
          <div className="container">
            <div className="inner_ultimate_solution">
              <div className="row align-items-center">
                <div
                  className="col-md-5"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="section_title">
                    {ultimate.title && (
                      <div className="main_title_block">
                        <h2 className="title">{ultimate.title}</h2>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="col-md-7"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  {ultimate.description && <p>{ultimate.description}</p>}
                  {ultimate.cta_title && (
                    <button
                      type="button"
                      onClick={handleInquiry}
                      className="outline-btn trans"
                      title={ultimate.cta_title}
                    >
                      <span className="button-content">
                        {ultimate.cta_title}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Challenges */}
      {challenges && challengesArray.length > 0 && (
        <section className="multiple_enterprise_portal">
          <div className="container">
            <div
              className="section_title text-center"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              {challenges.challenges_heading && (
                <div className="main_title_block">
                  <h2 className="title">{challenges.challenges_heading}</h2>
                </div>
              )}
            </div>
            <div className="row">
              {challengesArray.map((challenge, index) => (
                <div
                  key={index}
                  className="col-lg-6 col-md-6 mb-72"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="challenges_card trans">
                    {challenge.image?.url && (
                      <div className="imgbox">
                        <img
                          loading="eager"
                          src={challenge.image.url}
                          alt={challenge.image.alt ?? ""}
                        />
                      </div>
                    )}
                    <div className="challenges_card_body">
                      {challenge.title && <h4>{challenge.title}</h4>}
                      {challenge.description && <p>{challenge.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
              {challenges.cta_title && (
                <div
                  className="col-lg-12 text-center"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <button
                    type="button"
                    onClick={handleInquiry}
                    className="outline-btn trans"
                    title={challenges.cta_title}
                  >
                    <span className="button-content">
                      {challenges.cta_title}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Reasons */}
      {reasons && reasonsArray.length > 0 && (
        <section className="reasons_portal">
          <div className="container">
            <div
              className="section_title text-center"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              {reasons.title && (
                <div className="main_title_block">
                  <h2 className="title">{reasons.title}</h2>
                </div>
              )}
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <ul className="reasons_portal_list">
                  {reasonsArray.map((item, index) => (
                    <li
                      key={index}
                      data-aos="fade-up"
                      data-aos-duration="15"
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits + FAQ */}
      {benefits && (
        <section className="benifits_portal_solution">
          <div className="container">
            <div
              className="section_title text-center"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              <div className="main_title_block">
                {benefits.benefits_heading && (
                  <h2 className="title">{benefits.benefits_heading}</h2>
                )}
              </div>
            </div>
            {benefits.benefits && (
              <div className="row">
                {benefits.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-50"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    <div className="benifits_block">
                      <div className="header_benifits_block">
                        {benefit.icon?.url && (
                          <div className="benifits_icon">
                            <img
                              loading="eager"
                              src={benefit.icon.url}
                              alt={benefit.icon.alt ?? ""}
                            />
                          </div>
                        )}
                        {benefit.title && <h3>{benefit.title}</h3>}
                      </div>
                      {benefit.description && (
                        <div className="benefits_dtls">
                          <p>{benefit.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {faqList && faqList.length > 0 && (
              <div className="innerAccordion">
                <div
                  className="section_title text-center"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="main_title_block">
                    <h2 className="title">Frequently Asked Questions</h2>
                  </div>
                </div>
                <div
                  className="accordion whiteBg"
                  data-aos="fade-up"
                  data-aos-duration="15"
                  id="accordionSolution"
                >
                  {faqList.map((item, index) => (
                    <div key={index} className="accordion-item">
                      <h3 className="accordion-header">
                        <button
                          type="button"
                          className={`accordion-button ${
                            index !== 0 ? "collapsed" : ""
                          }`}
                          aria-expanded={index === 0}
                        >
                          {item.title}
                        </button>
                      </h3>
                      <div
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Case studies */}
      <section className="home_case_studies service">
        <div className="container">
          <div
            className="section_title"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              <div className="leftbar">
                {secTitle && <h2 className="title">{secTitle}</h2>}
                {secDesc && <p className="details">{secDesc}</p>}
              </div>
              {caseStudyMainSection.home_page?.cta_title && (
                <div className="rightbar">
                  <Link prefetch={false} href="/case-study/"
                    className="trans outline-btn"
                    title={caseStudyMainSection.home_page.cta_title}
                  >
                    <span className="text_wrap button-content">
                      {caseStudyMainSection.home_page.cta_title}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="section_content">
            <div className="home_card_slider case_studies_slider">
              <div className="slider_track">
                {caseStudies.map((caseStudy) => (
                  <div
                    key={caseStudy.id}
                    className="slider_item"
                    data-slider-card
                  >
                    <Link prefetch={false} href={`/case-study/${caseStudy.slug}/`}
                      className="casestudies_card trans"
                      title={caseStudy.acf?.home_page?.title}
                    >
                      {caseStudy.acf?.home_page?.image?.url && (
                        <div className="imgbox">
                          <img
                            loading="eager"
                            src={caseStudy.acf.home_page.image.url}
                            alt={caseStudy.acf.home_page.image.alt ?? ""}
                          />
                        </div>
                      )}
                      <div className="casestudies_card_body">
                        {caseStudy.acf?.home_page?.title && (
                          <h4 className="casestudies_card_title">
                            {caseStudy.acf.home_page.title}
                          </h4>
                        )}
                        {caseStudy.acf?.home_page?.description && (
                          <p className="casestudies_card_text">
                            {caseStudy.acf.home_page.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start project */}
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
                  {homePage.start_project_section?.heading && (
                    <h2 className="title">
                      {homePage.start_project_section.heading}
                    </h2>
                  )}
                  {homePage.start_project_section?.description && (
                    <p className="details">
                      {homePage.start_project_section.description}
                    </p>
                  )}
                </div>
                <div className="rightbar">
                  <Link prefetch={false} href="/contact/" className="outline-btn trans">
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

