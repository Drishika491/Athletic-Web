import React, { useEffect, useState } from 'react'
import Profile from '../components/Profile'
import ProfileMenu from '../components/ProfileMenu'
import { getUserPvid } from '../utils/auth';
import axios from 'axios';
import { config } from '../service/api';
import { BASE_URL } from '../service/config';

function ProfileAccount() {
  const [userProfile, setUserProfile] = useState([]);
  const userPvid = getUserPvid();

  const fetchUserProfile = async () => {
    if (!userPvid) return;

    try {
      const result = await axios.get(BASE_URL+`Api/IdentityUser/GetById?Pvid=${userPvid}`, {
        headers: await config()
      });
      setUserProfile(result.data.data);
    } catch (error) {
      console.error('Fetch user profile error:', error);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, [userPvid]);
  return (
    <div>
        <div className=''>
            <div className='border-b-[3px] border-dotted border-primary'>
                <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>
                    {userProfile.userType === 'Club' ? 'Club Manager' : userProfile.userType}
                </h2>
            </div>
        </div>
        <div className='lg:flex md:flex'>
            <ProfileMenu />
            <div className='flex-1 p-4 lg:p-8 bg-gray-100'>
                <Profile />
            </div>
        </div>
    </div>
  )
}

export default ProfileAccount