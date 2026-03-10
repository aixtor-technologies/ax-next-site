"use client";

import Link from "next/link";

import type {
  CaseStudyItem,
  CaseStudyMainSection,
  HomePageStartSection,
} from "./caseStudyTypes";

type CaseStudyListClientProps = {
  mainCaseStudySection: CaseStudyMainSection;
  caseStudies: CaseStudyItem[];
  homePage: HomePageStartSection;
};

export default function CaseStudyListClient({
  mainCaseStudySection,
  caseStudies,
  homePage,
}: CaseStudyListClientProps) {
  const banner = mainCaseStudySection?.list_page?.banner_section ?? {};
  const sectionData = mainCaseStudySection?.list_page?.related_section ?? {};
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
                  {banner?.title ? <h1>{banner.title}</h1> : null}
                  {banner?.description ? <p>{banner.description}</p> : null}
                </div>
              </div>
              <div
                className="col-lg-5 col-md-12 col-sm-12"
                data-aos="fade-left"
                data-aos-duration="15"
              >
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
        </div>
      </section>

      <section className="casestudy_listing">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {sectionData?.title ? (
                <h2 className="title">{sectionData.title}</h2>
              ) : null}
              {sectionData?.description ? (
                <p className="details">{sectionData.description}</p>
              ) : null}
            </div>
          </div>
          <div className="casestudy_listing_wrapper">
            <div className="casestudy_listing_body">
              <div className="row">
                {caseStudies.map((cs) => (
                  <div
                    key={cs.id}
                    className="col-lg-6 col-md-6 mb-4"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    <Link
                      href={`/case-study/${cs.slug}/`}
                      title={cs.slug}
                    >
                      <div className="casestudies_card trans">
                        <div className="imgbox">
                          {cs?.acf?.case_studies_list_page?.image?.url ? (
                            <img
                              loading="eager"
                              src={cs.acf.case_studies_list_page.image.url}
                              alt={
                                cs.acf.case_studies_list_page.image.alt ?? ""
                              }
                            />
                          ) : null}
                        </div>
                        <div className="casestudies_card_body">
                          {cs?.acf?.case_studies_list_page?.title ? (
                            <h4 className="casestudies_card_title">
                              {cs.acf.case_studies_list_page.title}
                            </h4>
                          ) : null}
                          {cs?.acf?.case_studies_list_page?.description ? (
                            <p className="casestudies_card_text">
                              {cs.acf.case_studies_list_page.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
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

