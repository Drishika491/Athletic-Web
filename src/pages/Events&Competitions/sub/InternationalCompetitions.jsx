import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubEventCompetitions from '../../../components/SubEventCompetitions'
import { getInternationalCompetitions } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function InternationalCompetitions() {
  const [internationalCompetitions, setinternationalCompetitions] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchinternationalCompetitions = async () => {
    const result = await getInternationalCompetitions()
    // console.log(result.data.data)
    setinternationalCompetitions(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchinternationalCompetitions()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubEventCompetitions />
      {internationalCompetitions === null && <Comingsoon />}
      {internationalCompetitions !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{internationalCompetitions.title}</h2>
          </div>
        </div>

        {internationalCompetitions.coverImageUrl && internationalCompetitions.coverImageUrl !== "" && internationalCompetitions.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${internationalCompetitions.coverImageUrl}`} alt='' />
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

export default InternationalCompetitions