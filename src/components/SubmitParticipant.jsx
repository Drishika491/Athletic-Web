import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config, configEventRegister, configPOST } from '../service/api';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { getUserPvid, isAuthenticated } from '../utils/auth';
import ExcelJS from 'exceljs';
import { BASE_URL } from '../service/config';
function SubmitParticipant() {
    const { pvid } = useParams();
    const [userProfile, setUserProfile] = useState([]);
    const [registerClubList, setRegisterClubList] = useState({ non_submitted: [] });
    const [eventData, setEventData] = useState([]);
    const [athleteByClub, setAthleteByClub] = useState([]);
    const [loading, setLoading] = useState(true);
    const userPvid = getUserPvid(); // Get the user's Pvid
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowEditForm(!showEditForm);
    };

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
        setSeasonBest("");

        setFormData({
            AthletePvid: null,
            EventPvid: formData.EventPvid,
            ClubPvid: parseInt(formData.ClubPvid),
            AgeGroupPvid: null,
            Disciplines: [],
            ContactNumber: "",
            EmergencyContactName: "",
            EmergencyContactNumber: "",
            FullyVaccinated: "",
            CoachFullName: "",
            PAR_Q: [],
        });
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
        localStorage.setItem('clubPvid', String(result.data.data.referencePvid));

        setFormData((prevData) => ({
            ...prevData,
            ClubPvid: result.data.data.referencePvid, // Assuming pvid is the correct property name
        }));
      } catch (error) {
        console.error('Fetch user profile error:', error);
      }
    }

    // const ClubPvid = userProfile.referencePvid;
    const ClubPvid = localStorage.getItem('clubPvid');

    const fetchRegisterClubList = async () => {
        if (!userPvid) return;

        try {
            setLoading(true);
            const result = await axios.get(BASE_URL+`Api/Event/RegisterFromClubList?ClubPvid=${ClubPvid}&EventPvid=${pvid}`, {
                headers: await config()
            });
            setRegisterClubList(result.data.data);
            console.log('cek register club list', result.data.data);

            setLoading(false);

            // Store the eventPvid in localStorage
            // localStorage.setItem('eventPvid', eventPvid);
        } catch (error) {
            console.error('Fetch register club list error:', error);
            setLoading(false);
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
    
    const fetchEventData = async () => {
        if (!userPvid) return;

        try {
            const result = await axios.get(BASE_URL+`Api/Event/GetById?Pvid=${pvid}`, {
                headers: await config()
            });
            setEventData(result.data.data);
            console.log('cek event data', result.data.data);

            await fetchUserProfile();

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
      fetchAthleteByClub(ClubPvid);
      fetchEventData();
    }, [userPvid, ClubPvid]);

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedEditPvid, setSelectedEditPvid] = useState(null);

    const handleRowSelect = (pvid) => {
        if (selectedRows.includes(pvid)) {
            setSelectedRows(selectedRows.filter(id => id !== pvid));
        } else {
            setSelectedRows([...selectedRows, pvid]);
        }
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
                
                // Hide the form
                setShowForm(false);
                setShowEditForm(false);
                window.scrollTo({ top: 0, behavior: "smooth" });

                // Fetch the register club list based on the new eventPvid
                await fetchRegisterClubList(newEventPvid);
                await fetchAthleteByClub(ClubPvid);
                await fetchEventData();
                await fetchListAgeGroup();
                await fetchUserProfile();

                setSeasonBest("");

                setFormData({
                    AthletePvid: null,
                    EventPvid: formData.EventPvid,
                    ClubPvid: parseInt(formData.ClubPvid),
                    AgeGroupPvid: null,
                    Disciplines: [],
                    ContactNumber: "",
                    EmergencyContactName: "",
                    EmergencyContactNumber: "",
                    FullyVaccinated: "",
                    CoachFullName: "",
                    PAR_Q: [],
                });

                // Reload the page
                // window.location.reload();
            }
        } catch (error) {
            // console.error('Registration error:', error);
            // Handle error cases
        }
    };

    const [isApproved, setIsApproved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState(null);

    const handleApprove = async () => {
        try {
            setIsLoading(true);  // Set loading to true when starting the API call
    
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
            await generateQRCode(invoiceNumber);

            await fetchRegisterClubList(newEventPvid);
    
            // Check if the request was successful
            if (response.status === 200) {
                console.log('Payment approved successfully.');
                setIsApproved(true); // Update the approval status
            } else {
                console.log('Failed to approve payment.');
            }
        } catch (error) {
            console.error('Approval error:', error);
            // if (error.response && error.response.data && error.response.data.errorMessage) {
                // Set the registration error message from the API response
                setRegistrationError(error.response.data.errorMessage);
            // } else {
                // setRegistrationError("An error occurred while submitting the form. Please try again later.");
            // }
        } finally {
            setIsLoading(false);  // Set loading to false after the API call
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
        
        const selectedRow = registerClubList.non_submitted.find(item => item.pvid === pvid);
        console.log("Selected Row:", selectedRow);

        if (selectedRow) {
        setFormData({
            ...formData,
            Pvid: selectedRow.pvid,
            EventPvid: selectedRow.eventPvid,
            ClubPvid: selectedRow.teamCode,
            AthletePvid: selectedRow.athletePvid,
            AgeGroupPvid: selectedRow.ageGroupPvid,
            Disciplines: selectedRow.disciplinePvid,
            ContactNumber: selectedRow.contactNumber,
            SeasonBest: selectedRow.seasonBest,
            EmergencyContactName: selectedRow.emergencyContactName,
            EmergencyContactNumber: selectedRow.emergencyContactNumber,
            FullyVaccinated: selectedRow.fullyVaccinated,
            CoachFullName: selectedRow.coachFullName,
            PAR_Q:  [ { ParqPvid :0, ParqIsYes: selectedRow.paR_Q == 'Y'? true: false}],
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
            // Modify formData to fit the desired request structure
            const requestObject = {
                Pvid: formData.Pvid,
                AthletePvid: formData.AthletePvid,
                EventPvid: formData.EventPvid,
                ClubPvid: formData.ClubPvid,
                AgeGroupPvid: formData.AgeGroupPvid,
                Disciplines: [{
                    DisciplinePvid: formData.Disciplines,
                    SeasonBest: formData.SeasonBest || ''
                }],
                ContactNumber: formData.ContactNumber,
                EmergencyContactName: formData.EmergencyContactName,
                EmergencyContactNumber: formData.EmergencyContactNumber,
                FullyVaccinated: formData.FullyVaccinated,
                CoachFullName: formData.CoachFullName,
                PAR_Q: formData.PAR_Q
            };

            // Lakukan proses update data dengan nilai formData yang sudah diperbarui
            const response = await axios.post(
                BASE_URL+'Api/Event/RegisterFromClubUpdate',
                requestObject,
                {
                    headers: await configEventRegister() // Sesuaikan dengan kebutuhan headers Anda
                }
            );
    
            if (response.status === 200) {
                console.log('Data updated successfully');
                // Reset formData and selectedEditPvid
                setFormData({
                    AthletePvid: null,
                    EventPvid: formData.EventPvid,
                    ClubPvid: parseInt(formData.ClubPvid),
                    AgeGroupPvid: null,
                    Disciplines: [],
                    ContactNumber: "",
                    // SeasonBest: "",
                    EmergencyContactName: "",
                    EmergencyContactNumber: "",
                    FullyVaccinated: "",
                    CoachFullName: "",
                    PAR_Q: [],
                });
                setSelectedEditPvid(null);

                // Hide the form
                setShowEditForm(false);
                setShowForm(false);

                // Scroll to the top of the page
                window.scrollTo({ top: 0, behavior: "smooth" });

                await fetchRegisterClubList();
                await fetchAthleteByClub(ClubPvid);
                await fetchEventData();
                await fetchListAgeGroup();
                await fetchUserProfile();

                setSeasonBest("");

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
    const [seasonBest, setSeasonBest] = useState("");
  
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
      ClubPvid: 0,
      AgeGroupPvid: null,
      Disciplines: [],
      ContactNumber: "",
    //   SeasonBest: "",
      EmergencyContactName: "",
      EmergencyContactNumber: "",
      FullyVaccinated: "",
      CoachFullName: "",
    //   PAR_Q: "",
      PAR_Q: [],
    });

    const handleParqInputChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          PAR_Q: [ { ParqPvid :0, ParqIsYes: value == 'Y'? true: false}],
        }));
      };    

    const handleInputChangeEdit = (selectedValue) => {
    const selectedDiscipline = selectedValue ? parseInt(selectedValue, 10) : null;

    // Update the formData with the selected discipline
    setFormData({
        ...formData,
        Disciplines: selectedDiscipline,
    });
    };
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));

        // Parse the selected value to convert it back to an object
        const selectedDiscipline = JSON.parse(selectedValue);

        // Update the formData with the selected discipline
        setFormData({
            ...formData,
            Disciplines: selectedDiscipline,
        });

        const newValue = (name === 'AgeGroupPvid') ? parseInt(value) : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
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
        url: BASE_URL+`Api/Event/RegisterFromClubList?ClubPvid=${ClubPvid}&EventPvid=${pvid}`,
        method: 'GET',
        responseType: 'json',
        headers: headers,
        }).then(response => {
        const data = response.data.data.submitted;

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Event Participate');

        // Add title row
        const titleRow = [eventData.name]; // Add the title
        worksheet.addRow(titleRow);
        // worksheet.mergeCells('A1:Y1'); // Merge cells for the title
        const titleCell = worksheet.getCell('A1');
        titleCell.alignment = { horizontal: 'left', vertical: 'middle' };
        titleCell.font = { bold: true, size: 20 };

        // Add spacer row
        const spacerRow = [];
        worksheet.addRow(spacerRow);

        const teamNameRow = 'Team Name: '; // Add the title
        // worksheet.addRow(teamNameRow);
        // worksheet.mergeCells('A3:F3'); // Merge cells for the title

        const cellE3 = worksheet.getCell('E3');
        cellE3.value = teamNameRow;

        const teamNameFieldRow = registerClubList.submitted[1].teamName; // Add the title
        // worksheet.addRow(teamNameRow);
        // worksheet.mergeCells('A3:F3'); // Merge cells for the title

        const cellF3 = worksheet.getCell('F3');
        cellF3.value = teamNameFieldRow;

        const nameBillingRow = 'Name of Person to receive Billing: '; 
        const cellE4 = worksheet.getCell('E4');
        cellE4.value = nameBillingRow;

        const nameBillingFieldRow = userProfile.firstName + ' ' + userProfile.lastName;
        const cellF4 = worksheet.getCell('F4');
        cellF4.value = nameBillingFieldRow;

        const emailBillingRow = 'Email of Person to receive Billing: '; 
        const cellE5 = worksheet.getCell('E5');
        cellE5.value = emailBillingRow;

        const emailBillingFieldRow = userProfile.email;
        const cellF5 = worksheet.getCell('F5');
        cellF5.value = emailBillingFieldRow;

        const invoiceRow = 'Charge Code (Invoice): '; 
        const cellE6 = worksheet.getCell('E6');
        cellE6.value = invoiceRow;

        const invoiceFieldRow = registerClubList.submitted[1].invoiceNo;
        const cellF6 = worksheet.getCell('F6');
        cellF6.value = invoiceFieldRow;

        // const nameBillingRow = ['Name of Person to receive Billing: '+ userProfile.firstName + ' ' + userProfile.lastName]; // Add the title
        // worksheet.addRow(nameBillingRow);
        // // worksheet.mergeCells('A4:F4'); // Merge cells for the title

        // const emailBillingRow = ['Name of Person to receive Billing: '+ userProfile.email]; // Add the title
        // worksheet.addRow(emailBillingRow);
        // // worksheet.mergeCells('A5:F5'); // Merge cells for the title

        // const invoiceRow = ['Charge Code (Invoice): '+ registerClubList.submitted[1].invoiceNo]; // Add the title
        // worksheet.addRow(invoiceRow);
        // // worksheet.mergeCells('A6:F6'); // Merge cells for the title

        // const startRow = 3; // Starting row number
        // const endRow = 6;   // Ending row number
        // const columnLetter = 'A'; // Column letter

        // for (let row = startRow; row <= endRow; row++) {
        //     const cell = worksheet.getCell(`${columnLetter}${row}`);
        //     cell.alignment = { horizontal: 'left', vertical: 'middle' };
        //     cell.font = { bold: true, size: 12 };
        // }

        // Define the background color (e.g., light gray)
        const backgroundColor = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'CCCCCC' }, // Light gray color
        };

        // Define the font style for bold
        const boldFontStyle = {
            bold: true,
            size: 12,
        };

        // Apply formatting to cell H3
        const text1ToAdd = "Division Type";
        const cellH3 = worksheet.getCell('H3');
        cellH3.value = text1ToAdd;
        cellH3.fill = backgroundColor; // Set background color
        cellH3.font = boldFontStyle; // Make text bold
        cellH3.alignment = { horizontal: 'center', vertical: 'middle' }; // Center-align text

        // Apply formatting to cell I3
        const text2ToAdd = "Event Division";
        const cellI3 = worksheet.getCell('I3');
        cellI3.value = text2ToAdd;
        cellI3.fill = backgroundColor; // Set background color
        cellI3.font = boldFontStyle; // Make text bold
        cellI3.alignment = { horizontal: 'center', vertical: 'middle' }; // Center-align text

        const text3ToAdd = "U18 (13, 14, 15, 16 & 17 years old)"; // Replace with your desired text
        const cellH4 = worksheet.getCell('H4');
        cellH4.value = text3ToAdd;

        const text4ToAdd = "Open (16 years and above)"; // Replace with your desired text
        const cellH5 = worksheet.getCell('H5');
        cellH5.value = text4ToAdd;

        const text5ToAdd = "Novice (13 years and above)"; // Replace with your desired text
        const cellH6 = worksheet.getCell('H6');
        cellH6.value = text5ToAdd;

        const text6ToAdd = "Intermediate (13 years and above)"; // Replace with your desired text
        const cellH7 = worksheet.getCell('H7');
        cellH7.value = text6ToAdd;

        const text8ToAdd = "1"; // Replace with your desired text
        const cellI4 = worksheet.getCell('I4');
        cellI4.value = text8ToAdd;

        const text9ToAdd = "2"; // Replace with your desired text
        const cellI5 = worksheet.getCell('I5');
        cellI5.value = text9ToAdd;

        const text10ToAdd = "3"; // Replace with your desired text
        const cellI6 = worksheet.getCell('I6');
        cellI6.value = text10ToAdd;

        const text11ToAdd = "4"; // Replace with your desired text
        const cellI7 = worksheet.getCell('I7');
        cellI7.value = text11ToAdd;

        // Add borders to specific rows and cells
        const borderStyle = {
            style: 'thin', // You can change this style as needed
            color: { argb: '00000000' }, // Black color
        };

        // Add borders to specific cells
        const cellsWithBorders = ['H3', 'I3', 'H4', 'H5', 'H6', 'H7', 'I4', 'I5', 'I6', 'I7'];

        cellsWithBorders.forEach(cellRef => {
            const cell = worksheet.getCell(cellRef);
            cell.border = {
                top: borderStyle,
                left: borderStyle,
                bottom: borderStyle,
                right: borderStyle,
            };
        });

        // Add spacer row
        const spacer1Row = [];
        worksheet.addRow(spacer1Row);

        const text12ToAdd = "*I acknowledge that by submitting this document, the team and the athlete voluntarily assume all risks in participating at this event and agree not to hold the organiser or any individuals or organisations involved in organising liable for any injury or illness"; // Replace with your desired text
        const cellA10 = worksheet.getCell('A10');
        cellA10.value = text12ToAdd;

        const spacer2Row = [];
        worksheet.addRow(spacer2Row);

        const spacer3Row = [];
        worksheet.addRow(spacer3Row);

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
        const headerCells = worksheet.getRow(13);
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
        // adjustColumnWidths(worksheet);
        adjustColumnWidthsForData(worksheet);

        // Generate blob from workbook
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create a download link and trigger click
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'event_participate.xlsx';
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

    const adjustColumnWidthsForData = worksheet => {
        worksheet.columns.forEach(column => {
            if (column.number !== 1) { // Exclude the first column for title row
                let maxCellLength = 0;
                column.eachCell({ includeEmpty: true }, cell => {
                    const contentLength = cell.value ? String(cell.value).length : 0;
                    maxCellLength = Math.max(maxCellLength, contentLength);
                });
                column.width = maxCellLength + 2; // Adjust for padding
            }
        });
    };

    const formatDate = date => {
        const parsedDate = new Date(date);
        const day = parsedDate.getDate().toString().padStart(2, '0');
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = parsedDate.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [activeTab, setActiveTab] = useState('non_submitted'); // 'non_submitted' or 'submitted'
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };

    const renderTable = (list) => (
        <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
        {/* The rest of your table structure here */}
            <thead>
                <tr className="text-left">
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">#</th>
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Participant</th>
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Unique ID</th>
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Age Group</th>
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Discipline</th>
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Season Best</th>
                    <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 text-xs">Coach</th>
                </tr>
            </thead>
            <tbody>
                {list && list.length > 0 ? (
                list.map((listItem, index) => (
                    <tr className="focus-within:bg-gray-200 overflow-hidden" key={listItem.pvid}>
                    {/* Your table row contents here */}
                        <td className="border-t flex">
                            <span className="text-gray-700 px-4 py-4 flex items-center">{index + 1}</span>
                            {activeTab === 'non_submitted' && (
                                <span className="text-gray-700 px-0 py-4 flex items-center">
                                <input
                                    type="checkbox"
                                    onChange={() => handleRowSelect(listItem.pvid)}
                                    checked={selectedRows.includes(listItem.pvid)}
                                />
                                </span>
                            )}
                        </td>
                        <td className="border-t">
                            <span className="text-gray-700 px-6 py-0 flex font-bold items-center">{listItem.firstName}</span>
                            <span className="text-gray-700 px-6 py-0 flex text-xs items-center">{moment(listItem.dob).format('DD/MMM/YYYY')} - {listItem.gender}</span>
                        </td>
                        <td className="border-t">
                            <span className="text-gray-700 px-6 py-3 flex items-center">{listItem.uniqueID}</span>
                        </td>
                        <td className="border-t">
                            <span className="text-gray-700 px-6 py-3 flex items-center">{listItem.eventDivisionName}</span>
                        </td>
                        <td className="border-t">
                            <span className="text-gray-700 px-6 py-3 flex items-center">{listItem.disciplineName}</span>
                        </td>
                        <td className="border-t">
                            <span className="text-gray-700 px-6 py-3 flex items-center">{listItem.seasonBest}</span>
                        </td>
                        <td className="border-t">
                            <span className="text-gray-700 px-6 py-3 flex items-center">{listItem.coachFullName}</span>
                        </td>
                    </tr>
                ))
                ) : (
                <tr>
                    {/* Your "Loading..." or "Not Available" content here */}
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
    );

  return (
    <div>
        {/* <div className=''>
            <div className='border-b-[3px] border-dotted border-primary'>
                <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Account</h2>
            </div>
        </div> */}

        <div className={showForm || showEditForm ? 'hidden' : "flex"}>
            <button
                className={`tab-button p-2 px-3 rounded-md text-white mr-2 ${activeTab === 'non_submitted' ? 'bg-primary text-gray-700' : 'bg-secondary text-white'}`}
                onClick={() => handleTabChange('non_submitted')}
            >
                Draft
            </button>
            <button
                className={`tab-button p-2 px-3 rounded-md text-white ${activeTab === 'submitted' ? 'bg-primary text-gray-700' : 'bg-secondary text-white'}`}
                onClick={() => handleTabChange('submitted')}
            >
                Submitted
            </button>
        </div>
        
        {activeTab === 'non_submitted' && (
            <div className={showForm || showEditForm ? 'hidden' : 'flex items-center justify-end space-x-2 mb-4'}>
                {/* Button Approve */}
                {registrationError && (
                    <p className="text-red-500 text-center">{registrationError}</p>
                )}
                <div className='relative flex flex-col items-center group'>
                    <button onClick={handleApprove} disabled={isLoading}>
                    {isLoading ? (
                        <div className="flex items-center">
                            <div className="animate-spin">
                                <Icon icon="gg:spinner" className="h-[1.8rem] w-auto text-gray-400" />
                            </div>
                        </div>
                    ) : (
                        <Icon icon="gg:check-o" className="h-[1.8rem] w-auto mr-0 text-gray-400" />
                    )}
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
                {/* <span className='text-gray-300'>|</span>
                Button Export to Excel
                <button onClick={downloadExcel}>
                    <Icon
                    icon='vscode-icons:file-type-excel'
                    className='h-[1.8rem] w-auto mr-2 text-primary'
                    />
                </button> */}
            </div>
        )}

        {activeTab === 'submitted' && (
            <div className={showForm || showEditForm ? 'hidden' : 'flex items-center justify-end space-x-2 mb-4'}>
                <span className='text-gray-300'>|</span>
                {/* Button Export to Excel */}
                <button onClick={downloadExcel}>
                    <Icon
                    icon='vscode-icons:file-type-excel'
                    className='h-[1.8rem] w-auto mr-2 text-primary'
                    />
                </button>
            </div>
        )}

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

        <div className={showForm || showEditForm ? 'hidden' : 'overflow-x-auto bg-white rounded-lg shadow'}>
            {renderTable(activeTab === 'non_submitted' ? registerClubList?.non_submitted : registerClubList?.submitted)}
        </div>
        
        {/* <div className={showForm || showEditForm ? 'hidden' : 'overflow-x-auto bg-white rounded-lg shadow'}>
            Manage Registration
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
                {registerClubList && registerClubList.non_submitted && registerClubList.non_submitted.length > 0 ? (
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
        </div> */}

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
                        <p className='py-2'>Selected Disciplines:</p>
                        <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                            <thead>
                            <tr className="text-left">
                                <th className="px-3 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3">Disciplines</th>
                                <th className="px-3 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3">Season Best</th>
                                <th className="px-3 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(formData.Disciplines) && formData.Disciplines.map((discipline, index) => (
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
                            <label className="flex items-center">
                                <input
                                type="radio"
                                name="PAR_Q"
                                value="Y"
                                onChange={handleParqInputChange}
                                />{' '}
                                &nbsp;YES
                            </label>

                            <label className="flex items-center">
                                <input
                                type="radio"
                                name="PAR_Q"
                                value="N"
                                onChange={handleParqInputChange}
                                />{' '}
                                &nbsp;NO
                            </label>
                        </div>
                                        
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

                    {/* <select
                        name="Disciplines"
                        value={formData.Disciplines ? JSON.stringify(formData.Disciplines) : ''}
                        onChange={(event) => handleInputChangeEdit(event.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    >
                        <option value="">Select Disciplines</option>
                        {listDisciplines.map(data => (
                            <option key={data.pvid} value={JSON.stringify(data.pvid)}>
                                {data.name}
                            </option>
                        ))}
                    </select> */}

                    <select
                    name="Disciplines"
                    value={formData.Disciplines ? formData.Disciplines : ''}
                    onChange={(event) => handleInputChangeEdit(event.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                    >
                    <option value="">Select Disciplines</option>
                    {listDisciplines.map(data => (
                        <option key={data.pvid} value={JSON.stringify(data.pvid)}>
                        {data.name}
                        </option>
                    ))}
                    </select>

                    <input
                    type="text"
                    name="SeasonBest"
                    placeholder="Season Best"
                    value={formData.SeasonBest || ''}
                    onChange={(e) => setFormData({ ...formData, SeasonBest: e.target.value })}
                    className="w-full mb-4 p-2 border rounded"
                    required
                    />

                    {/* <select
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
                    </div> */}

                    {/* <input
                        type="text"
                        name="SeasonBest"
                        placeholder="Season Best"
                        value={formData.SeasonBest}
                        onChange={(e) => setSeasonBest(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    /> */}

                    <input
                        type="number"
                        name="ContactNumber"
                        placeholder="Contact Number"
                        value={formData.ContactNumber}
                        onChange={handleInputChange}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />

                    {/* <input
                        type="text"
                        name="SeasonBest"
                        placeholder="Season Best"
                        value={formData.SeasonBest}
                        onChange={handleInputChange}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    /> */}

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

                    {/* <select
                        name="PAR_Q"
                        value={formData.PAR_Q}
                        onChange={handleInputChange}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    >
                        <option value="">PAR_Q</option>
                        <option value="Y">YES</option>
                        <option value="N">NO</option>
                    </select> */}

                    <div className="py-2">
                        <p className="w-full p-2 rounded hover:bg-secondary-600 text-bold"><span className="text-primary">*</span>PAR_Q</p>
                        <label className="flex items-center">
                            <input
                            type="radio"
                            name="PAR_Q"
                            value="Y"
                            checked={formData.PAR_Q.some(function (val) {
                                return val.ParqIsYes;
                            }) }
                            onChange={handleParqInputChange}
                            />{' '}
                            &nbsp;YES
                        </label>

                        <label className="flex items-center">
                            <input
                            type="radio"
                            name="PAR_Q"
                            value="N"
                            checked={formData.PAR_Q.some(function (val) {
                                return !val.ParqIsYes;
                            }) }
                            onChange={handleParqInputChange}
                            />{' '}
                            &nbsp;NO
                        </label>
                    </div>

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

        <button className={showForm || showEditForm ? 'hidden' : "py-4 text-primary flex justify-end"}>
            <Link to='/account/events'>
                Back
            </Link>
        </button>
    </div>
  )
}

export default SubmitParticipant