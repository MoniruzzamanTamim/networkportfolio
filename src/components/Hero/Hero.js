import "./Hero.css";

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">

        <div className="hero-content">
          <div className="hero-badge">
            <span className="status-dot"></span>
           Available for Network Engineering Roles / NOC Support
          </div>

          <h1 className="hero-title">
            MD. Moniruzzaman Tamim
          </h1>

          <h2 className="hero-subtitle">
            Network & Systems Engineer{" "}
            <span>|</span> NOC Executive
          </h2>

          <p className="hero-description">
            Over 4 years of experience specializing in RHEL-based
            environments, network security, and optimizing infrastructure
            for maximum reliability.
          </p>

          <div className="hero-skills">
            <span>Network Security</span>
            <span>RHEL</span>
            <span>Routing & Switching</span>
            <span>NOC</span>
            <span>Infrastructure</span>
          </div>

          <div className="hero-actions">
            <a
              href="https://s3.amazonaws.com/media-prod.butternut.ai/website_images/resume-image-upload/1787480745.431419_ISPCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Download Resume
            </a>

            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-visual">

          <div className="hero-glow"></div>

          <div className="hero-image-wrapper">
            <img
              src="https://s3.amazonaws.com/media-prod.butternut.ai/website_images/portfolio/09bd95ff-f598-41af-9f39-1a41bfb2dfe4.webp"
              alt="MD. Moniruzzaman Tamim"
              className="hero-image"
            />

            <div className="experience-card">
              <span>Experience</span>
              <strong>4+ Years</strong>
            </div>

            <div className="network-card">
              <div className="network-icon">
                <span></span>
              </div>

              <div>
                <small>Network Status</small>
                <strong>All Systems Operational</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;