import React from "react";
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
import { Bar } from 'react-chartjs-2';

import "./Macro-LineBar.css";

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

const MacroLineBarGraph = (props) => {
    const date = new Date();
    const monthName = date.toLocaleString("en-US", { month:"long" });
    const macrosForGraph = [props.items2];
    const macroGraphInfo = {
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
                    data: macrosForGraph.map(macros=> macros.fats),
                    backgroundColor:"#f8df00",
                    borderColor: "#f8df00",
                    lineTension: .3,
                    radius: 5
                },
            ],
    }
        const chartOptions ={
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
        }

        return(
            <div className="linechart">
                <Bar
                data={macroGraphInfo}
                options={chartOptions} />
            </div>
        )
};

export default MacroLineBarGraph;