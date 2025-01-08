import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubHighPerformance from '../../../components/SubHighPerformance'
import { getCompetitors, getDTEHome } from '../../../service/api';
import "../../../index.css";
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL } from '../../../service/config';
function CompetitorsCorner() {
  const [competitors, setCompetitors] = useState([]);
  const [htmlString, setHtmlString] = useState('');
// console.log('competitors???',competitors);

  const fetchCompetitors = async () => {
    const result = await getCompetitors()
    // console.log(result.data.data)
    setCompetitors(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchCompetitors()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubHighPerformance />
      {competitors === null && <Comingsoon />}
      {competitors !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{competitors.title}</h2>
          </div>
        </div>

        {competitors.coverImageUrl && competitors.coverImageUrl !== "" && competitors.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL+`${competitors.coverImageUrl}`} alt='' />
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

export default CompetitorsCorner