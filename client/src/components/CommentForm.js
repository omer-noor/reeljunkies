import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/comments', { post: postId, content });
      alert('Comment posted successfully');
      setContent(''); // Reset content after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="font-inter flex flex-col items-center p-6 rounded-lg text-white max-w-5xl mx-auto">
      <div
        className={`p-6 flex flex-row justify-between outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
                  to-violet-600 mx-auto drop-shadow-2xl relative gap-y-4`}
      >
        <form onSubmit={handleSubmit}>
          <h2 className='text-xl'>Add Comment</h2>
          <div>
            <textarea
              className="rounded-xl p-2 text-indigo-900 w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment here..."
              rows="4"
            />
          </div>
          <div className="flex justify-end w-full mt-3">
            <div className="bg-fuchsia-500 p-1 px-4 rounded-xl hover:bg-fuchsia-600">
              <button type="submit">Post Comment</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
