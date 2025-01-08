import React, { useEffect, useState } from 'react'
import ImageSidebar1 from "../assets/img-sidebar-1.jpg";
import ImageSidebar2 from "../assets/img-sidebar-2.jpg";
import ImageSidebar3 from "../assets/img-sidebar-3.jpg";
import FacebookPage from './FacebookPage';
import { config } from '../service/api';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageNotFound from '../assets/not-found.png'
import { BASE_URL,BASE_URL_ } from '../service/config';
function UpcomingEvents() {
  const [upEvent, setUpEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BASE_URL+"Api/Event/GetUpcomingEvent",
          {
            headers: await config(), // Assuming config() returns the required headers
          }
        );
        const eventData = response.data.data;
        setUpEvent(eventData); // Update the state with the fetched data
        console.log('cek upcoming event', eventData)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once on component mount.
    
  return (
    <div>
        <div className='my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
            <div className='flex flex-wrap -mx-1 lg:-mx-4 lg:grid lg:grid-cols-1 lg:px-4 gap-4'>
                <div className='my-1 px-1 w-full lg:my-4 lg:px-0 lg:col-span-2'>
                    <div className="border-b-[3px] flex border-dotted border-primary">
                        <h2 className='mt-1 text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Upcoming Events</h2>
                    </div>

                    {loading ? (
                    <p>Loading...</p>
                    ) : (
                    upEvent && upEvent.length > 0 ? (
                        <div className='container mx-auto gap-4 py-4'>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            navigation
                            className='mySwiper'
                            breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 16,
                            },
                            }}
                        >
                            {upEvent.map((event, index) => (
                            <SwiperSlide key={index}>
                                <div className='flex flex-col bg-white'>
                                  <div>
                                    <img
                                      src={event?.imageCoverUrl ? BASE_URL_ + event?.imageCoverUrl : ImageNotFound}
                                      alt='Event Cover'
                                      className='block object-cover w-full h-56 max-h-full'
                                    />
                                  </div>
                                  <div className='overflow-visible flex flex-col items-center group'>
                                    <div className='bg-primary w-full text-white h-14 font-bold text-center px-10 lg:px-0 md:px-2 py-1 p-2 text-limit-2'>
                                        {event.name}
                                    </div>
                                    <div className="absolute top-30 flex flex-col items-center hidden mt-14 group-hover:flex">
                                      <span className="z-10 bg-white text-black font-bold text-center py-1 p-2 shadow-lg sm-tool-tips">{event.name}</span>
                                    </div>
                                  </div>
                                  <div className='text-center bg-[#dfdfd3] h-50'>
                                      <div className='px-4 pt-2 h-20'>
                                        <p className='text-primary'>Date:</p>
                                        {event.displayDate ? (
                                          <span className='text-limit-2'>{event.displayDate}</span>
                                        ) : (
                                          <span className='whitespace-no-wrap'>
                                            {moment(event.date).format('DD MMM YYYY')} -{' '}
                                            {moment(event.endDate).format('DD MMM YYYY')}
                                          </span>
                                        )}
                                      </div>
                                      <div className='h-20'>
                                        <p className='text-primary'>Venue:</p>
                                        <p className='text-limit-2 px-3'>{event ? event.venue : 'Not Available'}</p>
                                      </div>
                                      <div className='h-10 flex justify-center items-center bg-[#cccab9]'>
                                        <Link
                                          to={`/events-&-competitions/calendar/${event.articleKey}`}
                                          className='text-primary'
                                          >
                                          Read More
                                        </Link>
                                      </div>
                                  </div>
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                        </div>
                    ) : (
                        <div className='justify-center'>
                        <p>Not available</p>
                        </div>
                    )
                    )}
                </div>
                {/* <div className='my-1 px-4 pb-4 w-full lg:px-1 md:px-4 lg:my-4 lg:px-0'>
                    <div className='flex gird grid-cols-3 gap-3 pb-3'>
                        <button>
                            <img src={ImageSidebar1} />
                        </button>
                        <button>
                            <img src={ImageSidebar2} />
                        </button>
                        <button>
                          <a href='https://www.giving.sg/saa' target='_blank'>
                            <img src={ImageSidebar3} />
                          </a>
                        </button>
                    </div>
                    <div>
                        <div className='text-white bg-blue-800 text-center py-2 font-bold'>Facebook</div>
                        <div className="facebook-page-container">
                            <FacebookPage />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default UpcomingEvents