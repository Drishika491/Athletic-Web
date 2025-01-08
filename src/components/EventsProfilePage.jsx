import React, { useEffect, useState } from 'react'
import { config } from '../service/api';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { BASE_URL } from '../service/config';
function EventsProfilePage() {
    const [events, setEvents] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventHeldStatus, setEventHeldStatus] = useState(2);
    const [searchKey, setSearchKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [displayedData, setDisplayedData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

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
              PageRow: itemsPerPage
            },
            headers: await config()
          });
          setEvents(response.data.data.data);
          console.log('cek events', response.data.data.data);
          setLoading(false);
          // Calculate the total number of pages based on totalData and itemsPerPage
          setTotalPages(Math.ceil(response.data.data.totalData / itemsPerPage));
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [dateFrom, dateTo, eventType, eventHeldStatus, searchKey, currentPage]);
  return (
    <div>
        <div className="flex justify-end px-0 p-1 lg:px-0">
            {/* <h2 className="lg:pl-12 mt-1 text-secondary text-[1rem] md:text-[1rem] lg:text-[1.2rem]">Search</h2> */}
            <div className="pb-2">
                <div className="flex items-center bg-white border-slate-200 border-[1px] p-2 px-3 rounded-md">
                    <input
                    type="text"
                    id="searchKey"
                    placeholder='Search'
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="appearance-none bg-transparent outline-none rounded w-full px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <Icon className="h-[1.5rem] w-auto text-primary" icon="ic:outline-search" />
                </div>
            </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            {/* ... (Event List table content) ... */}
            <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                <thead>
                    <tr className="text-left">
                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Event</th>
                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Date</th>
                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Last Register Date</th>
                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 ? (
                        events.map((listItem) => (
                            <tr className="focus-within:bg-gray-200 overflow-hidden" key={listItem.pvid}>
                                <td className="border-t">
                                    <Link to={`/account/events/submit-participant/${listItem.pvid}`}>
                                        <span className="text-gray-700 px-6 py-3 flex items-center">{listItem.name}</span>
                                    </Link>
                                </td>
                                <td className="border-t">
                                    <span className="text-gray-700 px-6 py-3 flex items-center">
                                        {moment(listItem.date).format('MMM YYYY') === moment(listItem.endDate).format('MMM YYYY') ? (
                                            <p className="whitespace-no-wrap">{moment(listItem.date).format('DD')} - {moment(listItem.endDate).format('DD MMM YYYY')}</p>
                                        ) : (
                                            <p className="whitespace-no-wrap">{moment(listItem.date).format('DD MMM YYYY')} - {moment(listItem.endDate).format('DD MMM YYYY')}</p>
                                        )}
                                    </span>
                                </td>
                                <td className="border-t">
                                    <span className="text-gray-700 px-6 py-3 flex items-center">{moment(listItem.endDate).format('DD MMM YYYY')}</span>
                                </td>
                                <td className="border-t">
                                    <span className="px-6 py-4 flex items-center">
                                            <span className="px-2 rounded-full text-sm tracking-wide bg-green-200 text-green-800">{listItem.eventHeldStatus.name}</span>
                                    </span>
                                </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                        {loading ? (
                            <td colSpan="4" className="border-t">
                                <span className='text-gray-700 px-6 py-3 flex items-center'>Loading...</span>
                            </td>
                        ) : (
                            <td colSpan="4" className="border-t">
                                <span className="text-gray-700 px-6 py-3 flex items-center">Not Available</span>
                            </td>
                        )}
                        </tr>
                    )}
                </tbody>
            </table>
            {/* ... (Event List table content) ... */}
        </div>
    </div>
  )
}

export default EventsProfilePage