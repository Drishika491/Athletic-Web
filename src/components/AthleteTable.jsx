import React, { useState, useEffect } from 'react';
import { config, getListAthlete } from '../service/api';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL, BASE_URL_ } from '../service/config';

function AthleteTable() {
  const [listAthlete, setListAthlete] = useState([]);
  const [ToggleState, setToggleState] = useState(1);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [athleteData, setAthleteData] = useState([]);
  const [eventFilter, setEventFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [ageGroupFilter, setAgeGroupFilter] = useState('');
  const [topAthleteFilter, setTopAthleteFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [displayedData, setDisplayedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : '';

  const getAthletes = async (searchText) => {
    try {
      setLoading(true);
      const response = await axios.get(
        BASE_URL + `Api/AthleteProfile/GetList?Name=${searchText}`,
        {
          headers: await config(),
        }
      );
      const athletes = response.data.data;
      setOptions(athletes);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleOptionChange = (event, value) => {
    setSelectedOption(value);
  };

  const handleSearch = () => {
    if (selectedOption) {
      const pvid = selectedOption.pvid;
      navigate(`/athlete-profile/${pvid}`);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        BASE_URL + "Api/AthleteProfile/GetListWithAchievement", {
        params: {
          Page: currentPage,
          PageRow: itemsPerPage,
          AchievementYear: yearFilter,
          AchievementDisciplinePvid: eventFilter,
          AchievementAgeGroupPvid: ageGroupFilter
        },
        headers: await config(),
        // params: {
        //   isPublish: true,
        // },
      }
      );

      setAthleteData(response.data.data.data);
      console.log('cek athlete list', response.data.data.data)
      setLoading(false);
      setTotalPages(Math.ceil(response.data.data.totalData / itemsPerPage));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const [listDisciplines, setListDisciplines] = useState([]);

  const fetchListDisciplines = async () => {
    const result = await axios.get(BASE_URL + 'Api/Discipline/GetList', {
      headers: await config()
    });
    setListDisciplines(result.data.data);
  }

  useEffect(() => {
    fetchListDisciplines();
  }, []);

  useEffect(() => {
    setFilteredData(athleteData);
  }, [athleteData, itemsPerPage], eventFilter, yearFilter, ageGroupFilter);

  const handleFilter = async () => {
    setLoading(true);
    const params = {
      Page: 1, // Reset to the first page when filtering
      PageRow: itemsPerPage,
    };

    if (yearFilter) {
      params.AchievementYear = yearFilter;
    }
    if (eventFilter) {
      params.AchievementDisciplinePvid = eventFilter;
    }
    if (ageGroupFilter) {
      params.AchievementAgeGroupPvid = ageGroupFilter;
    }

    axios
      .get(
        BASE_URL + 'Api/AthleteProfile/GetListWithAchievement',
        {
          params,
          headers: await config(),
        }
      )
      .then((response) => {
        setAthleteData(response.data.data.data);
        setTotalPages(
          Math.ceil(response.data.data.totalData / itemsPerPage)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleClearFilter = async () => {
    setLoading(true);
    setEventFilter('');
    setYearFilter('');
    setAgeGroupFilter('');
    setCurrentPage(1);

    try {
      const response = await axios.get(
        BASE_URL + 'Api/AthleteProfile/GetListWithAchievement',
        {
          params: {
            Page: 1, // Reset to the first page when filtering
            PageRow: itemsPerPage,
          },
          headers: await config(),
        }
      );

      setAthleteData(response.data.data.data);
      setTotalPages(Math.ceil(response.data.data.totalData / itemsPerPage));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    // setDisplayedData(events.slice(firstIndex, lastIndex));
  }, [athleteData, currentPage]);

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

  // Calculate the start and end page numbers for the pagination display
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);

  const [showAgeGroupFilter, setShowAgeGroupFilter] = useState(true);

  const [years, setYears] = useState([]);

  // Function to generate a list of years from 2010 to the current year
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2010;
    const yearOptions = [];

    for (let year = currentYear; year >= startYear; year--) {
      yearOptions.push(year.toString());
    }

    return yearOptions;
  };

  useEffect(() => {
    // Generate the list of years when the component mounts
    const yearOptions = generateYearOptions();
    setYears(yearOptions);
  }, []);

  return (
    <div>
      <section
        id="profile"
        className="container my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]"
      >
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <div className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3">
            <div>
              <a
                className={`tabs ${getActiveClass(1, 'active-tabs')}`}
                onClick={() => toggleTab(1)}
              >
                <div className="search-modes-list">
                  <Icon
                    className="h-[30px] w-auto mr-[10px]"
                    icon="healthicons:ui-user-profile"
                  />
                  <p>
                    Athletes<span>profiles</span>
                  </p>
                </div>
              </a>
            </div>
            <div>
              <a
                className={`tabs ${getActiveClass(2, 'active-tabs')}`}
                onClick={() => toggleTab(2)}
              >
                <div className="search-modes-list">
                  <Icon
                    className="h-[30px] w-auto mr-[10px]"
                    icon="fa-solid:sort-amount-down"
                  />
                  <p>
                    Annual<span>performances</span>
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3">
            <div className={`hidden ${getActiveClass(1, 'active-content')}`}>
              <div className="mt-2">
                <Autocomplete
                  id="search-athlete"
                  options={options}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={handleOptionChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Athlete Name"
                      variant="outlined"
                      onChange={(event) => getAthletes(event.target.value)}
                    />
                  )}
                />
              </div>
              <div
                onClick={handleSearch}
                className="cursor-pointer mt-4 flex items-center space-x-3 p-2 justify-center text-[20px] text-white bg-primary rounded-3xl px-3"
              >
                <div>Show Athlete</div>
              </div>
            </div>

            <div className={`hidden ${getActiveClass(2, 'active-content')}`}>
              <div className="mt-2">
                <select
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value)}
                  className="bg-white leading-10 text-[20px] border border-gray-300 text-gray-900 rounded-3xl focus:ring-gray-400 focus:border-gray-400 focus:bg-gray-200 block w-full p-3"
                >
                  <option className="text-[14px] bg-white" defaultValue>
                    Select Event/Discipline
                  </option>
                  {listDisciplines.map((discipline) => (
                    <option key={discipline.pvid} value={discipline.pvid}>
                      {discipline.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex">
                <div className="w-1/2">
                  <div className="py-4 px-1">
                    <label className="radio-inline static-one">Men</label>
                    <label className="radio-inline">
                      <input
                        type="radio"
                        id="senior-men"
                        name="age-group"
                        value="1"
                        onChange={(e) => setAgeGroupFilter(e.target.value)}
                        checked={ageGroupFilter === "1"} disabled={!showAgeGroupFilter}
                      />{' '}
                      Open
                    </label>
                    <label className="radio-inline">
                      <input
                        type="radio"
                        id="u20/junior-men"
                        name="age-group"
                        value="2"
                        onChange={(e) => setAgeGroupFilter(e.target.value)}
                        checked={ageGroupFilter === "2"} disabled={!showAgeGroupFilter}
                      />{' '}
                      U20/Junior
                    </label>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="py-4 px-1">
                    <label className="radio-inline static-one">Women</label>
                    <label className="radio-inline">
                      <input
                        type="radio"
                        id="senior-women"
                        name="age-group"
                        value="3"
                        onChange={(e) => setAgeGroupFilter(e.target.value)}
                        checked={ageGroupFilter === "3"} disabled={!showAgeGroupFilter}
                      />{' '}
                      Open
                    </label>
                    <label className="radio-inline">
                      <input
                        type="radio"
                        id="u20/junior-women"
                        name="age-group"
                        value="4"
                        onChange={(e) => setAgeGroupFilter(e.target.value)}
                        checked={ageGroupFilter === "4"} disabled={!showAgeGroupFilter}
                      />{' '}
                      U20/Junior
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3">
            <div className={`hidden ${getActiveClass(1, 'active-content')}`}>
              <div>
                {/* <p className='text-[1rem] font-light text-gray-500 mb-[20px]'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p> */}
              </div>
            </div>

            <div className={`hidden ${getActiveClass(2, 'active-content')}`}>
              <div className="mt-2">
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="bg-white leading-10 text-[20px] border border-gray-300 text-gray-900 rounded-3xl focus:ring-gray-400 focus:border-gray-400 focus:bg-gray-200 block w-full p-3"
                >
                  <option className="text-[14px] bg-white" defaultValue>
                    All Years
                  </option>
                  {years.map((year) => (
                    <option key={year} className="text-[14px] bg-white" value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <button
                    onClick={handleFilter}
                    className="cursor-pointer mt-4 flex items-center space-x-3 p-2 justify-center text-[20px] text-white bg-primary rounded-3xl px-3"
                  >
                    Show List
                  </button>
                  <button
                    onClick={handleClearFilter}
                    className="cursor-pointer mt-4 flex items-center space-x-3 p-2 justify-center text-[20px] text-white bg-primary rounded-3xl px-3"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-100">
        <section
          id="annual"
          className="container my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]"
        >
          <div>
            <div className="container mx-auto lg:px-0">
              <div className="py-8">
                <div>
                  <h2 className="text-2xl font-semibold leading-tight">
                    Recent Performances
                  </h2>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">
                            {' '}
                            Athlete{' '}
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">
                            {' '}
                            Event/Discipline{' '}
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">
                            {' '}
                            Result{' '}
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">
                            {' '}
                            Competition{' '}
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">
                            {' '}
                            Age Group{' '}
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">
                            {' '}
                            Venue{' '}
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider">
                            {' '}
                            Date{' '}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData && filteredData.length > 0 ? (
                          filteredData.map((data, index) => (
                            <tr
                              key={index}
                              className={index % 2 === 0 ? 'bg-gray-100' : ''}
                            >
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex">
                                  <div className="">
                                    <Link
                                      to={`/athlete-profile/${data.profile.pvid}`}
                                      className="flex items-center no-underline text-black"
                                    >
                                      <p className="text-secondary font-bold whitespace-no-wrap">
                                        {data.profile.name}
                                      </p>
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {data.achievement.discipline.name}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {data.achievement.result}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {data.achievement.competition}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {data.achievement.ageGroup.name}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {data.achievement.event.venue}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {moment(data.achievement.date).format(
                                    'DD MMM YYYY'
                                  )}
                                </p>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <>
                            {loading ? (
                              <tr>
                                <td
                                  colSpan="7"
                                  className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                >
                                  Loading...
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <td
                                  colSpan="7"
                                  className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                >
                                  Not Available
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination buttons */}
                  {totalPages > 1 && (
                    <div className="pagination flex gap-4">
                      <button
                        disabled={currentPage === 1 || loading}
                        onClick={handlePreviousPage}
                        className="bg-primary text-white px-4 py-2 rounded-md"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => {
                        const pageNumber = i + 1;
                        if (
                          (pageNumber >= startPage && pageNumber <= endPage) ||
                          (pageNumber === 1 && startPage > 1) ||
                          (pageNumber === totalPages && endPage < totalPages)
                        ) {
                          return (
                            <button
                              key={i}
                              className={
                                currentPage === pageNumber
                                  ? 'border-primary border-b-[2px]'
                                  : ''
                              } // add class 'bg-gray-500' if this button represents the active page
                              disabled={currentPage === pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          (pageNumber === 2 && startPage > 3) ||
                          (pageNumber === totalPages - 1 && endPage < totalPages - 2)
                        ) {
                          // Render '...' button for gaps
                          return <span key={i} className='mt-2'>...</span>;
                        }
                        return null;
                      })}

                      <button
                        disabled={currentPage === totalPages || loading}
                        onClick={handleNextPage}
                        className="bg-primary text-white px-4 py-2 rounded-md"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AthleteTable;
