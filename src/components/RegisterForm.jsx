import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { config, configPOST } from '../service/api';
import { Icon } from '@iconify/react';
import { BASE_URL } from '../service/config';
function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [name, setName] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [country, setCountry] = useState(null);
  const [gender, setGender] = useState(null);
  const [club, setClub] = useState(null);
  const [iCLast4Digit, setICLast4Digit] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [listClub, setListClub] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchListClub = async () => {
    const result = await axios.get(BASE_URL+'Api/Club/GetList', {
      headers: await config()
    });
    console.log('cek club', result.data.data);
    setListClub(result.data.data);
  }
  
  useEffect(() => {
    fetchListClub();
  }, []);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return; // Stop form submission
    }
  
    // Create an object with the data to be sent in the request
    const requestData = {
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
      UserType: userType,
      Name: name,
      BirthPlace: birthPlace,
      BirthDate: birthDate,
      CountryPvid: country,
      Gender: gender,
      ClubPvid: club,
      ICLast4Digit: iCLast4Digit,
      Phone: phone,
      Title: title,
      NickName: nickname,
      FirstName: firstName,
      LastName: lastName,
    };

    const headers = await configPOST();
    setIsLoading(true);
  
    // Make a POST request to the API endpoint
    axios
      .post(BASE_URL+'Api/Login/PublicRegister', requestData, { headers })
      .then((response) => {
        // Handle the success response
        console.log(response.data);
        setSuccessMessage('You have successfully registered!');
        // Additional logic if needed
        setIsLoading(false);
        
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUserType('');
        setName('');
        setBirthPlace('');
        setBirthDate(null);
        setCountry(null);
        setGender(null);
        setClub(null);
        setICLast4Digit('');
        setPhone('');
        setTitle('');
        setNickname('');
        setFirstName('');
        setLastName('');

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch((error) => {
        // Handle the error response
        console.error(error);
        // Check if the response has an 'errorMessage' property and set it as the errorMessage state
        if (error.response && error.response.data && error.response.data.errorMessage) {
          setErrorMessage(error.response.data.errorMessage);
        } else {
          // If 'errorMessage' is not available in the response, you can set a default error message
          setErrorMessage('An error occurred');
        }
        // Additional error handling if needed
        setIsLoading(false);
        
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };  

  return (
    <div>
      <div className='pb-5'>
        <div className='border-b-[3px] border-dotted border-primary'>
          <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Register</h2>
        </div>
      </div>

      <div className='p-5 md:px-8 2xl:px-0 py-12 max-w-[1240px] mx-auto text-black flex flex-col lg:flex-row space-y-5 lg:space-y-3 justify-center'>
        <form onSubmit={handleSubmit} className='space-y-5'>

          <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
            <div className='lg:w-[150px]'>Email</div>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
              placeholder='Email'
              required 
            />
          </div>

          <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
            <div className='lg:w-[150px]'>Password</div>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
              placeholder='Password'
              required
            />
          </div>

          <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
            <div className='lg:w-[150px]'>Confirm Password</div>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
              placeholder='Confirm Password'
              required />
          </div>

          <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
            <div className='lg:w-[150px]'>User Type</div>
            <div className='p-2 text-primary bg-gray-100 px-2 cursor-pointer'>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className='w-full lg:w-[315px] outline-none cursor-pointer text-black bg-gray-100'
                required
              >
                <option value=''>Select User Type</option>
                <option value='Athlete'>Athlete</option>
                <option value='Club'>Club</option>
                <option value='Member'>Member</option>
              </select>
            </div>
          </div>

          {userType === 'Athlete' && (
            <>
              <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
                <div className='lg:w-[150px]'>Name</div>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
                  placeholder='Name'
                  required
                />
              </div>

              <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
                <div className='lg:w-[150px]'>Birth Place</div>
                <input
                  type='text'
                  id='birthPlace'
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
                  placeholder='Birth Place'
                  required
                />
              </div>

              <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
                <div className='lg:w-[150px]'>Birth Date</div>
                <input
                  type='date'
                  id='birthDate'
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
                  placeholder='Birth Date'
                  required
                />
              </div>

              <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
                <div className='lg:w-[150px]'>Country</div>
                <div className='p-2 text-primary bg-gray-100 px-2 cursor-pointer'>
                  <select
                    type='text'
                    id='country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className='w-full lg:w-[315px] outline-none cursor-pointer text-black bg-gray-100'
                    required
                    disabled
                  >
                    {/* <option value=''>Select Country</option> */}
                    <option value='8'>Singapore</option>
                  </select>
                </div>
              </div>

              <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
                <div className='lg:w-[150px]'>Gender</div>
                <div className='p-2 text-primary bg-gray-100 px-2 cursor-pointer'>
                  <select
                    type='text'
                    id='gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className='w-full lg:w-[315px] outline-none cursor-pointer text-black bg-gray-100'
                    placeholder='Gender'
                    required
                  >
                    <option value=''>Select Gender</option>
                    <option value='M'>Men</option>
                    <option value='W'>Women</option>
                  </select>
                </div>
              </div>

              <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
                <div className='lg:w-[150px] flex items-center'>Club
                <div className='relative flex flex-col items-center group ml-1'>
                  <Icon
                    icon='carbon:warning'
                    className='text-primary'
                  />
                  <div className='absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex'>
                      <span className='relative z-10 p-2 w-40 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg'>Please leave it blank if your club is not listed in the box. You can update it later in your profile</span>
                      <div className='w-3 h-3 -mt-2 rotate-45 bg-black'></div>
                  </div>
                </div>
                </div>
                <div className='p-2 text-primary bg-gray-100 px-2 cursor-pointer'>
                  <select
                    type='text'
                    id='club'
                    value={club}
                    onChange={(e) => setClub(e.target.value)}
                    className='w-full lg:w-[315px] outline-none cursor-pointer text-black bg-gray-100'
                  >
                    <option value=''>Select Club</option>
                    {listClub.map(data => (
                      <option value={data.pvid}>{data.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
                <div className='lg:w-[150px]'>IC Last 4 Digit</div>
                <input
                  type='text'
                  id='iCLast4Digit'
                  value={iCLast4Digit}
                  onChange={(e) => setICLast4Digit(e.target.value)}
                  className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
                  placeholder='IC Last 4 Digit'
                  required
                />
              </div>
            </>
          )}

          {userType === 'Club' && (
            <>
              <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
                <div className='lg:w-[150px]'>Name</div>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
                  placeholder='Name'
                  required
                />
              </div>

              <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
                <div className='lg:w-[150px]'>Phone</div>
                <input
                  type='number'
                  id='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
                  placeholder='Phone'
                />
              </div>
            </>
          )}

          {userType === 'Member' && (
          <>
            <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
              <div className='lg:w-[150px]'>First Name</div>
              <div className='flex'>
                <div className='p-2 text-primary bg-gray-100 px-2 cursor-pointer'>
                  <select
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-100 cursor-pointer"
                    required
                  >
                    <option value=''>Title</option>
                    <option value='Mr'>Mr</option>
                    <option value='Ms'>Ms</option>
                    <option value='Miss'>Miss</option>
                    <option value='Mrs'>Mrs</option>
                  </select>
                </div>
                <input
                  type='text'
                  id='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='p-2 w-full lg:w-[260px] outline-none text-black bg-gray-100'
                  placeholder='First Name'
                  required
                />
              </div>
            </div>

            <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
              <div className='lg:w-[150px]'>Last Name</div>
              <input
                type='text'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
                placeholder='Last Name'
                required
              />
            </div>

            <div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5'>
              <div className='lg:w-[150px]'>Nick Name</div>
              <input
                type='text'
                id='nickname'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className='p-2 w-full lg:w-[330px] outline-none text-black bg-gray-100'
                placeholder='Nick Name'
                required
              />
            </div>
          </>
          )}

          <div className='flex flex-col justify-end space-y-5 lg:space-y-0 lg:flex-row items-center lg:space-x-5'>
            <button type='submit' className='p-2 px-3 bg-secondary mt-5 lg:mt-0 text-white w-full lg:w-fit' disabled={isLoading}>
              {isLoading ? (
                  <div className="flex items-center">
                      <div className="animate-spin">
                          <Icon icon="gg:spinner" className="h-[1.5rem] w-auto text-white" />
                      </div>
                  </div>
              ) : (
                  <p>Register</p>
              )}
            </button>
          </div>

          <div>
            {/* Display success message if available */}
            {successMessage && <div className="success text-green-500">{successMessage}</div>}
            {/* Display error message if available */}
            {errorMessage && <div className="error text-red-500">{errorMessage}</div>}
          </div>

        </form>
      </div>
    </div>
  )
}

export default RegisterForm