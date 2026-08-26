import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveLink(`#${visibleSection.target.id}`);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (event, href) => {
    event.preventDefault();
    setActiveLink(href);
    setIsOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="portfolio-navbar" aria-label="Main Navigation">
      <div className="navbar-container">

        {/* Logo */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={(event) => handleLinkClick(event, "#home")}
        >
          M. <span className="navbar-logo-accent">TAMIM</span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            // Close Icon
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Menu Icon
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Navigation */}
        <div
          id="navbar-menu"
          className={`navbar-menu ${isOpen ? "is-open" : ""}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${activeLink === link.href ? "active" : ""}`}
              onClick={(event) => handleLinkClick(event, link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>

      </div>
      
    </nav>
  );
};

export default Navbar;
