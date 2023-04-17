import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import API_ENDPOINT from '../config.jsx'
import { Link, useNavigate } from 'react-router-dom'

const PostForm = () => {
    const [userPk, setUserPk] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check user's login status
        const token = Cookies.get('token');
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, []);

      useEffect(() => {
        // Check if user is logged in
        const token = Cookies.get('token');
        if (token) {
          setIsLoggedIn(true);
          // Fetch profile data
          fetch(`${API_ENDPOINT}/api/my-profile/`, {
            headers: {
              'Authorization': `Token ${token}`,
            },
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error('Network response was not ok.');
            })
            .then(data => {
              setProfileData(data);
              console.log(setProfileData);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      }, []);


  return (
    <div>
        <div>
        {isLoggedIn && userPk && (
          <div className='fixed bottom-3 flex hover:bg-gray-300 transition duration-300 ease-in-out rounded-full px-4'>
            {userPk.image ? (
           <img src={userPk.image} className='mt-1 mr-2 h-12 w-12 rounded-full' /> ): (
          <CgProfile className='mt-1 mr-2 h-12 w-12'/>
            )}
          <div>
            <p className='font-bold'>{userPk.first_name} {userPk.last_name}</p>
              <p>@{userPk.profile_username}</p>
              </div>
        
          </div>
          )}
        </div>
    </div>
  )
}

export default PostForm