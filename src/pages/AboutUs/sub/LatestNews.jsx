import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubAboutUs from '../../../components/SubAboutUs'
import { getLatestNews } from '../../../service/api';
import LatestNewsCard from '../../../components/LatestNewsCard';
import { BASE_URL } from '../../../service/config';
function LatestNews() {
  // const [latestNews, setLatestNews] = useState([]);
  // const [htmlString, setHtmlString] = useState('');

  // const fetchLatestNews = async () => {
  //   const result = await getLatestNews()
  //   console.log(result.data.data)
  //   setLatestNews(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }

  // useEffect(() => {
  //   fetchLatestNews()
  // }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      {/* <SubAboutUs /> */}
      <LatestNewsCard />
      {/* {latestNews === null && <NotFound />}
      {latestNews !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{latestNews.title}</h2>
          </div>
        </div>

        <div>
          <img src={BASE_URL+latestNews.coverImageUrl} alt='' />
        </div>

        <div className='max-w-[1240px] mx-auto'>
          <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
            <div dangerouslySetInnerHTML={{__html: htmlString}} />
          </div>
        </div>
      </div>
      )} */}
    </div>
  )
}

export default LatestNews