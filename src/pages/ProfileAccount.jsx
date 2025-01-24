import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import ProfileMenu from "../components/ProfileMenu";
import { getUserPvid } from "../utils/auth";
import axios from "axios";
import { config } from "../service/api";
import { BASE_URL } from "../service/config";

function ProfileAccount() {
  const [userProfile, setUserProfile] = useState([]); // Stores user profile data
  const [isEditing, setIsEditing] = useState(false); // Toggles edit mode
  const [selectedFile, setSelectedFile] = useState(null); // Manages file input
  const [previewImage, setPreviewImage] = useState(null); // Stores preview image before upload
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
  const [detailProfile, setDetailProfile] = useState({}); // Stores detail profile data
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(""); // Stores the profile photo URL
  const [pvid, setPvid] = useState(null); // Stores the profile photo URL

  const userPvid = getUserPvid(); // Get the user's Pvid

  // Fetch user profile details
  const fetchUserProfile = async () => {
    if (!userPvid) return;
  
    try {
      const result = await axios.get(
        `${BASE_URL}Api/IdentityUser/GetById?Pvid=${userPvid}`,
        {
          headers: await config(),
        }
      );
      setUserProfile(result.data.data); // Store fetched user profile
    } catch (error) {
      console.error("Fetch user profile error:", error);
    }
  };


  // Fetch detail profile based on referencePvid
  const fetchDetailProfile = async (referencePvid) => {
    try {
      const result = await axios.get(
        `${BASE_URL}Api/AthleteProfile/GetById?Pvid=${referencePvid}`,
        {
          headers: await config(),
        }
      );
      const { data } = result.data;
      console.log("data: ", data);
      setPvid(data?.pvid)
      setDetailProfile(data); // Store the detail profile data
      fetchProfilePhoto()
      return data;
    } catch (error) {
      console.error("Fetch detail profile error:", error);
    }
  };

   // Fetch profile photo based on Pvid
   const fetchProfilePhoto = async () => {
   const id = localStorage.getItem('referencePvid');

    console.log('Fetch', id);
    try {
      const response = await axios.get(
        `${BASE_URL}Api/AthleteProfile/GetProfilePhotoById/${id}`,
        {
          headers: await config(),
        }
      );
      console.log('Fetch profile photo', response.data.data.profilePhotoUrl);

      setProfilePhotoUrl(response.data.data.profilePhotoUrl); // Set the photo URL
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  };
  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Show preview of the selected file
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  
 // Handle profile photo upload and update
 const handleUpload = async () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("file", selectedFile); // Attach the selected file to FormData

  try {
    // Make a POST request to upload the profile photo
    const response = await axios.post(
      BASE_URL + `Api/AthleteProfile/EditProfileById/${detailProfile.pvid}`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // This tells the server we are sending files
          ...await config(), // Include any necessary headers (e.g., authorization)
        },
      }
    );

    if (response.data.isSuccess) {
      // Step 1: Fetch the updated user profile after successful upload
      await fetchUserProfile(); // Refresh the user profile
      await fetchProfilePhoto(detailProfile.pvid); // Fetch the updated profile photo
      
      // Step 2: Close modal and reset states
      setIsEditing(false);
      setIsModalOpen(false);
      setPreviewImage(null); // Clear preview image
    } else {
      console.error("Error updating profile:", response.data.errorMessage);
    }
  } catch (error) {
    console.error("Error uploading or updating profile photo:", error);
  }
};

  // Enable edit mode and open modal
  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
    setIsModalOpen(true); // Open the modal
  };

  // Close modal and exit editing mode
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setIsEditing(false); // Exit edit mode
  };

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
    fetchProfilePhoto()
  }, [userPvid]);
  useEffect(() => {
   
    fetchProfilePhoto()
  }, []);
  useEffect(() => {
    if (userProfile.referencePvid) {
      fetchDetailProfile(userProfile.referencePvid); // Fetch detail profile based on referencePvid
    }
  }, [userProfile]);

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center border-b-[3px] border-dotted border-primary p-5 mt-1">
        <h2 className="text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]">
          {userProfile.userType === "Club" ? "Club Manager" : userProfile.userType}
        </h2>
        <div className="flex flex-col items-center relative">
          {/* Profile image with edit icon */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gray-300 overflow-hidden relative">
            <img
              src={profilePhotoUrl  }
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {!isEditing && (
              <div
                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                onClick={handleEditClick}
              >
                <span className="text-lg font-bold">✎</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for photo upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Upload Profile Photo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            {previewImage && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Preview:</h4>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                />
              </div>
            )}
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:flex md:flex">
        <ProfileMenu />
        <div className="flex-1 p-4 lg:p-8 bg-gray-100">
          <Profile userProfile={userProfile} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
}

export default ProfileAccount;