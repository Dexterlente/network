import React, { useState, useEffect } from 'react';
import pretty from '../assets/pretty.png';
import { AiOutlineHeart } from 'react-icons/ai';
import API_ENDPOINT from '../config.jsx' 

const MainBody = () => {
  const [postBody, setPostBody] = useState([]);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/postbody`)
      .then(response => response.json())
      .then(data => setPostBody(data.body))
      console.log(setPostBody);
  }, []);

  return (
    <div>
      {postBody.map(post => (
        <div key={post.id} className='border-2 border-gray-300 hover:bg-gray-100'>
          <div className='flex mt-3 items-center'>
            <div><img src={pretty} alt='DisplayPic' className='h-[70px] w-[70px] rounded-full mt-8 ml-3' /></div>
            <div className='ml-5 font-bold mt-2'> {post.poster_first_name} {post.poster_last_name}</div>
            <div className='ml-2 mt-2'> {post.poster_username}</div>
            <div className='ml-2 mt-2'>  {post.created_at}</div>
          </div>
          <p className='w-4/5  mx-auto text-left'>{post.content}</p>
          <div className='ml-6 mb-3 mt-3 flex'>
            <p><AiOutlineHeart className='h-6 w-6 mr-1' /></p>
            <p>{post.likes}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MainBody;
