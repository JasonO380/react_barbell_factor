import React ,{ useState, useEffect } from "react";
import WorkoutForm from "../../dashboard/components/workout-form";
import WorkoutOutput from "../../dashboard/components/workout-data-output";
import UpdateDeleteModal from "../../dashboard/components/update-delete-overlay";
import WorkoutEditMode from "../../dashboard/components/workout-edit-mode";
import { motion } from 'framer-motion/dist/framer-motion';

import "./workout-tracker.css";

let updateArray = [];
const Workout = (props) =>{
    const [workoutData, setWorkoutData] = useState([]);
    const [trainingDay, setTrainingDay] = useState({
        movement: "",
        rounds: "",
        reps: "",
        weight: ""
    });
    const [sessionForDayIsLoaded, setSessionForDayIsLoaded] = useState(false);
    const [isUpdateDeleteMode, setIsUpdateDeleteMode] = useState(false);
    const addWorkout = (newWorkoutData)=>{
        updateArray = newWorkoutData;
        setWorkoutData((prevWorkoutData)=>{
            return[...prevWorkoutData, newWorkoutData]
        });
    }

    const activateUpdateDeleteModal = ()=> {
        setIsUpdateDeleteMode(true);
    }

    useEffect(()=> {
        const checkIfWorkoutDataEntered = () =>{
            console.log(workoutData)
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
                
                {/* <WorkoutEditMode /> */}
                {/* <div className="center">
                    <h2>No workout data on the day yet</h2>
                </div>
                <WorkoutOutput 
                isUpdateMode={activateUpdateDeleteModal}
                workoutItems={workoutData} /> */}
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
                {/* <WorkoutForm /> */}
                <WorkoutForm workoutFormItems={addWorkout} />
                <WorkoutOutput 
                isUpdateMode={activateUpdateDeleteModal}
                workoutItems={workoutData} />
                {/* {isUpdateDeleteMode && <UpdateDeleteModal workoutitems={workoutData} />} */}
            </motion.div>
            </React.Fragment>
        )
    }
};


export default Workout;
