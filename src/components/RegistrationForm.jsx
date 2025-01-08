import React, { useState } from 'react';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [name, setName] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [club, setClub] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang diisi dalam form
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-3 py-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-3 py-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block mb-2">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 px-3 py-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="userType" className="block mb-2">
          User Type:
        </label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="border border-gray-300 px-3 py-2 w-full"
          required
        >
          <option value="">Select User Type</option>
          <option value="Athlete">Athlete</option>
          <option value="Club">Club</option>
          <option value="User">User</option>
        </select>
      </div>

      {userType === 'Athlete' && (
        <>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="birthPlace" className="block mb-2">
              Birth Place:
            </label>
            <input
              type="text"
              id="birthPlace"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="birthDate" className="block mb-2">
              Birth Date:
            </label>
            <input
              type="text"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block mb-2">
              Country:
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2">
              Gender:
            </label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="club" className="block mb-2">
              Club:
            </label>
            <input
              type="text"
              id="club"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
        </>
      )}

      {userType === 'Club' && (
        <>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
        </>
      )}

      {userType === 'User' && (
        <>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nickname" className="block mb-2">
              Nickname:
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
