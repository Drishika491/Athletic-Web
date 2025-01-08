import React, { useEffect, useState } from 'react'
import ProfileMenu from '../components/ProfileMenu'
import EventsProfilePage from '../components/EventsProfilePage'
import { getUserPvid } from '../utils/auth';
import { config } from '../service/api';
import ParticipateEvents from '../components/ParticipateEvents';
import axios from 'axios';

function EventProfile() {
  const userType = localStorage.getItem('userType');
  return (
    <div>
        <div className=''>
            <div className='border-b-[3px] border-dotted border-primary'>
                <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>
                  {userType === 'Club' ? 'Club Manager' : userType}
                </h2>
            </div>
        </div>
        <div className='lg:flex md:flex'>
            <ProfileMenu />
            <div className='flex-1 p-4 lg:p-8 bg-gray-100'>
                {userType === 'Athlete' ? <ParticipateEvents /> : <EventsProfilePage />}
            </div>
        </div>
    </div>
  )
}

export default EventProfile