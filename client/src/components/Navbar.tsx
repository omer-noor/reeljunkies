import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { NavbarContext } from '../App'; 
import logo from '../logo.png'

function Navbar() {
  const { signOut, user } = useAuth()!;
  console.log(user)
  const isAuthenticated = !!user;
  const { isPostFormVisible, setIsPostFormVisible } = useContext(NavbarContext);
  const navigate = useNavigate(); 

  const handleSignOut = () => {
    signOut();
  }

  function togglePostFormVisibility(e: { preventDefault: () => void; }) {
    e.preventDefault();
    setIsPostFormVisible(true);
    navigate('/');
  }

  return (
    <div>
      <nav className="px-6 py-4 text-white font-inter bg-indigo-900 outline outline-violet-500 outline-1">
        <div className="flex items-center justify-between">
          <Link to="/">
          <img
            src={logo}
            alt='Logo' 
            className='h-14'           
          />
          </Link>
          <div className="hidden md:flex items-center mt-1">
            <Link to="/movies" className="mx-6 hover:text-violet-300">
              movies
            </Link>

            {isAuthenticated ? (
              <>                
                  <p className='font-bold '><span className='text-indigo-300'>logged in as: </span>{user.username}</p>
                  {/* <Link to="/account" className="mx-4 hover:text-violet-300">
                    account
                  </Link> */}
                  <Link to="/" className="ml-2 mx-2 bg-emerald-500 p-1 px-4 rounded-xl hover:bg-fuchsia-600" onClick={togglePostFormVisibility}>
                    post a review
                  </Link>
                  <Link to="/" className="mx-2 bg-red-500 p-1 px-4 rounded-xl hover:bg-fuchsia-600">
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
