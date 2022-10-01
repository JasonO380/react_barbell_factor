import React, { useState } from "react";
import { motion } from 'framer-motion/dist/framer-motion';

const GetAllWorkoutsOutput = (props) => {
    props.loggedMonth.map(session => {
        console.log(session)
    });
    
    // const [addEditButton, setAddEditButton] = useState(false)
    return (
        <motion.div 
        className="page_container"
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            {props.loggedMonth.map(session => {
                const month = session.month;
                const day = session.days;
                return (
                    <div className="month_container">
                        <h2 className="month_header_center">{month}</h2>
                        {day.map(fDay => {
                            const foundDay = fDay.day;
                            const foundActivities = fDay.activities;
                            const date = new Date();
                            const currentDay = date.getDay();
                            {/* if(currentDay === foundDay -2 || foundDay - 1){
                                setAddEditButton(true);
                                console.log('button goes here')
                            } */}
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
                                                    onUpdate={props.onUpdate}
                                                    onClick={props.onClick}
                                                    getUpdate={props.getUpdate} 
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
        </motion.div>
    )
        }
export default GetAllWorkoutsOutput;

