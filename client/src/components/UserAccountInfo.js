import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserAccountInfo = () => {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState(user.country || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await axios.patch(`/users/${user._id}`, {
        username,
        password: password === '' ? undefined : password,
        country,
      });
      setUser(updatedUser.data);
      setPassword(''); // Reset password input after successful submission
      alert('Account information updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="font-inter flex flex-col items-center p-6 rounded-lg text-white max-w-5xl mx-auto">
      <div
        className={`p-6 flex flex-row justify-between outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
                  to-violet-600 mx-auto drop-shadow-2xl relative gap-y-4`}
      >
        <form onSubmit={handleSubmit}>
          <h2 className='text-xl'>Account Info</h2>
          <div>
            <input
              className="rounded-xl p-2 my-2 text-indigo-900"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              className="rounded-xl p-2 text-indigo-900"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password (optional)"
            />
          </div>
          <div>
            <input
              className="rounded-xl p-2 my-2 text-indigo-900"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </div>
          <div className="flex justify-end w-full mt-3">
            <div className="bg-fuchsia-500 p-1 px-4 rounded-xl hover:bg-fuchsia-600">
              <button type="submit">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAccountInfo;
