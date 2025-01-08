import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubAboutUs from '../../../components/SubAboutUs'
import { getAffiliateMembers } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function AffiliateMembers() {
  const [affiliateMembers, setAffiliateMembers] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchAffiliateMembers = async () => {
    const result = await getAffiliateMembers()
    // console.log(result.data.data)
    setAffiliateMembers(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchAffiliateMembers()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      {affiliateMembers === null && <Comingsoon />}
      {affiliateMembers !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{affiliateMembers.title}</h2>
          </div>
        </div>

        {affiliateMembers.coverImageUrl && affiliateMembers.coverImageUrl !== "" && affiliateMembers.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${affiliateMembers.coverImageUrl}`} alt='' />
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

export default AffiliateMembers