import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import API_ENDPOINT from '../config.jsx';
import Cookies from "js-cookie";

const useLikePost = (id) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get('token');
  
  const likePost = () => {
    fetch(`${API_ENDPOINT}/api/posts/${id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setIsLiked(data.liked);
        setLikeCount(data.Count);
      })
      .catch(error => {
        console.error('Error liking post:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/api/posts/${id}`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        const data = await response.json();
        setLikeCount(data.likes);
         // check if the current user has liked the post
         setIsLiked(data.liked);
         setIsLoading(false);

      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };

    fetchData();
  }, [id, token]);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/posts/${id}/like`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setIsLiked(data.liked);
        // setLikeCount(data.Count);
      })
      .catch(error => {
        console.error('Error fetching like count:', error);
      });
  }, [id, token]);
  
  return { likePost, isLiked, likeCount, isLoading };
};

const LikeButton = ({ postId }) => {
  const { likePost, isLiked , likeCount, isLoading } = useLikePost(postId);

  const handleClick = () => {
    likePost();
  };

  return (
    <button onClick={handleClick} className='flex'>
       {isLoading ? (
        // Show a loading icon while waiting for the server response
        <span>Loading...</span>
      ) : isLiked ? (
          <><AiFillHeart className='h-6 w-6 mr-1 text-gray-500' /></> ) : (
          <><AiOutlineHeart className='h-6 w-6 mr-1' />
          </>
      )}
      {/* {likeCount} */}
      {likeCount !== null && likeCount}

      {/* {isLiked ? 'Liked!' : 'Like'} */}
      {/* {likeCount !== null && <span>{likeCount}</span>} */}
    </button>
    
  );
};

export default LikeButton;
