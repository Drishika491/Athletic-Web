import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { config, configSigned } from '../service/api';
import moment from 'moment';

function ParticipateEvents() {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEventList = async () => {
    try {
      setLoading(true);
      const result = await axios.get(BASE_URL+'Api/Event/GetEventListbyParticipant', {
        headers: await configSigned()
      });
      setEventList(result.data.data);
      console.log('cek event', result.data.data)
      setLoading(false);
    } catch (error) {
      console.error('Fetch event list error:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEventList();
  }, []);
  return (
    <div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {/* ... (Event List table content) ... */}
        <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr className="text-left">
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Event</th>
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Date</th>
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Type</th>
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Disciplines</th>
                </tr>
            </thead>
            <tbody>
                {eventList.length > 0 ? (
                    eventList.map((listItem) => (
                        <tr className="focus-within:bg-gray-200 overflow-hidden" key={listItem.pvid}>
                            <td className="border-t">
                                <span className="text-gray-700 px-6 py-3 flex items-center">{listItem.event?.name}</span>
                            </td>
                            <td className="border-t">
                                {moment(listItem.event?.date).format('MMM YYYY') === moment(listItem.event?.endDate).format('MMM YYYY') ? (
                                    <p className="whitespace-no-wrap">{moment(listItem.event?.date).format('DD')} - {moment(listItem.event?.endDate).format('DD MMM YYYY')}</p>
                                  ) : (
                                    <p className="whitespace-no-wrap">{moment(listItem.event?.date).format('DD MMM YYYY')} - {moment(listItem.event?.endDate).format('DD MMM YYYY')}</p>
                                )}
                            </td>
                            <td className="border-t">
                                <span className="text-gray-700 px-6 py-3 flex items-center">{listItem.event?.eventType.name}</span>
                            </td>
                            <td className="border-t">
                                <span className="text-gray-700 px-6 py-3 flex items-center">
                                  <ul className="list-disc pl-6">
                                      {listItem.disciplines.map((discipline, index) => (
                                        <li key={index}>{discipline.name}</li>
                                      ))}
                                  </ul>
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

export default ParticipateEvents