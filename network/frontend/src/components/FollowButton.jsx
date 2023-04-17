import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';


const FollowButton = ({ userId }) => {
  // const { urlUserId } = useParams();
  const [isFollowing, setIsFollowing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [userData, setUserData] = useState(null);
  const token = Cookies.get('token');
  // const { userId: urlUserId } = useParams();

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

  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   fetch(`${API_ENDPOINT}/api/my-profile/`, {
  //     headers: {
  //       'Authorization': `Token ${token}`
  //     },
  //     // body: JSON.stringify(data)
  //   })
  //   .then(response => response.json())
  //   .then(data => setUserData(data))
  //   .catch(error => console.error(error));
  // }, [token]);

  
  // console.log('userData:', userData);
  // console.log('userData:', urlUserId);

  return (
    <div>
      {/* {userData && (userData.pk == parseInt(urlUserId)) ? null : */}
        <button
          onClick={handleFollow}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          {isFollowing ? 'Unfollow' : 'Follow'}      
        </button>
         {/* } */}
    </div>
  );
};

export default FollowButton;
