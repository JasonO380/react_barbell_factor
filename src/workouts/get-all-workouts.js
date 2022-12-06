import React, { useEffect, useState, useContext, } from "react";
import ReactDOM  from "react-dom";
import GetAllWorkoutsOutput from "./get-all-workouts-output";
import UpdateWorkouts from "./update-workouts";
import DropDownSelect from "../shared/UIElements/drop-down-select";
import { LoginRegisterContext } from "../login/registration/components/context/login-register-context";
import { motion } from 'framer-motion/dist/framer-motion';
import "./get-all-workouts.css";

let choice;
const GetAllWorkoutData = () =>{
    const [updateWorkout, setUpdateWorkout] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
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
    
    const handleSelect = (event) =>{
        choice = event.target.value;
        console.log(choice);
        console.log("here");
        console.log(selectedMonth)
        fetchWorkouts();
    };

    const fetchWorkouts = async () => {
        const userID = auth.userID;
        try {
            const response = await fetch(`https://barbell-factor.onrender.com/api/workouts/workoutlog/${userID}`);
            const responseData = await response.json();
            const session = responseData.workout.reverse();
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
        console.log(selectedMonth);
        setSelectedMonth(choice);
        if(choice === undefined){
            choice = selectedMonth;
            console.log(choice);
        }
        console.log(choice);
        loggedSession.map((sessions)=>{
            if(choice === sessions.month){
                console.log(sessions);
                setIsSelectedMonthLoaded(true);
                console.log(isSelectedMonthLoaded);
                foundMonth.push(sessions);
                let noDuplicates = [...new Set(foundMonth)]
                setLoggedMonth(noDuplicates);
                console.log(noDuplicates);
                            } if (foundMonth.length === 0){
                                setIsSelectedMonthLoaded(false);
                                console.log(isSelectedMonthLoaded);
                            } 
                        })
        };

    const getWorkoutToUpdateId = async (event) => {
        console.log('here');
        const selectedWorkoutToUpdate = event.target.value;
        setIsUpdateMode(true);
        console.log(isUpdateMode);
        try {
            const response = await fetch(`https://barbell-factor.onrender.com/api/workouts/${selectedWorkoutToUpdate}`);
            const responseData = await response.json();
            const updateWorkout = responseData.workout;
            workoutToUpdateArray.push(updateWorkout);
            setUpdateWorkout(workoutToUpdateArray);
            console.log(updateWorkout);
            setIsUpdateMode(true);
        } catch (err) {}
    };

    const UpdateDeleteModal = (props) => {
        return ReactDOM.createPortal(
        <UpdateWorkouts
        fetch={fetchWorkouts}
        showUpdate={setShowUpdate}
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
    
    return(
        <React.Fragment>
        <DropDownSelect
            name={selectedMonth}
            onChange={handleSelect}
            isLoaded={setIsSelectedMonthLoaded} />
            {isUpdateMode && <UpdateDeleteModal />}
            <div className="month_header">
                <h2>{choice}</h2>
            </div>
            <GetAllWorkoutsOutput
            loggedMonth={loggedMonth}
            onClick={getWorkoutToUpdateId} />
        </React.Fragment>
    )
    };

export default GetAllWorkoutData;