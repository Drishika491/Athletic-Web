import React, { useEffect, useState } from 'react'
import { getResourceKA } from '../../../service/api';
import SubKA from '../../../components/SubKA';
import NotFound from '../../../components/NotFound';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL } from '../../../service/config';
function ResourcesKA() {
    const [resourceKA, setresourceKA] = useState([]);
    const [htmlString, setHtmlString] = useState('');
  
    const fetchresourceKA = async () => {
      const result = await getResourceKA()
      // console.log(result.data.data)
      setresourceKA(result.data.data)
      setHtmlString(result.data.data.content);
    }
  
    useEffect(() => {
      fetchresourceKA()
    }, [])
  return (
    <div>
        {/* <div className="h-[20px] bg-secondary"></div> */}
        <SubKA />
        {resourceKA === null && <Comingsoon />}
        {resourceKA !== null && (
        <div>
            <div className='pb-5'>
            <div className="border-b-[3px] border-dotted border-primary">
                <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{resourceKA.title}</h2>
            </div>
            </div>

            {resourceKA.coverImageUrl && resourceKA.coverImageUrl !== "" && resourceKA.coverImageUrl !== "null" && (
              <div className='w-full'>
                <img className='object-cover w-full' src={BASE_URL+`${resourceKA.coverImageUrl}`} alt='' />
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

export default ResourcesKA