// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { getSponsor } from "../../src/service/api";
import { BASE_URL_ } from '../service/config';
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Sponsors
import Polar from "../assets/sponsors/polar.png";
import Aveeno from "../assets/sponsors/aveeno.png";
import Johnsons from "../assets/sponsors/johnsons.png";
import People from "../assets/sponsors/people.png";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { useEffect, useState } from "react";
import run from "../service/hmac";

export default function SponsorCarousel() {
  const [sponsor, setSponsor] = useState([]);

  const fetchSponsor = async () => {
    const result = await getSponsor('main')
    // console.log('data API Sponsor', result.data)
    setSponsor(result.data.data)
  }
  useEffect(() => {
    fetchSponsor()
  }, [])
  return (
    <Swiper
      // install Swiper modules
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      effect={"fade"}
      fadeEffect={{
        crossFade: true,
      }}
      slidesPerView={1}
      grabCursor={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      className="w-[80px] xl:w-[150px] flex"
    >
      {/* Maping menu from API */}
      {sponsor.map(sponsor => (
      <SwiperSlide className="w-auto" key={sponsor.pvid}>
        <a href={sponsor.websiteUrl} target="_blank">
          <img className="h-[1.5rem] md:h-[2.5rem] w-auto" src={BASE_URL_+sponsor.logoUrl} alt="" />
        </a>
      </SwiperSlide>              
      ))}
      {/* <SwiperSlide className="w-fit" key={sponsor.data}>
        <img className="h-[1.5rem] md:h-[2.5rem] w-fit" src={Polar} alt="" />
      </SwiperSlide>
      <SwiperSlide className="w-fit">
        <img className="h-[1.5rem] md:h-[2.5rem] w-fit" src={Aveeno} alt="" />
      </SwiperSlide>
      <SwiperSlide className="w-fit">
        <img className="h-[1.5rem] md:h-[2.5rem] w-fit" src={Johnsons} alt="" />
      </SwiperSlide>
      <SwiperSlide className="w-fit">
        <img className="h-[1.5rem] md:h-[2.5rem] w-fit" src={People} alt="" />
      </SwiperSlide> */}
    </Swiper>
  );
}

// setInterval(() => {
//   localStorage.removeItem('xauth'),
//   getCookie('xauth')
//   run('GET')
// }, 60000);
// localStorage.removeItem('xauth')
// run('GET')
