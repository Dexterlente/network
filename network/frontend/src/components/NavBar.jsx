import React from 'react'
import Birdie from '../assets/Birdie.png'
import { RiHome7Fill } from 'react-icons/ri'
// import { RiHome7Line } from 'react-icons/ri'
import { BsPerson } from 'react-icons/bs'
// import { IoPerson } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { RiLoginCircleLine } from 'react-icons/ri'
import { MdOutlineAppRegistration } from 'react-icons/md'
import { Link } from 'react-router-dom'


const NavBar = () => {
  
  return (
    <div className='fixed top-0 mr-4'>
      <div className='w-2/5 mt-3'>
        <div> 
          <img src={Birdie} alt='BirdieKo' className='h-20 w-20 hover:bg-gray-300 p-5 rounded-3xl'  />
        </div>
          <div className='text-2xl'>
            <Link to={"/"} className='flex p-2'>
            <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
              <RiHome7Fill className='mt-1 mr-4'  />
            Home
            </span>
            </Link>
            <div className='flex p-2'>
            <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
              <BsPerson className='mt-1 mr-4' />
                  Profile </span>
            </div>
            <Link to={"/login"} className='flex p-2'>
            <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
              <RiLoginCircleLine className='mt-1 mr-4' />
                  Login </span>
            </Link>
            <Link to={"/register"} className='flex p-2'>
            <span className='hover:bg-gray-200 rounded-full flex px-6 py-2'>
              <MdOutlineAppRegistration className='mt-1 mr-4' />
                  Register </span>
            </Link>
            
            
            <div className='mt-3'>
              <button className='bg-[#448EE4] rounded-full p-2 px-[78px] text-white font-bold text-lg'>
                Tweet
              </button>
            </div>
          </div>
          <div className='fixed bottom-3 flex hover:bg-gray-300 rounded-full px-4'>
          <CgProfile className='mt-1 mr-2 h-12 w-12'/>
          <div>
            <p>Dexter James Lente</p>
              <p>@dexter</p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default NavBar