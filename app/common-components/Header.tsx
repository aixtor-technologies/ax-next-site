"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { MenuItem } from "@/lib/api";

interface HeaderProps {
  menu?: MenuItem[];
}

const Header = ({ menu: menuProp = [] }: HeaderProps) => {
  const pathname = usePathname();
  const menu = menuProp;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= SCROLL EFFECT ================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CLOSE DROPDOWN ON ROUTE CHANGE ================= */

  useEffect(() => {
    document
      .querySelectorAll(".mega_menu.expanded, .expandIcon.show")
      .forEach((el) => el.classList.remove("expanded", "show"));
  }, [pathname]);

  /* ================= HEADER CLASS ================= */

  let headerClass = isScrolled ? "white_bg scrolled" : "white_bg";

  if (pathname === "/") {
    headerClass = isScrolled ? "darkHeader" : "clearHeader";
  }

  if (isSearchBoxVisible) {
    headerClass = "darkHeader";
  }

  /* ================= FUNCTIONS ================= */

  const subMenu = (event: any) => {
    event.preventDefault();

    const subMenuElement = event.currentTarget.nextElementSibling;

    if (subMenuElement) {
      const isExpanded = subMenuElement.classList.contains("expanded");

      document
        .querySelectorAll(".mega_menu.expanded, .expandIcon.show")
        .forEach((el) => el.classList.remove("expanded", "show"));

      if (!isExpanded) {
        subMenuElement.classList.add("expanded");
        event.currentTarget.classList.add("show");
      }
    }
  };

  const closeMobileNavbar = () => {
    document
      .querySelectorAll(".mega_menu.expanded, .expandIcon.show")
      .forEach((el) => el.classList.remove("expanded", "show"));

    setIsMobileMenuOpen(false);
  };

  const toggleSearchBox = () => {
    setSearchQuery("");
    setIsSearchBoxVisible(!isSearchBoxVisible);

    if (window.innerWidth <= 991 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const hideSearchBox = () => setIsSearchBoxVisible(false);

  const mobileTogglebar = () => {
    hideSearchBox();
    setSearchQuery("");
    setIsMobileMenuOpen((prev) => !prev);
  };

  /* ================= RENDER ================= */

  return (
    <header id="header" className={headerClass}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          
          {/* LOGO */}

          <Link className="navbar-brand leftbar-header" href="/">
            <Image
              src="/assets/images/aixtor-logo.svg"
              alt="Aixtor Technologies"
              width={157}
              height={71}
              priority
            />
          </Link>

          {/* MENU */}

          <div className={`centerbar-header ${isMobileMenuOpen ? "show" : ""}`}>
            <ul className="navbar-nav">
              {menu.map((item) => {

                const itemPath =
                  item.url?.replace(/^.*\/\/[^\/]+/, "") || "/";

                const isActive = pathname === itemPath;

                const customClassName = isActive
                  ? "nav-link active"
                  : "nav-link";

                return (
                  <li className="nav-item" key={item.ID}>
                    <Link
                      href={itemPath}
                      className={customClassName}
                      onClick={closeMobileNavbar}
                    >
                      {item.title}
                    </Link>

                    {item.child_items && item.child_items.length > 0 && (
                      <>
                        <div
                          className="expandIcon"
                          onClick={subMenu}
                        ></div>

                        <div className="mega_menu">
                          <div className="inner_mega_menu">
                            <ul>
                              {item.child_items.map((child) => (
                                <li key={child.ID}>
                                  <Link
                                    href={`/${item.slug}/${child.slug}`}
                                    className="nav_item"
                                    onClick={closeMobileNavbar}
                                  >
                                    {child.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}

              {/* CONTACT */}

              <li className="nav-item">
                <Link
                  href="/contact"
                  className="nav-link"
                  onClick={closeMobileNavbar}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* SEARCH + MOBILE */}

          <div className="d-flex align-items-center">
            <div className="globalSearchBar">
              <div className="searchIcon" onClick={toggleSearchBox}>
                <Image
                  src="/assets/images/searchIcon.svg"
                  alt="Search"
                  width={20}
                  height={20}
                />
              </div>

              {isSearchBoxVisible && (
                <div className="SearchBox">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search content"
                  />

                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")}>
                      <Image
                        src="/assets/images/searchClose.svg"
                        width={20}
                        height={20}
                        alt="Close"
                      />
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              className="navbar-toggler"
              onClick={mobileTogglebar}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;