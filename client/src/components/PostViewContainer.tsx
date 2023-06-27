import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostView from './PostView';
import { IPost } from '../../../models/post';
import { IUser } from '../../../models/user';

interface PVCProps{
  user?:IUser;
  userId?:string;
}
function PostViewContainer({ user: userId }:PVCProps) {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    async function fetchPostData() {
      try {
        let response;
        if (!userId) {
          response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_API_URL}/posts/user/${userId}`
          );
        }
        setPostData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPostData();
  }, [userId]);

  return (
    <div className='font-inter flex flex-col items-center p-6 rounded-lg text-white max-w-5xl mx-auto'>      
      {postData && (
        <div>
          {postData.map((post:IPost) => (
            <PostView key={post._id} data={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostViewContainer;
