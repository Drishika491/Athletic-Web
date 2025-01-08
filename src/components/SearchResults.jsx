import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { config } from '../service/api';
import ImageNotFound from '../assets/not-found.png';
import moment from 'moment';
import { BASE_URL,BASE_URL_ } from '../service/config';
function SearchResults() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const location = useLocation();
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    const fetchResults = async () => {
      const queryParam = encodeURIComponent(query);
    
      try {
        const searchResponse = await axios.get(BASE_URL+`Api/Article/Search?Key=${queryParam}&ResultCount=${displayCount}`, {
          headers: await config()
        });

        const allResults = searchResponse.data.data;
        setResults(allResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after data is fetched
      }

      const searchResultsHeader = document.getElementById('search-results-header');
      searchResultsHeader.innerText = `You Searched For: ${query}`;
    };       

    fetchResults();
  }, [location, displayCount]);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 6);
  };

  return (
    <div>
      <div className='pb-5'>
        <div className="border-b-[3px] border-dotted border-primary">
          <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]' id="search-results-header">You Searched For: </h2>
        </div>
      </div>
      <div className='container my-6 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
        {isLoading ? ( // Render "Loading..." when data is being fetched
          <p>Loading...</p>
        ) : (
        <div className='flex flex-wrap -mx-1 lg:-mx-4'>
          {results && results.length > 0 ? (
            results.map((result) => (
              <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3' key={result.id}>
                <div className='overflow-hidden rounded shadow-lg'>
                  <Link to={result.type === 'Article' ? `/latest-news/${result.referenceId}` : result.type === 'Athlete' ? `/athlete-profile/${result.referenceId}` : result.type === 'Menu' ? `/${result.referenceId.toLowerCase().replace(/\s+/g, '-')}` : `/events-&-competitions/calendar/${result.referenceId}`}>
                    <img src={result.imageUrl && result.imageUrl !== 'null' ? BASE_URL_ + result.imageUrl : ImageNotFound} alt="Result Image" className='block object-cover w-full h-64 max-h-full' />
                  </Link>
                  <div className='leading-tight p-2 md:p-4'>
                    <div className='pb-1 border-b-[3px] border-dotted border-secondary'>
                      <span className='text-primary font-semibold'>
                        {result.category
                          .split(' ')
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                          .join(' ')}
                      </span>{' '}
                      {result.type !== 'Menu' && (
                        <>
                          |
                          <span> {result.date.replace('until', '-')}</span>
                        </>
                      )}
                    </div>
                    <div className='pt-4'>
                      <Link to={result.type === 'Article' ? `/latest-news/${result.referenceId}` : result.type === 'Athlete' ? `/athlete-profile/${result.referenceId}` : result.type === 'Menu' ? `/${result.referenceId.toLowerCase().replace(/\s+/g, '-')}` : `/events-&-competitions/calendar/${result.referenceId}`}>
                        <h3 className='text-secondary text-[1.25rem] font-bold text-limit-2' dangerouslySetInnerHTML={{ __html: result.title.split(' ').length < 7 ? result.title + '<br/><br/>' : result.title }}></h3>
                      </Link>
                    </div>
                    <div className='pt-2 text-limit-1'>
                      <p>{result.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <p className='px-4'>No search results</p>
          )}
        </div>
        )}
        {results.length >= 6 && (
          <div className='py-4 text-primary flex justify-end'>
            <button onClick={handleLoadMore}>
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>        
        )}
      </div>
      {/* <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title || result.name}</li>
        ))}
      </ul> */}

    </div>
  );
}

export default SearchResults;
