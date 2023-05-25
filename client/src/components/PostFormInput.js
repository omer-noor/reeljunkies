import React from 'react';
import PostForm from './PostForm';

const PostFormInput = ({ handleSubmit, title, setTitle, content, setContent, rating, setRating, user, setUser, setMovie }) => {
  return (
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
      </div>
      <div className="flex justify-end w-full mt-3">
        <div className="bg-fuchsia-500 p-1 px-4 rounded-xl hover:bg-fuchsia-600">
          <button type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};

export default PostFormInput;
