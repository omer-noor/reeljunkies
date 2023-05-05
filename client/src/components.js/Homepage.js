import React from 'react';
import MovieContainer from './MovieContainer';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className='subpixel-antialiased'>
      <Navbar />
      <MovieContainer />
    </div>
  );
};

export default HomePage;
