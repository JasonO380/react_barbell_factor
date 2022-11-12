import React, { useState, useEffect, useContext } from "react";
import WorkoutForm from "./workout-form";
import WorkoutOutput from "./workout-data-output";
import { LoginRegisterContext } from "../login/registration/components/context/login-register-context";
import { motion } from "framer-motion/dist/framer-motion";

import "./workout-tracker.css";

let finalEditArray = [];
let workoutsArray = [];
let userID;
const WorkoutTracker = (props) => {
    const [workoutData, setWorkoutData] = useState([finalEditArray]);
    // const [allWorkoutsDeleted, setAllWorkoutsDeleted] = useState(false);
    const [newEntries, setNewEntries] = useState([]);
    const auth = useContext(LoginRegisterContext);
    userID = auth.userID;
    const addWorkout = (newWorkoutData) => {
        console.log(newWorkoutData);
        workoutsArray = [...new Set(newWorkoutData)];
        console.log(finalEditArray);
        console.log(workoutsArray);
        console.log(workoutsArray.length);
        setWorkoutData((prevWorkoutData) => {
            return [...prevWorkoutData, newWorkoutData];
        });
    };
    //Helper function to get newly added workout entries on the day
    const getNewWorkoutEntries = (newEntry) => {
        console.log("here");
        console.log(newEntry);
        setNewEntries(newEntry);
    };

    const fetchWorkouts = async () => {
        let newArray = [];
        const userID = auth.userID;
        try {
            const date = new Date();
            const currentDay = date.getDate();
            const currentMonth = date.toLocaleString("en-US", {
                month: "long",
            });
            const currentYear = date.getFullYear();
            const response = await fetch(
                `https://barbell-factor.herokuapp.com/api/workouts/workoutlog/${userID}`
            );
            const responseData = await response.json();
            const session = responseData.workout;
            console.log(responseData.workout);
            session.map((s) => {
                if (s.day === currentDay && s.month === currentMonth) {
                    newArray.push(s);
                    console.log(newArray);
                }
            });
            finalEditArray = [...new Set(newArray)];
            console.log(finalEditArray);
            console.log(finalEditArray.length);
            addWorkout(finalEditArray);
        } catch (err) {}
    };

    useEffect(() => {
        fetchWorkouts();
    }, [userID, newEntries]);

    return (
        <React.Fragment>
            <motion.div
                className="workout_page_container"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
            >
                <WorkoutForm workoutFormItems={getNewWorkoutEntries} />
                <WorkoutOutput
                    fetch={getNewWorkoutEntries}
                    updateWorkouts={fetchWorkouts}
                    workoutItems={finalEditArray}
                />
            </motion.div>
        </React.Fragment>
    );
};

export default WorkoutTracker;
