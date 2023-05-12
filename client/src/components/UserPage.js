import React from 'react';
import { useAuth } from './AuthContext';
import dateFormat from 'dateformat';

function UserPage(props) {  
  const { user, setUser } = useAuth();
  props = user;
  const username = props.username;
  const bio = props.bio;
  const country = props.country;
  const email = props.email;
  let created = dateFormat(props.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT");  
  let updated = dateFormat(props.updatedAt, "dddd, mmmm dS, yyyy, h:MM:ss TT");  
  

  return (
    <div className='font-inter flex flex-col min-w-full min-h-1/3 justify-center items-center p-6 rounded-lg text-white'>
      <div className='w-full md:w-1/2 lg:w-1/3 mx-auto'>
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
    </div>
  );
  
}

function Username(props) {
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

function Bio(props) {
  const { bio } = props;

  return (
    <div>
      <p><span>Bio:</span> <span className='inline-block my-3 bg-violet-500/40 p-1 p-4 rounded-xl'>{bio}</span></p>
    </div>
  );
}

function Country(props) {
  const { country } = props;

  return (
    <div>
      <p><span>From:</span> <span className='inline-block mb-1 bg-red-400 p-1 px-4 rounded-full'>{country}</span></p>
    </div>
  );
}

function Updated(props) {
  const { created, updated } = props;

  return (
    <div className='mt-10 text-xs'>
      <p>Account created: {created}</p>
      <p>Account updated: {updated}</p>
    </div>
  );
}

export default UserPage;
