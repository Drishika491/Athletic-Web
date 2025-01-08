import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubAboutUs from '../../../components/SubAboutUs'
import { getAnnualGeneralMeeting } from '../../../service/api';
import AnnualGeneralMeetingCard from '../../../components/AnnualGeneralMeetingCard';
import { BASE_URL_ } from '../../../service/config';
function AnnualGeneralMeeting() {
  // const [generalMeeting, setGeneralMeeting] = useState([]);
  // const [htmlString, setHtmlString] = useState('');

  // const fetchGeneralMeeting = async () => {
  //   const result = await getAnnualGeneralMeeting()
  //   console.log(result.data.data)
  //   setGeneralMeeting(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }

  // useEffect(() => {
  //   fetchGeneralMeeting()
  // }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      <AnnualGeneralMeetingCard />
      {/* {generalMeeting === null && <NotFound />}
      {generalMeeting !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{generalMeeting.title}</h2>
          </div>
        </div>

        <div>
          <img src={BASE_URL_+generalMeeting.coverImageUrl} alt='' />
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

export default AnnualGeneralMeeting