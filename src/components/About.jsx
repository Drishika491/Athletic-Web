import React, { useEffect, useState } from 'react'
import AboutUsImage from '../assets/about-us.jpg'
import MissionImage from '../assets/mission.jpg'
import VisionImage from '../assets/vission.jpg'
import { getAboutUs, getMission, getVision } from '../service/api';
import "../index.css";
import { BASE_URL, BASE_URL_ } from '../service/config';
function About() {
  const [aboutUs, setAboutUs] = useState([]);

  const fetchAboutUs = async () => {
    const result = await getAboutUs()
    // console.log(result.data.data)
    setAboutUs(result.data.data)
    setHtmlStringAbout(result.data.data.content);
  }

  useEffect(() => {
    fetchAboutUs()
  }, [])

  const [htmlStringAbout, setHtmlStringAbout] = useState('');
  return (
    <div>
        {/* About Us */}
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{aboutUs.title}</h2>
          </div>
        </div>

        {aboutUs.coverImageUrl && aboutUs.coverImageUrl !== "" && aboutUs.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${aboutUs.coverImageUrl}`} alt='' />
          </div>
        )}

        <div className='max-w-[1240px] mx-auto'>
          <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
            <div dangerouslySetInnerHTML={{__html: htmlStringAbout}} />
          </div>
        </div>
    </div>
  )
}

export default About