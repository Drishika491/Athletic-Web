import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubHighPerformance from '../../../components/SubHighPerformance'
import { getRegionalTC } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL } from '../../../service/config';
function RegionalTrainingCentre() {
  const [regionalTC, setregionalTC] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchregionalTC = async () => {
    const result = await getRegionalTC()
    // console.log(result.data.data)
    setregionalTC(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchregionalTC()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubHighPerformance />
      {regionalTC === null && <Comingsoon />}
      {regionalTC !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{regionalTC.title}</h2>
          </div>
        </div>

        {regionalTC.coverImageUrl && regionalTC.coverImageUrl !== "" && regionalTC.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${regionalTC.coverImageUrl}`} alt='' />
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

export default RegionalTrainingCentre