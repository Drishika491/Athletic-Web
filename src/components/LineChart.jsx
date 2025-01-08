import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { config } from "../service/api";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    // Legend,
    Tooltip
} from 'chart.js';
import axios from "axios";
import SearchForm from "./TestSearch";
import FlexList from "./Artikel";
import Navbar from "./Artikel";
import ContactUsForm from "./ContactForm";
import EventStartList from "./EventStartList";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    // Legend,
    Tooltip
)

const LineChart = () => {
    const [chartData, setChartData] = useState({});

    // useEffect(() => {
    //     axios
    //     .get(BASE_URL+`Api/AthleteAchievement/GetList`, {
    //         headers: config(),
    //     })
    //     .then((response) => {
    //         setChartData(response.data.data);
    //         console.log(response.data.data)
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // }, []);

    const data = {
        labels: ['11 Feb', '03 Mar', '03 Mar', '11 Mar'],
        datasets: [{
            label: '',
            data: [10.57, 10.31, 10.53, 10.37],
            backgroundColor: '#c62028',
            borderColor: '#c62028',
            pointBorderColor: '#c62028',
            fill: true,
            tension: 0.4
        }]
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                // min: 3,
                // max: 6
            }
        }
    }

    return (
        <div className="w-full mx-auto">
            {/* <Navbar /> */}
            {/* <ContactUsForm /> */}
            {/* <SearchForm /> */}
            <EventStartList />
            <h1 className="pt-20">Chart JS</h1>
            <div style={{
                width: '600px',
                height: '300px',
                padding: '20px'
            }}>
                <Line 
                    data={data} 
                    options={options}
                ></Line>
            </div>
        </div>
    );
};

export default LineChart;
