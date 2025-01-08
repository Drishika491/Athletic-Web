import React, { useEffect, useState } from 'react';
import { config, getCategories, getListNews } from '../service/api';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import ImageNotFound from '../assets/not-found.png';
import { BASE_URL,BASE_URL_ } from '../service/config';
function LatestNewsCard() {
  const [displayCount, setDisplayCount] = useState(6);
  const [articleData, setArticleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          BASE_URL+`Api/Article/GetLastArticle?Count=${displayCount}`,
          {
            headers: await config()
          }
        );
        setArticleData(response.data.data);
        console.log('cek last news', response.data.data)
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [displayCount]);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 6);
  };

  return (
    <div>
      <div className='pb-5'>
        <div className='border-b-[3px] border-dotted border-primary'>
          <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>
            Latest News
          </h2>
        </div>
      </div>
      <div className='container my-6 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
        <div className='flex flex-wrap -mx-1 lg:-mx-4'>
          {/* Column */}
          {articleData.slice(0, displayCount).map((listItem) => (
            <div
              className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
              key={listItem.articleKey}
            >
              {/* Article */}
              <div className='overflow-hidden rounded shadow-lg'>
                {listItem.articleCategory.name === 'EVENT' ? (
                  <Link to={`/events-&-competitions/calendar/${listItem.articleKey}`}>
                    <img
                      src={
                        listItem.imageCoverUrl
                          ? BASE_URL_+`${listItem.imageCoverUrl}`
                          : ImageNotFound
                      }
                      className='block object-contain w-full h-64 max-h-full'
                    />
                  </Link>
                ) : (
                  <Link to={`/latest-news/${listItem.articleKey}`}>
                    <img
                      src={
                        listItem.imageCoverUrl
                          ? BASE_URL_+`${listItem.imageCoverUrl}`
                          : ImageNotFound
                      }
                      className='block object-contain w-full h-64 max-h-full'
                    />
                  </Link>
                )}

                <div className='leading-tight p-2 md:p-4'>
                  <div className='pb-1 border-b-[3px] border-dotted border-secondary'>
                    <span className='text-primary font-semibold'>
                      {listItem.articleCategory.name
                        .split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')}
                    </span>{' '}
                    | <span>{moment(listItem.publishDate).format('DD MMM YYYY')}</span>
                  </div>

                  <div className='pt-4'>
                    {listItem.articleCategory.name === 'EVENT' ? (
                      <Link
                        to={`/events-&-competitions/calendar/${listItem.articleKey}`}
                        className='flex items-center no-underline text-black'
                      >
                        <h3
                          className='text-secondary text-[1.25rem] font-bold text-limit-2'
                          dangerouslySetInnerHTML={{
                            __html:
                              listItem.title.split(' ').length < 7
                                ? listItem.title + '<br/><br/>'
                                : listItem.title
                          }}
                        ></h3>
                      </Link>
                    ) : (
                      <Link
                        to={`/latest-news/${listItem.articleKey}`}
                        className='flex items-center no-underline text-black'
                      >
                        <h3
                          className='text-secondary text-[1.25rem] font-bold text-limit-2'
                          dangerouslySetInnerHTML={{
                            __html:
                              listItem.title.split(' ').length < 7
                                ? listItem.title + '<br/><br/>'
                                : listItem.title
                          }}
                        ></h3>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* End Column */}
        </div>
        {articleData.length >= 6 && (
          <div className='py-4 text-primary flex justify-end'>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <button onClick={handleLoadMore}>Load More</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LatestNewsCard;
