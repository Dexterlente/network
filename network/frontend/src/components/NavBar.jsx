import React from 'react'
import Birdie from '../assets/Birdie.png'
import { RiHome7Fill } from 'react-icons/ri'
// import { RiHome7Line } from 'react-icons/ri'
import { BsPerson } from 'react-icons/bs'
// import { IoPerson } from 'react-icons/io'

const NavBar = () => {
  return (
    <div>
      <div className='h-16 w-16 hover:bg-gray-700 rounded-full'> 
        <img src={Birdie} alt='BirdieKo'  />
      </div>
        <div className='text-3xl'>
          <div className='flex p-2'>
          <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
            <RiHome7Fill className='mt-1 mr-2'  />
          Home
          </span>
          </div>
          <div className='flex p-2'>
          <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
            <BsPerson className='mt-1 mr-2' />
                Profile </span>
          </div>
        </div>
    </div>
  )
}

export default NavBar