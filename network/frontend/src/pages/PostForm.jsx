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
            <div className='flex border-t-2 mb-6'>
                  <div>
                      {userPk.image ? (
                      <img src={userPk.image} className='h-[60px] w-[60px] rounded-full mt-6 ml-3' /> ): (
                      <CgProfile className='h-[60px] w-[60px]'/>
                      )}
                  </div>
                            {/* <p className='font-bold'>{userPk.first_name} {userPk.last_name}</p>
                            <p>@{userPk.profile_username} dawe</p> */}
                            <div className='w-full h-16 pl-6 my-6' >
                            <form>
                              <textarea  type="text" className='w-full border-y-2 h-[60px] resize-none text-lg focus:outline-none placeholder-text-3xl' maxLength="280" placeholder="What's happening?"
                              />
                              <button className='rounded-full border-blue-400 border-2 border-solid mt-1 ml-5 bg-blue-400 text-white font-bold p-2 px-5' type="submit">Tweet</button>
                           </form>       
                           </div> 
          </div>
          </> 
          )}
        </div>
  )
}

export default PostForm