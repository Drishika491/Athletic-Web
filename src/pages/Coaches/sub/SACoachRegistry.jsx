import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound';
import SubChoaches from '../../../components/SubChoaches'
import { getSACoachRegistry } from '../../../service/api';
import Comingsoon from '../../../components/Comingsoon';
import { BASE_URL_ } from '../../../service/config';
function SACoachRegistry() {
  const [coachRegistry, setcoachRegistry] = useState([]);
  const [htmlString, setHtmlString] = useState('');

  const fetchcoachRegistry = async () => {
    const result = await getSACoachRegistry();
    // console.log(result.data.data)
    setcoachRegistry(result.data.data);
    if (result.data.data && (result.data.data.content === null || result.data.data.content === "<div></div>" || result.data.data.content === "<div>&nbsp;</div>")) {
      setHtmlString(null);
    } else {
      setHtmlString(result.data.data.content);
    }
  }

  useEffect(() => {
    fetchcoachRegistry()
  }, [])
  return (
    <div>
      {/* <div className="h-[20px] bg-secondary"></div> */}
      <SubChoaches />
      {coachRegistry === null && <Comingsoon />}
      {coachRegistry !== null && (
      <div>
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{coachRegistry.title}</h2>
          </div>
        </div>

        {coachRegistry.coverImageUrl && coachRegistry.coverImageUrl !== "" && coachRegistry.coverImageUrl !== "null" && (
          <div className='w-full'>
            <img className='object-cover w-full' src={BASE_URL_+`${coachRegistry.coverImageUrl}`} alt='' />
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

export default SACoachRegistry

// import React, { useEffect, useState } from 'react'
// import NotFound from '../../../components/NotFound';
// import SubChoaches from '../../../components/SubChoaches'
// import { getSACoachRegistry } from '../../../service/api';
// import Comingsoon from '../../../components/Comingsoon';
// import { BASE_URL_ } from '../../../service/config';

// function SACoachRegistry() {
//   const [coachRegistry, setcoachRegistry] = useState([]);
//   const [htmlString, setHtmlString] = useState('');

//   const fetchcoachRegistry = async () => {
//     const result = await getSACoachRegistry();
//     setcoachRegistry(result.data.data);
//     if (result.data.data && (result.data.data.content === null || result.data.data.content === "<div></div>" || result.data.data.content === "<div>&nbsp;</div>")) {
//       setHtmlString(null);
//     } else {
//       setHtmlString(result.data.data.content);
//     }
//   }

//   useEffect(() => {
//     fetchcoachRegistry()
//   }, [])
//   return (
//     <div>
//       {/* <div className="h-[20px] bg-secondary"></div> */}
//       <SubChoaches />
//       {htmlString === null && <Comingsoon />}
//       {htmlString !== null && (
//       <div>
//         <div className='pb-5'>
//           <div className="border-b-[3px] border-dotted border-primary">
//             <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[3rem] font-semibold lg:text-[1.5rem]'>{coachRegistry.title}</h2>
//           </div>
//         </div>

//         {coachRegistry.coverImageUrl && coachRegistry.coverImageUrl !== "" && coachRegistry.coverImageUrl !== "null" && (
//           <div className='w-full'>
//             <img className='object-cover w-full' src={BASE_URL_+`${coachRegistry.coverImageUrl}`} alt='' />
//           </div>
//         )}

//         <div className='max-w-[1240px] mx-auto'>
//           <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
//             {htmlString !== null && <div dangerouslySetInnerHTML={{__html: htmlString}} />}
//           </div>
//         </div>
//       </div>
//       )}
//     </div>
//   )
// }

// export default SACoachRegistry