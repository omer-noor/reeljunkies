import React from 'react';
import FeaturedMovies from './FeaturedMovies';
import CommentForm from './CommentForm'
import PostForm from './PostForm';

const HomePage = () => {
  return (
    <div className='subpixel-antialiased'>  
    <PostForm/>   
    <FeaturedMovies/>   
    <CommentForm/>
    </div>
  );
};

export default HomePage;
