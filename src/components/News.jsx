import React, { useEffect, useRef, useState } from "react";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { getArticle, getCategories } from "../../src/service/api";
import moment from 'moment';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

function News() {
  const [article, setArticle] = useState([]);

  const fetchNews = async () => {
    const result = await getArticle();
    // const filteredData = result.data.data.filter(item => item.articleCategory.name !== "EVENT")
    // .slice(0, 12);
    setArticle(result.data.data);
    console.log('cek news', result.data.data);
  };
  useEffect(() => {
    fetchNews()
  }, [])

  const newsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="pb-5 md:pb-12">
      <div className="py-1 md:py-2 font-semibold bg-secondary text-white">
        <div className="px-5 md:px-8 2xl:px-0 max-w-[1240px] mx-auto">
          LATEST NEWS
        </div>
      </div>
      <div className="">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          slidesPerGroup={1}
          loop={false}
          navigation={{
            nextEl: '.review-swiper-button-next',
            prevEl: '.review-swiper-button-prev',
          }}
          // navigation
          grabCursor={true}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          className="max-w-[1240px] px-11 xl:px-0 mt-5 hidden md:block"
        >
          {/* <SwiperSlide> */}
            <div className="max-w-[1240px] mx-auto">
              {/* Maping News from API */}
              
              {article.map(article => (
                <SwiperSlide key={article.pvid} className="ss">
                  <div>
                    <div className="pb-1 border-b-[3px] border-dotted border-secondary">
                      <span className="text-primary font-semibold">
                        {article.articleCategory.name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                      </span>{" "}
                      | <span>{moment(article.publishDate).format('DD MMM YYYY')}</span>
                    </div>
                    <Link to={`/latest-news/${article.articleKey}`}>
                      <div className="text-[1.5rem] text-limit-2">
                        {article.title}
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          {/* </SwiperSlide>             */}
        </Swiper>
        <div className="">
          <div className="swiper-button-prev review-swiper-button-prev lg:top-[870px] md:top-[860px] max-sm:hidden"></div>
          <div className="swiper-button-next review-swiper-button-next lg:top-[870px] md:top-[860px] max-sm:hidden"></div>
        </div>

        {/* Mobile */}
        <Swiper
          ref={newsRef}
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          loop={false}
          grabCursor={true}
          // onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={(e) => setCurrentIndex(e.realIndex)}
          className="p-5 md:hidden mobile-slider"
        >
          {article.map(article => (
            <SwiperSlide key={article.pvid}>
              <div className="pb-5">
                <div className="pb-1 border-b-[3px] border-dotted border-secondary">
                  <span className="text-primary font-semibold">
                    {article.articleCategory.name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                  </span>{" "}
                  | <span>{moment(article.publishDate).format('DD MMM YYYY')}</span>
                </div>
                <Link to={`/latest-news/${article.articleKey}`}>
                  <div>
                    {article.title}
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="md:hidden px-5 flex space-x-2">
          {Array(4)
            .fill('null')
            .map((x, index) => {
              return (
                <div
                  onClick={() => newsRef.current.swiper.slideTo(index)}
                  className={`w-full h-[3px] ${
                    index === currentIndex ? "bg-secondary" : "bg-gray-300"
                  }`}
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default News;
