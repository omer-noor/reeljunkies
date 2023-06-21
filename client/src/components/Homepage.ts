import React, {useState,useContext} from 'react';
import { NavbarContext } from '../App'; 
import FeaturedMovies from './FeaturedMovies';
import CommentForm from './CommentForm'
import PostForm from './PostForm';
import PostViewContainer from './PostViewContainer';


const HomePage = () => {  
  console.log("HOMERENDER")
  const { isPostFormVisible, setIsPostFormVisible } = useContext(NavbarContext);

  return (
    <div className='subpixel-antialiased'>  
     {isPostFormVisible && <PostForm/>}  
    <FeaturedMovies/>  
    <PostViewContainer/>  
    </div>
  );
};

export default HomePage;
