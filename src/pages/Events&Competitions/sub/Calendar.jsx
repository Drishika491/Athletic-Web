import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import SubEventCompetitions from '../../../components/SubEventCompetitions'
import { getCalendar } from '../../../service/api';
import CalendarTable from '../../../components/CalendarTable';
import ExCalendar from '../../../components/ExCalendar';
import { BASE_URL_ } from '../../../service/config';
function Calendar() {
  // const [calendar, setcalendar] = useState([]);
  // const [htmlString, setHtmlString] = useState('');

  // const fetchcalendar = async () => {
  //   const result = await getCalendar()
  //   console.log(result.data.data)
  //   setcalendar(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }

  // useEffect(() => {
  //   fetchcalendar()
  // }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubEventCompetitions />
      <CalendarTable />
      {/* <ExCalendar /> */}
      {/* {calendar === null && <NotFound />}
      {calendar !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{calendar.title}</h2>
          </div>
        </div>

        <div>
          <img src={BASE_URL_+calendar.coverImageUrl} alt='' />
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

export default Calendar