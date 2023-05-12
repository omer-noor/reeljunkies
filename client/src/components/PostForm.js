import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import MovieContainer from './MovieContainer'

const PostForm = () => {
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

  const submitSearch

  return (
    <div className="font-inter flex flex-col items-center p-6 rounded-lg text-white max-w-5xl mx-auto">
      <div
        className={`p-6 flex flex-row justify-between outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
                  to-violet-600 mx-auto drop-shadow-2xl relative gap-y-4`}
      >
        <form onSubmit={handleSubmit}>
          <h2 className='text-xl mb-4'>post review</h2>
          <div>
            <input 
              className="rounded-xl p-2 text-indigo-900 w-full"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="rounded-xl p-2 text-indigo-900 w-full mt-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post here..."
              rows="4"
            />
            <input 
              className="rounded-xl p-2 text-indigo-900 w-full mt-2"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rating (0-5)"
            />
            <input 
              className="rounded-xl p-2 text-indigo-900 w-full mt-2"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="User ID"
            />
            <MovieContainer onSubmit={submitSearch}/>
          </div>
          <div className="flex justify-end w-full mt-3">
            <div className="bg-fuchsia-500 p-1 px-4 rounded-xl hover:bg-fuchsia-600">
              <button type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
