import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubAboutUs from '../../../components/SubAboutUs'
import { getPolicies } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function Policies() {
  const [policies, setPolicies] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchPolicies = async () => {
    const result = await getPolicies()
    // console.log(result.data.data)
    setPolicies(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchPolicies()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      {policies === null && <Comingsoon />}
      {policies !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{policies.title}</h2>
          </div>
        </div>

        {policies.coverImageUrl && policies.coverImageUrl !== "" && policies.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${policies.coverImageUrl}`} alt='' />
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

export default Policies