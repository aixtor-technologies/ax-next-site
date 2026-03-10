import { fetchCareerAndAbout, safeFetchWordPress } from "@/lib/api";
import type { HomePageStartSection } from "../case-study/caseStudyTypes";

type ApiImage = {
  url?: string;
  alt?: string;
};

type CareerAndAbout = {
  contact_page?: {
    banner_section?: {
      title?: string;
      description?: string;
      side_image?: ApiImage;
    };
    inquire_now?: {
      heading?: string;
      description?: string;
    };
  };
};

type HomePage = {
  success_stories_section?: {
    heading?: string;
    description?: string;
    success_list?: Array<{
      number?: string;
      success_name?: string;
    }>;
  };
};

export default async function ContactUsPage() {
  const [career, homePageResponse] = await Promise.all([
    fetchCareerAndAbout<CareerAndAbout>(),
    safeFetchWordPress<Array<{ acf?: HomePage & HomePageStartSection }>>(
      "home-page",
      [],
    ),
  ]);

  if (!career) {
    return null;
  }

  const banner = career.contact_page?.banner_section ?? {};
  const inquire = career.contact_page?.inquire_now ?? {};
  const homePage = homePageResponse?.[0]?.acf ?? {};

  const success = (homePage as HomePage).success_stories_section ?? {};
  const start = (homePage as HomePageStartSection).start_project_section ?? {};

  return (
    <div className="wrappper">
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

      <section className="contact_us">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {inquire.heading ? (
                <h2 className="title">{inquire.heading}</h2>
              ) : null}
              {inquire.description ? (
                <p className="details">{inquire.description}</p>
              ) : null}
            </div>
          </div>
          <div className="row contactForm">
            <div data-aos="fade-up" data-aos-duration="15">
              {/* Simplified inquiry form placeholder; real CF7/recaptcha integration can be added later */}
              <form className="inquiry_form">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      placeholder="Message"
                      name="message"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    <button
                      type="submit"
                      className="outline-btn trans"
                      title="Submit"
                    >
                      <span className="button-content">Submit</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="home_success_story">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              {success.heading ? (
                <h2 className="title">{success.heading}</h2>
              ) : null}
              {success.description ? (
                <p className="details">{success.description}</p>
              ) : null}
            </div>
          </div>
          <div className="section_content">
            <div className="row">
              <div className="col-md-12">
                <div className="imgbox text-center">
                  {/* We don’t have the static map image here; CSS can provide background */}
                </div>
              </div>
            </div>
            <div className="row">
              {Array.isArray(success.success_list) &&
                success.success_list.map((s, idx) => (
                  <div
                    key={idx}
                    className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb32"
                    data-aos="fade-up"
                    data-aos-duration="15"
                  >
                    <div className="story_card">
                      <div className="story_card_number">
                        <span>{s.number}</span>
                      </div>
                      <div className="story_card_text">{s.success_name}</div>
                    </div>
                  </div>
                ))}
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
                  <a
                    href="/contact-us/"
                    className="outline-btn trans"
                    title={start.cta_title}
                  >
                    <span className="button-content">{start.cta_title}</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

