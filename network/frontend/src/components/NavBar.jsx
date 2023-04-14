import React from 'react'
import Birdie from '../assets/Birdie.png'
import { RiHome7Fill } from 'react-icons/ri'
// import { RiHome7Line } from 'react-icons/ri'
import { BsPerson } from 'react-icons/bs'
// import { IoPerson } from 'react-icons/io'

const NavBar = () => {
  return (
    <div>
      <div className='h-16 w-16'> 
        <img src={Birdie} alt='BirdieKo'  />
      </div>
        <div className='text-3xl'>
          <div className='flex'>
            <RiHome7Fill />
          Home
          </div>
          <div className='flex'>
            <BsPerson />
          Profile
          </div>
        </div>
    </div>
  )
}

export default NavBar