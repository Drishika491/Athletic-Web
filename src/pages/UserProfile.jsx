import React from 'react'
import UserAccount from '../components/UserAccount'

function UserProfile() {
  return (
    <div>
        <div className=''>
            <div className='border-b-[3px] border-dotted border-primary'>
                <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Account</h2>
            </div>
        </div>
        <UserAccount />
    </div>
  )
}

export default UserProfile