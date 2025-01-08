import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import { getContactUs } from '../../../service/api';
import SubGetInvolved from '../../../components/SubGetInvolved';
import Contact from '../../../components/Contact';
import { BASE_URL,BASE_URL_ } from '../../../service/config';
export default function ContactUs() {
  // const [contactUs, setcontactUs] = useState([]);
  // const [htmlString, setHtmlString] = useState('');

  // const fetchcontactUs = async () => {
  //   const result = await getContactUs()
  //   console.log(result.data.data)
  //   setcontactUs(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }

  // useEffect(() => {
  //   fetchcontactUs()
  // }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubGetInvolved />
      <Contact />
      {/* {contactUs === null && <NotFound />}
      {contactUs !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{contactUs.title}</h2>
          </div>
        </div>

        <div>
          <img src={BASE_URL_+contactUs.coverImageUrl} alt='' />
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
