"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Typed from "typed.js";

export default function HomeBanner({ homePage }: any) {
  const [centerText, setCenterText] = useState("Digital Transformation");
  const [animationClass, setAnimationClass] = useState("");

  const typedElement = useRef<HTMLSpanElement | null>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: ["Services", "Solutions", "Support"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    };

    if (typedElement.current) {
      typedInstance.current = new Typed(typedElement.current, options);
    }

    return () => {
      typedInstance.current?.destroy();
    };
  }, []);

  const handleMouseEnter = (updatedText: string) => {
    setAnimationClass("zoom-in");
    setCenterText(updatedText);
  };

  const handleMouseLeave = () => {
    setAnimationClass("zoom-out");
    setCenterText("Digital Transformation");
  };

  if (!homePage) return null;

  return (
    <section className="home_banner">
      {/* VIDEO */}
      <div>
        <video
          className="video_background"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/assets/videos/video_poster.png"
        >
          <source
            src="https://video.gumlet.io/695d03f7bb9129c029dd40e1/695d0af9bb9129c029ddc184/download.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="container">
        <div className="main_pitch_banner">

          {/* TEXT */}
          <div className="banner_content_details">
            <h1>
              Empowering <br />
              Enterprises with <br />
              Innovative:
              <div style={{ width: 312, height: 92, display: "inline-block", verticalAlign: "top" }}>
                <span ref={typedElement}></span>
              </div>
            </h1>

            <p>{homePage?.banner_section?.description || ""}</p>

            {homePage?.banner_section?.cta_title && (
              <Link href="/contact/" className="outline-btn trans">
                <span className="button-content">
                  {homePage?.banner_section?.cta_title}
                </span>
              </Link>
            )}
          </div>

          {/* ROTATING CIRCLE */}
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

              <span className={`centerText ${animationClass}`}>
                {centerText}
              </span>
            </div>

            <ul className="rotating-circle">

              <li className="img1">
                <Link
                  href="/services/liferay-upgrade/"
                  onMouseEnter={() => handleMouseEnter("Liferay Upgradation")}
                  onMouseLeave={handleMouseLeave}
                  className="cycleImg"
                >
                  <Image
                    src="/assets/images/HomeCard/img1111.svg"
                    alt="Liferay Upgradation"
                    width={80}
                    height={80}
                  />
                </Link>
              </li>

              <li className="img2">
                <Link
                  href="/services/web-portal-development/"
                  onMouseEnter={() => handleMouseEnter("Web Portal Development")}
                  onMouseLeave={handleMouseLeave}
                  className="cycleImg"
                >
                  <Image
                    src="/assets/images/HomeCard/img2.svg"
                    alt="Web Portal Development"
                    width={80}
                    height={80}
                  />
                </Link>
              </li>

              <li className="img3">
                <Link
                  href="/services/enterprise-portal-development/"
                  onMouseEnter={() =>
                    handleMouseEnter("Enterprise Portal Development")
                  }
                  onMouseLeave={handleMouseLeave}
                  className="cycleImg"
                >
                  <Image
                    src="/assets/images/HomeCard/img3.svg"
                    alt="Enterprise Portal Development"
                    width={80}
                    height={80}
                  />
                </Link>
              </li>

            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}