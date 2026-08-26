import React from "react";
import Layout from "./components/layout/Layout";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skill/Skills";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Services from "./components/Services/Services";
// import SpeedTest from './components/Services/SpeedTest/SpeedTest';
// import PacketTracerGallery from "./components/Services/packetTracerProjects/PacketTracerGallery";

function App() {
  return (
    <>
     <Layout>
      
        <section id="about">
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
        <section id="certifications">
          <Education/>
        </section>
        <section id="services">
          <Services/>
        </section>
        <section id="contact">
          <Contact/>
        </section>
      </Layout>
    </>
  );
}

export default App;
