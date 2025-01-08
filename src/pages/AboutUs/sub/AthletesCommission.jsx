import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubAboutUs from '../../../components/SubAboutUs'
import { getAthletesCommision } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function AthletesCommission() {
  const [athletesCommision, setAthletesCommision] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchAthletesCommision = async () => {
    const result = await getAthletesCommision()
    // console.log(result.data.data)
    setAthletesCommision(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchAthletesCommision()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      {athletesCommision === null && <Comingsoon />}
      {athletesCommision !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{athletesCommision.title}</h2>
          </div>
        </div>

        {athletesCommision.coverImageUrl && athletesCommision.coverImageUrl !== "" && athletesCommision.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${athletesCommision.coverImageUrl}`} alt='' />
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

export default AthletesCommission