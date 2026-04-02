"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";



const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL;
  const [homePage, setHomePage] = useState({});
  const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //     const fetchHomePage = async () => {
  //       try {
  //         const res = await fetch(`${API_BASE_URL}/wp/v2/home-page`);
  
  //         if (!res.ok) throw new Error("Failed to fetch home page data");
  
  //         const data = await res.json();
  //         setHomePage(data || []);
  //       } catch (error) {
  //         console.error("Home Page API Error:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchHomePage();
  //   }, []);

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
              <div className="col-lg-4">
                <div className="footer_logo">
                  <Link prefetch={false} href="/" title="Aixtor Technologies">
                    <img src="/assets/images/aixtor-logo.svg"
                      alt="Aixtor Technologies"
                      width={143}
                      height={65}
                      loading="eager"
                    />
                  </Link>
                </div>
                <address>
                  <img loading="eager"
                      src="/assets/images/IndianFlag.png.webp"
                      className="countryFlag"
                      alt="Flag-India"
                      width={24}
                      height={24}
                    />
                  <div className="full_address">1305-06, Zion Z1, Sindhu Bhavan Road, Ahmedabad, India – 380054</div>
                </address>
                <address>
                  <img loading="eager"
                      src="/assets/images/UsFlag.png.webp"
                      className="countryFlag"
                      alt="UsFlag"
                      width={24}
                      height={24}
                    />
                  <div className="full_address">Silicon Valley, California - 94542, USA</div>
                </address>

                <div className="contact_details">
                  <div className="emailcontact">
                    <div className="contact_details_inner">
                      <img loading="eager"
                          src="/assets/images/Home_icon_Email.svg"
                          alt="Ax Email Icon"
                          width={24}
                          height={24}
                        />
                      <a href="mailto:connect@aixtor.com" target="_blank" className="full_address" title="Mail">
                          connect@aixtor.com
                      </a>
                    </div>
                  </div>
                  <div className="telcontact">
                    <div className="contact_details_inner">
                      <img loading="eager"
                          src="/assets/images/Home_icon_Phone-_call.svg"
                          alt="Ax Phone Icon"
                          width={24}
                          height={24}
                        />
                      <a href="tel:+91 7948940009" target="_blank" className="full_address" title="Tel">
                          +91 7948940009
                      </a>
                    </div>
                  </div>
                </div>
                <div className="partner_details">
                    <img loading="eager"
                      src="/assets/images/silver_solution_partner_logo.svg"
                          alt="silver_solution_partner_logo"
                      width={266}
                      height={43}
                    />
                  </div>
              </div>

              {/* Services + Solutions */}
              <div className="col-lg-8">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                      <div className="footer_navbar">
                        <h4>Services</h4>
                        <ul>
                          <li><Link prefetch={false} href="/services/enterprise-portal-development/"  title="Enterprise Portal Development">Enterprise Portal Development</Link></li>
                          <li><Link prefetch={false} href="/services/liferay-consulting-services/"  title="Liferay Consulting &amp; Development">Liferay Consulting &amp; Development</Link></li>
                          <li><Link prefetch={false} href="/services/liferay-upgrade/"  title="Liferay Upgrade">Liferay Upgrade</Link></li>
                          <li><Link prefetch={false} href="/services/liferay-migration-services/"  title="Liferay Migration">Liferay Migration</Link></li>
                          <li><Link prefetch={false} href="/services/web-portal-development/"  title="Web Portal Development">Web Portal Development</Link></li>
                          <li><Link prefetch={false} href="/services/ui-ux-design/"  title="UI/UX Design">UI/UX Design</Link></li>
                          <li><Link prefetch={false} href="/services/rpa-development-services/"  title="RPA Development ">RPA Development </Link></li>
                          <li><Link prefetch={false} href="/services/drupal-development/"  title="Drupal Development">Drupal Development</Link></li>
                          <li><Link prefetch={false} href="/services/qa-automation-testing-services/"  title="QA Automation Testing">QA Automation Testing</Link></li>
                          <li><Link prefetch={false} href="/services/qa-manual-testing/"  title="QA Manual Testing">QA Manual Testing</Link></li>
                          <li><Link prefetch={false} href="/services/bi-and-data-analytics-services/"  title="BI and Data Analytics Services">BI and Data Analytics Services</Link></li>
                          <li><Link prefetch={false} href="/services/devops/"  title="DevOps as a Service">DevOps as a Service</Link></li>
                          <li><Link prefetch={false} href="/services/ai-and-ml/"  title="AI and ML">AI and ML</Link></li>
                          <li><Link prefetch={false} href="/services/performance-tuning/"  title="Performance Tuning ">Performance Tuning </Link></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                      <div className="footer_navbar">
                        <h4>Solutions</h4>
                        <ul>
                          <li><Link prefetch={false} href="/solutions/intranet-portal/"  title="Intranet Portal">Intranet Portal</Link></li>
                          <li><Link prefetch={false} href="/solutions/customer-self-service-portal/"  title="Customer Self-Service Portal">Customer Self-Service Portal</Link></li>
                          <li><Link prefetch={false} href="/solutions/partner-portal-solution/"  title="Partner Management Portal">Partner Management Portal</Link></li>
                          <li><Link prefetch={false} href="/solutions/supplier-and-vendor-portal/"  title="Supplier and Vendor Portal">Supplier and Vendor Portal</Link></li>
                          <li><Link prefetch={false} href="/solutions/e-commerce-portal-development/"  title="E-Commerce Portal">E-Commerce Portal</Link></li>
                          <li><Link prefetch={false} href="/solutions/enterprise-websites/"  title="Enterprise Websites">Enterprise Websites</Link></li>
                          <li><Link prefetch={false} href="/solutions/enterprise-content-management-solution/"  title="Enterprise Content Management">Enterprise Content Management</Link></li>
                        </ul>
                      </div>
                    </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="footer_navbar">
                      <h4>Company</h4>
                      <ul>
                        <li><Link prefetch={false} href="/company/about-us/">About</Link></li>
                        <li><Link prefetch={false} href="/company/careers/">Career</Link></li>
                      </ul>
                    </div>
                    <div className="footer_navbar">
                      <h4>Resources</h4>
                      <ul>
                        <li><Link prefetch={false} href="/case-study/">Case study</Link></li>
                        <li><Link prefetch={false} href="/blog/">Blog</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer_end">
              <div className="social_list">
                <ul>
                  <li><a href="https://www.linkedin.com/company/aixtor/" className="trans social_icon" title="Linkedin"><i className="fa-brands fa-linkedin-in"></i></a></li>
                  <li><a href="https://x.com/aixtor" className="trans social_icon" title="Twitter"><i className="fa-brands fa-x-twitter"></i></a></li>
                  <li><a href="https://www.instagram.com/aixtor_technologies/" className="trans social_icon" title="Instagram"><i className="fa-brands fa-instagram"></i></a></li>
                  <li><a href="https://www.facebook.com/aixtor.technologies" className="trans social_icon" title="Facebook"><i className="fa-brands fa-facebook-f"></i></a></li>
                </ul>
              </div>
              <div className="copyright_text">
                &copy; {currentYear} Aixtor Technologies LLP. All rights reserved
                <span><Link prefetch={false} href="/privacy-policy/"> Privacy Policy </Link></span>
                <span><Link prefetch={false} href="/cookie-policy/"> Cookie Policy </Link></span>
              </div>
            </div>
          </div>
        </footer>
  );
};

export default Footer;