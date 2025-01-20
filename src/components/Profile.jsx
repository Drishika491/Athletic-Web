import React, { useEffect, useState } from 'react'
import { config, configPOST, configPOSTFormData } from '../service/api';
import axios from 'axios';
import { getUserPvid } from '../utils/auth';
import moment from 'moment';
import { BASE_URL } from '../service/config';
function Profile() {
  const [userProfile, setUserProfile] = useState([]);
  const [detailProfile, setDetailProfile]= useState([]);
  const [detailProfileClub, setDetailProfileClub]= useState([]);
  const [listClub, setListClub] = useState([]);
  const userPvid = getUserPvid(); // Get the user's Pvid
  const [isEditingClub, setIsEditingClub] = useState(false);
  const [newClub, setNewClub] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false); // New state for success message
  const [submitError, setSubmitError] = useState(null);
  const [editing, isEditing] = useState(true);
  const fetchUserProfile = async (userPvid) => {
    try {
      if (!userPvid) return;
  
      const result = await axios.get(BASE_URL+`Api/IdentityUser/GetById?Pvid=${userPvid}`, {
        headers: await config()
      });
  
      const { data } = result.data;
      // Save userProfile.userType and referencePvid to localStorage
      localStorage.setItem('userType', data.userType);
      localStorage.setItem('referencePvid', data.referencePvid);
  
      return data;
    } catch (error) {
      console.error('Fetch user profile error:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  };
  
  const fetchDetailProfile = async (referencePvid) => {
    try {
      const result = await axios.get(BASE_URL+`Api/AthleteProfile/GetById?Pvid=${referencePvid}`, {
        headers: await config()
      });
      const { data } = result.data;
      console.log("data: ", data);
      
      localStorage.setItem('clubPvid', data.clubPvid);
      return data;
    } catch (error) {
      console.error('Fetch detail profile error:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  };
  
  const fetchDetailProfileClub = async (referencePvid) => {
    try {
      const result = await axios.get(BASE_URL+`Api/Club/GetById?Pvid=${referencePvid}`, {
        headers: await config()
      });
      return result.data.data;
    } catch (error) {
      console.error('Fetch detail profile club error:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  };


  const updateProfile = async () => {
    try {
      console.log("detailProfile: ", detailProfile.pvid);
      
      const result = await axios.post(BASE_URL+`Api/AthleteProfile/EditById/${detailProfile.pvid}`,{
        Code: detailProfile.code,
        UniqueCode: detailProfile.uniqueCode,
        Name: detailProfile.name,
        BirthPlace: detailProfile.birthPlace,
        BirthDate: detailProfile.birthDate,
        Gender : detailProfile.gender,
        CountryPvid: detailProfile.countryPvid,
        ProfilePhotoUrl: detailProfile.profilePhotoUrl,
        ClubPvid: detailProfile.clubPvid,
        Coach: detailProfile.coach,
        IsActive: detailProfile.isActive,
        IsPublish: detailProfile.isPublish,
        Profile:detailProfile.profilePhotoUrl
      }, {
        headers: await config()
      });
      console.log("result: ", result);
      
      return result.data.data;
    } catch (error) {
      console.error('Fetch detail profile club error:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  };
  
  const fetchListClub = async () => {
    try {
      const result = await axios.get(BASE_URL+'Api/Club/GetList', {
        headers: await config()
      });
      return result.data.data;
    } catch (error) {
      console.error('Fetch club list error:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  };

  const handleChange = (name, value) => {
    console.log(name, value);
    
    setDetailProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = await fetchUserProfile(userPvid);
        if (userProfileData) {
          const detailProfileData = await fetchDetailProfile(userProfileData.referencePvid);
          const detailProfileClubData = await fetchDetailProfileClub(userProfileData.referencePvid);
          const clubListData = await fetchListClub();
          
          // Update states with fetched data
          setUserProfile(userProfileData);
          setDetailProfile(detailProfileData);
          setDetailProfileClub(detailProfileClubData);
          setListClub(clubListData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error, e.g., show a message to the user
      }
    };
  
    fetchData();
  }, [userPvid]);  
  const handleEditClub = () => {
    setIsEditingClub(true);
  }
  const handleCancelEdit = () => {
    setIsEditingClub(false);
  }
  const handleClubChange = (event) => {
    setNewClub(event.target.value);
  }
  const handleClubSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Construct the request payload
      const updatedProfileData = {
        Pvid: userProfile.referencePvid,
        Code: detailProfile.code,
        UniqueCode: detailProfile.uniqueCode,
        Name: detailProfile.name,
        BirthPlace: detailProfile.birthPlace,
        BirthDate: detailProfile.birthDate,
        Gender: detailProfile.gender,
        CoverPhotoUrl: detailProfile.coverPhotoUrl,
        ProfilePhotoUrl: detailProfile.profilePhotoUrl,
        CountryPvid: detailProfile.countryPvid,
        DisciplinePvids: detailProfile.disciplines,
        IsActive: detailProfile.isActive,
        ClubPvid: listClub.find(club => club.name === newClub)?.pvid || detailProfile.clubPvid, // Use the pvid of the selected club, or the existing club's pvid
        Coach: detailProfile.coach,
        IsPublish: detailProfile.isPublish
      };
  
      // Make a PUT request to update the athlete profile
      const updateResult = await axios.post(
        BASE_URL+'Api/AthleteProfile/UpdatePublic',
        updatedProfileData,
        { headers: await configPOSTFormData() }
      );
  
      console.log('Update Profile Result:', updateResult.data);
  
      // Update the local state with the new club
      setDetailProfile({
        ...detailProfile,
        club: newClub
      });
      // Set success message
      setSubmitSuccess(true);
      setSubmitError(null);
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating club:', error);
      // Set error message
      setSubmitSuccess(false);
      setSubmitError('Error updating club. Please try again.');
      // Hide error message after 3 seconds
      setTimeout(() => {
        setSubmitError(null);
      }, 3000);
    }
  
    // Revert to non-editing mode
    setIsEditingClub(false);
  }  
  
  return (
    <div>
      <div className='py-2'>
        <h2 className='text-1xl text-gray-700 font-semibold uppercase'>Account</h2>
      </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <tbody>
              <tr className="focus-within:bg-gray-200 overflow-hidden">
                <td className="border-t">
                  <span className="text-gray-700 px-6 py-3 flex items-center">User Type</span>
                </td>
                <td className="border-t">
                  <span className="text-gray-700 px-6 py-3 flex items-center">{userProfile.userType}</span>
                </td>
              </tr>
              <tr className="focus-within:bg-gray-200 overflow-hidden">
                <td className="border-t">
                  <span className="text-gray-700 px-6 py-3 flex items-center">Email</span>
                </td>
                <td className="border-t">
                  <span className="text-gray-700 px-6 py-3 flex items-center">{userProfile.email}</span>
                </td>
              </tr>
              {/* <tr className="focus-within:bg-gray-200 overflow-hidden">
                <td className="border-t">
                  <span className="text-gray-700 px-6 py-3 flex items-center">Phone Number</span>
                </td>
                <td className="border-t">
                  <span className="text-gray-700 px-6 py-3 flex items-center">{userProfile.phoneNumber}</span>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div className='py-2 mt-12'>
          <h2 className='text-1xl text-gray-700 font-semibold uppercase'>Profile</h2>
        </div>
        {userProfile.userType !== 'Athlete' && detailProfileClub && (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
              <tbody>
                <tr className="focus-within:bg-gray-200 overflow-hidden">
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">Name</span>
                  </td>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">{detailProfileClub.name}</span>
                  </td>
                </tr>
                <tr className="focus-within:bg-gray-200 overflow-hidden">
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">Unique Code</span>
                  </td>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">{detailProfileClub.uniqueCode}</span>
                  </td>
                </tr>
                <tr className="focus-within:bg-gray-200 overflow-hidden">
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">Phone Number</span>
                  </td>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">{detailProfileClub.phone}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {userProfile.userType !== 'Club' && detailProfile && (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
              <tbody>
              <tr className="focus-within:bg-gray-200 overflow-hidden">
    <td className="border-t">
      <span className="text-gray-700 px-6 py-3 flex items-center">Name</span>
    </td>
    <td className="border-t">
      <div className="text-gray-700 px-6 py-3 flex items-center">
        {editing ? (
          <input
            type="text"
            value={detailProfile.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-gray-700 px-2 py-2 flex items-center bg-gray-100 rounded w-full"
          />
        ) : (
          <span>{detailProfile.name}</span>
        )}
      </div>
    </td>
  </tr>
               {/* Unique Code Field */}
  <tr className="focus-within:bg-gray-200 overflow-hidden">
    <td className="border-t">
      <span className="text-gray-700 px-6 py-3 flex items-center">Unique Code</span>
    </td>
    <td className="border-t">
      <div className="text-gray-700 px-6 py-3 flex items-center">
        {editing ? (
          <input
            type="text"
            value={detailProfile.uniqueCode || ""}
            onChange={(e) => handleChange("uniqueCode", e.target.value)}
            className="text-gray-700 px-2 py-2 flex items-center bg-gray-100 rounded w-full"
          />
        ) : (
          <span>{detailProfile.uniqueCode}</span>
        )}
      </div>
    </td>
  </tr>
               {/* Gender Field */}
  <tr className="focus-within:bg-gray-200 overflow-hidden">
    <td className="border-t">
      <span className="text-gray-700 px-6 py-3 flex items-center">Gender</span>
    </td>
    <td className="border-t">
      <div className="text-gray-700 px-6 py-3 flex items-center">
        {editing ? (
          <select
            value={detailProfile.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="text-gray-700 px-2 py-2 flex items-center bg-gray-100 rounded w-full"
          >
            <option value="">Select Gender</option>
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <span>{detailProfile.gender}</span>
        )}
      </div>
    </td>
  </tr>

   {/* Birth Date Field */}
   <tr className="focus-within:bg-gray-200 overflow-hidden">
    <td className="border-t">
      <span className="text-gray-700 px-6 py-3 flex items-center">Birth Date</span>
    </td>
    <td className="border-t">
      <div className="text-gray-700 px-6 py-3 flex items-center">
        {editing ? (
          <input
            type="date"
            value={moment(detailProfile.birthDate).format("YYYY-MM-DD")}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            className="text-gray-700 px-2 py-2 flex items-center bg-gray-100 rounded w-full"
          />
        ) : (
          <span>{moment(detailProfile.birthDate).format("DD MMM YYYY")}</span>
        )}
      </div>
    </td>
  </tr>
                <tr className="focus-within:bg-gray-200 overflow-hidden">
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">Club</span>
                  </td>
                  <td className="border-t">
                  {isEditingClub ? (
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      <select value={newClub} onChange={handleClubChange} className="text-gray-700 px-2 py-2 flex items-center bg-gray-100 rounded">
                        {listClub.map((club) => (
                          <option key={club.pvid} value={club.name}>
                            {club.name}
                          </option>
                        ))}
                      </select>
                    </span>
                  ) : (
                    <span className="text-gray-700 px-6 py-3 flex items-center">{detailProfile.club}</span>
                  )}
                  </td>
                  <td className="border-t">
                    {isEditingClub ? (
                      <span className="text-gray-700 px-6 py-3 items-center">
                        <button type="submit" onClick={handleClubSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
                          Submit
                        </button>
                        <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <span className="text-gray-700 px-6 py-3 items-center">
                        <button onClick={handleEditClub} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-6 rounded">
                          Change Club
                        </button>
                      </span>
                    )}
                  </td>
                </tr>
                {/* Display success or error message */}
                {submitSuccess && (
                  <div className="text-green-600 mt-2 px-6 py-3">
                    Club updated successfully.
                  </div>
                )}
                {submitError && (
                  <div className="text-red-600 mt-2 px-6 py-3">
                    {submitError}
                  </div>
                )}
                {/* Coach */}
  {/* Coach Field */}
  <tr className="focus-within:bg-gray-200 overflow-hidden">
    <td className="border-t">
      <span className="text-gray-700 px-6 py-3 flex items-center">Coach</span>
    </td>
    <td className="border-t">
      <div className="text-gray-700 px-6 py-3 flex items-center">
        {editing ? (
          <input
            type="text"
            value={detailProfile.coach || ""}
            onChange={(e) => handleChange("coach", e.target.value)}
            className="text-gray-700 px-2 py-2 flex items-center bg-gray-100 rounded w-full"
          />
        ) : (
          <span>{detailProfile.coach}</span>
        )}
      </div>
    </td>
  </tr>
   {/* Edit and Update Buttons */}
   <tr className="focus-within:bg-gray-200 overflow-hidden">
    <td className="border-t">
      <button
        onClick={() => isEditing(!editing)} // Toggle edit mode
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
      >
        {editing ? "Cancel" : "Edit"}
      </button>
    </td>
    <td className="border-t">
      {editing && (
        <button
          onClick={() => {
            updateProfile(); // Update the profile
            isEditing(false); // Exit editing mode
          }}
          className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded"
        >
          Update
        </button>
      )}
    </td>
  </tr>
              </tbody>
            </table>
          </div>
        )}
    </div>
  )
}
export default Profile