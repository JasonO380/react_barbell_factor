import React, { useState, useEffect } from "react";
import UpdateMacros from "./update-macros";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Link } from "react-router-dom";

import "./dashboard-output.css";

ChartJS.defaults.color = "black";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardOutput = (props) => {
    const date = new Date();
    const monthName = date.toLocaleString("en-US", { month:"long" });
    const [macroGraphInfo, setMacroGraphInfo] = useState ({
        datasets:[],
    });
    const [chartOptions, setChartOptions] = useState({});
    const macrosForGraph = props.items2.map(macros => macros);
    const macroProps = props.items2;

    useEffect(() => {
        setMacroGraphInfo({
            labels: macrosForGraph.map(macros=> macros.day),
            datasets:[
                {
                    label:"Grams of carbs",
                    data: macrosForGraph.map(macros=> macros.carbs),
                    backgroundColor:"#257ff5",
                    borderColor: "#257ff5",
                    lineTension: .3,
                    radius: 5,
                },
                {
                    label:"Grams of protein",
                    data: macrosForGraph.map(macros=> macros.protein),
                    borderColor: "#F06B2D",
                    backgroundColor:"#F06B2D",
                    lineTension: .3,
                    radius: 5
                },
                {
                    label:"Grams of fat",
                    data: macrosForGraph.map(macros=> macros.fats) ,
                    backgroundColor:"#f8df00",
                    borderColor: "#f8df00",
                    lineTension: .3,
                    radius: 5
                },
            ],
        });
        setChartOptions({
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                position: 'top',
            },
                title: {
                display: true,
                text: monthName,
                font:{
                    size:50
                }
            },
            },
        });
    },[macroProps])

        return(
                <div className="dashboard_card_container">
                    <div className="dashboard_card_info">
                                <div className="linechart">
                                    <Bar
                                    data={macroGraphInfo}
                                    options={chartOptions} />
                                </div>
                    <UpdateMacros
                    items={macroProps} />
                    </div>
                </div> 
        )
};

export default DashboardOutput;


