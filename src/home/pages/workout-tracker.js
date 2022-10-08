import React , { useState, useEffect, useContext } from "react";
import ReactDOM  from "react-dom";
import WorkoutForm from "../../dashboard/components/workout-form";
import WorkoutOutput from "../../dashboard/components/workout-data-output";
import UpdateWorkouts from "../../dashboard/components/update-workouts";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
import WorkoutEditMode from "../../dashboard/components/workout-edit-mode";
import { motion } from 'framer-motion/dist/framer-motion';

import "./workout-tracker.css";

let finalEditArray =[];
let updateArray = [];
let workoutsArray = [];
let outputArray = [];
let editArray = [];
let userID;
const Workout = (props) =>{
    const [workoutData, setWorkoutData] = useState([finalEditArray]);
    const [newEntries, setNewEntries] = useState([]);
    const auth = useContext(LoginRegisterContext);
    // const [editArray, setEditArry] = useState([]);
    const [trainingDay, setTrainingDay] = useState({
        movement: "",
        rounds: "",
        reps: "",
        weight: ""
    });
    userID = auth.userID;
    let newArray = [];
    // let finalEditArray =[];
    const [sessionForDayIsLoaded, setSessionForDayIsLoaded] = useState(false);
    const [isUpdateDeleteMode, setIsUpdateDeleteMode] = useState(false);
    const addWorkout = (newWorkoutData)=>{
        // updateArray = newWorkoutData;
        // console.log(newWorkoutData)
        outputArray = newWorkoutData;
        // console.log(outputArray);
        setWorkoutData((prevWorkoutData)=>{
            return[...prevWorkoutData, newWorkoutData]
        });
    }
    //Helper function to get newly added workout entries on the day
    const getNewWorkoutEntries = (newEntry)=> {
        console.log(newEntry);
        setNewEntries(newEntry)
    }

    // const activateUpdateDeleteModal = ()=> {
    //     setIsUpdateDeleteMode(true);
    // const addUpdate =(newUpdateData)=>{
    //     console.log('here in addUpdate');
    //     console.log(newUpdateData);
    //     editArray = newUpdateData;
    //     setUpdateData((prevUpdateData)=>{
    //         return[...prevUpdateData, newUpdateData]
    //     });
    //     console.log(updateData);
    // }

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
                    addWorkout(finalEditArray);
            }})
        } catch (err){}
    }

    useEffect(()=> {
        fetchWorkouts();
    }, [userID, newEntries])

    const activateUpdateDeleteModal = (trueOrFalse)=> {
        console.log('here in activate modal')
        // setIsUpdateDeleteMode(prevMode => !prevMode);
        setIsUpdateDeleteMode(trueOrFalse)
        // getWorkoutToUpdateId();
        console.log(trueOrFalse);
        console.log(workoutData);
        console.log(isUpdateDeleteMode);
    }

    // useEffect(()=> {
    //     const checkIfWorkoutDataEntered = () =>{
    //         if(workoutData.length > 1){
    //             setSessionForDayIsLoaded(true)
    //         }
    //     }
    //     checkIfWorkoutDataEntered();
    // },[userID, workoutData]);

    // const getWorkoutToUpdateId = async () => {
    //     console.log('here');
    //     const selectedWorkoutToUpdate = 
    //     setIsUpdateMode(true);
    //     console.log(isUpdateMode);
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/workouts/${selectedWorkoutToUpdate}`);
    //         const responseData = await response.json();
    //         const updateWorkout = responseData.workout;
    //         workoutToUpdateArray.push(updateWorkout);
    //         setUpdateWorkout(workoutToUpdateArray);
    //         console.log(updateWorkout);
    //         setIsUpdateMode(true);
    //     } catch (err) {}
    // };

    // const UpdateDeleteModal = (props) => {
    //     return ReactDOM.createPortal(
    //     <UpdateWorkouts
    //     fetch={fetchWorkouts}
    //     isUpdateMode={setIsUpdateDeleteMode} 
    //     workoutitems={finalEditArray} />, document.getElementById('update-delete-overaly'))
    // }

    return (
        <React.Fragment>
            <motion.div 
            className="workout_page_container"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                <WorkoutForm workoutFormItems={getNewWorkoutEntries} />
                <WorkoutOutput
                workoutItems={finalEditArray} />
            </motion.div>
            </React.Fragment>
    )

    // if(!sessionForDayIsLoaded){
    //     return(
    //         <React.Fragment>
    //         <motion.div 
    //         className="workout_page_container"
    //         initial={{width: 0}}
    //         animate={{width: "100%"}}
    //         exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
    //             <WorkoutForm workoutFormItems={addWorkout} />
    //         </motion.div>
    //         </React.Fragment>
    //     )
    // };

    // if(sessionForDayIsLoaded){
    //     return(
    //         <React.Fragment>
    //         <motion.div 
    //         className="workout_page_container"
    //         initial={{width: 0}}
    //         animate={{width: "100%"}}
    //         exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
    //             <WorkoutForm />
    //             <WorkoutOutput
    //             workoutItems={workoutData} />
    //         </motion.div>
    //         </React.Fragment>
    //     )
    // }
};


export default Workout;
