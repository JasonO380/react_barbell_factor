import React from "react";
import { useState } from "react";

import "./workout-data-output.css";

const WorkoutOutput = (props) => {
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
                                                <div className="movement_data">
                                                    <p>Movement: {workouts.movement}</p>
                                                    <p>Rounds: {workouts.rounds}</p>
                                                    <p>Reps: {workouts.reps}</p>
                                                    <p>Weight: {workouts.weight}</p>
                                                </div>
                                            )
                                        })}
                                        <button className="form_button" in={props.in}>Update</button>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
};


export default WorkoutOutput;
