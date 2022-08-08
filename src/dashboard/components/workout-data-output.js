import React from "react";
import { useState } from "react";
import UpdateWorkouts from "./update-workouts";

import "./workout-data-output.css";

const WorkoutOutput = (props) => {
        const [isUpdateMode, setIsUpdateMode] = useState(false);
        //Holds the month workout data
        let loggedSession = [];
        //generates the new movement objects for the new month and day keys
        const generateMovementObjects = (props)=> {
            return {
                movement:props.movement,
                rounds: props.rounds,
                reps:props.reps,
                weight:props.weight
            }
        };
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
    
        //Check to see if month exists
        const doesMonthExist = (props) => {
            return loggedSession.find((lsession)=> lsession.month === props.month)
        };
    
        //Check to see if day already existed in month...isMonthFound comes from the session.map() on bottom
        const doesDayExist = (isMonthFound, props) => {
            return isMonthFound.days.find((monthDays)=> monthDays.day === props.day)
        };
    
        //Helper method to generate activities based on day
        const generateDaySession = (props) => {
            return {
                day: props.day,
                activities:[generateMovementObjects(props)]
            }
        }
    
        //map through the incoming data
        props.workoutItems.map((sessions)=>{
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
        loggedSession.map(session=>{
            console.log(session);
        })

        return (
            <div className="workout_wrapper">
                {loggedSession.map(session => {
                    const month = session.month;
                    const day = session.days;
                    const foundDay = day.map(fDay => fDay.day);
                    return (
                        <div className="workout_container">
                            <h2 className="workout_date_header">{month} {foundDay}</h2>
                            {day.map(fDay => {
                                const foundActivities = fDay.activities;
                                return (
                                    <div className="session_container">
                                        {foundActivities.map(workouts =>{
                                            return(
                                                <div>
                                                {isUpdateMode ? <UpdateWorkouts isUpdateMode={setIsUpdateMode} workoutitems={workouts} /> :
                                                <React.Fragment>
                                                <div className="movement_data">
                                                    <p>Movement: {workouts.movement}</p>
                                                    <p>Rounds: {workouts.rounds}</p>
                                                    <p>Reps: {workouts.reps}</p>
                                                    <p>Weight: {workouts.weight}</p>
                                                </div>
                                                <div className="button_container_update_workout">
                                                    <button
                                                    name={workouts.day}
                                                    onClick={updateHandler} 
                                                    className="form_button" >Update</button>
                                                </div>
                                                </React.Fragment>}
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
        )
};

                            // <div className="all_workouts_session_container">
                            //         <h2>{foundDay}</h2>
                            //         {foundActivities.map(workouts =>{
                            //             return(
                            //                 <div className="movement_data">
                            //                 {isUpdateMode && selectedWorkoutToUpdate === workouts.day  ? <UpdateWorkouts
                            //                 isUpdateMode={setIsUpdateMode}
                            //                 workoutitems={workouts} /> :
                            //                 <React.Fragment>
                            //                     <div className="movement_header_box">
                            //                         <p>Movement: {workouts.movement}</p>
                            //                     </div>
                            //                     <div className="movement_description_box">
                            //                         <p>Rounds: {workouts.rounds}</p>
                            //                         <p>Reps: {workouts.reps}</p>
                            //                         <p>Weight: {workouts.weight}</p>
                            //                     </div> 
                            //                     <div className="button_container_update_workout">
                            //                         <button
                            //                         name={workouts.day}
                            //                         onClick={updateHandler} 
                            //                         className="form_button" >Edit</button>
                            //                     </div>
                            //                     </React.Fragment>   
                            //                     }
                            //                 </div> 
                            //             )
                            //         })}
                            //     </div>

export default WorkoutOutput;
