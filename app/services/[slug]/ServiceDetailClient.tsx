"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type ApiImage = {
  url?: string;
  alt?: string;
};

type FaqItem = {
  title?: string;
  description?: string;
};

type ServiceDetailsPage = {
  service_type?: "Consulting" | "Migration" | string;
  banner_section?: {
    title?: string;
    description_list?: Array<{ description?: string }>;
    cta_title?: string;
    side_image?: ApiImage;
  };
  empower_section?: {
    title?: string;
    description?: string;
    cta_title?: string;
    move_up_image_list?: Array<{ move_up_image?: ApiImage }>;
    move_down_image_list?: Array<{ move_down_image?: ApiImage }>;
  };
  customizable_section?: {
    title?: string;
    description?: string;
    cta_title?: string;
    left_top_image?: ApiImage;
    right_top_image?: ApiImage;
    center_image?: ApiImage;
    left_bottom_image?: ApiImage;
    right_bottom_image?: ApiImage;
  };
  what_we_offer_section?: {
    heading?: string;
    cta_title?: string;
    what_we_offer?: Array<{
      title?: string;
      description?: string;
      image?: ApiImage;
      read_more_link?: { url?: string };
    }>;
  };
  migrate_to_liferay_section?: {
    heading?: string;
    cta_title?: string;
    migrate_to_liferay?: Array<{
      title?: string;
      description?: string;
      image?: ApiImage;
      read_more_link?: { url?: string };
    }>;
  };
  continue_section?: {
    title?: string;
    description?: string;
    cta_title?: string;
    continue_list?: Array<{
      title?: string;
      description?: string;
      icon?: ApiImage;
    }>;
  };
  liferay_products_section?: {
    heading?: string;
    liferay_products?: false | Array<{
      title?: string;
      description?: string;
      icon?: ApiImage;
    }>;
  };
  why_choose_aixtor_section?: {
    heading?: string;
    cta_title?: string;
    reason_1?: string;
    reason_2?: string;
    reason_3?: string;
    reason_4?: string;
    reason_5?: string;
    reason_6?: string;
    reason_7?: string;
    reason_8?: string;
  };
  faq_section?: {
    faq?: false | FaqItem[];
  };
  case_studies_section?: {
    section_title?: string;
    section_description?: string;
    primary_category?: unknown;
  };
};

