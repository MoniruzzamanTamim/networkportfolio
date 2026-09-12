import React, { useEffect, useMemo, useState } from "react";
import "./Navbar.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  /*
   * Public navigation links
   */
  const navLinks = useMemo(
    () => [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Experience", href: "#experience" },
      { name: "Education", href: "#education" },
      { name: "Services", href: "#services" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  /*
   * Premium menu items
   */


  /*
   * Detect active section on homepage
   */
  useEffect(() => {
    // Only run section observer on homepage
    if (location.pathname !== "/") {
      return;
    }

    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visibleSection) {
          setActiveLink(`#${visibleSection.target.id}`);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.5],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [navLinks, location.pathname]);

  /*
   * Scroll to homepage section
   */
  const scrollToSection = (href) => {
    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setActiveLink(href);
    }
  };

  /*
   * Handle public navigation links
   */
  const handleNavClick = (event, href) => {
    event.preventDefault();

    setIsOpen(false);
    setPremiumOpen(false);

    /*
     * If already on homepage,
     * simply smooth-scroll.
     */
    if (location.pathname === "/") {
      scrollToSection(href);
      return;
    }

    /*
     * If on another page,
     * first navigate to homepage.
     */
    navigate("/");

    /*
     * Wait for homepage to render,
     * then scroll to requested section.
     */
    setTimeout(() => {
      const section = document.querySelector(href);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setActiveLink(href);
      }
    }, 100);
  };

  /*
   * Handle logo click
   */
  const handleLogoClick = (event) => {
    event.preventDefault();

    setIsOpen(false);
    setPremiumOpen(false);
    setActiveLink("#home");

    if (location.pathname === "/") {
      scrollToSection("#home");
    } else {
      navigate("/");
    }
  };

  /*
   * Handle Login
   */
  const handleLogin = () => {
    setIsOpen(false);
    setPremiumOpen(false);

    navigate("/login");
  };

  /*
   * Handle Logout
   */
  const handleLogout = async () => {
    try {
      await logout();

      setIsOpen(false);
      setPremiumOpen(false);

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /*
   * Handle Premium dropdown item
   */
  const handlePremiumClick = () => {
    setIsOpen(false);
    setPremiumOpen(false);
  };

  /*
   * Toggle mobile menu
   */
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setPremiumOpen(false);
  };

  /*
   * Toggle Premium dropdown on mobile
   */
  const togglePremium = () => {
    setPremiumOpen((prev) => !prev);
  };

  return (
    <nav
      className="portfolio-navbar"
      aria-label="Main Navigation"
    >
      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================== */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={handleLogoClick}
        >
          M.{" "}
          <span className="navbar-logo-accent">
            TAMIM
          </span>
        </a>

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}
        <button
          type="button"
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
              />

              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
              />

              <line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
              />

              <line
                x1="3"
                y1="18"
                x2="21"
                y2="18"
              />
            </svg>
          )}
        </button>

        {/* =========================
            NAVIGATION MENU
        ========================== */}
        <div
          id="navbar-menu"
          className={`navbar-menu ${
            isOpen ? "is-open" : ""
          }`}
        >

          {/* PUBLIC LINKS */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${
                activeLink === link.href
                  ? "active"
                  : ""
              }`}
              onClick={(event) =>
                handleNavClick(event, link.href)
              }
            >
              {link.name}
            </a>
          ))}

          {/* =========================
              PREMIUM MENU
          ========================== */}
          {user && (
            <div
              className={`premium-menu ${
                premiumOpen ? "premium-open" : ""
              }`}
            >
              <Link
                to="/premium"
                className="premium-button"
                onClick={handlePremiumClick}
              >
                Premium
              </Link>

              <button
                type="button"
                className="premium-arrow-button"
                onClick={togglePremium}
                aria-label="Toggle Premium menu"
                aria-expanded={premiumOpen}
              >
                <span
                  className={`premium-arrow ${
                    premiumOpen ? "rotate" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              <div className="premium-dropdown">

                <Link
                  to="/premium/isp-information"
                  onClick={handlePremiumClick}
                >
                  <span className="premium-icon">
                    🌐
                  </span>
                  ISP Information
                </Link>

                <Link
                  to="/premium/network-tools"
                  onClick={handlePremiumClick}
                >
                  <span className="premium-icon">
                    🛠️
                  </span>
                  Network Tools
                </Link>

                <Link
                  to="/premium/speed-test"
                  onClick={handlePremiumClick}
                >
                  <span className="premium-icon">
                    ⚡
                  </span>
                  Speed Test
                </Link>

                <Link
                  to="/premium/bdix-speed-test"
                  onClick={handlePremiumClick}
                >
                  <span className="premium-icon">
                    🚀
                  </span>
                  BDIX Speed Test
                </Link>

                <Link
                  to="/premium/snmp"
                  onClick={handlePremiumClick}
                >
                  <span className="premium-icon">
                    📡
                  </span>
                  SNMP Server
                </Link>

                <Link
                  to="/premium/cacti"
                  onClick={handlePremiumClick}
                >
                  <span className="premium-icon">
                    📊
                  </span>
                  Cacti
                </Link>

              </div>
            </div>
          )}

          {/* =========================
              AUTH BUTTON
          ========================== */}

          {!user ? (
            <button
              type="button"
              className="navbar-login-button"
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <button
              type="button"
              className="navbar-login-button logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;