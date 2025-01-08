import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { config, getCategories } from '../service/api';
import { Link, NavLink } from 'react-router-dom';
import moment from 'moment';
import { BASE_URL, BASE_URL_ } from '../service/config';
function AnnualGeneralMeetingCard() {
    const [annualMeeting, setAnnualMeeting] = useState([]);
    const [annualCategory, setAnnualCategory] = useState('7');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const result = await axios.get(BASE_URL+`Api/Article/GetLastArticleByCategory?articleCategoryPvid=${annualCategory}&Count=6` ,{
    //         headers: config()
    //       });
    //       const transformData = result.data.data.map(annualMeeting => ({
    //         ...annualMeeting,
    //         category: annualMeeting.articleCategoryPvid === 1 ? "Report" : annualMeeting.articleCategoryPvid === 2 ? "News" : undefined
    //       }))
    //       setAnnualMeeting(transformData);
    //       console.log('cek article',transformData)
    //     };
    //     fetchData();
    // }, [annualCategory]);

    //   const handleCategoryChange = (category) => {
    //     setAnnualCategory(category);
    //     setIsDropdownOpen(false);
    //   };

      const [articleData, setArticleData] = useState([]);
      useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            BASE_URL+`Api/Article/GetLastArticleByCategory?articleCategoryPvid=${annualCategory}&Count=99`,{
              headers: await config()
            }
          );
          const articleContent = response.data.data;
          const updatedContent = await Promise.all(
            articleContent.map(async (article) => {
              const contentResponse = await axios.get(
                BASE_URL+`Api/Article/GetByKey?articleKey=${article.articleKey}`,{
                  headers: await config()
                }
              );
              const articleContent = contentResponse.data.data;
              return { ...article, content: articleContent };
            })
          );
          // console.log('update profile', updatedContent)
          const data = updatedContent.map((article, index) => {
              return {
                  pvid: article.pvid,
                  articleKey: article.articleKey,
                  cover: article.imageCoverUrl,
                  date: article.publishDate,
                  category: article.articleCategoryPvid,
                  name: article.title,
                  // content: article.content
              }
          });
          const categoriesResult = await getCategories();
          const categories = categoriesResult.data.data;
          const transformData = data.map(annualMeeting => ({
            ...annualMeeting,
            category: categories.find(category => category.pvid === annualMeeting.category)?.name || undefined,
          }))
          setArticleData(transformData);
          // console.log('cek content',data)
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [annualCategory]);
    // console.log('cek data', articleData)

    const handleCategoryChange = (category) => {
        setAnnualCategory(category);
        setIsDropdownOpen(false);
    };

    const [selectedYear, setSelectedYear] = useState(moment().year());
    const [activeTab, setActiveTab] = useState(moment().year());

    const years = Array.from(
      { length: moment().year() - 2012 },
      (value, index) => moment().year() - index
    );

    const handleChange = (event) => {
      setSelectedYear(parseInt(event.target.value));
      setActiveTab(parseInt(event.target.value));
    };

    const handleTabClick = (year) => {
      setActiveTab(year);
    };

    // console.log('cek select years', selectedYear)
  return (
    <div>
        <div className='pb-2'>
          <div className="border-b-[3px] flex border-dotted border-secondary">
            <h2 className='p-5 flex mt-1 text-primary text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Annual General Meeting <span className='text-gray-600 px-2'>|</span>
              <span className='font-normal text-gray-600'>
                <select
                  className="block w-full max-w-md p-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  value={selectedYear}
                  onChange={handleChange}
                >
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year - 3} - {year}
                    </option>
                  ))}
                  </select>
              </span>
            </h2>
          </div>
        </div>

        <div className='container my-6 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
            <div className=''>
                <div className="border-b-[3px] border-dotted border-secondary">
                    <div className='grid grid-cols-4 gap-4 relative'>
                      {Array.from({ length: 4 }, (v, i) => selectedYear - i).map((year) => (
                        <button
                          key={year}
                          className={`${
                            year === activeTab ? 'bg-primary text-white flex justify-center p-1 lg:tracking-[1rem]' : 'bg-primary text-white flex justify-center p-1 lg:tracking-[1rem] opacity-50'
                          } px-6 py-2 rounded-sm mr-2 mb-2`}
                          onClick={() => handleTabClick(year)}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 pt-6 gap-4'>
                        <div className='flex py-2'>
                            {articleData.length > 0 &&
                            <h2 className='lg:pl-0 mt-1 text-primary font-bold text-[1rem] md:text-[1.3rem] lg:text-[1.3rem]'><h2 className='lg:pl-0 mt-1 text-primary font-bold text-[1rem] md:text-[1.3rem] lg:text-[1.3rem]'>{articleData[0].category.charAt(0).toUpperCase() + articleData[0].category.slice(1).toLowerCase()}</h2>                            </h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='container py-2 mx-auto lg:px-0'>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                  <div className="container mx-auto mt-1">
                    <div className="flex flex-wrap">
                      {articleData && Object.keys(articleData).some((key) => moment(articleData[key].date).year() === activeTab) ? (
                        Object.keys(articleData).map((key) => {
                          if (moment(articleData[key].date).year() !== activeTab) {
                            return null;
                          }
                          return (
                            <div
                              className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                              key={key}
                            >
                              <div className="overflow-hidden rounded shadow-lg">
                                <Link to={`/about-us/latest-news/${articleData[key].articleKey}`}>
                                  <img
                                    src={BASE_URL_+`${articleData[key].cover}`}
                                    className="block object-cover w-full h-64 max-h-full"
                                  />
                                </Link>
                                <div className="leading-tight p-2 md:p-4">
                                  <div className="pb-1 border-b-[3px] border-dotted border-secondary">
                                    <span>{moment(articleData[key].date).format('DD MMM YYYY')}</span>
                                  </div>
                                  <div className="pt-4">
                                    <Link
                                      to={`/about-us/latest-news/${articleData[key].articleKey}`}
                                      className="flex items-center no-underline text-black"
                                    >
                                      <h3
                                        className="text-secondary text-[1.25rem] font-bold text-limit-2"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            articleData[key].name.split(' ').length < 7
                                              ? `${articleData[key].name}<br/><br/>`
                                              : articleData[key].name,
                                        }}
                                      ></h3>
                                    </Link>
                                  </div>
                                  {/* <p className="text-gray-700 mt-2 text-limit-3">
                                    <div dangerouslySetInnerHTML={{ __html: articleData[key].content && articleData[key].content.content }}></div>
                                  </p> */}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className='px-1 lg:px-4'>Not Available</p>
                      )}
                    </div>

                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AnnualGeneralMeetingCard