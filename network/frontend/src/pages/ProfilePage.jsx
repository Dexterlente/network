import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx'
import Cookies from 'js-cookie';
import { useParams, Link } from 'react-router-dom';
import { GoCalendar } from 'react-icons/go';
import bgprofile from '../assets/bgprofile.png'
import pretty from '../assets/pretty.png'
import { AiOutlineHeart } from 'react-icons/ai';

GoCalendar

const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [data, setData] = useState([]);
    const [showDiv1, setShowDiv1] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);
    const [showDiv3, setShowDiv3] = useState(false);

    const toggleDiv1 = () => {
      setShowDiv1(true);
      setShowDiv2(false);
      setShowDiv3(false);
    };
    
    const toggleDiv2 = () => {
      setShowDiv1(false);
      setShowDiv2(true);
      setShowDiv3(false);
    };
    const toggleDiv3 = () => {
      setShowDiv1(false);
      setShowDiv2(false);
      setShowDiv3(true);
    };

    useEffect(() => {
      Promise.all([
        fetch(`${API_ENDPOINT}/api/profile/${id}`).then(response => response.json()),
        fetch(`${API_ENDPOINT}/api/user-post/${id}`).then(response => response.json())
        ])
        // .then(data => setProfile(data))
        .then(([profileData, postData]) => {
          setProfile(profileData);
          setData(postData);
        })
        .catch(error => console.error(error));
      }, [id]);

      if (!profile || !data) {
        return <div>Loading...</div>;
      }

      // useEffect(() => {
      //   fetch(`${API_ENDPOINT}/api/user-post/${id}`)
      //     .then(response => response.json())
      //     .then(data => {
      //       setData(data);
      //     })
      //     .catch(error => console.error(error));
      //     }, [id]);

  return (
    <div className='border-solid border-x-2'>
      <div className='relative'><img src={bgprofile} className='h-[250px] w-screen' />
            <div className='absolute -bottom-16 left-2 '>
                <img src={profile.image} className='h-[150px] w-[150px] rounded-full border-4 border-white' />
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
      <div className='font-bold text-2xl grid grid-cols-3 text-center text-gray-600'>
        <div className='hover:bg-gray-300 py-3'>
          Tweets
        </div>
        <div className='hover:bg-gray-300 py-3'>
          Following Post
        </div>
        <div className='hover:bg-gray-300 py-3'>
          Followers Post
        </div>
      </div>
      {/* first div */}
      {data.map(post => (
      <div className='border-y-2 hover:bg-gray-200' key={post.id}>
          <div className='flex mt-3 items-center'>
              <div>
                {post.poster_image ?
                  <img src={post.poster_image} alt='DisplayPic' className='h-[70px] w-[70px] rounded-full mt-8 ml-3' /> :
                  <img src={pretty} alt='DefaultPic' className='h-[70px] w-[70px] rounded-full mt-8 ml-3' />
                  }
              </div>          
            <div className='ml-5 font-bold mt-2'> {post.poster_first_name} {post.poster_last_name}</div>
            <div className='ml-2 mt-2'> @{post.poster_username}</div>
            <div className='ml-2 mt-2'>      
            {new Date(post.created_date).toLocaleDateString("en-US", {
                                                // year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                              })}</div>
          </div>
          <p className='w-4/5  mx-auto text-left'>{post.content}</p>
          <div className='ml-6 mb-3 mt-3 flex'>
            <p><AiOutlineHeart className='h-6 w-6 mr-1' /></p>
            <p>{post.likes} Likes</p>
          </div>
      </div>
      ))}
    </div>
  )
}

export default ProfilePage