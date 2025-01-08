import React, { useEffect, useState } from 'react'
import SubAboutUs from '../../../components/SubAboutUs'
import { getMission, getVision } from '../../../service/api';
import NotFound from "../../../components/NotFound";
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function MissionStatement() {
  const [missionStatement, setmissionStatement] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchMission = async () => {
    const result = await getMission();
    if (result.data.data.coverImageUrl) {
      setmissionStatement(result.data.data);
      setHtmlString(result.data.data.content);
    }
  };  

  const [visionStatement, setvisionStatement] = useState([]);
  const [htmlStringVision, setHtmlStringVision] = useState('');

  // const fetchVision = async () => {
  //   const result = await getVision()
  //   // console.log(result.data.data)
  //   setvisionStatement(result.data.data)
  //   setHtmlString(result.data.data.content);
  // }

  useEffect(() => {
    fetchMission()
    // fetchVision()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubAboutUs />
      {missionStatement === null && <Comingsoon />}
      {missionStatement !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>Mission and Vision</h2>
          </div>
        </div>

        {missionStatement.coverImageUrl && missionStatement.coverImageUrl !== "" && missionStatement.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${missionStatement.coverImageUrl}`} alt='Mission Statement' />
          </div>
        )}

        <div className='max-w-[1240px] mx-auto'>
          <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
            <div dangerouslySetInnerHTML={{__html: htmlString}} />
          </div>
        </div>
      </div>
      )}

      {/* {visionStatement === null && <NotFound />}
      {visionStatement !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{visionStatement.title}</h2>
          </div>
        </div>

        <div className='w-full'>
          <img className='object-cover w-full' src={BASE_URL_+visionStatement.coverImageUrl} alt='' />
        </div>

        <div className='max-w-[1240px] mx-auto'>
          <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
            <div dangerouslySetInnerHTML={{__html: htmlStringVision}} />
          </div>
        </div>
      </div>
      )} */}
    </div>
  )
}

export default MissionStatement