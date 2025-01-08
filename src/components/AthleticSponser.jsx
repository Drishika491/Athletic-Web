import React, { useEffect, useState } from "react";
import ImageSidebar1 from "../assets/img-sidebar-1.jpg";
import ImageSidebar2 from "../assets/img-sidebar-2.jpg";
import ImageSidebar3 from "../assets/img-sidebar-3.jpg";
import FacebookPage from "./FacebookPage";
import { config, getSponsor } from "../service/api";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageNotFound from "../assets/not-found.png";
import { BASE_URL, BASE_URL_ } from "../service/config";
import img1 from "../assets/sponsors_new_images/1.png";
import img2 from "../assets/sponsors_new_images/2.png";
import img3 from "../assets/sponsors_new_images/3.png";
import img4 from "../assets/sponsors_new_images/4.png";
import img5 from "../assets/sponsors_new_images/5.png";
import img6 from "../assets/sponsors_new_images/6.png";
import img7 from "../assets/sponsors_new_images/7.png";
import img8 from "../assets/sponsors_new_images/8.png";
import img9 from "../assets/sponsors_new_images/9.png";
import img10 from "../assets/sponsors_new_images/10.png";
import img11 from "../assets/sponsors_new_images/11.png";
import img12 from "../assets/sponsors_new_images/12.png";
import img13 from "../assets/sponsors_new_images/13.png";
import img14 from "../assets/sponsors_new_images/14.png";
import Marquee from "react-fast-marquee";
import "../components/AthleticSponser.css";

