import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubHighPerformance from '../../../components/SubHighPerformance'
import { getNationalRecords } from '../../../service/api';
import NationalRecords from '../../../components/NationalRecords';
import { BASE_URL } from '../../../service/config';
function NationalRecordsandStatistics() {
  // const [nationalRecords, setnationalRecords] = useState([]);
  // const [htmlString, setHtmlString] = useState('');

  // const fetchnationalRecords = async () => {
  //   const result = await getNationalRecords()
  //   // console.log(result.data.data)
  //   setnationalRecords(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }

  // useEffect(() => {
  //   fetchnationalRecords()
  // }, [])
  return (
    <div>
      <SubHighPerformance />
      {/* {nationalRecords === null && <NotFound />}
      {nationalRecords !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{nationalRecords.title}</h2>
          </div>
        </div>

        {nationalRecords.coverImageUrl && nationalRecords.coverImageUrl !== "" && nationalRecords.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${nationalRecords.coverImageUrl}`} alt='' />
          </div>
        )}

        <div className='max-w-[1240px] mx-auto'>
          <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
            <div dangerouslySetInnerHTML={{__html: htmlString}} />
          </div>
        </div>
      </div>
      )} */}
      <NationalRecords />
    </div>
  )
}

export default NationalRecordsandStatistics