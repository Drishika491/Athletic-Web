import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://localhost:44328/Api/Login/forgot-password',
        { Email: email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
console.log(response)
      if (response.status === 200) {
        setMessage('If the email is registered, you will receive a reset link.');
        setError('');
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.message || 'An error occurred. Please try again.');
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from the server. Please try again later.');
      } else {
        // Other errors
        setError('An error occurred. Please try again.');
      }
      setMessage('');
    }
  };

  return (
    <div className='p-5 md:px-8 2xl:px-0 py-12 max-w-[1240px] mx-auto text-black flex flex-col justify-center items-center'>
      <h2 className='text-[1.5rem] font-semibold mb-5'>Forgot Password</h2>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='flex flex-col space-y-3'>
          <label htmlFor='email' className='text-black'>Enter your email to reset password:</label>
          <input
            id='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
            required
          />
        </div>
        <button
          type='submit'
          className='p-2 px-4 bg-secondary text-white w-full lg:w-fit'
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className='text-green-500 mt-5'>{message}</p>}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default ForgotPassword;
