import React from 'react'
import { useState } from 'react';
import { config } from '../service/api';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../service/config';
function NationalRecords() {
    // AllTime Records
    const [allTimeRecords, setAllTimeRecords] = useState([]);
    const [eventAllTimeFilter, setEventAllTimeFilter] = useState('');
    const [genderAllTimeFilter, setGenderAllTimeFilter] = useState('');
    const [ageGroupFilter, setAgeGroupFilter] = useState(1);
    const [filteredAllTimeData, setFilteredAllTimeData] = useState([]);
    const [currentAllTimePage, setCurrentAllTimePage] = useState(1);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState(1);
    const [filteredAllTime, setFilteredAllTime] = useState([]);
    const [isInitialRenderAllTime, setIsInitialRenderAllTime] = useState(true);
    const [filterClicked, setFilterClicked] = useState(false);

    // National Records
    const [nationalRecords, setNationalRecords] = useState([]);
    const [ToggleState, setToggleState] = useState(1);
    const [showTypeFilter, setShowTypeFilter] = useState(true);
    const [showGenderFilter, setShowGenderFilter] = useState(true);
    const [eventFilter, setEventFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [desciplineList, setDesciplineList] = useState([]);
    const [ageGroupList, setAgeGroupList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ageGroupFilterTitle, setAgeGroupFilterTitle] = useState('');

    // TAB
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) =>
        ToggleState === index ? className : '';


    // Fetch GetDesciplineList
    const fetchDescipline = async () => {
        try {
        const result = await axios.get(BASE_URL+'Api/Discipline/GetList', {
            headers: await config()
        });
        setDesciplineList(result.data.data);
        console.log('cek descipline', result.data.data);
        } catch (error) {
        console.error('Error fetching descipline:', error);
        }
    };

    // Fetch GetAgeGroupList
    const fetchAgeGroupList = async () => {
        try {
        const result = await axios.get(BASE_URL+'Api/AgeGroup/GetList', {
            headers: await config()
        });
        setAgeGroupList(result.data.data);
        console.log('cek age group', result.data.data);
        } catch (error) {
        console.error('Error fetching age group:', error);
        }
    };

    // Fetch GetAllTimeRecordPublic
    const fetchAllTimeRecords = async () => {
        try {
        setIsLoading(true);
        const result = await axios.get(
            BASE_URL+`Api/Event/GetRecordAllTimePublic?DisciplinePvid=${eventAllTimeFilter}&Gender=${genderAllTimeFilter}&AgeGroupPvid=${ageGroupFilter}`,
            {
            headers: await config()
            }
        );
        setAllTimeRecords(result.data.data);
        console.log('cek all time records', result.data.data);
        } catch (error) {
        console.error('Error fetching all time records:', error);
        } finally {
        setIsLoading(false);
        }
    };

    const handleFilterButtonClick = async () => {
        fetchAllTimeRecords();
    };

    const handleClearFilter = () => {
        setEventAllTimeFilter('');
        setGenderAllTimeFilter('');
        setAgeGroupFilter('');
      };
    
    // Fetch GetNationalRecordPublic
    const fetchNationalRecords = async () => {
        try {
        const result = await axios.get(BASE_URL+'Api/Event/GetNationalRecordPublic?DisciplinePvid=&Gender=&InOut', {
            headers: await config()
        });
        setNationalRecords(result.data.data);
        } catch (error) {
        console.error('Error fetching national records:', error);
        }
    };

    useEffect(() => {
        fetchNationalRecords();
        fetchAllTimeRecords();
        fetchDescipline();
        fetchAgeGroupList();
    }, []);
    

    // Filter National Records
    const handleFilterNationalRecords = () => {
        let filtered = nationalRecords;
        if (eventFilter) {
        filtered = filtered.filter(data => data.records[0].disciplineName === eventFilter);
        }

        if (genderFilter) {
        filtered = filtered.filter(data => data.gender === genderFilter);
        }

        if (typeFilter) {
        filtered = filtered.filter(data => data.inOut === typeFilter);
        }

        setFilteredData(filtered);
        setCurrentPage(1); // Set current page to 1 after filtering
        console.log('cek filter national records', filtered);
    };

    useEffect(() => {
        setFilteredData(nationalRecords);
    }, [nationalRecords]);

    // Calculate the index range of data to display based on current page
    const lastIndex = currentPage * 20;
    const firstIndex = lastIndex - 20;

    // Slice the data array based on the index range
    const displayedData = filteredData.slice(firstIndex, lastIndex);

    // Calculate the total number of pages based on the number of data
    const totalPages = Math.ceil(filteredData.length / 20);

    const handleClearFilterNationalRecords = () => {
        setEventFilter('');
        setGenderFilter('');
        setTypeFilter('');
        setFilteredData(nationalRecords);
        setCurrentPage(1);
        setSelectedDiscipline(null);
    };

    const handleDisciplineChange = (event) => {
        setSelectedDiscipline(event.target.value);
    }
    
    useEffect(() => {
        setIsInitialRender(false);
        if (selectedDiscipline !== null) {
        const filteredData = displayedData.filter(data => data.records[0].disciplineName === selectedDiscipline);
        setFilteredRecords(filteredData);
        } else {
        setFilteredRecords([]);
        }
    }, [selectedDiscipline]);
  return (
    <div>
        <section id='profile' className='container my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
            <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                <div className='my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3'>
                    <div>
                        <a
                            className={`tabs ${getActiveClass(1, "active-tabs")}`}
                            onClick={() => toggleTab(1)}
                        >
                            <div className="search-modes-list">
                                <Icon 
                                    className="h-[30px] w-auto mr-[10px]"
                                    icon="fa:line-chart"
                                />
                                <p>ALL-TIME
                                    <span>Statistics<span></span></span>
                                </p>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a 
                            className={`tabs ${getActiveClass(2, "active-tabs")}`}
                            onClick={() => toggleTab(2)}
                        >
                            <div className="search-modes-list">
                                <Icon 
                                    className="h-[30px] w-auto mr-[10px]"
                                    icon="fa-solid:sort-amount-down"
                                />
                                <p>Records
                                    <span>National-Records<span></span></span>
                                </p>
                            </div>
                        </a>
                    </div>
                </div>

                <div className='my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3'>
                    <div className={`hidden ${getActiveClass(1, "active-content")}`}>
                        <div className='mt-2'>
                            <select value={eventAllTimeFilter} onChange={(e) => setEventAllTimeFilter(e.target.value)} className="bg-white leading-10 text-[20px] border border-gray-300 text-gray-900 rounded-3xl focus:ring-gray-400 focus:border-gray-400 focus:bg-gray-200 block w-full p-3">
                                <option className='text-[14px] bg-white' value=''>Select Event / Discipline</option>
                                {desciplineList.map(data => (
                                    <option className='text-[14px] bg-white' value={data.pvid}>{data.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex'>
                            <div className='w-1/2'>
                                <div className='py-4 px-1'>
                                    <label className="radio-inline static-one">Men</label>
                                    <label className="radio-inline flex items-center gap-1">
                                        <input type="radio" id="senior-men" name="age-group" value="M" onChange={(e) => setGenderAllTimeFilter(e.target.value)} checked={genderAllTimeFilter === "M"} disabled={!showGenderFilter} /> Open
                                    </label>
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='py-4 px-1'>
                                    <label className="radio-inline static-one">Women</label>
                                    <label className="radio-inline flex items-center gap-1">
                                        <input type="radio" id="senior-women" name="age-group" value="W" onChange={(e) => setGenderAllTimeFilter(e.target.value)} checked={genderAllTimeFilter === "W"} disabled={!showGenderFilter} /> Open
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <button onClick={handleFilterButtonClick} className="cursor-pointer mt-4 flex items-center space-x-3 p-2 justify-center text-[20px] text-white bg-primary rounded-3xl px-3">
                                Show List
                            </button>
                            <button onClick={handleClearFilter} className="cursor-pointer mt-4 flex items-center space-x-3 p-2 justify-center text-[20px] text-white bg-primary rounded-3xl px-3">
                                Clear
                            </button>
                        </div>
                    </div>

                    <div className={`hidden ${getActiveClass(2, "active-content")}`}>
                        <div className='flex'>
                            <div className='w-1/2'>
                                <div className='py-2 px-1'>
                                    <label className="radio-inline static-one">Men</label>
                                    <label className="radio-inline flex items-center gap-1">
                                        <input type="radio" id="senior-men" name="age-group" value="M" onChange={e => setGenderFilter(e.target.value)} checked={genderFilter === "M"} disabled={!showGenderFilter} /> Open
                                    </label>
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='py-2 px-1'>
                                    <label className="radio-inline static-one">Women</label>
                                    <label className="radio-inline flex items-center gap-1">
                                        <input type="radio" id="senior-women" name="age-group" value="W" onChange={e => setGenderFilter(e.target.value)} checked={genderFilter === "W"} disabled={!showGenderFilter} /> Open
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-full lg:w-1/1'>
                                <div className='py-2 px-1'>
                                    <label className="radio-inline static-one">Type</label>
                                    <div className='flex gap-2'>
                                        <div className='lg:w-1/2 w-full'>
                                            <label className="radio-inline flex items-center gap-1">
                                                <input type="radio" id="in-out" name="type" value="IN" onChange={e => setTypeFilter(e.target.value)} checked={typeFilter === "IN"} disabled={!showTypeFilter} /> Indoor
                                            </label>
                                        </div>
                                        <div className='lg:w-1/2 w-full'>
                                            <label className="radio-inline flex items-center gap-1">
                                                <input type="radio" id="in-out" name="type" value="OUT" onChange={e => setTypeFilter(e.target.value)} checked={typeFilter === "OUT"} disabled={!showTypeFilter} /> Outdoor
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <button onClick={handleFilterNationalRecords} className="cursor-pointer mt-4 flex items-center space-x-3 p-2 justify-center text-[20px] text-white bg-primary rounded-3xl px-3">
                                Show List
                            </button>
                            <button onClick={handleClearFilterNationalRecords} className="cursor-pointer mt-4 flex items-center space-x-3 p-2 justify-center text-[20px] text-white bg-primary rounded-3xl px-3">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                <div className='my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3'>
                    <div className={`hidden ${getActiveClass(1, "active-content")}`}>
                        <div className='mt-2'>
                            <select value={ageGroupFilter} onChange={(e) => setAgeGroupFilter(e.target.value)} className="bg-white leading-10 text-[20px] border border-gray-300 text-gray-900 rounded-3xl focus:ring-gray-400 focus:border-gray-400 focus:bg-gray-200 block w-full p-3">
                                <option className='text-[14px] bg-white' value=''>Select Age Group</option>
                                {ageGroupList.map(data => (
                                    <option className='text-[14px] bg-white' value={data.pvid}>{data.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='px-2 py-2'>
                            <p className='text-[1rem] font-light text-gray-500 mb-[20px]'> Select an age group to display all time records and statistics. </p>
                        </div>
                    </div>

                    <div className={`hidden ${getActiveClass(2, "active-content")}`}>
                        <div className='mt-2'>
                            <select value={selectedDiscipline} onChange={handleDisciplineChange} className="bg-white leading-10 text-[20px] border border-gray-300 text-gray-900 rounded-3xl focus:ring-gray-400 focus:border-gray-400 focus:bg-gray-200 block w-full p-3">
                                <option className='text-[14px] bg-white' defaultValue>Select Event / Descipline</option>
                                {nationalRecords.map(data => (
                                    <option className='text-[14px] bg-white' value={data.records[0].disciplineName}>{data.records[0].disciplineName}</option>
                                ))}
                            </select>
                        </div>

                        <div className='px-2 py-2'>
                            <p className='text-[1rem] font-light text-gray-500 mb-[20px]'> Select an event/descipline to display all record types and competitions. </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className='bg-gray-100'>
            <section id='annual' className='container  my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
                <div>
                    <div className="container mx-auto lg:px-0">
                        <div className={`hidden ${getActiveClass(1, "active-content")}`}>
                            <div className="py-8">
                                {isLoading ? (
                                    <p>Loading...</p>
                                    ) : (
                                    <>
                                    {allTimeRecords && allTimeRecords.records && allTimeRecords.records.length > 0 ? (
                                        <div>
                                            <h2 className="text-2xl font-semibold leading-tight">{allTimeRecords.title}</h2>
                                            <div className="-mx-4 sm:-mx-8 px-4 py-4 sm:px-8 overflow-x-auto">
                                            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                                <table className="min-w-full leading-normal">
                                                <thead>
                                                    <tr>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Event / Discipline</th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Result</th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Wind</th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">DOB</th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Competition</th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Venue</th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allTimeRecords.records.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{data.disciplineName}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{data.athleteName}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{data.result}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{data.wind}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{moment(data.athleteBirthDate).format('YYYY')}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{data.eventName}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{data.venue}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{moment(data.date).format('DD MMM YYYY')}</p>
                                                        </td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                                </table>
                                            </div>
                                            </div>
                                        </div>
                                        ) : (
                                        <p>No available</p>
                                    )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className={`hidden ${getActiveClass(2, "active-content")}`}>
                            <div className="py-8">
                                {isInitialRender || selectedDiscipline === null ? (
                                    displayedData.length > 0 ? (
                                    displayedData.map((data, index) => (
                                        <div key={index}>
                                        {/* Render table from displayedData */}
                                        <h2 className="text-2xl font-semibold leading-tight">{data.title}</h2>
                                            <p>
                                                <b>{data.gender === 'M' ? 'Men' : 'Women'}</b> ({data.inOut === 'IN' ? 'Indoor' : 'Outdoor'})
                                            </p>
                                            <div>
                                                <div className="-mx-4 sm:-mx-8 px-4 py-4 sm:px-8 overflow-x-auto">
                                                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                                    <table className="min-w-full leading-normal">
                                                        <thead>
                                                        <tr>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Event / Discipline </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Result </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Athlete </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> DOB </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Venue </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Event </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Date </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {/* {displayedData.length > 0 ? ( */}
                                                            {/* displayedData.map((data, index) => ( */}
                                                                <tr>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <p className="text-gray-900 whitespace-no-wrap">{data.records[0].disciplineName}</p>
                                                                    </td>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <p className="text-gray-900 whitespace-no-wrap">{data.records[0].result}</p>
                                                                    </td>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <p className="text-gray-900 whitespace-no-wrap">{data.records[0].athleteName}</p>
                                                                    </td>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <p className="text-gray-900 whitespace-no-wrap">{moment(data.records[0].athleteBirthDate).format('YYYY')}</p>
                                                                    </td>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <p className="text-gray-900 whitespace-no-wrap">{data.records[0].venue}</p>
                                                                    </td>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <p className="text-gray-900 whitespace-no-wrap">{data.records[0].eventName}</p>
                                                                    </td>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <p className="text-gray-900 whitespace-no-wrap">{moment(data.records[0].date).format('DD MMM YYYY')}</p>
                                                                    </td>
                                                                </tr>
                                                            {/* ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    Not Available
                                                                </td>
                                                            </tr>
                                                        )} */}
                                                        </tbody>
                                                    </table>
                                                    </div>
                                                    {/* Pagination buttons */}
                                                    {totalPages > 1 && (
                                                        <div className="pagination flex gap-4">
                                                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                                                            
                                                            {Array.from({ length: totalPages }, (_, i) => (
                                                            <button 
                                                                key={i} 
                                                                className={currentPage === i + 1 ? 'border-primary border-b-[2px]' : ''} // tambahkan kelas `bg-gray-500` jika tombol ini mewakili halaman aktif
                                                                disabled={currentPage === i + 1} 
                                                                onClick={() => setCurrentPage(i + 1)}
                                                            >
                                                                {i + 1}
                                                            </button>
                                                            ))}
                                                        
                                                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    ) : (
                                    <p>Not available</p>
                                    )
                                ) : (
                                    filteredRecords.length > 0 ? (
                                    filteredRecords.map((data, index) => (
                                        <div key={index}>
                                        {/* Render table from filteredRecords */}
                                        <h2 className="text-2xl font-semibold leading-tight">{data.records[0].disciplineName}</h2>
                                            <div>
                                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                                    <table className="min-w-full leading-normal">
                                                        <thead>
                                                        <tr>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Event / Descipline </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Result </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Athlete </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> DOB </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Venue </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Event </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Date </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">{data.records[0].disciplineName}</p>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">{data.records[0].result}</p>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">{data.records[0].athleteName}</p>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">{moment(data.records[0].athleteBirthDate).format('YYYY')}</p>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">{data.records[0].venue}</p>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">{data.records[0].eventName}</p>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">{moment(data.records[0].date).format('DD MMM YYYY')}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    </div>
                                                    {/* Pagination buttons */}
                                                    {totalPages > 1 && (
                                                        <div className="pagination flex gap-4">
                                                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                                                            
                                                            {Array.from({ length: totalPages }, (_, i) => (
                                                            <button 
                                                                key={i} 
                                                                className={currentPage === i + 1 ? 'border-primary border-b-[2px]' : ''} // tambahkan kelas `bg-gray-500` jika tombol ini mewakili halaman aktif
                                                                disabled={currentPage === i + 1} 
                                                                onClick={() => setCurrentPage(i + 1)}
                                                            >
                                                                {i + 1}
                                                            </button>
                                                            ))}
                                                        
                                                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    ) : (
                                    <p>Not available</p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default NationalRecords