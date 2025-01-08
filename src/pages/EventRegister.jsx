/*import React from 'react'
import EventRegisterForm from '../components/EventRegisterForm'
import EventRegisterPreview from '../components/EventRegisterPreview'


function EventRegister() {
  return (
    <div>
        {/* <div className=''>
            <div className='border-b-[3px] border-dotted border-primary'>
                <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Event Register</h2>
            </div>
        </div> *//*}
        <EventRegisterForm />
        <EventRegisterPreview/>
    </div>
  )
}

export default EventRegister*/

import React, { useState } from 'react';
import EventRegisterForm from '../components/EventRegisterForm';
import EventRegisterPreview from '../components/EventRegisterPreview';

function EventRegister() {
  const [isPreview, setIsPreview] = useState(false);  // State to toggle form and preview

  const handlePreview = () => {
    setIsPreview(true);  // Set to true when user clicks preview
  };

  const handleGoBack = () => {
    setIsPreview(false);  // Set back to form when user clicks "Go Back"
  };

  return (
    <div>
      {isPreview ? (
        <EventRegisterPreview onGoBack={handleGoBack} />
      ) : (
        <EventRegisterForm onPreview={handlePreview} />
      )}
    </div>
  );
}

export default EventRegister;
