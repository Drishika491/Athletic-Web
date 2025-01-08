// import Swiper core and required modules
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BannerImage from "../assets/banner.jpg";
import { getBanner, getCategories } from "../../src/service/api";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageNotFound from '../assets/not-found.png';
import { BASE_URL_ } from "../service/config";
export default function Banner() {

  const [banner, setBanner] = useState([]);
  // const [categories, setCategories] = useState([]);

  const fetchBanner = async () => {
    const result = await getBanner();
    // Menyaring artikel dengan kategori "EVENT" dan menyimpan artikel non-"EVENT" dalam variabel baru
    // const filteredData = result.data.data.filter(item => item.articleCategory.name !== "EVENT")
    // .slice(0, 4);
    setBanner(result.data.data);
    console.log('cek banner', result.data.data);
  };  
  
  useEffect(() => {
      fetchBanner()
  }, [])

  const swiperRef = useRef(null);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayStop, setAutoplayStop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
    <div className="relative">
      <Swiper
        ref={swiperRef}
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
          delay: 18000,
        }}
        onAutoplayTimeLeft={(e) => {
          var time = e.autoplay.timeLeft;
          var totalDuration = 18000;
          var elapsedTime = totalDuration - time;
          var progress = Math.floor((elapsedTime / totalDuration) * 100);
          setCurrentPercentage(progress);
        }}
        onAutoplayStop={() => setAutoplayStop(true)}
        onSlideChange={(e) => setActiveIndex(e.realIndex)}
      >
        {/* {Array(1) */}
          {/* .fill(null) */}
          {/* .map((x) => { */}
            {/* return ( */}
            {banner.map((bannerItem) => (
              <SwiperSlide key={bannerItem.pvid}>
                <div className="relative h-64 md:h-[540px] lg:h-[600px] max-h-[600px]">
                  <div>
                    <img
                      className="object-scale-down max-h-screen w-full zoom-in"
                      src={isLoading ? ImageNotFound : BASE_URL_+`${bannerItem.imageCoverUrl}`}
                      alt=""
                      onLoad={() => setIsLoading(false)}
                    />
                    <div className="max-w-[1240px] mx-auto">
                      <div
                        className="absolute left-0 top-0 w-full h-full z-[5]"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 40% , rgba(0,0,0,0.8)",
                        }}
                      ></div>
                      <div className="absolute z-[999] bottom-[8%] p-5 xl:p-0">
                        <div className="text-pink-200 hidden md:block text-[1.5rem] font-semibold">
                          {bannerItem.articleCategory.name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                        </div>
                        <Link to={`/latest-news/${bannerItem.articleKey}`}>
                          <div className="mt-1 text-white text-[1.3rem] md:text-[2rem] text-limit-2 font-semibold lg:text-[2.5rem] md:max-w-[100%] md:border-t-[4px] border-secondary border-dotted">
                            {bannerItem.title.split(" ").map((word, index) => (
                              <>
                                {index > 0 && index % 7 === 0 && <br />}
                                {word}{" "}
                              </>
                            ))}
                          </div>
                          <div className="text-gray-300 md:block">
                            Read More...
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {/* ); */}
          {/* })} */}
      </Swiper>
      <div className="absolute bottom-[5%] w-full xl:w-[1240px] left-[50%] translate-x-[-50%] z-[999] text-white flex space-x-2 md:space-x-5 px-5 xl:px-0">
        {Array(4)
          .fill(null)
          ?.map((x, index) => {
            return (
              <div
                onClick={() => swiperRef.current?.swiper.slideTo(index)}
                className={`${
                  autoplayStop && activeIndex === index
                    ? "bg-secondary"
                    : "bg-gray-300"
                } w-full h-[2px] md:h-[5px] relative cursor-pointer`}
              >
                <div
                  style={{
                    width: `${
                      activeIndex === index ? `${currentPercentage}%` : "0%"
                    }`,
                  }}
                  className="absolute left-0 bg-secondary h-full transition-all"
                ></div>
              </div>
            );
          })}
      </div>
    </div>
    </>
  );
}
