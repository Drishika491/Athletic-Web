import React, { useEffect, useState } from "react";
import { config, configEventRegister, configSigned } from "../service/api";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../service/config";
import ProfileMenu from "./ProfileMenu";


function ManageAthleteList() {
  const [clubAthletes, setClubAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}Api/Club/GetClubAthletePublic`, {
        headers: await configSigned(),
      });
      setClubAthletes(response.data.data);
      console.log("Fetched club athletes:", response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching athletes:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function approveAthlete(isNewRequest, pvid) {
    try {
      const response = await axios.post(
        `${BASE_URL}Api/Club/ApproveAthlete`,
        { IsNewRequest: isNewRequest, Pvid: pvid },
        { headers: await configEventRegister() }
      );
      console.log("Approval response:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error while approving athlete:", error);
    }
  }

  async function rejectAthlete(isNewRequest, pvid) {
    try {
      const response = await axios.post(
        `${BASE_URL}Api/Club/RejectAthlete`,
        { IsNewRequest: isNewRequest, Pvid: pvid },
        { headers: await configEventRegister() }
      );
      console.log("Rejection response:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error while rejecting athlete:", error);
    }
  }

  async function ejectAthlete(pvid) {
    try {
      const response = await axios.post(
        `${BASE_URL}Api/Club/EjectAthlete`,
        { AthletePvid: pvid },
        { headers: await configEventRegister() }
      );
      console.log("Ejection response:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error while ejecting athlete:", error);
    }
  }

  return (
    <div>

      <div className="py-2">
        <h2 className="text-1xl text-gray-700 font-semibold uppercase">Recent Requests</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs">
                Athlete Information
              </th>
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs">
                Type
              </th>
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs">
                Request Date
              </th>
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {clubAthletes.requested && clubAthletes.requested.length > 0 ? (
              clubAthletes.requested.map((athlete) => (
                <tr className="focus-within:bg-gray-200 overflow-hidden" key={athlete.pvid}>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-0 flex items-center">
                      <span className="font-semibold">{athlete.name}</span>, ({athlete.uniqueCode})
                    </span>
                    <span className="text-gray-700 px-6 py-0 flex text-xs items-center">
                      {moment(athlete.birthDate).format("DD/MMM/YYYY")} - {athlete.gender}
                    </span>
                  </td>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {athlete.isNewRequest ? "New Register" : "Move Club"}
                    </span>
                  </td>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {moment(athlete.approvedDate).format("DD MMM YYYY")}
                    </span>
                  </td>
                  <td className="border-t">
                    <span className="text-gray-300 px-6 py-3 flex items-center text-center gap-2 justify-center">
                      <button
                        className="text-secondary"
                        onClick={() => approveAthlete(athlete.isNewRequest, athlete.pvid)}
                      >
                        APPROVE
                      </button>
                      |
                      <button
                        className="text-primary"
                        onClick={() => rejectAthlete(athlete.isNewRequest, athlete.pvid)}
                      >
                        REJECT
                      </button>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                {loading ? (
                  <td colSpan="3" className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">Loading...</span>
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

      <div className="py-2 mt-12">
        <h2 className="text-1xl text-gray-700 font-semibold uppercase">Members</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs">
                Name
              </th>
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs">
                Unique ID
              </th>
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs">
                Coach
              </th>
              <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {clubAthletes.registered && clubAthletes.registered.length > 0 ? (
              clubAthletes.registered.map((athlete) => (
                <tr className="focus-within:bg-gray-200 overflow-hidden" key={athlete.pvid}>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-0 font-semibold flex items-center">
                      {athlete.name}
                    </span>
                    <span className="text-gray-700 px-6 py-0 flex text-xs items-center">
                      {moment(athlete.birthDate).format("DD/MMM/YYYY")} - {athlete.gender}
                    </span>
                  </td>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {athlete.uniqueCode}
                    </span>
                  </td>
                  <td className="border-t">
                    <span className="text-gray-700 px-6 py-3 flex items-center">{athlete.coach}</span>
                  </td>
                  <td className="border-t">
                    <span className="text-gray-300 px-6 py-3 flex items-center text-center gap-2 justify-center">
                      <button className="text-primary" onClick={() => ejectAthlete(athlete.pvid)}>
                        EJECT
                      </button>
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
                    <span className="text-gray-700 px-6 py-3 flex items-center">Not Available</span>
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

export default ManageAthleteList;
