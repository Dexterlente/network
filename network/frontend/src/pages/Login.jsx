import React from 'react'

const Login = () => {
  return (
    <div className='mt-[50px] ml-6'>
        <div className='text-[50px]'>Login</div>
        <form>
            <div className='mt-2'>
            <label>Username:</label>
            <input type="text"  className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1' />
            </div>
            <div>
            <label>Password:</label>
            <input type="password"  className='border-[1px] border-solid border-gray-300 rounded-lg ml-4 mb-1' />
            </div>
            <button type="submit" className='border-[1px] border-solid rounded-full bg-[#87CEEB] px-5 py-1 text-white text-lg mt-2'>Login</button>
        </form>
    </div>
  )
}

export default Login