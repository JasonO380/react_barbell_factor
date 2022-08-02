import React , { useState, useEffect } from "react";
import macroData from "./macro-items";
import DatePicker from "react-datepicker";
import months from "./month-select-options";
import LineChart from "../../shared/components/LineChart";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion/dist/framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// import "react-datepicker/dist/react-datepicker.css";
import "./get-macros.css";

ChartJS.defaults.color = "black";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GetMacros = () => {
    const date = new Date();
    const monthName = date.toLocaleString("en-US", { month:"long" });
    const [selectedMonth, setSelectedMonth] = useState();
    const [macroInfo, setMacroInfo] = useState ({
        datasets:[],
    });
    const [chartOptions, setChartOptions] = useState({});
    const month = macroData.filter((macro) => macro.month);

    const handleSelect = (event) =>{
        console.log("here");
        const choice = event.target.value;
        setSelectedMonth(choice);
    };

    useEffect(()=> {
        console.log(month);
        const day = new Date();
        const currentMonth = day.toLocaleString("en-US", { month:"long" });
        const foundMonth = [];
        const newMonth = [];
        //helper function for selected month
        const getMonths = () => {
            macroData.map((macros)=>{
                if(selectedMonth === macros.month){
                    foundMonth.push(macros);
                                } 
                            })
                        };
            getMonths();
            console.log(foundMonth);
            console.log(newMonth);
        setMacroInfo({
            labels: foundMonth.map(macros=>macros.day),
            datasets:[
                {
                    label:"Grams of carbs",
                    data:foundMonth.map(macros=>macros.carbs),
                    borderColor: "#257ff5",
                    lineTension: .3,
                    radius: 5,
                    
                    
                },
                {
                    label:"Grams of protein",
                    data:foundMonth.map(macros=>macros.protein),
                    borderColor: "#F06B2D",
                    lineTension: .3,
                    radius: 5
                },
                {
                    label:"Grams of fat",
                    data:foundMonth.map(macros=>macros.fats) ,
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
                text: selectedMonth,
                font:{
                    size:50
                }
            },
            },
        });
        console.log(macroInfo);
        console.log(selectedMonth);
    },[selectedMonth])

    return(
        <React.Fragment>
            <div className="select_container">
            <label className="select_label">Select Month</label>
                <select
                className="select_field"
                name={selectedMonth}
                onChange={handleSelect}>
                    {months.map(month => {
                        
                        return(
                            <option className="select_option">{month.month}</option>
                        )
                    })}
                </select>
            </div>
            <div className="linechart">
                <Line
                data={macroInfo}
                options={chartOptions} 
                />
            </div>
        </React.Fragment>
    )
};

export default GetMacros;
