import React from 'react'
import Birdie from '../assets/Birdie.png'
const NavBar = () => {
  return (
    <div>
      <div className='h-16 w-16'> 
        <img src={Birdie} alt='BirdieKo'  />
      </div>
          <div className='text-'>
          Home
          </div>
          <div>
          Profile
          </div>
    </div>
  )
}

export default NavBar