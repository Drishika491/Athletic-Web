import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getListAthlete } from '../service/api';
import { BASE_URL_ } from '../service/config';
function AthleteCards() {
    const [listAthlete, setListAthlete] = useState([]);

    const fetchListAthlete = async () => {
      const result = await getListAthlete()
      // console.log(result.data.data)
      setListAthlete(result.data.data)
    }
  
    useEffect(() => {
      fetchListAthlete()
    }, [])
  return (
    <div className='container my-12 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
        <div className='flex flex-wrap -mx-1 lg:-mx-4'>
            {/* Column */}
            {listAthlete.map((listItem) => ( 
                <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4'>
                {/* Article */}
                <div className='overflow-hidden rounded-lg shadow-lg'>
                    <a href='#'>
                        <img src={BASE_URL_+listItem.coverPhotoUrl} className='block object-cover w-full h-48 max-h-full' />
                    </a>

                    <div className='flex items-center justify-between leading-tight p-2 md:p-4'>
                        <Link to={`/athlete-profile/${listItem.pvid}`} className='flex items-center no-underline text-black'>
                            <img className='block w-12 rounded-full mr-4' src={BASE_URL_+listItem.profilePhotoUrl} />
                            <div className="text-sm">
                                <p className="no-underline hover:underline text-black">{listItem.name}</p>
                                {/* <p className="text-gray-500">Age: 18</p> */}
                            </div>
                        </Link>
                        <p className='text-gray-500 text-sm'>{listItem.gender}</p>
                    </div>
                </div>
                {/* End Column */}
            </div>
             ))}
            
        </div>
    </div>
  )
}

export default AthleteCards