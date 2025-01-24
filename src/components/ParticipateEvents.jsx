import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config, configSigned } from '../service/api';
import moment from 'moment';

function ParticipateEvents() {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticEventList = [
    {
      pvid: 1,
      event: {
        name: 'Tech Innovators Conference 2025',
        date: '2025-03-10',
        endDate: '2025-03-12',
        eventType: { name: 'Conference' },
      },
      disciplines: [
        { name: 'Artificial Intelligence' },
        { name: 'Cybersecurity' },
        { name: 'Blockchain' },
      ],
    },
    {
      pvid: 2,
      event: {
        name: 'Digital Marketing Workshop',
        date: '2025-04-15',
        endDate: '2025-04-15',
        eventType: { name: 'Workshop' },
      },
      disciplines: [
        { name: 'SEO Optimization' },
        { name: 'Content Strategy' },
      ],
    },
    {
      pvid: 3,
      event: {
        name: 'Global Healthcare Summit',
        date: '2025-05-20',
        endDate: '2025-05-22',
        eventType: { name: 'Summit' },
      },
      disciplines: [
        { name: 'Public Health' },
        { name: 'Medical Technology' },
      ],
    },
    {
      pvid: 4,
      event: {
        name: 'Startup Pitch Night',
        date: '2025-06-05',
        endDate: '2025-06-05',
        eventType: { name: 'Networking Event' },
      },
      disciplines: [
        { name: 'Entrepreneurship' },
        { name: 'Investor Relations' },
      ],
    },
  ];

  const fetchEventList = async () => {
    try {
      setLoading(true);
      const result = await axios.get(BASE_URL + 'Api/Event/GetEventListbyParticipant', {
        headers: await configSigned(),
      });
      setEventList(result.data.data || []);
    } catch (error) {
      console.error('Fetch event list error:', error);
      // If API fails, set static data
      setEventList(staticEventList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventList();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">
                Event
              </th>
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">
                Date
              </th>
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">
                Type
              </th>
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">
                Disciplines
              </th>
            </tr>
          </thead>
          <tbody>
            {eventList.length > 0 ? (
              eventList.map((listItem) => (
                <tr className="focus-within:bg-gray-200 overflow-hidden" key={listItem.pvid}>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {listItem.event?.name}
                    </span>
                  </td>
                  <td className="border-t">
                    {moment(listItem.event?.date).format('MMM YYYY') ===
                    moment(listItem.event?.endDate).format('MMM YYYY') ? (
                      <p className="whitespace-no-wrap">
                        {moment(listItem.event?.date).format('DD')} -{' '}
                        {moment(listItem.event?.endDate).format('DD MMM YYYY')}
                      </p>
                    ) : (
                      <p className="whitespace-no-wrap">
                        {moment(listItem.event?.date).format('DD MMM YYYY')} -{' '}
                        {moment(listItem.event?.endDate).format('DD MMM YYYY')}
                      </p>
                    )}
                  </td>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {listItem.event?.eventType.name}
                    </span>
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
                    <span className="text-gray-700 px-6 py-3 flex items-center">Loading...</span>
                  </td>
                ) : (
                  <td colSpan="4" className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">No Events Available</span>
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParticipateEvents;
