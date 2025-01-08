import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
// import MySwiper from "../components/MySwiper";
import Navigation from "../components/Navigation";
import News from "../components/News";
import Subscribe from "../components/Subscribe";
import run from "../service/hmac";
import UpcomingEvents from "../components/UpcomingEvents";
import AthleticSponser from "../components/AthleticSponser";
function Home() {
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <Banner />
      <News />
      <UpcomingEvents />
      <AthleticSponser/>
      
      {/* <MySwiper /> */}
      {/* <Subscribe /> */}
      {/* <Footer /> */}
    </div>
  );
}
// run()

export default Home;
