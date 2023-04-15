import React, { useState, useEffect } from 'react'
import Birdie from '../assets/Birdie.png'
import { RiHome7Fill } from 'react-icons/ri'
// import { RiHome7Line } from 'react-icons/ri'
import { BsPerson } from 'react-icons/bs'
// import { IoPerson } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { RiLoginCircleLine } from 'react-icons/ri'
import { MdOutlineAppRegistration } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { AiOutlineLogout } from 'react-icons/ai'
import Cookies from 'js-cookie';
import API_ENDPOINT from '../config.jsx';

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  
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

  const handleLogout = () => {
    // do something after logout
    window.location.reload(true);
    navigate('/');
    };
  
  
  return (
    <div className='fixed top-0 mr-4'>
      <div className='w-2/5 mt-3'>
        <Link to={"/"}> 
          <img src={Birdie} alt='BirdieKo' className='h-20 w-20 hover:bg-gray-300 p-5 rounded-3xl'  />
        </Link>
          <div className='text-2xl'>
            <Link to={"/"} className='flex p-2'>
            <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
              <RiHome7Fill className='mt-1 mr-4'  />
            Home
            </span>
            </Link>
            {isLoggedIn && profileData && (
            <Link to={`/profile/${profileData.pk}`} className='flex p-2'>
            <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
              <BsPerson className='mt-1 mr-4' />
                  Profile </span>
            </Link>
            )}
            {/* Not visible if logged in */}
            {isLoggedIn ? null : (
            <div>
            <Link to={"/login"} className='flex p-2'>
            <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
              <RiLoginCircleLine className='mt-1 mr-4' />
                  Login </span>
            </Link>

            <Link to={"/register"} className='flex p-2'>
            <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
              <MdOutlineAppRegistration className='mt-1 mr-4' />
                  Register </span>
            </Link>
            </div>
            )}
            <div className='flex p-2'>
              <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'> 
              {isLoggedIn && (
                <AiOutlineLogout className='mt-1 mr-4' />
              )}
                <LogoutButton onLogout={handleLogout} > Logout</LogoutButton> </span>
              </div>
              {isLoggedIn && (
            <div className='mt-3'>
              <button className='bg-[#448EE4] rounded-full p-2 px-[78px] text-white font-bold text-lg'>
                Tweet
              </button>
            </div>
              )}
          </div>
          {isLoggedIn && profileData && (
          <div className='fixed bottom-3 flex hover:bg-gray-300 rounded-full px-4'>
            {profileData.image ? (
           <img src={profileData.image} className='mt-1 mr-2 h-12 w-12 rounded-full' /> ): (
          <CgProfile className='mt-1 mr-2 h-12 w-12'/>
            )}
          <div>
            <p className='font-bold'>{profileData.first_name} {profileData.last_name}</p>
              <p>@{profileData.profile_username}</p>
              </div>
        
          </div>
          )}
      </div>
    </div>
  )
}

export default NavBar