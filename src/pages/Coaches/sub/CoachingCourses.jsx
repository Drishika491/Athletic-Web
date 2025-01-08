import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubChoaches from '../../../components/SubChoaches'
import { getCoachingCourses } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function CoachingCourses() {
  const [coachingCourses, setcoachingCourses] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchcoachingCourses = async () => {
    const result = await getCoachingCourses()
    // console.log(result.data.data)
    setcoachingCourses(result.data.data)
    setHtmlString(result.data.data.content);
  }

  useEffect(() => {
    fetchcoachingCourses()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubChoaches />
      {coachingCourses === null && <Comingsoon />}
      {coachingCourses !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{coachingCourses.title}</h2>
          </div>
        </div>

        {coachingCourses.coverImageUrl && coachingCourses.coverImageUrl !== "" && coachingCourses.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${coachingCourses.coverImageUrl}`} alt='' />
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

export default CoachingCourses