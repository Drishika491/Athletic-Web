import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TabSidebar from './TabSidebar';
import Profile from './Profile';
import PaymentList from './PaymentList';
import EventParticipants from './EventParticipants';
import ParticipateEvents from './ParticipateEvents';
import EventsProfilePage from './EventsProfilePage';
import { getUserPvid } from '../utils/auth';
import axios from 'axios';
import { config } from '../service/api';
import { BASE_URL } from '../service/config';

function UserProfile() {
  const { activeTab } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('Profile');

  const [userProfile, setUserProfile] = useState([]);
  const userPvid = getUserPvid(); // Get the user's Pvid

  const fetchUserProfile = async () => {
    if (!userPvid) return;

    try {
      const result = await axios.get(BASE_URL+`Api/IdentityUser/GetById?Pvid=${userPvid}`, {
        headers: await config()
      });
      setUserProfile(result.data.data);
      console.log('cek profile', result.data.data)
    } catch (error) {
      console.error('Fetch user profile error:', error);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, [userPvid]);

  // Mengubah nama tab menjadi huruf kecil saat URL berubah
  useEffect(() => {
    const lowerCaseTab = activeTab ? activeTab.toLowerCase() : 'profile';
    setCurrentTab(capitalizeFirstLetter(lowerCaseTab));
  }, [activeTab]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const tabContents = {
    Profile: <div><Profile /></div>,
    Payment: <div><PaymentList /></div>,
    Event: userProfile.userType === 'Athlete' ? <div><ParticipateEvents /></div> : <div><EventParticipants /></div>,
    Events: <div><EventsProfilePage /></div>,
  };

  const handleTabChange = (tab) => {
    const lowerCaseTab = tab.toLowerCase();
    setCurrentTab(capitalizeFirstLetter(lowerCaseTab));
    // Memperbarui URL berdasarkan tab yang dipilih
    navigate(`/account/${lowerCaseTab}`);
  };

  return (
    <div className='lg:flex md:flex'>
      <TabSidebar activeTab={currentTab} setActiveTab={handleTabChange} />
      <div className="flex-1 p-4 lg:p-8 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">{currentTab}</h2>
        {tabContents[currentTab]}
      </div>
    </div>
  );
}

export default UserProfile;
