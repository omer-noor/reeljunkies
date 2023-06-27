import React, {useState,useContext} from 'react';
import { NavbarContext } from '../App'; 
import FeaturedMovies from './FeaturedMovies';
import CommentForm from './CommentForm'
import PostForm from './PostForm';
import PostViewContainer from './PostViewContainer';


const HomePage = () => {  
  const navbarContext = useContext(NavbarContext); 
  const { isPostFormVisible, setIsPostFormVisible } = navbarContext;

  return (
    <div className='subpixel-antialiased'>  
     {isPostFormVisible && <PostForm/>}  
    <FeaturedMovies/>  
    <PostViewContainer user={undefined}/>  
    </div>
  );
};

export default HomePage;
