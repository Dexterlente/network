import React from 'react'
import { Link } from 'react-router-dom'

const RightBar = () => {
  return (
    <div className='fixed top-0 mt-2 ml-6'>
        <div className='border-[1px] border-solid border-gray-300 rounded-lg text-center p-6 w-3/5'>
            <p className='font-bold text-2xl'>New to Twitter?</p>
            <p className='mb-4'>Sign up now to get your own personalized timeline!</p>
            <Link to={"/register"} className='border-[1px] border-solid rounded-full px-10 py-2 font-bold hover:bg-gray-300'>Create account</Link>
            <p className='text-sm mt-2'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
        </div>
        <div className='w-3/5 mt-2'>
        Terms of Service
            Privacy Policy
            Cookie Policy
            Accessibility
            Ads info
            More
            <p>
                © 2023 Twitter, Inc.
            </p>
        </div>
    </div>
  )
}

export default RightBar