import React, { useState, useContext, useEffect } from "react";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
import ReactDOM  from "react-dom";
import UpdateWorkouts from "./update-workouts";
import UpdateWorkoutsFormPage from "./update-workout-form-output";

import "./workout-data-output.css";

let month;
let foundDay;

const WorkoutOutput = (props) => {
        const [isUpdateMode, setIsUpdateMode] = useState(false);
        const auth = useContext(LoginRegisterContext);
        //takes away the first empty array
        const initialArray = props.workoutItems.slice(1);
        console.log(initialArray)
        const [editArray, setEditArry] = useState([]);
        //Holds the month workout data
        let loggedSession = [];
        let updateArray = [];
        let newArray = [];
        let finalEditArray =[];
        //generates the new movement objects for the new month and day keys
        const generateMovementObjects = (session)=> {
            return {
                //adding id
                id:session._id,
                movement:session.movement,
                rounds: session.rounds,
                reps:session.reps,
                weight:session.weight
            }
        };

        const fetchWorkouts = async () => {
            const userID = auth.userID;
            try {
                const date = new Date();
                const currentDay = date.getDate();
                const currentMonth = date.toLocaleString("en-US", { month:"long" });
                const currentYear = date.getFullYear();
                const response = await fetch(`http://localhost:5000/api/workouts/workoutlog/${userID}`);
                const responseData = await response.json();
                const session = responseData.workout;
                console.log(responseData.workout);
                session.map(s => {
                    if(s.day === currentDay && s.month === currentMonth){
                        newArray.push(s)
                        finalEditArray = [...new Set(newArray)]
                        console.log(finalEditArray);
                        console.log(finalEditArray.length)
                        props.updateItems2(finalEditArray);
                }})
            } catch (err){}
        }

        const updateHandler = (event) => {
            let selectedWorkoutToUpdate = event.target.name;
            let selectedWorkoutID = event.target.value;
            // setIsUpdateMode(true)
            console.log(event.target.name)
            console.log(selectedWorkoutID)
            console.log(selectedWorkoutToUpdate);
            getWorkoutToUpdateId(selectedWorkoutID)
            //Added to initiate modal
            // props.isUpdateMode(true);
            // setIsUpdateMode(true);
            console.log(isUpdateMode)
            // setIsUpdateMode(prevMode => !prevMode)
            // if(isUpdateMode){
            //     setIsUpdateMode(false);
            // } else {
            //     setIsUpdateMode(true);
            // }
        };

        const getWorkoutToUpdateId = async (workoutID) => {
            console.log('here');
            // const selectedWorkoutToUpdate = 
            setIsUpdateMode(true);
            console.log(isUpdateMode);
            try {
                const response = await fetch(`http://localhost:5000/api/workouts/${workoutID}`);
                const responseData = await response.json();
                const updateWorkout = responseData.workout;
                console.log('here in fetch')
                console.log(responseData);
                setEditArry([updateWorkout]);
                console.log(editArray);
                updateArray.push(updateWorkout);
                // let updateArray2 = updateArray.slice(1)
                console.log(updateArray);
                UpdateDeleteModal();
                //send to workout-tracker component
                // props.onUpdate(updateWorkout);
                setIsUpdateMode(true);
            } catch (err) {}
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
        initialArray.map((sessions)=>{
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

        const UpdateDeleteModal = () => {
            console.log('here in modal');
            console.log(updateArray);
            console.log(editArray);
            return ReactDOM.createPortal(
            <UpdateWorkouts
            fetch={fetchWorkouts}
            isUpdateMode={setIsUpdateMode} 
            workoutitems={editArray} />, document.getElementById('update-delete-overaly'))
        }

        if(finalEditArray.length > 0){
            return (
                <UpdateWorkoutsFormPage
                workoutItems2={finalEditArray} />
            )
        }

        return (
            <React.Fragment>
            {isUpdateMode && <UpdateDeleteModal />}
            <div className="workout_wrapper">
                {loggedSession.map(session => {
                    month = session.month;
                    const day = session.days;
                    foundDay = day.map(fDay => fDay.day);
                    return (
                        <div className="workout_container">
                            <h2 className="workout_date_header">{month} {foundDay}</h2>
                            {day.map(fDay => {
                                const foundActivities = fDay.activities;
                                foundDay = fDay.days
                                return (
                                    <div className="session_container">
                                        {foundActivities.map(workouts =>{
                                            const wid = workouts.id
                                            return(
                                                <div>
                                                <React.Fragment>
                                                <div className="movement_data">
                                                    <p>Movement: {workouts.movement}</p>
                                                    <p>Rounds: {workouts.rounds}</p>
                                                    <p>Reps: {workouts.reps}</p>
                                                    <p>Weight: {workouts.weight}</p>
                                                </div>
                                                <div className="button_container_workout_data_output">
                                                    <button
                                                    value={wid}
                                                    onClick={updateHandler} 
                                                    className="form_button_workout_data" >Update</button>
                                                </div>
                                                </React.Fragment>
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

export default WorkoutOutput;
