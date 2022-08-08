import React , { useState, useEffect } from "react";
import macroData from "./macro-items";
import DropDownSelect from "../../shared/UIElements/drop-down-select";
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
    const [isSelectedMonthLoaded, setIsSelectedMonthLoaded] = useState(false);
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
                    setIsSelectedMonthLoaded(true);
                    foundMonth.push(macros);
                                } if (foundMonth.length === 0){
                                    console.log(foundMonth.length);
                                    setIsSelectedMonthLoaded(false);
                                    console.log(isSelectedMonthLoaded);
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

    if(!selectedMonth && !isSelectedMonthLoaded){
        return (
            <React.Fragment>
                <DropDownSelect
                name={selectedMonth}
                onChange={handleSelect}
                isLoaded={setIsSelectedMonthLoaded} />
                <div className="center">
                    <h2>Please select a month to view macro for that month</h2>
                </div>
            </React.Fragment>
        )
    }

    if (!isSelectedMonthLoaded && selectedMonth){
        return (
            <React.Fragment>
                <DropDownSelect
                name={selectedMonth}
                onChange={handleSelect}
                isLoaded={setIsSelectedMonthLoaded} />
                <div className="center">
                    <h2>No data yet for the selected month</h2>
                </div>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
        <DropDownSelect
        name={selectedMonth}
        onChange={handleSelect}
        isLoaded={setIsSelectedMonthLoaded} />
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
