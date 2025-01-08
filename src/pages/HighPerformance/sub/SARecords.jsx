import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubHighPerformance from '../../../components/SubHighPerformance'
import { getSARecords } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';

function SARecords() {
  const [saRecords, setSaRecords] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchSaRecords = async () => {
    const result = await getSARecords()
    // console.log(result.data.data)
    setSaRecords(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchSaRecords()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubHighPerformance />
      {saRecords === null && <Comingsoon />}
      {saRecords !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{saRecords.title}</h2>
          </div>
        </div>

        {saRecords.coverImageUrl && saRecords.coverImageUrl !== "" && saRecords.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={`https://api.singaporeathletics.org.sg${saRecords.coverImageUrl}`} alt='' />
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

export default SARecords