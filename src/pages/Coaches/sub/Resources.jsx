import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubChoaches from '../../../components/SubChoaches'
import { getCoachesResources } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function ResourcesCoaches() {
  const [resources, setresources] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchresources = async () => {
    const result = await getCoachesResources()
    // console.log(result.data.data)
    setresources(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchresources()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubChoaches />
      {resources === null && <Comingsoon />}
      {resources !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{resources.title}</h2>
          </div>
        </div>

        {resources.coverImageUrl && resources.coverImageUrl !== "" && resources.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${resources.coverImageUrl}`} alt='' />
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

export default ResourcesCoaches