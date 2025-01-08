import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubAboutUs from '../../../components/SubAboutUs'
import { getGettingSAOffice } from '../../../service/api';
import SAOffice from '../../../components/SAOffice';
import { BASE_URL } from '../../../service/config';
function GettingtoSAOffice() {
  // const [saOffice, setSAOffice] = useState([]);
  // const [htmlString, setHtmlString] = useState('');

  // const fetchSAOffice = async () => {
  //   const result = await getGettingSAOffice()
  //   console.log(result.data.data)
  //   setSAOffice(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }

  // useEffect(() => {
  //   fetchSAOffice()
  // }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      <SAOffice />
      {/* {saOffice === null && <NotFound />}
      {saOffice !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{saOffice.title}</h2>
          </div>
        </div>

        <div>
          <img src={BASE_URL+saOffice.coverImageUrl} alt='' />
        </div>

        <div className='max-w-[1240px] mx-auto'>
          <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
            <div dangerouslySetInnerHTML={{__html: htmlString}} />
          </div>
        </div>
      </div>
      )} */}
    </div>
  )
}

export default GettingtoSAOffice