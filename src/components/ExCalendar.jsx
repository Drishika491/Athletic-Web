import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../service/api';

function ExCalendar() {
  const [events, setEvents] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [eventType, setEventType] = useState('');
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const today = new Date();
    const yearStart = new Date(today.getFullYear(), 0, 1); // Set to 1st January of current year
    const formattedYearStart = formatDate(yearStart);
    setDateFrom(formattedYearStart);

    const formattedToday = formatDate(today);
    setDateTo(formattedToday);

    const fetchData = async () => {
      const result = await axios.get(BASE_URL+`Api/Event/GetList?DateFrom=${dateFrom}&DateTo=${dateTo}&SearchKey=${searchKey}&EventTypePvid=${eventType}` ,{
        headers: config()
      });
      setEvents(result.data.data);
    };
    fetchData();
  }, [dateFrom, dateTo, eventType, searchKey]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8">Event List</h1>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 sm:mb-0">
          <label htmlFor="dateFrom" className="block text-gray-700 font-bold mb-2">
            Date From
          </label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 sm:mb-0">
          <label htmlFor="dateTo" className="block text-gray-700 font-bold mb-2">
            Date To
          </label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 sm:mb-0">
          <label htmlFor="eventType" className="block text-gray-700 font-bold mb-2">
            Event Type
          </label>
          <select
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">All</option>
            <option value="1">Type A</option>
            <option value="2">Type B</option>
            <option value="3">Type C</option>
          </select>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 sm:mb-0">
            <label htmlFor="searchKey" className="block text-gray-700 font-bold mb-2">
                Search
            </label>
            <input
                type="text"
                id="searchKey"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
            <div key={event.pvid} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">{event.name}</h2>
            <p className="text-gray-700 mb-4">{event.date}</p>
            <p className="text-gray-700">{event.eventType.name}</p>
            </div>
            ))}
        </div>
    </div>
    );
}

            export default ExCalendar;