import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubEventCompetitions from '../../../components/SubEventCompetitions'
import { getSAEventsCompetitions } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL } from '../../../service/config';
function SAEventsCompetitions() {
  const [saEvents, setsaEvents] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchsaEvents = async () => {
    const result = await getSAEventsCompetitions()
    // console.log(result.data.data)
    setsaEvents(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchsaEvents()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubEventCompetitions />
      {saEvents === null && <Comingsoon />}
      {saEvents !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{saEvents.title}</h2>
          </div>
        </div>

        {saEvents.coverImageUrl && saEvents.coverImageUrl !== "" && saEvents.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${saEvents.coverImageUrl}`} alt='' />
          </div>
        )}

        <div className='max-w-[1240px] mx-auto'>
          <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
            <div dangerouslySetInnerHTML={{__html: htmlString}} />
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default SAEventsCompetitions