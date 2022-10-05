import React , { useState, useEffect, useContext } from "react";
import ReactDOM  from "react-dom";
import WorkoutForm from "../../dashboard/components/workout-form";
import WorkoutOutput from "../../dashboard/components/workout-data-output";
<<<<<<< Updated upstream
import UpdateDeleteModal from "../../dashboard/components/update-delete-overlay";
=======
import UpdateWorkouts from "../../dashboard/components/update-workouts";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
>>>>>>> Stashed changes
import WorkoutEditMode from "../../dashboard/components/workout-edit-mode";
import { motion } from 'framer-motion/dist/framer-motion';

import "./workout-tracker.css";

<<<<<<< Updated upstream
let updateArray = [];
=======
let workoutsArray = [];
let updateArray = [];
let outputArray = [];
let editArray = [];
let userID;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        updateArray = newWorkoutData;
=======
        // updateArray = newWorkoutData;
        // console.log(newWorkoutData)
        outputArray = newWorkoutData;
        // console.log(outputArray);
>>>>>>> Stashed changes
        setWorkoutData((prevWorkoutData)=>{
            return[...prevWorkoutData, newWorkoutData]
        });
    }

<<<<<<< Updated upstream
    const activateUpdateDeleteModal = ()=> {
        setIsUpdateDeleteMode(true);
=======
    // const addUpdate =(newUpdateData)=>{
    //     console.log('here in addUpdate');
    //     console.log(newUpdateData);
    //     editArray = newUpdateData;
    //     setUpdateData((prevUpdateData)=>{
    //         return[...prevUpdateData, newUpdateData]
    //     });
    //     console.log(updateData);
    // }

    useEffect(()=>{
        const fetchWorkouts = async () => {
            console.log(userID)
            try {
                const response = await fetch(`http://localhost:5000/api/workouts/workoutlog/${userID}`);
                const responseData = await response.json();
                const date = new Date();
                const currentDay = date.getDate();
                const currentMonth = date.toLocaleString("en-US", { month:"long" });
                const currentYear = date.getFullYear();
                // console.log(responseData)
                const session = responseData.workout;
                // console.log(session.map(s => s));
                session.map(s => {
                    if(s.day === currentDay && s.month === currentMonth){
                        updateArray.push(s)
                        // setWorkoutData(sessions)
                        workoutsArray = [...new Set(updateArray)]
                        // workoutsArray = noDuplicates;
                        // console.log(workoutsArray);
                        console.log(workoutsArray);
                }})
                // workoutsArray = [...new Set(updateArray)]
                console.log(workoutsArray)
                
                // console.log(workoutsArray);
                // console.log(editArray);
                // editArray = [...new Set(workoutsArray)];
                // console.log(editArray)
                // workoutsArray = session;
                // console.log(responseData.workout);
                // console.log(workoutsArray);
                // workoutsArray.map(sessions=> {
                //     if(sessions.day === currentDay && sessions.month === currentMonth){
                //         updateArray.push(sessions)
                //     }
                // })
            } catch (err){}
        }
        // fetchWorkouts()
    },[userID])

    const activateUpdateDeleteModal = (trueOrFalse)=> {
        console.log('here in activate modal')
        // setIsUpdateDeleteMode(prevMode => !prevMode);
        setIsUpdateDeleteMode(trueOrFalse)
        // getWorkoutToUpdateId();
        console.log(trueOrFalse);
        console.log(workoutData);
        console.log(isUpdateDeleteMode);
>>>>>>> Stashed changes
    }

    useEffect(()=> {
        const checkIfWorkoutDataEntered = () =>{
<<<<<<< Updated upstream
            console.log(workoutData)
            if(workoutData.length > 0){
=======
            // console.log(workoutData)
            // console.log(sessionForDayIsLoaded)
            if(workoutData.length > 1){
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                
                {/* <WorkoutEditMode /> */}
                {/* <div className="center">
                    <h2>No workout data on the day yet</h2>
                </div>
                <WorkoutOutput 
                isUpdateMode={activateUpdateDeleteModal}
                workoutItems={workoutData} /> */}
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                <WorkoutOutput 
                isUpdateMode={activateUpdateDeleteModal}
                workoutItems={workoutData} />
                {/* {isUpdateDeleteMode && <UpdateDeleteModal workoutitems={workoutData} />} */}
=======
                <WorkoutOutput
                // onUpdate={addUpdate}
                // isUpdateMode={activateUpdateDeleteModal}
                workoutItems={workoutData} />
                {/* {isUpdateDeleteMode && <UpdateDeleteModal />} */}
>>>>>>> Stashed changes
            </motion.div>
            </React.Fragment>
        )
    }
};


export default Workout;
