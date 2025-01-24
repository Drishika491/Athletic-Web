import React, { useEffect, useState } from 'react'
import SubmitParticipant from '../components/SubmitParticipant'
import ProfileMenu from '../components/ProfileMenu'
import { getUserPvid } from '../utils/auth';
import axios from 'axios';
import { config } from '../service/api';
import ManageAthleteTable from '../components/ManageAthleteTable';
import ManageAthleteList from './ManageAthleteList';

function ManageAthProfile() {
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
                <ManageAthleteList />
                
            </div>
        </div>
    </div>
  )
}

export default ManageAthProfile