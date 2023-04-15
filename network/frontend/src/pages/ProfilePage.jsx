import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx'
import Cookies from 'js-cookie';
import { useParams, Link } from 'react-router-dom';
import { GoCalendar } from 'react-icons/go';
import bgprofile from '../assets/bgprofile.png'
import pretty from '../assets/pretty.png'

GoCalendar

const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch(`${API_ENDPOINT}/api/profile/${id}`)
          .then(response => response.json())
          .then(data => setProfile(data))
          .catch(error => console.error(error));
      }, [id]);

      if (!profile) {
        return <div>Loading...</div>;
      }

  return (
    <div className='border-solid border-x-2 h-screen'>
      <div className='relative'><img src={bgprofile} className='h-[250px] w-screen' />
            <div className='absolute -bottom-16 left-2 '>
                <img src={pretty} className='h-[150px] w-[150px] rounded-full border-4 border-white' />
            </div>
      </div>
      <div className='mt-[70px] ml-4 opacity-70'>
            <p className='font-bold text-2xl opacity-100'>{profile.first_name} {profile.last_name}</p>
            <p className='mb-2'>@{profile.profile_username}</p>
            <p className='flex'><GoCalendar className='mt-1 mr-1 mb-2 text-xl' />Joined {new Date(profile.joined_date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                // day: "numeric",
                                              })}
                                              </p>
            <p>{profile.followers} Following {profile.following} Followers</p>
      </div>
      <div className='font-bold text-2xl ml-8 mt-4'>
        Tweets
      </div>
    </div>
  )
}

export default ProfilePage