import React, { useEffect, useRef } from "react";
import "./Skills.css";

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animatedElements = section.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="skills-section">
      <div className="skills-container">
        
        {/* Header */}
        <div className="skills-header animate-on-scroll" style={{ "--i": 1 }}>
          <span className="skills-label">TECHNICAL SKILLS</span>
          <h2 className="skills-title">Technical Arsenal</h2>
          <p className="skills-description">
            Proficient in managing enterprise networks, routing protocols, Linux servers, and web technologies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">

          {/* 1. Routing & Switching */}
          <div className="skill-card animate-on-scroll" style={{ "--i": 2 }}>
            <div className="card-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="16" y="16" width="6" height="6" rx="1" />
                <rect x="2" y="16" width="6" height="6" rx="1" />
                <rect x="9" y="2" width="6" height="6" rx="1" />
                <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
                <path d="M12 12V8" />
              </svg>
            </div>
            <h3 className="card-title">Routing & Switching</h3>
            <ul className="skill-tags">
              <li className="tag">OSPF</li>
              <li className="tag">BGP</li>
              <li className="tag">EIGRP</li>
              <li className="tag">RIPv1/v2</li>
              <li className="tag">VLAN & Trunking</li>
              <li className="tag">STP / PVSTP</li>
              <li className="tag">EtherChannel (LACP)</li>
              <li className="tag">Subnetting</li>
            </ul>
          </div>

          {/* 2. MikroTik, Security & VPN */}
          <div className="skill-card animate-on-scroll" style={{ "--i": 3 }}>
            <div className="card-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                <path d="M12 11v3" />
              </svg>
            </div>
            <h3 className="card-title">MikroTik, Security & VPN</h3>
            <ul className="skill-tags">
              <li className="tag">Load Balancing & Failover</li>
              <li className="tag">Firewall (Filter, Layer7, DoS)</li>
              <li className="tag">NAT / PAT & ACL</li>
              <li className="tag">IPsec & PPTP VPN</li>
              <li className="tag">IPIP / GRE / PPP</li>
              <li className="tag">DHCP & PPPoE</li>
              <li className="tag">Queue Management</li>
            </ul>
          </div>

          {/* 3. Server Administration */}
          <div className="skill-card animate-on-scroll" style={{ "--i": 4 }}>
            <div className="card-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="8" rx="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
            <h3 className="card-title">Server Administration</h3>
            <ul className="skill-tags">
              <li className="tag">RHEL</li>
              <li className="tag">AlmaLinux</li>
              <li className="tag">DNS & Mail Server</li>
              <li className="tag">Proxy & Web Server</li>
              <li className="tag">SELinux & Hardening</li>
              <li className="tag">File & Database Server</li>
            </ul>
          </div>

          {/* 4. Monitoring & Hardware Diagnostics */}
          <div className="skill-card animate-on-scroll" style={{ "--i": 5 }}>
            <div className="card-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="card-title">Monitoring & Hardware</h3>
            <ul className="skill-tags">
              <li className="tag">Ping & Traceroute</li>
              <li className="tag">Network Diagnostics</li>
              <li className="tag">CCTV (DVR / NVR)</li>
              <li className="tag">Access Control Systems</li>
              <li className="tag">BIOS & System Maintenance</li>
              <li className="tag">Printers & Scanners</li>
            </ul>
          </div>

          {/* 5. Web Design & SEO */}
          <div className="skill-card animate-on-scroll" style={{ "--i": 6 }}>
            <div className="card-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3 className="card-title">Web & Specialization</h3>
            <ul className="skill-tags">
              <li className="tag">React JS</li>
              <li className="tag">JavaScript</li>
              <li className="tag">HTML5 & CSS3</li>
              <li className="tag">Bootstrap 5</li>
              <li className="tag">PHP & WordPress</li>
              <li className="tag">SEO</li>
            </ul>
          </div>

        </div>

        {/* Certifications & Training */}
        <div className="certifications-banner animate-on-scroll" style={{ "--i": 7 }}>
          <div className="cert-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          </div>

          <div className="cert-content">
            <h3 className="cert-title">Official Training & Certifications</h3>
            <div className="cert-tags">
              <span className="cert-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                CCNA (201-300)
              </span>

              <span className="cert-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                MikroTik MTCNA
              </span>

              <span className="cert-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                MikroTik MTCRE
              </span>

              <span className="cert-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                RHEL Server Admin
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;