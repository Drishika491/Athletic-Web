import React, { useEffect, useState } from 'react'
import SubAboutUs from '../components/SubAboutUs'
import { Icon } from '@iconify/react'
import { config, configSigned, getCategories, getListNews, getListRelatedNews } from '../service/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ImageNotFound from '../assets/not-found.png'
import { getUserPvid } from '../utils/auth';
import StartListAccordion from '../components/StartListAccordion';
import { BASE_URL, BASE_URL_ } from '../service/config';

function DetailArticle() {
    const { articleKey } = useParams();
    const [detailArticle, setDetailArticle] = useState([]);
    const [relatedAthlete, setRelatedAthlete] = useState([]);
    const [relatedArticle, setRelatedArticle] = useState([]);
    const [articleCategory, setArticleCategory] = useState([]);
    const [htmlStringArticle, setHtmlStringArticle] = useState('');
    const [listNews, setListNews] = useState([]);
    const [eventData, setEventData] = useState(null);
    const [userProfile, setUserProfile] = useState([]);
    const userPvid = getUserPvid(); // Get the user's Pvid
  

    const fetchUserProfile = async () => {
      if (!userPvid) return;
  
      try {
        const result = await axios.get(BASE_URL+`Api/IdentityUser/GetById?Pvid=${userPvid}`, {
          headers: await config()
        });
        setUserProfile(result.data.data);
        // console.log('cek profile', result.data.data)
      } catch (error) {
        console.error('Fetch user profile error:', error);
      }
    }
  
    useEffect(() => {
      fetchUserProfile();
    }, [userPvid]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get(BASE_URL+`Api/Article/GetByKey?articleKey=${articleKey}`, {
            headers: await config(),
        });
        setDetailArticle(response.data.data);
        setHtmlStringArticle(response.data.data.content);
        setArticleCategory(response.data.data.articleCategory);
        setRelatedAthlete(response.data.data.athleteRelated);
        const transformData = response.data.data.articleRelated.map((relatedArticle) => ({
            ...relatedArticle,
            key: relatedArticle.title.toLowerCase().replace(/\s+/g, '-'),
        }));
        setRelatedArticle(transformData);
        // console.log('Test Params', response.data.data);
        
        const result = await getListRelatedNews();
        setListNews(result.data.data);
        } catch (error) {
        console.error(error);
        }
    };
    
    fetchData();
    }, [articleKey]);

    useEffect(() => {
        const fetchEventData = async () => {
          if (articleCategory?.name === 'EVENT') {
            try {
              const eventResponse = await axios.get(BASE_URL+`Api/Event/GetByArticleId?Pvid=${detailArticle.pvid}`,{
                headers: await config()
              });
              const { data: eventData } = eventResponse.data;
              setEventData(eventData);
            //   console.log('cek event', eventData);
            } catch (error) {
              console.error(error);
            }
          }
        };
    
    fetchEventData();
    }, [articleCategory, detailArticle]);

    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    const [eventStartList, setEventStartList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  
    const fetchEventStartList = async () => {
      try {
        setLoading(true);
        const result = await axios.get(BASE_URL+`Api/Event/GetStartingListPublic?EventPvid=${eventData.pvid}`, {
          headers: await config()
        });
        setEventStartList(result.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch event start list error:', error);
        setLoading(false);
      }
    }
  
    useEffect(() => {
      fetchEventStartList();
    }, []);
  
    const toggleModal = () => {
        fetchEventStartList();
        setIsModalOpen(!isModalOpen);
    };
  
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleAccordion = (index) => {
      if (openIndex === index) {
        setOpenIndex(null);
      } else {
        setOpenIndex(index);
      }
    };
    
  return (
    <div>
        {/* <SubAboutUs /> */}
        <div className="relative max-h-[600px]">
            <div>
                {detailArticle && (
                    <img
                        className="object-scale-down max-h-[600px] w-full"
                        src={detailArticle.imageCoverUrl ? BASE_URL_+`${detailArticle.imageCoverUrl}` : ImageNotFound}
                        alt=""
                    />
                )}
                <div className="max-w-[1240px] mx-auto">
                <div 
                className="absolute left-0 top-0 w-full h-full z-[5]" 
                style={{
                    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0) 30% , rgba(0,0,0,0.9)",
                    }}>
                </div>
                <div className="absolute z-[999] bottom-[8%] p-5 xl:p-0">
                    <div className="text-white hidden md:block text-[1.5rem] font-semibold">
                        <span className="text-primary font-semibold">
                            {articleCategory.name}
                        </span>{" "}
                        | <span>{detailArticle.publishDate ? moment(detailArticle.publishDate).format('DD MMM YYYY') : ''}</span>
                    </div>
                    <div className="mt-1 text-white text-[1.3rem] md:text-[2rem] hidden lg:block md:block font-semibold lg:text-[2.5rem] md:max-w-[100%] md:border-t-[4px] border-secondary border-dotted">
                        {/* {detailArticle.title} */}
                        {detailArticle && detailArticle.title && detailArticle.title.split(" ").map((word, index) => (
                            <>
                                {index > 0 && index % 7 === 0 && <br />}
                                {word}{" "}
                            </>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div className='container my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
            <div className='pb-4 lg:hidden md:hidden'>
                <div className="text-black text-[1rem]">
                    <span className="text-primary">
                        {articleCategory.name}
                    </span>{" "}
                    | <span>{detailArticle.publishDate ? moment(detailArticle.publishDate).format('DD MMM YYYY') : ''}</span>
                </div>
                <div className="mt-1 text-black text-[1.2rem] font-semibold border-t-[3px] border-secondary border-dotted">
                    {detailArticle.title}
                </div>
                {/* <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-200"></hr> */}
            </div>
            <div className='flex flex-wrap -mx-1 lg:-mx-4 grid lg:grid-cols-3 gap-4'>
                <div className='my-1 px-1 w-full lg:my-4 lg:px-4 lg:col-span-2'>
                    <p>
                        <div dangerouslySetInnerHTML={{__html: htmlStringArticle}} />
                    </p>

                    <div className='py-4 text-primary flex justify-end'>
                        <Link to="#" onClick={() => window.history.back()}>
                            <div>BACK</div>
                        </Link>
                    </div>
                </div>
                <div className='my-1 px-4 pb-4 text-white w-full lg:px-1 md:px-4 lg:my-4 lg:px-4 bg-secondary'>
                    <div>
                        {articleCategory.name !== 'EVENT' && (
                            <>
                            <div className="text-white pt-4 uppercase md:border-b-[3px] border-white border-dotted">
                                  <h2 className='text-[20px]'>Pages related to this article</h2>
                            </div>
                            
                            <div className='text-white py-4'>
                                <h3 className='text-[20px]'>Athletes</h3>
                            </div>
                            
                            <div className='px-1'>
                                {relatedAthlete.map((listItem) => (
                                    <div className="flex pb-2" key={listItem.pvid}>
                                        <Link to={`/athlete-profile/${listItem.pvid}`} className='flex items-center no-underline'>
                                            <Icon
                                                className="h-[18px] w-auto mr-[10px]"
                                                icon="icon-park-solid:people" />
                                            <p className='text-[14px]'>{listItem.name}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <div className='text-white py-4 pt-10'>
                                <h3 className='text-[20px]'>Related Articles</h3>
                            </div>
                            
                            <div className='px-1'>
                                {relatedArticle.map((listItem) => (
                                    <div className="flex pb-2" key={listItem.key}>
                                        <Link to={`/latest-news/${listItem.key}`} className='flex items-center no-underline'>
                                            <Icon
                                                className="h-[16px] w-auto mr-[10px]"
                                                icon="zondicons:news-paper" />
                                            <p className='text-[14px]'>{listItem.title}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            </>
                        )}
                    </div>

                    <div>
                        {articleCategory?.name === 'EVENT' && eventData && (
                            <div>
                                <div className="text-white pt-4 uppercase md:border-b-[3px] border-white border-dotted">
                                <h2 className='text-[20px]'>Detail Event</h2>
                                </div>

                                <div className='text-white py-4'>
                                    <h4 className='text-[18px] pb-4'>{eventData.name}</h4>

                                    <div className='flex items-center pb-4'>
                                        <Icon
                                        className="h-[18px] w-auto mr-[10px]"
                                        icon="uiw:date" 
                                        />
                                        {moment(eventData.date).format('MMM YYYY') === moment(eventData.endDate).format('MMM YYYY') ? (
                                        <p className="whitespace-no-wrap px-2">{moment(eventData.date).format('DD')} - {moment(eventData.endDate).format('DD MMM YYYY')}</p>
                                        ) : (
                                        <p className="whitespace-no-wrap px-2">{moment(eventData.date).format('DD MMM YYYY')} - {moment(eventData.endDate).format('DD MMM YYYY')}</p>
                                        )}
                                    </div>

                                    <div className='flex items-center pb-4'>
                                        <Icon
                                        className="h-[20px] w-auto mr-[8px]"
                                        icon="uiw:environment-o" 
                                        />
                                        <p className='whitespace-no-wrap px-2'>{eventData.venue}</p>
                                    </div>

                                    <div className='flex items-center pb-4'>
                                        <Icon
                                        className="h-[18px] w-auto mr-[10px]"
                                        icon="uiw:menu" 
                                        />
                                        <p className='whitespace-no-wrap px-2'>{eventData.eventType.name}</p>
                                    </div>

                                    <div className='flex items-center pb-4'>
                                        <Icon
                                        className="h-[18px] w-auto mr-[10px]"
                                        icon="uiw:reload" 
                                        />
                                        {eventData.eventHeldStatus && eventData.eventHeldStatus.name ? (
                                            <div>
                                                {eventData.eventHeldStatus.name === 'Result' ? (
                                                    <p className="whitespace-no-wrap px-2">
                                                        <span className={eventData.eventHeldStatus.name !== 'Coming Soon' ? 'line-through' : ''}>Coming Soon</span> |&nbsp;
                                                        <span className={eventData.eventHeldStatus.name !== 'Register' ? 'line-through' : 'line-through'}>Register</span> |&nbsp;
                                                        <a
                                                        href={BASE_URL_+`${eventData.resultFileUrl}`}
                                                        target="_blank"
                                                        className="whitespace-no-wrap text-blue-800 underline"
                                                        >
                                                        <span className={eventData.eventHeldStatus.name !== 'Result' ? 'line-through' : ''}>Result</span>
                                                        </a> |&nbsp;
                                                        <span className={eventData.eventHeldStatus.name !== 'Closed' ? 'line-through' : 'line-through'}>Closed</span> |&nbsp;
                                                        <span className={eventData.eventHeldStatus.name !== 'Cancel ' ? 'line-through' : 'line-through'}>Cancelled</span> |&nbsp;
                                                        <span className={eventData.eventHeldStatus.name !== 'Postpone' ? 'line-through' : 'line-through'}>Postponed</span>
                                                    </p>
                                                    ) : (
                                                    <p className="whitespace-no-wrap px-2">
                                                        <span className={eventData.eventHeldStatus.name === 'Coming Soon' ? '' : 'line-through'}>Coming Soon</span> |&nbsp;
                                                        {/* <span className={(eventData.eventHeldStatus.name === 'Coming Soon' || eventData.eventHeldStatus.name === 'Closed' || (eventData.eventHeldStatus.name === 'Register' && userProfile.userType === 'Club')) ? 'line-through' : 'text-blue-800 underline'}>
                                                            {userProfile.userType === 'Club' ? (
                                                                < 
                                                                // to="/account/events"
                                                                >Register</>
                                                            ) : (
                                                                <
                                                                // to={`/event-register/${eventData.pvid}`}
                                                                >Register</>
                                                            )}
                                                        </span> |&nbsp; */}
                                                        <span className={eventData.eventHeldStatus.name === 'Register' ? '' :'line-through'}>Register</span> |&nbsp;
                                                        <span className={eventData.eventHeldStatus.name === 'Result' ? '' :'line-through'}>Result</span> |&nbsp;
                                                        <span className={eventData.eventHeldStatus.name === 'Closed' ? '' :'line-through'}>Closed</span> |&nbsp;
                                                        <span className={eventData.eventHeldStatus.name === 'Cancel ' ? '' :'line-through'}>Cancelled</span> |&nbsp;
                                                        <span className={eventData.eventHeldStatus.name === 'Postpone' ? '' :'line-through'}>Postponed</span> 
                                                    </p>
                                                )}
                                            </div>
                                            ) : (
                                            <p className="text-gray-900 whitespace-no-wrap">Not Available</p>
                                        )}
                                    </div>

                                    <div className='flex items-center pb-4'>
                                        <Icon
                                        className="h-[20px] w-auto mr-[8px]"
                                        icon="codicon:debug-restart-frame" 
                                        />
                                        <button onClick={toggleModal}>
                                            <p className='whitespace-no-wrap px-2 text-blue-800 underline'>Start List</p>
                                        </button>
                                    </div>
                                </div>

                                {isModalOpen && (
                                        <div>
                                            <div className="fixed inset-0 bg-black opacity-50 z-[9999]"></div> {/* Overlay hitam */}
                                            <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                                            <div className="modal">
                                                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg w-[370px] lg:w-[1000px] md:w-[800px] h-[600px] overflow-y-auto relative"> {/* Tambahkan relative */}
                                                <button
                                                    onClick={toggleModal}
                                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                                                >
                                                    Close
                                                </button>
                                                <h1 className="lg:text-2xl md:text-xl text-lg text-black font-semibold">{eventData.name}</h1>
                                                <div className='text-black text-xs lg:text-lg font-semibold mb-4'>
                                                    {moment(eventData.date).format('MMM YYYY') === moment(eventData.endDate).format('MMM YYYY') ? (
                                                    <p className="whitespace-no-wrap">{moment(eventData.date).format('DD')} - {moment(eventData.endDate).format('DD MMM YYYY')}</p>
                                                    ) : (
                                                    <p className="whitespace-no-wrap">{moment(eventData.date).format('DD MMM YYYY')} - {moment(eventData.endDate).format('DD MMM YYYY')}</p>
                                                    )}
                                                </div>
                                                {loading ? (
                                                    <p className='text-black py-24 text-center'>Loading...</p>
                                                    ) : eventStartList && eventStartList.length > 0 ? (
                                                    eventStartList.map((faq, index) => (
                                                        <StartListAccordion
                                                        key={index}
                                                        question={faq.schName}
                                                        date={faq.eventDate}
                                                        answers={faq.athletes}
                                                        isOpen={openIndex === index}
                                                        toggleAccordion={() => toggleAccordion(index)}
                                                        />
                                                    ))
                                                    ) : (
                                                    <p className='text-black py-24 text-center'>Not Available</p>
                                                )}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    )}

                                {eventData.eventType.name === 'Overseas Competitions' && eventData.resultReferenceLink !== null && (
                                <div>
                                    <div className="text-white pt-4 uppercase md:border-b-[3px] border-white border-dotted">
                                    <h2 className='text-[20px]'>Overseas Reference Link</h2>
                                    </div>
                                    <div className='text-white py-4'>
                                    <div className='flex items-center pb-4'>
                                        <a 
                                        // href={eventData.resultReferenceLink} 
                                        className='flex items-center max-w-xs' target='_blank'>
                                            {/* <Icon className="h-[18px] w-auto mr-[10px]" icon="ph:hash" /> */}
                                            <p className='whitespace-no-wrap text-blue-800 underline cursor-pointer'>{eventData.resultReferenceLink}</p>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className='container my-12 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
            <div className='text-[20px]'>
                Latest News
            </div>
            <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                {/* Column */}
                {listNews.map((listItem) => ( 
                    <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3' key={listItem.articleKey}>
                        {/* Article */}
                        <div className='overflow-hidden rounded shadow-lg'>
                            {listItem.articleCategory.name === 'EVENT' ? (
                                <Link to={`/events-&-competitions/calendar/${listItem.articleKey}`}>
                                    <img
                                        src={listItem.imageCoverUrl ? BASE_URL_+`${listItem.imageCoverUrl}` : ImageNotFound}
                                        className='block object-scale-down w-full h-64 max-h-full'
                                    />
                                </Link>
                            ) : (
                                <Link to={`/latest-news/${listItem.articleKey}`}>
                                    <img
                                        src={listItem.imageCoverUrl ? BASE_URL_+`${listItem.imageCoverUrl}` : ImageNotFound}
                                        className='block object-scale-down w-full h-64 max-h-full'
                                    />
                                </Link>
                            )}

                            <div className='leading-tight p-2 md:p-4'>
                                <div className="pb-1 border-b-[3px] border-dotted border-secondary">
                                    <span className="text-primary font-semibold">
                                        {listItem.articleCategory.name}
                                    </span>{" "}
                                    | 
                                    <span> {moment(listItem.publishDate).format('DD MMM YYYY')}</span>
                                </div>

                                <div className='pt-4'>
                                    {listItem.articleCategory.name === 'EVENT' ? (
                                        <Link to={`/events-&-competitions/calendar/${listItem.articleKey}`} className='flex items-center no-underline text-black'>
                                            <h3 className='text-secondary text-[1.25rem] font-bold text-limit-2' dangerouslySetInnerHTML={{ __html: listItem.title.split(' ').length < 7 ? listItem.title + '<br/><br/>' : listItem.title }}></h3>
                                        </Link>
                                    ) : (
                                        <Link to={`/latest-news/${listItem.articleKey}`} className='flex items-center no-underline text-black'>
                                            <h3 className='text-secondary text-[1.25rem] font-bold text-limit-2' dangerouslySetInnerHTML={{ __html: listItem.title.split(' ').length < 7 ? listItem.title + '<br/><br/>' : listItem.title }}></h3>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* End Column */}
                    </div>
                ))}
                
            </div>
            <div className='py-4 text-primary flex justify-end'>
                <Link to='/latest-news'>
                    <div>More News</div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default DetailArticle