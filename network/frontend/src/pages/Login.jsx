import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import API_ENDPOINT from '../config.jsx'


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username: username, password: password };
    console.log(Cookies.get('csrftoken'));
    fetch(`${API_ENDPOINT}/api/login/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Successful login logic here
          Cookies.set("csrftoken", data.csrftoken);
          Cookies.set('token', data.token);
          navigate('/'); // Redirect to dashboard page
          window.location.reload(true); // hard refresh to render the logout button
        } else {
          // Failed login logic here
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <div className='mt-[50px] ml-6'>
        <div className='text-[50px]'>Login</div>
        <form onSubmit={handleSubmit}>
            <div className='mt-2'>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1' />
            </div>
            <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1' />
            </div>
            <button type="submit" className='border-[1px] border-solid rounded-full bg-[#87CEEB] px-5 py-1 text-white text-lg mt-2'>Login</button>
        </form>
    </div>
  )
}

export default Login