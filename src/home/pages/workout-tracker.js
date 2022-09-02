import React ,{ useState, useEffect } from "react";
import WorkoutForm from "../../dashboard/components/workout-form";
import WorkoutOutput from "../../dashboard/components/workout-data-output";
import { motion } from 'framer-motion/dist/framer-motion';

import "./workout-tracker.css";


const Workout = (props) =>{
    const [workoutData, setWorkoutData] = useState([]);
    const [trainingDay, setTrainingDay] = useState({
        movement: "",
        rounds: "",
        reps: "",
        weight: ""
    });
    const [sessionForDayIsLoaded, setSessionForDayIsLoaded] = useState(false);
    const addWorkout = (newWorkoutData)=>{
        setWorkoutData((prevWorkoutData)=>{
            return[...prevWorkoutData, newWorkoutData]
        });
    }

    useEffect(()=> {
        const checkIfWorkoutDataEntered = () =>{
            if(workoutData.length > 0){
                setSessionForDayIsLoaded(true)
            }
        }
        checkIfWorkoutDataEntered();
    },[workoutData]);

    if(!sessionForDayIsLoaded){
        return(
            <React.Fragment>
            <motion.div 
            className="workout_page_container"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                <WorkoutForm workoutFormItems={addWorkout} />
                <div className="center">
                    <h2>No workout data on the day yet</h2>
                </div>
            </motion.div>
            </React.Fragment>
        )
    };

    if(sessionForDayIsLoaded){
        return(
            <React.Fragment>
            <motion.div 
            className="workout_page_container"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                <WorkoutForm workoutFormItems={addWorkout} />
                <WorkoutOutput workoutItems={workoutData} />
            </motion.div>
            </React.Fragment>
        )
    }
};


export default Workout;
