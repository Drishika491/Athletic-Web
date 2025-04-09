import React, { useEffect, useState } from 'react';
import { config } from '../service/api';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Icon } from '@iconify/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getUserPvid } from '../utils/auth';
import { BASE_URL, BASE_URL_ } from '../service/config';
function CalendarTable() {
  const [events, setEvents] = useState([]);
  console.log('events>>>>',events);
  
  const [dateFrom, setDateFrom] = useState('');
  const [imageCoverUrl, setImageCoverUrl] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventHeldStatus, setEventHeldStatus] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [displayedData, setDisplayedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
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
        setLoading(true);
        const response = await axios.get(BASE_URL+'Api/Event/GetListPublic', {
          params: {
            DateFrom: dateFrom,
            DateTo: dateTo,
            SearchKey: searchKey,
            EventTypePvid: eventType,
            EventHeldStatusPvid: eventHeldStatus,
            Page: currentPage,
            PageRow: itemsPerPage,
            ShowComplitedEvent: false,
            imageCoverUrl: imageCoverUrl,
          },
          headers: await config()
        });
        

        // debugger;


        setEvents(response.data.data.data);
        setLoading(false);
        // Calculate the total number of pages based on totalData and itemsPerPage
        setTotalPages(Math.ceil(response.data.data.totalData / itemsPerPage));
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dateFrom, dateTo, eventType, eventHeldStatus, searchKey, currentPage , imageCoverUrl]);

  const handleDateFromChange = (selectedDate) => {
    setDateFrom(selectedDate);
  };
  
  const handleDateToChange = (selectedDate) => {
    setDateTo(selectedDate);
  };
  

  const handleClear = () => {
    setDateFrom('');
    setDateTo('');
    setEventType('');
    setEventHeldStatus('');
    setSearchKey('');
    setCurrentPage(1);
    setImageCoverUrl('');
  };

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    // setDisplayedData(events.slice(firstIndex, lastIndex));
  }, [events, currentPage]);

  // Modify the onClick handlers to update currentPage directly
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // ... (existing useEffect and other code)

  // Calculate the start and end page numbers for the pagination display
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <div>
      <div className="pb-5">
        <div className="border-b-[3px] border-dotted border-primary">
          <div className="container mx-auto px-0 md:px-10 lg:px-0 max-w-[1340px]">
            <div className="flex grid grid-cols-2">
              <div>
                <h2 className="p-5 lg:px-0 mt-1 md:px-0 text-black text-[1rem] md:text-[1.3rem] lg:text-[1.5rem]">Calendar</h2>
              </div>
              <div className="flex lg:justify-end px-0 p-5 lg:px-0">
                <h2 className="lg:pl-12 mt-1 text-secondary text-[1rem] md:text-[1.3rem] lg:text-[1.5rem]">Search</h2>
                <div className="pl-4 pr-2 pb-2">
                  <div className="flex items-center bg-gray-100 p-2 px-3 rounded-md">
                    <input
                      type="text"
                      id="searchKey"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      className="appearance-none bg-transparent outline-none rounded w-full px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <Icon className="h-[1.5rem] w-auto text-primary" icon="ic:outline-search" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-6 mx-auto px-4 md:px-10 lg:px-0 max-w-[1340px]">
        <div className="">
          <div className="border-b-[3px] border-dotted border-secondary">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              <div className="flex">
                <h2 className="mt-1 text-secondary lg:block md:block hidden text-[1rem] md:text-[1.3rem] lg:text-[1.3rem]">Filter</h2>
                <div className="lg:px-4 pb-2">
                  <DatePicker
                    selected={dateFrom}
                    placeholderText='Start Date'
                    onChange={handleDateFromChange}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={10}
                    showMonthDropdown
                    className="block bg-gray-100 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="px-4 pb-2">
                  <DatePicker
                    selected={dateTo}
                    placeholderText='End Date'
                    onChange={handleDateToChange}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={10}
                    showMonthDropdown
                    className="block bg-gray-100 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="flex">
                <h2 className="lg:pl-12 mt-1 text-secondary text-[1rem] md:text-[1.3rem] lg:text-[1.3rem]">Type</h2>
                <div className="px-4 pb-2">
                  <select
                    id="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="appearance-none bg-gray-100 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">All</option>
                    <option value="1">Local Competitions</option>
                    <option value="2">Overseas Competitions</option>
                    <option value="3">Courses</option>
                    <option value="4">Workshops</option>
                  </select>
                </div>
              </div>
              <div className="flex">
                <h2 className="lg:pl-0 mt-1 text-secondary text-[1rem] md:text-[1.3rem] lg:text-[1.3rem]">Event Status</h2>
                <div className="px-4 pb-2">
                  <select
                    id="eventHeldStatus"
                    value={eventHeldStatus}
                    onChange={(e) => setEventHeldStatus(e.target.value)}
                    className="appearance-none bg-gray-100 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">All</option>
                    <option value="1">Coming Soon</option>
                    <option value="2">Register</option>
                    <option value="3">Result</option>
                    <option value="4">Closed</option>
                    <option value="5">Cancelled</option>
                    <option value="6">Postponed</option>
                  </select>
                </div>
                <div>
                  <button onClick={handleClear} className="p-1 bg-secondary mt-0.5 w-40 text-white">Clear</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-1 lg:-mx-0">
          <div className="container mx-auto lg:px-0 sm:px-4">
            <div className="py-2">
              <div className="-mx-4 sm:-mx-8 px-4 md:px-0 lg:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    {/* <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-r-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                        <th className="px-5 py-3 border-b-2 border-r-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Event</th>
                        <th className="px-5 py-3 border-b-2 border-r-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Type</th>
                        <th className="px-5 py-3 border-b-2 border-r-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Event Status</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Venue</th>
                      </tr>
                    </thead> */}
                    <tbody>
  {events.length > 0 ? (
    events.map((listItem) => (
      <tr key={listItem.pvid}>
        {console.log('listItem.name', listItem.eventHeldStatus.name, listItem.imageCoverUrl)}
        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex">
            <div className="">
              {moment(listItem.date).format('MMM YYYY') === moment(listItem.endDate).format('MMM YYYY') ? (
                <p className="whitespace-no-wrap">{moment(listItem.date).format('DD')} - {moment(listItem.endDate).format('DD MMM YYYY')}</p>
              ) : (
                <p className="whitespace-no-wrap">{moment(listItem.date).format('DD MMM YYYY')} - {moment(listItem.endDate).format('DD MMM YYYY')}</p>
              )}
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {listItem.articleKey ? (
            <Link to={`/events-&-competitions/calendar/${listItem.articleKey}`}>
              {listItem.name ? (
                <p className="text-gray-900 whitespace-no-wrap">{listItem.name}</p>
              ) : (
                <p className="text-gray-900 whitespace-no-wrap">Not Available</p>
              )}
            </Link>
          ) : (
            <p className="text-gray-900 whitespace-no-wrap">{listItem.name || 'Not Available'}</p>
          )}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {listItem.eventType && listItem.eventType.name ? (
            <p className="text-gray-900 whitespace-no-wrap">{listItem.eventType.name}</p>
          ) : (
            <p className="text-gray-900 whitespace-no-wrap">Not Available</p>
          )}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {listItem.eventHeldStatus && listItem.eventHeldStatus.name ? (
            <p
              className={`whitespace-no-wrap ${
                listItem.eventHeldStatus.name === 'Coming Soon'
                  ? 'text-green-400'
                  : listItem.eventHeldStatus.name === 'Register'
                  ? 'text-[#687bbb]'
                  : listItem.eventHeldStatus.name === 'Result'
                  ? 'text-red-400'
                  : ''
              }`}
            >
              {listItem.eventHeldStatus.name === 'Result' && listItem.resultFileUrl !== null ? (
                <a href={BASE_URL_ + `${listItem.resultFileUrl}`} target="_blank" rel="noopener noreferrer">
                  {listItem.eventHeldStatus.name}
                </a>
              ) : listItem.eventHeldStatus.name === 'Register' && userProfile.userType === 'Club' ? (
                <Link to={`/account/events`}>{listItem.eventHeldStatus.name}</Link>
              ) : listItem.eventHeldStatus.name === 'Register' ? (
                <Link to={`/event-register/${listItem.pvid}`}>{listItem.eventHeldStatus.name}</Link>
              ) : listItem.eventHeldStatus.name === 'Cancel ' ? (
                'Cancelled'
              ) : listItem.eventHeldStatus.name === 'Postpone' ? (
                'Postponed'
              ) : (
                listItem.eventHeldStatus.name
              )}
            </p>
          ) : (
            <p className="text-gray-900 whitespace-no-wrap">Not Available</p>
          )}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {listItem.venue ? (
            <p className="text-gray-900 whitespace-no-wrap">{listItem.venue}</p>
          ) : (
            <p className="text-gray-900 whitespace-no-wrap">Not Available</p>
          )}
        </td> */}
        <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm mb-4">
          <div className="flex flex-col md:flex-row items-start gap-4">
    
            {/* Event Image / Logo */}
            <div className="md:w-1/5 w-full h-full">
            <Link to={`/events-&-competitions/calendar/${listItem.articleKey}`}>
            <img
            src={
            listItem.imageCoverUrl
            ? BASE_URL_ + listItem.imageCoverUrl
            : BASE_URL_ + "/api/Image/X-12CB-6957a13d5fd349dcb71bccc1bed786b9.png"
            }
            alt="Event"
            className="w-full h-[200px] object-cover rounded-md"
            onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/event-placeholder.png";
            }}
            />

        </Link>
    </div>

    {/* Center Content */}
    <div className="flex-1">
      {/* Date Range */}
      <div className="flex gap-1 mb-3">
  {/* Start Date */}
  <div className="flex items-center gap-2">
  {/* Start Date Calendar */}
  <div className="w-14 border rounded-md overflow-hidden shadow-sm">
    <div className="bg-red-600 text-white text-xs font-semibold text-center py-1"> 
      {moment(listItem.date).format("MMM")}
    </div>
    <div className="text-center text-black font-bold text-lg py-1">
      {moment(listItem.date).format("DD")}
    </div>
  </div>

  {/* Line */}
  <div className="h-px bg-gray-400 flex-1"></div>

  {/* End Date Calendar */}
  <div className="w-14 border rounded-md overflow-hidden shadow-sm">
    <div className="bg-red-600 text-white text-xs font-semibold text-center py-1"> 
      {moment(listItem.endDate).format("MMM")}
    </div>
    <div className="text-center text-black font-bold text-lg py-1">
      {moment(listItem.endDate).format("DD")}
    </div>
  </div>
</div>

</div>


      {/* Event Name */}
      <h3 className="text-lg font-bold text-gray-800">
        {listItem.articleKey ? (
          <Link to={`/events-&-competitions/calendar/${listItem.articleKey}`}>
            {listItem.name || 'Not Available'}
          </Link>
        ) : (
          listItem.name || 'Not Available'
        )}
      </h3>

      {/* Venue */}
      <p className="text-sm text-gray-600 mt-1">
        📍 {listItem.venue || 'Not Available'}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-700 mt-2">
        This is a ratified competition. In order to represent Team Singapore, athletes have to be a nominated part of the SA OAC/TDC...
      </p>
    </div>

    {/* Right Badges and Actions */}
    <div className="flex flex-col items-end justify-between gap-2">
      {/* Status Badge */}
      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
        listItem.eventHeldStatus?.name === 'Coming Soon' ? 'bg-gray-200 text-gray-700' :
        listItem.eventHeldStatus?.name === 'Register' ? 'bg-blue-100 text-blue-700' :
        listItem.eventHeldStatus?.name === 'Result' ? 'bg-green-100 text-green-700' :
        listItem.eventHeldStatus?.name === 'Cancelled' ? 'bg-red-100 text-red-700' :
        'bg-yellow-100 text-yellow-700'
      }`}>
        {listItem.eventHeldStatus?.name || 'N/A'}
      </span>

      {/* Category */}
      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        {listItem.eventType?.name || 'Event'}
      </span>

      {/* Action Button */}
      {listItem.eventHeldStatus?.name === 'Result' && listItem.resultFileUrl ? (
        // <a
        //   href={`${BASE_URL_}${listItem.resultFileUrl}`}
        //   target="_blank"
        //   rel="noopener noreferrer"
        //   className="text-sm border border-primary px-4 py-1 rounded hover:bg-primary hover:text-white"
        // >
        //   View Result
        // </a>
        <Link
  to={`/events-&-competitions/calendar/${listItem.articleKey}`}
  className="text-sm border border-primary px-4 py-1 rounded hover:bg-primary hover:text-white"
>
  More Details
</Link>

      ) : listItem.eventHeldStatus?.name === 'Register' ? (
        <Link
          to={userProfile?.userType === 'Club' ? `/account/events` : `/event-register/${listItem.pvid}`}
          className="text-sm border border-primary px-4 py-1 rounded hover:bg-primary hover:text-white"
        >
          Register
        </Link>
      ) : (
        <button className="text-sm border border-primary px-4 py-1 rounded hover:bg-primary hover:text-white">
          More Details
        </button>
      )}
    </div>
  </div>
</div>

      </tr>
    ))
  ) : (
    <tr>
      {loading ? (
        <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p>Loading...</p>
        </td>
      ) : (
        <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">Not Available</p>
        </td>
      )}
    </tr>
  )}
</tbody>

                  </table>
                </div>
                {/* Pagination buttons */}
                {totalPages > 1 && (
                  <div className="pagination flex gap-4">
                    {/* <button
                      disabled={currentPage === 1 || loading}
                      onClick={handleFirstPage}
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      &laquo;
                    </button> */}
                    <button
                      disabled={currentPage === 1 || loading}
                      onClick={handlePreviousPage}
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNumber = i + 1;
                      if (
                        (pageNumber >= startPage && pageNumber <= endPage) ||
                        (pageNumber === 1 && startPage > 1) ||
                        (pageNumber === totalPages && endPage < totalPages)
                      ) {
                        return (
                          <button
                            key={i}
                            className={
                              currentPage === pageNumber
                                ? 'border-primary border-b-[2px]'
                                : ''
                            } // add class 'bg-gray-500' if this button represents the active page
                            disabled={currentPage === pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        (pageNumber === 2 && startPage > 3) ||
                        (pageNumber === totalPages - 1 && endPage < totalPages - 2)
                      ) {
                        // Render '...' button for gaps
                        return <span key={i} className='mt-2'>...</span>;
                      }
                      return null;
                    })}

                    <button
                      disabled={currentPage === totalPages || loading}
                      onClick={handleNextPage}
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      Next
                    </button>
                    {/* <button
                      disabled={currentPage === totalPages || loading}
                      onClick={handleLastPage}
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      &raquo;
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarTable;
