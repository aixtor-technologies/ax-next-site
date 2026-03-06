"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Typed from "typed.js";

type HomePageBannerProps = {
  homePage?: {
    banner_section?: {
      description?: string;
      cta_title?: string;
    };
  };
};

const rotatingItems = [
  {
    href: "/services/liferay-upgrade/",
    label: "Liferay Upgradation",
    mainImage: "/assets/images/HomeCard/img1111.svg",
    icon: "/assets/images/HomeCard/liferay_Upgradation.svg",
    className: "img1",
  },
  {
    href: "/services/web-portal-development/",
    label: "Web Portal Development",
    mainImage: "/assets/images/HomeCard/img2.svg",
    icon: "/assets/images/HomeCard/Web_Portal_Devlopment.svg",
    className: "img2",
  },
  {
    href: "/services/enterprise-portal-development/",
    label: "Enterprise Portal Development",
    mainImage: "/assets/images/HomeCard/img3.svg",
    icon: "/assets/images/HomeCard/Enterprise_Portal_Development.svg",
    className: "img3",
  },
  {
    href: "/services/liferay-consulting-services/",
    label: "Liferay Consulting",
    mainImage: "/assets/images/HomeCard/img4.svg",
    icon: "/assets/images/HomeCard/Liferay_Consulting.svg",
    className: "img4",
  },
  {
    href: "/solutions/supplier-and-vendor-portal/",
    label: "Supplier And Vendor Portal",
    mainImage: "/assets/images/HomeCard/img5.svg",
    icon: "/assets/images/HomeCard/Supplier_and_vendor_portal.svg",
    className: "img5",
  },
  {
    href: "/solutions/customer-self-service-portal/",
    label: "Customer Self Service Portal",
    mainImage: "/assets/images/HomeCard/img6.svg",
    icon: "/assets/images/HomeCard/Customer_Self_Service_Portal.svg",
    className: "img6",
  },
  {
    href: "/services/liferay-migration-services/",
    label: "Liferay Migration",
    mainImage: "/assets/images/HomeCard/img7.svg",
    icon: "/assets/images/HomeCard/Liferay_Migration.svg",
    className: "img7",
  },
  {
    href: "/solutions/partner-portal-solution/",
    label: "Partner Management",
    mainImage: "/assets/images/HomeCard/img8.svg",
    icon: "/assets/images/HomeCard/Partner_Management.svg",
    className: "img8",
  },
  {
    href: "/solutions/intranet-portal/",
    label: "Intranet Portal",
    mainImage: "/assets/images/HomeCard/img9.svg",
    icon: "/assets/images/HomeCard/Intranet_Portal.svg",
    className: "img9",
  },
];

export default function HomeBanner({ homePage }: HomePageBannerProps) {
  const [centerText, setCenterText] = useState("Digital Transformation");
  const [animationClass, setAnimationClass] = useState("");
  const typedElement = useRef<HTMLSpanElement | null>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    if (!typedElement.current) {
      return;
    }

    typedInstance.current = new Typed(typedElement.current, {
      strings: ["Services", "Solutions", "Support"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    return () => typedInstance.current?.destroy();
  }, []);

  const handleMouseEnter = (updatedText: string) => {
    setAnimationClass("zoom-in");
    setCenterText(updatedText);
  };

  const handleMouseLeave = () => {
    setAnimationClass("zoom-out");
    setCenterText("Digital Transformation");
  };

  if (!homePage) {
    return null;
  }

  return (
    <section className="home_banner">
      <div>
        <video
          className="video_background"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/assets/images/videos/video_poster.png"
        >
          <source
            src="https://video.gumlet.io/695d03f7bb9129c029dd40e1/695d0af9bb9129c029ddc184/download.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="container">
        <div className="main_pitch_banner">
          <div className="banner_content_details">
            <h1>
              Empowering <br />
              Enterprises with <br />
              Innovative:
              <div
                style={{
                  width: 312,
                  height: 92,
                  display: "inline-block",
                  verticalAlign: "top",
                }}
              >
                <span ref={typedElement} />
              </div>
            </h1>

            <p>{homePage.banner_section?.description || ""}</p>

            {homePage.banner_section?.cta_title ? (
              <Link href="/contact/" className="outline-btn trans">
                <span className="button-content">
                  {homePage.banner_section.cta_title}
                </span>
              </Link>
            ) : null}
          </div>

          <div className="circle-container">
            <Image
              src="/assets/images/HomeCard/trans_450X445.png"
              alt=""
              width={450}
              height={445}
              priority
            />

            <div className="centerImg_wrap">
              <Image
                src="/assets/images/HomeCard/center_img.svg"
                alt="Digital Transformation"
                width={171}
                height={172}
                className="centerImg"
              />

              <span className={`centerText ${animationClass}`}>{centerText}</span>
            </div>

            <ul className="rotating-circle">
              {rotatingItems.map((item) => (
                <li key={item.href} className={item.className}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    className="cycleImg"
                  >
                    <Image
                      src={item.mainImage}
                      alt={item.label}
                      width={80}
                      height={80}
                      className="mainImg"
                    />
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={36}
                      height={36}
                      className="innerIcon"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
