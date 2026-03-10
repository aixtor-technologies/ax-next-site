"use client";

import Link from "next/link";

import type { HomePageStartSection } from "../../case-study/caseStudyTypes";

type ApiImage = {
  url?: string;
  alt?: string;
};

type CareerAndAbout = {
  career_page?: {
    banner_section?: {
      title?: string;
      description?: string;
      side_image?: ApiImage;
      cta_title?: string;
    };
    what_aixtor_has?: {
      heading?: string;
      aixtor_list?: Array<{
        aixtor_has?: string;
      }>;
    };
    truly_believe_section?: {
      heading?: string;
      believe_list?: Array<{
        image?: ApiImage;
        name?: string;
      }>;
    };
    life_aixtor?: {
      heading?: string;
      description?: string;
      cta_title?: string;
      cta_link?: { url?: string };
      top_slider_images?: {
        slider_images?: Array<{
          image_1?: ApiImage;
          image_2?: ApiImage;
          image_3?: ApiImage;
        }>;
      };
    };
    grow_section?: {
      heading?: string;
      description?: string;
      job_openings?: Array<{
        job_title?: string;
        skills?: string;
        experience?: string;
        location?: string;
        positions?: string;
        qualifications?: string;
        job_descriptions?: Array<{ description?: string }>;
      }>;
    };
    team_comments?: {
      heading?: string;
      team_comment?: Array<{
        comment?: string;
        employee_name?: string;
        employee_designation?: string;
      }>;
    };
  };
};

type CareerPageClientProps = {
  career: CareerAndAbout;
  homePage: HomePageStartSection;
};

export default function CareerPageClient({
  career,
  homePage,
}: CareerPageClientProps) {
  const banner = career.career_page?.banner_section ?? {};
  const what = career.career_page?.what_aixtor_has ?? {};
  const believe = career.career_page?.truly_believe_section ?? {};
  const life = career.career_page?.life_aixtor ?? {};
  const grow = career.career_page?.grow_section ?? {};
  const team = career.career_page?.team_comments ?? {};
  const start = homePage?.start_project_section ?? {};

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
                {banner.title ? <h1>{banner.title}</h1> : null}
                {banner.description ? <p>{banner.description}</p> : null}
                {banner.cta_title ? (
                  <Link
                    href="/contact-us/"
                    className="outline-btn trans"
                    title={banner.cta_title}
                  >
                    <span className="button-content">{banner.cta_title}</span>
                  </Link>
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

      <section className="Ax_provided_services">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {what.heading ? <h2 className="title">{what.heading}</h2> : null}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <ul className="reasons_portal_list">
                {Array.isArray(what.aixtor_list) &&
                  what.aixtor_list.map((item, idx) => (
                    <li
                      key={idx}
                      data-aos="fade-up"
                      data-aos-duration="15"
                    >
                      {item.aixtor_has}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ax_believes">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {believe.heading ? (
                <h2 className="title">{believe.heading}</h2>
              ) : null}
            </div>
          </div>
          <div className="row">
            {Array.isArray(believe.believe_list) &&
              believe.believe_list.map((b, idx) => (
                <div
                  key={idx}
                  className="col-lg-3 col-md-6"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="believe_card">
                    {b.image?.url ? (
                      <div className="imgbox">
                        <img
                          loading="eager"
                          src={b.image.url}
                          alt={b.image.alt ?? ""}
                        />
                      </div>
                    ) : null}
                    {b.name ? <h4>{b.name}</h4> : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="ax_life">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {life.heading ? <h2 className="title">{life.heading}</h2> : null}
              {life.description ? <p>{life.description}</p> : null}
            </div>
          </div>
        </div>

        <div className="Ax_photosGallery_slider">
          <ul>
            <div className="slider_track static">
              {life.top_slider_images?.slider_images?.map((image, idx) => (
                <li
                  key={idx}
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="slider_box">
                    {image.image_1?.url ? (
                      <div className="block_left">
                        <div className="imgbox">
                          <img
                            loading="eager"
                            src={image.image_1.url}
                            alt={image.image_1.alt ?? ""}
                          />
                        </div>
                      </div>
                    ) : null}
                    <div className="block_right">
                      {image.image_2?.url ? (
                        <div className="imgbox">
                          <img
                            loading="eager"
                            src={image.image_2.url}
                            alt={image.image_2.alt ?? ""}
                          />
                        </div>
                      ) : null}
                      {image.image_3?.url ? (
                        <div className="imgbox">
                          <img
                            loading="eager"
                            src={image.image_3.url}
                            alt={image.image_3.alt ?? ""}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>

        {life.cta_title && life.cta_link?.url ? (
          <div
            className="text-center moreLoad"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <Link href={`${life.cta_link.url}/`}>
              <div
                className="outline-btn trans"
                title={life.cta_title}
              >
                <span className="button-content">{life.cta_title}</span>
              </div>
            </Link>
          </div>
        ) : null}
      </section>

      <section className="ax_opening_positions">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {grow.heading ? <h2 className="title">{grow.heading}</h2> : null}
              {grow.description ? <p>{grow.description}</p> : null}
            </div>
          </div>

          <div className="openings_list">
            {Array.isArray(grow.job_openings) &&
              grow.job_openings.map((job, idx) => (
                <div
                  key={idx}
                  className="opening_card"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="position_details">
                    <div className="topHeader">
                      {job.job_title ? (
                        <div className="title">{job.job_title}</div>
                      ) : null}
                      {job.skills ? (
                        <div className="title_description">{job.skills}</div>
                      ) : null}
                    </div>
                    <div className="position_requirements">
                      {job.experience ? (
                        <div className="requirement_box">
                          <div className="title">Experience</div>
                          <div className="details">{job.experience}</div>
                        </div>
                      ) : null}
                      {job.location ? (
                        <div className="requirement_box">
                          <div className="title">Location</div>
                          <div className="details">{job.location}</div>
                        </div>
                      ) : null}
                      {job.positions ? (
                        <div className="requirement_box">
                          <div className="title">Positions</div>
                          <div className="details">{job.positions}</div>
                        </div>
                      ) : null}
                      {job.qualifications ? (
                        <div className="requirement_box">
                          <div className="title">Qualification</div>
                          <div className="details">{job.qualifications}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="job_description_block">
                    {Array.isArray(job.job_descriptions) &&
                      job.job_descriptions.length > 0 && (
                        <>
                          <h6>Job Description</h6>
                          <ul>
                            {job.job_descriptions.map((d, dIdx) => (
                              <li key={dIdx}>{d.description}</li>
                            ))}
                          </ul>
                        </>
                      )}
                  </div>
                  <div className="buttons">
                    <Link
                      href="/contact-us/"
                      className="trans outline-btn applyBtn"
                      title="Apply now"
                    >
                      <span className="button-content">Apply Now</span>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="team_sharing">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {team.heading ? <h2 className="title">{team.heading}</h2> : null}
            </div>
          </div>
          <div className="grid_container">
            {Array.isArray(team.team_comment) &&
              team.team_comment.map((item, idx) => (
                <div
                  key={idx}
                  className="sharing_card"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  {item.comment ? <p>{item.comment}</p> : null}
                  <div className="shared_details">
                    {item.employee_name ? (
                      <div className="name">{item.employee_name}</div>
                    ) : null}
                    {item.employee_designation ? (
                      <div className="designation">
                        {item.employee_designation}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
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

