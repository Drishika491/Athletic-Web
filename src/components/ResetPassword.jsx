import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Retrieve the token from URL query parameters
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setMessage('');
      return;
    }

    if (!token) {
      setError('Token is missing. Please try again.');
      return;
    }

    try {
      const response = await axios.post(
        'https://localhost:44328/Api/Login/reset-password',
        {
          Token: token,
          NewPassword: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Your password has been reset successfully.');
        setError('');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'An error occurred. Please try again.');
      } else {
        setError('Failed to connect to the server. Please try again later.');
      }
      setMessage('');
    }
  };

  return (
    <div className='p-5 md:px-8 2xl:px-0 py-12 max-w-[1240px] mx-auto text-black flex flex-col justify-center items-center'>
      <h2 className='text-[1.5rem] font-semibold mb-5'>Reset Password</h2>
      <form onSubmit={handleSubmit} className='space-y-5 w-full max-w-[400px]'>
        <div className='flex flex-col space-y-3'>
          <label htmlFor='password' className='text-black'>New Password:</label>
          <input
            id='password'
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={handlePasswordChange}
            className='p-2 w-full outline-none text-black bg-gray-100'
            required
          />
        </div>
        <div className='flex flex-col space-y-3'>
          <label htmlFor='confirmPassword' className='text-black'>Confirm Password:</label>
          <input
            id='confirmPassword'
            type='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className='p-2 w-full outline-none text-black bg-gray-100'
            required
          />
        </div>
        <button
          type='submit'
          className='p-2 px-4 bg-secondary text-white w-full'
        >
          Reset Password
        </button>
      </form>
      {message && <p className='text-green-500 mt-5'>{message}</p>}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default ResetPassword;
