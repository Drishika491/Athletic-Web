import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-secondary text-white">
      <div className="p-5 md:px-8 2xl:px-0 py-5 max-w-[1240px] flex flex-col lg:flex-row mx-auto">
        <div className="flex flex-col space-y-2 w-full">
          <div>SINGAPORE ATHLETIC ASSOCIATION</div>
          <div>3 Stadium Drive, #01-33, Singapore 397630</div>
          <div className="contact flex items-center mb-4">
            <div className="w-8">Tel</div>
            <div>: +65 6386 2721</div>
          </div>
          <div className="contact flex items-center">
            <div className="w-8">Fax</div>
            <div>: +65 6386 7773</div>
          </div>
          <div className="hidden md:block">
            Copyright  {currentYear} Singapore Athletic Association. All Rights Reserved.
          </div>
        </div>
        <div className="w-full flex flex-col mt-5 md:mt-0">
          <div>FOLLOW US:</div>
          <div className="flex items-center space-x-5 my-3">
            <a href="https://www.facebook.com/sporeathletics" target="_blank">
              <div className="p-2 bg-primary rounded-full hover:scale-[1.05] cursor-pointer transition-all">
                <Icon
                  className="h-[2rem] w-auto"
                  icon="ri:facebook-fill"
                  color="white"
                />
              </div>
            </a>
            <a href="https://www.instagram.com/sporeathletics" target="_blank">
              <div className="p-2 bg-primary rounded-full hover:scale-[1.05] cursor-pointer transition-all">
                <Icon
                  className="h-[2rem] w-auto"
                  icon="mdi:instagram"
                  color="white"
                />
              </div>
            </a>
            <a href="https://www.tiktok.com/@sporeathletics" target="_blank">
              <div className="p-2 bg-primary rounded-full hover:scale-[1.05] cursor-pointer transition-all">
                <Icon
                  icon="simple-icons:tiktok" 
                  className="h-[2rem] w-auto" 
                  color="white" 
                />
              </div>
            </a>
            <a href="https://youtube.com/singaporeathletics" target="_blank">
              <div className="p-2 bg-primary rounded-full hover:scale-[1.05] cursor-pointer transition-all">
                <Icon
                  className="h-[2rem] w-auto"
                  icon="carbon:logo-youtube"
                  color="white"
                />
              </div>
            </a>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-5 mt-auto">
            <Link to="/privacy-statement">
              <div className="hover:underline cursor-pointer">
                Privacy Statement
              </div>
            </Link>
            {/* <div className="hover:underline cursor-pointer">Terms of Use</div> */}
            {/* <div className="hover:underline cursor-pointer">Sitemap</div> */}
          </div>
        </div>
        <div className="md:hidden mt-5 md:mt-0">
          Copyright {currentYear} Singapore Athletic Association. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
