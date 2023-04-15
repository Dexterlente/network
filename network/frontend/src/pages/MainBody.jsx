import React from 'react'
import pretty from '../assets/pretty.png'
import { AiOutlineHeart } from 'react-icons/ai'
const MainBody = () => {
  return (
    <div>
      <div className='border-2 border-gray-300 hover:bg-gray-100'>
        <div className='flex mt-3 items-center'>
            <div><img src={pretty} alt='DisplayPic' className='h-[70px] w-[70px] rounded-full mt-8 ml-3' /></div>
            <div className='ml-5 font-bold mt-2'> Dexter Lente</div>
            <div className='ml-2 mt-2'>  @dexterjames</div>
        </div>
        <p className='w-4/5  mx-auto text-left'>lorem lorem sita buko ng papaya dalay dalay dusdos sisidlan and bunga</p>
        <div className='ml-6 mb-3 mt-3 flex'>
          <p><AiOutlineHeart className='h-6 w-6 mr-1' /></p>
          <p>100</p>
          </div>
      </div>

    </div>
  )
}

export default MainBody