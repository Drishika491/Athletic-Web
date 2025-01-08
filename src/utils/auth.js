import axios from "axios";
import { configPOST } from "../service/api";
import { BASE_URL } from "../service/config";
// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return token !== null && token !== undefined;
};

// Function to get the token from local storage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Function to set the token in local storage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Function to remove the token from local storage
export const removeToken = () => {
  localStorage.removeItem('token');
};

export const removeUserType = () => {
  localStorage.removeItem('userType');
};

export const removeUserPvid = () => {
  localStorage.removeItem('userPvid');
};

export const removeClubPvid = () => {
  localStorage.removeItem('clubPvid');
};

export const removeReferencePvid = () => {
  localStorage.removeItem('referencePvid');
};

// Function to get the user's Pvid from local storage or any other source
export const getUserPvid = () => {
  return localStorage.getItem('userPvid');
};

// Function to set the user's Pvid from local storage or any other source
export const setUserPvid = (userPvid) => { // Pass userPvid as an argument
  localStorage.setItem('userPvid', userPvid);
};

// Fungsi untuk mengarahkan pengguna ke halaman login
const redirectToLogin = () => {
  window.location.href = '/login';
};

// Function to authenticate the user
export const login = async (username, password) => {
  try {
    const loginData = {
      Username: username,
      Password: password,
    };

    const headers = await configPOST();

    const response = await axios.post(
      BASE_URL+'Api/Login',
      loginData,
      { headers }
    );

    const token = response.data.data.token;
    setToken(token);

    // Store the user's Pvid after successful login
    const userPvid = response.data.data.user.pvid; // Assuming the response includes the user's Pvid
    setUserPvid(userPvid); // Pass the userPvid to the function

    // You can also perform additional actions after successful login
    setTimeout(() => {
      removeToken();
      redirectToLogin();
    }, 8 * 60 * 60 * 1000); // Setelah 12 jam, hapus token dan arahkan ke halaman login

    return true; // Return true to indicate successful login
  } catch (error) {
    console.error('Login error:', error);
    return false; // Return false to indicate failed login
  }
};

// Function to log out the user
export const logout = () => {
  removeToken();
  removeUserType();
  removeClubPvid();
  removeUserPvid();
  removeReferencePvid();

  // You can also perform additional actions after logout, such as clearing user data from the state

  // Redirect the user to the login page or any desired location
  window.location.href = '/login';
};
