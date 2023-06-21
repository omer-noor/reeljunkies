import React, { useState, useContext } from 'react';
import axios from 'axios';
import PostFormInput from './PostFormInput';
import SearchContainer from './SearchContainer';
import { NavbarContext } from '../App';

const PostForm = () => {
  console.log("POSTFORMRENDER")
  const { isPostFormVisible, setIsPostFormVisible } = useContext(NavbarContext);
  const [isSelected, setIsSelected] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [user, setUser] = useState(''); // assuming this would be user id
  const [movie, setMovie] = useState({ id: '', title: '', director: '' });

  const handleCancel = (e) => {
    e.preventDefault();
    setIsPostFormVisible(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user, title, movie, "HERE")
      await axios.post(`${process.env.REACT_APP_API_URL}/posts`, { title, content, rating, user: user._id, movie });
      alert('Post created successfully');
      setIsPostFormVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="font-inter items-center p-6 rounded-lg text-white w-1/3 max-w-1/3 mx-auto">
        <div className={`p-6 flex flex-col justify-between outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
                  to-violet-600 mx-auto drop-shadow-2xl relative gap-y-4`}>
          <h1>post a review</h1>
          {isSelected ? (
            <PostFormInput
              handleCancel={handleCancel}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              rating={rating}
              setRating={setRating}
              user={user}
              setUser={setUser}
              movie={movie}
              handleSubmit={handleSubmit}
            />
          ) : (
            <SearchContainer setMovie={setMovie} setUser={setUser} setIsSelected={setIsSelected} />
          )}
          <div className="flex justify-center w-full mt-3">
            <div className="bg-red-500 p-1 ml-4 px-4 rounded-xl hover:bg-fuchsia-600">
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
