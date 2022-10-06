import React , { useState, useEffect, useContext } from "react";
import ReactDOM  from "react-dom";
import WorkoutForm from "../../dashboard/components/workout-form";
import WorkoutOutput from "../../dashboard/components/workout-data-output";
import UpdateWorkouts from "../../dashboard/components/update-workouts";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
import WorkoutEditMode from "../../dashboard/components/workout-edit-mode";
import { motion } from 'framer-motion/dist/framer-motion';

import "./workout-tracker.css";

let updateArray = [];
let workoutsArray = [];
let outputArray = [];
let editArray = [];
let userID;
const Workout = (props) =>{
    const [workoutData, setWorkoutData] = useState([updateArray]);
    const [updateData, setUpdateData] = useState([editArray])
    const auth = useContext(LoginRegisterContext);
    // const [editArray, setEditArry] = useState([]);
    const [trainingDay, setTrainingDay] = useState({
        movement: "",
        rounds: "",
        reps: "",
        weight: ""
    });
    userID = auth.userID;
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

    // useEffect(()=>{
    //     const fetchWorkouts = async () => {
    //         console.log(userID)
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/workouts/workoutlog/${userID}`);
    //             const responseData = await response.json();
    //             const date = new Date();
    //             const currentDay = date.getDate();
    //             const currentMonth = date.toLocaleString("en-US", { month:"long" });
    //             const currentYear = date.getFullYear();
    //             console.log(responseData)
    //             const session = responseData.workout;
    //             session.map(s => {
    //                 if(s.day === currentDay && s.month === currentMonth){
    //                     updateArray.push(s)
    //                     setWorkoutData(sessions)
    //                     workoutsArray = [...new Set(updateArray)]
    //                     workoutsArray = noDuplicates;
    //                     console.log(workoutsArray);
    //                     console.log(workoutsArray);
    //             }})
    //             workoutsArray = [...new Set(updateArray)]
    //             console.log(workoutsArray)
                
    //             console.log(workoutsArray);
    //             console.log(editArray);
    //             editArray = [...new Set(workoutsArray)];
    //             console.log(editArray)
    //             workoutsArray = session;
    //             console.log(responseData.workout);
    //             console.log(workoutsArray);
    //             workoutsArray.map(sessions=> {
    //                 if(sessions.day === currentDay && sessions.month === currentMonth){
    //                     updateArray.push(sessions)
    //                 }
    //             })
    //         } catch (err){}
    //     }
    //     fetchWorkouts()
    // },[userID])

    const activateUpdateDeleteModal = (trueOrFalse)=> {
        console.log('here in activate modal')
        // setIsUpdateDeleteMode(prevMode => !prevMode);
        setIsUpdateDeleteMode(trueOrFalse)
        // getWorkoutToUpdateId();
        console.log(trueOrFalse);
        console.log(workoutData);
        console.log(isUpdateDeleteMode);
    }

    useEffect(()=> {
        const checkIfWorkoutDataEntered = () =>{
            // console.log(workoutData)
            // console.log(sessionForDayIsLoaded)
            if(workoutData.length > 1){
                setSessionForDayIsLoaded(true)
            }
        }
        checkIfWorkoutDataEntered();
    },[userID, workoutData]);

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
    //     isUpdateMode={activateUpdateDeleteModal} 
    //     workoutitems={editArray} />, document.getElementById('update-delete-overaly'))
    // }

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
                {/* <WorkoutOutput 
                isUpdateMode={activateUpdateDeleteModal}
                workoutItems={workoutData} /> */}
                {/* {isUpdateDeleteMode && <UpdateDeleteModal workoutitems={workoutData} />} */}
                <WorkoutOutput
                // onUpdate={addUpdate}
                // isUpdateMode={activateUpdateDeleteModal}
                workoutItems={workoutData} />
                {/* {isUpdateDeleteMode && <UpdateDeleteModal />} */}
            </motion.div>
            </React.Fragment>
        )
    }
};


export default Workout;
