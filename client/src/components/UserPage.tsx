import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dateFormat from 'dateformat';
import PostViewContainer from './PostViewContainer'
import { IUser } from '../../../models/user';

function UserPage() {
  const [user,setUser] = useState<IUser|null>(null)
  const { userId } = useParams();

  useEffect(() => {
    async function fetchUserById() {
      try {
        let response;
        response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error, "Error");
      }
    }
    fetchUserById();
  }, [userId]);  
  
  if(!user){
    return(<div>Loading...</div>)
  }
  const username = user.username;
  const bio = user.bio;
  const country = user.country;
  const email = user.email;
  let created = dateFormat(user.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  let updated = dateFormat(user.updatedAt, "dddd, mmmm dS, yyyy, h:MM:ss TT");


  return (
    <div className='font-inter flex flex-col min-w-full min-h-1/3 justify-center items-center p-6 rounded-lg text-white'>
      <div className='w-full max-w-5xl mx-auto'>
        <div className={`p-6 flex flex-row outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
           to-violet-600 mx-auto drop-shadow-2xl relative`}>
          <div className="text-left -mt-4 p-4">
            <Username username={username} email={email} />
            <Bio bio={bio} />
            <Country country={country} />
            <Updated created={created} updated={updated} />
          </div>
        </div>
      </div>
      <h1 className='mt-10 -mb-5 text-2xl'>{username}'s reviews</h1>
      <PostViewContainer userId={userId}/>
    </div>
  );

}

function Username(props: { username: any; email: any; }) {
  const { username, email } = props;

  return (
    <div className='mb-5'>
      <div>
        <h2 className='font-extrabold pb-2 text-transparent text-6xl bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-400'>{username}</h2>
      </div>
      <h2 className='-mt-2 text-1xl'>{email}</h2>
    </div>
  );
}

function Bio(props: { bio: any; }) {
  const { bio } = props;

  return (
    <div>
      <p><span>Bio:</span> <span className='inline-block my-3 bg-violet-500/40 p-1 p-4 rounded-xl'>{bio}</span></p>
    </div>
  );
}

function Country(props: { country: any; }) {
  const { country } = props;

  return (
    <div>
      <p><span>From:</span> <span className='inline-block mb-1 bg-red-400 p-1 px-4 rounded-full'>{country}</span></p>
    </div>
  );
}

function Updated(props: { created: any; updated: any; }) {
  const { created, updated } = props;

  return (
    <div className='mt-10 text-xs'>
      <p>Account created: {created}</p>
      <p>Account updated: {updated}</p>
    </div>
  );
}

export default UserPage;
