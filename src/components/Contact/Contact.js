import React, { useState, useRef } from "react";
import "./Contact.css";
import EmailjsForm from './EmailJsForm';


const Contact = () => {
  

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* Header */}
        <div className="contact-header">
          <span className="contact-label">
            CONTACT
          </span>

          <h2 className="contact-title">
            Get In Touch
          </h2>

          <p className="contact-description">
            Available for network engineering roles, NOC
            support, and technical consultations.
          </p>
        </div>

        <div className="contact-content">

          {/* =====================
              LEFT: CONTACT FORM
          ====================== */}

         <div className="contact-form-column">
      {/* আপনার Form এখানে রেন্ডার হবে */}
      <EmailjsForm />
    </div>

          {/* =====================
              RIGHT COLUMN
          ====================== */}

          <div className="contact-info-column">
            <div className="contact-card">

              {/* Contact Information */}
              <div className="info-section">

                <h3 className="info-heading">
                  Contact Info
                </h3>

                <ul className="info-list">

                  {/* Phone */}
                  <li className="info-item">
                    <div className="info-icon-wrapper">
                      <svg
                        className="info-icon"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>

                    <div className="info-content">
                      <span className="info-label">
                        Phone
                      </span>

                      <a
                        href="tel:01739820399"
                        className="info-value"
                      >
                        01739820399
                      </a>
                    </div>
                  </li>

                  {/* Email */}
                  <li className="info-item">
                    <div className="info-icon-wrapper">
                      <svg
                        className="info-icon"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />

                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>

                    <div className="info-content">
                      <span className="info-label">
                        Email
                      </span>

                      <a
                        href="mailto:tamimiqbal896@gmail.com"
                        className="info-value"
                      >
                        tamimiqbal896@gmail.com
                      </a>
                    </div>
                  </li>

                  {/* Location */}
                  <li className="info-item">
                    <div className="info-icon-wrapper">
                      <svg
                        className="info-icon"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />

                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                        />
                      </svg>
                    </div>

                    <div className="info-content">
                      <span className="info-label">
                        Location
                      </span>

                      <span className="info-value">
                        7 No Elephant Road,
                        Dhaka-1207
                      </span>
                    </div>
                  </li>

                </ul>
              </div>

              <div className="divider"></div>

              {/* References */}
              <div className="info-section">

                <h3 className="info-heading">
                  References
                </h3>

                <p className="reference-text">
                  Professional references are available
                  upon request from the following
                  institutions:
                </p>

                <ul className="reference-list">

                  <li className="reference-item">
                    <svg
                      className="reference-icon"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />

                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>

                    <span className="reference-name">
                      Canadian University of Bangladesh
                    </span>
                  </li>

                  <li className="reference-item">
                    <svg
                      className="reference-icon"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />

                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>

                    <span className="reference-name">
                      New Trizons IT
                    </span>
                  </li>

                  <li className="reference-item">
                    <svg
                      className="reference-icon"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />

                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>

                    <span className="reference-name">
                      X-press Technologies Ltd.
                    </span>
                  </li>

                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
