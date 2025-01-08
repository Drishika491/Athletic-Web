import React, { useEffect, useState } from 'react'
import NotFound from '../../components/NotFound';
import { getGetInvolved } from '../../service/api';
import SubGetInvolved from '../../components/SubGetInvolved';
import { BASE_URL } from '../../service/config';
export default function GetInvolved() {
  const [getInvolved, setGetInvolved] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchGetInvolved = async () => {
    const result = await getGetInvolved()
    // console.log(result.data.data)
    setGetInvolved(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchGetInvolved()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubGetInvolved />
      {getInvolved === null && <NotFound />}
      {getInvolved !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{getInvolved.title}</h2>
          </div>
        </div>

        {getInvolved.coverImageUrl && getInvolved.coverImageUrl !== "" && getInvolved.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${getInvolved.coverImageUrl}`} alt='' />
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
