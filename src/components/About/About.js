import React, { useEffect, useRef } from "react";
import "./About.css";

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const fadeElements = section.querySelectorAll(".fade-element");

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
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
      }
    );

    fadeElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
    >
      <div className="about-container">

        <h2 className="about-heading fade-element delay-1">About Me</h2>

        <div className="about-description fade-element delay-2">
          <p>
            Hi, I&apos;m <span className="text-highlight">MD. Moniruzzaman Tamim</span>.
            Welcome to my portfolio website. I am a Network &amp; Systems Engineer
            and NOC Executive based in Dhaka, Bangladesh, passionate about
            designing, securing, and maintaining robust IT infrastructures.
          </p>

          <p>
            I have always had a strong passion for computer systems, Linux, and
            networking. I completed my <span className="text-highlight">B.Sc. in
            Computer Science &amp; Engineering</span> at Canadian University of
            Bangladesh alongside a Diploma in Engineering at TMSS Polytechnic.
            I have over 4 years of hands-on experience specializing in
            RHEL-based environments, network security, routing &amp; switching,
            and infrastructure optimization.
          </p>

          <p>
            My career has focused on Network Operations Center environments and
            Enterprise Infrastructure. I work with enterprise routing such as
            OSPF, BGP, and EIGRP, MikroTik load balancing and failover, VPN
            setup, and Linux server administration including RHEL, AlmaLinux,
            DNS, Mail Server, and SELinux.
          </p>

          <p>
            I combine technical proficiency with <span className="text-highlight">
            CCNA, MTCNA, and MTCRE certifications</span> to deliver reliable
            and secure network solutions. Outside of my professional work, I
            enjoy learning emerging web technologies, researching tech
            insights, testing configurations, and continuously developing my
            skills.
          </p>

          <p>
            Thank you for taking the time to learn more about my background.
            Feel free to explore my portfolio and reach out. I look forward to
            connecting with you!
          </p>
        </div>

        <div className="keywords-wrapper fade-element delay-3">
          <span className="keyword-badge">
            Network Technology
          </span>

          <span className="keyword-badge">
            Security Configurations
          </span>

          <span className="keyword-badge">
            Server Administration
          </span>

          <span className="keyword-badge">
            System Reliability
          </span>
        </div>

      </div>
    </section>
  );
};

export default About;