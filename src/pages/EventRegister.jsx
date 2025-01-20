import React from 'react'
import EventRegisterForm from '../components/EventRegisterForm'

function EventRegister() {
  return (
    <div>
        {/* <div className=''>
            <div className='border-b-[3px] border-dotted border-primary'>
                <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Event Register</h2>
            </div>
        </div> */}
        <EventRegisterForm />
    </div>
  )
}

export default EventRegister