import React, { useEffect, useState } from "react";
import months from "./month-select-options";
import session from "./workout-data";
import { motion } from 'framer-motion/dist/framer-motion';
import "./get-all-workouts.css";

const GetAllWorkoutData = () =>{
    //State to store selected month
    const [selectedMonth, setSelectedMonth] = useState();
    //State to store foundMonth to be populated on page
    const [loggedMonth, setLoggedMonth] = useState([]);
    //Store the selected month data in new array
    let foundMonth = [];
    //Holds the month workout data
    let loggedSession = [];
    //helper function to select month
    const handleSelect = (event) =>{
        console.log("here");
        const choice = event.target.value;
        setSelectedMonth(choice);
    };

    useEffect(()=>{

    //generates the new movement objects for the new month and day keys
    const generateMovementObjects = (session)=> {
        return {
            movement:session.movement,
            rounds: session.rounds,
            reps:session.reps,
            weight:session.weight
        }
    };

    //Check to see if month exists
    const doesMonthExist = (session) => {
        return loggedSession.find((lsession)=> lsession.month === session.month)
    };
    //Check to see if day already existed in month...isMonthFound comes from the session.map() on bottom
    const doesDayExist = (isMonthFound, session) => {
        return isMonthFound.days.find((monthDays)=> monthDays.day === session.day)
    };
    //Helper method to generate activities based on day
    const generateDaySession = (session) => {
        return {
            day: session.day,
            activities:[generateMovementObjects(session)]
        }
    }
    //map through the incoming data
    session.map((sessions)=>{
        let isMonthFound = doesMonthExist(sessions);
        if(isMonthFound){
            let isDayFound = doesDayExist(isMonthFound, sessions);
            if(isDayFound){
                isDayFound.activities.push(generateMovementObjects(sessions))
            } else {
                isMonthFound.days.push(generateDaySession(sessions))
            }
        } else {
            loggedSession.push({
                month:sessions.month,
                days:[generateDaySession(sessions)]
            })
        }
    })

        const getMonths = () => {
            loggedSession.map((sessions)=>{
                if(selectedMonth === sessions.month){
                    foundMonth.push(sessions);
                                } 
                            })
                        };
            getMonths();
            setLoggedMonth(foundMonth);
            console.log(foundMonth);
    },[selectedMonth])

    return(
        <React.Fragment>
        <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
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
        </motion.div>
        <motion.div 
            className="page_container"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            {loggedMonth.map(session => {
                const month = session.month;
                const day = session.days;
                return (
                    <div className="month_container">
                        <h2 className="month_header_center">{month}</h2>
                        {day.map(fDay => {
                            const foundDay = fDay.day;
                            const foundActivities = fDay.activities;
                            return (
                                <div className="all_workouts_session_container">
                                    <h2>{foundDay}</h2>
                                    {foundActivities.map(workouts =>{
                                        return(
                                            <div className="movement_data">
                                                <p>Movement: {workouts.movement}</p>
                                                <p>Rounds: {workouts.rounds}</p>
                                                <p>Reps: {workouts.reps}</p>
                                                <p>Weight: {workouts.weight}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                
                            )
                        })}
                    </div>
                )
            })}
        </motion.div>
        </React.Fragment>
    )
    };

export default GetAllWorkoutData;