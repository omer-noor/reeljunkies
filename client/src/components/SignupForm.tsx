import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users`, { username, email, password, country, bio });
      alert('Account created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="font-inter flex flex-col items-center p-6 rounded-lg text-white max-w-5xl mx-auto">
      <div
        className={`p-6 flex flex-row justify-between outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
                  to-violet-600 mx-auto drop-shadow-2xl relative`}
      >
        <form onSubmit={handleSubmit}>
          <h2 className='text-xl'>sign up</h2>
          <div>
            <input
              className="rounded-xl p-2 mt-3 mb-2 text-indigo-900"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              className="rounded-xl p-2 my-2 text-indigo-900"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className="rounded-xl p-2 my-2 text-indigo-900"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
          <div>
            <textarea
              className="rounded-xl p-2 my-2 w-full text-indigo-900"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
            />
          </div>
          <div className="flex justify-end w-full mt-1">
            <div className="bg-fuchsia-500 p-1 px-4 rounded-xl hover:bg-fuchsia-600">
              <button type="submit">submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
