import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubTechnicalOfficial from '../../../components/SubTechnicalOfficial'
import { getSATechnicalOfficial } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function SATechnicalOfficialRegistry() {
  const [officialRegistry, setOfficialRegistry] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchOfficialRegistry = async () => {
    const result = await getSATechnicalOfficial();
    // console.log(result.data.data)
    setOfficialRegistry(result.data.data);
    if (result.data.data && (result.data.data.content === null || result.data.data.content === "<div></div>" || result.data.data.content === "<div>&nbsp;</div>")) {
      setHtmlString(null);
    } else {
      setHtmlString(result.data.data.content);
    }
  }

  useEffect(() => {
    fetchOfficialRegistry()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubTechnicalOfficial />
      {htmlString === null && <Comingsoon />}
      {htmlString !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{officialRegistry.title}</h2>
          </div>
        </div>

        {officialRegistry.coverImageUrl && officialRegistry.coverImageUrl !== "" && officialRegistry.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${officialRegistry.coverImageUrl}`} alt='' />
          </div>
        )}

        <div className='max-w-[1240px] mx-auto'>
          <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
            {htmlString !== null && <div dangerouslySetInnerHTML={{__html: htmlString}} />}
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default SATechnicalOfficialRegistry