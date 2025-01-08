import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubHighPerformance from '../../../components/SubHighPerformance'
import { getAthleteInformation } from '../../../service/api';
import AthleteTable from '../../../components/AthleteTable';

function AthleteInformation() {
  // const [athleteInfo, setathleteInfo] = useState([]);
  // const [htmlString, setHtmlString] = useState('');

  // const fetchathleteInfo = async () => {
  //   const result = await getAthleteInformation()
  //   console.log(result.data.data)
  //   setathleteInfo(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }

  // useEffect(() => {
  //   fetchathleteInfo()
  // }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubHighPerformance />
      <AthleteTable />
      {/* {athleteInfo === null && <NotFound />}
      {athleteInfo !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{athleteInfo.title}</h2>
          </div>
        </div>

        <div>
          <img src={'BASE_URL+athleteInfo.coverImageUrl} alt='' />
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

export default AthleteInformation