import { Icon } from '@iconify/react'
import React from 'react'

function SAOffice() {
  return (
    <div>
        <div className='pb-4'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-4 pl-6 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Getting to the SA Office</h2>
          </div>
        </div>

        <div className='mx-auto px-4 md:px-10 lg:px-0 bg-[#d9d9cb]'>
            <div className='py-8 lg:px-8 grid lg:grid-cols-2 md:grid-cols-1 gap-4'>
                <div className='pb-1'>
                    <div className='flex items-center text-primary'>
                        <Icon
                            className="h-[20px] w-auto mr-[8px]"
                            icon="ic:baseline-maps-home-work"
                        />
                        <p className='text-[16px] font-bold'>Our Address</p>
                    </div>

                    <div className='px-7 pb-8'>
                        <p>
                            SINGAPORE ATHLETICS ASSOCIATION <br/>
                            3 Stadium Drive
                            #01-33
                            Singapore 397630<br/>
                            Tel: +65 63862721<br/>
                            Fax: +65 63867773
                        </p>
                    </div>

                    <div className='flex items-center text-primary'>
                        <Icon
                            className="h-[21px] w-auto mr-[8px]"
                            icon="mingcute:train-2-fill"
                        />
                        <p className='text-[16px] font-bold'>Via public transport</p>
                    </div>

                    <div className='px-7 pb-8'>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Alight at Stadium MRT</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Take Exit 'A'</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Turn right</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Head straight</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>You will see an escalator up ahead</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Our office is located behind the escalator.</p>
                        </div>
                    </div>

                    <div className='flex items-center text-primary'>
                        <Icon
                            className="h-[21px] w-auto mr-[8px]"
                            icon="mdi:car-back"
                        />
                        <p className='text-[16px] font-bold'>Via your own vehicle</p>
                    </div>

                    <div className='px-7 pb-8'>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Park at B12 carpark at Singapore Sports Hub</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Go up the escalator</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Turn left and you'll see an escalator</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Our office is located behind the escalator</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Once you are at the entrance of the office, call us at 63862721. <br/>A staff will be coming over to receive you. Thank you</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <iframe className='lg:w-[600px] lg:h-[500px] md:w-[740px] md:h-[400px] w-[340px] h-[300px]' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15955.145204889082!2d103.8742809!3d1.3032097!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da13ba6ffde7d7%3A0x640e68d358b8b244!2sSingapore%20Athletic%20Association!5e0!3m2!1sen!2sid!4v1680773377444!5m2!1sen!2sid" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SAOffice