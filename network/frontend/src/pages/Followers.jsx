import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API_ENDPOINT from '../config.jsx'

const Followers = () => {
    const { id } = useParams();
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
      fetch(`${API_ENDPOINT}/api/profile/${id}/following`)
        .then(response => response.json())
        .then(data => setFollowers(data))
        .catch(error => console.error(error));
    }, []);
  

  return (
    <div>
        <ul>
        {followers.map(follower => (
          <div key={follower.pk} className='grid grid-cols-10 py-4  hover:bg-gray-200 transition duration-300 ease-in-out'>
            <div className='ml-2'>
             <img src={follower.image} className='h-16 w-16 rounded-full' />
            </div>
            <div className='col-span-9 ml-2 mt-1'>
                  <div className='font-bold'>{follower.first_name} {follower.last_name}</div>
                  <div>@{follower.profile_username}</div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Followers