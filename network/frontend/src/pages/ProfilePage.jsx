import React, { useState, useEffect } from 'react';
import API_ENDPOINT from '../config.jsx'
import Cookies from 'js-cookie';
import { useParams, Link } from 'react-router-dom';
import { GoCalendar } from 'react-icons/go';
import bgprofile from '../assets/bgprofile.png'
import pretty from '../assets/pretty.png'
import { AiOutlineHeart } from 'react-icons/ai';
import LikeButton from '../components/LikeButton'
import FollowButton from '../components/FollowButton.jsx'


GoCalendar

const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [data, setData] = useState([]);
    const [followingPost, setFollowingPost] = useState([]);
    const [followerPost, setFollowerPost] = useState([]);
    const [userPk, setUserPk] = useState(null);
    const [showDiv1, setShowDiv1] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);
    const [showDiv3, setShowDiv3] = useState(false);
    const token = Cookies.get('token');

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
      const token = Cookies.get('token');
      fetch(`${API_ENDPOINT}/api/my-profile/`, {
        headers: {
          'Authorization': `Token ${token}`
        },
      })
      .then(response => response.json())
      .then(data => setUserPk(data))
      .catch(error => console.error(error));
    }, [token]);
  

    useEffect(() => {
      Promise.all([
        fetch(`${API_ENDPOINT}/api/profile/${id}`).then(response => response.json()),
        fetch(`${API_ENDPOINT}/api/user-post/${id}`).then(response => response.json()),
        fetch(`${API_ENDPOINT}/api/posts/followers-post/${id}`).then(response => response.json()),
        fetch(`${API_ENDPOINT}/api/posts/followed-post/${id}`).then(response => response.json()),
        ])
        .then(([profileData, postData, followersData, followedData]) => {
          setProfile(profileData);
          setData(postData);
          setFollowerPost(followersData);
          setFollowingPost(followedData);
        })
        .catch(error => console.error(error));
      }, [id]);

      if (!profile || !data || !followingPost || !followerPost || !userPk) {
        return <div>Loading...</div>;
      }
      

  return (
    <div className='border-solid border-x-2 mb-3'>
      <div className='relative'><img src={bgprofile} className='h-[250px] w-screen' />
            <div className='absolute -bottom-16 left-2 '>
                <img src={profile.image} className='h-[150px] w-[150px] rounded-full border-4 border-white' />
            </div>
            {!token ? null : (
            <div className='absolute right-3'>
              {/* OMG DONT RENDER IF URL ID AND TOKEN ID MATCH */}
              {userPk && (userPk.pk == parseInt(id)) ? null :
            <FollowButton userId={profile.pk}/>
              }
            </div>
            )}
      </div>
      <div className='mt-[70px] ml-4 text-gray-600'>
            <p className='font-bold text-2xl text-black'>{profile.first_name} {profile.last_name}</p>
            <p className='mb-2'>@{profile.profile_username}</p>
            <p className='flex'><GoCalendar className='mt-1 mr-1 mb-2 text-xl' />Joined {new Date(profile.joined_date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                // day: "numeric",
                                              })}
                                              </p>
                  <p className='cursor-pointer flex'>
                      <Link to={`/profile/${id}/following`} className='mr-2 hover:underline'>{profile.followers} Following</Link>
                      <Link to={`/profile/${id}/followers`} className='hover:underline'>{profile.following} Followers</Link>
                  </p>
      </div>
      <div className='font-bold text-2xl grid grid-cols-3 text-center text-gray-600'>
        <div className='hover:bg-gray-300 py-3 cursor-pointer' onClick={toggleDiv1}>
          Tweets
        </div>
        <div className='hover:bg-gray-300 py-3 cursor-pointer' onClick={toggleDiv2}>
          Following Post
        </div>
        <div className='hover:bg-gray-300 py-3 cursor-pointer' onClick={toggleDiv3}>
          Followers Post
        </div>
      </div>
      <div>
        {showDiv1 && (
            <div>
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
                  {/* <p><AiOutlineHeart className='h-6 w-6 mr-1' /></p> */}
                  <LikeButton postId={post.id} />
                  <p className='ml-1'> Likes</p>
                </div>
            </div>
            ))}
            </div>
        )}
        </div>
        <div>
        {showDiv2 && (
            <div>
            {/* first div */}
            {followingPost.map(post => (
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
                <LikeButton postId={post.id} />
                  <p className='ml-1'> Likes</p>
                </div>
            </div>
            ))}
            </div>
        )}
        </div>
        <div>
        {showDiv3 && (
            <div>
            {/* first div */}
            {followerPost.map(post => (
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
                <LikeButton postId={post.id} />
                  <p className='ml-1'> Likes</p>
                </div>
            </div>
            ))}
            </div>
        )}
        </div>
      </div>
      
  )
}

export default ProfilePage