type ServiceCustomField = {
  service_listing_page?: {
    title?: string;
  };
  service_details_page?: ServiceDetailsPage;
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

type ServiceDetailClientProps = {
  slug: string;
  serviceCustomField: ServiceCustomField;
  caseStudies: CaseStudyItem[];
  caseStudyMainSection: CaseStudyMainSection;
  homePage: HomePageStartSection;
};

function FaqAccordion({ faqData }: { faqData: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  if (!faqData.length) return null;

  return (
    <section className="innerAccordion whiteBg">
      <div className="container">
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
          {faqData.map((faq, index) => (
            <div key={index} className="accordion-item">
              <h3 className="accordion-header">
                <button
                  type="button"
                  className={`accordion-button ${
                    openIndex !== index ? "collapsed" : ""
                  }`}
                  aria-expanded={openIndex === index}
                  onClick={() =>
                    setOpenIndex((current) =>
                      current === index ? -1 : index,
                    )
                  }
                >
                  {faq.title}
                </button>
              </h3>
              <div
                className={`accordion-collapse collapse ${
                  openIndex === index ? "show" : ""
                }`}
              >
                <div className="accordion-body">
                  {faq.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: faq.description }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HorizontalSlider({
  children,
  className,
}: {
  children: React.ReactNode;
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

function InquiryModal({
  show,
  onHide,
  slug,
}: {
  show: boolean;
  onHide: () => void;
  slug: string;
}) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Inquiry</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onHide}
            />
          </div>
          <div className="modal-body">
            <p>Interested in this service? Get in touch with us.</p>
            <Link href="/contact/" className="outline-btn trans" onClick={onHide}>
              <span className="button-content">Go to Contact</span>
            </Link>
            <p className="mt-2 small text-muted">{slug}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailClient({
  slug,
  serviceCustomField,
  caseStudies,
  caseStudyMainSection,
  homePage,
}: ServiceDetailClientProps) {
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInquiry = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const details = serviceCustomField.service_details_page ?? {};
  const banner = details.banner_section ?? {};
  const empower = details.empower_section;
  const customizable = details.customizable_section ?? {};
  const serviceType = details.service_type;
  const faqData =
    (Array.isArray(details.faq_section?.faq)
      ? details.faq_section?.faq
      : []) ?? [];
  const caseStudySection = details.case_studies_section;

  const secTitle =
    caseStudySection?.section_title ??
    caseStudyMainSection.home_page?.title ??
    "";
  const secDesc =
    caseStudySection?.section_description ??
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
                <div className="bedge_text">Service</div>
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
            <div
              className="col-lg-5 col-md-12 col-sm-12"
              data-aos="fade-left"
              data-aos-duration="15"
            >
              <div className="imgbox">
                <div className="innerImgbox">
                  {banner.side_image?.url ? (
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

      {/* Empower / Portal services */}
      {empower ? (
        <section className="portal_services">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div
                  className="section_title"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="main_title_block">
                    {empower.title ? (
                      <h2 className="title">{empower.title}</h2>
                    ) : null}
                    {empower.description ? (
                      <p className="details">{empower.description}</p>
                    ) : null}
                    {empower.cta_title ? (
                      <button
                        type="button"
                        onClick={handleInquiry}
                        className="outline-btn trans"
                        title={empower.cta_title}
                      >
                        <span className="button-content">
                          {empower.cta_title}
                        </span>
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              {windowWidth >= 991 &&
              ((empower.move_up_image_list &&
                empower.move_up_image_list.length > 0) ||
                (empower.move_down_image_list &&
                  empower.move_down_image_list.length > 0)) ? (
                <div
                  className="col-lg-6 col-md-12 text-end"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="inner_animation_wrap">
                    {empower.move_up_image_list &&
                    empower.move_up_image_list.length > 0 ? (
                      <ul className="v-moving-animation moveup">
                        {empower.move_up_image_list.map((item, index) => (
                          <li key={index}>
                            {item.move_up_image?.url ? (
                              <div className="imgbox">
                                <img
                                  loading="eager"
                                  src={item.move_up_image.url}
                                  alt={item.move_up_image.alt ?? ""}
                                  width={38}
                                  height={38}
                                />
                              </div>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {empower.move_down_image_list &&
                    empower.move_down_image_list.length > 0 ? (
                      <ul className="v-moving-animation movedown">
                        {empower.move_down_image_list.map((item, index) => (
                          <li key={index}>
                            {item.move_down_image?.url ? (
                              <div className="imgbox">
                                <img
                                  loading="eager"
                                  src={item.move_down_image.url}
                                  alt={item.move_down_image.alt ?? ""}
                                />
                              </div>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Consulting vs Migration sections */}
      {serviceType === "Consulting" && (
        <>
          {/* Customizable portal */}
          {(customizable.title || customizable.description) && (
            <section className="customizable_portal_services">
              <div className="container">
                <div className="row">
                  <div
                    className="col-lg-6 col-md-12 text-center"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    <div className="imgbox">
                      <img
                        loading="eager"
                        src="/assets/images/trans_412X281.png"
                        alt=""
                      />
                      {customizable.left_top_image?.url && (
                        <div className="leftImg iconImgBox">
                          <img
                            loading="eager"
                            src={customizable.left_top_image.url}
                            alt={customizable.left_top_image.alt ?? ""}
                          />
                        </div>
                      )}
                      {customizable.right_top_image?.url && (
                        <div className="rightImg iconImgBox">
                          <img
                            loading="eager"
                            src={customizable.right_top_image.url}
                            alt={customizable.right_top_image.alt ?? ""}
                          />
                        </div>
                      )}
                      {customizable.center_image?.url && (
                        <div className="centerImg iconImgBox">
                          <img
                            loading="eager"
                            src={customizable.center_image.url}
                            alt={customizable.center_image.alt ?? ""}
                          />
                        </div>
                      )}
                      {customizable.left_bottom_image?.url && (
                        <div className="btLeftImg iconImgBox">
                          <img
                            loading="eager"
                            src={customizable.left_bottom_image.url}
                            alt={customizable.left_bottom_image.alt ?? ""}
                          />
                        </div>
                      )}
                      {customizable.right_bottom_image?.url && (
                        <div className="btRightImg iconImgBox">
                          <img
                            loading="eager"
                            src={customizable.right_bottom_image.url}
                            alt={customizable.right_bottom_image.alt ?? ""}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="col-lg-6 col-md-12"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    <div className="section_title">
                      <div className="main_title_block">
                        {customizable.title && (
                          <h2 className="title">{customizable.title}</h2>
                        )}
                        {customizable.description && (
                          <p className="details">{customizable.description}</p>
                        )}
                        {customizable.cta_title && (
                          <button
                            type="button"
                            onClick={handleInquiry}
                            className="outline-btn trans"
                            title={customizable.cta_title}
                          >
                            <span className="button-content">
                              {customizable.cta_title}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* What we offer */}
          {details.what_we_offer_section && (
            <section className="what_we_offer">
              <div className="container">
                <div
                  className="section_title text-center"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="main_title_block">
                    {details.what_we_offer_section.heading && (
                      <h2 className="title">
                        {details.what_we_offer_section.heading}
                      </h2>
                    )}
                  </div>
                </div>
                <div className="row">
                  {Array.isArray(details.what_we_offer_section.what_we_offer) && (
                    <div
                      className="col-md-12"
                      data-aos="fade-up"
                      data-aos-duration="15"
                    >
                      <div className="vertical_slider">
                        <ul>
                          {details.what_we_offer_section.what_we_offer.map(
                            (offer, index) => (
                              <li key={index}>
                                {offer.read_more_link?.url ? (
                                  <a
                                    href={offer.read_more_link.url}
                                    className="link-container"
                                    title="Read More Services"
                                  >
                                    <div className="slider_item">
                                      <div className="sliderImg">
                                        <div className="imgbox">
                                          {offer.image?.url && (
                                            <img
                                              loading="eager"
                                              src={offer.image.url}
                                              alt={offer.image.alt ?? ""}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div className="sliderDetails">
                                        {offer.title && <h3>{offer.title}</h3>}
                                        {offer.description && (
                                          <p>{offer.description}</p>
                                        )}
                                        <span className="link_more mt-2">
                                          Read More
                                        </span>
                                      </div>
                                    </div>
                                  </a>
                                ) : (
                                  <div className="slider_item">
                                    <div className="sliderImg">
                                      <div className="imgbox">
                                        {offer.image?.url && (
                                          <img
                                            loading="eager"
                                            src={offer.image.url}
                                            alt={offer.image.alt ?? ""}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="sliderDetails">
                                      {offer.title && <h3>{offer.title}</h3>}
                                      {offer.description && (
                                        <p>{offer.description}</p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                  {details.what_we_offer_section.cta_title && (
                    <div
                      className="col-md-12 text-center"
                      data-aos="fade-up"
                      data-aos-duration="15"
                    >
                      <button
                        type="button"
                        onClick={handleInquiry}
                        className="outline-btn trans"
                        title={details.what_we_offer_section.cta_title}
                      >
                        <span className="button-content">
                          {details.what_we_offer_section.cta_title}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {serviceType === "Migration" &&
        details.migrate_to_liferay_section && (
          <section className="what_we_offer">
            <div className="container">
              <div
                className="section_title text-center"
                data-aos="fade-up"
                data-aos-duration="15"
              >
                <div className="main_title_block">
                  {details.migrate_to_liferay_section.heading && (
                    <h2 className="title">
                      {details.migrate_to_liferay_section.heading}
                    </h2>
                  )}
                </div>
              </div>
              <div className="row">
                {Array.isArray(
                  details.migrate_to_liferay_section.migrate_to_liferay,
                ) && (
                  <div
                    className="col-md-12"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    <div className="vertical_slider">
                      <ul>
                        {details.migrate_to_liferay_section.migrate_to_liferay.map(
                          (migrate, index) => (
                            <li key={index}>
                              {migrate.read_more_link?.url ? (
                                <a
                                  href={migrate.read_more_link.url}
                                  className="link-container"
                                  title="Read More Services"
                                >
                                  <div className="slider_item">
                                    <div className="sliderImg">
                                      <div className="imgbox">
                                        {migrate.image?.url && (
                                          <img
                                            loading="eager"
                                            src={migrate.image.url}
                                            alt={migrate.image.alt ?? ""}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="sliderDetails">
                                      {migrate.title && <h3>{migrate.title}</h3>}
                                      {migrate.description && (
                                        <p>{migrate.description}</p>
                                      )}
                                      <span className="link_more mt-2">
                                        Read More
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              ) : (
                                <div className="slider_item">
                                  <div className="sliderImg">
                                    <div className="imgbox">
                                      {migrate.image?.url && (
                                        <img
                                          loading="eager"
                                          src={migrate.image.url}
                                          alt={migrate.image.alt ?? ""}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="sliderDetails">
                                    {migrate.title && <h3>{migrate.title}</h3>}
                                    {migrate.description && (
                                      <p>{migrate.description}</p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                )}
                {details.migrate_to_liferay_section.cta_title && (
                  <div
                    className="col-md-12 text-center"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    <button
                      type="button"
                      onClick={handleInquiry}
                      className="outline-btn trans"
                      title={details.migrate_to_liferay_section.cta_title}
                    >
                      <span className="button-content">
                        {details.migrate_to_liferay_section.cta_title}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

      {/* Lets continue */}
      {details.continue_section && (
        <section className="letsContinue">
          <div className="container">
            <div
              className="section_title text-center"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              <div className="main_title_block">
                {details.continue_section.title && (
                  <h2 className="title">{details.continue_section.title}</h2>
                )}
                {details.continue_section.description && (
                  <p className="details">
                    {details.continue_section.description}
                  </p>
                )}
              </div>
            </div>
            <div className="section_content">
              <div className="row">
                {details.continue_section.continue_list?.map(
                  (card, index) =>
                    card.title && (
                      <div
                        key={index}
                        className="col-lg-4 col-md-6 mb-24"
                        data-aos="fade-up"
                        data-aos-duration="15"
                      >
                        <div className="continue_card">
                          <div className="continue_card_body">
                            {card.icon?.url && (
                              <img
                                loading="eager"
                                className="continue_card_icon"
                                src={card.icon.url}
                                alt={card.icon.alt ?? ""}
                              />
                            )}
                            <h4 className="continue_card_title">
                              {card.title}
                            </h4>
                            {card.description && (
                              <p className="continue_card_text">
                                {card.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                )}
                {details.continue_section.cta_title && (
                  <div
                    className="col-md-12 text-center"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    <button
                      type="button"
                      onClick={handleInquiry}
                      className="outline-btn trans"
                      title={details.continue_section.cta_title}
                    >
                      <span className="button-content">
                        {details.continue_section.cta_title}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Liferay products (consulting) */}
      {serviceType === "Consulting" &&
        details.liferay_products_section &&
        details.liferay_products_section.heading && (
          <section className="liferayProducts">
            <div className="container">
              <div
                className="section_title text-center"
                data-aos="fade-up"
                data-aos-duration="15"
              >
                <div className="main_title_block">
                  <h2 className="title">
                    {details.liferay_products_section.heading}
                  </h2>
                </div>
              </div>
              <div className="row">
                {details.liferay_products_section.liferay_products !==
                  false &&
                  Array.isArray(
                    details.liferay_products_section.liferay_products,
                  ) &&
                  details.liferay_products_section.liferay_products.map(
                    (product, index) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-6 col-sm-6"
                        data-aos="fade-up"
                        data-aos-duration="15"
                      >
                        <div className="liferay_products_card">
                          {product.icon?.url && (
                            <div className="icon">
                              <img
                                src={product.icon.url}
                                alt={product.icon.alt ?? ""}
                                width={60}
                                height={60}
                              />
                            </div>
                          )}
                          <div className="details">
                            {product.title && <h6>{product.title}</h6>}
                            {product.description && (
                              <p>{product.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
              </div>
            </div>
          </section>
        )}

      {/* Why choose Aixtor */}
      {details.why_choose_aixtor_section &&
        details.why_choose_aixtor_section.heading && (
          <section className="choose_Aixtor">
            <div className="container">
              <div
                className="section_title text-center"
                data-aos="fade-up"
                data-aos-duration="15"
              >
                <div className="main_title_block">
                  <h2 className="title">
                    {details.why_choose_aixtor_section.heading}
                  </h2>
                </div>
              </div>
              <div className="section_content text-center">
                <div className="circle_list">
                  <div
                    className="central_area"
                    data-aos="zoom-in"
                    data-aos-duration="15"
                  >
                    <img
                      loading="eager"
                      src="/assets/images/trans_1000X576.png"
                      className="transImg"
                      alt=""
                    />
                    <img
                      loading="eager"
                      src="/assets/images/central_img.svg"
                      className="central_img"
                      alt=""
                    />
                    <div
                      className="central_aixtor_logo"
                      data-aos="zoom-in"
                      data-aos-delay="5"
                      data-aos-duration="200"
                    >
                      <img
                        loading="eager"
                        src="/assets/images/aixtor_branding_logo.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <ul>
                    {(
                      [
                        "reason_1",
                        "reason_2",
                        "reason_3",
                        "reason_4",
                        "reason_5",
                        "reason_6",
                        "reason_7",
                        "reason_8",
                      ] as const
                    ).map((key, index) => {
                      const value =
                        details.why_choose_aixtor_section?.[key] ?? "";
                      if (!value) return null;
                      const className = [
                        "one",
                        "two",
                        "three",
                        "four",
                        "five",
                        "six",
                        "seven",
                        "eight",
                      ][index];
                      return (
                        <li
                          key={key}
                          data-aos="zoom-in-left"
                          data-aos-duration="250"
                          className={className}
                        >
                          <div className="textBox">{value}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="row">
                  <div
                    className="col-md-12 text-center"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    {details.why_choose_aixtor_section.cta_title && (
                      <button
                        type="button"
                        onClick={handleInquiry}
                        className="outline-btn trans"
                        title={details.why_choose_aixtor_section.cta_title}
                      >
                        <span className="button-content">
                          {details.why_choose_aixtor_section.cta_title}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      {/* FAQ */}
      {Array.isArray(faqData) && faqData.length > 0 && (
        <FaqAccordion faqData={faqData} />
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
              )}
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
            </HorizontalSlider>
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

      <InquiryModal
        show={showModal}
        onHide={handleCloseModal}
        slug={`/services/${slug}/`}
      />
    </>
  );
}


