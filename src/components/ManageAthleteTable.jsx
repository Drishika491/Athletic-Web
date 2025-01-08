import React, { useEffect, useState } from 'react'
import { config, configEventRegister, configSigned } from '../service/api';
import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from '../service/config';
function ManageAthleteTable() {
  const [clubAthelete, setClubAthelete] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
        setLoading(true);
        const response = await axios.get(BASE_URL+'Api/Club/GetClubAthletePublic', {
            headers: await configSigned()
        });
        setClubAthelete(response.data.data);
        console.log('cek club athlete', response.data.data)
        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
  }

  useEffect(() => {
      fetchData();
  }, []);

  async function approveAthlete(isNewRequest, pvid) {
    try {
      const response = await axios.post(
        BASE_URL+'Api/Club/ApproveAthlete',
        {
          IsNewRequest: isNewRequest,
          Pvid: pvid,
        },
        {
          headers: await configEventRegister()
        }
      );
      // Handle the response, update state, or perform any other necessary actions.
      console.log('Approval response:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error while approving athlete:', error);
    }
  }

  async function rejectAthlete(isNewRequest, pvid) {
    try {
      const response = await axios.post(
        BASE_URL+'Api/Club/RejectAthlete',
        {
          IsNewRequest: isNewRequest,
          Pvid: pvid,
        },
        {
          headers: await configEventRegister()
        }
      );
      // Handle the response, update state, or perform any other necessary actions.
      console.log('Reject response:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error while reject athlete:', error);
    }
  }

  async function ejectAthlete(pvid) {
    try {
      const response = await axios.post(
        BASE_URL+'Api/Club/EjectAthlete',
        {
          AthletePvid: pvid,
        },
        {
          headers: await configEventRegister()
        }
      );
      // Handle the response, update state, or perform any other necessary actions.
      console.log('Eject response:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error while eject athlete:', error);
    }
  } 
  return (
    <div>
      <div className='py-2'>
        <h2 className='text-1xl text-gray-700 font-semibold uppercase'>Recent Request</h2>
      </div>
      <div className='overflow-x-auto bg-white rounded-lg shadow'>
        <table className='w-full whitespace-no-wrap bg-white overflow-hidden table-striped'>
          <thead>
            <tr className='text-left'>
              <th className='px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs'>Athlete Information</th>
              <th className='px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs'>Type</th>
              <th className='px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs'>Request date</th>
              <th className='px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {clubAthelete.requested && clubAthelete.requested.length > 0 ? (
              clubAthelete.requested.map((listItem) => (
              <tr className='focus-within:bg-gray-200 overflow-hidden' key={listItem.pvid}>
                <td className='border-t'>
                  <span className='text-gray-700 px-6 py-0 flex items-center'><span className='font-semibold'>{listItem.name}</span>, ({listItem.uniqueCode})</span>
                  <span className='text-gray-700 px-6 py-0 flex text-xs items-center'>{moment(listItem.birthDate).format('DD/MMM/YYYY')} - {listItem.gender}</span>
                </td>
                <td className='border-t'>
                  <span className='text-gray-700 px-6 py-3 flex items-center'>{listItem.isNewRequest ? "New Register" : "Move Club"}</span>
                </td>
                <td className='border-t'>
                  <span className='text-gray-700 px-6 py-3 flex items-center'>{moment(listItem.approvedDate).format('DD MMM YYYY')}</span>
                </td>
                <td className='border-t'>
                  <span className='text-gray-300 px-6 py-3 flex items-center text-center gap-2 justify-center'>
                    <button className='text-secondary' onClick={() => approveAthlete(listItem.isNewRequest, listItem.pvid)}>APPROVE</button>
                    |
                    <button className='text-primary' onClick={() => rejectAthlete(listItem.isNewRequest, listItem.pvid)}>REJECT</button>
                  </span>
                </td>
              </tr>
              ))
              ) : (
              <tr>
              {loading ? (
                  <td colSpan="3" className="border-t">
                      <span className='text-gray-700 px-6 py-3 flex items-center'>Loading...</span>
                  </td>
              ) : (
                  <td colSpan="3" className="border-t">
                      <span className="text-gray-700 px-6 py-3 flex items-center">Not Available</span>
                  </td>
              )}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='py-2 mt-12'>
        <h2 className='text-1xl text-gray-700 font-semibold uppercase'>Members</h2>
      </div>
      <div className='overflow-x-auto bg-white rounded-lg shadow'>
        <table className='w-full whitespace-no-wrap bg-white overflow-hidden table-striped'>
          <thead>
            <tr className='text-left'>
              <th className='px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs'>Name</th>
              <th className='px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs'>Unique ID</th>
              <th className='px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs'>Coach</th>
              <th className='px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {clubAthelete.registered && clubAthelete.registered.length > 0 ? (
              clubAthelete.registered.map((listItem) => (
              <tr className='focus-within:bg-gray-200 overflow-hidden' key={listItem.pvid}>
                <td className='border-t'>
                  <span className='text-gray-700 px-6 py-0 font-semibold flex items-center'>{listItem.name}</span>
                  <span className='text-gray-700 px-6 py-0 flex text-xs items-center'>{moment(listItem.birthDate).format('DD/MMM/YYYY')} - {listItem.gender}</span>
                </td>
                <td className='border-t'>
                  <span className='text-gray-700 px-6 py-3 flex items-center'>{listItem.uniqueCode}</span>
                </td>
                <td className='border-t'>
                  <span className='text-gray-700 px-6 py-3 flex items-center'>{listItem.coach}</span>
                </td>
                <td className='border-t'>
                  <span className='text-gray-300 px-6 py-3 flex items-center text-center gap-2 justify-center'>
                    <button className='text-primary' onClick={() => ejectAthlete(listItem.pvid)}>EJECT</button>
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
      </div>
    </div>
  )
}

export default ManageAthleteTable