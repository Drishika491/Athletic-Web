import React, { useEffect, useState } from 'react'
import { getSAAffiliation } from '../../../service/api';
import SubGetInvolved from '../../../components/SubGetInvolved';
import NotFound from '../../../components/NotFound';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL } from '../../../service/config';
function SAAffiliationApplication() {
    const [saaAffiliation, setsaaAffiliation] = useState([]);
    const [htmlString, setHtmlString] = useState('');
  
    const fetchsaaAffiliation = async () => {
      const result = await getSAAffiliation()
      // console.log(result.data.data)
      setsaaAffiliation(result.data.data)
      setHtmlString(result.data.data.content);
    }
  
    useEffect(() => {
      fetchsaaAffiliation()
    }, [])
    return (
      <div>
        {/* <div className="h-[20px] bg-secondary"></div> */}
        <SubGetInvolved />
        {saaAffiliation === null && <Comingsoon />}
        {saaAffiliation !== null && (
        <div>
          <div className='pb-5'>
            <div className="border-b-[3px] border-dotted border-primary">
              <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{saaAffiliation.title}</h2>
            </div>
          </div>
  
          {saaAffiliation.coverImageUrl && saaAffiliation.coverImageUrl !== "" && saaAffiliation.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${saaAffiliation.coverImageUrl}`} alt='' />
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

export default SAAffiliationApplication