import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config, configEventRegister, configPOST } from '../service/api';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { getUserPvid, isAuthenticated } from '../utils/auth';
import ExcelJS from 'exceljs';
import { BASE_URL } from '../service/config';
function EventParticipants() {
    const [showParticipantsList, setShowParticipantsList] = useState(true);

    const toggleParticipantsList = () => {
        setShowParticipantsList(!showParticipantsList);
    };

    const handleButtonClick = (eventPvid) => {
        fetchRegisterClubList(eventPvid);
        fetchEventData(eventPvid);
        fetchAthleteByClub(ClubPvid);
    };

    const [userProfile, setUserProfile] = useState([]);
    const [registerClubList, setRegisterClubList] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [athleteByClub, setAthleteByClub] = useState([]);
    const userPvid = getUserPvid(); // Get the user's Pvid
    const [showManageRegistration, setShowManageRegistration] = useState(false);

    const toggleManageRegistration = () => {
        setShowManageRegistration(!showManageRegistration);
    };

    const [showEventList, setShowEventList] = useState(true);

    const toggleEventList = () => {
        setShowEventList(!showEventList);
    };
  
    const fetchUserProfile = async () => {
      if (!userPvid) return;
  
      try {
        const result = await axios.get(BASE_URL+`Api/IdentityUser/GetById?Pvid=${userPvid}`, {
          headers: await config()
        });
        setUserProfile(result.data.data);
        console.log('cek profile', result.data.data)
        // Store the eventPvid in localStorage
        localStorage.setItem('clubPvid', result.data.data.referencePvid);

        setFormData((prevData) => ({
            ...prevData,
            ClubPvid: result.data.data.referencePvid, // Assuming pvid is the correct property name
        }));
      } catch (error) {
        // console.error('Fetch user profile error:', error);
      }
    }

    // const ClubPvid = userProfile.referencePvid;
    const ClubPvid = localStorage.getItem('clubPvid');

    const fetchRegisterClubList = async (eventPvid) => {
        if (!userPvid) return;

        try {
            const result = await axios.get(BASE_URL+`Api/Event/RegisterFromClubList?ClubPvid=${ClubPvid}&EventPvid=${eventPvid}`, {
                headers: await config()
            });
            setRegisterClubList(result.data.data);
            console.log('cek register club list', result.data.data);

            // Toggle the state to show the Manage Registration table
            toggleManageRegistration();

            // Store the eventPvid in localStorage
            localStorage.setItem('eventPvid', eventPvid);
        } catch (error) {
            // console.error('Fetch register club list error:', error);
        }
    }

    const fetchAthleteByClub = async (ClubPvid) => {
        if (!userPvid) return;

        try {
            const result = await axios.get(BASE_URL+`Api/AthleteProfile/GetByClub?ClubPvid=${ClubPvid}`, {
                headers: await config()
            });
            setAthleteByClub(result.data.data);
            console.log('cek athlete by club', result.data.data);
        } catch (error) {
            // console.error('Fetch athlete by club error:', error);
        }
    }
    
    const fetchEventData = async (eventPvid) => {
        if (!userPvid) return;

        try {
            const result = await axios.get(BASE_URL+`Api/Event/GetById?Pvid=${eventPvid}`, {
                headers: await config()
            });
            setEventData(result.data.data);
            console.log('cek event data', result.data.data);

            // Set the EventPvid value in the form data
            setFormData((prevData) => ({
                ...prevData,
                EventPvid: result.data.data.pvid, // Assuming pvid is the correct property name
            }));
        } catch (error) {
            // console.error('Fetch event data error:', error);
        }
    } 
  
    useEffect(() => {
      fetchUserProfile();
      fetchRegisterClubList();
      fetchAthleteByClub();
      fetchEventData();
    }, [userPvid, ClubPvid]);

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
  
    const handleDateFromChange = (selectedDate) => {
      setDateFrom(selectedDate);
    };
    
    const handleDateToChange = (selectedDate) => {
      setDateTo(selectedDate);
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

    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowEditForm(!showEditForm);
    };

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(BASE_URL+'Api/Event/RegisterFromClubAdd', formData, {
                headers: await configEventRegister()
            });

            if (response.status === 200) {
                console.log('Registration successful!', response.data);
                // Handle any additional logic after successful registration

                // Assuming you have logic to successfully submit the form and get the eventPvid
                const newEventPvid = 123; // Replace with actual value

                // Store the eventPvid in localStorage
                localStorage.setItem('eventPvid', newEventPvid);

                setShowManageRegistration(true);
                
                // Hide the form
                setShowForm(false);
                setShowEditForm(false);

                // Fetch the register club list based on the new eventPvid
                await fetchRegisterClubList(newEventPvid);
            }
        } catch (error) {
            // console.error('Registration error:', error);
            // Handle error cases
        }
    };

    const [isApproved, setIsApproved] = useState(false);

    const handleApprove = async () => {
        try {
            // Create the data object to send to the API
            const data = {
                EventPvid: formData.EventPvid,
                ClubPvid: formData.ClubPvid
            };
    
            // Send the data to the API
            const response = await axios.post(
                BASE_URL+'Api/Event/RegisterFromClubPayment',
                data,
                {
                    headers: await configEventRegister()
                }
            );

            const invoiceNumber = response.data.data; // Replace with the actual property name in the response
            console.log(response.data);
        
            // Call the function to generate QR code using the obtained invoiceNumber
            generateQRCode(invoiceNumber);
    
            // Check if the request was successful
            if (response.status === 200) {
                console.log('Payment approved successfully.');
                setIsApproved(true); // Update the approval status
            } else {
                console.log('Failed to approve payment.');
            }
        } catch (error) {
            console.error('Approval error:', error);
        }
    };

    const [qrCodeUrl, setQrCodeUrl] = useState("");
    
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

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedEditPvid, setSelectedEditPvid] = useState(null);

    const handleRowSelect = (pvid) => {
        if (selectedRows.includes(pvid)) {
            setSelectedRows(selectedRows.filter(id => id !== pvid));
        } else {
            setSelectedRows([...selectedRows, pvid]);
        }
    };

    const handleEditSelectedRows = () => {
        if (selectedRows.length === 1) {
            // Assuming you have the selected pvid in the selectedRows array
            const selectedPvid = selectedRows[0];
            
            // Call the handleEditRow function to populate the form data and show the form
            handleEditRow(selectedPvid);
    
            // Set showForm state to true to display the edit form
            setShowEditForm(true);
        } else {
            console.log("Please select one row to edit.");
        }
    };
    
    const handleEditRow = async (pvid) => {
        console.log("Clicked Edit for pvid:", pvid);
        
        const selectedRow = registerClubList.find(item => item.pvid === pvid);
        console.log("Selected Row:", selectedRow);

        if (selectedRow) {
        setFormData({
            ...formData,
            Pvid: selectedRow.pvid,
            EventPvid: selectedRow.eventPvid,
            ClubPvid: selectedRow.teamCode,
            AthletePvid: selectedRow.athletePvid,
            // AgeGroupPvid: selectedRow.ageGroupPvid,
            // Disciplines: selectedRow.Disciplines,
            ContactNumber: selectedRow.contactNumber,
            SeasonBest: selectedRow.seasonBest,
            EmergencyContactName: selectedRow.emergencyContactName,
            EmergencyContactNumber: selectedRow.emergencyContactNumber,
            FullyVaccinated: selectedRow.fullyVaccinated,
            CoachFullName: selectedRow.coachFullName,
            PAR_Q: selectedRow.paR_Q,
            // ... other fields
        });

        setSelectedEditPvid(pvid);
        } else {
        console.log("Selected row not found.");
        }

    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
    
        try {
            // Lakukan proses update data dengan nilai formData yang sudah diperbarui
            const response = await axios.post(
                BASE_URL+'Api/Event/RegisterFromClubUpdate',
                formData,
                {
                    headers: await configEventRegister() // Sesuaikan dengan kebutuhan headers Anda
                }
            );
    
            if (response.status === 200) {
                console.log('Data updated successfully');
                // Reset formData and selectedEditPvid
                setFormData({
                    AthletePvid: null,
                    EventPvid: null,
                    ClubPvid: null,
                    AgeGroupPvid: null,
                    Disciplines: [],
                    ContactNumber: "",
                    SeasonBest: "",
                    EmergencyContactName: "",
                    EmergencyContactNumber: "",
                    FullyVaccinated: "",
                    CoachFullName: "",
                    PAR_Q: "",
                });
                setSelectedEditPvid(null);

                // Hide the form
                setShowEditForm(false);
                setShowForm(false);

                // Fetch the updated register club list using the stored eventPvid
                const storedEventPvid = localStorage.getItem('eventPvid');
                if (storedEventPvid) {
                    fetchRegisterClubList(storedEventPvid);
                } else {
                    console.log('No eventPvid found in localStorage.');
                }

            } else {
                console.log('Failed to update data');
            }
        } catch (error) {
            console.error('Update error:', error);
        }
    };
    
    const handleDeleteSelectedRows = async () => {
        try {
            const deleteRequests = selectedRows.map(async pvid => {
                return axios.post(
                    BASE_URL+'Api/Event/RegisterFromClubDelete',
                    {
                        Pvid: pvid // Request body
                    },
                    {
                        headers: await configEventRegister()
                    }
                );
            });
    
            const responses = await Promise.all(deleteRequests);
    
            // Check if all requests were successful
            const allSuccessful = responses.every(response => response.status === 200);
    
            if (allSuccessful) {
                console.log('Selected rows deleted successfully.');
                // Clear the selected rows
                setSelectedRows([]);
                
                // Fetch the updated register club list using the stored eventPvid
                const storedEventPvid = localStorage.getItem('eventPvid');
                if (storedEventPvid) {
                    fetchRegisterClubList(storedEventPvid);
                } else {
                    console.log('No eventPvid found in localStorage.');
                }
            } else {
                console.log('Some rows could not be deleted.');
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };          

    const [listAgeGroup, setListAgeGroup] = useState([]);
    const [listDisciplines, setListDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  
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
        fetchListAgeGroup();
        fetchListDisciplines();
      } else {
        window.location.href = "/login";
      }
    }, []);
  
    const [formData, setFormData] = useState({
      AthletePvid: null,
      EventPvid: null,
      ClubPvid: null,
      AgeGroupPvid: null,
      Disciplines: [],
      ContactNumber: "",
      SeasonBest: "",
      EmergencyContactName: "",
      EmergencyContactNumber: "",
      FullyVaccinated: "",
      CoachFullName: "",
      PAR_Q: "",
    });
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));

        const newValue = (name === 'AgeGroupPvid') ? parseInt(value) : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
          }));
    };
    
    const handleAddSelectedDisciplines = () => {
    setFormData((prevData) => ({
        ...prevData,
        Disciplines: [...prevData.Disciplines, ...selectedDisciplines.map(Number)],
    }));
    setSelectedDisciplines([]);
    };

    const handleRemoveDiscipline = (index) => {
        const newDisciplines = formData.Disciplines.filter((_, i) => i !== index);
        setFormData((prevData) => ({
        ...prevData,
        Disciplines: newDisciplines,
        }));
    };
    
    const downloadExcel = async () => {
        const headers = await config();

        axios({
        url: BASE_URL+'Api/Event/RegisterFromClubList?ClubPvid=1&EventPvid=4865',
        method: 'GET',
        responseType: 'json',
        headers: headers,
        }).then(response => {
        const data = response.data.data.non_submitted;

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Athlete Data');

        // Add title row
        const titleRow = ['SAA Meet 2022']; // Add the title
        worksheet.addRow(titleRow);
        worksheet.mergeCells('A1:Y1'); // Merge cells for the title
        const titleCell = worksheet.getCell('A1');
        titleCell.alignment = { horizontal: 'left', vertical: 'middle' };
        titleCell.font = { bold: true, size: 16 };

        

        // Add spacer row
        const spacerRow = [];
        worksheet.addRow(spacerRow);

        // Add header row
        const headerRow = Object.keys(data[0]);
        headerRow.unshift('No'); // Add 'No' column header
        worksheet.addRow(headerRow);

        // Add data rows
        data.forEach((row, index) => {
            const rowData = Object.values(row);
            rowData.unshift(index + 1); // Add index (starting from 1)
            worksheet.addRow(rowData);
        });

        // Style the header row
        const headerCells = worksheet.getRow(3);
        headerCells.eachCell(cell => {
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.font = { bold: true };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'CCCCCC' } };
            cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
            };
        });

        // Set the height for header row
        headerCells.height = 30;

        // Hide specific columns
        const columnsToHide = ['pvid', 'eventPvid', 'eventRegFormUploadPvid', 'athletePvid', 'ageGroupPvid', 'invoiceNo'];
        columnsToHide.forEach(column => {
            const columnIndex = headerRow.indexOf(column);
            if (columnIndex !== -1) {
            worksheet.columns[columnIndex].hidden = true;
            }
        });

        // Format "dob" column
        const dobColumnIndex = headerRow.indexOf('dob') + 1;
        const dobColumn = worksheet.getColumn(dobColumnIndex);
        dobColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
            if (rowNumber > 1 && cell.value) {
                const dateValue = new Date(cell.value);
                if (!isNaN(dateValue.getTime())) {
                    cell.value = formatDate(dateValue);
                }
            }
        });

        // Adjust column widths based on content
        adjustColumnWidths(worksheet);

        // Generate blob from workbook
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create a download link and trigger click
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'athlete_data.xlsx';
            link.click();
        });
        });
    };

    const adjustColumnWidths = worksheet => {
        worksheet.columns.forEach(column => {
        let maxCellLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
            const contentLength = cell.value ? String(cell.value).length : 0;
            maxCellLength = Math.max(maxCellLength, contentLength);
        });
        column.width = maxCellLength + 2; // Adjust for padding
        });
    };

    const formatDate = date => {
        const parsedDate = new Date(date);
        const day = parsedDate.getDate().toString().padStart(2, '0');
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = parsedDate.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div>
            {/* Event List */}
            {showEventList && !showManageRegistration ? (
                <>
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
                                <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Last Date Register</th>
                                <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length > 0 ? (
                                events.map((listItem) => (
                                    <tr className="focus-within:bg-gray-200 overflow-hidden" key={listItem.pvid}>
                                        <td className="border-t">
                                            <button onClick={() => handleButtonClick(listItem.pvid)}>
                                                <span className="text-gray-700 px-6 py-3 flex items-center">{listItem.name}</span>
                                            </button>
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
                                                <button onClick={() => handleButtonClick(listItem.pvid)}>
                                                    <span className="px-2 rounded-full text-sm tracking-wide bg-green-200 text-green-800">{listItem.eventHeldStatus.name}</span>
                                                </button>
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
                </>
            ) : (
                showManageRegistration && (
                    <>
                        <div className={showForm || showEditForm ? 'hidden' : 'flex items-center justify-end space-x-2 mb-4'}>
                            {/* Button Approve */}
                            <div className='relative flex flex-col items-center group'>
                                <button onClick={handleApprove}>
                                    <Icon
                                    icon='gg:check-o'
                                    className='h-[1.8rem] w-auto mr-0 text-gray-400'
                                    />
                                </button>
                                <div className='absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex'>
                                    <span className='relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg'>Submit</span>
                                    <div className='w-3 h-3 -mt-2 rotate-45 bg-black'></div>
                                </div>
                            </div>
                            {/* Button Add */}
                            <div className='relative flex flex-col items-center group'>
                                <button onClick={toggleForm}>
                                    <Icon
                                    icon='gridicons:add-outline'
                                    className='h-[1.8rem] w-auto mr-0 text-gray-400'
                                    />
                                </button>
                                <div className='absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex'>
                                    <span className='relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg'>Add</span>
                                    <div className='w-3 h-3 -mt-2 rotate-45 bg-black'></div>
                                </div>
                            </div>
                            {/* Button Edit */}
                            <div className='relative flex flex-col items-center group'>
                                <button onClick={handleEditSelectedRows}>
                                    <Icon
                                    icon='mdi:circle-edit-outline'
                                    className='h-[1.8rem] w-auto mr-0 text-gray-400'
                                    />
                                </button>
                                <div className='absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex'>
                                    <span className='relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg'>Update</span>
                                    <div className='w-3 h-3 -mt-2 rotate-45 bg-black'></div>
                                </div>
                            </div>
                            {/* Button Remove */}
                            <div className='relative flex flex-col items-center group'>
                                <button onClick={handleDeleteSelectedRows}>
                                    <Icon
                                    icon='mdi:remove-circle-outline'
                                    className='h-[1.8rem] w-auto mr-0 text-gray-400'
                                    />
                                </button>
                                <div className='absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex'>
                                    <span className='relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg'>Delete</span>
                                    <div className='w-3 h-3 -mt-2 rotate-45 bg-black'></div>
                                </div>
                            </div>
                            <span className='text-gray-300'>|</span>
                            {/* Button Export to Excel */}
                            <button onClick={downloadExcel}>
                                <Icon
                                icon='vscode-icons:file-type-excel'
                                className='h-[1.8rem] w-auto mr-2 text-primary'
                                />
                            </button>
                        </div>

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
                                    to='/account/payment'
                                >
                                    Payment Complete
                                </Link>
                            </div>
                            </div>
                        </div>
                        )}
                        
                        <div className={showForm || showEditForm ? 'hidden' : 'overflow-x-auto bg-white rounded-lg shadow'}>
                            {/* Manage Registration */}
                            <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                                <thead>
                                    <tr className="text-left">
                                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">#</th>
                                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Participant</th>
                                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Unique ID</th>
                                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Age Group</th>
                                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Season Best</th>
                                        <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Coach</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {registerClubList.non_submitted.length > 0 ? (
                                    registerClubList.non_submitted?.map((listItem, index) => (
                                        <tr className="focus-within:bg-gray-200 overflow-hidden" key={listItem.pvid}>
                                            <td className="border-t flex">
                                                <span className="text-gray-700 px-4 py-4 flex items-center">{index + 1}</span>
                                                <span className="text-gray-700 px-0 py-4 flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleRowSelect(listItem.pvid)}
                                                        checked={selectedRows.includes(listItem.pvid)}
                                                    />
                                                </span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-0 flex font-bold items-center">{listItem.firstName}</span>
                                                <span className="text-gray-700 px-6 py-0 flex text-xs items-center">{moment(listItem.dob).format('DD/MMM/YYYY')} - {listItem.gender}</span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-4 flex items-center">{listItem.uniqueID}</span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-4 flex items-center">{listItem.eventDivisionName}</span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-4 flex items-center">{listItem.seasonBest}</span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-4 flex items-center">{listItem.coachFullName}</span>
                                            </td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                    {loading ? (
                                        <td colSpan="4" className="border-t">
                                            <span className='text-gray-700 px-6 py-4 flex items-center'>Loading...</span>
                                        </td>
                                    ) : (
                                        <td colSpan="4" className="border-t">
                                            <span className="text-gray-700 px-6 py-4 flex items-center">Not Available</span>
                                        </td>
                                    )}
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {showForm && (
                            <div>
                                {/* Form fields */}
                                <div className="flex justify-center items-center lg:px-0 md:px-0 px-1 h-full py-8">
                                    <form className="lg:w-1/2 md:w-1/2 p-6 border rounded-lg shadow-lg" onSubmit={handleSubmit}>
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

                                        <input
                                            type="text"
                                            name="ClubPvid"
                                            placeholder="ClubPvid"
                                            value={formData.ClubPvid}
                                            onChange={handleInputChange}
                                            className="w-full mb-4 p-2 border rounded"
                                            disabled
                                            hidden
                                        />

                                        <select
                                            name="AthletePvid"
                                            value={formData.AthletePvid}
                                            onChange={handleInputChange}
                                            className="w-full mb-4 p-2 border rounded"
                                            required
                                        >
                                            <option value="">Select Athlete</option>
                                            {athleteByClub.map(data => (
                                                <option key={data.pvid} value={data.pvid}>
                                                    {data.name}
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

                                        <button
                                            type="button"
                                            className="w-full bg-secondary text-white p-2 rounded hover:bg-secondary-600"
                                            onClick={handleAddSelectedDisciplines}
                                        >
                                            Add Selected Discipline
                                        </button>

                                        <div className="mb-4">
                                        <p>Selected Disciplines:</p>
                                        <ul>
                                            {formData.Disciplines.map((disciplinePvid, index) => (
                                            <li key={index}>
                                                {listDisciplines.find((discipline) => discipline.pvid === disciplinePvid)?.name}
                                                <button
                                                type="button"
                                                className="text-red-500 ml-2"
                                                onClick={() => handleRemoveDiscipline(index)}
                                                >
                                                Remove
                                                </button>
                                            </li>
                                            ))}
                                        </ul>
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
                                            name="SeasonBest"
                                            placeholder="Season Best"
                                            value={formData.SeasonBest}
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

                                        <select
                                            name="PAR_Q"
                                            value={formData.PAR_Q}
                                            onChange={handleInputChange}
                                            className="w-full mb-4 p-2 border rounded"
                                            required
                                        >
                                            <option value="">PAR_Q</option>
                                            <option value="Y">YES</option>
                                            <option value="N">NO</option>
                                        </select>
                                        
                                        <div className='space-x-4'>
                                            <button
                                                type="submit"
                                                className="bg-primary text-white p-2 rounded hover:bg-primary-600"
                                            >
                                                Register
                                            </button>

                                            <button className='bg-primary text-white p-2 rounded hover:bg-primary-600' onClick={toggleForm}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {selectedEditPvid !== null && showEditForm && (
                            <div className={showForm ? 'hidden' : "flex justify-center items-center lg:px-0 md:px-0 px-1 h-full py-8"}>
                                <form className="lg:w-1/2 md:w-1/2 p-6 border rounded-lg shadow-lg" onSubmit={handleSubmitEdit}>
                                    <input
                                        type="text"
                                        name="Pvid"
                                        placeholder="Pvid"
                                        value={formData.Pvid}
                                        onChange={handleInputChange}
                                        className="w-full mb-4 p-2 border rounded"
                                        disabled
                                        hidden
                                    />

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

                                    <input
                                        type="text"
                                        name="ClubPvid"
                                        placeholder="ClubPvid"
                                        value={formData.ClubPvid}
                                        onChange={handleInputChange}
                                        className="w-full mb-4 p-2 border rounded"
                                        disabled
                                        hidden
                                    />

                                    <input
                                        type="text"
                                        name="AthletePvid" 
                                        placeholder="AthletePvid"
                                        value={formData.AthletePvid}
                                        onChange={handleInputChange}
                                        className="w-full mb-4 p-2 border rounded"
                                        disabled
                                        hidden
                                    />
                                    
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

                                    <button
                                        type="button"
                                        className="w-full bg-secondary text-white p-2 rounded hover:bg-secondary-600"
                                        onClick={handleAddSelectedDisciplines}
                                    >
                                        Add Selected Discipline
                                    </button>

                                    <div className="mb-4">
                                    <p>Selected Disciplines:</p>
                                    <ul>
                                        {formData.Disciplines.map((disciplinePvid, index) => (
                                        <li key={index}>
                                            {listDisciplines.find((discipline) => discipline.pvid === disciplinePvid)?.name}
                                            <button
                                            type="button"
                                            className="text-red-500 ml-2"
                                            onClick={() => handleRemoveDiscipline(index)}
                                            >
                                            Remove
                                            </button>
                                        </li>
                                        ))}
                                    </ul>
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
                                        name="SeasonBest"
                                        placeholder="Season Best"
                                        value={formData.SeasonBest}
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

                                    <select
                                        name="PAR_Q"
                                        value={formData.PAR_Q}
                                        onChange={handleInputChange}
                                        className="w-full mb-4 p-2 border rounded"
                                        required
                                    >
                                        <option value="">PAR_Q</option>
                                        <option value="Y">YES</option>
                                        <option value="N">NO</option>
                                    </select>

                                    {/* Render other form fields like AgeGroupPvid, Disciplines, etc. */}

                                    <div className="space-x-4">
                                        <button
                                            type="submit"
                                            className="bg-primary text-white p-2 rounded hover:bg-primary-600"
                                        >
                                            Update
                                        </button>

                                        <button
                                            className='bg-primary text-white p-2 rounded hover:bg-primary-600'
                                            onClick={toggleEditForm} // Cancel edit
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <button onClick={showManageRegistration ? toggleManageRegistration : toggleEventList} className={showForm || showEditForm ? 'hidden' : "py-4 text-primary flex justify-end"}>
                            Back
                        </button>
                    </>
                )
            )}
        </div>
    );
}

export default EventParticipants;

