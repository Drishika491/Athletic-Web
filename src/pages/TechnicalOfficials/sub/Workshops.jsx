import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubTechnicalOfficial from '../../../components/SubTechnicalOfficial'
import { getWorkshops } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchWorkshops = async () => {
    const result = await getWorkshops()
    // console.log(result.data.data)
    setWorkshops(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchWorkshops()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubTechnicalOfficial />
      {workshops === null && <Comingsoon />}
      {workshops !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{workshops.title}</h2>
          </div>
        </div>

        {workshops.coverImageUrl && workshops.coverImageUrl !== "" && workshops.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${workshops.coverImageUrl}`} alt='' />
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

export default Workshops