import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubHighPerformance from '../../../components/SubHighPerformance'
import { getSAOctc } from '../../../service/api';
import "../../../index.css";
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL } from '../../../service/config';
function SAOCTC() {
  const [saOCTC, setsaOCTC] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchsaOCTC = async () => {
    const result = await getSAOctc()
    // console.log(result.data.data)
    setsaOCTC(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchsaOCTC()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubHighPerformance />
      {saOCTC === null && <Comingsoon />}
      {saOCTC !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{saOCTC.title}</h2>
          </div>
        </div>

        {saOCTC.coverImageUrl && saOCTC.coverImageUrl !== "" && saOCTC.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${saOCTC.coverImageUrl}`} alt='' />
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

export default SAOCTC