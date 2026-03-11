import { fetchCareerAndAbout } from "@/lib/api";
import { getMetadataForPath } from "@/lib/seo";

export async function generateMetadata() {
  return getMetadataForPath("/company");
}

type ApiImage = {
  url?: string;
  alt?: string;
};

type CareerAndAbout = {
  about_page?: {
    banner_section?: {
      title?: string;
      description?: string;
      side_image?: ApiImage;
    };
    vision_section?: {
      title?: string;
      description?: string;
      image?: ApiImage;
    };
    mission_section?: {
      title?: string;
      description?: string;
      image?: ApiImage;
    };
    technologies_we_use?: {
      title?: string;
      description?: string;
      technologies?: Array<{
        image?: ApiImage;
      }>;
    };
    founders?: Array<{
      founders_section?: {
        image?: ApiImage;
        name?: string;
        designation?: string;
        description?: string;
        linkedin_profile?: string;
      };
    }>;
  };
};

export default async function CompanyPage() {
  const data = await fetchCareerAndAbout<CareerAndAbout>();

  if (!data) {
    return null;
  }

  const banner = data.about_page?.banner_section ?? {};
  const vision = data.about_page?.vision_section ?? {};
  const mission = data.about_page?.mission_section ?? {};
  const tech = data.about_page?.technologies_we_use ?? {};
  const founders = data.about_page?.founders ?? [];

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

      <section className="ax_ourValue">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              <h2 className="title">Our Values</h2>
            </div>
          </div>
          {/* Static values copied conceptually from Frontity ValuesSection */}
          {/* If you want these fully dynamic later, we can move them into ACF. */}
        </div>
      </section>

      <section className="two_block">
        <div className="container">
          <div
            className="row align-items-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="col-md-6">
              <div className="imgbox">
                {vision.image?.url ? (
                  <img
                    loading="eager"
                    src={vision.image.url}
                    alt={vision.image.alt ?? ""}
                  />
                ) : null}
              </div>
            </div>
            <div
              className="col-md-6"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              <div className="section_title">
                <div className="main_title_block">
                  {vision.title ? <h2 className="title">{vision.title}</h2> : null}
                  {vision.description ? <p>{vision.description}</p> : null}
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center flex-row-reverse">
            <div
              className="col-md-6"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              <div className="imgbox">
                {mission.image?.url ? (
                  <img
                    loading="eager"
                    src={mission.image.url}
                    alt={mission.image.alt ?? ""}
                  />
                ) : null}
              </div>
            </div>
            <div
              className="col-md-6"
              data-aos="fade-up"
              data-aos-duration="15"
            >
              <div
                className="section_title"
                data-aos="fade-up"
                data-aos-duration="15"
              >
                <div className="main_title_block">
                  {mission.title ? (
                    <h2 className="title">{mission.title}</h2>
                  ) : null}
                  {mission.description ? <p>{mission.description}</p> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="technologies">
        <div className="container">
          <div className="section_title text-center">
            <div className="main_title_block">
              {tech.title ? <h2 className="title">{tech.title}</h2> : null}
              {tech.description ? <p>{tech.description}</p> : null}
            </div>
          </div>
          <div className="row">
            {Array.isArray(tech.technologies) &&
              tech.technologies.map((item, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-3 col-sm-4 col-xs-6"
                >
                  <div className="technologies_brand">
                    {item.image?.url ? (
                      <img
                        loading="eager"
                        src={item.image.url}
                        alt={item.image.alt ?? ""}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="meet_founder">
        <div className="container">
          <div
            className="section_title text-center"
            data-aos="fade-up"
            data-aos-duration="15"
          >
            <div className="main_title_block">
              <h2 className="title">Meet the Founders</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            {founders.map((f, index) => {
              const fd = f.founders_section ?? {};
              return (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 mb-4"
                  data-aos="fade-up"
                  data-aos-duration="15"
                >
                  <div className="founder_card">
                    <figure>
                      {fd.image?.url ? (
                        <img
                          loading="eager"
                          src={fd.image.url}
                          alt={fd.image.alt ?? ""}
                        />
                      ) : null}
                      <figcaption>
                        {fd.name ? <div className="name">{fd.name}</div> : null}
                        {fd.designation ? (
                          <div className="designation">{fd.designation}</div>
                        ) : null}
                      </figcaption>
                    </figure>
                    <div className="founder_description">
                      {fd.name ? <h6 className="title">{fd.name}</h6> : null}
                      {fd.designation ? (
                        <div className="designation">{fd.designation}</div>
                      ) : null}
                      {fd.description ? <p>{fd.description}</p> : null}
                      {fd.linkedin_profile ? (
                        <a
                          href={`${fd.linkedin_profile}/`}
                          className="linkedinLink"
                          title={fd.name}
                        >
                          {/* The original uses an inline SVG/icon; here we rely on CSS/icon font */}
                          <span>LinkedIn</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

