import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubAboutUs from '../../../components/SubAboutUs'
import { getSecretariatStaff } from '../../../service/api';
import SecretariatStaffComp from '../../../components/SecretariatStaff';
import { BASE_URL_ } from '../../../service/config';
function SecretariatStaff() {
  // const [secretariatStaf, setSecretariatStaf] = useState([]);
  // const [htmlString, setHtmlString] = useState('');

  // const fetchSecretariatStaff = async () => {
  //   const result = await getSecretariatStaff()
  //   // console.log(result.data.data)
  //   setSecretariatStaf(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }

  // useEffect(() => {
  //   fetchSecretariatStaff()
  // }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      <SecretariatStaffComp />
      {/* {secretariatStaf === null && <NotFound />}
      {secretariatStaf !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{secretariatStaf.title}</h2>
          </div>
        </div>

        <div className='w-full'>
          <img className='object-cover w-full' src={BASE_URL_+secretariatStaf.coverImageUrl} alt='' />
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

export default SecretariatStaff