import React, { useEffect, useState } from "react";
import Artikel from "../../components/Artikel";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import Subscribe from "../../components/Subscribe";
import About from "../../components/About";
import SubAboutUs from "../../components/SubAboutUs";

function AboutUs() {

  return (
    <div>
      {/* <Navigation /> */}
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      <About />
      {/* <Subscribe /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default AboutUs;