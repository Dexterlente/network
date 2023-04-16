import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API_ENDPOINT from '../config.jsx'

const Following = () => {
    const { id } = useParams();
    const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/profile/${id}/followers`)
      .then(response => response.json())
      .then(data => setFollowing(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Following</h1>
      aw
      <ul>
        {following.map(follower => (
          <li key={follower.pk}>{follower.first_name}</li>
        ))}
      </ul>
    </div>
  )
}


export default Following