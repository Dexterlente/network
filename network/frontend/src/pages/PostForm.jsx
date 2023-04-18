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
                setUserPk(data);
              console.log(setUserPk);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      }, []);


  return (
        <div className='border-x-2'>
        {isLoggedIn && userPk && (
        <>           

            <div className='font-bold text-3xl m-5'>Home</div>
            <div className='flex border-y-2'>
                  <div>
                      {userPk.image ? (
                      <img src={userPk.image} className='h-[60px] w-[60px] rounded-full mt-6 ml-3' /> ): (
                      <CgProfile className='h-[60px] w-[60px]'/>
                      )}
                  </div>
                            {/* <p className='font-bold'>{userPk.first_name} {userPk.last_name}</p>
                            <p>@{userPk.profile_username} dawe</p> */}
                            <div className='w-full h-16 pl-6 my-6'>
                            <form >
                              <input type="text" className='w-5/6 h-16' placeholder="What's happening?">
                              </input>
                           </form>       
                           </div> 
          </div>
          </> 
          )}
        </div>
  )
}

export default PostForm