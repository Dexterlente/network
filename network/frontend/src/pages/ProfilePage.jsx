import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx'
import Cookies from 'js-cookie';
import { useParams, Link } from 'react-router-dom';
import { GoCalendar } from 'react-icons/go';
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
            <p className='font-bold'>{profile.first_name} {profile.last_name}</p>
            <p>@{profile.profile_username}</p>
            <p className='flex'><GoCalendar className='mt-1 mr-1' />Joined {new Date(profile.joined_date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                // day: "numeric",
                                              })}
                                              </p>
            <p>{profile.followers} Following {profile.following} Followers</p>

    </div>
  )
}

export default ProfilePage