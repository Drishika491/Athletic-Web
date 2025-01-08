import React, { useState } from 'react';
import { login } from '../utils/auth';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const success = await login(username, password);
  
    if (success) {
      console.log('Login successful.');
      redirectToPreviousPage();
    } else {
      console.log('Login failed.');
      setErrorMessage('Login failed. Please try again.');
    }
  };  

  const redirectToPreviousPage = () => {
    // window.history.back();
    window.location.href = "/account/profile";
  }  

  return (
    <div>
      <div className='pb-5'>
        <div className='border-b-[3px] border-dotted border-primary'>
          <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>
            Login
          </h2>
        </div>
      </div>

      <div className='p-5 md:px-8 2xl:px-0 py-12 max-w-[1240px] mx-auto text-black flex flex-col lg:flex-row space-y-5 lg:space-y-3 justify-center'>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
            <div className='lg:w-[100px]'>Username</div>
            <input
              id='username'
              type='text'
              placeholder='Username'
              value={username}
              onChange={handleUsernameChange}
              className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
              required
            />
          </div>

          <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
            <div className='lg:w-[100px]'>Password</div>
            <input
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
              className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
              required
            />
          </div>

          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

          <div className='flex flex-col justify-end space-y-5 lg:space-y-0 lg:flex-row items-center lg:space-x-5'>
            <button
              type='submit'
              className='p-2 px-4 bg-secondary mt-5 lg:mt-0 text-white w-full lg:w-fit'
            >
             Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
