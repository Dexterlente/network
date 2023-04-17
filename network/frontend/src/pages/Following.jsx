import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API_ENDPOINT from '../config.jsx'
import { BsArrowLeft } from 'react-icons/bs';

const Following = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
      fetch(`${API_ENDPOINT}/api/profile/${id}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);


  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/profile/${id}/followers`)
      .then(response => response.json())
      .then(data => setFollowing(data))
      .catch(error => console.error(error));
  }, []);
  if (!following || !data) {
    return <div>Loading...</div>;
  }
  return (
    <div className='border-x-2 h-screen'>
        <div className='ml-5 mt-5 grid grid-cols-10'>
            <Link to={`/profile/${id}`} className='w-4/12'>
              <BsArrowLeft className='h-8 w-8 mt-3' />
            </Link>
            <div className='col-span-3'>
              <h1 className='text-3xl font-semibold'>{data.first_name} {data.last_name}
              <h2 className='font-normal text-lg text-gray-600'>@{data.profile_username}</h2></h1>
            </div>
        </div>
        <div className='grid grid-cols-2 text-center text-lg border-b-2'>
          <Link to={`/profile/${id}/following`}  className='hover:bg-gray-300 transition duration-300 ease-in-out py-5 cursor-pointer underline decoration-indigo-500 decoration-4' >Following</Link>
          <Link to={`/profile/${id}/followers`} className='hover:bg-gray-300 transition duration-300 ease-in-out py-5 cursor-pointer'>Followers</Link>           
        </div>
      <ul>
        {following.map(follower => (
          <div key={follower.pk} className='flex py-4  hover:bg-gray-200 transition duration-300 ease-in-out'>
            <div className='ml-4'>
             <img src={follower.image} className='h-16 w-16 rounded-full' />
            </div>
            <div className='ml-2 mt-1'>
                  <div className='font-bold'>{follower.first_name} {follower.last_name}</div>
                  <div>@{follower.profile_username}</div>
            </div>
          </div>
        ))}
      </ul>

    </div>
  )
}


export default Following