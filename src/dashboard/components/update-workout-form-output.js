import React, { useState, useContext } from "react";
import ReactDOM  from "react-dom";
import UpdateWorkouts from "./update-workouts";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";

let finalEditArray =[];
let newArray = [];
let foundDay;
let month;

const UpdateWorkoutsFormPage = (props) => {
    const loggedSession = props.updateItems2;
    console.log(loggedSession);
    const auth = useContext(LoginRegisterContext);
    const [isUpdateMode, setIsUpdateMode] = useState(false)

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
                    props.updateItems2(finalEditArray);
            }})
        } catch (err){}
    }

    const UpdateDeleteModal = () => {
        console.log('here in modal');
        return ReactDOM.createPortal(
        <UpdateWorkouts
        fetch={fetchWorkouts}
        isUpdateMode={setIsUpdateMode} 
        workoutitems={finalEditArray} />, document.getElementById('update-delete-overaly'))
    }
    return (
        <React.Fragment>
            {isUpdateMode && <UpdateDeleteModal />}
            <div className="workout_wrapper">
                {loggedSession.map(session => {
                    {/* id = session.days[0].activities[0].id; */}
                    month = session.month;
                    const day = session.days;
                    foundDay = day.map(fDay => fDay.day);
                    return (
                        <div className="workout_container">
                            <h2 className="workout_date_header">{month} {foundDay}</h2>
                            {day.map(fDay => {
                                const foundActivities = fDay.activities;
                                foundDay = fDay.days
                                return (
                                    <div className="session_container">
                                        {foundActivities.map(workouts =>{
                                            return(
                                                <div>
                                                <React.Fragment>
                                                <div className="movement_data">
                                                    <p>Movement: {workouts.movement}</p>
                                                    <p>Rounds: {workouts.rounds}</p>
                                                    <p>Reps: {workouts.reps}</p>
                                                    <p>Weight: {workouts.weight}</p>
                                                </div>
                                                <div className="button_container_workout_data_output">
                                                    <button
                                                    value={props.value}
                                                    // isUpdateMode={props.isUpdateMode}
                                                    onClick={props.onClick} 
                                                    className="form_button_workout_data" >Update</button>
                                                </div>
                                                </React.Fragment>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            </React.Fragment>
    )
}

export default UpdateWorkoutsFormPage