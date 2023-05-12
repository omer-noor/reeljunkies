import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
  const { signOut, user } = useAuth();
  const isAuthenticated = !!user;

  const handleSignOut = () => {
    signOut();
  }

  return (
    <div>
      <nav className="px-6 py-4 text-white font-inter bg-violet-900 outline outline-violet-500 outline-1">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl text-white font-bold bg-violet-400/20 p-2 rounded-xl">
            reeljunkies
          </Link>
          <div className="hidden md:flex mt-1">
            <Link to="/movies" className="mx-6 hover:text-violet-300">
              movies
            </Link>

            {isAuthenticated ? (
              <>                
                  <p className='font-bold '><span className='text-indigo-300'>logged in as: </span>{user.username}</p>
                  <Link to="/account" className="mx-4 hover:text-violet-300">
                    account
                  </Link>
                  <Link to="/" className="hover:text-violet-300">
                    <button onClick={handleSignOut}>
                      sign out
                    </button>
                  </Link>                
              </>
            ) : (
              <Link to="/login" className="mx-4 hover:text-violet-300">
                login
              </Link>
            )}
          </div>
          <button className="md:hidden focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
