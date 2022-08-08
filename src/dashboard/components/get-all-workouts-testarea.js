import React, { useState, useEffect } from "react";
import months from "./month-select-options";
import session from "./workout-data";
import DropDownSelect from "../../shared/UIElements/drop-down-select";

import "./get-all-workouts.css";
import UpdateWorkouts from "./update-workouts";

//Area to test components

const TestWorkoutArea = () => {
    const [selectedMonth, setSelectedMonth] = useState();
    const [loggedMonth, setLoggedMonth] = useState([]);
    const [isUpdateMode, setIsUpdateMode] = useState (false);
    //Holds the month workout data
    let loggedSession = [];
    let foundMonth = [];
    let workoutToUpdateArray = [];
    let selectedWorkoutToUpdate;

    const updateHandler = (event) => {
        let selectedWorkoutToUpdate = event.target.name;
        console.log(selectedWorkoutToUpdate);
        if(isUpdateMode){
            setIsUpdateMode(false);
        } else {
            setIsUpdateMode(true);
            console.log(isUpdateMode);
        }
    };

    const handleSelect = (event) =>{
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
                console.log(sessions)
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
        <div className="page_container">
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
                                            {isUpdateMode && selectedWorkoutToUpdate === workouts.day  ? <UpdateWorkouts
                                            isUpdateMode={setIsUpdateMode}
                                            workoutitems={workouts} /> :
                                            <React.Fragment>
                                                <div className="movement_header_box">
                                                    <p>Movement: {workouts.movement}</p>
                                                </div>
                                                <div className="movement_description_box">
                                                    <p>Rounds: {workouts.rounds}</p>
                                                    <p>Reps: {workouts.reps}</p>
                                                    <p>Weight: {workouts.weight}</p>
                                                </div> 
                                                <div className="button_container_update_workout">
                                                    <button
                                                    name={workouts.day}
                                                    onClick={updateHandler} 
                                                    className="form_button" >Edit</button>
                                                </div>
                                                </React.Fragment>   
                                                }
                                            </div> 
                                        )
                                    })}
                                </div>
                                
                            )
                        })}
                    </div>
                )
            })}
        </div>
        </React.Fragment>
    )
};

export default TestWorkoutArea;

