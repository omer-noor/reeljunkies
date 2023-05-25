import React, { useState } from 'react';
import axios from 'axios';
import PostFormInput from './PostFormInput';
import SearchContainer from './SearchContainer';

const PostForm = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [user, setUser] = useState(''); // assuming this would be user id
  const [movie, setMovie] = useState(''); // assuming this would be movie id

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/posts', { title, content, rating, user, movie });
      alert('Post created successfully');
      setTitle(''); // Reset title after successful submission
      setContent(''); // Reset content after successful submission
      setRating(''); // Reset rating after successful submission
      setUser(''); // Reset user after successful submission
      setMovie(''); // Reset movie after successful submission
    } catch (error) {
      console.error(error);
    }
  };  

  function FormContainer ({isSelected}) {
    if(isSelected){
      return (
        <>
        <PostFormInput
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          rating={rating}
          setRating={setRating}
          user={user}
          setUser={setUser}
          setMovie={setMovie}
          handleSubmit={handleSubmit} />          
        </>
      );
    }
    else{
      return <SearchContainer/>;
    }
  }
  
  return (
    <div className="font-inter items-center p-6 rounded-lg text-white w-1/3 max-w-1/3 mx-auto">      
      <div className={`p-6 flex flex-col justify-between outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
                  to-violet-600 mx-auto drop-shadow-2xl relative gap-y-4`}>     
        <h1>post a review</h1>        
        <FormContainer isSelected={isSelected}/>      
      </div>
    </div>
  );
};

export default PostForm;
