import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubHighPerformance from '../../../components/SubHighPerformance'
import { getNationalSquad } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL } from '../../../service/config';
function NationalSquad() {
  const [nationalSquad, setnationalSquad] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchnationalSquad = async () => {
    const result = await getNationalSquad()
    // console.log(result.data.data)
    setnationalSquad(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchnationalSquad()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubHighPerformance />
      {nationalSquad === null && <Comingsoon />}
      {nationalSquad !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{nationalSquad.title}</h2>
          </div>
        </div>

        {nationalSquad.coverImageUrl && nationalSquad.coverImageUrl !== "" && nationalSquad.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${nationalSquad.coverImageUrl}`} alt='' />
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

export default NationalSquad