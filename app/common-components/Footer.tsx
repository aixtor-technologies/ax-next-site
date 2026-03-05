"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL;
  const [homePage, setHomePage] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      const fetchHomePage = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/wp/v2/home-page`);
  
          if (!res.ok) throw new Error("Failed to fetch home page data");
  
          const data = await res.json();
  
          console.log("Home Page Data:", data);
  
          setHomePage(data.items || data);
        } catch (error) {
          console.error("Home Page API Error:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchHomePage();
    }, []);

  const toggleSection = (section: string) => {
    if (window.innerWidth > 991) return; // only mobile
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const isExpanded = (section: string) =>
    expandedSection === section ? "expanded" : "";

  return (
    <footer id="footer">
      <div className="container">
        <div className="row">
          {/* LEFT SECTION */}
          <div className="col-lg-4">
            <div className="footer_logo">
              <Link href="/" title="Aixtor Technologies">
                <Image
                  src="/assets/images/aixtor-logo.svg"
                  alt="Aixtor Technologies"
                  width={143}
                  height={65}
                  priority
                />
              </Link>
            </div>

            {/* Address Section */}
            <address>
              {homePage?.footer_section?.india_flag && (
                <Image
                  src={homePage.footer_section.india_flag.url}
                  alt={
                    homePage.footer_section.india_flag.alt || "India Flag"
                  }
                  width={24}
                  height={16}
                />
              )}
              {homePage?.footer_section?.india_address && (
                <div className="full_address">
                  {homePage.footer_section.india_address}
                </div>
              )}
            </address>

            <address>
              {homePage?.footer_section?.usa_flag && (
                <Image
                  src={homePage.footer_section.usa_flag.url}
                  alt={homePage.footer_section.usa_flag.alt || "USA Flag"}
                  width={24}
                  height={16}
                />
              )}
              {homePage?.footer_section?.usa_address && (
                <div className="full_address">
                  {homePage.footer_section.usa_address}
                </div>
              )}
            </address>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-lg-8">
            <div className="row">

              {/* SERVICES */}
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="footer_navbar">
                  <h4 onClick={() => toggleSection("services")}>
                    Services
                  </h4>
                  <ul className={isExpanded("services")}>
                    <li>
                      <Link href="/services/enterprise-portal-development/">
                        Enterprise Portal Development
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/liferay-consulting-services/">
                        Liferay Consulting & Development
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/devops/">DevOps</Link>
                    </li>
                    <li>
                      <Link href="/services/ai-and-ml/">AI and ML</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* SOLUTIONS */}
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="footer_navbar">
                  <h4 onClick={() => toggleSection("solutions")}>
                    Solutions
                  </h4>
                  <ul className={isExpanded("solutions")}>
                    <li>
                      <Link href="/solutions/intranet-portal/">
                        Intranet Portal
                      </Link>
                    </li>
                    <li>
                      <Link href="/solutions/enterprise-websites/">
                        Enterprise Websites
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COMPANY */}
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="footer_navbar">
                  <h4 onClick={() => toggleSection("company")}>
                    Company
                  </h4>
                  <ul className={isExpanded("company")}>
                    <li>
                      <Link href="/company/about-us/">About</Link>
                    </li>
                    <li>
                      <Link href="/company/careers/">Career</Link>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer_end">
          <div className="social_list">
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/company/aixtor/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/aixtor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div className="copyright_text">
            &copy; {currentYear} Aixtor Technologies LLP. All rights reserved
            <span>
              <Link href="/privacy-policy/"> Privacy Policy </Link>
            </span>
            <span>
              <Link href="/cookie-policy/"> Cookie Policy </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;