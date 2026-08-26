import React, { useEffect, useRef } from "react";
import "./Education.css";

const Education = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const container = cardsRef.current;

    if (!container) return;

    const cards = container.querySelectorAll(".edu-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target);

            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add("edu-animate");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="education" className="edu-section">
      <div className="edu-container">

        {/* Header */}
        <div className="edu-header">
          <span className="edu-label">EDUCATION & TRAINING</span>

          <h2 className="edu-title">
            Education & Certifications
          </h2>

          <p className="edu-desc">
            Continuous learning in Computer Science and
            specialized IT infrastructure.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="edu-grid">

          {/* Degree 1 */}
          <div className="edu-card degree-card">

            <span className="edu-badge">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>

              Degree
            </span>

            <h3 className="edu-card-title">
              B.Sc. in Engineering
              <br />
              Computer Science & Engineering
            </h3>

            <p className="edu-card-org">
              Canadian University of Bangladesh
            </p>

            <p className="edu-card-meta">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>

              CGPA: 3.5/4
            </p>
          </div>

          {/* Degree 2 */}
          <div className="edu-card degree-card">

            <span className="edu-badge">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>

              Degree
            </span>

            <h3 className="edu-card-title">
              Diploma in Engineering, Computer Science & Technology
            </h3>

            <p className="edu-card-org">
              TMSS Polytechnic Institute, Rangpur
            </p>

            <p className="edu-card-meta">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>

              CGPA: 3.7/4
            </p>
          </div>

          {/* Training 1 */}
          <div className="edu-card training-card">

            <span className="edu-badge training-badge">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>

              Key Training
            </span>

            <h3 className="edu-card-title">
              RHEL Administrator & Server Management
            </h3>

            <p className="edu-card-org">
              Nehra Classes (Online)
            </p>

            <p className="edu-card-meta">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>

              2024
            </p>
          </div>

          {/* Training 2 */}
          <div className="edu-card training-card">

            <span className="edu-badge training-badge">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>

              Key Training
            </span>

            <h3 className="edu-card-title">
              Full Stack Web Development
            </h3>

            <p className="edu-card-org">
              Shikbe Sobai
            </p>

            <p className="edu-card-meta">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>

              2021
            </p>
          </div>

          {/* Training 3 */}
          <div className="edu-card training-card">

            <span className="edu-badge training-badge">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>

              Key Training
            </span>

            <h3 className="edu-card-title">
              CCNA 201-300
            </h3>

            <p className="edu-card-org">
              New Trizons IT, Dhaka
            </p>

            <p className="edu-card-meta">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>

              2021
            </p>
          </div>

          {/* Training 4 */}
          <div className="edu-card training-card">

            <span className="edu-badge training-badge">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>

              Key Training
            </span>

            <h3 className="edu-card-title">
              MikroTik MTCNA & MTCRE
            </h3>

            <p className="edu-card-org">
              New Trizons IT, Dhaka
            </p>

            <p className="edu-card-meta">
              <svg
                className="edu-svg-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>

              2021
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
