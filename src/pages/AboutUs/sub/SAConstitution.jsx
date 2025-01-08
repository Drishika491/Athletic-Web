import React, { useEffect, useState } from 'react'
import SubAboutUs from '../../../components/SubAboutUs'
import { getSAConstitution } from '../../../service/api';
import NotFound from "../../../components/NotFound";
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function SAConstitution() {
  const [saConstitution, setSAConstitution] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchConstitution = async () => {
    const result = await getSAConstitution()
    // console.log(result.data.data)
    setSAConstitution(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchConstitution()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      {saConstitution === null && <Comingsoon />}
      {saConstitution !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{saConstitution.title}</h2>
          </div>
        </div>

        {saConstitution.coverImageUrl && saConstitution.coverImageUrl !== "" && saConstitution.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${saConstitution.coverImageUrl}`} alt='' />
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

export default SAConstitution