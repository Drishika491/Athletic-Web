import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubAboutUs from '../../../components/SubAboutUs'
import { getCorporateSponsors } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function CorporateSponsors() {
  const [corporateSponsors, setCorporateSponsors] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetChcorporateSponsors = async () => {
    const result = await getCorporateSponsors()
    // console.log(result.data.data)
    setCorporateSponsors(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetChcorporateSponsors()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      {corporateSponsors === null && <Comingsoon />}
      {corporateSponsors !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{corporateSponsors.title === "Corporate Sponsors" ?"Corporate Partners" : corporateSponsors.title}</h2>
          </div>
        </div>

        {corporateSponsors.coverImageUrl && corporateSponsors.coverImageUrl !== "" && corporateSponsors.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${corporateSponsors.coverImageUrl}`} alt='' />
          </div>
        )}

        <div className='max-w-[1240px] mx-auto'>
          <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
            <div className='flex' dangerouslySetInnerHTML={{__html: htmlString}} />
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default CorporateSponsors