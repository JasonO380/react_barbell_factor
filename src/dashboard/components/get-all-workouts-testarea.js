import React, { useState, useEffect, useContext } from "react";
import months from "./month-select-options";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
// import session from "./workout-data";
import DropDownSelect from "../../shared/UIElements/drop-down-select";

import "./get-all-workouts.css";
import UpdateWorkouts from "./update-workouts";

//Area to test components

const TestWorkoutArea = () => {
    const auth = useContext(LoginRegisterContext);
    const [workout, setWorkout] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [loggedMonth, setLoggedMonth] = useState([]);
    const [updateWorkout, setUpdateWorkout] = useState([]);
    const [isSelectedMonthLoaded, setIsSelectedMonthLoaded] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState (false);
    //Holds the month workout data
    let loggedSession = [];
    //for conditionally rendered selected month
    let foundMonth = [];
    //array to hold the workout to update
    let workoutToUpdateArray = [];
    //grabs the workout ID
    let selectedWorkoutToUpdate;
    let choice;

    const handleSelect = (event) =>{
        choice = event.target.value;
        console.log(choice);
        setSelectedMonth(choice);
        console.log(selectedMonth);
        fetchWorkouts();
    };

    const fetchWorkouts = async () => {
        const userID = auth.userID;
        try {
            const response = await fetch(`http://localhost:5000/api/workouts/workoutlog/${userID}`);
            const responseData = await response.json();
            const session = responseData.workout;
            setWorkout(session);
            console.log(responseData.workout);
            console.log(workout);
            monthDayActivitiesObject(session);
        } catch (err){}
    }

    const monthDayActivitiesObject = (session) => {
        console.log(session);
        //generates the new movement objects for the new month and day keys
        const generateMovementObjects = (session)=> {
            return {
                id:session.id,
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
            console.log(loggedSession);
            getMonths(loggedSession);
        })
    }

    const getMonths = (loggedSession) => {
        loggedSession.map((sessions)=>{
            console.log(sessions)
            console.log(choice);
            if(choice === sessions.month){
                setIsSelectedMonthLoaded(true);
                foundMonth.push(sessions);
                let noDuplicates = [...new Set(foundMonth)]
                setLoggedMonth(noDuplicates);
                console.log(noDuplicates);
                            } if (foundMonth.length === 0){
                                setIsSelectedMonthLoaded(false);
                            } 
                        })
                    };

    const getWorkoutToUpdateId = (event) => {
        let selectedWorkoutToUpdate = event.target.value;
        console.log(selectedWorkoutToUpdate);
        // session.map(workouts => {
        //     if(selectedWorkoutToUpdate === workouts.id){
        //         workoutToUpdateArray.push(workouts);
        //         setUpdateWorkout(workouts);
        //         console.log(workoutToUpdateArray);
        //     }
        //     return workoutToUpdateArray;
        // })
        // if(isUpdateMode){
        //     setIsUpdateMode(false);
        // } else {
        //     setIsUpdateMode(true);
        //     console.log(isUpdateMode);
        // }
    };

    const updateModeHandler = () => {
        if(isUpdateMode){
            setIsUpdateMode(false);
        } else {
            setIsUpdateMode(true);
            console.log(isUpdateMode);
        }
    }

    if(!selectedMonth && !isSelectedMonthLoaded){
        return (
            <React.Fragment>
                <DropDownSelect
                name={selectedMonth}
                onChange={handleSelect}
                isLoaded={setIsSelectedMonthLoaded} />
                <div className="center">
                    <h2>Please select a month to view workouts for that month</h2>
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

    if(isUpdateMode){
        return(
            <UpdateWorkouts
            workoutitems={updateWorkout} />
        )
    }

    return(
        <React.Fragment>
        <DropDownSelect
            name={selectedMonth}
            onChange={handleSelect}
            isLoaded={setIsSelectedMonthLoaded} />
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
                                        let selectedWorkoutToUpdate = workouts.id;
                                        return(
                                            <div id={workouts.id} className="movement_data">
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
                                                    value={selectedWorkoutToUpdate}
                                                    name={workouts.movement}
                                                    onUpdate={updateModeHandler}
                                                    onClick={getWorkoutToUpdateId} 
                                                    className="form_button" >Edit</button>
                                                </div> 
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

