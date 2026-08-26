import React, { useEffect, useRef } from "react";
import "./Experience.css";

const Experience = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;

    if (!timeline) return;

    const timelineItems =
      timeline.querySelectorAll(".timeline-item");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay =
              entry.target.getAttribute("data-delay") || "0s";

            entry.target.style.animation = `
              slideInRight
              0.6s
              cubic-bezier(0.4, 0, 0.2, 1)
              forwards
              ${delay}
            `;

            observer.unobserve(entry.target);
          }
        });
      },
      observerOptions
    );

    timelineItems.forEach((item, index) => {
      item.setAttribute(
        "data-delay",
        `${index * 0.15}s`
      );

      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="experience"
      className="experience-section"
    >
      <div className="experience-container">

        {/* Header */}
        <div className="experience-header">
          <span className="experience-label">
            CAREER JOURNEY
          </span>

          <h2 className="experience-title">
            Professional Experience
          </h2>

          <p className="experience-subtitle">
            A track record of maintaining network integrity,
            troubleshooting complex issues, and supporting
            scalable infrastructure.
          </p>
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className="timeline-wrapper"
        >
          <div className="timeline-line"></div>

          {/* Experience 1 */}
          <div className="timeline-item">
            <div className="timeline-marker">
              <span></span>
            </div>

            <div className="timeline-content">

              <span className="timeline-date">
                Feb 2022 - Present
              </span>

              <div className="timeline-role">
                <h3 className="timeline-title">
                  Executive (NOC & Support)
                </h3>

                <h4 className="timeline-company">
                  Xpress Technology Ltd
                </h4>
              </div>

              <p className="timeline-desc">
                Network Administration, diagnosing problems,
                configuring infrastructure, and performing
                Ping/Traceroute diagnostics.
              </p>

              <div className="experience-tags">
                <span>NOC</span>
                <span>Network Administration</span>
                <span>Troubleshooting</span>
              </div>

            </div>
          </div>

          {/* Experience 2 */}
          <div className="timeline-item">
            <div className="timeline-marker">
              <span></span>
            </div>

            <div className="timeline-content">

              <span className="timeline-date">
                Aug 2021 - Dec 2021
              </span>

              <div className="timeline-role">
                <h3 className="timeline-title">
                  Jr. Support Engineer
                </h3>

                <h4 className="timeline-company">
                  TechCare
                </h4>
              </div>

              <p className="timeline-desc">
                Provided client support using AnyDesk and
                TeamViewer while collaborating with the
                network team to resolve technical issues.
              </p>

              <div className="experience-tags">
                <span>Technical Support</span>
                <span>AnyDesk</span>
                <span>TeamViewer</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;