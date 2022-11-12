import React, { useState, useContext } from "react";
import { LoginRegisterContext } from "../login/registration/components/context/login-register-context";
import ReactDOM from "react-dom";
import { motion } from "framer-motion/dist/framer-motion";
import UpdateWorkouts from "./update-workouts";

import "./workout-data-output.css";

let month;
let foundDay;

const WorkoutOutput = (props) => {
    let workoutsForTheDay = [];
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const auth = useContext(LoginRegisterContext);
    console.log(noDuplicates);
    workoutsForTheDay = props.workoutItems;
    let noDuplicates = [...new Set(workoutsForTheDay)];
    console.log(noDuplicates);
    //takes away the first empty array
    const initialArray = props.workoutItems.slice(1);
    console.log(initialArray);
    console.log(workoutsForTheDay);
    const [editArray, setEditArry] = useState([]);
    //Holds the month workout data
    let loggedSession = [];
    let updateArray = [];
    let newArray = [];
    //generates the new movement objects for the new month and day keys
    const generateMovementObjects = (session) => {
        return {
            id: session._id,
            movement: session.movement,
            rounds: session.rounds,
            reps: session.reps,
            weight: session.weight,
        };
    };

    const fetchWorkouts = () => {
        console.log("new attempt");
        props.updateWorkouts();
    };

    const updateHandler = (event) => {
        let selectedWorkoutToUpdate = event.target.name;
        let selectedWorkoutID = event.target.value;
        console.log(event.target.name);
        console.log(selectedWorkoutID);
        console.log(selectedWorkoutToUpdate);
        getWorkoutToUpdateId(selectedWorkoutID);
        console.log(isUpdateMode);
    };

    const getWorkoutToUpdateId = async (workoutID) => {
        console.log("here");
        setIsUpdateMode(true);
        console.log(isUpdateMode);
        try {
            const response = await fetch(
                `https://barbell-factor.herokuapp.com/api/workouts/${workoutID}`
            );
            const responseData = await response.json();
            const updateWorkout = responseData.workout;
            console.log("here in fetch");
            console.log(responseData);
            setEditArry([updateWorkout]);
            console.log(editArray);
            updateArray.push(updateWorkout);
            console.log(updateArray);
            setIsUpdateMode(true);
        } catch (err) {}
    };

    //Check to see if month exists
    const doesMonthExist = (props) => {
        return loggedSession.find((lsession) => lsession.month === props.month);
    };

    //Check to see if day already existed in month...isMonthFound comes from the session.map() on bottom
    const doesDayExist = (isMonthFound, props) => {
        return isMonthFound.days.find(
            (monthDays) => monthDays.day === props.day
        );
    };

    //Helper method to generate activities based on day
    const generateDaySession = (props) => {
        return {
            day: props.day,
            activities: [generateMovementObjects(props)],
        };
    };

    //map through the incoming data
    workoutsForTheDay.map((sessions) => {
        let isMonthFound = doesMonthExist(sessions);
        if (isMonthFound) {
            let isDayFound = doesDayExist(isMonthFound, sessions);
            if (isDayFound) {
                isDayFound.activities.push(generateMovementObjects(sessions));
            } else {
                isMonthFound.days.push(generateDaySession(sessions));
            }
        } else {
            loggedSession.push({
                month: sessions.month,
                days: [generateDaySession(sessions)],
            });
        }
    });

    loggedSession.map((session) => {
        console.log(session);
    });

    const UpdateDeleteModal = () => {
        console.log("here in modal");
        console.log(updateArray);
        console.log(editArray);
        return ReactDOM.createPortal(
            <UpdateWorkouts
                fetch={fetchWorkouts}
                isUpdateMode={setIsUpdateMode}
                showUpdate={setIsUpdateMode}
                workoutitems={editArray}
            />,
            document.getElementById("update-delete-overaly")
        );
    };

    return (
        <React.Fragment>
            {isUpdateMode && <UpdateDeleteModal />}
            <div className="workout_wrapper">
                {loggedSession.map((session) => {
                    month = session.month;
                    const day = session.days;
                    foundDay = day.map((fDay) => fDay.day);
                    return (
                        <div className="workout_container">
                            <h2 className="workout_date_header">
                                {month} {foundDay}
                            </h2>
                            {day.map((fDay) => {
                                const foundActivities = fDay.activities;
                                foundDay = fDay.days;
                                return (
                                    <div className="session_container">
                                        {foundActivities.map((workouts) => {
                                            const wid = workouts.id;
                                            return (
                                                <div>
                                                    <React.Fragment>
                                                        <div className="movement_data">
                                                            <p>
                                                                Movement:{" "}
                                                                {
                                                                    workouts.movement
                                                                }
                                                            </p>
                                                            <p>
                                                                Rounds:{" "}
                                                                {
                                                                    workouts.rounds
                                                                }
                                                            </p>
                                                            <p>
                                                                Reps:{" "}
                                                                {workouts.reps}
                                                            </p>
                                                            <p>
                                                                Weight:{" "}
                                                                {
                                                                    workouts.weight
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="button_container_workout_data_output">
                                                            <motion.button
                                                                value={wid}
                                                                whileTap={{
                                                                    scale: 0.8,
                                                                }}
                                                                onClick={
                                                                    updateHandler
                                                                }
                                                                className="form_button_workout_data"
                                                            >
                                                                Update
                                                            </motion.button>
                                                        </div>
                                                    </React.Fragment>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
};

export default WorkoutOutput;
