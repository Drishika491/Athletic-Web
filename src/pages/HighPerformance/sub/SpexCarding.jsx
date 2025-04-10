import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubHighPerformance from '../../../components/SubHighPerformance'
import { getSpexCarding } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL } from '../../../service/config';
function SpexCarding() {
  const [spexCarding, setspexCarding] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  // const fetchspexCarding = async () => {
  //   const result = await getSpexCarding()
  //   // console.log(result.data.data)
  //   setspexCarding(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }
  const fetchspexCarding = async () => {
    const result = await getSpexCarding();
    let content = result.data.data.content;
    //  Trim everything BEFORE the first <table>
    const tableStart = content.toLowerCase().indexOf('<table');
    if (tableStart !== -1) {
      content = content.substring(tableStart);
    }
    // Trim everything AFTER "FAQ"
    const faqIndex = content.toLowerCase().indexOf('faq');
    if (faqIndex !== -1) {
      content = content.substring(0, faqIndex);
    }
    setspexCarding(result.data.data);
    setHtmlString(content);
  };

  useEffect(() => {
    fetchspexCarding()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubHighPerformance />
      {spexCarding === null && <Comingsoon />}
      {spexCarding !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{spexCarding.title}</h2>
          </div>
        </div>

        {spexCarding.coverImageUrl && spexCarding.coverImageUrl !== "" && spexCarding.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${spexCarding.coverImageUrl}`} alt='' />
          </div>
        )}

        <div className='max-w-[1240px] mx-auto'>
        <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem] '>
            {/* <div dangerouslySetInnerHTML={{__html: htmlString}} /> */}
            <div className="rendered-html" dangerouslySetInnerHTML={{ __html: htmlString }} />
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default SpexCarding