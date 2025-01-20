import React, { useEffect, useState } from "react";
import axios from "axios";
import { config, configEventRegister, configPOST } from "../service/api";
import { Link, useParams } from 'react-router-dom';
import { isAuthenticated, login } from "../utils/auth";
import { Icon } from "@iconify/react";
import { BASE_URL } from "../service/config";
const EventRegisterForm = () => {
  const [eventFee, setEventFee] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [listClub, setListClub] = useState([]);
  const [listAgeGroup, setListAgeGroup] = useState([]);
  const [listDisciplines, setListDisciplines] = useState([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [selectedDisciplinesCount, setSelectedDisciplinesCount] = useState(0);
  const [totalEventFee, setTotalEventFee] = useState(0);
  const [seasonBest, setSeasonBest] = useState("");
  const { pvid } = useParams();
  const [selectedClub, setSelectedClub] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const fetchEventFee = async () => {
    const result = await axios.get(BASE_URL+`Api/Event/GetEventFee?EventPvid=${pvid}`, {
      headers: await config()
    });
  
    const currentDate = new Date();
  
    const fees = result.data.data
      .filter(item => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        return startDate <= currentDate && endDate >= currentDate;
      })
      .filter(item => {
        if (selectedClub && selectedClub.isFullMember === item.isFullMember) {
          return true;
        }
        return false;
      })
      .map(item => item.fee);
  
    setEventFee(fees);
  
    // Calculate the total fee based on selected disciplines and fees
    const baseFee = fees.reduce((total, fee) => total + fee, 0);
    const updatedTotalFee = baseFee * selectedDisciplinesCount;
    setTotalEventFee(updatedTotalFee);
  }   

  const fetchEventData = async () => {
    try {
      const result = await axios.get(BASE_URL+`Api/Event/GetById?Pvid=${pvid}`, {
        headers: await config()
      });
      setEventData(result.data.data);
  
      // Set the EventPvid value in the form data
      setFormData((prevData) => ({
        ...prevData,
        EventPvid: result.data.data.pvid, // Assuming pvid is the correct property name
      }));
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const clubPvid = localStorage.getItem('clubPvid');
  console.log('cek club pvid', clubPvid)

  const fetchListClub = async () => {
    const result = await axios.get(BASE_URL+'Api/Club/GetList', {
      headers: await config()
    });
    setListClub(result.data.data);
  }

  const fetchListAgeGroup = async () => {
    const result = await axios.get(BASE_URL+'Api/AgeGroup/GetList', {
      headers: await config()
    });
    setListAgeGroup(result.data.data);
  }

  const fetchListDisciplines = async () => {
    const result = await axios.get(BASE_URL+'Api/Discipline/GetList', {
      headers: await config()
    });
    setListDisciplines(result.data.data);
  }

  useEffect(() => {
    if (isAuthenticated()) {
      fetchListClub();
      fetchListAgeGroup();
      fetchListDisciplines();
      fetchEventData();
      // Fetch event fees based on the selected club
      if (selectedClub) {
        fetchEventFee(selectedClub);
      }
    } else {
      window.location.href = "/login";
    }
  }, [selectedClub]);

  const [formData, setFormData] = useState({
    EventPvid: 0,
    ClubPvid: 0,
    AgeGroupPvid: 0,
    Disciplines: [],
    ContactNumber: "",
    EmergencyContactName: "",
    EmergencyContactNumber: "",
    FullyVaccinated: "",
    CoachFullName: "",
    // PAR_Q: "",
    PAR_Q: [],
  });

  const handleInputChange = (e) => {
    if (clubPvid) {
      const clubData = listClub.find((club) => club.pvid === parseInt(clubPvid));
  
      // Set the ClubPvid value in the form data
      setFormData((prevData) => ({
        ...prevData,
        ClubPvid: clubData ? parseInt(clubData.pvid) : 0, // If clubData is null, set an appropriate default value
        [e.target.name]: e.target.value, // Set other form values based on their names
      }));
  
      setSelectedClub(clubData);
  
      if (clubData && !clubData.isFullMember) {
        const baseFee = eventFee.reduce((total, fee) => total + fee, 0);
        const updatedTotalFee = baseFee * selectedDisciplinesCount;
        setTotalEventFee(updatedTotalFee);
      }
    } else {
      const { name, value } = e.target;
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Set other form values based on their names
      }));
    }
  };  

  const handleParqInputChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      PAR_Q: [ { ParqPvid :0, ParqIsYes: value == 'Y'? true: false}],
    }));
  };

  const handleAddSelectedDisciplines = () => {
    const newSelectedDisciplines = selectedDisciplines.map((pvid) => ({
      DisciplinePvid: Number(pvid),
      SeasonBest: seasonBest
    }));
  
    setFormData((prevData) => ({
      ...prevData,
      Disciplines: [...prevData.Disciplines, ...newSelectedDisciplines],
    }));
  
    setSelectedDisciplines([]);
  
    const newSelectedDisciplinesCount = selectedDisciplinesCount + newSelectedDisciplines.length;
    setSelectedDisciplinesCount(newSelectedDisciplinesCount);
  
    const baseFee = eventFee.reduce((total, fee) => total + fee, 0);
    const updatedTotalFee = baseFee * newSelectedDisciplinesCount;
    setTotalEventFee(updatedTotalFee);
  };
  
  const handleRemoveDiscipline = (index) => {
    const newDisciplines = [...formData.Disciplines];
    newDisciplines.splice(index, 1);
  
    setFormData((prevData) => ({
      ...prevData,
      Disciplines: newDisciplines,
    }));
  
    const newSelectedDisciplinesCount = selectedDisciplinesCount - 1;
    setSelectedDisciplinesCount(newSelectedDisciplinesCount);
  
    const baseFee = eventFee.reduce((total, fee) => total + fee, 0);
    const updatedTotalFee = baseFee * newSelectedDisciplinesCount;
    setTotalEventFee(updatedTotalFee);
  };  

  const [registrationError, setRegistrationError] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!isAuthenticated()) {
        window.location.href = "/login";
        return;
      }

      const headers = await configEventRegister();
      const response = await axios.post(
        BASE_URL+"Api/Event/Register",
        {
          ...formData,
          // Disciplines: formData.Disciplines.map(Number),
          Disciplines: formData.Disciplines,
        },
        { headers }
      );

      const invoiceNumber = response.data.data; // Replace with the actual property name in the response
      console.log(response.data);

      if (invoiceNumber === null) {
        setPaymentMessage("Registration has been successful. Please contact your club manager to complete payment.");
      } else {
        // Call the function to generate QR code using the obtained invoiceNumber
        await generateQRCode(invoiceNumber);
      }

      // Add any necessary logic or actions after successful data submission
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error.response && error.response.data && error.response.data.errorMessage) {
        // Set the registration error message from the API response
        setRegistrationError(error.response.data.errorMessage);
      } else {
        setRegistrationError("An error occurred while submitting the form. Please try again later.");
      }

      // Add any necessary error handling logic or actions
    } finally {
        setIsLoading(false);  // Set loading to false after the API call
    }
    
  };

  const generateQRCode = async (invoiceNumber) => {
    try {
      const qrCodeResponse = await axios.post(
        BASE_URL+"Api/Shop/GeneratePaymentQR",
        {
          InvoiceNo: invoiceNumber, // Replace with the actual property name expected by the API
        },
        {
          responseType: 'arraybuffer',
          headers: await configPOST(), // Make sure you have the appropriate headers for the new API call
        }
      );
  
      const qrCodeBlob = new Blob([qrCodeResponse.data], { type: 'image/png' });
      const qrCodeImageUrl = URL.createObjectURL(qrCodeBlob);
      setQrCodeUrl(qrCodeImageUrl);
      console.log("QR Code URL:", qrCodeImageUrl);
  
      // Perform any necessary actions with the generated QR code URL
    } catch (error) {
      console.error("Error generating QR code:", error);
      // Handle the error as needed
    }
  };  

  return (
    <div>
      <div className='border-b-[3px] border-dotted border-primary'>
        <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Event Register: <span className="font-normal">{eventData.name}</span></h2>
      </div>
      <section  id="register">
        <div className="flex justify-center items-center lg:px-0 md:px-0 px-1 h-full py-8">
          <form className="lg:w-1/3 md:w-1/2 p-6 border rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <h2 className="py-4 text-1xl flex justify-end">Event Target: {eventData.eventTarget}</h2>
            <h2 className="py-4 text-2xl flex justify-end">Fee: {totalEventFee.toLocaleString('en-SG', { style: 'currency', currency: 'SGD' })}</h2>
            <input
              type="text"
              name="EventPvid"
              placeholder="EventPvid"
              value={formData.EventPvid}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              disabled
              hidden
            />

            <select
              name="ClubPvid"
              value={clubPvid}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
              disabled
            >
              {/* <option value="">Select Club</option> */}
              {listClub.map(data => (
                <option
                  key={data.pvid}
                  value={data.pvid}
                >
                  {data.name} {data.isFullMember ? "" : ""}
                </option>
              ))}
            </select>

            <select
              name="AgeGroupPvid"
              value={formData.AgeGroupPvid}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            >
              <option value="">Select Age Group</option>
              {listAgeGroup.map(data => (
                <option key={data.pvid} value={data.pvid}>
                  {data.name}
                </option>
              ))}
            </select>

            <select
              name="Disciplines"
              value={selectedDisciplines}
              onChange={(e) =>
                setSelectedDisciplines(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              className="w-full mb-4 p-2 border rounded"
              // required
            >
              <option value=''>Select Disciplines</option>
              {listDisciplines.map((discipline) => (
                <option key={discipline.pvid} value={discipline.pvid}>
                  {discipline.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="SeasonBest"
              placeholder="Season Best"
              value={seasonBest}
              onChange={(e) => setSeasonBest(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <button
              type="button"
              className="w-full bg-secondary text-white p-2 rounded hover:bg-secondary-600"
              onClick={handleAddSelectedDisciplines}
            >
              Add Selected Discipline
            </button>

            <div className="mb-4">
              <p className="py-2">Selected Disciplines:</p>
              <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                <thead>
                  <tr className="text-left">
                    <th className="px-3 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3">Disciplines</th>
                    <th className="px-3 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3">Season Best</th>
                    <th className="px-3 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3"></th>
                  </tr>
                </thead>
                <tbody>
                {formData.Disciplines.map((discipline, index) => (
                  <tr className="focus-within:bg-gray-200 overflow-hidden" key={index}>
                    <td className="border-t">
                      <span className="text-gray-700 px-3 py-3 flex items-center">{listDisciplines.find((d) => d.pvid === discipline.DisciplinePvid)?.name}</span>
                    </td>
                    <td className="border-t">
                      <span className="text-gray-700 px-3 py-3 flex items-center">{discipline.SeasonBest}</span>
                    </td>
                    <td className="border-t">
                      <span className="text-gray-700 px-3 py-3 flex items-center">
                      <button
                        type="button"
                        className="text-red-500 ml-2"
                        onClick={() => handleRemoveDiscipline(index)}
                      >
                        <Icon
                        icon='mdi:remove-circle-outline'
                        className='h-[1.8rem] w-auto mr-0 text-primary'
                        />
                      </button>
                      </span>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>

            <input
              type="number"
              name="ContactNumber"
              placeholder="Contact Number"
              value={formData.ContactNumber}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <input
              type="text"
              name="EmergencyContactName"
              placeholder="Emergency Contact Name"
              value={formData.EmergencyContactName}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <input
              type="number"
              name="EmergencyContactNumber"
              placeholder="Emergency Contact Number"
              value={formData.EmergencyContactNumber}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <select
              name="FullyVaccinated"
              value={formData.FullyVaccinated}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            >
              <option value="">Fully Vaccinated</option>
              <option value="Y">YES</option>
              <option value="N">NO</option>
            </select>

            <input
              type="text"
              name="CoachFullName"
              placeholder="Coach Full Name"
              value={formData.CoachFullName}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <div className="py-2">
              <p className="w-full p-2 rounded hover:bg-secondary-600 text-bold"><span className="text-primary">*</span>PAR_Q</p>
              <label className="flex items-center bg-white">
                <input
                  type="radio"
                  name="PAR_Q"
                  value="Y"
                  onChange={handleParqInputChange}
                />{' '}
                &nbsp;YES
              </label>

              <label className="flex items-center bg-white">
                <input
                  type="radio"
                  name="PAR_Q"
                  value="N"
                  onChange={handleInputChange}
                />{' '}
                &nbsp;NO
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded hover:bg-primary-600"
              disabled={isLoading}
            >
              {isLoading ? (
                  <div className="flex items-center justify-center">
                      <div className="animate-spin">
                          <Icon icon="gg:spinner" className="h-[1.5rem] w-auto text-white" />
                      </div>
                  </div>
              ) : (
                  <p>Register</p>
              )}
            </button>
            {registrationError && (
              <p className="text-red-500 mt-4 text-center">{registrationError}</p>
            )}
            {paymentMessage && (
              <div className="mt-4 flex justify-center items-center pb-1">
                <div>
                  <p className="text-center text-[1.2rem] text-green-500">
                    {paymentMessage}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
      <section id="payment">
        {qrCodeUrl && (
          <div className="mt-4 flex justify-center items-center pb-10">
            <div>
              <div>
                <p className="text-center text-[1.5rem]">Complete your payment <br/>to complete the Event Registration!</p>
              </div>
              <div className="flex justify-center">
                <img src={qrCodeUrl} alt="QR Code" className="max-w-[80%]" />
              </div>
              <div>
                <Link
                  className="bg-primary text-white py-2 px-4 rounded flex justify-center"
                  to='/account/history-payment'
                >
                  Payment Complete
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default EventRegisterForm;
