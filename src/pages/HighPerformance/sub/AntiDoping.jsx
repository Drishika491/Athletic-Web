import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubHighPerformance from '../../../components/SubHighPerformance'
import { getAntiDoping } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL } from '../../../service/config';
function AntiDoping() {
  const [antiDoping, setantiDoping] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchantiDoping = async () => {
    const result = await getAntiDoping()
    // console.log(result.data.data)
    setantiDoping(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchantiDoping()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubHighPerformance />
      {antiDoping === null && <Comingsoon />}
      {antiDoping !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{antiDoping.title}</h2>
          </div>
        </div>

        {antiDoping.coverImageUrl && antiDoping.coverImageUrl !== "" && antiDoping.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${antiDoping.coverImageUrl}`} alt='' />
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

export default AntiDoping