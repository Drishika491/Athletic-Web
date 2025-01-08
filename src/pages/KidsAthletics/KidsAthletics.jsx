import React, { useEffect, useState } from 'react'
import NotFound from '../../components/NotFound';
import { getKidsAthletics } from '../../service/api';
import SubKA from '../../components/SubKA';
import { BASE_URL } from '../../service/config';
export default function KidsAthletics() {
  const [kidsAthletics, setKidsAthletics] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchKidsAthletics = async () => {
    const result = await getKidsAthletics()
    // console.log(result.data.data)
    setKidsAthletics(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchKidsAthletics()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubKA />
      {kidsAthletics === null && <NotFound />}
      {kidsAthletics !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{kidsAthletics.title}</h2>
          </div>
        </div>

        {kidsAthletics.coverImageUrl && kidsAthletics.coverImageUrl !== "" && kidsAthletics.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${kidsAthletics.coverImageUrl}`} alt='' />
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
