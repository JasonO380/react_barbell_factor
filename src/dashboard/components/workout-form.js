import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import "./workout-form.css"


const WorkoutForm = (props)=>{
    const [workoutData, setWorkoutData] = useState({
        id:"",
        year:"",
        month:"",
        day:"",
        user:"",
        movement:"",
        rounds:"",
        reps:"",
        weight:""

    })
    const changeHandler = (event)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        const uid = uuidv4();
        const workoutEntryDate = new Date();
        setWorkoutData(prevValue => {
            return {
                ...prevValue,
                [inputName]:inputValue,
                id:uid,
                year: workoutEntryDate.getFullYear(),
                month: workoutEntryDate.toLocaleString("en-US", { month:"long" }),
                day:workoutEntryDate.getDate(),
            }
        })
    };

    const postWorkoutData = (event) => {
        event.preventDefault();
        props.workoutItems(workoutData);
        setWorkoutData({
            movement:"",
            rounds:"",
            reps:"",
            weight:""
        });
        
        console.log(workoutData);
        // validations to hook up later
        // if(workoutData.exercise.length === 0){
        //     setIsValid(false);
        //     setFormIsValid(false);
        //     return null;
        // } 
        // if (workoutData.reps.length === 0){
        //     setIsValid(false);
        //     setFormIsValid(false);
        //     console.log(isValid);
        //     return null;
        // } 
        // if (workoutData.rounds.length === 0){
        //         setIsValid(false);
        //         setFormIsValid(false);
        //         return null;
        //     }
        // else {
        //     props.workoutItems(workoutData);
        // }
        // setFormIsValid(true);
        
    };

    return(
        <React.Fragment>
            <div className="workout_form_header_box">
                    <h2>Enter your workout</h2>
            </div>
            <form className="all_workouts_session_container_form">
            <div className="movement_data">
            <div className="movement_header_box">
                <h4>Movement:</h4>
                <textarea
                name="movement"
                value={workoutData.movement}
                label="Movement"
                placeholder="Enter movement"
                onChange={changeHandler} />
            </div>
                <div className="movement_description_box">
                    <h4>Rounds:</h4>
                    <input
                    name="rounds"
                    value={workoutData.rounds}
                    label="Rounds"
                    placeholder="Enter rounds"
                    onChange={changeHandler} />
                    <h4>Reps:</h4>
                    <input
                    name="reps"
                    value={workoutData.reps}
                    label="Reps"
                    placeholder="Enter reps"
                    onChange={changeHandler} />
                    <h4>Weight:</h4>
                    <input
                    name="weight"
                    value={workoutData.weight}
                    label="Weight"
                    placeholder="Enter weight"
                    onChange={changeHandler} />
            </div>
            <div className="button_container_update_workouts">
                <button 
                className="form_button"
                onClick={postWorkoutData}>Enter</button>
            </div>
            </div>
</form>
        </React.Fragment>
    )
};

export default WorkoutForm;

{/* <form className="all_workouts_session_container_form">
<div className="movement_data">
            <div className="movement_header_box">
                <h4>Movement:</h4>
                <textarea
                name="movement"
                label="Movement"
                placeholder={props.workoutitems.movement}
                onChange={handleChange} />
            </div>
                <div className="movement_description_box">
                    <h4>Rounds:</h4>
                    <input
                    name="rounds"
                    label="Rounds"
                    placeholder={props.workoutitems.rounds}
                    onChange={handleChange} />
                    <h4>Reps:</h4>
                    <input
                    name="reps"
                    label="Reps"
                    placeholder={props.workoutitems.reps}
                    onChange={handleChange} />
                    <h4>Weight:</h4>
                    <input
                    name="weight"
                    label="Weight"
                    placeholder={props.workoutitems.weight}
                    onChange={handleChange} />
            </div>
            <div className="button_container_update_workouts">
                <button 
                className="form_button"
                onClick={postUpdate}>Update</button>
            </div>
</div>
</form> */}


            {/* <div className="workout_form_container">
                <form className="workout_form">
                    <div className="movement_div">
                        <h4>Movement:</h4>
                        <textarea
                        name="movement"
                        label="Movement"
                        value={workoutData.movement}
                        onChange={changeHandler} />
                    </div>
                    <div>
                        <div className="rounds_reps_weight_div">
                            <h4>Rounds:</h4>
                            <input
                            name="rounds"
                            label="Rounds"
                            value={workoutData.rounds}
                            onChange={changeHandler} />
                        </div>
                        <div>
                            <h4>Reps:</h4>
                            <input
                            name="reps"
                            label="Reps"
                            value={workoutData.reps}
                            onChange={changeHandler} />
                        </div>
                        <div>
                            <h4>Weight:</h4>
                            <input
                            name="weight"
                            label="Weight"
                            value={workoutData.weight}
                            onChange={changeHandler} />
                        </div>
                        <button
                        className="form_button" 
                        onClick={postWorkoutData}
                        in={props.in}>Click me</button>
                    </div>
                </form>
            </div> */}