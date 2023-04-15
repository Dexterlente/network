import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import API_ENDPOINT from '../config.jsx'

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
  });

  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

  fetch(`${API_ENDPOINT}/api/register/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
    },
    body: formData
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log(data);
      // handle successful response here
      //success redirect login
      Navigate('/login')
    })
    .catch(error => {
      console.error('Error:', error);
      // handle error here
    });
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='text-lg pl-2 pt-[100px] font-bold h-screen border-x-2 border-solid border-gray-300'>
      <div className='text-center text-[40px] mb-[50px]'> Registration</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
          className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1'
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password_confirm">Confirm Password:</label>
          <input className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1'
            type="password"
            id="password_confirm"
            name="password_confirm"
            value={formData.password_confirm}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1'
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1'
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='bg-[#87CEEB] px-4 py-1 rounded-full text-white'>Register</button>
      </form>
    </div>
  );
};


export default Registration