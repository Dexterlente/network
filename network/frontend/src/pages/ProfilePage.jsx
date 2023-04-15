import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx'
import Cookies from 'js-cookie';
import { useParams, Link } from 'react-router-dom';



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
    <div>
            <h2>{profile.first_name}</h2>
            <p>{profile.last_name}</p>
            <p>@{profile.pogi}</p>

    </div>
  )
}

export default ProfilePage