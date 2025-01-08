import React, { useEffect, useState } from 'react'
import { config, getAchievement } from '../service/api';
import "../index.css";
import { Icon } from '@iconify/react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import ImageNotFound from '../assets/not-found.png'
// import LineChart from '../components/LineChart';
import { Line } from "react-chartjs-2";
import { BASE_URL, BASE_URL_ } from '../service/config';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    // Legend,
    Tooltip
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    // Legend,
    Tooltip
)

function AthleteProfile() {
    const { pvid } = useParams();
    const [detailAthlete, setDetailAthlete] = useState([]);
    const [achievement, setAchievement] = useState([]);

    useEffect(() => {
        const fetchAchievement = async () => {
          try {
            const headers = await config();
            const response = await axios.get(BASE_URL+`Api/AthleteAchievement/GetList?AthleteProfilePvid=${pvid}`, {
              headers: headers,
              // params: { DisciplinePvid:4 },
            });
            setAchievement(response.data.data);
            console.log('Test Params', response.data.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchAchievement();
      }, [pvid]);
    

    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [filteredAchievements, setFilteredAchievements] = useState([]);
    const [isChartVisible, setIsChartVisible] = useState(false);

    const handleEventChange = (event) => {
        const selectedEvent = event.target.value;
        setSelectedEvent(selectedEvent === "Select Event" ? "" : selectedEvent);
        console.log('cek select', selectedEvent);
    };
      

    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear === "All Years" ? "" : selectedYear);
    };
      

    const uniqueEvents = new Set();
    const uniqueYears = new Set();
    achievement.forEach(item => {
        uniqueEvents.add(item.discipline.name);
        uniqueYears.add(moment(item.date).format('YYYY'));
    });

    const handleFilterClick = () => {
        const filtered = achievement.filter((item) => {
        if (selectedEvent && selectedYear) {
            return (
            item.discipline.name === selectedEvent &&
            moment(item.date).format('YYYY') === selectedYear
            );
        } else if (selectedEvent) {
            return item.discipline.name === selectedEvent;
        } else if (selectedYear) {
            return moment(item.date).format('YYYY') === selectedYear;
        }
        return true;
        });

        setFilteredAchievements(filtered);
        setIsChartVisible(selectedEvent !== "Select Event" && filtered.length > 0);
    };

    useEffect(() => {
        setFilteredAchievements(achievement);
    }, [achievement]);

    useEffect(() => {
    const fetchAthlete = async () => {
        try {
        const headers = await config();
        const response = await axios.get(BASE_URL+`Api/AthleteProfile/GetById?Pvid=${pvid}`, {
            headers: headers,
        });
        setDetailAthlete(response.data.data);
        } catch (error) {
        console.error(error);
        }
    };

    fetchAthlete();
    }, [pvid]);


    const mergedAchievement = {}

    filteredAchievements.forEach(achievement => {
    const eventName = achievement.discipline.name
    if (!mergedAchievement[eventName]) {
        mergedAchievement[eventName] = []
    }
    mergedAchievement[eventName].push(achievement)
    })

    function handleClickSectionMedals() {
        const section = document.getElementById("championship-medals");
        section.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            window.scrollBy(0, -135); // menggeser posisi scroll sebanyak 20 piksel ke atas
        }, 600); // menunda penggeseran posisi scroll ke atas selama 1000 milidetik (1 detik)
    }

    function handleClickSectionBestPerformance() {
        const section = document.getElementById("best-performance");
        section.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            window.scrollBy(0, -125); // menggeser posisi scroll sebanyak 20 piksel ke atas
        }, 600); // menunda penggeseran posisi scroll ke atas selama 1000 milidetik (1 detik)
    }

    function handleClickSectionAnnual() {
        const section = document.getElementById("annual-progression");
        section.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            window.scrollBy(0, -115); // menggeser posisi scroll sebanyak 20 piksel ke atas
        }, 600); // menunda penggeseran posisi scroll ke atas selama 1000 milidetik (1 detik)
    }

    function handleClickSectionProfile() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const data_chart_1 = {
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: '#c62028',
            borderColor: '#c62028',
            pointBorderColor: '#c62028',
            fill: true,
            tension: 0.4
        }]
    }

    // Mengisi data_chart_1 dengan data dinamis dari achievements
    filteredAchievements.forEach(achievement => {
    const label_chart1 = moment(achievement.date).format('DD MMM');
    const result_chart1 = achievement.result;
  
    // Menambahkan label dan dataset baru ke data_chart_1
    data_chart_1.labels.push(label_chart1);
    data_chart_1.datasets[0].data.push(result_chart1);
    });

    const data_chart_2 = {
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: '#8D8963',
            borderColor: '#8D8963',
            pointBorderColor: '#8D8963',
            fill: 'start',
            tension: 0.4
        }]
    }

    // Mengisi data_chart_2 dengan data dinamis dari achievements
    const yearlyData = {};

    filteredAchievements.forEach(achievement => {
    const year = moment(achievement.date).format('YYYY');
    const result = achievement.result;

    // Memperbarui data terendah untuk setiap tahun
    if (!(year in yearlyData) || result < yearlyData[year]) {
        yearlyData[year] = result;
    }
    });

    // Mengonversi data terendah menjadi array untuk ditampilkan di chart
    Object.entries(yearlyData).forEach(([year, result]) => {
    data_chart_2.labels.push(year);
    data_chart_2.datasets[0].data.push(result);
    });

    const options = {
        plugins: {
            legend: false
        },
        scales: {
            y: {
                reverse: true,
            },
            x: {
                // reverse: true,
            }
        }
    }


  return (
    <div>
        {/* <div className="h-[20px] bg-secondary"></div> */}
        <div>
            <div>
                {/* <img className='h-[452px]' src='http://www.anzrankings.org.nz/img/BGs/Ranking_Banner.jpg' alt='' /> */}
                {detailAthlete.coverPhotoUrl ? (
                    <img className="lg:h-[420px] md:h-[310px] h-[152px] w-full block object-contain object-top" src={BASE_URL_+`${detailAthlete.coverPhotoUrl}`} />
                    ) : (
                    <img className="lg:h-[420px] md:h-[310px] h-[152px] w-full block object-cover object-top" src={ImageNotFound} />
                )}
                {/* <img className='lg:h-[420px] md:h-[310px] h-[152px] w-full block object-contain object-top' src={BASE_URL_+detailAthlete.coverPhotoUrl} alt='' /> */}
            </div>

            <div className='max-w-[1240px] mx-auto'>
                <div className='p-5 xl:p-0 mt-5 mb-5 text-[1rem]'>
                    {/* {pvid} Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. */}
                </div>
            </div>

            <section id='profile' className='container my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
                <div className='flex flex-wrap -mx-1 lg:-mx-4 pb-8'>
                    <div className='my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3'>
                    {detailAthlete && (
                        <div>
                            <h2 className='h2-four text-[32px] font-light tracking-tighter mb-1'>
                            {detailAthlete.name}
                            </h2>
                            <div className='record'>
                                <div>
                                    <p className='mb-3 mt-2 leading-7'>
                                    <strong>DATE OF BIRTH: </strong>
                                        {detailAthlete.birthDate ? moment(detailAthlete.birthDate).format('DD MMM YYYY') !== '01 Jan 1900' ? moment(detailAthlete.birthDate).format('DD MMM YYYY') : '' : ''}
                                        <br/>
                                        <strong>AGE: </strong>
                                        {detailAthlete.birthDate ? moment(detailAthlete.birthDate).format('YYYY') !== '1900' ? moment(detailAthlete.birthDate).fromNow(true) : '' : ''}
                                    </p>
                                    <hr className="dotted"></hr>

                                    <p className='mb-3 leading-7'>
                                        <strong>CLUB: </strong>{detailAthlete.club}<br/>
                                        <strong>COUNTRY: </strong>{detailAthlete.birthPlace}
                                    </p>
                                    <hr className="dotted"></hr>

                                    <p className='mb-3 leading-7'>
                                        <strong>COACH: </strong>{detailAthlete.coach}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>

                    <div className='my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3'>
                        <div className='mt-2'>
                            <select name="event" id="event" onChange={handleEventChange} className="bg-white leading-10 text-[20px] border border-gray-300 text-gray-900 rounded-3xl focus:ring-gray-400 focus:border-gray-400 focus:bg-gray-200 block w-full p-3">
                                <option className='text-[14px] bg-white' defaultValue>Select Event</option>
                                {[...uniqueEvents].map(event => (
                                    <option className='text-[14px] bg-white' value={event}>{event}</option>
                                ))}
                            </select>
                        </div>

                        <div className='mt-4'>
                            <select name="year" id="year" onChange={handleYearChange} className="bg-white leading-10 text-[20px] border border-gray-300 text-gray-900 rounded-3xl focus:ring-gray-400 focus:border-gray-400 focus:bg-gray-200 block w-full p-3">
                                <option className='text-[14px] bg-white' defaultValue>All Years</option>
                                {[...uniqueYears].map(year => (
                                    <option className='text-[14px] bg-white' value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        <div className="cursor-pointer mt-4 flex items-center space-x-3 p-2 justify-center text-[20px] text-white bg-primary rounded-3xl px-3">
                            <button onClick={handleFilterClick}>Show Performances</button>
                        </div>
                    </div>

                    <div className='my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3'>
                        <div>
                            <h3 className='text-[26px] mb-[10px] font-light'>
                                <strong>Athlete Career History</strong>
                            </h3>
                            <p className='text-[1rem] font-light text-gray-500 mb-[20px]'>
                                Click links below to view this athletes Championship medal history, national representational honours, personal best performances and full yearly progressions.
                            </p>
                            <div className='flex flex-wrap w-full -mx-1 lg:-mx-4 text-primary'>
                                <div className='my-1 px-2 md:px-1 sm:w-1/4 md:w-1/4 lg:my-4 lg:px-4 lg:w-1/4'>
                                    <button onClick={handleClickSectionMedals}>
                                        <div className='search-modes w-16 md:w-14 lg:w-20 overflow-visible flex flex-col items-center group'>
                                            <Icon 
                                                className="h-[30px] w-auto"
                                                icon="bi:trophy-fill"
                                            />
                                            <div className="absolute top-10 flex flex-col items-center hidden mt-12 group-hover:flex">
                                                <span className="absolute z-10 w-60 ml-[175px] md:ml-[180px] lg:ml-[160px] p-[15px] rounded-md border-solid border-l-4 border-rose-500 text-[1rem] font-light leading-none text-gray-500 whitespace-no-wrap bg-white shadow-lg sm-tool-tips">Championship Medal History</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className='my-1 px-2 md:px-1 sm:w-1/4 md:w-1/4 lg:my-4 lg:px-4 lg:w-1/4'>
                                    <button>
                                        <div className='search-modes w-16 md:w-14 lg:w-20 overflow-visible flex flex-col items-center group'>
                                            <Icon 
                                                className="h-[40px] w-auto"
                                                icon="mdi:flag-variant"
                                            />
                                            <div className="absolute top-10 flex flex-col items-center hidden mt-12 group-hover:flex">
                                                <span className="absolute z-10 w-72 lg:w-72 md:w-64 ml-[70px] md:ml-[80px] lg:ml-[12px] p-[15px] rounded-md border-solid border-l-4 border-rose-500 md:text-[0.8rem] lg:text-[1rem] text-[1rem] font-light leading-none text-gray-500 whitespace-no-wrap bg-white shadow-lg sm-tool-tips">National Representational Honours</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className='my-1 px-2 md:px-1 sm:w-1/4 md:w-1/4 lg:my-4 lg:px-4 lg:w-1/4'>
                                    <button onClick={handleClickSectionBestPerformance}>
                                        <div className='search-modes w-16 md:w-14 lg:w-20 overflow-visible flex flex-col items-center group'>
                                            <Icon 
                                                className="h-[40px] w-auto"
                                                icon="material-symbols:star"
                                            />
                                            <div className="absolute top-10 flex flex-col items-center hidden mt-12 group-hover:flex">
                                                <span className="absolute z-10 w-60 ml-[-140px] md:ml-[-60px] lg:ml-[-232px] p-[15px] rounded-md border-solid border-l-4 border-rose-500 text-[1rem] font-light leading-none text-gray-500 whitespace-no-wrap bg-white shadow-lg sm-tool-tips">Personal Best Performances</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className='my-1 px-2 md:px-1 sm:w-1/4 md:w-1/4 lg:my-4 lg:px-4 lg:w-1/4'>
                                    <button onClick={handleClickSectionAnnual}>
                                        <div className='search-modes w-16 md:w-14 lg:w-20 overflow-visible flex flex-col items-center group'>
                                            <Icon 
                                                className="h-[30px] w-auto"
                                                icon="fontisto:line-chart"
                                            />
                                            <div className="absolute top-10 flex flex-col items-center hidden mt-12 group-hover:flex">
                                                <span className="absolute z-10 w-50 ml-[-360px] md:ml-[-230px] lg:ml-[-487px] p-[15px] rounded-md border-solid border-l-4 border-rose-500 text-[1rem] font-light leading-none text-gray-500 whitespace-no-wrap bg-white shadow-lg sm-tool-tips">Annual Progressions</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='bg-gray-100'>
                <section id='chart' className='container my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
                    {/* Chart */}
                    <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                        {isChartVisible && selectedEvent !== 'Select Event' && filteredAchievements.length > 0 ? (
                            <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2'>
                                <div>
                                    {filteredAchievements.length === achievement.length ? (
                                        <h2>All Event</h2>
                                    ) : (
                                        filteredAchievements.map((achievement, index) => (
                                            index === 0 ? (
                                                <h2 key={index}>{achievement.discipline.name} ({moment(achievement.date).format('YYYY')})</h2>
                                            ) : null
                                        ))
                                    )}
                                    <div className='lg:w-[600px] lg:h-[300px] lg:p-[20px]'>
                                        <Line data={data_chart_1} options={options}></Line>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <div className='my-1 px-1 pt-[20px] lg:pt-0 md:pt-0 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2'>
                            <div>
                            {isChartVisible && selectedEvent !== 'Select Event' && filteredAchievements.length > 0 ? (
                                <div>
                                    {filteredAchievements.length === achievement.length ? (
                                        <h2>All Event (Career)</h2>
                                    ) : (
                                        filteredAchievements.map((achievement, index) => (
                                            index === 0 ? (
                                                <h2 key={index}>{achievement.discipline.name} (Career)</h2>
                                            ) : null
                                        ))
                                    )}
                                    <div className='lg:w-[600px] lg:h-[300px] lg:p-[20px]'>
                                    <Line data={data_chart_2} options={options}></Line>
                                    </div>
                                </div>
                            ): null}
                            </div>
                        </div>
                    </div>
                    {/* End Chart */}
                </section>

                {filteredAchievements.filter(achievement => achievement.medal.name !== "No Medal").length !== 0 && <p></p>}
                {filteredAchievements.filter(achievement => achievement.medal.name !== "No Medal").length !== 0 && (
                <section id='championship-medals' className='container my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
                    <div>
                        <div className="container mx-auto lg:px-0 sm:px-8">
                            <div className="py-8">
                                <div>
                                <h2 className="text-2xl font-semibold leading-tight">Championships Medals</h2>
                                </div>
                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                    <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Year </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Event </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Age Group </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Result </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Position </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAchievements
                                        .filter(achievement => achievement.medal.name !== "No Medal")
                                        .map((achievement) => (
                                        <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex">
                                            {/* <div className="flex-shrink-0 w-10 h-10">
                                                <img className="w-full h-full rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt="" />
                                            </div> */}
                                            <div className="">
                                                <p className="text-gray-900 whitespace-no-wrap"> {moment(achievement.date).format('YYYY')} </p>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{achievement.event.name}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{achievement.ageGroup.name}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{achievement.result}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{achievement.medal.name}</p>
                                        </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                )}

                {filteredAchievements.length === 0 && <p></p>}
                {filteredAchievements.length !== 0 && (
                <section id='best-performance' className='container pt-[10px] lg:pt-[10px] md:pt-[10px] my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
                    <div>
                        <div className="container mx-auto lg:px-0 sm:px-8">
                            <div className="py-8">
                                <div>
                                <h2 className="text-2xl font-semibold leading-tight">Best Performances</h2>
                                </div>
                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                    <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Competition </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Event/Descipline </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Result </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Place </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Score </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Date </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAchievements.map((achievement) => (
                                        <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex">
                                            {/* <div className="flex-shrink-0 w-10 h-10">
                                                <img className="w-full h-full rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt="" />
                                            </div> */}
                                            <div className="">
                                                <p className="text-gray-900 whitespace-no-wrap"> {achievement.competition} </p>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{achievement.discipline.name}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{achievement.result}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{achievement.place}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{achievement.score}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{moment(achievement.date).format('DD MMM YYYY')}</p>
                                        </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                )}

                {filteredAchievements.length === 0 && <p></p>}
                {filteredAchievements.length !== 0 && (
                <section id='annual-progression' className='container pt-[10px] lg:pt-[10px] md:pt-[10px] my-4 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
                    <div>
                        <div className="container mx-auto lg:px-0 sm:px-8">
                            <div className="py-8">
                                <div>
                                    <h2 className="text-2xl font-semibold leading-tight">Annual Progression</h2>
                                </div>
                                {Object.entries(mergedAchievement).map(([eventName, data]) => (
                                <div key={eventName} className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                    <p className="text-1xl font-semibold leading-tight">{eventName}</p>
                                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                        <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Year </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Result </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Wind </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Place </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Competition </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Venue </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"> Date </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map(achievement => (
                                            <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex">
                                                    <div className="">
                                                        <p className="text-gray-900 whitespace-no-wrap">{moment(achievement.date).format('YYYY')}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{achievement.result}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{achievement.wind}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{achievement.place}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{achievement.competition}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{achievement.event.venue}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{moment(achievement.date).format('DD MMM YYYY')}</p>
                                            </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                )}

                <div className='max-w-[1240px] mx-auto pb-6'>
                    <div className='flex justify-center'>
                        <button onClick={handleClickSectionProfile}>
                            <div className="cursor-pointer w-40 mt-0 flex items-center space-x-0 p-1 justify-center text-[14px] text-white bg-primary rounded-3xl px-3">
                                <div>Back to top</div>
                                <Icon
                                className="h-[2rem] w-auto text-white"
                                icon="material-symbols:keyboard-arrow-up"
                                />
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

// Kode Warna Gold : #ffc300
// Kode Warna Silver: #ccc
// Kode Warna Bronze: #fba069

export default AthleteProfile