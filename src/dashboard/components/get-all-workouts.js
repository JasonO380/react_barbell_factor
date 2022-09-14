import React, { useEffect, useState, useContext, } from "react";
import ReactDOM  from "react-dom";
import months from "./month-select-options";
// import session from "./workout-data";
import UpdateWorkouts from "./update-workouts";
import Backdrop from "../../shared/UIElements/Backdrop";
import DropDownSelect from "../../shared/UIElements/drop-down-select";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
import { motion } from 'framer-motion/dist/framer-motion';
import "./get-all-workouts.css";



const GetAllWorkoutData = () =>{
    const [updateWorkout, setUpdateWorkout] = useState([]);
    const [workout, setWorkout] = useState();
    const [isSelectedMonthLoaded, setIsSelectedMonthLoaded] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState (false);
    //State to store selected month
    const [selectedMonth, setSelectedMonth] = useState();
    //State to store foundMonth to be populated on page
    const [loggedMonth, setLoggedMonth] = useState([]);
    const auth = useContext(LoginRegisterContext);
    //Store the selected month data in new array
    let foundMonth = [];
    //Holds the month workout data
    let loggedSession = [];
    //Holds the workoutto be updated array
    let workoutToUpdateArray = [];
    // Holds the ID of selected workout
    let selectedWorkoutToUpdate;
    //helper function to select month
    let choice;
    
    

    const handleSelect = (event) =>{
        choice = event.target.value;
        console.log("here");
        setSelectedMonth(choice);
        fetchWorkouts();
    };

    const fetchWorkouts = async () => {
        const userID = auth.userID;
        try {
            const response = await fetch(`http://localhost:5000/api/workouts/workoutlog/${userID}`);
            const responseData = await response.json();
            const session = responseData.workout;
            setWorkout(session);
            console.log(responseData.workout);
            console.log(workout);
            monthDayActivitiesObject(session);
        } catch (err){}
    }

    const monthDayActivitiesObject = (session) => {
        //generates the new movement objects for the new month and day keys
    const generateMovementObjects = (session)=> {
        return {
            id:session.id,
            movement:session.movement,
            rounds: session.rounds,
            reps:session.reps,
            weight:session.weight
        }
    };
    //Check to see if month exists
    const doesMonthExist = (session) => {
        return loggedSession.find((lsession)=> lsession.month === session.month)
    };
    //Check to see if day already existed in month...isMonthFound comes from the session.map() on bottom
    const doesDayExist = (isMonthFound, session) => {
        return isMonthFound.days.find((monthDays)=> monthDays.day === session.day)
    };
    //Helper method to generate activities based on day
    const generateDaySession = (session) => {
        return {
            day: session.day,
            activities:[generateMovementObjects(session)]
        }
    }
    //map through the incoming data
    session.map((sessions)=>{
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
        console.log(loggedSession);
        getMonths(loggedSession);
    })
    }

    const getMonths = (loggedSession) => {
        loggedSession.map((sessions)=>{
            console.log(sessions)
            console.log(choice);
            if(choice === sessions.month){
                setIsSelectedMonthLoaded(true);
                foundMonth.push(sessions);
                let noDuplicates = [...new Set(foundMonth)]
                setLoggedMonth(noDuplicates);
                console.log(noDuplicates);
                            } if (foundMonth.length === 0){
                                setIsSelectedMonthLoaded(false);
                            } 
                        })
        };

    const getWorkoutToUpdateId = async (event) => {
        const selectedWorkoutToUpdate = event.target.value;
        console.log(selectedWorkoutToUpdate);
        try {
            const response = await fetch(`http://localhost:5000/api/workouts/${selectedWorkoutToUpdate}`);
            const responseData = await response.json();
            const updateWorkout = responseData.workout;
            workoutToUpdateArray.push(updateWorkout);
            setUpdateWorkout(workoutToUpdateArray);
            console.log(updateWorkout);
        } catch (err) {}
        if(isUpdateMode){
            setIsUpdateMode(false);
        } else {
            setIsUpdateMode(true);
            console.log(isUpdateMode);
        }
    };

    const updateModeHandler = () => {
        if(isUpdateMode){
            setIsUpdateMode(false);
        } else {
            setIsUpdateMode(true);
            console.log(isUpdateMode);
        }
    }

    const UpdateDeleteModal = (props) => {
        return ReactDOM.createPortal(
        <UpdateWorkouts
        isUpdateMode={setIsUpdateMode} 
        workoutitems={updateWorkout} />, document.getElementById('update-delete-overaly'))
    }

    if(!selectedMonth && !isSelectedMonthLoaded){
        return (
            <React.Fragment>
                <DropDownSelect
                name={selectedMonth}
                onChange={handleSelect}
                isLoaded={setIsSelectedMonthLoaded} />
                <motion.div 
                className="center"
                initial={{width: 0}}
                animate={{width: "100%"}}
                exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                    <h2>Please select a month to view workouts for that month</h2>
                    {/* <button 
                    className="form_button"
                    onClick={fetchWorkouts}>Enter</button> */}
                </motion.div>
            </React.Fragment>
        )
    }

    if (!isSelectedMonthLoaded && selectedMonth){
        return (
            <React.Fragment>
                <DropDownSelect
                name={selectedMonth}
                onChange={handleSelect}
                isLoaded={setIsSelectedMonthLoaded} />
                <motion.div 
                className="center"
                initial={{width: 0}}
                animate={{width: "100%"}}
                exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                    <h2>No data yet for the selected month</h2>
                </motion.div>
            </React.Fragment>
        )
    }

    // if(isUpdateMode){
    //     return(
    //         <React.Fragment>
    //         <Backdrop onClick={setIsUpdateMode}/>
    //         <UpdateDeleteModal />
    //         <UpdateWorkouts
    //         workoutitems={updateWorkout} />
    //         </React.Fragment>
    //     )
    // }

    return(
        <React.Fragment>
        <DropDownSelect
            name={selectedMonth}
            onChange={handleSelect}
            isLoaded={setIsSelectedMonthLoaded} />
            {isUpdateMode && <UpdateDeleteModal />}
            <motion.div 
            className="page_container"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                {loggedMonth.map(session => {
                    const month = session.month;
                    const day = session.days;
                    return (
                        <div className="month_container">
                            <h2 className="month_header_center">{month}</h2>
                            {day.map(fDay => {
                                const foundDay = fDay.day;
                                const foundActivities = fDay.activities;
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
                                                        onUpdate={updateModeHandler}
                                                        onClick={getWorkoutToUpdateId} 
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
        </React.Fragment>

    )
    };

export default GetAllWorkoutData;