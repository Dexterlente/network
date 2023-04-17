import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx';
import Cookies from 'js-cookie';

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get('token');

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINT}/api/profile/${userId}/update-follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      setIsFollowing(data.newFollower);
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchIsFollowing = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/api/profile/${userId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setIsFollowing(data.is_following);
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };
    fetchIsFollowing();
  }, [userId, token]);

  // if (isFollowing === null || userId === token ){
  //   return null; // don't render the button if we don't know the follow status yet or if it's the user's own profile
  // }
  // if (userId === token){
  //   return null;
  // }

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
