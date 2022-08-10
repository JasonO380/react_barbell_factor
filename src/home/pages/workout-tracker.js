import React ,{ useState, useEffect } from "react";
import WorkoutForm from "../../dashboard/components/workout-form";
import WorkoutOutput from "../../dashboard/components/workout-data-output";

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
            <div className="workout_page_container">
                <WorkoutForm workoutItems={addWorkout} />
                <div className="center">
                    <h2>No workout data on the day yet</h2>
                </div>
            </div>
            </React.Fragment>
        )
    };

    if(sessionForDayIsLoaded){
        return(
            <React.Fragment>
            <div className="workout_page_container">
                <WorkoutForm workoutItems={addWorkout} />
                <WorkoutOutput  workoutItems={workoutData} />
            </div>
            </React.Fragment>
        )
    }
};


export default Workout;
