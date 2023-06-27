import React,{useContext} from 'react';

const PostFormInput = (props: any) => {
  const {
    handleCancel,
    title,
    setTitle,
    content,
    setContent,
    rating,
    setRating,
    user,
    setUser,
    handleSubmit,
    movie
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className='text-xl ml-1 mb-1'>reviewing</h2>
        <h3 className='bg-sky-500 p-1 px-4 rounded-xl hover:bg-sky-600 mb-2'>{movie.title}</h3>
      </div>
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
          rows={4}
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
          className="rounded-xl p-2 text-indigo-100 w-full mt-2"
          type="text"
          value={`posting as ${user.username}`}
          onChange={(e) => setUser(e.target.value)}
          placeholder="User ID"
          disabled
        />
      </div>
      <div className="flex justify-end w-full mt-3">
        <div className="bg-green-500 p-1 px-4 rounded-xl hover:bg-fuchsia-600">
          <button type="submit">Post</button>
        </div>        
      </div>
    </form>
  );
};

export default PostFormInput;