function AthleticSponser() {
  const [upEvent, setUpEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [footerSponsor, setFooterSponsor] = useState([]);
  const [sponsor, setSponsor] = useState([]);
  const [sportSponsor, setSportSponsor] = useState([]);

  const fetchFooterSponsor = async () => {
    const result = await getSponsor('footerSponsor');
    
    setFooterSponsor(result.data.data);
  };
  const fetchSponsor = async () => {
    const result = await getSponsor('sub');
    // console.log('data API Sponsor', result.data)
    setSponsor(result.data.data);
  };
  const fetchSportSponsor = async () => {
    const result = await getSponsor('sports');
    // console.log('data API Sponsor', result.data)
    setSportSponsor(result.data.data);
  };
  useEffect(() => {
    fetchSponsor();
    fetchSportSponsor();
    fetchFooterSponsor();
  }, []);
  const containerStyle = {
    // Add your styles here
    margin: "auto",
    // Add more styles as needed
  };
  return (
    <div>
      <div className="container" style={containerStyle}>
        <div>
          <ul class="sponsors-list">
          {footerSponsor.map((sponsor) => (
            <li>
              <a
                className="sponsors-nav__link"
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                <div className="responsive-image responsive-image--transparent">
                  <div className="responsive-image__preload-ref">
                    <img
                       src={BASE_URL_ + sponsor.logoUrl}
                      alt="nike footer 600x200"
                      className="blur-up false lazyloaded ls-is-cached main-image"
                    />
                  </div>
                </div>
              </a>
            </li>
          ))}
            {/* <li className="sponsors-nav__item">
              <a
                className="sponsors-nav__link"
                href="https://www.newbalance.com.sg"
                target="_blank"
                rel="noreferrer"
              >
                <div className="responsive-image responsive-image--transparent">
                  <div className="responsive-image__preload-ref">
                    <img
                      src={img2}
                      alt="bingx footer 600x200"
                      className="blur-up false lazyloaded ls-is-cached main-image"
                    />
                  </div>
                </div>
              </a>
            </li> */}
          </ul>
        </div>
        <div className="sponsors-block__sponsors sponsors-block__sponsors--secondary">
            <ul className="sponsors-nav">
              {sponsor.map((sponsor) => (
                <li className="sponsors-nav__item sub-item">
                  <a
                    className="sponsors-nav__link"
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="responsive-image responsive-image--transparent">
                      <div className="responsive-image__preload-ref">
                        <img
                          src={BASE_URL_ + sponsor.logoUrl}
                          alt="singha footer 600x200"
                          className="blur-up false lazyloaded ls-is-cached sub-image"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
              {/* <li className="sponsors-nav__item sub-item">
            <a
              className="sponsors-nav__link"
              href="https://www.posb.com.sg/personal/default.page"
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src={img11}
                    alt="cadbury footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached sub-image"
                  />
                </div>
              </div>
            </a>
          </li>
              <li className="sponsors-nav__item sub-item">
            <a
              className="sponsors-nav__link"
              href="https://www.pocarisweat.com.sg"
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src={img3}
                    alt="cadbury footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached sub-image"
                  />
                </div>
              </div>
            </a>
          </li>
          <li className="sponsors-nav__item sub-item">
            <a
              className="sponsors-nav__link"
              href="https://www.distinctcreativearts.com.sg/ "
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src={img4}
                    alt="cadbury footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached sub-image"
                  />
                </div>
              </div>
            </a>
          </li>
          <li className="sponsors-nav__item sub-item">
            <a
              className="sponsors-nav__link"
              href="https://www.sri.sg/ "
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src={img5}
                    alt="easports footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached sub-image"
                  />
                </div>
              </div>
            </a>
          </li>
          <li className="sponsors-nav__item sub-item">
            <a
              className="sponsors-nav__link"
              href="https://www.kintecktong.com.sg/ "
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src={img6}
                    alt="infinite athlete header 500x167"
                    className="blur-up false lazyloaded ls-is-cached sub-image"
                  />
                </div>
              </div>
            </a>
          </li>
          <li className="sponsors-nav__item sub-item">
            <a
              className="sponsors-nav__link"
              href="https://onesports.sg/"
              target="_blank"
              rel="noreferrer"
            >
                 <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src={img7}
                    alt="msc footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached sub-image"
                  />
                </div>
              </div>
            </a>
          </li>
          <li className="sponsors-nav__item sub-item">
            <a
              className="sponsors-nav__link"
              href="https://sundayshades.co/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src={img8}
                    alt="singha footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached sub-image"
                  />
                </div>
              </div>
            </a>
          </li>
          <li className="sponsors-nav__item sub-item">
            <a
              className="sponsors-nav__link"
              href="https://starbalm.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src={img9}
                    alt="singha footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached sub-image"
                  />
                </div>
              </div>
            </a>
          </li>
          <li className="sponsors-nav__item sub-item">
            <a
              className="sponsors-nav__link"
              href="https://weareready.sg/collections/sg-athletics"
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src={img10}
                    alt="singha footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached sub-image"
                  />
                </div>
              </div>
            </a>
          </li> */}

              {/* <li className="sponsors-nav__item">
            <a
              className="sponsors-nav__link"
              href="https://www.suredeodorant.co.uk/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src="https://img.chelseafc.com/image/upload/f_auto,c_pad,h_88,w_264,q_90/Partner%20Logos%202022/Low%20Resolution%20(Small%20File%20Size)/Sure.png"
                    alt="Sure"
                    className="blur-up false lazyloaded ls-is-cached"
                  />
                </div>
              </div>
            </a>
          </li>
          <li className="sponsors-nav__item">
            <a
              className="sponsors-nav__link"
              href="https://www.thestjames.com/chelsea-fc"
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src="https://img.chelseafc.com/image/upload/f_auto,c_pad,h_88,w_264,q_90/logos/sponsors/footer-logos/stjames_footer_600x200.png"
                    alt="stjames footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached"
                  />
                </div>
              </div>
            </a>
          </li>
          <li className="sponsors-nav__item">
            <a
              className="sponsors-nav__link"
              href="http://www.three.co.uk/chelseafc?id=WH_21"
              target="_blank"
              rel="noreferrer"
            >
              <div className="responsive-image responsive-image--transparent">
                <div className="responsive-image__preload-ref">
                  <img
                    src="https://img.chelseafc.com/image/upload/f_auto,c_pad,h_88,w_264,q_90/logos/sponsors/footer-logos/three_footer_600x200.png"
                    alt="three footer 600x200"
                    className="blur-up false lazyloaded ls-is-cached"
                  />
                </div>
              </div>
            </a>
          </li> */}
            </ul>
        </div>
        <div>
        <h3 className="mt-5 mb-5 text-[1rem] md:text-[1.3rem] lg:text-[2rem] text-center">Partners in Sport</h3>
          <ul className="sponsors-nav mb-20-gap">
          {sportSponsor.map((sponsor) => (
                <li className="sponsors-nav__item partner-item">
                  <a
                    className="sponsors-nav__link"
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="responsive-image responsive-image--transparent">
                      <div className="responsive-image__preload-ref">
                        <img
                          src={BASE_URL_ + sponsor.logoUrl}
                          alt="singha footer 600x200"
                          className="blur-up false lazyloaded ls-is-cached sub-image"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            {/* <li className="sponsors-nav__item.am-st">
              <a
                className="sponsors-nav__link"
                href="https://www.singaporeolympics.com/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="responsive-image responsive-image--transparent">
                  <div className="responsive-image__preload-ref">
                    <img
                      src={img14}
                      alt="nike footer 600x200"
                      className="blur-up false lazyloaded ls-is-cached sub-image"
                    />
                  </div>
                </div>
              </a>
            </li>
            <li className="sponsors-nav__item.am-st">
              <a
                className="sponsors-nav__link"
                href="https://www.sportsingapore.gov.sg/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="responsive-image responsive-image--transparent">
                  <div className="responsive-image__preload-ref">
                    <img
                      src={img13}
                      alt="bingx footer 600x200"
                      className="blur-up false lazyloaded ls-is-cached sub-image"
                    />
                  </div>
                </div>
              </a>
            </li>
            <li className="sponsors-nav__item.am-st">
              <a
                className="sponsors-nav__link"
                href="https://www.singaporemarathon.com/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="responsive-image responsive-image--transparent">
                  <div className="responsive-image__preload-ref">
                    <img
                      src={img12}
                      alt="bingx footer 600x200"
                      className="blur-up false lazyloaded ls-is-cached sub-image"
                    />
                  </div>
                </div>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AthleticSponser;
