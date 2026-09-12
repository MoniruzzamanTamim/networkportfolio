import React from "react";

import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
import Education from "../../components/Education/Education";
import Experience from "../../components/Experience/Experience";
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import Skills from "../../components/Skill/Skills";
import SkillRoadmap from "../../components/Skill/SkillRoadmap/SkillRoadmap";

const Home = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="skill-roadmap">
        <SkillRoadmap />
      </section>
    </>
  );
};

export default Home;
