import React , { useState, useEffect, useContext } from "react";
// import macroData from "./macro-items";
import DropDownSelect from "../../shared/UIElements/drop-down-select";
import { motion } from 'framer-motion/dist/framer-motion';
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
import DoughnutChart from "../../shared/UIElements/DoughnutChart";
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
let month;
const GetMacros = () => {
    const auth = useContext(LoginRegisterContext);
    let userID;
    let foundMonth=[];
    let macroArray=[];
    let macroData;
    let allMacros=[];
    const date = new Date();
    const monthName = date.toLocaleString("en-US", { month:"long" });
    const [isSelectedMonthLoaded, setIsSelectedMonthLoaded] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState();
    const [macroInfo, setMacroInfo] = useState ({
        datasets:[],
    });
    const [chartOptions, setChartOptions] = useState({});
    const [macroMonth, setMacroMonth] = useState();

    const handleSelect = (event) =>{
        console.log("here");
        const choice = event.target.value;
        month = event.target.value
        setSelectedMonth(choice);
        console.log(selectedMonth);
        // fetchMacros()
    };

    // const DonutData = (data)=> {
    //     console.log(data)
        
    //     setMacroMonth(data)
    //     console.log(allMacros);
    // }

    // const fetchMacros = async () => {
    //     userID = auth.userID;
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/macros/macroslog/${userID}`);
    //         const responseData = await response.json();
    //         const macros = responseData.macros;
    //         macroData = macros.slice(-2);
    //         macroArray.push(macroData);
    //         console.log(macroData)
    //         setMacroMonth(macroData)
    //         getMonths()
    //     } catch (err){}
    // };

    //     const getMonths = () => {
    //         console.log('here in getMonths')
    //         macroData.map((macros)=>{
    //             console.log(macros)
    //             if(month === macros.month){
    //                 setIsSelectedMonthLoaded(true);
    //                 foundMonth.push(macros);
    //                 DonutData(foundMonth);
    //                 foundMonth = macros;
    //                 console.log(foundMonth);
    //                             } if (foundMonth.length === 0){
    //                                 console.log(foundMonth.length);
    //                                 setIsSelectedMonthLoaded(false);
    //                                 console.log(isSelectedMonthLoaded);
    //                             }
    //                         })
    //                 };

    useEffect(()=> {
        // let macroData=[];
        // let foundMonth = [];
        const fetchMacros = async () => {
            userID = auth.userID;
            try {
                const response = await fetch(`http://localhost:5000/api/macros/macroslog/${userID}`);
                const responseData = await response.json();
                const macros = responseData.macros;
                macroData = macros.slice(-2);
                macroArray.push(macroData);
                setMacroMonth(macroData)
                getMonths()
            } catch (err){}
        }
        fetchMacros();
        console.log(month);
        console.log(macroMonth)
        const day = new Date();
        const currentMonth = day.toLocaleString("en-US", { month:"long" });
        let newMonth = [];
        const getMonths = () => {
            console.log('here in getMonths')
            macroData.map((macros)=>{
                console.log(macros)
                if(month === macros.month){
                    setIsSelectedMonthLoaded(true);
                    foundMonth.push(macros);
                    console.log(foundMonth);
                                } if (foundMonth.length === 0){
                                    console.log(foundMonth.length);
                                    setIsSelectedMonthLoaded(false);
                                    console.log(isSelectedMonthLoaded);
                                }
                            })
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
                        };
            console.log(foundMonth);
            console.log(newMonth);
        console.log(macroInfo);
        console.log(selectedMonth);
    },[userID, selectedMonth])

    if(!selectedMonth && !isSelectedMonthLoaded){
        return (
            <React.Fragment>
                <DropDownSelect
                name={selectedMonth}
                onChange={handleSelect}
                isLoaded={setIsSelectedMonthLoaded} />
                <motion.div 
                className="center"
                initial={{width: 0}}
                animate={{width: "100%"}}
                exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                    <h2>Please select a month to view macro for that month</h2>
                </motion.div>
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
                <motion.div 
                className="center"
                initial={{width: 0}}
                animate={{width: "100%"}}
                exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                    <h2>No data yet for the selected month</h2>
                </motion.div>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
        <DropDownSelect
        name={selectedMonth}
        onChange={handleSelect}
        isLoaded={setIsSelectedMonthLoaded} />
            <motion.div 
            className="doughnut"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            {/* <DoughnutChart items2={foundMonth} /> */}
                <Line
                data={macroInfo}
                options={chartOptions} 
                />
            </motion.div>
        </React.Fragment>
    )
};

export default GetMacros;
